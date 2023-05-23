#!/bin/bash

###### yum源替换 ######
yum install wget -y
rm -rf /etc/yum.repos.d/CentOS-Base.repo
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo
yum clean all && yum makecache && yum repolist && yum update

yes | yum install git -y
yum install -y initscripts curl createrepo

## 添加本地yum源
curl http://192.168.10.2/files/releases/files/x86_64/centos7-clients-rpms-x86_64.tar -o /opt/centos7.tar --progress
tar xvf /opt/centos7.tar -C /usr/local/lib/ && createrepo /usr/local/lib/centos7/ && rm -rf /opt/centos7.tar
cat >> /etc/yum.repos.d/local.repo <<EOF
[local-rpms]
name=local-rpms
enabled=1
baseurl=file:///usr/local/lib/centos7/
gpgcheck=0
skip_if_unavailable=1
EOF

## 安装云盘
curl http://192.168.10.6/repository/cloud/releases/test-avicdigital/Server-4.0/cloudserver-4.0-1.x86_64.rpm -o /opt/cloudserver-4.0.rpm --progress
yum install -y /opt/cloudserver-4.0.rpm
