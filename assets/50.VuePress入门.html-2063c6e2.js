import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as r,c,a as e,b as n,d as s,e as u,w as t,f as l}from"./app-efa5e96e.js";const p={},v={href:"https://vuepress.vuejs.org/zh/",target:"_blank",rel:"noopener noreferrer"},m=e("p",null,"VuePress 由两部分组成：一个以 Vue 驱动的主题系统的简约静态网站生成工具，和一个为编写技术文档而优化的默认主题。它是为了支持 Vue 子项目的文档需求而创建的。",-1),h={class:"table-of-contents"},b=e("h2",{id:"介绍",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#介绍","aria-hidden":"true"},"#"),n(" 介绍")],-1),g=e("h2",{id:"快速上手",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#快速上手","aria-hidden":"true"},"#"),n(" 快速上手")],-1),k={href:"https://v1.vuepress.vuejs.org/zh/guide/getting-started.html",target:"_blank",rel:"noopener noreferrer"},_={href:"https://vuepress.github.io/zh/guide/getting-started.html#%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B",target:"_blank",rel:"noopener noreferrer"},f=l(`<h2 id="初始化工程" tabindex="-1"><a class="header-anchor" href="#初始化工程" aria-hidden="true">#</a> 初始化工程</h2><h3 id="_1、新建文件夹" tabindex="-1"><a class="header-anchor" href="#_1、新建文件夹" aria-hidden="true">#</a> 1、新建文件夹</h3><p>新建一个名为 blog-heye 的文件夹，进入到该文件夹目录下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## VuePress 2.0</span>
<span class="token comment">## 新建文件夹 blog-study</span>
<span class="token function">mkdir</span> blog-study <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> blog-study
<span class="token comment">## 初始化 npm</span>
<span class="token comment"># npm init -y</span>
<span class="token function">yarn</span> init
<span class="token comment">## 添加依赖 VuePress</span>
<span class="token comment"># npm install -D vuepress</span>
<span class="token function">yarn</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> vuepress@next

<span class="token comment">## 新建文件夹 docs</span>
<span class="token function">mkdir</span> docs
<span class="token comment">## 创建 markdown 文件</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;# Hello VuePress!&#39;</span> <span class="token operator">&gt;</span> docs/README.md

<span class="token comment">## git忽略提交</span>
<span class="token builtin class-name">echo</span> node_modules <span class="token operator">&gt;&gt;</span> .gitignore
<span class="token builtin class-name">echo</span> .temp <span class="token operator">&gt;&gt;</span> .gitignore
<span class="token builtin class-name">echo</span> .cache <span class="token operator">&gt;&gt;</span> .gitignore

<span class="token comment">##</span>
<span class="token comment"># ├─ docs</span>
<span class="token comment"># │  ├─ .vuepress</span>
<span class="token comment"># │  │  └─ config.js</span>
<span class="token comment"># │  └─ README.md</span>
<span class="token comment"># ├─ .gitignore</span>
<span class="token comment"># └─ package.json</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、配置-scripts" tabindex="-1"><a class="header-anchor" href="#_2、配置-scripts" aria-hidden="true">#</a> 2、配置 scripts</h3><blockquote><p>在 package.json 里的 scripts 中添加如下代码，不需要修改其它代码</p></blockquote><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;docs:dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress dev docs&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;docs:build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress build docs&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、启动测试" tabindex="-1"><a class="header-anchor" href="#_3、启动测试" aria-hidden="true">#</a> 3、启动测试</h3><p>输入命令启动项目，在浏览器中访问 <code>http://localhost:8080/</code>即可预览效果</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># npm run docs:dev</span>
<span class="token function">yarn</span> docs:dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7、配置首页" tabindex="-1"><a class="header-anchor" href="#_7、配置首页" aria-hidden="true">#</a> 7、配置首页</h2>`,11),x={href:"http://README.md",target:"_blank",rel:"noopener noreferrer"},y=l(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---
home: true
heroImage: /hero.png
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>heroImage 后面的图片是放在<code>.vuepress/public</code>下面的,自动读取</p><h2 id="_8、配置路由" tabindex="-1"><a class="header-anchor" href="#_8、配置路由" aria-hidden="true">#</a> 8、配置路由</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 新建 .vuepress 文件夹</span>
mkdir docs\\<span class="token punctuation">.</span>vuepress

<span class="token comment">//在 .vuepress 文件夹下新建 config.js 文件</span>

<span class="token comment">//config.js 便是一个 Vuepress 网站必要的配置文件，在其中添加如下代码：</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">base</span><span class="token operator">:</span> <span class="token string">&#39;/blog-demo/&#39;</span><span class="token punctuation">,</span>  <span class="token comment">//站点的基础路径</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;blog-demo&#39;</span><span class="token punctuation">,</span>   <span class="token comment">//网站的标题</span>
  <span class="token literal-property property">description</span><span class="token operator">:</span> <span class="token string">&#39;Vuepress blog demo&#39;</span>  <span class="token comment">//描述</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9、配置导航" tabindex="-1"><a class="header-anchor" href="#_9、配置导航" aria-hidden="true">#</a> 9、配置导航</h2><p>在<code>.vupress/config.js</code> 文件添加一些导航栏链接：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>module.exports = {
    themeConfig: {
        // 你的GitHub仓库，请正确填写
        repo: &#39;https://github.com/xxxxxxx/blog&#39;,
        // 自定义仓库链接文字。
        repoLabel: &#39;My GitHub&#39;,
        nav: [
            { text: &#39;Home&#39;, link: &#39;/&#39; },
            { text: &#39;FirstBlog&#39;, link: &#39;/blog/firstBlog.md&#39; }
        ]
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code>docs</code> 目录下新建 <code>blog</code>文件夹。<br> 在 <code>blog</code> 目录下创建 <code>/blog/firstBlog.md</code> 作为我们第一篇博客的内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 博客
这里随便写内容了。。。
比如我的就是该页内容
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_10、加侧边栏" tabindex="-1"><a class="header-anchor" href="#_10、加侧边栏" aria-hidden="true">#</a> 10、加侧边栏</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//.vupress/config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">sidebar</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">[</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;首页&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">[</span><span class="token string">&quot;/blog/FirstBlog.md&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;我的第一篇博客&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_11-、部署" tabindex="-1"><a class="header-anchor" href="#_11-、部署" aria-hidden="true">#</a> 11 、部署</h2><ul><li>在 github 上新建项目</li><li>把本地项目 push 到远程仓库</li><li>修改<code>.vupress/config.js</code>的仓库目录</li><li><code>base</code>设置为与远程仓库<code>/&lt;REPO&gt;/</code>同名，比如我的远程是<code>blog</code>，本地是<code>blog-heye</code>，就改成 blog。</li><li>根目录下创建一个<code>deploy.sh</code>文件</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m &#39;deploy&#39;

# 如果发布到 https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;
git push -f git@github.com:&lt;USERNAME&gt;/&lt;REPO&gt;.git master:gh-pages

cd -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>双击<code>deploy.sh</code> 运行脚本，会自动在我们的 GitHub 仓库中，创建一个名为 <code>gh-pages</code>的分支，而我们要部署到<code>GitHub Pages</code>的正是这个分支。</p>`,15),j=e("code",null,"docs/.vuepress/dist",-1),V=e("code",null,"gh-pages",-1),E=e("br",null,null,-1),q={href:"http://deploy.sh",target:"_blank",rel:"noopener noreferrer"},P=l(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>git push -f https://github.com/&lt;USERNAME&gt;/&lt;REPO&gt;.git master:gh-pages

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在 <code>GitHub</code> 项目点击<code>Setting</code>按钮，找到 <code>GitHub Pages - Source</code>，选择 <code>gh-pages</code>分支，点击 <code>Save</code>按钮后，静静地等待它部署完成即可。<br> 但是我设置的时候发现已经默认是<code>gh-pages</code>分支了。</li></ul><h2 id="主题" tabindex="-1"><a class="header-anchor" href="#主题" aria-hidden="true">#</a> 主题</h2>`,3),S={href:"https://v2.vuepress.vuejs.org/zh/guide/markdown.html",target:"_blank",rel:"noopener noreferrer"},z={href:"https://theme-hope.vuejs.press/zh/",target:"_blank",rel:"noopener noreferrer"},M={href:"https://vuepress-theme-reco.recoluan.com/",target:"_blank",rel:"noopener noreferrer"},A={href:"https://doc.xugaoyi.com/",target:"_blank",rel:"noopener noreferrer"},B={href:"https://github.com/xugaoyi/vuepress-theme-vdoing",target:"_blank",rel:"noopener noreferrer"},w={href:"https://jackray-c.github.io/vuepress-theme-note/",target:"_blank",rel:"noopener noreferrer"},R=l(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">yarn</span> global bin
<span class="token comment">## 查看yarn的目录</span>
<span class="token function">yarn</span> global <span class="token function">dir</span>
<span class="token function">yarn</span> create vuepress-theme-hope my-docs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),C={href:"https://v2.vuepress.vuejs.org/zh/advanced/architecture.html",target:"_blank",rel:"noopener noreferrer"},H={href:"https://v2.vuepress.vuejs.org/zh/advanced/plugin.html",target:"_blank",rel:"noopener noreferrer"},N={href:"https://v2.vuepress.vuejs.org/zh/advanced/theme.html",target:"_blank",rel:"noopener noreferrer"},O=l(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>一、创建环境
想要一键部署vuepress，需要以下账号和服务：

Github账号 (https://github.com/)，
阿里云账号，并使用阿里云账号登录云开发平台 (https://workbench.aliyun.com/) ，为保证最好的使用体验，请使用Chrome浏览器。开通OSS服务。
未开通阿里云OSS的用户，点击链接 (https://workbench.aliyun.com/product/open?code=oss) 开通OSS服务。OSS开通免费，有一定的免费额度，超过额度之后按量付费。
————————————————
版权声明：本文为CSDN博主「萌褚」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/m0_60028455/article/details/125083183
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function D(G,L){const a=o("ExternalLinkIcon"),i=o("router-link");return r(),c("div",null,[e("p",null,[e("a",v,[n("Vuepress 官网"),s(a)])]),m,u(" more "),e("nav",h,[e("ul",null,[e("li",null,[s(i,{to:"#介绍"},{default:t(()=>[n("介绍")]),_:1})]),e("li",null,[s(i,{to:"#快速上手"},{default:t(()=>[n("快速上手")]),_:1})]),e("li",null,[s(i,{to:"#初始化工程"},{default:t(()=>[n("初始化工程")]),_:1}),e("ul",null,[e("li",null,[s(i,{to:"#_1、新建文件夹"},{default:t(()=>[n("1、新建文件夹")]),_:1})]),e("li",null,[s(i,{to:"#_2、配置-scripts"},{default:t(()=>[n("2、配置 scripts")]),_:1})]),e("li",null,[s(i,{to:"#_3、启动测试"},{default:t(()=>[n("3、启动测试")]),_:1})])])]),e("li",null,[s(i,{to:"#_7、配置首页"},{default:t(()=>[n("7、配置首页")]),_:1})]),e("li",null,[s(i,{to:"#_8、配置路由"},{default:t(()=>[n("8、配置路由")]),_:1})]),e("li",null,[s(i,{to:"#_9、配置导航"},{default:t(()=>[n("9、配置导航")]),_:1})]),e("li",null,[s(i,{to:"#_10、加侧边栏"},{default:t(()=>[n("10、加侧边栏")]),_:1})]),e("li",null,[s(i,{to:"#_11-、部署"},{default:t(()=>[n("11 、部署")]),_:1})]),e("li",null,[s(i,{to:"#主题"},{default:t(()=>[n("主题")]),_:1})])])]),b,g,e("blockquote",null,[e("p",null,[n("VuePress 1.0: "),e("a",k,[n("https://v1.vuepress.vuejs.org/zh/guide/getting-started.html"),s(a)])]),e("p",null,[n("VuePress 2.0: "),e("a",_,[n("https://vuepress.github.io/zh/guide/getting-started.html#快速上手"),s(a)])])]),f,e("p",null,[n("打开 "),e("a",x,[n("README.md"),s(a)]),n("，修改为：")]),y,e("p",null,[n("如果"),j,n("已经生成，在 github 上没有找到"),V,n("分支，说明提交出错."),E,n(" 修改 "),e("a",q,[n("deploy.sh"),s(a)]),n(" 提交地址为 http 格式如下：")]),P,e("ul",null,[e("li",null,[e("p",null,[n("Markdown语法: "),e("a",S,[n("https://v2.vuepress.vuejs.org/zh/guide/markdown.html"),s(a)])])]),e("li",null,[e("p",null,[n("VuePress Theme Hope: "),e("a",z,[n("https://theme-hope.vuejs.press/zh/"),s(a)])])]),e("li",null,[e("p",null,[n("vuepress-theme-reco: "),e("a",M,[n("https://vuepress-theme-reco.recoluan.com/"),s(a)])])]),e("li",null,[e("p",null,[n("vuepress-theme-vdoing: "),e("a",A,[n("https://doc.xugaoyi.com/"),s(a)]),n(),e("a",B,[n("https://github.com/xugaoyi/vuepress-theme-vdoing"),s(a)])])]),e("li",null,[e("p",null,[n("Vuepress Theme Note: "),e("a",w,[n("https://jackray-c.github.io/vuepress-theme-note/"),s(a)])])])]),R,e("ul",null,[e("li",null,[n("VuePress架构: "),e("a",C,[n("https://v2.vuepress.vuejs.org/zh/advanced/architecture.html"),s(a)])]),e("li",null,[n("VuePress插件: "),e("a",H,[n("https://v2.vuepress.vuejs.org/zh/advanced/plugin.html"),s(a)])]),e("li",null,[n("VuePress主题: "),e("a",N,[n("https://v2.vuepress.vuejs.org/zh/advanced/theme.html"),s(a)])])]),O])}const F=d(p,[["render",D],["__file","50.VuePress入门.html.vue"]]);export{F as default};
