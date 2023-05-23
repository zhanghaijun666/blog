#!/bin/bash
VERSION=${VERSION:-"0.0"}
SUB_VERSION=${SUB_VERSION:-"0"}
COMPANY_NAME=${COMPANY_NAME:-"bedrock"}
BUILD_ARCHES=${BUILD_ARCHES:-"all"} #x86_64 aarch64 misp64el
BUILD_NUMBER=${BUILD_NUMBER:-"1"}
PACKAGE_URL=${PACKAGE_URL:="https://pan.bjtxra.com"}
BEDROCK_RELEASE=${BEDROCK_RELEASE:-"false"}
BASEDIR=$(realpath .)
mkdir -p $BASEDIR/dist
for arch in $(echo $BUILD_ARCHES); do
    rm -rf $BASEDIR/build/$arch
        
    #all deps by server,fusedriver,client
    for PACKAGE_NAME in tzdata cpio fontconfig hostname libaio java-1.8.0-openjdk libX11 libXrender libXext libSM libICE pango webkitgtk4 libappindicator libappindicator-gtk3 fuse GConf2 libXScrnSaver; do
        rm -rf $BASEDIR/build/$arch/fakes/opt
        mkdir -p $BASEDIR/build/$arch/fakes/opt
        touch $BASEDIR/build/$arch/fakes/opt/.fake-$PACKAGE_NAME
        PACKAGE_DESC="Fake $COMPANY_NAME $PACKAGE_NAME to allow install deps"
        docker run --rm -v $PWD/scripts:/scripts -v $BASEDIR/build/$arch/fakes:/source file.alot.pw/bedrock/dockerfpm /scripts/simple-fpm-build.sh $PACKAGE_NAME $VERSION $arch "rpm" $BUILD_NUMBER "$PACKAGE_DESC" $PACKAGE_URL
    done
    #dep depends
    for PACKAGE_NAME in tzdata cpio fontconfig libaio1 openjdk-8-jdk libx11-6 libx11-xcb1 libxrender1 libxext6 libsm6 libice6 libwebkit2gtk-4.0-37 libappindicator3-1 libfuse2 libgconf-2-4 libxss1 libnss3; do
        rm -rf $BASEDIR/build/$arch/fakes/opt
        mkdir -p $BASEDIR/build/$arch/fakes/opt
        touch $BASEDIR/build/$arch/fakes/opt/.fake-$PACKAGE_NAME
        PACKAGE_DESC="Fake $COMPANY_NAME $PACKAGE_NAME to allow install deps"
        docker run --rm -v $PWD/scripts:/scripts -v $BASEDIR/build/$arch/fakes:/source file.alot.pw/bedrock/dockerfpm /scripts/simple-fpm-build.sh $PACKAGE_NAME $VERSION $arch "deb" $BUILD_NUMBER "$PACKAGE_DESC" $PACKAGE_URL
    done
    pushd $BASEDIR/build/$arch
        mkdir -p $BASEDIR/dist/fakes
        find . -type f \( -name "*.rpm" -o -name "*.deb" \) -exec cp -avf {} $BASEDIR/dist/fakes \;
    popd
done
