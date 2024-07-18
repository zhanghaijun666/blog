import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as c,c as o,e as r,a as s,d as a,w as e,f as p,b as t}from"./app-efa5e96e.js";const d={},m={class:"table-of-contents"},u=p(`<h2 id="在线安装" tabindex="-1"><a class="header-anchor" href="#在线安装" aria-hidden="true">#</a> 在线安装</h2><h3 id="脚本安装-推荐" tabindex="-1"><a class="header-anchor" href="#脚本安装-推荐" aria-hidden="true">#</a> 脚本安装（推荐）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 下载Docker安装脚本</span>
<span class="token function">sudo</span> <span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://get.docker.com <span class="token parameter variable">-o</span> get-docker.sh
<span class="token comment"># 使用阿里镜像源下载并安装Docker</span>
<span class="token function">sudo</span> <span class="token function">sh</span> get-docker.sh <span class="token parameter variable">--mirror</span> Aliyun
systemctl start <span class="token function">docker</span> <span class="token operator">&amp;&amp;</span> systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span> <span class="token operator">&amp;&amp;</span> systemctl status <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="yum-安装" tabindex="-1"><a class="header-anchor" href="#yum-安装" aria-hidden="true">#</a> YUM 安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1、安装所需环境</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils device-mapper-persistent-data lvm2
<span class="token comment"># 2、配置yum仓库</span>
<span class="token comment"># yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo</span>
yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
<span class="token comment"># 3、安装Docker</span>
yum list docker-ce <span class="token parameter variable">--showduplicates</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-r</span>
yum <span class="token function">install</span> docker-ce docker-ce-cli containerd.io
<span class="token comment"># 4、启动Docker</span>
systemctl start <span class="token function">docker</span> <span class="token operator">&amp;&amp;</span> systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span> <span class="token operator">&amp;&amp;</span> systemctl status <span class="token function">docker</span>


<span class="token comment">## 2. 官方一键脚本安装</span>
<span class="token comment"># 安装所需环境</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils device-mapper-persistent-data lvm2
<span class="token comment"># 官方一键脚本安装</span>
<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> get.docker.com <span class="token parameter variable">-o</span> get-docker.sh
<span class="token function">sh</span> get-docker.sh <span class="token parameter variable">--mirror</span> Aliyun
<span class="token comment"># 添加内核参数</span>
<span class="token function">tee</span> <span class="token parameter variable">-a</span> /etc/sysctl.conf <span class="token operator">&lt;&lt;-</span><span class="token string">EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF</span>
<span class="token comment"># 刷新内核参数</span>
<span class="token function">sysctl</span> <span class="token parameter variable">-p</span>
<span class="token comment"># 修改Docker仓库为国内镜像站</span>
<span class="token function">curl</span> <span class="token parameter variable">-sSL</span> https://get.daocloud.io/daotools/set_mirror.sh <span class="token operator">|</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span> https://pclhthp0.mirror.aliyuncs.com
<span class="token comment"># 启动Docker</span>
systemctl start <span class="token function">docker</span> <span class="token operator">&amp;&amp;</span> systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span> <span class="token operator">&amp;&amp;</span> systemctl status <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="apt-安装" tabindex="-1"><a class="header-anchor" href="#apt-安装" aria-hidden="true">#</a> APT 安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装 apt 依赖包</span>
<span class="token function">apt-get</span> <span class="token function">install</span> apt-transport-https ca-certificates <span class="token function">curl</span> gnupg-agent software-properties-common

<span class="token comment"># 添加 Docker 的官方 GPG 密钥</span>
<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu/gpg <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -

<span class="token comment"># 使用以下指令设置稳定版仓库</span>
add-apt-repository <span class="token punctuation">\\</span>
   <span class="token string">&quot;deb [arch=amd64] https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu/ \\
  <span class="token variable"><span class="token variable">$(</span>lsb_release <span class="token parameter variable">-cs</span><span class="token variable">)</span></span> \\
  stable&quot;</span>

<span class="token comment"># 安装最新版本的 Docker Engine-Community 和 containerd </span>
<span class="token function">apt-get</span> update
<span class="token function">apt-get</span> <span class="token function">install</span> docker-ce docker-ce-cli containerd.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="离线安装" tabindex="-1"><a class="header-anchor" href="#离线安装" aria-hidden="true">#</a> 离线安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 下载地址：   https://download.docker.com/linux/static/stable/x86_64/</span>
<span class="token comment">## RPM下载地址：https://mirrors.aliyun.com/docker-ce/linux/centos/7/x86_64/stable/Packages/docker-ce-20.10.22-3.el7.x86_64.rpm</span>
<span class="token comment"># 或者在一台联网的机器上在线下载再拷贝到离线机器上安装docker</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils device-mapper-persistent-data lvm2
<span class="token comment"># 设置yum源</span>
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
<span class="token comment"># 查看所有仓库中所有docker版本，并选择特定版本安装</span>
yum list docker-ce <span class="token parameter variable">--showduplicates</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-r</span>
<span class="token comment"># 获取rpm包以及相关依赖</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /opt/dockerrpm/ <span class="token operator">&amp;&amp;</span> yum <span class="token function">install</span> docker-ce <span class="token parameter variable">--downloadonly</span> <span class="token parameter variable">--downloaddir</span><span class="token operator">=</span>/opt/dockerrpm/

<span class="token comment"># 将/opt/dockerrpm/复制到目标机器</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ivhU</span> *.rpm <span class="token parameter variable">--nodeps</span> <span class="token parameter variable">--force</span>
systemctl status <span class="token function">docker</span> <span class="token operator">&amp;&amp;</span> systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span> <span class="token operator">&amp;&amp;</span> systemctl status <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="镜像拉取慢的问题" tabindex="-1"><a class="header-anchor" href="#镜像拉取慢的问题" aria-hidden="true">#</a> 镜像拉取慢的问题</h2><blockquote><p>Docker Hub 是 docker 默认的公用 Registry，不过缺点是国内下载会比较慢</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> /etc/docker/daemon.json
<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;</span><span class="token string">EOF
{
    &quot;registry-mirrors&quot;: [
      &quot;http://hub-mirror.c.163.com&quot;,
      &quot;https://docker.mirrors.ustc.edu.cn&quot;
    ],
    &quot;insecure-registries&quot;: []
    &quot;max-concurrent-downloads&quot;: 3,
    &quot;live-restore&quot;: true,
    &quot;max-concurrent-uploads&quot;: 5,
    &quot;debug&quot;: true,
    &quot;log-opts&quot;: {
      &quot;max-size&quot;: &quot;10m&quot;,
      &quot;max-file&quot;: &quot;5&quot;
    }
}
EOF</span>
<span class="token comment"># 需要重启 docker 服务</span>
systemctl daemon-reload <span class="token operator">&amp;&amp;</span> systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-常见问题" tabindex="-1"><a class="header-anchor" href="#docker-常见问题" aria-hidden="true">#</a> docker 常见问题</h2><ul><li>WARNING: IPv4 forwarding is disabled. Networking will not work.</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 修改配置文件</span>
<span class="token comment"># echo &quot;net.ipv4.ip_forward=1&quot; &gt; /etc/sysctl.conf</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;net.ipv4.ip_forward=1&quot;</span> <span class="token operator">&gt;</span> /usr/lib/sysctl.d/00-system.conf
<span class="token comment"># 重启网络和docker</span>
systemctl restart network <span class="token operator">&amp;&amp;</span> systemctl restart <span class="token function">docker</span>
<span class="token comment"># 查看是否修改成功（备注：返回1，就是成功）</span>
<span class="token function">sysctl</span> net.ipv4.ip_forward
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15);function v(k,b){const n=i("router-link");return c(),o("div",null,[r(" more "),s("nav",m,[s("ul",null,[s("li",null,[a(n,{to:"#在线安装"},{default:e(()=>[t("在线安装")]),_:1}),s("ul",null,[s("li",null,[a(n,{to:"#脚本安装-推荐"},{default:e(()=>[t("脚本安装（推荐）")]),_:1})]),s("li",null,[a(n,{to:"#yum-安装"},{default:e(()=>[t("YUM 安装")]),_:1})]),s("li",null,[a(n,{to:"#apt-安装"},{default:e(()=>[t("APT 安装")]),_:1})])])]),s("li",null,[a(n,{to:"#离线安装"},{default:e(()=>[t("离线安装")]),_:1})]),s("li",null,[a(n,{to:"#镜像拉取慢的问题"},{default:e(()=>[t("镜像拉取慢的问题")]),_:1})]),s("li",null,[a(n,{to:"#docker-常见问题"},{default:e(()=>[t("docker 常见问题")]),_:1})])])]),u])}const g=l(d,[["render",v],["__file","15.Docker安装-Linux.html.vue"]]);export{g as default};
