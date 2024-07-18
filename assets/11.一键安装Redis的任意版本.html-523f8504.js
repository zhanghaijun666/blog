import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as r,c as p,e as d,a as s,d as a,w as l,b as n,f as t}from"./app-efa5e96e.js";const u={},v={class:"table-of-contents"},m=t(`<h2 id="执行脚本" tabindex="-1"><a class="header-anchor" href="#执行脚本" aria-hidden="true">#</a> 执行脚本</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 脚本内容如下</span>
<span class="token function">chmod</span> <span class="token number">755</span> redis-install.sh <span class="token operator">&amp;&amp;</span> <span class="token function">sh</span> redis-install.sh <span class="token number">6.0</span>.6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="脚本内容" tabindex="-1"><a class="header-anchor" href="#脚本内容" aria-hidden="true">#</a> 脚本内容</h2>`,3),k={href:"http://redis-install.sh",target:"_blank",rel:"noopener noreferrer"},b=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#! /usr/bin/bash</span>
<span class="token comment">##redis任何版本全程自动化源码编译安装</span>
<span class="token comment">##用法：sh redis-install.sh 6.0.6 （后面跟的是你需要的版本号，需要什么版本就写什么版本），我这里安装的6.0.6</span>
<span class="token assign-left variable">version</span><span class="token operator">=</span><span class="token variable">$1</span>
<span class="token function-name function">usage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;usage: <span class="token variable">$0</span> version&quot;</span>
<span class="token punctuation">}</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$#</span> <span class="token parameter variable">-ne</span> <span class="token number">1</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
usage
<span class="token builtin class-name">exit</span> <span class="token parameter variable">-1</span>
<span class="token keyword">fi</span>

<span class="token comment">#Redis安装包下载</span>
<span class="token builtin class-name">cd</span> /usr/local/src
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-f</span> redis-<span class="token variable">\${version}</span>.tar.gz <span class="token punctuation">]</span>
<span class="token keyword">then</span>
<span class="token function">curl</span> <span class="token parameter variable">-o</span> /usr/local/src/redis-<span class="token variable">\${version}</span>.tar.gz http://download.redis.io/releases/redis-<span class="token variable">\${version}</span>.tar.gz
<span class="token keyword">fi</span>

<span class="token comment">#Redis依赖包安装</span>
yum clean all
yum makecache fast
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> gcc gcc-c++ tcl

<span class="token comment">#编译Redis所需要的gcc</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> centos-release-scl
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> devtoolset-9-gcc devtoolset-9-gcc-c++ devtoolset-9-binutils
<span class="token builtin class-name">source</span> /opt/rh/devtoolset-9/enable
<span class="token builtin class-name">echo</span> <span class="token string">&quot;source /opt/rh/devtoolset-9/enable&quot;</span> <span class="token operator">&gt;&gt;</span>/etc/profile
gcc <span class="token parameter variable">--version</span>

<span class="token comment">##内系统参数核优化</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /etc/rc.d/rc.local <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;EOF&quot;

##关闭Linux的THP（内存管理系统）通过使用更大的内存页面，来减少具有大量内存的计算机上的TLB的开销
if [ -f /sys/kernel/mm/transparent_hugepage/enabled ]
then
echo never &gt; /sys/kernel/mm/transparent_hugepage/enabled
fi

if [ -f /sys/kernel/mm/transparent_hugepage/defrag ]
then
echo never &gt; /sys/kernel/mm/transparent_hugepage/defrag
fi
EOF</span>
<span class="token function">chmod</span> u+x /etc/rc.d/rc.local

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> /sys/kernel/mm/transparent_hugepage/enabled <span class="token punctuation">]</span>
<span class="token keyword">then</span>
<span class="token builtin class-name">echo</span> never <span class="token operator">&gt;</span> /sys/kernel/mm/transparent_hugepage/enabled
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> /sys/kernel/mm/transparent_hugepage/defrag <span class="token punctuation">]</span>
<span class="token keyword">then</span>
<span class="token builtin class-name">echo</span> never <span class="token operator">&gt;</span> /sys/kernel/mm/transparent_hugepage/defrag
<span class="token keyword">fi</span>

