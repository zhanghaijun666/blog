import{_ as v}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as t,c,e as u,a as e,d as n,w as s,b as i,f as d}from"./app-efa5e96e.js";const m={},o={class:"table-of-contents"},b=d(`<h2 id="主模块" tabindex="-1"><a class="header-anchor" href="#主模块" aria-hidden="true">#</a> 主模块</h2><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code># 配置用户或者组，默认为nobody nobody。
#user www www;

#Nginx开启的worker进程数，建议为CPU的核数
#worker_processes 2;

#指定nginx进程运行文件存放地址
#pid /nginx/pid/nginx.pid;

#指定日志路径，级别。这个设置可以放入全局块、http块、server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg
error_log log/error.log debug;

#可以在任意地方使用include指令实现配置文件的包含，类似于apache中的include方法，可减少主配置文件长度。
include vhosts/*.conf;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="事件模块" tabindex="-1"><a class="header-anchor" href="#事件模块" aria-hidden="true">#</a> 事件模块</h2><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>events {
    #设置网路连接序列化，防止惊群现象发生，默认为on
    accept_mutex on;

    #默认: 500ms 如果一个进程没有互斥锁，它将延迟至少多长时间。默认情况下，延迟是500ms 。
    accept_mutex_delay 100ms;

    #设置一个进程是否同时接受多个网络连接，默认为off
    multi_accept on;

    #事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport，不建议设置，nginx会自行选择
    #use epoll;

    #最大连接数，默认为512
    worker_connections  1024;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="http-部分" tabindex="-1"><a class="header-anchor" href="#http-部分" aria-hidden="true">#</a> http 部分</h2><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>http {
    #文件扩展名与文件类型映射表
    include       mime.types;

    # 默认文件类型，默认为text/plain
    default_type  application/octet-stream;

    #取消服务日志
    #access_log off;

    #允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。
    sendfile on;

    #每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。
    sendfile_max_chunk 100k;

    #连接超时时间，默认为75s，可以在http，server，location块。
    keepalive_timeout 65;

    #开启gzip资源压缩
    gzip  on;

    # 负载均衡，详细可看了一篇文章：https://learnku.com/articles/36737
    upstream blog {
        server 192.167.20.19:8081;
        server 192.168.10.121:8080 weight=5;
    }

    #设定请求缓冲
    client_header_buffer_size    128k;
    large_client_header_buffers  4 128k;

    #上传文件的大小限制  默认1m
    client_max_body_size 8m;

    server {
        #单连接请求上限次数。
        keepalive_requests 120;

        #监听端口
        listen       80;

        #监听地址
        server_name  blog.13sai.com;

        #设定日志格式
        log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;
                      &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;
                      &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;

        access_log  /data/logs/access.log  main;

        # 根目录
        root /www/web/public;

        # 定义错误提示页面
        error_page   500 502 503 504 /50x.html;

        location /static/ {
            #root与alias主要区别在于nginx如何解释location后面的uri，这会使两者分别以不同的方式将请求映射到服务器文件上。
            #root的处理结果是：root路径＋location路径
            #alias的处理结果是：使用alias路径替换location路径
            alias /www/static/;

            #过期30天，静态文件不怎么更新，过期可以设大一点,如果频繁更新，则可以设置得小一点。
            expires 30d;
        }

        # 处理php请求到fpm端口
        location ~ \\.php$ {
            fastcgi_pass   127.0.0.1:9000;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            include        fastcgi_params;
        }

        location / {
            proxy_set_header Host $host;
            proxy_set_header  X-Real-IP  $remote_addr;
            proxy_pass  http://blog;  #请求转向blog 定义的服务器列表
        }

        #禁止访问文件
        location ~ /.git {
            deny all;
            allow 127.0.0.1; #允许的ip
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="部分参数详细说明" tabindex="-1"><a class="header-anchor" href="#部分参数详细说明" aria-hidden="true">#</a> 部分参数详细说明</h2><h3 id="server-name" tabindex="-1"><a class="header-anchor" href="#server-name" aria-hidden="true">#</a> server_name</h3>`,8),h={href:"http://blog.13sai.com",target:"_blank",rel:"noopener noreferrer"},_=e("li",null,"其次选择通配符在前面的 server_name，如 *.13sai.com。",-1),p=e("li",null,"再次选择通配符在后面的 server_name，如www.13sai.* 。",-1),f=e("li",null,[i("最后选择使用正则表达式才匹配的 server_name，如 ~^.sai.com$"),e("br"),i(" 如果都不匹配")],-1),x=e("li",null,"优先选择 listen 配置项后有 default 或 default_server 的",-1),g=d(`<h3 id="location-表达式类型" tabindex="-1"><a class="header-anchor" href="#location-表达式类型" aria-hidden="true">#</a> location 表达式类型</h3><ol><li>~ 表示执行一个正则匹配，区分大小写;</li><li>~* 表示执行一个正则匹配，不区分大小写;</li><li>^~ 表示普通字符匹配。使用前缀匹配。如果匹配成功，则不再匹配其他 location;</li><li>= 进行普通字符精确匹配。也就是完全匹配;</li><li>@ 它定义一个命名的 location，使用在内部定向时，例如 error_page, try_files</li></ol><h3 id="优先级" tabindex="-1"><a class="header-anchor" href="#优先级" aria-hidden="true">#</a> 优先级</h3><ol><li>等号类型 (=) 的优先级最高。一旦匹配成功，则不再查找其他匹配项</li><li>前缀普通匹配 (^~) 优先级次之。不支持正则表达式。使用前缀匹配，如果有多个 location 匹配的话，则使用表达式最长的那个</li><li>正则表达式类型 (~ ~*) 的优先级次之。一旦匹配成功，则不再查找其他匹配项</li><li>常规字符串匹配，如果有多个 location 匹配的话，则使用表达式最长的那个</li></ol><h3 id="return" tabindex="-1"><a class="header-anchor" href="#return" aria-hidden="true">#</a> return</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法:return code [text] return code URL;
return URL;
配置块:server，location，if
该指令用于结束规则的执行并返回状态吗给客户端。
状态码包括:
204(No Content)、
400(Bad Request)、
402(Payment Required)、
403(Forbidden)
404(Not Found)、
405(Method Not Allowed)、
406(Not Acceptable)、
408(Request Timeout)、
410(Gone)、
411(Length Required)、
413(Request Entity Too Large)、
416(Requested Range Not Satisfiable)、 500(Internal Server Error)、
501(Not Implemented)、
502(Bad Gateway)、
503(Service Unavailable)
504(Gateway Timeout)。

例如，示例，如果访问的URL以.sh .bash 结尾，返回状态码403
location ~ .*\\.(sh|bash)?$ {
    return 403;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="rewrite" tabindex="-1"><a class="header-anchor" href="#rewrite" aria-hidden="true">#</a> rewrite</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>语法:rewrite regex replacement [flag];
默认值:—
配置块:server, location, if
rewrite是实现URL重写的关键指令，根据regex(正则表达式)部分内容，重定向到replacement，结尾是flag标记。 正则:perl兼容正则表达式语句进行规则匹配
替代内容:将正则匹配的内容替换成replacement
flag标记:rewrite支持的flag标记

执行顺序：
1. 执行server块的rewrite指令(这里的块指的是server关键字后{}包围的区域，其它xx块类似)
2. 执行location匹配
3. 执行选定的location中的rewrite指令
如果其中某步URI被重写，则重新循环执行1-3，直到找到真实存在的文件

如果循环超过10次，则返回500 Internal Server Error错误
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="if-指令" tabindex="-1"><a class="header-anchor" href="#if-指令" aria-hidden="true">#</a> if 指令</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if ($http_user_agent~*(mobile|nokia|iphone|ipad|android|samsung|htc|blackberry)) {
    rewrite ^.+ /mobile last; ＃跳转到手机站
}
if ($request_method = POST) {
    return 405;
}
if ($slow) {
    limit_rate 10k;
}
if ($invalid_referer) {
    return 403;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="last-break" tabindex="-1"><a class="header-anchor" href="#last-break" aria-hidden="true">#</a> last &amp; break</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>（1）last 和 break 当出现在location 之外时，两者的作用是一致的没有任何差异。
注意一点就是，他们会跳过所有的在他们之后的rewrite 模块中的指令，去选择自己匹配的location
（2）last 和 break 当出现在location 内部时，两者就存在了差异
-- last: 使用了last 指令，rewrite 后会跳出location 作用域，重新开始再走一次刚刚的行为
-- break: 使用了break 指令，rewrite后不会跳出location 作用域。它的生命也在这个location中终结。

解释通俗易懂：

last：
        重新将rewrite后的地址在server标签中执行
break：
        将rewrite后的地址在当前location标签中执行
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="permanent-redirect" tabindex="-1"><a class="header-anchor" href="#permanent-redirect" aria-hidden="true">#</a> permanent &amp; redirect</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>permanent: 永久性重定向。请求日志中的状态码为301
redirect:临时重定向。请求日志中的状态码为302
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="应用" tabindex="-1"><a class="header-anchor" href="#应用" aria-hidden="true">#</a> 应用</h2><h3 id="估算并发" tabindex="-1"><a class="header-anchor" href="#估算并发" aria-hidden="true">#</a> 估算并发</h3><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>## nginx 作为 http 服务器的时候：
max_clients = worker_processes * worker_connections/2
## nginx 作为反向代理服务器的时候：
max_clients = worker_processes * worker_connections/4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="限制每个-ip-的并发连接数" tabindex="-1"><a class="header-anchor" href="#限制每个-ip-的并发连接数" aria-hidden="true">#</a> 限制每个 IP 的并发连接数</h3><blockquote><p>demo: 定义一个叫 “two” 的记录区，总容量为 10M（超过大小将请求失败，以变量 $binary_remote_addr 作为会话的判断基准（即一个地址一个会话）。 限制 /download/ 目录下，一个会话只能进行一个连接。 简单点，就是限制 /download/ 目录下，一个 IP 只能发起一个连接，多过一个，一律 503。</p></blockquote>`,19),w=e("div",{class:"language-conf line-numbers-mode","data-ext":"conf"},[e("pre",{"2|6":"",class:"language-conf"},[e("code",null,`http {
  limit_conn_zone $binary_remote_addr zone=two:10m;

  server {
    location /download {
        limit_conn   two  1;
    }
  }
}
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),y=d(`<h3 id="限流" tabindex="-1"><a class="header-anchor" href="#限流" aria-hidden="true">#</a> 限流</h3><blockquote><p>demo: 定义一个叫 “one” 的记录区，占用空间大小为 10m（超过大小将请求失败），平均处理的请求频率不能超过每秒一次，也可以设置分钟速率</p></blockquote><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>http {
  limit_req_zone  $binary_remote_addr  zone=one:10m  rate=1r/s;

  server {
    location / {
        #缓存区队列burst=5个,nodelay表示不延期(超过的请求失败)，即每秒最多可处理rate+burst个,同时处理rate个。
        limit_req zone=one burst=5 nodelay;
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="白名单" tabindex="-1"><a class="header-anchor" href="#白名单" aria-hidden="true">#</a> 白名单</h3><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>http{
  #判断客户端的ip地址是否在白名单列表当中,如果返回为0,则在白名单列表当中,否则返回为1
  geo $whiteIpList {
      default  1;
      118.24.109.254 0;
      47.98.147.0/24 1;
      #可以引入一些白名单配置
      include &#39;whiteIP.conf&#39;
  }
  #如果不在白名单之内,返回客户端的二进制的ip地址
  map $whiteIpList  $limit {
      default  &quot;&quot;;
      1   $binary_remote_addr;
      0   &quot;&quot;;
  }
  #如果返回的是空字符串那么速率限制会失效
  limit_req_zone $limit zone=test:2m rate=1r/m;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="防盗链" tabindex="-1"><a class="header-anchor" href="#防盗链" aria-hidden="true">#</a> 防盗链</h3><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>http {
  server {
    #valid_referers后面的referer列表进行匹配，如果匹配到了就invalid_referer字段值为0 否则设置该值为1
    location ~* \\.(gif|jpg|png|swf|flv)$ {
      valid_referers none blocked *.13sai.com;
      if ($invalid_referer) {
        rewrite ^/ blog.13sai.com
        # 也可直接返回403
        # return   403;
      }
    }
    # 在动静分离的location中开启防盗链机制
    location ~ .*\\.(html|htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css){
        # 最后面的值在上线前可配置为允许的域名地址
        valid_referers blocked 192.168.12.129;
        if ($invalid_referer) {
            # 可以配置成返回一张禁止盗取的图片
            # rewrite   ^/ http://xx.xx.com/NO.jpg;
            # 也可直接返回403
            return   403;
        }
        
        root   /usr/local/nginx/html;
        expires 7d;
    }
  }
}


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="auth-request-模块实现-nginx-端鉴权控制" tabindex="-1"><a class="header-anchor" href="#auth-request-模块实现-nginx-端鉴权控制" aria-hidden="true">#</a> auth_request 模块实现 nginx 端鉴权控制</h2><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>upstream web1 {
  server 192.168.20.131:3000;
}
upstream web2 {
  server 192.168.20.131:3001;
}
server {
  listen       80;
  server_name  localhost;

  location /api/web1 {
      auth_request /auth;
      error_page 401 = @error401;

      auth_request_set $user $upstream_http_x_forwarded_user;
      proxy_set_header X-Forwarded-User $user;
      proxy_pass http://web1;
  }

  location /api/web2 {
      auth_request /auth;
      error_page 401 = @error401;

      auth_request_set $user $upstream_http_x_forwarded_user;
      proxy_set_header X-Forwarded-User $user;
      proxy_pass http://web2;
  }

  location /auth {
      internal;
      proxy_set_header Host $host;
      # 不传递body内容，当然请求头会被传递
      proxy_pass_request_body off;
      proxy_set_header Content-Length &quot;&quot;;
      proxy_pass http://192.168.20.131:7001/auth;
  }
  location @error401 {
      add_header Set-Cookie &quot;NSREDIRECT=$scheme://$http_host$request_uri;Path=/&quot;;
      return 302 http://192.168.20.131:7001/login;
  }
  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
      root   /usr/share/nginx/html;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="大文件传输配置" tabindex="-1"><a class="header-anchor" href="#大文件传输配置" aria-hidden="true">#</a> 大文件传输配置</h2><table><thead><tr><th style="text-align:left;">配置项</th><th style="text-align:left;">释义</th></tr></thead><tbody><tr><td style="text-align:left;"><code>client_max_body_size</code></td><td style="text-align:left;">设置请求体允许的最大体积</td></tr><tr><td style="text-align:left;"><code>client_header_timeout</code></td><td style="text-align:left;">等待客户端发送一个请求头的超时时间</td></tr><tr><td style="text-align:left;"><code>client_body_timeout</code></td><td style="text-align:left;">设置读取请求体的超时时间</td></tr><tr><td style="text-align:left;"><code>proxy_read_timeout</code></td><td style="text-align:left;">设置请求被后端服务器读取时，<code>Nginx</code>等待的最长时间</td></tr><tr><td style="text-align:left;"><code>proxy_send_timeout</code></td><td style="text-align:left;">设置后端向<code>Nginx</code>返回响应时的超时时间</td></tr></tbody></table><h2 id="配置sll证书" tabindex="-1"><a class="header-anchor" href="#配置sll证书" aria-hidden="true">#</a> 配置SLL证书</h2><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code># ----------HTTPS配置-----------
server {
    # 监听HTTPS默认的443端口
    listen 443;
    # 配置自己项目的域名
    server_name www.xxx.com;
    # 打开SSL加密传输
    ssl on;
    # 输入域名后，首页文件所在的目录
    root html;
    # 配置首页的文件名
    index index.html index.htm index.jsp index.ftl;
    # 配置自己下载的数字证书
    ssl_certificate  certificate/xxx.pem;
    # 配置自己下载的服务器私钥
    ssl_certificate_key certificate/xxx.key;
    # 停止通信时，加密会话的有效期，在该时间段内不需要重新交换密钥
    ssl_session_timeout 5m;
    # TLS握手时，服务器采用的密码套件
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    # 服务器支持的TLS版本
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    # 开启由服务器决定采用的密码套件
    ssl_prefer_server_ciphers on;

    location / {
        ....
    }
}
# ---------HTTP请求转HTTPS-------------
server {
    # 监听HTTP默认的80端口
    listen 80;
    # 如果80端口出现访问该域名的请求
    server_name www.xxx.com;
    # 将请求改写为HTTPS（这里写你配置了HTTPS的域名）
    rewrite ^(.*)$ https://www.xxx.com;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function k(q,$){const l=a("router-link"),r=a("ExternalLinkIcon");return t(),c("div",null,[u(" more "),e("nav",o,[e("ul",null,[e("li",null,[n(l,{to:"#主模块"},{default:s(()=>[i("主模块")]),_:1})]),e("li",null,[n(l,{to:"#事件模块"},{default:s(()=>[i("事件模块")]),_:1})]),e("li",null,[n(l,{to:"#http-部分"},{default:s(()=>[i("http 部分")]),_:1})]),e("li",null,[n(l,{to:"#部分参数详细说明"},{default:s(()=>[i("部分参数详细说明")]),_:1}),e("ul",null,[e("li",null,[n(l,{to:"#server-name"},{default:s(()=>[i("server_name")]),_:1})]),e("li",null,[n(l,{to:"#location-表达式类型"},{default:s(()=>[i("location 表达式类型")]),_:1})]),e("li",null,[n(l,{to:"#优先级"},{default:s(()=>[i("优先级")]),_:1})]),e("li",null,[n(l,{to:"#return"},{default:s(()=>[i("return")]),_:1})]),e("li",null,[n(l,{to:"#rewrite"},{default:s(()=>[i("rewrite")]),_:1})]),e("li",null,[n(l,{to:"#if-指令"},{default:s(()=>[i("if 指令")]),_:1})]),e("li",null,[n(l,{to:"#last-break"},{default:s(()=>[i("last & break")]),_:1})]),e("li",null,[n(l,{to:"#permanent-redirect"},{default:s(()=>[i("permanent & redirect")]),_:1})])])]),e("li",null,[n(l,{to:"#应用"},{default:s(()=>[i("应用")]),_:1}),e("ul",null,[e("li",null,[n(l,{to:"#估算并发"},{default:s(()=>[i("估算并发")]),_:1})]),e("li",null,[n(l,{to:"#限制每个-ip-的并发连接数"},{default:s(()=>[i("限制每个 IP 的并发连接数")]),_:1})]),e("li",null,[n(l,{to:"#限流"},{default:s(()=>[i("限流")]),_:1})]),e("li",null,[n(l,{to:"#白名单"},{default:s(()=>[i("白名单")]),_:1})]),e("li",null,[n(l,{to:"#防盗链"},{default:s(()=>[i("防盗链")]),_:1})])])]),e("li",null,[n(l,{to:"#auth-request-模块实现-nginx-端鉴权控制"},{default:s(()=>[i("auth_request 模块实现 nginx 端鉴权控制")]),_:1})]),e("li",null,[n(l,{to:"#大文件传输配置"},{default:s(()=>[i("大文件传输配置")]),_:1})]),e("li",null,[n(l,{to:"#配置sll证书"},{default:s(()=>[i("配置SLL证书")]),_:1})])])]),b,e("ol",null,[e("li",null,[i("首先选择所有字符串完全匹配的 server_name，如 "),e("a",h,[i("blog.13sai.com"),n(r)]),i(" 。")]),_,p,f,x]),g,w,y])}const T=v(m,[["render",k],["__file","11.Nginx参数配置.html.vue"]]);export{T as default};
