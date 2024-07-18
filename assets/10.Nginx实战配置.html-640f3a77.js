import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as t,c,a as n,b as s,d as e,e as o,w as i,f as v}from"./app-efa5e96e.js";const u={},p={href:"http://nginx.org/en/docs/http/ngx_http_upstream_module.html#upstream",target:"_blank",rel:"noopener noreferrer"},m={class:"table-of-contents"},b=v(`<h2 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h2><details class="hint-container details"><summary>demo.conf</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /usr/local/nginx/conf.d <span class="token operator">&amp;&amp;</span> <span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /usr/local/nginx/conf.d/demo.conf <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
# 轮询+权重
upstream api01 {
    server 192.16.18.101:80 weight=1 max_fails=10 fail_timeout=120s;
    server 192.16.18.102:80 weight=2 max_fails=10 fail_timeout=120s;
    server 192.16.18.103:80 backup;
    server 192.16.18.104:80 down;
}
# 基于客户端IP的分配方式
upstream api02 {
    ip_hash;
    server 192.16.18.101:8080 weight=1 max_fails=10 fail_timeout=120s;
    server 192.16.18.102:8080 weight=1 max_fails=10 fail_timeout=120s;
}

server {
    listen 80;
    server_name  dev.demo.com;                  # 可以通过域名访问
    server_name  www.demo.com;
    server_name  localhost;
    server_name  _;                             # 默认服务，允许使用ip访问

    client_max_body_size        10M;            # 允许客户端请求的单文件最大大小，单位默认字节。
    client_body_buffer_size     128k;           # 为客户端请求设置的缓存大小。

    proxy_connect_timeout       60s;            # 后端服务器连接超时时间。默认 60 秒
    proxy_send_timeout          90;             # 后端服务器数据回传时间(代理发送超时)
    proxy_read_timeout          60s;            # 发出请求后等待后端服务器响应的最长时限。默认 60 秒
    proxy_buffer_size           4k;             # 设置代理服务器（nginx）保存用户头信息的缓冲区大小
    proxy_buffers               4 32k;          # proxy_buffers缓冲区，网页平均在32k以下的话，这样设置
    proxy_busy_buffers_size     64k;            # 高负荷下缓冲大小（默认proxy_buffers*2）
    proxy_temp_file_write_size  64k;            # 设定缓存文件夹大小，大于这个值，将从upstream服务器传
    proxy_buffering             off;            # 开启从后端被代理服务器的响应内容缓冲区。默认值 on

    gzip                        on;             # 开启gzip
    gzip_min_length             1m;             # 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
    gzip_buffers                4 16k;          # 设置压缩所需要的缓冲区大小
    gzip_http_version           1.0;            # 设置gzip压缩针对的HTTP协议版本，不需要改
    gzip_comp_level             6;              # gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间，后面会有详细说明
    gzip_types                  text/plain application/javascript application/xml application/cc-directory application/json;  # 进行压缩的文件类型
    gzip_vary                   on;             # 是否在http header中添加Vary: Accept-Encoding，建议开启
    gzip_disable                &quot;MSIE [1-6]\\.&quot;; # 禁用IE 6 gzip

    proxy_set_header   Host             <span class="token variable">$host</span>;
    proxy_set_header   X-Real-IP        <span class="token variable">$remote_addr</span>;
    proxy_set_header   X-Forwarded-For  <span class="token variable">$proxy_add_x_forwarded_for</span>;

    root /usr/local/nginx/html;
    index index.html index.htm;

    # 静态代理
    location / {
    }
    # 扩展名拦截
    location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf|css|js)$ {
        root    /opt/demo/www/;
        # 过期30天，静态文件不怎么更新，过期可以设大一点，如果频繁更新，则可以设置得小一点。
        expires 30d;
    }
    # 目录名拦截
    location ~ .*(css|js|images|html).+ {
        root    /opt/demo/www/;
    }

    # 正则匹配 动态反向代理
    location  ~* ^/api/01/ {
        proxy_pass  http://api01;
    }

    # 查看nginx状态
    location = /status {
        stub_status on;
        access_log on;
    }
    # 下载站点
    location ^~ /download {
        alias html;                             # 展示的目录
        index _;                                # 去掉默认的界面
        # 如果不做这个配置，点击目录下的txt文件，大部分浏览器默认是直接浏览的。这里通过添加响应头来控制。
        if (<span class="token variable">$request_filename</span> ~* ^.*?\\.(html|txt|doc|pdf|rar|gz|zip|docx|exe|xlsx|ppt|pptx|conf)$){
                add_header Content-Disposition &#39;attachment;&#39;;
        }
        ## nginx默认的索引目录
        autoindex              on;              # 开启整个目录浏览下载
        autoindex_localtime    on;              # 显示文件的GMT时间
        autoindex_exact_size   off;             # 显示文件的大小

        ## 如果安装了 fancyindex 美好索引目录
        # fancyindex on;
        # fancyindex_localtime on;
        # fancyindex_exact_size off;
        # fancyindex_name_length 255;
        ## fancyindex_header &quot;/fancyindex/header.html&quot;;  ## 可选
        ## fancyindex_footer &quot;/fancyindex/footer.html&quot;;  ## 可选
        ## fancyindex_ignore &quot;examplefile.html&quot;;         ## 可选
        ## fancyindex_ignore &quot;fancyindex&quot;;               ## 可选 忽略显示
    }

    # 异常界面
    error_page   404              /404.html;
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
    # 禁止访问.htxxx文件
    location ~ /\\.ht {
        deny all;
    }
}
server {
    listen       8888;#默认端口是80，如果端口没被占用可以不用修改
    server_name  localhost;

    #charset koi8-r;

    #access_log  logs/host.access.log  main;
    root        /opt/blog/dist;             #vue项目的打包后的dist

    location / {
        try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ @router;        #需要指向下面的@router否则会出现vue的路由在nginx中刷新出现404
        index  index.html index.htm;
    }
    #对应上面的@router，主要原因是路由的路径资源并不是一个真实的路径，所以无法找到具体的文件
    #因此需要rewrite到index.html中，然后交给路由在处理请求资源
    location @router {
        rewrite ^.*$ /index.html last;
    }
    #.......其他部分省略
}

EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 配置运行用户或者组，默认为nobody nobody。</span>
<span class="token comment">#user  nobody;</span>
<span class="token comment"># worker进程数，通常等于CPU数量或者CPU的倍数。</span>
worker_processes  <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment">#error_log  logs/error.log;</span>
<span class="token comment">#error_log  logs/error.log  notice;</span>
<span class="token comment">#error_log  logs/error.log  info;</span>

<span class="token comment">#pid        logs/nginx.pid;</span>

<span class="token comment"># 进程可以打开的最大文件数量</span>
worker_rlimit_nofile  <span class="token number">1024</span><span class="token punctuation">;</span>

events <span class="token punctuation">{</span>
    <span class="token comment"># 事件驱动模型，多路复用IO</span>
    use epoll<span class="token punctuation">;</span>
    <span class="token comment"># worker线程的最大并发链接数</span>
    worker_connections  <span class="token number">1024</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


http <span class="token punctuation">{</span>
    include       mime.types<span class="token punctuation">;</span>
    default_type  application/octet-stream<span class="token punctuation">;</span>
    charset       utf-8<span class="token punctuation">;</span>

    <span class="token comment"># 定义日志格式 main</span>
    <span class="token comment">#log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span>
    <span class="token comment">#                  &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span>
    <span class="token comment">#                  &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span>

    <span class="token comment">#access_log  logs/access.log  main;</span>

    sendfile        on<span class="token punctuation">;</span>
    <span class="token comment">#tcp_nopush     on;</span>

    <span class="token comment">#keepalive_timeout  0;</span>
    keepalive_timeout  <span class="token number">65</span><span class="token punctuation">;</span>

    <span class="token comment">#gzip  on;</span>

    include /usr/local/nginx/conf.d/*.conf<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx-命令" tabindex="-1"><a class="header-anchor" href="#nginx-命令" aria-hidden="true">#</a> nginx 命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看Nginx主进程号</span>
<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;nginx: master process&quot;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token string">&quot;grep&quot;</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token parameter variable">-F</span> <span class="token string">&#39; &#39;</span> <span class="token string">&#39;{print $2}&#39;</span>
<span class="token function">cat</span> /usr/local/nginx/logs/nginx.pid
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="每天定时切割-nginx-日志的脚本" tabindex="-1"><a class="header-anchor" href="#每天定时切割-nginx-日志的脚本" aria-hidden="true">#</a> 每天定时切割 Nginx 日志的脚本</h2><h4 id="编写脚本" tabindex="-1"><a class="header-anchor" href="#编写脚本" aria-hidden="true">#</a> 编写脚本</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /usr/local/nginx/sbin/cut_nginx_log.sh <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
#!/bin/bash
# This script run at 00:00

# The Nginx logs path
logs_path=&quot;/usr/local/nginx/logs/&quot;

mkdir -p <span class="token variable">\${logs_path}</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;yesterday&quot;</span> +<span class="token string">&quot;%Y&quot;</span><span class="token variable">)</span></span>/<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;yesterday&quot;</span> +<span class="token string">&quot;%m&quot;</span><span class="token variable">)</span></span>/
mv <span class="token variable">\${logs_path}</span>access.log <span class="token variable">\${logs_path}</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;yesterday&quot;</span> +<span class="token string">&quot;%Y&quot;</span><span class="token variable">)</span></span>/<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;yesterday&quot;</span> +<span class="token string">&quot;%m&quot;</span><span class="token variable">)</span></span>/access_<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;yesterday&quot;</span> +<span class="token string">&quot;%Y%m%d&quot;</span><span class="token variable">)</span></span>.log
kill -USR1 <span class="token variable"><span class="token variable">\`</span><span class="token function">cat</span> /usr/local/webserver/nginx/nginx.pid<span class="token variable">\`</span></span>
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="设置-crontab-每天凌晨-00-00-切割-nginx-访问日志" tabindex="-1"><a class="header-anchor" href="#设置-crontab-每天凌晨-00-00-切割-nginx-访问日志" aria-hidden="true">#</a> 设置 crontab，每天凌晨 00:00 切割 nginx 访问日志</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">crontab</span> <span class="token parameter variable">-e</span>
<span class="token comment">#  输入一下面定时任务</span>
00 00 * * * /bin/bash  /usr/local/nginx/sbin/cut_nginx_log.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx-加入-systemctl-进行管理服务" tabindex="-1"><a class="header-anchor" href="#nginx-加入-systemctl-进行管理服务" aria-hidden="true">#</a> Nginx 加入 systemctl 进行管理服务</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /usr/lib/systemd/system/nginx.service <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
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

systemctl daemon-reload <span class="token operator">&amp;&amp;</span> systemctl <span class="token builtin class-name">enable</span> nginx <span class="token operator">&amp;&amp;</span> systemctl start nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12);function g(_,k){const d=l("ExternalLinkIcon"),a=l("router-link");return t(),c("div",null,[n("p",null,[s("官方配置："),n("a",p,[s("http://nginx.org/en/docs/http/ngx_http_upstream_module.html#upstream"),e(d)])]),o(" more "),n("nav",m,[n("ul",null,[n("li",null,[e(a,{to:"#配置文件"},{default:i(()=>[s("配置文件")]),_:1})]),n("li",null,[e(a,{to:"#nginx-命令"},{default:i(()=>[s("nginx 命令")]),_:1})]),n("li",null,[e(a,{to:"#每天定时切割-nginx-日志的脚本"},{default:i(()=>[s("每天定时切割 Nginx 日志的脚本")]),_:1})]),n("li",null,[e(a,{to:"#nginx-加入-systemctl-进行管理服务"},{default:i(()=>[s("Nginx 加入 systemctl 进行管理服务")]),_:1})])])]),b])}const f=r(u,[["render",g],["__file","10.Nginx实战配置.html.vue"]]);export{f as default};
