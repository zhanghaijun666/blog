import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as a,e,f as l}from"./app-efa5e96e.js";const p={},t=l(`<nav class="table-of-contents"><ul></ul></nav><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 多路径软件服务</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> device-mapper-multipath
<span class="token comment">## 设置服务自启动</span>
systemctl <span class="token builtin class-name">enable</span> multipathd.service <span class="token operator">&amp;&amp;</span> systemctl status multipathd.service

<span class="token comment">## 检查HBA卡</span>
lspci <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-i</span> fibre

<span class="token comment">## 查询HBA卡WWN号</span>
<span class="token comment">## 查询光模块</span>
<span class="token function">ls</span> /sys/class/fc_host/
<span class="token comment">## 其中X代表不同的数字</span>
<span class="token function">cat</span> /sys/class/fc_host/hostX/port_name
<span class="token comment">## 说明：通常Emulex的HBA的WWN的第一个数字为1，Qlogic的HBA的WWN的第一个数字为2。</span>

<span class="token comment">## 查看设备的WWID</span>
<span class="token comment">## 1) RedHat 5.X及之前版本使用如下脚本命令</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">cat</span> /proc/partitions <span class="token operator">|</span> <span class="token function">awk</span> <span class="token punctuation">{</span><span class="token string">&#39;print $4&#39;</span><span class="token punctuation">}</span> <span class="token operator">|</span> <span class="token function">grep</span> sd<span class="token variable">\`</span></span>
<span class="token keyword">do</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Device: <span class="token variable">$i</span> WWID: <span class="token variable"><span class="token variable">\`</span>scsi_id <span class="token parameter variable">-g</span> <span class="token parameter variable">-u</span> <span class="token parameter variable">-s</span> /block/$i<span class="token variable">\`</span></span>&quot;</span>
<span class="token keyword">done</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-k4</span>
<span class="token comment">## 2) RedHat 6.X及之后版本使用如下脚本命令</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">cat</span> /proc/partitions <span class="token operator">|</span> <span class="token function">awk</span> <span class="token punctuation">{</span><span class="token string">&#39;print $4&#39;</span><span class="token punctuation">}</span> <span class="token operator">|</span> <span class="token function">grep</span> sd<span class="token variable">\`</span></span>
<span class="token keyword">do</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Device: <span class="token variable">$i</span> WWID: <span class="token variable"><span class="token variable">\`</span>scsi_id <span class="token parameter variable">--page</span><span class="token operator">=</span>0x83 <span class="token parameter variable">--whitelisted</span> <span class="token parameter variable">--device</span><span class="token operator">=</span>/dev/$i<span class="token variable">\`</span></span>&quot;</span>
<span class="token keyword">done</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-k4</span>


<span class="token comment">###### 使用多路径设备</span>
<span class="token comment">## 加载dm-multipath模块</span>
modprobe dm-multipath
<span class="token comment">## 重启multipath服务</span>
systemctl restart multipathd.service
<span class="token comment">## 查看多路径状态</span>
multipath <span class="token parameter variable">-ll</span>
<span class="token comment">## 映射的磁盘为/dev/mapper/mpath2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function i(c,o){return n(),a("div",null,[e(" more "),t])}const m=s(p,[["render",i],["__file","15.多路径软件.html.vue"]]);export{m as default};
