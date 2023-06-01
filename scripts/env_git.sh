#!/bin/sh
set -e

ROOT_DIR=$(cd `dirname $0`/..; pwd)
cd $ROOT_DIR
BUILD_DIR=$ROOT_DIR/build

trim() {
  str=$1
  echo "${str}" | grep -o "[^ ]\+\( \+[^ ]\+\)*"
}
git version
git show --stat --format=提交日期：%ci,%n提交人：%cn,%n提交备注：%s,%n提交Hash：%H,%n提交分支：%d,%n%b%n提交修改的文件：

## 删除当前工作目录中未被跟踪的文件和目录。
git clean -f -d .
git stash && git stash clear
## git多模块源码拉取
# git submodule init && git submodule update -f --remote
## 需要认证 git fetch --all
## 需要认证 git fetch --tags

echo "COMMIT_BRANCH: `git symbolic-ref --short -q HEAD`"
# echo "COMMIT_BRANCH: `git branch --show-current`"
# echo "   COMMIT_TAG: `git describe --tags --exact-match HEAD`"
echo "  COMMIT_HASH: `git rev-parse HEAD`"
mkdir -p $BUILD_DIR
git log --pretty=oneline --abbrev-commit -20 > $BUILD_DIR/changelog.txt
echo "====== commit ====== start ======"
cat $BUILD_DIR/changelog.txt
echo "====== commit ====== end ======"

export VERSION=$(grep \"version\" package.json |head -1| sed -n 's/.*\([0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*\).*/\1/p')
echo "VERSION: $VERSION"
