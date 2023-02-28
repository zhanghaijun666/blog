## 准备阶段
> 修改 deploy/nacos/nacos-pvc-nfs.yaml

```text
data:
  mysql.master.db.name: "主库名称"
  mysql.master.port: "主库端口"
  mysql.slave.port: "从库端口"
  mysql.master.user: "主库用户名"
  mysql.master.password: "主库密码"
```

## 创建 Nacos
```bash
kubectl create -f nacos-k8s/deploy/nacos/nacos-pvc-nfs.yaml
## 验证Nacos节点启动成功
kubectl get pod -l app=nacos
```

## 扩容测试
```bash
## 在扩容前，使用`kubectl exec`获取在pod中的Nacos集群配置文件信息
for i in 0 1; do echo nacos-$i; kubectl exec nacos-$i cat conf/cluster.conf; done
## 使用kubectl scale 对Nacos动态扩容
kubectl scale sts nacos --replicas=3
## 在扩容后，使`kubectl exec`获取在pod中的Nacos集群配置文件信息
for i in 0 1 2; do echo nacos-$i; kubectl exec nacos-$i cat conf/cluster.conf; done
## 使用 kubectl exec执行Nacos API 在每台节点上获取当前Leader是否一致
for i in 0 1 2; do echo nacos-$i; kubectl exec nacos-$i curl -X GET "http://localhost:8848/nacos/v1/ns/raft/state"; done
```