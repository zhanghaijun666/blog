import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as i,c as u,e as k,a as n,d as s,w as t,b as a,f as l}from"./app-efa5e96e.js";const r={},d=n("blockquote",null,[n("p",null,"K8s + SpringBoot 实现零宕机发布：健康检查+滚动更新+优雅停机+弹性伸缩+Prometheus 监控+配置分离（镜像复用）")],-1),m={class:"table-of-contents"},v=l(`<h2 id="_1、健康检查" tabindex="-1"><a class="header-anchor" href="#_1、健康检查" aria-hidden="true">#</a> 1、健康检查</h2><blockquote><p>健康检查类型：就绪探针（readiness）+ 存活探针（liveness）</p><p>探针类型：exec（进入容器执行脚本）、tcpSocket（探测端口）、httpGet（调用接口）</p></blockquote><h3 id="业务层面" tabindex="-1"><a class="header-anchor" href="#业务层面" aria-hidden="true">#</a> 业务层面</h3><blockquote><p>项目依赖 pom.xml</p></blockquote><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义访问端口、路径及权限 application.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">server</span><span class="token punctuation">:</span>
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">50000</span> <span class="token comment">## 启用独立运维端口</span>
  <span class="token key atrule">endpoint</span><span class="token punctuation">:</span> <span class="token comment">## 开启health端点</span>
    <span class="token key atrule">health</span><span class="token punctuation">:</span>
      <span class="token key atrule">probes</span><span class="token punctuation">:</span>
        <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">base-path</span><span class="token punctuation">:</span> /actuator <span class="token comment">## 指定上下文路径，启用相应端点</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> health
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),b=n("p",null,"将暴露/actuator/health/readiness 和/actuator/health/liveness 两个接口，访问方式如下：",-1),y={href:"http://127.0.0.1:50000/actuator/health/readiness",target:"_blank",rel:"noopener noreferrer"},g={href:"http://127.0.0.1:50000/actuator/health/liveness",target:"_blank",rel:"noopener noreferrer"},h=l(`<h3 id="运维层面" tabindex="-1"><a class="header-anchor" href="#运维层面" aria-hidden="true">#</a> 运维层面</h3><blockquote><p>k8s 部署模版 deployment.yaml</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
          <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> IMAGE_URL <span class="token punctuation">}</span>
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> Always
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_PORT <span class="token punctuation">}</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> management<span class="token punctuation">-</span>port
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">50000</span> <span class="token comment"># 应用管理端口</span>
          <span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span> <span class="token comment"># 就绪探针</span>
            <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
              <span class="token key atrule">path</span><span class="token punctuation">:</span> /actuator/health/readiness
              <span class="token key atrule">port</span><span class="token punctuation">:</span> management<span class="token punctuation">-</span>port
            <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">30</span> <span class="token comment"># 延迟加载时间</span>
            <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">10</span> <span class="token comment"># 重试时间间隔</span>
            <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment"># 超时时间设置</span>
            <span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment"># 健康阈值</span>
            <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">6</span> <span class="token comment"># 不健康阈值</span>
          <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span> <span class="token comment"># 存活探针</span>
            <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
              <span class="token key atrule">path</span><span class="token punctuation">:</span> /actuator/health/liveness
              <span class="token key atrule">port</span><span class="token punctuation">:</span> management<span class="token punctuation">-</span>port
            <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">30</span> <span class="token comment"># 延迟加载时间</span>
            <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">10</span> <span class="token comment"># 重试时间间隔</span>
            <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment"># 超时时间设置</span>
            <span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment"># 健康阈值</span>
            <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">6</span> <span class="token comment"># 不健康阈值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、滚动更新" tabindex="-1"><a class="header-anchor" href="#_2、滚动更新" aria-hidden="true">#</a> 2、滚动更新</h2><blockquote><p>k8s 资源调度之滚动更新策略，若要实现零宕机发布，需支持健康检查</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> REPLICAS <span class="token punctuation">}</span> <span class="token comment"># Pod副本数</span>
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> RollingUpdate <span class="token comment"># 滚动更新策略</span>
    <span class="token key atrule">rollingUpdate</span><span class="token punctuation">:</span>
      <span class="token key atrule">maxSurge</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment"># 升级过程中最多可以比原先设置的副本数多出的数量</span>
      <span class="token key atrule">maxUnavailable</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment"># 升级过程中最多有多少个POD处于无法提供服务的状态</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、优雅停机" tabindex="-1"><a class="header-anchor" href="#_3、优雅停机" aria-hidden="true">#</a> 3、优雅停机</h2><blockquote><p>在 K8s 中，当我们实现滚动升级之前，务必要实现应用级别的优雅停机。否则滚动升级时，还是会影响到业务。使应用关闭线程、释放连接资源后再停止服务</p></blockquote><h3 id="业务层面-1" tabindex="-1"><a class="header-anchor" href="#业务层面-1" aria-hidden="true">#</a> 业务层面</h3><blockquote><p>项目依赖 pom.xml</p></blockquote><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>定义访问端口、路径及权限 application.yaml</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> &lt;xxx<span class="token punctuation">&gt;</span>
  <span class="token key atrule">profiles</span><span class="token punctuation">:</span>
    <span class="token key atrule">active</span><span class="token punctuation">:</span> @profileActive@
  <span class="token key atrule">lifecycle</span><span class="token punctuation">:</span>
    <span class="token key atrule">timeout-per-shutdown-phase</span><span class="token punctuation">:</span> 30s     <span class="token comment"># 停机过程超时时长设置30s，超过30s，直接停机</span>

