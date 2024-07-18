import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as t,c as v,e as o,a as e,d as s,w as i,b as n,f as d}from"./app-efa5e96e.js";const u={},p={class:"table-of-contents"},m=d(`<h2 id="安装-nginx" tabindex="-1"><a class="header-anchor" href="#安装-nginx" aria-hidden="true">#</a> 安装 nginx</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
<span class="token function">wget</span> <span class="token parameter variable">-O</span> /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
yum <span class="token parameter variable">-y</span> <span class="token function">install</span>  nginx
systemctl <span class="token builtin class-name">enable</span> nginx.service <span class="token operator">&amp;&amp;</span> systemctl start nginx.service <span class="token operator">&amp;&amp;</span> systemctl status nginx.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装-keepalived" tabindex="-1"><a class="header-anchor" href="#安装-keepalived" aria-hidden="true">#</a> 安装 keepalived</h2>`,3),b={href:"https://www.keepalived.org/download.html",target:"_blank",rel:"noopener noreferrer"},h=d(`<h3 id="在线安装" tabindex="-1"><a class="header-anchor" href="#在线安装" aria-hidden="true">#</a> 在线安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> keepalived
<span class="token comment">## 启动keepalived</span>
systemctl <span class="token builtin class-name">enable</span> keepalived.service <span class="token operator">&amp;&amp;</span> systemctl start keepalived.service <span class="token operator">&amp;&amp;</span> systemctl status keepalived.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="离线安装" tabindex="-1"><a class="header-anchor" href="#离线安装" aria-hidden="true">#</a> 离线安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ~/app/keepalived <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> ~/app/keepalived
<span class="token function">wget</span> https://www.keepalived.org/software/keepalived-2.2.7.tar.gz --no-check-certificate
<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> keepalived-2.2.7.tar.gz
<span class="token builtin class-name">cd</span> keepalived-2.2.7
<span class="token comment">## 编译</span>
./configure <span class="token parameter variable">--prefix</span><span class="token operator">=</span>/usr/local/keepalived/ <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token function">install</span>
<span class="token comment">## 查看目录</span>
ll /usr/local/keepalived/
<span class="token comment">## 启动keepalived</span>
systemctl <span class="token builtin class-name">enable</span> keepalived.service <span class="token operator">&amp;&amp;</span> systemctl start keepalived.service <span class="token operator">&amp;&amp;</span> systemctl status keepalived.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置-keepalived" tabindex="-1"><a class="header-anchor" href="#配置-keepalived" aria-hidden="true">#</a> 配置 keepalived</h2><h2 id="检测脚本" tabindex="-1"><a class="header-anchor" href="#检测脚本" aria-hidden="true">#</a> 检测脚本</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /usr/local/src
<span class="token function">cat</span> <span class="token operator">&gt;</span> /usr/local/src/check_nginx_pid_restart.sh <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
#!/bin/sh

## 检测nginx是否启动了
NGINX_NUMBER=\\<span class="token variable"><span class="token variable">\`</span><span class="token function">ps</span> <span class="token parameter variable">-C</span> nginx --no-header <span class="token operator">|</span> <span class="token function">wc</span> -l<span class="token punctuation">\\</span><span class="token variable">\`</span></span>
## 判断后台是否还有Nginx进程在运行
if [ \\<span class="token variable">$NGINX_NUMBER</span> -eq 0 ];then
   ## 重启nginx
   systemctl start nginx.service
   # 重启后等待1s后，再次查询后台进程数
   sleep 1
   ## nginx重启失败，则停掉keepalived服务，进行VIP转移
   if [ \\<span class="token variable"><span class="token variable">\`</span><span class="token function">ps</span> <span class="token parameter variable">-C</span> nginx --no-header <span class="token operator">|</span> <span class="token function">wc</span> -l<span class="token punctuation">\\</span><span class="token variable">\`</span></span> -eq 0 ];then
      systemctl stop keepalived.service
   fi
fi
EOF</span>
<span class="token comment"># 在vi命令里面执行，修改编码格式</span>
:set <span class="token assign-left variable">fileformat</span><span class="token operator">=</span>unix
<span class="token comment"># 在vi命令里面执行，查看修改后的编码格式</span>
:set ff 

<span class="token comment">## 脚本授权</span>
<span class="token function">chmod</span> <span class="token number">775</span> /usr/local/src/check_nginx_pid_restart.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="主配置文件" tabindex="-1"><a class="header-anchor" href="#主配置文件" aria-hidden="true">#</a> 主配置文件</h3><blockquote><p>离线编译配置文件位置：vi /usr/local/keepalived/etc/keepalived/keepalived.conf</p><p>yum 安装配置文件位置：vi /etc/keepalived/keepalived.conf</p></blockquote><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>global_defs {
   # 自带的邮件提醒服务，建议用独立的监控或第三方SMTP，也可选择配置邮件发送。
   notification_email {
      root@localhost
   }
   notification_email_from root@localhost
   smtp_server localhost
   smtp_connect_timeout 30
   # 高可用集群主机身份标识(集群中主机身份标识名称不能重复，建议配置成本机IP)
   router_id 192.168.60.91
}
# 定时运行的脚本文件配置
vrrp_script check_nginx {
   # 心跳执行的脚本，检测nginx是否启动
   script &quot;/usr/local/src/check_nginx_pid_restart.sh&quot;
   # 每间隔3秒执行一次
   interval 3
   # 如果脚本中的条件成立，重启一次则权重-2
   weight -2
}
# 定义虚拟路由，VI_1为虚拟路由的标示符（可自定义名称）
vrrp_instance VI_1 {
   #  指定keepalived的角色，MASTER为主，BACKUP为备
   state MASTER
   # 绑定虚拟IP的网络接口，根据自己的机器的网卡配置
   interface ens33
   # 虚拟路由的ID号，主从两个节点设置必须一样
   virtual_router_id 66
   # 填写本机IP
   mcast_src_ip 192.168.60.91
   # 节点权重优先级，主节点要比从节点优先级高
   priority 100
   # 优先级高的设置nopreempt，解决异常恢复后再次抢占造成的脑裂问题
   nopreempt
   # 组播信息发送间隔，两个节点设置必须一样，默认1s（类似于心跳检测）
   advert_int 1
   # 授权访问
   authentication {
      # 设置验证类型和密码，MASTER和BACKUP必须使用相同的密码才能正常通信
      auth_type PASS
      auth_pass 123456
   }
   # 将track_script块加入instance配置块
   track_script {
      # 执行Nginx监控的脚本
      check_nginx
   }
   # 定义虚拟IP(VIP)，可多设，每行一个
   virtual_ipaddress {
      192.168.60.90
   }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 重新加载</span>
systemctl daemon-reload <span class="token operator">&amp;&amp;</span> systemctl restart keepalived.service <span class="token operator">&amp;&amp;</span> systemctl status keepalived.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="备机配置" tabindex="-1"><a class="header-anchor" href="#备机配置" aria-hidden="true">#</a> 备机配置</h3><blockquote><p>离线编译配置文件位置：vi /usr/local/keepalived/etc/keepalived/keepalived.conf</p><p>yum 安装配置文件位置：vi /etc/keepalived/keepalived.conf</p></blockquote><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>global_defs {
   # 自带的邮件提醒服务，建议用独立的监控或第三方SMTP，也可选择配置邮件发送。
   notification_email {
      root@localhost
   }
   notification_email_from root@localhost
   smtp_server localhost
   smtp_connect_timeout 30
   # 高可用集群主机身份标识(集群中主机身份标识名称不能重复，建议配置成本机IP)
   router_id 192.168.60.92
}
# 定时运行的脚本文件配置
vrrp_script check_nginx {
   # 心跳执行的脚本，检测nginx是否启动
   script &quot;/usr/local/src/check_nginx_pid_restart.sh&quot;
   # 每间隔2秒执行一次
   interval 2
   # 权重
   weight 2
}
# 定义虚拟路由，VI_1为虚拟路由的标示符（可自定义名称）
vrrp_instance VI_1 {
   #  指定keepalived的角色，MASTER为主，BACKUP为备
   state BACKUP
   # 绑定虚拟IP的网络接口，根据自己的机器的网卡配置
   interface ens33
   # 虚拟路由的ID号，主从两个节点设置必须一样
   virtual_router_id 66
   # 填写本机IP
   mcast_src_ip 192.168.60.92
   # 节点权重优先级，主节点要比从节点优先级高
   priority 90
   # 优先级高的设置nopreempt，解决异常恢复后再次抢占造成的脑裂问题
   nopreempt
   # 组播信息发送间隔，两个节点设置必须一样，默认1s（类似于心跳检测）
   advert_int 1
   # 授权访问
   authentication {
      # 设置验证类型和密码，MASTER和BACKUP必须使用相同的密码才能正常通信
      auth_type PASS
      auth_pass 123456
   }
   # 将track_script块加入instance配置块
   track_script {
      # 执行Nginx监控的脚本
      check_nginx
   }
   # 定义虚拟IP(VIP)，可多设，每行一个
   virtual_ipaddress {
      192.168.60.90
   }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 重新加载</span>
systemctl daemon-reload <span class="token operator">&amp;&amp;</span> systemctl restart keepalived.service <span class="token operator">&amp;&amp;</span> systemctl status keepalived.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="性能优化" tabindex="-1"><a class="header-anchor" href="#性能优化" aria-hidden="true">#</a> 性能优化</h2><h3 id="打开长连接配置" tabindex="-1"><a class="header-anchor" href="#打开长连接配置" aria-hidden="true">#</a> 打开长连接配置</h3><blockquote><p>通常 Nginx 作为代理服务，负责分发客户端的请求，那么建议开启 HTTP 长连接，用户减少握手的次数，降低服务器损耗，具体如下：</p></blockquote><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>upstream xxx {
    # 长连接数
    keepalive 32;
    # 每个长连接提供的最大请求数
    keepalived_requests 100;
    # 每个长连接没有新的请求时，保持的最长时间
    keepalive_timeout 60s;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="开启零拷贝技术" tabindex="-1"><a class="header-anchor" href="#开启零拷贝技术" aria-hidden="true">#</a> 开启零拷贝技术</h3><blockquote><p>零拷贝这个概念，在大多数性能较为不错的中间件中都有出现，例如 Kafka、Netty 等，而 Nginx 中也可以配置数据零拷贝技术，如下：</p></blockquote><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>sendfile on; # 开启零拷贝机制
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>零拷贝读取机制与传统资源读取机制的区别：</p><ul><li>传统方式：「硬件--&gt;内核--&gt;用户空间--&gt;程序空间--&gt;程序内核空间--&gt;网络套接字」</li><li>零拷贝方式：「硬件--&gt;内核--&gt;程序内核空间--&gt;网络套接字」</li></ul><h3 id="开启无延迟或多包共发机制" tabindex="-1"><a class="header-anchor" href="#开启无延迟或多包共发机制" aria-hidden="true">#</a> 开启无延迟或多包共发机制</h3><blockquote><p>在 Nginx 中有两个较为关键的性能参数，即 tcp_nodelay、tcp_nopush，开启方式如下：</p></blockquote><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>tcp_nodelay on;
tcp_nopush on;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="调整-worker-工作进程" tabindex="-1"><a class="header-anchor" href="#调整-worker-工作进程" aria-hidden="true">#</a> 调整 Worker 工作进程</h3><blockquote><p>Nginx 启动后默认只会开启一个 Worker 工作进程处理客户端请求，而我们可以根据机器的 CPU 核数开启对应数量的工作进程，以此来提升整体的并发量支持，如下：</p></blockquote><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code># 自动根据CPU核心数调整Worker进程数量
worker_processes auto;
# 每个Worker能打开的文件描述符，最少调整至1W以上，负荷较高建议2-3W
worker_rlimit_nofile 20000;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="开启-cpu-亲和机制" tabindex="-1"><a class="header-anchor" href="#开启-cpu-亲和机制" aria-hidden="true">#</a> 开启 CPU 亲和机制</h3><p>对于并发编程较为熟悉的伙伴都知道，因为进程/线程数往往都会远超出系统 CPU 的核心数，因为操作系统执行的原理本质上是采用时间片切换机制，也就是一个 CPU 核心会在多个进程之间不断频繁切换，造成很大的性能损耗。</p><p>而 CPU 亲和机制则是指将每个 Nginx 的工作进程，绑定在固定的 CPU 核心上，从而减小 CPU 切换带来的时间开销和资源损耗，开启方式如下：</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>worker_cpu_affinity auto;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="开启-epoll-模型及调整并发连接数" tabindex="-1"><a class="header-anchor" href="#开启-epoll-模型及调整并发连接数" aria-hidden="true">#</a> 开启 epoll 模型及调整并发连接数</h3><p>在最开始就提到过：Nginx、Redis 都是基于多路复用模型去实现的程序，但最初版的多路复用模型 select/poll 最大只能监听 1024 个连接，而 epoll 则属于 select/poll 接口的增强版，因此采用该模型能够大程度上提升单个 Worker 的性能，如下：</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>events {
  # 使用epoll网络模型
  use epoll;
  # 调整每个Worker能够处理的连接数上限
  worker_connections  10240;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,37);function k(g,_){const a=l("router-link"),r=l("ExternalLinkIcon");return t(),v("div",null,[o(" more "),e("nav",p,[e("ul",null,[e("li",null,[s(a,{to:"#安装-nginx"},{default:i(()=>[n("安装 nginx")]),_:1})]),e("li",null,[s(a,{to:"#安装-keepalived"},{default:i(()=>[n("安装 keepalived")]),_:1}),e("ul",null,[e("li",null,[s(a,{to:"#在线安装"},{default:i(()=>[n("在线安装")]),_:1})]),e("li",null,[s(a,{to:"#离线安装"},{default:i(()=>[n("离线安装")]),_:1})])])]),e("li",null,[s(a,{to:"#配置-keepalived"},{default:i(()=>[n("配置 keepalived")]),_:1})]),e("li",null,[s(a,{to:"#检测脚本"},{default:i(()=>[n("检测脚本")]),_:1}),e("ul",null,[e("li",null,[s(a,{to:"#主配置文件"},{default:i(()=>[n("主配置文件")]),_:1})]),e("li",null,[s(a,{to:"#备机配置"},{default:i(()=>[n("备机配置")]),_:1})])])]),e("li",null,[s(a,{to:"#性能优化"},{default:i(()=>[n("性能优化")]),_:1}),e("ul",null,[e("li",null,[s(a,{to:"#打开长连接配置"},{default:i(()=>[n("打开长连接配置")]),_:1})]),e("li",null,[s(a,{to:"#开启零拷贝技术"},{default:i(()=>[n("开启零拷贝技术")]),_:1})]),e("li",null,[s(a,{to:"#开启无延迟或多包共发机制"},{default:i(()=>[n("开启无延迟或多包共发机制")]),_:1})]),e("li",null,[s(a,{to:"#调整-worker-工作进程"},{default:i(()=>[n("调整 Worker 工作进程")]),_:1})]),e("li",null,[s(a,{to:"#开启-cpu-亲和机制"},{default:i(()=>[n("开启 CPU 亲和机制")]),_:1})]),e("li",null,[s(a,{to:"#开启-epoll-模型及调整并发连接数"},{default:i(()=>[n("开启 epoll 模型及调整并发连接数")]),_:1})])])])])]),m,e("blockquote",null,[e("p",null,[n("官网地址："),e("a",b,[n("https://www.keepalived.org/download.html"),s(r)])])]),h])}const y=c(u,[["render",k],["__file","15.nginx高可用.html.vue"]]);export{y as default};
