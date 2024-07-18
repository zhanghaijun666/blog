import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as r,c as p,e as m,a as n,d as a,w as l,b as s,f as t}from"./app-efa5e96e.js";const d={},u={class:"table-of-contents"},b=t(`<h2 id="基础设置" tabindex="-1"><a class="header-anchor" href="#基础设置" aria-hidden="true">#</a> 基础设置</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 关闭休眠</span>
powercfg <span class="token parameter variable">-h</span> off
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="端口命令" tabindex="-1"><a class="header-anchor" href="#端口命令" aria-hidden="true">#</a> 端口命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">netstat</span> <span class="token parameter variable">-nao</span>                    <span class="token comment"># 列出全部端口信息</span>
<span class="token function">netstat</span> <span class="token parameter variable">-aon</span> <span class="token operator">|</span> findstr <span class="token string">&quot;8081&quot;</span>   <span class="token comment"># 查看被占用端口对应的 PID</span>
tasklist <span class="token operator">|</span> findstr <span class="token string">&quot;9088&quot;</span>       <span class="token comment"># 查看指定 PID 的进程</span>
taskkill /T /F /PID <span class="token number">9088</span>        <span class="token comment"># 强制（/F参数）杀死 pid 为 9088 的所有进程包括子进程（/T参数）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="git-设置" tabindex="-1"><a class="header-anchor" href="#git-设置" aria-hidden="true">#</a> git 设置</h2>`,5),v=n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{bash:"",class:"language-bash"},[n("code",null,[n("span",{class:"token comment"},"# 配置用户名"),s(`
`),n("span",{class:"token function"},"git"),s(" config "),n("span",{class:"token parameter variable"},"--global"),s(" user.name "),n("span",{class:"token string"},'"username"'),s(`
`),n("span",{class:"token comment"},"# 配置邮箱"),s(`
`),n("span",{class:"token function"},"git"),s(" config "),n("span",{class:"token parameter variable"},"--global"),s(" user.email "),n("span",{class:"token string"},'"username@163.com"'),s(`
`),n("span",{class:"token comment"},"# 在`Git Bash Here`命令行输入命令记住密码 -- 即第一次输入用户密码后，之后便可不再输入"),s(`
`),n("span",{class:"token function"},"git"),s(" config "),n("span",{class:"token parameter variable"},"--global"),s(` credential.helper store
`),n("span",{class:"token comment"},"# Git不用管换行符的事情"),s(`
`),n("span",{class:"token function"},"git"),s(" config "),n("span",{class:"token parameter variable"},"--global"),s(" core.autocrlf "),n("span",{class:"token boolean"},"false"),s(`
`),n("span",{class:"token comment"},"# 编码配置"),s(`
`),n("span",{class:"token function"},"git"),s(" config "),n("span",{class:"token parameter variable"},"--global"),s(` gui.encoding utf-8
`),n("span",{class:"token comment"},"# 避免status显示中文乱码"),s(`
`),n("span",{class:"token function"},"git"),s(" config "),n("span",{class:"token parameter variable"},"--global"),s(` core.quotePath off
`),n("span",{class:"token comment"},"# 忽略文件名大小写"),s(`
`),n("span",{class:"token function"},"git"),s(" config "),n("span",{class:"token parameter variable"},"--global"),s(" core.ignorecase "),n("span",{class:"token boolean"},"false"),s(`
`),n("span",{class:"token comment"},"# 生产本地用户的ssh key"),s(`
ssh-keygen

`),n("span",{class:"token function"},"npm"),s(" uninstall "),n("span",{class:"token parameter variable"},"-g"),s(` vue-cli
`),n("span",{class:"token function"},"npm"),s(),n("span",{class:"token function"},"install"),s(),n("span",{class:"token parameter variable"},"-g"),s(` @vue/cli
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),k=n("h2",{id:"node-版本切换",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#node-版本切换","aria-hidden":"true"},"#"),s(" node 版本切换")],-1),g={href:"https://github.com/coreybutler/nvm-windows/releases",target:"_blank",rel:"noopener noreferrer"},h=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nvm off                   <span class="token comment"># 禁用node.js版本管理(不卸载任何东西)</span>
nvm on                    <span class="token comment"># 启用node.js版本管理</span>
nvm <span class="token function">v</span>                     <span class="token comment"># 显示nvm版本</span>
nvm <span class="token function">ls</span>                    <span class="token comment"># 查看已安装node版本</span>
nvm list available        <span class="token comment"># 显示可以安装的所有node.js的版本</span>
nvm <span class="token function">install</span> <span class="token number">16.20</span>.1       <span class="token comment"># 安装对应vXX版本的node</span>
nvm uninstall <span class="token number">16.20</span>.1     <span class="token comment"># 卸载对应vXX版本的node</span>
nvm use <span class="token number">16.20</span>.1           <span class="token comment"># 选择使用XXX版本</span>
nvm <span class="token function">install</span> stable        <span class="token comment"># 安装最新稳定版</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="node-配置" tabindex="-1"><a class="header-anchor" href="#node-配置" aria-hidden="true">#</a> node 配置</h2>`,2),f=n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{bash:"",class:"language-bash"},[n("code",null,[n("span",{class:"token comment"},"# 全局包存放位置 并将`C:\\node\\node_global`添加到环境变量Path中"),s(`
`),n("span",{class:"token function"},"npm"),s(" config "),n("span",{class:"token builtin class-name"},"set"),s(" prefix "),n("span",{class:"token string"},[s('"C:'),n("span",{class:"token entity",title:"\\n"},"\\n"),s("ode"),n("span",{class:"token entity",title:"\\n"},"\\n"),s('ode_global"')]),s(`
`),n("span",{class:"token function"},"npm"),s(" config "),n("span",{class:"token builtin class-name"},"set"),s(" cache "),n("span",{class:"token string"},[s('"C:'),n("span",{class:"token entity",title:"\\n"},"\\n"),s("ode"),n("span",{class:"token entity",title:"\\n"},"\\n"),s('ode_cache"')]),s(`
`),n("span",{class:"token comment"},"# 查看当前源地址"),s(`
`),n("span",{class:"token function"},"npm"),s(` config get registry
`),n("span",{class:"token comment"},"# 修改淘宝镜像地址"),s(`
`),n("span",{class:"token function"},"npm"),s(" config "),n("span",{class:"token builtin class-name"},"set"),s(` registry http://registry.npm.taobao.org/
`),n("span",{class:"token comment"},"# 还原默认镜像地址"),s(`
`),n("span",{class:"token function"},"npm"),s(" config "),n("span",{class:"token builtin class-name"},"set"),s(` registry https://registry.npmjs.org/
`),n("span",{class:"token comment"},"# 查看配置"),s(`
`),n("span",{class:"token function"},"npm"),s(` config list
`),n("span",{class:"token comment"},"# 清除npm的缓存"),s(`
`),n("span",{class:"token function"},"npm"),s(" cache clean "),n("span",{class:"token parameter variable"},"-f"),s(`

`),n("span",{class:"token comment"},"# 安装 yrm"),s(`
`),n("span",{class:"token function"},"npm"),s(),n("span",{class:"token function"},"install"),s(),n("span",{class:"token parameter variable"},"-g"),s(` yrm
`),n("span",{class:"token comment"},"# 列出当前可用的所有镜像源"),s(`
yrm `),n("span",{class:"token function"},"ls"),s(`
`),n("span",{class:"token comment"},"# npm -----  https://registry.npmjs.org/"),s(`
`),n("span",{class:"token comment"},"# cnpm ----  http://r.cnpmjs.org/"),s(`
`),n("span",{class:"token comment"},"# taobao --  https://registry.npm.taobao.org/"),s(`
`),n("span",{class:"token comment"},"# nj ------  https://registry.nodejitsu.com/"),s(`
`),n("span",{class:"token comment"},"# rednpm -- http://registry.mirror.cqupt.edu.cn"),s(`
`),n("span",{class:"token comment"},"# skimdb -- https://skimdb.npmjs.com/registry"),s(`
`),n("span",{class:"token comment"},"# yarn ----  https://registry.yarnpkg.com"),s(`
`),n("span",{class:"token comment"},"# 使用淘宝镜像源"),s(`
yrm use taobao
`),n("span",{class:"token comment"},"# 测试访问速度"),s(`
yrm `),n("span",{class:"token builtin class-name"},"test"),s(` taobao
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),_=t(`<h3 id="yarn-配置" tabindex="-1"><a class="header-anchor" href="#yarn-配置" aria-hidden="true">#</a> yarn 配置</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> <span class="token function">yarn</span>
<span class="token comment"># 查看 yarn 配置</span>
<span class="token function">yarn</span> config get registry
<span class="token function">yarn</span> config list
<span class="token comment"># 设置源地址</span>
<span class="token function">yarn</span> config <span class="token builtin class-name">set</span> registry https://registry.npm.taobao.org

<span class="token function">yarn</span> global remove vue-cli
<span class="token function">yarn</span> global <span class="token function">add</span> @vue/cli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pnpm-配置" tabindex="-1"><a class="header-anchor" href="#pnpm-配置" aria-hidden="true">#</a> pnpm 配置</h3>`,3),y={href:"https://pnpm.io/zh/",target:"_blank",rel:"noopener noreferrer"},x=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 全局安装</span>
<span class="token function">npm</span> <span class="token function">install</span> <span class="token function">pnpm</span> <span class="token parameter variable">-g</span>
<span class="token function">pnpm</span> <span class="token parameter variable">--version</span>
<span class="token comment">## 查看源</span>
<span class="token function">pnpm</span> config get registry
<span class="token comment">## 切换源</span>
<span class="token comment"># pnpm config set registry https://registry.npmjs.org/</span>
<span class="token comment"># pnpm config set registry https://registry.npmmirror.com/</span>

<span class="token comment">## 安装包</span>
<span class="token function">pnpm</span> <span class="token parameter variable">--registry</span> https://registry.npmmirror.com <span class="token function">install</span> <span class="token operator">&lt;</span>包<span class="token operator">&gt;</span>

<span class="token comment">## 移除</span>
<span class="token function">pnpm</span> remove <span class="token operator">&lt;</span>包<span class="token operator">&gt;</span>
<span class="token function">pnpm</span> remove <span class="token operator">&lt;</span>包<span class="token operator">&gt;</span> <span class="token parameter variable">--global</span>

<span class="token comment">## 更新</span>
<span class="token function">pnpm</span> up
<span class="token function">pnpm</span> upgrade <span class="token operator">&lt;</span>包<span class="token operator">&gt;</span>
<span class="token function">pnpm</span> upgrade <span class="token operator">&lt;</span>包<span class="token operator">&gt;</span> <span class="token parameter variable">--global</span>

<span class="token comment"># 安装完记得重启下环境使其生效 | windows环境不好整就直接重启，重启后指定目录会生效</span>
<span class="token function">pnpm</span> config <span class="token builtin class-name">set</span> store-dir D:<span class="token punctuation">\\</span><span class="token punctuation">\\</span>windows<span class="token punctuation">\\</span><span class="token punctuation">\\</span>cache<span class="token punctuation">\\</span><span class="token punctuation">\\</span>pnpm

<span class="token comment">## 个人使用  | 在系统上禁止使用脚本解决方法 | 以管理员身份运行power shell</span>
set-executionpolicy remotesigned
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function w(j,q){const e=c("router-link"),i=c("ExternalLinkIcon");return r(),p("div",null,[m(" more "),n("nav",u,[n("ul",null,[n("li",null,[a(e,{to:"#基础设置"},{default:l(()=>[s("基础设置")]),_:1})]),n("li",null,[a(e,{to:"#端口命令"},{default:l(()=>[s("端口命令")]),_:1})]),n("li",null,[a(e,{to:"#git-设置"},{default:l(()=>[s("git 设置")]),_:1})]),n("li",null,[a(e,{to:"#node-版本切换"},{default:l(()=>[s("node 版本切换")]),_:1})]),n("li",null,[a(e,{to:"#node-配置"},{default:l(()=>[s("node 配置")]),_:1}),n("ul",null,[n("li",null,[a(e,{to:"#yarn-配置"},{default:l(()=>[s("yarn 配置")]),_:1})]),n("li",null,[a(e,{to:"#pnpm-配置"},{default:l(()=>[s("pnpm 配置")]),_:1})])])])])]),b,v,k,n("ul",null,[n("li",null,[s("下载地址："),n("a",g,[s("https://github.com/coreybutler/nvm-windows/releases"),a(i)])])]),h,f,_,n("blockquote",null,[n("p",null,[s("官网： "),n("a",y,[s("https://pnpm.io/zh/"),a(i)])])]),x])}const I=o(d,[["render",w],["__file","10.Windows开发环境.html.vue"]]);export{I as default};
