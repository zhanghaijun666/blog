import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as c,c as o,e as i,a as n,d as a,w as t,f as u,b as e}from"./app-efa5e96e.js";const d={},r=n("p",null,"CAS 全称为 Central Authentication Service 即中央认证服务，是一个企业多语言单点登录的解决方案，并努力去成为一个身份验证和授权需求的综合平台。",-1),k=n("p",null,"CAS 是由 Yale 大学发起的一个企业级的、开源的项目，旨在为 Web 应用系统提供一种可靠的单点登录解决方法（属于 Web SSO ）。",-1),v=n("p",null,"CAS 协议至少涉及三方：客户端 Web 浏览器，请求身份验证的 Web 应用程序和 CAS 服务器。 它也可能涉及后端服务，如数据库服务器，它没有自己的 HTTP 接口，但与 Web 应用程序进行通信。",-1),m={class:"table-of-contents"},b=u(`<h2 id="源码文件" tabindex="-1"><a class="header-anchor" href="#源码文件" aria-hidden="true">#</a> 源码文件</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Github: https://github.com/apereo/cas</span>
<span class="token comment"># 下载链接: https://github.com/apereo/cas/tag</span>
<span class="token comment"># 开发文档: https://apereo.github.io/cas/5.2.x/index.html</span>
<span class="token comment"># 官网: https://www.apereo.org/projects/cas</span>
<span class="token comment"># WAR的代码架子: https://github.com/apereo/cas-overlay-template</span>
<span class="token comment"># 修改定制版本: https://gitee.com/haijunit/cas-overlay-template</span>
<span class="token function">git</span> clone <span class="token parameter variable">-b</span> <span class="token number">5.3</span> https://gitee.com/haijunit/cas-overlay-template.git
<span class="token comment">#git clone -b 5.3 https://github.com/apereo/cas-overlay-template.git</span>
mvn clean compile package
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改-pom-文件" tabindex="-1"><a class="header-anchor" href="#修改-pom-文件" aria-hidden="true">#</a> 修改 pom 文件</h2><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!-- 添加认证所需要的依赖 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!--新增支持jdbc验证--&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.apereo.cas<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>cas-server-support-jdbc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\${cas.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!--数据库驱动依赖--&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.apereo.cas<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>cas-server-support-jdbc-drivers<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\${cas.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.apereo.cas<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>cas-server-support-ldap<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\${cas.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- 白名单(Whitelist)认证 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.apereo.cas<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>cas-server-support-generic<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\${cas.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!--
    ...Additional dependencies may be placed here...
    --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>repositories</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>repository</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>shibboleth-releases<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>https://build.shibboleth.net/nexus/content/repositories/releases<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>repository</span><span class="token punctuation">&gt;</span></span>
  <span class="token comment">&lt;!--添加国内镜像源地址--&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>repository</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>id</span><span class="token punctuation">&gt;</span></span>maven-ali<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>id</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>http://maven.aliyun.com/nexus/content/groups/public//<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>releases</span><span class="token punctuation">&gt;</span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>enabled</span><span class="token punctuation">&gt;</span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>enabled</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>releases</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>snapshots</span><span class="token punctuation">&gt;</span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>enabled</span><span class="token punctuation">&gt;</span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>enabled</span><span class="token punctuation">&gt;</span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>updatePolicy</span><span class="token punctuation">&gt;</span></span>always<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>updatePolicy</span><span class="token punctuation">&gt;</span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>checksumPolicy</span><span class="token punctuation">&gt;</span></span>fail<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>checksumPolicy</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>snapshots</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>repository</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>repositories</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="war-打包" tabindex="-1"><a class="header-anchor" href="#war-打包" aria-hidden="true">#</a> WAR 打包</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># WAR打包</span>
<span class="token comment">#./build.cmd package</span>
./build.sh package
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="jdbc-认证" tabindex="-1"><a class="header-anchor" href="#jdbc-认证" aria-hidden="true">#</a> JDBC 认证</h2><details class="hint-container details"><summary>application.properties</summary><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token comment">##</span>
<span class="token comment"># Query Database Authentication 数据库查询校验用户名开始</span>
<span class="token comment">#</span>
<span class="token comment">#查询账号密码SQL，必须包含密码字段</span>
<span class="token key attr-name">cas.authn.jdbc.query[0].sql</span><span class="token punctuation">=</span><span class="token value attr-value">select * from user where username=?</span>
<span class="token comment">#指定上面的SQL查询字段名（必须）</span>
<span class="token key attr-name">cas.authn.jdbc.query[0].fieldPassword</span><span class="token punctuation">=</span><span class="token value attr-value">password</span>
<span class="token comment">#指定过期字段，1为过期，若过期不可用</span>
<span class="token key attr-name">cas.authn.jdbc.query[0].fieldExpired</span><span class="token punctuation">=</span><span class="token value attr-value">expired</span>
<span class="token comment">#为不可用字段段，1为不可用，需要修改密码</span>
<span class="token key attr-name">cas.authn.jdbc.query[0].fieldDisabled</span><span class="token punctuation">=</span><span class="token value attr-value">disabled</span>

<span class="token comment">#数据库dialect配置</span>
<span class="token key attr-name">cas.authn.jdbc.query[0].dialect</span><span class="token punctuation">=</span><span class="token value attr-value">org.hibernate.dialect.MySQLDialect</span>
<span class="token comment">#数据库连接</span>
<span class="token key attr-name">cas.authn.jdbc.query[0].url</span><span class="token punctuation">=</span><span class="token value attr-value">jdbc:mysql://127.0.0.1:3306/cas?useUnicode=true&amp;characterEncoding=UTF-8&amp;autoReconnect=true&amp;useSSL=false</span>
<span class="token comment">#数据库用户名</span>
<span class="token key attr-name">cas.authn.jdbc.query[0].user</span><span class="token punctuation">=</span><span class="token value attr-value">root</span>
<span class="token comment">#数据库用户密码</span>
<span class="token key attr-name">cas.authn.jdbc.query[0].password</span><span class="token punctuation">=</span><span class="token value attr-value">123456</span>

<span class="token comment">#数据库事务自动提交</span>
<span class="token key attr-name">cas.authn.jdbc.query[0].autocommit</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>
<span class="token comment">#数据库驱动</span>
<span class="token key attr-name">cas.authn.jdbc.query[0].driverClass</span><span class="token punctuation">=</span><span class="token value attr-value">com.mysql.jdbc.Driver</span>
<span class="token comment">#超时配置</span>
<span class="token key attr-name">cas.authn.jdbc.query[0].idleTimeout</span><span class="token punctuation">=</span><span class="token value attr-value">5000</span>

<span class="token comment"># https://apereo.github.io/cas/5.3.x/installation/Configuration-Properties-Common.html#password-encoding</span>
<span class="token comment">#默认加密策略，通过encodingAlgorithm来指定算法，默认NONE不加密</span>
<span class="token comment"># 可选 NONE|DEFAULT|STANDARD|BCRYPT|SCRYPT|PBKDF2</span>
<span class="token comment">#cas.authn.jdbc.query[0].passwordEncoder.type=NONE</span>
<span class="token key attr-name">cas.authn.jdbc.query[0].passwordEncoder.type</span><span class="token punctuation">=</span><span class="token value attr-value">DEFAULT</span>
<span class="token key attr-name">cas.authn.jdbc.query[0].passwordEncoder.characterEncoding</span><span class="token punctuation">=</span><span class="token value attr-value">UTF-8</span>
<span class="token key attr-name">cas.authn.jdbc.query[0].passwordEncoder.encodingAlgorithm</span><span class="token punctuation">=</span><span class="token value attr-value">MD5</span>
<span class="token comment"># 加密盐</span>
<span class="token comment">#cas.authn.jdbc.query[0].passwordEncoder.secret=</span>
<span class="token comment"># 加密字符长度</span>
<span class="token comment">#cas.authn.jdbc.query[0].passwordEncoder.strength=16</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>mysql.sql</summary><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">DATABASE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">\`</span>cas<span class="token punctuation">\`</span></span><span class="token punctuation">;</span>

<span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> <span class="token identifier"><span class="token punctuation">\`</span>cas<span class="token punctuation">\`</span></span> <span class="token keyword">CHARACTER</span> <span class="token keyword">SET</span> utf8mb4 <span class="token keyword">COLLATE</span> utf8mb4_general_ci<span class="token punctuation">;</span>
<span class="token keyword">SET</span> NAMES utf8mb4<span class="token punctuation">;</span>
<span class="token keyword">SET</span> FOREIGN_KEY_CHECKS <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">USE</span> <span class="token identifier"><span class="token punctuation">\`</span>cas<span class="token punctuation">\`</span></span><span class="token punctuation">;</span>

<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">\`</span>sys_user<span class="token punctuation">\`</span></span><span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> sys_user <span class="token punctuation">(</span>
 id <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
 username <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
 password <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
 expired <span class="token keyword">int</span><span class="token punctuation">,</span>   <span class="token comment">-- 是否过期 1为不可用，0为正常</span>
 disabled <span class="token keyword">int</span><span class="token punctuation">,</span>  <span class="token comment">-- 是否禁用 1为不可用，0为正常</span>
 locked <span class="token keyword">int</span><span class="token punctuation">,</span>    <span class="token comment">-- 是否锁定 1为不可用，0为正常</span>
 <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>id<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 正常用户</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> sys_user <span class="token keyword">values</span> <span class="token punctuation">(</span><span class="token string">&#39;1&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;admin&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;e10adc3949ba59abbe56e057f20f883e&#39;</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> sys_user <span class="token keyword">values</span> <span class="token punctuation">(</span><span class="token string">&#39;2&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;cs01&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;e10adc3949ba59abbe56e057f20f883e&#39;</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 禁用账户</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> sys_user <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token string">&#39;3&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;cs02&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;e10adc3949ba59abbe56e057f20f883e&#39;</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 过期账户</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> sys_user <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token string">&#39;4&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;cs03&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;e10adc3949ba59abbe56e057f20f883e&#39;</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 锁定账户</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> sys_user <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token string">&#39;5&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;cs04&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;e10adc3949ba59abbe56e057f20f883e&#39;</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="ldap-认证" tabindex="-1"><a class="header-anchor" href="#ldap-认证" aria-hidden="true">#</a> Ldap 认证</h2><details class="hint-container details"><summary>application.properties</summary><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token comment">###################ldap authentication######################</span>
<span class="token key attr-name">cas.authn.ldap[0].principalAttributeList</span><span class="token punctuation">=</span><span class="token value attr-value">sn,cn:commonName,givenName,eduPersonTargettedId:SOME_IDENTIFIER</span>
<span class="token key attr-name">cas.authn.ldap[0].collectDnAttribute</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>
<span class="token key attr-name">cas.authn.ldap[0].principalDnAttributeName</span><span class="token punctuation">=</span><span class="token value attr-value">principalLdapDn</span>
<span class="token key attr-name">cas.authn.ldap[0].allowMultiplePrincipalAttributeValues</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token key attr-name">cas.authn.ldap[0].allowMissingPrincipalAttributeValue</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token key attr-name">cas.authn.ldap[0].credentialCriteria</span><span class="token punctuation">=</span>

<span class="token key attr-name">cas.authn.ldap[0].ldapUrl</span><span class="token punctuation">=</span><span class="token value attr-value">ldap://127.0.0.1:389</span>
<span class="token key attr-name">cas.authn.ldap[0].bindDn</span><span class="token punctuation">=</span><span class="token value attr-value">cn=admin,dc=txra,dc=com</span>
<span class="token key attr-name">cas.authn.ldap[0].bindCredential</span><span class="token punctuation">=</span><span class="token value attr-value">123456</span>
<span class="token key attr-name">cas.authn.ldap[0].baseDn</span><span class="token punctuation">=</span><span class="token value attr-value">ou=bjtxra,o=txra,dc=txra,dc=com</span>

<span class="token key attr-name">cas.authn.ldap[0].poolPassivator</span><span class="token punctuation">=</span><span class="token value attr-value">NONE</span>
<span class="token key attr-name">cas.authn.ldap[0].connectionStrategy</span><span class="token punctuation">=</span>
<span class="token key attr-name">cas.authn.ldap[0].providerClass</span><span class="token punctuation">=</span><span class="token value attr-value">org.ldaptive.provider.unboundid.UnboundIDProvider</span>
<span class="token key attr-name">cas.authn.ldap[0].connectTimeout</span><span class="token punctuation">=</span><span class="token value attr-value">PT5S</span>
<span class="token key attr-name">cas.authn.ldap[0].trustCertificates</span><span class="token punctuation">=</span>
<span class="token key attr-name">cas.authn.ldap[0].keystore</span><span class="token punctuation">=</span>
<span class="token key attr-name">cas.authn.ldap[0].keystorePassword</span><span class="token punctuation">=</span>
<span class="token key attr-name">cas.authn.ldap[0].keystoreType</span><span class="token punctuation">=</span><span class="token value attr-value">JKS</span>
<span class="token key attr-name">cas.authn.ldap[0].minPoolSize</span><span class="token punctuation">=</span><span class="token value attr-value">3</span>
<span class="token key attr-name">cas.authn.ldap[0].maxPoolSize</span><span class="token punctuation">=</span><span class="token value attr-value">10</span>
<span class="token key attr-name">cas.authn.ldap[0].validateOnCheckout</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token key attr-name">cas.authn.ldap[0].validatePeriodically</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token key attr-name">cas.authn.ldap[0].validatePeriod</span><span class="token punctuation">=</span><span class="token value attr-value">PT5M</span>
<span class="token key attr-name">cas.authn.ldap[0].validateTimeout</span><span class="token punctuation">=</span><span class="token value attr-value">PT5S</span>
<span class="token key attr-name">cas.authn.ldap[0].failFast</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token key attr-name">cas.authn.ldap[0].idleTime</span><span class="token punctuation">=</span><span class="token value attr-value">PT10M</span>
<span class="token key attr-name">cas.authn.ldap[0].prunePeriod</span><span class="token punctuation">=</span><span class="token value attr-value">PT2H</span>
<span class="token key attr-name">cas.authn.ldap[0].blockWaitTime</span><span class="token punctuation">=</span><span class="token value attr-value">PT3S</span>
<span class="token key attr-name">cas.authn.ldap[0].useSsl</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>
<span class="token key attr-name">cas.authn.ldap[0].useStartTls</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>
<span class="token key attr-name">cas.authn.ldap[0].responseTimeout</span><span class="token punctuation">=</span><span class="token value attr-value">PT5S</span>
<span class="token key attr-name">cas.authn.ldap[0].allowMultipleDns</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>
<span class="token key attr-name">cas.authn.ldap[0].allowMultipleEntries</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>
<span class="token key attr-name">cas.authn.ldap[0].followReferrals</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>
<span class="token key attr-name">cas.authn.ldap[0].binaryAttributes</span><span class="token punctuation">=</span><span class="token value attr-value">objectGUID,someOtherAttribute</span>
<span class="token key attr-name">cas.authn.ldap[0].name</span><span class="token punctuation">=</span>
<span class="token key attr-name">cas.authn.ldap[0].type</span><span class="token punctuation">=</span><span class="token value attr-value">AUTHENTICATED</span>
<span class="token key attr-name">cas.authn.ldap[0].searchFilter</span><span class="token punctuation">=</span><span class="token value attr-value">(|(uid={user})(mail={user})(mobile={user}))</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="白名单认证" tabindex="-1"><a class="header-anchor" href="#白名单认证" aria-hidden="true">#</a> 白名单认证</h2><details class="hint-container details"><summary>application.properties</summary><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token comment">##</span>
<span class="token comment"># 白名单——file配置</span>
<span class="token key attr-name">cas.authn.file.separator</span><span class="token punctuation">=</span><span class="token value attr-value">::</span>
<span class="token comment">#cas.authn.file.filename=file:///Users/anumbrella/file</span>
<span class="token comment">#cas.authn.file.filename=claapath:user.txt</span>
<span class="token key attr-name">cas.authn.file.name</span><span class="token punctuation">=</span>

<span class="token comment">##</span>
<span class="token comment"># 黑名单配置</span>
<span class="token key attr-name">cas.authn.reject.users</span><span class="token punctuation">=</span><span class="token value attr-value">test,anumbrella</span>
<span class="token key attr-name">cas.authn.reject.name</span><span class="token punctuation">=</span>

<span class="token comment">##</span>
<span class="token comment"># 白名单——json配置</span>
<span class="token comment">#cas.authn.json.location=claapath:user.json</span>
<span class="token comment">#cas.authn.json.name=</span>


<span class="token comment"># 密码明文</span>
<span class="token key attr-name">cas.authn.jdbc.query[0].passwordEncoder.type</span><span class="token punctuation">=</span><span class="token value attr-value">NONE</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> user.txt <span class="token operator">&lt;&lt;</span><span class="token string">EOF
admin::admin
test::test
EOF</span>

<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> user.json <span class="token operator">&lt;&lt;</span><span class="token string">EOF
{
  &quot;@class&quot; : &quot;java.util.LinkedHashMap&quot;,
  &quot;admin&quot; : {
    &quot;@class&quot; : &quot;org.apereo.cas.adaptors.generic.CasUserAccount&quot;,
    &quot;password&quot; : &quot;admin&quot;,
    &quot;status&quot; : &quot;OK&quot;,
    &quot;expirationDate&quot; : &quot;2222-01-01&quot;
  }
}
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14);function g(h,y){const s=l("router-link");return c(),o("div",null,[r,k,v,i(" more "),n("nav",m,[n("ul",null,[n("li",null,[a(s,{to:"#源码文件"},{default:t(()=>[e("源码文件")]),_:1})]),n("li",null,[a(s,{to:"#修改-pom-文件"},{default:t(()=>[e("修改 pom 文件")]),_:1})]),n("li",null,[a(s,{to:"#war-打包"},{default:t(()=>[e("WAR 打包")]),_:1})]),n("li",null,[a(s,{to:"#jdbc-认证"},{default:t(()=>[e("JDBC 认证")]),_:1})]),n("li",null,[a(s,{to:"#ldap-认证"},{default:t(()=>[e("Ldap 认证")]),_:1})]),n("li",null,[a(s,{to:"#白名单认证"},{default:t(()=>[e("白名单认证")]),_:1})])])]),b])}const _=p(d,[["render",g],["__file","11.搭建Cas单点认证.html.vue"]]);export{_ as default};
