import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o,c as r,a as n,b as s,d as a,e as d,w as i,f as c}from"./app-efa5e96e.js";const u={},v=n("p",null,"Nginx (engine x) 是一个轻量级的、高性能的、基于 Http 的、反向代理服务器，静态 web 服务器。",-1),m={href:"http://nginx.org",target:"_blank",rel:"noopener noreferrer"},k={href:"https://www.nginx.cn/doc/index.html",target:"_blank",rel:"noopener noreferrer"},b={class:"table-of-contents"},g=c(`<h2 id="nginx-源码安装-推荐" tabindex="-1"><a class="header-anchor" href="#nginx-源码安装-推荐" aria-hidden="true">#</a> nginx 源码安装（推荐）</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">########################</span>
<span class="token comment">## Fancy美化索引目录-源码地址: https://github.com/aperezdc/ngx-fancyindex</span>
<span class="token comment">## Fancy美化索引目录-主题地址: https://github.com/Naereen/Nginx-Fancyindex-Theme</span>
<span class="token comment">########################</span>
<span class="token comment"># 安装依赖库</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> gcc gcc-c++ pcre-devel openssl-devel
<span class="token comment"># 创建临时目录，编译完毕可删除（可选）</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ~/app <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> ~/app
<span class="token function">wget</span> http://nginx.org/download/nginx-1.23.1.tar.gz
<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> nginx-1.23.1.tar.gz
<span class="token function">mv</span> nginx-1.23.1 nginx
<span class="token comment"># Fancy美化索引目录</span>
<span class="token function">wget</span> <span class="token parameter variable">-O</span> fancyindex.zip https://github.com/aperezdc/ngx-fancyindex/archive/v0.4.3.zip
<span class="token function">unzip</span> fancyindex.zip
<span class="token function">mv</span> ngx-fancyindex-* ngx-fancyindex
<span class="token comment"># 生成 makefile</span>
<span class="token builtin class-name">cd</span> ./nginx <span class="token operator">&amp;&amp;</span> ./configure <span class="token punctuation">\\</span>
      <span class="token parameter variable">--prefix</span><span class="token operator">=</span>/usr/local/nginx <span class="token punctuation">\\</span>
      --pid-path<span class="token operator">=</span>/usr/local/nginx/logs/nginx.pid <span class="token punctuation">\\</span>
      --with-cc-opt<span class="token operator">=</span>-O2 <span class="token punctuation">\\</span>
      --with-http_stub_status_module <span class="token punctuation">\\</span>
      --with-http_ssl_module <span class="token punctuation">\\</span>
      --with-http_v2_module <span class="token punctuation">\\</span>
      --with-http_auth_request_module <span class="token punctuation">\\</span>
      --with-stream_ssl_module <span class="token punctuation">\\</span>
      --with-stream_ssl_preread_module <span class="token punctuation">\\</span>
      --add-module<span class="token operator">=</span><span class="token punctuation">..</span>/ngx-fancyindex
<span class="token comment"># 没有报错，开始编译安装</span>
<span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token function">install</span>
<span class="token comment"># 编译安装完成，查看目录</span>
ll /usr/local/nginx/
<span class="token comment"># 添加到环境变量</span>
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/local/nginx/sbin/nginx /usr/local/sbin/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="yum-安装" tabindex="-1"><a class="header-anchor" href="#yum-安装" aria-hidden="true">#</a> yum 安装</h2>`,3),x={href:"http://nginx.org/en/linux_packages.html",target:"_blank",rel:"noopener noreferrer"},h={href:"https://www.yiibai.com/nginx/nginx-install-linux-packages.html",target:"_blank",rel:"noopener noreferrer"},f=c(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> yum-utils
<span class="token comment">## 配置yum源</span>
<span class="token comment">#rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /etc/yum.repos.d/nginx.repo <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/<span class="token variable">$releasever</span>/<span class="token variable">$basearch</span>/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

[nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/centos/<span class="token variable">$releasever</span>/<span class="token variable">$basearch</span>/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
EOF</span>
yum-config-manager <span class="token parameter variable">--enable</span> nginx-mainline
<span class="token comment">## yum安装nginx</span>
yum <span class="token function">install</span> nginx <span class="token parameter variable">-y</span>
<span class="token comment">## 一般情况下，nginx.conf文件在 /usr/local/nginx/conf  或者 /etc/nginx  或者 /usr/local/etc/nginx 目录下</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="离线安装" tabindex="-1"><a class="header-anchor" href="#离线安装" aria-hidden="true">#</a> 离线安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## rmp下载地址</span>
<span class="token comment"># http://nginx.org/packages/centos/7/x86_64/RPMS/</span>
<span class="token function">wget</span> http://nginx.org/packages/centos/7/x86_64/RPMS/nginx-1.22.0-1.el7.ngx.x86_64.rpm
<span class="token comment">## 检查是否安装了nginx</span>
<span class="token function">rpm</span> -qa<span class="token operator">|</span><span class="token function">grep</span> nginx
<span class="token comment">## 卸载nginx</span>
systemctl stop nginx <span class="token operator">&amp;&amp;</span> <span class="token function">rpm</span> <span class="token parameter variable">-e</span> nginx <span class="token operator">&amp;&amp;</span> <span class="token function">rm</span> <span class="token parameter variable">-rf</span> /etc/nginx/
<span class="token comment">## 安装nginx</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> nginx-1.22.0-1.el7.ngx.x86_64.rpm
<span class="token comment">## 报错：libpcre2-8.so.0(openssl)(64bit) 被 nginx-1:1.22.0-1.el7.ngx.x86_64 需要</span>
<span class="token comment">## 缺少openssl， 直接rpm安装 http://mirrors.163.com/centos/7/os/x86_64/Packages/</span>
<span class="token function">wget</span> http://mirrors.163.com/centos/7/os/x86_64/Packages/openssl-libs-1.0.2k-19.el7.x86_64.rpm
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> openssl-libs-1.0.2k-19.el7.x86_64.rpm <span class="token parameter variable">--force</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="离线安装-1" tabindex="-1"><a class="header-anchor" href="#离线安装-1" aria-hidden="true">#</a> 离线安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> ~/nginx <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> ~/nginx
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> <span class="token function">wget</span>
<span class="token function">wget</span> https://nginx.org/download/nginx-1.21.6.tar.gz
<span class="token function">tar</span> <span class="token parameter variable">-xvzf</span> nginx-1.21.6.tar.gz
<span class="token comment"># yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel</span>
yum <span class="token function">install</span> <span class="token parameter variable">--downloadonly</span> <span class="token parameter variable">--downloaddir</span><span class="token operator">=~</span>/nginx/ gcc-c++
yum <span class="token function">install</span> <span class="token parameter variable">--downloadonly</span> <span class="token parameter variable">--downloaddir</span><span class="token operator">=~</span>/nginx/ pcre pcre-devel4
yum <span class="token function">install</span> <span class="token parameter variable">--downloadonly</span> <span class="token parameter variable">--downloaddir</span><span class="token operator">=~</span>/nginx/ zlib zlib-devel
yum <span class="token function">install</span> <span class="token parameter variable">--downloadonly</span> <span class="token parameter variable">--downloaddir</span><span class="token operator">=~</span>/nginx/ openssl openssl-devel
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> <span class="token parameter variable">--nodeps</span> *.rpm
<span class="token builtin class-name">cd</span> nginx-1.21.6
./configure <span class="token parameter variable">--prefix</span><span class="token operator">=</span>/usr/local/nginx
<span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token function">install</span>
<span class="token comment"># 编译安装完成，查看目录</span>
ll /usr/local/nginx/
<span class="token comment"># 添加到环境变量</span>
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/local/nginx/sbin/nginx /usr/local/sbin/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx-命令" tabindex="-1"><a class="header-anchor" href="#nginx-命令" aria-hidden="true">#</a> nginx 命令</h2><details class="hint-container details"><summary>nginx 命令</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看 Nginx 命令的选项</span>
nginx –h
<span class="token comment"># Nginx 版本信息</span>
nginx –v
<span class="token comment"># 测试配置文件是否正确，默认只测试默认的配置文件 conf/nginx.conf。</span>
nginx –t
<span class="token comment"># 测试配置文件是否正确，并显示配置文件内容。</span>
nginx –T
<span class="token comment"># 在配置文件测试过程中，禁止显示非错误信息，即只显示错误信息。</span>
nginx –tq
<span class="token comment"># 可以结合-c 选项指定要测试的配置文件。注意，其不会启动 nginx。</span>
nginx <span class="token parameter variable">-c</span> /usr/local/nginx/conf/nginx.conf <span class="token parameter variable">-t</span>

<span class="token comment"># 强制停止 Nginx，无论当前工作进程是否正在处理工作。</span>
nginx –s stop
<span class="token comment"># 优雅停止 Nginx，使当前的工作进程完成当前工作后停止</span>
nginx –s quit
<span class="token comment"># 在不重启 Nginx 的前提下重新加载 Nginx 配置文件，称为平滑重启。</span>
nginx <span class="token parameter variable">-s</span> reload
<span class="token comment"># 重新打开日志文件。</span>
nginx –s reopen

<span class="token comment"># 指定 Nginx 配置文件的存放路径。</span>
nginx –p /usr/local/nginx/
<span class="token comment"># nginx –c（小写字母）可启动 Nginx，启动成功后无任何提示。默认加载的是 Nginx 安装目录下的 conf/nginx.cnf。</span>
nginx <span class="token parameter variable">-c</span> /usr/local/nginx/conf/nginx.conf

<span class="token comment"># 查看进程运行时间</span>
<span class="token function">ps</span> <span class="token parameter variable">-eo</span> pid,user,lstart,etime,cmd <span class="token operator">|</span> <span class="token function">grep</span> nginx
<span class="token comment"># 查看已经建立连接的数量</span>
<span class="token function">netstat</span> <span class="token parameter variable">-an</span> <span class="token operator">|</span> <span class="token function">grep</span> ESTABLISHED <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>
<span class="token comment"># 查看80端口的连接数</span>
<span class="token function">netstat</span> <span class="token parameter variable">-an</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;:80&quot;</span> <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查配置文件的是否正确 只显示错误信息</span>
nginx <span class="token parameter variable">-c</span> /usr/local/nginx/conf/nginx.conf –tq
<span class="token comment"># 重新加载配置文件</span>
nginx <span class="token parameter variable">-s</span> reload
<span class="token comment"># 优雅退出</span>
nginx –s quit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx-开机自启" tabindex="-1"><a class="header-anchor" href="#nginx-开机自启" aria-hidden="true">#</a> nginx 开机自启</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /usr/lib/systemd/system/nginx.service <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
[Unit]
Description=A high performance web server and a reverse proxy server
Documentation=man:nginx(8)
After=network.target

[Service]
Type=forking
PIDFile=/usr/local/nginx/logs/nginx.pid
ExecStartPre=/usr/local/nginx/sbin/nginx -t -q -g &#39;daemon on; master_process on;&#39;
ExecStart=/usr/local/nginx/sbin/nginx -g &#39;daemon on; master_process on;&#39;
ExecReload=/usr/local/nginx/sbin/nginx -g &#39;daemon on; master_process on;&#39; -s reload
ExecStop=-/sbin/start-stop-daemon --quiet --stop --retry QUIT/5 --pidfile /usr/local/nginx/logs/nginx.pid
TimeoutStopSec=5
KillMode=mixed

[Install]
WantedBy=multi-user.target
EOF</span>

systemctl daemon-reload <span class="token operator">&amp;&amp;</span> systemctl <span class="token builtin class-name">enable</span> nginx <span class="token operator">&amp;&amp;</span> systemctl start nginx <span class="token operator">&amp;&amp;</span> systemctl status nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="脚本部署" tabindex="-1"><a class="header-anchor" href="#脚本部署" aria-hidden="true">#</a> 脚本部署</h2><h3 id="脚本内容" tabindex="-1"><a class="header-anchor" href="#脚本内容" aria-hidden="true">#</a> 脚本内容</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token function-name function">ck_ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span>
        <span class="token keyword">then</span>
                <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$1</span> error.&quot;</span>
                <span class="token builtin class-name">exit</span> <span class="token number">1</span>
        <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token function-name function">download_ng</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token builtin class-name">cd</span>  /usr/local/src
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> nginx-1.23.0.tar.gz <span class="token punctuation">]</span>
    <span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;当前目录已经存在nginx-1.23.0.tar.gz&quot;</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;检测md5&quot;</span>
        <span class="token assign-left variable">ng_md5</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span>md5sum nginx-1.23.0.tar.gz<span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $1}&#39;</span><span class="token variable">\`</span></span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">\${ng_md5}</span> <span class="token operator">==</span> <span class="token string">&#39;e8768e388f26fb3d56a3c88055345219&#39;</span> <span class="token punctuation">]</span>
        <span class="token keyword">then</span>
            <span class="token builtin class-name">return</span> <span class="token number">0</span>
        <span class="token keyword">else</span>
            <span class="token function">sudo</span> /bin/mv nginx-1.23.0.tar.gz nginx-1.23.0.tar.gz.old
        <span class="token keyword">fi</span>
    <span class="token keyword">fi</span>

    <span class="token function">sudo</span> <span class="token function">curl</span> <span class="token parameter variable">-O</span> http://nginx.org/download/nginx-1.23.0.tar.gz
    ck_ok <span class="token string">&quot;下载Nginx&quot;</span>
