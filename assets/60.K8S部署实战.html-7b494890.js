import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as m,c as t,e as v,a as n,d as s,w as i,b as e,f as r}from"./app-efa5e96e.js";const o={},u={class:"table-of-contents"},p=n("h2",{id:"部署-demo-应用",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#部署-demo-应用","aria-hidden":"true"},"#"),e(" 部署 demo 应用")],-1),b=n("h2",{id:"部署-mysql",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#部署-mysql","aria-hidden":"true"},"#"),e(" 部署 MySQL")],-1),k={href:"https://kubernetes.io/zh/docs/tasks/run-application/run-single-instance-stateful-application/",target:"_blank",rel:"noopener noreferrer"},y=r(`<details class="hint-container details"><summary>mysql-deployment.yaml</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: v1
kind: Service
metadata:
  name: mysql
spec:
  ports:
  - port: <span class="token number">3306</span>
  selector:
    app: mysql
  clusterIP: None
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql
spec:
  selector:
    matchLabels:
      app: mysql
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - image: mysql:5.6
        name: mysql
        env:
          <span class="token comment"># Use secret in real usage</span>
        - name: MYSQL_ROOT_PASSWORD
          value: <span class="token number">123456</span>
        ports:
        - containerPort: <span class="token number">3306</span>
          name: mysql
        volumeMounts:
        - name: mysql-persistent-storage
          mountPath: /var/lib/mysql
      volumes:
      - name: mysql-persistent-storage
        persistentVolumeClaim:
          claimName: mysql-pv-claim
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>mysql-pv.yaml</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: v1
kind: PersistentVolume
metadata:
  name: mysql-pv-volume
  labels:
    type: <span class="token builtin class-name">local</span>
spec:
  storageClassName: manual
  capacity:
    storage: 20Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: <span class="token string">&quot;/mnt/data&quot;</span>
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pv-claim
spec:
  storageClassName: manual
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 部署 YAML 文件中定义的 PV 和 PVC：</span>
kubectl apply <span class="token parameter variable">-f</span> https://k8s.io/examples/application/mysql/mysql-pv.yaml
<span class="token comment"># 部署 YAML 文件中定义的 Deployment：</span>
kubectl apply <span class="token parameter variable">-f</span> https://k8s.io/examples/application/mysql/mysql-deployment.yaml
<span class="token comment"># 展示 Deployment 相关信息:</span>
kubectl describe deployment mysql
<span class="token comment"># 列举出 Deployment 创建的 pods:</span>
kubectl get pods <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>mysql
<span class="token comment"># 查看 PersistentVolumeClaim：</span>
kubectl describe pvc mysql-pv-claim
<span class="token comment"># 访问 MySQL 实例</span>
kubectl run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> <span class="token parameter variable">--image</span><span class="token operator">=</span>mysql:5.6 <span class="token parameter variable">--restart</span><span class="token operator">=</span>Never mysql-client -- mysql <span class="token parameter variable">-h</span> mysql <span class="token parameter variable">-p123456</span>
kubectl <span class="token builtin class-name">exec</span> mysql-client -- mysql <span class="token parameter variable">-h</span> mysql <span class="token parameter variable">-p123456</span>
<span class="token comment"># 通过名称删除部署的对象</span>
kubectl delete deployment,svc mysql
kubectl delete pvc mysql-pv-claim
kubectl delete <span class="token function">pv</span> mysql-pv-volume
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用-configmap-来配置-redis" tabindex="-1"><a class="header-anchor" href="#使用-configmap-来配置-redis" aria-hidden="true">#</a> 使用 ConfigMap 来配置 Redis</h2>`,4),h={href:"https://kubernetes.io/zh/docs/tutorials/configuration/configure-redis-using-configmap/",target:"_blank",rel:"noopener noreferrer"},g=n("details",{class:"hint-container details"},[n("summary",null,"redis-config")],-1),q=r(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>maxmemory 2mb
maxmemory-policy allkeys-lru
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p><details class="hint-container details"><summary>redis-pod.yaml</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: v1
kind: Pod
metadata:
  name: redis
spec:
  containers:
  - name: redis
    image: redis:5.0.4
    command:
      - redis-server
      - <span class="token string">&quot;/redis-master/redis.conf&quot;</span>
    env:
    - name: MASTER
      value: <span class="token string">&quot;true&quot;</span>
    ports:
    - containerPort: <span class="token number">6379</span>
    resources:
      limits:
        cpu: <span class="token string">&quot;0.1&quot;</span>
    volumeMounts:
    - mountPath: /redis-master-data
      name: data
    - mountPath: /redis-master
      name: config
  volumes:
    - name: data
      emptyDir: <span class="token punctuation">{</span><span class="token punctuation">}</span>
    - name: config
      configMap:
        name: example-redis-config
        items:
        - key: redis-config
          path: redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>kustomization.yaml</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>configMapGenerator:
- name: example-redis-config
  files:
  - redis-config
resources:
- redis-pod.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建 ConfigMap 和 Pod 对象，再当前目录下执行</span>
kubectl apply <span class="token parameter variable">-k</span> <span class="token builtin class-name">.</span>
<span class="token comment"># 检查创建的对象</span>
kubectl get <span class="token parameter variable">-k</span> <span class="token builtin class-name">.</span>
<span class="token comment"># 使用 kubectl exec 进入 pod 并运行 redis-cli 工具来验证配置已正确应用：</span>
kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> redis -- redis-cli

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> CONFIG GET maxmemory
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;maxmemory&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;2097152&quot;</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> CONFIG GET maxmemory-policy
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;maxmemory-policy&quot;</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">&quot;allkeys-lru&quot;</span>

<span class="token comment"># 删除创建的 pod</span>
kubectl delete pod redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function f(_,x){const a=d("router-link"),l=d("ExternalLinkIcon");return m(),t("div",null,[v(" more "),n("nav",u,[n("ul",null,[n("li",null,[s(a,{to:"#部署-demo-应用"},{default:i(()=>[e("部署 demo 应用")]),_:1})]),n("li",null,[s(a,{to:"#部署-mysql"},{default:i(()=>[e("部署 MySQL")]),_:1})]),n("li",null,[s(a,{to:"#使用-configmap-来配置-redis"},{default:i(()=>[e("使用 ConfigMap 来配置 Redis")]),_:1})])])]),p,b,n("ul",null,[n("li",null,[n("a",k,[e("官网例子"),s(l)])])]),y,n("ul",null,[n("li",null,[n("a",h,[e("官方例子"),s(l)]),g])]),q])}const P=c(o,[["render",f],["__file","60.K8S部署实战.html.vue"]]);export{P as default};
