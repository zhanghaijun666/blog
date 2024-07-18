import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as c,c as o,a as e,d as n,w as i,b as s,f as d}from"./app-efa5e96e.js";const u={},v={class:"table-of-contents"},m=d(`<h2 id="仓库部署" tabindex="-1"><a class="header-anchor" href="#仓库部署" aria-hidden="true">#</a> 仓库部署</h2><h3 id="_1、docker部署" tabindex="-1"><a class="header-anchor" href="#_1、docker部署" aria-hidden="true">#</a> 1、Docker部署</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">5000</span>:5000 <span class="token parameter variable">--restart</span> always <span class="token parameter variable">--name</span> registry registry
<span class="token comment">## 访问网址：&lt;http://192.168.180.87:5000/v2/_catalog&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、dockercompose部署" tabindex="-1"><a class="header-anchor" href="#_2、dockercompose部署" aria-hidden="true">#</a> 2、DockerCompose部署</h3>`,4),p={href:"https://hub.docker.com/_/registry",target:"_blank",rel:"noopener noreferrer"},b={href:"https://hub.docker.com/r/jc21/registry-ui",target:"_blank",rel:"noopener noreferrer"},h=d(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> docker-compose.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
version: &#39;3.3&#39;
services:
  registry:
    image: registry:2.8.1
    restart: always
    ports:
      - &quot;5000:5000&quot;
    volumes:
      - ./data:/var/lib/registry
    environment:
      - REGISTRY_STORAGE_DELETE_ENABLED=true

   registry-ui:
    images: jc21/registry-ui:2.0.2
    restart: on-failure
    ports:
      - &quot;80:80&quot;
    depends_on:
      - registry
    environment:
      - REGISTRY_HOST=registry:5000
      - REGISTRY_SSL=false
      - REGISTRY_DOMAIN=registry:5000
      - REGISTRY_STORAGE_DELETE_ENABLED=true
EOF</span>
<span class="token comment">## 启动容器</span>
docker-conpose up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="客户端使用" tabindex="-1"><a class="header-anchor" href="#客户端使用" aria-hidden="true">#</a> 客户端使用</h2><h3 id="_1、设置信任" tabindex="-1"><a class="header-anchor" href="#_1、设置信任" aria-hidden="true">#</a> 1、设置信任</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;</span><span class="token string">EOF
{
  &quot;registry-mirrors&quot;:[&quot;https://docker.mirrors.ustc.edu.cn&quot;],
  &quot;insecure-registries&quot;:[&quot;192.168.180.87:5000&quot;]
}
EOF</span>
<span class="token comment">## 重启docker</span>
systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、上传本地镜像" tabindex="-1"><a class="header-anchor" href="#_2、上传本地镜像" aria-hidden="true">#</a> 2、上传本地镜像</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> images
<span class="token function">docker</span> tag nginx:latest <span class="token number">192.168</span>.180.87:5000/nginx
<span class="token function">docker</span> push <span class="token number">192.168</span>.180.87:5000/nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-重新拉取镜像" tabindex="-1"><a class="header-anchor" href="#_3-重新拉取镜像" aria-hidden="true">#</a> 3.重新拉取镜像</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> rmi <span class="token number">192.168</span>.180.87:5000/nginx
<span class="token function">docker</span> images
<span class="token function">docker</span> pull <span class="token number">192.168</span>.180.87:5000/nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function _(k,g){const a=l("router-link"),r=l("ExternalLinkIcon");return c(),o("div",null,[e("nav",v,[e("ul",null,[e("li",null,[n(a,{to:"#仓库部署"},{default:i(()=>[s("仓库部署")]),_:1}),e("ul",null,[e("li",null,[n(a,{to:"#_1、docker部署"},{default:i(()=>[s("1、Docker部署")]),_:1})]),e("li",null,[n(a,{to:"#_2、dockercompose部署"},{default:i(()=>[s("2、DockerCompose部署")]),_:1})])])]),e("li",null,[n(a,{to:"#客户端使用"},{default:i(()=>[s("客户端使用")]),_:1}),e("ul",null,[e("li",null,[n(a,{to:"#_1、设置信任"},{default:i(()=>[s("1、设置信任")]),_:1})]),e("li",null,[n(a,{to:"#_2、上传本地镜像"},{default:i(()=>[s("2、上传本地镜像")]),_:1})])])]),e("li",null,[n(a,{to:"#_3-重新拉取镜像"},{default:i(()=>[s("3.重新拉取镜像")]),_:1})])])]),m,e("ul",null,[e("li",null,[e("a",p,[s("https://hub.docker.com/_/registry"),n(r)])]),e("li",null,[e("a",b,[s("https://hub.docker.com/r/jc21/registry-ui"),n(r)])])]),h])}const E=t(u,[["render",_],["__file","10.私有仓库-Registry.html.vue"]]);export{E as default};
