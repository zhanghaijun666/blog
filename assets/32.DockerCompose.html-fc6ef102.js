import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as p,c as u,e as r,a as n,d as a,w as t,b as s,f as l}from"./app-efa5e96e.js";const d={},m={class:"table-of-contents"},v=n("h2",{id:"安装wordpress",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#安装wordpress","aria-hidden":"true"},"#"),s(" 安装wordpress")],-1),k={href:"https://cn.wordpress.org/",target:"_blank",rel:"noopener noreferrer"},b=n("p",null,"WordPress是一款能让您建立出色网站、博客或应用的开源软件。",-1),h=l(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> docker-compose.wordpress.yml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
version: &#39;3.3&#39;
services:
   db:
     image: mysql:5.7
     volumes:
       - db_data:/var/lib/mysql
     restart: always
     environment:
       MYSQL_ROOT_PASSWORD: somewordpress
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD: wordpress
   wordpress:
     depends_on:
       - db
     image: wordpress:latest
     ports:
       - &quot;8000:80&quot;
     restart: always
     environment:
       WORDPRESS_DB_HOST: db:3306
       WORDPRESS_DB_USER: wordpress
       WORDPRESS_DB_PASSWORD: wordpress
       WORDPRESS_DB_NAME: wordpress
volumes:
    db_data: {}
EOF</span>

<span class="token comment"># 后台运行</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.wordpress.yml up <span class="token parameter variable">-d</span>
<span class="token comment"># 停止并删除服务</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.wordpress.yml down 
<span class="token comment"># 访问 http://192.16.18.151:8000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="immich-照片服务器" tabindex="-1"><a class="header-anchor" href="#immich-照片服务器" aria-hidden="true">#</a> Immich（照片服务器）</h2>`,2),_={href:"https://github.com/immich-app/immich",target:"_blank",rel:"noopener noreferrer"},y={href:"https://immich.app/docs/install/docker-compose",target:"_blank",rel:"noopener noreferrer"},g=n("p",null,"Immich 是一个自托管的照片和视频备份解决方案",-1),A=l(`<h3 id="特性" tabindex="-1"><a class="header-anchor" href="#特性" aria-hidden="true">#</a> 特性</h3><ul><li>上传和查看视频和照片</li><li>打开应用程序时自动备份</li><li>将照片和视频下载到本地设备</li><li>多用户支持</li><li>共享相册</li><li>支持 RAW（HEIC、HEIF、DNG、Apple ProRaw）</li><li>元数据视图（EXIF、地图）</li><li>按元数据、对象和图像标签搜索</li><li>管理功能（用户管理）</li><li>后台备份</li></ul><h3 id="技术栈" tabindex="-1"><a class="header-anchor" href="#技术栈" aria-hidden="true">#</a> 技术栈</h3><ul><li>NestJs - 应用程序的后端</li><li>SvelteKit - 应用程序的 Web 前端</li><li>PostgreSQL - 应用程序的主数据库</li><li>Redis - 用于在 docker 实例和后台任务消息队列之间共享 websocket 实例</li><li>Nginx - 负载均衡和优化的文件上传</li><li>TensorFlow - 对象检测 (COCO SSD) 和图像分类 (ImageNet)</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 获取 yml 文件</span>
<span class="token function">wget</span> https://github.com/immich-app/immich/releases/latest/download/docker-compose.yml
<span class="token comment"># 获取 .env 文件</span>
<span class="token function">wget</span> <span class="token parameter variable">-O</span> .env https://github.com/immich-app/immich/releases/latest/download/example.env
<span class="token comment"># 请根据官方文档修改配置文件，也可直接部署</span>
<span class="token comment">## https://immich.app/docs/install/docker-compose</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.yml up <span class="token parameter variable">-d</span>

<span class="token comment"># 启动成功后，访问本机的 2283 端口即可。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">## 修改了以下配置：</span>
<span class="token comment">## 1、将 redis 模块取消了，替换为自用的 redis</span>
<span class="token comment">## 2、修改了访问端口</span>
<span class="token comment">## 3、一些路径的修改</span>
<span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3.8&quot;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">immich-server</span><span class="token punctuation">:</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> immich_server
    <span class="token key atrule">image</span><span class="token punctuation">:</span> altran1502/immich<span class="token punctuation">-</span>server<span class="token punctuation">:</span>release
    <span class="token key atrule">entrypoint</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;./start-server.sh&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> $<span class="token punctuation">{</span>UPLOAD_LOCATION<span class="token punctuation">}</span><span class="token punctuation">:</span>/usr/src/app/upload
    <span class="token key atrule">env_file</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /data/docker<span class="token punctuation">-</span>data/immich/.env
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> NODE_ENV=production
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> redis
      <span class="token punctuation">-</span> database
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always

  <span class="token key atrule">immich-microservices</span><span class="token punctuation">:</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> immich_microservices
    <span class="token key atrule">image</span><span class="token punctuation">:</span> altran1502/immich<span class="token punctuation">-</span>server<span class="token punctuation">:</span>release
    <span class="token key atrule">entrypoint</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;./start-microservices.sh&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> $<span class="token punctuation">{</span>UPLOAD_LOCATION<span class="token punctuation">}</span><span class="token punctuation">:</span>/usr/src/app/upload
    <span class="token key atrule">env_file</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /data/docker<span class="token punctuation">-</span>data/immich/.env
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> NODE_ENV=production
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> redis
      <span class="token punctuation">-</span> database
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always

  <span class="token key atrule">immich-machine-learning</span><span class="token punctuation">:</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> immich_machine_learning
    <span class="token key atrule">image</span><span class="token punctuation">:</span> altran1502/immich<span class="token punctuation">-</span>machine<span class="token punctuation">-</span>learning<span class="token punctuation">:</span>release
    <span class="token key atrule">entrypoint</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;./entrypoint.sh&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> $<span class="token punctuation">{</span>UPLOAD_LOCATION<span class="token punctuation">}</span><span class="token punctuation">:</span>/usr/src/app/upload
    <span class="token key atrule">env_file</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /data/docker<span class="token punctuation">-</span>data/immich/.env
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> NODE_ENV=production
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> database
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always

  <span class="token key atrule">immich-web</span><span class="token punctuation">:</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> immich_web
    <span class="token key atrule">image</span><span class="token punctuation">:</span> altran1502/immich<span class="token punctuation">-</span>web<span class="token punctuation">:</span>release
    <span class="token key atrule">entrypoint</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;./entrypoint.sh&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">env_file</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /data/docker<span class="token punctuation">-</span>data/immich/.env
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always

    <span class="token comment">#redis:</span>
    <span class="token comment">#container_name: immich_redis</span>
    <span class="token comment">#image: redis:6.2</span>
    <span class="token comment">#restart: always</span>

  <span class="token key atrule">database</span><span class="token punctuation">:</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> immich_postgres
    <span class="token key atrule">image</span><span class="token punctuation">:</span> postgres<span class="token punctuation">:</span><span class="token number">14</span>
    <span class="token key atrule">env_file</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /data/docker<span class="token punctuation">-</span>data/immich/.env
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">POSTGRES_PASSWORD</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>DB_PASSWORD<span class="token punctuation">}</span>
      <span class="token key atrule">POSTGRES_USER</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>DB_USERNAME<span class="token punctuation">}</span>
      <span class="token key atrule">POSTGRES_DB</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>DB_DATABASE_NAME<span class="token punctuation">}</span>
      <span class="token key atrule">PG_DATA</span><span class="token punctuation">:</span> /var/lib/postgresql/data
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> pgdata<span class="token punctuation">:</span>/var/lib/postgresql/data
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always

  <span class="token key atrule">immich-proxy</span><span class="token punctuation">:</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> immich_proxy
    <span class="token key atrule">image</span><span class="token punctuation">:</span> altran1502/immich<span class="token punctuation">-</span>proxy<span class="token punctuation">:</span>release
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token comment"># Make sure these values get passed through from the env file</span>
      <span class="token punctuation">-</span> IMMICH_SERVER_URL
      <span class="token punctuation">-</span> IMMICH_WEB_URL
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 62283<span class="token punctuation">:</span><span class="token number">8080</span>
    <span class="token key atrule">logging</span><span class="token punctuation">:</span>
      <span class="token key atrule">driver</span><span class="token punctuation">:</span> none
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> immich<span class="token punctuation">-</span>server
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always

