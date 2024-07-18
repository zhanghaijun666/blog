import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as c,c as o,e as p,a as n,d as a,w as e,f as r,b as l}from"./app-efa5e96e.js";const d={},m={class:"table-of-contents"},u=r(`<h2 id="操作系统" tabindex="-1"><a class="header-anchor" href="#操作系统" aria-hidden="true">#</a> 操作系统</h2><h3 id="_1、查看文件权限" tabindex="-1"><a class="header-anchor" href="#_1、查看文件权限" aria-hidden="true">#</a> 1、查看文件权限</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 查看该文件的权限</span>
<span class="token function">ls</span> <span class="token parameter variable">-la</span> /var/log/audit/audit.log

<span class="token comment">## 查看如下文件的权限是否满足</span>
<span class="token function">ls</span> <span class="token parameter variable">-l</span> /etc/passwd
<span class="token function">ls</span> <span class="token parameter variable">-l</span> /etc/hosts
<span class="token function">ls</span> <span class="token parameter variable">-l</span> /etc/login.defs
<span class="token function">ls</span> <span class="token parameter variable">-l</span> /etc/hosts.allow
<span class="token function">ls</span> <span class="token parameter variable">-l</span> /etc/shadow
<span class="token function">ls</span> <span class="token parameter variable">-l</span> /etc/hosts.deny
<span class="token function">ls</span> <span class="token parameter variable">-l</span> /etc/group
<span class="token function">ls</span> <span class="token parameter variable">-l</span> /etc/services

<span class="token comment">## 文件中日志信息所在文件的访问权限</span>
<span class="token function">ls</span> <span class="token parameter variable">-l</span> /var/log/messages
<span class="token function">ls</span> <span class="token parameter variable">-l</span> /var/log/secure
<span class="token function">ls</span> <span class="token parameter variable">-l</span> /var/log/audit/audit.log

<span class="token comment">## 查看rhost文件</span>
<span class="token function">find</span> / <span class="token parameter variable">-name</span> <span class="token string">&quot;.rhosts&quot;</span>
<span class="token comment">## 查看文件的完整性，结果在结尾显示是否改变</span>
pwck <span class="token parameter variable">-r</span> /etc/passwd
<span class="token comment">## 查看文件的完整性，结果在结尾显示是否改变</span>
pwck <span class="token parameter variable">-r</span> /etc/shadow
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、查看系统版本" tabindex="-1"><a class="header-anchor" href="#_2、查看系统版本" aria-hidden="true">#</a> 2、查看系统版本</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 查看系统版本号</span>
<span class="token function">more</span> /proc/version
<span class="token comment">## 查看已安装系统补丁</span>
<span class="token function">rpm</span> -qa<span class="token operator">|</span> <span class="token function">grep</span> patch
<span class="token comment">## 查看当前系统版本</span>
<span class="token function">more</span> /etc/issue
<span class="token function">more</span> /etc/redhat-release
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、服务相关" tabindex="-1"><a class="header-anchor" href="#_3、服务相关" aria-hidden="true">#</a> 3、服务相关</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 查看操作系统中已安装的程序包</span>
yum list installed
<span class="token comment">## 查看开机自启项</span>
systemctl list-unit-files
<span class="token comment">## 系统查看运行的服务</span>
systemctl list-units <span class="token operator">|</span><span class="token function">grep</span> running centos
<span class="token comment">## 查看所运行中服务情况（否已经关闭危险的网络服务如 echo、shell、login、finger、命令等。关闭非必需的网络服务如 talk、ntalk、pop-2、Sendmail、Imapd、Pop3d 等）</span>
<span class="token function">service</span> --status-all
<span class="token comment">## 查看端口开启情况</span>
<span class="token function">lsof</span> <span class="token parameter variable">-i:80</span>
<span class="token comment">## 查看是否启用对应的 telnet 端口服务</span>
<span class="token function">more</span> /etc/services<span class="token operator">|</span><span class="token function">grep</span> telnet
<span class="token comment">## 查看是否安装了 SSH 相应的包</span>
<span class="token function">rpm</span> -aq<span class="token operator">|</span><span class="token function">grep</span> <span class="token function">ssh</span>
<span class="token comment">## 查看 ssh 是否启动</span>
<span class="token function">ps</span> <span class="token parameter variable">-e</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token function">ssh</span>
<span class="token comment">## 核查是否不存在非必要的高危端口</span>
<span class="token function">netstat</span> <span class="token parameter variable">-an</span> <span class="token parameter variable">-t</span>
<span class="token comment">## 访问 ssh 配置文件</span>
<span class="token function">more</span> /etc/ssh/sshd_config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、审计相关" tabindex="-1"><a class="header-anchor" href="#_3、审计相关" aria-hidden="true">#</a> 3、审计相关</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 检查日志运行</span>
systemctl status rsyslog
<span class="token comment">## 查看审计功能是否正常运行</span>
<span class="token function">service</span> auditd status
<span class="token function">service</span> rsyslog status
<span class="token function">more</span> /var/log/audit/audit.log   <span class="token comment">## 审计日志存放位置</span>
auditctl <span class="token parameter variable">-l</span> 查看 audit          <span class="token comment">## 规则</span>
auditctl <span class="token parameter variable">-s</span> 查看 audit          <span class="token comment">## 运行状态；</span>
<span class="token function">more</span> /var/log/messages          <span class="token comment">## 系统日志信息存放在此文件</span>
<span class="token function">more</span> /var/log/audit/audit.log   <span class="token comment">## 查看审计具体记录内容</span>
<span class="token function">more</span> /etc/audit/audit.rules     <span class="token comment">## 查看审计规则</span>
<span class="token function">more</span> /etc/rsyslog.conf          <span class="token comment">## 审计配置内容</span>
<span class="token function">more</span> /etc/audit/auditd.conf     <span class="token comment">## 审计配置内容</span>
<span class="token function">more</span> /etc/rsyslog.conf          <span class="token comment">## 配置文件里设置了日志服务器</span>
authconfig <span class="token parameter variable">--test</span> <span class="token operator">|</span> <span class="token function">grep</span> hashing <span class="token comment">## 查看加密</span>
<span class="token function">more</span> /etc/audit/auditd.conf     <span class="token comment">## 重点检查 num_logs（最大能生成几个审计文件），max_log_file（单个审计文件最大容量多少兆）,max_log_file_action(日志容量达到最大后的操作)，disk_full_action,disk_erro_action 等字段。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、密码复杂度" tabindex="-1"><a class="header-anchor" href="#_4、密码复杂度" aria-hidden="true">#</a> 4、密码复杂度</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>chage <span class="token parameter variable">-l</span> root Root <span class="token comment">## 密码复杂度</span>
<span class="token function">cat</span> /etc/login.defs<span class="token operator">|</span><span class="token function">grep</span> PASS <span class="token comment">## 查看当前所设置的密码长度及更换周期</span>
<span class="token function">more</span> /etc/pam.d/system-auth <span class="token comment">## 确认密码复杂度要求及针对终端直接登录，如：登录失败等</span>
<span class="token function">more</span> /etc/pam.d/sshd <span class="token comment">## 只针对 SSH 远程登录也可设置登录失败次数</span>
<span class="token function">more</span> /etc/sudo.conf （cat /etc/sudoers<span class="token operator">|</span><span class="token function">grep</span> <span class="token operator">=</span><span class="token punctuation">\\</span><span class="token punctuation">(</span>ALL<span class="token punctuation">\\</span><span class="token punctuation">)</span>） <span class="token comment">## 核查 root 级用户的权限都授予哪些账户</span>
<span class="token function">more</span> /etc/passwd <span class="token operator">|</span><span class="token function">awk</span> -F: <span class="token string">&#39;{print $1,$2}&#39;</span> <span class="token comment">## 用户中的第二个字段（口令）不为空，为 x 表示设置了密码。</span>

<span class="token function">more</span> /etc/shadow <span class="token comment">## 第二个字段为口令加密字段。（第一位：账号、第二位：加密加密、第三位：上次修改密码的时间、第四位：两次修改口令之间所需的最小天数、第五位：密码保持有效的最大天数天数、第六位：密码变更前提前几天警告、第七位：账号失效日期、第八位：账号取消日期。其中在密码栏的第一个字星号代表帐号被锁定、双叹号表示这个密码已经过期了，失效日期是从 1970 年 1 月 1 日开始的多少天）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5、入侵检测" tabindex="-1"><a class="header-anchor" href="#_5、入侵检测" aria-hidden="true">#</a> 5、入侵检测</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">find</span> / <span class="token parameter variable">-namie</span> <span class="token operator">&lt;</span>daemonname<span class="token operator">&gt;</span> <span class="token parameter variable">-print</span> <span class="token comment">## 检查是否安装了主机入侵检测软件</span>
<span class="token function">more</span> /var/log/secure <span class="token operator">|</span> <span class="token function">grep</span> refused <span class="token comment">## 查看入侵检测的措施</span>
<span class="token function">more</span> /etc/hosts.deny <span class="token comment">## （黑名单）对终端接入范围进行限制</span>
<span class="token function">more</span> /etc/hosts.allow <span class="token comment">## （白名单）或 more /etc/ssh/sshd_config 指定终端地址可访问</span>
<span class="token function">crontab</span> <span class="token parameter variable">-l</span> <span class="token comment">## 核查入侵和病毒行规则</span>
<span class="token function">more</span> /etc/profile <span class="token comment">## 查看有无 tmout 连接超时</span>
<span class="token function">more</span> /etc/profile <span class="token comment">## 清除敏感数据所在的存储空间</span>
<span class="token function">more</span> /etc/security/limits.conf <span class="token comment">## 是否对资源进行了限定</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mysql-数据库" tabindex="-1"><a class="header-anchor" href="#mysql-数据库" aria-hidden="true">#</a> mysql 数据库</h2><h3 id="_1、检查" tabindex="-1"><a class="header-anchor" href="#_1、检查" aria-hidden="true">#</a> 1、检查</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span>                                <span class="token comment">## 进入数据库</span>
SELECT <span class="token punctuation">\\</span>* FROM mysql.user<span class="token punctuation">;</span>                      <span class="token comment">## 查看设置的用户</span>
SELECT Host,User,plugin FROM mysql.user<span class="token punctuation">;</span>
SELECT Host,User,Password,plugin FROM mysql.user<span class="token punctuation">;</span> <span class="token comment">## 检查是否存在空口令用户（MySQL5.6 及以下）</span>
SELECT Host,User,authentication_string,plugin FROM mysql.user<span class="token punctuation">;</span> <span class="token comment">## 检查是否存在空口令用户（MySQL5.7 及以上）</span>
SHOW VARIABLES LIKE<span class="token string">&#39;validate_password%&#39;</span><span class="token punctuation">;</span>        <span class="token comment">## 检查口令复杂度（MySQL5.6 及以下）</span>
SELECT Host，User，password_lifetime FROM mysql.user<span class="token punctuation">;</span> <span class="token comment">## 检查口令定期更换（MySQL5.7 及以上）</span>
SELECT <span class="token punctuation">\\</span>* FROM information_schema.PLUGINS WHERE <span class="token assign-left variable">PLUGIN_NAME</span><span class="token operator">=</span><span class="token string">&#39;connection_control&#39;</span> <span class="token punctuation">;</span>  <span class="token comment">## 检查是否安装登录失败处理模块（MySQL5.6 及以下）</span>
SHOW variables LIKE <span class="token string">&#39;connection_control%&#39;</span><span class="token punctuation">;</span>      <span class="token comment">## 检查是否配置登录失败处理参数；（MySQL5.6 及以下）</span>
SHOW variables LIKE <span class="token string">&#39;%timeout&#39;</span><span class="token punctuation">;</span>                 <span class="token comment">## 检查连接超时</span>
SHOW variables LIKE <span class="token string">&#39;general_log%&#39;</span><span class="token punctuation">;</span>             <span class="token comment">## 检查数据库日志模块状态</span>
SELECT <span class="token punctuation">\\</span>* FROM INFORMATION_SCHEMA.PLUGINS WHERE <span class="token assign-left variable">PLUGIN_NAME</span><span class="token operator">=</span><span class="token string">&#39;audit_log&#39;</span><span class="token punctuation">;</span>            <span class="token comment">## 检查是否安装并开启 MySQL Enterprise Audit 模块</span>
SHOW variables LIKE<span class="token string">&#39;require_secure_transport&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16);function v(k,b){const s=i("router-link");return c(),o("div",null,[p(" more "),n("nav",m,[n("ul",null,[n("li",null,[a(s,{to:"#操作系统"},{default:e(()=>[l("操作系统")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#_1、查看文件权限"},{default:e(()=>[l("1、查看文件权限")]),_:1})]),n("li",null,[a(s,{to:"#_2、查看系统版本"},{default:e(()=>[l("2、查看系统版本")]),_:1})]),n("li",null,[a(s,{to:"#_3、服务相关"},{default:e(()=>[l("3、服务相关")]),_:1})]),n("li",null,[a(s,{to:"#_3、审计相关"},{default:e(()=>[l("3、审计相关")]),_:1})]),n("li",null,[a(s,{to:"#_4、密码复杂度"},{default:e(()=>[l("4、密码复杂度")]),_:1})]),n("li",null,[a(s,{to:"#_5、入侵检测"},{default:e(()=>[l("5、入侵检测")]),_:1})])])]),n("li",null,[a(s,{to:"#mysql-数据库"},{default:e(()=>[l("mysql 数据库")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#_1、检查"},{default:e(()=>[l("1、检查")]),_:1})])])])])]),u])}const g=t(d,[["render",v],["__file","14.等保三级检查命令.html.vue"]]);export{g as default};
