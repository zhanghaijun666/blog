#!/bin/bash
## 设置时区并同步时间
## 禁用selinux
## 清空防火墙默认策略
## 历史命令显示操作时间
## 禁止root远程登录
## 禁止定时任务发送邮件
## 设置最大打开文件数
## 减少swap使用
## 系统内核参数优化
## 安装性能分析工具及其他

## 设置时区并同步时间 cn.pool.ntp.org/time.windows.com
##  cat /usr/share/zoneinfo/Asia/Shanghai >/etc/localtime
cd /etc
rm -f localtime
ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
if ! crontab -l | grep ntpdate &>/dev/null ;then
    (echo "* 1 * * * ntpdate cn.pool.ntp.org >/dev/null 2>&1";crontab -l) |crontab
fi

## 关闭selinux
sed -i '/SELINUX/{s/permissive/disabled}' /etc/selinux/config

## 开启防火墙并设置防火墙规则/关闭防火墙
if egrep "7.[0-9]" /etc/redhat-release &>/dev/null; then
	systemctl stop firewalld
	systemctl disable firewalld
elif egrep "6.[0-9]" /etc/redhat-release &>/dev/null; then
  service iptables stop
  chkconfig iptables off
fi

## 历史命令显示操作时间
##  if ! grep HISTTIMEFORMAT /etc/bashrc; then
##  	echo 'export HISTTIMEFORMAT="%F %T 'whoami' "' >> /etc/bashrc
##  fi

##  SSH超时时间
if ! grep "TMOUT=600" /etc/profile &>/dev/null; then
	echo "export TMOUT=600" >> /etc/profile
fi

##  禁止root远程登录
##  sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config

## 禁止定时任务发送邮件
sed -i 's/^MAILTO=root/MAILTO=""/' /etc/crontab

## 设置最大打开文件数

if ! grep "* soft nofile 65535" /etc/security/limits.conf &>/dev/null; then
	cat >> /etc/security/limits.conf << EOF
	* soft nofile 65535
	* hard nofile 65535
EOF
fi

## 系统内核优化

cat >> /etc/sysctl.conf << EOF
net.ipv4.tcp_max_tw_buckets = 6000
net.ipv4.tcp_sack = 1
net.ipv4.tcp_window_scaling = 1
net.ipv4.tcp_rmem = 4096 87380 4194304
net.ipv4.tcp_wmem = 4096 16384 4194304
net.core.wmem_default = 8388608
net.core.rmem_default = 8388608
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.core.netdev_max_backlog = 262144
net.core.somaxconn = 262144
net.ipv4.tcp_max_orphans = 3276800
net.ipv4.tcp_max_syn_backlog = 262144
net.ipv4.tcp_timestamps = 0
net.ipv4.tcp_synack_retries = 1
net.ipv4.tcp_syn_retries = 1
net.ipv4.tcp_tw_recycle = 1
net.ipv4.tcp_tw_reuse = 1
net.ipv4.tcp_mem = 94500000 915000000 927000000
net.ipv4.tcp_fin_timeout = 1
net.ipv4.tcp_keepalive_time = 30
net.ipv4.ip_local_port_range = 1024 65000
net.nf_conntrack_max = 655360
net.netfilter.nf_conntrack_tcp_timeout_established = 1200

## 防火墙优化，不开防火墙不用做如下操作
net.nf_conntrack_max = 25000000
net.netfilter.nf_conntrack_max = 25000000
net.netfilter.nf_conntrack_tcp_timeout_established = 180
net.netfilter.nf_conntrack_tcp_timeout_time_wait = 120
net.netfilter.nf_conntrack_tcp_timeout_close_wait = 60
net.netfilter.nf_conntrack_tcp_timeout_fin_wait = 120
EOF
sysctl -p /etc/sysctl.conf
## 减少swap使用
echo "0" > /proc/sys/vm/swappiness

## 安装系统性能分析工具及其他
yum -y install gcc make autoconf vim sysstat net-tools iostat iftop iotp lrzsz
