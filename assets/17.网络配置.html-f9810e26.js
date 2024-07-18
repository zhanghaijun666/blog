import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e}from"./app-efa5e96e.js";const i={},l=e(`<h2 id="桥接网络" tabindex="-1"><a class="header-anchor" href="#桥接网络" aria-hidden="true">#</a> 桥接网络</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 创建桥接连接</span>
nmcli connection <span class="token function">add</span> <span class="token builtin class-name">type</span> bridge ifname br0 con-name br0
 
<span class="token comment">## 添加网络接口到桥接连接</span>
nmcli connection <span class="token function">add</span> <span class="token builtin class-name">type</span> bridge-slave ifname enp1s0 master br0
nmcli connection <span class="token function">add</span> <span class="token builtin class-name">type</span> bridge-slave ifname enp2s0 master br0
nmcli connection <span class="token function">add</span> <span class="token builtin class-name">type</span> bridge-slave ifname enp3s0 master br0
nmcli connection <span class="token function">add</span> <span class="token builtin class-name">type</span> bridge-slave ifname enp4s0 master br0
nmcli connection <span class="token function">add</span> <span class="token builtin class-name">type</span> bridge-slave ifname enp5s0 master br0
nmcli connection <span class="token function">add</span> <span class="token builtin class-name">type</span> bridge-slave ifname enp6s0 master br0
nmcli connection <span class="token function">add</span> <span class="token builtin class-name">type</span> bridge-slave ifname enp7s0 master br0
nmcli connection <span class="token function">add</span> <span class="token builtin class-name">type</span> bridge-slave ifname enp8s0 master br0
 
 
<span class="token comment">## 配置桥接连接的IPv4地址</span>
<span class="token comment"># nmcli connection modify br0 ipv4.method manual ipv4.address 192.168.60.100/24</span>
<span class="token comment"># nmcli connection modify br0 ipv4.addresses &quot;192.168.100.26/24&quot;</span>
<span class="token comment"># nmcli connection modify br0 ipv4.gateway 192.168.100.2</span>
<span class="token comment"># nmcli connection modify br0 ipv4.dns 8.8.8.8</span>
 
<span class="token comment">## 设置IP地址:192.168.13.166</span>
nmcli connection modify br0 ipv4.method manual ipv4.address <span class="token number">192.168</span>.13.166/24 ipv4.gateway <span class="token number">192.168</span>.13.1
<span class="token comment">## 添加IP地址：192.168.3.166</span>
nmcli con mod br0 +ipv4.addresses <span class="token string">&quot;192.168.3.166/24&quot;</span>
 
<span class="token comment"># 重新加载连接</span>
nmcli connection reload
 
<span class="token comment"># 启用桥接连接</span>
nmcli connection up br0
systemctl restart network
 
<span class="token comment">## 删除桥接</span>
nmcli connection delete br0
\`<span class="token variable"><span class="token variable">\`</span>

<span class="token variable">\`</span></span>\`\`bash
<span class="token comment">## 安装bridge-utils</span>
<span class="token function">apt-get</span> <span class="token function">install</span> bridge-utils
yum instakk <span class="token parameter variable">-y</span> bridge-utils
 
<span class="token comment">## 创建桥接设备： 使用brctl命令创建一个桥接设备。假设你要创建一个名为br0的桥接设备，可以使用以下命令：</span>
brctl addbr br0
 
<span class="token comment">## 将网络接口添加到桥接设备： 将要桥接的网络接口（网卡）添加到新创建的桥接设备中。例如，假设你有两个网卡eth0和eth1，可以使用以下命令：</span>
brctl addif br0 eth0
brctl addif br0 eth1
 
<span class="token comment">## 激活桥接设备： 使用以下命令激活桥接设备：</span>
<span class="token function">ifconfig</span> br0 up
 
<span class="token comment">## 配置IP地址： 为桥接设备分配一个IP地址。例如：</span>
<span class="token function">ifconfig</span> br0 <span class="token number">192.168</span>.16.100 netmask <span class="token number">255.255</span>.255.0
 
<span class="token comment">## 禁用原始网络接口： 如果你希望通过桥接设备来处理网络流量，可以禁用原始网络接口。例如：</span>
<span class="token function">ifconfig</span> eth0 down
<span class="token function">ifconfig</span> eth1 down
<span class="token comment">## 或者使用ip link set命令：</span>
<span class="token function">ip</span> <span class="token function">link</span> <span class="token builtin class-name">set</span> dev eth0 down
<span class="token function">ip</span> <span class="token function">link</span> <span class="token builtin class-name">set</span> dev eth1 down
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ebtables" tabindex="-1"><a class="header-anchor" href="#ebtables" aria-hidden="true">#</a> ebtables</h2><blockquote><p>ebtables（Ethernet Bridge Tables）是用于Linux系统上的一个桥接表管理工具，它主要用于管理Linux内核中的以太网桥接设备的过滤规则。</p></blockquote><ul><li>以太网桥接设备管理： ebtables主要用于管理Linux内核中的以太网桥接设备。桥接设备允许将多个网络接口连接在一起，形成一个共享同一网络的逻辑链路。</li><li>流量过滤： ebtables允许用户定义规则，以控制通过桥接设备的数据流量。这包括允许或拒绝特定的MAC地址、以太网协议类型（如IPv4或IPv6）、以及其他与以太网帧相关的信息。</li><li>MAC地址过滤： 用户可以使用ebtables指定允许或拒绝通过桥接设备的特定MAC地址的流量。这有助于实现网络访问控制。</li><li>协议过滤： 除了MAC地址过滤外，ebtables还允许用户基于以太网帧的协议类型过滤流量。这意味着可以根据帧中的协议信息来控制流量的通过与阻塞。</li><li>连接跟踪： ebtables支持连接跟踪功能，可以用于追踪与桥接设备相关的连接信息。</li><li>虚拟局域网（VLAN）支持： ebtables可以与VLAN一起使用，帮助管理VLAN标记的流量。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 查看ebtables规则</span>
ebtables <span class="token parameter variable">-L</span>
<span class="token comment">## 查看版本</span>
ebtables <span class="token parameter variable">--versio</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="应用" tabindex="-1"><a class="header-anchor" href="#应用" aria-hidden="true">#</a> 应用</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 查看系统上是否存在桥接设备，可通过一下命令查看</span>
<span class="token function">ip</span> <span class="token function">link</span> show <span class="token builtin class-name">type</span> bridge
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> bridge-utils <span class="token operator">&amp;&amp;</span> brctl show
<span class="token comment">## 查看桥接设备br0的相关信息</span>
brctl showmacs br0
<span class="token comment">## 重新加载网络接口，重新加载网络接口可能有助于应用新规则</span>
<span class="token function">sudo</span> <span class="token function">ip</span> <span class="token function">link</span> <span class="token builtin class-name">set</span> dev br0 down
<span class="token function">sudo</span> <span class="token function">ip</span> <span class="token function">link</span> <span class="token builtin class-name">set</span> dev br0 up
<span class="token comment">## 查看服务状态并启动服务</span>
systemctl status ebtables
systemctl start ebtables
systemctl <span class="token builtin class-name">enable</span> ebtables
 
<span class="token comment">## 获取机器的mac地址</span>
<span class="token function">ip</span> <span class="token function">link</span> show <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-o</span> <span class="token parameter variable">-E</span> <span class="token string">&#39;ether [^ ]+&#39;</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span>
 
<span class="token comment">## 仅允许mac地址为00:0c:29:1a:53:38的设备访问80端口</span>
ebtables <span class="token parameter variable">-A</span> INPUT <span class="token parameter variable">-p</span> <span class="token function">ip</span> --ip-proto tcp --ip-dport <span class="token number">443</span> <span class="token parameter variable">-s</span> 00:0c:29:1a:53:38 <span class="token parameter variable">-j</span> ACCEPT
ebtables <span class="token parameter variable">-A</span> INPUT <span class="token parameter variable">-p</span> <span class="token function">ip</span> --ip-proto tcp --ip-dport <span class="token number">443</span> <span class="token parameter variable">-j</span> DROP
 
<span class="token comment">## 导出ebtables规则</span>
<span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">&#39;ebtables-save &gt; /root/ebtables.rules&#39;</span>
<span class="token comment">## 导入ebtable规则</span>
<span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">&#39;ebtables-restore &lt; /root/ebtables.rules&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="脚本更新白名单" tabindex="-1"><a class="header-anchor" href="#脚本更新白名单" aria-hidden="true">#</a> 脚本更新白名单</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /opt/ebtables/ <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> /opt/ebtables/
 
<span class="token comment">## mac地址白名单</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> mac_list.txt <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
11:22:33:44:55:66
22:33:44:55:66:77
EOF</span>
 
<span class="token comment">## 更新ebtables规则</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> whitelist_script.sh <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
#!/bin/bash
# 清空旧的规则
ebtables -F
# 从文件中读取MAC地址列表
cat mac_list.txt | while read -r mac_address; do
  ebtables -A INPUT -p ip --ip-proto tcp --ip-dport 443 -s &quot;\\<span class="token variable">\${mac_address}</span>&quot; -j ACCEPT
done
## 拒绝其他mac地址访问
ebtables -A INPUT -p ip --ip-proto tcp --ip-dport 443 -j DROP
 
## 备份当前的规则
sh -c &#39;ebtables-save &gt; \\<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%Y%m%d%H%M%S<span class="token variable">)</span></span>-ebtables.rules&#39;
EOF</span>
 
<span class="token function">chmod</span> +x whitelist_script.sh
<span class="token function">bash</span> whitelist_script.sh
\`<span class="token variable"><span class="token variable">\`</span>

<span class="token comment">## iptables</span>

<span class="token operator">&gt;</span> iptables 是一个用于配置 Linux 内核防火墙规则的工具。它允许系统管理员定义如何处理网络流量，包括允许或拒绝特定端口、IP 地址或协议的流量。iptables 是 Linux 中一个强大而灵活的防火墙管理工具，常用于网络安全、流量控制和网络地址转换（NAT）等方面

<span class="token comment">### 应用</span>

<span class="token variable">\`</span></span>\`\`bash
<span class="token comment">## 清空所有的 INPUT 链规则</span>
iptables <span class="token parameter variable">-F</span> INPUT
<span class="token comment">## 针对 80 端口进行客户端的 MAC 地址过滤</span>
iptables <span class="token parameter variable">-A</span> INPUT <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">80</span> <span class="token parameter variable">-m</span> mac --mac-source <span class="token number">11</span>:22:33:44:55:66 <span class="token parameter variable">-j</span> ACCEPT
<span class="token comment">## 拒绝其他 MAC 地址</span>
iptables <span class="token parameter variable">-A</span> INPUT <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">80</span> <span class="token parameter variable">-j</span> DRO
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="脚本更新白名单-已验证" tabindex="-1"><a class="header-anchor" href="#脚本更新白名单-已验证" aria-hidden="true">#</a> 脚本更新白名单（已验证）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 白名单列表</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> mac_whitelist.txt <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
11:22:33:44:55:66
22:33:44:55:66:77
EOF</span>
 
<span class="token comment">## 更新到iptables中</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> whitelist_script.sh <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
#!/bin/bash
# 定义变量
WHITELIST=&quot;mac_whitelist.txt&quot;
PORT=80
# 函数：加载 MAC 地址到 iptables
load_mac_addresses() {
  local whitelist=\\<span class="token variable">$1</span>
  local port=\\<span class="token variable">$2</span>
  # 从文件中读取 MAC 地址列表，并允许这些地址
  while IFS= read -r mac; do
    iptables -A INPUT -p tcp --dport &quot;\\<span class="token variable">$port</span>&quot; -m mac --mac-source &quot;\\<span class="token variable">$mac</span>&quot; -j ACCEPT
  done &lt; &quot;\\<span class="token variable">$whitelist</span>&quot;
}
## 清空所有的 INPUT 链规则
iptables -F INPUT
## 调用函数加载 MAC 地址
load_mac_addresses &quot;\\<span class="token variable">$WHITELIST</span>&quot; &quot;\\<span class="token variable">$PORT</span>&quot;
## 拒绝其他 MAC 地址
iptables -A INPUT -p tcp --dport \\<span class="token variable">$PORT</span> -j DROP
## 备份当前的规则
iptables-save &gt; /root/\\<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%Y%m%d%H%M%S<span class="token variable">)</span></span>-iptables.rules
EOF</span>
 
<span class="token comment">## 赋予执行权限并执行脚本</span>
<span class="token function">chmod</span> +x whitelist_script.sh
<span class="token function">bash</span> whitelist_script.s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),t=[l];function c(p,d){return s(),a("div",null,t)}const v=n(i,[["render",c],["__file","17.网络配置.html.vue"]]);export{v as default};
