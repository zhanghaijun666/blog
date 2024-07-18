import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o as t,c as i,e as l,a as n,d as c,w as o,f as r,b as p}from"./app-efa5e96e.js";const d={},u={class:"table-of-contents"},m=r(`<h2 id="centos7-安装" tabindex="-1"><a class="header-anchor" href="#centos7-安装" aria-hidden="true">#</a> centos7 安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">########################</span>
<span class="token comment">## runner官网：https://docs.gitlab.com/runner/install/bleeding-edge.html</span>
<span class="token comment">## 下载地址：https://gitlab-runner-downloads.s3.amazonaws.com/latest/index.html</span>
<span class="token comment">## runner源码：https://gitlab.com/gitlab-org/gitlab-runner</span>
<span class="token comment">########################</span>

<span class="token comment">#### 方法一：</span>
<span class="token comment"># 添加yum源</span>
<span class="token function">curl</span> <span class="token parameter variable">-L</span> https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.rpm.sh <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">bash</span>
<span class="token comment"># 安装</span>
yum <span class="token function">install</span> gitlab-ci-multi-runner
<span class="token comment"># 注册</span>
gitlab-ci-multi-runner register <span class="token punctuation">\\</span>
  <span class="token parameter variable">--url</span> <span class="token string">&#39;http://192.168.13.100:9091/&#39;</span> <span class="token punctuation">\\</span>
  --registration-token <span class="token string">&#39;82yjHfWPP8A-WdTxs4HW&#39;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--executor</span> <span class="token string">&#39;shell&#39;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--description</span> <span class="token string">&quot;develop&quot;</span> <span class="token punctuation">\\</span>
  --non-interactive <span class="token punctuation">\\</span>
  --tag-list<span class="token operator">=</span>maven,docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function v(b,k){const s=e("router-link");return t(),i("div",null,[l(" more "),n("nav",u,[n("ul",null,[n("li",null,[c(s,{to:"#centos7-安装"},{default:o(()=>[p("centos7 安装")]),_:1})])])]),m])}const g=a(d,[["render",v],["__file","17.Gitlab的Runner机制.html.vue"]]);export{g as default};
