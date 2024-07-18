import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o,c as d,e as p,a as s,d as a,w as i,b as n,f as t}from"./app-efa5e96e.js";const v={},u={class:"table-of-contents"},m=s("h2",{id:"网址",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#网址","aria-hidden":"true"},"#"),n(" 网址")],-1),b={href:"http://elasticsearch.co/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://elasticsearch.cn/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://www.elastic.co/cn/downloads/elasticsearch",target:"_blank",rel:"noopener noreferrer"},g={href:"https://elasticsearch.cn/download/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://repo.huaweicloud.com/elasticsearch/",target:"_blank",rel:"noopener noreferrer"},q={href:"https://pan.baidu.com/s/1Tdsgm9608fyt_j7gMsLZhg",target:"_blank",rel:"noopener noreferrer"},_=t(`<h2 id="elasticsearch安装" tabindex="-1"><a class="header-anchor" href="#elasticsearch安装" aria-hidden="true">#</a> Elasticsearch安装</h2><ol><li>安装命令</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 新建用户</span>
<span class="token function">useradd</span> dev <span class="token parameter variable">-s</span> /bin/bash
<span class="token comment"># 解压并放到dev用户目录下</span>
<span class="token function">tar</span> <span class="token parameter variable">-xzvf</span> elasticsearch-7.10.2-linux-x86_64.tar.gz <span class="token parameter variable">-C</span> /home/dev/
<span class="token comment"># 修改解压文件的文件权限</span>
<span class="token function">chown</span> <span class="token parameter variable">-R</span> dev:dev /home/dev/elasticsearch-7.10.2
<span class="token comment"># 查看文件权限</span>
ll /home/dev/elasticsearch-7.10.2/
<span class="token comment"># 切换用户</span>
<span class="token function">su</span> dev
<span class="token comment"># 启动ES，-d：后台启动</span>
<span class="token builtin class-name">cd</span> /home/dev/elasticsearch-7.10.2/bin <span class="token operator">&amp;&amp;</span> ./elasticsearch <span class="token parameter variable">-d</span>
<span class="token comment"># 测试启动成功</span>
<span class="token function">curl</span> http://127.0.0.1:9200
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>修改配置</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 默认只能127.0.0.1访问，开放访问方式</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/#\\?network.host:.*/network.host: 0.0.0.0/g&quot;</span> /home/dev/elasticsearch-7.10.2/config/elasticsearch.yml
<span class="token comment"># 设置节点名称</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/#\\?node.name:.*/node.name: node-101/g&quot;</span> /home/dev/elasticsearch-7.10.2/config/elasticsearch.yml
<span class="token comment"># 集群配置</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/#\\?cluster.initial_master_nodes:.*/cluster.initial_master_nodes: [&quot;node-101&quot;]/g&#39;</span> /home/dev/elasticsearch-7.10.2/config/elasticsearch.yml
<span class="token comment"># 跨域处理，处理插件head的连接</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;&gt;</span> /home/dev/elasticsearch-7.10.2/config/elasticsearch.yml</span>
http.cors.enabled: true
http.cors.allow-origin: &quot;*&quot;
EOF</span>

<span class="token comment"># 启动ES，-d：后台启动</span>
<span class="token builtin class-name">cd</span> /home/dev/elasticsearch-7.10.2/bin <span class="token operator">&amp;&amp;</span> ./elasticsearch <span class="token parameter variable">-d</span>
<span class="token comment"># 开启防火墙</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">9200</span>/tcp <span class="token parameter variable">--permanent</span> <span class="token operator">&amp;&amp;</span> firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="es安装问题集" tabindex="-1"><a class="header-anchor" href="#es安装问题集" aria-hidden="true">#</a> ES安装问题集</h2><details class="hint-container details"><summary>java.lang.RuntimeException: can not run elasticsearch as root</summary><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ES不能在root用户下启动，必须创建新的用户，用来启动ES
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>Exception in thread &quot;main&quot; java.nio.file.AccessDeniedException: /home/dev/elasticsearch-7.10.2/config/jvm.options.d</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 文件权限问题</span>
<span class="token function">chown</span> <span class="token parameter variable">-R</span> dev:dev /home/dev/elasticsearch-7.10.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>max file descriptors [4096] for elasticsearch process is too low, increase to at least [65535]</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 每个进程最大同时打开文件数太小，可通过下面2个命令查看当前数量</span>
<span class="token comment"># 查看硬限制</span>
<span class="token builtin class-name">ulimit</span> <span class="token parameter variable">-Hn</span>
<span class="token comment"># 查看软限制</span>
<span class="token builtin class-name">ulimit</span> <span class="token parameter variable">-Sn</span>
<span class="token comment"># 查看两个中更小的限制(软限制始终比硬限制低， 所以查看的是软限制)</span>
<span class="token builtin class-name">ulimit</span> <span class="token parameter variable">-n</span>
<span class="token comment"># 修改配置</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;&gt;</span> /etc/security/limits.conf</span>
* soft nofile 65536
* hard nofile 65536
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>max number of threads [3720] for user [dev] is too low, increase to at least [4096]</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">ulimit</span> <span class="token parameter variable">-Hu</span>
<span class="token builtin class-name">ulimit</span> <span class="token parameter variable">-Su</span>
<span class="token comment"># 修改配置</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;&gt;</span> /etc/security/limits.conf</span>
* soft nproc 4096
* hard nproc 4096
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;&gt;</span> /etc/sysctl.conf</span>
vm.max_map_count=262144
EOF</span>
<span class="token comment"># 使/etc/sysctl.conf的修改生效</span>
<span class="token function">sysctl</span> <span class="token parameter variable">-p</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>the default discovery settings are unsuitable for production use; at least one of [discovery.seed_hosts, discovery.seed_providers, cluster.initial_master_nodes] must be configured</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/#\\?node.name:.*/node.name: node-101/g&quot;</span> /home/dev/elasticsearch-7.10.2/config/elasticsearch.yml
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/#\\?cluster.initial_master_nodes:.*/cluster.initial_master_nodes: [&quot;node-101&quot;]/g&#39;</span> /home/dev/elasticsearch-7.10.2/config/elasticsearch.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="docker容器安装" tabindex="-1"><a class="header-anchor" href="#docker容器安装" aria-hidden="true">#</a> docker容器安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#搜索镜像</span>
<span class="token function">docker</span> search elasticsearch
<span class="token comment">#拉取镜像</span>
<span class="token function">docker</span> pull elasticsearch:7.10.2
<span class="token comment">#创建容器</span>
<span class="token function">docker</span> create name elasticsearch net <span class="token function">host</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;discovery.type=singlenode&quot;</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;network.host=192.168.66.66&quot;</span> elasticsearch:7.10.2
<span class="token comment">#启动</span>
<span class="token function">docker</span> start elasticsearch
<span class="token comment">#查看日志</span>
<span class="token function">docker</span> logs elasticsearch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="elasticsearch开机自启" tabindex="-1"><a class="header-anchor" href="#elasticsearch开机自启" aria-hidden="true">#</a> Elasticsearch开机自启</h2><details class="hint-container details"><summary>方法一：systemctl设置开机自启（推荐）</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;&gt;</span> /etc/systemd/system/elasticsearch.service</span>
[Unit]
Description=elasticsearch
[Service]
User=dev
LimitNOFILE=100000
LimitNPROC=100000
ExecStart=/home/dev/elasticsearch-7.10.2/bin/elasticsearch
[Install]
WantedBy=multi-user.target
EOF</span>
<span class="token comment"># 开机自启</span>
systemctl <span class="token builtin class-name">enable</span> elasticsearch.service
<span class="token comment"># 开启防火墙</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">9200</span>/tcp <span class="token parameter variable">--permanent</span> <span class="token operator">&amp;&amp;</span> firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>方法二：chkconfig设置开机自启</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看当前的开机启动服务</span>
<span class="token function">chkconfig</span> <span class="token parameter variable">--list</span>
<span class="token comment"># ES启动脚本</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;&gt;</span> /etc/init.d/elasticsearch</span>
#!/bin/bash
#chkconfig: 345 63 37
#description: elasticsearch
#processname: elasticsearch-7.10.2

export ES_HOME=/home/dev/elasticsearch-7.10.2     #【这个目录是你Es所在文件夹的目录】
export ES_USER=dev                                #【es 这个是启动es的账户，如果你的不是这个记得调整】

case <span class="token variable">$1</span> in
	start)
		su - <span class="token variable">$ES_USER</span> -c &quot;<span class="token variable">$ES_HOME</span>/bin/elasticsearch -d -p pid&quot;
		echo &quot;elasticsearch is started&quot;
		;;
	stop)
		pid=<span class="token variable"><span class="token variable">\`</span><span class="token function">cat</span> $ES_HOME/pid<span class="token variable">\`</span></span>
		kill -9 <span class="token variable">$pid</span>
		echo &quot;elasticsearch is stopped&quot;
		;;
	restart)
		pid=<span class="token variable"><span class="token variable">\`</span><span class="token function">cat</span> $ES_HOME/pid<span class="token variable">\`</span></span>
		kill -9 <span class="token variable">$pid</span>
		echo &quot;elasticsearch is stopped&quot;
		sleep 1
		su - <span class="token variable">$ES_USER</span> -c &quot;<span class="token variable">$ES_HOME</span>/bin/elasticsearch -d -p pid&quot;
		echo &quot;elasticsearch is started&quot;
		;;
	*)
		echo &quot;start|stop|restart&quot;
		;;  
esac
exit 0
EOF</span>
<span class="token comment"># 修改文件权限</span>
<span class="token function">chmod</span> <span class="token number">755</span> /etc/init.d/elasticsearch
<span class="token comment"># {添加|删除}系统服务</span>
<span class="token function">chkconfig</span> --<span class="token punctuation">{</span>add<span class="token operator">|</span>del<span class="token punctuation">}</span> elasticsearch
<span class="token comment"># {启动|停止|重启}ES服务</span>
<span class="token function">service</span> elasticsearch <span class="token punctuation">{</span>start<span class="token operator">|</span>stop<span class="token operator">|</span>restart<span class="token punctuation">}</span>
<span class="token comment"># {开启关闭}开机自启</span>
<span class="token function">chkconfig</span> elasticsearch <span class="token punctuation">{</span>on<span class="token operator">|</span>off<span class="token punctuation">}</span>
<span class="token comment"># 查看ES进程</span>
<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> elasticsearch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="head插件安装" tabindex="-1"><a class="header-anchor" href="#head插件安装" aria-hidden="true">#</a> head插件安装</h2><ol><li>用途</li><li>安装</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#下载nodejs,head插件运行依赖node</span>
<span class="token function">wget</span> https: nodejs.org/dist/v9.9.0/node-v9.9.0-linux-x64.tar.xz
<span class="token comment"># 解压</span>
<span class="token function">tar</span> <span class="token parameter variable">-xf</span> node-v9.9.0-linux-x64.tar.xz
<span class="token comment"># 重命名</span>
<span class="token function">mv</span> node-v9.9.0-linux-x64 /usr/local/node
<span class="token comment"># 配置文件</span>
<span class="token function">vim</span> /etc/profile
<span class="token comment"># 将node的路径添加到path中</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$JAVA_HOME</span>/bin:/usr/local/node/bin
<span class="token comment"># 刷新配置</span>
<span class="token builtin class-name">source</span> /etc/profile
<span class="token comment"># 查询node版本，同时查看是否安装成功</span>
<span class="token function">node</span> <span class="token parameter variable">-v</span>
<span class="token comment"># 下载head插件</span>
<span class="token function">wget</span> https://github.com/mobz/elasticsearch-head/archive/master.zip
<span class="token comment"># 解压</span>
<span class="token function">unzip</span> master.zip
<span class="token comment"># 使用淘宝的镜像库进行下载，速度很快</span>
<span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> cnpm <span class="token assign-left variable">registry</span><span class="token operator">=</span>https://registry.npm.taobao.org
<span class="token comment"># 进入head插件解压目录，执行安装命令</span>
cnpm <span class="token function">install</span>
<span class="token comment"># 启动head插件</span>
<span class="token function">npm</span> start 
<span class="token comment"># 启动head插件，或者使用</span>
grunt server

<span class="token comment"># 如果是linux上允许按需开放端口</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">9100</span>/tcp <span class="token parameter variable">--permanent</span> <span class="token operator">&amp;&amp;</span> firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>linux设置开机自启</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动脚本</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;&gt;</span> /root/elasticsearch-head/start.sh</span>
#!/bin/bash

export ES_HOME=/root/elasticsearch-head
export NODE_HOME=/usr/local/lib/nodejs
export PATH=<span class="token environment constant">$PATH</span>:<span class="token variable">$NODE_HOME</span>/bin

cd \\<span class="token variable">$ES_HOME</span>
nohup npm start &gt; /dev/null 2&gt;&amp;1 &amp;
cd -
EOF</span>
<span class="token function">chmod</span> +x /root/elasticsearch-head/start.sh
<span class="token comment"># 添加脚本文件</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;/bin/bash /root/elasticsearch-head/start.sh&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/rc.local
<span class="token comment"># 设置可执行权限</span>
<span class="token function">chmod</span> +x /etc/rc.local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="logstash安装" tabindex="-1"><a class="header-anchor" href="#logstash安装" aria-hidden="true">#</a> LogStash安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 解压</span>
<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> logstash-7.10.2.tar.gz
<span class="token comment"># 启动 基本的 intput output ，stdin stdout 输入输出插件</span>
bin/logstash <span class="token parameter variable">-e</span> <span class="token string">&#39;input{ stdin{} } output{ stdout{} }&#39;</span>
<span class="token comment"># codec</span>
bin/logstash <span class="token parameter variable">-e</span> <span class="token string">&#39;input{ stdin{} } output{ stdout{ codec  json } }&#39;</span>
<span class="token comment"># 日志内容写入elasticsearch</span>
bin/logstash <span class="token parameter variable">-e</span> <span class="token string">&#39;input{ stdin{} } output{ elasticsearch{ hosts =&gt; [&quot;127.0.0.1:9200&quot;] } }&#39;</span>
<span class="token comment"># 日志内容写入elasticsearch，同时输出</span>
bin/logstash <span class="token parameter variable">-e</span> <span class="token string">&#39;input{ stdin{} } output{ elasticsearch{ hosts =&gt; [&quot;127.0.0.1:9200&quot;] } stdout { [&quot;127.0.0.1:9200&quot;] } stdout{} }&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="hint-container details"><summary>1. 配置语法，日志内容写入elasticsearch，同时输出</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;&gt;</span> config/file.conf</span>
input { stdin { } }
output {
    elasticsearch { hosts =&gt; [&quot;127.0.0.1:9200&quot;] }
    stdout { codec =&gt; rubydebug }
}
EOF</span>
<span class="token comment">#启动命令</span>
bin/logstash <span class="token parameter variable">-f</span> config/file.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>2. file日志收集</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;&gt;</span> config/file.conf</span>
input {
    file{
        path =&gt; &quot;/var/log/messages&quot; #收集messages文件日志
        type =&gt; &quot;system&quot;
        start_position =&gt; &quot;beginning&quot; #记录上次收集的位置
    }
}
output {
    elasticsearch {
        hosts =&gt; [&quot;127.0.0.1:9200&quot;] #写入elasticsearch的地址
        index =&gt; &quot;system-%{+YYYY.MM.dd}&quot; #定义索引的名称
    }
    stdout { codec =&gt; rubydebug }
}
EOF</span>
bin/logstash <span class="token parameter variable">-f</span> config/file.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>3. Java日志收集</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;&gt;</span> config/file.conf</span>
input {
    file{
        path =&gt; &quot;/var/log/messages&quot;
        type =&gt; &quot;system&quot;
        start_position =&gt; &quot;beginning&quot;
    }
    # 加一个file文件收集日志插件，收集elasticsearch日志、es就是java语言开发的。
    file{
        path =&gt; &quot;/home/es/elasticsearch-7.10.2/logs/elasticsearch.log&quot;
        type =&gt; &quot;es-info&quot;
        start_position =&gt; &quot;beginning&quot;
        # 目前导入日志都是按照行导入的、但是有些日志多行是一句话，如果分开的话，就不太容查看日志完整的意思了。
        # 使用正则表达式，合并多行日志
        codec =&gt; multiline {
            # 发现中括号，就合并日志
            pattern =&gt; &quot;^\\[&quot;
            negate =&gt; true
            what =&gt; &quot;previous&quot;
        }
    }
}
output {
    if [type]  &quot;system&quot;{
        elasticsearch {
            hosts =&gt; [&quot;127.0.0.1:9200&quot;]
            index =&gt; &quot;system-%{+YYYY.MM.dd}&quot;
        }
    }
    # 判断，导入到不同的索引库，否则会放入同一个索引库中
    if [type]  &quot;es-info&quot;{
        elasticsearch {
            hosts =&gt; [&quot;127.0.0.1:9200&quot;]
            index =&gt; &quot;es-info-%{+YYYY.MM.dd}&quot;
        }
    }
    stdout { codec =&gt; rubydebug }
}
EOF</span>
bin/logstash <span class="token parameter variable">-f</span> config/file.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>4. 项目日志</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;&gt;</span> config/file.conf</span>
# 通过tcp协议输入
input {
    tcp {
        port =&gt; 9600
        codec =&gt; json
    }
}
output {
    elasticsearch {
        hosts =&gt; [&quot;127.0.0.1:9200&quot;]
        index =&gt; &quot;kkb-log-%{+YYYY.MM.dd}&quot;
    }
    stdout { codec =&gt; rubydebug }
}
EOF</span>
bin/logstash <span class="token parameter variable">-f</span> config/file.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="kibana安装" tabindex="-1"><a class="header-anchor" href="#kibana安装" aria-hidden="true">#</a> kibana安装</h2><blockquote><p>注意elasticsearch版本应与kibana版本一致，否则报错</p><p>kibana也是需要非root用户启动</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-xzvf</span> kibana-7.10.2-linux-x86_64.tar.gz <span class="token parameter variable">-C</span> /home/dev
<span class="token function">chown</span> <span class="token parameter variable">-R</span> dev:dev /home/dev/kibana-7.10.2-linux-x86_64/
<span class="token comment"># 切换到dev用户</span>
<span class="token function">su</span> dev
<span class="token comment"># 修改配置</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/#\\?server.host:.*/server.host: &quot;0.0.0.0&quot;/g&#39;</span> /home/dev/kibana-7.10.2-linux-x86_64/config/kibana.yml
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/#\\?elasticsearch.hosts:.*/elasticsearch.hosts: [&quot;http:\\/\\/192.16.18.101:9200&quot;]/g&#39;</span> /home/dev/kibana-7.10.2-linux-x86_64/config/kibana.yml
<span class="token comment"># 启动</span>
./kibana <span class="token operator">&amp;</span>
<span class="token comment"># 开启防火墙</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">5601</span>/tcp <span class="token parameter variable">--permanent</span> <span class="token operator">&amp;&amp;</span> firewall-cmd <span class="token parameter variable">--reload</span>
<span class="token comment"># 可浏览器查看</span>
<span class="token function">curl</span> http://192.16.18.101:5601
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;&gt;</span> /etc/systemd/system/kibana.service</span>
[Unit]
Description=kibana
After=elasticsearch.service
[Service]
User=dev
LimitNOFILE=100000
LimitNPROC=100000
ExecStart=/home/dev/kibana-7.10.2-linux-x86_64/bin/kibana
[Install]
WantedBy=multi-user.target
EOF</span>
<span class="token comment"># 开机自启</span>
systemctl <span class="token builtin class-name">enable</span> kibana.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="中文分词器" tabindex="-1"><a class="header-anchor" href="#中文分词器" aria-hidden="true">#</a> 中文分词器</h2>`,33),x={href:"https://github.com/medcl/elasticsearch-analysis-ik/releases",target:"_blank",rel:"noopener noreferrer"},y=s("p",null,"ik有两种分词模式：ik_max_word（细粒度的拆分）、ik_smart（粗粒度的拆分）。",-1),E=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.10.2/elasticsearch-analysis-ik-7.10.2.zip
<span class="token function">mv</span> elasticsearch-analysis-ik-7.10.2.zip /home/dev/
<span class="token function">chown</span> <span class="token parameter variable">-R</span> dev:dev /home/dev/elasticsearch-analysis-ik-7.10.2.zip 
<span class="token function">su</span> dev
<span class="token function">unzip</span> elasticsearch-analysis-ik-7.10.2.zip <span class="token parameter variable">-d</span> elasticsearch-7.10.2/plugins/ik_analyze/
<span class="token comment"># 重启elasticsearch</span>
systemctl status elasticsearch.service

