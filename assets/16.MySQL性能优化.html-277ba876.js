import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as i,c as t,e as r,a as n,d as a,w as e,f as c,b as o}from"./app-efa5e96e.js";const d={},k={class:"table-of-contents"},u=c(`<h2 id="慢查询日志" tabindex="-1"><a class="header-anchor" href="#慢查询日志" aria-hidden="true">#</a> 慢查询日志</h2><p>MySQL 的慢查询日志功能默认是关闭的，需要手动开启。</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 查询是否开启了慢查询，默认是关闭</span>
<span class="token keyword">show</span> variables <span class="token operator">like</span> <span class="token string">&#39;%slow_query%&#39;</span><span class="token punctuation">;</span>
<span class="token comment">-- slow_query_log：是否开启慢查询日志，1为开启，0为关闭。</span>
<span class="token comment">-- slow-query-log-file：MySQL数据库慢查询日志存储路径。</span>

<span class="token comment">-- 慢查询阈值，当查询时间多于设定的阈值时，记录日志，【单位为秒】</span>
<span class="token keyword">show</span> variables <span class="token operator">like</span> <span class="token string">&#39;%long_query_time%&#39;</span><span class="token punctuation">;</span>

<span class="token comment">-- 临时开启慢查询功能重启MySQL的话将失效</span>
<span class="token keyword">set</span> <span class="token keyword">global</span> slow_query_log <span class="token operator">=</span> <span class="token keyword">ON</span><span class="token punctuation">;</span>
<span class="token keyword">set</span> <span class="token keyword">global</span> long_query_time <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment">-- 永久开启慢查询功能</span>
vi <span class="token operator">/</span>etc<span class="token operator">/</span>my<span class="token punctuation">.</span>cnf 中配置如下
<span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>
slow_query_log<span class="token operator">=</span><span class="token keyword">ON</span>
long_query_time<span class="token operator">=</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="慢查询日志的工具" tabindex="-1"><a class="header-anchor" href="#慢查询日志的工具" aria-hidden="true">#</a> 慢查询日志的工具</h2><p>mysqldumpslow 是 MySQL 自带的慢查询日志工具</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mysqldumpslow <span class="token parameter variable">-s</span> t <span class="token parameter variable">-t</span> <span class="token number">10</span> <span class="token parameter variable">-g</span> <span class="token string">&quot;left join&quot;</span> /var/lib/mysql/slow.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>-s：是表示按照何种方式排序<br><br> al 平均锁定时间<br><br> ar 平均返回记录时间<br><br> at 平均查询时间（默认）<br><br> c 计数<br><br> l 锁定时间<br><br> r 返回记录<br><br> t 查询时间<br></li><li>-t：是 top n 的意思，即为返回前面多少条的数据</li><li>-g：后边可以写一个正则匹配模式，大小写不敏感的</li></ul><h2 id="查看执行计划" tabindex="-1"><a class="header-anchor" href="#查看执行计划" aria-hidden="true">#</a> 查看执行计划</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>mysql<span class="token operator">&gt;</span> <span class="token keyword">EXPLAIN</span> <span class="token keyword">SELECT</span> t1<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token punctuation">(</span> <span class="token keyword">SELECT</span> t<span class="token punctuation">.</span>name<span class="token punctuation">,</span> t<span class="token punctuation">.</span>address <span class="token keyword">FROM</span> tuser t <span class="token keyword">WHERE</span> age <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token keyword">SELECT</span> age <span class="token keyword">FROM</span> tuser <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">1</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span> t1<span class="token punctuation">;</span>
<span class="token operator">+</span><span class="token comment">----+-------------+-------+------------+-------+---------------+---------+---------+-------+------+----------+-------------+</span>
<span class="token operator">|</span> id <span class="token operator">|</span> select_type <span class="token operator">|</span> <span class="token keyword">table</span> <span class="token operator">|</span> partitions <span class="token operator">|</span> <span class="token keyword">type</span>  <span class="token operator">|</span> possible_keys <span class="token operator">|</span> <span class="token keyword">key</span>     <span class="token operator">|</span> key_len <span class="token operator">|</span> ref   <span class="token operator">|</span> <span class="token keyword">rows</span> <span class="token operator">|</span> filtered <span class="token operator">|</span> Extra       <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----+-------------+-------+------------+-------+---------------+---------+---------+-------+------+----------+-------------+</span>
<span class="token operator">|</span>  <span class="token number">1</span> <span class="token operator">|</span> <span class="token keyword">PRIMARY</span>     <span class="token operator">|</span> t     <span class="token operator">|</span> <span class="token boolean">NULL</span>       <span class="token operator">|</span> <span class="token keyword">ALL</span>   <span class="token operator">|</span> <span class="token boolean">NULL</span>          <span class="token operator">|</span> <span class="token boolean">NULL</span>    <span class="token operator">|</span> <span class="token boolean">NULL</span>    <span class="token operator">|</span> <span class="token boolean">NULL</span>  <span class="token operator">|</span>    <span class="token number">5</span> <span class="token operator">|</span>    <span class="token number">20.00</span> <span class="token operator">|</span> <span class="token keyword">Using</span> <span class="token keyword">where</span> <span class="token operator">|</span>
<span class="token operator">|</span>  <span class="token number">3</span> <span class="token operator">|</span> SUBQUERY    <span class="token operator">|</span> tuser <span class="token operator">|</span> <span class="token boolean">NULL</span>       <span class="token operator">|</span> const <span class="token operator">|</span> <span class="token keyword">PRIMARY</span>       <span class="token operator">|</span> <span class="token keyword">PRIMARY</span> <span class="token operator">|</span> <span class="token number">4</span>       <span class="token operator">|</span> const <span class="token operator">|</span>    <span class="token number">1</span> <span class="token operator">|</span>   <span class="token number">100.00</span> <span class="token operator">|</span> <span class="token boolean">NULL</span>        <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">----+-------------+-------+------------+-------+---------------+---------+---------+-------+------+----------+-------------+</span>
<span class="token number">2</span> <span class="token keyword">rows</span> <span class="token operator">in</span> <span class="token keyword">set</span><span class="token punctuation">,</span> <span class="token number">1</span> warning <span class="token punctuation">(</span><span class="token number">0.00</span> sec<span class="token punctuation">)</span>

<span class="token comment">-- id</span>
    <span class="token keyword">SELECT</span>查询的标识符。每个<span class="token keyword">SELECT</span>都会自动分配一个唯一的标识符。
    id相同，执行顺序由上到下，id越大，优先级越高。
<span class="token comment">-- select_type（重要）</span>
    单位查询的查询类型，比如：普通查询、联合查询<span class="token punctuation">(</span><span class="token keyword">union</span>、<span class="token keyword">union</span> <span class="token keyword">all</span><span class="token punctuation">)</span>、子查询等复杂查询。
    <span class="token operator">-</span> <span class="token keyword">primary</span>：一个需要<span class="token keyword">union</span>操作或者含有子查询的<span class="token keyword">select</span>，位于最外层的单位查询的select_type
    <span class="token operator">-</span> <span class="token keyword">union</span>：<span class="token keyword">union</span>连接的两个<span class="token keyword">select</span>查询，第一个查询是dervied派生表，除了第一个表外，第二个以后的表select_type都是<span class="token keyword">union</span>
    <span class="token operator">-</span> dependent <span class="token keyword">union</span>：与<span class="token keyword">union</span>一样，出现在<span class="token keyword">union</span> 或<span class="token keyword">union</span> <span class="token keyword">all</span>语句中，但是这个查询要受到外部查询的影响
    <span class="token operator">-</span> <span class="token keyword">union</span> result：包含<span class="token keyword">union</span>的结果集，在<span class="token keyword">union</span>和<span class="token keyword">union</span> <span class="token keyword">all</span>语句中<span class="token punctuation">,</span>因为它不需要参与查询，所以id字段为<span class="token boolean">null</span>
    <span class="token operator">-</span> subquery：除了<span class="token keyword">from</span>字句中包含的子查询外，其他地方出现的子查询都可能是subquery
    <span class="token operator">-</span> dependent subquery：与dependent <span class="token keyword">union</span>类似，表示这个subquery的查询要受到外部表查询的影响
    <span class="token operator">-</span> derived：<span class="token keyword">from</span>字句中出现的子查询，也叫做派生表，其他数据库中可能叫做内联视图或嵌套<span class="token keyword">select</span>
<span class="token comment">-- table</span>
    如果查询使用了别名，那么这里显示的是别名
    如果不涉及对数据表的操作，那么这显示为<span class="token boolean">null</span>
    如果显示为尖括号括起来的就表示这个是临时表，后边的N就是执行计划中的id，表示结果来自于这个查询产生。
    如果是尖括号括起来的<span class="token operator">&lt;</span><span class="token keyword">union</span> M<span class="token punctuation">,</span>N<span class="token operator">&gt;</span>，与类似，也是一个临时表，表示这个结果来自于<span class="token keyword">union</span>查询的id为M<span class="token punctuation">,</span>N的结果集。
<span class="token comment">-- partitions</span>
    使用的哪些分区（对于非分区表值为<span class="token boolean">null</span>）。
<span class="token comment">-- type（重要）</span>
    显示的是单位查询的连接类型或者理解为访问类型，访问性能依次从好到差：
    system <span class="token operator">&gt;</span> const eq_ref <span class="token operator">&gt;</span> ref <span class="token operator">&gt;</span> fulltext <span class="token operator">&gt;</span> ref_or_null <span class="token operator">&gt;</span> unique_subquery <span class="token operator">&gt;</span> index_subquery <span class="token operator">&gt;</span> range <span class="token operator">&gt;</span> index_merge <span class="token operator">&gt;</span> <span class="token keyword">index</span> <span class="token operator">&gt;</span> <span class="token keyword">ALL</span>
    <span class="token operator">-</span> 除了<span class="token keyword">all</span>之外，其他的<span class="token keyword">type</span>都可以使用到索引
    <span class="token operator">-</span> 除了index_merge之外，其他的<span class="token keyword">type</span>只可以用到一个索引
    <span class="token operator">-</span> 最少要使用到range级别
<span class="token comment">-- possible_keys</span>
    此次查询中可能选用的索引，一个或多个
<span class="token comment">-- key</span>
    此次查询中确切使用到的索引<span class="token punctuation">.</span>
<span class="token comment">-- key_len</span>
    key_len越小 索引效果越好。
<span class="token comment">-- ref</span>
    如果是使用的常数等值查询，这里会显示const
    如果是连接查询，被驱动表的执行计划这里会显示驱动表的关联字段
    如果是条件使用了表达式或者函数，或者条件列发生了内部隐式转换，这里可能显示为func
<span class="token comment">-- rows</span>
    显示此查询一共扫描了多少行<span class="token punctuation">.</span> 这个是一个估计值<span class="token punctuation">.</span>
<span class="token comment">-- filtered</span>
    表示此查询条件所过滤的数据的百分比
<span class="token comment">-- extra（重要）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="profile-分析语句" tabindex="-1"><a class="header-anchor" href="#profile-分析语句" aria-hidden="true">#</a> profile 分析语句</h2><blockquote><p>是 MySQL 自带的一种 query 诊断分析工具，通过它可以分析出一条 SQL 语句的硬件性能瓶颈在什么地方。</p><p>默认的情况下，MYSQL 的该功能没有打开，需要自己手动启动。</p></blockquote><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 查看是否开启了Profile功能，两个都行。</span>
<span class="token keyword">select</span> @<span class="token variable">@profiling</span><span class="token punctuation">;</span>
<span class="token keyword">show</span> variables <span class="token operator">like</span> <span class="token string">&#39;%profil%&#39;</span><span class="token punctuation">;</span>
<span class="token comment">-- 开启profile功能，1是开启、0是关闭</span>
<span class="token keyword">set</span> profiling<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment">-- 显示当前会话的资源使用情况</span>
<span class="token keyword">show</span> profiles<span class="token punctuation">;</span>
<span class="token keyword">show</span> profile<span class="token punctuation">;</span>
<span class="token comment">-- 查看\`show profiles\`结果中第二条语句的执行情况</span>
<span class="token keyword">show</span> profile <span class="token keyword">for</span> query <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token comment">-- 指定资源类型查询</span>
<span class="token keyword">show</span> profile cpu<span class="token punctuation">,</span>swaps <span class="token keyword">for</span> query <span class="token number">2</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="系统参数优化" tabindex="-1"><a class="header-anchor" href="#系统参数优化" aria-hidden="true">#</a> 系统参数优化</h2><ul><li><p>缓冲区优化<br> 设置<code>innodb_buffer_pool_size</code>建议为总内存大小的 3/4 或者 4/5。</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 查看innodb_buffer_pool_size的使用情况</span>
<span class="token keyword">show</span> <span class="token keyword">global</span> <span class="token keyword">status</span> <span class="token operator">like</span> <span class="token string">&#39;innodb_buffer_pool_pages_%&#39;</span><span class="token punctuation">;</span>
<span class="token comment">-- Innodb_buffer_pool_pages_free为0，则表示buffer_pool已经被用光了。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>降低磁盘写入次数</p><ul><li>对于生产环境来说，很多日志是不需要开启的，比如：通用查询日志、慢查询日志、错误日志</li><li>使用足够大的写入缓存 innodb_log_file_size，推荐设置为 0.25 * innodb_buffer_pool_size</li><li>设置合适的 innodb_flush_log_at_trx_commit，和日志落盘有关系。</li></ul></li><li><p>MySQL 数据库配置优化</p><ul><li><code>innodb_buffer_pool_size</code><br>缓冲池字节大小推荐值为物理内存的 50%~80%。</li><li><code>innodb_flush_log_at_trx_commit=1</code><br>来控制 redo log 刷新到磁盘的策略。</li><li><code>sync_binlog=1</code><br>每提交 1 次事务同步写到磁盘中，可以设置为 n。</li><li><code>innodb_max_dirty_pages_pct=30</code><br>脏页占 innodb_buffer_pool_size 的比例时，触发刷脏页到磁盘。 推荐值为 25%~50%。</li><li><code>innodb_io_capacity=200</code><br>后台进程最大 IO 性能指标。默认 200，如果 SSD，调整为 5000~20000</li><li><code>innodb_data_file_path</code><br>指定 innodb 共享表空间文件的大小。</li><li><code>long_qurey_time=0.3</code><br>慢查询日志的阈值设置，单位秒。</li><li><code>binlog_format=row</code><br>mysql 复制的形式，row 为 MySQL8.0 的默认形式。</li><li><code>max_connections=200</code><br>调高该参数则应降低 interactive_timeout、wait_timeout 的值。</li><li><code>innodb_log_file_size</code><br>过大，实例恢复时间长；过小，造成日志切换频繁。</li><li><code>general_log=0</code><br>全量日志建议关闭。默认关闭。</li></ul></li><li><p>操作系统优化</p><ul><li><p>内核参数优化</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/sysctl.conf <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
# 增加监听队列上限：
net.core.somaxconn = 65535
net.core.netdev_max_backlog = 65535
net.ipv4.tcp_max_syn_backlog = 65535

# 加快TCP连接的回收：
net.ipv4.tcp_fin_timeout = 10
net.ipv4.tcp_tw_reuse = 1
net.ipv4.tcp_tw_recycle = 1

# TCP连接接收和发送缓冲区大小的默认值和最大值:
net.core.wmem_default = 87380
net.core.wmem_max = 16777216
net.core.rmem_default = 87380
net.core.rmem_max = 16777216

# 减少失效连接所占用的TCP资源的数量，加快资源回收的效率：
net.ipv4.tcp_keepalive_time = 120
net.ipv4.tcp_keepalive_intvl = 30
net.ipv4.tcp_keepalive_probes = 3

# 单个共享内存段的最大值：
kernel.shmmax = 4294967295

# 控制换出运行时内存的相对权重：
vm.swappiness = 0
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>增加资源限制</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 配置将可打开的文件数量增加到65535个，以保证可以打开足够多的文件句柄。重启系统才能生效。</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/security/limit.conf <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
# *：表示对所有用户有效
# soft：表示当前系统生效的设置（soft不能大于hard ）
# hard：表明系统中所能设定的最大值
# nofile：表示所限制的资源是打开文件的最大数目
# 65535：限制的数量
* soft nofile 65535
* hard nofile 65535
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>磁盘调度策略</p></li><li><p>硬件优化</p></li></ul></li></ul>`,14);function v(m,b){const s=p("router-link");return i(),t("div",null,[r(" more "),n("nav",k,[n("ul",null,[n("li",null,[a(s,{to:"#慢查询日志"},{default:e(()=>[o("慢查询日志")]),_:1})]),n("li",null,[a(s,{to:"#慢查询日志的工具"},{default:e(()=>[o("慢查询日志的工具")]),_:1})]),n("li",null,[a(s,{to:"#查看执行计划"},{default:e(()=>[o("查看执行计划")]),_:1})]),n("li",null,[a(s,{to:"#profile-分析语句"},{default:e(()=>[o("profile 分析语句")]),_:1})]),n("li",null,[a(s,{to:"#系统参数优化"},{default:e(()=>[o("系统参数优化")]),_:1})])])]),u])}const w=l(d,[["render",v],["__file","16.MySQL性能优化.html.vue"]]);export{w as default};
