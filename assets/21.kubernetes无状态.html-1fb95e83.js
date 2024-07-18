import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as i,c,e as o,a as n,d as s,w as e,f as u,b as l}from"./app-efa5e96e.js";const d="/blog/assets/pod-0904d494.png",r="/blog/assets/service-655baddb.png",k={},v={class:"table-of-contents"},m=u('<h2 id="无状态" tabindex="-1"><a class="header-anchor" href="#无状态" aria-hidden="true">#</a> 无状态</h2><blockquote><p>就是没有特殊状态的服务,各个请求对于服务器来说统一无差别处理,请求自身携带了所有服务端所需要的所有参数。没有要实时保存的数据。</p></blockquote><h2 id="pod" tabindex="-1"><a class="header-anchor" href="#pod" aria-hidden="true">#</a> Pod</h2><blockquote><p>Pod是一个逻辑概念，它是Kubernetes资源调度的单元，一般会把一组功能强相关的容器逻辑上称之为一个pod,Pod就是所说的实例。</p><p>缺点: 不支持高并发, 高可用, 当Pod当机后无法自动恢复。</p></blockquote><figure><img src="'+d+`" alt="pod" tabindex="0" loading="lazy"><figcaption>pod</figcaption></figure><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1 
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod 
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> demo 
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
  <span class="token comment">## 获取镜像策略 Always | Never | IfNotPresent</span>
  <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> Always
  <span class="token comment">## pod重启策略 Always | OnFailure | Never</span>
  <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> kubectl get pod <span class="token parameter variable">-A</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="replicationcontroller" tabindex="-1"><a class="header-anchor" href="#replicationcontroller" aria-hidden="true">#</a> ReplicationController</h2><blockquote><p>ReplicationController（简称rc）是pod的复制抽象，用于解决pod的扩容缩容问题。</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ReplicaSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> demo<span class="token punctuation">-</span>rc
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> demo<span class="token punctuation">-</span>rc
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> demo<span class="token punctuation">-</span>rc
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> demo<span class="token punctuation">-</span>rc
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> httpd
        <span class="token key atrule">image</span><span class="token punctuation">:</span> httpd
        <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> Always
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl create <span class="token parameter variable">-f</span> replicaset.yaml
kubectl get replicaset
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="service" tabindex="-1"><a class="header-anchor" href="#service" aria-hidden="true">#</a> Service</h2><blockquote><p>service是pod的路由代理抽象，用于解决pod之间的服务发现问题，即上下游pod之间使用的问题。</p></blockquote><figure><img src="`+r+`" alt="service" tabindex="0" loading="lazy"><figcaption>service</figcaption></figure><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> demo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">80</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> httpd<span class="token punctuation">-</span>demo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> svc.yaml
kubectl get svc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="lable" tabindex="-1"><a class="header-anchor" href="#lable" aria-hidden="true">#</a> Lable</h2><blockquote><p>标签用于区分对象（比如Pod、Service），键/值对存在；每个对象可以有多个标签，通过标签关联对象。</p></blockquote><h2 id="pod-1" tabindex="-1"><a class="header-anchor" href="#pod-1" aria-hidden="true">#</a> POD</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get pod,deployment,service,secret,configmap,endpoints <span class="token parameter variable">-A</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="deployment-应用管理者" tabindex="-1"><a class="header-anchor" href="#deployment-应用管理者" aria-hidden="true">#</a> Deployment（应用管理者）</h2><blockquote><p>Deployment在继承Pod和Replicaset的所有特性的同时, 它可以实现对template模板进行实时滚动更新并具备我们线上的Application life circle的特性.</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> httpd<span class="token punctuation">-</span>deployment
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> httpd<span class="token punctuation">-</span>deployment
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> httpd<span class="token punctuation">-</span>demo
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> httpd<span class="token punctuation">-</span>demo
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> httpd
        <span class="token key atrule">image</span><span class="token punctuation">:</span> httpd
        <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> Always
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> VERSION
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;v1&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl create <span class="token parameter variable">-f</span> deployment.yaml
kubectl get deployment
kubectl get pods <span class="token parameter variable">-o</span> wide
kubectl describe deployment
<span class="token comment">## 编辑Deployment</span>
kubectl edit <span class="token parameter variable">-f</span> deployment.yaml
kubectl apply <span class="token parameter variable">-f</span> deployment.yaml
<span class="token comment">## 扩容与缩容</span>
kubectl scale deployment/httpd-deployment <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token comment">## 删除Deployment</span>
kubectl delete deployment httpd-deployment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24);function b(y,h){const a=p("router-link");return i(),c("div",null,[o(" more "),n("nav",v,[n("ul",null,[n("li",null,[s(a,{to:"#无状态"},{default:e(()=>[l("无状态")]),_:1})]),n("li",null,[s(a,{to:"#pod"},{default:e(()=>[l("Pod")]),_:1})]),n("li",null,[s(a,{to:"#replicationcontroller"},{default:e(()=>[l("ReplicationController")]),_:1})]),n("li",null,[s(a,{to:"#service"},{default:e(()=>[l("Service")]),_:1})]),n("li",null,[s(a,{to:"#lable"},{default:e(()=>[l("Lable")]),_:1})]),n("li",null,[s(a,{to:"#pod-1"},{default:e(()=>[l("POD")]),_:1})]),n("li",null,[s(a,{to:"#deployment-应用管理者"},{default:e(()=>[l("Deployment（应用管理者）")]),_:1})])])]),m])}const _=t(k,[["render",b],["__file","21.kubernetes无状态.html.vue"]]);export{_ as default};
