import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as c,c as p,a as n,d as a,w as e,f as o,b as t}from"./app-efa5e96e.js";const r={},u={class:"table-of-contents"},d=o(`<h2 id="实战" tabindex="-1"><a class="header-anchor" href="#实战" aria-hidden="true">#</a> 实战</h2><h3 id="_1、初始化节点" tabindex="-1"><a class="header-anchor" href="#_1、初始化节点" aria-hidden="true">#</a> 1、初始化节点</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 防火墙设置</span>
firewall-cmd <span class="token parameter variable">--permanent</span> --add-rich-rule<span class="token operator">=</span><span class="token string">&quot;rule family=&quot;</span>ipv4<span class="token string">&quot; source address=&quot;</span><span class="token number">192.168</span>.60.0/16<span class="token string">&quot; accept&quot;</span>
firewall-cmd <span class="token parameter variable">--reload</span>

<span class="token comment">## host设置</span>
hostnamectl set-hostname swarm01        <span class="token comment">## 192.168.60.101</span>
hostnamectl set-hostname swarm02        <span class="token comment">## 192.168.60.102</span>
hostnamectl set-hostname swarm03        <span class="token comment">## 192.168.60.103</span>

<span class="token comment">## 检查是否开启Swarm模式</span>
<span class="token function">docker</span> info <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;Swarm: active&#39;</span>
<span class="token comment">## 初始化manager节点</span>
<span class="token function">docker</span> swarm init
<span class="token function">docker</span> swarm init --advertise-addr <span class="token number">192.168</span>.60.101
<span class="token function">docker</span> swarm join-token manager
<span class="token comment">## 下线节点，使之不参与任务分派</span>
<span class="token function">docker</span> <span class="token function">node</span> update <span class="token parameter variable">--availability</span> drain swarm02
<span class="token comment">## 上线节点，使之参与任务分派</span>
<span class="token function">docker</span> <span class="token function">node</span> update <span class="token parameter variable">--availability</span> active swarm02
<span class="token comment">## 节点离开集群</span>
<span class="token function">docker</span> swarm leave

<span class="token comment">## 创建网络</span>
<span class="token function">docker</span> network create <span class="token parameter variable">--attachable</span> <span class="token parameter variable">--driver</span> overlay <span class="token parameter variable">--subnet</span><span class="token operator">=</span><span class="token number">172.66</span>.0.0/16 <span class="token parameter variable">--gateway</span><span class="token operator">=</span><span class="token number">172.66</span>.0.1 <span class="token operator">&lt;</span>NETWORK_NAME<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、部署nginx" tabindex="-1"><a class="header-anchor" href="#_2、部署nginx" aria-hidden="true">#</a> 2、部署nginx</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 创建服务</span>
<span class="token function">docker</span> <span class="token function">service</span> create <span class="token parameter variable">--name</span> first_nginx <span class="token parameter variable">--replicas</span> <span class="token number">2</span> <span class="token parameter variable">--publish</span> <span class="token number">80</span>:80 nginx     <span class="token comment"># 创建nginx服务</span>

<span class="token comment">## 查看服务</span>
<span class="token function">docker</span> <span class="token function">service</span> <span class="token function">ls</span>
<span class="token function">docker</span> <span class="token function">service</span> <span class="token function">ps</span> first_nginx
<span class="token comment">## 查看服务详情</span>
<span class="token function">docker</span> <span class="token function">service</span> inspect first_nginx

<span class="token comment">## 弹性扩缩容</span>
<span class="token function">docker</span> <span class="token function">service</span> scale <span class="token assign-left variable">first_nginx</span><span class="token operator">=</span><span class="token number">5</span>
<span class="token function">docker</span> <span class="token function">service</span> update <span class="token parameter variable">--replicas</span> <span class="token number">5</span> first_nginx
<span class="token comment">## 滚动更新</span>
<span class="token function">docker</span> <span class="token function">service</span> update <span class="token parameter variable">--image</span> nginx:2.0 --update-parallelism <span class="token number">2</span> --update-delay 20s my_nginx

<span class="token comment">## 删除服务</span>
<span class="token function">docker</span> <span class="token function">service</span> <span class="token function">rm</span> first_nginx
<span class="token function">docker</span> <span class="token function">service</span> <span class="token function">ls</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、部署redis" tabindex="-1"><a class="header-anchor" href="#_3、部署redis" aria-hidden="true">#</a> 3、部署redis</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 创建 5 个副本，每次更新 2 个，更新间隔 10s，20% 任务失败继续执行，超出 20% 执行回滚，每次回滚 2 个</span>
<span class="token function">docker</span> <span class="token function">service</span> create <span class="token parameter variable">--replicas</span> <span class="token number">5</span> <span class="token parameter variable">--name</span> redis <span class="token punctuation">\\</span>
--update-delay 10s <span class="token punctuation">\\</span>
--update-parallelism <span class="token number">2</span> <span class="token punctuation">\\</span>
--update-failure-action <span class="token builtin class-name">continue</span> <span class="token punctuation">\\</span>
--rollback-monitor 20s <span class="token punctuation">\\</span>
--rollback-parallelism <span class="token number">2</span> <span class="token punctuation">\\</span>
--rollback-max-failure-ratio <span class="token number">0.2</span> <span class="token punctuation">\\</span>
redis:5
<span class="token comment">#### 参数说明</span>
<span class="token comment"># --update-delay：定义滚动更新的时间间隔；</span>
<span class="token comment"># --update-parallelism：定义并行更新的副本数量，默认为 1；</span>
<span class="token comment"># --update-failure-action：定义容器启动失败之后所执行的动作；</span>
<span class="token comment"># --rollback-monitor：定义回滚的监控时间；</span>
<span class="token comment"># --rollback-parallelism：定义并行回滚的副本数量；</span>
<span class="token comment"># --rollback-max-failure-ratio：任务失败回滚比率，超过该比率执行回滚操作，0.2 表示 20%。</span>

<span class="token comment">## 实现服务的滚动更新</span>
<span class="token function">docker</span> <span class="token function">service</span> update <span class="token parameter variable">--image</span> redis:6 redis
<span class="token comment">## 回滚服务，只能回滚到上一次操作的状态，并不能连续回滚到指定操作</span>
<span class="token function">docker</span> <span class="token function">service</span> update <span class="token parameter variable">--rollback</span> redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、stack" tabindex="-1"><a class="header-anchor" href="#_4、stack" aria-hidden="true">#</a> 4、Stack</h3><blockquote><p>任务编排文件 cat nginx.yaml</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3.9&quot;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">web</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.13<span class="token punctuation">-</span>alpine
    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> <span class="token string">&quot;ngin-node-{{ .Task.Slot }}&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> TZ=Asia/Shanghai
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;80-88:80-88&quot;</span>
  <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> overlay
  <span class="token key atrule">deploy</span><span class="token punctuation">:</span>
    <span class="token key atrule">mode</span><span class="token punctuation">:</span> replicated
    <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">7</span>
    <span class="token key atrule">restart_policy</span><span class="token punctuation">:</span>                     <span class="token comment">## 重启设置</span>
      <span class="token key atrule">condition</span><span class="token punctuation">:</span> on<span class="token punctuation">-</span>failure             <span class="token comment">## 在运行失败的时候</span>
      <span class="token key atrule">delay</span><span class="token punctuation">:</span> 10s                        <span class="token comment">## 发生错误多长时间执行重启</span>
      <span class="token key atrule">max_attempts</span><span class="token punctuation">:</span> <span class="token number">3</span>                   <span class="token comment">## 在放弃之前尝试重新启动容器的次数(默认值: 永远不要放弃)</span>
      <span class="token key atrule">window</span><span class="token punctuation">:</span> 120s                      <span class="token comment">## 设置重启的超时时间</span>
    <span class="token key atrule">update_config</span><span class="token punctuation">:</span>
      <span class="token key atrule">parallelism</span><span class="token punctuation">:</span> <span class="token number">2</span>                    <span class="token comment">## 每次更新容器数量</span>
      <span class="token key atrule">delay</span><span class="token punctuation">:</span> 10s                        <span class="token comment">## 更新一组容器之间的等待时间</span>
      <span class="token key atrule">failure_action</span><span class="token punctuation">:</span> pause             <span class="token comment">## 如果更新失败了怎么办，选择 continue、 rollback 或 pause (默认值: pause)</span>
      <span class="token key atrule">monitor</span><span class="token punctuation">:</span> 500ms                    <span class="token comment">## 每个容器更新后，持续观察是否失败了的时间</span>
      <span class="token key atrule">max_failure_ratio</span><span class="token punctuation">:</span> <span class="token number">0.5</span>            <span class="token comment">## 在更新过程中可以容忍的故障率</span>
    <span class="token key atrule">rollback_config</span><span class="token punctuation">:</span>
      <span class="token key atrule">parallelism</span><span class="token punctuation">:</span> <span class="token number">1</span>                    <span class="token comment">## 每次回滚的容器数量。如果设置为0，所有容器同时回滚。</span>
      <span class="token key atrule">delay</span><span class="token punctuation">:</span> 0s                         <span class="token comment">## 每个容器组回滚之间的等待时间(默认值为0)</span>
      <span class="token key atrule">monitor</span><span class="token punctuation">:</span> 500ms                    <span class="token comment">## 每次任务更新后监视故障后的持续时间</span>
    <span class="token key atrule">healthcheck</span><span class="token punctuation">:</span>
      <span class="token key atrule">test</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;CMD&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;wget&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-qO&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;http://localhost&quot;</span><span class="token punctuation">]</span> <span class="token comment">## 定义检测的命令 </span>
      <span class="token key atrule">interval</span><span class="token punctuation">:</span> 2s                      <span class="token comment">## 命令执行间隔，默认30秒</span>
      <span class="token key atrule">timeout</span><span class="token punctuation">:</span> 2s                       <span class="token comment">## 命令超时时间，默认30秒</span>
      <span class="token key atrule">retries</span><span class="token punctuation">:</span> <span class="token number">3</span>                        <span class="token comment">## 命令失败重试次数</span>
      <span class="token key atrule">start_period</span><span class="token punctuation">:</span> 2s                  <span class="token comment">## 启动延时，即容器启动后多久开始执行检测</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span>                          <span class="token comment">## 资源限制</span>
        <span class="token key atrule">limits</span><span class="token punctuation">:</span>
          <span class="token comment"># cpus: &#39;0.001&#39;</span>
          <span class="token key atrule">memory</span><span class="token punctuation">:</span> 1024M
        <span class="token key atrule">reservations</span><span class="token punctuation">:</span>
          <span class="token comment"># cpus: &#39;0.001&#39;</span>
          <span class="token key atrule">memory</span><span class="token punctuation">:</span> 64M
<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">overlay</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>执行任务</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> stack deploy <span class="token parameter variable">-c</span> nginx.yml my_nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,12);function k(m,v){const s=i("router-link");return c(),p("div",null,[n("nav",u,[n("ul",null,[n("li",null,[a(s,{to:"#实战"},{default:e(()=>[t("实战")]),_:1}),n("ul",null,[n("li",null,[a(s,{to:"#_1、初始化节点"},{default:e(()=>[t("1、初始化节点")]),_:1})]),n("li",null,[a(s,{to:"#_2、部署nginx"},{default:e(()=>[t("2、部署nginx")]),_:1})]),n("li",null,[a(s,{to:"#_3、部署redis"},{default:e(()=>[t("3、部署redis")]),_:1})]),n("li",null,[a(s,{to:"#_4、stack"},{default:e(()=>[t("4、Stack")]),_:1})])])])])]),d])}const h=l(r,[["render",k],["__file","41.DockerSwarm实战.html.vue"]]);export{h as default};
