import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as a,e,a as i,f as o}from"./app-efa5e96e.js";const c={},t=i("p",null,"Centos的终端用起来太单一了。想着换成zsh终端，并配合oh my zsh的主题。从而打造不一样的终端吧。",-1),l=o(`<h2 id="安装zsh" tabindex="-1"><a class="header-anchor" href="#安装zsh" aria-hidden="true">#</a> 安装ZSH</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 下载</span>
<span class="token function">wget</span> https://sourceforge.net/projects/zsh/files/zsh/5.9/zsh-5.9.tar.xz
<span class="token comment"># 解压</span>
<span class="token function">tar</span> xvf zsh-5.9.tar.xz
<span class="token builtin class-name">cd</span> zsh-5.9
<span class="token comment">#编译安装</span>
./configure
<span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>编译完成安装之后，需要将zsh加入<code>/etc/shells</code></p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/shells
<span class="token comment">#添加内容如下</span>
/usr/local/bin/zsh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装oh-my-zsh" tabindex="-1"><a class="header-anchor" href="#安装oh-my-zsh" aria-hidden="true">#</a> 安装oh-my-zsh</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 项目地址：https://github.com/ohmyzsh/ohmyzsh 一键安装</span>
<span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">wget</span> -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh<span class="token variable">)</span></span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置oh-my-zsh" tabindex="-1"><a class="header-anchor" href="#配置oh-my-zsh" aria-hidden="true">#</a> 配置oh-my-zsh</h2><blockquote><p>安装完成后，我们需要对中文显示等进行简单的设计。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 编辑配置文件</span>
<span class="token function">vim</span> ~/.zshrc

<span class="token comment"># 分别加入下面三行</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">LC_ALL</span></span><span class="token operator">=</span>en_US.UTF-8  
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">LANG</span></span><span class="token operator">=</span>en_US.UTF-8
<span class="token builtin class-name">source</span> /etc/profile

<span class="token comment"># 保存并更新</span>
<span class="token builtin class-name">source</span> .zshrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装插件" tabindex="-1"><a class="header-anchor" href="#安装插件" aria-hidden="true">#</a> 安装插件</h2><blockquote><p>zsh有很多好玩的插件。安装的插件默认在~/.oh-my-zsh/custom/plugins目录。如我们常用的语法高亮，历史命令提示，和路径补全等。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 补全命令插件</span>
<span class="token function">git</span> clone https://github.com/zsh-users/zsh-autosuggestions <span class="token variable">\${ZSH_CUSTOM<span class="token operator">:-</span>~<span class="token operator">/</span>.oh-my-zsh<span class="token operator">/</span>custom}</span>/plugins/zsh-autosuggestions
<span class="token comment">## 语法高亮插件</span>
<span class="token function">git</span> clone https://github.com/zsh-users/zsh-syntax-highlighting.git <span class="token variable">\${ZSH_CUSTOM<span class="token operator">:-</span>~<span class="token operator">/</span>.oh-my-zsh<span class="token operator">/</span>custom}</span>/plugins/zsh-syntax-highlighting
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="zsh主题" tabindex="-1"><a class="header-anchor" href="#zsh主题" aria-hidden="true">#</a> zsh主题</h2><p>oh-my-zsh自带很多主题，全部放在 <code>~/.oh-my-zsh/themes</code> 目录下，可以自己随意更换。更换主题只需要更换<code>.zshr</code>c文件中的 <code>ZSH_THEME=&quot;主题名称&quot;</code>并 <code>source ~/.zshrc</code>就可以。默认的主题是 <code>robbyrussel</code>我们把主题换成：<code>agnoster</code></p>`,14);function r(d,p){return n(),a("div",null,[t,e(" more "),l])}const m=s(c,[["render",r],["__file","23.美化Centos的终端.html.vue"]]);export{m as default};
