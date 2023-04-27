## 参考地址
- https://github.com/kubernetes-sigs/nfs-subdir-external-provisioner/tree/master/deploy
- https://www.cpweb.top/2244#4_NFS_subdir_external_provisioner

## 准备阶段
```bash
## 修改 deployment.yaml 中 NFS_SERVER 和 NFS_PATH
## 修改命名空间 下面是默认
# NS=$(kubectl config get-contexts|grep -e "^\*" |awk '{print $5}')
# NAMESPACE=${NS:-default}
# sed -i'' "s/namespace:.*/namespace: $NAMESPACE/g" ./deploy/nfs/rbac.yaml
sed -i'' "s/namespace:.*/namespace: storage/g" rbac.yaml deployment.yaml
```

## 安装NFS
```bash
## 创建命名空间
kubectl create ns storage
## 创建
kubectl apply -f rbac.yaml -f deployment.yaml
## 查看pod的运行情况
kubectl get pod -n storage
## 创建 Storage class
kubectl apply -f class.yaml 
## 查看存储sc
kubectl get sc
kubectl get pod -l app=nfs-client-provisioner -n storage
```

## 测试存储挂载
```bash
## 创建 PVC 测试
kubectl apply -f test-claim.yaml
kubectl get pvc -A
kubectl get pv
kubectl delete -f test-claim.yaml
## 创建 Pod 测试：
kubectl apply -f test-pod.yaml
kubectl get pod
tree /nfs/data
kubectl delete -f test-pod.yaml

## kubectl get pvc 一直padding状态
vi /etc/kubernetes/manifests/kube-apiserver.yaml
# 加入 - --feature-gates=RemoveSelfLink=false
## 重新构建pvc
```