<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">pgdata</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="matomo" tabindex="-1"><a class="header-anchor" href="#matomo" aria-hidden="true">#</a> Matomo</h2><blockquote><p>多合一网络分析平台</p><p>Matomo（以前称为 Piwik）是领先的开源分析平台，可以让您轻松地从访问者那里获得您想要的信息。例如查看您的网站访问者来自何处、正在查看哪些页面、单击了哪些链接以及其他各种有用的信息。</p></blockquote>`,8),S={href:"https://github.com/matomo-org/matomo",target:"_blank",rel:"noopener noreferrer"},f={href:"https://matomo.org/",target:"_blank",rel:"noopener noreferrer"},O={href:"https://github.com/matomo-org/docker",target:"_blank",rel:"noopener noreferrer"},w=l(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> docker-compose.yml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
version: &#39;3&#39;

services:
  mariadb:
    image: mariadb:10.6
    container_name: matomo_db
    restart: unless-stopped
    volumes:
      - ./data:/var/lib/mysql
    environment:
      - MARIADB_ROOT_PASSWORD=123456
      - MARIADB_DATABASE=matomo
      - MARIADB_USER=matomo
      - MARIADB_PASSWORD=123456
      
  matomo:
    image: matomo:4.13
    container_name: matomo_web
    restart: unless-stopped
    ports:
      - 7880:80
    volumes:
      - ./web:/var/www/html
    environment:
      - MATOMO_DATABASE_HOST=mariadb
      - MATOMO_DATABASE_ADAPTER=mysql
      - MATOMO_DATABASE_TABLES_PREFIX=ma_
      - MATOMO_DATABASE_USERNAME=matomo
      - MATOMO_DATABASE_PASSWORD=123456
      - MATOMO_DATABASE_DBNAME=matomo
    depends_on:
      - mariadb
