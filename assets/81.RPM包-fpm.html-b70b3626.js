import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as i,c as r,a,b as s,d as e,f as l}from"./app-efa5e96e.js";const c={},o=a("h2",{id:"fpm工具",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#fpm工具","aria-hidden":"true"},"#"),s(" FPM工具")],-1),d={href:"https://github.com/jordansissel/fpm",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/aosolao/FPM-dockerfile",target:"_blank",rel:"noopener noreferrer"},u=l(`<h2 id="安装ruby和gem" tabindex="-1"><a class="header-anchor" href="#安装ruby和gem" aria-hidden="true">#</a> 安装ruby和gem</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 安装ruby环境和gem命令</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> ruby rubygems ruby-devel rpm-build gcc
<span class="token comment">## 查看当前源</span>
gem <span class="token builtin class-name">source</span> list
<span class="token comment">## 添加国内源</span>
gem sources <span class="token parameter variable">--add</span> http://mirrors.aliyun.com/rubygems/
<span class="token comment">#gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/</span>
<span class="token comment">## 移除国外源</span>
gem sources <span class="token parameter variable">--remove</span> https://rubygems.org/
<span class="token comment">## 更新gem版本</span>
gem update <span class="token parameter variable">--system</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="fpm使用" tabindex="-1"><a class="header-anchor" href="#fpm使用" aria-hidden="true">#</a> FPM使用</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 安装FPM工具</span>
gem <span class="token function">install</span> fpm
<span class="token comment">#gem install fpm -v 1.4.0</span>
<span class="token comment">## 开启yum缓存</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s#keepcache=0#keepcache=1#g&#39;</span> /etc/yum.conf

<span class="token comment">## fpm打包Nginx</span>
fpm <span class="token parameter variable">-s</span> <span class="token function">dir</span> <span class="token parameter variable">-t</span> <span class="token function">rpm</span> <span class="token parameter variable">-n</span> nginx <span class="token parameter variable">-v</span> <span class="token number">1.6</span>.1 <span class="token parameter variable">-d</span> <span class="token string">&#39;pcre-devel,openssl-devel&#39;</span> --post-install /opt/nginx_rpm.sh <span class="token parameter variable">-f</span> /opt/nginx/
<span class="token comment">## fpm相对路径打包</span>
fpm <span class="token parameter variable">-s</span> <span class="token function">dir</span> <span class="token parameter variable">-t</span> <span class="token function">rpm</span> <span class="token parameter variable">-n</span> opt <span class="token parameter variable">-v</span> <span class="token number">1.1</span>.1.1 <span class="token parameter variable">-d</span> <span class="token string">&#39;gcc,gcc+&#39;</span> <span class="token parameter variable">-C</span> <span class="token punctuation">..</span>/opt/   
<span class="token comment">## 使用fpm将生成包指定到/tmp下</span>
fpm <span class="token parameter variable">-s</span> <span class="token function">dir</span> <span class="token parameter variable">-t</span> <span class="token function">rpm</span> <span class="token parameter variable">-n</span> ansible-v <span class="token number">1.1</span>.1.1 <span class="token parameter variable">-d</span> <span class="token string">&#39;gcc,gcc+&#39;</span> <span class="token parameter variable">-f</span> ansible-p /tmp/
<span class="token comment">## 制作RPM包</span>
fpm <span class="token parameter variable">-s</span> <span class="token function">dir</span> <span class="token parameter variable">-t</span> <span class="token variable">$PACKAGE</span> <span class="token parameter variable">-f</span> <span class="token parameter variable">-n</span> <span class="token variable">$NAME</span> <span class="token parameter variable">-v</span> <span class="token variable">$VERSION</span> <span class="token parameter variable">-a</span> <span class="token variable">$PACKAGE_ARCH</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--prefix</span><span class="token operator">=</span>/ <span class="token punctuation">\\</span>
  --after-install /scripts/after-install.sh <span class="token punctuation">\\</span>
  --after-upgrade /scripts/after-upgrade.sh <span class="token punctuation">\\</span>
  --before-remove /scripts/before-remove.sh <span class="token punctuation">\\</span>
  --after-remove /scripts/after-remove.sh <span class="token punctuation">\\</span>
  --config-files /etc --config-files /opt/cloudserver/etc  <span class="token punctuation">\\</span>
  --config-files /opt/cloudserver/openresty/nginx/conf <span class="token punctuation">\\</span>
  --config-files /opt/cloudserver/app/cloud/conf <span class="token punctuation">\\</span>
  <span class="token parameter variable">--iteration</span> <span class="token variable">$BUILD_NUMBER</span> <span class="token punctuation">\\</span>  
  <span class="token parameter variable">--license</span> private <span class="token punctuation">\\</span>
  <span class="token parameter variable">--vendor</span> <span class="token string">&quot;<span class="token variable">$URL</span>&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--maintainer</span> <span class="token string">&quot;<span class="token variable">$URL</span>&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--description</span> <span class="token string">&quot;<span class="token variable">$DESC</span>&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--url</span> <span class="token string">&quot;<span class="token variable">$URL</span>&quot;</span>  <span class="token variable">$EXTRA_ARGS</span> <span class="token variable">$DEPS</span> <span class="token punctuation">\\</span>
  <span class="token variable"><span class="token variable">$(</span><span class="token function">ls</span> <span class="token parameter variable">-d</span> <span class="token punctuation">{</span>usr,etc,opt<span class="token punctuation">}</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用docker制作" tabindex="-1"><a class="header-anchor" href="#使用docker制作" aria-hidden="true">#</a> 使用docker制作</h2>`,5),m={href:"https://github.com/aosolao/FPM-dockerfile",target:"_blank",rel:"noopener noreferrer"},b={href:"https://hub.docker.com/r/aosolao/fpm",target:"_blank",rel:"noopener noreferrer"},k=l(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> /fpm-build/ng:/fpm-build/ng <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> /fpm-build/rpm:/fpm-build/rpm <span class="token punctuation">\\</span>
  aosolao/fpm:v1 <span class="token punctuation">\\</span>
  fpm <span class="token parameter variable">-s</span> <span class="token function">dir</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-t</span> <span class="token function">rpm</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-n</span> nginx-wangsu <span class="token punctuation">\\</span>
  <span class="token parameter variable">-v</span> <span class="token number">1.16</span>.0 <span class="token punctuation">\\</span>
  <span class="token parameter variable">--iteration</span> <span class="token number">1</span>.el7 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-C</span> /fpm-build/ng <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> /fpm-build/rpm <span class="token punctuation">\\</span>
  <span class="token parameter variable">--description</span> <span class="token string">&#39;Wangsu Nginx rpm For Centos7&#39;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--url</span> <span class="token string">&#39;www.wangsucloud.com&#39;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token string">&#39;jemalloc &gt;= 3.5.0,glibc &gt;= 2.16&#39;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-m</span> <span class="token string">&#39;laihehui&lt;laihh@wangsu.com&gt;&#39;</span> <span class="token punctuation">\\</span>
  --post-install /fpm-build/ng/tmp/install_after.sh <span class="token punctuation">\\</span>
  --post-uninstall /fpm-build/ng/tmp/remove_after.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查看rpm包信息" tabindex="-1"><a class="header-anchor" href="#查看rpm包信息" aria-hidden="true">#</a> 查看rpm包信息</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 查看rpm执行的脚本</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qp</span> <span class="token parameter variable">--scripts</span> nginx-1.6.1-1.x86_64.rpm       
<span class="token comment">## 查看rpm包的依赖</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qpR</span> nginx-1.6.1-1.x86_64.rpm 
<span class="token comment">## 查看rpm包中的内容</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qpl</span> nginx-1.6.1-1.x86_64.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="f-q安装遇到问题" tabindex="-1"><a class="header-anchor" href="#f-q安装遇到问题" aria-hidden="true">#</a> F&amp;Q安装遇到问题</h2><p>1.<code>Need executable &#39;rpmbuild&#39; to convert dir to rpm {:level=&gt;:error}</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 解决方法</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> rpm-build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>2.如果里面有<code>gcc make</code>的错误</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 解决方法</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> gcc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="演示demo" tabindex="-1"><a class="header-anchor" href="#演示demo" aria-hidden="true">#</a> 演示Demo</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>

<span class="token comment">## 安装脚本</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> install-after.sh <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
#!/bin/bash
set -e

echo ...... install after ......
EOF</span>

<span class="token comment">## 更新脚本</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> upgrade-after.sh <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
#!/bin/bash
set -e

echo ...... upgrade after ......
EOF</span>

<span class="token comment">## 更新脚本</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> remove-after.sh <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
#!/bin/bash
set -e

echo ...... remove after ......
EOF</span>

<span class="token builtin class-name">echo</span> build start<span class="token punctuation">..</span>.
<span class="token assign-left variable">VERSION</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token string">&quot;+%Y%m%d&quot;</span><span class="token variable">)</span></span>
<span class="token assign-left variable">BUILD_NUMBER</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token string">&quot;+%H%M%S&quot;</span><span class="token variable">)</span></span>
<span class="token assign-left variable">PACKAGE_ARCH</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">)</span></span>

fpm <span class="token parameter variable">-s</span> <span class="token function">dir</span> <span class="token parameter variable">-t</span> <span class="token function">rpm</span> <span class="token parameter variable">-f</span> <span class="token parameter variable">--prefix</span><span class="token operator">=</span>/ <span class="token punctuation">\\</span>
  --after-install /scripts/install-after.sh <span class="token punctuation">\\</span>
  --after-upgrade /scripts/upgrade-after.sh <span class="token punctuation">\\</span>
  --after-remove /scripts/remove-after.sh <span class="token punctuation">\\</span>
  <span class="token parameter variable">-n</span> <span class="token string">&quot;hello&quot;</span> <span class="token parameter variable">-v</span> <span class="token variable">$VERSION</span> <span class="token parameter variable">-a</span> <span class="token variable">$PACKAGE_ARCH</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--iteration</span> <span class="token variable">$BUILD_NUMBER</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--license</span> private <span class="token punctuation">\\</span>
  <span class="token parameter variable">--vendor</span> <span class="token string">&quot;软件制造商&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--maintainer</span> <span class="token string">&quot;作者&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--description</span> <span class="token string">&quot;test hello&quot;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--url</span> <span class="token string">&quot;https://baidu.com&quot;</span> <span class="token punctuation">\\</span>
  <span class="token variable"><span class="token variable">$(</span><span class="token function">ls</span> <span class="token parameter variable">-d</span> <span class="token punctuation">{</span>usr,etc,opt<span class="token punctuation">}</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10);function h(f,g){const n=t("ExternalLinkIcon");return i(),r("div",null,[o,a("ul",null,[a("li",null,[s("官网: "),a("a",d,[s("https://github.com/jordansissel/fpm"),e(n)])]),a("li",null,[s("FPM-dockerfile: "),a("a",v,[s("https://github.com/aosolao/FPM-dockerfile"),e(n)])])]),u,a("ul",null,[a("li",null,[s("Dockerfile 请见： "),a("a",m,[s("https://github.com/aosolao/FPM-dockerfile"),e(n)])]),a("li",null,[s("构建好的镜像请见： "),a("a",b,[s("https://hub.docker.com/r/aosolao/fpm"),e(n)])])]),k])}const q=p(c,[["render",h],["__file","81.RPM包-fpm.html.vue"]]);export{q as default};
