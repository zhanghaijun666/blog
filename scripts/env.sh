#!/bin/bash
set -e

ROOT_DIR=$(cd `dirname $0`/..; pwd)
cd $ROOT_DIR
BUILD_DIR=$ROOT_DIR/build

command -v npm >/dev/null 2>&1 || { echo >&2 "I require node.js v12.20.0+ but it's not installed.  Aborting."; sleep 5; exit 1; }
npm config set registry http://registry.npm.taobao.org/
npm cache clean --force
## command -v yarn >/dev/null 2>&1 || { npm install -g yarn; yarn config set registry https://registry.npm.taobao.org; }
command -v pnpm >/dev/null 2>&1 || { npm install -g pnpm; pnpm --version; pnpm config set registry https://registry.npmmirror.com; }

trim() {
  str=$1
  echo "${str}" | grep -o "[^ ]\+\( \+[^ ]\+\)*"
}

## 删除当前工作目录中未被跟踪的文件和目录。
git clean -f -d .
git stash && git stash clear
## git多模块源码拉取
# git submodule init && git submodule update -f --remote
git fetch --all
git fetch --tags


echo "COMMIT_BRANCH: `git branch --show-current`"
echo "COMMIT_BRANCH: `git symbolic-ref --short -q HEAD`"
echo "   COMMIT_TAG: `git describe --tags --exact-match HEAD`"
echo "  COMMIT_HASH: `git rev-parse HEAD`"
mkdir -p $BUILD_DIR
git log --pretty=oneline --abbrev-commit -20 > $BUILD_DIR/changelog.txt
echo "====== commit ====== start ======"
cat $BUILD_DIR/changelog.txt
echo "====== commit ====== end ======"

export VERSION=$(grep \"version\" package.json |head -1| sed -n 's/.*\([0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*\).*/\1/p')
echo "VERSION: $VERSION"
