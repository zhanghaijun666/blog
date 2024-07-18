import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as i,c as p,a,b as s,d as r,f as n}from"./app-efa5e96e.js";const c={},d=n(`<h2 id="防火墙相关概念" tabindex="-1"><a class="header-anchor" href="#防火墙相关概念" aria-hidden="true">#</a> 防火墙相关概念</h2><ul><li>从逻辑上讲。防火墙可以大体分为主机防火墙和网络防火墙。 <blockquote><p>主机防火墙：针对于单个主机进行防护。</p><p>网络防火墙：往往处于网络入口或边缘，针对于网络入口进行防护，服务于防火墙背后的本地局域网。</p><p>网络防火墙和主机防火墙并不冲突，可以理解为，网络防火墙主外（集体）， 主机防火墙主内（个人）。</p></blockquote></li><li>从物理上讲，防火墙可以分为硬件防火墙和软件防火墙。 <blockquote><p>硬件防火墙：在硬件级别实现部分防火墙功能，另一部分功能基于软件实现，性能高，成本高。</p><p>软件防火墙：应用软件处理逻辑运行于通用硬件平台之上的防火墙，性能低，成本低。</p></blockquote></li><li>Linux 中的 iptables <blockquote><p>iptables 其实不是真正的防火墙，我们可以把它理解成一个客户端代理，用户通过 iptables 这个代理，将用户的安全设定执行到对应的&quot;安全框架&quot;中，这个&quot;安全框架&quot;才是真正的防火墙，这个框架的名字叫 netfilter</p><p>netfilter 才是防火墙真正的安全框架（framework），netfilter 位于内核空间。</p><p>iptables 其实是一个命令行工具，位于用户空间，我们用这个工具操作真正的框架。</p></blockquote></li></ul><h2 id="防火墙-iptables" tabindex="-1"><a class="header-anchor" href="#防火墙-iptables" aria-hidden="true">#</a> 防火墙 iptables</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装iptables</span>
yum <span class="token function">install</span> iptables-services
<span class="token comment"># 状态|启动|停止|重启|开机自启|禁止开机自启</span>
systemctl <span class="token punctuation">{</span>status<span class="token operator">|</span>start<span class="token operator">|</span>stop<span class="token operator">|</span>restart<span class="token operator">|</span><span class="token builtin class-name">enable</span><span class="token operator">|</span>disable<span class="token punctuation">}</span> iptables.service

iptables <span class="token parameter variable">-h</span>                         <span class="token comment"># 查询帮助</span>
iptables <span class="token parameter variable">-L</span> <span class="token parameter variable">-n</span>                      <span class="token comment"># 列出（filter表）所有规则</span>
iptables <span class="token parameter variable">-L</span> <span class="token parameter variable">-n</span> --line-number        <span class="token comment"># 列出（filter表）所有规则，带编号</span>
iptables <span class="token parameter variable">-L</span> <span class="token parameter variable">-n</span> <span class="token parameter variable">-t</span> nat               <span class="token comment"># 列出（nat表）所有规则</span>
iptables <span class="token parameter variable">-F</span>                         <span class="token comment"># 清除（filter表）中所有规则</span>
iptables <span class="token parameter variable">-F</span> <span class="token parameter variable">-t</span> nat                  <span class="token comment"># 清除（nat表）中所有规则</span>
<span class="token function">service</span> iptables save               <span class="token comment"># 保存配置（保存配置后必须重启iptables）</span>
<span class="token function">service</span> iptables restart            <span class="token comment"># 重启</span>

<span class="token comment"># 禁止192.168.1.3 IP地址的所有类型数据接入</span>
iptables <span class="token parameter variable">-A</span> INPUT <span class="token operator">!</span> <span class="token parameter variable">-s</span> <span class="token number">192.168</span>.1.3 <span class="token parameter variable">-j</span> DROP
iptables <span class="token parameter variable">-A</span> INPUT <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">80</span> <span class="token parameter variable">-j</span> ACCEPT       <span class="token comment"># 开放80端口</span>
iptables <span class="token parameter variable">-I</span> INPUT <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">22</span>:80 <span class="token parameter variable">-j</span> ACCEPT    <span class="token comment"># 开发22-80范围的端口</span>
iptables <span class="token parameter variable">-I</span> OUTPUT <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">80</span> <span class="token parameter variable">-j</span> DROP        <span class="token comment"># 不允许80端口流出</span>
<span class="token function">service</span> iptables save                               <span class="token comment"># 保存修改</span>
<span class="token function">service</span> iptables restart                            <span class="token comment"># 重启防火墙，修改生效</span>

<span class="token comment"># 防火墙开启8081端口</span>
<span class="token function">vi</span>  /etc/sysconfig/iptables
<span class="token comment"># 在打开的文件中加入如下内容</span>
<span class="token parameter variable">-A</span> INPUT <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-m</span> state <span class="token parameter variable">--state</span> NEW <span class="token parameter variable">-m</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">8081</span> <span class="token parameter variable">-j</span> ACCEPT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ipvsadm" tabindex="-1"><a class="header-anchor" href="#ipvsadm" aria-hidden="true">#</a> ipvsadm</h2><p>ipvsadm 工具常用的参数选项有：</p><table><thead><tr><th>-A --add-service</th><th>添加一条新的虚拟服务</th></tr></thead><tbody><tr><td>-E --edit-service</td><td>编辑虚拟服务</td></tr><tr><td>-D --delete-service</td><td>删除虚拟服务</td></tr><tr><td>-C --clear</td><td>清除所有的虚拟服务规则</td></tr><tr><td>-R --restore</td><td>恢复虚拟服务规则</td></tr><tr><td>-a --add-server</td><td>在一个虚拟服务中添加一个新的真实服务器</td></tr><tr><td>-e --edit-server</td><td>编辑某个真实服务器</td></tr><tr><td>-d --delete-server</td><td>删除某个真实服务器</td></tr><tr><td>-L | -l --list</td><td>显示内核中的虚拟服务规则</td></tr><tr><td>-n --numeric</td><td>以数字形式显示 IP 端口</td></tr><tr><td>-c --connection</td><td>显示 ipvs 中目前存在的连接，也可以用于分析调度情况</td></tr><tr><td>-Z --zero</td><td>将转发消息的统计清零</td></tr><tr><td>-p --persistent</td><td>配置持久化时间</td></tr><tr><td>--set tcp tcpfin udp</td><td>配置三个超时时间（tcp/tcpfin/udp）</td></tr><tr><td>-t | -u</td><td>TCP/UDP 协议的虚拟服务</td></tr><tr><td>-g | -m | -i</td><td>LVS 模式为：DR | NAT | TUN</td></tr><tr><td>-w</td><td>配置真实服务器的权重</td></tr><tr><td>-s</td><td>配置负载均衡算法，如:rr, wrr, lc 等</td></tr><tr><td>--timeout</td><td>显示配置的 tcp/tcpfin/udp 超时时间</td></tr><tr><td>--stats</td><td>显示历史转发消息统计（累加值）</td></tr><tr><td>--rate</td><td>显示转发速率信息（瞬时值）</td></tr></tbody></table><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 管理虚拟服务</span>
<span class="token comment"># 添加一个虚拟服务192.168.1.100:80，使用轮询算法</span>
ipvsadm <span class="token parameter variable">-A</span> <span class="token parameter variable">-t</span> <span class="token number">192.168</span>.1.100:80 <span class="token parameter variable">-s</span> rr
<span class="token comment"># 修改虚拟服务的算法为加权轮询</span>
ipvsadm <span class="token parameter variable">-E</span> <span class="token parameter variable">-t</span> <span class="token number">192.168</span>.1.100:80 <span class="token parameter variable">-s</span> wrr
<span class="token comment"># 删除虚拟服务</span>
ipvsadm <span class="token parameter variable">-D</span> <span class="token parameter variable">-t</span> <span class="token number">192.168</span>.1.100:80

<span class="token comment">## 管理真实服务</span>
<span class="token comment"># 添加一个真实服务器192.168.1.123，使用DR模式，权重2</span>
ipvsadm <span class="token parameter variable">-a</span> <span class="token parameter variable">-t</span> <span class="token number">192.168</span>.1.100:80 <span class="token parameter variable">-r</span> <span class="token number">192.168</span>.1.123 <span class="token parameter variable">-g</span> <span class="token parameter variable">-w</span> <span class="token number">2</span>
<span class="token comment"># 修改真实服务器的权重</span>
ipvsadm <span class="token parameter variable">-a</span> <span class="token parameter variable">-t</span> <span class="token number">192.168</span>.1.100:80 <span class="token parameter variable">-r</span> <span class="token number">192.168</span>.1.123 <span class="token parameter variable">-g</span> <span class="token parameter variable">-w</span> <span class="token number">5</span>
<span class="token comment"># 删除真实服务器</span>
ipvsadm <span class="token parameter variable">-d</span> <span class="token parameter variable">-t</span> <span class="token number">192.168</span>.1.100:80 <span class="token parameter variable">-r</span> <span class="token number">192.168</span>.1.123

<span class="token comment">## 查看统计</span>
<span class="token comment"># 查看当前配置的虚拟服务和各个RS的权重</span>
ipvsadm <span class="token parameter variable">-Ln</span>
<span class="token comment"># 查看当前ipvs模块中记录的连接（可用于观察转发情况）</span>
ipvsadm <span class="token parameter variable">-lnc</span>
<span class="token comment"># 查看ipvs模块的转发情况统计</span>
ipvsadm <span class="token parameter variable">-Ln</span> <span class="token parameter variable">--stats</span> <span class="token operator">|</span> <span class="token parameter variable">--rate</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ipset" tabindex="-1"><a class="header-anchor" href="#ipset" aria-hidden="true">#</a> ipset</h2>`,9),m=a("br",null,null,-1),o=a("br",null,null,-1),v={href:"http://ipset.netfilter.org/",target:"_blank",rel:"noopener noreferrer"},b=n(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> ipset

<span class="token comment"># 黑名单</span>
ipset create blacklist hash:net maxelem <span class="token number">1000000</span>
<span class="token comment"># 白名单</span>
ipset create whitelist hash:net maxelem <span class="token number">1000000</span>

<span class="token comment"># 查看已创建的ipset</span>
ipset list
<span class="token comment"># 加入一个名单ip</span>
ipset <span class="token function">add</span> blacklist <span class="token number">10.60</span>.10.xx
<span class="token comment"># 去除名单ip</span>
ipset del blacklist <span class="token number">10.60</span>.10.xx
<span class="token comment"># 创建防火墙规则，与此同时，allset这个IP集里的ip都无法访问80端口（如：CC攻击可用）</span>
iptables <span class="token parameter variable">-I</span> INPUT <span class="token parameter variable">-m</span> <span class="token builtin class-name">set</span> –match-set blacklist src <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> DROP
iptables <span class="token parameter variable">-I</span> INPUT <span class="token parameter variable">-m</span> <span class="token builtin class-name">set</span> –match-set whitelist src <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-j</span> DROP
<span class="token function">service</span> iptables save
iptables <span class="token parameter variable">-I</span> INPUT <span class="token parameter variable">-m</span> <span class="token builtin class-name">set</span> –match-set setname src <span class="token parameter variable">-p</span> tcp –destination-port <span class="token number">80</span> <span class="token parameter variable">-j</span> DROP
<span class="token comment"># 将ipset规则保存到文件</span>
ipset save blacklist <span class="token parameter variable">-f</span> blacklist.txt
ipset save whitelist <span class="token parameter variable">-f</span> whitelist.txt
<span class="token comment"># 删除ipset</span>
ipset destroy blacklist
ipset destroy whitelist
<span class="token comment"># 导入ipset规则</span>
ipset restore <span class="token parameter variable">-f</span> blacklist.txt
ipset restore <span class="token parameter variable">-f</span> whitelist.txt
<span class="token comment"># ipset的一个优势是集合可以动态的修改，即使ipset的iptables规则目前已经启动，新加的入ipset的ip也生效</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="sysstat-性能监控工具" tabindex="-1"><a class="header-anchor" href="#sysstat-性能监控工具" aria-hidden="true">#</a> Sysstat 性能监控工具</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span>  sysstat
<span class="token comment"># 查看版本</span>
sar <span class="token parameter variable">-V</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>sysstat 工具包包含的工具：</p><ul><li>iostat 工具提供 CPU 使用率及硬盘吞吐效率的数据； #比较核心的工具</li><li>mpstat 工具提供单个处理器或多个处理器相关数据；</li><li>pidstat: 关于运行中的进程/任务、CPU、内存等的统计信息</li><li>sar 工具负责收集、报告并存储系统活跃的信息； #统计数据的核心工具</li><li>sa1 工具负责收集并存储每天系统动态信息到一个二进制的文件中。它是通过计划任务工具 cron 来运行，是为 sadc 所设计的程序前端程序；</li><li>sa2 工具负责把每天的系统活跃性息写入总结性的报告中。它是为 sar 所设计的前端 ，要通过 cron 来调用</li><li>sadc 是系统动态数据收集工具，收集的数据被写一个二进制的文件中，它被用作 sar 工具的后端；</li><li>sadf 显示被 sar 通过多种格式收集的数据；</li><li>nfsiostat: NFS（Network File System）的 I/O 统计信息。</li><li>cifsiostat: CIFS(Common Internet File System)的统计信息</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>iostat <span class="token parameter variable">--help</span>
<span class="token comment"># -c : 仅显示cpu的状态</span>
iostat <span class="token parameter variable">-c</span> <span class="token number">1</span> <span class="token number">3</span>
<span class="token comment"># 显示扩展状态，显示出更多内容</span>
iostat <span class="token parameter variable">-x</span>

<span class="token comment">## mpstat 用于多处理器系统中的CPU的利用率的统计。细化到具体某个cpu的状态时可以使用参数-P，处理器的ID从0开始</span>
mpstat <span class="token parameter variable">--help</span>
mpstat <span class="token parameter variable">-p</span> <span class="token number">0</span> <span class="token number">1</span> <span class="token number">2</span>

<span class="token comment">## sdac是一个搜集写入工具，并不直接回显于屏幕上</span>
/usr/local/lib/sa/sadc <span class="token parameter variable">--help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function u(k,h){const e=l("ExternalLinkIcon");return i(),p("div",null,[d,a("p",null,[s("pset 是 iptables 的扩展,它允许你创建 匹配整个地址集合的规则。"),m,o,s(" 官网："),a("a",v,[s("http://ipset.netfilter.org/"),r(e)])]),b])}const x=t(c,[["render",u],["__file","30.iptables详解.html.vue"]]);export{x as default};
