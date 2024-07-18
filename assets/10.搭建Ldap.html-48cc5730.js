import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o as i,c as l,e as c,a as n,d as p,w as t,f as d,b as o}from"./app-efa5e96e.js";const u={},r={class:"table-of-contents"},v=d(`<h2 id="docker-搭建-ldap-相关服务" tabindex="-1"><a class="header-anchor" href="#docker-搭建-ldap-相关服务" aria-hidden="true">#</a> docker 搭建 Ldap 相关服务</h2><details class="hint-container details"><summary>docker-compose.yml</summary><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3&quot;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">openldap</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> osixia/openldap<span class="token punctuation">:</span>1.5.0
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> openldap
    <span class="token key atrule">privileged</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> TZ=&quot;Asia/Shanghai&quot;
      <span class="token punctuation">-</span> LDAP_ORGANISATION=txra
      <span class="token punctuation">-</span> LDAP_DOMAIN=txra.com
      <span class="token punctuation">-</span> LDAP_ADMIN_PASSWORD=123456
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 389<span class="token punctuation">:</span><span class="token number">389</span>
      <span class="token punctuation">-</span> 636<span class="token punctuation">:</span><span class="token number">636</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./data/openldap/slapd<span class="token punctuation">:</span>/etc/ldap/slapd.d
      <span class="token punctuation">-</span> ./data/openldap/data<span class="token punctuation">:</span>/var/lib/ldap
  <span class="token key atrule">phpldapadmin</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> osixia/phpldapadmin<span class="token punctuation">:</span>0.9.0
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> phpldapadmin
    <span class="token key atrule">privileged</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> PHPLDAPADMIN_LDAP_HOSTS=openldap
      <span class="token punctuation">-</span> PHPLDAPADMIN_HTTPS=false
    <span class="token key atrule">links</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> openldap<span class="token punctuation">:</span>openldap
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> openldap
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 8081<span class="token punctuation">:</span><span class="token number">80</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./data/phpldapadmin<span class="token punctuation">:</span>/var/www/phpldapadmin
  <span class="token key atrule">self-service-password</span><span class="token punctuation">:</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> ldap<span class="token punctuation">-</span>password
    <span class="token key atrule">image</span><span class="token punctuation">:</span> tiredofit/self<span class="token punctuation">-</span>service<span class="token punctuation">-</span>password<span class="token punctuation">:</span>5.1.2
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 8082<span class="token punctuation">:</span><span class="token number">80</span>
    <span class="token key atrule">links</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> openldap<span class="token punctuation">:</span>openldap
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> openldap
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> LDAP_SERVER=openldap
      <span class="token punctuation">-</span> LDAP_BINDDN=cn=admin<span class="token punctuation">,</span>dc=example<span class="token punctuation">,</span>dc=com
      <span class="token punctuation">-</span> LDAP_BINDPASS=123456
      <span class="token punctuation">-</span> LDAP_BASE_SEARCH=dc=example<span class="token punctuation">,</span>dc=com
      <span class="token punctuation">-</span> MAIL_FROM=dev_blog@163.com
      <span class="token punctuation">-</span> SMTP_DEBUG=0
      <span class="token punctuation">-</span> SMTP_HOST=smtp.163.com
      <span class="token punctuation">-</span> SMTP_USER=dev_blog@163.com
      <span class="token punctuation">-</span> SMTP_PASS=OCETSTXMGJHZWOID
      <span class="token punctuation">-</span> SMTP_PORT=465
      <span class="token punctuation">-</span> SMTP_SECURE_TYPE=ssl
      <span class="token punctuation">-</span> SMTP_AUTH_ON=true
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /etc/localtime<span class="token punctuation">:</span>/etc/localtime
      <span class="token punctuation">-</span> ./data/ldap<span class="token punctuation">-</span>password/ssp<span class="token punctuation">:</span>/www/ssp
      <span class="token punctuation">-</span> ./data/ldap<span class="token punctuation">-</span>password/logs<span class="token punctuation">:</span>/www/logs
    <span class="token key atrule">deploy</span><span class="token punctuation">:</span>
      <span class="token key atrule">resources</span><span class="token punctuation">:</span>
        <span class="token key atrule">limits</span><span class="token punctuation">:</span>
          <span class="token key atrule">memory</span><span class="token punctuation">:</span> 2G
        <span class="token key atrule">reservations</span><span class="token punctuation">:</span>
          <span class="token key atrule">memory</span><span class="token punctuation">:</span> 512M
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>org.ldif</summary><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>dn:o=organize,dc=example,dc=com
objectclass:top
objectclass:organization
o:organize
description:所在组织

dn:ou=company,o=organize,dc=example,dc=com
objectclass:top
objectclass:organizationalUnit
ou:company
description:所在的单位

dn: ou=Roles,ou=company,o=organize,dc=example,dc=com
objectClass: top
objectClass: organizationalUnit
ou: Roles
description:角色节点

dn:cn=dev,ou=company,o=organize,dc=example,dc=com
objectclass:posixGroup
objectclass:top
cn:dev
gidNumber:500
description:研发部

dn:cn=test,ou=company,o=organize,dc=example,dc=com
objectclass:posixGroup
objectclass:top
cn:test
gidNumber:501
description:测试部

dn: uid=zhangsan,cn=dev,ou=company,o=organize,dc=example,dc=com
cn: zhangsan
displayname: zhangsan
gidnumber: 500
givenname: zhangsan
homedirectory: zhangsan
mail: zhangsan@163.com
objectclass: posixAccount
objectclass: top
objectclass: inetOrgPerson
sn: zhangsan
uid: zhangsan
uidnumber: 1000
userpassword: 123456


dn: uid=wangwu,cn=test,ou=company,o=organize,dc=example,dc=com
cn: wangwu
displayname: wangwu
gidnumber: 501
givenname: wangwu
homedirectory: wangwu
mail: wangwu@163.com
objectclass: posixAccount
objectclass: top
objectclass: inetOrgPerson
sn: wangwu
uid: wangwu
uidnumber: 1001
userpassword: 123456

dn: cn=jira, ou=Roles,ou=company,o=organize,dc=example,dc=com
objectClass: top
objectClass: groupOfUniqueNames
cn: jira
ou: Roles
description: 用于jira登录
uniqueMember: uid=zhangsan,cn=dev,ou=company,o=organize,dc=example,dc=com
uniqueMember: uid=wangwu,cn=test,ou=company,o=organize,dc=example,dc=com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">########################</span>
<span class="token comment">## 免费Windows LDAP客户端和管理工具：http://www.ldapadmin.org/download/ldapadmin.html</span>
<span class="token comment">## http://phpldapadmin.sourceforge.net/wiki/index.php/Main_Page</span>
<span class="token comment">## https://ldapwiki.com/wiki/ObjectClass</span>
<span class="token comment">## 自主密码修改：https://self-service-password.readthedocs.io/en/latest/</span>
<span class="token comment">## 自主密码修改：https://github.com/ltb-project/self-service-password</span>
<span class="token comment">########################</span>

<span class="token comment"># Ldap服务</span>
<span class="token function">docker</span> pull osixia/openldap:1.5.0
<span class="token comment"># Ldap web管理界面</span>
<span class="token function">docker</span> pull osixia/phpldapadmin:0.9.0
<span class="token comment"># Ldap用户自助修改密码</span>
<span class="token function">docker</span> pull tiredofit/self-service-password:5.1.2
<span class="token comment"># 创建挂载目录</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> ./data/
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ./data/openldap/<span class="token punctuation">{</span>slapd,data<span class="token punctuation">}</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ./data/phpldapadmin
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ./data/ldap-password/<span class="token punctuation">{</span>ssp,logs<span class="token punctuation">}</span>

<span class="token comment"># 启动docker docker-compose.yml文件在上面</span>
<span class="token comment"># 管理员 账号：cn=admin,dc=example,dc=org 密码：123456</span>
<span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>

<span class="token comment"># 访问 http://localhost:8081（web管理） 和 http://localhost:8081 （自主修改密码）</span>

<span class="token comment"># 导入组织和用户</span>
<span class="token function">docker</span> <span class="token function">cp</span> org.ldif openldap:/opt/
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> openldap ldapadd  <span class="token parameter variable">-x</span>  <span class="token parameter variable">-D</span> <span class="token string">&quot;cn=admin,dc=example,dc=com&quot;</span>  <span class="token parameter variable">-w</span> <span class="token number">123456</span>  <span class="token parameter variable">-f</span> /opt/org.ldif
<span class="token comment"># 搜索数据</span>
<span class="token comment">#docker exec -it openldap ldapsearch -x -H ldap://localhost -b dc=example,dc=com -D &quot;cn=admin,dc=example,dc=com&quot; -w 123456</span>
<span class="token comment"># 搜索用户 后面通过phpldapadmin界面创建用户再搜索</span>
<span class="token comment">#docker exec -it openldap ldapsearch -H ldapi:/// -b &quot;dc=example,dc=com&quot; &quot;(uid=zhangsan)&quot; -D &quot;cn=admin,dc=example,dc=com&quot; memberOf -w 123456</span>
<span class="token comment"># 查看openldap服务下的dn配置都有哪些</span>
<span class="token comment">#docker exec openldap ldapsearch -Q -LLL -Y EXTERNAL -H ldapi:/// -b cn=config dn</span>
<span class="token comment">#docker exec openldap ldapsearch -LLL -x -H ldap:/// -D &quot;cn=admin,dc=example,dc=com&quot; -b &quot;dc=example,dc=com&quot; &quot;(ou=*)&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function m(k,b){const s=e("router-link");return i(),l("div",null,[c(" more "),n("nav",r,[n("ul",null,[n("li",null,[p(s,{to:"#docker-搭建-ldap-相关服务"},{default:t(()=>[o("docker 搭建 Ldap 相关服务")]),_:1})])])]),v])}const h=a(u,[["render",m],["__file","10.搭建Ldap.html.vue"]]);export{h as default};
