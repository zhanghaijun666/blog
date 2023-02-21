#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress

mv dist www
scp -r www root@192.16.18.100:/opt/blog

rm -rf www
