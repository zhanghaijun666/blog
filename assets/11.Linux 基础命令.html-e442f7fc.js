import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as c,c as r,a as n,b as s,d as a,e as o,w as l,f as d}from"./app-efa5e96e.js";const m={},u={href:"https://www.linuxcool.com/",target:"_blank",rel:"noopener noreferrer"},v={class:"table-of-contents"},b=d(`<h2 id="_1、基本操作" tabindex="-1"><a class="header-anchor" href="#_1、基本操作" aria-hidden="true">#</a> 1、基本操作</h2><h2 id="_2、磁盘-文件-目录" tabindex="-1"><a class="header-anchor" href="#_2、磁盘-文件-目录" aria-hidden="true">#</a> 2、磁盘,文件,目录</h2><h2 id="_3、检索相关" tabindex="-1"><a class="header-anchor" href="#_3、检索相关" aria-hidden="true">#</a> 3、检索相关</h2><h2 id="_4、网络相关" tabindex="-1"><a class="header-anchor" href="#_4、网络相关" aria-hidden="true">#</a> 4、网络相关</h2><h3 id="_4-1-本机ip地址" tabindex="-1"><a class="header-anchor" href="#_4-1-本机ip地址" aria-hidden="true">#</a> 4.1 本机ip地址</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>/sbin/ifconfig -a<span class="token operator">|</span><span class="token function">grep</span> inet<span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token number">127.0</span>.0.1<span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> inet6<span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token operator">|</span><span class="token function">tr</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;addr:&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="端口问题" tabindex="-1"><a class="header-anchor" href="#端口问题" aria-hidden="true">#</a> 端口问题</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">netstat</span> <span class="token parameter variable">-ntlp</span>                           <span class="token comment"># 所有正在使用的端口及关联的进程/应用</span>
<span class="token function">netstat</span> -lnp<span class="token operator">|</span><span class="token function">grep</span> <span class="token number">8080</span>                  <span class="token comment"># 查看到8080端口正在被哪个进程使用</span>
<span class="token function">lsof</span> <span class="token parameter variable">-i</span> :8080                           <span class="token comment"># 直接列出8080端口听使用进程/应用</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="网络配置" tabindex="-1"><a class="header-anchor" href="#网络配置" aria-hidden="true">#</a> 网络配置</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># ifcfg-ens33可变，根据自己的网卡</span>
<span class="token function">vi</span> /etc/sysconfig/network-scripts/ifcfg-ens33
<span class="token comment"># 重启网卡</span>
systemctl restart network
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查看磁盘-文件目录基本信息" tabindex="-1"><a class="header-anchor" href="#查看磁盘-文件目录基本信息" aria-hidden="true">#</a> 查看磁盘, 文件目录基本信息</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看磁盘挂载情况</span>
<span class="token function">mount</span>

<span class="token comment"># 查看磁盘分区信息</span>
<span class="token function">df</span>

<span class="token comment"># 查看目录及子目录大小</span>
<span class="token function">du</span> <span class="token parameter variable">-H</span> <span class="token parameter variable">-h</span>

<span class="token comment"># 查看当前目录下各个文件, 文件夹占了多少空间, 不会递归</span>
<span class="token function">du</span> <span class="token parameter variable">-sh</span> *
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="强制关闭进程名包含xxx的所有进程" tabindex="-1"><a class="header-anchor" href="#强制关闭进程名包含xxx的所有进程" aria-hidden="true">#</a> 强制关闭进程名包含xxx的所有进程</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ps</span> aux<span class="token operator">|</span><span class="token function">grep</span> xxx <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span> <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token function">kill</span> <span class="token parameter variable">-9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="查看系统-cpu信息" tabindex="-1"><a class="header-anchor" href="#查看系统-cpu信息" aria-hidden="true">#</a> 查看系统,CPU信息</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看系统内核信息</span>
<span class="token function">uname</span> <span class="token parameter variable">-a</span>

<span class="token comment"># 查看系统内核版本</span>
<span class="token function">cat</span> /proc/version

<span class="token comment"># 查看当前用户环境变量</span>
<span class="token function">env</span>

<span class="token function">cat</span> /proc/cpuinfo

<span class="token comment"># 查看有几个逻辑cpu, 包括cpu型号</span>
<span class="token function">cat</span> /proc/cpuinfo <span class="token operator">|</span> <span class="token function">grep</span> name <span class="token operator">|</span> <span class="token function">cut</span> <span class="token parameter variable">-f2</span> -d: <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span>

<span class="token comment"># 查看有几颗cpu,每颗分别是几核</span>
<span class="token function">cat</span> /proc/cpuinfo <span class="token operator">|</span> <span class="token function">grep</span> physical <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span>

<span class="token comment"># 查看当前CPU运行在32bit还是64bit模式下, 如果是运行在32bit下也不代表CPU不支持64bit</span>
getconf LONG_BIT

<span class="token comment"># 结果大于0, 说明支持64bit计算. lm指long mode, 支持lm则是64bit</span>
<span class="token function">cat</span> /proc/cpuinfo <span class="token operator">|</span> <span class="token function">grep</span> flags <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39; lm &#39;</span> <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="防火墙-firewalld" tabindex="-1"><a class="header-anchor" href="#防火墙-firewalld" aria-hidden="true">#</a> 防火墙 firewalld</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装防火墙</span>
yum <span class="token function">install</span> firewalld systemd <span class="token parameter variable">-y</span>
<span class="token comment"># 状态|启动|停止|重启|开机自启|禁止开机自启</span>
systemctl <span class="token punctuation">{</span>status<span class="token operator">|</span>start<span class="token operator">|</span>stop<span class="token operator">|</span>restart<span class="token operator">|</span><span class="token builtin class-name">enable</span><span class="token operator">|</span>disable<span class="token punctuation">}</span> firewalld.service
<span class="token function">service</span> firewalld  <span class="token punctuation">{</span>status<span class="token operator">|</span>start<span class="token operator">|</span>stop<span class="token operator">|</span>restart<span class="token operator">|</span><span class="token builtin class-name">enable</span><span class="token operator">|</span>disable<span class="token punctuation">}</span>
<span class="token comment"># 添加http服务到firewalld,pemmanent表示永久生效，若不加--permanent系统下次启动后就会失效。</span>
<span class="token function">sudo</span> firewall-cmd <span class="token parameter variable">--permanent</span> --add-service<span class="token operator">=</span>http
<span class="token function">sudo</span> firewall-cmd <span class="token parameter variable">--permanent</span> --add-service<span class="token operator">=</span>https
<span class="token comment"># 重新加载防火墙</span>
<span class="token function">sudo</span> systemctl reload firewalld

systemct list-enabled firewalld.service       <span class="token comment"># 查看服务是否开机启动：</span>
systemctl list-unit-files <span class="token operator">|</span> <span class="token function">grep</span> enabled      <span class="token comment"># 查看已启动的服务列表：</span>
systemctl <span class="token parameter variable">--failed</span>                            <span class="token comment"># 查看启动失败的服务列表：</span>

firewall-cmd <span class="token parameter variable">--version</span>                        <span class="token comment"># 查看版本：</span>
firewall-cmd <span class="token parameter variable">--help</span>                           <span class="token comment"># 查看帮助：</span>
firewall-cmd <span class="token parameter variable">--state</span>                          <span class="token comment"># 显示状态：</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --list-ports       <span class="token comment"># 查看所有打开的端口：</span>
firewall-cmd --list-services                  <span class="token comment"># 查看所有服务：</span>
firewall-cmd --get-services                   <span class="token comment"># 查看还有哪些服务可以打开:</span>
firewall-cmd <span class="token parameter variable">--reload</span>                         <span class="token comment"># 更新防火墙规则：</span>
firewall-cmd --get-active-zones               <span class="token comment"># 查看区域信息:</span>
firewall-cmd --get-zone-of-interface<span class="token operator">=</span>ens33    <span class="token comment"># 查看指定接口所属区域：</span>
firewall-cmd --panic-on                       <span class="token comment"># 拒绝所有包：</span>
firewall-cmd --panic-off                      <span class="token comment"># 取消拒绝状态：</span>
firewall-cmd --query-panic                    <span class="token comment"># 查看是否拒绝：</span>

firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">80</span>/tcp <span class="token parameter variable">--permanent</span>      <span class="token comment"># 开放指定端口</span>
firewall-cmd <span class="token parameter variable">--reload</span>                                         <span class="token comment"># 重新载入</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --query-port<span class="token operator">=</span><span class="token number">80</span>/tcp                <span class="token comment"># 查看指定端口</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --remove-port<span class="token operator">=</span><span class="token number">80</span>/tcp <span class="token parameter variable">--permanent</span>   <span class="token comment"># 取消开放指定端口</span>


<span class="token comment">## 开启防火墙</span>
systemctl start firewalld.service
<span class="token comment">## 防火墙开机启动</span>
systemctl <span class="token builtin class-name">enable</span> firewalld.service
<span class="token comment">## 关闭防火墙</span>
systemctl stop firewalld.service

<span class="token comment">## 查看防火墙状态</span>
firewall-cmd <span class="token parameter variable">--state</span>
<span class="token comment">## 查看现有的规则</span>
iptables <span class="token parameter variable">-nL</span>

<span class="token comment">## 重载防火墙配置</span>
firewall-cmd <span class="token parameter variable">--reload</span>

<span class="token comment">## 添加单个单端口</span>
firewall-cmd <span class="token parameter variable">--permanent</span> <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">81</span>/tcp
<span class="token comment">## 添加多个端口</span>
firewall-cmd <span class="token parameter variable">--permanent</span> <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">8080</span>-8083/tcp
<span class="token comment">## 删除某个端口</span>
firewall-cmd <span class="token parameter variable">--permanent</span> <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --remove-port<span class="token operator">=</span><span class="token number">81</span>/tcp
<span class="token comment">## 针对某个 IP开放端口</span>
firewall-cmd <span class="token parameter variable">--permanent</span> --add-rich-rule<span class="token operator">=</span><span class="token string">&quot;rule family=&quot;</span>ipv4<span class="token string">&quot; source address=&quot;</span><span class="token number">192.168</span>.142.166<span class="token string">&quot; port protocol=&quot;</span>tcp<span class="token string">&quot; port=&quot;</span><span class="token number">6379</span><span class="token string">&quot; accept&quot;</span>
firewall-cmd <span class="token parameter variable">--permanent</span> --add-rich-rule<span class="token operator">=</span><span class="token string">&quot;rule family=&quot;</span>ipv4<span class="token string">&quot; source address=&quot;</span><span class="token number">192.168</span>.0.233<span class="token string">&quot; accept&quot;</span>
<span class="token comment">## 删除某个IP</span>
firewall-cmd <span class="token parameter variable">--permanent</span> --remove-rich-rule<span class="token operator">=</span><span class="token string">&quot;rule family=&quot;</span>ipv4<span class="token string">&quot; source address=&quot;</span><span class="token number">192.168</span>.1.51<span class="token string">&quot; accept&quot;</span>
<span class="token comment">## 针对一个ip段访问</span>
firewall-cmd <span class="token parameter variable">--permanent</span> --add-rich-rule<span class="token operator">=</span><span class="token string">&quot;rule family=&quot;</span>ipv4<span class="token string">&quot; source address=&quot;</span><span class="token number">192.168</span>.0.0/16<span class="token string">&quot; accept&quot;</span>
firewall-cmd <span class="token parameter variable">--permanent</span> --add-rich-rule<span class="token operator">=</span><span class="token string">&quot;rule family=&quot;</span>ipv4<span class="token string">&quot; source address=&quot;</span><span class="token number">192.168</span>.1.0/24<span class="token string">&quot; port protocol=&quot;</span>tcp<span class="token string">&quot; port=&quot;</span><span class="token number">9200</span><span class="token string">&quot; accept&quot;</span>
<span class="token comment">## 添加操作后别忘了执行重载</span>
firewall-cmd <span class="token parameter variable">--reload</span>

firewall-cmd <span class="token parameter variable">--permanent</span> --add-rich-rule<span class="token operator">=</span><span class="token string">&quot;rule family=&quot;</span>ipv4<span class="token string">&quot; source address=&quot;</span><span class="token number">192.168</span>.180.0/16<span class="token string">&quot; accept&quot;</span>
firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="systemctl" tabindex="-1"><a class="header-anchor" href="#systemctl" aria-hidden="true">#</a> systemctl</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 基本操作</span>
systemctl status<span class="token operator">|</span>start<span class="token operator">|</span>stop<span class="token operator">|</span>restart<span class="token operator">|</span><span class="token builtin class-name">enable</span><span class="token operator">|</span>disable firewalld
<span class="token comment"># 检查开机是否启动该服务</span>
systemctl is-enabled httpd.service
<span class="token comment"># 列出所有激活的单元</span>
systemctl list-units
<span class="token comment"># 列出所有活动的服务</span>
systemctl list-units <span class="token parameter variable">-t</span> <span class="token function">service</span>
<span class="token comment"># 列出所有激活的target</span>
systemctl list-units <span class="token parameter variable">-t</span> target
<span class="token comment"># 关闭系统，重启或进入休眠状态。</span>
systemctl poweroff<span class="token operator">|</span><span class="token function">reboot</span><span class="token operator">|</span>hibernate

<span class="token comment"># 管理远程系统</span>
systemctl status httpd <span class="token parameter variable">-H</span> root@192.168.0.12

<span class="token comment"># systemd有自己的日志系统，称为journald。</span>
journalctl
<span class="token comment"># 查看所有引导消息</span>
journalctl <span class="token parameter variable">-b</span>
<span class="token comment"># 以下命令实时跟踪系统日志（类似于tail -f）</span>
journalctl <span class="token parameter variable">-f</span>
<span class="token comment"># 查询系统启动过程的持续时间</span>
systemd-analyze
<span class="token comment"># 查看服务的启动时间</span>
systemd-analyze blame

<span class="token comment"># 查看主机名称</span>
hostnamectl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="service-文件示例" tabindex="-1"><a class="header-anchor" href="#service-文件示例" aria-hidden="true">#</a> service 文件示例</h3><details class="hint-container details"><summary>cloudserver-solr.service</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># /usr/lib/systemd/system/cloudserver-solr.service</span>
<span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>CloudServer Solr Index Service
<span class="token assign-left variable">After</span><span class="token operator">=</span>syslog.target network.target remote-fs.target nss-lookup.target
<span class="token assign-left variable">Before</span><span class="token operator">=</span>cloudserver.service

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">PIDFile</span><span class="token operator">=</span>/opt/cloudserver/app/solr/bin/solr-8985.pid
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/bin/bash <span class="token parameter variable">-c</span> <span class="token string">&#39;source /opt/cloudserver/bin/cloudserver-envs; /opt/cloudserver/app/solr/bin/solr start -force&#39;</span>
<span class="token comment">#User=solr</span>
<span class="token assign-left variable">ExecReload</span><span class="token operator">=</span>/bin/kill <span class="token parameter variable">-s</span> HUP <span class="token variable">$MAINPID</span>
<span class="token assign-left variable">ExecStop</span><span class="token operator">=</span>/bin/kill <span class="token parameter variable">-s</span> QUIT <span class="token variable">$MAINPID</span>
<span class="token assign-left variable">PrivateTmp</span><span class="token operator">=</span>true
<span class="token assign-left variable">LimitNOFILE</span><span class="token operator">=</span><span class="token number">65000</span>
<span class="token assign-left variable">LimitNPROC</span><span class="token operator">=</span><span class="token number">65000</span>

<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>
<span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="系统命令" tabindex="-1"><a class="header-anchor" href="#系统命令" aria-hidden="true">#</a> 系统命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">uname</span> <span class="token parameter variable">-m</span>              <span class="token comment"># 显示机器的处理器架构</span>
<span class="token function">uname</span> <span class="token parameter variable">-r</span>              <span class="token comment"># 显示正在使用的内核版本</span>
arch                  <span class="token comment"># 显示机器的处理器架构</span>
<span class="token function">uname</span> <span class="token parameter variable">-m</span>              <span class="token comment"># 显示机器的处理器架构</span>
<span class="token function">head</span> <span class="token parameter variable">-n</span> <span class="token number">1</span> /etc/issue  <span class="token comment"># 查看操作系统版本</span>
<span class="token function">cat</span> /proc/cpuinfo     <span class="token comment"># 显示CPU info的信息</span>
<span class="token function">cat</span> /proc/meminfo     <span class="token comment"># 校验内存使用</span>
<span class="token function">cat</span> /proc/version     <span class="token comment"># 显示内核的版本</span>
<span class="token function">cat</span> /proc/loadavg     <span class="token comment"># 查看系统负载</span>
<span class="token function">cal</span> <span class="token number">2022</span>              <span class="token comment"># 显示2022年的日历表</span>
<span class="token function">free</span> <span class="token parameter variable">-m</span>               <span class="token comment"># 查看内存使用量和交换区使用量</span>
<span class="token function">df</span> <span class="token parameter variable">-h</span>                 <span class="token comment"># 显示已经挂载的分区列表</span>
<span class="token function">du</span> <span class="token parameter variable">-sh</span>                <span class="token comment"># 查看指定目录的大小</span>
<span class="token function">fdisk</span> <span class="token parameter variable">-l</span>              <span class="token comment"># 查看所有分区</span>
<span class="token function">chkconfig</span> <span class="token parameter variable">-list</span>       <span class="token comment"># 列出所有系统服务</span>
last                  <span class="token comment"># 查看用户登录日志</span>
<span class="token function">netstat</span> <span class="token parameter variable">-lntp</span>         <span class="token comment"># 查看所有监听端口</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查看文件内容" tabindex="-1"><a class="header-anchor" href="#查看文件内容" aria-hidden="true">#</a> 查看文件内容</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> file1           <span class="token comment"># 从第一个字节开始正向查看文件的内容</span>
<span class="token function">tac</span> file1           <span class="token comment"># 从最后一行开始反向查看一个文件的内容</span>
<span class="token function">more</span> file1          <span class="token comment"># 查看一个长文件的内容</span>
<span class="token function">less</span> file1          <span class="token comment"># 类似于 &#39;more&#39; 命令，但是它允许在文件中和正向操作一样的反向操作</span>
<span class="token function">head</span> <span class="token parameter variable">-2</span> file1       <span class="token comment"># 查看一个文件的前两行</span>
<span class="token function">tail</span> <span class="token parameter variable">-2</span> file1       <span class="token comment"># 查看一个文件的最后两行</span>
<span class="token function">tail</span> <span class="token parameter variable">-f</span> info.log    <span class="token comment"># 实时查看被添加到一个文件中的内容</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="文本处理" tabindex="-1"><a class="header-anchor" href="#文本处理" aria-hidden="true">#</a> 文本处理</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/stringa1/stringa2/g&#39;</span> example.txt     <span class="token comment"># 将example.txt文件中的 &quot;string1&quot; 替换成 &quot;string2&quot;</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;/^$/d&#39;</span> example.txt                     <span class="token comment"># 从example.txt文件中删除所有空白行</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;/ *#/d; /^$/d&#39;</span> example.txt             <span class="token comment"># 从example.txt文件中删除所有注释和空白行</span>
<span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;s/ *$//&#39;</span> example.txt                   <span class="token comment"># 删除每一行最后的空白字符</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="打包和压缩文件" tabindex="-1"><a class="header-anchor" href="#打包和压缩文件" aria-hidden="true">#</a> 打包和压缩文件</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-czvf</span> test.tar.gz test/     <span class="token comment"># 压缩 a和c文件为test.tar.gz</span>
<span class="token function">tar</span> <span class="token parameter variable">-tzvf</span> test.tar.gz           <span class="token comment"># 列出压缩文件内容</span>
<span class="token function">tar</span> <span class="token parameter variable">-xzvf</span> test.tar.gz           <span class="token comment"># 解压文件</span>

<span class="token function">tar</span> cvf test/                   <span class="token comment"># 压缩</span>
<span class="token function">tar</span> xvf test.tar                <span class="token comment"># 解压</span>

gunzip test.gz                  <span class="token comment"># 解压</span>
<span class="token function">gzip</span> <span class="token parameter variable">-d</span> test.gz                 <span class="token comment"># 解压</span>
<span class="token function">gzip</span> test/                      <span class="token comment"># 压缩</span>

<span class="token function">zip</span> <span class="token parameter variable">-q</span> <span class="token parameter variable">-r</span> test/                 <span class="token comment"># 压缩成zip格式</span>
<span class="token function">unzip</span> renwolesshel.zip          <span class="token comment"># 解压zip格式的压缩包</span>

xz <span class="token parameter variable">-z</span> node.tar                  <span class="token comment"># 压缩</span>
xz <span class="token parameter variable">-d</span> node.tar.xz               <span class="token comment"># 解压</span>

<span class="token comment">## https://www.rarlab.com/download.htm</span>
<span class="token comment"># wget https://www.rarlab.com/rar/rarlinux-x64-610.tar.gz --no-check-certificate</span>
<span class="token comment"># tar -xzvf rarlinux-x64-610.tar.gz -C /usr/local/lib/</span>
<span class="token comment"># ln -s /usr/local/lib/rar/rar /usr/local/bin/rar</span>
<span class="token comment"># ln -s /usr/local/lib/rar/unrar /usr/local/bin/unrar</span>
<span class="token function">unrar</span> x FileName.rar            <span class="token comment"># 解压</span>
<span class="token function">rar</span> a test/                     <span class="token comment"># 压缩</span>

<span class="token function">bzip2</span> <span class="token parameter variable">-d</span> test.bz2               <span class="token comment"># 解压</span>
bunzip2 test.bz2                <span class="token comment"># 解压</span>
<span class="token function">bzip2</span> <span class="token parameter variable">-z</span> test/                  <span class="token comment"># 压缩</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="rpm-包" tabindex="-1"><a class="header-anchor" href="#rpm-包" aria-hidden="true">#</a> RPM 包</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> package.rpm                <span class="token comment"># 安装一个rpm包</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> <span class="token parameter variable">--nodeeps</span> package.rpm      <span class="token comment"># 安装一个rpm包而忽略依赖关系警告</span>
<span class="token function">rpm</span> <span class="token parameter variable">-U</span> package.rpm                  <span class="token comment"># 更新一个rpm包但不改变其配置文件</span>
<span class="token function">rpm</span> <span class="token parameter variable">-F</span> package.rpm                  <span class="token comment"># 更新一个确定已经安装的rpm包</span>
<span class="token function">rpm</span> <span class="token parameter variable">-e</span> package_name.rpm             <span class="token comment"># 删除一个rpm包</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qa</span>                             <span class="token comment"># 显示系统中所有已经安装的rpm包</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> httpd                <span class="token comment"># 显示所有名称中包含 &quot;httpd&quot; 字样的rpm包</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="yum" tabindex="-1"><a class="header-anchor" href="#yum" aria-hidden="true">#</a> YUM</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum list                            <span class="token comment"># 列出当前系统中安装的所有包</span>
yum clean packages                  <span class="token comment"># 清理rpm缓存删除下载的包</span>
yum clean headers                   <span class="token comment"># 删除所有头文件</span>
yum clean all                       <span class="token comment"># 删除所有缓存的包和头文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="deb-包" tabindex="-1"><a class="header-anchor" href="#deb-包" aria-hidden="true">#</a> deb 包</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>dpkg <span class="token parameter variable">-i</span> package.deb                 <span class="token comment"># 安装/更新一个 deb 包</span>
dpkg <span class="token parameter variable">-r</span> package_name                <span class="token comment"># 从系统删除一个 deb 包</span>
dpkg <span class="token parameter variable">-l</span>                             <span class="token comment"># 显示系统中所有已经安装的 deb 包</span>
dpkg <span class="token parameter variable">-l</span> <span class="token operator">|</span> <span class="token function">grep</span> httpd                <span class="token comment"># 显示所有名称中包含 &quot;httpd&quot; 字样的deb包</span>
<span class="token function">apt-get</span> update                      <span class="token comment"># 升级列表中的软件包</span>
<span class="token function">apt-get</span> clean                       <span class="token comment"># 从下载的软件包中清理缓存</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ntpdate-同步更新时间" tabindex="-1"><a class="header-anchor" href="#ntpdate-同步更新时间" aria-hidden="true">#</a> ntpdate 同步更新时间</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> ntpdate <span class="token parameter variable">-y</span>
<span class="token comment"># 网络时间同步命令 -u参数可以越过防火墙与主机同步</span>
ntpdate <span class="token parameter variable">-u</span> cn.pool.ntp.org

<span class="token comment"># ntp常用服务器</span>
cn.pool.ntp.org     中国开源免费NTP服务器
ntp1.aliyun.com     阿里云NTP服务器
ntp2.aliyun.com     阿里云NTP服务器
time1.aliyun.com    阿里云NTP服务器
time2.aliyun.com    阿里云NTP服务器

<span class="token comment"># 加入crontab</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;*/20 * * * * /usr/sbin/ntpdate -u ntp1.aliyun.com &gt;/dev/null &amp;&quot;</span> <span class="token operator">&gt;&gt;</span> /var/spool/cron/root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ubuntu" tabindex="-1"><a class="header-anchor" href="#ubuntu" aria-hidden="true">#</a> Ubuntu</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 阿里云   http://mirrors.aliyun.com/ubuntu-releases/18.04/</span>
<span class="token comment">## 中科大源 http://mirrors.ustc.edu.cn/ubuntu-releases/18.04/</span>
<span class="token comment">## 上交源   http://ftp.sjtu.edu.cn/ubuntu-cd/18.04/</span>
<span class="token comment">## 清华源   https://mirrors.tuna.tsinghua.edu.cn/ubuntu-cdimage/ubuntu/releases/18.04/release/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建普通用户" tabindex="-1"><a class="header-anchor" href="#创建普通用户" aria-hidden="true">#</a> 创建普通用户</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 创建yunwei组</span>
<span class="token function">groupadd</span> <span class="token parameter variable">-g</span> <span class="token number">1090</span> yunwei             
<span class="token comment">## 创建yunwei用户</span>
<span class="token function">useradd</span> <span class="token parameter variable">-g</span> yunwei <span class="token parameter variable">-u</span> <span class="token number">1090</span> yunwei   
<span class="token comment">## 设置yunwei密码  </span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;123456Aa@&quot;</span> <span class="token operator">|</span> <span class="token function">passwd</span> <span class="token parameter variable">--stdin</span> yunwei 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,42);function k(f,h){const i=t("ExternalLinkIcon"),e=t("router-link");return c(),r("div",null,[n("p",null,[s("Linux 命令大全(手册)："),n("a",u,[s("https://www.linuxcool.com/"),a(i)])]),o(" more "),n("nav",v,[n("ul",null,[n("li",null,[a(e,{to:"#_1、基本操作"},{default:l(()=>[s("1、基本操作")]),_:1})]),n("li",null,[a(e,{to:"#_2、磁盘-文件-目录"},{default:l(()=>[s("2、磁盘,文件,目录")]),_:1})]),n("li",null,[a(e,{to:"#_3、检索相关"},{default:l(()=>[s("3、检索相关")]),_:1})]),n("li",null,[a(e,{to:"#_4、网络相关"},{default:l(()=>[s("4、网络相关")]),_:1}),n("ul",null,[n("li",null,[a(e,{to:"#_4-1-本机ip地址"},{default:l(()=>[s("4.1 本机ip地址")]),_:1})])])]),n("li",null,[a(e,{to:"#端口问题"},{default:l(()=>[s("端口问题")]),_:1})]),n("li",null,[a(e,{to:"#网络配置"},{default:l(()=>[s("网络配置")]),_:1})]),n("li",null,[a(e,{to:"#查看磁盘-文件目录基本信息"},{default:l(()=>[s("查看磁盘, 文件目录基本信息")]),_:1})]),n("li",null,[a(e,{to:"#强制关闭进程名包含xxx的所有进程"},{default:l(()=>[s("强制关闭进程名包含xxx的所有进程")]),_:1})]),n("li",null,[a(e,{to:"#查看系统-cpu信息"},{default:l(()=>[s("查看系统,CPU信息")]),_:1})]),n("li",null,[a(e,{to:"#防火墙-firewalld"},{default:l(()=>[s("防火墙 firewalld")]),_:1})]),n("li",null,[a(e,{to:"#systemctl"},{default:l(()=>[s("systemctl")]),_:1}),n("ul",null,[n("li",null,[a(e,{to:"#service-文件示例"},{default:l(()=>[s("service 文件示例")]),_:1})])])]),n("li",null,[a(e,{to:"#系统命令"},{default:l(()=>[s("系统命令")]),_:1})]),n("li",null,[a(e,{to:"#查看文件内容"},{default:l(()=>[s("查看文件内容")]),_:1})]),n("li",null,[a(e,{to:"#文本处理"},{default:l(()=>[s("文本处理")]),_:1})]),n("li",null,[a(e,{to:"#打包和压缩文件"},{default:l(()=>[s("打包和压缩文件")]),_:1})]),n("li",null,[a(e,{to:"#rpm-包"},{default:l(()=>[s("RPM 包")]),_:1})]),n("li",null,[a(e,{to:"#yum"},{default:l(()=>[s("YUM")]),_:1})]),n("li",null,[a(e,{to:"#deb-包"},{default:l(()=>[s("deb 包")]),_:1})]),n("li",null,[a(e,{to:"#ntpdate-同步更新时间"},{default:l(()=>[s("ntpdate 同步更新时间")]),_:1})]),n("li",null,[a(e,{to:"#ubuntu"},{default:l(()=>[s("Ubuntu")]),_:1})]),n("li",null,[a(e,{to:"#创建普通用户"},{default:l(()=>[s("创建普通用户")]),_:1})])])]),b])}const w=p(m,[["render",k],["__file","11.Linux 基础命令.html.vue"]]);export{w as default};
