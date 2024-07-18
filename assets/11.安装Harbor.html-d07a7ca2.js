import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o,c,a as n,d as a,w as e,f as t,b as i}from"./app-efa5e96e.js";const d={},v={class:"table-of-contents"},p=t(`<h2 id="前置准备" tabindex="-1"><a class="header-anchor" href="#前置准备" aria-hidden="true">#</a> 前置准备</h2><blockquote><p>提前安装<code>Docker</code>和<code>DcokerCompose</code></p></blockquote><h2 id="下载harbor安装包" tabindex="-1"><a class="header-anchor" href="#下载harbor安装包" aria-hidden="true">#</a> 下载harbor安装包</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 下载Docker Harbor安装包</span>
<span class="token function">wget</span> https://ghproxy.com/https://github.com/goharbor/harbor/releases/download/v2.6.2/harbor-offline-installer-v2.6.2.tgz

<span class="token comment"># 解压安装包</span>
root@cby:~<span class="token comment"># tar xvf harbor-offline-installer-v2.6.2.tgz  -C /usr/local/</span>
harbor/harbor.v2.6.2.tar.gz
harbor/prepare
harbor/LICENSE
harbor/install.sh
harbor/common.sh
harbor/harbor.yml.tmpl
root@cby:~<span class="token comment"># cd /usr/local/harbor/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建证书" tabindex="-1"><a class="header-anchor" href="#创建证书" aria-hidden="true">#</a> 创建证书</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建ca证书目录</span>
root@cby:/usr/local/harbor<span class="token comment"># mkdir ca</span>
root@cby:/usr/local/harbor<span class="token comment"># cd ca/</span>
root@cby:/usr/local/harbor/ca<span class="token comment"># </span>

<span class="token comment"># 生成CA证书私钥</span>
root@cby:/usr/local/harbor/ca<span class="token comment"># openssl genrsa -out ca.key 4096</span>

<span class="token comment"># 生成CA证书</span>

root@cby:/usr/local/harbor/ca<span class="token comment"># openssl req -x509 -new -nodes -sha512 -days 3650 \\</span>
 <span class="token parameter variable">-subj</span> <span class="token string">&quot;/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=hb.oiox.cn&quot;</span> <span class="token punctuation">\\</span>
 <span class="token parameter variable">-key</span> ca.key <span class="token punctuation">\\</span>
 <span class="token parameter variable">-out</span> ca.crt


<span class="token comment"># 生成服务器证书 生成私钥</span>
root@cby:/usr/local/harbor/ca<span class="token comment"># openssl genrsa -out hb.oiox.cn.key 4096</span>

<span class="token comment"># 生成证书签名请求（CSR）</span>
root@cby:/usr/local/harbor/ca<span class="token comment"># openssl req -sha512 -new \\</span>
    <span class="token parameter variable">-subj</span> <span class="token string">&quot;/C=CN/ST=Beijing/L=Beijing/O=example/OU=Personal/CN=hb.oiox.cn&quot;</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">-key</span> hb.oiox.cn.key <span class="token punctuation">\\</span>
    <span class="token parameter variable">-out</span> hb.oiox.cn.csr

<span class="token comment"># 生成一个x509 v3扩展文件</span>
root@cby:/usr/local/harbor/ca<span class="token comment"># cat &gt; v3.ext &lt;&lt;-EOF</span>
<span class="token assign-left variable">authorityKeyIdentifier</span><span class="token operator">=</span>keyid,issuer
<span class="token assign-left variable">basicConstraints</span><span class="token operator">=</span>CA:FALSE
keyUsage <span class="token operator">=</span> digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
extendedKeyUsage <span class="token operator">=</span> serverAuth
subjectAltName <span class="token operator">=</span> @alt_names

<span class="token punctuation">[</span>alt_names<span class="token punctuation">]</span>
<span class="token assign-left variable">DNS.1</span><span class="token operator">=</span>oiox.cn
<span class="token assign-left variable">DNS.2</span><span class="token operator">=</span>hb.oiox.cn
<span class="token assign-left variable">DNS.3</span><span class="token operator">=</span>www.oiox.cn
EOF

<span class="token comment"># 使用该v3.ext文件为您的Harbor主机生成证书</span>
root@cby:/usr/local/harbor/ca<span class="token comment"># openssl x509 -req -sha512 -days 3650 \\</span>
    <span class="token parameter variable">-extfile</span> v3.ext <span class="token punctuation">\\</span>
    <span class="token parameter variable">-CA</span> ca.crt <span class="token parameter variable">-CAkey</span> ca.key <span class="token parameter variable">-CAcreateserial</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">-in</span> hb.oiox.cn.csr <span class="token punctuation">\\</span>
    <span class="token parameter variable">-out</span> hb.oiox.cn.crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置docker证书" tabindex="-1"><a class="header-anchor" href="#配置docker证书" aria-hidden="true">#</a> 配置docker证书</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 转换crt为cert，供Docker使用，Docker守护程序将.crt文件解释为CA证书，并将.cert文件解释为客户端证书</span>
root@cby:/usr/local/harbor/ca<span class="token comment"># openssl x509 -inform PEM -in hb.oiox.cn.crt -out hb.oiox.cn.cert</span>


<span class="token comment"># 将服务器证书，密钥和CA文件复制到Harbor主机上的Docker证书文件夹中。您必须首先创建适当的文件夹</span>
root@cby:/usr/local/harbor/ca<span class="token comment"># mkdir -p /etc/docker/certs.d/hb.oiox.cn/</span>
root@cby:/usr/local/harbor/ca<span class="token comment"># cp hb.oiox.cn.cert /etc/docker/certs.d/hb.oiox.cn/</span>
root@cby:/usr/local/harbor/ca<span class="token comment"># cp hb.oiox.cn.key /etc/docker/certs.d/hb.oiox.cn/</span>
root@cby:/usr/local/harbor/ca<span class="token comment"># cp ca.crt /etc/docker/certs.d/hb.oiox.cn/</span>

<span class="token comment"># 如果将默认nginx端口443 映射到其他端口，请创建文件夹</span>
<span class="token comment"># /etc/docker/certs.d/yourdomain.com:port</span>


<span class="token comment"># 重新启动Docker Engine</span>
root@cby:/usr/local/harbor/ca<span class="token comment"># systemctl restart docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查看文件" tabindex="-1"><a class="header-anchor" href="#查看文件" aria-hidden="true">#</a> 查看文件</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token comment"># 查看目录下证书文件</span>
root@cby:/usr/local/harbor/ca<span class="token comment"># ll</span>
total <span class="token number">36</span>
drwxr-xr-x <span class="token number">2</span> root root <span class="token number">4096</span> Nov <span class="token number">16</span> 06:23 ./
drwxr-xr-x <span class="token number">5</span> root root <span class="token number">4096</span> Nov <span class="token number">16</span> 06:16 <span class="token punctuation">..</span>/
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">2041</span> Nov <span class="token number">16</span> 06:20 ca.crt
-rw------- <span class="token number">1</span> root root <span class="token number">3272</span> Nov <span class="token number">16</span> 06:16 ca.key
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">2143</span> Nov <span class="token number">16</span> 06:23 hb.oiox.cn.cert
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">2143</span> Nov <span class="token number">16</span> 06:22 hb.oiox.cn.crt
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">1704</span> Nov <span class="token number">16</span> 06:22 hb.oiox.cn.csr
-rw------- <span class="token number">1</span> root root <span class="token number">3268</span> Nov <span class="token number">16</span> 06:22 hb.oiox.cn.key
-rw-r--r-- <span class="token number">1</span> root root  <span class="token number">261</span> Nov <span class="token number">16</span> 06:22 v3.ext
root@cby:/usr/local/harbor/ca<span class="token comment"># </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置harbor服务" tabindex="-1"><a class="header-anchor" href="#配置harbor服务" aria-hidden="true">#</a> 配置harbor服务</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 配置harbor文件</span>
root@cby:/usr/local/harbor<span class="token comment"># cp harbor.yml.tmpl harbor.yml</span>
root@cby:/usr/local/harbor<span class="token comment"># vim harbor.yml </span>
root@cby:/usr/local/harbor<span class="token comment"># cat harbor.yml | grep -v &#39;^#&#39; | grep -v &#39;^$&#39; | grep -v &#39;  #&#39;</span>
hostname: hb.oiox.cn
http:
  port: <span class="token number">80</span>
https:
  port: <span class="token number">443</span>
  certificate: /usr/local/harbor/ca/hb.oiox.cn.crt 
  private_key: /usr/local/harbor/ca/hb.oiox.cn.key
harbor_admin_password: Harbor12345
database:
  password: root123
  max_idle_conns: <span class="token number">100</span>
  max_open_conns: <span class="token number">900</span>
data_volume: /data
trivy:
  ignore_unfixed: <span class="token boolean">false</span>
  skip_update: <span class="token boolean">false</span>
  offline_scan: <span class="token boolean">false</span>
  security_check: vuln
  insecure: <span class="token boolean">false</span>
jobservice:
  max_job_workers: <span class="token number">10</span>
notification:
  webhook_job_max_retry: <span class="token number">10</span>
chart:
  absolute_url: disabled
log:
  level: info
  local:
    rotate_count: <span class="token number">50</span>
    rotate_size: 200M
    location: /var/log/harbor
_version: <span class="token number">2.6</span>.0
proxy:
  http_proxy:
  https_proxy:
  no_proxy:
  components:
    - core
    - jobservice
    - trivy
upload_purging:
  enabled: <span class="token boolean">true</span>
  age: 168h
  interval: 24h
  dryrun: <span class="token boolean">false</span>
cache:
  enabled: <span class="token boolean">false</span>
  expire_hours: <span class="token number">24</span>
root@cby:/usr/local/harbor<span class="token comment"># </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装harbor" tabindex="-1"><a class="header-anchor" href="#安装harbor" aria-hidden="true">#</a> 安装harbor</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token comment"># 进行安装</span>
root@cby:/usr/local/harbor<span class="token comment"># ./install.sh</span>
tput: No value <span class="token keyword">for</span> <span class="token environment constant">$TERM</span> and no <span class="token parameter variable">-T</span> specified
tput: No value <span class="token keyword">for</span> <span class="token environment constant">$TERM</span> and no <span class="token parameter variable">-T</span> specified
tput: No value <span class="token keyword">for</span> <span class="token environment constant">$TERM</span> and no <span class="token parameter variable">-T</span> specified
tput: No value <span class="token keyword">for</span> <span class="token environment constant">$TERM</span> and no <span class="token parameter variable">-T</span> specified
tput: No value <span class="token keyword">for</span> <span class="token environment constant">$TERM</span> and no <span class="token parameter variable">-T</span> specified
tput: No value <span class="token keyword">for</span> <span class="token environment constant">$TERM</span> and no <span class="token parameter variable">-T</span> specified
tput: No value <span class="token keyword">for</span> <span class="token environment constant">$TERM</span> and no <span class="token parameter variable">-T</span> specified
tput: No value <span class="token keyword">for</span> <span class="token environment constant">$TERM</span> and no <span class="token parameter variable">-T</span> specified

<span class="token punctuation">[</span>Step <span class="token number">0</span><span class="token punctuation">]</span>: checking <span class="token keyword">if</span> <span class="token function">docker</span> is installed <span class="token punctuation">..</span>.

Note: <span class="token function">docker</span> version: <span class="token number">20.10</span>.21

<span class="token punctuation">[</span>Step <span class="token number">1</span><span class="token punctuation">]</span>: checking <span class="token function">docker-compose</span> is installed <span class="token punctuation">..</span>.

Note: <span class="token function">docker-compose</span> version: <span class="token number">2.12</span>.2

<span class="token punctuation">[</span>Step <span class="token number">2</span><span class="token punctuation">]</span>: loading Harbor images <span class="token punctuation">..</span>.
Loaded image: goharbor/harbor-jobservice:v2.6.2
Loaded image: goharbor/trivy-adapter-photon:v2.6.2
Loaded image: goharbor/chartmuseum-photon:v2.6.2
Loaded image: goharbor/redis-photon:v2.6.2
Loaded image: goharbor/nginx-photon:v2.6.2
Loaded image: goharbor/notary-signer-photon:v2.6.2
Loaded image: goharbor/harbor-core:v2.6.2
Loaded image: goharbor/harbor-db:v2.6.2
Loaded image: goharbor/harbor-registryctl:v2.6.2
Loaded image: goharbor/harbor-exporter:v2.6.2
Loaded image: goharbor/prepare:v2.6.2
Loaded image: goharbor/registry-photon:v2.6.2
Loaded image: goharbor/notary-server-photon:v2.6.2
Loaded image: goharbor/harbor-portal:v2.6.2
Loaded image: goharbor/harbor-log:v2.6.2


<span class="token punctuation">[</span>Step <span class="token number">3</span><span class="token punctuation">]</span>: preparing environment <span class="token punctuation">..</span>.

<span class="token punctuation">[</span>Step <span class="token number">4</span><span class="token punctuation">]</span>: preparing harbor configs <span class="token punctuation">..</span>.
prepare base <span class="token function">dir</span> is <span class="token builtin class-name">set</span> to /usr/local/harbor
Clearing the configuration file: /config/core/app.conf
Clearing the configuration file: /config/core/env
Clearing the configuration file: /config/jobservice/env
Clearing the configuration file: /config/jobservice/config.yml
Clearing the configuration file: /config/nginx/nginx.conf
Clearing the configuration file: /config/registryctl/env
Clearing the configuration file: /config/registryctl/config.yml
Clearing the configuration file: /config/portal/nginx.conf
Clearing the configuration file: /config/db/env
Clearing the configuration file: /config/registry/passwd
Clearing the configuration file: /config/registry/config.yml
Clearing the configuration file: /config/log/logrotate.conf
Clearing the configuration file: /config/log/rsyslog_docker.conf
Generated configuration file: /config/portal/nginx.conf
Generated configuration file: /config/log/logrotate.conf
Generated configuration file: /config/log/rsyslog_docker.conf
Generated configuration file: /config/nginx/nginx.conf
Generated configuration file: /config/core/env
Generated configuration file: /config/core/app.conf
Generated configuration file: /config/registry/config.yml
Generated configuration file: /config/registryctl/env
Generated configuration file: /config/registryctl/config.yml
Generated configuration file: /config/db/env
Generated configuration file: /config/jobservice/env
Generated configuration file: /config/jobservice/config.yml
loaded secret from file: /data/secret/keys/secretkey
Generated configuration file: /compose_location/docker-compose.yml
Clean up the input <span class="token function">dir</span>


Note: stopping existing Harbor instance <span class="token punctuation">..</span>.


<span class="token punctuation">[</span>Step <span class="token number">5</span><span class="token punctuation">]</span>: starting Harbor <span class="token punctuation">..</span>.
<span class="token punctuation">[</span>+<span class="token punctuation">]</span> Running <span class="token number">10</span>/10
 ⠿ Network harbor_harbor        Created                                                                                                                                                              <span class="token number">0</span>.0s
 ⠿ Container harbor-log         Started                                                                                                                                                              <span class="token number">0</span>.6s
 ⠿ Container harbor-portal      Started                                                                                                                                                              <span class="token number">0</span>.8s
 ⠿ Container registryctl        Started                                                                                                                                                              <span class="token number">1</span>.1s
 ⠿ Container redis              Started                                                                                                                                                              <span class="token number">0</span>.9s
 ⠿ Container registry           Started                                                                                                                                                              <span class="token number">1</span>.1s
 ⠿ Container harbor-db          Started                                                                                                                                                              <span class="token number">1</span>.2s
 ⠿ Container harbor-core        Started                                                                                                                                                              <span class="token number">1</span>.3s
 ⠿ Container nginx              Started                                                                                                                                                              <span class="token number">1</span>.9s
 ⠿ Container harbor-jobservice  Started                                                                                                                                                              <span class="token number">2</span>.0s
✔ ----Harbor has been installed and started successfully.----
root@cby:/usr/local/harbor<span class="token comment"># </span>
root@cby:/usr/local/harbor<span class="token comment"># </span>
root@cby:/usr/local/harbor<span class="token comment">#</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置解析和docker" tabindex="-1"><a class="header-anchor" href="#配置解析和docker" aria-hidden="true">#</a> 配置解析和docker</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token comment"># FQDN解析</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/hosts <span class="token operator">&lt;&lt;</span><span class="token string">EOF
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6


192.168.8.61 k8s-master01
192.168.8.62 k8s-master02
192.168.8.63 k8s-master03
192.168.8.64 k8s-node01
192.168.8.65 k8s-node02
192.168.8.66 lb-vip
192.168.8.3 hb.oiox.cn
EOF</span>


<span class="token comment"># 例如docker的配置</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;</span><span class="token string">EOF
{
  &quot;registry-mirrors&quot;: [
    &quot;https://hub-mirror.c.163.com&quot;,
    &quot;https://mirror.baidubce.com&quot;
  ],
  &quot;exec-opts&quot;: [&quot;native.cgroupdriver=systemd&quot;],
  &quot;insecure-registries&quot;: [&quot;hb.oiox.cn&quot;]
}
EOF</span>

<span class="token comment"># 重新启动docker</span>
systemctl restart <span class="token function">docker</span> <span class="token operator">&amp;&amp;</span> systemctl status <span class="token function">docker</span> <span class="token parameter variable">-l</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="测试使用" tabindex="-1"><a class="header-anchor" href="#测试使用" aria-hidden="true">#</a> 测试使用</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 登陆 </span>
<span class="token function">docker</span> login hb.oiox.cn                                                                                        
Username: admin
Password: 
WARNING<span class="token operator">!</span> Your password will be stored unencrypted <span class="token keyword">in</span> /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/<span class="token comment">#credentials-store</span>

Login Succeeded

<span class="token comment"># 测试使用</span>
<span class="token function">docker</span> pull registry.cn-hangzhou.aliyuncs.com/google_containers/dashboard:v2.7.0
<span class="token function">docker</span> tag registry.cn-hangzhou.aliyuncs.com/google_containers/dashboard:v2.7.0 
<span class="token function">docker</span> push hb.oiox.cn/library/dashboard:v2.7.0
<span class="token function">docker</span> pull hb.oiox.cn/library/dashboard:v2.7.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18);function u(b,m){const s=l("router-link");return o(),c("div",null,[n("nav",v,[n("ul",null,[n("li",null,[a(s,{to:"#前置准备"},{default:e(()=>[i("前置准备")]),_:1})]),n("li",null,[a(s,{to:"#下载harbor安装包"},{default:e(()=>[i("下载harbor安装包")]),_:1})]),n("li",null,[a(s,{to:"#创建证书"},{default:e(()=>[i("创建证书")]),_:1})]),n("li",null,[a(s,{to:"#配置docker证书"},{default:e(()=>[i("配置docker证书")]),_:1})]),n("li",null,[a(s,{to:"#查看文件"},{default:e(()=>[i("查看文件")]),_:1})]),n("li",null,[a(s,{to:"#配置harbor服务"},{default:e(()=>[i("配置harbor服务")]),_:1})]),n("li",null,[a(s,{to:"#安装harbor"},{default:e(()=>[i("安装harbor")]),_:1})]),n("li",null,[a(s,{to:"#配置解析和docker"},{default:e(()=>[i("配置解析和docker")]),_:1})]),n("li",null,[a(s,{to:"#测试使用"},{default:e(()=>[i("测试使用")]),_:1})])])]),p])}const g=r(d,[["render",u],["__file","11.安装Harbor.html.vue"]]);export{g as default};
