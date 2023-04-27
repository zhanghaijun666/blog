# 开发环境自动备份脚本

1、每天凌晨自动同步数据到cache目录下
2、根据备份周期，自动打包到data目录下
3、TODO：自动删除data目录下过期的备份文件，节约空间
4、TODO：备份完成后自动发送邮件通知，报告备份情况以及空间使用情况

备份周期：
cas
dnsmasq
openldap
torna
confluence
jenkins
jenkins-data
harbor
docker-repository
jira
nexus
nexus-data  

## 同步命令

```bash

rsync -avzP -e 'ssh -p 22' root@sso.devops.tr:/opt/cas  --log-file=/backup/logs/cas-$(date +%Y-%m-%d-%H%M).log /backup/cache
rsync -avzP -e 'ssh -p 22' root@sso.devops.tr:/opt/dnsmasq    /backup/cache
rsync -avzP -e 'ssh -p 22' root@sso.devops.tr:/opt/openldap   /backup/cache

rsync -avzP -e 'ssh -p 22' root@api.devops.tr:/opt/torna      /backup/cache
rsync -avzP -e 'ssh -p 22' root@api.devops.tr:/opt/confluence --exclude=logs /backup/cache

rsync -avzP -e 'ssh -p 22' root@ci.devops.tr:/opt/jenkins     /backup/cache
rsync -avzP -e 'ssh -p 22' root@ci.devops.tr:/opt/jenkins-data --exclude=workspace --exclude=caches --exclude=docker --exclude=builds --exclude=logs /backup/cache

rsync -avzP -e 'ssh -p 22' root@docker.devops.tr:/opt/harbor              /backup/cache
rsync -avzP -e 'ssh -p 22' root@docker.devops.tr:/opt/docker-repository   /backup/cache

rsync -avzP -e 'ssh -p 22' root@jira.devops.tr:/opt/jira  --exclude=log --exclude=data/export --exclude=data/tmp  /backup/cache

rsync -avzP -e 'ssh -p 22' root@repo.devops.tr:/opt/nexus       /backup/cache
rsync -avzP -e 'ssh -p 22' root@repo.devops.tr:/opt/nexus-data  /backup/cache

rsync -avzP -e 'ssh -p 22' root@git.devops.tr:/opt/gitlab  -exclude=gitlab/logs  /backup/cache
```

## 同步脚本模板

```bash
#! /bin/sh
set -e

cd `dirname $0`

BACKUP_HOST="api.devops.tr"
BACKUP_HOST_PATH="/opt/torna"

source  ./sync.sh
```

## 备份脚本模板

```bash
#!/bin/bash

set -e

cd `dirname $0`

RSYNC_HOST="sso.devops.tr"
RSYNC_HOST_PATH="/opt/dnsmasq"
BACKUP_ORIGIN="/backup/cache/dnsmasq"

source ./backup.sh
```
