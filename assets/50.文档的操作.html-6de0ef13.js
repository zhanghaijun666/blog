import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as t,c as l,a as e,b as n,d as r,f as o}from"./app-efa5e96e.js";const d={},c=e("h2",{id:"stirling-pdf",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#stirling-pdf","aria-hidden":"true"},"#"),n(" Stirling-PDF")],-1),v={href:"https://github.com/Frooodle/Stirling-PDF",target:"_blank",rel:"noopener noreferrer"},m=o(`<blockquote><p>一款功能强大、开箱即用的 PDF 工具，支持拆分/合并文件、添加/提取图片、压缩、加水印、添加/删除密码等功能，满足对 PDF 文件的所有需求。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>version: <span class="token string">&#39;3.3&#39;</span>
services:
  stirling-pdf:
    image: frooodle/s-pdf:latest
    ports:
      - <span class="token string">&#39;8080:8080&#39;</span>
    volumes:
      - ./data/trainingData:/usr/share/tesseract-ocr/4.00/tessdata
      - ./data/extraConfigs:/configs
<span class="token comment">#      - ./data/customFiles:/customFiles/</span>
    environment:
      - <span class="token assign-left variable">DOCKER_ENABLE_SECURITY</span><span class="token operator">=</span>false
\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function u(p,_){const s=i("ExternalLinkIcon");return t(),l("div",null,[c,e("ul",null,[e("li",null,[e("a",v,[n("https://github.com/Frooodle/Stirling-PDF"),r(s)])])]),m])}const h=a(d,[["render",u],["__file","50.文档的操作.html.vue"]]);export{h as default};
