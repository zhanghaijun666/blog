import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as d,e as p,a as n,d as a,w as t,b as s,f as l}from"./app-efa5e96e.js";const u={},v={class:"table-of-contents"},m=n("h2",{id:"window下安装docker",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#window下安装docker","aria-hidden":"true"},"#"),s(" window下安装docker")],-1),b={href:"https://docs.docker.com/toolbox/toolbox_install_windows/#step-2-install-docker-toolbox",target:"_blank",rel:"noopener noreferrer"},k={href:"https://mirrors.aliyun.com/docker-toolbox/windows/docker-toolbox/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://mirrors.aliyun.com/docker-toolbox/windows/docker-toolbox/",target:"_blank",rel:"noopener noreferrer"},g=l(`<ol><li><p>下载 DockerToolbox-18.06.0-ce.exe</p><p>双击安装DockerToolbox-18.06.0-ce.exe，选好安装目录后，注意一点，windows已安装GIT，请不要勾上，然后一路next到完成。</p></li><li><p>复制boot2docker.iso镜像文件</p><p>位于安装目录下（如C:\\Program Files\\Docker Toolbox），拷至C:\\Users\\Administrator.docker\\machine\\cache目录下<br> 如果没有.docker，尝试启动Quickstart Terminal，再关闭。</p></li><li><p>启动Quickstart Terminal ，等待完成初始化。成功后界面如下：</p></li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>                        ##         .
                  ## ## ##        ==
               ## ## ## ## ##    ===
           /&quot;&quot;&quot;&quot;&quot;&quot;&quot;&quot;&quot;&quot;&quot;&quot;&quot;&quot;&quot;&quot;&quot;\\___/ ===
      ~~~ {~~ ~~~~ ~~~ ~~~~ ~~~ ~ /  ===- ~~~
           \\______ o           __/
             \\    \\         __/
              \\____\\_______/

docker is configured to use the default machine with IP 192.168.99.100
For help getting started, check out the docs at https://docs.docker.com

Start interactive shell
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),f={start:"4"},_={href:"https://docs.docker.com/engine/reference/builder/",target:"_blank",rel:"noopener noreferrer"},x=l(`<blockquote><p>如果想要ssh链接， ssh <a href="mailto:docker@192.168.99.100">docker@192.168.99.100</a> 密码：tcuser</p></blockquote><ol start="5"><li>以下为可能遇到的问题</li></ol><ul><li>启动quickstart，报错“正在查找bash.exe”</li></ul><blockquote><p>原因是之前装过了git程序，当前指向的bash.exe不存在，右键-》属性可见：将git/bash.exe改成实际的路径，即可</p></blockquote><ul><li>界面长期处于下载 boot2docker.iso的状态</li></ul><blockquote><p>将boot2docker.iso文件，位于安装目录下（如C:\\Program Files\\Docker Toolbox），拷至C:\\Users\\Administrator.docker\\machine\\cache目录下，然后在网络断开的情况下重新启动，便可初始化成功。</p></blockquote><ol start="6"><li>docker命令</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-aq</span>                     <span class="token comment">#列出所有容器ID</span>
<span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span>                      <span class="token comment">#查看所有运行或者不运行容器</span>
<span class="token function">docker</span> stop <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span> <span class="token parameter variable">-q</span><span class="token variable">)</span></span>    <span class="token comment">#停止所有的container（容器），这样才能够删除其中的images：</span>
<span class="token function">docker</span> stop <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-aq</span><span class="token variable">)</span></span>
<span class="token function">docker</span> <span class="token function">rm</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span> <span class="token parameter variable">-q</span><span class="token variable">)</span></span>      <span class="token comment">#删除所有container（容器）的话再加一个指令</span>
<span class="token function">docker</span> <span class="token function">rm</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-aq</span><span class="token variable">)</span></span>
<span class="token function">docker</span> images                     <span class="token comment">#查看当前有些什么images</span>
<span class="token function">docker</span> rmi <span class="token operator">&lt;</span>image id<span class="token operator">&gt;</span>             <span class="token comment">#删除images（镜像），通过image的id来指定删除谁</span>
<span class="token function">docker</span> rmi <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> images <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;^&lt;none&gt;&quot;</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&quot;{print <span class="token variable">$3</span>}&quot;</span><span class="token variable">)</span></span>   <span class="token comment">#删除untagged images，也就是那些id为的image的话可以用</span>
<span class="token function">docker</span> rmi <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> images <span class="token parameter variable">-q</span><span class="token variable">)</span></span>    <span class="token comment">#删除全部image（镜像）</span>
<span class="token function">docker</span> rmi <span class="token parameter variable">-f</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> images <span class="token parameter variable">-q</span><span class="token variable">)</span></span> <span class="token comment">#强制删除全部image</span>

<span class="token function">docker</span> <span class="token function">cp</span> tomcat：/webapps/js/text.js /home/admin  <span class="token comment">#从容器到宿主机复制</span>
<span class="token function">docker</span> <span class="token function">cp</span> 容器名:  容器路径             宿主机路径  

<span class="token function">docker</span> <span class="token function">cp</span> /home/admin/text.js tomcat：/webapps/js  <span class="token comment">#从宿主机到容器复制</span>
<span class="token function">docker</span> <span class="token function">cp</span> 宿主路径中文件        容器名  容器路径  

<span class="token function">docker</span> container prune              <span class="token comment">#删除所有停止的容器</span>
<span class="token function">docker</span> image prune <span class="token parameter variable">--force</span> <span class="token parameter variable">--all</span>    <span class="token comment">#删除所有不使用的镜像</span>
<span class="token function">docker</span> image prune <span class="token parameter variable">-f</span> <span class="token parameter variable">-a</span>

<span class="token function">docker</span> stop Name或者ID              <span class="token comment">#停止一个容器</span>
<span class="token function">docker</span> start Name或者ID             <span class="token comment">#启动一个容器</span>
<span class="token function">docker</span> <span class="token function">kill</span> Name或者ID              <span class="token comment">#杀死一个容器</span>
<span class="token function">docker</span> restart name或者ID           <span class="token comment">#重启一个容器</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始" aria-hidden="true">#</a> 快速开始</h2><p>安装完 Docker 之后，我们先打个实际项目的镜像，边学边用。</p><table><thead><tr><th>命令</th><th>描述</th></tr></thead><tbody><tr><td>FROM</td><td>设置基础镜像，基于那个镜像来实现</td></tr><tr><td>MAINTAINER</td><td>设置镜像作者</td></tr><tr><td>ENV</td><td>声明环境变量</td></tr><tr><td>RUN</td><td>执行命令</td></tr><tr><td>ADD</td><td>添加宿主机文件到容器里，有需要解压的文件会自动解压</td></tr><tr><td>COPY</td><td>添加宿主机文件到容器中，不会自动解压</td></tr><tr><td>WORKDIR</td><td>设置RUN CMD ENTRYPOINT ADD COPY指令的工作目录</td></tr><tr><td>EXPOSE</td><td>设置镜像暴露端口，记录容器启动时监听哪些端口</td></tr><tr><td>CMD</td><td>容器启动后执行的命令，如果执行在docker run后面会被启动命令覆盖掉</td></tr><tr><td>ENTRYPOINT</td><td>与CMD功能相同，但docker run不会覆盖，如果需要覆盖可添加参数-entrypoint来覆盖</td></tr><tr><td>VOLUME</td><td>数据卷，将宿主机的目录映射到容器中（设置容器的挂载点）</td></tr><tr><td>USER</td><td>设置RUN CMD ENTRYPOINT的用户名或UID</td></tr><tr><td>LABEL</td><td>设置镜像的标签</td></tr></tbody></table>`,11),D=l(`<p>新建项目</p><p>为了快捷，我们直接使用 Vue 脚手架构建项目：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>vue create docker-demo
<span class="token builtin class-name">cd</span> docker-demo <span class="token operator">&amp;&amp;</span> <span class="token function">npm</span> run serve
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,3),N={href:"http://localhost:8080/%E3%80%82",target:"_blank",rel:"noopener noreferrer"},q=n("p",null,"需要注意：前端项目一般分两类，一类直接 Nginx 静态部署，一类需要启动 Node 服务。 我们选用Nginx 静态部署。",-1),w=l(`<li><p>新建 dockerfile</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> docker-demo <span class="token operator">&amp;&amp;</span> <span class="token function">touch</span> Dockerfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>目录结构：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>-rw-r--r-- <span class="token number">1</span> zhang <span class="token number">197609</span>     <span class="token number">73</span>  <span class="token number">8</span>月 <span class="token number">15</span> <span class="token number">13</span>:20 babel.config.js
-rw-r--r-- <span class="token number">1</span> zhang <span class="token number">197609</span>      <span class="token number">0</span>  <span class="token number">8</span>月 <span class="token number">15</span> <span class="token number">13</span>:46 Dockerfile
drwxr-xr-x <span class="token number">1</span> zhang <span class="token number">197609</span>      <span class="token number">0</span>  <span class="token number">8</span>月 <span class="token number">15</span> <span class="token number">13</span>:20 node_modules/
-rw-r--r-- <span class="token number">1</span> zhang <span class="token number">197609</span>    <span class="token number">861</span>  <span class="token number">8</span>月 <span class="token number">15</span> <span class="token number">13</span>:20 package.json
-rw-r--r-- <span class="token number">1</span> zhang <span class="token number">197609</span> <span class="token number">489405</span>  <span class="token number">8</span>月 <span class="token number">15</span> <span class="token number">13</span>:20 package-lock.json
drwxr-xr-x <span class="token number">1</span> zhang <span class="token number">197609</span>      <span class="token number">0</span>  <span class="token number">8</span>月 <span class="token number">15</span> <span class="token number">13</span>:20 public/
-rw-r--r-- <span class="token number">1</span> zhang <span class="token number">197609</span>    <span class="token number">323</span>  <span class="token number">8</span>月 <span class="token number">15</span> <span class="token number">13</span>:20 README.md
drwxr-xr-x <span class="token number">1</span> zhang <span class="token number">197609</span>      <span class="token number">0</span>  <span class="token number">8</span>月 <span class="token number">15</span> <span class="token number">13</span>:20 src/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>准备Nginx 镜像</p></li>`,2),R=l(`<p>拉取镜像</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果你出现这样的异常，请确认 Docker 实例是否正常运行。</p><blockquote><p>Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?<br> 镜像准备 OK，我们在根目录创建 Nginx 配置文件：</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">touch</span> default.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen       <span class="token number">80</span><span class="token punctuation">;</span>
    server_name  localhost<span class="token punctuation">;</span>

    <span class="token comment">#charset koi8-r;</span>
    access_log  /var/log/nginx/host.access.log  main<span class="token punctuation">;</span>
    error_log  /var/log/nginx/error.log  error<span class="token punctuation">;</span>

    location / <span class="token punctuation">{</span>
        root   /usr/share/nginx/html<span class="token punctuation">;</span>
        index  index.html index.htm<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    error_page   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html<span class="token punctuation">;</span>
    location <span class="token operator">=</span> /50x.html <span class="token punctuation">{</span>
        root   /usr/share/nginx/html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),E={start:"4"},O=l(`<li><p>配置镜像</p><p>打开 Dockerfile ，写入如下内容：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>FROM nginx
COPY dist/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们逐行解释一下代码：</p><ul><li>FROM nginx 指定该镜像是基于 nginx:latest 镜像而构建的。</li><li>COPY dist/ /usr/share/nginx/html/ 命令的意思是将项目根目录下 dist 文件夹中的所有文件复制到镜像中 /usr/share/nginx/html/ 目录下。</li><li>COPY default.conf /etc/nginx/conf.d/default.conf 将 default.conf 复制到 etc/nginx/conf.d/default.conf，用本地的 default.conf 配置来替换 Nginx 镜像里的默认配置。</li></ul></li><li><p>构建镜像</p><p>Docker 通过 build 命令来构建镜像：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> run build
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> vue-demo <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>按照惯例，我们解释一下上述代码：</p><ul><li>-t 参数给镜像命名 jartto-docker-demo。</li><li>. 是基于当前目录的 Dockerfile 来构建镜像。</li></ul><p>镜像制作成功！我们来查看一下容器：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> image <span class="token function">ls</span> <span class="token operator">|</span> <span class="token function">grep</span> vue-demo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>运行镜像</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">3000</span>:80 <span class="token parameter variable">--name</span> docker-vue vue-demo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里解释一下参数：</p><ul><li>-d 设置容器在后台运行。</li><li>-p 表示端口映射，把本机的 3000 端口映射到 container 的 80 端口（这样外网就能通过本机的 3000 端口访问了)。</li><li>--name 设置容器名 docker-vue。</li><li>vue-demo 是我们上面构建的镜像名字。</li></ul></li>`,3),A=l(`<p>访问镜像</p><p>因为我们映射了本机 3000 端口，所以执行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-v</span> <span class="token parameter variable">-i</span> localhost:3000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者打开浏览器，访问：localhost:3000。</p><ul><li>Windows10下无法对docker容器进行端口访问</li></ul><blockquote><p>原因：docker是运行在Linux上的，在Windows中运行docker，实际上还是在Windows下先安装了一个Linux环境，然后在这个系统中运行的docker。也就是说，服务中使用的localhost指的是这个Linux环境的地址，而不是我们的宿主环境Windows10。</p></blockquote><p>在docker命令行窗口执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>docker-machine <span class="token function">ip</span> default
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Linux的ip地址，一般情况下这个地址是192.168.99.100</p>`,9),I={href:"http://ip:port",target:"_blank",rel:"noopener noreferrer"},M={href:"http://192.168.99.100:3000/",target:"_blank",rel:"noopener noreferrer"},T=n("p",null,"发布镜像",-1),C=n("p",null,"如果你想为社区贡献力量，那么需要将镜像发布，方便其他开发者使用。",-1),P={href:"https://hub.docker.com/",target:"_blank",rel:"noopener noreferrer"},U=l(`<h2 id="参数使用" tabindex="-1"><a class="header-anchor" href="#参数使用" aria-hidden="true">#</a> 参数使用</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>FROM：
- 指定基础镜像，所有构建的镜像都必须有一个基础镜像，且 FROM 命令必须是 Dockerfile 的第一个命令
- FROM &lt;image&gt; [AS &lt;name&gt;] 指定从一个镜像构建起一个新的镜像名字
- FROM &lt;image&gt;[:&lt;tag&gt;] [AS &lt;name&gt;] 指定镜像的版本 Tag
- 示例：FROM mysql:5.0 AS database

MAINTAINER：
- 镜像维护人的信息
- MAINTAINER &lt;name&gt;
- 示例：MAINTAINER Jartto Jartto@qq.com

RUN：
- 构建镜像时要执行的命令
- RUN &lt;command&gt;
- 示例：RUN [executable, param1, param2]

ADD：
- 将本地的文件添加复制到容器中去，压缩包会解压，可以访问网络上的文件，会自动下载
- ADD &lt;src&gt; &lt;dest&gt;
- 示例：ADD *.js /app 添加 js 文件到容器中的 app 目录下

COPY：
- 功能和 ADD 一样，只是复制，不会解压或者下载文件

CMD：
- 启动容器后执行的命令，和 RUN 不一样，RUN 是在构建镜像是要运行的命令
- 当使用 docker run 运行容器的时候，这个可以在命令行被覆盖
- 示例：CMD [executable, param1, param2]

ENTRYPOINT：
- 也是执行命令，和 CMD 一样，只是这个命令不会被命令行覆盖
- ENTRYPOINT [executable, param1, param2]
- 示例：ENTRYPOINT [donnet, myapp.dll]

LABEL：为镜像添加元数据，key-value 形式
- LABEL &lt;key&gt;=&lt;value&gt; &lt;key&gt;=&lt;value&gt; ...
- 示例：LABEL version=1.0 description=这是一个web应用

ENV：设置环境变量，有些容器运行时会需要某些环境变量
- ENV &lt;key&gt; &lt;value&gt; 一次设置一个环境变量
- ENV &lt;key&gt;=&lt;value&gt; &lt;key&gt;=&lt;value&gt; &lt;key&gt;=&lt;value&gt; 设置多个环境变量
- 示例：ENV JAVA_HOME /usr/java1.8/

EXPOSE：暴露对外的端口（容器内部程序的端口，虽然会和宿主机的一样，但是其实是两个端口）
- EXPOSE &lt;port&gt;
- 示例：EXPOSE 80
- 容器运行时，需要用 -p 映射外部端口才能访问到容器内的端口

VOLUME：指定数据持久化的目录，官方语言叫做挂载
- VOLUME /var/log 指定容器中需要被挂载的目录，会把这个目录映射到宿主机的一个随机目录上，实现数据的持久化和同步
- VOLUME [/var/log,/var/test.....] 指定容器中多个需要被挂载的目录，会把这些目录映射到宿主机的多个随机目录上，实现数据的持久化和同步
- VOLUME /var/data var/log 指定容器中的 var/log 目录挂载到宿主机上的 /var/data 目录，这种形式可以手动指定宿主机上的目录

WORKDIR：设置工作目录，设置之后 ，RUN、CMD、COPY、ADD 的工作目录都会同步变更
- WORKDIR &lt;path&gt;
- 示例：WORKDIR /app/test

USER：指定运行命令时所使用的用户，为了安全和权限起见，根据要执行的命令选择不同用户
- USER &lt;user&gt;:[&lt;group&gt;]
- 示例：USER test

ARG：设置构建镜像是要传递的参数
- ARG &lt;name&gt;[=&lt;value&gt;]
- ARG name=sss

更多操作，请移步[官方使用文档](https://docs.docker.com/)：[https://docs.docker.com/](https://docs.docker.com/)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>以下是在应用 Docker 过程中整理的最佳实践，请尽量遵循如下准则：</p><ul><li>Require 明确：需要什么镜像。</li><li>步骤精简：变化较少的 Step 优先。</li><li>版本明确：镜像命名明确。</li><li>说明文档：整个镜像打包步骤可以重现。</li></ul><blockquote><p>容器化技术必将是云时代不可或缺的技能之一，而 Docker 只是沧海一粟。随之而来的还有集群容器管理 Kubernetes、Service Mesh 、Istio 等技术。</p></blockquote><p><strong>打开 Docker 的大门，不断抽丝剥茧，逐层深入，你将感受到容器化的无穷魅力。</strong></p>`,7);function L(V,y){const i=o("router-link"),e=o("ExternalLinkIcon");return c(),d("div",null,[p(" more "),n("nav",v,[n("ul",null,[n("li",null,[a(i,{to:"#window下安装docker"},{default:t(()=>[s("window下安装docker")]),_:1})]),n("li",null,[a(i,{to:"#快速开始"},{default:t(()=>[s("快速开始")]),_:1})]),n("li",null,[a(i,{to:"#参数使用"},{default:t(()=>[s("参数使用")]),_:1})]),n("li",null,[a(i,{to:"#总结"},{default:t(()=>[s("总结")]),_:1})])])]),m,n("p",null,[n("a",b,[s("官方toolbox_install_windows"),a(e)]),s("，"),n("a",k,[s("下载docker toolbox"),a(e)]),s("，链接地址："),n("a",h,[s("https://mirrors.aliyun.com/docker-toolbox/windows/docker-toolbox/"),a(e)])]),g,n("ol",f,[n("li",null,[s("大功告成 "),n("a",_,[s("docker docs"),a(e)])])]),x,n("ol",null,[n("li",null,[D,n("p",null,[s("访问地址："),n("a",N,[s("http://localhost:8080/。"),a(e)])]),q]),w]),R,n("ol",E,[O,n("li",null,[A,n("p",null,[s("然后在Windows的浏览器中，输入 "),n("a",I,[s("http://ip:port"),a(e)]),s(" 即可启用："),n("a",M,[s("http://192.168.99.100:3000/"),a(e)])])]),n("li",null,[T,C,n("p",null,[n("a",P,[s("dockerhub"),a(e)])])])]),U])}const j=r(u,[["render",L],["__file","16.Docker安装-Windows.html.vue"]]);export{j as default};
