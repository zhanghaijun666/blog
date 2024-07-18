import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as n,f as e}from"./app-efa5e96e.js";const l={},i=e(`<h2 id="安装minio" tabindex="-1"><a class="header-anchor" href="#安装minio" aria-hidden="true">#</a> 安装MinIO</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull minio/minio:latest
<span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">9000</span>:9000 <span class="token parameter variable">-p</span> <span class="token number">9090</span>:9090 <span class="token punctuation">\\</span>
<span class="token parameter variable">--net</span><span class="token operator">=</span>host <span class="token punctuation">\\</span>
<span class="token parameter variable">--name</span> minio <span class="token punctuation">\\</span>
<span class="token parameter variable">-d</span> <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token string">&quot;MINIO_ACCESS_KEY=admin&quot;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token string">&quot;MINIO_SECRET_KEY=minio123&quot;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /home/minio/data:/data <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /home/minio/config:/root/.minio <span class="token punctuation">\\</span>
minio/minio server <span class="token punctuation">\\</span>
/data --console-address <span class="token string">&quot;:9090&quot;</span> <span class="token parameter variable">-address</span> <span class="token string">&quot;:9000&quot;</span>

<span class="token function">netstat</span> <span class="token parameter variable">-tnlp</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在master-01节点部署velero" tabindex="-1"><a class="header-anchor" href="#在master-01节点部署velero" aria-hidden="true">#</a> 在master-01节点部署velero</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>下载安装包
<span class="token function">wget</span> https://github.com/vmware-tanzu/velero/releases/download/v1.8.1/velero-v1.8.1-linux-amd64.tar.gz
<span class="token function">tar</span> <span class="token parameter variable">-xvzf</span> velero-v1.8.1-linux-amd64.tar.gz
<span class="token function">mv</span> velero /usr/local/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置-velero-认证环境" tabindex="-1"><a class="header-anchor" href="#配置-velero-认证环境" aria-hidden="true">#</a> 配置 velero 认证环境</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> /data/velero <span class="token parameter variable">-p</span>
<span class="token builtin class-name">cd</span> /data/velero
<span class="token function">cat</span> velero-auth.txt
<span class="token punctuation">[</span>default<span class="token punctuation">]</span>
aws_access_key_id <span class="token operator">=</span> admin
aws_secret_access_key <span class="token operator">=</span> minio123
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="将-velero-安装到-k8s-集群" tabindex="-1"><a class="header-anchor" href="#将-velero-安装到-k8s-集群" aria-hidden="true">#</a> 将 velero 安装到 K8s 集群</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl create ns velero-system

velero <span class="token parameter variable">--kubeconfig</span> /root/.kube/config <span class="token punctuation">\\</span>
  <span class="token function">install</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--provider</span> aws <span class="token punctuation">\\</span>
  <span class="token parameter variable">--plugins</span> velero/velero-plugin-for-aws:v1.3.1 <span class="token punctuation">\\</span>
  <span class="token parameter variable">--bucket</span> velerodata <span class="token punctuation">\\</span>
  --secret-file ./velero-auth.txt <span class="token punctuation">\\</span>
  --use-volume-snapshots<span class="token operator">=</span>false <span class="token punctuation">\\</span>
  <span class="token parameter variable">--namespace</span> velero-system <span class="token punctuation">\\</span>
  --backup-location-config <span class="token assign-left variable">region</span><span class="token operator">=</span>minio,s3ForcePathStyle<span class="token operator">=</span><span class="token string">&quot;true&quot;</span>,s3Url<span class="token operator">=</span>http://172.16.88.170:9000

kubectl get pod <span class="token parameter variable">-A</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="测试备份功能" tabindex="-1"><a class="header-anchor" href="#测试备份功能" aria-hidden="true">#</a> 测试备份功能</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">DATE</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">date</span> +%Y%m%d%H%M%S<span class="token variable">\`</span></span>
velero backup create default-backup-<span class="token variable">\${DATE}</span> --include-cluster-resources<span class="token operator">=</span>true  --include-namespaces kube-system <span class="token parameter variable">--kubeconfig</span><span class="token operator">=</span>/root/.kube/config <span class="token parameter variable">--namespace</span> velero-system
Backup request <span class="token string">&quot;default-backup-20220804202021&quot;</span> submitted successfully.
Run <span class="token variable"><span class="token variable">\`</span>velero backup describe default-backup-20220804202021<span class="token variable">\`</span></span> or <span class="token variable"><span class="token variable">\`</span>velero backup logs default-backup-20220804202021<span class="token variable">\`</span></span> <span class="token keyword">for</span> <span class="token function">more</span> details.
root@easzlab-k8s-master-01:~<span class="token comment">#</span>
velero backup create myserver-backup-<span class="token variable">\${DATE}</span> --include-cluster-resources<span class="token operator">=</span>true --include-namespaces myserver <span class="token parameter variable">--kubeconfig</span><span class="token operator">=</span>/root/.kube/config <span class="token parameter variable">--namespace</span> velero-system
Backup request <span class="token string">&quot;myserver-backup-20220804202021&quot;</span> submitted successfully.
Run <span class="token variable"><span class="token variable">\`</span>velero backup describe myserver-backup-20220804202021<span class="token variable">\`</span></span> or <span class="token variable"><span class="token variable">\`</span>velero backup logs myserver-backup-20220804202021<span class="token variable">\`</span></span> <span class="token keyword">for</span> <span class="token function">more</span> details.
root@easzlab-k8s-master-01:~<span class="token comment">#</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),t=[i];function r(o,p){return s(),n("div",null,t)}const u=a(l,[["render",r],["__file","60.kubernetes备份和恢复.html.vue"]]);export{u as default};
