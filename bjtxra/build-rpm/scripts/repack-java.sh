#!/bin/bash
#set -x
for f in "$@"; do
    type=$(echo $f|grep -o jre||echo jdk)
    version=$(echo $f|grep -o -E '8u[0-9b]+(\-)?[0-9b]+'|sed 's/-//g')
    arch=$(echo $f|grep -o -E 'x64|aarch64|mips|loongson'|head -1)
    os=$(echo $f|grep -o -E 'linux|mac|win')
    openj9=$(echo $f|grep -o -E 'openj9'|head -1)
    if [ -n "$openj9" ]; then
        openj9="-$openj9"
    fi
    case $arch in 
        x64)
        arch=x86_64
        ;;
        arm64)
        arch=aarch64
        ;;
        mips|loongson)
        arch=mips64el
        ;;
    esac
    echo $os-$arch-$type-$version$openj9
    mkdir -p origin
    mkdir a
    realfilepath=$(realpath $f)
    pushd a
        tar xvf $realfilepath
	mv * java
	7za a -t7z -m0=lzma2 -mx=9 -mfb=64 -md=128m -ms=on ../$os-$arch-$type-$version$openj9.7z java
    popd
    rm -rf a
    mv $realfilepath origin
done
