# 说明  

编译服务器快速安装版，包括最小版app压缩包，rpm,deb,7z 安装文件,office包  

yum install -y p7zip wget unzip

## 最小包

文件名为app-$VERSION.7z
redis,nginx,java等需要系统提供，office在线编辑可以安装office包  
建议指定定制化参数，例如万里红执行下面命令，定制参数在customers/wlh.sh:  
CUSTOMER=wlh FAVOR=test-integration ./build.sh  

# 编译参数

CUSTOMER=              客户化配置文件名称，例如 wlh,yingcheng, 这个在customers目录下有个对应名字的.sh文件, 通过它把下面这些参数直接固定化  
FAVOR=dev              编译的源服务器版本分支  
VERSION=4.0            服务器版本  
SUB_VERSION=0          子版本  
TARGET_FAVOR=$FAVOR    编译的目标服务器版本上传位置，不设置时默认使用FAVOR  
BUILD_APP=false        是否编译app压缩包,圣博润/万里红需要这个  
BUILD_PACKAGE          是否编译服务器rpm/deb包  
BUILD_PACKAGES=        编译的安装包，可以是"rpm deb dir"或者[fpm](https://github.com/jordansissel/fpm) 支持的其他安装包,dir会打包为7z  
RELEASE_APP=false      是否上传app压缩包  
RELEASE_PACKAGE=false  是否上传rpm,deb,7z安装包  
BUILD_ARCHES=          CPU架构x86_64 aarch64 misp64el  
BUILD_NUMBER=          编译号  
COMPANY_NAME=万里红         公司名称
DOMAIN=wlh.alot.pw     云盘默认域名  
PACKAGE_NAME=cloudserver  包名  
PACKAGE_DESC="$COMPANY_NAME $PACKAGE_NAME"  包描述
PACKAGE_URL=<https://pan.bjtxra.com>     包url  
SOLR_VERSION=8.8.2     SOLR版本，3.3用6.5.1  

BUILD_OFFICE=false     是否编译office安装包  
OFFICE_PACKAGES=       编译的安装包，可以是"rpm deb dir"或者[fpm](https://github.com/jordansissel/fpm) 支持的其他安装包,dir会打包为7z  
RELEASE_OFFICE=false   是否上传rpm,deb,7z安装包  

# 适用范围

1. 受控环境，无法基于官方rpm/dev安装，并且系统防护有其他厂商/客户负责
1. 快速测试

# 安装包获取

默认不编译快速安装包。如果编译了，则会放到和原来服务器相同位置Server-x目录下载，为rpm,deb或者7z文件  

# 手工编译  

docker run --rm -v /home/build/mini-package/scripts:/scripts -v /home/build/mini-package/build/x86_64:/source file.alot.pw/bedrock/dockerfpm /scripts/fpm-build.sh cloudserver 4.0 x86_64 "rpm deb dir" 2 '总部 cloudserver'  

# 安装  

## CentOS && RPM based

```
#其他常用软件
yum install -y tzdata cpio hostname libX11 libXrender libXext libSM libICE fontconfig libXinerama
localedef --quiet -i zh_CN -f UTF-8 zh_CN.UTF-8 
localedef --quiet -i en_US -f UTF-8 en_US.UTF-8 
export LC_ALL=zh_CN.UTF-8
yum install cloudserver-4.0-*.x86_64.rpm
#yum install -y which iputils iproute net-tools vim wget
#yum install -y java-1.8.0-openjdk tzdata cpio
```

## Debain/Ubuntu && Deb based

```
apt update
apt install -y tzdata cpio hostname libx11-6 libx11-xcb1 libxrender1 libxext6 libsm6 libice6 fontconfig libxinerama1
apt install -y language-pack-zh-hans
localedef --quiet -i zh_CN -f UTF-8 zh_CN.UTF-8 
export LC_ALL=zh_CN.UTF-8
dpkg -i cloudserver_4.0-*_amd64.deb
#apt install -y which iputils iproute net-tools vi wget
#apt install -y openjdk-8-jdk language-pack-zh-hans tzdata cpio
```

# 测试  

## CentOS  

```
docker run --privileged --name mini-test  --cap-add MKNOD -v /sys/fs/cgroup:/sys/fs/cgroup:ro -v $PWD:/build -d  centos/systemd  
#docker run --privileged --name mini-test  --cap-add MKNOD -v /sys/fs/cgroup:/sys/fs/cgroup:ro -v $PWD:/build -d  file.alot.pw/arm64v8/c7-systemd /usr/sbin/init

docker exec -ti mini-test bash
```

## Ubuntu  

```
docker run -ti --privileged --name mini-test  --cap-add MKNOD  -v /sys/fs/cgroup:/sys/fs/cgroup:ro -v $PWD:/build -d arm64v8/ubuntu:xenial /sbin/init
#docker run -ti --privileged --name mini-test  --cap-add MKNOD  -v /sys/fs/cgroup:/sys/fs/cgroup:ro -v $PWD:/build -d arm64v8/ubuntu:xenial /sbin/init
#docker run -ti --privileged --name mini-test  --cap-add MKNOD  -v /sys/fs/cgroup:/sys/fs/cgroup:ro -v $PWD:/build -d aoqi/debian-mips64el /sbin/init
docker exec -ti mini-test bash
```

## 然后按照安装步骤安装测试  

# 安装结构  

快速安装包会安装到/opt/cloudserver目录：mysql,redis,openresty,app/solr,app/cloud。
会安装cloudserver,cloudserver-mysql,cloudserver-redis,cloudserver-nginx几个服务。其中cloudserver包含云盘和solr。  
如果需要使用mysql,redis,nginx等命令，需要source cloudserver-envs  
另有cloudserver-startall,cloudserver-stopall,cloudserver-startapp,cloudserver-stopapp几个命令。  

# Office在线编辑单独安装  

## 依赖

```
yum install -y tzdata cpio libX11 libXrender libXext libSM libICE fontconfig
```

## 安装

```
yum install -y https://pan.bjtxra.com/files/releases/files/office/officeonline-7.0-1.x86_64.rpm
```

## 服务状态

```
systemctl status officeonline
curl http://localhost:9980
netstat -antp|grep 9980
```

# 举例  

```
CUSTOMER=yingcheng BUILD_NUMBER=3000 ./build.sh
CUSTOMER=wlh BUILD_NUMBER=3000 ./build.sh
FAVOR=test-yingcheng BUILD_APP=true BUILD_ARCHES=aarch64 BUILD_PACKAGES=rpm BUILD_PACKAGE=true RELEASE_PACKAGES=true BUILD_NUMBER=100 ./build.sh
FAVOR=branches/zhanghaijun-security BUILD_APP=true BUILD_PACKAGES=rpm RELEASE_PACKAGES=true BUILD_ARCHES=x86_64 BUILD_PACKAGE=true ./build.sh
```
