#!/bin/bash

# export KKZONE=cn
# curl -sfL https://get-kk.kubesphere.io | VERSION=v3.0.2 sh -

## 创建示例配置文件
#./kk create config --with-kubernetes v1.21.14 --with-kubesphere v3.3.1 -f k8s.yaml

## 使用配置文件创建集群
./kk create cluster -f k8s.yaml


kubectl create secret generic ceph-secret --type="kubernetes.io/rbd" --from-literal=key='AQCikDFZs870AhAA7q1dF80V8Vq1cF6vm6bGTg==' --namespace=kube-system
kubectl create secret generic ceph-secret --type="kubernetes.io/rbd" --from-literal=key='AQCikDFZs870AhAA7q1dF80V8Vq1cF6vm6bGTg==' --namespace=default

