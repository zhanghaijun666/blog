#! /bin/sh
## 发布全部的镜像

## cd到当前目录
cd `dirname $0`
DIR=`pwd`
echo "当前目录：$DIR"

for file in `ls $DIR`
do
  ##if [ -d $DIR"/"$file ]; then
  if [ -d $DIR"/"$file ] && [ -f $DIR"/"$file"/deploy.sh" ]; then
    echo "------------ 开始执行 $file/deploy.sh ------------"
    sh $DIR"/"$file"/deploy.sh"
  fi
done


