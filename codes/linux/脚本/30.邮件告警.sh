#!/bin/bash
## 邮件告警
## 邮件告警注意云服务器需要开启邮箱所需要的端口，如果使用https，还要设置证书，http与https端口不一致

yum -y install mailx

# /etc/mail.rc
echo "set from=zatko@163.com smtp=smtp.163.com" >> /etc/mail.rc
echo "set smtp-auth-user=zatko@163.com smtp-auth-password=roes123" >> /etc/mail.rc
echo "set smtp-auth=login" >> /etc/mail.rc