EOF</span>

<span class="token comment"># 新建文件夹 matomo 和 子目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /volume1/docker/matomo/<span class="token punctuation">{</span>data,web<span class="token punctuation">}</span>
<span class="token comment"># 进入 matomo 目录</span>
<span class="token builtin class-name">cd</span> /volume1/docker/matomo
<span class="token comment"># 修改目录权限</span>
<span class="token function">chmod</span> <span class="token number">777</span> web
<span class="token comment"># 一键启动</span>
<span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function E(D,R){const i=c("router-link"),e=c("ExternalLinkIcon");return p(),u("div",null,[r(" more "),n("nav",m,[n("ul",null,[n("li",null,[a(i,{to:"#安装wordpress"},{default:t(()=>[s("安装wordpress")]),_:1})]),n("li",null,[a(i,{to:"#immich-照片服务器"},{default:t(()=>[s("Immich（照片服务器）")]),_:1}),n("ul",null,[n("li",null,[a(i,{to:"#特性"},{default:t(()=>[s("特性")]),_:1})]),n("li",null,[a(i,{to:"#技术栈"},{default:t(()=>[s("技术栈")]),_:1})])])]),n("li",null,[a(i,{to:"#matomo"},{default:t(()=>[s("Matomo")]),_:1})])])]),v,n("blockquote",null,[n("p",null,[s("官方地址："),n("a",k,[s("https://cn.wordpress.org/"),a(e)])]),b]),h,n("blockquote",null,[n("p",null,[s("项目地址："),n("a",_,[s("https://github.com/immich-app/immich"),a(e)])]),n("p",null,[n("a",y,[s("https://immich.app/docs/install/docker-compose"),a(e)])]),g]),A,n("ul",null,[n("li",null,[s("地址："),n("a",S,[s("https://github.com/matomo-org/matomo"),a(e)])]),n("li",null,[s("地址："),n("a",f,[s("https://matomo.org/"),a(e)])]),n("li",null,[s("地址："),n("a",O,[s("https://github.com/matomo-org/docker"),a(e)])])]),w])}const T=o(d,[["render",E],["__file","32.DockerCompose.html.vue"]]);export{T as default};
