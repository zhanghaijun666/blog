import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as c,c as p,a as s,d as a,w as e,f as o,b as l}from"./app-efa5e96e.js";const r={},u={class:"table-of-contents"},d=o(`<h2 id="systemd-简介" tabindex="-1"><a class="header-anchor" href="#systemd-简介" aria-hidden="true">#</a> systemd 简介</h2><p>Linux 从关闭到运行, 完整的启动和启动过程有三个主要部分:</p><ul><li>硬件启动(Hardware boot): 初始化系统硬件</li><li>Linux 引导(Linux boot): 加载 Linux 内核，然后加载 systemd</li><li>Linux 启动(Linux startup): systemd为主机做好生产性工作的准备</li></ul><p>systemd 是一个软件套件, 充当系统和服务管理器, 软件平台, 以及作为应用程序和内核之间的粘合剂. 一般作为 PID 1 运行, 是引导期间启动的第一个进程, 也是关机期间终止的最后一个进程. 常见的发行版 Arch Linux, Debian, Ubuntu, Dedora 等都启用了 systemd.</p><p><code>systemctl</code> 是 控制<code>systemd</code>系统和服务管理器的主要工具, 常用命令如下:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 列出正在运行的Unit, systemctl list-units 或者直接</span>
systemctl

<span class="token comment"># 列出所有Unit</span>
systemctl list-units <span class="token parameter variable">--all</span>
<span class="token comment"># 列出加载失败的Unit, 类型为12种里面的service</span>
systemctl list-units <span class="token parameter variable">--failed</span> <span class="token parameter variable">--type</span><span class="token operator">=</span>service
<span class="token comment"># 列出所有ACTIVE   状态为 inactive 的Unit</span>
systemctl list-units <span class="token parameter variable">--all</span> <span class="token parameter variable">--state</span><span class="token operator">=</span>inactive

<span class="token comment"># 启动服务</span>
systemctl start xxx.service
<span class="token comment"># 停止服务</span>
systemctl stop xxx.service
<span class="token comment"># 重启服务(热启动)</span>
systemctl restart xxx.service
<span class="token comment"># 重载服务(冷启动)</span>
systemctl reload xxx.service
<span class="token comment"># 查看状态</span>
systemctl status xxx

<span class="token comment"># 使能(创建符号链接, 开机启动)</span>
systemctl <span class="token builtin class-name">enable</span> xxx
<span class="token comment"># 禁止(删除符号链接)</span>
systemctl disable xxx
<span class="token comment"># 查看是否使能</span>
systemctl is-enabled xxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="journalctl" tabindex="-1"><a class="header-anchor" href="#journalctl" aria-hidden="true">#</a> journalctl</h2><p>systemd 日志配置文件为 <code>/etc/systemd/journald.conf</code>, 可以直接查看或者通过以下命令查看</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemd-analyze cat-config systemd/journald.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以通过修改配置文件来设置 是否永久存储日志, 最大的文件大小/数量/时间, 最大的行数, 指定日志级别 等</p><p>日志默认的保存目录是 <code>/var/log/journal/</code>(持久性存储persistent) 或 <code>/run/log/journal</code>(易失性存储volatile) , 里面默认存的是二进制日志以节省空间, 除了记录日志本身外, 还会记录大量元数据, 可以用 journalctl 工具查看日志文本, 然后再配合其它命令筛选, 查询或导出</p><p>journalctl, Query the journal. 用于查询日志</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 从旧到新打印系统日志 journalctl --system 或者</span>
journalctl
<span class="token comment"># 从新到旧</span>
journalctl <span class="token parameter variable">-r</span>

<span class="token comment"># 打印当前用户的日志, 一般开机自启程序当前用户指的root</span>
journalctl <span class="token parameter variable">--user</span>

<span class="token comment"># 查看指定服务的日志</span>
journalctl <span class="token parameter variable">-u</span> xxx

<span class="token comment"># 查看指定服务的日志, 不分页</span>
journalctl --no-paper <span class="token parameter variable">-u</span> xxx

<span class="token comment"># 持续跟踪指定服务的日志</span>
journalctl <span class="token parameter variable">-f</span> <span class="token parameter variable">-u</span> xxx
journalctl <span class="token parameter variable">-f</span> <span class="token parameter variable">-u</span> xxx <span class="token parameter variable">-u</span> yyy

<span class="token comment"># 查看日志占用磁盘空间</span>
journalctl --disk-usage

<span class="token comment"># 按照 大小 数量 时间 设置/清理日志 1G 1years</span>
journalctl
     --vacuum-size<span class="token operator">=</span>BYTES     Reduce disk usage below specified size
     --vacuum-files<span class="token operator">=</span>INT      Leave only the specified number of journal files
     --vacuum-time<span class="token operator">=</span>TIME      Remove journal files older than specified <span class="token function">time</span>
     
<span class="token comment"># 验证日志文件的完整性</span>
journalctl <span class="token parameter variable">--verify</span>

<span class="token comment"># 查看某个时间段的日志, --since today 或者</span>
journalctl <span class="token parameter variable">--since</span> <span class="token string">&quot;2023-01-05 16:50:00&quot;</span> <span class="token parameter variable">--until</span> <span class="token string">&quot;2023-01-05 16:51:00&quot;</span>

<span class="token comment"># 查看本次启动后的日志, -b 或 </span>
journalctl <span class="token parameter variable">--boot</span>
<span class="token comment"># 查看记录的过往启动的简明信息, 如 -9~0</span>
journalctl -list-boots
<span class="token comment"># 查看上次启动的日志</span>
journalctl <span class="token parameter variable">--boot</span><span class="token operator">=</span>-1
<span class="token comment"># 查看最新的10行日志</span>
journalctl <span class="token parameter variable">--boot</span> <span class="token parameter variable">--lines</span><span class="token operator">=</span><span class="token number">10</span>

<span class="token comment"># 日志级别</span>
<span class="token comment"># 0 emerg Emerge系统不可用</span>
<span class="token comment"># 1 alert Alert必须立即采取行动</span>
<span class="token comment"># 2 crit Crit紧急情况</span>
<span class="token comment"># 3 err Err非紧急的错误</span>
<span class="token comment"># 4 warning Warnning警告</span>
<span class="token comment"># 5 notice Notice普通但值得注意的事件</span>
<span class="token comment"># 6 info Info信息</span>
<span class="token comment"># 7 debug Debug调试</span>

<span class="token comment"># 指定日志级别查看</span>
journalctl <span class="token parameter variable">-p</span> err <span class="token parameter variable">--lines</span><span class="token operator">=</span><span class="token number">10</span>
journalctl <span class="token parameter variable">-p</span> <span class="token number">3</span> <span class="token parameter variable">-u</span> xxx.service
<span class="token comment"># 查看上次启动的err信息</span>
journalctl <span class="token parameter variable">-b</span> <span class="token parameter variable">-1</span> <span class="token parameter variable">-p</span> err
<span class="token comment"># 查看上次启动的err信息的最后10行</span>
journalctl <span class="token parameter variable">-b</span> <span class="token parameter variable">-1</span> <span class="token parameter variable">-p</span> err <span class="token parameter variable">-n</span> <span class="token number">10</span>

<span class="token comment"># json 输出</span>
journalctl <span class="token parameter variable">-b</span> <span class="token parameter variable">-u</span> xxx.service <span class="token parameter variable">-o</span> json
journalctl <span class="token parameter variable">-b</span> <span class="token parameter variable">-u</span> xxx.service <span class="token parameter variable">-o</span> json-pretty

<span class="token comment"># 查看内核日志, 和 dmesg 打印出的类似</span>
journalctl <span class="token parameter variable">-k</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="hello-service" tabindex="-1"><a class="header-anchor" href="#hello-service" aria-hidden="true">#</a> hello service</h2><p>systemd 常见的两个目录:</p><ul><li><code>/etc/systemd/system/</code>, systemd默认从这里读取配置文件, 但用 <code>ls -la</code> 可以看出, 里面的service基本都是符号链接, 指向 <code>/lib/systemd/system</code>, 但直接把配置文件.service 放在这个目录也是可以的</li><li><code>/lib/systemd/system</code>, 可以放置真正的配置文件</li></ul><p>下面给出一个简单的service示例, 1s打印一次</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">vi</span> /lib/systemd/system/hello.service
<span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>Hello World Service
<span class="token assign-left variable">After</span><span class="token operator">=</span>network.target

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">Type</span><span class="token operator">=</span>simple
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/bin/bash <span class="token parameter variable">-c</span> <span class="token string">&#39;while true; do echo &quot;Hello World&quot;; sleep 1; done&#39;</span>
<span class="token assign-left variable">Restart</span><span class="token operator">=</span>on-failure

<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>
<span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以直接运行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl status hello.service

<span class="token comment"># 因为是后台进程, 默认终端无显示, dmeg里也没有, 可以用status</span>
$ <span class="token function">sudo</span> systemctl status hello.service
● hello.service - Hello World Service
     Loaded: loaded <span class="token punctuation">(</span>/lib/systemd/system/hello.service<span class="token punctuation">;</span> disabled<span class="token punctuation">;</span> vendor preset: enabled<span class="token punctuation">)</span>
     Active: active <span class="token punctuation">(</span>running<span class="token punctuation">)</span> since Thu <span class="token number">2023</span>-01-05 <span class="token number">15</span>:12:53 CST<span class="token punctuation">;</span> 36s ago
   Main PID: <span class="token number">1508</span> <span class="token punctuation">(</span>bash<span class="token punctuation">)</span>
      Tasks: <span class="token number">2</span> <span class="token punctuation">(</span>limit: <span class="token number">38477</span><span class="token punctuation">)</span>
     Memory: <span class="token number">864</span>.0K
     CGroup: /system.slice/hello.service
             ├─1508 /bin/bash <span class="token parameter variable">-c</span> <span class="token keyword">while</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">;</span> <span class="token function">sleep</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token keyword">done</span>
             └─1560 <span class="token function">sleep</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>得益于配置文件里写了 <code>Restart=on-failure</code>, 假设我们不小心杀掉了进程, systemd 会帮我们重新拉起来</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># PID号参考上方 Main PID: 1508 (bash)</span>
$ <span class="token function">sudo</span> <span class="token function">kill</span> <span class="token parameter variable">-9</span> <span class="token number">1508</span>

<span class="token comment"># 可以看到进程被重新拉了起来, PID号已经变了</span>
$ <span class="token function">sudo</span> systemctl status hello
● hello.service - Hello World Service
     Loaded: loaded <span class="token punctuation">(</span>/lib/systemd/system/hello.service<span class="token punctuation">;</span> disabled<span class="token punctuation">;</span> vendor preset: enabled<span class="token punctuation">)</span>
     Active: active <span class="token punctuation">(</span>running<span class="token punctuation">)</span> since Thu <span class="token number">2023</span>-01-05 <span class="token number">15</span>:18:03 CST<span class="token punctuation">;</span> 1s ago
   Main PID: <span class="token number">1854</span> <span class="token punctuation">(</span>bash<span class="token punctuation">)</span>
      Tasks: <span class="token number">2</span> <span class="token punctuation">(</span>limit: <span class="token number">38477</span><span class="token punctuation">)</span>
     Memory: <span class="token number">948</span>.0K
     CGroup: /system.slice/hello.service
             ├─1854 /bin/bash <span class="token parameter variable">-c</span> <span class="token keyword">while</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">;</span> <span class="token function">sleep</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token keyword">done</span>
             └─1856 <span class="token function">sleep</span> <span class="token number">1</span>
<span class="token comment"># 持续跟踪服务</span>
$ journalctl <span class="token parameter variable">-f</span> <span class="token parameter variable">-u</span> hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果系统关掉, 重新打开, 服务并不在运行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl status hello.service
● hello.service - Hello World Service
     Loaded: loaded <span class="token punctuation">(</span>/lib/systemd/system/hello.service<span class="token punctuation">;</span> disabled<span class="token punctuation">;</span> vendor preset: enabled<span class="token punctuation">)</span>
     Active: inactive <span class="token punctuation">(</span>dead<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用 <code>enable</code> 来创建符号链接, 因为配置文件中 <code>WantedBy=multi-user.target</code>, 会创建链接到 <code>/etc/systemd/system/multi-user.target.wants</code>, 而 <code>sudo systemctl status multi-user.target</code> 可以看到是开机启动的, 那么 hello.service 再下次系统启动时会连带着起来.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> hello.service
Created symlink /etc/systemd/system/multi-user.target.wants/hello.service → /lib/systemd/system/hello.service.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>再次重启系统, 就可以看到服务开机启动了</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl status hello
● hello.service - Hello World Service
     Loaded: loaded <span class="token punctuation">(</span>/lib/systemd/system/hello.service<span class="token punctuation">;</span> enabled<span class="token punctuation">;</span> vendor preset: enabled<span class="token punctuation">)</span>
     Active: active <span class="token punctuation">(</span>running<span class="token punctuation">)</span> since Thu <span class="token number">2023</span>-01-05 <span class="token number">15</span>:29:56 CST<span class="token punctuation">;</span> 17s ago
   Main PID: <span class="token number">372</span> <span class="token punctuation">(</span>bash<span class="token punctuation">)</span>
      Tasks: <span class="token number">2</span> <span class="token punctuation">(</span>limit: <span class="token number">38477</span><span class="token punctuation">)</span>
     Memory: <span class="token number">768</span>.0K
     CGroup: /system.slice/hello.service
             ├─372 /bin/bash <span class="token parameter variable">-c</span> <span class="token keyword">while</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;Hello World&quot;</span><span class="token punctuation">;</span> <span class="token function">sleep</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token keyword">done</span>
             └─949 <span class="token function">sleep</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="小结一下" tabindex="-1"><a class="header-anchor" href="#小结一下" aria-hidden="true">#</a> 小结一下</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 编写配置文件, vi 或者 nano编辑器的 sudo systemctl edit --force --full xxx.service</span>
<span class="token function">sudo</span> <span class="token function">vi</span> /lib/systemd/system/xxx.service
<span class="token comment"># 立即运行服务</span>
<span class="token function">sudo</span> systemctl start xxx
<span class="token comment"># 设置开机启动(创建符号链接到 yyy.target.wants 或 yyy.target.requires)</span>
<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> xxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果更改了配置文件想要重启服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 配置文件修改需要 reload units, 但还不会打断之前服务的运行</span>
<span class="token function">sudo</span> systemctl daemon-reload
<span class="token comment"># 重启服务</span>
<span class="token function">sudo</span> systemctl restart xxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想要彻底停止并删掉服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 停止当前的运行</span>
<span class="token function">sudo</span> systemctl stop xxx
<span class="token comment"># 禁止开机自启(删掉符号链接)</span>
<span class="token function">sudo</span> systemctl disable xxx
<span class="token comment"># 删掉配置文件</span>
<span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> /lib/systemd/system/xxx.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="sleep-与-timeout-测试" tabindex="-1"><a class="header-anchor" href="#sleep-与-timeout-测试" aria-hidden="true">#</a> Sleep 与 Timeout 测试</h2><p>服务配置文件中 <code>Restart=on-failure</code> 的默认超时时间是 90s, 也就是 90s 内不返回结果就会认为失败了, 特别是调试的时候, 经常会直接 sleep 一段时间再启动, 如GNSS冷启动超级慢, 有时候 sleep 超过了 90s, sleep 的位置不对会出问题, 下面就演示一下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">vi</span> /lib/systemd/system/hellox.service
<span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>Hello World Service
<span class="token assign-left variable">After</span><span class="token operator">=</span>network.target

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">Type</span><span class="token operator">=</span>simple
<span class="token assign-left variable">ExecStartPre</span><span class="token operator">=</span>/bin/sleep <span class="token number">100</span>    
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/bin/bash <span class="token parameter variable">-c</span> <span class="token string">&#39;while true; do echo &quot;Hellox&quot;; sleep 1; done&#39;</span> 
<span class="token assign-left variable">Restart</span><span class="token operator">=</span>on-failure

<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>
<span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行测试发现一直失败, 显示 <code>Failed with result &#39;timeout&#39;</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl daemon-reload
$ <span class="token function">sudo</span> systemctl restart hellox

$ journalctl <span class="token parameter variable">-f</span> <span class="token parameter variable">-u</span> hellox
Jan 05 <span class="token number">17</span>:38:04 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: hellox.service: start-pre operation timed out. Terminating.
Jan 05 <span class="token number">17</span>:38:04 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: hellox.service: Control process exited, <span class="token assign-left variable">code</span><span class="token operator">=</span>killed, <span class="token assign-left variable">status</span><span class="token operator">=</span><span class="token number">15</span>/<span class="token environment constant">TERM</span>
Jan 05 <span class="token number">17</span>:38:04 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: hellox.service: Failed with result <span class="token string">&#39;timeout&#39;</span><span class="token builtin class-name">.</span>
Jan 05 <span class="token number">17</span>:38:04 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Failed to start Hellox Service.
Jan 05 <span class="token number">17</span>:38:04 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: hellox.service: Scheduled restart job, restart counter is at <span class="token number">1</span>.
Jan 05 <span class="token number">17</span>:38:04 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Stopped Hellox Service.
Jan 05 <span class="token number">17</span>:38:04 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Starting Hellox Service<span class="token punctuation">..</span>.

Jan 05 <span class="token number">17</span>:39:34 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: hellox.service: start-pre operation timed out. Terminating.
Jan 05 <span class="token number">17</span>:39:34 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: hellox.service: Control process exited, <span class="token assign-left variable">code</span><span class="token operator">=</span>killed, <span class="token assign-left variable">status</span><span class="token operator">=</span><span class="token number">15</span>/<span class="token environment constant">TERM</span>
Jan 05 <span class="token number">17</span>:39:34 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: hellox.service: Failed with result <span class="token string">&#39;timeout&#39;</span><span class="token builtin class-name">.</span>
Jan 05 <span class="token number">17</span>:39:34 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Failed to start Hellox Service.
Jan 05 <span class="token number">17</span>:39:35 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: hellox.service: Scheduled restart job, restart counter is at <span class="token number">2</span>.
Jan 05 <span class="token number">17</span>:39:35 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Stopped Hellox Service.
Jan 05 <span class="token number">17</span>:39:35 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Starting Hellox Service<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果确实非要 sleep, 有下面几种解决办法</p><ul><li>删掉 <code>ExecStartPre=/bin/sleep 100</code>, 把 <code>sleep 100</code> 放到 <code>ExecStart=/bin/bash -c &#39;sleep 100; while true; do echo &quot;Hellox&quot;; sleep 1; done&#39;</code>, 建议用这种方法, restart 服务会立即返回</li><li>修改超时时间, 如修改为120s, <code>TimeoutSec=120</code>, 或者不限制 <code>TimeoutSec=0</code>, 这会导致 restart 的时候卡<code>ExecStartPre=/bin/sleep 100</code> 这个100s, 所以不太建议这种方法, 可以使用 <code>--no-block</code> 参数规避</li><li><code>sudo systemctl --no-block restart hellox</code>, 让systemctl跳过等待, 也就没有Timeout了, 比较危险, 慎用</li><li>sleep 往往并不靠谱, 建议不用, 可以试试 After 或者 Requires, 或者修改程序</li></ul><h2 id="requires-测试" tabindex="-1"><a class="header-anchor" href="#requires-测试" aria-hidden="true">#</a> Requires 测试</h2><p>本服务启动时, Requires后面的服务也会同时被启动(不会因为sleep迟滞), Requires后的服务失败, 本服务也会终止</p><p>修改 <code>hellox.service</code>, 让 hello.service 成为 hellox 的 Requiers</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">vi</span> /lib/systemd/system/hellox.service
<span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>Hellox Service
<span class="token assign-left variable">Requires</span><span class="token operator">=</span>hello.service

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">Type</span><span class="token operator">=</span>simple
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/bin/bash <span class="token parameter variable">-c</span> <span class="token string">&#39;while true; do echo &quot;Hellox&quot;; sleep 1; done&#39;</span>
<span class="token assign-left variable">Restart</span><span class="token operator">=</span>on-failure

<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>
<span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时 hello.service 没有运行, 启动 hellox, 发现hello也被同时启动了</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl stop hello hellox
$ <span class="token function">sudo</span> systemctl daemon-reload
$ <span class="token function">sudo</span> systemctl start hellox
$ journalctl <span class="token parameter variable">-f</span> <span class="token parameter variable">-u</span> hello <span class="token parameter variable">-u</span> hellox
Jan 05 <span class="token number">18</span>:59:46 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Started Hello World Service.
Jan 05 <span class="token number">18</span>:59:46 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Started Hellox Service.
Jan 05 <span class="token number">18</span>:59:46 U20 bash<span class="token punctuation">[</span><span class="token number">2535</span><span class="token punctuation">]</span>: Hello World
Jan 05 <span class="token number">18</span>:59:46 U20 bash<span class="token punctuation">[</span><span class="token number">2536</span><span class="token punctuation">]</span>: Hellox
Jan 05 <span class="token number">18</span>:59:47 U20 bash<span class="token punctuation">[</span><span class="token number">2535</span><span class="token punctuation">]</span>: Hello World
Jan 05 <span class="token number">18</span>:59:47 U20 bash<span class="token punctuation">[</span><span class="token number">2536</span><span class="token punctuation">]</span>: Hellox
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>终止 hello, 发现 hellox 也被牵连终止了. (反过来不会)</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl stop hello
$ journalctl <span class="token parameter variable">-f</span> <span class="token parameter variable">-u</span> hello <span class="token parameter variable">-u</span> hellox
Jan 05 <span class="token number">19</span>:00:53 U20 bash<span class="token punctuation">[</span><span class="token number">2558</span><span class="token punctuation">]</span>: Hellox
Jan 05 <span class="token number">19</span>:00:53 U20 bash<span class="token punctuation">[</span><span class="token number">2557</span><span class="token punctuation">]</span>: Hello World
Jan 05 <span class="token number">19</span>:00:53 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Stopping Hello World Service<span class="token punctuation">..</span>.
Jan 05 <span class="token number">19</span>:00:53 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Stopping Hellox Service<span class="token punctuation">..</span>.
Jan 05 <span class="token number">19</span>:00:53 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: hello.service: Succeeded.
Jan 05 <span class="token number">19</span>:00:53 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Stopped Hello World Service.
Jan 05 <span class="token number">19</span>:00:53 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: helloy.service: Succeeded.
Jan 05 <span class="token number">19</span>:00:53 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Stopped Hellox Service.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="after-测试" tabindex="-1"><a class="header-anchor" href="#after-测试" aria-hidden="true">#</a> After 测试</h2><p>配置文件中的 After 表示该服务在什么服务启动之后再启动, 其它服务在启动中或者未启动完成则本服务等待, 典型应用如:</p><ul><li>许多程序需要联网才能使用, 可以等到网络服务启动后再启动</li><li>ros应用 依赖 roscore , 可以在roscore服务启动后再启动ros应用</li><li>很多日志以时间为log名, 但是嵌入式系统等很多没有后备电池, 需要通过GNSS或者网络NTP, PTP等授时后, 系统时间才会准确, 其它的服务可以等待时间同步的服务完成后再开始运行</li></ul><p>修改 hellox.service, 在 hello.service 启动之后再启动, 即 <code>After=hello.service</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">vi</span> /lib/systemd/system/hellox.service
<span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>Hellox Service
<span class="token assign-left variable">After</span><span class="token operator">=</span>hello.service

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">Type</span><span class="token operator">=</span>simple
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/bin/bash <span class="token parameter variable">-c</span> <span class="token string">&#39;while true; do echo &quot;Hellox&quot;; sleep 1; done&#39;</span>
<span class="token assign-left variable">Restart</span><span class="token operator">=</span>on-failure

<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>
<span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在 <code>hello.service</code> 没有运行, 先启动 hellox:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl start hellox

<span class="token comment"># 发现可以直接运行</span>
$ <span class="token function">sudo</span> systemctl status hellox
● hellox.service - Hellox Service
     Loaded: loaded <span class="token punctuation">(</span>/lib/systemd/system/hellox.service<span class="token punctuation">;</span> disabled<span class="token punctuation">;</span> vendor preset: enabled<span class="token punctuation">)</span>
     Active: active <span class="token punctuation">(</span>running<span class="token punctuation">)</span> since Thu <span class="token number">2023</span>-01-05 <span class="token number">15</span>:47:16 CST<span class="token punctuation">;</span> 4s ago
   Main PID: <span class="token number">1328</span> <span class="token punctuation">(</span>bash<span class="token punctuation">)</span>
      Tasks: <span class="token number">2</span> <span class="token punctuation">(</span>limit: <span class="token number">38477</span><span class="token punctuation">)</span>
     Memory: <span class="token number">796</span>.0K
     CGroup: /system.slice/hellox.service
             ├─1328 /bin/bash <span class="token parameter variable">-c</span> <span class="token keyword">while</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;Hellox&quot;</span><span class="token punctuation">;</span> <span class="token function">sleep</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token keyword">done</span>
             └─1333 <span class="token function">sleep</span> <span class="token number">1</span>

<span class="token comment"># 停掉hellox</span>
<span class="token function">sudo</span> systemctl stop hellox
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改 <code>hello.service</code>, 加上89s的延时</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">vi</span> /lib/systemd/system/hello.service
<span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>Hello World Service
<span class="token assign-left variable">After</span><span class="token operator">=</span>network.target

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">Type</span><span class="token operator">=</span>simple
<span class="token assign-left variable">ExecStartPre</span><span class="token operator">=</span>/bin/sleep <span class="token number">89</span>
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/bin/bash <span class="token parameter variable">-c</span> <span class="token string">&#39;while true; do echo &quot;Hello World&quot;; sleep 1; done&#39;</span>
<span class="token assign-left variable">Restart</span><span class="token operator">=</span>on-failure

<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>
<span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把 <code>hello.service</code> 先运行起来, 然后趁着89s还没有走完, 运行 <code>hellox.service</code>发现 <code>hellox.service</code>被卡住直到 <code>hello.service</code> 启动完</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl start hello
<span class="token comment"># 另一个窗口</span>
$ <span class="token function">sudo</span> systemctl start hellox

$ journalctl <span class="token parameter variable">-f</span> <span class="token parameter variable">-u</span> hello <span class="token parameter variable">-u</span> hellox
Jan 05 <span class="token number">19</span>:08:30 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Starting Hello World Service<span class="token punctuation">..</span>.
Jan 05 <span class="token number">19</span>:09:59 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Started Hello World Service. <span class="token comment"># 89s后hello起来了</span>
Jan 05 <span class="token number">19</span>:09:59 U20 bash<span class="token punctuation">[</span><span class="token number">2981</span><span class="token punctuation">]</span>: Hello World
Jan 05 <span class="token number">19</span>:09:59 U20 systemd<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Started Hellox Service. <span class="token comment"># hellox 在这里起来了</span>
Jan 05 <span class="token number">19</span>:09:59 U20 bash<span class="token punctuation">[</span><span class="token number">2983</span><span class="token punctuation">]</span>: Hellox
Jan 05 <span class="token number">19</span>:10:00 U20 bash<span class="token punctuation">[</span><span class="token number">2981</span><span class="token punctuation">]</span>: Hello World
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>两个服务都enable, 然后重启系统, 也能看到类似的效果. 按名字顺序, helloy 的PID在hello的后面, 但如果调换两个service的内容(让hello中After=helloy, 让helloy去sleep 89), 就没有After的效果了.</p>`,61);function v(m,b){const n=i("router-link");return c(),p("div",null,[s("nav",u,[s("ul",null,[s("li",null,[a(n,{to:"#systemd-简介"},{default:e(()=>[l("systemd 简介")]),_:1})]),s("li",null,[a(n,{to:"#journalctl"},{default:e(()=>[l("journalctl")]),_:1})]),s("li",null,[a(n,{to:"#hello-service"},{default:e(()=>[l("hello service")]),_:1}),s("ul",null,[s("li",null,[a(n,{to:"#小结一下"},{default:e(()=>[l("小结一下")]),_:1})])])]),s("li",null,[a(n,{to:"#sleep-与-timeout-测试"},{default:e(()=>[l("Sleep 与 Timeout 测试")]),_:1})]),s("li",null,[a(n,{to:"#requires-测试"},{default:e(()=>[l("Requires 测试")]),_:1})]),s("li",null,[a(n,{to:"#after-测试"},{default:e(()=>[l("After 测试")]),_:1})])])]),d])}const x=t(r,[["render",v],["__file","10.systemd管理服务.html.vue"]]);export{x as default};
