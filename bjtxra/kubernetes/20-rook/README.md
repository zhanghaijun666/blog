## 介绍

> <https://rook.io>
>
> <https://ceph.com/>
>
> [博文](https://www.cnblogs.com/LiuChang-blog/p/15706365.html)
>
> [博文](https://www.tangyuecan.com/2020/02/17/%E5%9F%BA%E4%BA%8Ek8s%E6%90%AD%E5%BB%BAceph%E5%88%86%E9%83%A8%E7%BD%B2%E5%AD%98%E5%82%A8/)
>
> <https://www.qikqiak.com/k8strain/storage/ceph/>

## 镜像准备

```bash
## 拉取原始镜像
docker pull quay.io/ceph/ceph:v17.2.5
docker pull quay.io/cephcsi/cephcsi:v3.7.2
docker pull quay.io/csiaddons/k8s-sidecar:v0.5.0
docker pull rook/ceph:v1.10.8
docker pull registry.k8s.io/sig-storage/csi-attacher:v4.0.0
docker pull registry.k8s.io/sig-storage/csi-node-driver-registrar:v2.5.1
docker pull registry.k8s.io/sig-storage/csi-provisioner:v3.3.0
docker pull registry.k8s.io/sig-storage/csi-resizer:v1.6.0
docker pull registry.k8s.io/sig-storage/csi-snapshotter:v6.1.0
## 备份下载地址
# docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/csi-attacher:v4.0.0
# docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/csi-node-driver-registrar:v2.5.1
# docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/csi-provisioner:v3.3.0
# docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/csi-resizer:v1.6.0
# docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/csi-snapshotter:v6.1.0

## docker tag
docker tag quay.io/ceph/ceph:v17.2.5  docker.devops.tr/kubernetes/ceph:v17.2.5
docker tag quay.io/cephcsi/cephcsi:v3.7.2  docker.devops.tr/kubernetes/cephcsi:v3.7.2
docker tag quay.io/csiaddons/k8s-sidecar:v0.5.0  docker.devops.tr/kubernetes/k8s-sidecar:v0.5.0
docker tag rook/ceph:v1.10.8  docker.devops.tr/kubernetes/ceph:v1.10.8
docker tag registry.k8s.io/sig-storage/csi-attacher:v4.0.0  docker.devops.tr/kubernetes/csi-attacher:v4.0.0
docker tag registry.k8s.io/sig-storage/csi-node-driver-registrar:v2.5.1  docker.devops.tr/kubernetes/csi-node-driver-registrar:v2.5.1
docker tag registry.k8s.io/sig-storage/csi-provisioner:v3.3.0  docker.devops.tr/kubernetes/csi-provisioner:v3.3.0
docker tag registry.k8s.io/sig-storage/csi-resizer:v1.6.0  docker.devops.tr/kubernetes/csi-resizer:v1.6.0
docker tag registry.k8s.io/sig-storage/csi-snapshotter:v6.1.0  docker.devops.tr/kubernetes/csi-snapshotter:v6.1.0
# docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/csi-attacher:v4.0.0  docker.devops.tr/kubernetes/csi-attacher:v4.0.0
# docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/csi-node-driver-registrar:v2.5.1  docker.devops.tr/kubernetes/csi-node-driver-registrar:v2.5.1
# docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/csi-provisioner:v3.3.0  docker.devops.tr/kubernetes/csi-provisioner:v3.3.0
# docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/csi-resizer:v1.6.0  docker.devops.tr/kubernetes/csi-resizer:v1.6.0
# docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/csi-snapshotter:v6.1.0  docker.devops.tr/kubernetes/csi-snapshotter:v6.1.0

## docker push
docker push docker.devops.tr/kubernetes/ceph:v17.2.5
docker push docker.devops.tr/kubernetes/cephcsi:v3.7.2
docker push docker.devops.tr/kubernetes/k8s-sidecar:v0.5.0
docker push docker.devops.tr/kubernetes/ceph:v1.10.8
docker push docker.devops.tr/kubernetes/csi-attacher:v4.0.0
docker push docker.devops.tr/kubernetes/csi-node-driver-registrar:v2.5.1
docker push docker.devops.tr/kubernetes/csi-provisioner:v3.3.0
docker push docker.devops.tr/kubernetes/csi-resizer:v1.6.0
docker push docker.devops.tr/kubernetes/csi-snapshotter:v6.1.0

docker pull docker.devops.tr/kubernetes/ceph:v17.2.5
docker pull docker.devops.tr/kubernetes/cephcsi:v3.7.2
docker pull docker.devops.tr/kubernetes/k8s-sidecar:v0.5.0
docker pull docker.devops.tr/kubernetes/ceph:v1.10.8
docker pull docker.devops.tr/kubernetes/csi-attacher:v4.0.0
docker pull docker.devops.tr/kubernetes/csi-node-driver-registrar:v2.5.1
docker pull docker.devops.tr/kubernetes/csi-provisioner:v3.3.0
docker pull docker.devops.tr/kubernetes/csi-resizer:v1.6.0
docker pull docker.devops.tr/kubernetes/csi-snapshotter:v6.1.0
```

## 部署集群

### 1. 应用 yaml 文件

```bash
## common.yaml 安装常规资源
## operator.yaml 安装操作器
kubectl create -f crds.yaml -f common.yaml -f operator.yaml
```

### 2. 开始部署集群

```bash
# 开始部署集群，有些镜像比较大(大于1G)，pod完全启动需要一定的时间
kubectl create -f cluster.yaml
## - 实时查看pod创建进度
kubectl get pod -n rook-ceph -w
## - 实时查看集群创建进度
kubectl get cephcluster -n rook-ceph rook-ceph -w
## - 详细描述
kubectl describe cephcluster -n rook-ceph rook-ceph
```

### 3. 部署 Rook Ceph 工具

```bash
kubectl create -f toolbox.yaml
## 查看ceph集群状态
kubectl -n rook-ceph exec -it deploy/rook-ceph-tools -- bash
ceph -s
ceph status
ceph osd status
ceph osd lspools
ceph df
rados df
```

### 4. 部署 Ceph Dashboard

```bash
kubectl apply -f dashboard-external-https.yaml
kubectl get svc -n rook-ceph

## 获取Ceph Dashboard admin的登录密码
echo `kubectl get secret rook-ceph-dashboard-password -n rook-ceph -o yaml|grep -E [[:space:]]password|awk -F'[ ]+' '{print $3}'`|base64 -d
# 或者
kubectl -n rook-ceph get secret rook-ceph-dashboard-password -o jsonpath="{['data']['password']}" | base64 -d
```

### 4. F&Q

1. 消除 HEALTH_WARN 警告

```bash
## 查看警告详情
##    AUTH_INSECURE_GLOBAL_ID_RECLAIM_ALLOWED: mons are allowing insecure global_id reclaim
##    MON_DISK_LOW: mons a,b,c are low on available space
## 官方解决方案：https://docs.ceph.com/en/latest/rados/operations/health-checks/

## - 进入toolbox
kubectl -n rook-ceph exec -it deploy/rook-ceph-tools -- bash
ceph config set mon auth_allow_insecure_global_id_reclaim false
```

2. 消除 HEALTH_WARN 警告

```bash
## 查看警告详情
##    1 mgr modules have recently crashed
## - 进入toolbox
kubectl -n rook-ceph exec -it deploy/rook-ceph-tools -- bash

## 系统中所有的崩溃可以通过以下方式列出
ceph crash ls
## 新的崩溃可以通过以下方式列出
ceph crash ls-new
## 有关特定崩溃的信息可以通过以下方式检查
ceph crash info <crash-id>
## 通过“存档”崩溃（可能是在管理员检查之后）来消除此警告，从而不会生成此警告 (解决)
ceph crash archive <crash-id>
## 所有新的崩溃都可以通过以下方式存档
ceph crash archive-all
## 可以通过以下方式完全禁用这些警告
ceph config set mgr mgr/crash/warn_recent_interval 0
```

## ceph 分布式存储使用

| 存储类型           | 特征                                                                                               | 应用场景              | 典型设备      |
| ------------------ | -------------------------------------------------------------------------------------------------- | --------------------- | ------------- |
| 块存储（RBD）      | 存储速度较快<br/>不支持共享存储 [**ReadWriteOnce**]                                                | 虚拟机硬盘            | 硬盘<br/>Raid |
| 文件存储（CephFS） | 存储速度慢（需经操作系统处理再转为块存储）<br/>支持共享存储 [**ReadWriteMany**]                    | 文件共享              | FTP<br/>NFS   |
| 对象存储（Object） | 具备块存储的读写性能和文件存储的共享特性<br/>操作系统不能直接访问，只能通过应用程序级别的 API 访问 | 图片存储<br/>视频存储 | OSS           |

### RBD（块存储）

```bash
kubectl apply -f csi/rbd/storageclass.yaml
```

### CEPHFS（文件存储）

```bash
kubectl apply -f filesystem.yaml
kubectl apply -f csi/cephfs/storageclass.yaml

kubectl patch storageclass cephfs -p '{"metadata":{"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
kubectl patch storageclass cephfs -p '{"metadata":{"annotations":{"storageclass.beta.kubernetes.io/is-default-class":"true"}}}'

kubectl get storageclass
```

## 卸载

```bash
#k8s资源清理
kubectl delete -f toolbox.yaml
kubectl delete -f operator.yaml
kubectl delete -f cluster.yaml
kubectl delete -f crds.yaml
kubectl delete -f common.yaml

kubectl -n rook-ceph get job|tail -n +2|awk '{print $1}'|xargs kubectl -n rook-ceph delete job --force --grace-period=0
kubectl -n rook-ceph get deploy|tail -n +2|awk '{print $1}'|xargs kubectl -n rook-ceph delete deployments.apps --force --grace-period=0
kubectl -n rook-ceph get svc|tail -n +2|awk '{print $1}'|xargs kubectl -n rook-ceph delete svc --force --grace-period=0
kubectl -n rook-ceph get sa|tail -n +2|awk '{print $1}'|grep rook|xargs kubectl -n rook-ceph delete sa --force --grace-period=0

kubectl proxy &
NAMESPACE=rook-ceph
kubectl get namespace $NAMESPACE -o json |jq '.spec = {"finalizers":[]}' >temp.json
curl -k -H "Content-Type: application/json" -X PUT --data-binary @temp.json 127.0.0.1:8001/api/v1/namespaces/$NAMESPACE/finalize
ps -ef |grep "kubectl proxy"|awk '{print $2}'|xargs kill -9

#各个节点硬盘和配置文件清理
yum -y install gdisk
# 修改具体的磁盘
DISK="/dev/sdb"
sgdisk --zap-all $DISK
# 机械盘
dd if=/dev/zero of="$DISK" bs=1M count=100 oflag=direct,dsync
# 固态
# blkdiscard $DISK
ls /dev/mapper/ceph-* | xargs -I% -- dmsetup remove %
rm -rf /dev/ceph-*
rm -rf /dev/mapper/ceph--*
partprobe $DISK
```
