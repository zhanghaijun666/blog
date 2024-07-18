import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,f as e}from"./app-efa5e96e.js";const l={},i=e(`<h2 id="fail2ban" tabindex="-1"><a class="header-anchor" href="#fail2ban" aria-hidden="true">#</a> Fail2Ban</h2><blockquote><p>Fail2Ban（Fail to Ban）是一种用于防范暴力破解攻击的开源软件。它的主要目标是通过监视系统日志文件，检测恶意行为（如多次登录失败、恶意IP地址等），并采取自动化的措施来阻止攻击者进一步访问系统。</p></blockquote><p>以下是Fail2Ban的一些关键特性和工作原理：</p><ul><li>监视日志文件： Fail2Ban通过分析系统的日志文件，特别是包含安全相关信息的文件，来检测潜在的入侵尝试。</li><li>定义规则： 用户可以定义自定义规则，告诉Fail2Ban在日志中搜索什么样的模式，并根据这些模式采取相应的行动。</li><li>动态封禁： 一旦Fail2Ban检测到恶意行为，它将采取措施来阻止攻击者的进一步访问。这通常涉及到在防火墙规则中添加临时的封锁规则。</li><li>可定制性： 用户可以根据自己的需求配置Fail2Ban，包括设置封锁的时间、阈值等参数。</li><li>支持多种服务： Fail2Ban不仅限于防范SSH攻击，还支持监视和防范多种服务的暴力破解攻击，如FTP、HTTP、SMTP等。</li></ul><blockquote><p>在配置Fail2Ban时，用户通常需要编辑配置文件，指定监视的日志文件、定义规则以及配置封锁行为。这有助于提高系统的安全性，减少潜在的入侵风险。</p></blockquote><h3 id="应用使用" tabindex="-1"><a class="header-anchor" href="#应用使用" aria-hidden="true">#</a> 应用使用</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 安装</span>
<span class="token comment">## 在Debian/Ubuntu系统上，使用apt安装</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> fail2ban
<span class="token comment">## 在CentOS/RHEL系统上，使用yum安装</span>
<span class="token function">sudo</span> yum <span class="token function">install</span> epel-release
<span class="token function">sudo</span> yum <span class="token function">install</span> fail2ban

<span class="token comment">## 配置Fail2Ban</span>
<span class="token comment">## 备份默认配置文件</span>
<span class="token function">sudo</span> <span class="token function">cp</span> /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
<span class="token comment"># 修改配置文件以适应你的需求。你可以定义监控的日志文件、封禁的时间、最大重试次数等。以下是一个简单的示例：</span>
<span class="token punctuation">[</span>sshd<span class="token punctuation">]</span>
enabled <span class="token operator">=</span> <span class="token boolean">true</span>
port <span class="token operator">=</span> <span class="token function">ssh</span>
filter <span class="token operator">=</span> sshd
logpath <span class="token operator">=</span> /var/log/auth.log
maxretry <span class="token operator">=</span> <span class="token number">3</span>

<span class="token comment">## 启动Fail2Ban</span>
<span class="token function">sudo</span> systemctl start fail2ban
<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> fail2ban

<span class="token comment">##  检查Fail2Ban状态</span>
fail2ban-client status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="日常运维" tabindex="-1"><a class="header-anchor" href="#日常运维" aria-hidden="true">#</a> 日常运维</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 重新加载Fail2Ban配置</span>
fail2ban-client reload
<span class="token comment">## 查看Fail2Ban的状态：</span>
fail2ban-client status
<span class="token comment">## 查看特定Jail的状态（例如，sshd）</span>
fail2ban-client status sshd

<span class="token comment">## 手动解禁IP地址：</span>
<span class="token comment">## 替换 &lt;JAIL&gt; 为相应的监控项名称，&lt;IP_ADDRESS&gt; 为需要解封的IP地址。</span>
<span class="token function">sudo</span> fail2ban-client <span class="token builtin class-name">set</span> <span class="token operator">&lt;</span>JAIL<span class="token operator">&gt;</span> unbanip <span class="token operator">&lt;</span>IP_ADDRESS<span class="token operator">&gt;</span>

<span class="token comment">## 显示Fail2Ban的版本信息：</span>
<span class="token function">sudo</span> fail2ban-client version
<span class="token comment">## 检查Fail2Ban的配置文件：</span>
fail2ban-client validate
<span class="token comment">## 强制重新读取Fail2Ban配置文件：</span>
fail2ban-client reload
<span class="token comment">## 查看Fail2Ban日志：</span>
<span class="token function">tail</span> <span class="token parameter variable">-f</span> <span class="token parameter variable">-n</span> <span class="token number">50</span> /var/log/fail2ban.log
journalctl <span class="token parameter variable">-u</span> fail2ban

<span class="token function">cat</span> <span class="token operator">&gt;</span> fail2ban-status.sh <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
fail2ban-client status | grep &quot;Jail list:&quot; | sed &quot;s/ //g&quot; | awk &#39;{split(<span class="token variable">$2</span>,a,&quot;,&quot;);for(i in a) system(&quot;fail2ban-client status &quot; a[i])}&#39;
echo To unban an ip:
echo fail2ban-client set module-name unbanip x.x.x.x
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),t=[i];function c(o,d){return a(),s("div",null,t)}const u=n(l,[["render",c],["__file","16.防范暴力破解攻击.html.vue"]]);export{u as default};
