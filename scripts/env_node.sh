#!/bin/sh
set -e

ROOT_DIR=$(cd `dirname $0`/..; pwd)
cd $ROOT_DIR
BUILD_DIR=$ROOT_DIR/build

command -v npm >/dev/null 2>&1 || { echo >&2 "I require node.js v12.20.0+ but it's not installed.  Aborting."; sleep 5; exit 1; }
npm config set registry http://registry.npm.taobao.org/
npm cache clean --force
## command -v yarn >/dev/null 2>&1 || { npm install -g yarn; yarn config set registry https://registry.npm.taobao.org; }
command -v pnpm >/dev/null 2>&1 || { npm install -g pnpm; pnpm --version; pnpm config set registry https://registry.npmmirror.com; }
## pnpm config set store-dir "D:\.pnpm-store"
MEMORY_LIMIT=$(node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))')
echo "node的内存限制: $MEMORY_LIMIT"
if [ -n "$MEMORY_LIMIT" ]; then
  ## For 8GB/8192
  export NODE_OPTIONS="--max-old-space-size=8192"
fi
echo "node的内存限制: `node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))'`"

## npm install --registry=https://registry.npm.taobao.org && npm run build
