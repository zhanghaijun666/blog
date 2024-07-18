import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as c,c as p,e as m,a as n,d as e,w as i,b as s,f as o}from"./app-efa5e96e.js";const d={},v={class:"table-of-contents"},u=o(`<h2 id="主从配置" tabindex="-1"><a class="header-anchor" href="#主从配置" aria-hidden="true">#</a> 主从配置</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> redis.conf
<span class="token comment"># 设置端口</span>
port <span class="token number">6380</span>
<span class="token comment"># replicaof &lt;masterip&gt; &lt;masterport&gt;</span>
<span class="token comment"># 表示当前【从服务器】对应的【主服务器】的IP是192.168.10.135，端口是6379。</span>
<span class="token comment"># 4.0之前只能slaveof 4.0之后默认replicaof，slaveof都起作用</span>
slaveof <span class="token number">127.0</span>.0.1 <span class="token number">6379</span>
replicaof <span class="token number">127.0</span>.0.1 <span class="token number">6379</span>
<span class="token comment"># 主节点挂掉，选举主节点的权重，0标识不选择，越大权重越大</span>
replica-priority <span class="token number">100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看节点主从信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@192 bin<span class="token punctuation">]</span><span class="token comment"># ./redis-cli -p 6379 info|grep role</span>
role:master
<span class="token punctuation">[</span>root@192 bin<span class="token punctuation">]</span><span class="token comment"># ./redis-cli -p 6380 info|grep role</span>
role:slave
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="哨兵" tabindex="-1"><a class="header-anchor" href="#哨兵" aria-hidden="true">#</a> 哨兵</h2>`,5),b={href:"http://www.redis.cn/topics/sentinel.html",target:"_blank",rel:"noopener noreferrer"},k={href:"http://www.redis.cn/topics/sentinel.html",target:"_blank",rel:"noopener noreferrer"},h=o(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> sentinel.conf
<span class="token comment"># 设置端口</span>
port <span class="token number">26379</span>
<span class="token comment"># 是否守护进程启动</span>
daemonize <span class="token function">yes</span>
<span class="token comment"># sentinel monitor &lt;master-name&gt; &lt;ip&gt; &lt;redis-port&gt; &lt;quorum&gt;</span>
<span class="token comment"># 只配置主节点，通过主节点来获取从节点的信息。</span>
<span class="token comment"># ip：最好是客户端可以访问到的ip</span>
<span class="token comment"># quorum：至少多少个哨兵要一致同意，master进程挂掉了，或者slave进程挂掉了，或者要启动一个故障转移操作。</span>
sentinel monitor mymaster <span class="token number">127.0</span>.0.1 <span class="token number">6379</span> <span class="token number">2</span>
<span class="token comment"># sentinel down-after-milliseconds &lt;master-name&gt; &lt;milliseconds&gt;</span>
<span class="token comment"># 超过多少毫秒跟一个redis实例断了连接（ping不通），哨兵就可能认为这个redis实例挂了</span>
sentinel down-after-milliseconds mymaster <span class="token number">30000</span>
<span class="token comment"># sentinel parallel-syncs &lt;master-name&gt; &lt;numreplicas&gt;</span>
<span class="token comment"># 主节点故障迁移以后，从节点一批几个开始迁移</span>
sentinel parallel-syncs mymaster <span class="token number">1</span>
<span class="token comment"># sentinel failover-timeout &lt;master-name&gt; &lt;milliseconds&gt;</span>
<span class="token comment"># 故障迁移，超时时间，超过换一个节点。</span>
sentinel failover-timeout mymaster <span class="token number">180000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>sentinel monitor <span class="token operator">&lt;</span>master-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>ip<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>redis-port<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>quorum<span class="token operator">&gt;</span>
<span class="token comment">#告诉sentinel去监听地址为ip:port的一个master，这里的master-name可以自定义，quorum是一个数字，指明当有多少个sentinel认为一个master失效时，master才算真正失效</span>

sentinel auth-pass <span class="token operator">&lt;</span>master-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>password<span class="token operator">&gt;</span>
<span class="token comment">#设置连接master和slave时的密码，注意的是sentinel不能分别为master和slave设置不同的密码，因此master和slave的密码应该设置相同。</span>

sentinel down-after-milliseconds <span class="token operator">&lt;</span>master-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>milliseconds<span class="token operator">&gt;</span>
<span class="token comment">#这个配置项指定了需要多少失效时间，一个master才会被这个sentinel主观地认为是不可用的。 单位是毫秒，默认为30秒</span>

sentinel parallel-syncs <span class="token operator">&lt;</span>master-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>numslaves<span class="token operator">&gt;</span> 
<span class="token comment">#这个配置项指定了在发生failover主备切换时最多可以有多少个slave同时对新的master进行 同步，这个数字越小，完成failover所需的时间就越长，但是如果这个数字越大，就意味着越 多的slave因为replication而不可用。可以通过将这个值设为 1 来保证每次只有一个slave 处于不能处理命令请求的状态。</span>

sentinel failover-timeout <span class="token operator">&lt;</span>master-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>milliseconds<span class="token operator">&gt;</span>
<span class="token comment">#failover-timeout 可以用在以下这些方面：    </span>
<span class="token comment">#1. 同一个sentinel对同一个master两次failover之间的间隔时间。  </span>
<span class="token comment">#2. 当一个slave从一个错误的master那里同步数据开始计算时间。直到slave被纠正为向正确的master那里同步数据时。   </span>
<span class="token comment">#3.当想要取消一个正在进行的failover所需要的时间。   </span>
<span class="token comment">#4.当进行failover时，配置所有slaves指向新的master所需的最大时间。不过，即使过了这个超时，slaves依然会被正确配置为指向master，但是就不按parallel-syncs所配置的规则来了。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="在从节点中选择新的主节点" tabindex="-1"><a class="header-anchor" href="#在从节点中选择新的主节点" aria-hidden="true">#</a> 在从节点中选择新的主节点</h4><ol><li>过滤掉主观下线的节点</li><li>选择 slave-priority/ replica-priority 最高的节点，（replica-priority 0 的不选择）如果由则返回没有就继续选择</li><li>选择出复制偏移量最大的系节点，因为复制偏移量越大则数据复制的越完整，如果由就返回了，没有就继续</li><li>选择 run_id 最小的节点</li></ol><h4 id="更新主从状态" tabindex="-1"><a class="header-anchor" href="#更新主从状态" aria-hidden="true">#</a> 更新主从状态</h4><blockquote><p>通过 <code>slaveof no one</code> 命令，让选出来的从节点成为主节点；并通过 <code>slaveof</code> 命令让其他节点成为其从节 点。</p><p>当其回复正常时，将已下线的主节点设置成新的主节点的从节点，复制新的主节点，变成新的主节点的从节点</p></blockquote>`,6);function f(g,_){const a=t("router-link"),l=t("ExternalLinkIcon");return c(),p("div",null,[m(" more "),n("nav",v,[n("ul",null,[n("li",null,[e(a,{to:"#主从配置"},{default:i(()=>[s("主从配置")]),_:1})]),n("li",null,[e(a,{to:"#哨兵"},{default:i(()=>[s("哨兵")]),_:1})])])]),u,n("p",null,[n("a",b,[s("中文官网"),e(l)]),s("："),n("a",k,[s("http://www.redis.cn/topics/sentinel.html"),e(l)])]),h])}const y=r(d,[["render",f],["__file","40.Redis高并发应用.html.vue"]]);export{y as default};
