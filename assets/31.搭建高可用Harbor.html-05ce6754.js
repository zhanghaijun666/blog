import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o,c as d,e as c,a as n,d as a,w as r,b as s,f as p}from"./app-efa5e96e.js";const v={},m=n("p",null,"在实际生产使用中，主从复制十分的不靠谱！！所以这里推荐使用多实例共享后端存储的高可用方案。",-1),b=n("p",null,"本次搭建以 NFS 作为共享存储存放 Harbor 相关 data，并分离 PostgreSQL 与 Redis 为多个 Harbor 共同连接使用，使用 Nginx 做负载均衡。",-1),u={class:"table-of-contents"},k=n("p",null,"这个方案在实际生产环境中部署需要考虑三个问题：",-1),h=n("ol",null,[n("li",null,"共享存储的选取，Harbor 的后端存储目前支持 AWS S3、Openstack Swift, Ceph 等，在下面的实验环境里，暂且直接使用 nfs。"),n("li",null,"Session 在不同的实例上共享，这个现在其实已经不是问题了，在最新的 harbor 中，默认 session 会存放在 redis 中，只需要将 redis 独立出来即可。可以通过 redis sentinel 或者 redis cluster 等方式来保证 redis 的可用性。在下面的实验环境里，暂且使用单台 redis。"),n("li",null,"Harbor 多实例数据库问题，这个也只需要将 harbor 中的数据库拆出来独立部署即可。让多实例共用一个外部数据库，数据库的高可用也可以通过数据库的高可用方案保证。")],-1),_=n("figure",null,[n("img",{src:"https://s3.ax1x.com/2021/03/01/6PgoEF.png",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1),g=n("h2",{id:"方案设计",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#方案设计","aria-hidden":"true"},"#"),s(" 方案设计")],-1),f=n("p",null,"这里准备三台 Linux 服务器，规划如下",-1),y=n("thead",null,[n("tr",null,[n("th",null,"IP 地址"),n("th",null,"hostname"),n("th",null,"用途")])],-1),x=n("td",null,"192.16.18.101",-1),w={href:"http://harbor.101.com",target:"_blank",rel:"noopener noreferrer"},q=n("td",null,"docker、docker-compose、harbor、NFS 客户端",-1),S=n("td",null,"192.16.18.102",-1),F={href:"http://harbor.102.com",target:"_blank",rel:"noopener noreferrer"},E=n("td",null,"docker、docker-compose、harbor、NFS 客户端",-1),N=n("td",null,"192.16.18.103",-1),A={href:"http://harbor.web.com",target:"_blank",rel:"noopener noreferrer"},P=n("td",null,"nginx、redis、NFS 服务端",-1),H=p(`<h2 id="docker-安装" tabindex="-1"><a class="header-anchor" href="#docker-安装" aria-hidden="true">#</a> docker 安装</h2><p>安装略过</p><h2 id="dockers-compose-安装" tabindex="-1"><a class="header-anchor" href="#dockers-compose-安装" aria-hidden="true">#</a> dockers-Compose 安装</h2><p>安装略过</p><h2 id="redis" tabindex="-1"><a class="header-anchor" href="#redis" aria-hidden="true">#</a> Redis</h2><p>安装略过</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public <span class="token parameter variable">--permanent</span> --add-port<span class="token operator">=</span><span class="token number">6379</span>/tcp <span class="token operator">&amp;&amp;</span> firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="nfs" tabindex="-1"><a class="header-anchor" href="#nfs" aria-hidden="true">#</a> NFS</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">##服务端</span>
<span class="token comment"># 1）安装必需的RPM包</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> nfs-utils rpcbind
<span class="token comment"># 2）创建NFS共享目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /data/harbor_data
<span class="token function">chown</span> nobody:nobody /data/harbor_data/
<span class="token comment"># 3）修改NFS服务配置文件</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;/data/harbor_data  *(rw,no_root_squash)&quot;</span>  <span class="token operator">&gt;&gt;</span> /etc/exports
<span class="token comment"># 4）启动NFS服务器</span>
systemctl <span class="token builtin class-name">enable</span> rpcbind <span class="token operator">&amp;&amp;</span> systemctl restart rpcbind
systemctl <span class="token builtin class-name">enable</span> nfs <span class="token operator">&amp;&amp;</span> systemctl restart nfs
<span class="token comment"># 5）开启防火墙</span>
firewall-cmd --add-service<span class="token operator">=</span>nfs <span class="token parameter variable">--permanent</span> <span class="token parameter variable">--zone</span><span class="token operator">=</span>public
firewall-cmd --add-service<span class="token operator">=</span>mountd <span class="token parameter variable">--permanent</span> <span class="token parameter variable">--zone</span><span class="token operator">=</span>public
firewall-cmd --add-service<span class="token operator">=</span>rpc-bind <span class="token parameter variable">--permanent</span> <span class="token parameter variable">--zone</span><span class="token operator">=</span>public
firewall-cmd <span class="token parameter variable">--reload</span>

<span class="token comment">##客户端</span>
<span class="token comment"># 1）安装nfs-utils</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> nfs-utils
<span class="token comment"># 2）在NFS客户端上查看NFS的连通性</span>
showmount <span class="token parameter variable">-e</span> <span class="token number">192.16</span>.18.103
<span class="token comment"># 3）挂载NFS共享存储</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /data/harbor_data <span class="token operator">&amp;&amp;</span> <span class="token function">mount</span> <span class="token parameter variable">-t</span> nfs <span class="token number">192.16</span>.18.103:/data/harbor_data /data/harbor_data
<span class="token comment"># 或者 写入fstab文件，永久挂载</span>
<span class="token comment"># mkdir -p /data/harbor_data &amp;&amp; echo &quot;192.16.18.103:/data/harbor_data  /data/harbor_data  nfs defaults 0 0&quot; &gt; /etc/fstab &amp;&amp; mount -a</span>
<span class="token comment"># 取消挂载</span>
<span class="token function">umount</span> /data/harbor_data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="postgresql" tabindex="-1"><a class="header-anchor" href="#postgresql" aria-hidden="true">#</a> PostgreSQL</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1）下载PostgreSQL官方YUM源配置文件包并安装</span>
<span class="token function">wget</span> https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> pgdg-redhat-repo-latest.noarch.rpm
<span class="token comment"># 2）安装PostgreSQL</span>
yum  <span class="token parameter variable">-y</span> <span class="token function">install</span> postgresql96-server postgresql96-contrib
<span class="token comment"># 3）初始化数据库</span>
/usr/pgsql-9.6/bin/postgresql96-setup initdb
<span class="token comment"># 4）启动数据库</span>
systemctl <span class="token builtin class-name">enable</span> postgresql-9.6 <span class="token operator">&amp;&amp;</span> systemctl restart postgresql-9.6
<span class="token comment"># 5）PostgreSQL数据库配置</span>
<span class="token comment"># 修改密码</span>
<span class="token function">su</span> - postgres <span class="token comment"># 进入，输入 \`psql\` 和 \`ALTER USER postgres WITH PASSWORD &#39;root123&#39;;\`</span>
<span class="token comment"># 开启远程访问</span>
<span class="token function">vi</span> /var/lib/pgsql/9.6/data/postgresql.conf <span class="token comment"># listen_addresses = &#39;localhost&#39; 改为 listen_addresses=&#39;*&#39;</span>
<span class="token comment"># 信任远程连接</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /var/lib/pgsql/9.6/data/pg_hba.conf <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
host    all  all  192.16.18.101/32 trust
host    all  all  192.16.18.102/32 trust
host    all  all  192.16.18.103/32 trust
EOF</span>
<span class="token comment"># 6）重启PostgreSQL服务</span>
systemctl restart postgresql-9.6
<span class="token comment"># 7）验证服务 及其 创建空间</span>
psql <span class="token parameter variable">-h</span> <span class="token number">192.16</span>.18.103 <span class="token parameter variable">-p</span> <span class="token number">5432</span> <span class="token parameter variable">-U</span> postgres
<span class="token assign-left variable">postgres</span><span class="token operator">=</span><span class="token comment"># create database registry;</span>
CREATE DATABASE
<span class="token assign-left variable">postgres</span><span class="token operator">=</span><span class="token comment"># create database notarysigner;</span>
CREATE DATABASE
<span class="token assign-left variable">postgres</span><span class="token operator">=</span><span class="token comment"># create database notaryserver;</span>
CREATE DATABASE
<span class="token comment"># 8）防火墙开启端口</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public <span class="token parameter variable">--permanent</span> --add-port<span class="token operator">=</span><span class="token number">5432</span>/tcp <span class="token operator">&amp;&amp;</span> firewall-cmd <span class="token parameter variable">--reload</span>
<span class="token comment"># 9）迁移数据库（历史数据，没有请忽略）</span>
<span class="token comment"># 进入harbor-db容器导出相关表及数据</span>
<span class="token function">docker</span> container <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> harbor-db /bin/bash
<span class="token comment"># 导出数据库</span>
pg_dump <span class="token parameter variable">-U</span> postgres registry <span class="token operator">&gt;</span> /tmp/registry.sql
pg_dump <span class="token parameter variable">-U</span> postgres notarysigner <span class="token operator">&gt;</span> /tmp/notarysigner.sql
pg_dump <span class="token parameter variable">-U</span> postgres notaryserver <span class="token operator">&gt;</span> /tmp/notaryserver.sql
<span class="token comment"># 将数据库复制到docker外部</span>
<span class="token function">docker</span> container <span class="token function">cp</span> harbor-db:/tmp/registry.sql /tmp
<span class="token function">docker</span> container <span class="token function">cp</span> harbor-db:/tmp/notarysigner.sql /tmp
<span class="token function">docker</span> container <span class="token function">cp</span> harbor-db:/tmp/notaryserver.sql /tmp
<span class="token comment"># 将数据导入至外部PostgreSQL数据库</span>
psql <span class="token parameter variable">-h</span> <span class="token number">192.16</span>.18.103 <span class="token parameter variable">-U</span> postgres registry <span class="token operator">&lt;</span> /tmp/registry.sql
psql <span class="token parameter variable">-h</span> <span class="token number">192.16</span>.18.103 <span class="token parameter variable">-U</span> postgres notarysigner  <span class="token operator">&lt;</span> /tmp/notarysigner.sql
psql <span class="token parameter variable">-h</span> <span class="token number">192.16</span>.18.103 <span class="token parameter variable">-U</span> postgres notaryserver <span class="token operator">&lt;</span> /tmp/notaryserver.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="harbor" tabindex="-1"><a class="header-anchor" href="#harbor" aria-hidden="true">#</a> Harbor</h2><p>安装略过</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 修改配置文件</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /usr/src/harbor/harbor.yml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
hostname: 192.16.18.101
https:
  port: 443
  certificate: /data/certs/server.crt
  private_key: /data/certs/server.key
harbor_admin_password: Harbor12345
database:
  password: root123
  max_idle_conns: 50
  max_open_conns: 1000
data_volume: /data/harbor_data
trivy:
  ignore_unfixed: false
  skip_update: false
  insecure: false
jobservice:
  max_job_workers: 10
notification:
  webhook_job_max_retry: 10
chart:
  absolute_url: disabled
log:
  level: info
  local:
    rotate_count: 50
    rotate_size: 200M
    location: /var/log/harbor
_version: 2.2.0
external_database:
  harbor:
    host: 192.16.18.103
    port: 5432
    db_name: registry
    username: postgres
    password: root123
    ssl_mode: disable
    max_idle_conns: 2
    max_open_conns: 0
  clair:
    host: 192.16.18.103
    port: 5432
    db_name: clair
    username: postgres
    password: root123
    ssl_mode: disable
  notary_signer:
    host: 192.16.18.103
    port: 5432
    db_name: notarysigner
    username: postgres
    password: root123
    ssl_mode: disable
  notary_server:
    host: 192.16.18.103
    port: 5432
    db_name: notaryserver
    username: postgres
    password: root123
    ssl_mode: disable
external_redis:
  host: 192.16.18.103
  port: 6379
  password:
  registry_db_index: 1
  jobservice_db_index: 2
  chartmuseum_db_index: 3
  clair_db_index: 4
proxy:
  http_proxy:
  https_proxy:
  no_proxy:
  components:
    - core
    - jobservice
    - trivy
EOF</span>
<span class="token comment"># 4）生成harbor运行的必要文件（环境）以及docker-compose.yml文件；执行后会通过网络获取Docker Image，建议提前修改好国内镜像站加速。</span>
./prepare
<span class="token comment"># 5）安装Harbor</span>
./install.sh
<span class="token comment"># 6）防火墙端口</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public <span class="token parameter variable">--permanent</span> --add-port<span class="token operator">=</span><span class="token number">80</span>/tcp
firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> Nginx</h2><p>安装略过</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 编写配置文件</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> nginx.conf <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
upstream harbor {
    ip_hash;
    server 192.16.18.101:80;
    server 192.16.18.102:80;
}
server {
    listen       80;
    server_name  harbor.web.com;
    rewrite ^(.*) https://<span class="token variable">$server_name</span><span class="token variable">$1</span> permanent;
}
server {
    listen  443 ssl;
    server_name harbor.schengle.com;

    ssl_certificate ***.crt;
    ssl_certificate_key ***.key;
    client_max_body_size 0;
    chunked_transfer_encoding on;

    location / {
        proxy_set_header X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span>;
        #proxy_set_header Host <span class="token variable">$host</span>;
        proxy_set_header X-Forwarded-Proto https;
        proxy_redirect off;
        proxy_ssl_verify off;
        proxy_ssl_session_reuse on;
        proxy_pass http://harbor;
  proxy_redirect default;
        proxy_http_version 1.1;
    }
    location /v2/ {
        proxy_pass http://harbor/v2/;
  proxy_redirect default;
        #proxy_set_header Host <span class="token variable">$host</span>;
        proxy_set_header X-Real-IP <span class="token variable">$remote_addr</span>;
        proxy_set_header X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span>;
        proxy_set_header X-Forwarded-Proto <span class="token variable">$scheme</span>;
        proxy_ssl_verify off;
        proxy_ssl_session_reuse on;
        proxy_buffering off;
        proxy_request_buffering off;
    }
}
EOF</span>
<span class="token comment"># 加载配置</span>
nginx <span class="token parameter variable">-s</span> reload
<span class="token comment"># 防火墙端口</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public <span class="token parameter variable">--permanent</span> --add-port<span class="token operator">=</span><span class="token number">80</span>/tcp
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public <span class="token parameter variable">--permanent</span> --add-port<span class="token operator">=</span><span class="token number">443</span>/tcp
firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17);function L(z,R){const e=l("router-link"),i=l("ExternalLinkIcon");return o(),d("div",null,[m,b,c(" more "),n("nav",u,[n("ul",null,[n("li",null,[a(e,{to:"#方案设计"},{default:r(()=>[s("方案设计")]),_:1})]),n("li",null,[a(e,{to:"#docker-安装"},{default:r(()=>[s("docker 安装")]),_:1})]),n("li",null,[a(e,{to:"#dockers-compose-安装"},{default:r(()=>[s("dockers-Compose 安装")]),_:1})]),n("li",null,[a(e,{to:"#redis"},{default:r(()=>[s("Redis")]),_:1})]),n("li",null,[a(e,{to:"#nfs"},{default:r(()=>[s("NFS")]),_:1})]),n("li",null,[a(e,{to:"#postgresql"},{default:r(()=>[s("PostgreSQL")]),_:1})]),n("li",null,[a(e,{to:"#harbor"},{default:r(()=>[s("Harbor")]),_:1})]),n("li",null,[a(e,{to:"#nginx"},{default:r(()=>[s("Nginx")]),_:1})])])]),k,h,_,g,f,n("table",null,[y,n("tbody",null,[n("tr",null,[x,n("td",null,[n("a",w,[s("harbor.101.com"),a(i)])]),q]),n("tr",null,[S,n("td",null,[n("a",F,[s("harbor.102.com"),a(i)])]),E]),n("tr",null,[N,n("td",null,[n("a",A,[s("harbor.web.com"),a(i)])]),P])])]),H])}const U=t(v,[["render",L],["__file","31.搭建高可用Harbor.html.vue"]]);export{U as default};
