import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as a,f as e}from"./app-efa5e96e.js";const i={},t=e(`<h2 id="说明" tabindex="-1"><a class="header-anchor" href="#说明" aria-hidden="true">#</a> 说明</h2><p>宿主机需要安装Docker和Docker-compose<br> 创建3个容器：<br> 主机名分别为host1、host2和ansible2.11<br> host1和host2安装python3.7、openssh server<br> ansible安装openssh server、openssh client、ansible</p><h2 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤" aria-hidden="true">#</a> 步骤</h2><p>按如下目录结构创建文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">.</span>
├── alpine
│   └── Dockerfile
├── ansible
│   └── Dockerfile
└── docker-compose.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="alpine-dockerfile内容为" tabindex="-1"><a class="header-anchor" href="#alpine-dockerfile内容为" aria-hidden="true">#</a> alpine/Dockerfile内容为</h3><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> alpine:3.15</span>
  RUN echo http://mirrors.aliyun.com/alpine/v3.15/main/ &gt; /etc/apk/repositories &amp;&amp; \\
    echo http://mirrors.aliyun.com/alpine/v3.15/community/ &gt;&gt; /etc/apk/repositories
  RUN apk update &amp;&amp; apk upgrade


<span class="token instruction"><span class="token keyword">RUN</span> apk add --no-cache openssh-server tzdata python3 &amp;&amp; <span class="token operator">\\</span>
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime &amp;&amp; <span class="token operator">\\</span>
    sed -i <span class="token string">&quot;s/#PermitRootLogin.*/PermitRootLogin yes/g&quot;</span> /etc/ssh/sshd_config &amp;&amp; <span class="token operator">\\</span>
    ssh-keygen -t rsa -P <span class="token string">&quot;&quot;</span> -f /etc/ssh/ssh_host_rsa_key &amp;&amp; <span class="token operator">\\</span>
    ssh-keygen -t ecdsa -P <span class="token string">&quot;&quot;</span> -f /etc/ssh/ssh_host_ecdsa_key &amp;&amp; <span class="token operator">\\</span>
    ssh-keygen -t ed25519 -P <span class="token string">&quot;&quot;</span> -f /etc/ssh/ssh_host_ed25519_key &amp;&amp; <span class="token operator">\\</span>
    echo <span class="token string">&quot;root:root&quot;</span> | chpasswd</span>

<span class="token instruction"><span class="token keyword">EXPOSE</span> 22</span>

<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;/usr/sbin/sshd&quot;</span>, <span class="token string">&quot;-D&quot;</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ansible-dockerfile内容为" tabindex="-1"><a class="header-anchor" href="#ansible-dockerfile内容为" aria-hidden="true">#</a> ansible/Dockerfile内容为</h3><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> alpine:3.10</span>
  RUN echo http://mirrors.aliyun.com/alpine/v3.15/main/ &gt; /etc/apk/repositories &amp;&amp; \\
      echo http://mirrors.aliyun.com/alpine/v3.15/community/ &gt;&gt; /etc/apk/repositories
  RUN apk update &amp;&amp; apk upgrade

 
<span class="token instruction"><span class="token keyword">RUN</span> apk add --no-cache openssh-server tzdata ansible openssh &amp;&amp; <span class="token operator">\\</span>
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime &amp;&amp; <span class="token operator">\\</span>
    sed -i <span class="token string">&quot;s/#PermitRootLogin.*/PermitRootLogin yes/g&quot;</span> /etc/ssh/sshd_config &amp;&amp; <span class="token operator">\\</span>
    ssh-keygen -t rsa -P <span class="token string">&quot;&quot;</span> -f /etc/ssh/ssh_host_rsa_key &amp;&amp; <span class="token operator">\\</span>
    ssh-keygen -t ecdsa -P <span class="token string">&quot;&quot;</span> -f /etc/ssh/ssh_host_ecdsa_key &amp;&amp; <span class="token operator">\\</span>
    ssh-keygen -t ed25519 -P <span class="token string">&quot;&quot;</span> -f /etc/ssh/ssh_host_ed25519_key</span>

<span class="token instruction"><span class="token keyword">RUN</span> mkdir -p /etc/ansible &amp;&amp; <span class="token operator">\\</span>
    echo -e <span class="token string">&quot;[dev]\\nhost1\\nhost2&quot;</span> &gt;/etc/ansible/hosts &amp;&amp; <span class="token operator">\\</span>
    ssh-keygen -t rsa -P <span class="token string">&quot;&quot;</span> -f ~/.ssh/id_rsa</span>

<span class="token instruction"><span class="token keyword">EXPOSE</span> 22</span>

<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;/usr/sbin/sshd&quot;</span>, <span class="token string">&quot;-D&quot;</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-compose-yml内容为" tabindex="-1"><a class="header-anchor" href="#docker-compose-yml内容为" aria-hidden="true">#</a> docker-compose.yml内容为</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;2.4&quot;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">host1</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> alpine
  <span class="token key atrule">host2</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> alpine
  <span class="token key atrule">ansible</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> ansible
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行下面的命令构建镜像并启动服务：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>进入ansible容器</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span> ansible <span class="token function">sh</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行下面命令，复制公钥到远程机器：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ssh-copy-id host1
ssh-copy-id host2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>会提示输入密码，密码是<code>root</code></p><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2><p>我们使用ping命令测试一下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ansible dev <span class="token parameter variable">-m</span> <span class="token function">ping</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输出类似下面的信息：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>host1 <span class="token operator">|</span> SUCCESS <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;ansible_facts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;discovered_interpreter_python&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/usr/bin/python3.7&quot;</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;changed&quot;</span><span class="token builtin class-name">:</span> false,
    <span class="token string">&quot;ping&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;pong&quot;</span>
<span class="token punctuation">}</span>

host2 <span class="token operator">|</span> SUCCESS <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;ansible_facts&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;discovered_interpreter_python&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/usr/bin/python3.7&quot;</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;changed&quot;</span><span class="token builtin class-name">:</span> false,
    <span class="token string">&quot;ping&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;pong&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,23),o=[t];function l(p,c){return n(),a("div",null,o)}const u=s(i,[["render",l],["__file","11.docker搭建Asible测试环境.html.vue"]]);export{u as default};
