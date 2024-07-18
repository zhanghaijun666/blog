import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as c,c as o,e as v,a as n,d as s,w as i,b as e,f as d}from"./app-efa5e96e.js";const p="/blog/assets/kubernetes-dns-ebc3a174.png",u={},m={class:"table-of-contents"},b=n("h2",{id:"coredns",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#coredns","aria-hidden":"true"},"#"),e(" CoreDns")],-1),k={href:"https://coredns.io/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/dns-custom-nameservers/",target:"_blank",rel:"noopener noreferrer"},g=d(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get pods <span class="token parameter variable">-l</span> k8s-app<span class="token operator">=</span>kube-dns <span class="token parameter variable">-n</span> kube-system
<span class="token comment">## 查看多个Pod中的日志信息</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">p</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">$(</span>kubectl get pods <span class="token parameter variable">--namespace</span><span class="token operator">=</span>kube-system <span class="token parameter variable">-l</span> k8s-app<span class="token operator">=</span>kube-dns <span class="token parameter variable">-o</span> name<span class="token variable">)</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span> kubectl logs <span class="token parameter variable">--namespace</span><span class="token operator">=</span>kube-system <span class="token variable">$p</span><span class="token punctuation">;</span> <span class="token keyword">done</span>

kubectl <span class="token parameter variable">-n</span> kube-system get ConfigMap coredns <span class="token parameter variable">-o</span> yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">配置示例</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>.:53 {
    errors
    health {
        lameduck 5s
    }
    ready
    ## 自定义 hosts 解析特定域名
    hosts {
      192.168.10.151 www.test.com
      fallthrough
    }
    ## 内部域名替换外部域名
    rewrite stop {
      name regex (.*)\\.mgmt\\.pix\\.yun\\.com {1}.default.svc.cluster.local
      answer name (.*)\\.default\\.svc\\.cluster\\.local {1}.mgmt.pix.yun.com
    }
    kubernetes cluster.local in-addr.arpa ip6.arpa {
      pods insecure
      fallthrough in-addr.arpa ip6.arpa
      ttl 30
    }
    prometheus :9153
    forward . /etc/resolv.conf
    cache 30
    loop
    reload
    loadbalance
}
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><br><br><br><br><div class="highlight-line"> </div><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><ul><li>CoreDNS配置详解</li></ul><h2 id="dns-调试" tabindex="-1"><a class="header-anchor" href="#dns-调试" aria-hidden="true">#</a> DNS 调试</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## ContOS</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> bind-utils
<span class="token function">nslookup</span> www.example.com <span class="token number">192.168</span>.10.8

<span class="token function">dig</span> +short www.baidu.com <span class="token builtin class-name">.</span>

<span class="token comment">## POD测试DNS</span>
kubectl run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> <span class="token parameter variable">--tty</span> debug <span class="token parameter variable">--image</span><span class="token operator">=</span>busybox -- <span class="token function">sh</span>
<span class="token function">nslookup</span> www.baidu.com
<span class="token builtin class-name">exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="打通ingress的域名访问" tabindex="-1"><a class="header-anchor" href="#打通ingress的域名访问" aria-hidden="true">#</a> 打通<code>Ingress</code>的域名访问</h2><h3 id="目的" tabindex="-1"><a class="header-anchor" href="#目的" aria-hidden="true">#</a> 目的</h3><p>对于 HTTP 类型的服务，我们可以通过 Ingress 资源以“虚拟主机”的形式将服务暴露出来，但是在内网环境下，这些域名通常都无法直接访问。</p><ul><li><p>如何在各个节点以及客户端同步域名解析配置？</p></li><li><p>如何进行域名解析？</p></li><li><p>如何在集群内也能进行域名解析？</p></li><li><p>如何在 Ingress 资源变动时自动更新域名解析配置？</p></li></ul><p>前两个问题其实是想引出自建 DNS 服务的话题，通过自建 DNS 服务，可以很方便的实现内网环境中各节点以及客户端的域名解析，第三个问题是指将集群的 CoreDNS 做一个兜底 forward 到自建 DNS 服务，第四个问题是指通过 ExternalDNS 将 Ingress 资源的配置自动同步到自建 DNS 中。</p><h3 id="实践方案" tabindex="-1"><a class="header-anchor" href="#实践方案" aria-hidden="true">#</a> 实践方案</h3><p>单纯自建 DNS 的话其实可以使用的软件有很多，但是出于对轻量级和配置 ExternalDNS 的考虑就直接使用 CoreDNS 作为 DNS 服务器软件。另外 CoreDNS 本身已经能够实现域名解析了，但也仅仅是只能进行静态域名解析，因此需要给它搭配一个 ETCD 数据库，后续 ExternalDNS 在读取到 Ingress 配置后也会将其写入到 ETCD 中。</p><p>此时自建 DNS 已经能够解析 Ingress 资源中配置的域名了，但是为了让集群内也能通过自建 DNS 进行域名解析，还需配置集群内的 CoreDNS 进行兜底 forward 到自建 DNS。</p><p>最终的各个组件之间的关系如下图所示：</p><figure><img src="`+p+`" alt="dns方案" tabindex="0" loading="lazy"><figcaption>dns方案</figcaption></figure><h3 id="自建-etcd" tabindex="-1"><a class="header-anchor" href="#自建-etcd" aria-hidden="true">#</a> 自建 ETCD</h3><p><code>ETCD</code>并没有采用官方推荐的<code>etcd-operator</code>方式进行安装，而是直接使用了<code>Bitnami Chart</code>，因为<code>Bitnami Chart</code>的镜像基本都在<code>DockerHub</code>易于访问。</p><div class="hint-container tip"><p class="hint-container-title">安装ETCD</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> values.etcd.yaml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
auth:
  rbac:
    create: false
EOF</span>
helm repo <span class="token function">add</span> bitnami https://charts.bitnami.com/bitnami
helm repo update
<span class="token comment">## helm pull bitnami/etcd --version 8.3.7</span>
helm upgrade etcd bitnami/etcd <span class="token parameter variable">--install</span> <span class="token parameter variable">--namespace</span> devops-dns --create-namespace <span class="token parameter variable">--values</span> values.etcd.yaml <span class="token parameter variable">--version</span> <span class="token number">8.3</span>.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## etcdctl 命令行测试工具</span>
kubectl run etcd-client <span class="token parameter variable">--restart</span><span class="token operator">=</span><span class="token string">&quot;Never&quot;</span> <span class="token parameter variable">--image</span> docker.io/bitnami/etcd:3.5.4-debian-11-r22 <span class="token parameter variable">--env</span> <span class="token assign-left variable">ETCDCTL_ENDPOINTS</span><span class="token operator">=</span><span class="token string">&quot;etcd.etcd.svc.cluster.local:2379&quot;</span> <span class="token parameter variable">--namespace</span> devops-dns <span class="token parameter variable">--command</span> -- <span class="token function">sleep</span> infinity

kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">--namespace</span> devops-dns <span class="token parameter variable">-it</span> etcd-client -- <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装自建-coredns" tabindex="-1"><a class="header-anchor" href="#安装自建-coredns" aria-hidden="true">#</a> 安装自建 CoreDNS</h3><p>主要修改了服务暴露方式以及直接改写的 <code>CoreDNS Chart</code> 默认的 <code>Corefile</code> 插件配置：</p><div class="hint-container tip"><p class="hint-container-title">安装CoreDNS</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> values.CoreDNS.yaml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
isClusterService: false

servers:
  - zones:
      - zone: .
    port: 53
    plugins:
      - name: errors
      - name: health
        configBlock: |-
          lameduck 5s
      - name: ready
      - name: hosts
        configBlock: |-
          fallthrough
      - name: etcd
        configBlock: |-
          endpoint http://etcd.devops-dns.svc.cluster.local:2379
          fallthrough
      - name: forward
        parameters: . 114.114.114.114
      - name: cache
        parameters: 30
      - name: loop
      - name: reload
      - name: loadbalance
EOF</span>
helm repo <span class="token function">add</span> coredns https://coredns.github.io/helm
helm repo update
<span class="token comment">## kubectl delete clusterrole coredns-coredns</span>
<span class="token comment">## kubectl delete clusterrolebinding coredns-coredns</span>
<span class="token comment">## helm pull coredns/coredns --version 1.19.4</span>
helm upgrade coredns coredns/coredns <span class="token parameter variable">--install</span> <span class="token parameter variable">--namespace</span> devops-dns --create-namespace <span class="token parameter variable">--values</span> values.CoreDNS.yaml <span class="token parameter variable">--version</span> <span class="token number">1.19</span>.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><blockquote><p>其中 endpoint 是指 ETCD 数据库的地址，由于安装 ETCD 时已经通过 NodePort 方式暴露了端口因而可以直接采用宿主机地址 + 端口的方式访问。可以在 hosts 插件块中硬编码一些域名解析，也可以让其直接引用宿主机的 hosts 文件，还可以借助 template 插件 配置泛解析。最后兜底转发到 114 DNS 服务器。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">###### 测试CoreDNS是否可用 ######</span>
<span class="token comment">## kubectl run -it --rm --restart=Never --image=infoblox/dnstools:latest dnstools</span>
kubectl run <span class="token parameter variable">-i</span> <span class="token parameter variable">--rm</span> <span class="token parameter variable">--tty</span> debug <span class="token parameter variable">--image</span><span class="token operator">=</span>busybox -- <span class="token function">sh</span>
<span class="token comment">## 测试公网域名能否解析</span>
<span class="token function">nslookup</span> www.baidu.com
<span class="token comment">## 退出容器自动删除容器</span>
<span class="token builtin class-name">exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装externaldns" tabindex="-1"><a class="header-anchor" href="#安装externaldns" aria-hidden="true">#</a> 安装ExternalDNS</h3><blockquote><p><code>ExternalDNS</code>目的是，将Kubernetes的Service/Ingress暴露的服务（的DNS记录）同步给外部的其他的Provider。</p></blockquote>`,26),f={href:"https://artifacthub.io/packages/helm/bitnami/external-dns",target:"_blank",rel:"noopener noreferrer"},x={href:"https://github.com/kubernetes-sigs/external-dns",target:"_blank",rel:"noopener noreferrer"},D={href:"https://github.com/JasonvanBrackel/kubernetes-external-dns-in-rancher",target:"_blank",rel:"noopener noreferrer"},N=d(`<p>ExternalDNS 也是为了图镜像易于访问直接使用 Bitnami Chart</p><div class="hint-container tip"><p class="hint-container-title">ExternalDNS</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> values.ExternalDNS.yaml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
txtOwnerId: k8s-240
provider: coredns
coredns:
  etcdEndpoints: &quot;http://etcd.devops-dns.svc.cluster.local:2379&quot;
EOF</span>
helm repo <span class="token function">add</span> bitnami https://charts.bitnami.com/bitnami
helm repo update
<span class="token comment">## helm pull bitnami/external-dns --version 6.7.4</span>
helm upgrade external-dns bitnami/external-dns <span class="token parameter variable">--install</span> <span class="token parameter variable">--namespace</span> devops-dns --create-namespace <span class="token parameter variable">--values</span> values.ExternalDNS.yaml <span class="token parameter variable">--version</span> <span class="token number">6.7</span>.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><blockquote><p>日志：当 Ingress 资源变动时可以从<code>ExternalDNS</code>的日志中看到新的 DNS 记录被写入到 ETCD 中。</p></blockquote><h3 id="修改集群的dns" tabindex="-1"><a class="header-anchor" href="#修改集群的dns" aria-hidden="true">#</a> 修改集群的DNS</h3><blockquote><p>将集群内的 CoreDNS 兜底转发到自建 DNS</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 查看自建的coredns在集群内的ip地址</span>
kubectl <span class="token parameter variable">-n</span> etcd get svc <span class="token operator">|</span> <span class="token function">grep</span> coredns
kubectl <span class="token parameter variable">-n</span> kube-system edit ConfigMap coredns
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">## 指定域名的转发规则</span>
devops.kk<span class="token punctuation">:</span>53 <span class="token punctuation">{</span>
    errors
    forward . 10.233.46.37
    loop
    reload
<span class="token punctuation">}</span>
devops.tr<span class="token punctuation">:</span>53 <span class="token punctuation">{</span>
    errors
    forward . 10.233.46.37
    loop
    reload
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>将集群内的 CoreDNS 兜底转发到自建 DNS</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">## kubectl -n kube-system get ConfigMap nodelocaldns -o yaml</span>

devops.kk<span class="token punctuation">:</span>53 <span class="token punctuation">{</span>
    errors
    cache 30
    reload
    loop
    bind 169.254.25.10
    forward . 10.233.46.37
<span class="token punctuation">}</span>
devops.tr<span class="token punctuation">:</span>53 <span class="token punctuation">{</span>
    errors
    cache 30
    reload
    loop
    bind 169.254.25.10
    forward . 10.233.46.37
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> nginx.yaml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 2
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:alpine
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx-ingress
  annotations:
    kubernetes.io/ingress.class: &quot;nginx&quot;
    external-dns.alpha.kubernetes.io/hostname: &quot;nginx.devops.kk&quot;
spec:
  rules:
  - host: nginx.devops.kk
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nginx-service
            port:
              number: 80
EOF</span>
kubectl apply <span class="token parameter variable">-f</span> nginx.yaml
kubectl get all
kubectl get ingress
kubectl <span class="token parameter variable">-n</span> etcd get svc
kubectl <span class="token parameter variable">-n</span> kube-system get svc
<span class="token comment">## 下面两个地址都可以解析域名 nginx.devops.kk 即成功</span>
<span class="token function">nslookup</span> nginx.devops.kk <span class="token number">10.233</span>.46.37
<span class="token function">nslookup</span> nginx.devops.kk <span class="token number">10.233</span>.0.3
<span class="token comment">## 删除测试资源</span>
kubectl delete <span class="token parameter variable">-f</span> nginx.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11);function _(S,y){const a=r("router-link"),l=r("ExternalLinkIcon");return c(),o("div",null,[v(" more "),n("nav",m,[n("ul",null,[n("li",null,[s(a,{to:"#coredns"},{default:i(()=>[e("CoreDns")]),_:1})]),n("li",null,[s(a,{to:"#dns-调试"},{default:i(()=>[e("DNS 调试")]),_:1})]),n("li",null,[s(a,{to:"#打通ingress的域名访问"},{default:i(()=>[e("打通Ingress的域名访问")]),_:1}),n("ul",null,[n("li",null,[s(a,{to:"#目的"},{default:i(()=>[e("目的")]),_:1})]),n("li",null,[s(a,{to:"#实践方案"},{default:i(()=>[e("实践方案")]),_:1})]),n("li",null,[s(a,{to:"#自建-etcd"},{default:i(()=>[e("自建 ETCD")]),_:1})]),n("li",null,[s(a,{to:"#安装自建-coredns"},{default:i(()=>[e("安装自建 CoreDNS")]),_:1})]),n("li",null,[s(a,{to:"#安装externaldns"},{default:i(()=>[e("安装ExternalDNS")]),_:1})]),n("li",null,[s(a,{to:"#修改集群的dns"},{default:i(()=>[e("修改集群的DNS")]),_:1})]),n("li",null,[s(a,{to:"#测试"},{default:i(()=>[e("测试")]),_:1})])])])])]),b,n("blockquote",null,[n("p",null,[e("官网地址："),n("a",k,[e("https://coredns.io/"),s(l)])]),n("p",null,[e("Kubernetes DNS 服务: "),n("a",h,[e("https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/dns-custom-nameservers/"),s(l)])])]),g,n("ul",null,[n("li",null,[e("bitnami chart: "),n("a",f,[e("https://artifacthub.io/packages/helm/bitnami/external-dns"),s(l)])]),n("li",null,[n("a",x,[e("https://github.com/kubernetes-sigs/external-dns"),s(l)])]),n("li",null,[n("a",D,[e("https://github.com/JasonvanBrackel/kubernetes-external-dns-in-rancher"),s(l)])])]),N])}const w=t(u,[["render",_],["__file","10.kubernetes中的DNS.html.vue"]]);export{w as default};
