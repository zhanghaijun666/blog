<https://juejin.cn/post/7147559514823196702>

## 构建镜像

```bash
## 看情况是否执行这句登录
## 如果你的镜像仓库是公开的就不用执行    
docker login docker仓库地址  -u docker仓库用户名 -p docker仓库密码
## 制作 镜像    
docker build -f dockerfile -t docker仓库地址/docker仓库项目名/builder-nodejs:v3.3.0 .
## 推送镜像    
docker push docker仓库地址/docker仓库项目名/builder-nodejs:v3.3.0
```

## nginx

```bash
## 看情况是否执行这句登录
## 如果你的镜像仓库是公开的就不用执行    
docker login docker仓库地址  -u docker仓库用户名 -p docker仓库密码
## 制作 镜像    
docker build -f dockerfile -t docker仓库地址/docker仓库项目名/nginx:1231 .
## 推送镜像    
docker push docker仓库地址/docker仓库项目名/nginx:1231
```
