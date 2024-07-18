import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as d,c as r,e as p,a as n,d as e,w as i,b as s,f as c}from"./app-efa5e96e.js";const m={},v={class:"table-of-contents"},u=c(`<h2 id="环境准备" tabindex="-1"><a class="header-anchor" href="#环境准备" aria-hidden="true">#</a> 环境准备</h2><ul><li>节点 CPU 核数必须是 ：&gt;= 2 核 ，否则 k8s 无法启动</li><li>DNS 网络： 最好设置为 本地网络连通的 DNS,否则网络不通，无法下载一些镜像</li><li>linux 内核： linux 内核必须是 4 版本以上，因此必须把 linux 核心进行升级</li></ul><blockquote><p>准备 3 台虚拟机环境，或者是 3 台阿里云服务器都可。</p></blockquote><ul><li>k8s-master01: 此机器用来安装 k8s-master 的操作环境</li><li>k8s-node01: 此机器用来安装 k8s node 节点的环境</li><li>k8s-node02: 此机器用来安装 k8s node 节点的环境</li></ul><h2 id="依赖环境" tabindex="-1"><a class="header-anchor" href="#依赖环境" aria-hidden="true">#</a> 依赖环境</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装依赖环境，注意：每一台机器都需要安装此依赖环境</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> conntrack ntpdate ntp ipvsadm ipset jq iptables <span class="token function">curl</span> sysstat libseccomp <span class="token function">wget</span> <span class="token function">vim</span> net-tools <span class="token function">git</span> iproute lrzsz bash-completion tree bridge-utils <span class="token function">unzip</span> bind-utils gcc

<span class="token comment"># 关闭防火墙firewalld</span>
systemctl stop firewalld <span class="token operator">&amp;&amp;</span> systemctl disable firewalld
<span class="token comment"># 安装iptables &amp;&amp; 启动iptables &amp;&amp; 开机自启 &amp;&amp; 清空iptables规则 &amp;&amp; 保存配置</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> iptables-services <span class="token operator">&amp;&amp;</span> systemctl start iptables <span class="token operator">&amp;&amp;</span> systemctl <span class="token builtin class-name">enable</span> iptables <span class="token operator">&amp;&amp;</span> iptables <span class="token parameter variable">-F</span> <span class="token operator">&amp;&amp;</span> <span class="token function">service</span> iptables save

<span class="token comment"># 关闭swap分区【虚拟内存】并且永久关闭虚拟内存</span>
swapoff <span class="token parameter variable">-a</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;/ swap / s/^\\(.*\\)$/#\\1/g&#39;</span> /etc/fstab
<span class="token comment"># 关闭selinux</span>
setenforce <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/^SELINUX=.*/SELINUX=disabled/&#39;</span> /etc/selinux/config

<span class="token comment"># 升级Linux内核版本</span>
<span class="token function">rpm</span> <span class="token parameter variable">-Uvh</span> http://www.elrepo.org/elrepo-release-7.0-4.el7.elrepo.noarch.rpm
<span class="token comment"># 安装内核</span>
yum <span class="token parameter variable">--enablerepo</span><span class="token operator">=</span>elrepo-kernel <span class="token function">install</span> <span class="token parameter variable">-y</span> kernel-lt
<span class="token comment"># 查询已安装的内核</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> kernel
<span class="token comment"># 查看默认启动项</span>
<span class="token function">awk</span> -F<span class="token punctuation">\\</span>&#39; <span class="token string">&#39;$1==&quot;menuentry &quot; {print $2}&#39;</span> /etc/grub2.cfg
<span class="token comment"># 设置开机从新内核启动</span>
<span class="token comment"># grub2-set-default &#39;CentOS Linux (4.4.189-1.el7.elrepo.x86_64) 7 (Core)&#39;</span>
<span class="token comment"># 上述命令不生效，可执行下面的命令设置默认启动</span>
<span class="token comment"># 默认启动的顺序是从0开始（CentOS Linux (3.10.0-1127.el7.x86_64) 7），新内核是从头插入，所以需要选择0</span>
grub2-set-default <span class="token number">0</span>
<span class="token comment"># 注意：设置完内核后，需要重启服务器才会生效。</span>
<span class="token function">reboot</span>
<span class="token comment"># 查询内核 4.4.249-1.el7.elrepo.x86_64</span>
<span class="token function">uname</span> <span class="token parameter variable">-r</span>

<span class="token comment"># 调整内核参数，对于k8s</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /root/kubernetes.conf <span class="token operator">&lt;&lt;</span><span class="token string">EOF
net.bridge.bridge-nf-call-iptables=1
net.bridge.bridge-nf-call-ip6tables=1
net.ipv4.ip_forward=1
net.ipv4.tcp_tw_recycle=0
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
<span class="token function">cp</span> /root/kubernetes.conf /etc/sysctl.d/kubernetes.conf
<span class="token comment"># 手动刷新，让优化文件立即生效</span>
<span class="token function">sysctl</span> <span class="token parameter variable">-p</span> /etc/sysctl.d/kubernetes.conf

<span class="token comment">#########################################################################</span>

<span class="token comment"># 设置系统时区为中国/上海（可略过）</span>
timedatectl set-timezone Asia/Shanghai
<span class="token comment"># 将当前的 UTC 时间写入硬件时钟（可略过）</span>
timedatectl set-local-rtc <span class="token number">0</span>
<span class="token comment"># 重启依赖于系统时间的服务（可略过）</span>
systemctl restart rsyslog
systemctl restart crond

<span class="token comment"># 关闭系统不需要的服务</span>
systemctl stop postfix <span class="token operator">&amp;&amp;</span> systemctl disable postfix

<span class="token comment">#########################################################################</span>

<span class="token comment"># 设置日志保存方式</span>
<span class="token comment"># 1）.创建保存日志的目录</span>
<span class="token function">mkdir</span> /var/log/journal
<span class="token comment"># 2）.创建配置文件存放目录</span>
<span class="token function">mkdir</span> /etc/systemd/journald.conf.d
<span class="token comment"># 3）.创建配置文件</span>
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
<span class="token comment"># 4）.重启systemd journald的配置</span>
systemctl restart systemd-journald

<span class="token comment">#########################################################################</span>

<span class="token comment"># 打开文件数调整 (忽略，不执行，使用默认即可)</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;* soft nofile 65536&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/security/limits.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;* hard nofile 65536&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/security/limits.conf

<span class="token comment"># kube-proxy 开启 ipvs 前置条件</span>
modprobe br_netfilter

<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/sysconfig/modules/ipvs.modules <span class="token operator">&lt;&lt;</span><span class="token string">EOF
#!/bin/bash
modprobe -- ip_vs
modprobe -- ip_vs_rr
modprobe -- ip_vs_wrr
modprobe -- ip_vs_sh
modprobe -- nf_conntrack_ipv4
EOF</span>

<span class="token comment"># 使用lsmod命令查看这些文件是否被引导</span>
<span class="token function">chmod</span> <span class="token number">755</span> /etc/sysconfig/modules/ipvs.modules <span class="token operator">&amp;&amp;</span> <span class="token function">bash</span> /etc/sysconfig/modules/ipvs.modules <span class="token operator">&amp;&amp;</span> lsmod <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-e</span> ip_vs <span class="token parameter variable">-e</span> nf_conntrack_ipv4

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-依赖安装" tabindex="-1"><a class="header-anchor" href="#docker-依赖安装" aria-hidden="true">#</a> docker 依赖安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装docker</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils device-mapper-persistent-data lvm2

<span class="token comment"># 紧接着配置一个稳定（stable）的仓库、仓库配置会保存到/etc/yum.repos.d/docker-ce.repo文件中</span>
<span class="token comment"># yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo</span>
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

<span class="token comment">#更新Yum安装的相关Docke软件包&amp;安装Docker CE</span>
yum update <span class="token parameter variable">-y</span> <span class="token operator">&amp;&amp;</span> yum <span class="token function">install</span> docker-ce

<span class="token comment"># 设置docker daemon文件</span>
<span class="token comment"># 1) 创建/etc/docker目录</span>
<span class="token function">mkdir</span> /etc/docker
<span class="token comment"># 2) 更新daemon.json文件</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;</span><span class="token string">EOF
{&quot;exec-opts&quot;: [&quot;native.cgroupdriver=systemd&quot;],&quot;log-driver&quot;: &quot;json-file&quot;,&quot;log-opts&quot;: {&quot;max-size&quot;: &quot;100m&quot;}}
EOF</span>
<span class="token comment"># 注意： 一定注意编码问题，出现错误：查看命令：journalctl -amu  docker 即可发现错误</span>

<span class="token comment"># 创建，存储docker配置文件</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/systemd/system/docker.service.d

<span class="token comment"># 重启docker服务</span>
systemctl daemon-reload <span class="token operator">&amp;&amp;</span> systemctl restart <span class="token function">docker</span> <span class="token operator">&amp;&amp;</span> systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="kubeadm" tabindex="-1"><a class="header-anchor" href="#kubeadm" aria-hidden="true">#</a> kubeadm</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装kubernetes的时候，需要安装kubelet, kubeadm等包，但k8s官网给的yum源是packages.cloud.google.com，国内访问不了，此时我们可以使用阿里云的yum仓库镜像。</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span> /etc/yum.repos.d/kubernetes.repo</span>
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
       http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF</span>

<span class="token comment"># 安装kubeadm、kubelet、kubectl</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> kubeadm-1.15.1 kubelet-1.15.1 kubectl-1.15.1
<span class="token comment"># 启动 kubelet</span>
systemctl <span class="token builtin class-name">enable</span> kubelet <span class="token operator">&amp;&amp;</span> systemctl start kubelet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="集群安装" tabindex="-1"><a class="header-anchor" href="#集群安装" aria-hidden="true">#</a> 集群安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看所依赖的docker镜像（需要联网）</span>
kubeadm config images list
<span class="token comment"># 如下示例</span>
k8s.gcr.io/kube-apiserver:v1.15.1
k8s.gcr.io/kube-controller-manager:v1.15.1
k8s.gcr.io/kube-scheduler:v1.15.1
k8s.gcr.io/kube-proxy:v1.15.1
k8s.gcr.io/pause:3.1
k8s.gcr.io/etcd:3.3.10
k8s.gcr.io/coredns:1.3.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 下载镜像</span>
<span class="token function">docker</span> pull k8s.gcr.io/kube-apiserver:v1.15.1
<span class="token function">docker</span> pull k8s.gcr.io/kube-controller-manager:v1.15.1
<span class="token function">docker</span> pull k8s.gcr.io/kube-scheduler:v1.15.1
<span class="token function">docker</span> pull k8s.gcr.io/kube-proxy:v1.15.1
<span class="token function">docker</span> pull k8s.gcr.io/pause:3.1
<span class="token function">docker</span> pull k8s.gcr.io/etcd:3.3.10
<span class="token function">docker</span> pull k8s.gcr.io/coredns:1.3.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>kubeadm 初始化 k8s 集群的时候，会从 gce Google 云中下载（pull）相应的镜像,且镜像相对比较大，下载比较慢，且需要解决科学上网的一个问题，国内上 goole，懂得...</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 编写批量导入本地的镜像脚本（sh脚本文件：image-load.sh）</span>

<span class="token comment">#!/bin/bash</span>
<span class="token comment">#注意 镜像解压的目录位置</span>
<span class="token function">ls</span> /root/kubeadm-basic.images <span class="token operator">&gt;</span> /tmp/images-list.txt
<span class="token builtin class-name">cd</span> /root/kubeadm-basic.images
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">cat</span> /tmp/images-list.txt<span class="token variable">)</span></span>
<span class="token keyword">do</span>
  <span class="token function">docker</span> load <span class="token parameter variable">-i</span> <span class="token variable">$i</span>
<span class="token keyword">done</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /tmp/images-list.txt

<span class="token comment">#########################################################################</span>

<span class="token comment"># 修改权限，可执行权限</span>
<span class="token function">chmod</span> <span class="token number">755</span> image-load.sh
<span class="token comment"># 开始执行,镜像导入</span>
./image-load.sh
<span class="token comment"># 导入成功后查看镜像文件</span>
<span class="token function">docker</span> images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="复制三个虚拟机" tabindex="-1"><a class="header-anchor" href="#复制三个虚拟机" aria-hidden="true">#</a> 复制三个虚拟机</h2><blockquote><p>复制 1 个 master（192.16.18.111）</p><p>复制 2 个 node（192.16.18.112/192.16.18.113）</p><p>注意启动的时候，看好内核选择，要选择 4.4.249-1.el7.elrepo.x86_64</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 分别设置hostname</span>
hostnamectl set-hostname k8s-master-111
hostnamectl set-hostname k8s-node-112
hostnamectl set-hostname k8s-node-113

<span class="token comment"># 查看机器的hostname</span>
<span class="token function">hostname</span>
<span class="token comment"># 设置hosts文件，追加三台机器（三台机器都要设置）</span>
<span class="token function">vi</span> /etc/hosts
<span class="token number">192.16</span>.18.111 k8s-master-111
<span class="token number">192.16</span>.18.112 k8s-node-112
<span class="token number">192.16</span>.18.113 k8s-node-113

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="k8s-部署-只需要在主节点执行" tabindex="-1"><a class="header-anchor" href="#k8s-部署-只需要在主节点执行" aria-hidden="true">#</a> k8s 部署（只需要在主节点执行）</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 拉去yaml资源配置文件</span>
kubeadm config print init-defaults <span class="token operator">&gt;</span> kubeadm-config.yaml

<span class="token comment"># 修改yaml资源文件</span>
localAPIEndpoint:
  advertiseAddress: <span class="token number">192.168</span>.66.10     <span class="token comment"># 注意：修改配置文件的IP地址</span>
kubernetesVersion: v1.15.1            <span class="token comment">#注意：修改版本号，必须和kubectl版本保持一致</span>
networking:
  podSubnet: <span class="token string">&quot;10.244.0.0/16&quot;</span>          <span class="token comment"># 指定flannel模型通信 pod网段地址,此网段和flannel网段一致</span>
  serviceSubnet: <span class="token string">&quot;10.96.0.0/12&quot;</span>
<span class="token comment"># 追加如下，指定使用ipvs网络进行通信</span>
---
apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: kubeProxyConfiguration
featureGates:
  SupportIPVSProxyMode: <span class="token boolean">true</span>
mode: ipvs

<span class="token comment"># 初始化主节点，开始部署</span>
kubeadm init <span class="token parameter variable">--config</span><span class="token operator">=</span>kubeadm-config.yaml --experimental-upload-certs <span class="token operator">|</span> <span class="token function">tee</span> kubeadm-init.log
<span class="token comment"># 注意：执行此命令，CPU核心数量必须大于1核，否则无法执行成功</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>按照 k8s 指示，执行下面的命令：</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 初始化成功后执行如下命令</span>
<span class="token comment"># 创建目录，保存连接配置缓存，认证文件</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
<span class="token comment"># 拷贝集群管理配置文件</span>
<span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
<span class="token comment"># 授权给配置文件</span>
<span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get <span class="token function">node</span>
<span class="token comment"># 执行上面的命令会显示 k8s-master-111   NotReady   master   2m17s   v1.15.1</span>
<span class="token comment"># 我们发现已经可以成功查询node节点信息了，但是节点的状态却是NotReady,不是Runing的状态。原因是此时我们使用ipvs+flannel的方式进行网络通信，但是flannel网络插件还没有部署，因此节点状态此时为NotReady</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="flannel-插件" tabindex="-1"><a class="header-anchor" href="#flannel-插件" aria-hidden="true">#</a> flannel 插件</h2>`,24),b={href:"https://blog.csdn.net/chen_haoren/article/details/108580338",target:"_blank",rel:"noopener noreferrer"},k=c(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#部署flannel网络插件 --- 只需要在主节点执行</span>
<span class="token comment"># 下载flannel网络插件</span>
<span class="token function">wget</span> https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
<span class="token comment"># 部署flannel</span>
kubectl create <span class="token parameter variable">-f</span> kube-flannel.yml
<span class="token comment"># 查看flannel是否下载完毕，Running标识下载完成</span>
kubectl get pod <span class="token parameter variable">-n</span> kube-system
<span class="token comment"># 下载完毕，再次查看node</span>
kubectl get <span class="token function">node</span>
<span class="token comment"># 按照k8s指示，再node节点执行下面的命令：(命令会有差异，根据自身的机器提示来执行)</span>
<span class="token comment"># 找不到此命令，可再日志文件中查看：\`cat kubeadm-init.log\`</span>
kubeadm <span class="token function">join</span> <span class="token number">192.16</span>.18.111:6443 <span class="token parameter variable">--token</span> abcdef.0123456789abcdef <span class="token punctuation">\\</span>
    --discovery-token-ca-cert-hash sha256:aecd3ce263208637621c846a37ce3651a6ddf6c3daaa89fb679803a733261e7e
<span class="token comment"># 查看节点，其他的node已经添加进来，发现还有一些节点处于NotReady状态，是因为这些节点pod容器还处于初始化的状态，需要等一点时间：</span>
kubectl get <span class="token function">node</span>

<span class="token comment"># 查询工作空间中pod容器的详细信息</span>
kubectl get pod <span class="token parameter variable">-n</span> kube-system <span class="token parameter variable">-o</span> wide

<span class="token comment"># 也可进行部署网络（略过）</span>
<span class="token comment"># kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function f(g,h){const a=l("router-link"),t=l("ExternalLinkIcon");return d(),r("div",null,[p(" more "),n("nav",v,[n("ul",null,[n("li",null,[e(a,{to:"#环境准备"},{default:i(()=>[s("环境准备")]),_:1})]),n("li",null,[e(a,{to:"#依赖环境"},{default:i(()=>[s("依赖环境")]),_:1})]),n("li",null,[e(a,{to:"#docker-依赖安装"},{default:i(()=>[s("docker 依赖安装")]),_:1})]),n("li",null,[e(a,{to:"#kubeadm"},{default:i(()=>[s("kubeadm")]),_:1})]),n("li",null,[e(a,{to:"#集群安装"},{default:i(()=>[s("集群安装")]),_:1})]),n("li",null,[e(a,{to:"#复制三个虚拟机"},{default:i(()=>[s("复制三个虚拟机")]),_:1})]),n("li",null,[e(a,{to:"#k8s-部署-只需要在主节点执行"},{default:i(()=>[s("k8s 部署（只需要在主节点执行）")]),_:1})]),n("li",null,[e(a,{to:"#flannel-插件"},{default:i(()=>[s("flannel 插件")]),_:1})])])]),u,n("blockquote",null,[n("p",null,[s("遇到下载不了的问题，请参考："),n("a",b,[s("部署 k8s 的时候 kube-flannel.yml 下载不下来解决 8"),e(t)])])]),k])}const x=o(m,[["render",f],["__file","14.k8s安装-集群搭建.html.vue"]]);export{x as default};
