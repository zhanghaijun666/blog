import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as c,c as i,a as n,d as a,w as e,f as u,b as t}from"./app-efa5e96e.js";const o={},r={class:"table-of-contents"},k=u(`<blockquote><p>MySQL 示例部署包含一个ConfigMap、两个存储挂载pv和pvc、两个 Service 与一个 StatefulSet。</p></blockquote><h2 id="configmap" tabindex="-1"><a class="header-anchor" href="#configmap" aria-hidden="true">#</a> ConfigMap</h2><blockquote><p>cat mysql-master-cnf.yaml</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#master--my.cnf</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>master<span class="token punctuation">-</span>cnf
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> bc<span class="token punctuation">-</span>cnp
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">my.cnf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
    <span class="token punctuation">[</span>client<span class="token punctuation">]</span>
    default<span class="token punctuation">-</span>character<span class="token punctuation">-</span>set=utf8
    <span class="token punctuation">[</span>mysql<span class="token punctuation">]</span>
    default<span class="token punctuation">-</span>character<span class="token punctuation">-</span>set=utf8
    <span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>
    init_connect=&#39;SET collation_connection = utf8_unicode_ci&#39;
    init_connect=&#39;SET NAMES utf8&#39;
    character<span class="token punctuation">-</span>set<span class="token punctuation">-</span>server=utf8
    collation<span class="token punctuation">-</span>server=utf8_unicode_ci
    skip<span class="token punctuation">-</span>character<span class="token punctuation">-</span>set<span class="token punctuation">-</span>client<span class="token punctuation">-</span>handshake
    skip<span class="token punctuation">-</span>name<span class="token punctuation">-</span>resolve
    server_id=1
    log<span class="token punctuation">-</span>bin=mysql<span class="token punctuation">-</span>bin
    read<span class="token punctuation">-</span>only=0
    replicate<span class="token punctuation">-</span>ignore<span class="token punctuation">-</span>db=mysql
    replicate<span class="token punctuation">-</span>ignore<span class="token punctuation">-</span>db=sys
    replicate<span class="token punctuation">-</span>ignore<span class="token punctuation">-</span>db=information_schema
    replicate<span class="token punctuation">-</span>ignore<span class="token punctuation">-</span>db=performance_schema
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>添加配置</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> mysql-master-cnf.yaml
kubectl get cm <span class="token parameter variable">-n</span> bc-cnp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pv和pvc" tabindex="-1"><a class="header-anchor" href="#pv和pvc" aria-hidden="true">#</a> pv和pvc</h2><blockquote><p>cat mysql-sc.yaml</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token comment">#master--pv</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>pv<span class="token punctuation">-</span>master
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 10Gi
  <span class="token key atrule">local</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /home/k8s/master/data
  <span class="token key atrule">nodeAffinity</span><span class="token punctuation">:</span>
    <span class="token key atrule">required</span><span class="token punctuation">:</span>
      <span class="token key atrule">nodeSelectorTerms</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> kubernetes.io/hostname
          <span class="token key atrule">operator</span><span class="token punctuation">:</span> In
          <span class="token key atrule">values</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> paas<span class="token punctuation">-</span>cnp<span class="token punctuation">-</span>k8s<span class="token punctuation">-</span>kce<span class="token punctuation">-</span><span class="token number">01</span>  
<span class="token punctuation">---</span>
<span class="token comment">#master--pvc</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>pvc<span class="token punctuation">-</span>master
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> bc<span class="token punctuation">-</span>cnp
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 10Gi
  <span class="token key atrule">volumeName</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>pv<span class="token punctuation">-</span>master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> mysql-sc.yaml
kubectl get pvc <span class="token parameter variable">-n</span> bc-cnp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="service" tabindex="-1"><a class="header-anchor" href="#service" aria-hidden="true">#</a> Service</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#master--headless service</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> bc<span class="token punctuation">-</span>cnp
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>master
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">kubesphere.io/serviceType</span><span class="token punctuation">:</span> statefulservice
    <span class="token key atrule">kubesphere.io/alias-name</span><span class="token punctuation">:</span> mysql主节点
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>master
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">sessionAffinity</span><span class="token punctuation">:</span> ClientIP
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>master
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tcp<span class="token punctuation">-</span><span class="token number">3306</span>
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> tcp<span class="token punctuation">-</span><span class="token number">33060</span>
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">33060</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">33060</span>
  <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span> None
  <span class="token key atrule">sessionAffinityConfig</span><span class="token punctuation">:</span>
    <span class="token key atrule">clientIP</span><span class="token punctuation">:</span>
      <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">10800</span>

<span class="token punctuation">---</span>
<span class="token comment">#master--nodePort service</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>master<span class="token punctuation">-</span>front
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>master
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> bc<span class="token punctuation">-</span>cnp
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>master
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span>
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
      <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">30001</span>  
  <span class="token key atrule">sessionAffinity</span><span class="token punctuation">:</span> None
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> mysql-master-services.yaml 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="statefulset" tabindex="-1"><a class="header-anchor" href="#statefulset" aria-hidden="true">#</a> StatefulSet</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#master--statefulset</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> StatefulSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> bc<span class="token punctuation">-</span>cnp
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>master
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>master
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">kubesphere.io/alias-name</span><span class="token punctuation">:</span> mysql master
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>master
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>master
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> master<span class="token punctuation">-</span>container
         <span class="token comment"># type: worker</span>
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
          <span class="token key atrule">resources</span><span class="token punctuation">:</span>
            <span class="token key atrule">requests</span><span class="token punctuation">:</span>
              <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token string">&#39;2&#39;</span>
              <span class="token key atrule">memory</span><span class="token punctuation">:</span> 8Gi
            <span class="token key atrule">limits</span><span class="token punctuation">:</span>
              <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token string">&#39;4&#39;</span>
              <span class="token key atrule">memory</span><span class="token punctuation">:</span> 16Gi
          <span class="token key atrule">image</span><span class="token punctuation">:</span> nexus.cmss.com<span class="token punctuation">:</span>8086/cnp/mysql<span class="token punctuation">:</span>8.0.18
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_ROOT_PASSWORD
              <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
                <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
                  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>secret
                  <span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_ROOT_PASSWORD
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> master<span class="token punctuation">-</span>cnf<span class="token punctuation">-</span>volume
              <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /etc/mysql
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> master<span class="token punctuation">-</span>data<span class="token punctuation">-</span>volume
              <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/lib/mysql<span class="token punctuation">-</span>files
      <span class="token key atrule">serviceAccount</span><span class="token punctuation">:</span> default
      <span class="token key atrule">affinity</span><span class="token punctuation">:</span>
        <span class="token key atrule">podAntiAffinity</span><span class="token punctuation">:</span>
          <span class="token key atrule">preferredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">100</span>
              <span class="token key atrule">podAffinityTerm</span><span class="token punctuation">:</span>
                <span class="token key atrule">labelSelector</span><span class="token punctuation">:</span>
                  <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
                    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>master
                <span class="token key atrule">topologyKey</span><span class="token punctuation">:</span> kubernetes.io/hostname
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> master<span class="token punctuation">-</span>cnf<span class="token punctuation">-</span>volume
          <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>master<span class="token punctuation">-</span>cnf
            <span class="token key atrule">items</span><span class="token punctuation">:</span>
              <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> my.cnf
                <span class="token key atrule">path</span><span class="token punctuation">:</span> my.cnf
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> master<span class="token punctuation">-</span>data<span class="token punctuation">-</span>volume
          <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>
            <span class="token key atrule">claimName</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>pvc<span class="token punctuation">-</span>master
  <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> mysql-master-statefulset.yaml
kubectl get pods -nbc-cnp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="主从同步" tabindex="-1"><a class="header-anchor" href="#主从同步" aria-hidden="true">#</a> 主从同步</h2><blockquote><p>进入mysql-master容器内部</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1.进入mysql内部</span>
<span class="token operator">&gt;</span>  mysql <span class="token parameter variable">-uroot</span> -pdsjbi@Min1a
<span class="token comment">#切换到 mysql DB</span>
mysql<span class="token operator">&gt;</span> USE mysql<span class="token punctuation">;</span>   
<span class="token comment"># 查看root用户是否具备远程访问权限</span>
mysql<span class="token operator">&gt;</span> <span class="token keyword">select</span> Host,User,authentication_string,password_expired,password_last_changed from user<span class="token punctuation">;</span> 
<span class="token comment"># 2.授权 root可以远程访问（主从无关，如root没有访问权限，执行以下命令，方便我们远程连接MySQL）</span>
mysql<span class="token operator">&gt;</span> create user <span class="token string">&#39;root&#39;</span>@<span class="token string">&#39;%&#39;</span> identified by <span class="token string">&#39;dsjbi@Min1a&#39;</span><span class="token punctuation">;</span>
Query OK, <span class="token number">0</span> rows affected, <span class="token number">1</span> warning <span class="token punctuation">(</span><span class="token number">0.00</span> sec<span class="token punctuation">)</span>

mysql<span class="token operator">&gt;</span> grant all privileges on *.* to <span class="token string">&#39;root&#39;</span>@<span class="token string">&#39;%&#39;</span><span class="token punctuation">;</span>
Query OK, <span class="token number">0</span> rows affected, <span class="token number">1</span> warning <span class="token punctuation">(</span><span class="token number">0.00</span> sec<span class="token punctuation">)</span>

mysql<span class="token operator">&gt;</span> flush privileges<span class="token punctuation">;</span>
Query OK, <span class="token number">0</span> rows affected <span class="token punctuation">(</span><span class="token number">0.00</span> sec<span class="token punctuation">)</span>
<span class="token comment"># 3.添加用来同步的用户</span>
mysql<span class="token operator">&gt;</span> GRANT REPLICATION SLAVE ON *.* to <span class="token string">&#39;backup&#39;</span>@<span class="token string">&#39;%&#39;</span> identified by <span class="token string">&#39;dsjbi@Min1a&#39;</span><span class="token punctuation">;</span>
Query OK, <span class="token number">0</span> rows affected, <span class="token number">1</span> warning <span class="token punctuation">(</span><span class="token number">0.01</span> sec<span class="token punctuation">)</span>
<span class="token comment"># 4.查看master状态</span>
mysql<span class="token operator">&gt;</span> show master status<span class="token punctuation">\\</span>G<span class="token punctuation">;</span>
*************************** <span class="token number">1</span>. row ***************************
             File: mysql-bin.000003
         Position: <span class="token number">2688</span>
     Binlog_Do_DB:
 Binlog_Ignore_DB:
Executed_Gtid_Set:
<span class="token number">1</span> row <span class="token keyword">in</span> <span class="token builtin class-name">set</span> <span class="token punctuation">(</span><span class="token number">0.00</span> sec<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>然后进入到mysql-slave内部</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token comment"># 进入mysql内部</span>
mysql <span class="token parameter variable">-uroot</span> -pdsjbi@Min1a
<span class="token comment"># 设置主库连接  主库 dns: mysql-master.default.svc.cluster.local</span>
change master to <span class="token assign-left variable">master_host</span><span class="token operator">=</span><span class="token string">&#39;mysql-master.bc-cnp.svc.cluster.local&#39;</span>,master_user<span class="token operator">=</span><span class="token string">&#39;backup&#39;</span>,master_password<span class="token operator">=</span><span class="token string">&#39;dsjbi@Min1a&#39;</span>,master_log_file<span class="token operator">=</span><span class="token string">&#39;mysql_bin.000003&#39;</span>,master_log_pos<span class="token operator">=</span><span class="token number">0</span>,master_port<span class="token operator">=</span><span class="token number">3306</span><span class="token punctuation">;</span>
<span class="token comment"># 启动从库同步</span>
start slave<span class="token punctuation">;</span>
<span class="token comment"># 查看从从库状态</span>
show slave status<span class="token punctuation">\\</span>G<span class="token punctuation">;</span>

<span class="token comment">## 如果同步不成功，尝试执行以下命令，再次查看。</span>
stop slave<span class="token punctuation">;</span>
reset slave<span class="token punctuation">;</span>
start slave<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21);function d(v,m){const s=l("router-link");return c(),i("div",null,[n("nav",r,[n("ul",null,[n("li",null,[a(s,{to:"#configmap"},{default:e(()=>[t("ConfigMap")]),_:1})]),n("li",null,[a(s,{to:"#pv和pvc"},{default:e(()=>[t("pv和pvc")]),_:1})]),n("li",null,[a(s,{to:"#service"},{default:e(()=>[t("Service")]),_:1})]),n("li",null,[a(s,{to:"#statefulset"},{default:e(()=>[t("StatefulSet")]),_:1})]),n("li",null,[a(s,{to:"#主从同步"},{default:e(()=>[t("主从同步")]),_:1})])])]),k])}const g=p(o,[["render",d],["__file","30.MySQL主从.html.vue"]]);export{g as default};
