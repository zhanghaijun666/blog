import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e}from"./app-efa5e96e.js";const t={},l=e(`<h2 id="daemonset-简介" tabindex="-1"><a class="header-anchor" href="#daemonset-简介" aria-hidden="true">#</a> DaemonSet 简介</h2><blockquote><p>服务守护进程，它的主要作用是在Kubernetes集群的所有节点中运行我们部署的守护进程，相当于在集群节点上分别部署Pod副本，如果有新节点加入集群，<code>DaemonSet</code>会自动的在该节点上运行我们需要部署的Pod副本，相反如果有节点退出集群，<code>DaemonSet</code>也会移除掉部署在旧节点的Pod副本。</p></blockquote><h2 id="daemonset示例" tabindex="-1"><a class="header-anchor" href="#daemonset示例" aria-hidden="true">#</a> DaemonSet示例</h2><blockquote><p><code>DaemonSet</code>一般运行在集群的所有节点上，是一些常驻服务，通常可以用来收集日志，作为存储节点，运行监控进程等。</p><p>下面是一个日志收集的<code>DaemonSet</code>的定义：</p></blockquote><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> DaemonSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>elasticsearch
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>logging
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>elasticsearch
  <span class="token key atrule">updateStrategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> RollingUpdate
    <span class="token key atrule">rollingUpdate</span><span class="token punctuation">:</span>
      <span class="token key atrule">maxUnavailable</span><span class="token punctuation">:</span> <span class="token number">1</span>
      <span class="token key atrule">maxSurge</span><span class="token punctuation">:</span> <span class="token string">&quot;100%&quot;</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>elasticsearch
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token comment"># nodeSelector:</span>
      <span class="token comment">#   node-role.kubernetes.io/worker: &quot;true&quot;</span>
      <span class="token key atrule">tolerations</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> node<span class="token punctuation">-</span>role.kubernetes.io/master
        <span class="token key atrule">operator</span><span class="token punctuation">:</span> Exists
        <span class="token key atrule">effect</span><span class="token punctuation">:</span> NoSchedule
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>elasticsearch
        <span class="token key atrule">image</span><span class="token punctuation">:</span> quay.io/fluentd_elasticsearch/fluentd<span class="token punctuation">:</span>v2.5.2
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">limits</span><span class="token punctuation">:</span>
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> varlog
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/log
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> varlibdockercontainers
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/lib/docker/containers
          <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token key atrule">terminationGracePeriodSeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> varlog
        <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> /var/log
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> varlibdockercontainers
        <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> /var/lib/docker/containers
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),p=[l];function c(o,i){return s(),a("div",null,p)}const k=n(t,[["render",c],["__file","30.kubernetes守护进程.html.vue"]]);export{k as default};