<span class="token comment"># 测试分词结果</span>
<span class="token function">curl</span> <span class="token parameter variable">-XPOST</span> <span class="token string">&#39;localhost:9200/_analyze?pretty&#39;</span> <span class="token parameter variable">-H</span> <span class="token string">&#39;Content-Type: application/json&#39;</span> <span class="token parameter variable">-d</span> <span class="token string">&#39;{&quot;analyzer&quot;: &quot;ik_max_word&quot;,&quot;text&quot;: &quot;明星所在的娱乐圈真热闹&quot;}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="拼音分词器" tabindex="-1"><a class="header-anchor" href="#拼音分词器" aria-hidden="true">#</a> 拼音分词器</h2>`,2),w={href:"https://github.com/medcl/elasticsearch-analysis-pinyin/releases/tag/v6.6.2",target:"_blank",rel:"noopener noreferrer"},O=t(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
# 测试分词结果
curl -XPOST &#39;localhost:9200/medcl/_analyze?pretty&#39; -H &#39;Content-Type: application/json&#39; -d &#39;{&quot;analyzer&quot;: &quot;pinyin_analyzer&quot;,&quot;text&quot;: &quot;刘德华&quot;}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="集群部署" tabindex="-1"><a class="header-anchor" href="#集群部署" aria-hidden="true">#</a> 集群部署</h2><blockquote><p>准备三台Elaticsearch服务器 ==》 修改配置如下 ==》 启动每个节点 ==》 查看集群情况</p><p>初始化集群部署时，保证各节点的数据为空</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;&gt;</span> elasticsearch-7.10.2/config/elasticsearch.yml</span>
# 集群名称，保证唯一
cluster.name: es-cluster-custom
# 节点名称，必须不一样
node.name: node-101
# 必须为本机的ip地址
network.host: 192.16.18.101
# 服务端口号，在同一机器下必须不一样
http.port: 9200
# 集群间通信端口号，在同一机器下必须不一样
transport.tcp.port: 9300
# 设置集群自动发现机器ip集合
discovery.seed_hosts: [&quot;192.16.18.101:9300&quot;, &quot;192.16.18.102:9300&quot;,&quot;192.16.18.103:9300&quot;]
# 可当选master节点的节点名称集合
cluster.initial_master_nodes: [&quot;node-101&quot;,&quot;node-102&quot;,&quot;node-103&quot;]
# 跨域访问
http.cors.enabled: true
http.cors.allow-origin: &quot;*&quot;
EOF</span>
<span class="token comment"># 每个节点开放节点通信端口（9300）</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">9300</span>/tcp <span class="token parameter variable">--permanent</span> <span class="token operator">&amp;&amp;</span> firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function S(z,F){const e=c("router-link"),l=c("ExternalLinkIcon");return o(),d("div",null,[p(" more "),s("nav",u,[s("ul",null,[s("li",null,[a(e,{to:"#网址"},{default:i(()=>[n("网址")]),_:1})]),s("li",null,[a(e,{to:"#elasticsearch安装"},{default:i(()=>[n("Elasticsearch安装")]),_:1})]),s("li",null,[a(e,{to:"#es安装问题集"},{default:i(()=>[n("ES安装问题集")]),_:1})]),s("li",null,[a(e,{to:"#docker容器安装"},{default:i(()=>[n("docker容器安装")]),_:1})]),s("li",null,[a(e,{to:"#elasticsearch开机自启"},{default:i(()=>[n("Elasticsearch开机自启")]),_:1})]),s("li",null,[a(e,{to:"#head插件安装"},{default:i(()=>[n("head插件安装")]),_:1})]),s("li",null,[a(e,{to:"#logstash安装"},{default:i(()=>[n("LogStash安装")]),_:1})]),s("li",null,[a(e,{to:"#kibana安装"},{default:i(()=>[n("kibana安装")]),_:1})]),s("li",null,[a(e,{to:"#中文分词器"},{default:i(()=>[n("中文分词器")]),_:1})]),s("li",null,[a(e,{to:"#拼音分词器"},{default:i(()=>[n("拼音分词器")]),_:1})]),s("li",null,[a(e,{to:"#集群部署"},{default:i(()=>[n("集群部署")]),_:1})])])]),m,s("ul",null,[s("li",null,[n("官网："),s("a",b,[n("http://elasticsearch.co/"),a(l)])]),s("li",null,[n("中文社区："),s("a",h,[n("https://elasticsearch.cn/"),a(l)])]),s("li",null,[n("官网下载地址："),s("a",k,[n("https://www.elastic.co/cn/downloads/elasticsearch"),a(l)])]),s("li",null,[n("中文社区下载地址："),s("a",g,[n("https://elasticsearch.cn/download/"),a(l)])]),s("li",null,[n("华为云下载地址："),s("a",f,[n("https://repo.huaweicloud.com/elasticsearch/"),a(l)])]),s("li",null,[n("百度网盘下载地址："),s("a",q,[n("https://pan.baidu.com/s/1Tdsgm9608fyt_j7gMsLZhg 提取码：e2nd"),a(l)])])]),_,s("blockquote",null,[s("p",null,[n("下载地址："),s("a",x,[n("https://github.com/medcl/elasticsearch-analysis-ik/releases"),a(l)])]),y]),E,s("blockquote",null,[s("p",null,[s("a",w,[n("https://github.com/medcl/elasticsearch-analysis-pinyin/releases/tag/v6.6.2"),a(l)])])]),O])}const Y=r(v,[["render",S],["__file","10.Elasticsearch安装.html.vue"]]);export{Y as default};
