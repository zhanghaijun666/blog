import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as t,c,e as o,a as n,d as e,w as l,b as s,f as p}from"./app-efa5e96e.js";const m={},d=n("p",null,[s("harbor 是一个 docker 私有镜像仓库。"),n("br"),s(" Harbor 的优势：")],-1),v=n("ul",null,[n("li",null,"图形管理界面、"),n("li",null,"按项目管理镜像、"),n("li",null,"独立的用户管理，不同用户可以操作不同镜像，细粒度的权限控制，包含 create、push 、pull、delete"),n("li",null,"镜像管理"),n("li",null,"标签管理、"),n("li",null,"操作日志管理。")],-1),u={class:"table-of-contents"},b=p(`<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">########################</span>
<span class="token comment">## 官网：https://goharbor.io/</span>
<span class="token comment">## 官方开源：https://github.com/goharbor/harbor</span>
<span class="token comment">## 安装包下载地址：https://github.com/goharbor/harbor/releases</span>
<span class="token comment">########################</span>

<span class="token comment"># 确保已经安装docker和docker-compose</span>
<span class="token function">docker</span> <span class="token parameter variable">-v</span>
<span class="token function">docker-compose</span> <span class="token parameter variable">-v</span>
<span class="token comment"># 下载安装包</span>
<span class="token function">wget</span> https://github.com/goharbor/harbor/releases/download/v1.10.10/harbor-offline-installer-v1.10.10.tgz
<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> harbor-offline-installer-v1.10.10.tgz <span class="token parameter variable">-C</span> /usr/local/lib/
<span class="token function">ls</span> /usr/local/lib/harbor
<span class="token comment"># 备份一下默认的配置文件</span>
<span class="token function">cp</span> /usr/local/lib/harbor/harbor.yml /usr/local/lib/harbor/harbor.yml.default
<span class="token comment"># 修改配置文件 hostname</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/hostname:.*/hostname: localhost/g&#39;</span> /usr/local/lib/harbor/harbor.yml
<span class="token comment"># hostname: localhost</span>
<span class="token comment"># http:</span>
<span class="token comment">#   port: 8080</span>
<span class="token comment"># ## 如果使用HTTPS需要添加证书，证书生成的方法在下面</span>
<span class="token comment"># #https:</span>
<span class="token comment"># #  port: 8081</span>
<span class="token comment">#   # 证书的位置</span>
<span class="token comment"># #  certificate: /data/certs/server.crt</span>
<span class="token comment"># #  private_key: /data/certs/server.key</span>
<span class="token comment"># # 默认账号 admin 的初始密码</span>
<span class="token comment"># harbor_admin_password: Harbor12345</span>
<span class="token comment"># 配置生效且安装harbor</span>
<span class="token builtin class-name">cd</span> /usr/local/lib/harbor <span class="token operator">&amp;&amp;</span> ./prepare <span class="token operator">&amp;&amp;</span> ./install.sh
<span class="token comment"># 安装完毕访问地址：http://192.168.13.103:8080 默认：admin/Harbor12345</span>

<span class="token comment"># 停止harbor</span>
<span class="token builtin class-name">cd</span> /usr/local/lib/harbor <span class="token operator">&amp;&amp;</span> <span class="token function">docker-compose</span> down
<span class="token comment"># 配置service</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /lib/systemd/system/harbor.service <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
[Unit]
Description=Harbor
After=docker.service systemd-networkd.service systemd-resolved.service
Requires=docker.service
Documentation=http://github.com/vmware/harbor

[Service]
Type=simple
Restart=on-failure
RestartSec=5
ExecStart=/usr/local/bin/docker-compose -f  /usr/local/lib/harbor/docker-compose.yml up
ExecStop=/usr/local/bin/docker-compose -f /usr/local/lib/harbor/docker-compose.yml down

[Install]
WantedBy=multi-user.target
EOF</span>
<span class="token comment"># 加载配置并设置开机自启</span>
systemctl daemon-reload <span class="token operator">&amp;&amp;</span> systemctl <span class="token builtin class-name">enable</span> harbor
<span class="token comment"># 启动harbor</span>
systemctl restart harbor <span class="token operator">&amp;&amp;</span> systemctl status harbor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-信任配置" tabindex="-1"><a class="header-anchor" href="#docker-信任配置" aria-hidden="true">#</a> docker 信任配置</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 配置 { &quot;insecure-registries&quot;: [&quot;192.168.13.103:8080&quot;] }</span>
<span class="token function">vi</span>  /etc/docker/daemon.json
<span class="token comment"># 重启docker</span>
systemctl daemon-reload <span class="token operator">&amp;&amp;</span> systemctl restart docker.service
<span class="token comment"># 用docker登录harbor</span>
<span class="token function">docker</span> login <span class="token number">192.168</span>.13.103:8080 <span class="token parameter variable">-u</span> 用户名 <span class="token parameter variable">-p</span> 密码
<span class="token comment"># 下载image</span>
<span class="token function">docker</span> pull nginx:1.21.5
<span class="token comment"># 在项目中标记镜像</span>
<span class="token function">docker</span> tag nginx:1.21.5 <span class="token number">192.168</span>.13.103:8080/library/nginx:1.21.5
<span class="token comment"># 推送镜像到当前项目</span>
<span class="token function">docker</span> push <span class="token number">192.168</span>.13.103:8080/library/nginx:1.21.5
<span class="token comment"># 下载镜像</span>
<span class="token function">docker</span> pull <span class="token number">192.168</span>.13.103:8080/library/nginx:1.21.5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="https-生成证书-http-可忽略" tabindex="-1"><a class="header-anchor" href="#https-生成证书-http-可忽略" aria-hidden="true">#</a> https 生成证书（http 可忽略）</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入创建的存储证书的目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /data/certs/ <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> /data/certs/
<span class="token comment"># 首先生成证书私钥 数据密码，回车</span>
openssl genrsa <span class="token parameter variable">-des3</span> <span class="token parameter variable">-out</span> server.key <span class="token number">2048</span>
<span class="token comment"># 证书的服务 数据上面的密码，回车</span>
openssl req <span class="token parameter variable">-new</span> <span class="token parameter variable">-key</span> server.key <span class="token parameter variable">-out</span> server.csr
<span class="token comment"># 输出内容为：</span>
<span class="token comment"># Enter pass phrase for root.key: ← 输入前面创建的密码</span>
<span class="token comment"># Country Name (2 letter code) [AU]:CN ← 国家代号，中国输入CN</span>
<span class="token comment"># State or Province Name (full name) [Some-State]:BeiJing ← 省的全名，拼音</span>
<span class="token comment"># Locality Name (eg, city) []:BeiJing ← 市的全名，拼音</span>
<span class="token comment"># Organization Name (eg, company) [Internet Widgits Pty Ltd]:MyCompany Corp. ← 公司英文名</span>
<span class="token comment"># Organizational Unit Name (eg, section) []: ← 可以不输入</span>
<span class="token comment"># Common Name (eg, YOUR name) []: ← 此时不输入</span>
<span class="token comment"># Email Address []:admin@mycompany.com ← 电子邮箱，可随意填</span>
<span class="token comment"># Please enter the following ‘extra’ attributes</span>
<span class="token comment"># to be sent with your certificate request</span>
<span class="token comment"># A challenge password []: ← 可以不输入</span>
<span class="token comment"># An optional company name []: ← 可以不输入</span>
<span class="token comment"># 备份私钥</span>
<span class="token function">cp</span> server.key server.key.org
<span class="token comment"># 转换为证书</span>
openssl rsa <span class="token parameter variable">-in</span> server.key.org <span class="token parameter variable">-out</span> server.key
<span class="token comment"># 给证书签名</span>
openssl x509 <span class="token parameter variable">-req</span> <span class="token parameter variable">-days</span> <span class="token number">365</span> <span class="token parameter variable">-in</span> server.csr <span class="token parameter variable">-signkey</span> server.key <span class="token parameter variable">-out</span> server.crt
<span class="token comment"># 给所有的证书授权</span>
<span class="token function">chmod</span> <span class="token number">755</span> *
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function k(h,g){const a=r("router-link");return t(),c("div",null,[d,v,o(" more "),n("nav",u,[n("ul",null,[n("li",null,[e(a,{to:"#安装"},{default:l(()=>[s("安装")]),_:1})]),n("li",null,[e(a,{to:"#docker-信任配置"},{default:l(()=>[s("docker 信任配置")]),_:1})]),n("li",null,[e(a,{to:"#https-生成证书-http-可忽略"},{default:l(()=>[s("https 生成证书（http 可忽略）")]),_:1})])])]),b])}const _=i(m,[["render",k],["__file","30.搭建Harbor.html.vue"]]);export{_ as default};
