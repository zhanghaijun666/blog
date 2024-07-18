import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as p,c as d,e as o,a as e,d as s,w as i,b as n,f as l}from"./app-efa5e96e.js";const m={},v={class:"table-of-contents"},u=e("p",null,"ZooKeeper 是一个分布式的，开放源码的分布式应用程序协调服务，ZooKeeper 是以 Fast Paxos 算法为基础，实现同步服务，配置维护和命名服务等分布式应用。",-1),k=e("p",null,"Zookeeper 分布式服务框架是 Apache Hadoop 的一个子项目，它主要是用来解决分布式应用中经常遇到的一些数据管理问题，如：统一命名服务、状态同步服务、集群管理、分布式应用配置项的管理等。核心词就是一个，协调。",-1),b={href:"http://www.apache.org/dyn/closer.cgi/zookeeper/",target:"_blank",rel:"noopener noreferrer"},h=l(`<h2 id="zookeeper-下载" tabindex="-1"><a class="header-anchor" href="#zookeeper-下载" aria-hidden="true">#</a> zookeeper 下载</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 下载源码文件</span>
<span class="token function">wget</span> <span class="token parameter variable">-c</span> https://mirrors.bfsu.edu.cn/apache/zookeeper/zookeeper-3.6.2/apache-zookeeper-3.6.2-bin.tar.gz
<span class="token comment">#wget -c https://www.apache.org/dyn/closer.lua/zookeeper/zookeeper-3.6.2/apache-zookeeper-3.6.2-bin.tar.gz</span>
<span class="token comment">#wget -c http://archive.apache.org/dist/zookeeper/zookeeper-3.6.2/apache-zookeeper-3.6.2-bin.tar.gz</span>
<span class="token comment">#wget -c https://mirrors.tuna.tsinghua.edu.cn/apache/zookeeper/zookeeper-3.6.2/apache-zookeeper-3.6.2-bin.tar.gz</span>
<span class="token comment"># 解压</span>
<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> apache-zookeeper-3.6.2-bin.tar.gz <span class="token parameter variable">-C</span> /usr/src/

<span class="token comment"># 配置文件，可修改端口号</span>
<span class="token function">cp</span> /usr/src/apache-zookeeper-3.6.2-bin/conf/zoo_sample.cfg /usr/src/apache-zookeeper-3.6.2-bin/conf/zoo.cfg

<span class="token comment"># 配置文件的字段说明</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /usr/src/apache-zookeeper-3.6.2-bin/conf/zoo.cfg <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
# tickTime：CS通信心跳数
# Zookeeper 服务器之间或客户端与服务器之间维持心跳的时间间隔，也就是每个 tickTime 时间就会发送一个心跳。tickTime以毫秒为单位。
tickTime=2000

# initLimit：LF初始通信时限
# 集群中的follower服务器(F)与leader服务器(L)之间初始连接时能容忍的最多心跳数（tickTime的数量）。
initLimit=5

# syncLimit：LF同步通信时限
# 集群中的follower服务器与leader服务器之间请求和应答之间能容忍的最多心跳数（tickTime的数量）。
syncLimit=2

# dataDir：数据文件目录 Zookeeper保存数据的目录，默认情况下，Zookeeper将写数据的日志文件也保存在这个目录里。
dataDir=/usr/src/apache-zookeeper-3.6.2-bin/data

# dataLogDir：日志文件目录 Zookeeper保存日志文件的目录。
dataLogDir=/usr/src/apache-zookeeper-3.6.2-bin/logs

# clientPort：客户端连接端口
clientPort=2181
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="zookeeper-单机模式" tabindex="-1"><a class="header-anchor" href="#zookeeper-单机模式" aria-hidden="true">#</a> ZooKeeper 单机模式</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 后台启动zk|前台启动zk（以便查看服务器进程的输出日志）|停止|重启|状态</span>
<span class="token builtin class-name">cd</span> /usr/src/apache-zookeeper-3.6.2-bin/bin <span class="token operator">&amp;&amp;</span> ./zkServer.sh start<span class="token operator">|</span>start-foreground<span class="token operator">|</span>stop<span class="token operator">|</span>restart<span class="token operator">|</span>status
<span class="token comment"># 客户端连接</span>
<span class="token builtin class-name">cd</span> /usr/src/apache-zookeeper-3.6.2-bin/bin <span class="token operator">&amp;&amp;</span> ./zkCli.sh <span class="token parameter variable">-server</span> <span class="token number">127.0</span>.0.1:2181

<span class="token comment"># 帮助文档</span>
<span class="token builtin class-name">help</span>
<span class="token comment"># 查看指定路径下包含的节点</span>
<span class="token function">ls</span> /
<span class="token comment"># 创建节点数据</span>
create /zk myData
<span class="token comment"># 查看节点zk的数据内容</span>
get /zk
<span class="token comment"># 设置节点zk的内容</span>
<span class="token builtin class-name">set</span> /zk <span class="token string">&quot;anotherData&quot;</span>
<span class="token comment"># 删除节点zk</span>
delete /zk
<span class="token comment"># 推出客户端</span>
quit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用-nc-来向-zk-发送-4-字母命令" tabindex="-1"><a class="header-anchor" href="#使用-nc-来向-zk-发送-4-字母命令" aria-hidden="true">#</a> 使用 nc 来向 zk 发送 4 字母命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token function">nc</span>
<span class="token comment"># 使用nc来向zk发送4字母命令</span>
<span class="token builtin class-name">echo</span> conf <span class="token operator">|</span> <span class="token function">nc</span> <span class="token number">127.0</span>.0.1 <span class="token number">2181</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th>命令</th><th>描述</th></tr></thead><tbody><tr><td>conf</td><td>zk 服务配置的详细信息</td></tr><tr><td>stat</td><td>客户端与 zk 连接的简要信息</td></tr><tr><td>srvr</td><td>zk 服务的详细信息</td></tr><tr><td>cons</td><td>客户端与 zk 连接的详细信息</td></tr><tr><td>mntr</td><td>zk 服务目前的性能状况</td></tr><tr><td>wchs</td><td>watch 的简要信息</td></tr><tr><td>wchc</td><td>watch 的详细信息，客户端 -&gt; watch 的映射，线上环境要小心使用</td></tr><tr><td>wchp</td><td>watch 的详细信息, znode -&gt; 客户端的映射，线上环境要小心使用</td></tr></tbody></table><h2 id="zookeeper-集群模式" tabindex="-1"><a class="header-anchor" href="#zookeeper-集群模式" aria-hidden="true">#</a> zookeeper 集群模式</h2><p>单机模式的 zk 进程虽然便于开发与测试，但并不适合在生产环境使用。在生产环境下，我们需要使用集群模式来对 zk 进行部署。</p><p>在集群模式下，建议至少部署 3 个 zk 进程，或者部署奇数个 zk 进程。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 预先准备三个zookeeper</span>
<span class="token comment">#/usr/src/zookeeper-3.6.2-2181/</span>
<span class="token comment">#/usr/src/zookeeper-3.6.2-2182/</span>
<span class="token comment">#/usr/src/zookeeper-3.6.2-2183/</span>

<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /usr/src/zookeeper-3.6.2-2181/conf/zoo.cfg <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
tickTime=2000
initLimit=5
syncLimit=2
dataDir=/usr/src/zookeeper-3.6.2-2181/data
clientPort=2181
server.1=localhost:2887:3887
server.2=localhost:2888:3888
server.3=localhost:2889:3889
EOF</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /usr/src/zookeeper-3.6.2-2182/conf/zoo.cfg <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
tickTime=2000
initLimit=5
syncLimit=2
dataDir=/usr/src/zookeeper-3.6.2-2181/data
clientPort=2182
server.1=localhost:2887:3887
server.2=localhost:2888:3888
server.3=localhost:2889:3889
EOF</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /usr/src/zookeeper-3.6.2-2183/conf/zoo.cfg <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
tickTime=2000
initLimit=5
syncLimit=2
dataDir=/usr/src/zookeeper-3.6.2-2181/data
clientPort=2183
server.1=localhost:2887:3887
server.2=localhost:2888:3888
server.3=localhost:2889:3889
EOF</span>

<span class="token comment"># 这个文件在dataDir 目录下，对应的配置文件的server</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /usr/src/zookeeper-3.6.2-2181/data/myid <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;1&quot;</span> <span class="token operator">&gt;&gt;</span> /usr/src/zookeeper-3.6.2-2181/data/myid
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /usr/src/zookeeper-3.6.2-2182/data/myid <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;2&quot;</span> <span class="token operator">&gt;&gt;</span> /usr/src/zookeeper-3.6.2-2182/data/myid
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /usr/src/zookeeper-3.6.2-2183/data/myid <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;3&quot;</span> <span class="token operator">&gt;&gt;</span> /usr/src/zookeeper-3.6.2-2183/data/myid

<span class="token builtin class-name">cd</span> /usr/src/zookeeper-3.6.2-2181/bin <span class="token operator">&amp;&amp;</span> ./zkServer.sh start
<span class="token builtin class-name">cd</span> /usr/src/zookeeper-3.6.2-2182/bin <span class="token operator">&amp;&amp;</span> ./zkServer.sh start
<span class="token builtin class-name">cd</span> /usr/src/zookeeper-3.6.2-2183/bin <span class="token operator">&amp;&amp;</span> ./zkServer.sh start

<span class="token comment"># 客户端连接zk集群</span>
<span class="token builtin class-name">cd</span> /usr/src/zookeeper-3.6.2-2181/bin <span class="token operator">&amp;&amp;</span> ./zkCli.sh <span class="token parameter variable">-server</span> <span class="token number">192.16</span>.18.101:2181,192.16.18.101:2182,192.16.18.101:2183
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="zookeeper-可视化工具-服务器推荐" tabindex="-1"><a class="header-anchor" href="#zookeeper-可视化工具-服务器推荐" aria-hidden="true">#</a> zookeeper 可视化工具（服务器推荐）</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 下载源码</span>
<span class="token function">git</span> clone https://github.com/DeemOpen/zkui.git
<span class="token builtin class-name">cd</span> zkui
<span class="token comment"># 打包</span>
mvn clean package <span class="token parameter variable">-DskipTests</span><span class="token operator">=</span>true
<span class="token comment"># 配置文件config.cfg需要和jar放到同一目录</span>
<span class="token function">cp</span> ./target/*.jar <span class="token builtin class-name">.</span>
<span class="token comment"># java运行</span>
<span class="token function">nohup</span> <span class="token function">java</span> <span class="token parameter variable">-jar</span> zkui-2.0-SNAPSHOT-jar-with-dependencies.jar <span class="token operator">&amp;</span>

<span class="token comment"># 访问http://localhost:9090</span>
<span class="token comment"># Please login using admin/manager or appconfig/appconfig.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="windows-客户端-推荐" tabindex="-1"><a class="header-anchor" href="#windows-客户端-推荐" aria-hidden="true">#</a> windows 客户端（推荐）</h2>`,14),z={href:"https://github.com/HelloKittyNII/ZooViewer",target:"_blank",rel:"noopener noreferrer"},g=e("p",null,"将下载的 zooview.zip 解压。",-1),f=e("p",null,"鼠标双击 startup.bat 进行启动",-1),_=e("p",null,"输入 zookeeper 连接：192.16.18.101:2181",-1),w=e("h2",{id:"windows-客户端",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#windows-客户端","aria-hidden":"true"},"#"),n(" windows 客户端")],-1),x={href:"https://issues.apache.org/jira/secure/attachment/12436620/ZooInspector.zip",target:"_blank",rel:"noopener noreferrer"},y=l(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-jar</span> ZooInspector<span class="token punctuation">\\</span>build<span class="token punctuation">\\</span>zookeeper-dev-ZooInspector.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,1);function L(Z,j){const a=t("router-link"),r=t("ExternalLinkIcon");return p(),d("div",null,[o(" more "),e("nav",v,[e("ul",null,[e("li",null,[s(a,{to:"#zookeeper-下载"},{default:i(()=>[n("zookeeper 下载")]),_:1})]),e("li",null,[s(a,{to:"#zookeeper-单机模式"},{default:i(()=>[n("ZooKeeper 单机模式")]),_:1})]),e("li",null,[s(a,{to:"#使用-nc-来向-zk-发送-4-字母命令"},{default:i(()=>[n("使用 nc 来向 zk 发送 4 字母命令")]),_:1})]),e("li",null,[s(a,{to:"#zookeeper-集群模式"},{default:i(()=>[n("zookeeper 集群模式")]),_:1})]),e("li",null,[s(a,{to:"#zookeeper-可视化工具-服务器推荐"},{default:i(()=>[n("zookeeper 可视化工具（服务器推荐）")]),_:1})]),e("li",null,[s(a,{to:"#windows-客户端-推荐"},{default:i(()=>[n("windows 客户端（推荐）")]),_:1})]),e("li",null,[s(a,{to:"#windows-客户端"},{default:i(()=>[n("windows 客户端")]),_:1})])])]),u,k,e("p",null,[n("官网地址："),e("a",b,[n("http://www.apache.org/dyn/closer.cgi/zookeeper/"),s(r)])]),o(" more "),h,e("p",null,[n("下载地址："),e("a",z,[n("https://github.com/HelloKittyNII/ZooViewer"),s(r)])]),g,f,_,w,e("p",null,[n("下载地址："),e("a",x,[n("https://issues.apache.org/jira/secure/attachment/12436620/ZooInspector.zip"),s(r)])]),y])}const T=c(m,[["render",L],["__file","30.zookeeper安装.html.vue"]]);export{T as default};
