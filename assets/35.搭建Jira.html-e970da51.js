import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as r,c,e as d,a as n,d as s,w as e,f as o,b as i}from"./app-efa5e96e.js";const v={},m={class:"table-of-contents"},p=o(`<h2 id="centos7-安装" tabindex="-1"><a class="header-anchor" href="#centos7-安装" aria-hidden="true">#</a> CentOS7 安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">########################</span>
<span class="token comment">## 官网:  https://www.atlassian.com/software/jira/update</span>
<span class="token comment">## 源码: git clone --recurse-submodules https://github.com/aws-quickstart/quickstart-atlassian-jira.git</span>
<span class="token comment">########################</span>

<span class="token comment"># 下载文件</span>
<span class="token function">wget</span> https://www.atlassian.com/software/jira/downloads/binary/atlassian-jira-software-8.21.0-x64.bin
<span class="token comment"># 添加执行权限</span>
<span class="token function">chmod</span> <span class="token number">755</span> atlassian-jira-software-8.21.0-x64.bin
<span class="token comment"># 开始安装Jira</span>
./atlassian-jira-software-8.21.0-x64.bin
<span class="token comment"># 默认的安装目录</span>
ll /opt/atlassian/jira <span class="token operator">&amp;&amp;</span> ll /var/atlassian/application-data/jira
<span class="token comment"># 主要的配置文件</span>
ll /opt/atlassian/jira/conf/server.xml
<span class="token comment"># 修改jira内存参数</span>
ll /opt/atlassian/jira/bin/setenv.sh
<span class="token comment"># 日志查看</span>
<span class="token function">tail</span> <span class="token parameter variable">-f</span> /opt/atlassian/jira/logs/catalina.out
<span class="token comment"># 启动jira</span>
<span class="token builtin class-name">cd</span> /opt/atlassian/jira/bin <span class="token operator">&amp;&amp;</span> ./start-jira.sh

<span class="token comment"># 防火墙开放端口</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">8080</span>/tcp <span class="token parameter variable">--permanent</span> <span class="token operator">&amp;&amp;</span> firewall-cmd <span class="token parameter variable">--reload</span>

<span class="token comment">###### 链接MySQL</span>
<span class="token comment">## 官方文档：https://docs.atlassian.com/jira/jadm-docs-0821/Connecting+Jira+applications+to+a+Database#ConnectingJiraapplicationstoadatabase-UpgradingJiraormigratingJiratoanotherserver?</span>
<span class="token comment"># MySQL创建jira_db数据库</span>
mysql <span class="token parameter variable">-e</span> <span class="token string">&quot;CREATE DATABASE jiradb CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;&quot;</span>
<span class="token comment"># 创建jira用户，并赋予权限</span>
mysql <span class="token parameter variable">-e</span> <span class="token string">&quot;GRANT ALL ON jira_db.* TO &#39;jira&#39;@&#39;%&#39; IDENTIFIED BY &#39;123456@aA&#39;&quot;</span>
<span class="token comment"># 刷新权限</span>
mysql <span class="token parameter variable">-e</span> <span class="token string">&quot;FLUSH PRIVILEGES&quot;</span>
<span class="token comment"># wget https://repo1.maven.org/maven2/mysql/mysql-connector-java/5.1.49/mysql-connector-java-5.1.49.jar</span>
<span class="token function">cp</span> <span class="token parameter variable">-avf</span> mysql-connector-java-5.1.49.jar /opt/atlassian/jira/lib/
<span class="token comment">## 界面初始化选择‘我将设置它自己’</span>

<span class="token comment">###### 破解</span>
<span class="token comment"># 先将jira停止</span>
/etc/init.d/jira stop
<span class="token comment"># 拷贝破解jar到指定位置</span>
<span class="token function">cp</span> <span class="token parameter variable">-avf</span> atlassian-agent-1.3.1.jar /opt/atlassian/jira/atlassian-jira/WEB-INF/lib/
<span class="token function">cp</span> <span class="token parameter variable">-avf</span> atlassian-extras-3.1.2.jar /opt/atlassian/jira/atlassian-jira/WEB-INF/lib/
<span class="token comment"># 重启jira</span>
/etc/init.d/jira start
<span class="token function">lsof</span> <span class="token parameter variable">-i:8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-安装" tabindex="-1"><a class="header-anchor" href="#docker-安装" aria-hidden="true">#</a> docker 安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> docker-compose.yml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
version: &quot;3&quot;
services:
  jira:
    #*******************
    # docker exec -it jira java -jar /opt/atlassian/jira/atlassian-agent.jar -p jira -m nobody@163.com -n nobody -o devops.inet -s 页面上的服务器ID
    #*******************
    image: atlassian/jira-software:8.20
    container_name: jira
    restart: always
    ports:
      - &quot;8083:8080&quot;
    environment:
      TZ: &quot;Asia/Shanghai&quot;
      JAVA_OPTS: &quot;-javaagent:/opt/atlassian/jira/atlassian-agent.jar&quot;
      JVM_MINIMUM_MEMORY: &quot;4096m&quot;
      JVM_MAXIMUM_MEMORY: &quot;4096m&quot;
    volumes:
      - ./data/data:/var/atlassian/application-data/jira
      - ./data/patch/mysql-connector-java-5.1.42.jar:/opt/atlassian/jira/atlassian-jira/WEB-INF/lib/mysql-connector-java-5.1.42.jar
      - ./data/patch/atlassian-agent-1.3.1.jar:/opt/atlassian/jira/atlassian-agent.jar
    ulimits:
      nproc: 65535
      nofile:
        soft: 65535
        hard: 65535
    networks:
      - devops.inet
  mysql:
    image: mysql:5.7.36
    container_name: mysql
    restart: always
    environment:
      TZ: &quot;Asia/Shanghai&quot;
      MYSQL_ROOT_PASSWORD: B2drock@bj
      MYSQL_ROOT_HOST: &quot;%&quot;
      MYSQL_DATABASE: &quot;jira_db820&quot;
      MYSQL_USER: &quot;jira_user&quot;
      MYSQL_PASSWORD: &quot;B2drock@bj&quot;
    volumes:
      - /opt/jira/mysql/data:/var/lib/mysql
      - /opt/jira/mysql/conf/docker.cnf:/etc/mysql/conf.d/docker.cnf
    ulimits:
      nproc: 65535
      nofile:
        soft: 65535
        hard: 65535
    networks:
      - devops.inet
networks:
  devops.inet:
EOF</span>
<span class="token comment"># 启动</span>
<span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
<span class="token comment"># 停止</span>
<span class="token function">docker-compose</span> down
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function u(b,k){const a=t("router-link");return r(),c("div",null,[d(" more "),n("nav",m,[n("ul",null,[n("li",null,[s(a,{to:"#centos7-安装"},{default:e(()=>[i("CentOS7 安装")]),_:1})]),n("li",null,[s(a,{to:"#docker-安装"},{default:e(()=>[i("docker 安装")]),_:1})])])]),p])}const q=l(v,[["render",u],["__file","35.搭建Jira.html.vue"]]);export{q as default};
