import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as i,c as o,a as n,b as e,d as t,f as c}from"./app-efa5e96e.js";const r={},d=n("h2",{id:"css中bem书写规范",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#css中bem书写规范","aria-hidden":"true"},"#"),e(" Css中BEM书写规范")],-1),p=n("p",null,"BEM是Block（块）、Element（元素）、Modifier（修饰符）的简写，是一种组件化的 CSS 命名方法和规范",-1),u=n("p",null,"BEM是基于组件的web开发方法。其思想是将用户界面分隔为独立的块，从而使开发复杂的UI界面变得更简单和快，且不需要粘贴复制便可复用现有代码。",-1),m=n("p",null,"BEM由Block、Element、Modifier组成。选择器里用以下连接符扩展他们的关系：",-1),v={href:"http://getbem.com/naming/",target:"_blank",rel:"noopener noreferrer"},_=c(`<ul><li><code>__</code>：双下划线 用来连接块和块的子元素</li><li><code>-</code>： 中划线，仅作为连字符使用</li><li><code>--</code>：双中划线 表示不同状态或不同版本</li></ul><h2 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念" aria-hidden="true">#</a> 基本概念</h2><ul><li>Block(块) <blockquote><p>代码片段可能被复用且这段代码不依赖其他组件即可用Block。块可以互相嵌套,可以嵌套任意多层。</p></blockquote></li><li>Element（元素） <blockquote><p>Element是Block的一部分，没有独立存在的意义。任何一个Element语义上是和Block绑定的。</p></blockquote></li><li>Modifier（修饰符） <blockquote><p>Modifier是Block或Element上的标记。使用它们来改变样式，行为或状态。与块或元素连接符为&#39;--&#39;。</p></blockquote></li></ul><h2 id="实例" tabindex="-1"><a class="header-anchor" href="#实例" aria-hidden="true">#</a> 实例</h2><div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token selector">.overview</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">/** 块 */</span>
<span class="token selector">.overview__row</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">/** 元素 */</span>
<span class="token selector">.overview__row--right</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">/** 修饰符 */</span>

<span class="token comment">/** 嵌套写法 */</span>
<span class="token selector">.overview</span><span class="token punctuation">{</span>
  <span class="token selector">&amp;__row</span> <span class="token punctuation">{</span>
    <span class="token selector">&amp;__righu</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token selector">&amp;__row--right</span> <span class="token punctuation">{</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">/**
__和--的区别
  __ 表示的就是下级元素
  -- 表示的是不同的形态
      就是另一个类名，另一种样式，就像overview__row中有公共的样式，而overview__row--right中具有非公共的样式，是特有的样式

&amp;符号表示嵌套的上一级
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function k(b,h){const s=l("ExternalLinkIcon");return i(),o("div",null,[d,n("blockquote",null,[p,u,m,n("p",null,[e("引用："),n("a",v,[e("http://getbem.com/naming/"),t(s)])])]),_])}const E=a(r,[["render",k],["__file","31.CSS的BEM规范.html.vue"]]);export{E as default};