<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span>
  <span class="token key atrule">shutdown</span><span class="token punctuation">:</span> graceful                    <span class="token comment"># 默认为IMMEDIATE，表示立即关机；GRACEFUL表示优雅关机</span>

<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">server</span><span class="token punctuation">:</span>
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">50000</span>                         <span class="token comment"># 启用独立运维端口</span>
  <span class="token key atrule">endpoint</span><span class="token punctuation">:</span>                             <span class="token comment"># 开启shutdown和health端点</span>
    <span class="token key atrule">shutdown</span><span class="token punctuation">:</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">health</span><span class="token punctuation">:</span>
      <span class="token key atrule">probes</span><span class="token punctuation">:</span>
        <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">base-path</span><span class="token punctuation">:</span> /actuator            <span class="token comment"># 指定上下文路径，启用相应端点</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> health<span class="token punctuation">,</span>shutdown
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>将暴露/actuator/shutdown 接口，调用方式如下：</p><p>curl -X POST 127.0.0.1:50000/actuator/shutdown</p></blockquote><h3 id="运维层面-1" tabindex="-1"><a class="header-anchor" href="#运维层面-1" aria-hidden="true">#</a> 运维层面</h3><blockquote><p>确保 dockerfile 模版集成 curl 工具，否则无法使用 curl 命令</p></blockquote><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> openjdk:8-jdk-alpine</span>
<span class="token comment">#构建参数</span>
<span class="token instruction"><span class="token keyword">ARG</span> JAR_FILE</span>
<span class="token instruction"><span class="token keyword">ARG</span> WORK_PATH=<span class="token string">&quot;/app&quot;</span></span>
<span class="token instruction"><span class="token keyword">ARG</span> EXPOSE_PORT=8080</span>

<span class="token comment">#环境变量</span>
<span class="token instruction"><span class="token keyword">ENV</span> JAVA_OPTS=<span class="token string">&quot;&quot;</span><span class="token operator">\\</span>
    JAR_FILE=<span class="token variable">\${JAR_FILE}</span></span>

<span class="token comment">#设置时区</span>
<span class="token instruction"><span class="token keyword">RUN</span> ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime &amp;&amp; echo <span class="token string">&#39;Asia/Shanghai&#39;</span> &gt;/etc/timezone</span>
<span class="token instruction"><span class="token keyword">RUN</span> sed -i <span class="token string">&#39;s/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g&#39;</span> /etc/apk/repositories  <span class="token operator">\\</span>
    &amp;&amp; apk add --no-cache curl</span>
