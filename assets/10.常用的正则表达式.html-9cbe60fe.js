import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as e,c as o,a as n,d as c,w as p,f as l,b as i}from"./app-efa5e96e.js";const u={},r={class:"table-of-contents"},d=l(`<h2 id="消除注释" tabindex="-1"><a class="header-anchor" href="#消除注释" aria-hidden="true">#</a> 消除注释</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 删除注释 /* */</span>
/<span class="token punctuation">\\</span>*<span class="token punctuation">(</span>.<span class="token operator">|</span><span class="token punctuation">[</span><span class="token punctuation">\\</span>r<span class="token punctuation">\\</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span>*?<span class="token punctuation">\\</span>*/

<span class="token comment">## 删除注释 //</span>
^<span class="token punctuation">\\</span>s+//<span class="token punctuation">[</span><span class="token punctuation">\\</span>s<span class="token punctuation">\\</span>S<span class="token punctuation">]</span>*?<span class="token punctuation">\\</span>n

<span class="token comment">## 删除xml注释</span>
<span class="token operator">&lt;</span><span class="token operator">!</span>-<span class="token punctuation">[</span><span class="token punctuation">\\</span>s<span class="token punctuation">\\</span>S<span class="token punctuation">]</span>*?--<span class="token operator">&gt;</span>

<span class="token comment">## 删除空白行</span>
^<span class="token punctuation">\\</span>s*<span class="token punctuation">\\</span>n
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function m(k,v){const s=t("router-link");return e(),o("div",null,[n("nav",r,[n("ul",null,[n("li",null,[c(s,{to:"#消除注释"},{default:p(()=>[i("消除注释")]),_:1})])])]),d])}const h=a(u,[["render",m],["__file","10.常用的正则表达式.html.vue"]]);export{h as default};
