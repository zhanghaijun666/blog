import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as c,c as p,e as d,a as n,d as a,w as l,b as s,f as i}from"./app-efa5e96e.js";const m={},u={class:"table-of-contents"},v=i(`<h2 id="镜像地址" tabindex="-1"><a class="header-anchor" href="#镜像地址" aria-hidden="true">#</a> 镜像地址</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 官方镜像：http://isoredirect.centos.org/centos/</span>
<span class="token comment"># 官方镜像：http://isoredirect.centos.org/centos/7/isos/x86_64/</span>
<span class="token function">wget</span> http://mirrors.163.com/centos/7.9.2009/isos/x86_64/CentOS-7-x86_64-DVD-2009.iso
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="网络设置" tabindex="-1"><a class="header-anchor" href="#网络设置" aria-hidden="true">#</a> 网络设置</h2>`,3),b=n("details",{class:"hint-container details"},[n("summary",null,"静态 IP 地址：192.16.18.100"),n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{bash:"",class:"language-bash"},[n("code",null,[n("span",{class:"token punctuation"},"["),s("root@hub ~"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token comment"},"# cat /etc/sysconfig/network-scripts/ifcfg-ens33"),s(`
`),n("span",{class:"token assign-left variable"},"TYPE"),n("span",{class:"token operator"},"="),s(`Ethernet
`),n("span",{class:"token assign-left variable"},"PROXY_METHOD"),n("span",{class:"token operator"},"="),s(`none
`),n("span",{class:"token assign-left variable"},"BROWSER_ONLY"),n("span",{class:"token operator"},"="),s(`no
`),n("span",{class:"token comment"},"#BOOTPROTO=dhcp"),s(`
`),n("span",{class:"token assign-left variable"},"BOOTPROTO"),n("span",{class:"token operator"},"="),s(`static
`),n("span",{class:"token assign-left variable"},"DEFROUTE"),n("span",{class:"token operator"},"="),s(`yes
`),n("span",{class:"token assign-left variable"},"IPV4_FAILURE_FATAL"),n("span",{class:"token operator"},"="),s(`no
`),n("span",{class:"token assign-left variable"},"IPV6INIT"),n("span",{class:"token operator"},"="),s(`yes
`),n("span",{class:"token assign-left variable"},"IPV6_AUTOCONF"),n("span",{class:"token operator"},"="),s(`yes
`),n("span",{class:"token assign-left variable"},"IPV6_DEFROUTE"),n("span",{class:"token operator"},"="),s(`yes
`),n("span",{class:"token assign-left variable"},"IPV6_FAILURE_FATAL"),n("span",{class:"token operator"},"="),s(`no
`),n("span",{class:"token assign-left variable"},"IPV6_ADDR_GEN_MODE"),n("span",{class:"token operator"},"="),s(`stable-privacy
`),n("span",{class:"token assign-left variable"},"NAME"),n("span",{class:"token operator"},"="),s(`ens33
`),n("span",{class:"token assign-left variable"},"UUID"),n("span",{class:"token operator"},"="),s(`b3d1393d-059d-49ea-a12b-9aa9e4c9bc2c
`),n("span",{class:"token assign-left variable"},"DEVICE"),n("span",{class:"token operator"},"="),s(`ens33
`),n("span",{class:"token assign-left variable"},"ONBOOT"),n("span",{class:"token operator"},"="),s(`yes
`),n("span",{class:"token assign-left variable"},"NM_CONTROLLED"),n("span",{class:"token operator"},"="),s(`no
`),n("span",{class:"token assign-left variable"},"IPADDR"),n("span",{class:"token operator"},"="),n("span",{class:"token number"},"192.16"),s(`.18.100
`),n("span",{class:"token assign-left variable"},"NETMASK"),n("span",{class:"token operator"},"="),n("span",{class:"token number"},"255.255"),s(`.255.0
`),n("span",{class:"token assign-left variable"},"GATEWAY"),n("span",{class:"token operator"},"="),n("span",{class:"token number"},"192.16"),s(`.18.2
`),n("span",{class:"token assign-left variable"},"DNS1"),n("span",{class:"token operator"},"="),n("span",{class:"token number"},"114.114"),s(`.114.114
`),n("span",{class:"token assign-left variable"},"DNS2"),n("span",{class:"token operator"},"="),n("span",{class:"token number"},"8.8"),s(`.8.8
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])])],-1),k=i(`<h2 id="系统参数调整" tabindex="-1"><a class="header-anchor" href="#系统参数调整" aria-hidden="true">#</a> 系统参数调整</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 关闭SELINUX 临时关闭</span>
setenforce <span class="token number">0</span>
<span class="token comment"># 关闭SELINUX 永久关闭需要修改SELINUX的配置文件</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/SELINUX=enforcing/SELINUX=disabled/g&#39;</span> /etc/selinux/config

<span class="token comment"># 打开文件数调整 (按需调整)</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;* soft nofile 65536&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/security/limits.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;* hard nofile 65536&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/security/limits.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="更改-yum-源" tabindex="-1"><a class="header-anchor" href="#更改-yum-源" aria-hidden="true">#</a> 更改 YUM 源</h2>`,3),h={href:"http://mirror.centos.org/centos/7/os/x86_64/Packages/",target:"_blank",rel:"noopener noreferrer"},g={href:"https://mirrors.aliyun.com/centos/7/os/x86_64/Packages/",target:"_blank",rel:"noopener noreferrer"},f={href:"http://mirrors.aliyun.com/",target:"_blank",rel:"noopener noreferrer"},_=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token function">vim</span>  <span class="token function">wget</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,1),y=n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{bash:"",class:"language-bash"},[n("code",null,[n("span",{class:"token comment"},"## 备份"),s(`
`),n("span",{class:"token comment"},"# 备份全部"),s(`
`),n("span",{class:"token function"},"mkdir"),s(),n("span",{class:"token parameter variable"},"-p"),s(" /etc/yum.repos.d/bak "),n("span",{class:"token operator"},"&&"),s(),n("span",{class:"token function"},"mv"),s(` /etc/yum.repos.d/*.repo /etc/yum.repos.d/bak
`),n("span",{class:"token comment"},"# 或者只备份 CentOS-Base.repo 文件"),s(`
`),n("span",{class:"token function"},"mv"),s(` /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup

`),n("span",{class:"token comment"},"## 下载新的CentOS-Base.repo 到/etc/yum.repos.d/"),s(`
`),n("span",{class:"token comment"},"# CentOS 7  （二选一）"),s(`
`),n("span",{class:"token function"},"wget"),s(),n("span",{class:"token parameter variable"},"-O"),s(` /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
`),n("span",{class:"token function"},"curl"),s(),n("span",{class:"token parameter variable"},"-o"),s(` /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
`),n("span",{class:"token comment"},"# CentOS 6  （二选一）"),s(`
`),n("span",{class:"token function"},"wget"),s(),n("span",{class:"token parameter variable"},"-O"),s(` /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-6.repo
`),n("span",{class:"token function"},"curl"),s(),n("span",{class:"token parameter variable"},"-o"),s(` /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-6.repo
`),n("span",{class:"token comment"},"# CentOS 5  （二选一）"),s(`
`),n("span",{class:"token function"},"wget"),s(),n("span",{class:"token parameter variable"},"-O"),s(` /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-5.repo
`),n("span",{class:"token function"},"curl"),s(),n("span",{class:"token parameter variable"},"-o"),s(` /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-5.repo

`),n("span",{class:"token comment"},"## 配置epel源"),s(`
`),n("span",{class:"token comment"},"# epel(RHEL 7)"),s(`
`),n("span",{class:"token function"},"wget"),s(),n("span",{class:"token parameter variable"},"-O"),s(` /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo
`),n("span",{class:"token comment"},"# epel(RHEL 6)"),s(`
`),n("span",{class:"token function"},"wget"),s(),n("span",{class:"token parameter variable"},"-O"),s(` /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-6.repo
`),n("span",{class:"token comment"},"# epel(RHEL 5)"),s(`
`),n("span",{class:"token function"},"wget"),s(),n("span",{class:"token parameter variable"},"-O"),s(` /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-5.repo


`),n("span",{class:"token comment"},'## 非阿里云ECS用户无法解析主机"mirrors.cloud.aliyuncs.com"'),s(`
`),n("span",{class:"token function"},"sed"),s(),n("span",{class:"token parameter variable"},"-i"),s(),n("span",{class:"token parameter variable"},"-e"),s(),n("span",{class:"token string"},"'/mirrors.cloud.aliyuncs.com/d'"),s(),n("span",{class:"token parameter variable"},"-e"),s(),n("span",{class:"token string"},"'/mirrors.aliyuncs.com/d'"),s(` /etc/yum.repos.d/CentOS-Base.repo
`),n("span",{class:"token comment"},"## 清除缓存 | 生成缓存 | 更新源"),s(`
yum clean all `),n("span",{class:"token operator"},"&&"),s(" yum makecache "),n("span",{class:"token operator"},"&&"),s(" yum update "),n("span",{class:"token operator"},"&&"),s(` yum repolist 
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),x=i(`<h2 id="基本软件工具安装" tabindex="-1"><a class="header-anchor" href="#基本软件工具安装" aria-hidden="true">#</a> 基本软件工具安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># jp:json格式的工具 | bash-completion: tab键补全命令</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token function">vim</span> <span class="token function">curl</span> <span class="token function">wget</span> telnet lrzsz <span class="token function">unzip</span> jq gcc tree sysstat libseccomp bash-completion yum-utils <span class="token function">bzip2</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> policycoreutils-python openssh-server openssh-clients cronie
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> iptables conntrack ipvsadm ipset net-tools <span class="token function">lsof</span> iproute bridge-utils bind-utils
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> epel-release xorg-x11-xauth <span class="token function">htop</span> dstat glances lftp
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> ntpdate ntp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="升级-linux-内核版本" tabindex="-1"><a class="header-anchor" href="#升级-linux-内核版本" aria-hidden="true">#</a> 升级 Linux 内核版本</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">rpm</span> <span class="token parameter variable">-Uvh</span> http://www.elrepo.org/elrepo-release-7.0-4.el7.elrepo.noarch.rpm
<span class="token comment"># 安装内核  kernel官网：https://kernel.org/</span>
yum <span class="token parameter variable">--enablerepo</span><span class="token operator">=</span>elrepo-kernel <span class="token function">install</span> <span class="token parameter variable">-y</span> kernel-lt
<span class="token comment"># 查询已安装的内核</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> kernel
<span class="token comment"># 查看默认启动项</span>
<span class="token function">awk</span> -F<span class="token punctuation">\\</span>&#39; <span class="token string">&#39;$1==&quot;menuentry &quot; {print $2}&#39;</span> /etc/grub2.cfg
<span class="token comment"># 设置开机从新内核启动</span>
<span class="token comment">#grub2-set-default &#39;CentOS Linux (4.4.189-1.el7.elrepo.x86_64) 7 (Core)&#39;</span>
<span class="token comment"># 上述命令不生效，可执行下面的命令设置默认启动</span>
<span class="token comment"># 默认启动的顺序是从0开始（CentOS Linux (3.10.0-1127.el7.x86_64) 7），新内核是从头插入，所以需要选择0</span>
grub2-set-default <span class="token number">0</span>
<span class="token comment"># 注意：设置完内核后，需要重启服务器才会生效。</span>
<span class="token function">reboot</span>
<span class="token comment"># 查询内核 4.4.249-1.el7.elrepo.x86_64</span>
<span class="token function">uname</span> <span class="token parameter variable">-r</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 通过 yum remove 命令</span>
<span class="token comment"># 查看系统安装了哪些内核包</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> kernel
<span class="token comment"># 使用yum remove 或rpm -e 删除无用内核</span>
yum remove kernel-tools-libs-3.10.0-1127.el7.x86_64

<span class="token comment">## 通过 yum-utils 工具</span>
<span class="token comment"># 如果安装的内核不多于 3 个，yum-utils 工具不会删除任何一个。只有在安装的内核大于 3 个时，才会自动删除旧内核。</span>
yum <span class="token function">install</span> yum-utils
package-cleanup <span class="token parameter variable">--oldkernels</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="时间同步" tabindex="-1"><a class="header-anchor" href="#时间同步" aria-hidden="true">#</a> 时间同步</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 手动下载安装包地址</span>
<span class="token comment"># http://mirror.centos.org/centos/7/os/x86_64/Packages/ntp-4.2.6p5-29.el7.centos.2.x86_64.rpm</span>
<span class="token comment"># http://mirror.centos.org/centos/7/os/x86_64/Packages/ntpdate-4.2.6p5-29.el7.centos.2.x86_64.rpm</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> ntp ntpdate
systemctl start ntpd <span class="token operator">&amp;&amp;</span> systemctl <span class="token builtin class-name">enable</span> ntpd
<span class="token comment"># 时区不对的更改时区</span>
timedatectl set-timezone Asia/Shanghai
<span class="token comment"># ntpdate cn.pool.ntp.org</span>
ntpdate time1.aliyun.com
<span class="token comment">#将当前的 UTC 时间写入硬件时钟</span>
timedatectl set-local-rtc <span class="token number">0</span>
hwclock <span class="token parameter variable">--systohc</span>
hwclock <span class="token parameter variable">-w</span>
<span class="token function">date</span>
<span class="token comment">## 查看同步结果</span>
ntpq <span class="token parameter variable">-pn</span>
<span class="token comment">## 重启依赖于系统时间的服务</span>
systemctl restart rsyslog
systemctl restart crond
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改-hostname" tabindex="-1"><a class="header-anchor" href="#修改-hostname" aria-hidden="true">#</a> 修改 hostname</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看机器的hostname</span>
<span class="token function">hostname</span>
<span class="token comment"># 设置hostname</span>
hostnamectl set-hostname dev.alot.pw
<span class="token comment"># 设置hosts文件</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;192.16.18.100 dev.alot.pw&#39;</span> <span class="token operator">&gt;&gt;</span> /etc/hosts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="扩展安装" tabindex="-1"><a class="header-anchor" href="#扩展安装" aria-hidden="true">#</a> 扩展安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># axel安装：多线程下载工具</span>
<span class="token function">wget</span> http://downloadib01.fedoraproject.org/pub/epel/7/x86_64/Packages/a/axel-2.4-9.el7.x86_64.rpm
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> axel-2.4-9.el7.x86_64.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="全局环境变量" tabindex="-1"><a class="header-anchor" href="#全局环境变量" aria-hidden="true">#</a> 全局环境变量</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> /etc/profile
<span class="token comment"># 添加如下内容, 注意修改自己的安装路径</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">NODE_HOME</span><span class="token operator">=</span>/usr/local/lib/nodejs
<span class="token builtin class-name">export</span> <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span>/usr/local/lib/jdk1.8.0_261
<span class="token builtin class-name">export</span> <span class="token assign-left variable">MAVEN_HOME</span><span class="token operator">=</span>/usr/local/lib/maven-3.6.3
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token variable">$JAVA_HOME</span>/bin:<span class="token variable">$NODE_HOME</span>/bin:<span class="token variable">$MAVEN_HOME</span>/bin:<span class="token environment constant">$PATH</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CLASSPATH</span><span class="token operator">=</span><span class="token variable">$JAVA_HOME</span>/jre/lib/ext:<span class="token variable">$JAVA_HOME</span>/lib/toos.jar
<span class="token comment"># 配置生效</span>
<span class="token builtin class-name">source</span> /etc/profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="卸载-centos7-系统自带-mariadb" tabindex="-1"><a class="header-anchor" href="#卸载-centos7-系统自带-mariadb" aria-hidden="true">#</a> 卸载 CentOS7 系统自带 mariadb</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看系统自带的Mariadb (mariadb-libs-5.5.68-1.el7.x86_64)</span>
<span class="token function">rpm</span> -qa<span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-i</span> mariadb
<span class="token comment"># 卸载系统自带的Mariadb</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> mariadb <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token function">rpm</span> <span class="token parameter variable">-e</span> <span class="token parameter variable">--nodeps</span>
<span class="token comment"># 删除etc目录下的my.cnf</span>
<span class="token function">rm</span> /etc/my.cnf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="升级-git-版本" tabindex="-1"><a class="header-anchor" href="#升级-git-版本" aria-hidden="true">#</a> 升级 git 版本</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> version
<span class="token comment">## 如果已安装1.8版本的git请卸载</span>
yum remove <span class="token function">git</span>
yum remove git-*

<span class="token comment">## 通过\`End Point\`库，参考 &#39;https://packages.endpointdev.com&#39;</span>
yum <span class="token function">install</span> https://packages.endpointdev.com/rhel/7/os/x86_64/endpoint-repo.x86_64.rpm
yum <span class="token function">install</span> <span class="token function">git</span>
<span class="token comment">## git version 2.36.0</span>
<span class="token function">git</span> <span class="token parameter variable">--version</span>


<span class="token comment">## 编译安装</span>
yum <span class="token function">install</span> curl-devel expat-devel gettext-devel openssl-devel zlib-devel
yum <span class="token function">install</span> gcc perl-ExtUtils-MakeMaker
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> <span class="token function">wget</span>
<span class="token function">mkdir</span> ~/downloads <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> ~/downloads <span class="token operator">&amp;&amp;</span> <span class="token function">wget</span> https://github.com/git/git/archive/v2.36.0.tar.gz
<span class="token function">tar</span> <span class="token parameter variable">-xvf</span> v2.36.0.tar.gz <span class="token operator">&amp;&amp;</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> v2.36.0.tar.gz <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> git-2.36.0
<span class="token function">make</span> configure <span class="token operator">&amp;&amp;</span> ./configure <span class="token parameter variable">--prefix</span><span class="token operator">=</span>/usr <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token function">install</span>
<span class="token function">git</span> <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17);function O(E,C){const e=r("router-link"),t=r("ExternalLinkIcon");return c(),p("div",null,[d(" more "),n("nav",u,[n("ul",null,[n("li",null,[a(e,{to:"#镜像地址"},{default:l(()=>[s("镜像地址")]),_:1})]),n("li",null,[a(e,{to:"#网络设置"},{default:l(()=>[s("网络设置")]),_:1})]),n("li",null,[a(e,{to:"#系统参数调整"},{default:l(()=>[s("系统参数调整")]),_:1})]),n("li",null,[a(e,{to:"#更改-yum-源"},{default:l(()=>[s("更改 YUM 源")]),_:1})]),n("li",null,[a(e,{to:"#基本软件工具安装"},{default:l(()=>[s("基本软件工具安装")]),_:1})]),n("li",null,[a(e,{to:"#升级-linux-内核版本"},{default:l(()=>[s("升级 Linux 内核版本")]),_:1})]),n("li",null,[a(e,{to:"#时间同步"},{default:l(()=>[s("时间同步")]),_:1})]),n("li",null,[a(e,{to:"#修改-hostname"},{default:l(()=>[s("修改 hostname")]),_:1})]),n("li",null,[a(e,{to:"#扩展安装"},{default:l(()=>[s("扩展安装")]),_:1})]),n("li",null,[a(e,{to:"#全局环境变量"},{default:l(()=>[s("全局环境变量")]),_:1})]),n("li",null,[a(e,{to:"#卸载-centos7-系统自带-mariadb"},{default:l(()=>[s("卸载 CentOS7 系统自带 mariadb")]),_:1})]),n("li",null,[a(e,{to:"#升级-git-版本"},{default:l(()=>[s("升级 git 版本")]),_:1})])])]),v,b,k,n("ul",null,[n("li",null,[s("centos镜像站: "),n("a",h,[s("http://mirror.centos.org/centos/7/os/x86_64/Packages/"),a(t)])]),n("li",null,[s("阿里云镜像站: "),n("a",g,[s("https://mirrors.aliyun.com/centos/7/os/x86_64/Packages/"),a(t)])]),n("li",null,[s("阿里镜像源配置："),n("a",f,[s("http://mirrors.aliyun.com/"),a(t)])])]),_,y,x])}const w=o(m,[["render",O],["__file","10.CentOS7系统初始化设置.html.vue"]]);export{w as default};
