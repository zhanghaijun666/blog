import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as p,c,e as u,a as n,d as a,w as t,b as s,f as r}from"./app-efa5e96e.js";const d={},k={class:"table-of-contents"},v=n("h2",{id:"sonarqube-代码检查工具",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#sonarqube-代码检查工具","aria-hidden":"true"},"#"),s(" sonarqube（代码检查工具）")],-1),m=n("p",null,"SonarQube 是一种自动代码审查工具，用于检测代码中的错误、漏洞和代码异味。它可以与您现有的工作流程集成，以实现跨项目分支和拉取请求的持续代码检查。",-1),b={href:"https://www.sonarqube.org/downloads/",target:"_blank",rel:"noopener noreferrer"},h={href:"http://updates.jenkins-ci.org/download/plugins/",target:"_blank",rel:"noopener noreferrer"},_=r(`<h3 id="docker-运行" tabindex="-1"><a class="header-anchor" href="#docker-运行" aria-hidden="true">#</a> docker 运行</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#vi docker-compose.yaml</span>
<span class="token comment">## 访问地址 http://localhost:9000/ 默认管理员用户和密码为：admin/admin。</span>
<span class="token comment">## Jenkins初始密码查看 docker exec my-Jenkins-3 cat /var/Jenkins_home/secrets/initialAdminPassword</span>
<span class="token comment">## Jenkins中安装 Sonar 插件</span>
<span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3&quot;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">postgres</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> postgres<span class="token punctuation">:</span><span class="token number">14.3</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> postgres
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">TZ</span><span class="token punctuation">:</span> Asia/Shanghai
      <span class="token key atrule">POSTGRES_DB</span><span class="token punctuation">:</span> sonarqube
      <span class="token key atrule">POSTGRES_USER</span><span class="token punctuation">:</span> sonar
      <span class="token key atrule">POSTGRES_PASSWORD</span><span class="token punctuation">:</span> sonar
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;5432:5432&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /etc/localtime<span class="token punctuation">:</span>/etc/localtime<span class="token punctuation">:</span>ro
      <span class="token punctuation">-</span> ./data/postgresql/data/<span class="token punctuation">:</span>/var/lib/postgresql/data/
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> sonarnet

  <span class="token key atrule">sonarqube</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> sonarqube<span class="token punctuation">:</span>9.4.0<span class="token punctuation">-</span>community
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> sonarqube
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">TZ</span><span class="token punctuation">:</span> Asia/Shanghai
      <span class="token key atrule">SONARQUBE_JDBC_USERNAME</span><span class="token punctuation">:</span> sonar
      <span class="token key atrule">SONARQUBE_JDBC_PASSWORD</span><span class="token punctuation">:</span> sonar
      <span class="token key atrule">SONARQUBE_JDBC_URL</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>postgresql<span class="token punctuation">:</span>//postgres<span class="token punctuation">:</span>5432/sonarqube
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9000:9000&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /etc/localtime<span class="token punctuation">:</span>/etc/localtime<span class="token punctuation">:</span>ro
      <span class="token punctuation">-</span> ./data/sonarqube/conf<span class="token punctuation">:</span>/opt/sonarqube/conf
      <span class="token punctuation">-</span> ./data/sonarqube/data<span class="token punctuation">:</span>/opt/sonarqube/data
      <span class="token punctuation">-</span> ./data/sonarqube/logs<span class="token punctuation">:</span>/opt/sonarqube/logs
      <span class="token punctuation">-</span> ./data/sonarqube/extensions<span class="token punctuation">:</span>/opt/sonarqube/extensions
      <span class="token punctuation">-</span> ./data/sonarqube/lib/bundled<span class="token punctuation">-</span>plugins<span class="token punctuation">:</span>/opt/sonarqube/lib/bundled<span class="token punctuation">-</span>plugins
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> postgres
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> sonarnet

  <span class="token key atrule">jenkins</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> jenkinsci/blueocean
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> jenkins
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">privileged</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">user</span><span class="token punctuation">:</span> root
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> TZ=Asia/Shanghai
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;8080:8080&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /etc/localtime<span class="token punctuation">:</span>/etc/localtime<span class="token punctuation">:</span>ro
      <span class="token punctuation">-</span> /home/data/jenkins/jenkins_home<span class="token punctuation">:</span>/var/jenkins_home
      <span class="token comment"># 挂载宿主机本地的maven环境</span>
      <span class="token punctuation">-</span> /usr/local/apache<span class="token punctuation">-</span>maven<span class="token punctuation">-</span>3.6.3<span class="token punctuation">:</span>/usr/local/maven
      <span class="token comment"># 让容器使用宿主的docker</span>
      <span class="token punctuation">-</span> /var/run/docker.sock<span class="token punctuation">:</span>/var/run/docker.sock
      <span class="token punctuation">-</span> /usr/bin/docker<span class="token punctuation">:</span>/usr/bin/docker
      <span class="token punctuation">-</span> /etc/docker<span class="token punctuation">:</span>/etc/docker
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> sonarnet

<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">sonarnet</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="通过-maven-检测代码" tabindex="-1"><a class="header-anchor" href="#通过-maven-检测代码" aria-hidden="true">#</a> 通过 maven 检测代码</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 通过账号密码使用</span>
mvn clean verify sonar:sonar <span class="token parameter variable">-Dsonar.host.url</span><span class="token operator">=</span>http://localhost:9000 <span class="token parameter variable">-Dsonar.login</span><span class="token operator">=</span>admin <span class="token parameter variable">-Dsonar.password</span><span class="token operator">=</span>admin
mvn clean verify Sonar:Sonar <span class="token parameter variable">-Dmaven.test.skip</span><span class="token operator">=</span>true <span class="token parameter variable">-DSonar.branch</span><span class="token operator">=</span>master

<span class="token comment">## 通过Token令牌使用</span>
mvn clean verify sonar:sonar <span class="token parameter variable">-Dsonar.host.url</span><span class="token operator">=</span>http://localhost:9000 <span class="token parameter variable">-Dsonar.login</span><span class="token operator">=</span>9656c84090b2481db6ea97b6d14d87d546bff619
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="项目配置" tabindex="-1"><a class="header-anchor" href="#项目配置" aria-hidden="true">#</a> 项目配置</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sonar.projectKey=project-name
sonar.projectName=project-name
sonar.language=java
sonar.java.binaries=$WORKSPACE/target/classes/
sonar.sources=$WORKSPACE/src
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function y(g,q){const e=o("router-link"),l=o("ExternalLinkIcon");return p(),c("div",null,[u(" more "),n("nav",k,[n("ul",null,[n("li",null,[a(e,{to:"#sonarqube-代码检查工具"},{default:t(()=>[s("sonarqube（代码检查工具）")]),_:1}),n("ul",null,[n("li",null,[a(e,{to:"#docker-运行"},{default:t(()=>[s("docker 运行")]),_:1})]),n("li",null,[a(e,{to:"#通过-maven-检测代码"},{default:t(()=>[s("通过 maven 检测代码")]),_:1})]),n("li",null,[a(e,{to:"#项目配置"},{default:t(()=>[s("项目配置")]),_:1})])])])])]),v,n("blockquote",null,[m,n("p",null,[s("官网地址："),n("a",b,[s("https://www.sonarqube.org/downloads/"),a(l)])]),n("p",null,[s("Jenkins 插件离线下载地址: "),n("a",h,[s("http://updates.jenkins-ci.org/download/plugins/"),a(l)])])]),_])}const w=i(d,[["render",y],["__file","10.代码检查工具.html.vue"]]);export{w as default};
