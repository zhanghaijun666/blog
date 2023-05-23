#!/bin/bash
set -e
#file name in utf-8 to handle chinese
export RUBYOPT="-E utf-8"
NAME=$1
VERSION=$2
ARCH=$3
PACKAGES=$4
BUILD_NUMBER=$5
BUILD_NUMBER=${BUILD_NUMBER:=1}
DESC=$6
DESC=${DESC:="$NAME from bedrock"}
URL=$7
URL=${URL:="https://pan.bjtxra.com"}

#sed -i -s "s#/bin/sh#/bin/bash#g" /var/lib/gems/2.3.0/gems/fpm-1.10.2/templates/deb/*.sh.erb
pushd /source
set -x
#-d java-1.8.0-openjdk -d cpio -d tzdata
for PACKAGE in $(echo $PACKAGES); do
  PACKAGE_ARCH=$ARCH
  DEPS=""
  if [ $PACKAGE = "deb" -a $ARCH = "aarch64" ]; then
    PACKAGE_ARCH=arm64
  fi
  DEPS="-d tzdata -d cpio -d fontconfig -d hostname"

  if [ $PACKAGE = "deb" ]; then
    DEPS="$DEPS -d libx11-6 -d libx11-xcb1 -d libxrender1 -d libxext6 -d libsm6 -d libice6 -d libncurses5 -d libxinerama1" #-d openjdk-8-jdk
  elif [ $PACKAGE = "rpm" ]; then
    DEPS="$DEPS -d libX11 -d libXrender -d libXext -d libSM -d libICE -d ncurses-libs -d libXtst -d libXinerama" #-d java-1.8.0-openjdk
  fi
  EXTRA_ARGS=
  if [ $PACKAGE = "sh" ]; then
    #TODO:7z compress
    EXTRA_ARGS=
  elif [ $PACKAGE = "deb" ]; then
    #TODO:7z compress
    EXTRA_ARGS="--deb-after-purge /scripts/after-purge.sh"
  elif [ $PACKAGE = "tar" -o $PACKAGE = "dir" ]; then
    rm -rf cloudserver.dir
    cp -avf /scripts/*.sh /source/opt/cloudserver/installer/
  fi
  fpm -s dir -t $PACKAGE -f --prefix=/ \
      --after-install /scripts/after-install.sh --after-upgrade /scripts/after-upgrade.sh \
      --before-remove /scripts/before-remove.sh --after-remove /scripts/after-remove.sh \
      --config-files /etc --config-files /opt/cloudserver/etc  \
      --config-files /opt/cloudserver/openresty/nginx/conf --config-files /opt/cloudserver/app/cloud/conf \
      -n $NAME -v $VERSION -a $PACKAGE_ARCH --iteration $BUILD_NUMBER --license private --vendor "$URL" \
      --maintainer "$URL" --description "$DESC" --url "$URL"  $EXTRA_ARGS $DEPS \
      $(ls -d {usr,etc,opt} 2>/dev/null)
done
popd
