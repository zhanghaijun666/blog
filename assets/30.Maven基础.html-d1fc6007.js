import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o as t,c as o,e as r,a,d as p,w as l,f as i,b as c}from"./app-efa5e96e.js";const u={},d={class:"table-of-contents"},v=i(`<h2 id="maven-初始化项目" tabindex="-1"><a class="header-anchor" href="#maven-初始化项目" aria-hidden="true">#</a> maven 初始化项目</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 创建一个名为 maven-demo 的 Maven 项目，请参考 Maven创建项目。</span>
​mvn archetype:generate <span class="token punctuation">\\</span>
  <span class="token parameter variable">-DgroupId</span><span class="token operator">=</span>haijunit.top <span class="token punctuation">\\</span>
  <span class="token parameter variable">-DartifactId</span><span class="token operator">=</span>maven-demo <span class="token punctuation">\\</span>
  <span class="token parameter variable">-DarchetypeArtifactId</span><span class="token operator">=</span>maven-demo <span class="token punctuation">\\</span>
  <span class="token parameter variable">-DinteractiveMode</span><span class="token operator">=</span>false

<span class="token comment">## 创建quarkus项目</span>
mvn io.quarkus.platform:quarkus-maven-plugin:2.7.1.Final:create <span class="token punctuation">\\</span>
    <span class="token parameter variable">-DprojectGroupId</span><span class="token operator">=</span>org.acme <span class="token punctuation">\\</span>
    <span class="token parameter variable">-DprojectArtifactId</span><span class="token operator">=</span>getting-started <span class="token punctuation">\\</span>
    <span class="token parameter variable">-Dextensions</span><span class="token operator">=</span><span class="token string">&quot;resteasy&quot;</span>
<span class="token builtin class-name">cd</span> getting-started

mvn <span class="token string">&quot;io.quarkus:quarkus-maven-plugin:create&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-DprojectGroupId</span><span class="token operator">=</span><span class="token string">&quot;com.bolingcavalry&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-DprojectArtifactId</span><span class="token operator">=</span><span class="token string">&quot;hello-quarkus&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-DprojectVersion</span><span class="token operator">=</span><span class="token string">&quot;1.0-SNAPSHOT&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-DclassName</span><span class="token operator">=</span><span class="token string">&quot;HobbyResource&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-Dpath</span><span class="token operator">=</span><span class="token string">&quot;actions&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function m(k,b){const n=e("router-link");return t(),o("div",null,[r(" more "),a("nav",d,[a("ul",null,[a("li",null,[p(n,{to:"#maven-初始化项目"},{default:l(()=>[c("maven 初始化项目")]),_:1})])])]),v])}const h=s(u,[["render",m],["__file","30.Maven基础.html.vue"]]);export{h as default};
