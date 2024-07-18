import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as c,c as d,a as s,d as n,w as l,b as e,f as t}from"./app-efa5e96e.js";const p={},u={class:"table-of-contents"},m=t(`<h2 id="主机准备" tabindex="-1"><a class="header-anchor" href="#主机准备" aria-hidden="true">#</a> 主机准备</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 时间同步</span>
imedatectl set-timezone Asia/Shanghai
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> ntpdate
/usr/sbin/ntpdate <span class="token parameter variable">-u</span> ntp1.aliyun.com

<span class="token builtin class-name">echo</span> <span class="token string">&quot;0 5 * * * /usr/sbin/ntpdate -u ntp1.aliyun.com &gt;/dev/null &amp;&quot;</span> <span class="token operator">&gt;&gt;</span> /var/spool/cron/root
<span class="token function">crontab</span> <span class="token parameter variable">-l</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="prometheus" tabindex="-1"><a class="header-anchor" href="#prometheus" aria-hidden="true">#</a> Prometheus</h2>`,3),v={href:"https://github.com/prometheus/prometheus/releases",target:"_blank",rel:"noopener noreferrer"},b={href:"https://prometheus.io/download/",target:"_blank",rel:"noopener noreferrer"},h=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> https://github.com/prometheus/prometheus/releases/download/v2.45.3/prometheus-2.45.3.linux-amd64.tar.gz

<span class="token function">tar</span> xzf prometheus-2.45.3.linux-amd64.tar.gz <span class="token parameter variable">-C</span> /usr/local/
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/local/prometheus-2.45.3.linux-amd64 /usr/local/prometheus

<span class="token comment">## 命令行启动</span>
./prometheus <span class="token parameter variable">--config.file</span><span class="token operator">=</span>prometheus.yml <span class="token operator">&amp;</span>
<span class="token comment">## 热启动 </span>
./prometheus --web.enable-lifecycle <span class="token parameter variable">--config.file</span><span class="token operator">=</span>prometheus.yml <span class="token operator">&amp;</span>
<span class="token function">curl</span> <span class="token parameter variable">-XPOST</span> http://127.0.0.1:9090/-/reload

<span class="token comment">## 注册服务</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /usr/lib/systemd/system/prometheus.service <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
[Unit]

[Service]
ExecStart=/usr/local/prometheus/prometheus --config.file=/usr/local/prometheus/prometheus.yml
ExecReload=/bin/kill -HUP \\<span class="token variable">$MAINPID</span>

[Install]
WantedBy=multi-user.target
Alias=dbus-org.fedoraproject.FirewallD1.service
EOF</span>

<span class="token comment">## 服务启动</span>
systemctl daemon-reload
systemctl status prometheus.service
systemctl start prometheus.service

<span class="token comment">## 端口访问</span>
<span class="token function">curl</span> http://192.168.60.128:9090
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="grafana" tabindex="-1"><a class="header-anchor" href="#grafana" aria-hidden="true">#</a> Grafana</h2><blockquote><p>Grafana 是一个开源的度量分析及可视化套件。通过访问数据库（如InfluxDB、Prometheus），展示自定义图表。</p></blockquote>`,3),k={href:"https://grafana.com/zh-cn/grafana/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://grafana.com/grafana/download",target:"_blank",rel:"noopener noreferrer"},g={href:"https://mirrors.huaweicloud.com/grafana/",target:"_blank",rel:"noopener noreferrer"},_={href:"https://grafana.com/grafana/dashboards/",target:"_blank",rel:"noopener noreferrer"},x=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## yum install -y https://dl.grafana.com/enterprise/release/grafana-enterprise-10.3.1-1.x86_64.rpm</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> https://mirrors.huaweicloud.com/grafana/10.3.1/grafana-enterprise-10.3.1-1.x86_64.rpm

<span class="token function">ls</span> <span class="token parameter variable">-l</span> /usr/share/grafana/bin/
systemctl start grafana-server.service
systemctl status grafana-server.service

<span class="token function">curl</span> http://192.168.60.128:3000  <span class="token comment">## 登录 admin/admin</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="exporter" tabindex="-1"><a class="header-anchor" href="#exporter" aria-hidden="true">#</a> Exporter</h2><blockquote><p>Exporter 是 Prometheus 推出的针对服务器状态监控的 Metrics 工具。目前开发中常见的组件都有对应的 exporter 可以直接使用。常见的有两大类，一种是社区提供的，包含数据库，消息队列，存储，HTTP服务，日志等，比如 node_exporter，mysqld_exporter等；还有一种是用户自定义的 exporter，可以基于官方提供的 Client Library 创建自己的 exporter 程序。<br> 每个 exporter 的一个实例被称为 target，Prometheus 通过轮询的方式定期从这些 target 中获取样本数据。</p></blockquote><h2 id="监控mysql" tabindex="-1"><a class="header-anchor" href="#监控mysql" aria-hidden="true">#</a> 监控MySQL</h2>`,4),y={href:"https://github.com/prometheus/mysqld_exporter/releases",target:"_blank",rel:"noopener noreferrer"},E=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> https://github.com/prometheus/mysqld_exporter/releases/download/v0.15.0/mysqld_exporter-0.15.0.linux-amd64.tar.gz
<span class="token function">tar</span> xzf mysqld_exporter-0.15.0.linux-amd64.tar.gz
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /usr/local/prometheus-exporter/mysql <span class="token operator">&amp;&amp;</span> <span class="token function">mv</span> mysqld_exporter-0.15.0.linux-amd64/mysqld_exporter /usr/local/prometheus-exporter/mysql/
<span class="token builtin class-name">cd</span> /usr/local/prometheus-exporter/mysql