<span class="token comment">#将maven目录的jar包拷贝到docker中，并命名为for_docker.jar</span>
<span class="token instruction"><span class="token keyword">COPY</span> target/<span class="token variable">$JAR_FILE</span> <span class="token variable">$WORK_PATH</span>/</span>


<span class="token comment">#设置工作目录</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> <span class="token variable">$WORK_PATH</span></span>


<span class="token comment"># 指定于外界交互的端口</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> <span class="token variable">$EXPOSE_PORT</span></span>
<span class="token comment"># 配置容器，使其可执行化</span>
<span class="token instruction"><span class="token keyword">ENTRYPOINT</span> exec java <span class="token variable">$JAVA_OPTS</span> -jar <span class="token variable">$JAR_FILE</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>k8s 部署模版 deployment.yaml</p><p>注：经验证，java 项目可省略结束回调钩子的配置</p><p>此外，若需使用回调钩子，需保证镜像中包含 curl 工具，且需注意应用管理端口（50000）不能暴露到公网</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
          <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> IMAGE_URL <span class="token punctuation">}</span>
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> Always
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_PORT <span class="token punctuation">}</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">50000</span>
          <span class="token key atrule">lifecycle</span><span class="token punctuation">:</span>
            <span class="token key atrule">preStop</span><span class="token punctuation">:</span> <span class="token comment"># 结束回调钩子</span>
              <span class="token key atrule">exec</span><span class="token punctuation">:</span>
                <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;curl&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-XPOST&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;127.0.0.1:50000/actuator/shutdown&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4、弹性伸缩" tabindex="-1"><a class="header-anchor" href="#_4、弹性伸缩" aria-hidden="true">#</a> 4、弹性伸缩</h2><blockquote><p>为 pod 设置资源限制后，创建 HPA</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
          <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> IMAGE_URL <span class="token punctuation">}</span>
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> Always
          <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token comment"># 容器资源管理</span>
            <span class="token key atrule">limits</span><span class="token punctuation">:</span> <span class="token comment"># 资源限制（监控使用情况）</span>
              <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token number">0.5</span>
              <span class="token key atrule">memory</span><span class="token punctuation">:</span> 1Gi
            <span class="token key atrule">requests</span><span class="token punctuation">:</span> <span class="token comment"># 最小可用资源（灵活调度）</span>
              <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token number">0.15</span>
              <span class="token key atrule">memory</span><span class="token punctuation">:</span> 300Mi
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> HorizontalPodAutoscaler <span class="token comment"># 弹性伸缩控制器</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> autoscaling/v2beta2
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">scaleTargetRef</span><span class="token punctuation">:</span>
    <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
    <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
  <span class="token key atrule">minReplicas</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> REPLICAS <span class="token punctuation">}</span> <span class="token comment"># 缩放范围</span>
  <span class="token key atrule">maxReplicas</span><span class="token punctuation">:</span> <span class="token number">6</span>
  <span class="token key atrule">metrics</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> Resource
      <span class="token key atrule">resource</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> cpu <span class="token comment"># 指定资源指标</span>
        <span class="token key atrule">target</span><span class="token punctuation">:</span>
          <span class="token key atrule">type</span><span class="token punctuation">:</span> Utilization
          <span class="token key atrule">averageUtilization</span><span class="token punctuation">:</span> <span class="token number">50</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5、prometheus-集成" tabindex="-1"><a class="header-anchor" href="#_5、prometheus-集成" aria-hidden="true">#</a> 5、Prometheus 集成</h2><h3 id="业务层面-2" tabindex="-1"><a class="header-anchor" href="#业务层面-2" aria-hidden="true">#</a> 业务层面</h3><blockquote><p>项目依赖 pom.xml</p></blockquote><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!-- 引入Spring boot的监控机制--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>io.micrometer<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>micrometer-registry-prometheus<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>定义访问端口、路径及权限 application.yaml</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">server</span><span class="token punctuation">:</span>
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">50000</span> <span class="token comment"># 启用独立运维端口</span>
  <span class="token key atrule">metrics</span><span class="token punctuation">:</span>
    <span class="token key atrule">tag</span><span class="token punctuation">:</span>
      <span class="token key atrule">application</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">base-path</span><span class="token punctuation">:</span> /actuator <span class="token comment"># 指定上下文路径，启用相应端点</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> metrics<span class="token punctuation">,</span>prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28),_=n("p",null,"将暴露/actuator/metric 和/actuator/prometheus 接口，访问方式如下：",-1),P={href:"http://127.0.0.1:50000/actuator/metric",target:"_blank",rel:"noopener noreferrer"},A={href:"http://127.0.0.1:50000/actuator/prometheus",target:"_blank",rel:"noopener noreferrer"},f=l(`<h3 id="运维层面-2" tabindex="-1"><a class="header-anchor" href="#运维层面-2" aria-hidden="true">#</a> 运维层面</h3><blockquote><p>deployment.yaml</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
        <span class="token key atrule">prometheus:io/port</span><span class="token punctuation">:</span> <span class="token string">&quot;50000&quot;</span>
        <span class="token key atrule">prometheus.io/path</span><span class="token punctuation">:</span> /actuator/prometheus <span class="token comment"># 在流水线中赋值</span>
        <span class="token key atrule">prometheus.io/scrape</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span> <span class="token comment"># 基于pod的服务发现</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6、配置分离" tabindex="-1"><a class="header-anchor" href="#_6、配置分离" aria-hidden="true">#</a> 6、配置分离</h2><blockquote><p>方案：通过 configmap 挂载外部配置文件，并指定激活环境运行</p><p>作用：配置分离，避免敏感信息泄露；镜像复用，提高交付效率</p></blockquote><p>通过文件生成 configmap</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 通过dry-run的方式生成yaml文件</span>
