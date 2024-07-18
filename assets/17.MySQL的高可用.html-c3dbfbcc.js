import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as p,c,e as d,a as s,d as a,w as l,b as n,f as t}from"./app-efa5e96e.js";const m={},v={class:"table-of-contents"},u=s("h2",{id:"基于-binlog-的主从同步",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#基于-binlog-的主从同步","aria-hidden":"true"},"#"),n(" 基于 binlog 的主从同步")],-1),b=s("blockquote",null,[s("p",null,[n("主 master : 192.16.18.101 : MySQL5.7"),s("br"),n(" 从 slave : 192.16.18.102 : MySQL5.7"),s("br"),n(" 关闭防火墙：systemctl stop iptables && systemctl stop firewalld && systemctl disable firewalld.service")]),s("details",{class:"hint-container details"},[s("summary",null,"主 master 的配置文件 my.conf")])],-1),k=s("div",{class:"language-conf line-numbers-mode","data-ext":"conf"},[s("pre",{conf:"",class:"language-conf"},[s("code",null,`[mysqld]
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
symbolic-links=0
log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid
# 0：大小写敏感 1：大小写不敏感
lower_case_table_names=1
character-set-server=utf8
default-time_zone = '+8:00'
# 服务器ID，注意要唯一
server-id=101
# 启动二进制文件(主机需要打开)，这个mysql-bin 可自定义，也可加上路径
log-bin=mysql-bin
# binlog刷盘策略
sync_binlog=1
# 需要备份的数据库
binlog-do-db=hello
# 不需要备份的数据库（多个写多行）
binlog-ignore-db=mysql
binlog-ignore-db=information_schema
binlog-ignore-db=performance_schema
# 主从复制的格式（mixed|statement|row），默认格式是statement
binlog_format=statement
# 二进制日志自动删除/过期的天数。默认值为0，表示不自动删除。
expire_logs_days=7
# 跳过主从复制中遇到的所有错误或指定类型的错误，避免slave端复制中断。1062错误是指一些主键重复
slave_skip_errors=1062

[client]
port=3306
user=root
password=123456
default-character-set=utf8
`)]),s("div",{class:"highlight-lines"},[s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("div",{class:"highlight-line"}," "),s("br"),s("div",{class:"highlight-line"}," "),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br")]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),h=s("p",null,":::",-1),g=s("details",{class:"hint-container details"},[s("summary",null,"从 slave 的配置文件 my.conf"),s("div",{class:"language-conf line-numbers-mode","data-ext":"conf"},[s("pre",{conf:"",class:"language-conf"},[s("code",null,`[mysqld]
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
symbolic-links=0
log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid
# 0：大小写敏感 1：大小写不敏感
lower_case_table_names=1
character-set-server=utf8
default-time_zone = '+8:00'
# 服务器ID，注意要唯一
server-id=102
[client]
port=3306
user=root
password=123456
default-character-set=utf8
`)]),s("div",{class:"highlight-lines"},[s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("br"),s("div",{class:"highlight-line"}," "),s("br"),s("br"),s("br"),s("br"),s("br")]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])])],-1),y=t(`<div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 主master</span>
<span class="token comment">-- 设置密码长度最低位数</span>
<span class="token keyword">set</span> <span class="token keyword">global</span> validate_password_length<span class="token operator">=</span><span class="token number">4</span><span class="token punctuation">;</span>
<span class="token comment">-- 设置密码强度级别</span>
<span class="token keyword">set</span> <span class="token keyword">global</span> validate_password_policy<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
<span class="token comment">-- 主节点，创建用户\`rep1\`并授权用户</span>
<span class="token keyword">GRANT</span> <span class="token keyword">REPLICATION</span> SLAVE <span class="token keyword">ON</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">to</span> <span class="token string">&#39;rep1&#39;</span><span class="token variable">@&#39;192.16.18.102&#39;</span> identified <span class="token keyword">by</span> <span class="token string">&#39;123456&#39;</span><span class="token punctuation">;</span>
<span class="token comment">-- 刷新权限</span>
FLUSH <span class="token keyword">PRIVILEGES</span><span class="token punctuation">;</span>
<span class="token comment">-- 查看binlog的日志模式，binlog的三种格式：·STATEMENT· 、·ROW· 、·MIXED·</span>
<span class="token keyword">show</span> variables <span class="token operator">like</span> <span class="token string">&#39;binlog_format&#39;</span><span class="token punctuation">;</span>
<span class="token comment">-- 设置binlog的日志模式为·STATEMENT·</span>
<span class="token comment">--set binlog_format=STATEMENT;</span>
<span class="token comment">-- 查看master节点状态</span>
<span class="token keyword">show</span> master <span class="token keyword">status</span><span class="token punctuation">;</span>

<span class="token comment">-- 从slave</span>
<span class="token comment">-- 同步master节点，master_log_file和master_log_pos为master执行\`show master status\`的结果。</span>
change master <span class="token keyword">to</span> master_host<span class="token operator">=</span><span class="token string">&#39;192.16.18.101&#39;</span><span class="token punctuation">,</span> master_port<span class="token operator">=</span><span class="token number">3306</span><span class="token punctuation">,</span> master_user<span class="token operator">=</span><span class="token string">&#39;rep1&#39;</span><span class="token punctuation">,</span> master_password<span class="token operator">=</span><span class="token string">&#39;123456&#39;</span><span class="token punctuation">,</span> master_log_file<span class="token operator">=</span><span class="token string">&#39;mysql-bin.000001&#39;</span><span class="token punctuation">,</span> master_log_pos<span class="token operator">=</span><span class="token number">2157</span><span class="token punctuation">,</span> MASTER_AUTO_POSITION<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
<span class="token comment">-- 启动从服务器复制功能</span>
<span class="token keyword">start</span> slave<span class="token punctuation">;</span>
<span class="token comment">-- 停止从服务器复制功能</span>
stop slave<span class="token punctuation">;</span>
<span class="token comment">-- 检查从服务器复制功能状态</span>
<span class="token keyword">show</span> slave <span class="token keyword">status</span> \\G<span class="token punctuation">;</span>
<span class="token comment">-- Slave_IO_Running: Yes</span>
<span class="token comment">-- Slave_SQL_Running: Yes     两个都为·Yes·表示同步成功。</span>
<span class="token comment">-- Seconds_Behind_Master: 0   判断主从延迟，0是正常，NULL表示io_thread或是sql_thread有一个发生故障</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看bin log和relay log日志</span>
mysqlbinlog --base64-output<span class="token operator">=</span>decode-rows <span class="token parameter variable">-v</span> <span class="token parameter variable">-v</span> mysql-bin.000058 <span class="token operator">&gt;</span> binlog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="atlas-读写分离" tabindex="-1"><a class="header-anchor" href="#atlas-读写分离" aria-hidden="true">#</a> Atlas 读写分离</h2>`,3),_={href:"https://github.com/Qihoo360/Atlas/blob/master/README_ZH.md",target:"_blank",rel:"noopener noreferrer"},f=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 下载安装</span>
<span class="token function">wget</span> https://github.com/Qihoo360/Atlas/releases/download/2.2.1/Atlas- <span class="token number">2.2</span>.1.el6.x86_64.rpm
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> Atlas-2.2.1.el6.x86_64.rpm
<span class="token comment"># 安装好了，它会默认在”/usr/local/mysql-proxy”下给你生成4个文件夹，以及需要配置的文件 bin|conf|lib|log</span>

<span class="token comment"># 进入bin目录，使用encrypt来对数据库的密码进行加密</span>
<span class="token builtin class-name">cd</span> /usr/local/mysql-proxy/bin <span class="token operator">&amp;&amp;</span> ./encrypt root
<span class="token comment"># 配置Atlas，使用vim进行编辑，配置如下</span>
<span class="token function">vi</span> /usr/local/mysql-proxy/conf/test.cnf
<span class="token comment"># 登录到Atlas的管理员的账号与密码</span>
admin-username <span class="token operator">=</span> admin
admin-password <span class="token operator">=</span> admin
<span class="token comment"># 配置主数据的地址与从数据库的地址</span>
<span class="token comment"># Atlas后端连接的MySQL主库的IP和端口，可设置多项，用逗号分隔</span>
proxy-backend-addresses <span class="token operator">=</span> <span class="token number">192.16</span>.18.101:3306
<span class="token comment"># Atlas后端连接的MySQL从库的IP和端口，@后面的数字代表权重，用来作负载均衡，若省略则默 认为1，可设置多项，用逗号分隔</span>
proxy-read-only-backend-addresses <span class="token operator">=</span> <span class="token number">192.16</span>.18.101:3306@1,192.16.18.102:3306@2
<span class="token comment"># 配置密码，密码为上面\`./encrypt root\`的结果</span>
pwds <span class="token operator">=</span> root:DAJnl8cVzy8<span class="token operator">=</span>
<span class="token comment"># Atlas监听的工作接口IP和端口</span>
proxy-address <span class="token operator">=</span> <span class="token number">0.0</span>.0.0:1234
<span class="token comment"># Atlas监听的管理接口IP和端口</span>
admin-address <span class="token operator">=</span> <span class="token number">0.0</span>.0.0:2345

<span class="token comment"># 启动Atlas</span>
./mysql-proxyd <span class="token builtin class-name">test</span> start
<span class="token comment"># 进入管理模式，则说明Atlas正常运行</span>
mysql <span class="token parameter variable">-h127.0.0.1</span> <span class="token parameter variable">-P2345</span> <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123456</span>
<span class="token comment"># 查看MySQL管理员模式都能做些什么</span>
<span class="token keyword">select</span> * from <span class="token builtin class-name">help</span><span class="token punctuation">;</span>

<span class="token comment"># 读写分离的测试</span>
mysql <span class="token parameter variable">-h127.0.0.1</span> <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123456</span> <span class="token parameter variable">-P1234</span> <span class="token parameter variable">--protocol</span><span class="token operator">=</span>tcp -e&quot;select @@hostname
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="双节点主从-keepalived-heartbeat-方案" tabindex="-1"><a class="header-anchor" href="#双节点主从-keepalived-heartbeat-方案" aria-hidden="true">#</a> 双节点主从 + keepalived/heartbeat 方案</h2><p>这种架构是最省事。利用 keepalived/heartbeat 的高可用机制实现快速切换到 slave 节点。</p><p>需要注意一下：</p><ul><li>自增 ID 的冲突。</li><li>slave 节点服务器配置不要太差，否则更容易导致复制延迟。</li><li>keepalived 的检测机制需要适当完善。</li><li>keepalived 最终确定进行切换时，还需要判断 slave 的延迟程度。</li><li>keepalived 或 heartbeat 自身都无法解决脑裂的问题。</li></ul><h2 id="docker-启动-master-数据库" tabindex="-1"><a class="header-anchor" href="#docker-启动-master-数据库" aria-hidden="true">#</a> docker 启动 master 数据库</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">3316</span>:3306 <span class="token parameter variable">--name</span> mysql-master <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /Users/edz/data/mysql/master/log:/var/log/mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /Users/edz/data/mysql/master/data:/var/lib/mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /Users/edz/data/mysql/master/conf:/etc/mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-d</span> mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-启动从节点数据库" tabindex="-1"><a class="header-anchor" href="#docker-启动从节点数据库" aria-hidden="true">#</a> docker 启动从节点数据库</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">3326</span>:3306 <span class="token parameter variable">--name</span> mysql-slave-01 <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /Users/edz/data/mysql/slave01/log:/var/log/mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /Users/edz/data/mysql/slave01/data:/var/lib/mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /Users/edz/data/mysql/slave01/conf:/etc/mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-d</span> mysql:5.7

<span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">3336</span>:3306 <span class="token parameter variable">--name</span> mysql-slave-02 <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /Users/edz/data/mysql/slave02/log:/var/log/mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /Users/edz/data/mysql/slave02/data:/var/lib/mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /Users/edz/data/mysql/slave02/conf:/etc/mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-d</span> mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mysql-主从复制操作" tabindex="-1"><a class="header-anchor" href="#mysql-主从复制操作" aria-hidden="true">#</a> MySQL 主从复制操作</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## master中操作</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> master mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123456</span>
<span class="token comment">## 开放root访问权限</span>
SELECT host, user FROM mysql.user<span class="token punctuation">;</span>
grant all privileges on *.* to <span class="token string">&#39;root&#39;</span>@<span class="token string">&#39;%&#39;</span> identified by <span class="token string">&#39;123456&#39;</span> with grant option<span class="token punctuation">;</span>
<span class="token comment">## 刷新权限</span>
flush privileges<span class="token punctuation">;</span>
<span class="token comment">## 创建用户</span>
GRANT REPLICATION SLAVE ON *.* TO <span class="token string">&#39;slave&#39;</span>@<span class="token string">&#39;%&#39;</span> IDENTIFIED BY <span class="token string">&#39;123456&#39;</span><span class="token punctuation">;</span>
<span class="token comment">## 查看主节点的状态，其中File 列需要记录下来：</span>
SHOW MASTER STATUS<span class="token punctuation">;</span>


<span class="token comment">## slave中操作</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> mysql-slave-01 mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123456</span>
<span class="token comment">## 开放root访问权限</span>
SELECT host, user FROM mysql.user<span class="token punctuation">;</span>
grant all privileges on *.* to <span class="token string">&#39;root&#39;</span>@<span class="token string">&#39;%&#39;</span> identified by <span class="token string">&#39;123456&#39;</span> with grant option<span class="token punctuation">;</span>
<span class="token comment">## 刷新权限</span>
flush privileges<span class="token punctuation">;</span>
<span class="token comment">## slave中指向master 注意这里的 bedrock-db-master.bedrock-cloud 和 mysql-bin.000003 ，都是上面主节点中的：</span>
CHANGE MASTER TO <span class="token assign-left variable">MASTER_HOST</span><span class="token operator">=</span><span class="token string">&#39;bedrock-db-master.bedrock-cloud&#39;</span>,MASTER_USER<span class="token operator">=</span><span class="token string">&#39;slave&#39;</span>,MASTER_PASSWORD<span class="token operator">=</span><span class="token string">&#39;123456&#39;</span>,MASTER_LOG_FILE<span class="token operator">=</span><span class="token string">&#39;mysql-bin.000003&#39;</span>,MASTER_LOG_POS<span class="token operator">=</span><span class="token number">0</span>,MASTER_PORT<span class="token operator">=</span><span class="token number">3306</span><span class="token punctuation">;</span>
<span class="token comment">## 开始同步</span>
start slave<span class="token punctuation">;</span>
<span class="token comment">## 查看同步的状态： Slave_IO_Running: Yes Slave_SQL_Running: Yes 即可</span>
show slave status<span class="token punctuation">\\</span>G<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11);function q(S,A){const e=i("router-link"),r=i("ExternalLinkIcon");return p(),c("div",null,[d(" more "),s("nav",v,[s("ul",null,[s("li",null,[a(e,{to:"#基于-binlog-的主从同步"},{default:l(()=>[n("基于 binlog 的主从同步")]),_:1})]),s("li",null,[a(e,{to:"#atlas-读写分离"},{default:l(()=>[n("Atlas 读写分离")]),_:1})]),s("li",null,[a(e,{to:"#双节点主从-keepalived-heartbeat-方案"},{default:l(()=>[n("双节点主从 + keepalived/heartbeat 方案")]),_:1})]),s("li",null,[a(e,{to:"#docker-启动-master-数据库"},{default:l(()=>[n("docker 启动 master 数据库")]),_:1})]),s("li",null,[a(e,{to:"#docker-启动从节点数据库"},{default:l(()=>[n("docker 启动从节点数据库")]),_:1})]),s("li",null,[a(e,{to:"#mysql-主从复制操作"},{default:l(()=>[n("MySQL 主从复制操作")]),_:1})])])]),u,b,k,h,g,y,s("p",null,[n("官方文档："),s("a",_,[n("https://github.com/Qihoo360/Atlas/blob/master/README_ZH.md"),a(r)])]),f])}const T=o(m,[["render",q],["__file","17.MySQL的高可用.html.vue"]]);export{T as default};
