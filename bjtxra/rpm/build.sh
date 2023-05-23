#!/bin/bash
#set -x
set -e
if [ -e $(dirname $0)/customers/common/mini-package.sh ]; then
  source $(dirname $0)/customers/common/mini-package.sh
fi
before=$(set | sort | uniq)
if [ -n "$1" ]; then
    VERSION=$1
fi
if [ -n "$2" ]; then
    SUB_VERSION=$2
fi
#source customer configure file if set
if [ -n "$CUSTOMER" -a -e $(dirname $0)/customers/$CUSTOMER.sh ]; then
    source $(dirname $0)/customers/$CUSTOMER.sh
fi
trim() {
    str=$1
    echo "${str}" | grep -o "[^ ]\+\( \+[^ ]\+\)*"
}

VERSION=${VERSION:-"4.0"}
SUB_VERSION=${SUB_VERSION:-"3"}
FAVOR=$(trim ${FAVOR:-"dev"})
BUILD_BRANCH=$(trim ${BUILD_BRANCH:-"master"})
TARGET_FAVOR=${TARGET_FAVOR:-"$FAVOR"}
COMPANY_NAME=${COMPANY_NAME:-"总部"}
DOMAIN=${DOMAIN:-"changeme.alot.pw"}
BUILD_APP=${BUILD_APP:-"true"}
RELEASE_APP=${RELEASE_APP:-"false"}
BUILD_PACKAGES=${BUILD_PACKAGES:-""} #rpm deb sh dir tar
RELEASE_PACKAGES=${RELEASE_PACKAGES:-"true"}
BUILD_ARCHES=${BUILD_ARCHES:-"x86_64"} #x86_64 aarch64 misp64el
CI_JOB_ID=${CI_JOB_ID:-"1"}
BUILD_NUMBER=${BUILD_NUMBER:-$CI_JOB_ID}
PACKAGE_NAME=${PACKAGE_NAME:-"cloudserver"}
PACKAGE_DESC=${PACKAGE_DESC:-"$COMPANY_NAME $PACKAGE_NAME"}
PACKAGE_URL=${PACKAGE_URL:="https://pan.bjtxra.com"}

BUILD_OFFICE=${BUILD_OFFICE:-"false"}     #是否编译office安装包  
OFFICE_PACKAGES=${OFFICE_PACKAGES:=""}    #编译的安装包，可以是"rpm deb dir"或者(fpm)[https://github.com/jordansissel/fpm] 支持的其他安装包,dir会打包为7z  
RELEASE_OFFICE=${RELEASE_OFFICE:-"false"} #是否上传rpm,deb,7z安装包  

RENAME_PACKAGE=${RENAME_PACKAGE:-"false"} #是否重命名包名，如果是则把默认的cloudserver以及所有引用都改为新包名
user="root"
pass="123456"
if [  -n "$REPOUSER" ]; then
  user=$REPOUSER
fi
if [ -n "$REPOPASS" ]; then
  pass=$REPOPASS
fi
targetprefix="http://repo.devops.tr/repository/cloud/releases";


if  [[  ! $PACKAGE_NAME  =~  ^[a-zA-Z][a-zA-Z0-9_\-]+  ]]; then
    echo 包名错误，请使用字母开头中间可以数字或者-_
	exit 1
fi

#自定义包名
if [ "$RENAME_PACKAGE" = "true" -a ! "$PACKAGE_NAME" = "cloudserver" ]; then
  unset RENAME_PACKAGE
  rm -rf custbuild/$PACKAGE_NAME
  mkdir -p custbuild/$PACKAGE_NAME
  cp -avf bin  build-fakes.sh  build.sh  customers  kylinos  make.sh  office  prebuild-binary  scripts  templates custbuild/$PACKAGE_NAME/
  find custbuild/$PACKAGE_NAME -type f|xargs sed -i "s/cloudserver/$PACKAGE_NAME/g"
  build-$PACKAGE_NAME/build.sh "$@"
  exit $?
fi
downloadPrefix=${downloadPrefix:-"http://repo.devops.tr/repository/cloud/releases"}

BASEDIR=$(realpath $(dirname $0))
echo "BASEDIR "$BASEDIR
folder=Server-$VERSION
if [ -n $FAVOR ]; then
    folder=$FAVOR/Server-$VERSION
fi
targetfolder=$folder
backupfolder=$folder
if [ -n $TARGET_FAVOR  ]; then
    targetfolder=$TARGET_FAVOR/Server-$VERSION
