import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as i,c,a as n,d as a,w as e,f as o,b as t}from"./app-efa5e96e.js";const u={},r={class:"table-of-contents"},k=o(`<h2 id="k-命令" tabindex="-1"><a class="header-anchor" href="#k-命令" aria-hidden="true">#</a> k 命令</h2><blockquote><p>是否有过因为使用 kubectl 经常需要重复输入命名空间而苦恼？</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token keyword">function</span> <span class="token function-name function">k</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token assign-left variable">cmdline</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token assign-left variable">HISTTIMEFORMAT</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span> <span class="token function">history</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;$2 == &quot;kubectl&quot; &amp;&amp; (/-n/ || /--namespace/) {for(i=2;i&lt;=NF;i++)printf(&quot;%s &quot;,$i);print &quot;&quot;}&#39;</span> <span class="token operator">|</span> <span class="token function">tail</span> <span class="token parameter variable">-n</span> <span class="token number">1</span><span class="token variable">)</span></span>
 <span class="token assign-left variable">regs</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token string">&#39;\\-n [\\w\\-\\d]+&#39;</span> <span class="token string">&#39;\\-n=[\\w\\-\\d]+&#39;</span> <span class="token string">&#39;\\-\\-namespace [\\w\\-\\d]+&#39;</span> <span class="token string">&#39;\\-\\-namespace=[\\w\\-\\d]+&#39;</span><span class="token punctuation">)</span>
 <span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">\${<span class="token operator">!</span>regs<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>&quot;</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token assign-left variable">reg</span><span class="token operator">=</span><span class="token variable">\${regs<span class="token punctuation">[</span>i<span class="token punctuation">]</span>}</span>
  <span class="token assign-left variable">nsarg</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> $cmdline <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-o</span> <span class="token parameter variable">-P</span> <span class="token string">&quot;<span class="token variable">$reg</span>&quot;</span><span class="token variable">)</span></span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$nsarg</span>&quot;</span> <span class="token operator">==</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   <span class="token builtin class-name">continue</span>
  <span class="token keyword">fi</span>
  <span class="token assign-left variable">cmd</span><span class="token operator">=</span><span class="token string">&quot;kubectl <span class="token variable">$nsarg</span> <span class="token variable">$@</span>&quot;</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$cmd</span>&quot;</span>
  <span class="token variable">$cmd</span>
  <span class="token builtin class-name">return</span>
 <span class="token keyword">done</span>
 <span class="token assign-left variable">cmd</span><span class="token operator">=</span><span class="token string">&quot;kubectl <span class="token variable">$@</span>&quot;</span>
 <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$cmd</span>&quot;</span>
 <span class="token variable">$cmd</span>
<span class="token punctuation">}</span>
<span class="token comment">## 将上述脚本粘贴到当前shell(注册k命令到当前终端session):</span>
<span class="token comment">## 将 k 当作 kubectl 来用，只是不需要输入命名空间，它会调用 kubectl 并自动加上上次使用的非默认的命名空间，</span>
<span class="token comment">## 如果想切换命名空间，再常规的使用一次 kubectl 就行，</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx-测试服务" tabindex="-1"><a class="header-anchor" href="#nginx-测试服务" aria-hidden="true">#</a> nginx 测试服务</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
    <span class="token key atrule">labels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">name</span><span class="token punctuation">:</span> http
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实用命令与脚本" tabindex="-1"><a class="header-anchor" href="#实用命令与脚本" aria-hidden="true">#</a> 实用命令与脚本</h2><h3 id="获取集群所有节点占用的-podcidr" tabindex="-1"><a class="header-anchor" href="#获取集群所有节点占用的-podcidr" aria-hidden="true">#</a> 获取集群所有节点占用的 podCIDR</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get <span class="token function">node</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">&#39;{range .items[*]}{@.spec.podCIDR}{&quot;\\n&quot;}{end}&#39;</span>
<span class="token comment"># 10.233.64.0/24</span>
<span class="token comment"># 10.233.65.0/24</span>
<span class="token comment"># 10.233.66.0/24</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function d(v,m){const s=p("router-link");return i(),c("div",null,[n("nav",r,[n("ul",null,[n("li",null,[a(s,{to:"#k-命令"},{default:e(()=>[t("k 命令")]),_:1})]),n("li",null,[a(s,{to:"#nginx-测试服务"},{default:e(()=>[t("nginx 测试服务")]),_:1})]),n("li",null,[a(s,{to:"#实用命令与脚本"},{default:e(()=>[t("实用命令与脚本")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#获取集群所有节点占用的-podcidr"},{default:e(()=>[t("获取集群所有节点占用的 podCIDR")]),_:1})])])])])]),k])}const h=l(u,[["render",d],["__file","40.高效技巧-kubectl.html.vue"]]);export{h as default};
