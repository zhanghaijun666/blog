import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as r,c,e as m,a as n,d as a,w as e,f as d,b as l}from"./app-efa5e96e.js";const o={},p=n("p",null,"Tmux 是一个终端复用器（terminal multiplexer），非常有用，属于常用的开发工具。",-1),u={class:"table-of-contents"},v=d(`<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Ubuntu 或 Debian</span>
$ <span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> tmux
<span class="token comment"># CentOS 或 Fedora</span>
$ <span class="token function">sudo</span> yum <span class="token function">install</span> tmux
<span class="token comment"># Mac</span>
$ brew <span class="token function">install</span> tmux
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="外部使用" tabindex="-1"><a class="header-anchor" href="#外部使用" aria-hidden="true">#</a> 外部使用</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入 tmux</span>
tmux
tmux new <span class="token parameter variable">-s</span> <span class="token operator">&lt;</span>session-name<span class="token operator">&gt;</span>

<span class="token comment"># 分离会话</span>
tmux detach
<span class="token comment"># 退出</span>
<span class="token builtin class-name">exit</span>

<span class="token comment"># 查看当前所有的 Tmux 会话</span>
tmux <span class="token function">ls</span>
tmux list-session

<span class="token comment"># 接入会话-使用会话编号</span>
tmux attach <span class="token parameter variable">-t</span> <span class="token number">0</span>
<span class="token comment"># 接入会话-使用会话名称</span>
tmux attach <span class="token parameter variable">-t</span> <span class="token operator">&lt;</span>session-name<span class="token operator">&gt;</span>

<span class="token comment"># 杀死会话-使用会话编号</span>
tmux kill-session <span class="token parameter variable">-t</span> <span class="token number">0</span>
<span class="token comment"># 杀死会话-使用会话名称</span>
tmux kill-session <span class="token parameter variable">-t</span> <span class="token operator">&lt;</span>session-name<span class="token operator">&gt;</span>

<span class="token comment"># 切换会话-使用会话编号</span>
tmux switch <span class="token parameter variable">-t</span> <span class="token number">0</span>
<span class="token comment"># 切换会话-使用会话名称</span>
tmux switch <span class="token parameter variable">-t</span> <span class="token operator">&lt;</span>session-name<span class="token operator">&gt;</span>

<span class="token comment"># 重命名会话</span>
tmux rename-session <span class="token parameter variable">-t</span> <span class="token number">0</span> <span class="token operator">&lt;</span>new-name<span class="token operator">&gt;</span>

<span class="token comment"># 列出所有快捷键，及其对应的 Tmux 命令</span>
$ tmux list-keys
<span class="token comment"># 列出所有 Tmux 命令及其参数</span>
$ tmux list-commands
<span class="token comment"># 列出当前所有 Tmux 会话的信息</span>
$ tmux info
<span class="token comment"># 重新加载当前的 Tmux 配置</span>
$ tmux source-file ~/.tmux.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="内部使用" tabindex="-1"><a class="header-anchor" href="#内部使用" aria-hidden="true">#</a> 内部使用</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 划分上下两个窗格</span>
tmux split-window
<span class="token comment"># 划分左右两个窗格</span>
tmux split-window <span class="token parameter variable">-h</span>

<span class="token comment"># 光标切换到上方窗格</span>
tmux select-pane <span class="token parameter variable">-U</span>
<span class="token comment"># 光标切换到下方窗格</span>
tmux select-pane <span class="token parameter variable">-D</span>
<span class="token comment"># 光标切换到左边窗格</span>
tmux select-pane <span class="token parameter variable">-L</span>
<span class="token comment"># 光标切换到右边窗格</span>
tmux select-pane <span class="token parameter variable">-R</span>

<span class="token comment"># 当前窗格上移</span>
tmux swap-pane <span class="token parameter variable">-U</span>
<span class="token comment"># 当前窗格下移</span>
tmux swap-pane <span class="token parameter variable">-D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="快捷键" tabindex="-1"><a class="header-anchor" href="#快捷键" aria-hidden="true">#</a> 快捷键</h2><ul><li>Ctrl+b ? 帮助文档</li><li>Ctrl+b c 创建一个新窗口，状态栏会显示多个窗口的信息。</li><li>Ctrl+b d 分离当前会话。</li><li>Ctrl+b s 列出所有会话。</li><li>Ctrl+b n 切换到下一个窗口。</li><li>Ctrl+b o 光标切换到下一个窗格。</li><li>Ctrl+b p 切换到上一个窗口（按照状态栏上的顺序）。</li><li>Ctrl+b q 显示窗格编号。</li><li>Ctrl+b w 从列表中选择窗口。</li><li>Ctrl+b z 当前窗格全屏显示，再使用一次会变回原来大小。</li><li>Ctrl+b x 关闭当前窗格。</li><li>Ctrl+b $ 重命名当前会话。</li><li>Ctrl+b % 划分左右两个窗格。</li><li>Ctrl+b &quot; 划分上下两个窗格。</li><li>Ctrl+b 方向键 光标切换到其他窗格。</li><li>Ctrl+b , 窗口重命名。</li><li>Ctrl+b ; 光标切换到上一个窗格。</li><li>Ctrl+b { 当前窗格与上一个窗格交换位置。</li><li>Ctrl+b } 当前窗格与下一个窗格交换位置。</li><li>Ctrl+b ! 将当前窗格拆分为一个独立窗口。</li><li>Ctrl+b Ctrl+o 所有窗格向前移动一个位置，第一个窗格变成最后一个窗格。</li><li>Ctrl+b Alt+o 所有窗格向后移动一个位置，最后一个窗格变成第一个窗格。</li><li>Ctrl+b Ctrl+方向键 按箭头方向调整窗格大小。</li></ul>`,8);function b(k,x){const s=t("router-link");return r(),c("div",null,[p,m(" more "),n("nav",u,[n("ul",null,[n("li",null,[a(s,{to:"#安装"},{default:e(()=>[l("安装")]),_:1})]),n("li",null,[a(s,{to:"#外部使用"},{default:e(()=>[l("外部使用")]),_:1})]),n("li",null,[a(s,{to:"#内部使用"},{default:e(()=>[l("内部使用")]),_:1})]),n("li",null,[a(s,{to:"#快捷键"},{default:e(()=>[l("快捷键")]),_:1})])])]),v])}const C=i(o,[["render",b],["__file","13.Liunx命令 Tmux.html.vue"]]);export{C as default};
