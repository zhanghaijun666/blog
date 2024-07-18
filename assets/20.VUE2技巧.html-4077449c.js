import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as c,c as i,e as r,a as n,d as a,w as t,b as s,f as u}from"./app-efa5e96e.js";const d={},k={class:"table-of-contents"},v=n("h2",{id:"node-sass",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#node-sass","aria-hidden":"true"},"#"),s(" node-sass")],-1),m=n("h3",{id:"不对应应修改成对应版本号",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#不对应应修改成对应版本号","aria-hidden":"true"},"#"),s(" 不对应应修改成对应版本号")],-1),b={href:"https://www.npmjs.com/package/node-sass",target:"_blank",rel:"noopener noreferrer"},g=u(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sass-loader 4.1.1，node-sass 4.3.0
sass-loader 7.0.3，node-sass 4.7.2
sass-loader 7.3.1，node-sass 4.7.2
sass-loader 7.3.1，node-sass 4.14.1
sass-loader 10.0.1，node-sass 6.0.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="如果node是最新版本-则可以直接使用以下命令安装即可" tabindex="-1"><a class="header-anchor" href="#如果node是最新版本-则可以直接使用以下命令安装即可" aria-hidden="true">#</a> 如果node是最新版本，则可以直接使用以下命令安装即可</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> sass-loader node-sass --save-dev
<span class="token comment">## 或者</span>
cnpm <span class="token function">install</span> sass-loader node-sass --save-dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="如果node不是最新版本-则需要安装对应的版本号才行" tabindex="-1"><a class="header-anchor" href="#如果node不是最新版本-则需要安装对应的版本号才行" aria-hidden="true">#</a> 如果node不是最新版本，则需要安装对应的版本号才行</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> sass-loader@版本号 node-sass@版本号 --save-dev //安装对应的版本
<span class="token comment">## 或者</span>
cnpm <span class="token function">install</span> sass-loader@版本号 node-sass@版本号 --save-dev //安装对应的版本
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="require-context" tabindex="-1"><a class="header-anchor" href="#require-context" aria-hidden="true">#</a> require.context()</h2><p>实际上是 webpack 的方法,vue 工程一般基于 webpack,所以可以使用<br> require.context(directory,useSubdirectories,regExp)<br> 参数:</p><ul><li><code>directory</code>：说明需要检索的目录</li><li><code>useSubdirectories</code>：是否检索子目录</li><li><code>regExp</code>: 匹配文件的正则表达式,一般是文件名</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//如页面需要导入多个组件,原始写法:</span>
<span class="token keyword">import</span> titleCom <span class="token keyword">from</span> <span class="token string">&#39;@/components/home/titleCom&#39;</span>
<span class="token keyword">import</span> bannerCom <span class="token keyword">from</span> <span class="token string">&#39;@/components/home/bannerCom&#39;</span>
<span class="token keyword">import</span> cellCom <span class="token keyword">from</span> <span class="token string">&#39;@/components/home/cellCom&#39;</span>
<span class="token literal-property property">components</span><span class="token operator">:</span><span class="token punctuation">{</span>titleCom<span class="token punctuation">,</span>bannerCom<span class="token punctuation">,</span>cellCom<span class="token punctuation">}</span>

<span class="token comment">//这样就写了大量重复的代码,利用 require.context 可以写成</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> files <span class="token operator">=</span> require<span class="token punctuation">.</span><span class="token function">context</span><span class="token punctuation">(</span><span class="token string">&#39;@/components/home&#39;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.vue$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span>
<span class="token keyword">const</span> modules <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
files<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">key</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  modules<span class="token punctuation">[</span>path<span class="token punctuation">.</span><span class="token function">basename</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token string">&#39;.vue&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">files</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">.</span>default <span class="token operator">||</span> <span class="token function">files</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token literal-property property">components</span><span class="token operator">:</span>modules<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="watch" tabindex="-1"><a class="header-anchor" href="#watch" aria-hidden="true">#</a> watch</h2><ul><li><p>常用用法。场景:表格初始进来需要调查询接口 getList(),然后input 改变会重新查询</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function">inpVal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>立即执行。可以直接利用 watch 的immediate和handler属性简写</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">inpVal</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token literal-property property">handler</span><span class="token operator">:</span> <span class="token string">&#39;getList&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">immediate</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>深度监听。watch 的 deep 属性,深度监听,也就是监听复杂数据类型</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">watch</span><span class="token operator">:</span><span class="token punctuation">{</span>
  <span class="token literal-property property">inpValObj</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token function">handler</span><span class="token punctuation">(</span><span class="token parameter">newVal<span class="token punctuation">,</span>oldVal</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>oldVal<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">deep</span><span class="token operator">:</span><span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>此时发现oldVal和 newVal 值一样; 因为它们索引同一个对象/数组,Vue 不会保留修改之前值的副本;</p><p>所以深度监听虽然可以监听到对象的变化,但是无法监听到具体对象里面那个属性的变化</p></blockquote></li></ul><h2 id="_14种组件通讯" tabindex="-1"><a class="header-anchor" href="#_14种组件通讯" aria-hidden="true">#</a> 14种组件通讯</h2><ul><li><p>props。这个应该非常属性,就是父传子的属性;props 值可以是一个数组或对象;</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 数组:不建议使用</span>
<span class="token literal-property property">props</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token comment">// 对象</span>
<span class="token literal-property property">props</span><span class="token operator">:</span><span class="token punctuation">{</span>
 <span class="token literal-property property">inpVal</span><span class="token operator">:</span><span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span>Number<span class="token punctuation">,</span> <span class="token comment">//传入值限定类型</span>
  <span class="token comment">// type 值可为String,Number,Boolean,Array,Object,Date,Function,Symbol</span>
  <span class="token comment">// type 还可以是一个自定义的构造函数，并且通过 instanceof 来进行检查确认</span>
  <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">//是否必传</span>
  <span class="token keyword">default</span><span class="token operator">:</span><span class="token number">200</span><span class="token punctuation">,</span>  <span class="token comment">//默认值,对象或数组默认值必须从一个工厂函数获取如 default:()=&gt;[]</span>
  <span class="token literal-property property">validator</span><span class="token operator">:</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这个值必须匹配下列字符串中的一个</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token string">&#39;success&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;warning&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;danger&#39;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span>
  <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>$emit。这个也应该非常常见,触发子组件触发父组件给自己绑定的事件,其实就是子传父的方法</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 父组件</span>
<span class="token operator">&lt;</span>home @title<span class="token operator">=</span><span class="token string">&quot;title&quot;</span><span class="token operator">&gt;</span>
<span class="token comment">// 子组件</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">&#39;title&#39;</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token literal-property property">title</span><span class="token operator">:</span><span class="token string">&#39;这是title&#39;</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>vuex</p><blockquote><p>这个也是很常用的,vuex 是一个状态管理器；</p><p>是一个独立的插件,适合数据共享多的项目里面,因为如果只是简单的通讯,使用起来会比较重；</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>state:定义存贮数据的仓库 ,可通过this.$store.state 或mapState访问
getter:获取 store 值,可认为是 store 的计算属性,可通过this.$store.getter 或
       mapGetters访问
mutation:同步改变 store 值,为什么会设计成同步,因为mutation是直接改变 store 值,
         vue 对操作进行了记录,如果是异步无法追踪改变.可通过mapMutations调用
action:异步调用函数执行mutation,进而改变 store 值,可通过 this.$dispatch或mapActions
       访问
modules:模块,如果状态过多,可以拆分成模块,最后在入口通过...解构引入
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>attrs</p><blockquote><p>不常用属性,但是高级用法很常见。</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 父组件</span>
<span class="token operator">&lt;</span>home title<span class="token operator">=</span><span class="token string">&quot;这是标题&quot;</span> width<span class="token operator">=</span><span class="token string">&quot;80&quot;</span> height<span class="token operator">=</span><span class="token string">&quot;80&quot;</span> imgUrl<span class="token operator">=</span><span class="token string">&quot;imgUrl&quot;</span><span class="token operator">/</span><span class="token operator">&gt;</span>

<span class="token comment">// 子组件</span>
<span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$attrs<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//{title: &quot;这是标题&quot;, width: &quot;80&quot;, height: &quot;80&quot;, imgUrl: &quot;imgUrl&quot;}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>

<span class="token comment">//相对应的如果子组件定义了 props,打印的值就是剔除定义的属性</span>
<span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
    <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$attrs<span class="token punctuation">)</span> <span class="token comment">//{title: &quot;这是标题&quot;, height: &quot;80&quot;, imgUrl: &quot;imgUrl&quot;}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>provide和inject</p><blockquote><p>provide 和 inject 主要为高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中;并且这对选项需要一起使用;</p><p>以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//父组件:</span>
<span class="token literal-property property">provide</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">//provide 是一个对象,提供一个属性或方法</span>
  <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token string">&#39;这是 foo&#39;</span><span class="token punctuation">,</span>
  <span class="token function-variable function">fooMethod</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;父组件 fooMethod 被调用&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>

<span class="token comment">// 子或者孙子组件</span>
<span class="token literal-property property">inject</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;fooMethod&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">//数组或者对象,注入到子组件</span>
<span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">fooMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>foo<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">//在父组件下面所有的子组件都可以利用inject</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>provide 和 inject 绑定并不是可响应的。这是官方刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的,对象是因为是引用类型</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//父组件:</span>
<span class="token literal-property property">provide</span><span class="token operator">:</span> <span class="token punctuation">{</span> 
  <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token string">&#39;这是 foo&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>foo<span class="token operator">=</span><span class="token string">&#39;这是新的 foo&#39;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 子或者孙子组件</span>
<span class="token literal-property property">inject</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> 
<span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>foo<span class="token punctuation">)</span> <span class="token comment">//子组件打印的还是&#39;这是 foo&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>parent和children</p><p>parent,父实例；children，子实例。</p><p>children和parent 并不保证顺序，也不是响应式的只能拿到一级父组件和子组件。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//父组件</span>
<span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$children<span class="token punctuation">)</span> 
  <span class="token comment">//可以拿到 一级子组件的属性和方法</span>
  <span class="token comment">//所以就可以直接改变 data,或者调用 methods 方法</span>
<span class="token punctuation">}</span>

