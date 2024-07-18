import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as n,f as e}from"./app-efa5e96e.js";const i={},t=e(`<h2 id="测试邮件" tabindex="-1"><a class="header-anchor" href="#测试邮件" aria-hidden="true">#</a> 测试邮件</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 安装依赖</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> sendemail mailx
<span class="token comment">## 发送测试邮件</span>
sendemail <span class="token parameter variable">-f</span> dev@bjtxra.com <span class="token parameter variable">-t</span> zhanghaijun@bjtxra.com <span class="token parameter variable">-s</span> smtp.exmail.qq.com:587 <span class="token parameter variable">-xu</span> dev@bjtxra.com <span class="token parameter variable">-xp</span> <span class="token string">&#39;Bedrock123!@#&#39;</span> <span class="token parameter variable">-u</span> <span class="token string">&quot;Test Email&quot;</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;This is a test email.&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="postfix" tabindex="-1"><a class="header-anchor" href="#postfix" aria-hidden="true">#</a> Postfix</h2><h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> postfix cyrus-sasl-plain

<span class="token assign-left variable">smtp_host</span><span class="token operator">=</span>smtp.exmail.qq.com
<span class="token assign-left variable">smtp_user</span><span class="token operator">=</span>dev@bjtxra.com
<span class="token assign-left variable">smtp_password</span><span class="token operator">=</span><span class="token string">&#39;Bedrock123!@#&#39;</span>
<span class="token assign-left variable">from_user</span><span class="token operator">=</span>dev@bjtxra.com
<span class="token assign-left variable">admin_email</span><span class="token operator">=</span>monitor@alot.pw

<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/inet_protocols = all/inet_protocols = ipv4/g&quot;</span> /etc/postfix/main.cf
<span class="token function">cat</span>  <span class="token operator">&gt;&gt;</span>  /etc/postfix/main.cf <span class="token operator">&lt;&lt;</span><span class="token string">EOF
relayhost = [<span class="token variable">$smtp_host</span>]:587
smtp_sasl_auth_enable = yes
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
smtp_sasl_security_options =
smtp_use_tls = yes
smtp_tls_CApath = /etc/ssl/certs
sender_canonical_classes = envelope_sender, header_sender
sender_canonical_maps =  regexp:/etc/postfix/sender_canonical_maps
smtp_header_checks = regexp:/etc/postfix/header_checks
EOF</span>
<span class="token function">cat</span>  <span class="token operator">&gt;&gt;</span>  /etc/postfix/sasl_passwd <span class="token operator">&lt;&lt;</span><span class="token string">EOF
[<span class="token variable">$smtp_host</span>]:587 <span class="token variable">$smtp_user</span>:<span class="token variable">$smtp_password</span>
EOF</span>
<span class="token function">chmod</span> <span class="token number">600</span> /etc/postfix/sasl_passwd
postmap /etc/postfix/sasl_passwd

<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /etc/postfix/sender_canonical_maps <span class="token operator">&lt;&lt;</span><span class="token string">EOF
/.+/    <span class="token variable">$from_user</span>
EOF</span>
postmap /etc/postfix/sender_canonical_maps

<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /etc/postfix/header_checks <span class="token operator">&lt;&lt;</span><span class="token string">EOF
/From:.*/ REPLACE From: <span class="token variable">$from_user</span>
EOF</span>

<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /etc/aliases <span class="token operator">&lt;&lt;</span><span class="token string">EOF
root:           <span class="token variable">$admin_email</span>
EOF</span>

<span class="token comment">## 重启服务</span>
systemctl restart postfix <span class="token operator">&amp;&amp;</span> systemctl status postfix
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 查看邮件队列</span>
mailq
<span class="token comment">## 清空邮件队列</span>
systemctl stop postfix <span class="token operator">&amp;&amp;</span> postsuper <span class="token parameter variable">-d</span> ALL <span class="token operator">&amp;&amp;</span> systemctl start postfix <span class="token operator">&amp;&amp;</span> systemctl status postfix

<span class="token comment">## 测试发送邮件</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;This is a test email&quot;</span> <span class="token operator">|</span> <span class="token function">sendmail</span> zhanghaijun@bjtxra.com
<span class="token builtin class-name">echo</span> <span class="token string">&quot;This is a test email&quot;</span> <span class="token operator">|</span> mail <span class="token parameter variable">-s</span> <span class="token string">&quot;test&quot;</span> zhanghaijun@bjtxra.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),l=[t];function p(r,c){return a(),n("div",null,l)}const m=s(i,[["render",p],["__file","20.邮件配置.html.vue"]]);export{m as default};
