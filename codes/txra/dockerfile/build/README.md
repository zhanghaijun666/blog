## 构建编译基础镜像
```bash
if [[ -n $(docker images | grep bedrock/bedrock-build 2>/dev/null) ]];then
  docker images | grep bedrock/bedrock-build | awk '{print $3}' | xargs docker rmi
fi
## 构建镜像
docker build -t docker.devops.tr/bedrock/bedrock-build:latest .

## 上传到镜像仓库
echo "123456" | docker login --username=zhanghaijun --password-stdin docker.devops.tr
docker push docker.devops.tr/bedrock/bedrock-build:latest
```