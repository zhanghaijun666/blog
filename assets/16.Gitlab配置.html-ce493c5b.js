import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as r,e as u,a as s,d as n,w as e,b as a,f as l}from"./app-efa5e96e.js";const d={},m={class:"table-of-contents"},v=l(`<h2 id="gitlab-修改用户密码" tabindex="-1"><a class="header-anchor" href="#gitlab-修改用户密码" aria-hidden="true">#</a> gitlab 修改用户密码</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 等待进入数据库</span>
gitlab-rails console <span class="token parameter variable">-e</span> production
<span class="token comment"># 查询用户</span>
irb<span class="token punctuation">(</span>main<span class="token punctuation">)</span>:009:<span class="token operator"><span class="token file-descriptor important">0</span>&gt;</span> user <span class="token operator">=</span> User.where<span class="token punctuation">(</span>id: <span class="token number">1</span><span class="token punctuation">)</span>.first
<span class="token comment"># 设置密码</span>
irb<span class="token punctuation">(</span>main<span class="token punctuation">)</span>:009:<span class="token operator"><span class="token file-descriptor important">0</span>&gt;</span> user.password <span class="token operator">=</span> <span class="token string">&#39;123456&#39;</span>
irb<span class="token punctuation">(</span>main<span class="token punctuation">)</span>:009:<span class="token operator"><span class="token file-descriptor important">0</span>&gt;</span> user.password_confirmation <span class="token operator">=</span> <span class="token string">&#39;123456&#39;</span>
<span class="token comment"># 保存数据</span>
irb<span class="token punctuation">(</span>main<span class="token punctuation">)</span>:009:<span class="token operator"><span class="token file-descriptor important">0</span>&gt;</span> user.save<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="gitlab-邮箱配置" tabindex="-1"><a class="header-anchor" href="#gitlab-邮箱配置" aria-hidden="true">#</a> gitlab 邮箱配置</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 修改配置</span>
$ <span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /etc/gitlab/gitlab.rb <span class="token operator">&lt;&lt;</span><span class="token string">EOF
gitlab_rails[&#39;smtp_enable&#39;] = true
gitlab_rails[&#39;smtp_address&#39;] = &quot;smtp.163.com&quot;
gitlab_rails[&#39;smtp_port&#39;] = 465
gitlab_rails[&#39;smtp_user_name&#39;] = &quot;发件箱名.163.com&quot;
gitlab_rails[&#39;smtp_password&#39;] = &quot;授权码&quot;
gitlab_rails[&#39;smtp_domain&#39;] = &quot;163.com&quot;
gitlab_rails[&#39;smtp_authentication&#39;] = &quot;login&quot;
gitlab_rails[&#39;smtp_enable_starttls_auto&#39;] = true
gitlab_rails[&#39;smtp_tls&#39;] = true
gitlab_rails[&#39;gitlab_email_from&#39;] = &#39;发件箱名.163.com&#39;
user[&#39;git_user_email&#39;] = &quot;发件箱名.163.com&quot;
EOF</span>
<span class="token comment"># 更新配置</span>
gitlab-ctl reconfigure
<span class="token comment"># 重启服务</span>
gitlab-ctl restart
<span class="token comment"># 邮件测试</span>
gitlab-rails console
<span class="token comment"># Notify.test_email(&#39;zhanghaijun_java@163.com&#39;,&#39;test Gitlab Email&#39;,&#39;Test&#39;).deliver_now</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ldap-登录配置" tabindex="-1"><a class="header-anchor" href="#ldap-登录配置" aria-hidden="true">#</a> ldap 登录配置</h2>`,5),b={href:"https://docs.gitlab.com/ee/integration/omniauth.html",target:"_blank",rel:"noopener noreferrer"},k=l(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /etc/gitlab/gitlab.rb <span class="token operator">&lt;</span> EOF
gitlab_rails<span class="token punctuation">[</span><span class="token string">&#39;ldap_enabled&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
gitlab_rails<span class="token punctuation">[</span><span class="token string">&#39;ldap_servers&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> YAML.load <span class="token operator">&lt;&lt;-</span><span class="token string">&#39;EOS&#39;
     label: &#39;LDAP&#39;
     host: &#39;192.168.60.8&#39;
     port: 389
     uid: &#39;cn&#39;
     bind_dn: &#39;cn=admin,dc=txra,dc=com&#39;
     password: &#39;123456&#39;
     verify_certificates: true
     smartcard_auth: false
     active_directory: true
     allow_username_or_email_login: false
     lowercase_usernames: false
     block_auto_created_users: false
     base: &#39;cn=dev,ou=txra,dc=txra,dc=com&#39;
     user_filter: &#39;&#39;
#     ## EE only
#     group_base: &#39;&#39;
#     admin_group: &#39;&#39;
#     sync_ssh_keys: false
EOS</span>
EOF
<span class="token comment"># 使配置生效</span>
gitlab-ctl reconfigure
<span class="token comment"># 重启服务</span>
gitlab-ctl restart
<span class="token comment"># 效验能否正常获取ldap用户信息</span>
gitlab-rake gitlab:ldap:check
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="cas-单点登录" tabindex="-1"><a class="header-anchor" href="#cas-单点登录" aria-hidden="true">#</a> CAS 单点登录</h2>`,2),g={href:"https://docs.gitlab.com/ee/integration/cas.html",target:"_blank",rel:"noopener noreferrer"},_={href:"https://gitlab.com/gitlab-org/gitlab-foss/-/issues/52251",target:"_blank",rel:"noopener noreferrer"},h=l(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /etc/gitlab/gitlab.rb <span class="token operator">&lt;</span> EOF
<span class="token comment">## SSO登录配置</span>
gitlab_rails<span class="token punctuation">[</span><span class="token string">&#39;omniauth_enabled&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
gitlab_rails<span class="token punctuation">[</span><span class="token string">&#39;omniauth_allow_single_sign_on&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;cas3&#39;</span><span class="token punctuation">]</span>
gitlab_rails<span class="token punctuation">[</span><span class="token string">&#39;omniauth_sync_email_from_provider&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;cas3&#39;</span>
gitlab_rails<span class="token punctuation">[</span><span class="token string">&#39;omniauth_sync_profile_from_provider&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;cas3&#39;</span><span class="token punctuation">]</span>
gitlab_rails<span class="token punctuation">[</span><span class="token string">&#39;omniauth_sync_profile_attributes&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;email&#39;</span>,<span class="token string">&#39;name&#39;</span><span class="token punctuation">]</span>
gitlab_rails<span class="token punctuation">[</span><span class="token string">&#39;omniauth_auto_sign_in_with_provider&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;cas3&#39;</span>
gitlab_rails<span class="token punctuation">[</span><span class="token string">&#39;omniauth_block_auto_created_users&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span>
gitlab_rails<span class="token punctuation">[</span><span class="token string">&#39;omniauth_auto_link_ldap_user&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
gitlab_rails<span class="token punctuation">[</span><span class="token string">&#39;omniauth_external_providers&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;cas3&#39;</span><span class="token punctuation">]</span>
gitlab_rails<span class="token punctuation">[</span><span class="token string">&#39;omniauth_allow_bypass_two_factor&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;cas3&#39;</span><span class="token punctuation">]</span>
gitlab_rails<span class="token punctuation">[</span><span class="token string">&#39;omniauth_providers&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
   <span class="token punctuation">{</span>
     <span class="token string">&quot;name&quot;</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&quot;cas3&quot;</span>,
     <span class="token string">&quot;label&quot;</span><span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&quot;CAS登录&quot;</span>,
     <span class="token string">&quot;args&quot;</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;url&quot;</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&quot;http://192.168.60.101:8888&quot;</span>,
        <span class="token string">&quot;login_url&quot;</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&quot;/cas/login&quot;</span>,
        <span class="token string">&quot;service_validate_url&quot;</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&quot;/cas/p3/serviceValidate&quot;</span>,
        <span class="token string">&quot;logout_url&quot;</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token string">&quot;/cas/logout&quot;</span>
     <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
EOF
<span class="token comment"># 使配置生效</span>
gitlab-ctl reconfigure
<span class="token comment"># 重启服务</span>
gitlab-ctl restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function f(q,x){const t=o("router-link"),i=o("ExternalLinkIcon");return c(),r("div",null,[u(" more "),s("nav",m,[s("ul",null,[s("li",null,[n(t,{to:"#gitlab-修改用户密码"},{default:e(()=>[a("gitlab 修改用户密码")]),_:1})]),s("li",null,[n(t,{to:"#gitlab-邮箱配置"},{default:e(()=>[a("gitlab 邮箱配置")]),_:1})]),s("li",null,[n(t,{to:"#ldap-登录配置"},{default:e(()=>[a("ldap 登录配置")]),_:1})]),s("li",null,[n(t,{to:"#cas-单点登录"},{default:e(()=>[a("CAS 单点登录")]),_:1})])])]),v,s("ul",null,[s("li",null,[s("a",b,[a("https://docs.gitlab.com/ee/integration/omniauth.html"),n(i)])])]),k,s("ul",null,[s("li",null,[s("a",g,[a("https://docs.gitlab.com/ee/integration/cas.html"),n(i)])]),s("li",null,[s("a",_,[a("https://gitlab.com/gitlab-org/gitlab-foss/-/issues/52251"),n(i)])])]),h])}const y=p(d,[["render",f],["__file","16.Gitlab配置.html.vue"]]);export{y as default};
