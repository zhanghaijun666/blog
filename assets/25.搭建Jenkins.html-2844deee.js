import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o,c,e as p,a as n,d as a,w as e,f as r,b as i}from"./app-efa5e96e.js";const d={},m=n("p",null,"Jenkins 是一个广泛用于持续构建的可视化 web 工具，可用于自动化与构建、测试、交付或部署软件相关的各种任务。",-1),k={class:"table-of-contents"},v=r(`<h2 id="centos7-安装-jenkins" tabindex="-1"><a class="header-anchor" href="#centos7-安装-jenkins" aria-hidden="true">#</a> CentOS7 安装 jenkins</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">########################</span>
<span class="token comment">## 官网地址：https://pkg.jenkins.io/redhat-stable/</span>
<span class="token comment">## 下载地址：https://pkg.jenkins.io/</span>
<span class="token comment">## Jenkins插件下载位置：http://updates.jenkins-ci.org/download/plugins/</span>
<span class="token comment">########################</span>

<span class="token comment">###### yum安装 ######</span>
<span class="token comment"># https://pkg.jenkins.io/redhat-stable/</span>
<span class="token function">sudo</span> <span class="token function">wget</span> <span class="token parameter variable">-O</span> /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
<span class="token function">sudo</span> <span class="token function">rpm</span> <span class="token parameter variable">--import</span> https://pkg.jenkins.io/redhat-stable/jenkins.io.key
yum <span class="token function">install</span> epel-release <span class="token function">git</span> graphviz upgrade
<span class="token comment"># 如果已经安装jdk可忽略 java -version</span>
yum <span class="token function">install</span> java-11-openjdk-devel
yum <span class="token function">install</span> jenkins

<span class="token comment">###### RPM安装 ######</span>
<span class="token comment"># 各个版本地址 https://pkg.jenkins.io/</span>
<span class="token comment"># 清华镜像站（推荐）：https://mirrors.tuna.tsinghua.edu.cn/jenkins/</span>
<span class="token comment"># 查询以前是否安装jenkins</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> jenkins
<span class="token comment"># 卸载 jenkins</span>
<span class="token function">rpm</span> <span class="token parameter variable">-e</span> jenkins
<span class="token comment"># 彻底删除jenkins残留文件</span>
<span class="token function">find</span> / <span class="token parameter variable">-iname</span> jenkins <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token parameter variable">-n</span> <span class="token number">1000</span> <span class="token function">rm</span> <span class="token parameter variable">-rf</span>
<span class="token comment"># 必须提前安装JDK</span>
<span class="token function">java</span> <span class="token parameter variable">-version</span>
<span class="token comment"># 下载rpm安装包</span>
<span class="token function">wget</span> https://pkg.jenkins.io/redhat/jenkins-2.156-1.1.noarch.rpm
<span class="token comment"># 安装Jenkins</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> jenkins-2.156-1.1.noarch.rpm
<span class="token comment"># 安装Jenkins完成之后，Jenkins安装后的目录有</span>
<span class="token function">find</span> / <span class="token parameter variable">-iname</span> jenkins
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="初始化配置" tabindex="-1"><a class="header-anchor" href="#初始化配置" aria-hidden="true">#</a> 初始化配置</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 修改jenkins的端口</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/JENKINS_PORT=.*/JENKINS_PORT=&quot;8080&quot;/g&#39;</span> /etc/sysconfig/jenkins
<span class="token comment"># 配置jdk路径</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/JENKINS_JAVA_CMD=.*/JENKINS_JAVA_CMD=&quot;\\/usr\\/local\\/lib\\/jdk-11.0.12\\/bin\\/java&quot;/g&#39;</span> /etc/sysconfig/jenkins
<span class="token comment"># 为了不因为权限出现各种问题，这里直接使用root</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/JENKINS_USER=.*/JENKINS_USER=&quot;root&quot;/g&#39;</span> /etc/sysconfig/jenkins
<span class="token function">chown</span> <span class="token parameter variable">-R</span> root:root /var/lib/jenkins
<span class="token function">chown</span> <span class="token parameter variable">-R</span> root:root /var/cache/jenkins
<span class="token function">chown</span> <span class="token parameter variable">-R</span> root:root /var/log/jenkins
<span class="token comment"># 设置开机自启，并启动Jenkins</span>
systemctl daemon-reload <span class="token operator">&amp;&amp;</span> systemctl <span class="token builtin class-name">enable</span> jenkins <span class="token operator">&amp;&amp;</span> systemctl start jenkins <span class="token operator">&amp;&amp;</span> systemctl status jenkins
<span class="token comment"># 防火墙开放访问端口</span>
firewall-cmd <span class="token parameter variable">--permanent</span> <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">8080</span>/tcp
firewall-cmd <span class="token parameter variable">--reload</span>
<span class="token comment"># admin初始密码</span>
<span class="token function">cat</span> /var/lib/jenkins/secrets/initialAdminPassword
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function u(b,h){const s=l("router-link");return o(),c("div",null,[m,p(" more "),n("nav",k,[n("ul",null,[n("li",null,[a(s,{to:"#centos7-安装-jenkins"},{default:e(()=>[i("CentOS7 安装 jenkins")]),_:1})]),n("li",null,[a(s,{to:"#初始化配置"},{default:e(()=>[i("初始化配置")]),_:1})])])]),v])}const g=t(d,[["render",u],["__file","25.搭建Jenkins.html.vue"]]);export{g as default};
