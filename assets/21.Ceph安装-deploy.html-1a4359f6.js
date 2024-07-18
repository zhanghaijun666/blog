import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as t,c as p,e as o,a as n,d as a,w as e,f as d,b as i}from"./app-efa5e96e.js";const r={},m={class:"table-of-contents"},u=d(`<h2 id="节点规划" tabindex="-1"><a class="header-anchor" href="#节点规划" aria-hidden="true">#</a> 节点规划</h2><table><thead><tr><th>主机名</th><th>public-ip</th><th>cluster-ip</th><th>磁盘</th><th>角色</th></tr></thead><tbody><tr><td>ceph1</td><td>192.168.60.11</td><td>192.168.20.11</td><td>系统盘: sda <br>osd盘: sdb、sdc</td><td>monitor,mgr,rgw,mds,osd<br>NTP Server,ceph-deploy</td></tr><tr><td>ceph2</td><td>192.168.60.12</td><td>192.168.20.12</td><td>系统盘: sda <br>osd盘: sdb、sdc</td><td>monitor,mgr,rgw,mds,osd</td></tr><tr><td>ceph3</td><td>192.168.60.13</td><td>192.168.20.13</td><td>系统盘: sda <br>osd盘: sdb、sdc</td><td>monitor,mgr,rgw,mds,osd</td></tr></tbody></table><h3 id="节点角色" tabindex="-1"><a class="header-anchor" href="#节点角色" aria-hidden="true">#</a> 节点角色</h3><ul><li>ceph-deploy：Ceph集群部署节点，负责集群整体部署，也可以复用cpeh集群中的节点作为部署节点。</li><li>NTP Server：时间同步源</li><li>monitor：Ceph监视管理节点，承担Ceph集群重要的管理任务，一般需要3或5个节点。</li><li>mgr： Ceph 集群管理节点（manager），为外界提供统一的入口。</li><li>rgw: Ceph对象网关，是一种服务，使客户端能够利用标准对象存储API来访问Ceph集群</li><li>mds：Ceph元数据服务器，MetaData Server，主要保存的文件系统服务的元数据，使用文件存储时才需要该组件</li><li>osd：Ceph存储节点Object Storage Daemon，实际负责数据存储的节点。</li></ul><h2 id="系统配置" tabindex="-1"><a class="header-anchor" href="#系统配置" aria-hidden="true">#</a> 系统配置</h2><h3 id="网络设置" tabindex="-1"><a class="header-anchor" href="#网络设置" aria-hidden="true">#</a> 网络设置</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 在每个节点上配置ip地址，方式可和下面的方式不同</span>
nmcli d
nmcli dev status
nmcli connection show
<span class="token comment">## 显示所有网络连接信息</span>
nmcli <span class="token parameter variable">-p</span> connection show
<span class="token comment">## 查看所有的网卡设备</span>
nmcli <span class="token parameter variable">-p</span> device status 
<span class="token comment">## 查看指定网卡详细信息</span>
nmcli device show ens37 <span class="token comment">#显示指定网卡的详细信息</span>
nmcli device show <span class="token comment">#显示所有网卡的详细信息</span>
nmcli connection down ens37 <span class="token comment">#停用网络连接</span>
nmcli connection up ens37 <span class="token comment">#启用网络连接</span>
<span class="token comment">## 设置IP地址</span>
nmcli con modify enp0s3 ipv4.method manual ipv4.addess <span class="token string">&quot;192.168.60.11/24&quot;</span> ipv4.gateway <span class="token string">&quot;192.168.200.1&quot;</span> connection.autoconnect <span class="token function">yes</span>
<span class="token comment">## 启用新配置，使新地址生效</span>
nmcli con up enp0s3

<span class="token comment"># 配置IP地址</span>
<span class="token function">ssh</span> root@192.168.60.11 <span class="token string">&quot; \\
nmcli con mod ens18 ipv4.addresses 192.168.60.11/24; \\
nmcli con mod ens18 ipv4.gateway 192.168.60.1; \\
nmcli con mod ens18 ipv4.method manual; \\
nmcli con mod ens18 ipv4.dns &#39;8.8.8.8&#39;; \\
nmcli con up ens18&quot;</span>
<span class="token function">ssh</span> root@192.168.60.12 <span class="token string">&quot; \\
nmcli con mod ens18 ipv4.addresses 192.168.60.11/24; \\
nmcli con mod ens18 ipv4.gateway 192.168.60.1; \\
nmcli con mod ens18 ipv4.method manual; \\
nmcli con mod ens18 ipv4.dns &#39;8.8.8.8&#39;; \\
nmcli con up ens18&quot;</span>
<span class="token function">ssh</span> root@192.168.60.13 <span class="token string">&quot; \\
nmcli con mod ens18 ipv4.addresses 192.168.60.11/24; \\
nmcli con mod ens18 ipv4.gateway 192.168.60.1; \\
nmcli con mod ens18 ipv4.method manual; \\
nmcli con mod ens18 ipv4.dns &#39;8.8.8.8&#39;; \\
nmcli con up ens18&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="host配置" tabindex="-1"><a class="header-anchor" href="#host配置" aria-hidden="true">#</a> host配置</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 修改主机名 分别在三节点上执行</span>
<span class="token comment">## 主机名需要和host设置相同，必须设置否则无法初始化，后续也有问题！</span>
hostnamectl set-hostname ceph1
hostnamectl set-hostname ceph2
hostnamectl set-hostname ceph3

<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span>/etc/hosts <span class="token operator">&lt;&lt;</span><span class="token string">EOF
## Ceph Public Network
192.168.60.11  ceph1
192.168.60.12  ceph2
192.168.60.13  ceph3
## Ceph Cluster Network
192.168.20.11  ceph1
192.168.20.12  ceph2
192.168.20.13  ceph3
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="节点互信" tabindex="-1"><a class="header-anchor" href="#节点互信" aria-hidden="true">#</a> 节点互信</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 生产密钥</span>
ssh-keygen <span class="token parameter variable">-t</span> rsa
<span class="token comment">## 密钥交换</span>
ssh-copy-id ceph1
ssh-copy-id ceph2
ssh-copy-id ceph3
<span class="token comment">## 密钥交换，密码是123456 上面和下面二择一即可</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> ceph1 ceph2 ceph3 <span class="token punctuation">;</span><span class="token keyword">do</span>
<span class="token function">expect</span> <span class="token parameter variable">-c</span> <span class="token string">&quot;spawn ssh-copy-id -i root@<span class="token variable">$i</span>
        expect {
                &quot;</span>*yes/no*<span class="token string">&quot; {send &quot;</span>yesr<span class="token string">&quot;; exp_continue}
                &quot;</span>*password*<span class="token string">&quot; {send &quot;</span>123456r<span class="token string">&quot;; exp_continue}
                &quot;</span>*Password*<span class="token string">&quot; {send &quot;</span>123456r<span class="token string">&quot;;}
        } &quot;</span>
<span class="token keyword">done</span>
<span class="token comment">## 验证互信</span>
<span class="token function">ssh</span> ceph1 <span class="token function">date</span> <span class="token operator">&amp;&amp;</span> <span class="token function">ssh</span> ceph2 <span class="token function">date</span> <span class="token operator">&amp;&amp;</span> <span class="token function">ssh</span> cep3 <span class="token function">date</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="系统参数设置" tabindex="-1"><a class="header-anchor" href="#系统参数设置" aria-hidden="true">#</a> 系统参数设置</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 关闭selinux</span>
<span class="token comment"># setenforce 0 &amp;&amp; sed -i &#39;s/^SELINUX=enforcing/SELINUX=disabled/g&#39; /etc/selinux/config</span>
setenforce <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/^SELINUX=.*/SELINUX=disabled/g&#39;</span> /etc/selinux/config
<span class="token comment">## 修改系统参数</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;* soft nproc 65535&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/security/limits.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;* hard nproc 65535&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/security/limits.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;* soft nofile 65535&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/security/limits.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;* hard nofile 65535&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/security/limits.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="防火墙设置" tabindex="-1"><a class="header-anchor" href="#防火墙设置" aria-hidden="true">#</a> 防火墙设置</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 防火墙策略</span>
firewall-cmd <span class="token parameter variable">--permanent</span> --add-rich-rule<span class="token operator">=</span><span class="token string">&#39;rule family=&quot;ipv4&quot; source address=&quot;192.168.200.10&quot; accept&#39;</span>
firewall-cmd <span class="token parameter variable">--permanent</span> --add-rich-rule<span class="token operator">=</span><span class="token string">&#39;rule family=&quot;ipv4&quot; source address=&quot;192.168.200.11&quot; accept&#39;</span>
firewall-cmd <span class="token parameter variable">--permanent</span> --add-rich-rule<span class="token operator">=</span><span class="token string">&#39;rule family=&quot;ipv4&quot; source address=&quot;192.168.200.12&quot; accept&#39;</span>
firewall-cmd <span class="token parameter variable">--permanent</span> --add-rich-rule<span class="token operator">=</span><span class="token string">&#39;rule family=&quot;ipv4&quot; source address=&quot;192.168.20.10&quot; accept&#39;</span>
firewall-cmd <span class="token parameter variable">--permanent</span> --add-rich-rule<span class="token operator">=</span><span class="token string">&#39;rule family=&quot;ipv4&quot; source address=&quot;192.168.20.11&quot; accept&#39;</span>
firewall-cmd <span class="token parameter variable">--permanent</span> --add-rich-rule<span class="token operator">=</span><span class="token string">&#39;rule family=&quot;ipv4&quot; source address=&quot;192.168.20.12&quot; accept&#39;</span>
firewall-cmd <span class="token parameter variable">--reload</span>
<span class="token comment">## 查看当前防火墙策略：</span>
firewall-cmd --list-all

systemctl stop firewalld
systemctl disable <span class="token parameter variable">--now</span> firewalld
iptables <span class="token parameter variable">-F</span> <span class="token operator">&amp;&amp;</span> iptables <span class="token parameter variable">-X</span> <span class="token operator">&amp;&amp;</span> iptables <span class="token parameter variable">-F</span> <span class="token parameter variable">-t</span> nat <span class="token operator">&amp;&amp;</span> iptables <span class="token parameter variable">-X</span> <span class="token parameter variable">-t</span> nat
iptables <span class="token parameter variable">-P</span> FORWARD ACCEPT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="时间同步" tabindex="-1"><a class="header-anchor" href="#时间同步" aria-hidden="true">#</a> 时间同步</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 时间同步</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> ntp ntpdate
<span class="token comment">## 节点1</span>
<span class="token comment">##注释其他时间源</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/^server/#server/g&#39;</span> /etc/ntp.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;restrict 192.168.100.10 mask 255.255.255.0 nomodify notrap&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/ntp.conf
<span class="token comment">## 127.127.1.0 回环地址 作为时钟源</span>
<span class="token comment"># echo &quot;server 127.127.1.0 prefer&quot; &gt;&gt; /etc/ntp.conf</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;server 127.127.1.0 iburst&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/ntp.conf
<span class="token comment">## 填入127.127.1.0 回环地址，fudge设置时间服务器的层级 stratum 0~15  ,0：表示顶级 , 10：通常用于给局域网主机提供时间服务</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Fudge 127.127.1.0 stratum 10 &quot;</span> <span class="token operator">&gt;&gt;</span> /etc/ntp.conf
<span class="token comment">## 启动ntpd服务</span>
systemctl start ntpd
<span class="token comment">## 节点2和节点3上执行</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/^server/#server/g&#39;</span> /etc/ntp.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;server 192.168.100.10 iburst&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/ntp.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Fudge 192.168.100.10 stratum 10&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/ntp.conf
<span class="token comment">## 启动ntpd服务</span>
systemctl start ntpd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="yum源设置" tabindex="-1"><a class="header-anchor" href="#yum源设置" aria-hidden="true">#</a> yum源设置</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#配置centos、epeo、ceph源</span>
<span class="token function">curl</span> <span class="token parameter variable">-o</span> /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
<span class="token function">wget</span> <span class="token parameter variable">-O</span> /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo
<span class="token function">wget</span> <span class="token parameter variable">-O</span> /etc/yum.repos.d/ceph.repo http://down.i4t.com/ceph/ceph.repo
yum clean all
yum makecache

<span class="token comment">## 本地yum源</span>
<span class="token comment">## https://github.com/emikulic/darkhttpd</span>
yun install-y darkhttpd
<span class="token comment">## 启动http并指定本地的rpm源位置（/root/ceph_rhel77/ceph-rpms）</span>
darkhttpd /root/ceph_rhel77/ceph-rpms <span class="token parameter variable">--port</span> <span class="token number">8081</span> <span class="token parameter variable">--daemon</span>

<span class="token builtin class-name">cd</span> /etc/yum.repos.d/
<span class="token punctuation">[</span>root@ceph1 yum.repos.d<span class="token punctuation">]</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;
[ceph]
name=ceph
baseurl=http://192.168.200.10:8081
enabled=1
gpgcheck=0
&quot;</span> <span class="token operator">&gt;</span> /etc/yum.repos.d/ceph.repo
yum makecache <span class="token operator">&amp;&amp;</span> yum update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建用户" tabindex="-1"><a class="header-anchor" href="#创建用户" aria-hidden="true">#</a> 创建用户</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 创建yunwei组</span>
<span class="token function">groupadd</span> <span class="token parameter variable">-g</span> <span class="token number">1090</span> yunwei
<span class="token comment">## 创建yunwei用户   </span>
<span class="token function">useradd</span> <span class="token parameter variable">-g</span> yunwei <span class="token parameter variable">-u</span> <span class="token number">1090</span> yunwei
<span class="token comment">## 设置yunwei密码 </span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;123456Aa@&quot;</span> <span class="token operator">|</span> <span class="token function">passwd</span> <span class="token parameter variable">--stdin</span> yunwei
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装ceph" tabindex="-1"><a class="header-anchor" href="#安装ceph" aria-hidden="true">#</a> 安装Ceph</h2><h3 id="配置ceph-deploy" tabindex="-1"><a class="header-anchor" href="#配置ceph-deploy" aria-hidden="true">#</a> 配置ceph-deploy</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 安装 ceph-deploy</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> python-setuptools ceph-deploy
<span class="token comment">## 校验版本</span>
ceph-deploy <span class="token parameter variable">--version</span>
<span class="token comment">## 创建集群目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /root/ceph-deploy <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> /root/ceph-deploy
<span class="token comment"># 初始化集群 参数设置 --cluster-network 集群对外的网络,用于业务访问 --public-network 集群内通信的网络</span>
ceph-deploy new ceph1 ceph2 ceph3 --public-network <span class="token number">192.168</span>.60.0/24 --cluster-network <span class="token number">192.168</span>.20.0/24
<span class="token function">ls</span>
<span class="token comment"># ceph.conf     ceph配置文件</span>
<span class="token comment"># ceph-deploy-ceph.log   ceph日志文件</span>
<span class="token comment"># ceph.mon.keyring   keyring主要做身份验证</span>
<span class="token comment">## 添加允许ceph时间偏移</span>
<span class="token comment"># echo &quot;mon clock drift allowed = 2&quot; &gt;&gt;/root/ceph-deploy/ceph.conf</span>
<span class="token comment"># echo &quot;mon clock drift warn backoff = 30&quot; &gt;&gt;/root/ceph-deploy/ceph.conf</span>

<span class="token comment">## 在所有节点执行</span>
<span class="token comment"># yum install -y ceph ceph-fuse rbd ceph-radosgw</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> ceph ceph-mon ceph-mgr ceph-radosgw ceph-mds
<span class="token comment">## 当然如果你不在乎网络问题，也可以使用官方推荐的安装方式,下面的方式会重新给我们配置yum源，这里不太推荐</span>
<span class="token comment">## –no-adjust-repos 是直接使用本地源，不生成官方源</span>
<span class="token comment"># ceph-deploy install --no-adjust-repos ceph1 ceph2 ceph3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="监控节点-monitor" tabindex="-1"><a class="header-anchor" href="#监控节点-monitor" aria-hidden="true">#</a> 监控节点（monitor）</h3><blockquote><p>官方介绍：为了获得高可用性，您应该运行带有至少三个监视器的生产Ceph集群。</p><p>维护着展示集群状态的各种图表， 包括监视器图、 OSD 图、归置组（ PG ）图、和 CRUSH 图。Ceph 保存着发生在Monitors、OSD 和 PG上的每一次状态变更的历史信息（称为 epoch ）。监视器还负责管理守护进程和客户端之间的身份验证。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 在节点1上执行。</span>
<span class="token builtin class-name">cd</span> /root/ceph-deploy
ceph-deploy mon create-initial
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="管理服务-mgr" tabindex="-1"><a class="header-anchor" href="#管理服务-mgr" aria-hidden="true">#</a> 管理服务（mgr）</h3><blockquote><p>负责跟踪运行时指标和Ceph 集群的当前状态，包括存储利用率，当前性能指标和系统负载。Ceph Manager守护进程还托管基于python的插件来管理和公开Ceph集群信息，包括基于Web的Ceph Manager Dashboard和 REST API。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 在节点1上执行。</span>
<span class="token comment">## 配置manager节点</span>
ceph-deploy mgr create ceph1 ceph2 ceph3
<span class="token comment">## 拷贝 配置文件及密钥到其他 monitor节点</span>
ceph-deploy admin ceph1 ceph2 ceph3
<span class="token comment">## 查看集群及服务状态</span>
ceph <span class="token parameter variable">-s</span>
<span class="token comment"># health: 显示集群当前状态。</span>
<span class="token comment"># services:显示的mon、mgr、mds、osd服务状态。</span>
<span class="token comment"># io:     显示当前的IO读写速率</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建osd" tabindex="-1"><a class="header-anchor" href="#创建osd" aria-hidden="true">#</a> 创建OSD</h3><blockquote><p>主要是存储数据，处理数据的复制、恢复、回填、再均衡，并通过检查其他OSD守护进程的心跳来向Ceph Monitors 提供一些监控信息。</p><p>冗余和高可用性通常至少需要3个Ceph OSD。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ssh</span> ceph1 lsblk
<span class="token function">ssh</span> ceph2 lsblk
<span class="token function">ssh</span> ceph3 lsblk

<span class="token comment">## 在三个节点上执行lsblk查看磁盘信息，将sdb和sdc磁盘作为集群的osd存储使用。</span>
<span class="token comment">## 在节点1上执行。</span>
<span class="token comment">## ceph1创建OSD</span>
ceph-deploy osd create ceph1 <span class="token parameter variable">--data</span> /dev/sdb
ceph-deploy osd create ceph1 <span class="token parameter variable">--data</span> /dev/sdc
<span class="token comment">## ceph2创建OSD</span>
ceph-deploy osd create ceph2 <span class="token parameter variable">--data</span> /dev/sdb
ceph-deploy osd create ceph2 <span class="token parameter variable">--data</span> /dev/sdc
<span class="token comment">## ceph3创建OSD</span>
ceph-deploy osd create ceph3 <span class="token parameter variable">--data</span> /dev/sdb
ceph-deploy osd create ceph3 <span class="token parameter variable">--data</span> /dev/sdc
<span class="token comment">## 创建完成后，查看OSD信息：</span>
<span class="token function">ssh</span> ceph1 ceph <span class="token parameter variable">-s</span>
<span class="token function">ssh</span> ceph2 ceph <span class="token parameter variable">-s</span>
<span class="token function">ssh</span> ceph3 ceph <span class="token parameter variable">-s</span>
<span class="token comment">## 查看osd列表：</span>
<span class="token function">ssh</span> ceph1 ceph osd tree
<span class="token function">ssh</span> ceph2 ceph osd tree
<span class="token function">ssh</span> ceph3 ceph osd tree
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建mds" tabindex="-1"><a class="header-anchor" href="#创建mds" aria-hidden="true">#</a> 创建MDS</h3><blockquote><p>用于cephfs文件系统</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 在节点1上执行</span>
ceph-deploy mds create ceph1 ceph2 ceph3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="服务验证" tabindex="-1"><a class="header-anchor" href="#服务验证" aria-hidden="true">#</a> 服务验证</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 在三个节点上执行。</span>
<span class="token comment">## 检查mon服务</span>
systemctl status ceph-mon.target
<span class="token comment">## 检查mds服务</span>
systemctl status ceph-mds.target
<span class="token comment">## 检查mgr服务</span>
systemctl status ceph-mgr.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h2><h3 id="cephfs文件系统" tabindex="-1"><a class="header-anchor" href="#cephfs文件系统" aria-hidden="true">#</a> CephFS文件系统</h3><blockquote><p>主要应用于网络共享存储。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">###### 创建Pool</span>
<span class="token comment">## PG总数= (OSD数*100) /最大副本数/池数(结果必须舍入到最接近2的N次幂的值) </span>
ceph osd pool create cephfs_data <span class="token number">32</span>
pool <span class="token string">&#39;cephfs_data&#39;</span> created
ceph osd pool create cephfs_metadata <span class="token number">32</span>
pool <span class="token string">&#39;cephfs_metadata&#39;</span> created
<span class="token comment">###### 创建ceph文件系统</span>
ceph fs new cephfs cephfs_metadata cephfs_data
<span class="token comment">## ceph文件系统查看及状态</span>
ceph fs status
<span class="token comment">###### ceph文件系统挂载</span>
<span class="token comment">## 将ceph文件系统挂载在三个节点的目录下，测试文件系统是否正常运行</span>
<span class="token comment">## 创建挂载目录</span>
<span class="token function">ssh</span> ceph1 <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /mycephfs
<span class="token function">ssh</span> ceph1 <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /mycephfs
<span class="token function">ssh</span> ceph1 <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /mycephfs
<span class="token comment">## 挂载cephfs至/mycephfs目录</span>
<span class="token comment">## 1) 查看管理员密钥</span>
<span class="token function">cat</span> /etc/ceph/ceph.client.admin.keyring 
<span class="token comment"># [client.admin]</span>
<span class="token comment"># key = AQDYYNtj75TmNRAAaScLPYSsbtTIKE4at2Zdyg==</span>
<span class="token comment"># 将密钥保存为文件（三个节点执行）</span>
<span class="token function">ssh</span> ceph1 <span class="token builtin class-name">echo</span> <span class="token string">&quot; AQDYYNtj75TmNRAAaScLPYSsbtTIKE4at2Zdyg==&quot;</span> <span class="token operator">&gt;</span> /etc/ceph/ceph.secret
<span class="token function">ssh</span> ceph2 <span class="token builtin class-name">echo</span> <span class="token string">&quot; AQDYYNtj75TmNRAAaScLPYSsbtTIKE4at2Zdyg==&quot;</span> <span class="token operator">&gt;</span> /etc/ceph/ceph.secret
<span class="token function">ssh</span> ceph3 <span class="token builtin class-name">echo</span> <span class="token string">&quot; AQDYYNtj75TmNRAAaScLPYSsbtTIKE4at2Zdyg==&quot;</span> <span class="token operator">&gt;</span> /etc/ceph/ceph.secret
<span class="token comment">## 2）挂载ceph文件系统</span>
<span class="token function">ssh</span> ceph1 <span class="token function">mount</span> <span class="token parameter variable">-t</span> ceph cloud1:6789:/ /mycephfs <span class="token parameter variable">-o</span> <span class="token assign-left variable">name</span><span class="token operator">=</span>admin,secretfile<span class="token operator">=</span>/etc/ceph/ceph.secret
<span class="token function">ssh</span> ceph2 <span class="token function">mount</span> <span class="token parameter variable">-t</span> ceph cloud1:6789:/ /mycephfs <span class="token parameter variable">-o</span> <span class="token assign-left variable">name</span><span class="token operator">=</span>admin,secretfile<span class="token operator">=</span>/etc/ceph/ceph.secret
<span class="token function">ssh</span> ceph3 <span class="token function">mount</span> <span class="token parameter variable">-t</span> ceph cloud1:6789:/ /mycephfs <span class="token parameter variable">-o</span> <span class="token assign-left variable">name</span><span class="token operator">=</span>admin,secretfile<span class="token operator">=</span>/etc/ceph/ceph.secret
<span class="token comment">## 3）查看挂载目录</span>
<span class="token function">ssh</span> ceph1 <span class="token function">df</span> <span class="token parameter variable">-h</span>
<span class="token function">ssh</span> ceph2 <span class="token function">df</span> <span class="token parameter variable">-h</span>
<span class="token function">ssh</span> ceph3 <span class="token function">df</span> <span class="token parameter variable">-h</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="对象存储" tabindex="-1"><a class="header-anchor" href="#对象存储" aria-hidden="true">#</a> 对象存储</h3><blockquote><p>主要应用于图片，视频，镜像、日志等对象存储。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">###### 部署rgw集群</span>
<span class="token comment">## 在节点1上执行</span>
<span class="token builtin class-name">cd</span> /root/ceph-deploy
ceph-deploy rgw create cloud1 cloud2 cloud3
<span class="token comment">## 修改默认端口</span>
<span class="token comment">## 部署完成后默认端口是7480，将其修改为80</span>
<span class="token comment">## 修改/root/ceph-deploy目录下的ceph.conf文件，执行如下添加内容：</span>
<span class="token builtin class-name">cd</span> /root/ceph-deploy
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> ceph.conf <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
[client.rgw.cloud1]
rgw_frontends = &quot;civetweb port=80&quot;
[client.rgw.cloud2]
rgw_frontends = &quot;civetweb port=80&quot;
[client.rgw.cloud3]
rgw_frontends = &quot;civetweb port=80&quot;
EOF</span>
<span class="token comment">## 将配置文件推送集群其他节点</span>
<span class="token comment">## 在节点1上执行</span>
ceph-deploy --overwrite-conf config push cloud1 cloud2 cloud3
<span class="token comment">## 重启三个节点的radosgw服务</span>
<span class="token function">ssh</span> ceph1 systemctl restart ceph-radosgw.target
<span class="token function">ssh</span> ceph2 systemctl restart ceph-radosgw.target
<span class="token function">ssh</span> ceph3 systemctl restart ceph-radosgw.target
<span class="token comment">## 测试使用root账户进行集群访问验证</span>
ceph <span class="token parameter variable">-s</span> <span class="token parameter variable">-k</span> /var/lib/ceph/radosgw/ceph-rgw.cloud1/keyring <span class="token parameter variable">--name</span> client.rgw.cloud1

<span class="token comment">## 使用s3 api访问对象存储</span>
<span class="token comment">## 在节点1上执行。</span>
<span class="token comment">## 创建radosgw用户</span>
radosgw-admin user create <span class="token parameter variable">--uid</span><span class="token operator">=</span>radosgw --display-name<span class="token operator">=</span><span class="token string">&#39;radosgw&#39;</span> <span class="token parameter variable">-k</span> /var/lib/ceph/radosgw/ceph-rgw.cloud1/keyring <span class="token parameter variable">--name</span> client.rgw.cloud1
<span class="token comment">## 创建完成之后需要把access_key和secret_key保存下来，也可以使用下面的命令来查看</span>
radosgw-admin user info <span class="token parameter variable">--uid</span><span class="token operator">=</span>radosgw --display-name<span class="token operator">=</span><span class="token string">&#39;radosgw&#39;</span> <span class="token parameter variable">-k</span> /var/lib/ceph/radosgw/ceph-rgw.cloud1/keyring <span class="token parameter variable">--name</span> client.rgw.cloud1

<span class="token comment">## 测试S3接口是否可用，采用s3cmd进行测试</span>
<span class="token comment">## 安装s3cmd软件</span>
<span class="token comment">## 节点1执行</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> /root/s3cmd-2.3.0-1.el7.noarch.rpm
<span class="token comment">## 生成配置文件</span>
s3cmd <span class="token parameter variable">--configure</span>
<span class="token comment">## 需要修改的内容：</span>
Access Key: D028HA7T16KJHU2602YA                      <span class="token comment"># 粘贴服务端生成的Access Key</span>
Secret Key: RWczKVORMdDBw2mtgLs2dUPq2xrCehnjOtB6pHPY  <span class="token comment"># 粘贴服务端生成的Secret Key</span>
Default Region <span class="token punctuation">[</span>US<span class="token punctuation">]</span>:                                  <span class="token comment"># 直接回车即可</span>
S3 Endpoint <span class="token punctuation">[</span>s3.amazonaws.com<span class="token punctuation">]</span>: <span class="token number">192.168</span>.200.10        <span class="token comment"># 输入对象存储的IP地址</span>
DNS-style bucket+hostname:port template <span class="token keyword">for</span> accessing a bucket <span class="token punctuation">[</span>%<span class="token punctuation">(</span>bucket<span class="token punctuation">)</span>s.s3.amazonaws.com<span class="token punctuation">]</span>:  %<span class="token punctuation">(</span>bucket<span class="token punctuation">)</span>.192.168.200.10    
 <span class="token comment"># 输入对象存储的bucket地址</span>
Encryption password:                              <span class="token comment"># 空密码回车</span>
Path to GPG program <span class="token punctuation">[</span>/usr/bin/gpg<span class="token punctuation">]</span>:               <span class="token comment"># /usr/bin/gpg命令路径 回车</span>
Use HTTPS protocol <span class="token punctuation">[</span>Yes<span class="token punctuation">]</span>: no                      <span class="token comment"># 是否使用https，选no</span>
HTTP Proxy server name:                           <span class="token comment"># haproxy 留空回车</span>
Test access with supplied credentials? <span class="token punctuation">[</span>Y/n<span class="token punctuation">]</span> n
Save settings? <span class="token punctuation">[</span>y/N<span class="token punctuation">]</span> y                           <span class="token comment"># y 要保存配置文件</span>
Configuration saved to <span class="token string">&#39;/root/.s3cfg&#39;</span>            <span class="token comment"># 最后配置文件保存的位置/root.s3cfg</span>

<span class="token comment">## s3验证基础操作</span>
s3cmd mb s3://my-bucket                 <span class="token comment"># 创建my-bucket桶</span>
s3cmd <span class="token function">ls</span>                                <span class="token comment"># 查看所有的桶</span>
s3cmd put /etc/hosts s3://my-bucke      <span class="token comment"># 向指定桶中上传/etc/hosts文件</span>
s3cmd <span class="token function">ls</span> s3://my-bucket                 <span class="token comment"># 显示my-bucket中的文件</span>
s3cmd del s3://my-bucket/hosts          <span class="token comment"># 删除my-bucket中的hosts文件</span>
s3cmd rb s3://my-bucket                 <span class="token comment"># 删除my-bucket</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="块存储" tabindex="-1"><a class="header-anchor" href="#块存储" aria-hidden="true">#</a> 块存储</h3><blockquote><p>主要应用于k8s，openstack云计算等场景</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 创建pool</span>
ceph osd pool create rbd <span class="token number">32</span> <span class="token number">32</span>
ceph osd pool application <span class="token builtin class-name">enable</span> rbd rbd
<span class="token comment">## 创建块设备镜像</span>
rbd create <span class="token parameter variable">--size</span> 5000M img01   <span class="token comment">#创建一个5000MB的块设备。</span>
rbd info img01                  <span class="token comment">#查看镜像信息</span>
<span class="token comment">## 镜像映射</span>
rbd feature disable img01 exclusive-lock, object-map, fast-diff, deep-flatten
rbd map img01
<span class="token comment"># /dev/rbd0</span>
<span class="token comment">## 格式化块设备镜像</span>
mkfs.xfs /dev/rbd0
<span class="token comment">## 挂载至本地</span>
<span class="token function">mount</span> /dev/rbd0 /media/
<span class="token function">df</span> <span class="token parameter variable">-h</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,48);function v(b,h){const s=c("router-link");return t(),p("div",null,[o(" more "),n("nav",m,[n("ul",null,[n("li",null,[a(s,{to:"#节点规划"},{default:e(()=>[i("节点规划")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#节点角色"},{default:e(()=>[i("节点角色")]),_:1})])])]),n("li",null,[a(s,{to:"#系统配置"},{default:e(()=>[i("系统配置")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#网络设置"},{default:e(()=>[i("网络设置")]),_:1})]),n("li",null,[a(s,{to:"#host配置"},{default:e(()=>[i("host配置")]),_:1})]),n("li",null,[a(s,{to:"#节点互信"},{default:e(()=>[i("节点互信")]),_:1})]),n("li",null,[a(s,{to:"#系统参数设置"},{default:e(()=>[i("系统参数设置")]),_:1})]),n("li",null,[a(s,{to:"#防火墙设置"},{default:e(()=>[i("防火墙设置")]),_:1})]),n("li",null,[a(s,{to:"#时间同步"},{default:e(()=>[i("时间同步")]),_:1})]),n("li",null,[a(s,{to:"#yum源设置"},{default:e(()=>[i("yum源设置")]),_:1})])])]),n("li",null,[a(s,{to:"#创建用户"},{default:e(()=>[i("创建用户")]),_:1})]),n("li",null,[a(s,{to:"#安装ceph"},{default:e(()=>[i("安装Ceph")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#配置ceph-deploy"},{default:e(()=>[i("配置ceph-deploy")]),_:1})]),n("li",null,[a(s,{to:"#监控节点-monitor"},{default:e(()=>[i("监控节点（monitor）")]),_:1})]),n("li",null,[a(s,{to:"#管理服务-mgr"},{default:e(()=>[i("管理服务（mgr）")]),_:1})]),n("li",null,[a(s,{to:"#创建osd"},{default:e(()=>[i("创建OSD")]),_:1})]),n("li",null,[a(s,{to:"#创建mds"},{default:e(()=>[i("创建MDS")]),_:1})]),n("li",null,[a(s,{to:"#服务验证"},{default:e(()=>[i("服务验证")]),_:1})])])]),n("li",null,[a(s,{to:"#使用场景"},{default:e(()=>[i("使用场景")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#cephfs文件系统"},{default:e(()=>[i("CephFS文件系统")]),_:1})]),n("li",null,[a(s,{to:"#对象存储"},{default:e(()=>[i("对象存储")]),_:1})]),n("li",null,[a(s,{to:"#块存储"},{default:e(()=>[i("块存储")]),_:1})])])])])]),u])}const f=l(r,[["render",v],["__file","21.Ceph安装-deploy.html.vue"]]);export{f as default};
