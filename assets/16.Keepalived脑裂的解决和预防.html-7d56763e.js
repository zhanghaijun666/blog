import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as a,f as e}from"./app-efa5e96e.js";const p={},t=e(`<h2 id="keepalived脑裂的解决和预防" tabindex="-1"><a class="header-anchor" href="#keepalived脑裂的解决和预防" aria-hidden="true">#</a> Keepalived脑裂的解决和预防</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span>:/usr/sbin
<span class="token comment">## 脑裂检查及控制：第三方仲裁机制，使用ping网关ip方式</span>
<span class="token comment">## 循环次数</span>
<span class="token assign-left variable">CHECK_TIME</span><span class="token operator">=</span><span class="token number">3</span>
<span class="token comment">## 虚拟ip</span>
<span class="token assign-left variable">VIP</span><span class="token operator">=</span><span class="token variable">$1</span>
<span class="token comment">## 网关ip(根据实际环境修改)</span>
<span class="token assign-left variable">GATEWAY</span><span class="token operator">=</span><span class="token number">192.168</span>.1.8
<span class="token comment">## 本机网卡</span>
<span class="token assign-left variable">eth</span><span class="token operator">=</span>enp2s0
<span class="token comment">## 服务器和网关通信状态  0=失败，1=成功</span>
<span class="token assign-left variable">keepalived_communication_status</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token comment">## 是否获取vip状态 0=失败，1=成功</span>
<span class="token assign-left variable">get_vip_status</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token comment">## keepalived服务状态 0=未运行，1=运行中</span>
<span class="token assign-left variable">keepalived_service_status</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token comment">## 服务状态运行中字符串</span>
<span class="token assign-left variable">active_status_str</span><span class="token operator">=</span><span class="token string">&#39;active (running)&#39;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;开始执行脚本 check_gateway.sh <span class="token variable">$VIP</span>；时间:&quot;</span>
<span class="token function">date</span>
<span class="token comment">## 查看是否获取vip状态</span>
<span class="token keyword">function</span> <span class="token function-name function">check_get_vip_status</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">## 通过ip add命令查看ip信息，搜索$VIP，统计行数，是否等于1</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">ip</span> <span class="token function">add</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;<span class="token variable">$VIP</span>&quot;</span> <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span><span class="token variable">)</span></span> <span class="token parameter variable">-eq</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token assign-left variable">get_vip_status</span><span class="token operator">=</span><span class="token number">1</span>
  <span class="token keyword">else</span>
    <span class="token assign-left variable">get_vip_status</span><span class="token operator">=</span><span class="token number">0</span>
  <span class="token keyword">fi</span>
  <span class="token builtin class-name">return</span> <span class="token variable">$get_vip_status</span>
<span class="token punctuation">}</span>
 
<span class="token comment">## 检查通信状态</span>
<span class="token keyword">function</span> <span class="token function-name function">check_keepalived_status</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">## 检测$VIP 能否ping通$GATEWAY：使用$eth网络设备（-I $eth），发送数据包5（-c 5），源地址$VIP询问目的地[vip] $GATEWAY [网关地址 公用参考ip]（-s $VIP $GATEWAY） 日志不保存 &gt;/dev/null 2&gt;&amp;1</span>
  /sbin/arping <span class="token parameter variable">-I</span> <span class="token variable">$eth</span> <span class="token parameter variable">-c</span> <span class="token number">5</span> <span class="token parameter variable">-s</span> <span class="token variable">$VIP</span> <span class="token variable">$GATEWAY</span> <span class="token operator">&gt;</span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span>
  <span class="token comment">## 判断上一步执行结果 等于0成功</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token assign-left variable">keepalived_communication_status</span><span class="token operator">=</span><span class="token number">1</span>
  <span class="token keyword">else</span>
    <span class="token assign-left variable">keepalived_communication_status</span><span class="token operator">=</span><span class="token number">0</span>
  <span class="token keyword">fi</span>
  <span class="token builtin class-name">return</span> <span class="token variable">$keepalived_communication_status</span>
<span class="token punctuation">}</span>
 
<span class="token comment">## 检查keepalived服务状态</span>
<span class="token keyword">function</span> <span class="token function-name function">check_keepalived_service_status</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">## 通过systemctl status keepalived.service命令查看keepalived服务状态，搜索$active_status_str，统计行数，是否等于1</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$(</span>systemctl status keepalived.service <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;<span class="token variable">$active_status_str</span>&quot;</span> <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span><span class="token variable">)</span></span> <span class="token parameter variable">-eq</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token assign-left variable">keepalived_service_status</span><span class="token operator">=</span><span class="token number">1</span>
  <span class="token keyword">else</span>
    <span class="token assign-left variable">keepalived_service_status</span><span class="token operator">=</span><span class="token number">0</span>
  <span class="token keyword">fi</span>
  <span class="token builtin class-name">return</span> <span class="token variable">$keepalived_service_status</span>
<span class="token punctuation">}</span>
 
<span class="token comment">## 循环执行</span>
<span class="token comment">## 判断$CHECK_TIME 不等于 0</span>
<span class="token keyword">while</span> <span class="token punctuation">[</span> <span class="token variable">$CHECK_TIME</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token comment">## 执行check_get_vip_status获取get_vip_status</span>
  check_get_vip_status
  <span class="token comment">## 未获取vip</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$get_vip_status</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token comment">## 修改CHECK_TIME值 结束循环</span>
    <span class="token assign-left variable">CHECK_TIME</span><span class="token operator">=</span><span class="token number">0</span>
    <span class="token comment">## 检查服务状态 执行check_keepalived_service_status获取keepalived_service_status</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$keepalived_service_status</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;执行脚本 check_gateway.sh <span class="token variable">$VIP</span>；启动keepalived服务&quot;</span>
      systemctl start keepalived.service
    <span class="token keyword">fi</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;执行脚本 check_gateway.sh <span class="token variable">$VIP</span>；执行结果：未获取vip，无需处理，脚本执行结束，时间:&quot;</span>
    <span class="token function">date</span>
    <span class="token comment">## 正常运行程序并退出程序</span>
    <span class="token builtin class-name">exit</span> <span class="token number">0</span>
  <span class="token keyword">fi</span>
  <span class="token comment">## $CHECK_TIME  = $CHECK_TIME-1</span>
  <span class="token builtin class-name">let</span> <span class="token string">&quot;CHECK_TIME -= 1&quot;</span>
  <span class="token comment">## 执行check_keepalived_status获取keepalived_communication_status</span>
  check_keepalived_status
  <span class="token comment">## 判断 $keepalived_communication_status = 1 通信成功</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$keepalived_communication_status</span> <span class="token operator">=</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token comment">## 修改CHECK_TIME值 结束循环</span>
    <span class="token assign-left variable">CHECK_TIME</span><span class="token operator">=</span><span class="token number">0</span>
    <span class="token comment">## 检查服务状态 执行check_keepalived_service_status获取keepalived_service_status</span>
    check_keepalived_service_status
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$keepalived_service_status</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;执行脚本 check_gateway.sh <span class="token variable">$VIP</span>；启动keepalived服务&quot;</span>
      systemctl start keepalived.service
    <span class="token keyword">fi</span>
 
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;执行脚本 check_gateway.sh <span class="token variable">$VIP</span>；GATEWAY=<span class="token variable">$GATEWAY</span>，执行结果：通信正常，无需处理，脚本执行结束，时间:&quot;</span>
    <span class="token function">date</span>
    <span class="token comment">## 正常运行程序并退出程序</span>
    <span class="token builtin class-name">exit</span> <span class="token number">0</span>
  <span class="token keyword">fi</span>
  <span class="token comment">## 通信失败&amp;&amp;连续3次</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$keepalived_communication_status</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token variable">$CHECK_TIME</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token comment">## 关闭keepalived</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;执行脚本 check_gateway.sh <span class="token variable">$VIP</span>；关闭keepalived服务&quot;</span>
    systemctl stop keepalived.service
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;执行脚本 check_gateway.sh <span class="token variable">$VIP</span>；GATEWAY=<span class="token variable">$GATEWAY</span>，执行结果：通信失败&amp;&amp;连续3次 关闭keepalived，脚本执行结束，时间:&quot;</span>
    <span class="token function">date</span>
    <span class="token comment">## 非正常运行程序并退出程序</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
  <span class="token keyword">fi</span>
  <span class="token function">sleep</span> <span class="token number">3</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),l=[t];function i(c,o){return n(),a("div",null,l)}const k=s(p,[["render",i],["__file","16.Keepalived脑裂的解决和预防.html.vue"]]);export{k as default};
