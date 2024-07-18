import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as a,f as s}from"./app-efa5e96e.js";const i="/blog/assets/endpoint-c87480dc.png",d={},l=s(`<h2 id="日常节点运维" tabindex="-1"><a class="header-anchor" href="#日常节点运维" aria-hidden="true">#</a> 日常节点运维</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 列出集群中的所有节点</span>
kubectl get nodes
kubectl get nodes <span class="token parameter variable">-o</span> wide
kubectl get nodes <span class="token parameter variable">-o</span> wide --show-labels<span class="token operator">=</span>true

<span class="token comment">## 将节点标记为不可调度，避免新的Pod在此节点创建和运行：</span>
kubectl cordon <span class="token operator">&lt;</span>node-name<span class="token operator">&gt;</span>

<span class="token comment">## 驱逐节点上的Pod容器组，被驱逐的Pod将在其它节点重新创建运行：</span>
kubectl drain <span class="token operator">&lt;</span>node-name<span class="token operator">&gt;</span> --delete-local-data --ignore-daemonsets <span class="token parameter variable">--force</span>
<span class="token comment"># 这里有3个参数：</span>
<span class="token comment">#   --ignore-daemonsets， 忽略 DaemonSet 管理的 Pod(避免删除,创建这样的死循环)。</span>
<span class="token comment">#   --delete-local-data，使用 emptyDir 数据卷的 Pod 也要删除。</span>
<span class="token comment">#   --force，不是由 ReplicationController 、ReplicaSet 、Job 、DaemonSet 、StatefulSet 管理的Pod(没有绑定任何控制器)也要删除。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建-namespace" tabindex="-1"><a class="header-anchor" href="#创建-namespace" aria-hidden="true">#</a> 创建 Namespace</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> ns-demo.yaml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
apiVersion: v1
kind: Namespace
metadata:
  labels:
    pod-security.kubernetes.io/audit: privileged
    pod-security.kubernetes.io/enforce: privileged
    pod-security.kubernetes.io/warn: privileged
  name: ns-demo
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="endpoint" tabindex="-1"><a class="header-anchor" href="#endpoint" aria-hidden="true">#</a> Endpoint</h2><blockquote><p>Endpoint是可被访问的服务端点，即一个状态为running的pod，它是service访问的落点，只有service关联的pod才可能成为endpoint。<br> Endpoint、service和pod的关系</p><p>Endpoints表示一个Service对应的所有Pod副本的访问地址。</p></blockquote><figure><img src="`+i+`" alt="endpoint" tabindex="0" loading="lazy"><figcaption>endpoint</figcaption></figure><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get endpoints
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,8),t=[l];function o(r,c){return n(),a("div",null,t)}const v=e(d,[["render",o],["__file","20.kubernetes资源.html.vue"]]);export{v as default};
