import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as a,f as e}from"./app-efa5e96e.js";const l={},i=e(`<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> epel-release
<span class="token comment">## createrepo和httpd用于创建内网仓库和提供http协议访问</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> createrepo httpd

<span class="token comment">## 创建本地 YUM 仓库目录 我定义的是repos 你也可以改成其他名称</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /var/www/html/repos/<span class="token punctuation">{</span>base,extras,updates<span class="token punctuation">}</span>

<span class="token comment">## 上传centos镜像到服务器并挂载然后copy所有软件包到我刚才创建的仓库目录里</span>
<span class="token function">mount</span> /dev/cdrom /mnt  <span class="token comment"># 这个是vmware虚拟机时候用 下边是镜像时候用</span>
<span class="token comment"># 挂磁盘镜像到/mnt的话执行 mount -o loop CentOS-7-x86_64-DVD-1804.iso /mnt</span>
<span class="token function">cp</span> <span class="token parameter variable">-R</span> /mnt/Packages/* /var/www/html/repos/base
<span class="token function">umount</span> /mnt

<span class="token comment">## 创建本地 YUM 仓库 建立元数据</span>
createrepo /var/www/html/repos/base
createrepo /var/www/html/repos/extras
createrepo /var/www/html/repos/updates

<span class="token comment">## 修改http配置访问yum仓库</span>
<span class="token function">vi</span> /etc/httpd/conf.d/repos.conf
Alias /repos <span class="token string">&quot;/var/www/html/repos&quot;</span>

<span class="token operator">&lt;</span>Directory <span class="token string">&quot;/var/www/html/repos&quot;</span><span class="token operator">&gt;</span>
  Options Indexes FollowSymLinks
  Require all granted
<span class="token operator">&lt;</span>/Directory<span class="token operator">&gt;</span>

<span class="token comment">## 启动并开启 httpd 服务</span>
systemctl start httpd
systemctl <span class="token builtin class-name">enable</span> httpd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置yum仓库-用yum下载软件的目录" tabindex="-1"><a class="header-anchor" href="#配置yum仓库-用yum下载软件的目录" aria-hidden="true">#</a> 配置yum仓库 用yum下载软件的目录</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> /etc/yum.conf
<span class="token assign-left variable">cachedir</span><span class="token operator">=</span>/var/www/html/repos/base
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在内网其他服务器上配置-yum-仓库-我的ip需改成你的" tabindex="-1"><a class="header-anchor" href="#在内网其他服务器上配置-yum-仓库-我的ip需改成你的" aria-hidden="true">#</a> 在内网其他服务器上配置 YUM 仓库 我的IP需改成你的</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> /etc/yum.repos.d/local.repo
<span class="token punctuation">[</span>local-base<span class="token punctuation">]</span>
<span class="token assign-left variable">name</span><span class="token operator">=</span>Local CentOS <span class="token variable">$releasever</span> - Base
<span class="token assign-left variable">baseurl</span><span class="token operator">=</span>http://192.168.1.30/repos/base
<span class="token assign-left variable">enabled</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">gpgcheck</span><span class="token operator">=</span><span class="token number">0</span>

<span class="token punctuation">[</span>local-extras<span class="token punctuation">]</span>
<span class="token assign-left variable">name</span><span class="token operator">=</span>Local CentOS <span class="token variable">$releasever</span> - Extras
<span class="token assign-left variable">baseurl</span><span class="token operator">=</span>http://192.168.1.30/repos/extras
<span class="token assign-left variable">enabled</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">gpgcheck</span><span class="token operator">=</span><span class="token number">0</span>

<span class="token punctuation">[</span>local-updates<span class="token punctuation">]</span>
<span class="token assign-left variable">name</span><span class="token operator">=</span>Local CentOS <span class="token variable">$releasever</span> - Updates
<span class="token assign-left variable">baseurl</span><span class="token operator">=</span>http://192.168.1.30/repos/updates
<span class="token assign-left variable">enabled</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">gpgcheck</span><span class="token operator">=</span><span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),t=[i];function p(r,c){return n(),a("div",null,t)}const v=s(l,[["render",p],["__file","20.自建yum仓库.html.vue"]]);export{v as default};