<span class="token punctuation">}</span>
<span class="token function-name function">install_ng</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token builtin class-name">cd</span> /usr/local/src
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;解压Nginx&quot;</span>
    <span class="token function">sudo</span> <span class="token function">tar</span> zxf nginx-1.23.0.tar.gz
    ck_ok <span class="token string">&quot;解压Nginx&quot;</span>
    <span class="token builtin class-name">cd</span> nginx-1.23.0


    <span class="token builtin class-name">echo</span> <span class="token string">&quot;安装依赖&quot;</span>
    <span class="token keyword">if</span> <span class="token function">which</span> yum <span class="token operator">&gt;</span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span>
    <span class="token keyword">then</span>
        <span class="token comment">## RHEL/Rocky</span>
        <span class="token keyword">for</span> <span class="token for-or-select variable">pkg</span> <span class="token keyword">in</span> gcc <span class="token function">make</span> pcre-devel zlib-devel openssl-devel
        <span class="token keyword">do</span>
            <span class="token keyword">if</span> <span class="token operator">!</span> <span class="token function">rpm</span> <span class="token parameter variable">-q</span> <span class="token variable">$pkg</span> <span class="token operator">&gt;</span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span>
            <span class="token keyword">then</span>
                <span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token variable">$pkg</span>
                ck_ok <span class="token string">&quot;yum 安装<span class="token variable">$pkg</span>&quot;</span>
            <span class="token keyword">else</span>
                <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$pkg</span>已经安装&quot;</span>
            <span class="token keyword">fi</span>
        <span class="token keyword">done</span>
    <span class="token keyword">fi</span>


    <span class="token keyword">if</span> <span class="token function">which</span> <span class="token function">apt</span> <span class="token operator">&gt;</span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span>
    <span class="token keyword">then</span>
        <span class="token comment">##ubuntu</span>
        <span class="token keyword">for</span> <span class="token for-or-select variable">pkg</span> <span class="token keyword">in</span> <span class="token function">make</span> libpcre++-dev  libssl-dev  zlib1g-dev
        <span class="token keyword">do</span>
            <span class="token keyword">if</span> <span class="token operator">!</span> dpkg <span class="token parameter variable">-l</span> <span class="token variable">$pkg</span> <span class="token operator">&gt;</span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span>
            <span class="token keyword">then</span>
                <span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token variable">$pkg</span>
                ck_ok <span class="token string">&quot;apt 安装<span class="token variable">$pkg</span>&quot;</span>
            <span class="token keyword">else</span>
                <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$pkg</span>已经安装&quot;</span>
            <span class="token keyword">fi</span>
        <span class="token keyword">done</span>
    <span class="token keyword">fi</span>

    <span class="token builtin class-name">echo</span> <span class="token string">&quot;configure Nginx&quot;</span>
    <span class="token function">sudo</span> ./configure <span class="token parameter variable">--prefix</span><span class="token operator">=</span>/usr/local/nginx  --with-http_ssl_module
    ck_ok <span class="token string">&quot;Configure Nginx&quot;</span>


    <span class="token builtin class-name">echo</span> <span class="token string">&quot;编译和安装&quot;</span>
    <span class="token function">sudo</span> <span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">make</span> <span class="token function">install</span>
    ck_ok <span class="token string">&quot;编译和安装&quot;</span>


    <span class="token builtin class-name">echo</span> <span class="token string">&quot;编辑systemd服务管理脚本&quot;</span>


    <span class="token function">cat</span> <span class="token operator">&gt;</span> /tmp/nginx.service <span class="token operator">&lt;&lt;</span><span class="token string">EOF
