import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as t,c,e as o,a as n,d as a,w as e,f as r,b as l}from"./app-efa5e96e.js";const u={},d={class:"table-of-contents"},v=r(`<h2 id="shell脚本入门" tabindex="-1"><a class="header-anchor" href="#shell脚本入门" aria-hidden="true">#</a> shell脚本入门</h2><h3 id="shell是什么" tabindex="-1"><a class="header-anchor" href="#shell是什么" aria-hidden="true">#</a> | shell是什么</h3><ul><li><p>Shell是一个命令解释器，它在操作系统的最外层，负责直接与用户对话，把用户的输入解释给操作系统，并处理各种各样的操作系统的输出结果，输出屏幕返回给用户</p></li><li><p>这种对话方式可以是：</p></li><li><ol><li>交互的方式：从键盘输入命令，通过/bin/bash的解释器，可以立即得到shell的回应</li></ol></li><li><ol start="2"><li>非交互的方式：脚本</li></ol></li></ul><h3 id="shell能做什么" tabindex="-1"><a class="header-anchor" href="#shell能做什么" aria-hidden="true">#</a> | Shell能做什么</h3><ol><li><p>安装操作系统：<code>CentOS6.X</code>和<code>CentOS7.X</code>手动方式安装或克隆方式自动化安装：<code>cobbler</code>、<code>kickstart</code> 底层都是shell脚本实现</p></li><li><p>优化 SSH：关闭Selinux 优化防火墙，放行 80、443、SSH端口、zabbix监控等服务访问端口</p><p>个人需求：加大文件描述符、时间同步、硬件时间、软件时间、YUM源等，都可以写入shell脚本</p></li><li><p>安装服务 Nginx、Apache Tomcat、PHP、MySQL、Redis、Mongo、docker等例如：PHP5.4和PHP7.1写入shell脚本，实现自动化安装不同版本的服务</p></li><li><p>代码上线：shell脚本自动化发布自动化回滚</p></li><li><p>zabbix监控：硬件、软件、进程、端口号、自定义监控都可以通过shell脚本+定时任务完成</p></li><li><p>日志分析日志统计：命令三剑客+定时任务+shell脚本来实现在ELK集群上的日志展示</p></li><li><p>业务层面</p></li><li><p>辅助开发程序：nohup和python的大量的日志处理</p></li></ol><h3 id="如何shell编程" tabindex="-1"><a class="header-anchor" href="#如何shell编程" aria-hidden="true">#</a> | 如何Shell编程</h3><ol><li>重点掌握前面的内容：变量、判断、bash，对它们彻底理解</li><li>先看懂，读懂shell脚本</li><li>讲完判断，将前面学过的脚本进行完善</li><li>自己写简单的脚本，如一些小的项目：生活中：随机点餐、大保健、会员办理，消费、服务 对应价格不同 结账 会员账号 密码 密码丢失</li><li>有基本适合自己的教材，如：跟老男孩学习Shell编程或者完善的文档</li><li>不能拿来及用，要搞懂、变成自己的，吸收了后可以解决企业中大部分的shell问题</li></ol><h2 id="一个shell脚本" tabindex="-1"><a class="header-anchor" href="#一个shell脚本" aria-hidden="true">#</a> 一个shell脚本</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># cat test.sh</span>
<span class="token comment">#!/bin/bashecho &quot;Hello World!&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="执行脚本的三种常用的方式" tabindex="-1"><a class="header-anchor" href="#执行脚本的三种常用的方式" aria-hidden="true">#</a> | 执行脚本的三种常用的方式</h3><p>（1）使用bash或者sh通过解释器执行脚本</p><p>在子shell中执行命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sh</span> test.sh
<span class="token comment">## Hello World!</span>
<span class="token function">bash</span> test.sh
<span class="token comment">## Hello World!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（2）使用路径方式</p><p>全路径执行方式或者当前路径，<strong>必须给x权限</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">chmod</span> +x test.sh
/server/scripts/test.sh
<span class="token comment">## Hello World!</span>
./test.sh
<span class="token comment">## Hello World!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）使用source或者 . 的方式</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">.</span> test.sh
<span class="token comment">## Hello World!</span>
<span class="token builtin class-name">source</span> test.sh
<span class="token comment">## Hello World!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（4）其他shell的执行方式</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> test.sh <span class="token operator">|</span> <span class="token function">bash</span>
<span class="token comment">## Hello World!</span>
<span class="token builtin class-name">echo</span> <span class="token function">ls</span> <span class="token operator">|</span> <span class="token function">bash</span> 
<span class="token comment">## test.sh</span>
<span class="token function">bash</span> <span class="token operator">&lt;</span> test.sh
<span class="token comment">## Hello World!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="shell变量基础" tabindex="-1"><a class="header-anchor" href="#shell变量基础" aria-hidden="true">#</a> shell变量基础</h2><h3 id="什么是变量" tabindex="-1"><a class="header-anchor" href="#什么是变量" aria-hidden="true">#</a> | 什么是变量</h3><p>shell变量是一种很**“弱”**的变量，默认情况下，一个变量保存一个串，shell不关心这个串是什么含义，所以若要进行数学运算，必须使用一些命令例如let、declare、expr、双括号等</p><p>shell变量可分为两类：局部变量和环境变量</p><ul><li><strong>局部变量</strong>只在创建它们的shell中可用</li><li><strong>环境变量</strong>则可以在创建它们的shell及其派生出来的任意子进程中使用</li></ul><p>有些变量是用户创建的，其他的则是专用shell变量</p><ul><li>变量名必须以字母或下划线字符开头，其余的字符可以是字母、数字(0~9)或下划线字符</li><li>变量名字是大小写敏感的，环境变量推荐设置为字母大写</li><li>给变量赋值时，等号周围不能有任何空白符，为了给变量赋空值，可以在等号后跟一个换行符</li></ul><p>**变量删除：**用set命令可以查看所有的变量，unset var命令可以清除变量var，var相当于没有定义过</p><p>**变量只读：**readonly var可以把var变为只读变量，定义之后不能对var进行任何更改</p><p>对shell变量的引用方式很多，用这些方式可以方便的获取shell变量的值，变量值的长度，变量的一个字串，变量被部分替换后的值等等</p><h3 id="变量值的定义" tabindex="-1"><a class="header-anchor" href="#变量值的定义" aria-hidden="true">#</a> | 变量值的定义</h3><p>字符串定义</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">name</span><span class="token operator">=</span>Iamlizhenya
<span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&quot;I am lizhenya&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$name</span>
<span class="token comment">## I am lizhenya</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**双引号和单引号的区别：**双引号解析变量，单引号所见即所得不能解析变量，不加引号可以解析变量</p><p>数字的定义</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">age</span><span class="token operator">=</span><span class="token string">&quot;12 23 432&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$age</span>
<span class="token comment">## 12 23 432</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令的定义</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>通过\`<span class="token variable"><span class="token variable">\`</span>调用命令
<span class="token function">date</span> +%F-%H-%M-%S
<span class="token comment">## 2022-07-07-18-02-34</span>
<span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token variable">\`</span></span><span class="token function">date</span> +%F-%H-%M-%S\`
<span class="token builtin class-name">echo</span> <span class="token variable">$time</span>
<span class="token comment">## 2022-07-07-18-02-40</span>
<span class="token comment"># 时间是固定 每次调用都相同</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$time</span>
<span class="token comment">## 2022-07-07-18-02-40</span>
通过<span class="token punctuation">$(</span><span class="token punctuation">)</span>调用命令
<span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%F-%H-%M-%S<span class="token variable">)</span></span>
<span class="token builtin class-name">echo</span> <span class="token variable">$time</span>
<span class="token comment">## 2022-07-07-18-02-52</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="变量可以定义变量" tabindex="-1"><a class="header-anchor" href="#变量可以定义变量" aria-hidden="true">#</a> | 变量可以定义变量</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">ip</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">ifconfig</span> eth0<span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;NR==2{print $2}&#39;</span><span class="token variable">\`</span></span>
<span class="token builtin class-name">echo</span> <span class="token variable">$ip</span>
<span class="token comment">## 10.0.0.7</span>
<span class="token assign-left variable">dir</span><span class="token operator">=</span><span class="token variable">\${ip}</span>_<span class="token variable">\${time}</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$dir</span>
<span class="token comment">## 10.0.0.7_2022-07-07-18-11-34</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当shell脚本中出现2条以上相同的命令就将它们写成变量</p><h3 id="核心位置变量" tabindex="-1"><a class="header-anchor" href="#核心位置变量" aria-hidden="true">#</a> | 核心位置变量</h3><table><thead><tr><th style="text-align:left;">名称</th><th style="text-align:left;">含义</th></tr></thead><tbody><tr><td style="text-align:left;">$#</td><td style="text-align:left;">传给脚本的参数个数</td></tr><tr><td style="text-align:left;">$0</td><td style="text-align:left;">脚本本身的名字</td></tr><tr><td style="text-align:left;">$1</td><td style="text-align:left;">传递给该shell脚本的第一个参数</td></tr><tr><td style="text-align:left;">$2</td><td style="text-align:left;">传递给该shell脚本的第二个参数</td></tr><tr><td style="text-align:left;">$@</td><td style="text-align:left;">传给脚本的所有参数的列表</td></tr><tr><td style="text-align:left;">$*</td><td style="text-align:left;">以一个单字符串显示所有向脚本传递的参数，与位置变量不同，参数可超过9个</td></tr><tr><td style="text-align:left;">$$</td><td style="text-align:left;">脚本运行的当前进程ID号</td></tr><tr><td style="text-align:left;">$?</td><td style="text-align:left;">显示最后命令的退出状态，0表示没有错误，其他表示有错误</td></tr></tbody></table><ul><li><code>$0</code> 的使用</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> test.sh
<span class="token comment">## #!/bin/bashecho $0</span>

<span class="token function">sh</span> test.sh
<span class="token comment">## test.sh</span>
<span class="token function">sh</span> /server/scripts/test.sh
<span class="token comment">## /server/scripts/test.sh</span>

<span class="token comment">## $0 的使用方法</span>
<span class="token comment">## 在脚本给予用户提示 如何使用脚本</span>
<span class="token function">cat</span> test.sh 
<span class="token comment">## #!/bin/bash</span>
<span class="token comment">## echo $0</span>
<span class="token comment">## echo $&quot;Usage: $0 {start|stop|status|restart|force-reload}&quot;</span>
<span class="token function">sh</span> test.sh
<span class="token comment">## test.sh</span>
<span class="token comment">## Usage: test.sh {start|stop|status|restart|force-reload}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>$n</code> 脚本的参数</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> test.sh
<span class="token comment">## #!/bin/bash</span>
<span class="token comment">## echo $1</span>

<span class="token function">sh</span> test.sh 
<span class="token comment">## oldboyoldboy</span>

<span class="token comment">## 序列传参</span>
<span class="token function">cat</span> test.sh
<span class="token comment">## #!/bin/bash</span>
<span class="token comment">## echo $3</span>
<span class="token function">sh</span> test.sh <span class="token punctuation">{</span>a<span class="token punctuation">..</span>z<span class="token punctuation">}</span>
<span class="token comment">## c</span>
<span class="token function">sh</span> test.sh <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">10</span><span class="token punctuation">}</span>
<span class="token comment">## 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>$#</code> 获取脚本传参的总个数</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> test.sh
<span class="token comment">## #!/bin/bash</span>
<span class="token comment">## echo $1 $2 $3</span>
<span class="token comment">## echo $#</span>

<span class="token function">sh</span> test.sh <span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span>
<span class="token comment">## 1 2 3</span>
<span class="token comment">## 3</span>
<span class="token function">sh</span> test.sh <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">20</span><span class="token punctuation">}</span>
<span class="token comment">## 1 2 3 </span>
<span class="token comment">## 20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>$?</code> 获取上一条命令的返回值</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ls</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$?</span>
<span class="token comment">## 0</span>

llll
<span class="token builtin class-name">echo</span> <span class="token variable">$?</span>
<span class="token comment">## 127</span>

<span class="token comment">## 案例:</span>
<span class="token function">cat</span> ping.sh 
<span class="token comment">## #!/bin/bash</span>
<span class="token comment">## ping -c1 -W1 $1 &amp;&gt;/dev/null</span>
<span class="token comment">## [ $? -eq 0 ] &amp;&amp; echo &quot;$1 通的&quot; || echo &quot;$1 不通&quot;</span>
<span class="token function">sh</span> ping.sh www.baidu.com
<span class="token comment">## www.baidu.com 通的</span>
<span class="token function">sh</span> ping.sh www.baidu.commmmmm
<span class="token comment">## www.baidu.commmmmm 不通</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>$$</code> 在有多个相同名称的shell环境中使用</li></ul><h3 id="脚本传参的三种方式" tabindex="-1"><a class="header-anchor" href="#脚本传参的三种方式" aria-hidden="true">#</a> | 脚本传参的三种方式</h3><ul><li><ol><li>直接传参</li></ol></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> test.sh
<span class="token comment">## #!/bin/bash</span>
<span class="token comment">## echo $1 $2</span>
<span class="token function">sh</span> test.sh oldboy <span class="token number">100</span>
<span class="token comment">## oldboy 100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><ol start="2"><li>赋值传参</li></ol></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> test.sh
<span class="token comment">## #!/bin/bash</span>
<span class="token comment">## name=$1</span>
<span class="token comment">## age=$2</span>
<span class="token comment">## echo $name</span>
<span class="token comment">## echo $age</span>
<span class="token function">sh</span> test.sh oldboy <span class="token number">200</span>
<span class="token comment">## oldboy</span>
<span class="token comment">## 200</span>

<span class="token function">cat</span> test.sh
<span class="token comment">## #!/bin/bash</span>
<span class="token comment">## name=$1</span>
<span class="token comment">## age=$2</span>
<span class="token comment">## echo 姓名: $name</span>
<span class="token comment">## echo 年龄: $age</span>
<span class="token function">sh</span> test.sh oldboy <span class="token number">100</span>
<span class="token comment">## 姓名: oldboy</span>
<span class="token comment">## 年龄: 100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><ol start="3"><li><code>read</code>读入</li></ol></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入你的姓名: &quot;</span> name请输入你的姓名: oldboy
<span class="token builtin class-name">echo</span> <span class="token variable">$name</span>
<span class="token comment">## oldboy</span>

<span class="token comment">## 第一种书写方式</span>
<span class="token function">cat</span> test.sh
<span class="token comment">## #!/bin/bash</span>
<span class="token comment">## read -p &quot;请输入你的姓名: &quot; name </span>
<span class="token comment">## read -p &quot;请输入你的年龄: &quot; agee</span>
<span class="token comment">## cho name=$name</span>
<span class="token comment">## echo age=$age</span>

<span class="token comment">## 第二种书写方式</span>
<span class="token function">cat</span> test.sh
<span class="token comment">## #!/bin/bash</span>
<span class="token comment">## read -p &quot;请输入你的姓名和年龄: &quot; name age </span>
<span class="token comment">## echo name=$name</span>
<span class="token comment">## echo age=$age</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="shell变量子串" tabindex="-1"><a class="header-anchor" href="#shell变量子串" aria-hidden="true">#</a> shell变量子串</h2><h3 id="子串的切片" tabindex="-1"><a class="header-anchor" href="#子串的切片" aria-hidden="true">#</a> <strong>| 子串的切片</strong></h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token number">1234567</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${name<span class="token operator">:</span>2<span class="token operator">:</span>2}</span>
<span class="token comment">## 34</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${name<span class="token operator">:</span>2<span class="token operator">:</span>3}</span>
<span class="token comment">## 345</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${name<span class="token operator">:</span>2<span class="token operator">:</span>4}</span>
<span class="token comment">## 3456</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="子串的长度统计" tabindex="-1"><a class="header-anchor" href="#子串的长度统计" aria-hidden="true">#</a> <strong>| 子串的长度统计</strong></h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token number">1234567</span>
<span class="token comment">## 第一种统计方式:</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$name</span><span class="token operator">|</span><span class="token function">wc</span> <span class="token parameter variable">-L</span>
<span class="token comment">## 第二种统计方式:</span>
<span class="token function">expr</span> length <span class="token string">&quot;<span class="token variable">$name</span>&quot;</span>
<span class="token comment">## 第三种统计方式:</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$name</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print length}&#39;</span>
<span class="token comment">## 第四种统计方式:</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${<span class="token operator">#</span>name}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="子串的删除-支持通配符" tabindex="-1"><a class="header-anchor" href="#子串的删除-支持通配符" aria-hidden="true">#</a> | 子串的删除(支持通配符)</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># url=&#39;www.baidu.com&#39;</span>

<span class="token comment">## 1.从前面往后删除 (贪婪匹配)</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${url<span class="token operator">#</span>www.}</span>
<span class="token comment">## baidu.com</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${url<span class="token operator">#</span>*.}</span>
<span class="token comment">## baidu.com</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${url<span class="token operator">#</span>*.*c}</span>
<span class="token comment">## om</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${url<span class="token operator">#</span>*.*.}</span>
<span class="token comment">## com</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${url<span class="token operator">##</span>*.}</span>
<span class="token comment">## com</span>
<span class="token comment">## 2.%从后面往前删除</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${url<span class="token operator">%</span>.*}</span>
<span class="token comment">## www.baidu</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${url<span class="token operator">%</span>.*.*}</span>
<span class="token comment">## www</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${url<span class="token operator">%%</span>.*}</span>
<span class="token comment">## www</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="子串的替换" tabindex="-1"><a class="header-anchor" href="#子串的替换" aria-hidden="true">#</a> <strong>| 子串的替换</strong></h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 格式：/替换谁/替换成谁  /// 贪婪替换</span>
<span class="token assign-left variable">url</span><span class="token operator">=</span><span class="token string">&#39;www.baidu.com&#39;</span>

<span class="token builtin class-name">echo</span> <span class="token variable">\${url<span class="token operator">/</span>w<span class="token operator">/</span>W}</span>
<span class="token comment">## Www.baidu.com</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${url<span class="token operator">/</span><span class="token operator">/</span>w<span class="token operator">/</span>W}</span>
<span class="token comment">## WWW.baidu.com</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${url<span class="token operator">/</span>www<span class="token operator">/</span>WWW}</span>
<span class="token comment">## WWW.baidu.com</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${url<span class="token operator">/</span>baidu<span class="token operator">/</span>sina}</span>
<span class="token comment">## www.sina.com</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="shell数值运算" tabindex="-1"><a class="header-anchor" href="#shell数值运算" aria-hidden="true">#</a> shell数值运算</h2><h3 id="expr-只支持整数运算" tabindex="-1"><a class="header-anchor" href="#expr-只支持整数运算" aria-hidden="true">#</a> <strong>| expr 只支持整数运算</strong></h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">expr</span> <span class="token number">1</span> + <span class="token number">1</span>
<span class="token comment">## 2</span>
<span class="token function">expr</span> <span class="token number">10</span> - <span class="token number">10</span>
<span class="token comment">## 0</span>
<span class="token function">expr</span> <span class="token number">10</span> <span class="token punctuation">\\</span>* <span class="token number">10</span>
<span class="token comment">## 100</span>
<span class="token function">expr</span> <span class="token number">10</span> / <span class="token number">10</span>
<span class="token comment">## 1</span>

<span class="token comment">## 错误运算方式：</span>
<span class="token function">expr</span> <span class="token number">1</span> + <span class="token number">1.5</span>
<span class="token comment">## expr: non-integer argument</span>
<span class="token function">expr</span> <span class="token number">10</span> * <span class="token number">10</span>
<span class="token comment">## expr: syntax error</span>

<span class="token comment">## 案例: 判断传入的参数是否为整数</span>
<span class="token function">cat</span> expr.sh
<span class="token comment">## #!/bin/bash</span>
<span class="token comment">## read -p &quot;请输入你的年龄: &quot; age</span>
<span class="token comment">## expr 1 + $age &amp;&gt;/dev/null</span>
<span class="token comment">## [ $? -ne 0 ] &amp;&amp; echo &quot;请输入整数&quot; &amp;&amp; exite</span>
<span class="token comment">## cho $age</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="只支持整数运算" tabindex="-1"><a class="header-anchor" href="#只支持整数运算" aria-hidden="true">#</a> <strong>| <code>$(())</code> 只支持整数运算</strong></h3><blockquote><p>注意不要和<code>$()</code>冲突了 执行的命令和\`\`相同</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">$((</span><span class="token number">10</span><span class="token operator">+</span><span class="token number">10</span><span class="token variable">))</span></span>
<span class="token comment">## 20</span>
<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">$((</span><span class="token number">10</span><span class="token operator">-</span><span class="token number">10</span><span class="token variable">))</span></span>
<span class="token comment">## 0</span>
<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">$((</span><span class="token number">10</span><span class="token operator">*</span><span class="token number">10</span><span class="token variable">))</span></span>
<span class="token comment">## 100</span>
<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">$((</span><span class="token number">10</span><span class="token operator">/</span><span class="token number">10</span><span class="token variable">))</span></span>
<span class="token comment">## 1</span>

<span class="token comment">## 随机数取余数 RANDOM 0-32767之间的数字</span>
<span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">$((</span>RANDOM<span class="token operator">%</span><span class="token number">100</span><span class="token operator">+</span><span class="token number">1</span><span class="token variable">))</span></span>
<span class="token comment">## 82</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="只支持整数运算-1" tabindex="-1"><a class="header-anchor" href="#只支持整数运算-1" aria-hidden="true">#</a> <strong>| $[] 只支持整数运算</strong></h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> $<span class="token punctuation">[</span><span class="token number">10</span>+10<span class="token punctuation">]</span>
<span class="token comment">## 20</span>
<span class="token builtin class-name">echo</span> $<span class="token punctuation">[</span><span class="token number">10</span>-10<span class="token punctuation">]</span>
<span class="token comment">## 0</span>
<span class="token builtin class-name">echo</span> $<span class="token punctuation">[</span><span class="token number">10</span>/10<span class="token punctuation">]</span>
<span class="token comment">## 1</span>
<span class="token builtin class-name">echo</span> $<span class="token punctuation">[</span><span class="token number">10</span>*10<span class="token punctuation">]</span>
<span class="token comment">## 100</span>

<span class="token comment">## 平方：</span>
<span class="token builtin class-name">echo</span> $<span class="token punctuation">[</span><span class="token number">10</span>**10<span class="token punctuation">]</span>
<span class="token comment">## 10000000000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="let-只支持整数运算" tabindex="-1"><a class="header-anchor" href="#let-只支持整数运算" aria-hidden="true">#</a> <strong>| let 只支持整数运算</strong></h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">let</span> <span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token number">1</span>+1
<span class="token builtin class-name">echo</span> <span class="token variable">$a</span>
<span class="token comment">## 2</span>

<span class="token builtin class-name">let</span> <span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token number">1</span>*10
<span class="token builtin class-name">echo</span> <span class="token variable">$a</span>
<span class="token comment">## 10</span>

i++
<span class="token builtin class-name">let</span> i++  <span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span> <span class="token builtin class-name">let</span> <span class="token assign-left variable">i</span><span class="token operator">=</span>i+1
<span class="token builtin class-name">let</span> <span class="token assign-left variable">i</span><span class="token operator">=</span>i+1
<span class="token builtin class-name">echo</span> <span class="token variable">$i</span>
<span class="token comment">## 2</span>
<span class="token builtin class-name">let</span> i++
<span class="token builtin class-name">echo</span> <span class="token variable">$i</span>
<span class="token comment">## 3</span>

<span class="token comment">## 直接运算 ++i i++ 相同 都是自增1++a</span>
<span class="token builtin class-name">let</span> ++a
<span class="token builtin class-name">echo</span> <span class="token variable">$a</span>
<span class="token comment">## 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在使用变量的情况下两个是有区别<code>i++</code>先赋值在运算 | <code>++i</code>先运算在赋值</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">a</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">b</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token builtin class-name">let</span> <span class="token assign-left variable">i</span><span class="token operator">=</span>a++
<span class="token builtin class-name">let</span> <span class="token assign-left variable">c</span><span class="token operator">=</span>++b
<span class="token builtin class-name">echo</span> <span class="token variable">$i</span>
<span class="token comment">## 1</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$c</span>
<span class="token comment">## 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="bc-支持整数和小数运算" tabindex="-1"><a class="header-anchor" href="#bc-支持整数和小数运算" aria-hidden="true">#</a> <strong>| bc 支持整数和小数运算</strong></h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token number">10</span>+10<span class="token operator">|</span><span class="token function">bc</span>
<span class="token comment">## 20</span>
<span class="token builtin class-name">echo</span> <span class="token number">10</span>+10.5<span class="token operator">|</span><span class="token function">bc</span>
<span class="token comment">## 20.5</span>
<span class="token builtin class-name">echo</span> <span class="token number">10</span>*10.5<span class="token operator">|</span><span class="token function">bc</span>
<span class="token comment">## 105.0</span>
<span class="token builtin class-name">echo</span> <span class="token number">10</span>-10.5<span class="token operator">|</span><span class="token function">bc</span>
<span class="token comment">## -.5</span>
<span class="token builtin class-name">echo</span> <span class="token number">10</span>/10.5<span class="token operator">|</span><span class="token function">bc</span>
<span class="token comment">## 0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="awk-支持整数和小数运算" tabindex="-1"><a class="header-anchor" href="#awk-支持整数和小数运算" aria-hidden="true">#</a> <strong>| awk 支持整数和小数运算</strong></h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">awk</span> <span class="token string">&#39;BEGIN{print 10+10}&#39;</span>
<span class="token comment">## 20</span>
<span class="token builtin class-name">echo</span> <span class="token number">10</span> <span class="token number">20</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $1+$2}&#39;</span>
<span class="token comment">## 30</span>
<span class="token builtin class-name">echo</span> <span class="token number">10</span> <span class="token number">20</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $1*$2}&#39;</span>
<span class="token comment">## 200</span>
<span class="token builtin class-name">echo</span> <span class="token number">10</span> <span class="token number">20</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $1/$2}&#39;</span>
<span class="token comment">## 0.5</span>
<span class="token builtin class-name">echo</span> <span class="token number">10</span> <span class="token number">20</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $1^$2}&#39;</span>
<span class="token comment">## 100000000000000000000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="条件表达式" tabindex="-1"><a class="header-anchor" href="#条件表达式" aria-hidden="true">#</a> 条件表达式</h2><h3 id="文件表达式" tabindex="-1"><a class="header-anchor" href="#文件表达式" aria-hidden="true">#</a> <strong>| 文件表达式</strong></h3><p><strong>语法结构:</strong></p><p>第一种:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">test</span> <span class="token parameter variable">-f</span> /etc/hosts <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件存在&quot;</span>
<span class="token comment">## 文件存在</span>
<span class="token builtin class-name">test</span> <span class="token parameter variable">-f</span> /etc/host <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件存在&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件不存在&quot;</span>
<span class="token comment">## 文件不存在</span>
<span class="token builtin class-name">test</span> <span class="token parameter variable">-f</span> /etc/hosts <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件存在&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件不存在&quot;</span>
<span class="token comment">## 文件存在</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二种: 常用</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span> <span class="token parameter variable">-f</span> /etc/passwd <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件存在&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件不存在&quot;</span>
<span class="token comment">## 文件存在</span>
<span class="token punctuation">[</span> <span class="token parameter variable">-f</span> /etc/passwdddd <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件存在&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件不存在&quot;</span>
<span class="token comment">## 文件不存在</span>
<span class="token punctuation">[</span> <span class="token parameter variable">-d</span> /etc/passwd <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件夹存在&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件夹不存在&quot;</span>
<span class="token comment">## 文件夹不存在</span>
<span class="token punctuation">[</span> <span class="token parameter variable">-d</span> /etc/ <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件夹存在&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件夹不存在&quot;</span>
<span class="token comment">## 文件夹存在</span>
<span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /etc/ <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;可执行文件存在&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;可执行文件不存在&quot;</span>
<span class="token comment">## 可执行文件存在</span>
ll <span class="token parameter variable">-d</span> /etc
<span class="token comment">## drwxr-xr-x. 79 root root 8192 Oct 19 09:14 /etc</span>
<span class="token punctuation">[</span> <span class="token parameter variable">-e</span> /etc/ <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件存在&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件不存在&quot;</span>
<span class="token comment">## 文件存在</span>
<span class="token punctuation">[</span> <span class="token parameter variable">-w</span> /etc/hosts <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;可写文件存在&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;可写文件不存在&quot;</span>
<span class="token comment">## 可写文件存在</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>注意: 表达式中支持变量和命令</strong></p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token assign-left variable">dir</span><span class="token operator">=</span>/tmp
<span class="token punctuation">[</span> <span class="token parameter variable">-d</span> <span class="token variable">$dir</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件存在&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件不存在&quot;</span>
<span class="token comment">## 文件存在</span>
<span class="token assign-left variable">dir</span><span class="token operator">=</span>/tmppppp
<span class="token punctuation">[</span> <span class="token parameter variable">-d</span> <span class="token variable">$dir</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件存在&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件不存在&quot;</span>
<span class="token comment">## 文件不存在</span>

<span class="token function">ls</span> <span class="token parameter variable">-d</span> /etc/sysconfig/
<span class="token comment">## /etc/sysconfig/</span>
<span class="token punctuation">[</span> <span class="token parameter variable">-d</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">ls</span> <span class="token parameter variable">-d</span> /etc/sysconfig/<span class="token variable">\`</span></span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件存在&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件不存在&quot;</span>
<span class="token comment">## 文件存在</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="shell数值比较" tabindex="-1"><a class="header-anchor" href="#shell数值比较" aria-hidden="true">#</a> <strong>| shell数值比较</strong></h3><blockquote><p><strong>语法结构第一种：test 整数1 比较符 整数2第二种：[ 整数1 比较符 整数2 ]</strong></p></blockquote><table><thead><tr><th>比较符</th><th>作用</th></tr></thead><tbody><tr><td>-eq</td><td>等于</td></tr><tr><td>-ge</td><td>大于或者等于</td></tr><tr><td>-gt</td><td>大于</td></tr><tr><td>-le</td><td>小于或者等于</td></tr><tr><td>-lt</td><td>小于</td></tr><tr><td>-ne</td><td>不等于</td></tr></tbody></table><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">test</span> <span class="token number">10</span> <span class="token parameter variable">-eq</span> <span class="token number">10</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> 成立 <span class="token operator">||</span> <span class="token builtin class-name">echo</span> 不成立
<span class="token comment">## 成立</span>
<span class="token builtin class-name">test</span> <span class="token number">10</span> <span class="token parameter variable">-ne</span> <span class="token number">10</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> 成立 <span class="token operator">||</span> <span class="token builtin class-name">echo</span> 不成立
<span class="token comment">## 不成立</span>
<span class="token punctuation">[</span> <span class="token number">10</span> <span class="token parameter variable">-eq</span> <span class="token number">10</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> 成立 <span class="token operator">||</span> <span class="token builtin class-name">echo</span> 不成立
<span class="token comment">## 成立</span>
<span class="token punctuation">[</span> <span class="token number">10</span> <span class="token parameter variable">-ne</span> <span class="token number">10</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> 成立 <span class="token operator">||</span> <span class="token builtin class-name">echo</span> 不成立
<span class="token comment">## 不成立</span>
<span class="token punctuation">[</span> <span class="token number">15</span> <span class="token parameter variable">-ne</span> <span class="token number">10</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> 成立 <span class="token operator">||</span> <span class="token builtin class-name">echo</span> 不成立
<span class="token comment">## 成立</span>
<span class="token punctuation">[</span> <span class="token number">15</span> <span class="token parameter variable">-gt</span> <span class="token number">10</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> 成立 <span class="token operator">||</span> <span class="token builtin class-name">echo</span> 不成立
<span class="token comment">## 成立</span>
<span class="token punctuation">[</span> <span class="token number">10</span> <span class="token parameter variable">-ge</span> <span class="token number">10</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> 成立 <span class="token operator">||</span> <span class="token builtin class-name">echo</span> 不成立
<span class="token comment">## 成立</span>
<span class="token punctuation">[</span> <span class="token number">10</span> <span class="token parameter variable">-le</span> <span class="token number">10</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> 成立 <span class="token operator">||</span> <span class="token builtin class-name">echo</span> 不成立
<span class="token comment">## 成立</span>

<span class="token comment">## 支持命令</span>
<span class="token punctuation">[</span> <span class="token number">50</span> <span class="token parameter variable">-gt</span> <span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">echo</span> <span class="token punctuation">$((</span><span class="token environment constant">RANDOM</span>%100<span class="token punctuation">))</span><span class="token operator">|</span><span class="token function">tee</span> file.txt<span class="token variable">\`</span></span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;成立&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> 不成立
<span class="token comment">## 成立</span>
<span class="token function">cat</span> file.txt 
<span class="token comment">## 20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="流程控制语句" tabindex="-1"><a class="header-anchor" href="#流程控制语句" aria-hidden="true">#</a> 流程控制语句</h2><h3 id="if判断语法格式" tabindex="-1"><a class="header-anchor" href="#if判断语法格式" aria-hidden="true">#</a> <strong>| if判断</strong>语法格式</h3><p><strong>单分支:</strong> 一个条件一个结果</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">if</span> <span class="token punctuation">[</span> 条件表达式 <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
  命令的集合
<span class="token keyword">fi</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> 条件表达式 <span class="token punctuation">]</span>
<span class="token keyword">then</span>
  命令的集合
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>双分支结构:</strong> 一个条件 两个结果</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">if</span> <span class="token punctuation">[</span> 条件表达式 <span class="token punctuation">]</span>
<span class="token keyword">then</span>
  执行的命令
<span class="token keyword">else</span>
  否则执行什么命令
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>多分支:</strong> 多个条件 多个结果</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">if</span> <span class="token punctuation">[</span> 条件表达式 <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
  成立执行的命令
<span class="token keyword">elif</span> <span class="token punctuation">[</span> 条件表达式 <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
  成立执行的命令
<span class="token keyword">elif</span> <span class="token punctuation">[</span> 条件表达式 <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
 成立执行的命令
<span class="token keyword">else</span>
  以上条件都没匹配到 执行的命令
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>案例1：根据不同的操作系统版本 安装不同的YUM源</strong></p><ol><li>如何查看操作系统的版本cat /etc/redhat-release</li><li>使用if多分支进行判断</li><li>执行不同的命令</li><li>测试</li></ol></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>

<span class="token punctuation">[</span> <span class="token parameter variable">-f</span> /etc/init.d/functions <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">.</span> /etc/init.d/functions
<span class="token comment">## 更新前进行备份</span>
<span class="token assign-left variable">backup_yum</span><span class="token operator">=</span><span class="token string">&#39;mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup&#39;</span>
<span class="token assign-left variable">os_version</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">cat</span> /etc/redhat-release <span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $(NF-1)}&#39;</span><span class="token variable">\`</span></span>

<span class="token comment">## 判断网络是否正常</span>
<span class="token function">ping</span> <span class="token parameter variable">-c1</span> <span class="token parameter variable">-W1</span> developer.aliyun.com <span class="token operator">&amp;&gt;</span>/dev/null
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;网络不正常正在重启网卡请稍等....&quot;</span>
  systemctl restart network
    <span class="token function">ping</span> <span class="token parameter variable">-c1</span> <span class="token parameter variable">-W1</span> developer.aliyun.com <span class="token operator">&amp;&gt;</span>/dev/null
    <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;请管理员检查网络 sendmail.....&quot;</span>
<span class="token keyword">fi</span>

<span class="token comment">## 判断wget是否安装</span>
<span class="token function">which</span> <span class="token function">wget</span> <span class="token operator">&amp;&gt;</span>/dev/null
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;正在安装wget 请稍等.....&quot;</span>
  yum <span class="token parameter variable">-y</span> <span class="token function">install</span> <span class="token function">wget</span> <span class="token operator">&amp;&gt;</span>/dev/null
  <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;wget 安装成功将继续更新YUM源.....&quot;</span>
<span class="token keyword">fi</span>

<span class="token comment">## 根据不同的操作系统版本安装不同的YUM源</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">\${os_version<span class="token operator">%%</span>.*}</span> <span class="token parameter variable">-eq</span> <span class="token number">7</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
 <span class="token variable">$backup_yum</span>
 <span class="token builtin class-name">echo</span> <span class="token string">&quot;正在更新YUM仓库请稍后.......&quot;</span>
 <span class="token function">wget</span> <span class="token parameter variable">-O</span> /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo <span class="token operator">&amp;&gt;</span>/dev/null
 <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    action <span class="token string">&quot;成功更新阿里云YUM仓库&quot;</span>   /bin/true
 <span class="token keyword">else</span>
    action <span class="token string">&quot;更新失败请检查网络&quot;</span> /bin/false
 <span class="token keyword">fi</span>
<span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token variable">\${os_version<span class="token operator">%%</span>.*}</span> <span class="token parameter variable">-eq</span> <span class="token number">6</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
 <span class="token variable">$backup_yum</span>
 <span class="token function">wget</span> <span class="token parameter variable">-O</span> /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-6.repo
<span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token variable">\${os_version<span class="token operator">%%</span>.*}</span> <span class="token parameter variable">-eq</span> <span class="token number">8</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
 <span class="token variable">$backup_yum</span>
 <span class="token function">wget</span> <span class="token parameter variable">-O</span> /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-8.repo
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>案例2：使用if判断比较两个的数字大小</strong></p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>

<span class="token comment"># 判断num1数字如果是不是纯数字 或者num2不是纯数字 表达式都成立</span>
<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入两个数字: &quot;</span> num1 num2
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token variable">$num1</span> <span class="token operator">=~</span> ^<span class="token punctuation">[</span><span class="token number">0</span>-9<span class="token punctuation">]</span>+$ <span class="token operator">||</span> <span class="token operator">!</span> <span class="token variable">$num2</span> <span class="token operator">=~</span> ^<span class="token punctuation">[</span><span class="token number">0</span>-9<span class="token punctuation">]</span>+$ <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;请输入整数&quot;</span>
  <span class="token builtin class-name">exit</span>
<span class="token keyword">fi</span>

<span class="token comment"># 比较两数大小</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$num1</span> <span class="token parameter variable">-gt</span> <span class="token variable">$num2</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$num1</span>&gt;<span class="token variable">$num2</span>&quot;</span>
<span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token variable">$num1</span> <span class="token parameter variable">-lt</span> <span class="token variable">$num2</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$num1</span>&lt;<span class="token variable">$num2</span>&quot;</span>
<span class="token keyword">else</span>
   <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$num1</span>=<span class="token variable">$num2</span>&quot;</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>案例3：安装不同的PHP版本</strong></p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>

cat<span class="token operator">&lt;&lt;</span><span class="token string">EOF
1.PHP5.4
2.PHP5.5
3.PHP7.1
4.PHP7.3
EOF</span>

<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请选择要安装的版本的编号或者是PHP版本号:[1|PHP5.4] &quot;</span> num
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$num</span> <span class="token operator">=</span> <span class="token number">1</span> <span class="token parameter variable">-o</span> <span class="token variable">$num</span> <span class="token operator">=</span> <span class="token string">&quot;PHP5.4&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;yum -y install PHP5.4........&quot;</span>
<span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token variable">$num</span> <span class="token operator">=</span> <span class="token number">2</span> <span class="token parameter variable">-o</span> <span class="token variable">$num</span> <span class="token operator">=</span> <span class="token string">&quot;PHP5.5&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;yum -y install PHP5.5........&quot;</span>
<span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token variable">$num</span> <span class="token operator">=</span> <span class="token number">4</span> <span class="token parameter variable">-o</span> <span class="token variable">$num</span> <span class="token operator">=</span> <span class="token string">&quot;PHP7.3&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;yum -y install PHP7.3........&quot;</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="for循环" tabindex="-1"><a class="header-anchor" href="#for循环" aria-hidden="true">#</a> <strong>| for循环</strong></h3><p>语法格式:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> 变量 <span class="token keyword">in</span> 值的列表   值: 数字 字符串 命令 序列 默认以空格来分隔
<span class="token keyword">do</span>
  执行的动作 命令的集合
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果可以和变量相关 也可以不相关</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 和变量相关：</span>
<span class="token comment"># cat for.sh</span>
<span class="token comment">#!/bin/sh</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">num</span> <span class="token keyword">in</span> <span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span>
<span class="token keyword">do</span>
   <span class="token builtin class-name">echo</span> <span class="token variable">$num</span>
<span class="token keyword">done</span>

<span class="token comment">## 和变量不相关：</span>
<span class="token comment"># cat for.sh</span>
<span class="token comment">#!/bin/sh</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">num</span> <span class="token keyword">in</span> <span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span>
<span class="token keyword">do</span>
   <span class="token builtin class-name">echo</span> hehe
<span class="token keyword">done</span>

<span class="token comment">## 统计for循环总共循环了多少次：</span>
<span class="token comment"># cat for.sh</span>
<span class="token comment">#!/bin/sh</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">num</span> <span class="token keyword">in</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">1000</span><span class="token punctuation">}</span>
<span class="token keyword">do</span>
  <span class="token builtin class-name">let</span> i++
<span class="token keyword">done</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$i</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>for循环 值为命令</p><p>输出结果可以和变量相关 也可以不相关</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># cat for.sh</span>
<span class="token comment">#!/bin/sh</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">num</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">cat</span> /etc/hosts<span class="token variable">\`</span></span>
<span class="token keyword">do</span>  
  <span class="token builtin class-name">echo</span> <span class="token variable">$num</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>for循环案例:</p><p>ping 一个c的地址 通表示在线 不通表示离线 10.0.0.1-10.0.0.254</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># cat for.sh</span>
<span class="token comment">#!/bin/sh</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">254</span><span class="token punctuation">}</span>
<span class="token keyword">do</span>
  <span class="token function">ping</span> <span class="token parameter variable">-c</span> <span class="token number">1</span> <span class="token number">10.0</span>.0.<span class="token variable">\${i}</span> <span class="token operator">&amp;&gt;</span>/dev/null
  <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;10.0.0.<span class="token variable">\${i}</span> 服务器在线&quot;</span> <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;10.0.0.<span class="token variable">\${i}</span> 服务器不在线&quot;</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>for循环案例: 批量创建用户</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># !/bin/sh</span>
<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入要创建用户的个数: &quot;</span> num
<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入要创建用户的前缀: &quot;</span> prefix
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">seq</span> $num<span class="token variable">\`</span></span>
<span class="token keyword">do</span>
  <span class="token assign-left variable">user</span><span class="token operator">=</span><span class="token variable">\${prefix}</span><span class="token variable">$i</span>
  <span class="token function">id</span> <span class="token variable">$user</span> <span class="token operator">&amp;&gt;</span>/dev/null
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    <span class="token function">useradd</span> <span class="token variable">$user</span> <span class="token operator">&amp;&gt;</span>/dev/null
    <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$user</span> 用户创建成功&quot;</span>
  <span class="token keyword">else</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;useradd: user <span class="token variable">$user</span> already exists&quot;</span>
  <span class="token keyword">fi</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>for循环添加和删除用户 不带密版</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># !/bin/sh</span>
<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入用户的个数: &quot;</span> num
<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入用户的前缀: &quot;</span> prefix
<span class="token builtin class-name">echo</span> <span class="token string">&quot;当前输入的用户名为:&quot;</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">seq</span> $num<span class="token variable">\`</span></span>
<span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${prefix}</span><span class="token variable">$i</span>&quot;</span>
<span class="token keyword">done</span>

<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请问您是要删除以上用户还是创建以上用户[del|add]: &quot;</span> re

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$re</span> <span class="token operator">=</span> <span class="token function">add</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
  <span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">seq</span> $num<span class="token variable">\`</span></span>
  <span class="token keyword">do</span>
    <span class="token assign-left variable">user</span><span class="token operator">=</span><span class="token variable">\${prefix}</span><span class="token variable">$i</span>
    <span class="token function">id</span> <span class="token variable">$user</span> <span class="token operator">&amp;&gt;</span>/dev/null
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
      <span class="token function">useradd</span> <span class="token variable">$user</span> <span class="token operator">&amp;&gt;</span>/dev/null
      <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$user</span> 用户创建成功&quot;</span>
    <span class="token keyword">else</span>
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;useradd: user <span class="token variable">$user</span> already exists&quot;</span>
    <span class="token keyword">fi</span>
  <span class="token keyword">done</span>
<span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token variable">$re</span> <span class="token operator">=</span> del <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
  <span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">seq</span> $num<span class="token variable">\`</span></span>
  <span class="token keyword">do</span>
    <span class="token assign-left variable">user</span><span class="token operator">=</span><span class="token variable">\${prefix}</span><span class="token variable">$i</span>
    <span class="token function">id</span> <span class="token variable">$user</span> <span class="token operator">&amp;&gt;</span>/dev/null
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
      <span class="token function">userdel</span> <span class="token parameter variable">-r</span> <span class="token variable">$user</span> <span class="token operator">&amp;&gt;</span>/dev/null
      <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$user</span> 用户删除成功&quot;</span>
    <span class="token keyword">else</span>
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;用户不存在&quot;</span>
    <span class="token keyword">fi</span>
  <span class="token keyword">done</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="while循环" tabindex="-1"><a class="header-anchor" href="#while循环" aria-hidden="true">#</a> <strong>| while循环</strong></h3><p>语法结构:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">while</span>  <span class="token punctuation">[</span> 条件表达式 <span class="token punctuation">]</span>  条件表达式成立<span class="token punctuation">(</span>为真<span class="token punctuation">)</span>则执行 否则不执行
<span class="token keyword">do</span>
  命令
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用实例：死循环</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 方式一：</span>
<span class="token comment">#!/bin/sh</span>
<span class="token keyword">while</span> <span class="token boolean">true</span>
<span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> hehe
  <span class="token function">sleep</span> <span class="token number">1</span>
<span class="token keyword">done</span>
<span class="token comment">## 方式二：</span>
<span class="token comment">#!/bin/sh</span>
<span class="token keyword">while</span> <span class="token punctuation">[</span> <span class="token number">10</span> <span class="token parameter variable">-gt</span> <span class="token number">5</span> <span class="token punctuation">]</span>
<span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> hehe
  <span class="token function">sleep</span> <span class="token number">1</span>
<span class="token keyword">done</span>
<span class="token comment">## 方式三：</span>
<span class="token comment">#!/bin/sh</span>
<span class="token keyword">while</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> /etc/hosts <span class="token punctuation">]</span>
<span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> hehe
  <span class="token function">sleep</span> <span class="token number">1</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>while读取文件 取值语法结构:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">while</span> <span class="token builtin class-name">read</span> line <span class="token comment"># line变量名称 自定义</span>
<span class="token keyword">do</span>
  执行的命令
<span class="token keyword">done</span> <span class="token operator">&lt;</span> <span class="token function">file</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用实例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 方式一：</span>
<span class="token comment">#!/bin/sh</span>
<span class="token keyword">while</span> <span class="token builtin class-name">read</span> line
<span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$line</span>
<span class="token keyword">done</span> <span class="token operator">&lt;</span> /etc/hosts
<span class="token comment">## 方式二：</span>
<span class="token comment">#!/bin/sh</span>
<span class="token keyword">while</span> <span class="token builtin class-name">read</span> line
<span class="token keyword">do</span>
  <span class="token assign-left variable">user</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">echo</span> $line<span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $1}&#39;</span><span class="token variable">\`</span></span>
  <span class="token function">useradd</span> <span class="token variable">$user</span>
  <span class="token assign-left variable">pass</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">echo</span> $line<span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">\`</span></span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$pass</span><span class="token operator">|</span><span class="token function">passwd</span> <span class="token parameter variable">--stdin</span> <span class="token variable">$user</span>
<span class="token keyword">done</span> <span class="token operator">&lt;</span> user.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>流程控制语句</p><table><thead><tr><th>命令</th><th>作用</th></tr></thead><tbody><tr><td>exit</td><td>退出整个脚本</td></tr><tr><td>break</td><td>跳出当前的循环</td></tr><tr><td>continue</td><td>结束剩下的语句继续从头开始</td></tr><tr><td>read</td><td>交互</td></tr></tbody></table><p>使用实例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 控制语句exit：</span>
<span class="token comment">#!/bin/sh</span>
<span class="token keyword">while</span> <span class="token boolean">true</span>
<span class="token keyword">do</span>
   <span class="token builtin class-name">echo</span> test<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.
   <span class="token builtin class-name">exit</span>
   <span class="token builtin class-name">echo</span> oldboy<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.
<span class="token keyword">done</span>
<span class="token builtin class-name">echo</span> hehe<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.

<span class="token comment">## 控制语句break：</span>
<span class="token comment">#!/bin/sh</span>
<span class="token keyword">while</span> <span class="token boolean">true</span>
<span class="token keyword">do</span>
   <span class="token builtin class-name">echo</span> test<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.
  <span class="token builtin class-name">break</span>
   <span class="token builtin class-name">echo</span> oldboy<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.
<span class="token keyword">done</span>
<span class="token builtin class-name">echo</span> hehe<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.

<span class="token comment">## 控制语句continue：</span>
<span class="token comment">#!/bin/sh</span>
<span class="token keyword">while</span> <span class="token boolean">true</span>
<span class="token keyword">do</span>
   <span class="token builtin class-name">echo</span> test<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.
  <span class="token builtin class-name">continue</span>
   <span class="token builtin class-name">echo</span> oldboy<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.
<span class="token keyword">done</span>
<span class="token builtin class-name">echo</span> hehe<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>流程控制语句案例:</p><p><strong>exit</strong> 创建完oldboy5用户 退出当前脚本 只能创建5个用户</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">seq</span> <span class="token number">5</span><span class="token variable">\`</span></span>
<span class="token keyword">do</span>
     <span class="token assign-left variable">user</span><span class="token operator">=</span>oldboy<span class="token variable">$i</span>
    <span class="token function">id</span> <span class="token variable">$user</span> <span class="token operator">&amp;&gt;</span>/dev/null
     <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
        <span class="token builtin class-name">exit</span>
     <span class="token keyword">else</span>
        <span class="token function">useradd</span> <span class="token variable">$user</span> <span class="token operator">&amp;&gt;</span>/dev/null
        <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$user</span> 创建成功&quot;</span>
     <span class="token keyword">fi</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>break</strong> 创建完oldboy5用户 跳出本层循环继续往下执行 创建5个用户</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">seq</span> <span class="token number">5</span><span class="token variable">\`</span></span>
<span class="token keyword">do</span>
     <span class="token assign-left variable">user</span><span class="token operator">=</span>oldboy<span class="token variable">$i</span>
    <span class="token function">id</span> <span class="token variable">$user</span> <span class="token operator">&amp;&gt;</span>/dev/null
     <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
        <span class="token builtin class-name">break</span>
     <span class="token keyword">else</span>
        <span class="token function">useradd</span> <span class="token variable">$user</span> <span class="token operator">&amp;&gt;</span>/dev/null
        <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$user</span> 创建成功&quot;</span>
     <span class="token keyword">fi</span>
<span class="token keyword">done</span>
<span class="token builtin class-name">echo</span> oldboy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>continue</strong> 在oldboy1到oldboy5用户已经存在情况下继续向下创建用户</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">seq</span> <span class="token number">10</span><span class="token variable">\`</span></span>
<span class="token keyword">do</span>
     <span class="token assign-left variable">user</span><span class="token operator">=</span>oldboy<span class="token variable">$i</span>
    <span class="token function">id</span> <span class="token variable">$user</span> <span class="token operator">&amp;&gt;</span>/dev/null
     <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
        <span class="token builtin class-name">continue</span>
     <span class="token keyword">else</span>
        <span class="token function">useradd</span> <span class="token variable">$user</span> <span class="token operator">&amp;&gt;</span>/dev/null
        <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$user</span> 创建成功&quot;</span>
     <span class="token keyword">fi</span>
<span class="token keyword">done</span>
<span class="token builtin class-name">echo</span> hehe<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>break等级跳</strong> ，break只会跳出当前层循环</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token keyword">while</span> <span class="token boolean">true</span>
<span class="token keyword">do</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;第一层&quot;</span>
    <span class="token keyword">while</span> <span class="token boolean">true</span>
    <span class="token keyword">do</span>
        <span class="token builtin class-name">echo</span> 第二层
        <span class="token function">sleep</span> <span class="token number">1</span>
        <span class="token keyword">while</span> <span class="token boolean">true</span>
        <span class="token keyword">do</span>
            <span class="token builtin class-name">echo</span> 第三层
            <span class="token function">sleep</span> <span class="token number">1</span>
            <span class="token builtin class-name">break</span> <span class="token number">3</span>
            <span class="token builtin class-name">echo</span> oldboy<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.
        <span class="token keyword">done</span>
    <span class="token keyword">done</span>
<span class="token keyword">done</span>
<span class="token builtin class-name">echo</span> hehe<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="shell函数" tabindex="-1"><a class="header-anchor" href="#shell函数" aria-hidden="true">#</a> shell函数</h2><ol><li>函数是命令的集合 完成特定功能的代码块</li><li>函数代码块 方便复用</li><li>函数类似变量 只有先定义才能执行</li></ol><p>**区别：**变量不调用也会执行 name=oldboy 函数只有调用才会执行代码</p><h3 id="函数的定义" tabindex="-1"><a class="header-anchor" href="#函数的定义" aria-hidden="true">#</a> <strong>| 函数的定义</strong></h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token function-name function">fun1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;函数的第一种定义方式&quot;</span>
<span class="token punctuation">}</span>
fun1

<span class="token keyword">function</span> <span class="token function-name function">fun2</span> <span class="token punctuation">{</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;函数的第二种定义方式&quot;</span>
<span class="token punctuation">}</span>
fun2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>案例: 菜单</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token function-name function">fun1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\t">\\t</span><span class="token entity" title="\\t">\\t</span><span class="token entity" title="\\t">\\t</span><span class="token entity" title="\\t">\\t</span>1.包子&quot;</span>
  <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\t">\\t</span><span class="token entity" title="\\t">\\t</span><span class="token entity" title="\\t">\\t</span><span class="token entity" title="\\t">\\t</span>2.麻辣烫&quot;</span>
  <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\t">\\t</span><span class="token entity" title="\\t">\\t</span><span class="token entity" title="\\t">\\t</span><span class="token entity" title="\\t">\\t</span>3.小米粥&quot;</span>
  <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\t">\\t</span><span class="token entity" title="\\t">\\t</span><span class="token entity" title="\\t">\\t</span><span class="token entity" title="\\t">\\t</span>4.汉堡&quot;</span>
  <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\t">\\t</span><span class="token entity" title="\\t">\\t</span><span class="token entity" title="\\t">\\t</span><span class="token entity" title="\\t">\\t</span>5.烧烤&quot;</span>
<span class="token punctuation">}</span>
fun1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="函数复用" tabindex="-1"><a class="header-anchor" href="#函数复用" aria-hidden="true">#</a> <strong>| 函数复用</strong></h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># cat 1.sh</span>
<span class="token comment">#!/bin/bash</span>
<span class="token builtin class-name">.</span> /server/scripts/day4/test.sh
fun3
<span class="token comment"># sh 1.sh</span>
函数的第三种定义方式
<span class="token comment"># cat test.sh</span>
<span class="token comment">#!/bin/sh</span>
<span class="token function-name function">fun1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;函数的第一种定义方式&quot;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function-name function">fun2</span> <span class="token punctuation">{</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;函数的第二种定义方式&quot;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function-name function">fun3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;函数的第三种定义方式&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>案例: 函数的传参</p><p>函数调用在函数名称的后面</p><p>fun1 参数1 参数2 参数3 对应函数中的 $1 $2 $3</p><p>函数判断文件是否存在</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># cat fun.sh</span>
<span class="token comment">#!/bin/sh</span>
<span class="token function-name function">fun1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token variable">$1</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$1</span> 文件存在&quot;</span>
  <span class="token keyword">else</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$1</span> 文件不存在&quot;</span>
  <span class="token keyword">fi</span>
<span class="token punctuation">}</span>
fun1 /etc/hosts
<span class="token comment"># sh fun.sh</span>
/etc/hosts 文件存在

<span class="token comment"># cat fun.sh</span>
<span class="token comment">#!/bin/sh</span>
<span class="token function-name function">fun1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token variable">$3</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$3</span> 文件存在&quot;</span>
  <span class="token keyword">else</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$3</span> 文件不存在&quot;</span>
  <span class="token keyword">fi</span>
<span class="token punctuation">}</span>
fun1 /etc/hosts /etc/passwd /etc/fsttttttt
<span class="token comment"># sh fun.sh</span>
/etc/fsttttttt 文件不存在

<span class="token comment"># cat fun.sh</span>
<span class="token comment">#!/bin/sh</span>
<span class="token function-name function">fun1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token variable">$1</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$1</span> 文件存在&quot;</span>
  <span class="token keyword">else</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$1</span> 文件不存在&quot;</span>
  <span class="token keyword">fi</span>
<span class="token punctuation">}</span>
fun1 <span class="token variable">$2</span>
<span class="token comment"># sh fun.sh /etc/passwd /etc/hosts</span>
/etc/hosts 文件存在
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数可以识别变量</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token assign-left variable">file</span><span class="token operator">=</span><span class="token variable">$1</span>
<span class="token function-name function">fun1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token variable">$file</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$file</span> 文件存在&quot;</span>
  <span class="token keyword">else</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$file</span> 文件不存在&quot;</span>
  <span class="token keyword">fi</span>
<span class="token punctuation">}</span>
fun1
<span class="token comment"># sh fun.sh /etc/hosts</span>
/etc/hosts 文件存在
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="函数变量" tabindex="-1"><a class="header-anchor" href="#函数变量" aria-hidden="true">#</a> <strong>| 函数变量</strong></h3><p>可以识别全局变量 函数外的都是当前shell的全局变量</p><p>只在函数内生效的变量定义</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># cat fun.sh</span>
<span class="token comment">#!/bin/sh</span>
<span class="token function-name function">fun1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token builtin class-name">local</span> <span class="token assign-left variable">num</span><span class="token operator">=</span><span class="token number">20</span>
  <span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">seq</span> $num<span class="token variable">\`</span></span>
  <span class="token keyword">do</span>
    <span class="token assign-left variable">total</span><span class="token operator">=</span>$<span class="token punctuation">[</span><span class="token variable">$count</span>+<span class="token variable">$i</span><span class="token punctuation">]</span>    
  <span class="token keyword">done</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;当前运算的结果是: <span class="token variable">$total</span>&quot;</span>
<span class="token punctuation">}</span>

fun1
<span class="token builtin class-name">echo</span> <span class="token variable">$num</span>
<span class="token comment"># sh fun.sh</span>
当前运算的结果是: <span class="token number">20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数的返回值 <strong>return</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># cat fun.sh</span>
<span class="token comment">#!/bin/sh</span>
<span class="token function-name function">fun1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token builtin class-name">echo</span> <span class="token number">100</span>
  <span class="token builtin class-name">return</span> <span class="token number">50</span>
<span class="token punctuation">}</span>
<span class="token assign-left variable">result</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span>fun1<span class="token variable">\`</span></span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;当前函数的返回值是: &quot;</span> <span class="token variable">$?</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;当前函数的执行结果: &quot;</span> <span class="token variable">$result</span>

<span class="token comment"># sh fun.sh</span>
当前函数的返回值是:  <span class="token number">50</span>
当前函数的执行结果:  <span class="token number">100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>利用返回值来判断</p><blockquote><p><strong>错误写法</strong></p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 错误写法一：</span>
<span class="token comment">#!/bin/sh</span>
<span class="token function-name function">fun1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token variable">$1</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    <span class="token builtin class-name">return</span> <span class="token number">50</span>
  <span class="token keyword">else</span>
    <span class="token builtin class-name">return</span> <span class="token number">100</span>
  <span class="token keyword">fi</span>
<span class="token punctuation">}</span>
fun1 <span class="token variable">$1</span>

<span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">50</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件存在&quot;</span>
<span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">100</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件不存在&quot;</span>

<span class="token comment">## 错误写法二：</span>

<span class="token comment">#!/bin/sh</span>
<span class="token function-name function">fun1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token variable">$1</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    <span class="token builtin class-name">return</span> <span class="token number">50</span>
  <span class="token keyword">else</span>
    <span class="token builtin class-name">return</span> <span class="token number">100</span>
  <span class="token keyword">fi</span>
<span class="token punctuation">}</span>
fun1 <span class="token variable">$1</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">50</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> 文件存在
<span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">100</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> 文件不存在
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解决方法:</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">50</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> 文件存在 <span class="token operator">||</span> <span class="token builtin class-name">echo</span> 文件不存在
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">50</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> 文件存在
<span class="token keyword">else</span>
  <span class="token builtin class-name">echo</span> 文件不存在
<span class="token keyword">fi</span>

<span class="token comment">## 赋值的方式</span>
<span class="token assign-left variable">re</span><span class="token operator">=</span><span class="token variable">$?</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$re</span> <span class="token parameter variable">-eq</span> <span class="token number">50</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> 文件存在
<span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token variable">$re</span> <span class="token parameter variable">-eq</span> <span class="token number">100</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> 文件不存在
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="case语句" tabindex="-1"><a class="header-anchor" href="#case语句" aria-hidden="true">#</a> case语句</h2><p>语法结构:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">case</span> 变量 <span class="token keyword">in</span>  变量 直接传参 赋值传参
  匹配模式1<span class="token punctuation">)</span>
    执行的命令集合
  <span class="token punctuation">;</span><span class="token punctuation">;</span>
  匹配模式2<span class="token punctuation">)</span>
    执行命令集合
   <span class="token punctuation">;</span><span class="token punctuation">;</span>
  匹配模式3<span class="token punctuation">)</span>
    执行命令集合
  <span class="token punctuation">;</span><span class="token punctuation">;</span>
  *<span class="token punctuation">)</span>
    无匹配后序列 执行命令集合
<span class="token keyword">esac</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>案例</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># cat case.sh</span>
<span class="token comment">#!/bin/sh</span>
<span class="token keyword">case</span> <span class="token variable">$1</span> <span class="token keyword">in</span>
  Shell<span class="token punctuation">)</span>
    <span class="token builtin class-name">echo</span> shell<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
  <span class="token punctuation">;</span><span class="token punctuation">;</span>
  MySQL<span class="token punctuation">)</span>
    <span class="token builtin class-name">echo</span> MySQL<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
  <span class="token punctuation">;</span><span class="token punctuation">;</span>
  Docker<span class="token punctuation">)</span>
    <span class="token builtin class-name">echo</span> docker<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
  <span class="token punctuation">;</span><span class="token punctuation">;</span>
  *<span class="token punctuation">)</span>
    <span class="token builtin class-name">echo</span> hehe<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
<span class="token keyword">esac</span>

<span class="token comment"># sh case.sh Shell</span>
shell<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
<span class="token comment"># sh case.sh MySQL</span>
MySQL<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
<span class="token comment"># sh case.sh Docker</span>
docker<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者的使用</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># cat case.sh</span>
<span class="token comment">#!/bin/sh</span>
<span class="token keyword">case</span> <span class="token variable">$1</span> <span class="token keyword">in</span>
  Shell<span class="token operator">|</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token builtin class-name">echo</span> shell<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
  <span class="token punctuation">;</span><span class="token punctuation">;</span>
  MySQL<span class="token operator">|</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token builtin class-name">echo</span> MySQL<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
  <span class="token punctuation">;</span><span class="token punctuation">;</span>
  Docker<span class="token operator">|</span>hehe<span class="token punctuation">)</span>
    <span class="token builtin class-name">echo</span> docker<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
  <span class="token punctuation">;</span><span class="token punctuation">;</span>
  *<span class="token punctuation">)</span>
    <span class="token comment">## 匹配不到可以给用户执行提示</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Usage: <span class="token variable">$0</span> [Shell|MySQL|Docker]&quot;</span>
<span class="token keyword">esac</span>

<span class="token comment"># sh case.sh 1</span>
shell<span class="token punctuation">..</span><span class="token punctuation">..</span>.
<span class="token comment"># sh case.sh hehe</span>
docker<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
<span class="token comment"># sh case.sh Shell</span>
shell<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>案例: 使用case写一个菜单 显示系统的登录 负载 磁盘 内存等信息</p><ol><li>先写菜单：f查看内存、w查看负载、d查看磁盘、l查看登录信息、m显示菜单</li><li>让用户输入查看的信息read -p 请输入查看的信息的编号:</li><li>使用case做判断 执行对应的命令</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token function-name function">menu</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  cat<span class="token operator">&lt;&lt;</span>EOF
    <span class="token number">1</span>.f查看内存
    <span class="token number">2</span>.w查看负载
    <span class="token number">3</span>.d查看磁盘
    <span class="token number">4</span>.l查看登录信息
    <span class="token number">5</span>.m显示菜单
    <span class="token number">6</span>.e退出
  EOF
<span class="token punctuation">}</span>
menu
<span class="token keyword">while</span> <span class="token boolean">true</span>
<span class="token keyword">do</span>
  <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入你想查看的信息的编号或者字母:[1|f|2|w] &quot;</span> num
  <span class="token keyword">case</span> <span class="token variable">$num</span> <span class="token keyword">in</span>
    <span class="token number">1</span><span class="token operator">|</span>f<span class="token punctuation">)</span>
      <span class="token function">clear</span>
      <span class="token function">free</span> <span class="token parameter variable">-h</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token number">2</span><span class="token operator">|</span>w<span class="token punctuation">)</span>
      <span class="token function">clear</span>
      <span class="token function">uptime</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token number">3</span><span class="token operator">|</span>d<span class="token punctuation">)</span>
      <span class="token function">clear</span>
      <span class="token function">df</span> <span class="token parameter variable">-h</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token number">5</span><span class="token operator">|</span>m<span class="token punctuation">)</span>
      <span class="token function">clear</span>
      menu
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token number">6</span><span class="token operator">|</span>e<span class="token punctuation">)</span>
      <span class="token builtin class-name">exit</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    *<span class="token punctuation">)</span>
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;Usage: <span class="token variable">$0</span> [1|f|2|w]&quot;</span>
  <span class="token keyword">esac</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>case案例：Nginx启动脚本</p><p>Nginx启动两种方式：1种是systemctl管理启动、1种是命令行直接启动以上两种同时只能使用一种启动</p><p>命令行的方式</p><p>/usr/sbin/nginx启动</p><p>/usr/sbin/nginx -s stop 停止</p><p>重启不支持 先停止在启动</p><p>/usr/sbin/nginx -s reload查看状态 过滤端口或者PID</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token punctuation">[</span> <span class="token parameter variable">-f</span> /etc/init.d/functions <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">.</span> /etc/init.d/functions
<span class="token assign-left variable">nginx</span><span class="token operator">=</span><span class="token string">&#39;/usr/sbin/nginx&#39;</span>
<span class="token function-name function">Te</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    action <span class="token string">&quot;Nginx <span class="token variable">$1</span> is&quot;</span> /bin/true
  <span class="token keyword">else</span>
    action <span class="token string">&quot;Nginx <span class="token variable">$1</span> is&quot;</span> /bin/false
  <span class="token keyword">fi</span>
<span class="token punctuation">}</span>
<span class="token keyword">case</span> <span class="token variable">$1</span> <span class="token keyword">in</span>
  start<span class="token punctuation">)</span>
    <span class="token variable">$nginx</span>
    Te <span class="token variable">$1</span>
  <span class="token punctuation">;</span><span class="token punctuation">;</span>
  stop<span class="token punctuation">)</span>
    <span class="token variable">$nginx</span> <span class="token parameter variable">-s</span> stop
    Te <span class="token variable">$1</span>
  <span class="token punctuation">;</span><span class="token punctuation">;</span>
  restart<span class="token punctuation">)</span>
    <span class="token variable">$nginx</span> <span class="token parameter variable">-s</span> stop
    <span class="token function">sleep</span> <span class="token number">1</span>
    <span class="token variable">$nginx</span>
    Te <span class="token variable">$1</span>
  <span class="token punctuation">;</span><span class="token punctuation">;</span>
  reload<span class="token punctuation">)</span>
    <span class="token variable">$nginx</span> <span class="token parameter variable">-s</span> reload
    Te <span class="token variable">$1</span>
  <span class="token punctuation">;</span><span class="token punctuation">;</span>
  status<span class="token punctuation">)</span>
    <span class="token assign-left variable">Port</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">netstat</span> -tnulp<span class="token operator">|</span><span class="token function">grep</span> nginx<span class="token operator">|</span><span class="token function">grep</span> master<span class="token operator">|</span><span class="token function">grep</span> <span class="token string">&#39;\\btcp\\b&#39;</span><span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $4}&#39;</span><span class="token variable">\`</span></span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Nginx_Port: <span class="token variable">$Port</span>&quot;</span>
    <span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">ps</span> axu<span class="token operator">|</span><span class="token function">grep</span> nginx<span class="token operator">|</span><span class="token function">grep</span> master<span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">\`</span></span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Nginx_PID: <span class="token variable">$PID</span>&quot;</span>
  <span class="token punctuation">;</span><span class="token punctuation">;</span>
  *<span class="token punctuation">)</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Usage <span class="token variable">$0</span> [start|stop|restart|reload|status]&quot;</span>
<span class="token keyword">esac</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>case案例: jumpserver 跳板机</p><ol><li>菜单显示我们可以登录的服务信息：web01 10.0.0.7、web02 10.0.0.8</li><li>选择登录的服务器</li><li>使用case匹配</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token assign-left variable">web01</span><span class="token operator">=</span><span class="token number">10.0</span>.0.7
<span class="token assign-left variable">web02</span><span class="token operator">=</span><span class="token number">10.0</span>.0.8
<span class="token assign-left variable">MySQL</span><span class="token operator">=</span><span class="token number">10.0</span>.0.51
<span class="token assign-left variable">BACKUP</span><span class="token operator">=</span><span class="token number">10.0</span>.0.41
<span class="token assign-left variable">NFS</span><span class="token operator">=</span><span class="token number">10.0</span>.0.31
<span class="token function-name function">menu</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  cat<span class="token operator">&lt;&lt;</span>EOF
    <span class="token number">1</span>.web01  <span class="token number">10.0</span>.0.7
    <span class="token number">2</span>.web02  <span class="token number">10.0</span>.0.8
    <span class="token number">3</span>.MySQL  <span class="token number">10.0</span>.0.51
    <span class="token number">4</span>.BACKUP  <span class="token number">10.0</span>.0.41
    <span class="token number">5</span>.NFS  <span class="token number">10.0</span>.0.31
    <span class="token number">6</span>.menu 显示菜单
    <span class="token number">7</span>.exit 退出
  EOF
<span class="token punctuation">}</span>
menu
<span class="token builtin class-name">trap</span> <span class="token string">&quot;&quot;</span> HUP INT TSTP
<span class="token keyword">while</span> <span class="token boolean">true</span>
<span class="token keyword">do</span>
  <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入你要登录服务器的编号或者主机名称:[1|web01|6显示菜单] &quot;</span> num
  <span class="token keyword">case</span> <span class="token variable">$num</span> <span class="token keyword">in</span>
    <span class="token number">1</span><span class="token operator">|</span>web01<span class="token punctuation">)</span>
      <span class="token function">ssh</span> root@<span class="token variable">$web01</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token number">2</span><span class="token operator">|</span>web02<span class="token punctuation">)</span>
      <span class="token function">ssh</span> root@<span class="token variable">$web02</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token number">3</span><span class="token operator">|</span>MySQL<span class="token punctuation">)</span>
      <span class="token function">ssh</span> root@<span class="token variable">$MySQL</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token number">4</span><span class="token operator">|</span>BACKUP<span class="token punctuation">)</span>
      <span class="token function">ssh</span> root@<span class="token variable">$BACKUP</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token number">5</span><span class="token operator">|</span>NFS<span class="token punctuation">)</span>
      <span class="token function">ssh</span> root@<span class="token variable">$NFS</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token number">6</span><span class="token operator">|</span>menu<span class="token punctuation">)</span>
      menu
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token number">7</span><span class="token operator">|</span><span class="token builtin class-name">exit</span><span class="token punctuation">)</span>
      <span class="token builtin class-name">exit</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    *<span class="token punctuation">)</span>
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;Usage <span class="token variable">$0</span> [1|web01|2|web02]&quot;</span>
  <span class="token keyword">esac</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>case案例: jumpserver 跳板机扩展</p><ol><li>运维 开发 权限不同：运维：all权限 所有服务器都可以连接 、开发：只能连接web1 web2</li><li>设置密码 只能失败三次</li><li>2级菜单 服务器信息</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token assign-left variable">web01</span><span class="token operator">=</span><span class="token number">10.0</span>.0.7
<span class="token assign-left variable">web02</span><span class="token operator">=</span><span class="token number">10.0</span>.0.8
<span class="token assign-left variable">MySQL</span><span class="token operator">=</span><span class="token number">10.0</span>.0.51
<span class="token assign-left variable">BACKUP</span><span class="token operator">=</span><span class="token number">10.0</span>.0.41
<span class="token assign-left variable">NFS</span><span class="token operator">=</span><span class="token number">10.0</span>.0.31
<span class="token function-name function">users</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  cat<span class="token operator">&lt;&lt;</span>EFO
    <span class="token number">1</span>.运维
    <span class="token number">2</span>.开发
    <span class="token number">3</span>.退出
  EFO
<span class="token punctuation">}</span>
<span class="token function">users</span>
<span class="token function-name function">ops</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  cat<span class="token operator">&lt;&lt;</span>EOF
    <span class="token number">1</span>.web01  <span class="token number">10.0</span>.0.7
    <span class="token number">2</span>.web02  <span class="token number">10.0</span>.0.8
    <span class="token number">3</span>.MySQL  <span class="token number">10.0</span>.0.51
    <span class="token number">4</span>.BACKUP  <span class="token number">10.0</span>.0.41
    <span class="token number">5</span>.NFS  <span class="token number">10.0</span>.0.31
    <span class="token number">6</span>.menu 显示菜单
    <span class="token number">7</span>.exit 退出
  EOF
<span class="token punctuation">}</span>
<span class="token function-name function">dev</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  cat<span class="token operator">&lt;&lt;</span>EOF
    <span class="token number">1</span>.web01  <span class="token number">10.0</span>.0.7
    <span class="token number">2</span>.web02  <span class="token number">10.0</span>.0.8
    <span class="token number">3</span>.menu 显示菜单
    <span class="token number">4</span>.exit 退出
  EOF
<span class="token punctuation">}</span>
<span class="token builtin class-name">trap</span> <span class="token string">&quot;echo 别瞎按小心爆炸&quot;</span> HUP INT TSTP
<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入你的身份: &quot;</span> au
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$au</span> <span class="token operator">=</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
  <span class="token operator">&gt;</span>/tmp/yunwei.pwd
  <span class="token keyword">while</span> <span class="token boolean">true</span>
  <span class="token keyword">do</span>
    <span class="token assign-left variable">yunwei</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">cat</span> /tmp/yunwei.pwd <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span><span class="token variable">\`</span></span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$yunwei</span> <span class="token parameter variable">-lt</span> <span class="token number">3</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
      <span class="token builtin class-name">read</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入运维的密码: &quot;</span> pass
      <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$pass</span> <span class="token operator">=</span> woshiyunwei <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;登录成功欢迎牛逼的运维!!!&quot;</span>
        <span class="token builtin class-name">break</span>
      <span class="token keyword">else</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;密码不正确请重新输入密码&quot;</span>
        <span class="token builtin class-name">echo</span> <span class="token number">1</span> <span class="token operator">&gt;&gt;</span> /tmp/yunwei.pwd
        <span class="token builtin class-name">continue</span>
      <span class="token keyword">fi</span>
    <span class="token keyword">else</span>
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;密码错误次数太多，现已退出&quot;</span>
      <span class="token builtin class-name">exit</span>
    <span class="token keyword">fi</span>
  <span class="token keyword">done</span>
ops
<span class="token keyword">while</span> <span class="token boolean">true</span>
<span class="token keyword">do</span>
<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入你要登录服务器的编号或者主机名称:[1|web01|6显示菜单] &quot;</span> num
<span class="token keyword">case</span> <span class="token variable">$num</span> <span class="token keyword">in</span>
  <span class="token number">1</span><span class="token operator">|</span>web01<span class="token punctuation">)</span>
 <span class="token function">ssh</span> root@<span class="token variable">$web01</span>
 <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token number">2</span><span class="token operator">|</span>web02<span class="token punctuation">)</span>
 <span class="token function">ssh</span> root@<span class="token variable">$web02</span>
 <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token number">3</span><span class="token operator">|</span>MySQL<span class="token punctuation">)</span>
 <span class="token function">ssh</span> root@<span class="token variable">$MySQL</span>
 <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token number">4</span><span class="token operator">|</span>BACKUP<span class="token punctuation">)</span>
 <span class="token function">ssh</span> root@<span class="token variable">$BACKUP</span>
 <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token number">5</span><span class="token operator">|</span>NFS<span class="token punctuation">)</span>
 <span class="token function">ssh</span> root@<span class="token variable">$NFS</span>
 <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token number">6</span><span class="token operator">|</span>ops<span class="token punctuation">)</span>
 ops
 <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token number">7</span><span class="token operator">|</span><span class="token builtin class-name">exit</span><span class="token punctuation">)</span>
         <span class="token builtin class-name">exit</span>
  <span class="token punctuation">;</span><span class="token punctuation">;</span>
 *<span class="token punctuation">)</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;Usage <span class="token variable">$0</span> [1|web01|2|web02]&quot;</span>
<span class="token keyword">esac</span>
<span class="token keyword">done</span>
<span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token variable">$au</span> <span class="token operator">=</span> <span class="token number">2</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
  <span class="token operator">&gt;</span>/tmp/kaifa.pwd  
  <span class="token keyword">while</span> <span class="token boolean">true</span>
  <span class="token keyword">do</span>
      <span class="token assign-left variable">kaifa</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">cat</span> /tmp/kaifa.pwd <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span><span class="token variable">\`</span></span>
      <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$kaifa</span> <span class="token parameter variable">-lt</span> <span class="token number">3</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
          <span class="token builtin class-name">read</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入开发的密码: &quot;</span> pass
          <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$pass</span> <span class="token operator">=</span> woshikaifa <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
              <span class="token builtin class-name">echo</span> <span class="token string">&quot;登录成功欢迎小小的开发!!!&quot;</span>
              <span class="token builtin class-name">break</span>
          <span class="token keyword">else</span>
              <span class="token builtin class-name">echo</span> <span class="token string">&quot;密码不正确请重新输入密码&quot;</span>
              <span class="token builtin class-name">echo</span> <span class="token number">1</span> <span class="token operator">&gt;&gt;</span>/tmp/kaifa.pwd
              <span class="token builtin class-name">continue</span>
           <span class="token keyword">fi</span>
      <span class="token keyword">else</span>
          <span class="token builtin class-name">echo</span> <span class="token string">&quot;密码错误次数太多，现已退出&quot;</span>
          <span class="token builtin class-name">exit</span>
      <span class="token keyword">fi</span>
  <span class="token keyword">done</span>
  dev
  <span class="token keyword">while</span> <span class="token boolean">true</span>
<span class="token keyword">do</span>
<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入你要登录服务器的编号或者主机名称:[1|web01|3显示菜单] &quot;</span> num
<span class="token keyword">case</span> <span class="token variable">$num</span> <span class="token keyword">in</span>
  <span class="token number">1</span><span class="token operator">|</span>web01<span class="token punctuation">)</span>
 <span class="token function">ssh</span> root@<span class="token variable">$web01</span>
 <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token number">2</span><span class="token operator">|</span>web02<span class="token punctuation">)</span>
 <span class="token function">ssh</span> root@<span class="token variable">$web02</span>
 <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token number">3</span><span class="token operator">|</span>dev<span class="token punctuation">)</span>
 dev
 <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token number">4</span><span class="token operator">|</span><span class="token builtin class-name">exit</span><span class="token punctuation">)</span>
         <span class="token builtin class-name">exit</span>
  <span class="token punctuation">;</span><span class="token punctuation">;</span>
 *<span class="token punctuation">)</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;Usage <span class="token variable">$0</span> [1|web01|2|web02]&quot;</span>
<span class="token keyword">esac</span>
<span class="token keyword">done</span>
<span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token variable">$au</span> <span class="token operator">=</span> <span class="token number">3</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
    <span class="token builtin class-name">exit</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="shell变量数组" tabindex="-1"><a class="header-anchor" href="#shell变量数组" aria-hidden="true">#</a> shell变量数组</h2><blockquote><p><strong>数组的分类</strong></p></blockquote><ol><li>普通数组：只能用数字作为索引</li><li>关联数组：数字或者字符串作为索引</li></ol><blockquote><p><strong>数组的结构</strong></p></blockquote><ol><li>类似变量：一个名称对应一个值，一个筐子里面只装了一个水果(苹果)</li><li>数组：一个名词对应多个值，一个筐子里面装了很多盒子，每个盒子里有不同的水果</li><li>索引：盒子的名称，称为索引也称为下标也称为元素名称</li></ol><blockquote><p><strong>数组的格式</strong></p></blockquote><p>数组名称[索引名称]=元素的值筐子[盒子1]=苹果筐子[盒子2]=梨筐子[盒子3]=黄瓜</p><p>普通数组的盒子(索引)从0开始筐子[0]=值</p><h3 id="普通数组的定义方式" tabindex="-1"><a class="header-anchor" href="#普通数组的定义方式" aria-hidden="true">#</a> <strong>| 普通数组的定义方式</strong></h3><p>**第一种定义方式：**按照索引进行定义</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>array<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">=</span>shell
array<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token operator">=</span>mysql
array<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token operator">=</span>docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看数组：按照索引进行查看</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token variable">\${array<span class="token punctuation">[</span>2<span class="token punctuation">]</span>}</span>
<span class="token comment">## mysql</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${array<span class="token punctuation">[</span>1<span class="token punctuation">]</span>}</span>
<span class="token comment">## shell</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${array<span class="token punctuation">[</span>3<span class="token punctuation">]</span>}</span>
<span class="token comment">## docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看数组中所有的值</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token variable">\${array<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
<span class="token comment">## shell mysql docker</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${array<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>
<span class="token comment">## shell mysql docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看数组中所有的索引(下标) 所有的盒子的名称</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token variable">\${<span class="token operator">!</span>array<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>
<span class="token comment">## 1 2 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看索引的总个数</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token variable">\${<span class="token operator">#</span>array<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>
<span class="token comment">## 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看系统的普通数组</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">declare</span> <span class="token parameter variable">-a</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>**第二种定义方式：**使用默认的索引来定义</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">array</span><span class="token operator">=</span><span class="token punctuation">(</span>shell mysql <span class="token function">docker</span> oldboy<span class="token punctuation">)</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${array<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
<span class="token comment">## shell mysql docker oldboy</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${<span class="token operator">!</span>array<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
<span class="token comment">## 0 1 2 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**第三种定义方式：**使用自定义索引和默认索引定义</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">array</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token operator">=</span>shell mysql <span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token operator">=</span>docker hehe<span class="token punctuation">)</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${array<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
<span class="token comment">## shell mysql docker hehe</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${<span class="token operator">!</span>array<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
<span class="token comment">## 5 6 10 11</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第四种定义方式：</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">array</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token variable"><span class="token variable">\`</span><span class="token function">cat</span> /etc/passwd<span class="token operator">|</span><span class="token function">awk</span> -F: <span class="token string">&#39;{print $1}&#39;</span><span class="token variable">\`</span></span><span class="token punctuation">)</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${array<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>

<span class="token comment">## root bin daemon adm lp sync shutdown halt mail operator games ftp nobody systemd-network dbus polkitd tss abrt sshd postfix test1 test2 test3 test4 test5 zhangsan lisi erdan goudan gousheng baoyi oldboy5 oldboy1 oldboy2 oldboy3 oldboy4 oldboy6 oldboy7 oldboy8 oldboy9 oldboy10 nginx</span>

<span class="token builtin class-name">echo</span> <span class="token variable">\${<span class="token operator">!</span>array<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
<span class="token comment">## 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数组的遍历" tabindex="-1"><a class="header-anchor" href="#数组的遍历" aria-hidden="true">#</a> <strong>| 数组的遍历</strong></h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">unset</span> array
<span class="token assign-left variable">array</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">10</span> <span class="token number">20</span> <span class="token number">30</span> <span class="token number">40</span><span class="token punctuation">)</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${array<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
<span class="token comment">## 10 20 30 40</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable">\${array<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$i</span><span class="token punctuation">;</span>
<span class="token keyword">done</span>
<span class="token comment">## 10203040</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>案例</strong></p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">array</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">10.0</span>.0.1 <span class="token number">10.0</span>.0.7 <span class="token number">10.0</span>.0.254 www.baidu.com<span class="token punctuation">)</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable">\${array<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span><span class="token punctuation">;</span><span class="token keyword">do</span>
  <span class="token function">ping</span> <span class="token parameter variable">-c1</span> <span class="token parameter variable">-W1</span> <span class="token variable">$i</span><span class="token punctuation">;</span>
<span class="token keyword">done</span>

<span class="token function">cat</span> array.sh
<span class="token comment">## #!/bin/sh</span>
<span class="token comment">## ip=(10.0.0.1www.baidu.com10.0.0.710.0.0.8www.sinaaaa.com10.0.0.254www.weibo.com)</span>
<span class="token comment">## for i in \${ip[*]}; do</span>
<span class="token comment">##   ping -c1 -W1 $i &amp;&gt;/dev/null</span>
<span class="token comment">##   if [ $? -eq 0 ];then</span>
<span class="token comment">##     echo &quot;$i 在线&quot;</span>
<span class="token comment">##   else</span>
<span class="token comment">##     echo &quot;$i 不在线&quot;</span>
<span class="token comment">##   fi</span>
<span class="token comment">## done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用索引的方式进行遍历</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token variable">\${array<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
<span class="token comment">## 10.0.0.1 10.0.0.7</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${<span class="token operator">!</span>array<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
<span class="token comment">## 0 1</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${array<span class="token punctuation">[</span>0<span class="token punctuation">]</span>}</span>
<span class="token comment">## 10.0.0.1</span>
<span class="token builtin class-name">echo</span> <span class="token variable">\${array<span class="token punctuation">[</span>1<span class="token punctuation">]</span>}</span>
<span class="token comment">## 10.0.0.7</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable">\${<span class="token operator">!</span>array<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">\${array<span class="token punctuation">[</span>$i<span class="token punctuation">]</span>}</span><span class="token punctuation">;</span>
<span class="token keyword">done</span>
<span class="token comment">## 10.0.0.110.0.0.7</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关联数组" tabindex="-1"><a class="header-anchor" href="#关联数组" aria-hidden="true">#</a> <strong>| 关联数组</strong></h3><p>使用字符串作为索引，定义方式：</p><p>默认的定义方式是普通数组</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>array<span class="token punctuation">[</span>index1<span class="token punctuation">]</span><span class="token operator">=</span>shell
array<span class="token punctuation">[</span>index2<span class="token punctuation">]</span><span class="token operator">=</span>mysql
array<span class="token punctuation">[</span>index3<span class="token punctuation">]</span><span class="token operator">=</span>docker
<span class="token builtin class-name">echo</span> <span class="token variable">\${array<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
<span class="token comment">## docker</span>
<span class="token builtin class-name">declare</span> <span class="token parameter variable">-a</span> <span class="token operator">|</span><span class="token function">grep</span> array
<span class="token builtin class-name">declare</span> <span class="token parameter variable">-a</span> <span class="token assign-left variable">array</span><span class="token operator">=</span><span class="token string">&#39;([0]=&quot;docker&quot;)&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置关联数组 提前声明 declare -A 声明关联数组</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">declare</span> <span class="token parameter variable">-A</span> array
array<span class="token punctuation">[</span>index1<span class="token punctuation">]</span><span class="token operator">=</span>shell
array<span class="token punctuation">[</span>index2<span class="token punctuation">]</span><span class="token operator">=</span>mysql
array<span class="token punctuation">[</span>index3<span class="token punctuation">]</span><span class="token operator">=</span>redis
<span class="token builtin class-name">echo</span> <span class="token variable">\${array<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
<span class="token comment">## shell mysql redis</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看索引</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token variable">\${<span class="token operator">!</span>array<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>案例:统计当前的男性和女性出现的次数</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> sex.txtmmfmfx

<span class="token comment">## for i in \`cat sex.txt\`; do</span>
<span class="token comment">##   let $i++;</span>
<span class="token comment">## done</span>
<span class="token comment">## echo $m3</span>
<span class="token comment">## echo $f2</span>
<span class="token comment">## echo $x1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>执行过程</strong></p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># !/bin/sh</span>
<span class="token builtin class-name">declare</span> <span class="token parameter variable">-A</span> sex
<span class="token keyword">while</span> <span class="token builtin class-name">read</span> line
<span class="token keyword">do</span>
  <span class="token builtin class-name">let</span> sex<span class="token punctuation">[</span><span class="token variable">$line</span><span class="token punctuation">]</span>++
  <span class="token assign-left variable">line</span><span class="token operator">=</span>m
  <span class="token builtin class-name">let</span> sex<span class="token punctuation">[</span>m<span class="token punctuation">]</span>++
  <span class="token assign-left variable">line</span><span class="token operator">=</span>x
  <span class="token builtin class-name">let</span> sex<span class="token punctuation">[</span>x<span class="token punctuation">]</span>++
  <span class="token assign-left variable">line</span><span class="token operator">=</span>f
  <span class="token builtin class-name">let</span> sex<span class="token punctuation">[</span>f<span class="token punctuation">]</span>++
<span class="token keyword">done</span> <span class="token operator">&lt;</span> sex.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>直接查看</strong></p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># !/bin/sh</span>
<span class="token builtin class-name">declare</span> <span class="token parameter variable">-A</span> sex
<span class="token keyword">while</span> <span class="token builtin class-name">read</span> line
<span class="token keyword">do</span>
  <span class="token builtin class-name">let</span> sex<span class="token punctuation">[</span><span class="token variable">$line</span><span class="token punctuation">]</span>++
done<span class="token operator">&lt;</span>sex.txt
<span class="token builtin class-name">echo</span> m 出现了 <span class="token variable">\${sex<span class="token punctuation">[</span>m<span class="token punctuation">]</span>}</span> 次
<span class="token builtin class-name">echo</span> f 出现了 <span class="token variable">\${sex<span class="token punctuation">[</span>f<span class="token punctuation">]</span>}</span> 次
<span class="token builtin class-name">echo</span> x 出现了 <span class="token variable">\${sex<span class="token punctuation">[</span>x<span class="token punctuation">]</span>}</span> 次
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>数组遍历</strong></p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># !/bin/sh</span>
<span class="token builtin class-name">declare</span> <span class="token parameter variable">-A</span> sex
<span class="token keyword">while</span> <span class="token builtin class-name">read</span> line
<span class="token keyword">do</span>  
  <span class="token builtin class-name">let</span> sex<span class="token punctuation">[</span><span class="token variable">$line</span><span class="token punctuation">]</span>++
done<span class="token operator">&lt;</span>sex.txt
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable">\${<span class="token operator">!</span>sex<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
<span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$i</span> 出现了  <span class="token variable">\${sex<span class="token punctuation">[</span>$i<span class="token punctuation">]</span>}</span> 次
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>案例: 统计nginx日志每个IP出现的次数</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># !/bin/sh</span>
<span class="token builtin class-name">declare</span> <span class="token parameter variable">-A</span> <span class="token function">ip</span>
<span class="token keyword">while</span> <span class="token builtin class-name">read</span> line
<span class="token keyword">do</span>
  <span class="token builtin class-name">let</span> <span class="token function">ip</span>
  <span class="token punctuation">[</span><span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">echo</span> $line<span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $1}&#39;</span><span class="token variable">\`</span></span><span class="token punctuation">]</span>++
done<span class="token operator">&lt;</span>/var/log/nginx/access.log
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable">\${<span class="token operator">!</span>ip<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>
<span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$i</span> 出现了  <span class="token variable">\${ip<span class="token punctuation">[</span>$i<span class="token punctuation">]</span>}</span> 次
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,250);function k(m,b){const s=i("router-link");return t(),c("div",null,[o(" more "),n("nav",d,[n("ul",null,[n("li",null,[a(s,{to:"#shell脚本入门"},{default:e(()=>[l("shell脚本入门")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#shell是什么"},{default:e(()=>[l("| shell是什么")]),_:1})]),n("li",null,[a(s,{to:"#shell能做什么"},{default:e(()=>[l("| Shell能做什么")]),_:1})]),n("li",null,[a(s,{to:"#如何shell编程"},{default:e(()=>[l("| 如何Shell编程")]),_:1})])])]),n("li",null,[a(s,{to:"#一个shell脚本"},{default:e(()=>[l("一个shell脚本")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#执行脚本的三种常用的方式"},{default:e(()=>[l("| 执行脚本的三种常用的方式")]),_:1})])])]),n("li",null,[a(s,{to:"#shell变量基础"},{default:e(()=>[l("shell变量基础")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#什么是变量"},{default:e(()=>[l("| 什么是变量")]),_:1})]),n("li",null,[a(s,{to:"#变量值的定义"},{default:e(()=>[l("| 变量值的定义")]),_:1})]),n("li",null,[a(s,{to:"#变量可以定义变量"},{default:e(()=>[l("| 变量可以定义变量")]),_:1})]),n("li",null,[a(s,{to:"#核心位置变量"},{default:e(()=>[l("| 核心位置变量")]),_:1})]),n("li",null,[a(s,{to:"#脚本传参的三种方式"},{default:e(()=>[l("| 脚本传参的三种方式")]),_:1})])])]),n("li",null,[a(s,{to:"#shell变量子串"},{default:e(()=>[l("shell变量子串")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#子串的切片"},{default:e(()=>[l("| 子串的切片")]),_:1})]),n("li",null,[a(s,{to:"#子串的长度统计"},{default:e(()=>[l("| 子串的长度统计")]),_:1})]),n("li",null,[a(s,{to:"#子串的删除-支持通配符"},{default:e(()=>[l("| 子串的删除(支持通配符)")]),_:1})]),n("li",null,[a(s,{to:"#子串的替换"},{default:e(()=>[l("| 子串的替换")]),_:1})])])]),n("li",null,[a(s,{to:"#shell数值运算"},{default:e(()=>[l("shell数值运算")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#expr-只支持整数运算"},{default:e(()=>[l("| expr 只支持整数运算")]),_:1})]),n("li",null,[a(s,{to:"#只支持整数运算"},{default:e(()=>[l("| $(()) 只支持整数运算")]),_:1})]),n("li",null,[a(s,{to:"#只支持整数运算-1"},{default:e(()=>[l("| $[] 只支持整数运算")]),_:1})]),n("li",null,[a(s,{to:"#let-只支持整数运算"},{default:e(()=>[l("| let 只支持整数运算")]),_:1})]),n("li",null,[a(s,{to:"#bc-支持整数和小数运算"},{default:e(()=>[l("| bc 支持整数和小数运算")]),_:1})]),n("li",null,[a(s,{to:"#awk-支持整数和小数运算"},{default:e(()=>[l("| awk 支持整数和小数运算")]),_:1})])])]),n("li",null,[a(s,{to:"#条件表达式"},{default:e(()=>[l("条件表达式")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#文件表达式"},{default:e(()=>[l("| 文件表达式")]),_:1})]),n("li",null,[a(s,{to:"#shell数值比较"},{default:e(()=>[l("| shell数值比较")]),_:1})])])]),n("li",null,[a(s,{to:"#流程控制语句"},{default:e(()=>[l("流程控制语句")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#if判断语法格式"},{default:e(()=>[l("| if判断语法格式")]),_:1})]),n("li",null,[a(s,{to:"#for循环"},{default:e(()=>[l("| for循环")]),_:1})]),n("li",null,[a(s,{to:"#while循环"},{default:e(()=>[l("| while循环")]),_:1})])])]),n("li",null,[a(s,{to:"#shell函数"},{default:e(()=>[l("shell函数")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#函数的定义"},{default:e(()=>[l("| 函数的定义")]),_:1})]),n("li",null,[a(s,{to:"#函数复用"},{default:e(()=>[l("| 函数复用")]),_:1})]),n("li",null,[a(s,{to:"#函数变量"},{default:e(()=>[l("| 函数变量")]),_:1})])])]),n("li",null,[a(s,{to:"#case语句"},{default:e(()=>[l("case语句")]),_:1})]),n("li",null,[a(s,{to:"#shell变量数组"},{default:e(()=>[l("shell变量数组")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#普通数组的定义方式"},{default:e(()=>[l("| 普通数组的定义方式")]),_:1})]),n("li",null,[a(s,{to:"#数组的遍历"},{default:e(()=>[l("| 数组的遍历")]),_:1})]),n("li",null,[a(s,{to:"#关联数组"},{default:e(()=>[l("| 关联数组")]),_:1})])])])])]),v])}const f=p(u,[["render",k],["__file","10.shell脚本语言.html.vue"]]);export{f as default};
