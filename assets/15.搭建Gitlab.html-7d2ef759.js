import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o,c as r,e as u,a as n,d as a,w as l,b as s,f as e}from"./app-efa5e96e.js";const d={},k=n("p",null,"GitLab 是一个用于仓库管理系统的开源项目，使用 Git 作为代码管理工具，并在此基础上搭建起来的 web 服务。",-1),v={class:"table-of-contents"},b=e(`<h2 id="centos7-安装-gitlab-ce" tabindex="-1"><a class="header-anchor" href="#centos7-安装-gitlab-ce" aria-hidden="true">#</a> CentOS7 安装 gitlab-ce</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">########################</span>
<span class="token comment">## gitlab官网介绍：https://about.gitlab.com/</span>
<span class="token comment">## gitlab官方文档：https://docs.gitlab.com/</span>
<span class="token comment">## gitlab中文文档：https://docs.gitlab.cn/jh/install/docker.html</span>
<span class="token comment">## gitlab代码地址：https://gitlab.com/</span>
<span class="token comment">## 官网安装介绍：https://about.gitlab.com/install/#centos-7</span>
<span class="token comment">## RPM安装包地址：https://packages.gitlab.com/gitlab/gitlab-ce</span>
<span class="token comment">## 清华大学开源软件镜像站 https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/</span>
<span class="token comment">## GitLab认证：https://docs.gitlab.com/ee/integration/omniauth.html</span>
<span class="token comment">########################</span>
<span class="token comment"># 前置条件</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token function">wget</span> <span class="token function">vim</span> net-tools <span class="token function">lsof</span> <span class="token function">git</span> <span class="token function">curl</span> policycoreutils-python openssh-server openssh-clients cronie
firewall-cmd <span class="token parameter variable">--permanent</span> --add-service<span class="token operator">=</span>http
firewall-cmd <span class="token parameter variable">--permanent</span> --add-service<span class="token operator">=</span>https
systemctl reload firewalld
<span class="token comment"># 下载安装包</span>
<span class="token function">wget</span> --content-disposition https://packages.gitlab.com/gitlab/gitlab-ce/packages/el/7/gitlab-ce-14.6.0-ce.0.el7.x86_64.rpm/download.rpm
<span class="token comment"># 安装rpm包</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> gitlab-ce-14.6.0-ce.0.el7.x86_64.rpm
<span class="token comment"># 修改对外访问的域名或IP，注意gitlab默认会占用一些端口，比如：80，8080，8082，9090等</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/external_url .*/external_url &#39;http:\\/\\/192.168.13.100:9091&#39;/g&quot;</span> /etc/gitlab/gitlab.rb
<span class="token comment"># 重新生成相关配置文件，执行此命令时间比较长</span>
gitlab-ctl reconfigure
<span class="token comment"># 上面没有错误，重启gitlab</span>
gitlab-ctl restart
<span class="token comment"># 配置gitlab开机自动启动</span>
systemctl <span class="token builtin class-name">enable</span> gitlab-runsvdir.service
<span class="token comment"># gitlab服务启动|停止|重启|状态|日志</span>
gitlab-ctl start<span class="token operator">|</span>stop<span class="token operator">|</span>restart<span class="token operator">|</span>status<span class="token operator">|</span><span class="token function">tail</span>
<span class="token comment"># 查看 gitlab 版本</span>
<span class="token function">cat</span> /opt/gitlab/embedded/service/gitlab-rails/VERSION
<span class="token function">head</span> <span class="token parameter variable">-1</span> /opt/gitlab/version-manifest.txt
<span class="token comment"># gitlab初始化root密码</span>
<span class="token function">cat</span> /etc/gitlab/initial_root_password

<span class="token comment">###### 补充</span>
<span class="token comment"># 修改HTTP默认的80端口，用于HTTP克隆项目，改完直接重启即可 gitlab-ctl restart</span>
<span class="token comment">#docker exec -it gitlab vi /var/opt/gitlab/gitlab-rails/etc/gitlab.yml</span>
<span class="token comment"># gitlab:</span>
<span class="token comment">#   host: 192.168.10.151  # 默认的是容器id，这里修改成宿主机IP</span>
<span class="token comment">#   port: 8090            # 需要修改成通过宿主机访问的那个端口</span>
<span class="token comment">#   https: false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-搭建" tabindex="-1"><a class="header-anchor" href="#docker-搭建" aria-hidden="true">#</a> docker 搭建</h2><details class="hint-container details"><summary>docker-compose.yml</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>version: <span class="token string">&#39;3&#39;</span>
services:
  gitlab:
    image: gitlab/gitlab-ce:14.6.3-ce.0
    container_name: gitlab
    restart: always
    environment:
      TZ: <span class="token string">&quot;Asia/Shanghai&quot;</span>
      GITLAB_ROOT_PASSWORD: <span class="token string">&#39;aA123456&#39;</span>
      GITLAB_OMNIBUS_CONFIG: <span class="token operator">|</span>
        external_url <span class="token string">&#39;http://192.168.13.100:9080&#39;</span>
        gitlab_rails<span class="token punctuation">[</span><span class="token string">&#39;gitlab_shell_ssh_port&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">9022</span>
    ports:
      - <span class="token string">&#39;9080:80&#39;</span>
      - <span class="token string">&#39;9022:22&#39;</span>
    volumes:
      - <span class="token string">&#39;./data/conf:/etc/gitlab&#39;</span>
      - <span class="token string">&#39;./data/logs:/var/log/gitlab&#39;</span>
      - <span class="token string">&#39;./data/data:/var/opt/gitlab&#39;</span>
    ulimits:
        nproc: <span class="token number">65535</span>
        nofile:
          soft: <span class="token number">65535</span>
          hard: <span class="token number">65535</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,4),m={class:"hint-container details"},g=e(`<summary>start.sh</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment"># docker部署gitlab</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>

<span class="token comment"># 创建挂载目录</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> ./data
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ./data/<span class="token punctuation">{</span>conf,logs,data<span class="token punctuation">}</span>
<span class="token comment"># 启动容器</span>
<span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>

<span class="token comment"># 查看 gitlab 版本</span>
<span class="token builtin class-name">echo</span> 成功安装gitlab，版本: <span class="token variable"><span class="token variable">\`</span><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> gitlab <span class="token function">cat</span> /opt/gitlab/embedded/service/gitlab-rails/VERSION<span class="token variable">\`</span></span>，正在启动，请稍后访问：http://192.68.13.100:9080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),_={href:"http://start.sh",target:"_blank",rel:"noopener noreferrer"},h=e(`<h2 id="破解-gitlab-ee-的授权证书" tabindex="-1"><a class="header-anchor" href="#破解-gitlab-ee-的授权证书" aria-hidden="true">#</a> 破解 gitlab-ee 的授权证书</h2><details class="hint-container details"><summary>Dockerfile</summary><div class="language-Dockerfile line-numbers-mode" data-ext="Dockerfile"><pre class="language-Dockerfile"><code>FROM ruby:3.1.0
WORKDIR /opt
RUN gem install gitlab-license
ADD ./license.rb /opt/license.rb
RUN ruby license.rb
CMD [ &quot;bash&quot; ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,2),f=e(`<details class="hint-container details"><summary>license.rb</summary><div class="language-ruby line-numbers-mode" data-ext="rb"><pre class="language-ruby"><code><span class="token keyword">require</span> <span class="token string-literal"><span class="token string">&quot;openssl&quot;</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">&quot;gitlab/license&quot;</span></span>

key_pair <span class="token operator">=</span> OpenSSL<span class="token double-colon punctuation">::</span>PKey<span class="token double-colon punctuation">::</span><span class="token constant">RSA</span><span class="token punctuation">.</span>generate<span class="token punctuation">(</span><span class="token number">2048</span><span class="token punctuation">)</span>
<span class="token builtin">File</span><span class="token punctuation">.</span>open<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;license_key&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;w&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">|</span>f<span class="token operator">|</span> f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>key_pair<span class="token punctuation">.</span>to_pem<span class="token punctuation">)</span> <span class="token punctuation">}</span>

public_key <span class="token operator">=</span> key_pair<span class="token punctuation">.</span>public_key
<span class="token builtin">File</span><span class="token punctuation">.</span>open<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;license_key.pub&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;w&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">|</span>f<span class="token operator">|</span> f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>public_key<span class="token punctuation">.</span>to_pem<span class="token punctuation">)</span> <span class="token punctuation">}</span>

private_key <span class="token operator">=</span> OpenSSL<span class="token double-colon punctuation">::</span>PKey<span class="token double-colon punctuation">::</span><span class="token class-name">RSA</span><span class="token punctuation">.</span><span class="token keyword">new</span> <span class="token builtin">File</span><span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;license_key&quot;</span></span><span class="token punctuation">)</span>
Gitlab<span class="token double-colon punctuation">::</span>License<span class="token punctuation">.</span>encryption_key <span class="token operator">=</span> private_key

license <span class="token operator">=</span> Gitlab<span class="token double-colon punctuation">::</span><span class="token class-name">License</span><span class="token punctuation">.</span><span class="token keyword">new</span>
license<span class="token punctuation">.</span>licensee <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string-literal"><span class="token string">&quot;Name&quot;</span></span> <span class="token operator">=&gt;</span> <span class="token string-literal"><span class="token string">&quot;none&quot;</span></span><span class="token punctuation">,</span>
  <span class="token string-literal"><span class="token string">&quot;Company&quot;</span></span> <span class="token operator">=&gt;</span> <span class="token string-literal"><span class="token string">&quot;none&quot;</span></span><span class="token punctuation">,</span>
  <span class="token string-literal"><span class="token string">&quot;Email&quot;</span></span> <span class="token operator">=&gt;</span> <span class="token string-literal"><span class="token string">&quot;admin@example.com&quot;</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
license<span class="token punctuation">.</span>starts_at <span class="token operator">=</span> <span class="token class-name">Date</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token number">2020</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment"># 开始时间</span>
license<span class="token punctuation">.</span>expires_at <span class="token operator">=</span> <span class="token class-name">Date</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token number">2050</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment"># 结束时间</span>
license<span class="token punctuation">.</span>notify_admins_at <span class="token operator">=</span> <span class="token class-name">Date</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token number">2049</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
license<span class="token punctuation">.</span>notify_users_at <span class="token operator">=</span> <span class="token class-name">Date</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token number">2049</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
license<span class="token punctuation">.</span>block_changes_at <span class="token operator">=</span> <span class="token class-name">Date</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token number">2050</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
license<span class="token punctuation">.</span>restrictions <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token symbol">active_user_count</span><span class="token operator">:</span> <span class="token number">10000</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

puts <span class="token string-literal"><span class="token string">&quot;License:&quot;</span></span>
puts license

data <span class="token operator">=</span> license<span class="token punctuation">.</span>export
puts <span class="token string-literal"><span class="token string">&quot;Exported license:&quot;</span></span>
puts data
<span class="token builtin">File</span><span class="token punctuation">.</span>open<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;.gitlab-license&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;w&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">|</span>f<span class="token operator">|</span> f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">}</span>

public_key <span class="token operator">=</span> OpenSSL<span class="token double-colon punctuation">::</span>PKey<span class="token double-colon punctuation">::</span><span class="token class-name">RSA</span><span class="token punctuation">.</span><span class="token keyword">new</span> <span class="token builtin">File</span><span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;license_key.pub&quot;</span></span><span class="token punctuation">)</span>
Gitlab<span class="token double-colon punctuation">::</span>License<span class="token punctuation">.</span>encryption_key <span class="token operator">=</span> public_key

data <span class="token operator">=</span> <span class="token builtin">File</span><span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;.gitlab-license&quot;</span></span><span class="token punctuation">)</span>
<span class="token variable">$license</span> <span class="token operator">=</span> Gitlab<span class="token double-colon punctuation">::</span>License<span class="token punctuation">.</span>import<span class="token punctuation">(</span>data<span class="token punctuation">)</span>

puts <span class="token string-literal"><span class="token string">&quot;Imported license:&quot;</span></span>
puts <span class="token variable">$license</span>

<span class="token keyword">unless</span> <span class="token variable">$license</span>
  <span class="token keyword">raise</span> <span class="token string-literal"><span class="token string">&quot;The license is invalid.&quot;</span></span>
<span class="token keyword">end</span>

<span class="token keyword">if</span> <span class="token variable">$license</span><span class="token punctuation">.</span>restricted<span class="token operator">?</span><span class="token punctuation">(</span><span class="token symbol">:active_user_count</span><span class="token punctuation">)</span>
  active_user_count <span class="token operator">=</span> <span class="token number">10000</span>
  <span class="token keyword">if</span> active_user_count <span class="token operator">&gt;</span> <span class="token variable">$license</span><span class="token punctuation">.</span>restrictions<span class="token punctuation">[</span><span class="token symbol">:active_user_count</span><span class="token punctuation">]</span>
    <span class="token keyword">raise</span> <span class="token string-literal"><span class="token string">&quot;The active user count exceeds the allowed amount!&quot;</span></span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>

<span class="token keyword">if</span> <span class="token variable">$license</span><span class="token punctuation">.</span>notify_admins<span class="token operator">?</span>
  puts <span class="token string-literal"><span class="token string">&quot;The license is due to expire on </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"><span class="token variable">$license</span><span class="token punctuation">.</span>expires_at</span><span class="token delimiter punctuation">}</span></span><span class="token string">.&quot;</span></span>
<span class="token keyword">end</span>

<span class="token keyword">if</span> <span class="token variable">$license</span><span class="token punctuation">.</span>notify_users<span class="token operator">?</span>
  puts <span class="token string-literal"><span class="token string">&quot;The license is due to expire on </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"><span class="token variable">$license</span><span class="token punctuation">.</span>expires_at</span><span class="token delimiter punctuation">}</span></span><span class="token string">.&quot;</span></span>
<span class="token keyword">end</span>

<span class="token keyword">module</span> <span class="token class-name">Gitlab</span>
  <span class="token keyword">class</span> <span class="token class-name">GitAccess</span>
    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">check</span></span><span class="token punctuation">(</span>cmd<span class="token punctuation">,</span> changes <span class="token operator">=</span> <span class="token keyword">nil</span><span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token variable">$license</span><span class="token punctuation">.</span>block_changes<span class="token operator">?</span>
        <span class="token keyword">return</span> build_status_object<span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;License expired&quot;</span></span><span class="token punctuation">)</span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>

puts <span class="token string-literal"><span class="token string">&quot;This instance of GitLab Enterprise Edition is licensed to:&quot;</span></span>
<span class="token variable">$license</span><span class="token punctuation">.</span>licensee<span class="token punctuation">.</span><span class="token keyword">each</span> <span class="token keyword">do</span> <span class="token operator">|</span>key<span class="token punctuation">,</span> value<span class="token operator">|</span>
  puts <span class="token string-literal"><span class="token string">&quot;</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">key</span><span class="token delimiter punctuation">}</span></span><span class="token string">: </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">value</span><span class="token delimiter punctuation">}</span></span><span class="token string">&quot;</span></span>
<span class="token keyword">end</span>

<span class="token keyword">if</span> <span class="token variable">$license</span><span class="token punctuation">.</span>expired<span class="token operator">?</span>
  puts <span class="token string-literal"><span class="token string">&quot;The license expired on </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"><span class="token variable">$license</span><span class="token punctuation">.</span>expires_at</span><span class="token delimiter punctuation">}</span></span><span class="token string">&quot;</span></span>
<span class="token keyword">elsif</span> <span class="token variable">$license</span><span class="token punctuation">.</span>will_expire<span class="token operator">?</span>
  puts <span class="token string-literal"><span class="token string">&quot;The license will expire on </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"><span class="token variable">$license</span><span class="token punctuation">.</span>expires_at</span><span class="token delimiter punctuation">}</span></span><span class="token string">&quot;</span></span>
<span class="token keyword">else</span>
  puts <span class="token string-literal"><span class="token string">&quot;The license will never expire.&quot;</span></span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>keygen.sh</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment"># 生成 Gitlab License</span>

<span class="token assign-left variable">IMAGE_NAME</span><span class="token operator">=</span><span class="token string">&quot;gitlab_license&quot;</span>
<span class="token assign-left variable">CONTAINER_NAME</span><span class="token operator">=</span><span class="token string">&quot;gen_gitlab_license&quot;</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;Building image ...&quot;</span>
<span class="token function">docker</span> build <span class="token builtin class-name">.</span> <span class="token parameter variable">-t</span> <span class="token variable">\${IMAGE_NAME}</span>
<span class="token function">sleep</span> <span class="token number">2</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;Generate gitlab license ...&quot;</span>
<span class="token assign-left variable">IMAGE_ID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">docker</span> image <span class="token function">ls</span> <span class="token parameter variable">-aq</span> <span class="token parameter variable">--filter</span> <span class="token assign-left variable">reference</span><span class="token operator">=</span>$<span class="token punctuation">{</span>IMAGE_NAME<span class="token punctuation">}</span><span class="token variable">\`</span></span>
<span class="token function">docker</span> run <span class="token parameter variable">--name</span><span class="token operator">=</span><span class="token variable">\${CONTAINER_NAME}</span> <span class="token variable">\${IMAGE_ID}</span> <span class="token function">bash</span>
<span class="token function">sleep</span> <span class="token number">2</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;Copy gitlab license to .&quot;</span>
<span class="token assign-left variable">DOCKER_ID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-aq</span> <span class="token parameter variable">--filter</span> <span class="token assign-left variable">name</span><span class="token operator">=</span>$<span class="token punctuation">{</span>CONTAINER_NAME<span class="token punctuation">}</span><span class="token variable">\`</span></span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">\${DOCKER_ID}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token function">docker</span> <span class="token function">cp</span> <span class="token variable">\${DOCKER_ID}</span>:/opt/license_key ./license_key
    <span class="token function">docker</span> <span class="token function">cp</span> <span class="token variable">\${DOCKER_ID}</span>:/opt/license_key.pub ./license_key.pub
    <span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token variable">\${DOCKER_ID}</span>
    <span class="token function">docker</span> rmi <span class="token parameter variable">-f</span> <span class="token variable">\${IMAGE_ID}</span>
<span class="token keyword">fi</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;结束......&quot;</span>
<span class="token builtin class-name">exit</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,2),y={href:"http://keygen.sh",target:"_blank",rel:"noopener noreferrer"},q=n("p",null,"cp -avf license_key.pub /opt/gitlab/embedded/service/gitlab-rails/.license_encryption_key.pub",-1),w=n("p",null,'sed -i "s@|| STARTER_PLAN@|| ULTIMATE_PLAN@g" /opt/gitlab/embedded/service/gitlab-rails/ee/app/models/license.rb',-1),x=n("p",null,"配置启动 gitlab 即可：gitlab-ctl reconfigure && gitlab-ctl restart",-1),E=e(`<h2 id="gitlab-卸载" tabindex="-1"><a class="header-anchor" href="#gitlab-卸载" aria-hidden="true">#</a> gitlab 卸载</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 停止服务</span>
gitlab-ctl stop
<span class="token comment"># 查看gitlab进程</span>
<span class="token function">ps</span> aux <span class="token operator">|</span> <span class="token function">grep</span> gitlab
<span class="token comment"># 卸载gitlab</span>
<span class="token function">rpm</span> <span class="token parameter variable">-e</span> gitlab-ce
<span class="token comment"># 删除所有包含gitlab文件</span>
<span class="token function">find</span> / <span class="token parameter variable">-name</span> gitlab <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token function">rm</span> <span class="token parameter variable">-rf</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function I(A,D){const t=p("router-link"),i=p("ExternalLinkIcon");return o(),r("div",null,[k,u(" more "),n("nav",v,[n("ul",null,[n("li",null,[a(t,{to:"#centos7-安装-gitlab-ce"},{default:l(()=>[s("CentOS7 安装 gitlab-ce")]),_:1})]),n("li",null,[a(t,{to:"#docker-搭建"},{default:l(()=>[s("docker 搭建")]),_:1})]),n("li",null,[a(t,{to:"#gitlab-卸载"},{default:l(()=>[s("gitlab 卸载")]),_:1})])])]),b,n("details",m,[g,n("blockquote",null,[n("p",null,[s("将 docker-compose.yml 和 "),n("a",_,[s("start.sh"),a(i)]),s(" 放在同一目录，执行 ./start.sh 即可。启动时，注意端口占用情况。")])]),h]),f,n("blockquote",null,[n("p",null,[s("将 Dockerfile、license.rb、"),n("a",y,[s("keygen.sh"),a(i)]),s(" 放在同一目录下， 执行./keygen.sh 得到 license_key 和 license_key.pub")]),q,w,x]),E])}const T=c(d,[["render",I],["__file","15.搭建Gitlab.html.vue"]]);export{T as default};
