

```bash
## https://kubernetes.io/zh-cn/docs/tasks/run-application/run-replicated-stateful-application/

## 创建一个 ConfigMap
#wget https://k8s.io/examples/application/mysql/mysql-configmap.yaml
kubectl apply -f mysql-configmap.yaml -n bedrock
## 创建 Service
#wget https://k8s.io/examples/application/mysql/mysql-services.yaml
kubectl apply -f mysql-services.yaml -n bedrock
## 创建 StatefulSet
#wget https://k8s.io/examples/application/mysql/mysql-statefulset.yaml
kubectl apply -f mysql-statefulset.yaml -n bedrock
## 你可以通过运行以下命令查看启动进度：
kubectl get pods -l app=mysql -n bedrock --watch

## 删除以上
kubectl delete -f mysql-configmap.yaml -f mysql-services.yaml -f mysql-statefulset.yaml  -n bedrock
```