import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as c,c as o,e as r,a as n,d as e,w as l,b as s,f as p}from"./app-efa5e96e.js";const m={},v={class:"table-of-contents"},u=n("h2",{id:"简介",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#简介","aria-hidden":"true"},"#"),s(" 简介")],-1),b={href:"https://docs.ceph.com/en/latest/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://access.redhat.com/documentation/zh-cn/red_hat_ceph_storage/5/html/architecture_guide/index",target:"_blank",rel:"noopener noreferrer"},k=p(`<blockquote><p>Ceph 是一个统一的分布式存储系统，设计初衷是提供较好的性能、可靠性和可扩展性。</p><p>特点：高性能、高可用性、高可扩展性、特性丰富</p></blockquote><h2 id="ceph-三种存储类型" tabindex="-1"><a class="header-anchor" href="#ceph-三种存储类型" aria-hidden="true">#</a> Ceph 三种存储类型</h2><table><thead><tr><th>存储类型</th><th>特征</th><th>应用场景</th><th>典型设备</th></tr></thead><tbody><tr><td>块存储（RBD）</td><td>存储速度较快<br>不支持共享存储 [<strong>ReadWriteOnce</strong>]</td><td>虚拟机硬盘</td><td>硬盘<br>Raid</td></tr><tr><td>文件存储（CephFS）</td><td>存储速度慢（需经操作系统处理再转为块存储）<br>支持共享存储 [<strong>ReadWriteMany</strong>]</td><td>文件共享</td><td>FTP<br>NFS</td></tr><tr><td>对象存储（Object）</td><td>具备块存储的读写性能和文件存储的共享特性<br>操作系统不能直接访问，只能通过应用程序级别的 API 访问</td><td>图片存储<br>视频存储</td><td>OSS</td></tr></tbody></table><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2><h3 id="集群命令" tabindex="-1"><a class="header-anchor" href="#集群命令" aria-hidden="true">#</a> 集群命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 检查ceph的状态(常用)</span>
ceph <span class="token parameter variable">-s</span>
ceph status
ceph health
ceph health detail
<span class="token comment">## 实时观察集群健康状态(常用)</span>
ceph <span class="token parameter variable">-w</span>
<span class="token comment">## 查看ceph存储空间</span>
ceph <span class="token function">df</span>

<span class="token comment">## 查看ceph集群中的认证用户及相关的key(常用)</span>
ceph auth list
<span class="token comment">## 查看某一用户详细信息</span>
ceph auth get client.admin
<span class="token comment">## 只查看用户的key信息</span>
ceph auth print-key client.admin

<span class="token comment">## 查看ceph log日志所在的目录</span>
ceph-conf <span class="token parameter variable">--name</span> mon.node1 --show-config-value log_file
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mon-命令" tabindex="-1"><a class="header-anchor" href="#mon-命令" aria-hidden="true">#</a> mon 命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 查看mon的状态信息</span>
ceph mon <span class="token function">stat</span>
<span class="token comment">## 查看mon的选举状态</span>
ceph quorum_status
<span class="token comment">## 查看mon的映射信息</span>
ceph mon dump
<span class="token comment">## 删除一个mon节点</span>
ceph mon remove node1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="msd-命令" tabindex="-1"><a class="header-anchor" href="#msd-命令" aria-hidden="true">#</a> msd 命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 查看msd状态</span>
ceph mds <span class="token function">stat</span>
<span class="token comment">## 查看msd的映射信息</span>
ceph mds dump
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="osd-命令" tabindex="-1"><a class="header-anchor" href="#osd-命令" aria-hidden="true">#</a> osd 命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 查看ceph osd运行状态</span>
ceph osd <span class="token function">stat</span>
<span class="token comment">## 查看osd映射信息</span>
ceph osd dump
ceph osd crush dump
<span class="token comment">## 查看osd的目录树</span>
ceph osd tree
ceph osd ls-tree rack1  <span class="token comment"># 查看osd tree中rack1下的osd编号</span>
<span class="token comment">## 查看osd各硬盘使用率</span>
ceph osd <span class="token function">df</span>
<span class="token comment">## 查看osd延时</span>
ceph osd perf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pg-组命令" tabindex="-1"><a class="header-anchor" href="#pg-组命令" aria-hidden="true">#</a> PG 组命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>、查看pg组的映射信息
<span class="token comment"># ceph pg dump</span>
<span class="token number">2</span>、查看一个PG的map
<span class="token comment"># ceph pg map 2.c</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pool-命令" tabindex="-1"><a class="header-anchor" href="#pool-命令" aria-hidden="true">#</a> pool 命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 查看ceph集群中的pool数量</span>
ceph osd lspools

<span class="token comment">## 在ceph集群中创建一个pool   这里的100指的是PG组</span>
ceph osd pool create jiayuan <span class="token number">100</span>
<span class="token comment">## 为一个ceph pool配置配额</span>
ceph osd pool set-quota data max_objects <span class="token number">10000</span>
<span class="token comment">## 在集群中删除一个pool</span>
<span class="token comment">## 备注：删除pool需要在配置文件ceph.conf中 [mon]添加mon allow pool delete = true并重启mon服务, 如systemctl restart ceph-mon.target</span>
ceph osd pool delete testpool testpool  --yes-i-really-really-mean-it  <span class="token comment">#集群名字需要重复两次</span>

<span class="token comment">## 显示集群中pool的详细信息</span>
rados <span class="token function">df</span>
<span class="token comment">## 查看data池的pg数量</span>
ceph osd pool get volumes pg_num
<span class="token comment">## 设置data池的最大存储空间为100T（默认是1T)</span>
ceph osd pool <span class="token builtin class-name">set</span> data target_max_bytes <span class="token number">100000000000000</span>
<span class="token comment">## 设置data池的副本数是1</span>
ceph osd pool <span class="token builtin class-name">set</span> jiayuan size <span class="token number">1</span>
<span class="token comment">## 设置data池能接受写操作的最小副本为1</span>
ceph osd pool <span class="token builtin class-name">set</span> jiayuan min_size <span class="token number">1</span>
<span class="token comment">## 查看集群中所有pool的副本尺寸</span>
ceph osd dump <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;replicated size&#39;</span>
<span class="token comment">## 设置一个pool的pg数量</span>
ceph osd pool <span class="token builtin class-name">set</span> jiayuan pg_num <span class="token number">128</span>
<span class="token comment">## 设置一个pool的pgp数量</span>
ceph osd pool <span class="token builtin class-name">set</span> jiayuan pgp_num <span class="token number">128</span>
<span class="token comment">## 查询public与cluster是否分开，在存储节点执行以下命令</span>
<span class="token function">ps</span> aux <span class="token operator">|</span> <span class="token function">grep</span> osd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="rbd-命令" tabindex="-1"><a class="header-anchor" href="#rbd-命令" aria-hidden="true">#</a> rbd 命令</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 查看ceph中一个pool里的所有镜像</span>
rbd <span class="token function">ls</span> volumes
<span class="token comment">## 查看ceph pool中一个镜像的信息</span>
rbd info <span class="token parameter variable">-p</span> volumes <span class="token parameter variable">--image</span> volume-2203c1c8-64ea-4da2-934c-011ba9f99603
<span class="token comment">## 在test池中创建一个命名为test2的10000M的镜像</span>
<span class="token comment">## 备注：有些操作系统需要强制指定特性, 加上–image-feature layering ：</span>
rbd create <span class="token parameter variable">-p</span> volumes <span class="token parameter variable">--size</span> <span class="token number">10000</span> test2
<span class="token comment">## rbd create -p volumes --size 10000 test2 --image-feature layering</span>

<span class="token comment">## 删除一个镜像</span>
rbd <span class="token function">rm</span> <span class="token parameter variable">-p</span> volumes test2

<span class="token comment">## 调整一个镜像的尺寸</span>
rbd resize <span class="token parameter variable">-p</span> volumes <span class="token parameter variable">--size</span> <span class="token number">20000</span> test2

<span class="token comment">## 镜像快照的创建、查询、删除</span>
<span class="token comment"># 创建：</span>
rbd snap create volumes/test2@snap1
<span class="token comment"># 查询：</span>
rbd snap <span class="token parameter variable">-p</span> volumes <span class="token function">ls</span> test2
<span class="token comment"># 删除：</span>
rbd snap <span class="token function">rm</span> volumes/test2@snap1
<span class="token comment"># 删除一个镜像文件的所有快照：</span>
rbd snap purge <span class="token parameter variable">-p</span> volumes test2

<span class="token comment">## 导出/导入镜像</span>
<span class="token comment"># 导出：</span>
rbd <span class="token builtin class-name">export</span> <span class="token parameter variable">-p</span> volumes test2 /root/test2.raw
<span class="token comment"># 导入：</span>
rbd <span class="token function">import</span> /root/test2.raw <span class="token parameter variable">-p</span> volumes <span class="token parameter variable">--image</span> test-import
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18);function g(f,_){const a=d("router-link"),i=d("ExternalLinkIcon");return c(),o("div",null,[r(" more "),n("nav",v,[n("ul",null,[n("li",null,[e(a,{to:"#简介"},{default:l(()=>[s("简介")]),_:1})]),n("li",null,[e(a,{to:"#ceph-三种存储类型"},{default:l(()=>[s("Ceph 三种存储类型")]),_:1})]),n("li",null,[e(a,{to:"#常用命令"},{default:l(()=>[s("常用命令")]),_:1}),n("ul",null,[n("li",null,[e(a,{to:"#集群命令"},{default:l(()=>[s("集群命令")]),_:1})]),n("li",null,[e(a,{to:"#mon-命令"},{default:l(()=>[s("mon 命令")]),_:1})]),n("li",null,[e(a,{to:"#msd-命令"},{default:l(()=>[s("msd 命令")]),_:1})]),n("li",null,[e(a,{to:"#osd-命令"},{default:l(()=>[s("osd 命令")]),_:1})]),n("li",null,[e(a,{to:"#pg-组命令"},{default:l(()=>[s("PG 组命令")]),_:1})]),n("li",null,[e(a,{to:"#pool-命令"},{default:l(()=>[s("pool 命令")]),_:1})]),n("li",null,[e(a,{to:"#rbd-命令"},{default:l(()=>[s("rbd 命令")]),_:1})])])])])]),u,n("ul",null,[n("li",null,[n("a",b,[s("ceph 官网-英文"),e(i)])]),n("li",null,[n("a",h,[s("Red Hat Ceph Storage 架构指南"),e(i)])])]),k])}const C=t(m,[["render",g],["__file","20.Ceph初始.html.vue"]]);export{C as default};
