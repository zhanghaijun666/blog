import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as v,c,e as u,a as n,d as s,w as a,b as e,f as t}from"./app-efa5e96e.js";const o={},m=n("figure",null,[n("img",{src:"https://s3.ax1x.com/2021/01/21/sfzUjU.png",alt:"sfzUjU.png",tabindex:"0",loading:"lazy"}),n("figcaption",null,"sfzUjU.png")],-1),p={class:"table-of-contents"},b=t(`<h2 id="无状态" tabindex="-1"><a class="header-anchor" href="#无状态" aria-hidden="true">#</a> 无状态</h2><blockquote><p>与无状态相反,有状态服务在服务端保留之前请求的信息,用以处理当前请求。例如：MySQL</p></blockquote><h2 id="volume" tabindex="-1"><a class="header-anchor" href="#volume" aria-hidden="true">#</a> Volume</h2><blockquote><p>K8s 抽象的数据存储对象，volume 数据卷会把存储介质（网络存储，磁盘）中的数据挂载到容器中；</p><p>声明在 Pod 中的容器可以访问文件目录的，一个卷可以被挂载在 Pod 中一个或者多个容器的指定路径下面。</p></blockquote><ul><li>容器宕机，volume 数据不会丢失，一直存在</li><li>pod 宕机，volume 就会消失，因此 volume 数据卷生命周期是和 pod 一致的；<br> 数据卷的类型：</li><li>本地卷 ：emptyDir</li><li>网络卷 ：NFS，ClusterFs，Ceph</li><li>云盘 ：AWS，微软（azuredisk）</li><li>k8s 自身的资源 ： secret，configmap，downwardAPI</li></ul><h2 id="pv-pvc-容器存储的编排" tabindex="-1"><a class="header-anchor" href="#pv-pvc-容器存储的编排" aria-hidden="true">#</a> PV &amp; PVC (容器存储的编排)</h2><p>管理<code>存储</code>和管理<code>计算</code>有着明显的不同。<code>PersistentVolume</code>给用户和管理员提供了一套 API，抽象出<code>存储</code>是如何<code>提供和消耗的细节</code>。在这里，我们介绍两种新的 API 资源：<code>PersistentVolume（简称PV）</code>和<code>PersistentVolumeClaim（简称PVC）</code>。</p><ul><li><p>PersistentVolume（持久卷，简称 PV）</p><p>是集群内，由管理员提供的网络存储的一部分。就像集群中的节点一样，PV 也是集群中的一种资源。它也像 Volume 一样，是一种 volume 插件，但是它的生命周期却是和使用它的 Pod 相互独立的。</p></li><li><p>PersistentVolumeClaim（持久卷声明，简称 PVC）</p><p>是用户的一种存储请求。它和 Pod 类似，Pod 消耗 Node 资源，而 PVC 消耗 PV 资源。Pod 能够请求特定的资源（如 CPU 和内存）。PVC 能够请求指定的大小和访问的模式（可以被映射为一次读写或者多次只读）；</p></li></ul><details class="hint-container details"><summary>pod 绑定 pvc pv</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> my-pv.yaml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
# 创建 PV1
apiVersion: v1
kind: PersistentVolume
metadata:
  name: my-pv
spec:
  capacity:
    storage: 5Gi
  accessModes:
    - ReadWriteMany
  nfs:
    path: /opt/k8s/demo
    server: 192.168.66.13
EOF</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> my-pvc.yaml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
# 创建一个PVC
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 5Gi
EOF</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> my-nginx.yaml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
# ngxin pod
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
    volumeMounts:
      - name: www
        mountPath: /usr/share/nginx/html
  volumes:
    - name: www
      persistentVolumeClaim:
        claimName: my-pvc
EOF</span>
kubectl apply <span class="token parameter variable">-f</span> my-pv.yaml
kubectl apply <span class="token parameter variable">-f</span> my-pvc.yaml
kubectl apply <span class="token parameter variable">-f</span> my-nginx.yaml
kubectl get <span class="token function">pv</span>
kubectl get pvc
kubectl get pods <span class="token parameter variable">-o</span> wide
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="statefulset" tabindex="-1"><a class="header-anchor" href="#statefulset" aria-hidden="true">#</a> StatefulSet</h2><blockquote><p>本质上是 Deployment 的一种变体,它为了解决有状态服务的问题，它所管理的 Pod 拥有固定的 Pod 名称，启停顺序，在 StatefulSet 中，Pod 名字称为网络标识(hostname)，还必须要用到共享存储。</p><p>在 Deployment 中，与之对应的服务是 service，而在 StatefulSet 中与之对应的 headless service，headless service，即无头服务，与 service 的区别就是它没有 Cluster IP，解析它的名称时将返回该 Headless Service 对应的全部 Pod 的 Endpoint 列表。</p><p>除此之外，StatefulSet 在 Headless Service 的基础上又为 StatefulSet 控制的每个 Pod 副本创建了一个 DNS 域名。</p></blockquote><details class="hint-container details"><summary>创建 5 个 pv 数据卷</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> pv001-005.yaml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv001
  labels:
    name: pv001
spec:
  nfs:
    path: /opt/k8s/v1
    server: 192.168.66.13
  accessModes: [&quot;ReadWriteMany&quot;, &quot;ReadWriteOnce&quot;]
  capacity:
    storage: 1Gi
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv002
  labels:
    name: pv002
spec:
  nfs:
    path: /opt/k8s/v2
    server: 192.168.66.13
  accessModes: [&quot;ReadWriteOnce&quot;]
  capacity:
    storage: 2Gi
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv003
  labels:
    name: pv003
spec:
  nfs:
    path: /opt/k8s/v3
    server: 192.168.66.13
  accessModes: [&quot;ReadWriteMany&quot;, &quot;ReadWriteOnce&quot;]
  capacity:
    storage: 3Gi
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv004
  labels:
    name: pv004
spec:
  nfs:
    path: /opt/k8s/v4
    server: 192.168.66.13
  accessModes: [&quot;ReadWriteMany&quot;, &quot;ReadWriteOnce&quot;]
  capacity:
    storage: 1Gi
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv005
  labels:
    name: pv005
spec:
  nfs:
    path: /opt/k8s/v5
    server: 192.168.66.13
  accessModes: [&quot;ReadWriteMany&quot;, &quot;ReadWriteOnce&quot;]
  capacity:
    storage: 1Gi
EOF</span>
kubrctl apply <span class="token parameter variable">-f</span> pv001-005.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>详情</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> nginx.yaml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
apiVersion: v1
kind: Service
metadata:
  name: nginx
  labels:
    app: nginx
spec:
  ports:
  - port: 80
    name: web
  clusterIP: None
  selector:
    app: nginx
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: web
spec:
  selector:
    matchLabels:
      app: nginx
  serviceName: &quot;nginx&quot;
  replicas: 3
  template:
    metadata:
      labels:
        app: nginx
    spec:
      terminationGracePeriodSeconds: 10
      containers:
      - name: nginx
        image: k8s.gcr.io/nginx-slim:0.8
        ports:
        - containerPort: 80
          name: web
        volumeMounts:
        - name: www
          mountPath: /usr/share/nginx/html
    volumes:
    - name: www
      persistentVolumeClaim:
        claimName: my-pvc
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 5Gi
EOF</span>
kubectl create <span class="token parameter variable">-f</span> nginx.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="configmap-配置中心" tabindex="-1"><a class="header-anchor" href="#configmap-配置中心" aria-hidden="true">#</a> configmap（配置中心）</h2><blockquote><p>用来存储一些配置文件，或者是环境变量；</p><p>例如： 部署 redis ,可以 redis.conf 配置存储在 configmap 对象中，部署 mysql ,可以把 my.cnf 存储在 configmap 中；</p><p>configmap 资源对象存储数据结构： key：value ,value 值可以是单个字符串，也可以是文件内容</p><p>Kubenetes 云原生架构体系中提供的一套配置中心对象；使得配置和服务进行解耦，一旦配置发生变化，就不需要重新打包，重新部署，服务立马感知到配置文件变化，立马做出调整；</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建命令</span>
kubectl create configmap test-config --from-literal<span class="token operator">=</span>db.host<span class="token operator">=</span><span class="token number">10.5</span>.10.116 --from-listeral<span class="token operator">=</span>db.port<span class="token operator">=</span><span class="token string">&#39;3306&#39;</span>
<span class="token comment"># 以文件创建key默认是文件名，value默认为文件内容</span>
kubectl create configmap test-config2 --from-file<span class="token operator">=</span>./app.properties
<span class="token comment"># 查看创建的test-config</span>
kubectl get configmap test-config <span class="token parameter variable">-o</span> yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="secret" tabindex="-1"><a class="header-anchor" href="#secret" aria-hidden="true">#</a> Secret</h2><p>Secret 对象也是一种存储数据的资源对象，但是 Secret 仅仅是被用来存储敏感数据；具有安全的作用： 例如：秘钥，密码，token 等等这些数据信心都需要存储在 secret 资源对象中；</p><p>当 POD 需要或者这些敏感的数据的时候，只需要从 Secret 中获取即可（使用数据卷的挂载的方式，动态的从 secret 资源对象中获取数据），这样防止直接把敏感数据暴露在镜像中，这样的可以提高服务安全性</p><p>Secret 对象类型：</p>`,20),k=n("li",null,[e("Service Account"),n("br"),n("br"),e(" 用来访问 Kubernetes API，由 Kubernetes 自动创建，并且会自动挂载到 Pod 的/run/secrets/kubernetes.io/serviceaccount 目录中；")],-1),g=n("li",null,[e("Opaque"),n("br"),n("br"),e(" base64 编码格式的 Secret，用来存储密码、密钥、信息、证书等，类型标识符为 generic；")],-1),h={href:"http://kubernetes.io/dockerconfigjson",target:"_blank",rel:"noopener noreferrer"},f=n("br",null,null,-1),q=n("br",null,null,-1),P={href:"http://kubernetes.io/tl",target:"_blank",rel:"noopener noreferrer"},V=n("br",null,null,-1),S=n("br",null,null,-1),y=t(`<h2 id="storageclass" tabindex="-1"><a class="header-anchor" href="#storageclass" aria-hidden="true">#</a> StorageClass</h2><p>什么是 StorageClass</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Kubernetes提供了一套可以自动创建PV的机制,即:Dynamic Provisioning.而这个机制的核心在于:StorageClass这个API对象.

StorageClass对象会定义下面两部分内容:
1,PV的属性.比如,存储类型,Volume的大小等.
2,创建这种PV需要用到的存储插件
有了这两个信息之后,Kubernetes就能够根据用户提交的PVC,找到一个对应的StorageClass,之后Kubernetes就会调用该StorageClass声明的存储插件,进而创建出需要的PV.
但是其实使用起来是一件很简单的事情,你只需要根据自己的需求,编写YAML文件即可,然后使用kubectl create命令执行即可
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为什么需要 StorageClass</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>在一个大规模的Kubernetes集群里,可能有成千上万个PVC,这就意味着运维人员必须实现创建出这个多个PV,此外,随着项目的需要,会有新的PVC不断被提交,那么运维人员就需要不断的添加新的,满足要求的PV,否则新的Pod就会因为PVC绑定不到PV而导致创建失败.而且通过 PVC 请求到一定的存储空间也很有可能不足以满足应用对于存储设备的各种需求

而且不同的应用程序对于存储性能的要求可能也不尽相同，比如读写速度、并发性能等，为了解决这一问题，Kubernetes 又为我们引入了一个新的资源对象：StorageClass，通过 StorageClass 的定义，管理员可以将存储资源定义为某种类型的资源，比如快速存储、慢速存储等，用户根据 StorageClass 的描述就可以非常直观的知道各种存储资源的具体特性了，这样就可以根据应用的特性去申请合适的存储资源了。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行原理及部署流程</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>要使用 StorageClass，我们就得安装对应的自动配置程序，比如我们这里存储后端使用的是 nfs，那么我们就需要使用到一个 nfs-client 的自动配置程序，我们也叫它 Provisioner，这个程序使用我们已经配置好的 nfs 服务器，来自动创建持久卷，也就是自动帮我们创建 PV。

1.自动创建的 PV 以\${namespace}-\${pvcName}-\${pvName}这样的命名格式创建在 NFS 服务器上的共享数据目录中
2.而当这个 PV 被回收后会以archieved-\${namespace}-\${pvcName}-\${pvName}这样的命名格式存在 NFS 服务器上。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>搭建 StorageClass+NFS,大致有以下几个步骤:</p><ol><li>创建一个可用的 NFS Server</li><li>创建 Service Account.这是用来管控 NFS provisioner 在 k8s 集群中运行的权限</li><li>创建 StorageClass.负责建立 PVC 并调用 NFS provisioner 进行预定的工作,并让 PV 与 PVC 建立管理</li><li>创建 NFS provisioner.有两个功能,一个是在 NFS 共享目录下创建挂载点(volume),另一个则是建了 PV 并将 PV 与 NFS 的挂载点建立关联</li></ol><details class="hint-container details"><summary>实战</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># rbac.yaml:#唯一需要修改的地方只有namespace,根据实际情况定义</span>
apiVersion: v1
kind: ServiceAccount
metadata:
  name: nfs-client-provisioner
  namespace: default
---
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: nfs-client-provisioner-runner
rules:
  - apiGroups: <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    resources: <span class="token punctuation">[</span><span class="token string">&quot;persistentvolumes&quot;</span><span class="token punctuation">]</span>
    verbs: <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span>, <span class="token string">&quot;list&quot;</span>, <span class="token string">&quot;watch&quot;</span>, <span class="token string">&quot;create&quot;</span>, <span class="token string">&quot;delete&quot;</span><span class="token punctuation">]</span>
  - apiGroups: <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    resources: <span class="token punctuation">[</span><span class="token string">&quot;persistentvolumeclaims&quot;</span><span class="token punctuation">]</span>
    verbs: <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span>, <span class="token string">&quot;list&quot;</span>, <span class="token string">&quot;watch&quot;</span>, <span class="token string">&quot;update&quot;</span><span class="token punctuation">]</span>
  - apiGroups: <span class="token punctuation">[</span><span class="token string">&quot;storage.k8s.io&quot;</span><span class="token punctuation">]</span>
    resources: <span class="token punctuation">[</span><span class="token string">&quot;storageclasses&quot;</span><span class="token punctuation">]</span>
    verbs: <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span>, <span class="token string">&quot;list&quot;</span>, <span class="token string">&quot;watch&quot;</span><span class="token punctuation">]</span>
  - apiGroups: <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    resources: <span class="token punctuation">[</span><span class="token string">&quot;events&quot;</span><span class="token punctuation">]</span>
    verbs: <span class="token punctuation">[</span><span class="token string">&quot;create&quot;</span>, <span class="token string">&quot;update&quot;</span>, <span class="token string">&quot;patch&quot;</span><span class="token punctuation">]</span>
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: run-nfs-client-provisioner
subjects:
  - kind: ServiceAccount
    name: nfs-client-provisioner
    namespace: default
roleRef:
  kind: ClusterRole
  name: nfs-client-provisioner-runner
  apiGroup: rbac.authorization.k8s.io
---
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: leader-locking-nfs-client-provisioner
  namespace: default
rules:
  - apiGroups: <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    resources: <span class="token punctuation">[</span><span class="token string">&quot;endpoints&quot;</span><span class="token punctuation">]</span>
    verbs: <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span>, <span class="token string">&quot;list&quot;</span>, <span class="token string">&quot;watch&quot;</span>, <span class="token string">&quot;create&quot;</span>, <span class="token string">&quot;update&quot;</span>, <span class="token string">&quot;patch&quot;</span><span class="token punctuation">]</span>
---
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: leader-locking-nfs-client-provisioner
subjects:
  - kind: ServiceAccount
    name: nfs-client-provisioner
    namespace: default
roleRef:
  kind: Role
  name: leader-locking-nfs-client-provisioner
  apiGroup: rbac.authorization.k8s.io


<span class="token comment"># 创建NFS资源的StorageClass</span>
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: managed-nfs-storage
provisioner: qgg-nfs-storage
parameters:
   archiveOnDelete: <span class="token string">&quot;false&quot;</span>

<span class="token comment"># 创建NFS provisioner</span>
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nfs-client-provisioner
  labels:
    app: nfs-client-provisioner
  namespace: default
spec:
  replicas: <span class="token number">1</span>
  selector:
    matchLabels:
      app: nfs-client-provisioner
  strategy:
    type: Recreate
  selector:
    matchLabels:
      app: nfs-client-provisioner
  template:
    metadata:
      labels:
        app: nfs-client-provisioner
    spec:
      serviceAccountName: nfs-client-provisioner
      containers:
        - name: nfs-client-provisioner
          image: hub.kaikeba.com/library/nfs-client-provisioner:v1
          volumeMounts:
            - name: nfs-client-root
              mountPath: /persistentvolumes
          env:
            - name: PROVISIONER_NAME
              value: qgg-nfs-storage
            - name: NFS_SERVER
              value: <span class="token number">192.168</span>.66.13
            - name: NFS_PATH
              value: /opt/k8s
      volumes:
        - name: nfs-client-root
          nfs:
            server: <span class="token number">192.168</span>.66.13
            path: /opt/k8s

<span class="token comment"># 创建pod进行测试</span>
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: test-claim
  annotations:
    volume.beta.kubernetes.io/storage-class: <span class="token string">&quot;managed-nfs-storage&quot;</span>
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 1Mi

<span class="token comment"># 创建测试pod,查看是否可以正常挂载</span>
kind: Pod
apiVersion: v1
metadata:
  name: test-pod
spec:
  containers:
  - name: test-pod
    image: busybox:1.24
    command:
      - <span class="token string">&quot;/bin/sh&quot;</span>
    args:
      - <span class="token string">&quot;-c&quot;</span>
      - <span class="token string">&quot;touch /mnt/SUCCESS &amp;&amp; exit 0 || exit 1&quot;</span>   <span class="token comment">#创建一个SUCCESS文件后退出</span>
    volumeMounts:
      - name: nfs-pvc
        mountPath: <span class="token string">&quot;/mnt&quot;</span>
  restartPolicy: <span class="token string">&quot;Never&quot;</span>
  volumes:
    - name: nfs-pvc
      persistentVolumeClaim:
        claimName: test-claim  <span class="token comment">#与PVC名称保持一致</span>


<span class="token comment"># Statefulset+volumeClaimTemplates自动创建PV</span>
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-headless
  labels:
    app: nginx
spec:
  ports:
  - port: <span class="token number">80</span>
    name: web
  clusterIP: None
  selector:
    app: nginx
---
apiVersion: apps/v1beta1
kind: StatefulSet
metadata:
  name: web
spec:
  serviceName: <span class="token string">&quot;nginx&quot;</span>
  replicas: <span class="token number">2</span>
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: ikubernetes/myapp:v1
        ports:
        - containerPort: <span class="token number">80</span>
          name: web
        volumeMounts:
        - name: www
          mountPath: /usr/share/nginx/html
  volumeClaimTemplates:
  - metadata:
      name: www
      annotations:
        volume.beta.kubernetes.io/storage-class: <span class="token string">&quot;managed-nfs-storage&quot;</span>
    spec:
      accessModes: <span class="token punctuation">[</span> <span class="token string">&quot;ReadWriteOnce&quot;</span> <span class="token punctuation">]</span>
      resources:
        requests:
          storage: 1Gi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,10);function x(_,C){const i=d("router-link"),l=d("ExternalLinkIcon");return v(),c("div",null,[m,u(" more "),n("nav",p,[n("ul",null,[n("li",null,[s(i,{to:"#无状态"},{default:a(()=>[e("无状态")]),_:1})]),n("li",null,[s(i,{to:"#volume"},{default:a(()=>[e("Volume")]),_:1})]),n("li",null,[s(i,{to:"#pv-pvc-容器存储的编排"},{default:a(()=>[e("PV & PVC (容器存储的编排)")]),_:1})]),n("li",null,[s(i,{to:"#statefulset"},{default:a(()=>[e("StatefulSet")]),_:1})]),n("li",null,[s(i,{to:"#configmap-配置中心"},{default:a(()=>[e("configmap（配置中心）")]),_:1})]),n("li",null,[s(i,{to:"#secret"},{default:a(()=>[e("Secret")]),_:1})]),n("li",null,[s(i,{to:"#storageclass"},{default:a(()=>[e("StorageClass")]),_:1})])])]),b,n("ul",null,[k,g,n("li",null,[n("a",h,[e("kubernetes.io/dockerconfigjson"),s(l)]),f,q,e(" 用来存储私有 docker registry 的认证信息，类型标识为 docker-registry。")]),n("li",null,[n("a",P,[e("kubernetes.io/tl"),s(l)]),e(),V,S,e(" 用于为 SSL 通信模式存储证书和私钥文件，命令式创建类型标识为 tls。")])]),y])}const M=r(o,[["render",x],["__file","25.kubernetes有状态.html.vue"]]);export{M as default};
