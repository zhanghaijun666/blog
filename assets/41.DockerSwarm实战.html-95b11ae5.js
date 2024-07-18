const a=JSON.parse(`{"key":"v-46331a56","path":"/61.%E5%AE%B9%E5%99%A8%E6%8A%80%E6%9C%AF/10.Docker/41.DockerSwarm%E5%AE%9E%E6%88%98.html","title":"DockerSwarm实战","lang":"zh-CN","frontmatter":{"title":"DockerSwarm实战","date":"2023-02-28T00:00:00.000Z","star":true,"category":["容器技术","Docker"],"tag":["Docker"],"description":"实战 1、初始化节点 ## 防火墙设置 firewall-cmd --permanent --add-rich-rule=\\"rule family=\\"ipv4\\" source address=\\"192.168.60.0/16\\" accept\\" firewall-cmd --reload ## host设置 hostnamectl set-hostname swarm01 ## 192.168.60.101 hostnamectl set-hostname swarm02 ## 192.168.60.102 hostnamectl set-hostname swarm03 ## 192.168.60.103 ## 检查是否开启Swarm模式 docker info | grep 'Swarm: active' ## 初始化manager节点 docker swarm init docker swarm init --advertise-addr 192.168.60.101 docker swarm join-token manager ## 下线节点，使之不参与任务分派 docker node update --availability drain swarm02 ## 上线节点，使之参与任务分派 docker node update --availability active swarm02 ## 节点离开集群 docker swarm leave ## 创建网络 docker network create --attachable --driver overlay --subnet=172.66.0.0/16 --gateway=172.66.0.1 &lt;NETWORK_NAME&gt;","head":[["meta",{"property":"og:url","content":"https://haijunit.top/blog/61.%E5%AE%B9%E5%99%A8%E6%8A%80%E6%9C%AF/10.Docker/41.DockerSwarm%E5%AE%9E%E6%88%98.html"}],["meta",{"property":"og:site_name","content":"学习笔记"}],["meta",{"property":"og:title","content":"DockerSwarm实战"}],["meta",{"property":"og:description","content":"实战 1、初始化节点 ## 防火墙设置 firewall-cmd --permanent --add-rich-rule=\\"rule family=\\"ipv4\\" source address=\\"192.168.60.0/16\\" accept\\" firewall-cmd --reload ## host设置 hostnamectl set-hostname swarm01 ## 192.168.60.101 hostnamectl set-hostname swarm02 ## 192.168.60.102 hostnamectl set-hostname swarm03 ## 192.168.60.103 ## 检查是否开启Swarm模式 docker info | grep 'Swarm: active' ## 初始化manager节点 docker swarm init docker swarm init --advertise-addr 192.168.60.101 docker swarm join-token manager ## 下线节点，使之不参与任务分派 docker node update --availability drain swarm02 ## 上线节点，使之参与任务分派 docker node update --availability active swarm02 ## 节点离开集群 docker swarm leave ## 创建网络 docker network create --attachable --driver overlay --subnet=172.66.0.0/16 --gateway=172.66.0.1 &lt;NETWORK_NAME&gt;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-23T07:13:54.000Z"}],["meta",{"property":"article:author","content":"知识库"}],["meta",{"property":"article:tag","content":"Docker"}],["meta",{"property":"article:published_time","content":"2023-02-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-23T07:13:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"DockerSwarm实战\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-02-28T00:00:00.000Z\\",\\"dateModified\\":\\"2023-05-23T07:13:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"知识库\\",\\"url\\":\\"https://haijunit.top\\",\\"email\\":\\"zhanghaijun_java@163.com\\"}]}"]]},"headers":[{"level":2,"title":"实战","slug":"实战","link":"#实战","children":[{"level":3,"title":"1、初始化节点","slug":"_1、初始化节点","link":"#_1、初始化节点","children":[]},{"level":3,"title":"2、部署nginx","slug":"_2、部署nginx","link":"#_2、部署nginx","children":[]},{"level":3,"title":"3、部署redis","slug":"_3、部署redis","link":"#_3、部署redis","children":[]},{"level":3,"title":"4、Stack","slug":"_4、stack","link":"#_4、stack","children":[]}]}],"git":{"createdTime":1684826034000,"updatedTime":1684826034000,"contributors":[{"name":"zhanghaijun","email":"zhanghaijun@bjtxra.com","commits":1}]},"readingTime":{"minutes":2.79,"words":836},"filePathRelative":"61.容器技术/10.Docker/41.DockerSwarm实战.md","localizedDate":"2023年2月28日","excerpt":"\\n<h2> 实战</h2>\\n<h3> 1、初始化节点</h3>\\n<div class=\\"language-bash line-numbers-mode\\" data-ext=\\"sh\\"><pre class=\\"language-bash\\"><code><span class=\\"token comment\\">## 防火墙设置</span>\\nfirewall-cmd <span class=\\"token parameter variable\\">--permanent</span> --add-rich-rule<span class=\\"token operator\\">=</span><span class=\\"token string\\">\\"rule family=\\"</span>ipv4<span class=\\"token string\\">\\" source address=\\"</span><span class=\\"token number\\">192.168</span>.60.0/16<span class=\\"token string\\">\\" accept\\"</span>\\nfirewall-cmd <span class=\\"token parameter variable\\">--reload</span>\\n\\n<span class=\\"token comment\\">## host设置</span>\\nhostnamectl set-hostname swarm01        <span class=\\"token comment\\">## 192.168.60.101</span>\\nhostnamectl set-hostname swarm02        <span class=\\"token comment\\">## 192.168.60.102</span>\\nhostnamectl set-hostname swarm03        <span class=\\"token comment\\">## 192.168.60.103</span>\\n\\n<span class=\\"token comment\\">## 检查是否开启Swarm模式</span>\\n<span class=\\"token function\\">docker</span> info <span class=\\"token operator\\">|</span> <span class=\\"token function\\">grep</span> <span class=\\"token string\\">'Swarm: active'</span>\\n<span class=\\"token comment\\">## 初始化manager节点</span>\\n<span class=\\"token function\\">docker</span> swarm init\\n<span class=\\"token function\\">docker</span> swarm init --advertise-addr <span class=\\"token number\\">192.168</span>.60.101\\n<span class=\\"token function\\">docker</span> swarm join-token manager\\n<span class=\\"token comment\\">## 下线节点，使之不参与任务分派</span>\\n<span class=\\"token function\\">docker</span> <span class=\\"token function\\">node</span> update <span class=\\"token parameter variable\\">--availability</span> drain swarm02\\n<span class=\\"token comment\\">## 上线节点，使之参与任务分派</span>\\n<span class=\\"token function\\">docker</span> <span class=\\"token function\\">node</span> update <span class=\\"token parameter variable\\">--availability</span> active swarm02\\n<span class=\\"token comment\\">## 节点离开集群</span>\\n<span class=\\"token function\\">docker</span> swarm leave\\n\\n<span class=\\"token comment\\">## 创建网络</span>\\n<span class=\\"token function\\">docker</span> network create <span class=\\"token parameter variable\\">--attachable</span> <span class=\\"token parameter variable\\">--driver</span> overlay <span class=\\"token parameter variable\\">--subnet</span><span class=\\"token operator\\">=</span><span class=\\"token number\\">172.66</span>.0.0/16 <span class=\\"token parameter variable\\">--gateway</span><span class=\\"token operator\\">=</span><span class=\\"token number\\">172.66</span>.0.1 <span class=\\"token operator\\">&lt;</span>NETWORK_NAME<span class=\\"token operator\\">&gt;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{a as data};