<span class="token comment">## mysql授权</span>
CREATE <span class="token environment constant">USER</span> <span class="token string">&#39;exporter&#39;</span>@<span class="token string">&#39;127.0.0.1&#39;</span> IDENTIFIED BY <span class="token string">&#39;exporter&#39;</span> WITH MAX_USER_CONNECTIONS <span class="token number">3</span><span class="token punctuation">;</span>
GRANT PROCESS, REPLICATION CLIENT, SELECT ON *.* TO <span class="token string">&#39;exporter&#39;</span>@<span class="token string">&#39;127.0.0.1&#39;</span><span class="token punctuation">;</span>
flush privileges<span class="token punctuation">;</span>
<span class="token comment">## 或者</span>
GRANT PROCESS, REPLICATION CLIENT, SELECT ON *.* TO <span class="token string">&#39;exporter&#39;</span>@<span class="token string">&#39;localhost&#39;</span> IDENTIFIED BY <span class="token string">&#39;expoter12Ssdc3&#39;</span> WITH MAX_USER_CONNECTIONS <span class="token number">3</span><span class="token punctuation">;</span>
flush privileges<span class="token punctuation">;</span>

<span class="token comment">## 配置Prometheus监控数据库用户信息</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> .my.cnf <span class="token operator">&lt;&lt;</span><span class="token string">EOF
[client]
host=127.0.0.1
user=exporter
password=exporter
EOF</span>

<span class="token comment">## 配置systemd管理</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /usr/lib/systemd/system/mysqld_exporter.service <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
[Unit]
Description=mysqld_exporter Service
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/prometheus-exporter/mysql/mysqld_exporter --config.my-cnf=/usr/local/prometheus-exporter/mysql/.my.cnf
ExecReload=/bin/kill -HUP \\<span class="token variable">$MAINPID</span>
Restart=on-failure
RestartSec=30s

[Install]
WantedBy=multi-user.target
EOF</span>

systemctl status  mysqld_exporter

<span class="token comment">##  端口查看</span>
ss <span class="token parameter variable">-anput</span> <span class="token operator">|</span><span class="token function">grep</span> <span class="token number">9104</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置prometheus监控" tabindex="-1"><a class="header-anchor" href="#配置prometheus监控" aria-hidden="true">#</a> 配置Prometheus监控</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> /usr/local/prometheus/prometheus.yml

  - job_name: <span class="token string">&quot;MySQL_115&quot;</span>
    static_configs:
      - targets: <span class="token punctuation">[</span><span class="token string">&quot;127.0.0.1:9104&quot;</span><span class="token punctuation">]</span>

systemctl restart prometheus.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function q(I,S){const r=i("router-link"),a=i("ExternalLinkIcon");return c(),d("div",null,[s("nav",u,[s("ul",null,[s("li",null,[n(r,{to:"#主机准备"},{default:l(()=>[e("主机准备")]),_:1})]),s("li",null,[n(r,{to:"#prometheus"},{default:l(()=>[e("Prometheus")]),_:1})]),s("li",null,[n(r,{to:"#grafana"},{default:l(()=>[e("Grafana")]),_:1})]),s("li",null,[n(r,{to:"#exporter"},{default:l(()=>[e("Exporter")]),_:1})]),s("li",null,[n(r,{to:"#监控mysql"},{default:l(()=>[e("监控MySQL")]),_:1}),s("ul",null,[s("li",null,[n(r,{to:"#配置prometheus监控"},{default:l(()=>[e("配置Prometheus监控")]),_:1})])])])])]),m,s("ul",null,[s("li",null,[e("下载地址："),s("a",v,[e("https://github.com/prometheus/prometheus/releases"),n(a)])]),s("li",null,[e("官网下载地址："),s("a",b,[e("https://prometheus.io/download/"),n(a)])])]),h,s("ul",null,[s("li",null,[e("官网地址："),s("a",k,[e("https://grafana.com/zh-cn/grafana/"),n(a)])]),s("li",null,[e("下载地址："),s("a",f,[e("https://grafana.com/grafana/download"),n(a)])]),s("li",null,[e("国内下载地址："),s("a",g,[e("https://mirrors.huaweicloud.com/grafana/"),n(a)])]),s("li",null,[e("看板模板地址："),s("a",_,[e("https://grafana.com/grafana/dashboards/"),n(a)])])]),x,s("ul",null,[s("li",null,[e("下载地址："),s("a",y,[e("https://github.com/prometheus/mysqld_exporter/releases"),n(a)])])]),E])}const P=o(p,[["render",q],["__file","31.Prometheus_Grafana可视化监控.html.vue"]]);export{P as default};
