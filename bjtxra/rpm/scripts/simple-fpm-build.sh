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
EXTRA_ARGS=$8

sed -i -s "s#/bin/sh#/bin/bash#g" /var/lib/gems/2.3.0/gems/fpm-1.10.2/templates/deb/*.sh.erb
pushd /source
for PACKAGE in $(echo $PACKAGES); do
  PACKAGE_ARCH=$ARCH
  if [ $PACKAGE = "deb" -a $ARCH = "aarch64" ]; then
    PACKAGE_ARCH=arm64
  fi
  (
    set -x; fpm -s dir -t $PACKAGE -f --prefix=/ \
      -n $NAME -v $VERSION -a $PACKAGE_ARCH --iteration $BUILD_NUMBER --license private --vendor "$URL" \
      --maintainer "$URL" --description "$DESC" --url "$URL"  $(echo $DEPS) $(echo $EXTRA_ARGS) \
      $(ls -d {usr,etc,opt} 2>/dev/null)
  )
done
popd