kubectl create cm <span class="token parameter variable">-n</span> <span class="token operator">&lt;</span>namespace<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>APP_NAME<span class="token operator">&gt;</span> --from-file<span class="token operator">=</span>application-test.yaml --dry-run<span class="token operator">=</span><span class="token number">1</span> <span class="token parameter variable">-oyaml</span> <span class="token operator">&gt;</span> configmap.yaml

<span class="token comment"># 更新</span>
kubectl apply <span class="token parameter variable">-f</span> configmap.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>挂载 configmap 并指定激活环境</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
          <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> IMAGE_URL <span class="token punctuation">}</span>
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> Always
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> SPRING_PROFILES_ACTIVE <span class="token comment"># 指定激活环境</span>
              <span class="token key atrule">value</span><span class="token punctuation">:</span> test
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span> <span class="token comment"># 挂载configmap</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> conf
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> <span class="token string">&quot;/app/config&quot;</span> <span class="token comment"># 与Dockerfile中工作目录一致</span>
              <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> conf
          <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="终极配置" tabindex="-1"><a class="header-anchor" href="#终极配置" aria-hidden="true">#</a> 终极配置</h2><h3 id="业务层面-3" tabindex="-1"><a class="header-anchor" href="#业务层面-3" aria-hidden="true">#</a> 业务层面</h3><blockquote><p>项目依赖 pom.xml</p></blockquote><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!-- 引入Spring boot的监控机制--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-actuator<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>io.micrometer<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>micrometer-registry-prometheus<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>定义访问端口、路径及权限 application.yaml</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> project<span class="token punctuation">-</span>sample
  <span class="token key atrule">profiles</span><span class="token punctuation">:</span>
    <span class="token key atrule">active</span><span class="token punctuation">:</span> @profileActive@
  <span class="token key atrule">lifecycle</span><span class="token punctuation">:</span>
    <span class="token key atrule">timeout-per-shutdown-phase</span><span class="token punctuation">:</span> 30s     <span class="token comment"># 停机过程超时时长设置30s，超过30s，直接停机</span>

