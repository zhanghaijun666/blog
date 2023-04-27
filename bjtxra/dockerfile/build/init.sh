#!/bin/bash

###### yum源替换 ######
yum install wget -y
rm -rf /etc/yum.repos.d/CentOS-Base.repo
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo
yum clean all && yum makecache && yum repolist && yum update

yes | yum install git -y
yum install -y initscripts curl

###### 环境变量 jdk11 maven3.8 node16 ######
## 创建部署目录
mkdir -p /opt/tmp
## 下载资源
wget -P /opt/tmp http://192.168.13.100/releases/bedrock/develop/apache-maven-3.8.6-bin.tar.gz
wget -P /opt/tmp http://192.168.13.100/releases/bedrock/develop/jdk-11.0.12_linux-x64_bin.tar.gz
wget -P /opt/tmp http://192.168.13.100/releases/bedrock/develop/node-v16.15.1-linux-x64.tar
## 解压文件
tar xzvf /opt/tmp/apache-maven-3.8.6-bin.tar.gz -C /usr/local/lib/
tar xzvf /opt/tmp/jdk-11.0.12_linux-x64_bin.tar.gz -C /usr/local/lib/
tar xvf  /opt/tmp/node-v16.15.1-linux-x64.tar -C /usr/local/lib/
## 删除文件
rm -rf /opt/tmp

cat >> /etc/profile <<EOF

export NODE_HOME=/usr/local/lib/node-v16.15.1-linux-x64
export JAVA_HOME=/usr/local/lib/jdk-11.0.12
export MAVEN_HOME=/usr/local/lib/apache-maven-3.8.6
export PATH=\$JAVA_HOME/bin:\$NODE_HOME/bin:\$MAVEN_HOME/bin:\$PATH
export CLASSPATH=\$JAVA_HOME/jre/lib/ext:\$JAVA_HOME/lib/toos.jar
EOF
# 配置生效
source /etc/profile

command -v npm >/dev/null 2>&1 || { echo >&2 "I require node.js"; sleep 5; exit 0; }
## 修改淘宝镜像地址
npm config set registry http://registry.npm.taobao.org/ && npm cache clean -f
## yarn 安装配置
npm install -g yarn && yarn config set registry https://registry.npm.taobao.org

# serverurl=host.docker.internal
# urlstatus=$(curl -s -m 5 -IL $serverurl|grep 200)
# if [ "$urlstatus" == "" ];then
# 	ip -4 route list match 0/0 | awk '{print $3 " host.docker.internal"}' >> /etc/hosts
# fi