<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /etc/sysctl.conf <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;EOF&quot;

#Linux系统内核参数优化
net.core.somaxconn = 2048
net.ipv4.tcp_max_syn_backlog = 2048
vm.overcommit_memory = 1
EOF</span>
<span class="token function">sysctl</span> <span class="token parameter variable">-p</span>

<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/security/limits.conf <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;EOF&quot;
root soft nofile 65535
root hard nofile 65535
* soft nofile 65535
* hard nofile 65535
EOF</span>

<span class="token comment">#Redis编译安装</span>
<span class="token builtin class-name">cd</span> /usr/local/src
<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> redis-<span class="token variable">\${version}</span>.tar.gz
<span class="token builtin class-name">cd</span> /usr/local/src/redis-<span class="token variable">\${version}</span>
<span class="token function">make</span>
<span class="token function">make</span> <span class="token assign-left variable">PREFIX</span><span class="token operator">=</span>/usr/local/redis <span class="token function">install</span>

<span class="token comment">#Redis基础配置</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /usr/local/redis/<span class="token punctuation">{</span>etc,logs,data<span class="token punctuation">}</span>
<span class="token function">egrep</span> <span class="token parameter variable">-v</span> <span class="token string">&quot;^$|^#&quot;</span> /usr/local/src/redis-<span class="token variable">\${version}</span>/redis.conf <span class="token operator">&gt;</span> /usr/local/redis/etc/redis.conf
<span class="token comment">#sed -i &quot;s/bind 127.0.0.1/bind 0.0.0.0/g&quot; /usr/local/redis/etc/redis.conf</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/protected-mode yes/protected-mode no/g&quot;</span> /usr/local/redis/etc/redis.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/daemonize no/daemonize yes/g&quot;</span> /usr/local/redis/etc/redis.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/pidfile \\/var\\/run\\/redis_6379.pid/pidfile \\/usr\\/local\\/redis\\/redis.pid/g&quot;</span> /usr/local/redis/etc/redis.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/dir \\.\\//dir \\/usr\\/local\\/redis\\/data/g&quot;</span> /usr/local/redis/etc/redis.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/logfile <span class="token entity" title="\\&quot;">\\&quot;</span><span class="token entity" title="\\&quot;">\\&quot;</span>/logfile <span class="token entity" title="\\&quot;">\\&quot;</span>\\/usr\\/local\\/redis\\/logs\\/redis.log<span class="token entity" title="\\&quot;">\\&quot;</span>/g&quot;</span> /usr/local/redis/etc/redis.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/dbfilename dump.rdb/dbfilename dump.rdb/g&quot;</span> /usr/local/redis/etc/redis.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/appendfilename <span class="token entity" title="\\&quot;">\\&quot;</span>appendonly.aof<span class="token entity" title="\\&quot;">\\&quot;</span>/appendfilename <span class="token entity" title="\\&quot;">\\&quot;</span>appendonly.aof<span class="token entity" title="\\&quot;">\\&quot;</span>/g&quot;</span> /usr/local/redis/etc/redis.conf

<span class="token comment">#PATH配置</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;export PATH=/usr/local/redis/bin:$PATH&#39;</span> <span class="token operator">&gt;&gt;</span> /etc/profile <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">source</span> /etc/profile
<span class="token comment">#启动redis服务</span>
/usr/local/redis/bin/redis-server /usr/local/redis/etc/redis.conf
<span class="token comment">#查看redis监听端口</span>
<span class="token function">netstat</span> -tanp<span class="token operator">|</span><span class="token function">grep</span> redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function f(g,h){const e=i("router-link"),c=i("ExternalLinkIcon");return r(),p("div",null,[d(" more "),s("nav",v,[s("ul",null,[s("li",null,[a(e,{to:"#执行脚本"},{default:l(()=>[n("执行脚本")]),_:1})]),s("li",null,[a(e,{to:"#脚本内容"},{default:l(()=>[n("脚本内容")]),_:1})])])]),m,s("p",null,[n("cat "),s("a",k,[n("redis-install.sh"),a(c)])]),b])}const q=o(u,[["render",f],["__file","11.一键安装Redis的任意版本.html.vue"]]);export{q as default};
