## 项目简介
> K8S部署redis

## 部署命令
```bash
## 创建 ConfigMap 存储 Redis 配置文件
kubectl apply redis-config.yaml -n bedrock
## 创建 Deployment 部署 Redis
kubectl apply redis-deployment.yaml -n bedrock
## 查看
kubectl get pod -n bedrock | grep redis
```