<span class="token comment">//子组件</span>
<span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$parent<span class="token punctuation">)</span> <span class="token comment">//可以拿到 parent 的属性和方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>$refs</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 父组件</span>
<span class="token operator">&lt;</span>home ref<span class="token operator">=</span><span class="token string">&quot;home&quot;</span><span class="token operator">/</span><span class="token operator">&gt;</span>

<span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>home<span class="token punctuation">)</span> <span class="token comment">//即可拿到子组件的实例,就可以直接操作 data 和 methods</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>$root</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 父组件</span>
<span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$root<span class="token punctuation">)</span> <span class="token comment">//获取根实例,最后所有组件都是挂载到根实例上</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$root<span class="token punctuation">.</span>$children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">//获取根实例的一级子组件</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$root<span class="token punctuation">.</span>$children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>$children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">//获取根实例的二级子组件</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>.sync</p><blockquote><p>在 vue@1.x 的时候曾作为双向绑定功能存在，即子组件可以修改父组件中的值;</p><p>在 vue@2.0 的由于违背单项数据流的设计被干掉了;</p><p>在 vue@2.3.0+ 以上版本又重新引入了这个 .sync 修饰符。</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 父组件</span>
<span class="token operator">&lt;</span>home <span class="token operator">:</span>title<span class="token punctuation">.</span>sync<span class="token operator">=</span><span class="token string">&quot;title&quot;</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
<span class="token comment">//编译时会被扩展为</span>
<span class="token operator">&lt;</span>home <span class="token operator">:</span>title<span class="token operator">=</span><span class="token string">&quot;title&quot;</span>  @update<span class="token operator">:</span>title<span class="token operator">=</span><span class="token string">&quot;val =&gt; title = val&quot;</span><span class="token operator">/</span><span class="token operator">&gt;</span>

<span class="token comment">// 子组件</span>
<span class="token comment">// 所以子组件可以通过$emit 触发 update 方法改变</span>
<span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">&quot;update:title&quot;</span><span class="token punctuation">,</span> <span class="token string">&#39;这是新的title&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>v-slot</p><blockquote><p>slot,slot-cope,scope 在 2.6.0 中都被废弃,但未被移除；</p><p>作用就是将父组件的 template 传入子组件；</p></blockquote><p>插槽分类:</p><ul><li><p>匿名插槽(也叫默认插槽): 没有命名,有且只有一个：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 父组件</span>
<span class="token operator">&lt;</span>todo<span class="token operator">-</span>list<span class="token operator">&gt;</span> 
    <span class="token operator">&lt;</span>template v<span class="token operator">-</span>slot<span class="token operator">:</span><span class="token keyword">default</span><span class="token operator">&gt;</span>
       任意内容
       <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>我是匿名插槽 <span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>todo<span class="token operator">-</span>list<span class="token operator">&gt;</span> 

<span class="token comment">// 子组件</span>
<span class="token operator">&lt;</span>slot<span class="token operator">&gt;</span>我是默认值<span class="token operator">&lt;</span><span class="token operator">/</span>slot<span class="token operator">&gt;</span>
<span class="token comment">//v-slot:default写上感觉和具名写法比较统一,容易理解,也可以不用写</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>具名插槽: 相对匿名插槽组件slot标签带name命名的:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 父组件</span>
<span class="token operator">&lt;</span>todo<span class="token operator">-</span>list<span class="token operator">&gt;</span> 
    <span class="token operator">&lt;</span>template v<span class="token operator">-</span>slot<span class="token operator">:</span>todo<span class="token operator">&gt;</span>
       任意内容
       <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>我是匿名插槽 <span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>todo<span class="token operator">-</span>list<span class="token operator">&gt;</span> 

<span class="token comment">//子组件</span>
<span class="token operator">&lt;</span>slot name<span class="token operator">=</span><span class="token string">&quot;todo&quot;</span><span class="token operator">&gt;</span>我是默认值<span class="token operator">&lt;</span><span class="token operator">/</span>slot<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>作用域插槽: 子组件内数据可以被父页面拿到(解决了数据只能从父页面传递给子组件)</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 父组件</span>
<span class="token operator">&lt;</span>todo<span class="token operator">-</span>list<span class="token operator">&gt;</span>
 <span class="token operator">&lt;</span>template v<span class="token operator">-</span>slot<span class="token operator">:</span>todo<span class="token operator">=</span><span class="token string">&quot;slotProps&quot;</span> <span class="token operator">&gt;</span>
   <span class="token punctuation">{</span><span class="token punctuation">{</span>slotProps<span class="token punctuation">.</span>user<span class="token punctuation">.</span>firstName<span class="token punctuation">}</span><span class="token punctuation">}</span>
 <span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span> 
<span class="token operator">&lt;</span><span class="token operator">/</span>todo<span class="token operator">-</span>list<span class="token operator">&gt;</span> 
<span class="token comment">//slotProps 可以随意命名</span>
<span class="token comment">//slotProps 接取的是子组件标签slot上属性数据的集合所有v-bind:user=&quot;user&quot;</span>

<span class="token comment">// 子组件</span>
<span class="token operator">&lt;</span>slot name<span class="token operator">=</span><span class="token string">&quot;todo&quot;</span> <span class="token operator">:</span>user<span class="token operator">=</span><span class="token string">&quot;user&quot;</span> <span class="token operator">:</span>test<span class="token operator">=</span><span class="token string">&quot;test&quot;</span><span class="token operator">&gt;</span>
    <span class="token punctuation">{</span><span class="token punctuation">{</span> user<span class="token punctuation">.</span>lastName <span class="token punctuation">}</span><span class="token punctuation">}</span>
 <span class="token operator">&lt;</span><span class="token operator">/</span>slot<span class="token operator">&gt;</span> 
