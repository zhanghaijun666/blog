import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o as t,c as i,e as o,a as s,d as c,w as l,f as r,b as m}from"./app-efa5e96e.js";const p={},d={class:"table-of-contents"},v=r(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 下载对应的tomcat版本</span>
<span class="token comment"># https://archive.apache.org/dist/tomcat/tomcat-8/v8.5.75/bin/apache-tomcat-8.5.75.tar.gz</span>
<span class="token function">wget</span> https://dlcdn.apache.org/tomcat/tomcat-8/v8.5.75/bin/apache-tomcat-8.5.75.tar.gz  --no-check-certificate
<span class="token comment">## 解压并放到指定的目录</span>
<span class="token function">tar</span> xzvf apache-tomcat-8.5.75.tar.gz <span class="token parameter variable">-C</span> /opt
<span class="token function">mv</span> /opt/apache-tomcat-8.5.75 /opt/tomcat-8.5.75
<span class="token comment">## 创建用户用来管理tomcat</span>
<span class="token function">groupadd</span> tomcat
<span class="token function">useradd</span> <span class="token parameter variable">-g</span> tomcat <span class="token parameter variable">-s</span> /sbin/nologin tomcat
<span class="token function">chown</span> <span class="token parameter variable">-R</span> tomcat:tomcat /opt/tomcat-8.5.75/
<span class="token comment">## 添加tomcat service</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /usr/lib/systemd/system/tomcat8.service <span class="token operator">&lt;&lt;</span><span class="token string">EOF
[Unit]
Description=Tomcat 8 servlet container
After=network.target

[Service]
Type=forking
User=tomcat
Group=tomcat
# 自定义的jre路径
Environment=&quot;JAVA_HOME=/usr/local/lib/jdk1.8.0_201/jre&quot;
Environment=&quot;JAVA_OPTS=-Djava.security.egd=file:///dev/urandom&quot;

Environment=&quot;CATALINA_BASE=/opt/tomcat-8.5.75&quot;
Environment=&quot;CATALINA_HOME=/opt/tomcat-8.5.75&quot;
Environment=&quot;CATALINA_PID=/opt/tomcat-8.5.75/temp/tomcat.pid&quot;
Environment=&quot;CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC&quot;

ExecStart=/opt/tomcat-8.5.75/bin/startup.sh
ExecStop=/opt/tomcat-8.5.75/bin/shutdown.sh

[Install]
WantedBy=multi-user.target
EOF</span>
<span class="token comment">## 加载配置并开机自启</span>
systemctl daemon-reload <span class="token operator">&amp;&amp;</span> systemctl <span class="token builtin class-name">enable</span> tomcat8.service
<span class="token comment"># 启动tomcat 并查看服务状态</span>
systemctl start tomcat8.service <span class="token operator">&amp;&amp;</span> systemctl status tomcat8.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="tomcat-配置-https" tabindex="-1"><a class="header-anchor" href="#tomcat-配置-https" aria-hidden="true">#</a> tomcat 配置 HTTPS</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">###### 证书配置</span>
<span class="token comment">## 生成证书 使用JDK自带的工具keytool (keytool -genkeypair)</span>
keytool <span class="token parameter variable">-genkey</span> <span class="token parameter variable">-alias</span> caskeystore <span class="token parameter variable">-keyalg</span> RSA <span class="token parameter variable">-keystore</span> thekeystore <span class="token punctuation">\\</span>
    <span class="token parameter variable">-storepass</span> <span class="token number">123456</span> <span class="token parameter variable">-keypass</span> <span class="token number">123456</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">-dname</span> <span class="token string">&quot;CN=cas.alot.pw, OU=bjtxra,OU=com,S=BJ,C=CN&quot;</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">-ext</span> <span class="token assign-left variable">SAN</span><span class="token operator">=</span><span class="token string">&quot;dns:localhost,ip:127.0.0.1&quot;</span>
<span class="token comment">## 导出数字证书</span>
<span class="token comment">#keytool -export -alias caskeystore -storepass 123456 -keystore thekeystore -rfc -file cas.crt</span>
<span class="token comment"># 将数字证书导入jdk下的jre里，这里导入JDK时需要默认密码 changeit</span>
<span class="token comment"># windows:</span>
<span class="token comment">#keytool -import -alias caskeystore -keystore %JAVA_HOME%\\jre\\lib\\security\\cacerts -file cas.crt -trustcacerts -storepass changeit</span>
<span class="token comment"># Unix:</span>
<span class="token comment">#sudo keytool -import -alias caskeystore -keystore $JAVA_HOME/jre/lib/security/cacerts -file cas.crt -trustcacerts -storepass changeit</span>

<span class="token comment">###### tomcat配置证书</span>
<span class="token comment"># 新建存放证书的目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /opt/tomcat-8.5.75/conf/keystore
<span class="token comment"># 复制证书到指定目录</span>
<span class="token function">cp</span> <span class="token parameter variable">-avf</span> ~/thekeystore /opt/tomcat-8.5.75/conf/keystore/
<span class="token comment"># 修改文件权限</span>
<span class="token function">chown</span> <span class="token parameter variable">-R</span> tomcat:tomcat /opt/tomcat-8.5.75/conf/keystore/
<span class="token comment"># 修改tomcat配置文件</span>
<span class="token function">vi</span> /opt/tomcat-8.5.75/conf/server.xml
:<span class="token operator">&lt;&lt;</span><span class="token string">EOF
    &lt;Connector port=&quot;8443&quot; protocol=&quot;org.apache.coyote.http11.Http11NioProtocol&quot; maxThreads=&quot;150&quot; SSLEnabled=&quot;true&quot;&gt;
        &lt;SSLHostConfig&gt;
            &lt;Certificate certificateKeystoreFile=&quot;conf/keystore/thekeystore&quot; type=&quot;RSA&quot; certificateKeystoreType=&quot;JKS&quot; certificateKeystorePassword=&quot;123456&quot;/&gt;
        &lt;/SSLHostConfig&gt;
    &lt;/Connector&gt;
EOF</span>
<span class="token comment"># 重启tomcat服务</span>
systemctl start tomcat8.service <span class="token operator">&amp;&amp;</span> systemctl status tomcat8.service
<span class="token comment"># 访问地址：http://192.168.10.151:8443</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function u(b,k){const n=e("router-link");return t(),i("div",null,[o(" more "),s("nav",d,[s("ul",null,[s("li",null,[c(n,{to:"#tomcat-配置-https"},{default:l(()=>[m("tomcat 配置 HTTPS")]),_:1})])])]),v])}const y=a(p,[["render",u],["__file","09.搭建Tomcat.html.vue"]]);export{y as default};
