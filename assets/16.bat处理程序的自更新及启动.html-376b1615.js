import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as n,f as e}from"./app-efa5e96e.js";const i={},l=e(`<h2 id="_1、执行bat脚本启动应用" tabindex="-1"><a class="header-anchor" href="#_1、执行bat脚本启动应用" aria-hidden="true">#</a> 1、执行bat脚本启动应用</h2><blockquote><p>执行exe执行文件, 当执行出错的时候程序会自动关闭启动窗口,无法看到报错信息</p><p>编写bat脚本, 实现: 执行出错不关闭执行窗口</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>@echo off
<span class="token builtin class-name">cd</span> /d %~dp0

<span class="token builtin class-name">set</span> %BIN_FILE%<span class="token operator">=</span>register.exe
start <span class="token string">&quot;&quot;</span> /B /WAIT %BIN_FILE%

pause
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>pause</code>: 程序退出后命令行窗口不退出。</li><li><code>/B</code>: 后台运行，不阻塞当前命令行窗口，即以静默的方式启动应用程序，并且不会开启新的命令行窗口。</li><li><code>/WAIT</code>: 表示等待启动的程序退出后才继续执行后续的命令。</li></ul><h2 id="_2、脚本实现程序自更新" tabindex="-1"><a class="header-anchor" href="#_2、脚本实现程序自更新" aria-hidden="true">#</a> 2、脚本实现程序自更新</h2><blockquote><p>bat脚本实现: 检查程序是否有新版本, 有新版本自动升级后启动程序</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>@echo off
<span class="token builtin class-name">cd</span> /d %~dp0

<span class="token builtin class-name">set</span> <span class="token assign-left variable">BIN_URL</span><span class="token operator">=</span>https://www.deanhan.cn/xxx/register.exe
<span class="token builtin class-name">set</span> <span class="token assign-left variable">VERSION_URL</span><span class="token operator">=</span>https://www.deanhan.cn/demo/xxx/version.txt
<span class="token builtin class-name">set</span> <span class="token assign-left variable">VERSION_FILE</span><span class="token operator">=</span>version.txt
<span class="token builtin class-name">set</span> <span class="token assign-left variable">TMPFILE</span><span class="token operator">=</span>tmp.txt
<span class="token builtin class-name">set</span> <span class="token assign-left variable">BIN_FILE</span><span class="token operator">=</span>register.exe

<span class="token string">&quot;./bin/wget&quot;</span> --no-check-certificate <span class="token parameter variable">-q</span> <span class="token parameter variable">-O</span> %TMPFILE% %VERSION_URL%

<span class="token builtin class-name">set</span> /p <span class="token assign-left variable">LASEST_VERSION</span><span class="token operator">=</span><span class="token operator">&lt;</span>%TMPFILE%
<span class="token builtin class-name">set</span> /p <span class="token assign-left variable">VERSION</span><span class="token operator">=</span><span class="token operator">&lt;</span>%VERSION_FILE%
del /q %TMPFILE%

<span class="token keyword">if</span> %VERSION% NEQ %LASEST_VERSION% <span class="token punctuation">(</span>
  <span class="token builtin class-name">echo</span> updating software, waiting<span class="token punctuation">..</span>.
  <span class="token string">&quot;./bin/wget&quot;</span> <span class="token parameter variable">--progress</span><span class="token operator">=</span>bar:force --no-check-certificate <span class="token parameter variable">-O</span> %BIN_FILE% %BIN_URL%  <span class="token builtin class-name">echo</span> %LASEST_VERSION% <span class="token operator">&gt;</span> %VERSION_FILE%
<span class="token punctuation">)</span>
start <span class="token string">&quot;&quot;</span> /B /WAIT %BIN_FILE%

pause
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、f-q" tabindex="-1"><a class="header-anchor" href="#_3、f-q" aria-hidden="true">#</a> 3、F&amp;Q</h2><blockquote><p>可能会遇到一些其他的问题，</p><p>比如运行bat脚本并打开控制台后，发现控制台没办法关闭，这个时候我们杀死所有脚本开启的应用进程，比如：<code>taskkill /F /IM register.exe</code>。</p></blockquote>`,9),t=[l];function c(o,p){return a(),n("div",null,t)}const u=s(i,[["render",c],["__file","16.bat处理程序的自更新及启动.html.vue"]]);export{u as default};