<span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">user</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">lastName</span><span class="token operator">:</span><span class="token string">&quot;Zhang&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">firstName</span><span class="token operator">:</span><span class="token string">&quot;yue&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">test</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token comment">// {{ user.lastName }}是默认数据  v-slot:todo 当父页面没有(=&quot;slotProps&quot;)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>EventBus</p><blockquote><p>就是声明一个全局Vue实例变量 EventBus , 把所有的通信数据，事件监听都存储到这个变量上;</p><p>类似于 Vuex。但这种方式只适用于极小的项目;</p><p>原理就是利用on和emit 并实例化一个全局 vue 实现数据共享</p><p>可以实现平级,嵌套组件传值,但是对应的事件名eventTarget必须是全局唯一的。</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 在 main.js</span>
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$eventBus<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 传值组件</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>$eventBus<span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">&#39;eventTarget&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;这是eventTarget传过来的值&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// 接收组件</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>$eventBus<span class="token punctuation">.</span><span class="token function">$on</span><span class="token punctuation">(</span><span class="token string">&quot;eventTarget&quot;</span><span class="token punctuation">,</span><span class="token parameter">v</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;eventTarget&#39;</span><span class="token punctuation">,</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//这是eventTarget传过来的值</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>broadcast和dispatch</p><blockquote><p>vue 1.x 有这两个方法,事件广播和派发,但是 vue 2.x 删除了，下面是对两个方法进行的封装</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">broadcast</span><span class="token punctuation">(</span><span class="token parameter">componentName<span class="token punctuation">,</span> eventName<span class="token punctuation">,</span> params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>$children<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">child</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> name <span class="token operator">=</span> child<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>componentName<span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>name <span class="token operator">===</span> componentName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      child<span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>child<span class="token punctuation">,</span> <span class="token punctuation">[</span>eventName<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">broadcast</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>child<span class="token punctuation">,</span> <span class="token punctuation">[</span>componentName<span class="token punctuation">,</span> eventName<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token parameter">componentName<span class="token punctuation">,</span> eventName<span class="token punctuation">,</span> params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">var</span> parent <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$parent<span class="token punctuation">;</span>
      <span class="token keyword">var</span> name <span class="token operator">=</span> parent<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>componentName<span class="token punctuation">;</span>
      <span class="token keyword">while</span> <span class="token punctuation">(</span>parent <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token operator">!</span>name <span class="token operator">||</span> name <span class="token operator">!==</span> componentName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        parent <span class="token operator">=</span> parent<span class="token punctuation">.</span>$parent<span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>parent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          name <span class="token operator">=</span> parent<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>componentName<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>parent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        parent<span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>parent<span class="token punctuation">,</span> <span class="token punctuation">[</span>eventName<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">broadcast</span><span class="token punctuation">(</span><span class="token parameter">componentName<span class="token punctuation">,</span> eventName<span class="token punctuation">,</span> params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">broadcast</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> componentName<span class="token punctuation">,</span> eventName<span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="路由传参" tabindex="-1"><a class="header-anchor" href="#路由传参" aria-hidden="true">#</a> 路由传参</h2><ul><li><p>方案一</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 路由定义</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/describe/:id&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Describe&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">component</span><span class="token operator">:</span> Describe
<span class="token punctuation">}</span>
<span class="token comment">// 页面传参</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">/describe/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// 页面获取</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>方案二</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 路由定义</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/describe&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Describe&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">component</span><span class="token operator">:</span> Describe
<span class="token punctuation">}</span>
<span class="token comment">// 页面传参</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Describe&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">params</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> id
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// 页面获取</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>方案三</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 路由定义</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/describe&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Describe&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">component</span><span class="token operator">:</span> Describe
<span class="token punctuation">}</span>
<span class="token comment">// 页面传参</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>$router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/describe&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">query</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">id</span><span class="token operator">:</span> id
  \`<span class="token punctuation">}</span>
<span class="token punctuation">)</span>
<span class="token comment">// 页面获取</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>query<span class="token punctuation">.</span>id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>三种方案对比，方案二参数不会拼接在路由后面,页面刷新参数会丢失；</p><p>方案一和三参数拼接在后面,丑,而且暴露了信息。</p></blockquote></li></ul><h2 id="vue-observable" tabindex="-1"><a class="header-anchor" href="#vue-observable" aria-hidden="true">#</a> Vue.observable</h2><blockquote><p>用法:让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象;</p><p>返回的对象可以直接用于渲染函数和计算属性内，并且会在发生改变时触发相应的更新;</p><p>也可以作为最小化的跨组件状态存储器，用于简单的场景。通讯原理实质上是利用Vue.observable实现一个简易的 vuex</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>
<span class="token comment">// 文件路径 - /store/store.js</span>
<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> store <span class="token operator">=</span> Vue<span class="token punctuation">.</span><span class="token function">observable</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> mutations <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">setCount</span> <span class="token punctuation">(</span><span class="token parameter">count</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    store<span class="token punctuation">.</span>count <span class="token operator">=</span> count
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//使用</span>
<span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>label <span class="token keyword">for</span><span class="token operator">=</span><span class="token string">&quot;bookNum&quot;</span><span class="token operator">&gt;</span>数 量<span class="token operator">&lt;</span><span class="token operator">/</span>label<span class="token operator">&gt;</span>
            <span class="token operator">&lt;</span>button @click<span class="token operator">=</span><span class="token string">&quot;setCount(count+1)&quot;</span><span class="token operator">&gt;</span><span class="token operator">+</span><span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
            <span class="token operator">&lt;</span>span<span class="token operator">&gt;</span><span class="token punctuation">{</span><span class="token punctuation">{</span>count<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">&gt;</span>
            <span class="token operator">&lt;</span>button @click<span class="token operator">=</span><span class="token string">&quot;setCount(count-1)&quot;</span><span class="token operator">&gt;</span><span class="token operator">-</span><span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> store<span class="token punctuation">,</span> mutations <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../store/store&#39;</span> <span class="token comment">// Vue2.6新增API Observable</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Add&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">count</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> store<span class="token punctuation">.</span>count
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">setCount</span><span class="token operator">:</span> mutations<span class="token punctuation">.</span>setCount
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="render-函数" tabindex="-1"><a class="header-anchor" href="#render-函数" aria-hidden="true">#</a> render 函数</h2><blockquote><p>场景:有些代码在 template 里面写会重复很多,所以这个时候 render 函数就有作用啦</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 根据 props 生成标签</span>
<span class="token comment">// 初级</span>
<span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>div v<span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">&quot;level === 1&quot;</span><span class="token operator">&gt;</span> <span class="token operator">&lt;</span>slot<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>slot<span class="token operator">&gt;</span> <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>p v<span class="token operator">-</span><span class="token keyword">else</span><span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">&quot;level === 2&quot;</span><span class="token operator">&gt;</span> <span class="token operator">&lt;</span>slot<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>slot<span class="token operator">&gt;</span> <span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>h1 v<span class="token operator">-</span><span class="token keyword">else</span><span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">&quot;level === 3&quot;</span><span class="token operator">&gt;</span> <span class="token operator">&lt;</span>slot<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>slot<span class="token operator">&gt;</span> <span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>h2 v<span class="token operator">-</span><span class="token keyword">else</span><span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">&quot;level === 4&quot;</span><span class="token operator">&gt;</span> <span class="token operator">&lt;</span>slot<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>slot<span class="token operator">&gt;</span> <span class="token operator">&lt;</span><span class="token operator">/</span>h2<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>strong v<span class="token operator">-</span><span class="token keyword">else</span><span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">&quot;level === 5&quot;</span><span class="token operator">&gt;</span> <span class="token operator">&lt;</span>slot<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>slot<span class="token operator">&gt;</span> <span class="token operator">&lt;</span><span class="token operator">/</span>stong<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>textarea v<span class="token operator">-</span><span class="token keyword">else</span><span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">&quot;level === 6&quot;</span><span class="token operator">&gt;</span> <span class="token operator">&lt;</span>slot<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>slot<span class="token operator">&gt;</span> <span class="token operator">&lt;</span><span class="token operator">/</span>textarea<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>

<span class="token comment">// 优化版,利用 render 函数减小了代码重复率</span>
<span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>child <span class="token operator">:</span>level<span class="token operator">=</span><span class="token string">&quot;level&quot;</span><span class="token operator">&gt;</span>Hello world<span class="token operator">!</span><span class="token operator">&lt;</span><span class="token operator">/</span>child<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>script type<span class="token operator">=</span><span class="token string">&#39;text/javascript&#39;</span><span class="token operator">&gt;</span>
  <span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
  Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;child&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">h</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> tag <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;p&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;strong&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;h1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;h2&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;textarea&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>level<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
      <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>tag<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$slots<span class="token punctuation">.</span>default<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">level</span><span class="token operator">:</span> <span class="token punctuation">{</span>  <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span>  <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token boolean">true</span>  <span class="token punctuation">}</span> 
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>   
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;hehe&#39;</span><span class="token punctuation">,</span>
    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">level</span><span class="token operator">:</span> <span class="token number">3</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>render 和 template 的对比前者适合复杂逻辑,后者适合逻辑简单;</p><p>后者属于声明是渲染，前者属于自定Render函数;</p><p>前者的性能较高，后者性能较低。</p></blockquote><h2 id="异步组件" tabindex="-1"><a class="header-anchor" href="#异步组件" aria-hidden="true">#</a> 异步组件</h2><p>场景:项目过大就会导致加载缓慢,所以异步组件实现按需加载就是必须要做的事啦</p><p>异步注册组件3种方法</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 工厂函数执行 resolve 回调</span>
Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;async-webpack-example&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 这个特殊的 \`require\` 语法将会告诉 webpack</span>
  <span class="token comment">// 自动将你的构建代码切割成多个包, 这些包</span>
  <span class="token comment">// 会通过 Ajax 请求加载</span>
  <span class="token function">require</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;./my-async-component&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> resolve<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 工厂函数返回 Promise</span>
Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span>
  <span class="token string">&#39;async-webpack-example&#39;</span><span class="token punctuation">,</span>
  <span class="token comment">// 这个 \`import\` 函数会返回一个 \`Promise\` 对象。</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;./my-async-component&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>

<span class="token comment">// 工厂函数返回一个配置化组件对象</span>
<span class="token keyword">const</span> <span class="token function-variable function">AsyncComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// 需要加载的组件 (应该是一个 \`Promise\` 对象)</span>
  <span class="token literal-property property">component</span><span class="token operator">:</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;./MyComponent.vue&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token comment">// 异步组件加载时使用的组件</span>
  <span class="token literal-property property">loading</span><span class="token operator">:</span> LoadingComponent<span class="token punctuation">,</span>
  <span class="token comment">// 加载失败时使用的组件</span>
  <span class="token literal-property property">error</span><span class="token operator">:</span> ErrorComponent<span class="token punctuation">,</span>
  <span class="token comment">// 展示加载时组件的延时时间。默认值是 200 (毫秒)</span>
  <span class="token literal-property property">delay</span><span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
  <span class="token comment">// 如果提供了超时时间且组件加载也超时了，</span>
  <span class="token comment">// 则使用加载失败时使用的组件。默认值是：\`Infinity\`</span>
  <span class="token literal-property property">timeout</span><span class="token operator">:</span> <span class="token number">3000</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>异步组件的渲染本质上其实就是执行2次或者2次以上的渲染, 先把当前组件渲染为注释节点,</p><p>当组件加载成功后, 通过 forceRender 执行重新渲染。</p><p>或者是渲染为注释节点, 然后再渲染为loading节点, 在渲染为请求完成的组件</p><p>路由的按需加载</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>webpack<span class="token operator">&lt;</span> <span class="token number">2.4</span> 时
<span class="token punctuation">{</span>
  <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;home&#39;</span><span class="token punctuation">,</span>
  <span class="token function-variable function">components</span><span class="token operator">:</span><span class="token parameter">resolve</span><span class="token operator">=&gt;</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;@/components/home&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>resolve<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

webpack<span class="token operator">&gt;</span> <span class="token number">2.4</span> 时
<span class="token punctuation">{</span>
  <span class="token literal-property property">path</span><span class="token operator">:</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;home&#39;</span><span class="token punctuation">,</span>
  <span class="token function-variable function">components</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;@/components/home&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">import</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">//方法由es6提出，import()方法是动态加载，返回一个Promise对象，then方法的参数是加载到的模块。类似于Node.js的require方法，主要import()方法是异步加载的。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="动态组件" tabindex="-1"><a class="header-anchor" href="#动态组件" aria-hidden="true">#</a> 动态组件</h2><p>场景:做一个 tab 切换时就会涉及到组件动态加载</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>component v<span class="token operator">-</span>bind<span class="token operator">:</span>is<span class="token operator">=</span><span class="token string">&quot;currentTabComponent&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>component<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是这样每次组件都会重新加载,会消耗大量性能,所以 就起到了作用</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>keep<span class="token operator">-</span>alive<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>component v<span class="token operator">-</span>bind<span class="token operator">:</span>is<span class="token operator">=</span><span class="token string">&quot;currentTabComponent&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>component<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>keep<span class="token operator">-</span>alive<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样切换效果没有动画效果,这个也不用着急,可以利用内置的</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>transition<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>keep<span class="token operator">-</span>alive<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>component v<span class="token operator">-</span>bind<span class="token operator">:</span>is<span class="token operator">=</span><span class="token string">&quot;currentTabComponent&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>component<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>keep<span class="token operator">-</span>alive<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>transition<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="递归组件" tabindex="-1"><a class="header-anchor" href="#递归组件" aria-hidden="true">#</a> 递归组件</h2><p>场景:如果开发一个 tree 组件,里面层级是根据后台数据决定的,这个时候就需要用到动态组件</p><p>递归组件必须设置name 和结束的阀值。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>
<span class="token comment">// 递归组件: 组件在它的模板内可以递归的调用自己，只要给组件设置name组件就可以了。</span>
<span class="token comment">// 设置那么House在组件模板内就可以递归使用了,不过需要注意的是，</span>
<span class="token comment">// 必须给一个条件来限制数量，否则会抛出错误: max stack size exceeded</span>
<span class="token comment">// 组件递归用来开发一些具体有未知层级关系的独立组件。比如：</span>
<span class="token comment">// 联级选择器和树形控件 </span>

<span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>div v<span class="token operator">-</span><span class="token keyword">for</span><span class="token operator">=</span><span class="token string">&quot;(item,index) in treeArr&quot;</span><span class="token operator">&gt;</span>
      子组件，当前层级值：<span class="token punctuation">{</span><span class="token punctuation">{</span>index<span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token operator">&lt;</span>br<span class="token operator">/</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 递归调用自身<span class="token punctuation">,</span> 后台判断是否不存在改值 <span class="token operator">--</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>tree <span class="token operator">:</span>item<span class="token operator">=</span><span class="token string">&quot;item.arr&quot;</span> v<span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">&quot;item.flag&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>tree<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token comment">// 必须定义name，组件内部才能递归调用</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;tree&#39;</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 接收外部传入的值</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
     <span class="token literal-property property">item</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span>Array<span class="token punctuation">,</span>
      <span class="token function-variable function">default</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函数式组件" tabindex="-1"><a class="header-anchor" href="#函数式组件" aria-hidden="true">#</a> 函数式组件</h2><blockquote><p>定义:无状态,无法实例化，内部没有任何生命周期处理方法</p><p>规则:在 2.3.0 之前的版本中，如果一个函数式组件想要接收 prop，则 props 选项是必须的。</p><p>在 2.3.0 或以上的版本中，你可以省略 props 选项，所有组件上的特性都会被自动隐式解析为 prop ；</p><p>在 2.5.0 及以上版本中，如果你使用了单文件组件(就是普通的.vue 文件),可以直接在 template 上声明functional组件需要的一切都是通过 context 参数传递。</p><p>context 属性有:</p><p>props：提供所有 prop 的对象；</p><p>children: VNode 子节点的数组；</p><p>slots: 一个函数，返回了包含所有插槽的对象；</p><p>scopedSlots: (2.6.0+) 一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽；</p><p>data：传递给组件的整个数据对象，作为 createElement 的第二个参数传入组件；</p><p>parent：对父组件的引用；</p><p>listeners: (2.3.0+) 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是 data.on 的一个别名；</p><p>injections: (2.3.0+) 如果使用了 inject 选项，则该对象包含了应当被注入的属性</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>template functional<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>div v<span class="token operator">-</span><span class="token keyword">for</span><span class="token operator">=</span><span class="token string">&quot;(item,index) in props.arr&quot;</span><span class="token operator">&gt;</span><span class="token punctuation">{</span><span class="token punctuation">{</span>item<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="components和-vue-component" tabindex="-1"><a class="header-anchor" href="#components和-vue-component" aria-hidden="true">#</a> components和 Vue.component</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//components:局部注册组件</span>
<span class="token keyword">export</span> <span class="token keyword">default</span><span class="token punctuation">{</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span><span class="token punctuation">{</span>home<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//Vue.component:全局注册组件</span>
Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;home&#39;</span><span class="token punctuation">,</span>home<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vue-extend" tabindex="-1"><a class="header-anchor" href="#vue-extend" aria-hidden="true">#</a> Vue.extend</h2><p>场景:vue 组件中有些需要将一些元素挂载到元素上,这个时候 extend 就起到作用了是构造一个组件的语法器</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 创建构造器</span>
<span class="token keyword">var</span> Profile <span class="token operator">=</span> Vue<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;&lt;p&gt;{{extendData}}&lt;/br&gt;实例传入的数据为:{{propsExtend}}&lt;/p&gt;&#39;</span><span class="token punctuation">,</span><span class="token comment">//template对应的标签最外层必须只有一个标签</span>
  <span class="token function-variable function">data</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">extendData</span><span class="token operator">:</span> <span class="token string">&#39;这是extend扩展的数据&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&#39;propsExtend&#39;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 创建的构造器可以挂载到元素上,也可以通过 components 或 Vue.component()注册使用</span>
<span class="token comment">// 挂载到一个元素上。可以通过propsData传参.</span>
<span class="token keyword">new</span> <span class="token class-name">Profile</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">propsData</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token literal-property property">propsExtend</span><span class="token operator">:</span><span class="token string">&#39;我是实例传入的数据&#39;</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app-extend&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// 通过 components 或 Vue.component()注册</span>
Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;Profile&#39;</span><span class="token punctuation">,</span>Profile<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mixins" tabindex="-1"><a class="header-anchor" href="#mixins" aria-hidden="true">#</a> mixins</h2><p>场景:有些组件有些重复的 js 逻辑,如校验手机验证码,解析时间等,mixins 就可以实现这种混入</p><p>mixins 值是一个数组</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> mixin<span class="token operator">=</span><span class="token punctuation">{</span>
    <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">dealTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">methods</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token function">dealTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;这是mixin的dealTime里面的方法&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span><span class="token punctuation">{</span>
  <span class="token literal-property property">mixins</span><span class="token operator">:</span><span class="token punctuation">[</span>mixin<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="extends" tabindex="-1"><a class="header-anchor" href="#extends" aria-hidden="true">#</a> extends</h2><p>extends用法和mixins很相似,只不过接收的参数是简单的选项对象或构造函数,所以extends只能单次扩展一个组件</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> extend<span class="token operator">=</span><span class="token punctuation">{</span>
    <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">dealTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">methods</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token function">dealTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;这是mixin的dealTime里面的方法&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span><span class="token punctuation">{</span>
  <span class="token keyword">extends</span><span class="token operator">:</span>extend
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vue-use" tabindex="-1"><a class="header-anchor" href="#vue-use" aria-hidden="true">#</a> Vue.use()</h2><blockquote><p>场景:我们使用 element时会先 import,再 Vue.use()一下,实际上就是注册组件,触发 install 方法;这个在组件调用会经常使用到;会自动组织多次注册相同的插件.</p></blockquote><h2 id="install" tabindex="-1"><a class="header-anchor" href="#install" aria-hidden="true">#</a> install</h2><blockquote><p>场景:在 Vue.use()说到,执行该方法会触发 install是开发vue的插件,这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象(可选)</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> MyPlugin <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  MyPlugin<span class="token punctuation">.</span><span class="token function-variable function">install</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">Vue<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 2. 添加全局资源,第二个参数传一个值默认是update对应的值</span>
    Vue<span class="token punctuation">.</span><span class="token function">directive</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token function">bind</span><span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> binding<span class="token punctuation">,</span> vnode<span class="token punctuation">,</span> oldVnode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//做绑定的准备工作,添加时间监听</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;指令my-directive的bind执行啦&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function-variable function">inserted</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">//获取绑定的元素</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;指令my-directive的inserted执行啦&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function-variable function">update</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">//根据获得的新值执行对应的更新</span>
      <span class="token comment">//对于初始值也会调用一次</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;指令my-directive的update执行啦&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function-variable function">componentUpdated</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;指令my-directive的componentUpdated执行啦&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function-variable function">unbind</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">//做清理操作</span>
      <span class="token comment">//比如移除bind时绑定的事件监听器</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;指令my-directive的unbind执行啦&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 3. 注入组件</span>
    Vue<span class="token punctuation">.</span><span class="token function">mixin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token function-variable function">created</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;注入组件的created被调用啦&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;options的值为&#39;</span><span class="token punctuation">,</span>options<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// 4. 添加实例方法</span>
    <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$myMethod</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">methodOptions</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;实例方法myMethod被调用啦&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">//调用MyPlugin</span>
  Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>MyPlugin<span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token literal-property property">someOption</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token comment">//3.挂载</span>
  <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vue-nexttick" tabindex="-1"><a class="header-anchor" href="#vue-nexttick" aria-hidden="true">#</a> Vue.nextTick</h2><blockquote><p>场景:页面加载时需要让文本框获取焦点用法:在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">//因为 mounted 阶段 dom 并未渲染完毕,所以需要$nextTick</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>inputs<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//通过 $refs 获取dom 并绑定 focus 方法</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vue-directive" tabindex="-1"><a class="header-anchor" href="#vue-directive" aria-hidden="true">#</a> Vue.directive</h2><blockquote><p>场景:官方给我们提供了很多指令,但是我们如果想将文字变成指定的颜色定义成指令使用,这个时候就需要用到Vue.directive</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 全局定义</span>
Vue<span class="token punctuation">.</span><span class="token function">directive</span><span class="token punctuation">(</span><span class="token string">&quot;change-color&quot;</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span>binding<span class="token punctuation">,</span>vnode</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  el<span class="token punctuation">.</span>style<span class="token punctuation">[</span><span class="token string">&quot;color&quot;</span><span class="token punctuation">]</span><span class="token operator">=</span> binding<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 使用</span>
<span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>div v<span class="token operator">-</span>change<span class="token operator">-</span>color<span class="token operator">=</span>“color”<span class="token operator">&gt;</span><span class="token punctuation">{</span><span class="token punctuation">{</span>message<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
  <span class="token keyword">export</span> <span class="token keyword">default</span><span class="token punctuation">{</span>
    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span><span class="token punctuation">{</span>
        <span class="token literal-property property">color</span><span class="token operator">:</span><span class="token string">&#39;green&#39;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>生命周期</strong></p><blockquote><p>bind 只调用一次，指令第一次绑定到元素时候调用，用这个钩子可以定义一个绑定时执行一次的初始化动作。</p><p>inserted:被绑定的元素插入父节点的时候调用(父节点存在即可调用，不必存在document中)</p><p>update: 被绑定与元素所在模板更新时调用，而且无论绑定值是否有变化，通过比较更新前后的绑定值，忽略不必要的模板更新</p><p>componentUpdate :被绑定的元素所在模板完成一次更新更新周期的时候调用</p><p>unbind: 只调用一次，指令月元素解绑的时候调用</p></blockquote><h2 id="vue-filter" tabindex="-1"><a class="header-anchor" href="#vue-filter" aria-hidden="true">#</a> Vue.filter</h2><blockquote><p>场景:时间戳转化成年月日这是一个公共方法,所以可以抽离成过滤器使用</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 使用</span>
<span class="token comment">// 在双花括号中</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> message <span class="token operator">|</span> capitalize <span class="token punctuation">}</span><span class="token punctuation">}</span>

<span class="token comment">// 在 \`v-bind\` 中</span>
<span class="token operator">&lt;</span>div v<span class="token operator">-</span>bind<span class="token operator">:</span>id<span class="token operator">=</span><span class="token string">&quot;rawId | formatId&quot;</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

<span class="token comment">// 全局注册</span>
Vue<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token string">&#39;stampToYYMMDD&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span><span class="token punctuation">{</span>
  <span class="token comment">// 处理逻辑</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 局部注册</span>
<span class="token literal-property property">filters</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">stampToYYMMDD</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 处理逻辑</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 多个过滤器全局注册</span>
<span class="token comment">// /src/common/filters.js</span>
<span class="token keyword">let</span> <span class="token function-variable function">dateServer</span> <span class="token operator">=</span> <span class="token parameter">value</span> <span class="token operator">=&gt;</span> value<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(\\d{4})(\\d{2})(\\d{2})</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&#39;$1-$2-$3&#39;</span><span class="token punctuation">)</span> 
<span class="token keyword">export</span> <span class="token punctuation">{</span> dateServer <span class="token punctuation">}</span>
<span class="token comment">// /src/main.js</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> custom <span class="token keyword">from</span> <span class="token string">&#39;./common/filters/custom&#39;</span>
Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>custom<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">key</span> <span class="token operator">=&gt;</span> Vue<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> custom<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vue-compile" tabindex="-1"><a class="header-anchor" href="#vue-compile" aria-hidden="true">#</a> Vue.compile</h2><blockquote><p>场景:在 render 函数中编译模板字符串。只在独立构建时有效</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> res <span class="token operator">=</span> Vue<span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&#39;&lt;div&gt;&lt;span&gt;{{ msg }}&lt;/span&gt;&lt;/div&gt;&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">&#39;hello&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">render</span><span class="token operator">:</span> res<span class="token punctuation">.</span>render<span class="token punctuation">,</span>
  <span class="token literal-property property">staticRenderFns</span><span class="token operator">:</span> res<span class="token punctuation">.</span>staticRenderFns
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vue-version" tabindex="-1"><a class="header-anchor" href="#vue-version" aria-hidden="true">#</a> Vue.version</h2><blockquote><p>场景:有些开发插件需要针对不同 vue 版本做兼容,所以就会用到 Vue.version</p><p>用法:Vue.version()可以获取 vue 版本</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> version <span class="token operator">=</span> <span class="token function">Number</span><span class="token punctuation">(</span>Vue<span class="token punctuation">.</span>version<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>version <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Vue v2.x.x</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>version <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Vue v1.x.x</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token comment">// Unsupported versions of Vue</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vue-set" tabindex="-1"><a class="header-anchor" href="#vue-set" aria-hidden="true">#</a> Vue.set()</h2><blockquote><p>场景:当你利用索引直接设置一个数组项时或你修改数组的长度时,</p><p>由于 Object.defineprototype()方法限制,数据不响应式更新。不过vue.3.x 将利用 proxy 这个问题将得到解决。</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 利用 set</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$set</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span>index<span class="token punctuation">,</span>item<span class="token punctuation">)</span>

<span class="token comment">// 利用数组 push(),splice()</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vue-config-keycodes" tabindex="-1"><a class="header-anchor" href="#vue-config-keycodes" aria-hidden="true">#</a> Vue.config.keyCodes</h2><blockquote><p>场景:自定义按键修饰符别名</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 将键码为 113 定义为 f2</span>
Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>keyCodes<span class="token punctuation">.</span>f2 <span class="token operator">=</span> <span class="token number">113</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span>input type<span class="token operator">=</span><span class="token string">&quot;text&quot;</span> @keyup<span class="token punctuation">.</span>f2<span class="token operator">=</span><span class="token string">&quot;add&quot;</span><span class="token operator">/</span><span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vue-config-performance" tabindex="-1"><a class="header-anchor" href="#vue-config-performance" aria-hidden="true">#</a> Vue.config.performance</h2><blockquote><p>场景:监听性能</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//只适用于开发模式和支持 performance.mark API 的浏览器上</span>
Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>performance <span class="token operator">=</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vue-config-errorhandler" tabindex="-1"><a class="header-anchor" href="#vue-config-errorhandler" aria-hidden="true">#</a> Vue.config.errorHandler</h2><blockquote><p>场景:指定组件的渲染和观察期间未捕获错误的处理函数</p><p>规则:从 2.2.0 起，这个钩子也会捕获组件生命周期钩子里的错误。</p><p>同样的，当这个钩子是 undefined 时，被捕获的错误会通过 console.error 输出而避免应用崩溃</p><p>从 2.4.0 起，这个钩子也会捕获 Vue 自定义事件处理函数内部的错误了</p><p>从 2.6.0 起，这个钩子也会捕获 v-on DOM 监听器内部抛出的错误。</p><p>另外，如果任何被覆盖的钩子或处理函数返回一个 Promise 链 (例如 async 函数)，则来自其 Promise 链的错误也会被处理。</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span><span class="token function-variable function">errorHandler</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> vm<span class="token punctuation">,</span> info</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// handle error</span>
  <span class="token comment">// \`info\` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子</span>
  <span class="token comment">// 只在 2.2.0+ 可用</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vue-config-warnhandler" tabindex="-1"><a class="header-anchor" href="#vue-config-warnhandler" aria-hidden="true">#</a> Vue.config.warnHandler</h2><blockquote><p>场景:为 Vue 的运行时警告赋予一个自定义处理函数,只会在开发者环境下生效</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span><span class="token function-variable function">warnHandler</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">msg<span class="token punctuation">,</span> vm<span class="token punctuation">,</span> trace</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// \`trace\` 是组件的继承关系追踪</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="v-pre" tabindex="-1"><a class="header-anchor" href="#v-pre" aria-hidden="true">#</a> v-pre</h2><blockquote><p>场景:vue 是响应式系统,但是有些静态的标签不需要多次编译,这样可以节省性能</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>span v<span class="token operator">-</span>pre<span class="token operator">&gt;</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token keyword">this</span> will not be compiled <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">&gt;</span>   显示的是<span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token keyword">this</span> will not be compiled <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token operator">&lt;</span>span v<span class="token operator">-</span>pre<span class="token operator">&gt;</span><span class="token punctuation">{</span><span class="token punctuation">{</span>msg<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">&gt;</span>     即使data里面定义了msg这里仍然是显示的<span class="token punctuation">{</span><span class="token punctuation">{</span>msg<span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="v-cloak" tabindex="-1"><a class="header-anchor" href="#v-cloak" aria-hidden="true">#</a> v-cloak</h2><blockquote><p>场景:在网速慢的情况下,在使用vue绑定数据的时候，渲染页面时会出现变量闪烁用法:这个指令保持在元素上直到关联实例结束编译。</p><p>和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// template 中</span>
<span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">&quot;#app&quot;</span> v<span class="token operator">-</span>cloak<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span><span class="token punctuation">{</span><span class="token punctuation">{</span>value<span class="token punctuation">.</span>name<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

<span class="token comment">// css 中</span>
<span class="token punctuation">[</span>v<span class="token operator">-</span>cloak<span class="token punctuation">]</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">display</span><span class="token operator">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样就可以解决闪烁,但是会出现白屏,这样可以结合骨架屏使用</p><h2 id="v-once" tabindex="-1"><a class="header-anchor" href="#v-once" aria-hidden="true">#</a> v-once</h2><blockquote><p>场景:有些 template 中的静态 dom 没有改变,这时就只需要渲染一次,可以降低性能开销</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>span v<span class="token operator">-</span>once<span class="token operator">&gt;</span> 这时只需要加载一次的标签<span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>v-once 和 v-pre 的区别:v-once只渲染一次；v-pre不编译,原样输出</p></blockquote><h2 id="事件修饰符" tabindex="-1"><a class="header-anchor" href="#事件修饰符" aria-hidden="true">#</a> 事件修饰符</h2><ul><li>stop:阻止冒泡</li><li>prevent:阻止默认行为</li><li>self:仅绑定元素自身触发</li><li>once: 2.1.4 新增,只触发一次</li><li>passive: 2.3.0 新增,滚动事件的默认行为 (即滚动行为) 将会立即触发,不能和.prevent 一起使用</li></ul><h2 id="按键修饰符和按键码" tabindex="-1"><a class="header-anchor" href="#按键修饰符和按键码" aria-hidden="true">#</a> 按键修饰符和按键码</h2><blockquote><p>场景:有的时候需要监听键盘的行为,如按下 enter 去查询接口等</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 对应键盘上的关键字
.enter
.tab
.delete (捕获“删除”和“退格”键)
.esc
.space
.up
.down
.left
.right
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vue-router" tabindex="-1"><a class="header-anchor" href="#vue-router" aria-hidden="true">#</a> Vue-router</h2><ul><li><p>缓存和动画</p><blockquote><p>路由是使用官方组件 vue-router,使用方法相信大家非常熟悉;</p><p>这里我就叙述下路由的缓存和动画;</p><p>可以用exclude(除了)或者include(包括),2.1.0 新增来判断；</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>transition<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>keep<span class="token operator">-</span>alive <span class="token operator">:</span>include<span class="token operator">=</span><span class="token string">&quot;[&#39;a&#39;, &#39;b&#39;]&quot;</span><span class="token operator">&gt;</span>
  <span class="token comment">//或include=&quot;a,b&quot; :include=&quot;/a|b/&quot;,a 和 b 表示组件的 name</span>
  <span class="token comment">//因为有些页面,如试试数据统计,要实时刷新,所以就不需要缓存</span>
    <span class="token operator">&lt;</span>router<span class="token operator">-</span>view<span class="token operator">/</span><span class="token operator">&gt;</span> <span class="token comment">//路由标签</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>keep<span class="token operator">-</span>alive<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>router<span class="token operator">-</span>view exclude<span class="token operator">=</span><span class="token string">&quot;c&quot;</span><span class="token operator">/</span><span class="token operator">&gt;</span> 
  <span class="token comment">// c 表示组件的 name值</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>transition<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>（注：匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配。）</p></blockquote></li><li><p>全局路由钩子</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>router<span class="token punctuation">.</span><span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;全局前置守卫：beforeEach -- next需要调用&#39;</span><span class="token punctuation">)</span> <span class="token comment">//一般登录拦截用这个,也叫导航钩子守卫</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>path <span class="token operator">===</span> <span class="token string">&#39;/login&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> 
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>router.beforeResolve (v 2.5.0+)和beforeEach类似，</p><p>区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用，即在 beforeEach之后调用；</p><p>router.afterEach全局后置钩子在所有路由跳转结束的时候调用这些钩子不会接受 next 函数也不会改变导航本身</p></blockquote></li><li><p>组件路由钩子</p><blockquote><p>beforeRouteEnter在渲染该组件的对应路由被确认前调用，用法和参数与router.beforeEach类似，next需要被主动调用。</p><p>此时组件实例还未被创建，不能访问this可以通过传一个回调给 next来访问组件实例。</p><p>在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">beforeRouteEnter</span> <span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 这里还无法访问到组件实例，this === undefined</span>
  <span class="token function">next</span><span class="token punctuation">(</span> <span class="token parameter">vm</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 通过 \`vm\` 访问组件实例</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>beforeRouteUpdate (v 2.2+)在当前路由改变，并且该组件被复用时调用，可以通过this访问实例， next需要被主动调用，不能传回调；</p><p>beforeRouteLeave导航离开该组件的对应路由时调用，可以访问组件实例 this，next需要被主动调用，不能传回。</p></blockquote></li><li><p>路由模式</p><blockquote><p>设置 mode 属性:hash或 history</p></blockquote><ul><li><p>Vue.$router</p><blockquote><p>this.$router.push():跳转到不同的url，但这个方法回向history栈添加一个记录，点击后退会返回到上一个页面</p><p>this.$router.replace():不会有记录</p><p>this.$router.go(n):n可为正数可为负数。正数返回上一个页面,类似 window.history.go(n)</p></blockquote></li><li><p>Vue.$route:表示当前跳转的路由对象,</p><blockquote><p>name:路由名称</p><p>path:路径</p><p>query:传参接收值</p><p>params:传参接收值</p><p>fullPath:完成解析后的 URL，包含查询参数和 hash 的完整路径</p><p>matched:路由记录副本</p><p>redirectedFrom:如果存在重定向，即为重定向来源的路由的名字</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>this.$route.params.id:获取通过 params 或/:id传参的参数
this.$route.query.id:获取通过 query 传参的参数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>router-view 的 key</p><blockquote><p>场景:由于 Vue 会复用相同组件, 即 /page/1 =&gt; /page/2 或者 /page?id=1 =&gt; /page?id=2 这类链接跳转时, 将不在执行created, mounted之类的钩子</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;router-view :key=&quot;$route.fullPath&quot;&gt;&lt;/router-view&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>这样组件的 created 和 mounted 就都会执行</p></blockquote></li></ul></li></ul><h2 id="object-freeze" tabindex="-1"><a class="header-anchor" href="#object-freeze" aria-hidden="true">#</a> Object.freeze</h2><blockquote><p>场景:一个长列表数据,一般不会更改,但是vue会做getter和setter的转换</p><p>用法:是ES5新增的特性，可以冻结一个对象，防止对象被修改</p><p>支持:vue 1.0.18+对其提供了支持，对于data或vuex里使用freeze冻结了的对象，vue不会做getter和setter的转换</p><p>注意:冻结只是冻结里面的单个属性,引用地址还是可以更改</p></blockquote><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code>new Vue({
    data: {
        // vue不会对list里的object做getter、setter绑定
        list: Object.freeze([
            { value: 1 },
            { value: 2 }
        ])
    },
    mounted () {
        // 界面不会有响应,因为单个属性被冻结
        this.list[0].value = 100;

        // 下面两种做法，界面都会响应
        this.list = [
            { value: 100 },
            { value: 200 }
        ];
        this.list = Object.freeze([
            { value: 100 },
            { value: 200 }
        ]);
    }
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="调试-template" tabindex="-1"><a class="header-anchor" href="#调试-template" aria-hidden="true">#</a> 调试 template</h2><blockquote><p>场景:在Vue开发过程中, 经常会遇到template模板渲染时JavaScript变量出错的问题,</p><p>此时也许你会通过console.log来进行调试这时可以在开发环境挂载一个 log 函数</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// main.js
Vue.prototype.$log = window.console.log;

// 组件内部
&lt;div&gt;{{$log(info)}}&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vue-loader-小技巧" tabindex="-1"><a class="header-anchor" href="#vue-loader-小技巧" aria-hidden="true">#</a> vue-loader 小技巧</h2><ul><li><p>preserveWhitespace</p><blockquote><p>场景:开发 vue 代码一般会有空格,这个时候打包压缩如果不去掉空格会加大包的体积配置preserveWhitespace可以减小包的体积</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  vue: {
    preserveWhitespace: false
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>transformToRequire</p><blockquote><p>场景:以前在写 Vue 的时候经常会写到这样的代码：把图片提前 require 传给一个变量再传给组件</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// page 代码
&lt;template&gt;
  &lt;div&gt;
    &lt;avatar :img-src=&quot;imgSrc&quot;&gt;&lt;/avatar&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    created () {
      this.imgSrc = require(&#39;./assets/default-avatar.png&#39;)
    }
  }
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>现在:通过配置 transformToRequire 后，就可以直接配置，这样vue-loader会把对应的属性自动 require 之后传给组件</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
// vue-cli 2.x在vue-loader.conf.js 默认配置是
transformToRequire: {
    video: [&#39;src&#39;, &#39;poster&#39;],
    source: &#39;src&#39;,
    img: &#39;src&#39;,
    image: &#39;xlink:href&#39;
}

// 配置文件,如果是vue-cli2.x 在vue-loader.conf.js里面修改
  avatar: [&#39;default-src&#39;]

// vue-cli 3.x 在vue.config.js
// vue-cli 3.x 将transformToRequire属性换为了transformAssetUrls
module.exports = {
  pages,
  chainWebpack: config =&gt; {
    config
      .module
        .rule(&#39;vue&#39;)
        .use(&#39;vue-loader&#39;)
        .loader(&#39;vue-loader&#39;)
        .tap(options =&gt; {
      options.transformAssetUrls = {
        avatar: &#39;img-src&#39;,
      }
      return options;
      });
  }
}

// page 代码可以简化为
&lt;template&gt;
  &lt;div&gt;
    &lt;avatar img-src=&quot;./assets/default-avatar.png&quot;&gt;&lt;/avatar&gt;
  &lt;/div&gt;
&lt;/template&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="为路径设置别名" tabindex="-1"><a class="header-anchor" href="#为路径设置别名" aria-hidden="true">#</a> 为路径设置别名</h2><blockquote><p>场景:在开发过程中，我们经常需要引入各种文件，如图片、CSS、JS等，为了避免写很长的相对路径（../），我们可以为不同的目录配置一个别名</p></blockquote><ul><li><p>vue-cli 2.x 配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 在 webpack.base.config.js中的 resolve 配置项，在其 alias 中增加别名
resolve: {
    extensions: [&#39;.js&#39;, &#39;.vue&#39;, &#39;.json&#39;],
    alias: {
      &#39;vue$&#39;: &#39;vue/dist/vue.esm.js&#39;,
      &#39;@&#39;: resolve(&#39;src&#39;),
    }
  },
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>vue-cli 3.x 配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 在根目录下创建vue.config.js
var path = require(&#39;path&#39;)
function resolve (dir) {
  console.log(__dirname)
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: config =&gt; {
    config.resolve.alias
      .set(key, value) // key,value自行定义，比如.set(&#39;@@&#39;, resolve(&#39;src/components&#39;))
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="img-加载失败" tabindex="-1"><a class="header-anchor" href="#img-加载失败" aria-hidden="true">#</a> img 加载失败</h2><blockquote><p>场景:有些时候后台返回图片地址不一定能打开,所以这个时候应该加一张默认图片</p></blockquote><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>// page 代码
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>imgUrl<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@error</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>handleError<span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span><span class="token punctuation">{</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span><span class="token punctuation">{</span>
      <span class="token literal-property property">imgUrl</span><span class="token operator">:</span><span class="token string">&#39;&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token function">handleError</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>src<span class="token operator">=</span><span class="token function">reqiure</span><span class="token punctuation">(</span><span class="token string">&#39;图片路径&#39;</span><span class="token punctuation">)</span> <span class="token comment">//当然如果项目配置了transformToRequire,参考上面 27.2</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="css" tabindex="-1"><a class="header-anchor" href="#css" aria-hidden="true">#</a> css</h2><ul><li><p>局部样式</p><blockquote><p>Vue中style标签的scoped属性表示它的样式只作用于当前模块，是样式私有化；</p><p>渲染的规则/原理：给HTML的DOM节点添加一个 不重复的data属性来表示唯一性，</p><p>在对应的CSS选择器末尾添加一个当前组件的 data属性选择器来私有化样式，</p><p>如：.demo[data-v-2311c06a]{}如果引入 less 或 sass 只会在最后一个元素上设置</p></blockquote><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">// 原始代码
&lt;template&gt;
  &lt;div class=&quot;demo&quot;&gt;
    &lt;span class=&quot;content&quot;&gt;
      Vue.js scoped
    &lt;/span&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;style lang=&quot;less&quot; scoped&gt;
  .demo</span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
    <span class="token selector">.content</span><span class="token punctuation">{</span>
      <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token selector">&lt;/style&gt;

// 浏览器渲染效果
&lt;div data-v-fed36922&gt;
  Vue.js scoped
&lt;/div&gt;
&lt;style type=&quot;text/css&quot;&gt;
.demo[data-v-039c5b43]</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.demo .content[data-v-039c5b43]</span> <span class="token punctuation">{</span> //.demo 上并没有加 data 属性
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
&lt;/style&gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>deep 属性</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">// 上面样式加一个 /deep/
&lt;style lang=&quot;less&quot; scoped&gt;
  .demo</span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.demo /deep/ .content</span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token selector">&lt;/style&gt;

// 浏览器编译后
&lt;style type=&quot;text/css&quot;&gt;
.demo[data-v-039c5b43]</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.demo[data-v-039c5b43] .content</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,128);function h(f,y){const e=p("router-link"),o=p("ExternalLinkIcon");return c(),i("div",null,[r(" more "),n("nav",k,[n("ul",null,[n("li",null,[a(e,{to:"#node-sass"},{default:t(()=>[s("node-sass")]),_:1}),n("ul",null,[n("li",null,[a(e,{to:"#不对应应修改成对应版本号"},{default:t(()=>[s("不对应应修改成对应版本号")]),_:1})]),n("li",null,[a(e,{to:"#如果node是最新版本-则可以直接使用以下命令安装即可"},{default:t(()=>[s("如果node是最新版本，则可以直接使用以下命令安装即可")]),_:1})]),n("li",null,[a(e,{to:"#如果node不是最新版本-则需要安装对应的版本号才行"},{default:t(()=>[s("如果node不是最新版本，则需要安装对应的版本号才行")]),_:1})])])]),n("li",null,[a(e,{to:"#require-context"},{default:t(()=>[s("require.context()")]),_:1})]),n("li",null,[a(e,{to:"#watch"},{default:t(()=>[s("watch")]),_:1})]),n("li",null,[a(e,{to:"#_14种组件通讯"},{default:t(()=>[s("14种组件通讯")]),_:1})]),n("li",null,[a(e,{to:"#路由传参"},{default:t(()=>[s("路由传参")]),_:1})]),n("li",null,[a(e,{to:"#vue-observable"},{default:t(()=>[s("Vue.observable")]),_:1})]),n("li",null,[a(e,{to:"#render-函数"},{default:t(()=>[s("render 函数")]),_:1})]),n("li",null,[a(e,{to:"#异步组件"},{default:t(()=>[s("异步组件")]),_:1})]),n("li",null,[a(e,{to:"#动态组件"},{default:t(()=>[s("动态组件")]),_:1})]),n("li",null,[a(e,{to:"#递归组件"},{default:t(()=>[s("递归组件")]),_:1})]),n("li",null,[a(e,{to:"#函数式组件"},{default:t(()=>[s("函数式组件")]),_:1})]),n("li",null,[a(e,{to:"#components和-vue-component"},{default:t(()=>[s("components和 Vue.component")]),_:1})]),n("li",null,[a(e,{to:"#vue-extend"},{default:t(()=>[s("Vue.extend")]),_:1})]),n("li",null,[a(e,{to:"#mixins"},{default:t(()=>[s("mixins")]),_:1})]),n("li",null,[a(e,{to:"#extends"},{default:t(()=>[s("extends")]),_:1})]),n("li",null,[a(e,{to:"#vue-use"},{default:t(()=>[s("Vue.use()")]),_:1})]),n("li",null,[a(e,{to:"#install"},{default:t(()=>[s("install")]),_:1})]),n("li",null,[a(e,{to:"#vue-nexttick"},{default:t(()=>[s("Vue.nextTick")]),_:1})]),n("li",null,[a(e,{to:"#vue-directive"},{default:t(()=>[s("Vue.directive")]),_:1})]),n("li",null,[a(e,{to:"#vue-filter"},{default:t(()=>[s("Vue.filter")]),_:1})]),n("li",null,[a(e,{to:"#vue-compile"},{default:t(()=>[s("Vue.compile")]),_:1})]),n("li",null,[a(e,{to:"#vue-version"},{default:t(()=>[s("Vue.version")]),_:1})]),n("li",null,[a(e,{to:"#vue-set"},{default:t(()=>[s("Vue.set()")]),_:1})]),n("li",null,[a(e,{to:"#vue-config-keycodes"},{default:t(()=>[s("Vue.config.keyCodes")]),_:1})]),n("li",null,[a(e,{to:"#vue-config-performance"},{default:t(()=>[s("Vue.config.performance")]),_:1})]),n("li",null,[a(e,{to:"#vue-config-errorhandler"},{default:t(()=>[s("Vue.config.errorHandler")]),_:1})]),n("li",null,[a(e,{to:"#vue-config-warnhandler"},{default:t(()=>[s("Vue.config.warnHandler")]),_:1})]),n("li",null,[a(e,{to:"#v-pre"},{default:t(()=>[s("v-pre")]),_:1})]),n("li",null,[a(e,{to:"#v-cloak"},{default:t(()=>[s("v-cloak")]),_:1})]),n("li",null,[a(e,{to:"#v-once"},{default:t(()=>[s("v-once")]),_:1})]),n("li",null,[a(e,{to:"#事件修饰符"},{default:t(()=>[s("事件修饰符")]),_:1})]),n("li",null,[a(e,{to:"#按键修饰符和按键码"},{default:t(()=>[s("按键修饰符和按键码")]),_:1})]),n("li",null,[a(e,{to:"#vue-router"},{default:t(()=>[s("Vue-router")]),_:1})]),n("li",null,[a(e,{to:"#object-freeze"},{default:t(()=>[s("Object.freeze")]),_:1})]),n("li",null,[a(e,{to:"#调试-template"},{default:t(()=>[s("调试 template")]),_:1})]),n("li",null,[a(e,{to:"#vue-loader-小技巧"},{default:t(()=>[s("vue-loader 小技巧")]),_:1})]),n("li",null,[a(e,{to:"#为路径设置别名"},{default:t(()=>[s("为路径设置别名")]),_:1})]),n("li",null,[a(e,{to:"#img-加载失败"},{default:t(()=>[s("img 加载失败")]),_:1})]),n("li",null,[a(e,{to:"#css"},{default:t(()=>[s("css")]),_:1})])])]),v,m,n("ul",null,[n("li",null,[n("a",b,[s("https://www.npmjs.com/package/node-sass"),a(o)])])]),g])}const w=l(d,[["render",h],["__file","20.VUE2技巧.html.vue"]]);export{w as default};