[Unit]
Description=nginx - high performance web server
Documentation=http://nginx.org/en/docs/
After=network-online.target remote-fs.target nss-lookup.target
Wants=network-online.target

[Service]
Type=forking
PIDFile=/usr/local/nginx/logs/nginx.pid
ExecStart=/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
ExecReload=/bin/sh -c &quot;/bin/kill -s HUP \\<span class="token variable"><span class="token variable">$(</span>/bin/cat /usr/local/nginx/logs/nginx.pid<span class="token variable">)</span></span>&quot;
ExecStop=/bin/sh -c &quot;/bin/kill -s TERM \\<span class="token variable"><span class="token variable">$(</span>/bin/cat /usr/local/nginx/logs/nginx.pid<span class="token variable">)</span></span>&quot;

[Install]
WantedBy=multi-user.target
EOF</span>

    <span class="token function">sudo</span> /bin/mv /tmp/nginx.service /lib/systemd/system/nginx.service
    ck_ok <span class="token string">&quot;编辑nginx.service&quot;</span>

    <span class="token builtin class-name">echo</span> <span class="token string">&quot;加载服务&quot;</span>
    <span class="token function">sudo</span> systemctl unmask nginx.service
    <span class="token function">sudo</span>  systemctl daemon-reload
    <span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> nginx
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;启动Nginx&quot;</span>
    <span class="token function">sudo</span> systemctl start nginx
    ck_ok <span class="token string">&quot;启动Nginx&quot;</span>