<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span>
  <span class="token key atrule">shutdown</span><span class="token punctuation">:</span> graceful                    <span class="token comment"># 默认为IMMEDIATE，表示立即关机；GRACEFUL表示优雅关机</span>

<span class="token key atrule">management</span><span class="token punctuation">:</span>
  <span class="token key atrule">server</span><span class="token punctuation">:</span>
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">50000</span>                         <span class="token comment"># 启用独立运维端口</span>
  <span class="token key atrule">metrics</span><span class="token punctuation">:</span>
    <span class="token key atrule">tag</span><span class="token punctuation">:</span>
      <span class="token key atrule">application</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span>
  <span class="token key atrule">endpoint</span><span class="token punctuation">:</span>                             <span class="token comment"># 开启shutdown和health端点</span>
    <span class="token key atrule">shutdown</span><span class="token punctuation">:</span>
      <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">health</span><span class="token punctuation">:</span>
      <span class="token key atrule">probes</span><span class="token punctuation">:</span>
        <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
    <span class="token key atrule">web</span><span class="token punctuation">:</span>
      <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
        <span class="token key atrule">base-path</span><span class="token punctuation">:</span> /actuator            <span class="token comment"># 指定上下文路径，启用相应端点</span>
        <span class="token key atrule">include</span><span class="token punctuation">:</span> health<span class="token punctuation">,</span>shutdown<span class="token punctuation">,</span>metrics<span class="token punctuation">,</span>prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="运维层面-3" tabindex="-1"><a class="header-anchor" href="#运维层面-3" aria-hidden="true">#</a> 运维层面</h3><blockquote><p>确保 dockerfile 模版集成 curl 工具，否则无法使用 curl 命令</p></blockquote><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> openjdk:8-jdk-alpine</span>
<span class="token comment">#构建参数</span>
<span class="token instruction"><span class="token keyword">ARG</span> JAR_FILE</span>
<span class="token instruction"><span class="token keyword">ARG</span> WORK_PATH=<span class="token string">&quot;/app&quot;</span></span>
<span class="token instruction"><span class="token keyword">ARG</span> EXPOSE_PORT=8080</span>

<span class="token comment">#环境变量</span>
<span class="token instruction"><span class="token keyword">ENV</span> JAVA_OPTS=<span class="token string">&quot;&quot;</span><span class="token operator">\\</span>
    JAR_FILE=<span class="token variable">\${JAR_FILE}</span></span>

<span class="token comment">#设置时区</span>
<span class="token instruction"><span class="token keyword">RUN</span> ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime &amp;&amp; echo <span class="token string">&#39;Asia/Shanghai&#39;</span> &gt;/etc/timezone</span>
<span class="token instruction"><span class="token keyword">RUN</span> sed -i <span class="token string">&#39;s/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g&#39;</span> /etc/apk/repositories  <span class="token operator">\\</span>
    &amp;&amp; apk add --no-cache curl</span>
<span class="token comment">#将maven目录的jar包拷贝到docker中，并命名为for_docker.jar</span>
<span class="token instruction"><span class="token keyword">COPY</span> target/<span class="token variable">$JAR_FILE</span> <span class="token variable">$WORK_PATH</span>/</span>


<span class="token comment">#设置工作目录</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> <span class="token variable">$WORK_PATH</span></span>


