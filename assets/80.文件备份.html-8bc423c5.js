import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as c,c as o,e as r,a as n,d as a,w as d,b as e,f as u}from"./app-efa5e96e.js";const p={},v={class:"table-of-contents"},m=n("h2",{id:"duplicati",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#duplicati","aria-hidden":"true"},"#"),e(" Duplicati")],-1),b=n("blockquote",null,[n("p",null,"Duplicati 是一个免费的、开源的备份客户端，可以在云存储服务和远程文件服务器上安全地存储加密的、增量的、压缩的备份。"),n("p",null,"支持 Amazon S3、IDrive e2、Backblaze (B2)、Box、Dropbox、FTP、Google Cloud 和 Drive、HubiC、MEGA、Microsoft Azure 和 OneDrive、Rackspace 云文件、OpenStack Storage (Swift)、Sia、Storj DCS、SSH (SFTP) 、WebDAV、腾讯云对象存储（COS）等！"),n("p",null,"支持多平台：x86-64、arm64、armhf")],-1),_={href:"https://github.com/duplicati/duplicati",target:"_blank",rel:"noopener noreferrer"},h={href:"https://www.duplicati.com/download",target:"_blank",rel:"noopener noreferrer"},k=u(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ./data/<span class="token punctuation">{</span>backups,config,source<span class="token punctuation">}</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> docker-compose.yml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
version: &quot;3&quot;
services:
  duplicati:
    image: linuxserver/duplicati:latest
    container_name: duplicati
    hostname: duplicati
    restart: unless-stopped
    ports:
      - 8080:8200
    volumes:
      - ./data/backups:/backups
      - ./data/config:/config
      - ./data/source:/source
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Shanghai
    entrypoint:
      - /init
EOF</span>
<span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function f(g,x){const l=s("router-link"),i=s("ExternalLinkIcon");return c(),o("div",null,[r(" more "),n("nav",v,[n("ul",null,[n("li",null,[a(l,{to:"#duplicati"},{default:d(()=>[e("Duplicati")]),_:1})])])]),m,b,n("ul",null,[n("li",null,[e("GitHub 原项目地址："),n("a",_,[e("https://github.com/duplicati/duplicati"),a(i)])]),n("li",null,[e("官网地址："),n("a",h,[e("https://www.duplicati.com/download"),a(i)])])]),k])}const D=t(p,[["render",f],["__file","80.文件备份.html.vue"]]);export{D as default};
