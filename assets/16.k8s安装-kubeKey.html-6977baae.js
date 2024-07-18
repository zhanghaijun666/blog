import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as m,c as u,a as s,b as a,d as n,e as v,w as e,f as i}from"./app-efa5e96e.js";const k="/blog/assets/kubesphere-federation-09532544.png",b="/blog/assets/ks-apiserver-45553c90.png",h="/blog/assets/harbor-https-3c5ef5e6.png",f={},g=s("p",null,"KubeSphere 是在 Kubernetes 之上构建的面向云原生应用的分布式操作系统，完全开源，支持多云与多集群管理，提供全栈的 IT 自动化运维能力，简化企业的 DevOps 工作流",-1),_={href:"https://kubesphere.io/zh/",target:"_blank",rel:"noopener noreferrer"},y={href:"https://www.bookstack.cn/read/kubesphere-3.3-zh/b22a6268e9a598a2.md",target:"_blank",rel:"noopener noreferrer"},x={class:"table-of-contents"},w=s("h2",{id:"一、参考地址",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#一、参考地址","aria-hidden":"true"},"#"),a(" 一、参考地址")],-1),q={href:"https://kubesphere.io/zh/docs/v3.3/installing-on-linux/introduction/multioverview/",target:"_blank",rel:"noopener noreferrer"},E=s("h2",{id:"二、安装前准备",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#二、安装前准备","aria-hidden":"true"},"#"),a(" 二、安装前准备")],-1),K=s("h3",{id:"_1-系统准备",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_1-系统准备","aria-hidden":"true"},"#"),a(" 1. 系统准备")],-1),z={href:"http://mirrors.aliyun.com/centos/7/isos/x86_64/",target:"_blank",rel:"noopener noreferrer"},A=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 查看 centos 系统版本命令：</span>
<span class="token function">cat</span> /etc/centos-release
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-系统硬件检查" tabindex="-1"><a class="header-anchor" href="#_2-系统硬件检查" aria-hidden="true">#</a> 2. 系统硬件检查</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 检查 CPU 核心数：</span>
<span class="token function">cat</span> /proc/cpuinfo <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;processor&quot;</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>
<span class="token comment">## 检查内存大小：</span>
<span class="token function">cat</span> /proc/meminfo <span class="token operator">|</span> <span class="token function">grep</span> MemTotal
<span class="token comment">## 检查可用磁盘大小：</span>
<span class="token function">df</span> <span class="token parameter variable">-hl</span>
<span class="token comment">## 检查服务器节点磁盘分区：</span>
lsblk <span class="token parameter variable">-f</span>
<span class="token comment">## 服务器架构</span>
<span class="token function">uname</span> <span class="token parameter variable">-m</span>

<span class="token comment">## 服务器节点需要支持虚拟化。如果服务器节点不支持虚拟化，KSV 将以模拟模式运行。该模式将占用更多资源，且虚拟机相关模块无法使用。</span>
<span class="token comment">## 检查服务器节点是否支持虚拟化（若无回显则不支持虚拟化）：</span>
<span class="token comment"># x86 架构：</span>
<span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token string">&#39;(svm|vmx)&#39;</span> /proc/cpuinfo
<span class="token comment"># ARM64 架构</span>
<span class="token function">ls</span> /dev/kvm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-系统内核检查" tabindex="-1"><a class="header-anchor" href="#_3-系统内核检查" aria-hidden="true">#</a> 3. 系统内核检查</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 检查操作系统内核，低于4.7 请升级内核</span>
<span class="token function">uname</span> <span class="token parameter variable">-r</span>

<span class="token comment">## 升级Linux内核版本</span>
<span class="token function">rpm</span> <span class="token parameter variable">-Uvh</span> http://www.elrepo.org/elrepo-release-7.0-4.el7.elrepo.noarch.rpm
yum <span class="token parameter variable">--enablerepo</span><span class="token operator">=</span>elrepo-kernel <span class="token function">install</span> <span class="token parameter variable">-y</span> kernel-lt
<span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> kernel
<span class="token function">awk</span> -F<span class="token punctuation">\\</span>&#39; <span class="token string">&#39;$1==&quot;menuentry &quot; {print $2}&#39;</span> /etc/grub2.cfg
grub2-set-default <span class="token number">0</span>
<span class="token comment"># 注意：设置完内核后，需要重启服务器才会生效。</span>
<span class="token function">reboot</span>
<span class="token function">uname</span> <span class="token parameter variable">-r</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-yum-源" tabindex="-1"><a class="header-anchor" href="#_4-yum-源" aria-hidden="true">#</a> 4. yum 源</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1.下载安装wget</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token function">wget</span>
<span class="token comment"># 2.备份默认的yum</span>
<span class="token function">mv</span> /etc/yum.repos.d /etc/yum.repos.d.backup <span class="token operator">&amp;&amp;</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/yum.repos.d
<span class="token comment"># 3.下载阿里yum配置到该目录中，选择对应版本</span>
<span class="token function">wget</span> <span class="token parameter variable">-O</span> /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
<span class="token comment"># 4.更新epel源为阿里云epel源</span>
<span class="token function">wget</span> <span class="token parameter variable">-O</span> /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> http://mirrors.aliyun.com/epel/epel-release-latest-7.noarch.rpm
<span class="token comment"># 5.重建缓存</span>
<span class="token comment">#yum clean all yum makecache</span>
<span class="token comment"># 6.看一下yum仓库有多少包</span>
<span class="token comment">#yum repolist</span>
yum update

<span class="token comment">## 安装必要的依赖</span>
yum <span class="token parameter variable">-y</span> update <span class="token operator">&amp;&amp;</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token function">curl</span> tree net-tools <span class="token function">lsof</span> <span class="token function">htop</span> openssl openssl-devel socat conntrack ebtables ipset lvm2 ipvsadm  yum-utils chrony epel-release conntrack-tools
<span class="token comment"># 命令补全</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> bash-completion bash-completion-extras <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">source</span> /etc/profile.d/bash_completion.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-时间同步" tabindex="-1"><a class="header-anchor" href="#_5-时间同步" aria-hidden="true">#</a> 5. 时间同步</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> ntp ntpdate
<span class="token comment"># ntpdate cn.pool.ntp.org</span>
ntpdate time1.aliyun.com
hwclock <span class="token parameter variable">--systohc</span>
hwclock <span class="token parameter variable">-w</span>
<span class="token comment"># 时区不对的更改时区</span>
<span class="token function">mv</span> /etc/localtime /etc/localtime.bak
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
<span class="token function">date</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-系统参数设置" tabindex="-1"><a class="header-anchor" href="#_6-系统参数设置" aria-hidden="true">#</a> 6. 系统参数设置</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 关闭SELINUX 永久关闭需要修改SELINUX的配置文件</span>
setenforce <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/^SELINUX=.*/SELINUX=disabled/&#39;</span> /etc/selinux/config
<span class="token comment">## 打开文件数调整</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;* soft nofile 65536&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/security/limits.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;* hard nofile 65536&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/security/limits.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;* soft nproc 65535&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/security/limits.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;* hard nproc 65535&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/security/limits.conf
<span class="token comment">## 禁⽤交换分区</span>
swapoff <span class="token parameter variable">-a</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;/ swap / s/^\\(.*\\)$/#\\1/g&#39;</span> /etc/fstab
<span class="token comment">## 关闭防火墙</span>
systemctl disable firewalld <span class="token operator">&amp;&amp;</span> systemctl stop firewalld <span class="token operator">&amp;&amp;</span> systemctl status firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-hostname-设置" tabindex="-1"><a class="header-anchor" href="#_7-hostname-设置" aria-hidden="true">#</a> 7. hostname 设置</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 按照规划设置</span>
hostnamectl <span class="token parameter variable">--static</span> set-hostname k8s-node01
hostnamectl <span class="token parameter variable">--static</span> set-hostname k8s-node02
hostnamectl <span class="token parameter variable">--static</span> set-hostname k8s-node03
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、安装-docker" tabindex="-1"><a class="header-anchor" href="#三、安装-docker" aria-hidden="true">#</a> 三、安装 docker</h2><blockquote><p>离线安装可自动安装，无需手动安装</p><p>版本要求：19.3.8+</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## https://mirrors.aliyun.com/docker-ce/linux/static/stable/x86_64/docker-20.10.22.tgz</span>

<span class="token comment"># curl -sSL https://get.daocloud.io/docker | sh</span>
<span class="token comment"># systemctl start docker &amp;&amp; systemctl enable docker &amp;&amp; systemctl status docker</span>

yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils device-mapper-persistent-data lvm2
<span class="token comment">## 官方源</span>
<span class="token comment"># yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo</span>
yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
yum makecache fast
<span class="token comment">## 查看 docker 更新版本</span>
yum list docker-ce <span class="token parameter variable">--showduplicates</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-r</span>
<span class="token comment">#yum install docker-ce docker-ce-cli containerd.io</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> docker-ce-20.10.8 docker-ce-cli-20.10.8 containerd.io-1.4.6
systemctl start <span class="token function">docker</span> <span class="token operator">&amp;&amp;</span> systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span> <span class="token operator">&amp;&amp;</span> systemctl status <span class="token function">docker</span>

<span class="token comment"># docker加速配置</span>
<span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/docker
<span class="token function">sudo</span> <span class="token function">tee</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;-</span><span class="token string">&#39;EOF&#39;
{
  &quot;registry-mirrors&quot;: [&quot;https://82m9ar63.mirror.aliyuncs.com&quot;],
}
EOF</span>
<span class="token function">sudo</span> systemctl daemon-reload
<span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>

<span class="token comment">## 确保sudo可执行docker</span>
<span class="token function">sudo</span> <span class="token function">docker</span> version
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/local/bin/docker /usr/bin/docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、kubernetes集群部署" tabindex="-1"><a class="header-anchor" href="#四、kubernetes集群部署" aria-hidden="true">#</a> 四、Kubernetes集群部署</h2><blockquote><p>Kubernetes集群仅在其中一个节点操作即可，一般是Mater节点。</p></blockquote><h3 id="_1、kubekey下载" tabindex="-1"><a class="header-anchor" href="#_1、kubekey下载" aria-hidden="true">#</a> 1、KubeKey下载</h3>`,19),N={href:"https://github.com/kubesphere/kubekey/releases",target:"_blank",rel:"noopener noreferrer"},B=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 手动下载（推荐）</span>
<span class="token function">wget</span> https://github.com/kubesphere/kubekey/releases/download/v3.0.7/kubekey-v3.0.7-linux-amd64.tar.gz
<span class="token function">wget</span> https://kubernetes.pek3b.qingstor.com/kubekey/releases/download/v3.0.7/kubekey-v3.0.7-linux-amd64.tar.gz
<span class="token function">tar</span> xzvf kubekey-v3.0.7-linux-amd64.tar.gz

<span class="token comment">## 在线下载</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">KKZONE</span><span class="token operator">=</span>cn
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get-kk.kubesphere.io <span class="token operator">|</span> <span class="token assign-left variable">VERSION</span><span class="token operator">=</span>v3.0.2 <span class="token function">sh</span> - <span class="token operator">&amp;&amp;</span> <span class="token function">chmod</span> +x kk

<span class="token comment">## 查看所有受支持的 Kubernetes 版本</span>
./kk version --show-supported-k8s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、节点安装" tabindex="-1"><a class="header-anchor" href="#_2、节点安装" aria-hidden="true">#</a> 2、节点安装</h3>`,2),O=s("blockquote",null,[s("p",null,[s("code",null,"All-in-One"),a("模式安装"),s("code",null,"KubeSphere"),a("，适合单节点的安装部署。")])],-1),S=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[s("pre",{class:"language-bash"},[s("code",null,[s("span",{class:"token builtin class-name"},"export"),a(),s("span",{class:"token assign-left variable"},"KKZONE"),s("span",{class:"token operator"},"="),a(`cn
./kk create cluster --with-kubernetes v1.22.12 --with-kubesphere v3.3.2
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),j=s("blockquote",null,[s("p",null,[s("a",{href:"./library/k8s-cluster.yaml"},"k8s-cluster.yaml")])],-1),C=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[s("pre",{class:"language-bash"},[s("code",null,[s("span",{class:"token builtin class-name"},"export"),a(),s("span",{class:"token assign-left variable"},"KKZONE"),s("span",{class:"token operator"},"="),a(`cn
`),s("span",{class:"token comment"},"## 创建示例配置文件 | 完整的配置地址：https://github.com/kubesphere/kubekey/blob/release-2.2/docs/config-example.md"),a(`
./kk create config --with-kubernetes v1.21.14 --with-kubesphere v3.3.2 `),s("span",{class:"token parameter variable"},"-f"),a(` k8s.yaml
`),s("span",{class:"token comment"},"## 使用配置文件创建集群"),a(`
./kk create cluster `),s("span",{class:"token parameter variable"},"-f"),a(` k8s.yaml

`),s("span",{class:"token comment"},"## 输入以下命令以检查安装结果"),a(`
kubectl logs `),s("span",{class:"token parameter variable"},"-n"),a(" kubesphere-system "),s("span",{class:"token variable"},[s("span",{class:"token variable"},"$("),a("kubectl get pod "),s("span",{class:"token parameter variable"},"-n"),a(" kubesphere-system "),s("span",{class:"token parameter variable"},"-l"),a(),s("span",{class:"token string"},"'app in (ks-install, ks-installer)'"),a(),s("span",{class:"token parameter variable"},"-o"),a(),s("span",{class:"token assign-left variable"},"jsonpath"),s("span",{class:"token operator"},"="),s("span",{class:"token string"},"'{.items[0].metadata.name}'"),s("span",{class:"token variable"},")")]),a(),s("span",{class:"token parameter variable"},"-f"),a(`
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),L=i(`<h3 id="_3、集群维护命令" tabindex="-1"><a class="header-anchor" href="#_3、集群维护命令" aria-hidden="true">#</a> 3、集群维护命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 升级命令</span>
./kk upgrade --with-kubernetes v1.22.12 --with-kubesphere v3.3.2 <span class="token parameter variable">-f</span> sample.yaml
<span class="token comment">### 删除集群</span>
./kk delete cluster <span class="token parameter variable">-f</span> k8s.yaml
<span class="token comment">## 使用 KubeKey 检索集群信息。以下命令会创建配置文件 (sample.yaml)。</span>
./kk create config --from-cluster
<span class="token comment">## 添加节点</span>
./kk <span class="token function">add</span> nodes <span class="token parameter variable">-f</span> k8s.yaml
<span class="token comment">## 删除节点</span>
./kk delete <span class="token function">node</span> <span class="token operator">&lt;</span>nodeName<span class="token operator">&gt;</span> <span class="token parameter variable">-f</span> k8s.yaml

<span class="token comment">## 查看证书到期时间</span>
./kk certs check-expiration <span class="token parameter variable">-f</span> k8s.yaml
<span class="token comment">## 更新证书</span>
./kk certs renew <span class="token parameter variable">-f</span> k8s.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、集群联邦配置" tabindex="-1"><a class="header-anchor" href="#五、集群联邦配置" aria-hidden="true">#</a> 五、集群联邦配置</h2><figure><img src="`+k+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 1、主集群</span>
multicluster:
  clusterRole: <span class="token function">host</span>
  hostClusterName: k8s-master

kubectl logs <span class="token parameter variable">-n</span> kubesphere-system <span class="token variable"><span class="token variable">$(</span>kubectl get pod <span class="token parameter variable">-n</span> kubesphere-system <span class="token parameter variable">-l</span> <span class="token string">&#39;app in (ks-install, ks-installer)&#39;</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">&#39;{.items[0].metadata.name}&#39;</span><span class="token variable">)</span></span> <span class="token parameter variable">-f</span>

kubectl <span class="token parameter variable">-n</span> kubesphere-system get cm kubesphere-config <span class="token parameter variable">-o</span> yaml <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token string">&quot;apiVersion&quot;</span> <span class="token operator">|</span> <span class="token function">grep</span> jwtSecret

<span class="token comment">## 2、成员集群</span>
kubectl edit cc ks-installer <span class="token parameter variable">-n</span> kubesphere-system

authentication:
  jwtSecret: <span class="token string">&quot;gfdKWjo5P1OMrHJzQRzjJVpCF4nXNhR3&quot;</span>
multicluster:
  clusterRole: member
  hostClusterName: k8s-member-ty

kubectl logs <span class="token parameter variable">-n</span> kubesphere-system <span class="token variable"><span class="token variable">$(</span>kubectl get pod <span class="token parameter variable">-n</span> kubesphere-system <span class="token parameter variable">-l</span> <span class="token string">&#39;app in (ks-install, ks-installer)&#39;</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">&#39;{.items[0].metadata.name}&#39;</span><span class="token variable">)</span></span> <span class="token parameter variable">-f</span>

<span class="token comment">## 3、导入集群</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、离线安装" tabindex="-1"><a class="header-anchor" href="#六、离线安装" aria-hidden="true">#</a> 六、离线安装</h2>`,6),V={href:"https://kubesphere.io/zh/docs/v3.3/installing-on-linux/introduction/air-gapped-installation/#%E7%A6%BB%E7%BA%BF%E5%AE%89%E8%A3%85%E9%9B%86%E7%BE%A4",target:"_blank",rel:"noopener noreferrer"},F=i(`<h3 id="_1-下载资源" tabindex="-1"><a class="header-anchor" href="#_1-下载资源" aria-hidden="true">#</a> 1. 下载资源</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 1. 下载kk</span>
<span class="token comment"># 下载地址 https://github.com/kubesphere/kubekey/releases/tag/v3.0.2</span>
<span class="token function">wget</span> https://github.com/kubesphere/kubekey/releases/download/v3.0.2/kubekey-v3.0.2-linux-amd64.tar.gz
<span class="token function">tar</span> <span class="token parameter variable">-xzvf</span> kubekey-v3.0.2-linux-amd64.tar.gz
<span class="token comment">## 2. 使用KK在已有的集群中创建manifest（可选）</span>
<span class="token comment"># 可复制官方的文件：</span>
./kk create manifest <span class="token parameter variable">-f</span> ks-v3.3.2-manifest-sample.yaml
<span class="token comment">## 3. 导出制品 artifact</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">KKZONE</span><span class="token operator">=</span>cn
./kk artifact <span class="token builtin class-name">export</span> <span class="token parameter variable">-m</span> ks-v3.3.2-manifest-local.yaml <span class="token parameter variable">-o</span> ks-v3.3.2-artifact.tar.gz
<span class="token comment">## 4. 下载harbor脚本，并创建对应的项目</span>
<span class="token comment"># 下载创建项目脚本模板</span>
<span class="token comment"># curl -O https://raw.githubusercontent.com/kubesphere/ks-installer/master/scripts/create_project_harbor.sh</span>
<span class="token function">sh</span> create_project_harbor.sh
<span class="token comment">## 5. 推送离线镜像到 Harbor 仓库</span>
./kk artifact image push <span class="token parameter variable">-f</span> ks-v3.3.2-manifest-sample.yaml <span class="token parameter variable">-a</span>  ks-v3.3.2-artifact.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-离线部署" tabindex="-1"><a class="header-anchor" href="#_2-离线部署" aria-hidden="true">#</a> 2. 离线部署</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 1. 拷贝文件</span>
<span class="token comment"># kubekey-v3.0.2-linux-amd64.tar.gz</span>
<span class="token comment"># ks-v3.3.2-manifest-sample.yaml</span>
<span class="token comment"># ks-v3.3.2-artifact.tar.gz</span>

<span class="token comment">## 2. 执行以下命令创建离线集群配置文件</span>
./kk create config --with-kubesphere v3.3.2 --with-kubernetes v1.22.12 <span class="token parameter variable">-f</span> ks-v3.3.2-config-local.yaml

<span class="token comment">## 执行以下命令安装镜像仓库</span>
./kk init registry <span class="token parameter variable">-f</span> ks-v3.3.2-config-local.yaml <span class="token parameter variable">-a</span> ks-v3.3.2-artifact.tar.gz
<span class="token comment">## 创建集群并安装 OS 依赖   --with-packages：若需要安装操作系统依赖，需指定该选项。</span>
./kk create cluster <span class="token parameter variable">-f</span> ks-v3.3.2-config-local.yaml <span class="token parameter variable">-a</span> ks-v3.3.2-artifact.tar.gz --with-packages


<span class="token comment">## 查看集群状态</span>
kubectl logs <span class="token parameter variable">-n</span> kubesphere-system <span class="token variable"><span class="token variable">$(</span>kubectl get pod <span class="token parameter variable">-n</span> kubesphere-system <span class="token parameter variable">-l</span> <span class="token string">&#39;app in (ks-install, ks-installer)&#39;</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">&#39;{.items[0].metadata.name}&#39;</span><span class="token variable">)</span></span> <span class="token parameter variable">-f</span>


---
<span class="token comment">## v3.0.0离线安装包</span>
<span class="token function">curl</span> <span class="token parameter variable">-Ok</span> https://kubesphere-installer.pek3b.qingstor.com/offline/v3.0.0/kubesphere-all-v3.0.0-offline-linux-amd64.tar.gz
<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> kubesphere-all-v3.0.0-offline-linux-amd64.tar.gz
<span class="token builtin class-name">cd</span> kubesphere-all-v3.0.0-offline-linux-amd64
./kk create config --with-kubesphere v3.0.0 --with-kubernetes v1.18.6
<span class="token comment">## 执行内部镜像仓库源</span>
./kk init os <span class="token parameter variable">-f</span> config-sample.yaml <span class="token parameter variable">-s</span> ./dependencies/ --add-images-repo
<span class="token comment">## 推送镜像到私有仓库：</span>
<span class="token builtin class-name">cd</span> kubesphere-images-v3.0.0/
./push-images.sh  dockerhub.kubekey.local
<span class="token comment">## 开始部署</span>
./kk create cluster <span class="token parameter variable">-f</span> config-sample.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="七、f-a" tabindex="-1"><a class="header-anchor" href="#七、f-a" aria-hidden="true">#</a> 七、F&amp;A</h2><h3 id="_1、harbor证书认证" tabindex="-1"><a class="header-anchor" href="#_1、harbor证书认证" aria-hidden="true">#</a> 1、harbor证书认证</h3>`,6),I={href:"https://dockerhub.kubekey.local/v2/%22:x509:certificate",target:"_blank",rel:"noopener noreferrer"},$=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 查看harbor证书</span>
<span class="token function">ls</span> /etc/docker/certs.d/ca.crt
<span class="token comment">## 创建</span>
kubectl create cm <span class="token parameter variable">-n</span> kubesphere-system harbor-ca --from-file<span class="token operator">=</span>ca.crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>编辑 ks-apiserver deployment 文件，进行 configmap 的挂载</p></blockquote><figure><img src="`+b+'" alt="ks-apiserver" tabindex="0" loading="lazy"><figcaption>ks-apiserver</figcaption></figure><blockquote><p>验证证书</p></blockquote><figure><img src="'+h+'" alt="harbor-https" tabindex="0" loading="lazy"><figcaption>harbor-https</figcaption></figure>',5);function R(U,T){const t=o("ExternalLinkIcon"),l=o("router-link"),p=o("Tabs");return m(),u("div",null,[s("blockquote",null,[g,s("p",null,[a("官网地址："),s("a",_,[a("https://kubesphere.io/zh/"),n(t)])]),s("p",null,[a("文档地址："),s("a",y,[a("https://www.bookstack.cn/read/kubesphere-3.3-zh/b22a6268e9a598a2.md"),n(t)])])]),v(" more "),s("nav",x,[s("ul",null,[s("li",null,[n(l,{to:"#一、参考地址"},{default:e(()=>[a("一、参考地址")]),_:1})]),s("li",null,[n(l,{to:"#二、安装前准备"},{default:e(()=>[a("二、安装前准备")]),_:1}),s("ul",null,[s("li",null,[n(l,{to:"#_1-系统准备"},{default:e(()=>[a("1. 系统准备")]),_:1})]),s("li",null,[n(l,{to:"#_2-系统硬件检查"},{default:e(()=>[a("2. 系统硬件检查")]),_:1})]),s("li",null,[n(l,{to:"#_3-系统内核检查"},{default:e(()=>[a("3. 系统内核检查")]),_:1})]),s("li",null,[n(l,{to:"#_4-yum-源"},{default:e(()=>[a("4. yum 源")]),_:1})]),s("li",null,[n(l,{to:"#_5-时间同步"},{default:e(()=>[a("5. 时间同步")]),_:1})]),s("li",null,[n(l,{to:"#_6-系统参数设置"},{default:e(()=>[a("6. 系统参数设置")]),_:1})]),s("li",null,[n(l,{to:"#_7-hostname-设置"},{default:e(()=>[a("7. hostname 设置")]),_:1})])])]),s("li",null,[n(l,{to:"#三、安装-docker"},{default:e(()=>[a("三、安装 docker")]),_:1})]),s("li",null,[n(l,{to:"#四、kubernetes集群部署"},{default:e(()=>[a("四、Kubernetes集群部署")]),_:1}),s("ul",null,[s("li",null,[n(l,{to:"#_1、kubekey下载"},{default:e(()=>[a("1、KubeKey下载")]),_:1})]),s("li",null,[n(l,{to:"#_2、节点安装"},{default:e(()=>[a("2、节点安装")]),_:1})]),s("li",null,[n(l,{to:"#_3、集群维护命令"},{default:e(()=>[a("3、集群维护命令")]),_:1})])])]),s("li",null,[n(l,{to:"#五、集群联邦配置"},{default:e(()=>[a("五、集群联邦配置")]),_:1})]),s("li",null,[n(l,{to:"#六、离线安装"},{default:e(()=>[a("六、离线安装")]),_:1}),s("ul",null,[s("li",null,[n(l,{to:"#_1-下载资源"},{default:e(()=>[a("1. 下载资源")]),_:1})]),s("li",null,[n(l,{to:"#_2-离线部署"},{default:e(()=>[a("2. 离线部署")]),_:1})])])]),s("li",null,[n(l,{to:"#七、f-a"},{default:e(()=>[a("七、F&A")]),_:1}),s("ul",null,[s("li",null,[n(l,{to:"#_1、harbor证书认证"},{default:e(()=>[a("1、harbor证书认证")]),_:1})])])])])]),w,s("ul",null,[s("li",null,[s("a",q,[a("KubeSphere-多节点安装"),n(t)])])]),E,K,s("blockquote",null,[s("p",null,[a("centos 下载地址："),s("a",z,[a("http://mirrors.aliyun.com/centos/7/isos/x86_64/"),n(t)])])]),A,s("blockquote",null,[s("p",null,[a("KubeKey下载地址："),s("a",N,[a("https://github.com/kubesphere/kubekey/releases"),n(t)])])]),B,n(p,{id:"93",data:[{id:"单节点安装"},{id:"多节点安装"}],active:1},{title0:e(({value:r,isActive:c})=>[a("单节点安装")]),title1:e(({value:r,isActive:c})=>[a("多节点安装")]),tab0:e(({value:r,isActive:c})=>[O,S]),tab1:e(({value:r,isActive:c})=>[j,C]),_:1}),L,s("blockquote",null,[s("p",null,[a("官网："),s("a",V,[a("https://kubesphere.io/zh/docs/v3.3/installing-on-linux/introduction/air-gapped-installation/#%E7%A6%BB%E7%BA%BF%E5%AE%89%E8%A3%85%E9%9B%86%E7%BE%A4"),n(t)])])]),F,s("ul",null,[s("li",null,[a('Get"'),s("a",I,[a('https://dockerhub.kubekey.local/v2/":x509:certificate'),n(t)]),a(" signed by unknown authority")])]),$])}const Z=d(f,[["render",R],["__file","16.k8s安装-kubeKey.html.vue"]]);export{Z as default};
