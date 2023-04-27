## 部署主库
```bash
kubectl create -f deploy/mysql/mysql-master-nfs.yaml
```

## 部署从库
```bash
kubectl create -f deploy/mysql/mysql-slave-nfs.yaml
```

## 验证数据库是否正常工作
```bash
kubectl get pod
```