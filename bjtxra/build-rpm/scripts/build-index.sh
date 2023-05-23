#!/bin/bash
set -e

NAME=${NAME:-"cloudserver"}
VERSION=${VERSION:-"4.0.4"}
PACKAGE=${PACKAGE:-"rpm"}
PACKAGE_ARCH=${PACKAGE_ARCH:-"x86_64"}
BUILD_NUMBER=${BUILD_NUMBER:-"100"}
URL=${URL:-"https://pan.bjtxra.com"}
DESC=${DESC:-"build cloudserver rpm"}
DEPS=${DEPS:-" -d tzdata -d cpio -d fontconfig -d hostname "}

if [ $PACKAGE = "deb" -a $PACKAGE_ARCH = "aarch64" ]; then
  PACKAGE_ARCH=arm64
fi
if [ $PACKAGE = "deb" ]; then
  DEPS="$DEPS -d libx11-6 -d libx11-xcb1 -d libxrender1 -d libxext6 -d libsm6 -d libice6 -d libncurses5 -d libxinerama1" #-d openjdk-8-jdk
elif [ $PACKAGE = "rpm" ]; then
  DEPS="$DEPS -d libX11 -d libXrender -d libXext -d libSM -d libICE -d ncurses-libs -d libXtst -d libXinerama" #-d java-1.8.0-openjdk
fi

EXTRA_ARGS=
if [ $PACKAGE = "sh" ]; then
  ## TODO:7z compress
  EXTRA_ARGS=
elif [ $PACKAGE = "deb" ]; then
  ## TODO:7z compress
  EXTRA_ARGS="--deb-after-purge /scripts/after-purge.sh"
elif [ $PACKAGE = "tar" -o $PACKAGE = "dir" ]; then
  rm -rf cloudserver.dir
  cp -avf /scripts/*.sh /source/opt/cloudserver/installer/
fi

echo build start...
fpm -s dir -t $PACKAGE -f --prefix=/ \
  --after-install /scripts/install-after.sh \
  --after-upgrade /scripts/upgrade-after.sh \
  --before-remove /scripts/remove-before.sh \
  --after-remove /scripts/remove-after.sh \
  --config-files /etc \
  --config-files /opt/cloudserver/etc  \
  --config-files /opt/cloudserver/openresty/nginx/conf \
  --config-files /opt/cloudserver/app/cloud/conf \
  -n $NAME -v $VERSION -a $PACKAGE_ARCH \
  --iteration $BUILD_NUMBER \
  --license private \
  --vendor "$URL" \
  --maintainer "$URL" \
  --description "$DESC" \
  --url "$URL"  $EXTRA_ARGS $DEPS \
  $(ls -d {usr,etc,opt} 2>/dev/null)
