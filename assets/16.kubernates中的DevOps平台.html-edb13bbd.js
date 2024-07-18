import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as t,c as o,a,d as s,w as n,f as d,b as r}from"./app-efa5e96e.js";const c={},u={class:"table-of-contents"},p=d(`<h2 id="harbor" tabindex="-1"><a class="header-anchor" href="#harbor" aria-hidden="true">#</a> Harbor</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## https://artifacthub.io/packages/helm/harbor/harbor</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> values.harbor.yaml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
expose:
  type: ingress
  ingress:
    hosts:
      core: docker.devops.kk
      notary: harbor.devops.kk
externalURL: https://docker.devops.kk
harborAdminPassword: Harbor12345
EOF</span>
helm repo <span class="token function">add</span> harbor https://helm.goharbor.io
helm repo update
helm <span class="token function">install</span> my-release harbor/harbor
helm upgrade harbor harbor/harbor <span class="token parameter variable">--install</span> <span class="token parameter variable">--namespace</span> devops --create-namespace <span class="token parameter variable">--values</span> values.harbor.yaml <span class="token parameter variable">--version</span> <span class="token number">1.11</span>.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="gitlab" tabindex="-1"><a class="header-anchor" href="#gitlab" aria-hidden="true">#</a> GitLab</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="nexus" tabindex="-1"><a class="header-anchor" href="#nexus" aria-hidden="true">#</a> Nexus</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>helm repo <span class="token function">add</span> sonatype https://sonatype.github.io/helm3-charts/
helm repo update
helm search repo nexus
helm <span class="token function">install</span> nexus sonatype/nexus-repository-manager
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="sonarqube" tabindex="-1"><a class="header-anchor" href="#sonarqube" aria-hidden="true">#</a> SonarQube</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span>EOF<span class="token operator">&gt;</span> my-values.yaml
sonarqubeUsername: admin
sonarqubePassword: <span class="token string">&quot;admin&quot;</span>
sonarqubeEmail: zhanghaijun@bjtxra.com
service:
  type: ClusterIP
ingress:
  enabled: <span class="token boolean">true</span>
  ingressClassName: <span class="token string">&quot;nginx&quot;</span>
  hostname: sonarqube.devops.kk
EOF

helm repo <span class="token function">add</span> bitnami https://charts.bitnami.com/bitnami
helm <span class="token function">install</span> sonarqube bitnami/sonarqube <span class="token parameter variable">--version</span> <span class="token number">1.0</span>.9 <span class="token parameter variable">-f</span> my-values.yaml
<span class="token comment">## 查看密码</span>
kubectl get secret <span class="token parameter variable">--namespace</span> default sonarqube <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">&quot;{.data.sonarqube-password}&quot;</span> <span class="token operator">|</span> base64 <span class="token parameter variable">--decode</span>
<span class="token comment">## 卸载</span>
helm uninstall sonarqube
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function b(v,m){const e=l("router-link");return t(),o("div",null,[a("nav",u,[a("ul",null,[a("li",null,[s(e,{to:"#harbor"},{default:n(()=>[r("Harbor")]),_:1})]),a("li",null,[s(e,{to:"#gitlab"},{default:n(()=>[r("GitLab")]),_:1})]),a("li",null,[s(e,{to:"#nexus"},{default:n(()=>[r("Nexus")]),_:1})]),a("li",null,[s(e,{to:"#sonarqube"},{default:n(()=>[r("SonarQube")]),_:1})])])]),p])}const g=i(c,[["render",b],["__file","16.kubernates中的DevOps平台.html.vue"]]);export{g as default};
