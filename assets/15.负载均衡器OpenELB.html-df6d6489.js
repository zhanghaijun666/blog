import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as p,c as o,e as c,a as e,d as a,w as l,b as n,f as d}from"./app-efa5e96e.js";const v={},b={class:"table-of-contents"},m=e("h2",{id:"_1、openelb-介绍",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1、openelb-介绍","aria-hidden":"true"},"#"),n(" 1、OpenELB 介绍")],-1),u={href:"https://openelb.io/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://github.com/openelb/openelb",target:"_blank",rel:"noopener noreferrer"},h=e("p",null,[e("code",null,"OpenELB"),n(" 是由 "),e("code",null,"KubeSphere"),n(" 开发团队设计、经过 CNCF 认证的一款负载均衡插件。")],-1),g=e("p",null,[n("它可以在裸金属服务器、边缘以及虚拟化的"),e("code",null,"Kubernetes"),n("环境中使用 "),e("code",null,"LoadBalancer"),n(" 类型的 "),e("code",null,"Service"),n(" 对外暴露服务。")],-1),f=d(`<h2 id="_2、安装openelb" tabindex="-1"><a class="header-anchor" href="#_2、安装openelb" aria-hidden="true">#</a> 2、安装OpenELB</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 1、helm安装（推荐）</span>
helm repo <span class="token function">add</span> <span class="token builtin class-name">test</span> https://charts.kubesphere.io/test
helm repo update
helm <span class="token function">install</span> openelb test/openelb <span class="token parameter variable">--namespace</span><span class="token operator">=</span>kube-devops --create-namespace


<span class="token comment">## 2、直接使用kubectl安装</span>
kubectl apply <span class="token parameter variable">-f</span> https://raw.githubusercontent.com/openelb/openelb/master/deploy/openelb.yaml
kubectl get crd <span class="token operator">|</span> <span class="token function">grep</span> network.kubesphere.io
kubectl get pod <span class="token parameter variable">-n</span> openelb-system
kubectl get deployment <span class="token parameter variable">-n</span> openelb-system
kubectl get svc <span class="token parameter variable">-n</span> openelb-system
kubectl get jobs.batch <span class="token parameter variable">-n</span> openelb-system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、配置地址池" tabindex="-1"><a class="header-anchor" href="#_3、配置地址池" aria-hidden="true">#</a> 3、配置地址池</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 1.开启\`kube-proxy\`的\`strictARP\`为修改false为true</span>
kubectl get configmap <span class="token parameter variable">-n</span> kube-system kube-proxy <span class="token parameter variable">-o</span> yaml <span class="token operator">|</span> <span class="token function">grep</span> strictARP
<span class="token comment">#kubectl edit configmap kube-proxy -n kube-system</span>
<span class="token comment"># 使用命令直接修改并对比不同</span>
kubectl get configmap kube-proxy <span class="token parameter variable">-n</span> kube-system <span class="token parameter variable">-o</span> yaml <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;s/strictARP: false/strictARP: true/&quot;</span> <span class="token operator">|</span> kubectl <span class="token function">diff</span> <span class="token parameter variable">-f</span> - <span class="token parameter variable">-n</span> kube-system
<span class="token comment"># 确认无误后使用命令直接修改并生效</span>
kubectl get configmap kube-proxy <span class="token parameter variable">-n</span> kube-system <span class="token parameter variable">-o</span> yaml <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;s/strictARP: false/strictARP: true/&quot;</span> <span class="token operator">|</span> kubectl apply <span class="token parameter variable">-f</span> - <span class="token parameter variable">-n</span> kube-system
<span class="token comment"># 重启kube-proxy</span>
kubectl rollout restart daemonset kube-proxy <span class="token parameter variable">-n</span> kube-system

<span class="token comment">## 2.创建地址池（eip）</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> eip-pool.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
apiVersion: network.kubesphere.io/v1alpha2
kind: Eip
metadata:
  name: eip-pool
  annotations:
    ## 默认的地址池
    eip.openelb.kubesphere.io/is-default-eip: &quot;true&quot;
spec:
  # Eip 对象的地址池
  address: 192.168.60.100-192.168.60.105
  # OpenELB 在其上侦听 ARP/NDP 请求的网卡。该字段仅在protocol设置为时有效layer2。
  interface: eth0
  # openELB的运行模式，默认为bgp
  protocol: layer2
  # 指定是否禁用Eip对象: false表示可以继续分配 | true表示不再继续分配
  disable: false
EOF</span>
kubectl apply <span class="token parameter variable">-f</span> eip-pool.yaml
kubectl get eip <span class="token parameter variable">-o</span> yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4、测试负载均衡器" tabindex="-1"><a class="header-anchor" href="#_4、测试负载均衡器" aria-hidden="true">#</a> 4、测试负载均衡器</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> nginx.yaml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
  namespace: default
spec:
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
        image: nginx:latest
        ports:
        - name: http
          containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx
  namespace: default
spec:
  allocateLoadBalancerNodePorts: false
  externalTrafficPolicy: Cluster
  internalTrafficPolicy: Cluster
  selector:
    app: nginx
  ports:
  - name: http
    port: 80
    protocol: TCP
    targetPort: 80
  type: LoadBalancer
EOF</span>
kubectl apply <span class="token parameter variable">-f</span> nginx.yaml
kubectl get svc <span class="token parameter variable">-n</span> default nginx <span class="token parameter variable">-o</span> yaml <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;allocateLoadBalancerNodePorts:&quot;</span>

<span class="token comment">## 指定VIP</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> service.yaml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
apiVersion: v1
kind: Service
metadata:
  name: nginx2
  namespace: default
  annotations:
    lb.kubesphere.io/v1alpha1: openelb
    protocol.openelb.kubesphere.io/v1alpha1: layer2
    eip.openelb.kubesphere.io/v1alpha2: eip-pool
spec:
  allocateLoadBalancerNodePorts: false
  externalTrafficPolicy: Cluster
  internalTrafficPolicy: Cluster
  selector:
    app: nginx
  ports:
  - name: http-80
    port: 80
    protocol: TCP
    targetPort: 80
  type: LoadBalancer
  loadBalancerIP: 192.168.60.101
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5、openelb-高可用" tabindex="-1"><a class="header-anchor" href="#_5、openelb-高可用" aria-hidden="true">#</a> 5、OpenELB 高可用</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 多网卡绑定 | 指定 OpenELB 使用的网卡</span>
kubectl describe <span class="token function">node</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-A5</span> Annotations
kubectl annotate nodes master1 layer2.openelb.kubesphere.io/v1alpha1<span class="token operator">=</span><span class="token string">&quot;192.168.60.91&quot;</span>
<span class="token function">ip</span> neigh <span class="token operator">|</span> <span class="token function">grep</span> ens192

<span class="token comment">## 我们给集群内的三个节点都打上label</span>
kubectl label <span class="token parameter variable">--overwrite</span> nodes node01 node02 lb.kubesphere.io/v1alpha1<span class="token operator">=</span>openelb
<span class="token comment">## 查看当前节点的labels</span>
kubectl get nodes <span class="token parameter variable">-o</span> wide --show-labels<span class="token operator">=</span>true <span class="token operator">|</span> <span class="token function">grep</span> openelb

<span class="token comment">## 然后我们先把副本的数量缩容到0。</span>
kubectl scale deployment openelb-manager <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">0</span> <span class="token parameter variable">-n</span> openelb-system
<span class="token comment">## 修改配置</span>
kubectl get deployment openelb-manager <span class="token parameter variable">-n</span> openelb-system <span class="token parameter variable">-o</span> yaml
<span class="token comment">#     nodeSelector:</span>
<span class="token comment">#       kubernetes.io/os: linux</span>
<span class="token comment">#       lb.kubesphere.io/v1alpha1: openelb</span>
<span class="token comment">## 扩容副本数量到3。</span>
kubectl scale deployment openelb-manager <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">3</span> <span class="token parameter variable">-n</span> openelb-system
<span class="token comment">## 检查deployment状态</span>
kubectl get pod <span class="token parameter variable">-n</span> openelb-system <span class="token parameter variable">-o</span> wide
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function _(y,x){const s=t("router-link"),i=t("ExternalLinkIcon");return p(),o("div",null,[c(" more "),e("nav",b,[e("ul",null,[e("li",null,[a(s,{to:"#_1、openelb-介绍"},{default:l(()=>[n("1、OpenELB 介绍")]),_:1})]),e("li",null,[a(s,{to:"#_2、安装openelb"},{default:l(()=>[n("2、安装OpenELB")]),_:1})]),e("li",null,[a(s,{to:"#_3、配置地址池"},{default:l(()=>[n("3、配置地址池")]),_:1})]),e("li",null,[a(s,{to:"#_4、测试负载均衡器"},{default:l(()=>[n("4、测试负载均衡器")]),_:1})]),e("li",null,[a(s,{to:"#_5、openelb-高可用"},{default:l(()=>[n("5、OpenELB 高可用")]),_:1})])])]),m,e("blockquote",null,[e("p",null,[n("官网地址："),e("a",u,[n("https://openelb.io/"),a(i)])]),e("p",null,[n("GitHub 地址："),e("a",k,[n("https://github.com/openelb/openelb"),a(i)])]),h,g]),f])}const P=r(v,[["render",_],["__file","15.负载均衡器OpenELB.html.vue"]]);export{P as default};
