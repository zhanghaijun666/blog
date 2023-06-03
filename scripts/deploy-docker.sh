#!/bin/bash
set -e

ROOT_DIR=$(cd `dirname $0`/..; pwd)
cd $ROOT_DIR

pushd scripts
source ./env_node.sh
popd

cd $ROOT_DIR
pnpm install && pnpm build
if [ ! $? -eq 0 ]; then
    echo "failed command: yarn install && yarn run build "
    exit 1;
fi

VERSION=$(grep \"version\" package.json |head -1| sed -n 's/.*\([0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*\).*/\1/p')
CURRENT_TIME=$(date "+%Y%m%d%H%M%S")

cat >> dockerfile <<EOF
FROM nginx:1.21-alpine
LABEL authors="zhanghaijun" email="zhanghaijun_java@163.com"
COPY dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF

docker rmi docker.devops.tr/bedrock/blog-docs:v$VERSION-$CURRENT_TIME
docker rmi docker.devops.tr/bedrock/blog-docs:latest

docker build -t docker.devops.tr/bedrock/blog-docs:v$VERSION-$CURRENT_TIME .
docker tag docker.devops.tr/bedrock/blog-docs:v$VERSION-$CURRENT_TIME docker.devops.tr/bedrock/blog-docs:latest

echo "123456" | docker login --username=zhanghaijun --password-stdin docker.devops.tr
docker push docker.devops.tr/bedrock/blog-docs:v$VERSION-$CURRENT_TIME
docker push docker.devops.tr/bedrock/blog-docs:latest
echo "====== docker build complete ======"
