import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o as t,c as o,e as i,a as n,d as l,w as c,f as p,b as r}from"./app-efa5e96e.js";const d={},u={class:"table-of-contents"},k=p(`<h2 id="window-下批量重名脚本" tabindex="-1"><a class="header-anchor" href="#window-下批量重名脚本" aria-hidden="true">#</a> window 下批量重名脚本</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>@echo off
setlocal EnableDelayedExpansion

<span class="token builtin class-name">set</span> <span class="token assign-left variable">a</span><span class="token operator">=</span>00
<span class="token builtin class-name">set</span> /p <span class="token assign-left variable">name</span><span class="token operator">=</span>请输入文件名:

<span class="token keyword">for</span> /f  <span class="token string">&quot;delims=&quot;</span> %%n <span class="token keyword">in</span> <span class="token punctuation">(</span><span class="token string">&#39;dir /a-d /b /oen .\\*.*&#39;</span><span class="token punctuation">)</span> <span class="token keyword">do</span> <span class="token punctuation">(</span>
 <span class="token keyword">if</span> not <span class="token string">&quot;%%~nn&quot;</span><span class="token operator">==</span><span class="token string">&quot;%~n0&quot;</span> <span class="token punctuation">(</span>
  <span class="token builtin class-name">set</span> /A <span class="token assign-left variable">a</span><span class="token operator">+=</span><span class="token number">1</span>
  <span class="token keyword">if</span> defined name <span class="token punctuation">(</span>
   ren <span class="token string">&quot;%%n&quot;</span> <span class="token string">&quot;%name%-!a!%%~xn&quot;</span>
  <span class="token punctuation">)</span> <span class="token keyword">else</span> <span class="token punctuation">(</span>
   ren <span class="token string">&quot;%%n&quot;</span> <span class="token string">&quot;!a!%%~xn&quot;</span>
  <span class="token punctuation">)</span>
 <span class="token punctuation">)</span>
<span class="token punctuation">)</span>
<span class="token builtin class-name">exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function v(m,b){const s=e("router-link");return t(),o("div",null,[i(" more "),n("nav",u,[n("ul",null,[n("li",null,[l(s,{to:"#window-下批量重名脚本"},{default:c(()=>[r("window 下批量重名脚本")]),_:1})])])]),k])}const w=a(d,[["render",v],["__file","15.Windows批量重名文件.html.vue"]]);export{w as default};