<span class="token punctuation">}</span>

download_ng
install_ng
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="执行脚本" tabindex="-1"><a class="header-anchor" href="#执行脚本" aria-hidden="true">#</a> 执行脚本</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">chmod</span> +x nginx_install.sh <span class="token operator">&amp;&amp;</span> ./nginx_install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,15);function y(_,w){const l=t("ExternalLinkIcon"),e=t("router-link");return o(),r("div",null,[v,n("ul",null,[n("li",null,[s("Nginx 的官网： "),n("a",m,[s("http://nginx.org"),a(l)])]),n("li",null,[s("nginx 中文文档："),n("a",k,[s("https://www.nginx.cn/doc/index.html"),a(l)])])]),d(" more "),n("nav",b,[n("ul",null,[n("li",null,[a(e,{to:"#nginx-源码安装-推荐"},{default:i(()=>[s("nginx 源码安装（推荐）")]),_:1})]),n("li",null,[a(e,{to:"#yum-安装"},{default:i(()=>[s("yum 安装")]),_:1})]),n("li",null,[a(e,{to:"#离线安装"},{default:i(()=>[s("离线安装")]),_:1})]),n("li",null,[a(e,{to:"#离线安装-1"},{default:i(()=>[s("离线安装")]),_:1})]),n("li",null,[a(e,{to:"#nginx-命令"},{default:i(()=>[s("nginx 命令")]),_:1})]),n("li",null,[a(e,{to:"#nginx-开机自启"},{default:i(()=>[s("nginx 开机自启")]),_:1})]),n("li",null,[a(e,{to:"#脚本部署"},{default:i(()=>[s("脚本部署")]),_:1}),n("ul",null,[n("li",null,[a(e,{to:"#脚本内容"},{default:i(()=>[s("脚本内容")]),_:1})]),n("li",null,[a(e,{to:"#执行脚本"},{default:i(()=>[s("执行脚本")]),_:1})])])])])]),g,n("ul",null,[n("li",null,[s("官网地址："),n("a",x,[s("http://nginx.org/en/linux_packages.html"),a(l)])]),n("li",null,[s("易白教程："),n("a",h,[s("https://www.yiibai.com/nginx/nginx-install-linux-packages.html"),a(l)])])]),f])}const N=p(u,[["render",y],["__file","01.nginx的安装.html.vue"]]);export{N as default};
