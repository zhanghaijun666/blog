import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as c,c as p,e as d,a as s,d as e,w as l,b as n,f as i}from"./app-efa5e96e.js";const m={},u={class:"table-of-contents"},v=s("h2",{id:"官网地址",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#官网地址","aria-hidden":"true"},"#"),n(" 官网地址")],-1),b={href:"https://kubernetes.io/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://kubernetes.io/zh-cn/docs/home/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/kubernetes/kubernetes",target:"_blank",rel:"noopener noreferrer"},f={href:"https://kubesphere.io/zh/",target:"_blank",rel:"noopener noreferrer"},g={href:"https://kubesphere.io/zh/docs/v3.3/",target:"_blank",rel:"noopener noreferrer"},y=i(`<h2 id="环境准备" tabindex="-1"><a class="header-anchor" href="#环境准备" aria-hidden="true">#</a> 环境准备</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 更改yum源</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token function">vim</span>  <span class="token function">wget</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /etc/yum.repos.d/CentOS-Base.repo
<span class="token function">wget</span> <span class="token parameter variable">-O</span> /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
<span class="token function">wget</span> <span class="token parameter variable">-O</span> /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo
yum clean all <span class="token operator">&amp;&amp;</span> yum makecache <span class="token operator">&amp;&amp;</span> yum repolist <span class="token operator">&amp;&amp;</span> yum update

<span class="token comment">## 升级Linux内核版本</span>
<span class="token function">rpm</span> <span class="token parameter variable">-Uvh</span> http://www.elrepo.org/elrepo-release-7.0-4.el7.elrepo.noarch.rpm
yum <span class="token parameter variable">--enablerepo</span><span class="token operator">=</span>elrepo-kernel <span class="token function">install</span> <span class="token parameter variable">-y</span> kernel-lt
<span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> kernel
<span class="token comment"># 查看默认启动项</span>
<span class="token function">awk</span> -F<span class="token punctuation">\\</span>&#39; <span class="token string">&#39;$1==&quot;menuentry &quot; {print $2}&#39;</span> /etc/grub2.cfg
<span class="token comment"># 设置开机从新内核启动 第一个</span>
grub2-set-default <span class="token number">0</span>
<span class="token comment"># 注意：设置完内核后，需要重启服务器才会生效。</span>
<span class="token function">reboot</span>
<span class="token comment"># 查询内核 4.4.249-1.el7.elrepo.x86_64</span>
<span class="token function">uname</span> <span class="token parameter variable">-r</span>

<span class="token comment">## 通过 yum remove 命令（可选）</span>
<span class="token comment"># 查看系统安装了哪些内核包</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> kernel
<span class="token comment"># 使用yum remove 或rpm -e 删除无用内核 3.x相关的都可以删除</span>
yum remove kernel-tools-3.10.0-1127.el7.x86_64 kernel-3.10.0-1127.el7.x86_64 kernel-tools-libs-3.10.0-1127.el7.x86_64

<span class="token comment"># 关闭SELINUX 永久关闭需要修改SELINUX的配置文件</span>
setenforce <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/^SELINUX=.*/SELINUX=disabled/&#39;</span> /etc/selinux/config
<span class="token comment"># 配置ulimit</span>
<span class="token builtin class-name">ulimit</span> <span class="token parameter variable">-SHn</span> <span class="token number">65535</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /etc/security/limits.conf <span class="token operator">&lt;&lt;</span><span class="token string">EOF
* soft nofile 655360
* hard nofile 131072
* soft nproc 655350
* hard nproc 655350
* seft memlock unlimited
* hard memlock unlimitedd
EOF</span>

<span class="token comment">## 时间同步</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> ntp ntpdate
ntpdate cn.pool.ntp.org
hwclock <span class="token parameter variable">--systohc</span>
hwclock <span class="token parameter variable">-w</span>
<span class="token comment"># 时区不对的更改时区</span>
<span class="token function">mv</span> /etc/localtime /etc/localtime.bak
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
<span class="token function">date</span>

<span class="token comment">## 安装依赖环境</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> conntrack ntpdate ntp ipvsadm ipset jq iptables <span class="token function">curl</span> sysstat libseccomp <span class="token function">wget</span> <span class="token function">vim</span> net-tools <span class="token function">git</span> iproute lrzsz bash-completion tree bridge-utils <span class="token function">unzip</span> bind-utils gcc <span class="token function">lsof</span>

<span class="token comment">## 防⽕墙配置</span>
systemctl disable <span class="token parameter variable">--now</span> firewalld
systemctl stop firewalld <span class="token operator">&amp;&amp;</span> systemctl disable firewalld
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> iptables-services <span class="token operator">&amp;&amp;</span> systemctl start iptables <span class="token operator">&amp;&amp;</span> systemctl <span class="token builtin class-name">enable</span> iptables <span class="token operator">&amp;&amp;</span> iptables <span class="token parameter variable">-F</span> <span class="token operator">&amp;&amp;</span> <span class="token function">service</span> iptables save
<span class="token comment"># 关闭系统不需要的服务</span>
systemctl stop postfix <span class="token operator">&amp;&amp;</span> systemctl disable postfix

<span class="token comment">## 禁⽤交换分区 关闭swap分区【虚拟内存】并且永久关闭虚拟内存</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;/ swap / s/^\\(.*\\)$/#\\1/g&#39;</span> /etc/fstab
swapoff <span class="token parameter variable">-a</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sysctl</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">vm.swappiness</span><span class="token operator">=</span><span class="token number">0</span>

<span class="token comment"># 设置日志保存方式</span>
<span class="token function">mkdir</span> /var/log/journal
<span class="token function">mkdir</span> /etc/systemd/journald.conf.d
<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/systemd/journald.conf.d/99-prophet.conf <span class="token operator">&lt;&lt;</span><span class="token string">EOF
[Journal]
Storage=persistent
Compress=yes
SyncIntervalSec=5m
RateLimitInterval=30s
RateLimitBurst=1000
SystemMaxUse=10G
SystemMaxFileSize=200M
MaxRetentionSec=2week
ForwardToSyslog=no
EOF</span>
systemctl restart systemd-journald <span class="token operator">&amp;&amp;</span> systemctl status systemd-journald

<span class="token comment">## 系统优化参数</span>
modprobe br_netfilter
<span class="token function">cat</span> <span class="token operator">&gt;</span> /root/kubernetes.conf <span class="token operator">&lt;&lt;</span><span class="token string">EOF
net.bridge.bridge-nf-call-iptables=1
net.bridge.bridge-nf-call-ip6tables=1
net.ipv4.ip_forward=1
vm.swappiness=0
vm.overcommit_memory=1
vm.panic_on_oom=0
fs.inotify.max_user_instances=8192
fs.inotify.max_user_watches=1048576
fs.file-max=52706963
fs.nr_open=52706963
net.ipv6.conf.all.disable_ipv6=1
net.netfilter.nf_conntrack_max=2310720
EOF</span>
<span class="token comment"># 将优化内核文件拷贝到/etc/sysctl.d/文件夹下，这样优化文件开机的时候能够被调用</span>
<span class="token function">cp</span> <span class="token parameter variable">-avf</span> /root/kubernetes.conf /etc/sysctl.d/kubernetes.conf
<span class="token comment"># 手动刷新，让优化文件立即生效</span>
<span class="token function">sysctl</span> <span class="token parameter variable">-p</span> /etc/sysctl.d/kubernetes.conf
<span class="token comment">## /proc/sys/net/netfilter/nf_conntrack_max: No such file or directory 请执行 modprobe ip_conntrack</span>

<span class="token comment"># kube-proxy 开启 ipvs 前置条件</span>
modprobe br_netfilter
<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/sysconfig/modules/ipvs.modules <span class="token operator">&lt;&lt;</span><span class="token string">EOF
#!/bin/bash
modprobe -- ip_vs
modprobe -- ip_vs_rr
modprobe -- ip_vs_wrr
modprobe -- ip_vs_sh
modprobe -- nf_conntrack
EOF</span>
<span class="token comment"># 使用lsmod命令查看这些文件是否被引导</span>
<span class="token function">chmod</span> <span class="token number">755</span> /etc/sysconfig/modules/ipvs.modules <span class="token operator">&amp;&amp;</span> <span class="token function">bash</span> /etc/sysconfig/modules/ipvs.modules <span class="token operator">&amp;&amp;</span> lsmod <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-e</span> ip_vs <span class="token parameter variable">-e</span> nf_conntrack_ipv4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="节点规划" tabindex="-1"><a class="header-anchor" href="#节点规划" aria-hidden="true">#</a> 节点规划</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 三台机器上分别执行</span>
hostnamectl set-hostname k8s-master-96
hostnamectl set-hostname k8s-node-95
hostnamectl set-hostname k8s-node-94

<span class="token comment">## 三台机器上加入到hosts文件</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;&gt;</span> /etc/hosts</span>

192.168.20.96 k8s-master-96
192.168.20.95 k8s-node-95
192.168.20.94 k8s-node-94
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-安装" tabindex="-1"><a class="header-anchor" href="#docker-安装" aria-hidden="true">#</a> docker 安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 卸载docker</span>
systemctl stop docker.socket <span class="token operator">&amp;&amp;</span> systemctl stop docker.service
yum list installed <span class="token operator">|</span><span class="token function">grep</span> <span class="token function">docker</span>
<span class="token comment"># 删除上面查询的结果</span>
yum <span class="token parameter variable">-y</span> remove docker-ce.x86_64
<span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span><span class="token function">grep</span> <span class="token function">docker</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/lib/docker

<span class="token comment">## 安装依赖环境</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils device-mapper-persistent-data lvm2
<span class="token comment">## 添加软件源信息</span>
yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
<span class="token comment">## 查找docker软件版本</span>
yum list docker-ce.x86_64 <span class="token parameter variable">--showduplicates</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-r</span>
<span class="token comment">## 指定版本docker-ce 稳定版本</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> docker-ce-19.03.9-3.el7
<span class="token comment">## 设置docker daemon.json⽂件，源地址，存储⽬录，⽇志规则，存储⽅式</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/docker <span class="token operator">&amp;&amp;</span> <span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;</span><span class="token string">EOF
{
 &quot;registry-mirrors&quot;: [&quot;https://zxpi33fv.mirror.aliyuncs.com&quot;,&quot;http://docker.devops.tr&quot;,&quot;http://hub-mirror.c.163.com&quot;,&quot;https://docker.mirrors.ustc.edu.cn&quot;],
 &quot;insecure-registries&quot;: [&quot;docker.devops.tr&quot;],
 &quot;exec-opts&quot;: [&quot;native.cgroupdriver=systemd&quot;],
 &quot;log-driver&quot;: &quot;json-file&quot;,
 &quot;log-opts&quot;: {&quot;max-size&quot;: &quot;100m&quot;},
 &quot;storage-driver&quot;: &quot;overlay2&quot;,
 &quot;storage-opts&quot;: [&quot;overlay2.override_kernel_check=true&quot;]
}
EOF</span>
systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span> <span class="token operator">&amp;&amp;</span> systemctl daemon-reload <span class="token operator">&amp;&amp;</span> systemctl restart <span class="token function">docker</span> <span class="token operator">&amp;&amp;</span> systemctl status <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="kubernetes-安装" tabindex="-1"><a class="header-anchor" href="#kubernetes-安装" aria-hidden="true">#</a> Kubernetes-安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 下载阿⾥云的k8s源</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span> /etc/yum.repos.d/kubernetes.repo</span>
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg  https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF</span>
setenforce <span class="token number">0</span>
<span class="token comment">## 查看仓库软件⽀持版本</span>
yum list kubelet <span class="token parameter variable">--showduplicates</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-r</span>
<span class="token comment">## 指定版本进⾏部署，（所有节点全部进⾏此操作）</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> kubelet-1.20.6 kubeadm-1.20.6 kubectl-1.20.6
<span class="token comment">## 为了实现docker使用的cgroupdriver与kubelet使用的cgroup的一致性，建议修改如下文件内容。</span>
<span class="token comment"># vim /etc/sysconfig/kubelet</span>
<span class="token comment"># KUBELET_EXTRA_ARGS=&quot;--cgroup-driver=systemd&quot;</span>
<span class="token comment">## 将kubelet设置为开机⾃启动</span>
systemctl <span class="token builtin class-name">enable</span> kubelet <span class="token operator">&amp;&amp;</span> systemctl start kubelet <span class="token operator">&amp;&amp;</span> systemctl status kubelet
<span class="token comment">## 查看日志 服务不正常先不用管，初始化节点完毕就可以了</span>
journalctl <span class="token parameter variable">-xefu</span> kubelet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="kubernetes-主节点" tabindex="-1"><a class="header-anchor" href="#kubernetes-主节点" aria-hidden="true">#</a> Kubernetes-主节点</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 初始化Master</span>
kubeadm init <span class="token punctuation">\\</span>
  --kubernetes-version<span class="token operator">=</span>v1.20.6 <span class="token punctuation">\\</span>
  --image-repository<span class="token operator">=</span>registry.aliyuncs.com/google_containers <span class="token punctuation">\\</span>
  --pod-network-cidr<span class="token operator">=</span><span class="token number">10.244</span>.0.0/16 <span class="token punctuation">\\</span>
  --service-cidr<span class="token operator">=</span><span class="token number">10.96</span>.0.0/12 <span class="token punctuation">\\</span>
  --ignore-preflight-errors<span class="token operator">=</span>Swap
<span class="token comment">## 初始化后执⾏提示的命令，如下命令</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
<span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config
<span class="token comment">## 下面这个不执行，要保存，从节点需要</span>
kubeadm <span class="token function">join</span> <span class="token number">192.168</span>.20.96:6443 <span class="token parameter variable">--token</span> pd4vie.ubvalbx3l3s3sirg <span class="token punctuation">\\</span>
    --discovery-token-ca-cert-hash sha256:5b83e7f22065bd29adaa59398a1df0cea8ef86ab6ab284620985a53ef3b14ebf
<span class="token comment">## 初始化完成查看节点的状态，为notready，这时状态是应为⽹络插件为安装</span>
kubectl get nodes
<span class="token comment">## flannel插件</span>
<span class="token function">wget</span> https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
kubectl apply <span class="token parameter variable">-f</span> kube-flannel.yml
<span class="token comment">## 再次查看node信息Ready即可，可能需要等一会</span>
kubectl get nodes
<span class="token comment">## 查看系统名称空间，下的k8s核⼼组件运⾏状态</span>
kubectl get pod <span class="token parameter variable">-n</span> kube-system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="kubernetes-从节点" tabindex="-1"><a class="header-anchor" href="#kubernetes-从节点" aria-hidden="true">#</a> Kubernetes-从节点</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 初始化 执行master节点初始化的结果输出 参考上面</span>
kubeadm <span class="token function">join</span> <span class="token number">192.168</span>.20.96:6443 <span class="token parameter variable">--token</span> pd4vie.ubvalbx3l3s3sirg <span class="token punctuation">\\</span>
    --discovery-token-ca-cert-hash sha256:5b83e7f22065bd29adaa59398a1df0cea8ef86ab6ab284620985a53ef3b14ebf
<span class="token comment">## 查看集群运⾏状态，到此安装完成</span>
kubectl get nodes <span class="token parameter variable">-o</span> wide
<span class="token comment">## token丢失了，可以使⽤如下命令来重新⽣成</span>
<span class="token comment">#kubeadm token create --print-join-command</span>

<span class="token comment">## 报错解决: localhost:8080 was refused - did you specify the right host or</span>
<span class="token comment">## 从主节点拷贝到从节点</span>
<span class="token function">scp</span> <span class="token parameter variable">-r</span> /etc/kubernetes/admin.conf root@192.168.10.95:/etc/kubernetes/admin.conf
<span class="token function">scp</span> <span class="token parameter variable">-r</span> /etc/kubernetes/admin.conf root@192.168.10.94:/etc/kubernetes/admin.conf
<span class="token comment">## 添加到环境变量</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;export KUBECONFIG=/etc/kubernetes/admin.conf&quot;</span> <span class="token operator">&gt;&gt;</span> ~/.bash_profile <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">source</span> ~/.bash_profile
<span class="token comment">## 查看运行情况</span>
kubectl get pod <span class="token parameter variable">-o</span> wide <span class="token parameter variable">-n</span> kube-system
<span class="token comment">## K8S安装完毕</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nfs-安装" tabindex="-1"><a class="header-anchor" href="#nfs-安装" aria-hidden="true">#</a> NFS 安装</h2>`,13),_=s("code",null,"kubesphere",-1),q={href:"https://kubesphere.io/zh/docs/installing-on-kubernetes/introduction/prerequisites/",target:"_blank",rel:"noopener noreferrer"},x=s("br",null,null,-1),w=s("code",null,"StorageClass",-1),S=s("code",null,"kubectl get sc",-1),E=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 提示 No resources found in default namespace.</span>
kubectl get storageclass

<span class="token comment">## 在K8S主节点安装NFS-Server</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> nfs-utils
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;&gt;</span> /etc/exports</span>
/nfs/data *(rw,sync,no_root_squash)
EOF</span>
<span class="token comment"># 创建共享⽬录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /nfs/data
systemctl start rpcbind <span class="token operator">&amp;&amp;</span> systemctl <span class="token builtin class-name">enable</span> rpcbind <span class="token operator">&amp;&amp;</span> systemctl status rpcbind
systemctl start nfs-server <span class="token operator">&amp;&amp;</span> systemctl <span class="token builtin class-name">enable</span> nfs-server <span class="token operator">&amp;&amp;</span> systemctl status nfs-server
<span class="token comment"># 查看是否挂载成功</span>
showmount <span class="token parameter variable">-e</span>
<span class="token comment">## 下载安装⽂件</span>
<span class="token function">mkdir</span> /root/nfsvolume <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> /root/nfsvolume
<span class="token comment"># 在command最后加入 - --feature-gates=RemoveSelfLink=false</span>
<span class="token function">vi</span> /etc/kubernetes/manifests/kube-apiserver.yaml
<span class="token comment">## （推荐 修改过的）http://git.devops.tr/bedrock/bedrock-deploy/-/tree/main/kubernetes/nfs</span>
<span class="token comment">## （参考 可以不下载）https://github.com/kubernetes-sigs/nfs-subdir-external-provisioner/tree/master/deploy</span>
<span class="token comment">## 将 class.yaml、deployment.yaml、rbac.yaml 这个三个文件拷贝到目录中</span>
<span class="token comment">## 在deployment.yaml中修改nfs的ip与⽂件⽬录</span>
kubectl create <span class="token parameter variable">-f</span> rbac.yaml <span class="token parameter variable">-f</span> deployment.yaml <span class="token parameter variable">-f</span> class.yaml
<span class="token comment">## 成功runing即可</span>
kubectl get pod <span class="token parameter variable">-n</span> storage

<span class="token comment">## 在K8S从节点安装NFS-Client</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> nfs-utils
systemctl start nfs-utils <span class="token operator">&amp;&amp;</span> systemctl <span class="token builtin class-name">enable</span> nfs-utils <span class="token operator">&amp;&amp;</span> systemctl status nfs-utils
rpcinfo <span class="token parameter variable">-p</span>
<span class="token comment">## 测试挂载到nfs-server上去</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /data <span class="token operator">&amp;&amp;</span> <span class="token function">mount</span> <span class="token parameter variable">-t</span> nfs <span class="token number">192.168</span>.20.96:/nfs/data /data

<span class="token comment">## 安装之后，在K8S主节点操作</span>
kubectl get pod
<span class="token comment">## managed-nfs-storage 运行正常（Running）后执行下面</span>
kubectl get storageclass
<span class="token comment">## 设置为默认SC</span>
kubectl patch storageclass nfs-storage <span class="token parameter variable">-p</span> <span class="token string">&#39;{&quot;metadata&quot;:{&quot;annotations&quot;:{&quot;storageclass.kubernetes.io/is-default-class&quot;:&quot;true&quot;}}}&#39;</span>
kubectl get sc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装-kubesphere" tabindex="-1"><a class="header-anchor" href="#安装-kubesphere" aria-hidden="true">#</a> 安装 kubesphere</h2>`,2),F={href:"https://kubesphere.io/zh/docs/installing-on-kubernetes/introduction/prerequisites/",target:"_blank",rel:"noopener noreferrer"},O={href:"https://kubesphere.io/zh/docs/quick-start/minimal-kubesphere-on-k8s/",target:"_blank",rel:"noopener noreferrer"},K=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 执行以下命令开始安装</span>
<span class="token function">wget</span> https://github.com/kubesphere/ks-installer/releases/download/v3.2.1/kubesphere-installer.yaml
<span class="token function">wget</span> https://github.com/kubesphere/ks-installer/releases/download/v3.2.1/cluster-configuration.yaml
kubectl apply <span class="token parameter variable">-f</span> kubesphere-installer.yaml
kubectl apply <span class="token parameter variable">-f</span> cluster-configuration.yaml
<span class="token comment">## 检查安装日志</span>
kubectl logs <span class="token parameter variable">-n</span> kubesphere-system <span class="token variable"><span class="token variable">$(</span>kubectl get pod <span class="token parameter variable">-n</span> kubesphere-system <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>ks-install <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">&#39;{.items[0].metadata.name}&#39;</span><span class="token variable">)</span></span> <span class="token parameter variable">-f</span>
<span class="token comment">## 查看所有 Pod 是否在 KubeSphere 的相关命名空间中正常运行</span>
kubectl get pod --all-namespaces
<span class="token comment">## 使用默认帐户和密码 (admin/P@88w0rd) 访问 http://192.168.20.96:30880</span>
kubectl get svc/ks-console <span class="token parameter variable">-n</span> kubesphere-system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="卸载-kubesphere" tabindex="-1"><a class="header-anchor" href="#卸载-kubesphere" aria-hidden="true">#</a> 卸载 kubesphere</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 参考官网地址: https://kubesphere.io/zh/docs/installing-on-kubernetes/uninstall-kubesphere-from-k8s/</span>
<span class="token function">wget</span> https://raw.githubusercontent.com/kubesphere/ks-installer/release-3.1/scripts/kubesphere-delete.sh
<span class="token function">sh</span> kubesphere-delete.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function z(N,j){const a=r("router-link"),t=r("ExternalLinkIcon");return c(),p("div",null,[d(" more "),s("nav",u,[s("ul",null,[s("li",null,[e(a,{to:"#官网地址"},{default:l(()=>[n("官网地址")]),_:1})]),s("li",null,[e(a,{to:"#环境准备"},{default:l(()=>[n("环境准备")]),_:1})]),s("li",null,[e(a,{to:"#节点规划"},{default:l(()=>[n("节点规划")]),_:1})]),s("li",null,[e(a,{to:"#docker-安装"},{default:l(()=>[n("docker 安装")]),_:1})]),s("li",null,[e(a,{to:"#kubernetes-安装"},{default:l(()=>[n("Kubernetes-安装")]),_:1})]),s("li",null,[e(a,{to:"#kubernetes-主节点"},{default:l(()=>[n("Kubernetes-主节点")]),_:1})]),s("li",null,[e(a,{to:"#kubernetes-从节点"},{default:l(()=>[n("Kubernetes-从节点")]),_:1})]),s("li",null,[e(a,{to:"#nfs-安装"},{default:l(()=>[n("NFS 安装")]),_:1})]),s("li",null,[e(a,{to:"#安装-kubesphere"},{default:l(()=>[n("安装 kubesphere")]),_:1})]),s("li",null,[e(a,{to:"#卸载-kubesphere"},{default:l(()=>[n("卸载 kubesphere")]),_:1})])])]),v,s("ul",null,[s("li",null,[s("a",b,[n("Kubernetes 官网"),e(t)])]),s("li",null,[s("a",k,[n("Kubernetes 官网文档"),e(t)])]),s("li",null,[s("a",h,[n("Kubernetes github"),e(t)])]),s("li",null,[s("a",f,[n("kubesphere"),e(t)])]),s("li",null,[s("a",g,[n("kubesphere 文档"),e(t)])])]),y,s("blockquote",null,[s("p",null,[n("为安装"),_,n("做准备，参考："),s("a",q,[n("https://kubesphere.io/zh/docs/installing-on-kubernetes/introduction/prerequisites/"),e(t)]),x,n(" Kubernetes 集群已配置默认"),w,n("（请使用 "),S,n(" 进行确认）。")])]),E,s("blockquote",null,[s("p",null,[n("安装前准备: "),s("a",F,[n("https://kubesphere.io/zh/docs/installing-on-kubernetes/introduction/prerequisites/"),e(t)])]),s("p",null,[n("参考官方文档: "),s("a",O,[n("https://kubesphere.io/zh/docs/quick-start/minimal-kubesphere-on-k8s/"),e(t)])])]),K])}const I=o(m,[["render",z],["__file","15.k8s安装-kubeadm.html.vue"]]);export{I as default};