<span class="token comment"># 指定于外界交互的端口</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> <span class="token variable">$EXPOSE_PORT</span></span>
<span class="token comment"># 配置容器，使其可执行化</span>
<span class="token instruction"><span class="token keyword">ENTRYPOINT</span> exec java <span class="token variable">$JAVA_OPTS</span> -jar <span class="token variable">$JAR_FILE</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>k8s 部署模版 deployment.yaml</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> REPLICAS <span class="token punctuation">}</span> <span class="token comment"># Pod副本数</span>
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> RollingUpdate <span class="token comment"># 滚动更新策略</span>
    <span class="token key atrule">rollingUpdate</span><span class="token punctuation">:</span>
      <span class="token key atrule">maxSurge</span><span class="token punctuation">:</span> <span class="token number">1</span>
      <span class="token key atrule">maxUnavailable</span><span class="token punctuation">:</span> <span class="token number">0</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
      <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
        <span class="token key atrule">timestamp</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> TIMESTAMP <span class="token punctuation">}</span>
        <span class="token key atrule">prometheus.io/port</span><span class="token punctuation">:</span> <span class="token string">&quot;50000&quot;</span> <span class="token comment"># 不能动态赋值</span>
        <span class="token key atrule">prometheus.io/path</span><span class="token punctuation">:</span> /actuator/prometheus
        <span class="token key atrule">prometheus.io/scrape</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span> <span class="token comment"># 基于pod的服务发现</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">affinity</span><span class="token punctuation">:</span> <span class="token comment"># 设置调度策略，采取多主机/多可用区部署</span>
        <span class="token key atrule">podAntiAffinity</span><span class="token punctuation">:</span>
          <span class="token key atrule">preferredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">100</span>
              <span class="token key atrule">podAffinityTerm</span><span class="token punctuation">:</span>
                <span class="token key atrule">labelSelector</span><span class="token punctuation">:</span>
                  <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> app
                      <span class="token key atrule">operator</span><span class="token punctuation">:</span> In
                      <span class="token key atrule">values</span><span class="token punctuation">:</span>
                        <span class="token punctuation">-</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
                <span class="token key atrule">topologyKey</span><span class="token punctuation">:</span> <span class="token string">&quot;kubernetes.io/hostname&quot;</span> <span class="token comment"># 多可用区为&quot;topology.kubernetes.io/zone&quot;</span>
      <span class="token key atrule">terminationGracePeriodSeconds</span><span class="token punctuation">:</span> <span class="token number">30</span> <span class="token comment"># 优雅终止宽限期</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
          <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> IMAGE_URL <span class="token punctuation">}</span>
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> Always
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_PORT <span class="token punctuation">}</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> management<span class="token punctuation">-</span>port
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">50000</span> <span class="token comment"># 应用管理端口</span>
          <span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span> <span class="token comment"># 就绪探针</span>
            <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
              <span class="token key atrule">path</span><span class="token punctuation">:</span> /actuator/health/readiness
              <span class="token key atrule">port</span><span class="token punctuation">:</span> management<span class="token punctuation">-</span>port
            <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">30</span> <span class="token comment"># 延迟加载时间</span>
            <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">10</span> <span class="token comment"># 重试时间间隔</span>
            <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment"># 超时时间设置</span>
            <span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment"># 健康阈值</span>
            <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">9</span> <span class="token comment"># 不健康阈值</span>
          <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span> <span class="token comment"># 存活探针</span>
            <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
              <span class="token key atrule">path</span><span class="token punctuation">:</span> /actuator/health/liveness
              <span class="token key atrule">port</span><span class="token punctuation">:</span> management<span class="token punctuation">-</span>port
            <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">30</span> <span class="token comment"># 延迟加载时间</span>
            <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">10</span> <span class="token comment"># 重试时间间隔</span>
            <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment"># 超时时间设置</span>
            <span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment"># 健康阈值</span>
            <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">6</span> <span class="token comment"># 不健康阈值</span>
          <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token comment"># 容器资源管理</span>
            <span class="token key atrule">limits</span><span class="token punctuation">:</span> <span class="token comment"># 资源限制（监控使用情况）</span>
              <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token number">0.5</span>
              <span class="token key atrule">memory</span><span class="token punctuation">:</span> 1Gi
            <span class="token key atrule">requests</span><span class="token punctuation">:</span> <span class="token comment"># 最小可用资源（灵活调度）</span>
              <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token number">0.1</span>
              <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> TZ
              <span class="token key atrule">value</span><span class="token punctuation">:</span> Asia/Shanghai
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> HorizontalPodAutoscaler <span class="token comment"># 弹性伸缩控制器</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> autoscaling/v2beta2
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">scaleTargetRef</span><span class="token punctuation">:</span>
    <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
    <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> APP_NAME <span class="token punctuation">}</span>
  <span class="token key atrule">minReplicas</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> REPLICAS <span class="token punctuation">}</span> <span class="token comment"># 缩放范围</span>
  <span class="token key atrule">maxReplicas</span><span class="token punctuation">:</span> <span class="token number">6</span>
  <span class="token key atrule">metrics</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> Resource
      <span class="token key atrule">resource</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> cpu <span class="token comment"># 指定资源指标</span>
        <span class="token key atrule">target</span><span class="token punctuation">:</span>
          <span class="token key atrule">type</span><span class="token punctuation">:</span> Utilization
          <span class="token key atrule">averageUtilization</span><span class="token punctuation">:</span> <span class="token number">50</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20);function x(q,E){const e=c("router-link"),p=c("ExternalLinkIcon");return i(),u("div",null,[d,k(" more "),n("nav",m,[n("ul",null,[n("li",null,[s(e,{to:"#_1、健康检查"},{default:t(()=>[a("1、健康检查")]),_:1}),n("ul",null,[n("li",null,[s(e,{to:"#业务层面"},{default:t(()=>[a("业务层面")]),_:1})]),n("li",null,[s(e,{to:"#运维层面"},{default:t(()=>[a("运维层面")]),_:1})])])]),n("li",null,[s(e,{to:"#_2、滚动更新"},{default:t(()=>[a("2、滚动更新")]),_:1})]),n("li",null,[s(e,{to:"#_3、优雅停机"},{default:t(()=>[a("3、优雅停机")]),_:1}),n("ul",null,[n("li",null,[s(e,{to:"#业务层面-1"},{default:t(()=>[a("业务层面")]),_:1})]),n("li",null,[s(e,{to:"#运维层面-1"},{default:t(()=>[a("运维层面")]),_:1})])])]),n("li",null,[s(e,{to:"#_4、弹性伸缩"},{default:t(()=>[a("4、弹性伸缩")]),_:1})]),n("li",null,[s(e,{to:"#_5、prometheus-集成"},{default:t(()=>[a("5、Prometheus 集成")]),_:1}),n("ul",null,[n("li",null,[s(e,{to:"#业务层面-2"},{default:t(()=>[a("业务层面")]),_:1})]),n("li",null,[s(e,{to:"#运维层面-2"},{default:t(()=>[a("运维层面")]),_:1})])])]),n("li",null,[s(e,{to:"#_6、配置分离"},{default:t(()=>[a("6、配置分离")]),_:1})]),n("li",null,[s(e,{to:"#终极配置"},{default:t(()=>[a("终极配置")]),_:1}),n("ul",null,[n("li",null,[s(e,{to:"#业务层面-3"},{default:t(()=>[a("业务层面")]),_:1})]),n("li",null,[s(e,{to:"#运维层面-3"},{default:t(()=>[a("运维层面")]),_:1})])])])])]),v,n("blockquote",null,[b,n("p",null,[n("a",y,[a("http://127.0.0.1:50000/actuator/health/readiness"),s(p)])]),n("p",null,[n("a",g,[a("http://127.0.0.1:50000/actuator/health/liveness"),s(p)])])]),h,n("blockquote",null,[_,n("p",null,[n("a",P,[a("http://127.0.0.1:50000/actuator/metric"),s(p)])]),n("p",null,[n("a",A,[a("http://127.0.0.1:50000/actuator/prometheus"),s(p)])])]),f])}const w=o(r,[["render",x],["__file","10.SpringBoot零宕机发布.html.vue"]]);export{w as default};
