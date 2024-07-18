import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o,c,e as b,a as e,d as a,w as l,b as n,f as r}from"./app-efa5e96e.js";const p={},m={class:"table-of-contents"},u=e("h2",{id:"文档地址",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#文档地址","aria-hidden":"true"},"#"),n(" 文档地址")],-1),v={href:"https://kubernetes.io/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://kubernetes.io/zh/docs/concepts/workloads/controllers/",target:"_blank",rel:"noopener noreferrer"},k={href:"http://docs.kubernetes.org.cn/230.html",target:"_blank",rel:"noopener noreferrer"},g=r(`<h2 id="deployment" tabindex="-1"><a class="header-anchor" href="#deployment" aria-hidden="true">#</a> Deployment</h2><blockquote><p>一个 Deployment 为 Pods 和 ReplicaSets 提供声明式的更新能力。</p><details class="hint-container details"><summary>nginx-deployment.yaml</summary></details></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: <span class="token number">3</span>
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> https://k8s.io/examples/controllers/nginx-deployment.yaml
<span class="token comment"># 查看 Deployment 上线状态</span>
kubectl rollout status deployment/nginx-deployment
kubectl get deployments
kubectl get rs
kubectl get pods --show-labels

<span class="token comment"># 更新 Deployment</span>
kubectl <span class="token builtin class-name">set</span> image deployment/nginx-deployment <span class="token assign-left variable">nginx</span><span class="token operator">=</span>nginx:1.16.1 <span class="token parameter variable">--record</span>
kubectl describe deployments

<span class="token comment"># 检查 Deployment 修订历史：</span>
kubectl rollout <span class="token function">history</span> deployment.v1.apps/nginx-deployment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="replicaset" tabindex="-1"><a class="header-anchor" href="#replicaset" aria-hidden="true">#</a> Replicaset</h2><p>确保容器应用的副本数始终保持在用户定义的副本数,即如果有容器异常退出,会自动创建新的 Pod 来替代;而如果异常多出来的容器也会自动回收;</p><details class="hint-container details"><summary>replicaset.yaml</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: extensions/v1beta1
kind: ReplicaSet
metadata:
  name: frontend
spec:
  replicas: <span class="token number">3</span>
  selector:
    matchLabels:
      tier: frontend
  template:
    metadata:
      labels:
        tier: frontend
    spec:
      containers:
        - name: Java-nginx
          image: hub.kaikeba.com/library/myapp:v1
          env:
            - name: GET_HOSTS_FROM
              value: dns
          ports:
            - containerPort: <span class="token number">80</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="daemonset" tabindex="-1"><a class="header-anchor" href="#daemonset" aria-hidden="true">#</a> DaemonSet</h2><p>确保只运行一个副本，运行在集群中每一个节点上。（也可以部分节点上只运行一个且只有一个 pod 副本，如监控 ssd 硬盘）</p><details class="hint-container details"><summary>my-deamon.yaml</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: my-deamon
  namespace: default
  labels:
    app: daemonset
spec:
  selector:
    matchLabels:
      app: my-daemonset
  template:
    metadata:
      labels:
        app: my-daemonset
    spec:
      containers:
      - name: daemon-app
        image: hub.kaikeba.com/library/myapp:v1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="job" tabindex="-1"><a class="header-anchor" href="#job" aria-hidden="true">#</a> Job</h2><p><code>Job</code>负责处理任务，即仅执行一次的任务，它保证批处理任务的一个或多个<code>Pod</code>成功结束。而<code>CronJob</code>则就是在<code>Job</code>上加上了时间调度。</p><details class="hint-container details"><summary>job-demo.yaml</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 我们用Job这个资源对象来创建一个任务，我们定一个Job来执行一个倒计时的任务，定义YAML文件：</span>
apiVersion: batch/v1
kind: Job
metadata:
  name: job-demo
spec:
  template:
    metadata:
      name: job-demo
    spec:
      restartPolicy: Never
      containers:
      - name: counter
        image: busybox
        command:
        - <span class="token string">&quot;bin/sh&quot;</span>
        - <span class="token string">&quot;-c&quot;</span>
        - <span class="token string">&quot;for i in 9 8 7 6 5 4 3 2 1; do echo <span class="token variable">$i</span>; done&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建</span>
kubectl apply <span class="token parameter variable">-f</span> job-demo.yaml
<span class="token comment"># 查询日志</span>
kubectl logs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="cronjob" tabindex="-1"><a class="header-anchor" href="#cronjob" aria-hidden="true">#</a> cronJob</h2><p><code>CronJob</code>其实就是在<code>Job</code>的基础上加上了时间调度，我们可以：在给定的时间点运行一个任务，也可以周期性地在给定时间点运行。这个实际上和我们<code>Linux</code>中的<code>crontab</code>就非常类似了。</p><details class="hint-container details"><summary>cronjob-demo.yaml</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 现在，我们用CronJob来管理我们上面的Job任务</span>
apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: cronjob-demo
spec:
  schedule: <span class="token string">&quot;*/1 * * * *&quot;</span>
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
          - name: hello
            image: busybox
            args:
            - <span class="token string">&quot;bin/sh&quot;</span>
            - <span class="token string">&quot;-c&quot;</span>
            - <span class="token string">&quot;for i in 9 8 7 6 5 4 3 2 1; do echo <span class="token variable">$i</span>; done&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建cronjob</span>
kubctl apply <span class="token parameter variable">-f</span> cronjob-demo.yaml
<span class="token comment"># 查询cronjob</span>
kubectl get cronjob
<span class="token comment"># 查询jon ,cronjon会循环多个job</span>
kubectl get job
<span class="token comment"># 实时监控查询job</span>
kubectl get job <span class="token parameter variable">-w</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="kubernetes-集群" tabindex="-1"><a class="header-anchor" href="#kubernetes-集群" aria-hidden="true">#</a> kubernetes 集群</h2><h4 id="master-节点" tabindex="-1"><a class="header-anchor" href="#master-节点" aria-hidden="true">#</a> master 节点</h4><ul><li>api server（Kubernetes API Server）<br><br> Kubernetes API，集群的统一入口，各组件协调者，以 HTTP API 提供接口服务，所有对象资源的增删改查和监听操作都 交给 APIServer 处理后再提交给 Etcd 存储。</li><li>etcd<br><br> 是一个分布式的、可靠的 key-value 存储系统，它用于存储分布式系统中的关键数据，这个定义非常重要。<br><br> 整个 kubernetes 系统中一共有两个服务需要用到 etcd 用来协同和存储配置，分别是：<br><br> 1）网络插件 flannel、对于其它网络插件也需要用到 etcd 存储网络的配置信息<br><br> 2）kubernetes 本身，包括各种对象的状态和元信息配置<br></li><li>scheduler<br> 通过调度算法为待调度 Pod 列表上的每一个 Pod 从 Node 列表中选择一个最合适的 Node。</li></ul><h4 id="node-节点" tabindex="-1"><a class="header-anchor" href="#node-节点" aria-hidden="true">#</a> node 节点</h4>`,23),_=e("li",null,[n("Docker"),e("br"),e("br"),n(" 容器引擎（程序），k8s 管理容器，容器由 docker 进行创建，k8s 底层必须有 docker 引擎。"),e("br")],-1),y=e("li",null,[n("pod"),e("br"),e("br"),n(" Pod 是最小部署单元，一个 Pod 有一个或多个容器组成，Pod 中容器共享存储和网络，在同一台 Docker 主机上运行")],-1),f=e("br",null,null,-1),x=e("br",null,null,-1),P=e("br",null,null,-1),S=e("br",null,null,-1),I=e("br",null,null,-1),R=e("li",null,[n("10250（kubelet API）："),e("br"),e("br"),n(" kubelet server 与 apiserver 通信的端口，定期请求 apiserver 获取自己所应当处理的任务，通过该端口可以访问获取 node 资源以及状态。")],-1),N=e("li",null,[n("10248（健康检查端口）："),e("br"),e("br"),n(" 通过访问该端口可以判断 kubelet 是否正常工作, 通过 kubelet 的启动参数 --healthz-port 和 --healthz-bind-address 来指定监听的地址和端口。")],-1),D=e("br",null,null,-1),j=e("br",null,null,-1),A={href:"http://localhost:4194",target:"_blank",rel:"noopener noreferrer"},C=e("code",null,"--cadvisor-port",-1),V=e("li",null,[n("10255 （readonly API）："),e("br"),e("br"),n(" 提供了 pod 和 node 的信息，接口以只读形式暴露出去，访问该端口不需要认证和鉴权。")],-1),T=e("li",null,[n("kube-proxy"),e("br"),e("br"),n(" 代理服务，主要用来做负载均衡。设置 iptables 负载规则，维护网络规则和四层负载均衡工作")],-1),q=e("li",null,[n("fluentd "),e("br"),n("日志收集组件")],-1),J=e("li",null,[n("dns "),e("br"),n("域名解析服务器")],-1),L=r(`<h4 id="其他组件" tabindex="-1"><a class="header-anchor" href="#其他组件" aria-hidden="true">#</a> 其他组件</h4><ul><li>CoreDNS：可以为集群中的 SVC 创建一个域名 IP 的对应关系解析</li><li>DasHBoard：给 K8s 集群提供一个 B/S 结构访问体系</li><li>Ingress Controller：官方只能实现四层代理，INGRESS 可以实现七层代理</li><li>Federation：提供一个可以跨集群中心多 K8S 统一管理功能</li><li>Prometheus：提供 K8S 集群的监控能力</li><li>ELK：提供 K8s 集群日志统一分析介入平台</li></ul><h2 id="kubernetes-核心组件" tabindex="-1"><a class="header-anchor" href="#kubernetes-核心组件" aria-hidden="true">#</a> kubernetes 核心组件</h2><h4 id="rc-控制器-replicationcontroller" tabindex="-1"><a class="header-anchor" href="#rc-控制器-replicationcontroller" aria-hidden="true">#</a> RC （控制器 ReplicationController）</h4><p>用来确保容器应用的副本数始终保持在用户定义的副本数，即如果有容器异常退出，会自动创建新的 Pod 来替代，而如果异常多出的容器也会自动回收。<br><br> 在新版本的 Kubernetes 中建议使用 ReplicaSet 来取代 ReplicationController</p><h4 id="rs-控制器-replicase" tabindex="-1"><a class="header-anchor" href="#rs-控制器-replicase" aria-hidden="true">#</a> RS （控制器 ReplicaSe）</h4><p>ReplicaSet 跟 ReplicationController 没有本质的不同，只是名字不一样，并且 ReplicaSet 支持集合式的 selector<br><br> 虽然 ReplicaSet 可以独立使用，但一般还是建议使用 Deployment 来自动管理 ReplicaSet,这样就无需担心跟其他机制的不兼容问题（比如 ReplicaSet 不支持 rolling-update 但 Deployment 支持）<br></p><h4 id="deployment-1" tabindex="-1"><a class="header-anchor" href="#deployment-1" aria-hidden="true">#</a> Deployment</h4><p>为 Pod 和 ReplicaSet 提供了一个 声明式定义方法，用来替代以前的 ReplicationController 来方便的管理应用。<br><br> 典型的应用场景：<br><br> ​ （1）、定义 Deployment 来创建 Pod 和 ReplicaSet<br><br> ​ （2）、滚动升级和回滚应用<br><br> ​ （3）、扩容和索容<br><br> ​ （4）、暂停和继续 Deployment<br><br> Deployment 不仅仅可以滚动更新，而且可以进行回滚，如果发现升级到 V2 版本后，发现服务不可用，可以回滚到 V1 版本。<br></p><ul><li>HPA （HorizontalPodAutoScale）<br><br> Horizontal Pod Autoscaling 仅适用于 Deployment 和 ReplicaSet,在 V1 版本中仅支持根据 Pod 的 CPU 利用率扩容，在 vlalpha 版本中，支持根据内存和用户自定义的 metric 扩缩容</li></ul><h4 id="statefullset" tabindex="-1"><a class="header-anchor" href="#statefullset" aria-hidden="true">#</a> StatefullSet</h4><p>StatefullSet 是为了解决有状态服务的问题（对应 Deployments 和 ReplicaSets 是为无状态服务而设计），其应用场景包括：<br><br> （1） 稳定的持久化存储，即 Pod 重新调度后还是能访问的相同持久化数据，基于 PVC 来实现<br><br> （2）稳定的网络标志，及 Pod 重新调度后其 PodName 和 HostName 不变，基于 Headlesss Service（即没有 Cluster IP 的 Service）来实现。<br><br> （3）有序部署，有序扩展，即 Pod 是有顺序的，在部署或者扩展的时候要依据定义的顺序依次进行（即从 0 到 N-1,在下一个 Pod 运行之前所有之前的 Pod 必须都是 Running 和 Ready 状态），基于 init containers 来实现。<br><br> （4）有序收缩，有序删除（即从 N-1 到 0）<br></p><h4 id="daemonset-1" tabindex="-1"><a class="header-anchor" href="#daemonset-1" aria-hidden="true">#</a> DaemonSet</h4><p>DaemonSet 确保全部（或者一些 [ node 打上污点（可以想象成一个标签）,pod 如果不定义容忍这个污点，那么 pod 就不会被调度器分配到这个 node ]）<br><br> Node 上运行一个 Pod 的副本。当有 Node 加入集群时，也会为他们新增一个 Pod。当有 Node 从集群移除时，这些 Pod 也会被回收。删除 DaemonSet 将会删除他创建的所有 Pod,使用 DaemonSet 的一些典型用法：<br><br> （1） 运行集群存储 daemon,例如在每个 Node 上运行 glustered,ceph<br><br> （2）在每个 Node 上运行日志收集 Daemon,例如：fluentd、logstash.<br><br> （3）在每个 Node 上运行监控 Daemon,例如：Prometheus Node Exporter<br></p><h4 id="job-1" tabindex="-1"><a class="header-anchor" href="#job-1" aria-hidden="true">#</a> Job</h4><p>负责批处理任务，即仅执行一次的任务，它保证批处理任务的一个或多个 Pod 成功结束<br></p><h4 id="volume" tabindex="-1"><a class="header-anchor" href="#volume" aria-hidden="true">#</a> Volume</h4><p>数据卷，共享 Pod 中容器使用的数据。</p><h4 id="label" tabindex="-1"><a class="header-anchor" href="#label" aria-hidden="true">#</a> Label</h4><p>标签用于区分对象（比如 Pod、Service），键/值对存在；每个对象可以有多个标签，通过标签关联对象。<br> Kubernetes 中任意 API 对象都是通过 Label 进行标识，Label 的实质是一系列的 Key/Value 键值对，其中 key 于 value 由用户自己指定。</p><h2 id="服务发现" tabindex="-1"><a class="header-anchor" href="#服务发现" aria-hidden="true">#</a> 服务发现</h2><h4 id="service" tabindex="-1"><a class="header-anchor" href="#service" aria-hidden="true">#</a> service</h4><p>Service 是一个抽象的概念。它通过一个虚拟的 IP 的形式(VIPs)，映射出来指定的端口，通过代理客户端发来的请求转发到后端一组 Pods 中的一台（也就是 endpoint）<br><br> Service 提供了统一的服务访问入口以及服务代理和发现机制，关联多个相同 Label 的 Pod，用户不需要了解后台 Pod 是如何运行。<br><br> 首先需要弄明白 Kubernetes 的三种 IP<br></p><ul><li>Node IP：Node 节点的 IP 地址，节点的物理网卡 IP 地址<br></li><li>Pod IP： Pod 的 IP 地址<br></li><li>Cluster IP：Service 的 IP 地址<br></li></ul><h4 id="iptables" tabindex="-1"><a class="header-anchor" href="#iptables" aria-hidden="true">#</a> IPTables</h4><p>ptables 模式为 Services 的默认代理模式。</p><h4 id="负载均衡的方式" tabindex="-1"><a class="header-anchor" href="#负载均衡的方式" aria-hidden="true">#</a> 负载均衡的方式</h4><p>在 Linux 中使用 iptables 完成 tcp 的负载均衡有两种模式：随机、轮询</p><ul><li>随机方式<br><br> 系统中提供 3 个 servers，下面我们通过配置 iptables 使流量均衡访问这 3 台 server。<br></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 随机：(Random balancing)</span>
iptables <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-d</span> <span class="token number">192.168</span>.1.1 <span class="token parameter variable">--dport</span> <span class="token number">27017</span> <span class="token parameter variable">-m</span> statistic <span class="token parameter variable">--mode</span> random <span class="token parameter variable">--probability</span> <span class="token number">0.33</span>  <span class="token parameter variable">-j</span> DNAT --to-destination <span class="token number">10.0</span>.0.2:1234
iptables <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-d</span> <span class="token number">192.168</span>.1.1 <span class="token parameter variable">--dport</span> <span class="token number">27017</span> <span class="token parameter variable">-m</span> statistic <span class="token parameter variable">--mode</span> random <span class="token parameter variable">--probability</span> <span class="token number">0.5</span> <span class="token parameter variable">-j</span> DNAT --to-destination <span class="token number">10.0</span>.0.3:1234
iptables <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-d</span> <span class="token number">192.168</span>.1.1 <span class="token parameter variable">--dport</span> <span class="token number">27017</span>  <span class="token parameter variable">-j</span> DNAT --to-destination <span class="token number">10.0</span>.0.4:1234

<span class="token comment"># rules说明：</span>
<span class="token comment"># 第一条规则中，指定--probability 0.33 ，则说明该规则有33%的概率会命中，</span>
<span class="token comment"># 第二条规则也有33%的概率命中，因为规则中指定 --probability 0.5。 则命中的概率为：50% * （1 - 33%）=0.33</span>
<span class="token comment"># 第三条规则中，没有指定 --probability 参数，因此意味着当匹配走到第三条规则时，则一定命中，此时走到第三条规则的概率为：1 - 0.33 -0.33 ≈ 0.33。</span>
<span class="token comment"># 由上可见，三条规则命中的几率一样的。此外，如果我们想修改三条规则的命中率，可以通过 --probability 参数调整。</span>
<span class="token comment"># 注意：因为iptables中，规则是按顺序匹配的，由上至下依次匹配，因此设计iptables规则时，要严格对规则进行排序。因此上述三条规则的顺序也不可以调换，不然就无法实现LB均分了。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>轮询方式<br><br> 有 3 个 server，3 个 server 轮询处理流量包，则规则配置如下：<br></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#every：每n个包匹配一次规则</span>
<span class="token comment">#packet：从第p个包开始</span>
iptables <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-d</span> <span class="token number">192.168</span>.1.1 <span class="token parameter variable">--dport</span> <span class="token number">27017</span> <span class="token parameter variable">-m</span> statistic <span class="token parameter variable">--mode</span> nth <span class="token parameter variable">--every</span> <span class="token number">3</span> <span class="token parameter variable">--packet</span> <span class="token number">0</span> <span class="token parameter variable">-j</span> DNAT --to-destination <span class="token number">10.0</span>.0.2:1234
iptables <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-d</span> <span class="token number">192.168</span>.1.1 <span class="token parameter variable">--dport</span> <span class="token number">27017</span> <span class="token parameter variable">-m</span> statistic <span class="token parameter variable">--mode</span> nth <span class="token parameter variable">--every</span> <span class="token number">2</span> <span class="token parameter variable">--packet</span> <span class="token number">0</span>  <span class="token parameter variable">-j</span> DNAT --to-destination <span class="token number">10.0</span>.0.3:1234
iptables <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-d</span> <span class="token number">192.168</span>.1.1 <span class="token parameter variable">--dport</span> <span class="token number">27017</span> <span class="token parameter variable">-j</span> DNAT --to-destination <span class="token number">10.0</span>.0.4:1234

<span class="token comment"># rules说明：</span>
<span class="token comment"># 在规则中 n(--every) 和 p(--packet) 代表着： 从第 p 个包开始，每 n 个包执行该规则。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="ipvs" tabindex="-1"><a class="header-anchor" href="#ipvs" aria-hidden="true">#</a> IPVS</h4><p>IPVS（IP 虚拟服务器）实现传输层负载平衡，通常称为第 4 层 LAN 交换，是 Linux 内核的一部分。<br><br> IPVS 支持的负载均衡算法有这么几种：<br></p><ul><li>rr: 轮询</li><li>lc: 最小连接数</li><li>dh: 目的地址 hash</li><li>sh: 源地址 hash</li><li>sed: 最短期望延迟</li><li>nq: 无须队列等待</li></ul><h2 id="ingress-7-层-应用层-负载均衡" tabindex="-1"><a class="header-anchor" href="#ingress-7-层-应用层-负载均衡" aria-hidden="true">#</a> Ingress (7 层[应用层]负载均衡)</h2><p>Ingress 是 kubernetes 为了实现在应用层进行转发，对 nginx 进行云原生模式的封装（增强），使得 Ingress 可以对 service 实现请求的转发，且实现动态转发规则的改写；<br><br> ingress 规则是很灵活的，可以根据不同域名、不同 path 转发请求到不同的 service，并且支持 https/http。<br></p><h4 id="ingress-地址" tabindex="-1"><a class="header-anchor" href="#ingress-地址" aria-hidden="true">#</a> Ingress 地址</h4>`,38),E={href:"https://github.com/kubernetes/ingress-nginx/tree/master/deploy",target:"_blank",rel:"noopener noreferrer"},K=e("br",null,null,-1),B=e("br",null,null,-1),H={href:"https://github.com/kubernetes/ingress-nginx/tree/nginx-0.30.0/deploy",target:"_blank",rel:"noopener noreferrer"},O=e("br",null,null,-1),G=e("br",null,null,-1),w={href:"https://kubernetes.github.io/ingress-nginx/",target:"_blank",rel:"noopener noreferrer"},z=e("br",null,null,-1),U=e("h4",{id:"ingress-部署文件",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#ingress-部署文件","aria-hidden":"true"},"#"),n(" Ingress 部署文件")],-1),M=r("<li>namespace.yaml<br><br> 创建一个独立的命名空间 ingress-nginx</li><li>configmap.yaml<br><br> ConfigMap 是存储通用的配置变量的，类似于配置文件，使用户可以将分布式系统中用于不同模块的环境变量统一到一个对象中管理；而它与配置文件的区别在于它是存在集群的“环境”中的，并且支持 K8S 集群中所有通用的操作调用方式。<br><br> 从数据角度来看，ConfigMap 的类型只是键值组，用于存储被 Pod 或者其他资源对象（如 RC）访问的信息。这与 secret 的设计理念有异曲同工之妙，主要区别在于 ConfigMap 通常不用于存储敏感信息，而只存储简单的文本信息。<br><br> ConfigMap 可以保存环境变量的属性，也可以保存配置文件。<br></li><li>rbac.yaml<br><br> 负责 Ingress 的 RBAC 授权的控制，其创建了 Ingress 用到的 ServiceAccount、ClusterRole、Role、RoleBinding、ClusterRoleBinding</li><li>with-rbac.yaml<br><br> 是 Ingress 的核心，用于创建 ingress-controller。前面提到过，ingress-controller 的作用是将新加入的 Ingress 进行转化为 Nginx 的配置</li>",4),F=e("br",null,null,-1),$=e("br",null,null,-1),Y=e("br",null,null,-1),Q=e("br",null,null,-1),W={href:"http://registry.cn-hangzhou.aliyuncs.com/google_containers/nginx-ingress-controller:0.30.0",target:"_blank",rel:"noopener noreferrer"},X=e("li",null,[n("Service-NodePort.yaml"),e("br")],-1),Z=r(`<h4 id="ingress-部署" tabindex="-1"><a class="header-anchor" href="#ingress-部署" aria-hidden="true">#</a> Ingress 部署</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 将上述部署文件夹中部署ingress</span>
kubectl apply <span class="token parameter variable">-f</span> ./
<span class="token comment"># 查看ingress-nginx组件状态</span>
kubectl get pod <span class="token parameter variable">-n</span> ingress-nginx　
kubectl get pod <span class="token parameter variable">-n</span> ingress-nginx --show-labels
<span class="token comment"># 查看Deployment的状态</span>
kubectl get Deployment <span class="token parameter variable">-n</span> ingress-nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function ee(ne,ae){const s=t("router-link"),i=t("ExternalLinkIcon");return o(),c("div",null,[b(" more "),e("nav",m,[e("ul",null,[e("li",null,[a(s,{to:"#文档地址"},{default:l(()=>[n("文档地址")]),_:1})]),e("li",null,[a(s,{to:"#deployment"},{default:l(()=>[n("Deployment")]),_:1})]),e("li",null,[a(s,{to:"#replicaset"},{default:l(()=>[n("Replicaset")]),_:1})]),e("li",null,[a(s,{to:"#daemonset"},{default:l(()=>[n("DaemonSet")]),_:1})]),e("li",null,[a(s,{to:"#job"},{default:l(()=>[n("Job")]),_:1})]),e("li",null,[a(s,{to:"#cronjob"},{default:l(()=>[n("cronJob")]),_:1})]),e("li",null,[a(s,{to:"#kubernetes-集群"},{default:l(()=>[n("kubernetes 集群")]),_:1})]),e("li",null,[a(s,{to:"#kubernetes-核心组件"},{default:l(()=>[n("kubernetes 核心组件")]),_:1})]),e("li",null,[a(s,{to:"#服务发现"},{default:l(()=>[n("服务发现")]),_:1})]),e("li",null,[a(s,{to:"#ingress-7-层-应用层-负载均衡"},{default:l(()=>[n("Ingress (7 层[应用层]负载均衡)")]),_:1})])])]),u,e("ul",null,[e("li",null,[e("a",v,[n("kubernetes 官网"),a(i)])]),e("li",null,[e("a",h,[n("文档"),a(i)])]),e("li",null,[e("a",k,[n("中文文档"),a(i)])])]),g,e("ul",null,[_,y,e("li",null,[n("kubelet"),f,x,n(" 监听 etcd,获取指令管理 pod,kubelet 是真正管理 pod 的组件。"),P,S,n(" kubelet 默认监听四个端口，分别为 10250 、10255、10248、4194"),I,e("ul",null,[R,N,e("li",null,[n("4194（cAdvisor 监听）："),D,j,n(" kublet 通过该端口可以获取到该节点的环境信息以及 node 上运行的容器状态等内容，访问 "),e("a",A,[n("http://localhost:4194"),a(i)]),n(" 可以看到 cAdvisor 的管理界面,通过 kubelet 的启动参数 "),C,n(" 可以指定启动的端口。")]),V])]),T,q,J]),L,e("p",null,[n("Ingress-nginx gitHub 地址：最新版本地址："),e("a",E,[n("https://github.com/kubernetes/ingress-nginx/"),a(i)]),K,B,n(" 指定版本的下载地址： "),e("a",H,[n("https://github.com/kubernetes/ingress-nginx/tree/nginx-0.30.0/deploy"),a(i)]),O,G,n(" Ingress-nginx 官方网站地址："),e("a",w,[n("https://kubernetes.github.io/ingress-nginx/"),a(i)]),z]),U,e("ol",null,[M,e("li",null,[n("mandatory.yaml"),F,$,n(" 建立一个统一的入口；如果外界访问的域名不存在的话，则默认转发到 default-http-backend 这个 Service，其会直接返回 404："),Y,Q,n(" 220 行，修改 image 地址："),e("a",W,[n("registry.cn-hangzhou.aliyuncs.com/google_containers/nginx-ingress-controller:0.30.0"),a(i)])]),X]),Z])}const ie=d(p,[["render",ee],["__file","40.K8S核心组件.html.vue"]]);export{ie as default};
