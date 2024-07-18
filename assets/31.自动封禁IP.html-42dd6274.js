import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as a,f as e}from"./app-efa5e96e.js";const l={},i=e(`<h2 id="nginx统计" tabindex="-1"><a class="header-anchor" href="#nginx统计" aria-hidden="true">#</a> nginx统计</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## AWK统计access.log，记录每分钟访问超过60次的ip</span>
<span class="token function">awk</span> <span class="token string">&#39;{print $1}&#39;</span> access.log <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-cd</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{if($1&gt;60)print $0}&#39;</span>

<span class="token comment"># 1. awk &#39;{print $1}&#39; access.log   取出access.log的第一列即为ip。</span>
<span class="token comment"># 2. sort | uniq -cd  去重和排序</span>
<span class="token comment"># 3. awk &#39;{if($1&gt;60)print $0}&#39; 判断重复的数量是否超过60个，超过60个就展示出来</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="脚本编写" tabindex="-1"><a class="header-anchor" href="#脚本编写" aria-hidden="true">#</a> 脚本编写</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 编写shell脚本，实现整体功能（写了注释代码）</span>
<span class="token comment">#不能把别人IP一直封着吧，这里就清除掉了</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span> <span class="token operator">&gt;</span> /usr/local/nginx/conf/blockip.conf

<span class="token comment">#前面最开始编写的统计数据功能</span>
<span class="token assign-left variable">ip_list</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">awk</span> <span class="token string">&#39;{print $1}&#39;</span> access.log <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-cd</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{if($1&gt;60)print $0}&#39;</span><span class="token variable">)</span></span>

<span class="token comment">#判断这个变量是否为空</span>
<span class="token keyword">if</span> <span class="token builtin class-name">test</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">$ip_list</span>&quot;</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token comment">#为空写入 11.log中，并重新启动ngnix</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;为空&quot;</span>  <span class="token operator">&gt;&gt;</span> /usr/local/nginx/logs/11.log
  /usr/local/nginx/sbin/nginx <span class="token parameter variable">-s</span> reload
<span class="token keyword">else</span>
  <span class="token comment">#如果不为空 前面加上 deny格式和ip写入blockip.conf中</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;deny&quot;</span> <span class="token variable">$ip_list</span> <span class="token operator">&gt;</span> /usr/local/nginx/conf/blockip.conf
  <span class="token comment">#因为前面携带了行数，所有我们需要去除掉前面的行数，写入后在读取一次</span>
  <span class="token assign-left variable">ip_list2</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">awk</span> <span class="token string">&#39;{print $3}&#39;</span> /usr/local/nginx/conf/blockip.conf<span class="token variable">)</span></span>
  <span class="token comment">#最后再把读取出来的值，在次写入到blockip.conf中</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;deny&quot;</span> <span class="token variable">$ip_list2</span><span class="token string">&quot;;&quot;</span><span class="token operator">&gt;</span> /usr/local/nginx/conf/blockip.conf
  <span class="token comment">#重启ngnix</span>
  /usr/local/nginx/sbin/nginx <span class="token parameter variable">-s</span> reload
  <span class="token comment">#清空之前的日志，从最新的开始截取</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span> <span class="token operator">&gt;</span> /usr/local/nginx/logs/access.log
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="crontab定时" tabindex="-1"><a class="header-anchor" href="#crontab定时" aria-hidden="true">#</a> crontab定时</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">crontab</span> <span class="token parameter variable">-e</span> 
<span class="token comment">## 每一分钟运行一次</span>
* * * * * <span class="token builtin class-name">cd</span> /usr/local/nginx/logs/ <span class="token operator">&amp;&amp;</span> <span class="token function">sh</span> ip_test.sh
<span class="token comment">## 重启一下配置既可</span>
systemctl restart crond.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),c=[i];function t(o,p){return n(),a("div",null,c)}const u=s(l,[["render",t],["__file","31.自动封禁IP.html.vue"]]);export{u as default};
