#!/bin/bash
set -e

VERSION=$(date "+%Y%m%d%H%M%S")
NAME="centos-fpm"

docker build -t $NAME:$VERSION .
docker tag $NAME:$VERSION docker.devops.tr/backup/$NAME:latest
docker tag $NAME:$VERSION docker.devops.tr/backup/$NAME:$VERSION

echo "123456" | docker login --username=zhanghaijun --password-stdin docker.devops.tr
docker push docker.devops.tr/backup/$NAME:latest
docker push docker.devops.tr/backup/$NAME:$VERSION
