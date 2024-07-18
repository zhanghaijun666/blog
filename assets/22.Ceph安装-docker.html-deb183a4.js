import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o,c as r,e as d,a as n,d as s,w as p,b as a,f as t}from"./app-efa5e96e.js";const m="/blog/assets/ceph-ae2211f8.png",v={},u={class:"table-of-contents"},k=t(`<h2 id="docker-运行-ceph" tabindex="-1"><a class="header-anchor" href="#docker-运行-ceph" aria-hidden="true">#</a> docker 运行 ceph</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 参考文档：https://www.codenong.com/cs106379205/</span>

<span class="token comment">#启动mon</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--net</span><span class="token operator">=</span>host  <span class="token parameter variable">--name</span><span class="token operator">=</span>mon <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /opt/ceph/etc:/etc/ceph <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /opt/ceph/lib/:/var/lib/ceph/ <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">MON_IP</span><span class="token operator">=</span><span class="token number">192.168</span>.60.100 <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">CEPH_PUBLIC_NETWORK</span><span class="token operator">=</span><span class="token number">192.168</span>.60.0/24 <span class="token punctuation">\\</span>
ceph/daemon:latest-mimic mon

<span class="token comment">#启动mgr</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--net</span><span class="token operator">=</span>host <span class="token parameter variable">--name</span><span class="token operator">=</span>mgr <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /opt/ceph/etc:/etc/ceph  <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /opt/ceph/lib/:/var/lib/ceph  <span class="token punctuation">\\</span>
ceph/daemon:latest-mimic  mgr

<span class="token comment">#启动osd 1-3</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--net</span><span class="token operator">=</span>host <span class="token parameter variable">--name</span><span class="token operator">=</span>osd1 <span class="token punctuation">\\</span>
<span class="token parameter variable">--privileged</span><span class="token operator">=</span>true <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /opt/ceph/etc:/etc/ceph  <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /opt/ceph/lib/:/var/lib/ceph  <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /dev/:/dev/ <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">OSD_DEVICE</span><span class="token operator">=</span>/dev/sdb  <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">OSD_TYPE</span><span class="token operator">=</span>disk <span class="token punctuation">\\</span>
ceph/daemon:latest-mimic osd
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--net</span><span class="token operator">=</span>host <span class="token parameter variable">--name</span><span class="token operator">=</span>osd2 <span class="token punctuation">\\</span>
<span class="token parameter variable">--privileged</span><span class="token operator">=</span>true <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /opt/ceph/etc:/etc/ceph  <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /opt/ceph/lib/:/var/lib/ceph  <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /dev/:/dev/ <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">OSD_DEVICE</span><span class="token operator">=</span>/dev/sdc  <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">OSD_TYPE</span><span class="token operator">=</span>disk <span class="token punctuation">\\</span>
ceph/daemon:latest-mimic osd
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--net</span><span class="token operator">=</span>host <span class="token parameter variable">--name</span><span class="token operator">=</span>osd3 <span class="token punctuation">\\</span>
<span class="token parameter variable">--privileged</span><span class="token operator">=</span>true <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /opt/ceph/etc:/etc/ceph  <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /opt/ceph/lib/:/var/lib/ceph  <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /dev/:/dev/ <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">OSD_DEVICE</span><span class="token operator">=</span>/dev/sdd  <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">OSD_TYPE</span><span class="token operator">=</span>disk <span class="token punctuation">\\</span>
ceph/daemon:latest-mimic osd

<span class="token comment">#启动mds</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--net</span><span class="token operator">=</span>host <span class="token parameter variable">--name</span><span class="token operator">=</span>mds <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /opt/ceph/etc:/etc/ceph <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /opt/ceph/lib/:/var/lib/ceph/ <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">CEPHFS_CREATE</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\\</span>
ceph/daemon:latest-mimic mds

<span class="token comment">#配置ceph</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> mon <span class="token function">bash</span>
<span class="token comment">#执行以下命令</span>
ceph <span class="token parameter variable">-s</span>
ceph osd pool <span class="token builtin class-name">set</span> cephfs_data pg_num <span class="token number">64</span>
ceph osd pool <span class="token builtin class-name">set</span> cephfs_data pgp_num <span class="token number">64</span>
ceph osd pool <span class="token builtin class-name">set</span> cephfs_metadata pg_num <span class="token number">32</span>
ceph osd pool <span class="token builtin class-name">set</span> cephfs_metadata pgp_num <span class="token number">32</span>
ceph osd pool <span class="token builtin class-name">set</span> cephfs_metadata min_size <span class="token number">1</span>
ceph osd pool <span class="token builtin class-name">set</span> cephfs_data min_size <span class="token number">1</span>

<span class="token comment">#映射到客户端磁盘目录</span>
<span class="token comment">#获取口令</span>
<span class="token function">cat</span> /opt/ceph/etc/ceph.client.admin.keyring
<span class="token comment">#基于上面的口令加载磁盘</span>
<span class="token function">mount</span> <span class="token parameter variable">-t</span> ceph <span class="token number">192.168</span>.60.100:6789:/ /data <span class="token parameter variable">-o</span> <span class="token assign-left variable">name</span><span class="token operator">=</span>admin,secret<span class="token operator">=</span>AQDLp19jQYDUJBAAGgesnbf1D9A2g1FVW0DPSw<span class="token operator">==</span>

<span class="token comment">## 防火墙</span>
firewall-cmd <span class="token parameter variable">--permanent</span> --add-rich-rule<span class="token operator">=</span><span class="token string">&quot;rule family=&quot;</span>ipv4<span class="token string">&quot; source address=&quot;</span><span class="token number">192.168</span>.60.0/16<span class="token string">&quot; accept&quot;</span>
firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="cephadm工具部署" tabindex="-1"><a class="header-anchor" href="#cephadm工具部署" aria-hidden="true">#</a> cephadm工具部署</h2><blockquote><p>自行安装docker</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 安装集群</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> python3
<span class="token comment">## 安装 cephadm 工具</span>
<span class="token function">curl</span> <span class="token parameter variable">--silent</span> --remote-name <span class="token parameter variable">--location</span> https://mirrors.chenby.cn/https://github.com/ceph/ceph/raw/quincy/src/cephadm/cephadm
<span class="token comment">## 创建源信息</span>
./cephadm add-repo <span class="token parameter variable">--release</span> <span class="token number">17.2</span>.5
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s#download.ceph.com#mirrors.ustc.edu.cn/ceph#&#39;</span> /etc/yum.repos.d/ceph.repo 
./cephadm <span class="token function">install</span>
<span class="token comment">## 引导新的集群</span>
cephadm bootstrap --mon-ip <span class="token number">192.168</span>.1.25
<span class="token function">docker</span> images
<span class="token function">docker</span> <span class="token function">ps</span>

<span class="token comment">## 切换shell命令模式</span>
cephadm shell
ceph <span class="token parameter variable">-s</span>  
<span class="token comment">## 查看目前集群内运行的组件（包括其他节点）</span>
ceph orch <span class="token function">ps</span>  
<span class="token comment">## 查看某一组件的状态</span>
ceph orch <span class="token function">ps</span> --daemon-type mon  

<span class="token comment">## ceph命令的第二种应用</span>
cephadm shell -- ceph <span class="token parameter variable">-s</span>

<span class="token comment">## 安装ceph-common包</span>
cephadm <span class="token function">install</span> ceph-common
ceph <span class="token parameter variable">-v</span> 

<span class="token comment">## 创建mon和mgr</span>
ceph orch <span class="token function">host</span> <span class="token function">add</span> ceph-2
ceph orch <span class="token function">host</span> <span class="token function">add</span> ceph-3

<span class="token comment">## 查看目前集群纳管的节点</span>
ceph orch <span class="token function">host</span> <span class="token function">ls</span> 
ceph orch apply mon <span class="token parameter variable">--placement</span><span class="token operator">=</span><span class="token string">&quot;3 ceph-1 ceph-2 ceph-3&quot;</span>
ceph orch apply mgr <span class="token parameter variable">--placement</span><span class="token operator">=</span><span class="token string">&quot;3 ceph-1 ceph-2 ceph-3&quot;</span>
ceph orch <span class="token function">ls</span> 

<span class="token comment">## 创建osd</span>
ceph orch daemon <span class="token function">add</span> osd ceph-1:/dev/sdb
ceph orch daemon <span class="token function">add</span> osd ceph-2:/dev/sdb
ceph orch daemon <span class="token function">add</span> osd ceph-3:/dev/sdb

<span class="token comment">## 创建mds</span>
ceph osd pool create cephfs_data
ceph osd pool create cephfs_metadata
ceph fs new cephfs cephfs_metadata cephfs_data
<span class="token comment">## #开启mds组件，cephfs：文件系统名称；–placement：指定集群内需要几个mds，后面跟主机名</span>
ceph orch apply mds cephfs <span class="token parameter variable">--placement</span><span class="token operator">=</span><span class="token string">&quot;3 ceph-1 ceph-2 ceph-3&quot;</span>
<span class="token comment"># 查看各节点是否已启动mds容器；还可以使用ceph orch ps 查看某一节点运行的容器</span>
ceph orch <span class="token function">ps</span> --daemon-type mds

<span class="token comment">## 创建rgw</span>
<span class="token comment"># 首先创建一个领域</span>
radosgw-admin realm create --rgw-realm<span class="token operator">=</span>myorg <span class="token parameter variable">--default</span>
<span class="token comment"># 创建区域组</span>
radosgw-admin zonegroup create --rgw-zonegroup<span class="token operator">=</span>default <span class="token parameter variable">--master</span> <span class="token parameter variable">--default</span>
<span class="token comment"># #创建区域</span>
radosgw-admin zone create --rgw-zonegroup<span class="token operator">=</span>default --rgw-zone<span class="token operator">=</span>cn-east-1 <span class="token parameter variable">--master</span> <span class="token parameter variable">--default</span>
<span class="token comment"># 为特定领域和区域部署radosgw守护程序</span>
ceph orch apply rgw myorg cn-east-1 <span class="token parameter variable">--placement</span><span class="token operator">=</span><span class="token string">&quot;3 ceph-1 ceph-2 ceph-3&quot;</span>
<span class="token comment"># 验证各节点是否启动rgw容器</span>
ceph orch <span class="token function">ps</span> --daemon-type rgw
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="为所有节点安装ceph-common包" tabindex="-1"><a class="header-anchor" href="#为所有节点安装ceph-common包" aria-hidden="true">#</a> 为所有节点安装ceph-common包</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 为所有节点安装ceph-common包</span>
<span class="token function">scp</span> /etc/yum.repos.d/ceph.repo ceph-2:/etc/yum.repos.d/    <span class="token comment">#将主节点的ceph源同步至其他节点</span>
<span class="token function">scp</span> /etc/yum.repos.d/ceph.repo ceph-3:/etc/yum.repos.d/    <span class="token comment">#将主节点的ceph源同步至其他节点</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> ceph-common    <span class="token comment">#在节点安装ceph-common，ceph-common包会提供ceph命令并在etc下创建ceph目录</span>
<span class="token function">scp</span> /etc/ceph/ceph.conf ceph-2:/etc/ceph/    <span class="token comment">#将ceph.conf文件传输至对应节点</span>
<span class="token function">scp</span> /etc/ceph/ceph.conf ceph-3:/etc/ceph/    <span class="token comment">#将ceph.conf文件传输至对应节点</span>
<span class="token function">scp</span> /etc/ceph/ceph.client.admin.keyring ceph-2:/etc/ceph/    <span class="token comment">#将密钥文件传输至对应节点</span>
<span class="token function">scp</span> /etc/ceph/ceph.client.admin.keyring ceph-3:/etc/ceph/    <span class="token comment">#将密钥文件传输至对应节点</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="页面访问" tabindex="-1"><a class="header-anchor" href="#页面访问" aria-hidden="true">#</a> 页面访问</h3><blockquote><p>User: admin Password: dsvi6yiat7</p></blockquote>`,9),b={href:"https://192.168.1.25:8443",target:"_blank",rel:"noopener noreferrer"},h={href:"http://192.168.1.25:9095/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://192.168.1.25:3000/",target:"_blank",rel:"noopener noreferrer"},g=t('<figure><img src="'+m+`" alt="ceph" tabindex="0" loading="lazy"><figcaption>ceph</figcaption></figure><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ceph orch <span class="token function">ls</span>    <span class="token comment">#列出集群内运行的组件</span>
ceph orch <span class="token function">host</span> <span class="token function">ls</span>    <span class="token comment">#列出集群内的主机</span>
ceph orch <span class="token function">ps</span>     <span class="token comment">#列出集群内容器的详细信息</span>
ceph orch apply mon <span class="token parameter variable">--placement</span><span class="token operator">=</span><span class="token string">&quot;3 node1 node2 node3&quot;</span>    <span class="token comment">#调整组件的数量</span>
ceph orch <span class="token function">ps</span> --daemon-type rgw    <span class="token comment">#--daemon-type：指定查看的组件</span>
ceph orch <span class="token function">host</span> label <span class="token function">add</span> node1 mon    <span class="token comment">#给某个主机指定标签</span>
ceph orch apply mon label:mon    <span class="token comment">#告诉cephadm根据标签部署mon,修改后只有包含mon的主机才会成为mon，不过原来启动的mon现在暂时不会关闭</span>
ceph orch device <span class="token function">ls</span>    <span class="token comment">#列出集群内的存储设备</span>
<span class="token comment">## 例如，要在newhost1IP地址10.1.2.123上部署第二台监视器，并newhost2在网络10.1.2.0/24中部署第三台monitor</span>
ceph orch apply mon <span class="token parameter variable">--unmanaged</span>    <span class="token comment">#禁用mon自动部署</span>
ceph orch daemon <span class="token function">add</span> mon newhost1:10.1.2.123
ceph orch daemon <span class="token function">add</span> mon newhost2:10.1.2.0/24
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function _(y,w){const e=l("router-link"),c=l("ExternalLinkIcon");return o(),r("div",null,[d(" more "),n("nav",u,[n("ul",null,[n("li",null,[s(e,{to:"#docker-运行-ceph"},{default:p(()=>[a("docker 运行 ceph")]),_:1})]),n("li",null,[s(e,{to:"#cephadm工具部署"},{default:p(()=>[a("cephadm工具部署")]),_:1}),n("ul",null,[n("li",null,[s(e,{to:"#为所有节点安装ceph-common包"},{default:p(()=>[a("为所有节点安装ceph-common包")]),_:1})]),n("li",null,[s(e,{to:"#页面访问"},{default:p(()=>[a("页面访问")]),_:1})])])]),n("li",null,[s(e,{to:"#常用命令"},{default:p(()=>[a("常用命令")]),_:1})])])]),k,n("ul",null,[n("li",null,[n("a",b,[a("https://192.168.1.25:8443"),s(c)])]),n("li",null,[n("a",h,[a("http://192.168.1.25:9095/"),s(c)])]),n("li",null,[n("a",f,[a("https://192.168.1.25:3000/"),s(c)])])]),g])}const E=i(v,[["render",_],["__file","22.Ceph安装-docker.html.vue"]]);export{E as default};