fi
if [ -n $BUILD_BRANCH  ]; then
    backupfolder=branches/$BUILD_BRANCH/Server-$VERSION
fi
after=$(set | sort | uniq)

comm -13 <(printf %s "$before") <(printf %s "$after") |grep -v ^before= |grep -v ^_=|grep -v PIPESTATUS|grep -v BASH_REMATCH
cleanup() {

   ## docker run --rm -v $(dirname $BASEDIR):/test centos:7 chown -R $(id -u):$(id -g) /test/$(basename $BASEDIR)
   echo "cleanup path, basedir "$(dirname $BASEDIR)" testpost "$(basename $BASEDIR)
}
trap cleanup EXIT
trap cleanup ERR
download () {
    wget -N $1 --directory-prefix $BASEDIR/dist/ | (
        echo failed download $1
    )
}
mkdir -p $BASEDIR/dist
getResourceOriginPath(){
    RESOURCE_ORIGIN_PATH=`docker inspect build-server-rpm-${BUILD_NUMBER} | grep -B1 '"Destination": "/var/jenkins_home"' | grep Source | cut -d\" -f4`
    RESOURCE_ORIGIN_PATH=$RESOURCE_ORIGIN_PATH/`echo $WORKSPACE | cut -d\/ -f4-`
    echo "RESOURCE_ORIGIN_PATH: $RESOURCE_ORIGIN_PATH"
}
getResourceOriginPath
if [ "$BUILD_APP" = "true" ]; then
    if [ ! "$(uname -m)" = "x86_64" ]; then
        xxd -p oci-systemd-hook|sed "s/$(echo -n /var/log|xxd -p)00/$(echo -n /var/nis|xxd -p)00/g"|xxd -p -r > /tmp/oci-systemd-hook
        chmod +x /tmp/oci-systemd-hook
        /bin/cp -avf /tmp/oci-systemd-hook /usr/libexec/oci/hooks.d/oci-systemd-hook
    fi

    rm -rf app .install-status/
    docker rm -f mini-building||echo deleted
    if [ "$(uname -m)" = "x86_64" ]; then
        docker run --privileged --name mini-building -v /sys/fs/cgroup:/sys/fs/cgroup:ro -v $RESOURCE_ORIGIN_PATH:/build -d  centos/systemd
    else
        docker run --privileged --name mini-building -v /sys/fs/cgroup:/sys/fs/cgroup:ro -v $RESOURCE_ORIGIN_PATH:/build -d  base/neokylin /usr/sbin/init
    fi
    sleep 2

    docker exec mini-building /build/make.sh $FAVOR -c $COMPANY_NAME -d $DOMAIN --version $VERSION -u $downloadPrefix --sub-version $SUB_VERSION java app solr

	cleanup
    /bin/cp -avf bin app/
    if [ "$RELEASE_APP" = "true" -o -n "$BUILD_PACKAGES" ]; then
        rm -rf app/cloud/clients/*
        rm -rf app/jdk*
        #tar cvf $BASEDIR/dist/app-$VERSION.tar app
        7za a -t7z -m0=lzma2 -mx=9 -mfb=64 -md=128m -ms=on $BASEDIR/dist/app-$VERSION.7z app
        if [ "$RELEASE_APP" = "true" ]; then
            #ssh root@192.168.10.2 mkdir -p /files/releases/$targetfolder
            #scp -p $BASEDIR/dist/app-$VERSION.7z root@192.168.10.2:/files/releases/$targetfolder/
			curl -u $user:$pass  --upload-file  $BASEDIR/dist/app-$VERSION.7z  $targetprefix/$targetfolder/
		    curl -u $user:$pass  --upload-file  $BASEDIR/dist/app-$VERSION.7z  $targetprefix/$backupfolder/
			rm -rf $BASEDIR/dist/app-$VERSION.7z
			rm -rf $BASEDIR/build/*
        fi
    else
        echo 'rm -rf app/cloud/clients/*'
        echo 'rm -rf app/jdk*'
        echo tar cvf app-$VERSION.tar app
        echo 7za a -t7z -m0=lzma2 -mx=9 -mfb=64 -md=128m -ms=on app-$VERSION.7z app
    fi
elif [ -n "$BUILD_PACKAGES" -a ! "$BUILD_PACKAGE" = "false" ]; then
    download $downloadPrefix/$folder/app-$VERSION.7z
fi

copyfiles(){
  arch=$1
  target=$2
  for f in $(ls *.rpm 2>/dev/null); do
    cp -avf $f $target/$(echo $f|sed "s/\-${BUILD_NUMBER}\./\-1./g")
  done
  for f in $(ls *.deb 2>/dev/null); do
    cp -avf $f $target/$(echo $f|sed "s/\-${BUILD_NUMBER}_/_/g")
  done
  if [ -d $PACKAGE_NAME.dir ]; then
    pushd $PACKAGE_NAME.dir
        7za a -t7z -m0=lzma2 -mx=9 -mfb=64 -md=128m -ms=on $target/$PACKAGE_NAME-$VERSION.$arch.7z *
    popd
    rm -rf $PACKAGE_NAME.dir
  fi
}

if [ -n "$BUILD_PACKAGES" -a ! "$BUILD_PACKAGE" = "false" ]; then
    for arch in $(echo $BUILD_ARCHES); do
        if [ "$arch" = "arm64" ]; then
          arch=aarch64
        fi
        rm -rf $BASEDIR/build/$arch
        mkdir -p $BASEDIR/build/$arch/opt/cloudserver
        #servers mysql nginx redis
        for p in mysql-$arch-v5.5.7z openresty-$arch-v1.17.8.2.7z p7zip-$arch-v16.02.7z redis-$arch-v6.2.1.7z brotli-$arch-v0.5.2.7z ffmpeg-$arch-v4.4.7z; do
            download $downloadPrefix/files/prebuilt/$p
            pushd $BASEDIR/build/$arch
                7za x $BASEDIR/dist/$p
            popd
        done

        #office
        download $downloadPrefix/files/officeonline-$arch-7-0-0.7z
        download $downloadPrefix/files/msfonts.7z
        download $downloadPrefix/files/officefonts.7z
        #TODO:use jre or jdk
        javatype=jre
        javaver=8u282b08
        if [ $arch = mips64el ]; then
            javaver=8u275b01
        fi
        javaname=linux-$arch-$javatype-$javaver.7z
        download $downloadPrefix/files/java/$javaname
        pushd $BASEDIR/build/$arch/
            7za x -y $BASEDIR/dist/officeonline-$arch-7-0-0.7z
            chmod +x opt/libreoffice/program/lib*.so opt/libreoffice/libs/*
            mkdir -p $BASEDIR/build/$arch/usr/share/fonts
            pushd $BASEDIR/build/$arch/usr/share/fonts
                7za x -y $BASEDIR/dist/msfonts.7z
                7za x -y $BASEDIR/dist/officefonts.7z
            popd
            mv usr/bin/loolwsd-generate-proof-key usr/bin/loolwsd-generate-proof-key.opt
            sed -i "s#>any</listen>#>loopback</listen>#g" etc/loolwsd/loolwsd.xml
            sed -i "s#>all</proto>#>IPv4</proto>#g" etc/loolwsd/loolwsd.xml

            if [ -e $BASEDIR/dist/$javaname ]; then
                pushd $BASEDIR/build/$arch/opt/cloudserver
                    7za x -y $BASEDIR/dist/$javaname
                popd
            fi
        popd

        pushd $BASEDIR/build/$arch/opt/cloudserver
            7za x $BASEDIR/dist/app-$VERSION.7z

            libmark=$arch
            if [ $arch = x86_64 ]; then
                libmark="x86-64|x86_64|amd64"
            fi
            mkdir -p lib
            pushd lib
                for f in ../app/cloud/lib/*.jar ; do
                    unzip -l $f|grep \\.so$|grep -E $libmark|awk '{print $4}'|grep -i linux |xargs -r unzip -o -j $f
                done
            popd
            rm -rf app/solr/server/logs/* app/cloud/logs/*
        popd
        pushd $BASEDIR/build/$arch/opt/cloudserver
            ln -s ../etc/mysql mysql/etc
            ln -s ../etc/redis redis/etc
            mkdir -p etc
            ln -s ../openresty/nginx/conf etc/nginx
            rm -rf mysql/{docs,include,man,mysql-test,data} openresty/nginx/logs openresty/nginx/conf.d
            mv app/solr/server/solr  app/solr/server/solr.template
        popd
        cp -avf $BASEDIR/templates/* $BASEDIR/build/$arch/
        if [ ! -e $BASEDIR/build/$arch/opt/cloudserver/etc/nginx/dhparams.pem.opt ]; then
            openssl dhparam -out $BASEDIR/build/$arch/opt/cloudserver/etc/nginx/dhparams.pem.opt 2048
        fi
        if [ ! -e $BASEDIR/build/$arch/etc/loolwsd/proof_key.opt ]; then
            id
            ls -l $BASEDIR/build/$arch/etc/loolwsd/
            ssh-keygen -t rsa -N "" -m PEM -f $BASEDIR/build/$arch/etc/loolwsd/proof_key.opt  <<<y||echo ssh-keygen failed, used old ones
        fi
        rm -rf $BASEDIR/build/$arch/usr/lib/systemd/system/loolwsd.service

        mkdir -p $BASEDIR/build/$arch/opt/cloudserver/etc/nginx/conf.d
        sed "s#/opt/cloud/#/opt/cloudserver/app/cloud/#g;s#/etc/nginx/##g" app/cloud/etc/nginx.conf > $BASEDIR/build/$arch/opt/cloudserver/etc/nginx/conf.d/cloudserver.conf
        /bin/cp -avf app/cloud/etc/nginx-filters.conf $BASEDIR/build/$arch/opt/cloudserver/etc/nginx/nginx-filters.conf
        touch $BASEDIR/build/$arch/opt/cloudserver/etc/nginx/passwords
        echo "bedrock:$(openssl passwd -crypt 'letmein')" >> $BASEDIR/build/$arch/opt/cloudserver/etc/nginx/passwords
        sed -i "s#8104#8102#g;s#/opt/cloud/#/opt/cloudserver/app/cloud/#g;s#mountpoint\":..*\$#mountpoint\":\"\",#g" $BASEDIR/build/$arch/opt/cloudserver/app/cloud/conf/config.json
        mv $BASEDIR/build/$arch/opt/cloudserver/app/cloud/conf/config.json $BASEDIR/build/$arch/opt/cloudserver/app/cloud/conf/config.json.prod
        rm -f $BASEDIR/build/$arch/opt/cloudserver/app/cloud/conf/config.auto
        mkdir -p tmp
        echo docker run --rm --user $(id -u):$(id -g) -v $RESOURCE_ORIGIN_PATH/tmp:/tmp -v $RESOURCE_ORIGIN_PATH/scripts:/scripts -v$RESOURCE_ORIGIN_PATH/fpm-1.10.2/templates:/var/lib/gems/2.3.0/gems/fpm-1.10.2/templates -v $RESOURCE_ORIGIN_PATH/build/$arch:/source base/dockerfpm /scripts/fpm-build.sh $PACKAGE_NAME $VERSION $arch "$BUILD_PACKAGES" $BUILD_NUMBER "$PACKAGE_DESC"
        docker run --rm  --user $(id -u):$(id -g) -v $RESOURCE_ORIGIN_PATH/tmp:/tmp  -v $RESOURCE_ORIGIN_PATH/scripts:/scripts -v$RESOURCE_ORIGIN_PATH/fpm-1.10.2/templates:/var/lib/gems/2.3.0/gems/fpm-1.10.2/templates -v $RESOURCE_ORIGIN_PATH/build/$arch:/source base/dockerfpm /scripts/fpm-build.sh $PACKAGE_NAME $VERSION $arch "$BUILD_PACKAGES" $BUILD_NUMBER "$PACKAGE_DESC" "$PACKAGE_URL"

        pushd $BASEDIR/build/$arch
            rm -rf $BASEDIR/dist/packages/$arch
            mkdir -p $BASEDIR/dist/packages/$arch
            copyfiles $arch $BASEDIR/dist/packages/$arch
        popd
        if [ "$RELEASE_PACKAGES" = "true" ]; then
           # ssh root@192.168.10.2 mkdir -p /files/releases/$targetfolder
            #scp -p $BASEDIR/dist/packages/$arch/* root@192.168.10.2:/files/releases/$targetfolder/
			echo  $targetprefix/$targetfolder/
			ls $BASEDIR/dist/packages/$arch/* |xargs -I {} curl -u $user:$pass --upload-file {}  $targetprefix/$targetfolder/
			ls $BASEDIR/dist/packages/$arch/* |xargs -I {} curl -u $user:$pass --upload-file {}  $targetprefix/$backupfolder/
		 
   		    rm -rf $BASEDIR/dist/packages/$arch/*
			rm -rf $BASEDIR/build/*
			#if [ -n "$TARGET_FAVOR" -o -n "$BUILD_BRANCH" ]; then  触发自动化测试
              #  for PACKAGE in $(echo $BUILD_PACKAGES); do
               #   if [ $PACKAGE = "rpm" ]; then
               #     curl -X POST -F token=a6208674d82f23cc27d68fc832f320 -F ref=master -F variables[TEST_FAVOR]=$TARGET_FAVOR -F variables[TEST_ARCH]=$arch -F variables[BUILD_BRANCH]=$BUILD_BRANCH -F variables[BUILD_TRIGGER]=$BUILD_BRANCH  -F variables[PROCESSES]=3   http://192.168.10.2/api/v4/projects/237/trigger/pipeline
				#	break
				#  fi
               # done
		#	fi
        fi
    done
fi
if [ "$BUILD_OFFICE" = "true" ]; then
    for arch in $(echo $BUILD_ARCHES); do
        if [ "$arch" = "arm64" ]; then
          arch=aarch64
        fi
        rm -rf $BASEDIR/build/$arch
        mkdir -p $BASEDIR/build/$arch
        #office
        download $downloadPrefix/files/officeonline-$arch-7-0-0.7z
        download $downloadPrefix/files/msfonts.7z
        download $downloadPrefix/files/officefonts.7z
        pushd $BASEDIR/build/$arch/
            7za x -y $BASEDIR/dist/officeonline-$arch-7-0-0.7z
            chmod +x opt/libreoffice/program/lib*.so opt/libreoffice/libs/*
            mkdir -p $BASEDIR/build/$arch/usr/share/fonts
            pushd $BASEDIR/build/$arch/usr/share/fonts
                7za x -y $BASEDIR/dist/msfonts.7z
                7za x -y $BASEDIR/dist/officefonts.7z
            popd
            mv usr/bin/loolwsd-generate-proof-key usr/bin/loolwsd-generate-proof-key.opt
            sed -i "s#>any</listen>#>loopback</listen>#g" etc/loolwsd/loolwsd.xml
            sed -i "s#>all</proto>#>IPv4</proto>#g" etc/loolwsd/loolwsd.xml
        popd
        if [ ! -e $BASEDIR/build/$arch/etc/loolwsd/proof_key.opt ]; then
            id
            ls -l $BASEDIR/build/$arch/etc/loolwsd/
            ssh-keygen -t rsa -N "" -m PEM -f $BASEDIR/build/$arch/etc/loolwsd/proof_key.opt  <<<y||echo ssh-keygen failed, used old ones
        fi
        rm -rf $BASEDIR/build/$arch/usr/lib/systemd/system/loolwsd.service
        cp $BASEDIR/office/officeonline.service $BASEDIR/build/$arch/usr/lib/systemd/system/
        PACKAGE_DESC="$COMPANY_NAME office"
        for package in $(echo $OFFICE_PACKAGES); do
            docker run --user $(id -u):$(id -g) --rm -v $RESOURCE_ORIGIN_PATH/scripts:/scripts -v $RESOURCE_ORIGIN_PATH/office:/office -v $RESOURCE_ORIGIN_PATH/fpm-1.10.2/templates:/var/lib/gems/2.3.0/gems/fpm-1.10.2/templates -v $RESOURCE_ORIGIN_PATH/build/$arch:/source base/dockerfpm /scripts/simple-fpm-build.sh officeonline $VERSION $arch $package $BUILD_NUMBER "$PACKAGE_DESC" $PACKAGE_URL "-d hostname --after-upgrade /office/after-install-officeonline.sh --after-install /office/after-install-officeonline.sh --config-files /etc"
        done
        pushd $BASEDIR/build/$arch
            rm -rf $BASEDIR/dist/office/$arch
            mkdir -p $BASEDIR/dist/office/$arch
            copyfiles $arch $BASEDIR/dist/office/$arch
        popd
        if [ "$RELEASE_OFFICE" = "true" ]; then
            #ssh root@192.168.10.2 mkdir -p /files/releases/files/office
            #scp -p $BASEDIR/dist/office/$arch/* root@192.168.10.2:/files/releases/files/office/
	        echo  $targetprefix/files/office/
			ls $BASEDIR/dist/office/$arch/* |xargs -I {} curl -u $user:$pass --upload-file {}  $targetprefix/files/office/
			rm -rf $BASEDIR/dist/office/$arch/*
			rm -rf $BASEDIR/build/*
        fi
    done

fi
