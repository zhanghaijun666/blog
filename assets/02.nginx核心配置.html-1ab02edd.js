import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as d,c as t,e as u,a as e,d as s,w as l,b as n,f as a}from"./app-efa5e96e.js";const v={},b=e("p",null,"代理服务器：",-1),m=e("ul",null,[e("li",null,"Nginx 的特点：高并发 / 低消耗 / 热部署 / 高可用 / 高扩展"),e("li",null,"正向代理：隐藏 / 翻墙 / 提速 / 缓存 / 授权"),e("li",null,"反向代理：保护隐藏 / 分布式路由 / 负载均衡 / 动静分离 / 数据缓存")],-1),p={class:"table-of-contents"},h=e("h2",{id:"快速获取-nginx-的配置",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#快速获取-nginx-的配置","aria-hidden":"true"},"#"),n(" 快速获取 NGINX 的配置")],-1),g={href:"https://www.digitalocean.com/community/tools/nginx?global.app.lang=zhCN",target:"_blank",rel:"noopener noreferrer"},_=a(`<h2 id="请求定位" tabindex="-1"><a class="header-anchor" href="#请求定位" aria-hidden="true">#</a> 请求定位</h2><p>优先级由低到高依次是：普通匹配 &lt; 长路径匹配 &lt; 正则匹配 &lt; 短路匹配 &lt; 精确匹配</p><ul><li>普通匹配<br></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>location /a <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>长路径匹配<br></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>location /a/b/c <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>正则匹配<br></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># ~表示这里是正则表达式，默认匹配是区分大小写</span>
<span class="token comment"># ~后跟上*号，表示这是不区分大小写的正则表达式</span>
location ~/a <span class="token punctuation">{</span><span class="token punctuation">}</span>
location ~*/a <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>短路匹配<br></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 以^~开头的匹配路径称为短路匹配，表示只要匹配上，就不再匹配其它的了。</span>
location ^~/a/b <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>精确匹配<br></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 以等号（=）开头的匹配称为精确匹配，其是优先级最高的匹配。</span>
location <span class="token operator">=</span>/a/b <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="全局模块" tabindex="-1"><a class="header-anchor" href="#全局模块" aria-hidden="true">#</a> 全局模块</h2><ul><li><strong>worker_processes</strong> 1<br> 可选参数：auto，数值<br><br> Nginx 的工作进程数量，其数值一般设置为 CPU 内核数量，或内核数量的整数倍。<br><br> 不过需要注意，该值不仅仅取决于 CPU 内核数量，还与硬盘数量及负载均衡模式相关。在不确定时可以指定其值为 auto。<br></li><li><strong>worker_cpu_affinity</strong><br><br> worker 进程与具体的内核进行绑定。不过，若指定 worker_processes 的值为 auto，则无法设置 worker_cpu_affinity。<br><br> 该值设置是通过二进制进行的。每个内核使用一个二进制位表示，0 代表内核关闭，1 代表内核开启。也就是说，有几个内核，就需要使用几个二进制位。<br></li></ul><table><thead><tr><th>内核数量</th><th>worker_processes</th><th>worker_cpu_affinity</th><th>说明</th></tr></thead><tbody><tr><td>2</td><td>2</td><td>01 10</td><td>每个进程各使用一个内核</td></tr><tr><td>2</td><td>4</td><td>01 10 01 10</td><td>每个进程交替使用各自的内核</td></tr><tr><td>4</td><td>4</td><td>0001 0010 0100 1000</td><td>每个进程使用各自的一个内核</td></tr><tr><td>4</td><td>2</td><td>0101 1010</td><td>每个进程使用两个内核。应用于 CPU 进行大量的运算</td></tr></tbody></table><ul><li><strong>worker_rlimit_nofile</strong> <br><br> 其默认值与当前 Linux 系统可以打开的最大文件描述符数量相同</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看Linux 系统可以打开的最大文件</span>
<span class="token builtin class-name">ulimit</span> <span class="token parameter variable">-n</span>
<span class="token comment"># 设置Linux 系统可以打开的最大文件为65535</span>
<span class="token builtin class-name">ulimit</span> <span class="token parameter variable">-n</span> <span class="token number">65535</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="events-模块" tabindex="-1"><a class="header-anchor" href="#events-模块" aria-hidden="true">#</a> events 模块</h2><ul><li><strong>worker_connections</strong> 1024<br><br> 设置每一个 worker 进程可以并发处理的最大连接数。该值不能超过 worker_rlimit_nofile 的值。</li><li>accept_mutex on<br><ul><li>on：默认值，表示当一个新连接到达时，那些没有处于工作状态的 worker 将以串行方式来处理；</li><li>off：表示当一个新连接到达时，所有的 worker 都会被唤醒，不过只有一个 worker 能获取新连接，其它的 worker 会重新进入阻塞状态，这就是“惊群”现象。</li></ul></li><li><strong>accept_mutex_delay</strong> 500ms<br><br> 设置队首 worker 会尝试获取互斥锁的时间间隔。默认值为 500 毫秒。</li><li><strong>multi_accept</strong> on<br><ul><li>off：系统会逐个拿出新连接按照负载均衡策略，将其分配给当前处理连接个数最少的 worker。</li><li>on：系统会实时的统计出各个 worker 当前正在处理的连接个数，然后会按照“缺编”最多的 worker 的“缺编”数量，一次性将这么多的新连接分配给该 worker。</li></ul></li><li>use epoll<br><br> 设置 worker 与客户端连接的处理方式。Nginx 会自动选择适合当前系统的最高效的方式。<br><br> 当然，也可以使用 use 指令明确指定所要使用的连接处理方式。<details class="hint-container details"><summary>user 的取值有以下几种</summary></details></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>user 的取值有以下几种：select | poll | epoll | rtsig | kqueue | /dev/poll
select：数组
poll：链表，可处理高并发
epoll：默认使用
kqueue：应用在 BSD 系统上的 epoll。
/dev/poll：UNIX 系统上使用的 poll。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p><h2 id="http-模块" tabindex="-1"><a class="header-anchor" href="#http-模块" aria-hidden="true">#</a> http 模块</h2><ul><li>sendfile on<br><br> 设置为 on 则开启 Linux 系统的零拷贝机制，否则不启用零拷贝。<br><br> 当然，开启后是否起作用，要看所使用的系统版本。CentOS6 及其以上版本支持 sendfile 零拷贝。</li><li>tcp_nopush on<br><ul><li>on：以单独的数据包形式发送 Nginx 的响应头信息，而真正的响应体数据会再以数据包的形式发送，这个数据包中就不再包含响应头信息了。</li><li>off：默认值，响应头信息包含在每一个响应体数据包中。</li></ul></li><li>tcp_nodelay on<br><ul><li>on：不设置数据发送缓存，即不推迟发送，适合于传输小数据，无需缓存。</li><li>off：开启发送缓存。若传输的数据是图片等大数据量文件，则建议设置为 off。</li></ul></li><li>keepalive_timeout 60<br><br> 设置客户端与 Nginx 间所建立的长连接的生命超时时间，时间到达，则连接将自动关闭。单位秒。</li><li>keepalive_requests 10000<br><br> 设置一个长连接最多可以发送的请求数。该值需要在真实环境下测试。</li><li>client_body_timeout 10<br><br> 设置客户端获取 Nginx 响应的超时时限，即一个请求从客户端发出到接收到 Nginx 的响应的最长时间间隔。若超时，则认为本次请求失败。</li></ul><h2 id="nginx-缓存配置" tabindex="-1"><a class="header-anchor" href="#nginx-缓存配置" aria-hidden="true">#</a> nginx 缓存配置</h2><p>Nginx 具有很强大的缓存功能，可以对请求的 response 进行缓存，起到类似 CDN 的作用，甚至有比 CDN 更强大的功能。同时，Nginx 缓存还可以用来“数据托底”，即当后台 web 服务器挂掉的时候，Nginx 可以直接将缓存中的托底数据返回给用户。此功能就是 Nginx 实现“服务降级”的体现。<br> Nginx 缓存功能的配置由两部分构成：全局定义与局部定义。</p>`,25),x=a(`<li><p>http{}模块的缓存全局定义<br></p><ul><li><p>proxy_cache_path<br><br> 用于指定 Nginx 缓存的存放路径及相关配置。<br></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>proxy_cache_path /data/nginx/cache levels=1:2 keys_zone=mycache:10m inactive=2h max_size=5g use_temp_path=off;

    proxy_cache_path 缓存文件路径
    levels 设置缓存文件目录层次；levels=1:2 表示两级目录
    keys_zone 设置缓存名字和共享内存大小
    inactive 在指定时间内没人访问则被删除
    max_size 最大缓存空间，如果缓存空间满，默认覆盖掉缓存时间最长的资源。
    use_temp_path=off 直接写入到缓存文件
    \`\`\`

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>proxy_temp_path<br><br> 指定 Nginx 缓存的临时存放目录。若 proxy_cache_path 中的 use_temp_path 设置为了 off，则该属性可以不指定。</p></li></ul></li>`,1),f=e("p",null,[n("location{}模块的缓存局部定义"),e("br")],-1),k=e("li",null,[n("proxy_cache mycache"),e("br"),e("br"),n(" 指定用于存放缓存 key 内存区域名称。其值为 http{}模块中 proxy_cache_path 中的 keys_zone 的值。")],-1),T={class:"MathJax",jax:"SVG",style:{position:"relative"}},y={style:{"vertical-align":"-0.025ex"},xmlns:"http://www.w3.org/2000/svg",width:"4.278ex",height:"1.595ex",role:"img",focusable:"false",viewBox:"0 -694 1891 705","aria-hidden":"true"},w=a('<g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path data-c="210E" d="M137 683Q138 683 209 688T282 694Q294 694 294 685Q294 674 258 534Q220 386 220 383Q220 381 227 388Q288 442 357 442Q411 442 444 415T478 336Q478 285 440 178T402 50Q403 36 407 31T422 26Q450 26 474 56T513 138Q516 149 519 151T535 153Q555 153 555 145Q555 144 551 130Q535 71 500 33Q466 -10 419 -10H414Q367 -10 346 17T325 74Q325 90 361 192T398 345Q398 404 354 404H349Q266 404 205 306L198 293L164 158Q132 28 127 16Q114 -11 83 -11Q69 -11 59 -2T48 16Q48 30 121 320L195 616Q195 629 188 632T149 637H128Q122 643 122 645T124 664Q129 683 137 683Z"></path></g><g data-mml-node="mi" transform="translate(576,0)"><path data-c="1D45C" d="M201 -11Q126 -11 80 38T34 156Q34 221 64 279T146 380Q222 441 301 441Q333 441 341 440Q354 437 367 433T402 417T438 387T464 338T476 268Q476 161 390 75T201 -11ZM121 120Q121 70 147 48T206 26Q250 26 289 58T351 142Q360 163 374 216T388 308Q388 352 370 375Q346 405 306 405Q243 405 195 347Q158 303 140 230T121 120Z"></path></g><g data-mml-node="mi" transform="translate(1061,0)"><path data-c="1D460" d="M131 289Q131 321 147 354T203 415T300 442Q362 442 390 415T419 355Q419 323 402 308T364 292Q351 292 340 300T328 326Q328 342 337 354T354 372T367 378Q368 378 368 379Q368 382 361 388T336 399T297 405Q249 405 227 379T204 326Q204 301 223 291T278 274T330 259Q396 230 396 163Q396 135 385 107T352 51T289 7T195 -10Q118 -10 86 19T53 87Q53 126 74 143T118 160Q133 160 146 151T160 120Q160 94 142 76T111 58Q109 57 108 57T107 55Q108 52 115 47T146 34T201 27Q237 27 263 38T301 66T318 97T323 122Q323 150 302 164T254 181T195 196T148 231Q131 256 131 289Z"></path></g><g data-mml-node="mi" transform="translate(1530,0)"><path data-c="1D461" d="M26 385Q19 392 19 395Q19 399 22 411T27 425Q29 430 36 430T87 431H140L159 511Q162 522 166 540T173 566T179 586T187 603T197 615T211 624T229 626Q247 625 254 615T261 596Q261 589 252 549T232 470L222 433Q222 431 272 431H323Q330 424 330 420Q330 398 317 385H210L174 240Q135 80 135 68Q135 26 162 26Q197 26 230 60T283 144Q285 150 288 151T303 153H307Q322 153 322 145Q322 142 319 133Q314 117 301 95T267 48T216 6T155 -11Q125 -11 98 4T59 56Q57 64 57 83V101L92 241Q127 382 128 383Q128 385 77 385H26Z"></path></g></g></g>',1),Q=[w],$=e("mjx-assistive-mml",{unselectable:"on",display:"inline"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("mi",null,"h"),e("mi",null,"o"),e("mi",null,"s"),e("mi",null,"t")])],-1),N=e("br",null,null,-1),q=e("br",null,null,-1),C=a("<li>proxy_cache_bypass $arg_age<br><br> 指定是否越过缓存。</li><li>proxy_cache_methods GET HEAD<br><br> 指定客户端请求的哪些提交方法将被缓存，默认为 GET 与 HEAD，但不缓存 POST。</li><li>proxy_no_cache $aaa $bbb $ccc<br><br> 指定对本次请求是否不做缓存。只要有一个不为 0，就不对该请求结果缓存。</li><li>proxy_cache_purge $ddd $eee $fff<br><br> 指定是否清除缓存 key。</li><li>proxy_cache_lock on<br><br> 指定是否采用互斥方式回源。</li><li>proxy_cache_lock_timeout 5s<br><br> 指定再次生成回源互斥锁的时限。</li><li>proxy_cache_valid 5s<br><br> 对指定的 HTTP 状态码的响应数据进行缓存，并指定缓存时间。默认指定的状态码为 200，301，302。</li><li>proxy_cache_use_stale http_404 http_500<br><br> 设置启用托底缓存的条件。而一旦这里指定了相应的状态码，则前面 proxy_cache_calid 中指定的相应状态码所生成的缓存就变为了“托底缓存”。</li><li>expires 3m<br><br> 为请求的静态资源开启浏览器端的缓存。</li>",9),O=a(`<div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>http{
  # 设置缓存的目录，并且内存中缓存区名为hot_cache，大小为128m，
  # 三天未被访问过的缓存自动清楚，磁盘中缓存的最大容量为2GB。
  proxy_cache_path /soft/nginx/cache levels=1:2 keys_zone=hot_cache:128m inactive=3d max_size=2g;

  server{
    location / {
      # 使用名为nginx_cache的缓存空间
      proxy_cache hot_cache;
      # 对于200、206、304、301、302状态码的数据缓存1天
      proxy_cache_valid 200 206 304 301 302 1d;
      # 对于其他状态的数据缓存30分钟
      proxy_cache_valid any 30m;
      # 定义生成缓存键的规则（请求的url+参数作为key）
      proxy_cache_key $host$uri$is_args$args;
      # 资源至少被重复访问三次后再加入缓存
      proxy_cache_min_uses 3;
      # 出现重复请求时，只让一个去后端读数据，其他的从缓存中读取
      proxy_cache_lock on;
      # 上面的锁超时时间为3s，超过3s未获取数据，其他请求直接去后端
      proxy_cache_lock_timeout 3s;
      # 对于请求参数或cookie中声明了不缓存的数据，不再加入缓存
      proxy_no_cache $cookie_nocache $arg_nocache $arg_comment;
      # 在响应头中添加一个缓存是否命中的状态（便于调试）
      add_header Cache-status $upstream_cache_status;
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="缓存清理" tabindex="-1"><a class="header-anchor" href="#缓存清理" aria-hidden="true">#</a> 缓存清理</h3><blockquote><p>当缓存过多时，如果不及时清理会导致磁盘空间被“吃光”，因此我们需要一套完善的缓存清理机制去删除缓存，在之前的 proxy_cache_path 参数中有 purger 相关的选项，开启后可以帮我们自动清理缓存，但遗憾的是：<strong>purger 系列参数只有商业版的 NginxPlus 才能使用，因此需要付费才可使用。</strong></p><p>不过天无绝人之路，我们可以通过强大的第三方模块 ngx_cache_purge 来替代，先来安装一下该插件：</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ~/app/cache_purge <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> ~/app/cache_purge
<span class="token function">wget</span> https://github.com/FRiCKLE/ngx_cache_purge/archive/2.3.tar.gz
<span class="token function">tar</span> <span class="token parameter variable">-xvzf</span> <span class="token number">2.3</span>.tar.gz
<span class="token builtin class-name">cd</span> ~/app/nginx
./configure <span class="token parameter variable">--prefix</span><span class="token operator">=</span>/user/local/nginx/ --add-module<span class="token operator">=~</span>/app/cache_purge/ngx_cache_purge-2.3/
<span class="token function">make</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>第三方缓存清除模块 ngx_cache_purge 就安装完成了，接下来稍微修改一下 nginx.conf 配置，再添加一条 location 规则：</p></blockquote><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>location ~ /purge(/.*) {
  # 配置可以执行清除操作的IP（线上可以配置成内网机器）
  # allow 127.0.0.1; # 代表本机
  allow all; # 代表允许任意IP清除缓存
  proxy_cache_purge $host$1$is_args$args;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>然后再重启 Nginx，接下来即可通过<a href="http:127.0.0.1:80//xxx/purge/xx">http:127.0.0.1:80//xxx/purge/xx</a>的方式清除缓存。</p></blockquote><h2 id="nginx-变量" tabindex="-1"><a class="header-anchor" href="#nginx-变量" aria-hidden="true">#</a> Nginx 变量</h2><ul><li>自定义变量</li></ul><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>set $aaa &quot;hello&quot;;
set $bbb 0;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>内置变量</li></ul><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>$args                   请求中的参数;
$binary_remote_addr     远程地址的二进制表示
$body_bytes_sent        已发送的消息体字节数
$content_length         HTTP 请求信息里的&quot;Content-Length&quot;
$content_type           请求信息里的&quot;Content-Type&quot;
$document_root          针对当前请求的根路径设置值
$document_uri           与$uri 相同
$host                   请求信息中的&quot;Host&quot;，如果请求中没有 Host 行，则等于设置的服务器名;
$http_cookie            cookie 信息
$http_referer           来源地址
$http_user_agent        客户端代理信息
$http_via               最后一个访问服务器的 Ip 地址
$http_x_forwarded_for   相当于网络访问路径。
$limit_rate             对连接速率的限制
$remote_addr            客户端地址
$remote_port            客户端端口号
$remote_user            客户端用户名，认证用
$request                用户请求信息
$request_body           用户请求主体
$request_body_file      发往后端的本地文件名称
$request_filename       当前请求的文件路径名
$request_method         请求的方法，比如&quot;GET&quot;、&quot;POST&quot;等
$request_uri            请求的 URI，带参数
$server_addr            服务器地址，如果没有用 listen 指明服务器地址，使用这个变量将发起一次系统调用以取得地址(造成资源浪费)
$server_name            请求到达的服务器名
$server_port            请求到达的服务器端口号
$server_protocol        请求的协议版本，&quot;HTTP/1.0&quot;或&quot;HTTP/1.1&quot;
$uri                    请求的 URI，可能和最初的值有不同，比如经过重定向之类的
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="反向代理" tabindex="-1"><a class="header-anchor" href="#反向代理" aria-hidden="true">#</a> 反向代理</h2><ul><li>client_max_body_size 100k;<br><br> Nginx 允许客户端请求的单文件最大大小，单位字节。</li><li>client_body_buffer_size 80k;<br><br> Nginx 为客户端请求设置的缓存大小。</li><li>proxy_buffering on<br><br> 开启从后端被代理服务器的响应内容缓冲区。默认值 on。</li><li>proxy_buffers 4 8k;<br><br> 该指令用于设置缓冲区的数量与大小。从被代理的后端服务器取得的响应内容，会缓<br> 存到这里。</li><li>proxy_busy_buffers_size 16k;<br><br> 高负荷下缓存大小，其默认值为一般为单个 proxy_buffers 的 2 倍。</li><li>proxy_connect_timeout 60s;<br><br> Nginx 跟后端服务器连接超时时间。默认 60 秒。</li><li>proxy_read_timeout 60s;<br><br> Nginx 发出请求后等待后端服务器响应的最长时限。默认 60 秒。</li></ul><h2 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡" aria-hidden="true">#</a> 负载均衡</h2><ul><li>轮询<br><br> 默认的负载均衡策略，其是按照各个主机的权重比例依次进行请求分配的。</li></ul>`,16),L=e("div",{class:"language-conf line-numbers-mode","data-ext":"conf"},[e("pre",{conf:"",class:"language-conf"},[e("code",null,`upstream backserver {
    server 192.16.18.101 weight=1 fail_timeout=20 max_fails=3;
    server 192.16.18.102 weight=2 fail_timeout=20 max_fails=3;
    server 192.16.18.103 backup;
    server 192.16.18.104 down;
}
# backup：表示当前服务器为备用服务器。
# down：表示当前服务器永久停机。
# fail_timeout：表示当前主机被 Nginx 认定为停机的最长失联时间，默认为 10 秒。常与max_fails 联合使用。
# max_fails：表示在 fail_timeout 时间内最多允许的失败次数。
`)]),e("div",{class:"highlight-lines"},[e("div",{class:"highlight-line"}," "),e("div",{class:"highlight-line"}," "),e("div",{class:"highlight-line"}," "),e("div",{class:"highlight-line"}," "),e("div",{class:"highlight-line"}," "),e("div",{class:"highlight-line"}," "),e("br"),e("br"),e("br"),e("br")]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),E=e("ul",null,[e("li",null,[n("ip_hash"),e("br"),e("br"),n(" 指定负载均衡器按照基于客户端 IP 的分配方式")])],-1),P=e("div",{class:"language-conf line-numbers-mode","data-ext":"conf"},[e("pre",{conf:"",class:"language-conf"},[e("code",null,`upstream backserver {
    ip_hash;
    server 192.16.18.101 weight=1 fail_timeout=20 max_fails=3;
    server 192.16.18.102 weight=2 fail_timeout=20 max_fails=3;
}

# 对于该策略需要注意以下几点：
# 在 nginx1.3.1 版本之前，该策略中不能指定 weight 属性。
# 该策略不能与 backup 同时使用。
# 此策略适合有状态服务，比如 session。
# 当有服务器宕机，必须手动指定 down 属性，否则请求仍是会落到该服务器。
`)]),e("div",{class:"highlight-lines"},[e("div",{class:"highlight-line"}," "),e("div",{class:"highlight-line"}," "),e("div",{class:"highlight-line"}," "),e("div",{class:"highlight-line"}," "),e("div",{class:"highlight-line"}," "),e("br"),e("br"),e("br"),e("br"),e("br"),e("br")]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),I=e("ul",null,[e("li",null,[n("least_conn"),e("br"),e("br"),n(" 把请求转发给连接数最少的服务器")])],-1),H=e("div",{class:"language-conf line-numbers-mode","data-ext":"conf"},[e("pre",{conf:"",class:"language-conf"},[e("code",null,`upstream backserver {
    least_conn;
    server 192.16.18.101 weight=1 fail_timeout=20 max_fails=3;
    server 192.16.18.102 weight=2 fail_timeout=20 max_fails=3;
}
`)]),e("div",{class:"highlight-lines"},[e("div",{class:"highlight-line"}," "),e("div",{class:"highlight-line"}," "),e("div",{class:"highlight-line"}," "),e("div",{class:"highlight-line"}," "),e("div",{class:"highlight-line"}," ")]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),S=e("ul",null,[e("li",null,[n("fair（第三方） "),e("br"),e("br"),n(" 按后端服务器的响应时间来分配请求，响应时间短的优先分配。")])],-1),A=e("div",{class:"language-conf line-numbers-mode","data-ext":"conf"},[e("pre",{conf:"",class:"language-conf"},[e("code",null,`upstream backend {
    fair;
    server localhost:8080;
    server localhost:8081;
}
`)]),e("div",{class:"highlight-lines"},[e("br"),e("div",{class:"highlight-line"}," "),e("br"),e("br"),e("br")]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),z=e("ul",null,[e("li",null,[n("url_hash（第三方） "),e("br"),e("br"),n(" 按访问 url 的 hash 结果来分配请求，使每个 url 定向到同一个后端服务器，后端服务器为缓存时比较有效。")])],-1),M=e("div",{class:"language-conf line-numbers-mode","data-ext":"conf"},[e("pre",{conf:"",class:"language-conf"},[e("code",null,`upstream backend {
    hash $request_uri;
    hash_method crc32;
    server localhost:8080;
    server localhost:8081;
}
`)]),e("div",{class:"highlight-lines"},[e("br"),e("div",{class:"highlight-line"}," "),e("div",{class:"highlight-line"}," "),e("br"),e("br"),e("br")]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),G=a(`<h2 id="虚拟主机配置" tabindex="-1"><a class="header-anchor" href="#虚拟主机配置" aria-hidden="true">#</a> 虚拟主机配置</h2><details class="hint-container details"><summary>upstreams.conf</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /usr/local/software/nginx/conf/upstreams.conf <span class="token operator">&lt;&lt;</span><span class="token string">EOF
upstream www.68.com {
  server tomcatOS:8081 weight=1;
  server tomcatOS:8082 weight=1;
}
upstream bj.68.com {
  server tomcatOS:8083 weight=1;
  server tomcatOS:8084 weight=1;
}
upstream sh.68.com {
  server tomcatOS:8085 weight=1;
  server tomcatOS:8086 weight=1;
}
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>vhosts.conf</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /usr/local/software/nginx/conf/vhosts.conf <span class="token operator">&lt;&lt;</span><span class="token string">EOF
server {
    listen 80;
    server_name www.68.com;
    location / {
        proxy_pass http://www.68.com
    }
}
server {
    listen 80;
    server_name bj.68.com;
    location / {
        proxy_pass http://bj.68.com
    }
}
server {
    listen 80;
    server_name sh.68.com;
    location / {
        proxy_pass http://sh.68.com
    }
}
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,3),D=e("div",{class:"language-conf line-numbers-mode","data-ext":"conf"},[e("pre",{conf:"",class:"language-conf"},[e("code",null,`  worker_processes  1;
  events {
      worker_connections  1024;
  }
  http {
      include /usr/local/software/nginx/conf/upstreams.conf;
      include /usr/local/software/nginx/conf/vhosts.conf;
      server {
          ...
      }
  }
`)]),e("div",{class:"highlight-lines"},[e("br"),e("br"),e("br"),e("br"),e("br"),e("div",{class:"highlight-line"}," "),e("div",{class:"highlight-line"}," "),e("br"),e("br"),e("br"),e("br")]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),U=a(`<hr><details class="hint-container details"><summary>Nginx 性能调优</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 零拷贝（Zero Copy）</span>
- 传统的拷贝方式
- Gather Copy DMA 零拷贝方式
- mmap 零拷贝
<span class="token comment">## 多路复用器 select|poll|epoll</span>
- select<span class="token operator">&lt;</span>br/<span class="token operator">&gt;</span>
<span class="token keyword">select</span> 多路复用器是采用轮询的方式，一直在轮询所有的相关内核进程，查看它们的进程状态。若已经就绪，则马上将该内核进程放入到就绪队列。否则，继续查看下一个内核进程状态。在处理内核进程事务之前，app 进程首先会从内核空间中将用户连接请求相关数据复制到用户空间。<span class="token operator">&lt;</span>br/<span class="token operator">&gt;</span>
该多路复用器的缺陷有以下几点：
  - 对所有内核进程采用轮询方式效率会很低。因为对于大多数情况下，内核进程都不属于
就绪状态，只有少部分才会是就绪态。所以这种轮询结果大多数都是无意义的。
  - 由于就绪队列底层由数组实现，所以其所能处理的内核进程数量是有限制的，即其能够
处理的最大并发连接数量是有限制的。
  - 从内核空间到用户空间的复制，系统开销大。
- poll<span class="token operator">&lt;</span>br/<span class="token operator">&gt;</span>
poll 多路复用器的工作原理与 <span class="token keyword">select</span> 几乎相同，不同的是，由于其就绪队列由链表实现，所以，其对于要处理的内核进程数量理论上是没有限制的，即其能够处理的最大并发连接数量是没有限制的（当然，要受限于当前系统中进程可以打开的最大文件描述符数 ulimit，后面会讲到）。
- epoll<span class="token operator">&lt;</span>br/<span class="token operator">&gt;</span>
epoll 多路复用是对 <span class="token keyword">select</span> 与 poll 的增强与改进。其不再采用轮询方式了，而是采用回调方式实现对内核进程状态的获取：一旦内核进程就绪，其就会回调 epoll 多路复用器，进入到多路复用器的就绪队列（由链表实现）。所以 epoll 多路复用模型也称为 epoll 事件驱动模型。<span class="token operator">&lt;</span>br/<span class="token operator">&gt;</span>
另外，应用程序所使用的数据，也不再从内核空间复制到用户空间了，而是使用 mmap零拷贝机制，大大降低了系统开销。<span class="token operator">&lt;</span>br/<span class="token operator">&gt;</span>
当内核进程就绪信息通知了 epoll 多路复用器后，多路复用器就会马上对其进行处理，将其马上存放到就绪队列吗？不是的。根据处理方式的不同，可以分为两种处理模式：LT模式与 ET 模式。
  - LT （Level Triggered）<span class="token operator">&lt;</span>br/<span class="token operator">&gt;</span>
水平触发模式。<span class="token operator">&lt;</span>br/<span class="token operator">&gt;</span>即只要内核进程的就绪通知由于某种原因暂时没有被 epoll 处理，则该内核进程就会定时将其就绪信息通知 epoll。直到 epoll 将其写入到就绪队列，或由于某种原因该内核进程又不再就绪而不再通知。其支持两种通讯方式：BIO 与
NIO。
  - ET （Edge Triggered）<span class="token operator">&lt;</span>br/<span class="token operator">&gt;</span>
边缘触发模式。其仅支持 NIO 的通讯方式。<span class="token operator">&lt;</span>br/<span class="token operator">&gt;</span>当内核进程的就绪信息仅会通知一次 epoll，无论 epoll 是否处理该通知。明显该方式的效率要高于 LT 模式，但其有可能会出现就绪通知被忽视的情况，即连接请求丢失的情况。

<span class="token comment">## Nginx 的并发处理机制</span>
一般情况下并发处理机制有三种：多进程、多线程，与异步机制。<span class="token operator">&lt;</span>br/<span class="token operator">&gt;</span>
Nginx 对于并发的处理同时采用了三种机制。当然，其异步机制使用的是异步非阻塞方式。<span class="token operator">&lt;</span>br/<span class="token operator">&gt;</span>
我们知道 Nginx 的进程分为两类：master 进程与 worker 进程。每个 master 进程可以生成多个 worker 进程，所以其是多进程的。每个 worker 进程可以同时处理多个用户请求，每个用户请求会由一个线程来处理，所以其是多线程的。<span class="token operator">&lt;</span>br/<span class="token operator">&gt;</span>
那么，如何解释其“异步非阻塞”并发处理机制呢？<span class="token operator">&lt;</span>br/<span class="token operator">&gt;</span>
worker 进程采用的就是 epoll 多路复用机制来对后端服务器进行处理的。当后端服务器返回结果后，后端服务器就会回调 epoll 多路复用器，由多路复用器对相应的 worker 进程进行通知。此时，worker 进程就会挂起当前正在处理的事务，拿 IO 返回结果去响应客户端请求。响应完毕后，会再继续执行挂起的事务。这个过程就是“异步非阻塞”的。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="跨域问题" tabindex="-1"><a class="header-anchor" href="#跨域问题" aria-hidden="true">#</a> 跨域问题</h2><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>## 前端网站地址：http://localhost:8080
## 服务端网址：http://localhost:59200
server {
  listen       22222;
  server_name  localhost;
  location  / {
    # 允许跨域的请求，可以自定义变量$http_origin，* 表示所有
    add_header Access-Control-Allow-Origin &#39;http://localhost:8080&#39; always;
    # 允许请求时携带的头部信息，*表示所有
    add_header Access-Control-Allow-Headers &#39;*&#39;;
    # 允许跨域请求的方法：GET,POST,OPTIONS,PUT
    # add_header Access-Control-Allow-Methods &#39;GET,POST,OPTIONS,PUT&#39;;
    add_header Access-Control-Allow-Methods &#39;*&#39;;
    # 允许携带cookie请求
    add_header Access-Control-Allow-Credentials &#39;true&#39;;
    # 允许发送按段获取资源的请求
    add_header &#39;Access-Control-Expose-Headers&#39; &#39;Content-Length,Content-Range&#39;;
    if ($request_method = &#39;OPTIONS&#39;) {
      add_header &#39;Access-Control-Max-Age&#39; 1728000;
      add_header &#39;Content-Type&#39; &#39;text/plain; charset=utf-8&#39;;
      add_header &#39;Content-Length&#39; 0;
      # 对于Options方式的请求返回204，表示接受跨域请求
      return 204;
    }
    proxy_pass  http://localhost:59200; 
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function B(V,j){const i=r("router-link"),c=r("ExternalLinkIcon");return d(),t("div",null,[b,m,u(" more "),e("nav",p,[e("ul",null,[e("li",null,[s(i,{to:"#快速获取-nginx-的配置"},{default:l(()=>[n("快速获取 NGINX 的配置")]),_:1})]),e("li",null,[s(i,{to:"#请求定位"},{default:l(()=>[n("请求定位")]),_:1})]),e("li",null,[s(i,{to:"#全局模块"},{default:l(()=>[n("全局模块")]),_:1})]),e("li",null,[s(i,{to:"#events-模块"},{default:l(()=>[n("events 模块")]),_:1})]),e("li",null,[s(i,{to:"#http-模块"},{default:l(()=>[n("http 模块")]),_:1})]),e("li",null,[s(i,{to:"#nginx-缓存配置"},{default:l(()=>[n("nginx 缓存配置")]),_:1}),e("ul",null,[e("li",null,[s(i,{to:"#缓存清理"},{default:l(()=>[n("缓存清理")]),_:1})])])]),e("li",null,[s(i,{to:"#nginx-变量"},{default:l(()=>[n("Nginx 变量")]),_:1})]),e("li",null,[s(i,{to:"#反向代理"},{default:l(()=>[n("反向代理")]),_:1})]),e("li",null,[s(i,{to:"#负载均衡"},{default:l(()=>[n("负载均衡")]),_:1})]),e("li",null,[s(i,{to:"#虚拟主机配置"},{default:l(()=>[n("虚拟主机配置")]),_:1})]),e("li",null,[s(i,{to:"#跨域问题"},{default:l(()=>[n("跨域问题")]),_:1})])])]),h,e("blockquote",null,[e("p",null,[e("a",g,[n("配置高性能、安全、稳定的 NGINX 服务器的最简单方法。"),s(c)])])]),_,e("ul",null,[x,e("li",null,[f,e("ul",null,[k,e("li",null,[n("proxy_cache_key "),e("mjx-container",T,[(d(),t("svg",y,Q)),$]),n("request_uri$arg_age"),N,q,n(" 指定 Nginx 生成的缓存的 key 的组成。")]),C])])]),O,L,E,P,I,H,S,A,z,M,G,D,U])}const R=o(v,[["render",B],["__file","02.nginx核心配置.html.vue"]]);export{R as default};
