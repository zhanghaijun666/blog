import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as c,c as u,e as o,a as n,d as a,w as t,b as s,f as r}from"./app-efa5e96e.js";const d={},k={class:"table-of-contents"},v=n("h2",{id:"使用-ceph-做持久化存储创建-mysql-集群",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#使用-ceph-做持久化存储创建-mysql-集群","aria-hidden":"true"},"#"),s(" 使用 Ceph 做持久化存储创建 MySQL 集群")],-1),m={href:"https://jimmysong.io/kubernetes-handbook/practice/using-ceph-for-persistent-storage.html",target:"_blank",rel:"noopener noreferrer"},b=r(`<h2 id="配置-ceph" tabindex="-1"><a class="header-anchor" href="#配置-ceph" aria-hidden="true">#</a> 配置 Ceph</h2><blockquote><p>kubernetes 提供了一种更加方便的动态创建 PV 的方式；也就是说使用 StoragaClass 时无需预先创建固定大小的 PV，等待使用者创建 PVC 来使用；而是直接创建 PVC 即可分配使用。</p></blockquote><h3 id="安装-ceph-客户端" tabindex="-1"><a class="header-anchor" href="#安装-ceph-客户端" aria-hidden="true">#</a> 安装 ceph 客户端</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> ceph-common
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="生成-ceph-secret" tabindex="-1"><a class="header-anchor" href="#生成-ceph-secret" aria-hidden="true">#</a> 生成 Ceph secret</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">grep</span> key /opt/ceph/etc/ceph.client.admin.keyring <span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{printf &quot;%s&quot;, $NF}&#39;</span><span class="token operator">|</span>base64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="创建租户" tabindex="-1"><a class="header-anchor" href="#创建租户" aria-hidden="true">#</a> 创建租户</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;&gt;</span> bedrock-namespace.yaml</span>
apiVersion: v1
kind: Namespace
metadata:
  name: bedrock
EOF</span>
kubectl create <span class="token parameter variable">-f</span> bedrock-namespace.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建-ceph-secret" tabindex="-1"><a class="header-anchor" href="#创建-ceph-secret" aria-hidden="true">#</a> 创建 Ceph secret</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;&gt;</span> ceph-secret.yaml</span>
apiVersion: v1
kind: Secret
metadata:
  name: ceph-secret
  namespace: bedrock
type: &quot;kubernetes.io/rbd&quot;
data:
  key: QVFDbmdWWmo3V0FxT3hBQVpyb0hidDdTc05seVBIOUhzNG1LT1E9PQ==
EOF</span>
kubectl create <span class="token parameter variable">-f</span> ceph-secret.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建-storageclass" tabindex="-1"><a class="header-anchor" href="#创建-storageclass" aria-hidden="true">#</a> 创建 StorageClass</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;&gt;</span> ceph-class.yaml</span>
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
   name: ceph-web
provisioner: kubernetes.io/rbd
parameters:
  monitors: 192.168.10.81:6789
  adminId: admin
  adminSecretName: ceph-secret
  adminSecretNamespace: bedrock
  pool: rbd     # 此处默认是rbd池，生产上建议自己创建存储池隔离 rbd | kube
  userId: admin
  userSecretName: ceph-secret
EOF</span>
kubectl create <span class="token parameter variable">-f</span> ceph-class.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置-mysql" tabindex="-1"><a class="header-anchor" href="#配置-mysql" aria-hidden="true">#</a> 配置 MySQL</h2><h3 id="_1-创建-mysql-配置文件" tabindex="-1"><a class="header-anchor" href="#_1-创建-mysql-配置文件" aria-hidden="true">#</a> 1. 创建 MySQL 配置文件</h3><p>创建 mysql-config.yaml 文件内容为：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>config<span class="token punctuation">-</span>vol
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> galera
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">mariadb.cnf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    [client]
    default-character-set = utf8
    [mysqld]
    character-set-server  = utf8
    collation-server      = utf8_general_ci
    # InnoDB optimizations
    innodb_log_file_size  = 64M</span>
  <span class="token key atrule">galera.cnf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    [galera]
    user = mysql
    bind-address = 0.0.0.0
    # Optimizations
    innodb_flush_log_at_trx_commit = 0
    sync_binlog = 0
    expire_logs_days = 7
    # Required settings
    default_storage_engine = InnoDB
    binlog_format = ROW
    innodb_autoinc_lock_mode = 2
    query_cache_size = 0
    query_cache_type = 0
    # MariaDB Galera settings
    #wsrep_debug=ON
    wsrep_on=ON
    wsrep_provider=/usr/lib/galera/libgalera_smm.so
    wsrep_sst_method=rsync
    # Cluster settings (automatically updated)
    wsrep_cluster_address=gcomm://
    wsrep_cluster_name=galera
    wsrep_node_address=127.0.0.1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-创建-mysql-root-用户和密码" tabindex="-1"><a class="header-anchor" href="#_2-创建-mysql-root-用户和密码" aria-hidden="true">#</a> 2. 创建 MySQL root 用户和密码</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 创建加密密码</span>
<span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token number">123456</span><span class="token operator">|</span>base64
<span class="token comment">## MTIzNDU2</span>
<span class="token comment">## 注意：一定要用-n 去掉换行符，不然会报错。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建-mysql-secret" tabindex="-1"><a class="header-anchor" href="#创建-mysql-secret" aria-hidden="true">#</a> 创建 MySQL secret</h2><blockquote><p>创建 mysql-secret.yaml 文件内容为：</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Secret
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>secrets
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> galera
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token comment"># Root password: changeit run  echo -n 123456|base64</span>
  <span class="token key atrule">root-password</span><span class="token punctuation">:</span> MTIzNDU2
  <span class="token comment"># Root user: changeit run  echo -n root|base64</span>
  <span class="token key atrule">root-user</span><span class="token punctuation">:</span> cm9vdA==
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-创建-yaml-配置文件" tabindex="-1"><a class="header-anchor" href="#_3-创建-yaml-配置文件" aria-hidden="true">#</a> 3. 创建 yaml 配置文件</h3><blockquote><p>创建 MySQL 的 yaml 文件 galera-mariadb.yaml 内容为：</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">service.alpha.kubernetes.io/tolerate-unready-endpoints</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> galera
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">tier</span><span class="token punctuation">:</span> data
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span> None
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> StatefulSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> galera
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> <span class="token string">&quot;mysql&quot;</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
        <span class="token key atrule">tier</span><span class="token punctuation">:</span> data
      <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
        <span class="token key atrule">pod.beta.kubernetes.io/init-containers</span><span class="token punctuation">:</span> &#39;<span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token key atrule">&quot;name&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;galera-init&quot;</span><span class="token punctuation">,</span>
            <span class="token key atrule">&quot;image&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;harbor-001.jimmysong.io/library/k8s-galera-init:latest&quot;</span><span class="token punctuation">,</span>
            <span class="token key atrule">&quot;args&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;-service=mysql&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token key atrule">&quot;env&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">{</span>
                <span class="token key atrule">&quot;name&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;POD_NAMESPACE&quot;</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;valueFrom&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
                  <span class="token key atrule">&quot;fieldRef&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token key atrule">&quot;apiVersion&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;v1&quot;</span><span class="token punctuation">,</span> <span class="token key atrule">&quot;fieldPath&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;metadata.namespace&quot;</span> <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">}</span><span class="token punctuation">,</span>
              <span class="token punctuation">{</span>
                <span class="token key atrule">&quot;name&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;SAFE_TO_BOOTSTRAP&quot;</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;value&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;1&quot;</span>
              <span class="token punctuation">}</span><span class="token punctuation">,</span>
              <span class="token punctuation">{</span>
                <span class="token key atrule">&quot;name&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;DEBUG&quot;</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;value&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;1&quot;</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token key atrule">&quot;volumeMounts&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
              <span class="token punctuation">{</span>
                <span class="token key atrule">&quot;name&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;config&quot;</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;mountPath&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;/etc/mysql/conf.d&quot;</span>
              <span class="token punctuation">}</span><span class="token punctuation">,</span>
              <span class="token punctuation">{</span>
                <span class="token key atrule">&quot;name&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;data&quot;</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;mountPath&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;/var/lib/mysql&quot;</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">]</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>&#39;
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">terminationGracePeriodSeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
        <span class="token key atrule">image</span><span class="token punctuation">:</span> harbor<span class="token punctuation">-</span>001.jimmysong.io/library/mariadb<span class="token punctuation">:</span><span class="token number">10.1</span>
        <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">4444</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> sst
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">4567</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> replication
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">4568</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> ist
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_ROOT_PASSWORD
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
            <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
              <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>secrets
              <span class="token key atrule">key</span><span class="token punctuation">:</span> root<span class="token punctuation">-</span>password
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_ROOT_USER
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
            <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
              <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>secrets
              <span class="token key atrule">key</span><span class="token punctuation">:</span> root<span class="token punctuation">-</span>user
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_INITDB_SKIP_TZINFO
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;yes&quot;</span>
        <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
          <span class="token key atrule">exec</span><span class="token punctuation">:</span>
            <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;sh&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;mysql -u\\&quot;\${MYSQL_ROOT_USER:-root}\\&quot; -p\\&quot;\${MYSQL_ROOT_PASSWORD}\\&quot; -e &#39;show databases;&#39;&quot;</span><span class="token punctuation">]</span>
          <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">60</span>
          <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>
        <span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span>
          <span class="token key atrule">exec</span><span class="token punctuation">:</span>
            <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;sh&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;mysql -u\\&quot;\${MYSQL_ROOT_USER:-root}\\&quot; -p\\&quot;\${MYSQL_ROOT_PASSWORD}\\&quot; -e &#39;show databases;&#39;&quot;</span><span class="token punctuation">]</span>
          <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">20</span>
          <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /etc/mysql/conf.d
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> data
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/lib/mysql
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config
        <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>config<span class="token punctuation">-</span>vol
      <span class="token key atrule">imagePullSecrets</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;registrykey&quot;</span>
  <span class="token key atrule">volumeClaimTemplates</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> data
      <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
        <span class="token key atrule">volume.beta.kubernetes.io/storage-class</span><span class="token punctuation">:</span> <span class="token string">&quot;ceph-web&quot;</span> <span class="token comment">#引用ceph  class 的类</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">accessModes</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;ReadWriteOnce&quot;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">resources</span><span class="token punctuation">:</span>
        <span class="token key atrule">requests</span><span class="token punctuation">:</span>
          <span class="token key atrule">storage</span><span class="token punctuation">:</span> 3Gi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="部署-mysql-集群" tabindex="-1"><a class="header-anchor" href="#部署-mysql-集群" aria-hidden="true">#</a> 部署 MySQL 集群</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 在 /etc/mariadb-cluster 目录下执行：</span>
kubectl create <span class="token parameter variable">-f</span> <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,26);function y(h,q){const e=l("router-link"),i=l("ExternalLinkIcon");return c(),u("div",null,[o(" more "),n("nav",k,[n("ul",null,[n("li",null,[a(e,{to:"#使用-ceph-做持久化存储创建-mysql-集群"},{default:t(()=>[s("使用 Ceph 做持久化存储创建 MySQL 集群")]),_:1})]),n("li",null,[a(e,{to:"#配置-ceph"},{default:t(()=>[s("配置 Ceph")]),_:1}),n("ul",null,[n("li",null,[a(e,{to:"#安装-ceph-客户端"},{default:t(()=>[s("安装 ceph 客户端")]),_:1})]),n("li",null,[a(e,{to:"#生成-ceph-secret"},{default:t(()=>[s("生成 Ceph secret")]),_:1})]),n("li",null,[a(e,{to:"#创建租户"},{default:t(()=>[s("创建租户")]),_:1})]),n("li",null,[a(e,{to:"#创建-ceph-secret"},{default:t(()=>[s("创建 Ceph secret")]),_:1})]),n("li",null,[a(e,{to:"#创建-storageclass"},{default:t(()=>[s("创建 StorageClass")]),_:1})])])]),n("li",null,[a(e,{to:"#配置-mysql"},{default:t(()=>[s("配置 MySQL")]),_:1}),n("ul",null,[n("li",null,[a(e,{to:"#_1-创建-mysql-配置文件"},{default:t(()=>[s("1. 创建 MySQL 配置文件")]),_:1})]),n("li",null,[a(e,{to:"#_2-创建-mysql-root-用户和密码"},{default:t(()=>[s("2. 创建 MySQL root 用户和密码")]),_:1})])])]),n("li",null,[a(e,{to:"#创建-mysql-secret"},{default:t(()=>[s("创建 MySQL secret")]),_:1}),n("ul",null,[n("li",null,[a(e,{to:"#_3-创建-yaml-配置文件"},{default:t(()=>[s("3. 创建 yaml 配置文件")]),_:1})]),n("li",null,[a(e,{to:"#部署-mysql-集群"},{default:t(()=>[s("部署 MySQL 集群")]),_:1})])])])])]),v,n("p",null,[n("a",m,[s("https://jimmysong.io/kubernetes-handbook/practice/using-ceph-for-persistent-storage.html"),a(i)])]),b])}const f=p(d,[["render",y],["__file","61.kubernets应用.html.vue"]]);export{f as default};
