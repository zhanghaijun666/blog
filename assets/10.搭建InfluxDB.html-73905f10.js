import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as c,c as r,a as n,b as e,d as s,e as u,w as d,f as o}from"./app-efa5e96e.js";const m={},v=n("p",null,"在性能测试过程中，对测试结果以及的实时监控与展示也是很重要的一部分。这篇博客，介绍下linux环境下InfluxDB的安装以及功能特点。",-1),b={href:"https://www.influxdata.com/",target:"_blank",rel:"noopener noreferrer"},p={href:"https://docs.influxdata.com/influxdb/v1.6/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://www.linuxdaxue.com/series/influxdb-series/",target:"_blank",rel:"noopener noreferrer"},x={class:"table-of-contents"},_=o(`<h2 id="influxdb介绍" tabindex="-1"><a class="header-anchor" href="#influxdb介绍" aria-hidden="true">#</a> InfluxDB介绍</h2><blockquote><p>InfluxDB 是用Go语言编写的一个开源分布式时序、事件和指标数据库，无需外部依赖。</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1、特色功能
  ①、基于时间序列，支持与时间有关的相关函数（如最大，最小，求和等）；
  ②、可度量性：你可以实时对大量数据进行计算；
  ③、基于事件：它支持任意的事件数据；
2、主要特点
  1）无结构（无模式）：可以是任意数量的列；
  2）可拓展；
  3）支持min, max, sum, count, mean, median 等一系列函数，方便统计；
  4）原生的HTTP支持，内置HTTP API；
  5）强大的类SQL语法；
  6）自带管理界面，方便使用；
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="下载安装" tabindex="-1"><a class="header-anchor" href="#下载安装" aria-hidden="true">#</a> 下载安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> https://dl.influxdata.com/influxdb/releases/influxdb-1.0.2.x86_64.rpm
yum localinstall influxdb-1.0.2.x86_64.rpm

<span class="token comment"># 路径：/usr/bin</span>
influxd            <span class="token comment"># influxdb服务器</span>
influx             <span class="token comment"># influxdb命令行客户端</span>
influx_inspect     <span class="token comment"># 查看工具</span>
influx_stress      <span class="token comment"># 压力测试工具</span>
influx_tsm         <span class="token comment"># 数据库转换工具（将数据库从b1或bz1格式转换为tsm1格式）</span>
<span class="token comment"># 路径：/var/lib/influxdb/</span>
data               <span class="token comment"># 存放最终存储的数据，文件以.tsm结尾</span>
meta               <span class="token comment"># 存放数据库元数据</span>
wal                <span class="token comment"># 存放预写日志文件</span>

<span class="token comment">## 服务端启动</span>
influxd
<span class="token comment">## 后台启动</span>
systemctl start influxdb

<span class="token comment">## 客户端启动</span>
influx

<span class="token comment">## 端口说明</span>
<span class="token number">8083</span>：访问web页面的地址，8083为默认端口；
<span class="token number">8086</span>：数据写入influxdb的地址，8086为默认端口；
<span class="token number">8088</span>：数据备份恢复地址，8088为默认端口；
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function h(k,g){const l=a("ExternalLinkIcon"),i=a("router-link");return c(),r("div",null,[v,n("ul",null,[n("li",null,[e("官网地址："),n("a",b,[e("influxdata"),s(l)])]),n("li",null,[e("官方文档："),n("a",p,[e("influxdb文档"),s(l)])]),n("li",null,[e("参考："),n("a",f,[e("InfluxDB系列教程"),s(l)])])]),u(" more "),n("nav",x,[n("ul",null,[n("li",null,[s(i,{to:"#influxdb介绍"},{default:d(()=>[e("InfluxDB介绍")]),_:1})]),n("li",null,[s(i,{to:"#下载安装"},{default:d(()=>[e("下载安装")]),_:1})])])]),_])}const I=t(m,[["render",h],["__file","10.搭建InfluxDB.html.vue"]]);export{I as default};
