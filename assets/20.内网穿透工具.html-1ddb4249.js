import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as r,c,e as p,a as n,d as e,w as a,f as o,b as i}from"./app-efa5e96e.js";const d={},v={class:"table-of-contents"},m=o(`<h2 id="nps" tabindex="-1"><a class="header-anchor" href="#nps" aria-hidden="true">#</a> nps</h2><blockquote><p>nps 是一款轻量级、高性能、功能强大的内网穿透代理服务器。目前支持 tcp、udp 流量转发，可支持任何 tcp、udp 上层协议（访问内网网站、本地支付接口调试、ssh 访问、远程桌面，内网 dns 解析等等……），此外还支持内网 http 代理、内网 socks5 代理、p2p 等，并带有功能强大的 web 管理端。</p><p>一台有公网 IP 的服务器（VPS）运行服务端（NPS）<br><br> 一个或多个运行在内网的服务器或者 PC 运行客户端（NPC）</p><p>特点：Go 语言编写 | 支持跨平台 | 支持多种协议的代理 | web 管理端</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 下载地址：https://github.com/ehang-io/nps/releases</span>
<span class="token builtin class-name">cd</span> ~
<span class="token function">wget</span> https://github.com/ehang-io/nps/releases/download/v0.26.10/linux_amd64_server.tar.gz
<span class="token function">tar</span> xzvf linux_amd64_server.tar.gz
<span class="token builtin class-name">cd</span> ~/nps
<span class="token comment">## 修改配置文件</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> conf/nps.conf <span class="token operator">&lt;&lt;</span><span class="token string">EOF
web_host= 服务器IP或者域名
web_username= admin（登录用户名）
web_password= 你的密码
web_port=8080（web管理端口）
## bridge
bridge_type=tcp
bridge_port=443
bridge_ip=0.0.0.0
EOF</span>
<span class="token comment">## 启动 Mac/Linux 测试配置文件|启动|停止|重启|状态</span>
./nps <span class="token builtin class-name">test</span><span class="token operator">|</span>start<span class="token operator">|</span>stop<span class="token operator">|</span>restart<span class="token operator">|</span>status
<span class="token comment">## 启动 Windows 测试配置文件|启动|停止|重启|状态</span>
nps.exe <span class="token builtin class-name">test</span><span class="token operator">|</span>start<span class="token operator">|</span>stop<span class="token operator">|</span>restart<span class="token operator">|</span>status
<span class="token comment">## NPC</span>
./npc <span class="token parameter variable">-server</span><span class="token operator">=</span>你的IP:8024 <span class="token parameter variable">-vkey</span><span class="token operator">=</span>唯一验证密码 <span class="token parameter variable">-type</span><span class="token operator">=</span>tcp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="frp" tabindex="-1"><a class="header-anchor" href="#frp" aria-hidden="true">#</a> frp</h2><blockquote><p>frp 是一个专注于内网穿透的高性能的反向代理应用，支持 TCP、UDP、HTTP、HTTPS 等多种协议。可以将内网服务以安全、便捷的方式通过具有公网 IP 节点的中转暴露到公网。</p><p>特点: 客户端服务端通信支持 TCP、KCP 以及 Websocket 等多种协议 | 端口复用 | 跨平台，但是支持的比 nps 少一点 | 多种插件，提供很多功能</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 下载地址：https://github.com/fatedier/frp/releases</span>
<span class="token comment">## 参考地址：https://segmentfault.com/a/1190000021876836</span>
<span class="token function">wget</span> https://github.com/fatedier/frp/releases/download/v0.40.0/frp_0.40.0_linux_amd64.tar.gz
<span class="token comment">## 修改 frps.ini 文件，为了安全起见，这里最好配置一下身份验证，服务端和客户端的 common 配置中的 token 参数一致则身份验证通过</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> frps.ini <span class="token operator">&lt;&lt;</span><span class="token string">EOF
[common]
bind_port = 7000
# 用于身份验证，请自行修改，要保证服务端与客户端一致
token = abcdefgh
EOF</span>
<span class="token comment">## 启动 frps</span>
./frps <span class="token parameter variable">-c</span> ./frps.ini
<span class="token comment">## 修改 frpc.ini 文件，假设 frps 所在服务器的公网 IP 为 x.x.x.x：</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> frpc.ini <span class="token operator">&lt;&lt;</span><span class="token string">EOF
[common]
server_addr = x.x.x.x
server_port = 7000
# 用于身份验证，请自行修改，要保证服务端与客户端一致
token = abcdefgh
[rdp]
type = tcp
local_ip = 127.0.0.1
local_port = 3389
remote_port = 6000
EOF</span>
<span class="token comment">## 启动 frpc</span>
./frpc <span class="token parameter variable">-c</span> ./frpc.ini
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ew" tabindex="-1"><a class="header-anchor" href="#ew" aria-hidden="true">#</a> EW</h2><blockquote><p>EW 是一套便携式的网络穿透工具，具有 SOCKS v5 服务架设和端口转发两大核心功能，可在复杂网络环境下完成网络穿透。但是，现在工具已经不更新了</p><p>特点: 轻量级，C 语言编写 | 可以设置多级代理 | 跨平台，但是只支持 Socks5 代理</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 参考地址：http://rootkiter.com/EarthWorm/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,9);function u(b,k){const s=l("router-link");return r(),c("div",null,[p(" more "),n("nav",v,[n("ul",null,[n("li",null,[e(s,{to:"#nps"},{default:a(()=>[i("nps")]),_:1})]),n("li",null,[e(s,{to:"#frp"},{default:a(()=>[i("frp")]),_:1})]),n("li",null,[e(s,{to:"#ew"},{default:a(()=>[i("EW")]),_:1})])])]),m])}const _=t(d,[["render",u],["__file","20.内网穿透工具.html.vue"]]);export{_ as default};
