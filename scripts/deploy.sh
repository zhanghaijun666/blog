#!/usr/bin/env sh

# ------------------------------------------------------------------------------
# gh-pages 部署脚本
# @author zhanghaijun
# @since 2020/02/14
# ------------------------------------------------------------------------------

# 装载其它库
ROOT_DIR=$(cd `dirname $0`/..; pwd)

# 确保脚本抛出遇到的错误
set -e

cd ${ROOT_DIR}

# 生成静态文件
npm install
npm run build

# 进入生成的文件夹
cd dist

# 如果是发布到自定义域名
# echo 'haijunit.top' > CNAME

if [ -z "$GITHUB_TOKEN" ]; then
  msg='deploy'
  githubUrl=git@github.com:zhanghaijun666/zhanghaijun666.github.io.git
else
  msg='来自github actions的自动部署'
  githubUrl=https://zhanghaijun666:${GITHUB_TOKEN}@github.com/zhanghaijun666/zhanghaijun666.github.io.git
  git config --global user.name "zhanghaijun666"
  git config --global user.email "zhanghaijun_java@163.com"
fi
echo "${githubUrl}"
git init

git add -A
git commit -m "${msg}"
git push --force --quiet ${githubUrl} master # 推送到github

# deploy to coding
# echo 'haijunit.top' > CNAME  # 自定义域名

#if [ -z "$CODING_TOKEN" ]; then  # -z 字符串 长度为0则为true；$CODING_TOKEN来自于github仓库`Settings/Secrets`设置的私密环境变量
#  codingUrl=git@e.coding.net:haijunit/zhanghaijun/blog.git
#else
#  codingUrl=https://${CODING_TOKEN}@e.coding.net/haijunit/zhanghaijun/blog.git
#fi
#git add -A
#git commit -m "${msg}"
#git push -f $codingUrl master # 推送到coding
#
#cd - # 退回开始所在目录
#rm -rf docs/.vuepress/dist