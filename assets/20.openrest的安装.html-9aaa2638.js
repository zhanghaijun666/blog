import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as c,c as r,a as n,b as s,d as e,e as p,w as i,f as d}from"./app-efa5e96e.js";const u={},v=n("blockquote",null,[n("p",null,"OpenResty® 是一个基于 Nginx 与 Lua 的高性能 Web 平台，其内部集成了大量精良的 Lua 库、第三方模块以及大多数的依赖项。"),n("p",null,"用于方便地搭建能够处理超高并发、扩展性极高的动态 Web 应用、Web 服务和动态网关。")],-1),m={href:"http://openresty.org/cn/download.html",target:"_blank",rel:"noopener noreferrer"},b={href:"http://www.lua.org",target:"_blank",rel:"noopener noreferrer"},k={href:"http://luajit.org",target:"_blank",rel:"noopener noreferrer"},g={class:"table-of-contents"},h=d(`<h2 id="在线安装" tabindex="-1"><a class="header-anchor" href="#在线安装" aria-hidden="true">#</a> 在线安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 添加yum源</span>
yum <span class="token function">install</span> yum-utils
yum-config-manager --add-repo https://openresty.org/package/centos/openresty.repo
<span class="token comment"># 安装openresty</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> openresty
<span class="token comment"># 安装命令行工具 resty</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> openresty-resty
<span class="token comment"># 查看openresty 仓库里头的软件包</span>
yum <span class="token parameter variable">--disablerepo</span><span class="token operator">=</span><span class="token string">&quot;*&quot;</span> <span class="token parameter variable">--enablerepo</span><span class="token operator">=</span><span class="token string">&quot;openresty&quot;</span> list available
<span class="token comment"># 默认安装在  /usr/local/openresty</span>
<span class="token comment"># 启动</span>
systemctl status<span class="token operator">|</span>start<span class="token operator">|</span>stop openresty
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="源码安装" tabindex="-1"><a class="header-anchor" href="#源码安装" aria-hidden="true">#</a> 源码安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装gcc和一些工具</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> gcc gcc-c++ <span class="token function">curl</span> <span class="token function">wget</span> perl <span class="token function">bzip2</span> pcre-devel openssl-devel zlib-devel
<span class="token comment"># 下载地址：https://openresty.org/cn/download.html</span>
<span class="token function">wget</span> https://openresty.org/download/openresty-1.19.3.2.tar.gz
<span class="token comment"># 解压</span>
<span class="token function">tar</span> <span class="token parameter variable">-xzvf</span> openresty-1.19.3.2.tar.gz
<span class="token builtin class-name">cd</span> openresty-1.19.3.2/
<span class="token comment"># 查看配置选项</span>
./configure <span class="token parameter variable">--help</span>
<span class="token comment"># 配置  --with-Components 激活组件，–-without 则是禁止组件</span>
./configure <span class="token punctuation">\\</span>
<span class="token parameter variable">--prefix</span><span class="token operator">=</span>/usr/local/openresty <span class="token punctuation">\\</span>
--with-stream <span class="token punctuation">\\</span>
--with-threads <span class="token punctuation">\\</span>
--with-http_ssl_module <span class="token punctuation">\\</span>
--with-http_v2_module <span class="token punctuation">\\</span>
--with-http_realip_module <span class="token punctuation">\\</span>
--with-http_gzip_static_module <span class="token punctuation">\\</span>
--with-http_stub_status_module <span class="token punctuation">\\</span>
--without-http_redis2_module <span class="token punctuation">\\</span>
<span class="token parameter variable">--user</span><span class="token operator">=</span>root <span class="token punctuation">\\</span>
<span class="token parameter variable">--group</span><span class="token operator">=</span>root <span class="token punctuation">\\</span>
<span class="token parameter variable">--build</span><span class="token operator">=</span><span class="token string">&quot;LiveOps build at <span class="token variable"><span class="token variable">\`</span><span class="token function">date</span> +%Y-%m-%d<span class="token variable">\`</span></span>&quot;</span> <span class="token punctuation">\\</span>
--with-ld-opt<span class="token operator">=</span><span class="token string">&quot;-Ijemalloc&quot;</span>
<span class="token comment"># 编译安装</span>
gmake <span class="token operator">&amp;&amp;</span> gmake <span class="token function">install</span>
<span class="token comment"># 查看安装目录</span>
ll /usr/local/openresty
<span class="token comment"># 设置全局环境变量</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;export PATH=/usr/local/openresty/bin:$PATH&#39;</span> <span class="token operator">&gt;&gt;</span> /etc/profile
<span class="token builtin class-name">source</span> /etc/profile
<span class="token comment"># 查看版本号</span>
openresty <span class="token parameter variable">-v</span>
<span class="token comment"># 和\`nginx -t\`是一样的，只是为了区别与nginx和openresty</span>
openresty <span class="token parameter variable">-t</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改配置文件" tabindex="-1"><a class="header-anchor" href="#修改配置文件" aria-hidden="true">#</a> 修改配置文件</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /usr/local/openresty/nginx/conf/nginx.conf <span class="token operator">&lt;&lt;</span><span class="token string">EOP
#user  nobody;
worker_processes  1;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    gzip on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    gzip_http_version 1.0;
    gzip_comp_level 2;
    gzip_types text/plain application/x-javascript text/css application/xml;

    include /usr/local/openresty/nginx/conf/conf.d/*.conf;
}
EOP</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /usr/local/openresty/nginx/conf/conf.d/ <span class="token operator">&amp;&amp;</span> <span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /usr/local/openresty/nginx/conf/conf.d/80.conf <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
server {
    listen       80;
    server_name  localhost;
    charset utf-8;

    location / {
        root   html;
        index  index.html index.htm;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
    location /status {
        stub_status on;
        access_log off;
    }
    location /lua {
       default_type &#39;text/html&#39;;
        content_by_lua_block {
            ngx.say(&quot;HelloWorld&quot;)
        }
   }
}
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置系统服务" tabindex="-1"><a class="header-anchor" href="#配置系统服务" aria-hidden="true">#</a> 配置系统服务</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 注意 PIDFile的文件路径要和nginx.conf里面的pid路径保持一直</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /usr/lib/systemd/system/openresty.service <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
[Unit]
Description=A dynamic web platform based on Nginx and LuaJIT.
After=network.target

[Service]
Type=forking
PIDFile=/usr/local/openresty/nginx/logs/nginx.pid
ExecStartPre=/usr/local/openresty/bin/openresty -t -q -g &#39;daemon on; master_process on;&#39;
ExecStart=/usr/local/openresty/bin/openresty -g &#39;daemon on; master_process on;&#39;
ExecReload=/usr/local/openresty/bin/openresty -g &#39;daemon on; master_process on;&#39; -s reload
ExecReload=/bin/kill -s HUP <span class="token variable">$MAINPID</span>
ExecStop=/bin/kill -s QUIT <span class="token variable">$MAINPID</span>
TimeoutStopSec=5
KillMode=mixed

[Install]
WantedBy=multi-user.target
EOF</span>

systemctl daemon-reload <span class="token operator">&amp;&amp;</span> systemctl <span class="token builtin class-name">enable</span> openresty <span class="token operator">&amp;&amp;</span> systemctl start openresty
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>::: cardList</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> OpenResty 最佳实践
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> GitBook
  <span class="token key atrule">avatar</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//app.gitbook.com/public/images/logos/rounded/256x256.png<span class="token punctuation">?</span>v=10.3.0<span class="token punctuation">-</span>13f908807e9cb0c7824c55db359369ce6f2f2476<span class="token punctuation">-</span><span class="token number">1611203601</span>
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//moonbingbing.gitbooks.io/openresty<span class="token punctuation">-</span>best<span class="token punctuation">-</span>practices/content/
  <span class="token key atrule">bgColor</span><span class="token punctuation">:</span> <span class="token string">&quot;#CBEAFA&quot;</span>
  <span class="token key atrule">textColor</span><span class="token punctuation">:</span> <span class="token string">&quot;#6854A1&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>`,11);function y(_,f){const l=t("ExternalLinkIcon"),a=t("router-link");return c(),r("div",null,[v,n("ul",null,[n("li",null,[s("openresty 官网地址："),n("a",m,[s("http://openresty.org/cn/download.html"),e(l)])]),n("li",null,[s("Lua 官网链接："),n("a",b,[s("http://www.lua.org"),e(l)])]),n("li",null,[s("LuaJIT 官网链接："),n("a",k,[s("http://luajit.org"),e(l)])])]),p(" more "),n("nav",g,[n("ul",null,[n("li",null,[e(a,{to:"#在线安装"},{default:i(()=>[s("在线安装")]),_:1})]),n("li",null,[e(a,{to:"#源码安装"},{default:i(()=>[s("源码安装")]),_:1})]),n("li",null,[e(a,{to:"#修改配置文件"},{default:i(()=>[s("修改配置文件")]),_:1})]),n("li",null,[e(a,{to:"#配置系统服务"},{default:i(()=>[s("配置系统服务")]),_:1})])])]),h])}const q=o(u,[["render",y],["__file","20.openrest的安装.html.vue"]]);export{q as default};
