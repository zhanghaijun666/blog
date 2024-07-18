import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as p,c,e as o,a as n,d as a,w as e,f as u,b as t}from"./app-efa5e96e.js";const r={},d={class:"table-of-contents"},v=u(`<h2 id="获取-ip-地址" tabindex="-1"><a class="header-anchor" href="#获取-ip-地址" aria-hidden="true">#</a> 获取 ip 地址</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment"># 获取本机的IP地址</span>

<span class="token assign-left variable">ip</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token punctuation">(</span>ip addr<span class="token operator">||</span><span class="token function">ifconfig</span><span class="token punctuation">)</span> <span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token number">255.0</span>.0.0<span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token number">255.255</span>.0.0<span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">docker</span><span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-En</span> &#39;s/127.0.0.1//<span class="token punctuation">;</span>s/.*inet <span class="token punctuation">(</span>addr:<span class="token punctuation">)</span>?<span class="token punctuation">((</span><span class="token punctuation">[</span><span class="token number">0</span>-9<span class="token punctuation">]</span>*<span class="token punctuation">\\</span>.<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token number">0</span>-9<span class="token punctuation">]</span>*<span class="token variable">)</span></span>.*/<span class="token punctuation">\\</span><span class="token number">2</span>/p&#39; <span class="token operator">|</span><span class="token function">head</span> -1<span class="token punctuation">)</span>
<span class="token assign-left variable">network</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> $ip<span class="token operator">|</span><span class="token function">sed</span>  <span class="token parameter variable">-r</span> <span class="token string">&quot;s/([0-9]+\\.[0-9]+\\.[0-9]+)\\..*$/<span class="token entity" title="\\1">\\1</span>.0\\/24/g&quot;</span><span class="token variable">)</span></span>

<span class="token builtin class-name">echo</span> IP: <span class="token variable">$ip</span>
<span class="token builtin class-name">echo</span> NETWORK: <span class="token variable">$network</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建-linux-系统账户及密码" tabindex="-1"><a class="header-anchor" href="#创建-linux-系统账户及密码" aria-hidden="true">#</a> 创建 Linux 系统账户及密码</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment"># 通过位置变量创建 Linux 系统账户及密码</span>

<span class="token comment">## $1 是执行脚本的第一个参数, 用户名称</span>
<span class="token comment">## $2 是执行脚本的第二个参数, 用户密码</span>
<span class="token function">useradd</span>    <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$2</span>&quot;</span>  <span class="token operator">|</span>  <span class="token function">passwd</span>  ‐‐stdin  <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="点名器脚本" tabindex="-1"><a class="header-anchor" href="#点名器脚本" aria-hidden="true">#</a> 点名器脚本</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment"># 编写一个点名器脚本</span>

<span class="token comment">## 需要提前准备一个 user.txt 文件</span>
<span class="token comment">## 该文件中需要包含所有姓名的信息,一行一个姓名,脚本每次随机显示一个姓名</span>
<span class="token keyword">while</span> <span class="token builtin class-name">:</span>
<span class="token keyword">do</span>
<span class="token comment">#统计 user 文件中有多少用户</span>
<span class="token assign-left variable">line</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">cat</span> user.txt <span class="token operator">|</span><span class="token function">wc</span> ‐l<span class="token variable">\`</span></span>
<span class="token assign-left variable">num</span><span class="token operator">=</span>$<span class="token punctuation">[</span><span class="token environment constant">RANDOM</span>%line+1<span class="token punctuation">]</span>
<span class="token function">sed</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">\${num}</span>p&quot;</span>  user.txt
<span class="token function">sleep</span> <span class="token number">0.2</span>
<span class="token function">clear</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="统计-linux-系统中账户数量" tabindex="-1"><a class="header-anchor" href="#统计-linux-系统中账户数量" aria-hidden="true">#</a> 统计 Linux 系统中账户数量</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment">## 统计当前 Linux 系统中可以登录计算机的账户有多少个</span>
<span class="token function">grep</span> <span class="token string">&quot;bash$&quot;</span> /etc/passwd <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="各种格式的时间" tabindex="-1"><a class="header-anchor" href="#各种格式的时间" aria-hidden="true">#</a> 各种格式的时间</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token comment"># 打印各种时间格式</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;显示星期简称(如:Sun)&quot;</span>
<span class="token function">date</span> +%a
<span class="token builtin class-name">echo</span> <span class="token string">&quot;显示星期全称(如:Sunday)&quot;</span>
<span class="token function">date</span> +%A
<span class="token builtin class-name">echo</span> <span class="token string">&quot;显示月份简称(如:Jan)&quot;</span>
<span class="token function">date</span> +%b
<span class="token builtin class-name">echo</span> <span class="token string">&quot;显示月份全称(如:January)&quot;</span>
<span class="token function">date</span> +%B
<span class="token builtin class-name">echo</span> <span class="token string">&quot;显示数字月份(如:12)&quot;</span>
<span class="token function">date</span> +%m
<span class="token builtin class-name">echo</span> <span class="token string">&quot;显示数字日期(如:01 号)&quot;</span>
<span class="token function">date</span> +%d
<span class="token builtin class-name">echo</span> <span class="token string">&quot;显示数字年(如:01 号)&quot;</span>
<span class="token function">date</span> +%Y <span class="token builtin class-name">echo</span> <span class="token string">&quot;显示年‐月‐日&quot;</span>
<span class="token function">date</span> +%F
<span class="token builtin class-name">echo</span> <span class="token string">&quot;显示小时(24 小时制)&quot;</span>
<span class="token function">date</span> +%H
<span class="token builtin class-name">echo</span> <span class="token string">&quot;显示分钟(00..59)&quot;</span>
<span class="token function">date</span> +%M
<span class="token builtin class-name">echo</span> <span class="token string">&quot;显示秒&quot;</span>
<span class="token function">date</span> +%S
<span class="token builtin class-name">echo</span> <span class="token string">&quot;显示纳秒&quot;</span>
<span class="token function">date</span> +%N
<span class="token builtin class-name">echo</span> <span class="token string">&quot;组合显示&quot;</span>
<span class="token function">date</span> +<span class="token string">&quot;%Y%m%d %H:%M:%S&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10);function k(b,m){const s=i("router-link");return p(),c("div",null,[o(" more "),n("nav",d,[n("ul",null,[n("li",null,[a(s,{to:"#获取-ip-地址"},{default:e(()=>[t("获取 ip 地址")]),_:1})]),n("li",null,[a(s,{to:"#创建-linux-系统账户及密码"},{default:e(()=>[t("创建 Linux 系统账户及密码")]),_:1})]),n("li",null,[a(s,{to:"#点名器脚本"},{default:e(()=>[t("点名器脚本")]),_:1})]),n("li",null,[a(s,{to:"#统计-linux-系统中账户数量"},{default:e(()=>[t("统计 Linux 系统中账户数量")]),_:1})]),n("li",null,[a(s,{to:"#各种格式的时间"},{default:e(()=>[t("各种格式的时间")]),_:1})])])]),v])}const g=l(r,[["render",k],["__file","15.Shell脚本案例.html.vue"]]);export{g as default};
