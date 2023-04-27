#! /bin/sh
## 发布镜像

## cd到当前目录
cd `dirname $0`

NAME=bedrock/redis
VERSION=6.2.7

## 删除已有的docker镜像
if [[ -n $(docker images | grep $NAME 2>/dev/null) ]];then
  docker images | grep $NAME| awk '{print $3}' | xargs docker rmi
fi

## 构建docker镜像
docker build -t docker.devops.tr/$NAME:$VERSION .

## 上传镜像文件
echo "123456" | docker login --username=zhanghaijun --password-stdin docker.devops.tr
docker push docker.devops.tr/$NAME:$VERSION

## 删除本地镜像
docker rmi docker.devops.tr/$NAME:$VERSION
