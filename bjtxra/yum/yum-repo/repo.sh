#!/bin/bash

# 获取当前脚本所在的目录
current_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$current_dir"

FRAME=`uname -m`
mkdir -p $FRAME

# wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
yum install createrepo -y
xargs -a packages.txt yum reinstall --downloadonly --downloaddir=./$FRAME
cd ./$FRAME && createrepo . && cd -
