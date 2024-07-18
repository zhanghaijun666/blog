import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as p,c as r,e as c,a,d as n,w as e,f as o,b as l}from"./app-efa5e96e.js";const d={},m={class:"table-of-contents"},v=o(`<h2 id="邮件队列" tabindex="-1"><a class="header-anchor" href="#邮件队列" aria-hidden="true">#</a> 邮件队列</h2><p>Postfix 有以下四种邮件队列，均由管理队列的进程统一进行管理</p><ul><li>maildrop：本地邮件放置在 maildrop 中，同时也被拷贝到 incoming 中。</li><li>incoming：放置正在到达队列或管理进程尚未发现的邮件。</li><li>active：放置队列管理进程已经打开了并正准备投递的邮件，该队列有长度的限制。</li><li>deferred：放置不能被投递的邮件。可能是推迟发送的邮件</li></ul><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动postfix</span>
/usr/sbin/postfix start
<span class="token comment"># 停止postfix</span>
/usr/sbin/postfix stop
<span class="token comment"># 检查postfix配置文件</span>
/usr/sbin/postfix check
<span class="token comment"># 显示Postfix当前生效的配置信息</span>
postconf <span class="token parameter variable">-n</span>
<span class="token comment"># 重新读取postfix配置文件</span>
/usr/sbin/postfix reload
<span class="token comment"># 查看队列中的邮件</span>
mailq
postqueue <span class="token parameter variable">-p</span>
<span class="token comment"># 查看队列大小</span>
mailq <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>
postqueue <span class="token parameter variable">-p</span> <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>
<span class="token comment"># 查看信件內容</span>
postcat <span class="token parameter variable">-q</span> Queue_ID
<span class="token comment"># 强制发送队列中的邮件</span>
/usr/sbin/postfix flush
postqueue <span class="token parameter variable">-f</span>
<span class="token comment"># 暂缓发送队列中的问题邮件</span>
postsuper <span class="token parameter variable">-h</span> Queue_ID
postsuper <span class="token parameter variable">-h</span> ALL deferred
<span class="token comment"># 解除暂缓发送的邮件</span>
postsuper <span class="token parameter variable">-H</span> Queue_ID
postsuper <span class="token parameter variable">-H</span> ALL deferred
<span class="token comment"># 重新加入队列：</span>
postsuper <span class="token parameter variable">-r</span> Queue_ID
postsuper <span class="token parameter variable">-r</span> ALL
<span class="token comment"># 刪除指定邮件</span>
postsuper <span class="token parameter variable">-d</span> Queue_ID
<span class="token comment"># 清空队列中的邮件</span>
postsuper <span class="token parameter variable">-d</span> ALL
<span class="token comment"># 删除队列中有问题的邮件（正在deferred列表中的邮件，直接删除邮件文件，可看出哪些信被刪除了 ):</span>
postsuper <span class="token parameter variable">-d</span> ALL deferred
<span class="token function">find</span> /var/spool/postfix/deferred <span class="token parameter variable">-type</span> f <span class="token parameter variable">-exec</span> <span class="token function">rm</span> <span class="token parameter variable">-vf</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">\\</span><span class="token punctuation">;</span>
<span class="token comment"># find /var/spool/postfix/defer -type f -exec rm -vf {} \\;</span>
<span class="token comment"># 列出所有问题邮件（目前所有无法发送的邮件）</span>
<span class="token function">find</span> /var/spool/postfix/deferred <span class="token parameter variable">-type</span> f <span class="token parameter variable">-exec</span> <span class="token function">ls</span> <span class="token parameter variable">-l</span> --time-style<span class="token operator">=</span>+%Y-%m-%d_%H:%M:%S <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">\\</span><span class="token punctuation">;</span>
<span class="token comment"># 删除已经3天未发出的邮件</span>
<span class="token function">find</span> /var/spool/postfix/deferred <span class="token parameter variable">-type</span> f <span class="token parameter variable">-mtime</span> +3 <span class="token parameter variable">-exec</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">\\</span><span class="token punctuation">;</span>
<span class="token comment"># 删除超过5天的问题邮件的退信记录（超过5天的“defer”列表中的退信）</span>
<span class="token function">find</span> /var/spool/postfix/defer <span class="token parameter variable">-type</span> f <span class="token parameter variable">-mtime</span> +5 <span class="token parameter variable">-exec</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">\\</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常用日志" tabindex="-1"><a class="header-anchor" href="#常用日志" aria-hidden="true">#</a> 常用日志</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看系统日志：</span>
<span class="token function">tail</span> <span class="token parameter variable">-f</span> /var/log/messages
<span class="token comment"># 查看邮件日志：基本很全面，几乎所有遇到的邮件问题都可以通过该日志来处理</span>
<span class="token function">tail</span> <span class="token parameter variable">-f</span> /var/log/maillog
<span class="token comment"># maildrop相关</span>
<span class="token function">tail</span> <span class="token parameter variable">-f</span> /var/log/maildrop.log
<span class="token comment"># clamd相关：</span>
<span class="token function">tail</span> <span class="token parameter variable">-f</span> /var/log/clamav/clamd.log
<span class="token function">tail</span> <span class="token parameter variable">-f</span> /var/log/clamav/freshclam.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7);function u(b,k){const s=t("router-link");return p(),r("div",null,[c(" more "),a("nav",m,[a("ul",null,[a("li",null,[n(s,{to:"#邮件队列"},{default:e(()=>[l("邮件队列")]),_:1})]),a("li",null,[n(s,{to:"#常用命令"},{default:e(()=>[l("常用命令")]),_:1})]),a("li",null,[n(s,{to:"#常用日志"},{default:e(()=>[l("常用日志")]),_:1})])])]),v])}const _=i(d,[["render",u],["__file","60.邮件服务器Postfix.html.vue"]]);export{_ as default};
