import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as r,c as p,e as c,a as n,d as a,w as e,f as d,b as l}from"./app-efa5e96e.js";const m={},o={class:"table-of-contents"},v=d(`<h2 id="快速入门" tabindex="-1"><a class="header-anchor" href="#快速入门" aria-hidden="true">#</a> 快速入门</h2><ul><li>无状态服务：<br><br> 就是没有特殊状态的服务,各个请求对于服务器来说统一无差别处理,请求自身携带了所有服务端所需要的所有参数。<br><br> 没有要实时保存的数据。</li><li>有状态服务：<br><br> 与之相反,有状态服务在服务端保留之前请求的信息,用以处理当前请求。例如：MySQL</li></ul><details class="hint-container details"><summary>常用命令</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 通过get node操作获取集群节点信息。</span>
kubectl get <span class="token function">node</span>
<span class="token comment"># 创建pod ikubernetes/myapp2:v0.7是官方提供的demo镜像</span>
<span class="token comment">#kubectl run nginx-svc --image=nginx:latest --port=80  # nginx镜像</span>
kubectl run my-app <span class="token parameter variable">--image</span><span class="token operator">=</span>ikubernetes/myapp2:v0.7 <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">80</span>
<span class="token comment"># 查看Deployment组件</span>
kubectl get deployment
<span class="token comment"># 查看ReplicaSet组件</span>
kubectl get rs
<span class="token comment"># 查看POD组件</span>
kubectl get pod
kubectl get pod <span class="token parameter variable">-o</span> wide
kubectl get pod --all-namespaces
<span class="token comment"># 删除部门的应用</span>
kubectl delete deployment my-app
<span class="token comment"># 删除全部应用</span>
kubectl delete deployment <span class="token parameter variable">--all</span>
kubectl delete rs <span class="token parameter variable">--all</span>
kubectl delete pod <span class="token parameter variable">--all</span>
<span class="token comment"># 扩容</span>
kubectl scale deployment my-app <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">3</span>
<span class="token comment"># 创建service(复制均衡和服务的发现)</span>
kubectl expose deployment my-app --target-port<span class="token operator">=</span><span class="token number">80</span> <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">80</span>
<span class="token comment"># 查看service组件</span>
kubectl get svc
kubectl get svc <span class="token parameter variable">-o</span> wide
kubectl describe <span class="token function">service</span> my-app
<span class="token comment"># 查看默认是轮询规则</span>
<span class="token function">curl</span> <span class="token number">10.100</span>.127.104
<span class="token comment"># 可查看负载负载均衡执行情况</span>
<span class="token function">curl</span> <span class="token number">10.100</span>.127.104/hostname
<span class="token comment"># 此时外网还访问不到service，需要配置iptabels的转发规则或者ssh的转发</span>
<span class="token comment"># ssh端口转发（本地执行）</span>
<span class="token function">ssh</span> <span class="token parameter variable">-L</span> <span class="token number">7777</span>:10.111.63.238:80 root@192.16.18.111
<span class="token comment"># 输入root密码验证，在不登出的情况下。本地访问 http://localhost:7777 即可</span>

<span class="token comment"># iptables端口转发（存在问题，那位大神可以指点一二）</span>
<span class="token comment"># 开启允许转发</span>
<span class="token function">sysctl</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">net.ipv4.ip_forward</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token comment"># 清除iptables nat</span>
iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-F</span>
<span class="token comment"># 查看现用所有iptables规则</span>
iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-L</span> <span class="token parameter variable">-n</span> --line-number
<span class="token comment"># 添加端口转发规则</span>
<span class="token comment"># 规则解释:在forward表里添加规则,允许转发向6666端口转发的tcp连接数据</span>
iptables <span class="token parameter variable">-I</span> FORWARD <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">6666</span> <span class="token parameter variable">-j</span> ACCEPT
iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-I</span> PREROUTING <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">6666</span> <span class="token parameter variable">-j</span> DNAT --to-destination <span class="token number">10.111</span>.63.238:80
iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-I</span> POSTROUTING <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">80</span> <span class="token parameter variable">-j</span> MASQUERADE
<span class="token function">service</span> iptables save
<span class="token function">service</span> iptables restart

iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> OUTPUT <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">6666</span>  <span class="token parameter variable">-j</span> DNAT --to-destination <span class="token number">10.111</span>.63.238:80
iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">6666</span> <span class="token parameter variable">-j</span> DNAT --to-destination <span class="token number">10.111</span>.63.238:80
iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> POSTROUTING <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-d</span> <span class="token number">10.111</span>.63.238   <span class="token parameter variable">--dport</span> <span class="token number">80</span> <span class="token parameter variable">-j</span> SNAT --to-source <span class="token number">192.16</span>.18.111

<span class="token comment"># 查看ip的映射规则</span>
ipvsadm <span class="token parameter variable">-Ln</span>
<span class="token comment"># 查看apiVersion</span>
kubectl api-versions
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="指令部署" tabindex="-1"><a class="header-anchor" href="#指令部署" aria-hidden="true">#</a> 指令部署</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建doploymnet</span>
kubectl run my-app <span class="token parameter variable">--image</span><span class="token operator">=</span>ikubernetes/myapp2:v0.7 <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">80</span>
<span class="token comment"># 扩容为3个pod</span>
kubectl scale deployment my-app <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">3</span>
<span class="token comment"># 创建service 默认service.type=ClusterIP(外网不可以直接访问) LoadBalancer外网可以直接访问</span>
kubectl expose deployment my-app <span class="token parameter variable">--type</span><span class="token operator">=</span>LoadBalancer <span class="token parameter variable">--name</span><span class="token operator">=</span>my-app-service
<span class="token comment">#kubectl expose deployment my-app --target-port=80 --port=80 --name=my-app-service</span>
<span class="token comment"># 查看service</span>
kubectl get svc

<span class="token punctuation">[</span>root@k8s-master-111 ~<span class="token punctuation">]</span><span class="token comment"># kubectl get svc</span>
NAME                 TYPE           CLUSTER-IP       EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>          AGE
my-app-service   LoadBalancer   <span class="token number">10.105</span>.63.149    <span class="token operator">&lt;</span>pending<span class="token operator">&gt;</span>     <span class="token number">8080</span>:32622/TCP   53m

<span class="token function">curl</span> <span class="token number">192.16</span>.18.111:32622

<span class="token comment"># 删除</span>
kubectl delete svc my-app-service
kubectl delete deployment my-app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="yaml-部署" tabindex="-1"><a class="header-anchor" href="#yaml-部署" aria-hidden="true">#</a> Yaml 部署</h2><details class="hint-container details"><summary>my-nginx.yaml</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx
  namespace: default
spec:
  replicas: <span class="token number">3</span>
  selector:
    matchLabels:
      app: my-nginx
      release: stable
  template:
    metadata:
      labels:
        app: my-nginx
        release: stable
        env: <span class="token builtin class-name">test</span>
    spec:
      containers:
      - name: my-nginx
        image: nginx:latest
        ports:
        - name: http
          containerPort: <span class="token number">80</span>

---
apiVersion: v1
kind: Service
metadata:
  name: my-nginx
  namespace: default
spec:
  type: NodePort
  selector:
    app: my-nginx
    release: stable
  ports:
    - name: http
      port: <span class="token number">80</span>
      targetPort: <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl create <span class="token parameter variable">-f</span> my-nginx.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="配置-ingess-域名访问" tabindex="-1"><a class="header-anchor" href="#配置-ingess-域名访问" aria-hidden="true">#</a> 配置 ingess 域名访问</h2><details class="hint-container details"><summary>my-app-ingess.yaml</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: ingress-my-app
  namespace: default
  annotations:
    kubernetes.io/ingress.class: <span class="token string">&quot;nginx&quot;</span>
spec:
  rules:
  - host: myapp.k8s.com
    http:
      paths:
      - path:
        backend:
          serviceName: my-app
          servicePort: <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> my-nginx-ingess.yaml
kubectl get ingress
<span class="token comment"># 需要修改本地hosts文件</span>
<span class="token function">curl</span> http://myapp.k8s.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置-k8s-拉取私有仓库镜像" tabindex="-1"><a class="header-anchor" href="#配置-k8s-拉取私有仓库镜像" aria-hidden="true">#</a> 配置 k8s 拉取私有仓库镜像</h2><blockquote><p>k8s 在默认情况下，只能拉取 harbor 镜像仓库的公有镜像，如果拉取私有仓库镜像，则是会报 ErrImagePull 和 ImagePullBackOff 的错误</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> login <span class="token number">192.168</span>.1.180:8077
<span class="token comment">## 生成\`.docker/config.json\`</span>
<span class="token function">cat</span> ~/.docker/config.json
<span class="token comment">## 对秘钥文件进行base64加密</span>
<span class="token function">cat</span> /root/.docker/config.json <span class="token operator">|</span> base64 <span class="token parameter variable">-w</span> <span class="token number">0</span>
<span class="token comment"># ewoJImF1dGhzIjogewoJCSIxOTIuMTY4LjEuMTgwOjgwNzciOiB7CgkJCSJhdXRoIjogIllXUnRhVzQ2U0dGeVltOXlNVEl6TkRVPSIKCQl9Cgl9Cn0=</span>
<span class="token comment">## 创建docker-secret.yaml</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> docker-secret.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
apiVersion: v1
kind: Secret
metadata:
  name: docker-login
type: kubernetes.io/dockerconfigjson
data:
  .dockerconfigjson: ewoJImF1dGhzIjogewoJCSIxOTIuMTY4LjEuMTgwOjgwNzciOiB7CgkJCSJhdXRoIjogIllXUnRhVzQ2U0dGeVltOXlNVEl6TkRVPSIKCQl9Cgl9Cn0=
EOF</span>
<span class="token comment">## 创建应用</span>
kubectl create <span class="token parameter variable">-f</span> docker-secret.yaml <span class="token parameter variable">-n</span> default
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14);function b(u,k){const s=t("router-link");return r(),p("div",null,[c(" more "),n("nav",o,[n("ul",null,[n("li",null,[a(s,{to:"#快速入门"},{default:e(()=>[l("快速入门")]),_:1})]),n("li",null,[a(s,{to:"#指令部署"},{default:e(()=>[l("指令部署")]),_:1})]),n("li",null,[a(s,{to:"#yaml-部署"},{default:e(()=>[l("Yaml 部署")]),_:1})]),n("li",null,[a(s,{to:"#配置-ingess-域名访问"},{default:e(()=>[l("配置 ingess 域名访问")]),_:1})]),n("li",null,[a(s,{to:"#配置-k8s-拉取私有仓库镜像"},{default:e(()=>[l("配置 k8s 拉取私有仓库镜像")]),_:1})])])]),v])}const y=i(m,[["render",b],["__file","50.K8S实战.html.vue"]]);export{y as default};
