import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as t,c as p,e as o,a as n,d as a,w as e,f as r,b as c}from"./app-efa5e96e.js";const d={},m={class:"table-of-contents"},k=r(`<h2 id="docker容器信息" tabindex="-1"><a class="header-anchor" href="#docker容器信息" aria-hidden="true">#</a> Docker容器信息</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看docker容器版本</span>
<span class="token function">docker</span> version
<span class="token comment"># 查看docker容器信息</span>
<span class="token function">docker</span> info
<span class="token comment"># 查看docker容器帮助</span>
<span class="token function">docker</span> <span class="token parameter variable">--help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="镜像操作" tabindex="-1"><a class="header-anchor" href="#镜像操作" aria-hidden="true">#</a> 镜像操作</h2><p>提示：对于镜像的操作可使用镜像名、镜像长ID和短ID。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 列出本地images</span>
<span class="token function">docker</span> images
<span class="token comment"># 含中间映像层</span>
<span class="token function">docker</span> images <span class="token parameter variable">-a</span>
<span class="token comment"># 只显示镜像ID</span>
<span class="token function">docker</span> images <span class="token parameter variable">-q</span>
<span class="token comment"># 含中间映像层</span>
<span class="token function">docker</span> images <span class="token parameter variable">-qa</span>   
<span class="token comment"># 显示镜像摘要信息(DIGEST列)</span>
<span class="token function">docker</span> images <span class="token parameter variable">--digests</span>
<span class="token comment"># 显示镜像完整信息</span>
<span class="token function">docker</span> images --no-trunc

<span class="token comment"># 搜索仓库MySQL镜像</span>
<span class="token function">docker</span> search mysql
<span class="token comment">#  --filter=stars=600：只显示 starts&gt;=600 的镜像</span>
<span class="token function">docker</span> search <span class="token parameter variable">--filter</span><span class="token operator">=</span>stars<span class="token operator">=</span><span class="token number">600</span> mysql
<span class="token comment">#  --no-trunc 显示镜像完整 DESCRIPTION 描述</span>
<span class="token function">docker</span> search --no-trunc mysql
<span class="token comment">#  --automated ：只列出 AUTOMATED=OK 的镜像</span>
<span class="token function">docker</span> search  <span class="token parameter variable">--automated</span> mysql

<span class="token comment"># 下载Redis官方最新镜像，相当于：docker pull redis:latest</span>
<span class="token function">docker</span> pull redis
<span class="token comment"># 下载仓库所有Redis镜像</span>
<span class="token function">docker</span> pull <span class="token parameter variable">-a</span> redis
<span class="token comment"># 下载私人仓库镜像</span>
<span class="token function">docker</span> pull bitnami/redis

<span class="token comment"># 单个镜像删除，相当于：docker rmi redis:latest</span>
<span class="token function">docker</span> rmi redis
<span class="token comment"># 强制删除(针对基于镜像有运行的容器进程)</span>
<span class="token function">docker</span> rmi <span class="token parameter variable">-f</span> redis
<span class="token comment"># 多个镜像删除，不同镜像间以空格间隔</span>
<span class="token function">docker</span> rmi <span class="token parameter variable">-f</span> redis tomcat nginx
<span class="token comment"># 删除本地全部镜像</span>
<span class="token function">docker</span> rmi <span class="token parameter variable">-f</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> images <span class="token parameter variable">-q</span><span class="token variable">)</span></span>

<span class="token comment"># 镜像构建</span>
<span class="token comment"># （1）编写dockerfile</span>
<span class="token builtin class-name">cd</span> /docker/dockerfile <span class="token operator">&amp;&amp;</span> <span class="token function">vim</span> mycentos
<span class="token comment"># （2）构建docker镜像</span>
<span class="token function">docker</span> build <span class="token parameter variable">-f</span> /docker/dockerfile/mycentos <span class="token parameter variable">-t</span> mycentos:1.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="容器操作" tabindex="-1"><a class="header-anchor" href="#容器操作" aria-hidden="true">#</a> 容器操作</h2><p>提示：对于容器的操作可使用CONTAINER ID 或 NAMES。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 新建并启动容器，参数：-i  以交互模式运行容器；-t  为容器重新分配一个伪输入终端；--name  为容器指定一个名称</span>
<span class="token function">docker</span> run <span class="token parameter variable">-i</span> <span class="token parameter variable">-t</span> <span class="token parameter variable">--name</span> mycentos
<span class="token comment"># 后台启动容器，参数：-d  已守护方式启动容器</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> mycentos

<span class="token comment"># 启动一个或多个已经被停止的容器</span>
<span class="token function">docker</span> start redis
<span class="token comment"># 重启容器</span>
<span class="token function">docker</span> restart redis

<span class="token comment"># top支持 ps 命令参数，格式：docker top [OPTIONS] CONTAINER [ps OPTIONS]</span>
<span class="token comment"># 列出redis容器中运行进程</span>
<span class="token function">docker</span> <span class="token function">top</span> redis
<span class="token comment"># 查看所有运行容器的进程信息</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span>  <span class="token variable"><span class="token variable">\`</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token operator">|</span><span class="token function">grep</span> Up<span class="token operator">|</span><span class="token function">awk</span> <span class="token string">&#39;{print $1}&#39;</span><span class="token variable">\`</span></span><span class="token punctuation">;</span><span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token punctuation">\\</span> <span class="token operator">&amp;&amp;</span><span class="token function">docker</span> <span class="token function">top</span> <span class="token variable">$i</span><span class="token punctuation">;</span> <span class="token keyword">done</span>

<span class="token comment"># 查看redis容器日志，默认参数</span>
<span class="token function">docker</span> logs rabbitmq
<span class="token comment"># 查看redis容器日志，参数：-f  跟踪日志输出；-t   显示时间戳；--tail  仅列出最新N条容器日志；</span>
<span class="token function">docker</span> logs <span class="token parameter variable">-f</span> <span class="token parameter variable">-t</span> <span class="token parameter variable">--tail</span><span class="token operator">=</span><span class="token number">20</span> redis
<span class="token comment"># 查看容器redis从2019年05月21日后的最新10条日志。</span>
<span class="token function">docker</span> logs <span class="token parameter variable">--since</span><span class="token operator">=</span><span class="token string">&quot;2019-05-21&quot;</span> <span class="token parameter variable">--tail</span><span class="token operator">=</span><span class="token number">10</span> redis

<span class="token comment"># 使用run方式在创建时进入</span>
<span class="token function">docker</span> run <span class="token parameter variable">-it</span> centos /bin/bash
<span class="token comment"># 关闭容器并退出</span>
<span class="token builtin class-name">exit</span>
<span class="token comment"># 仅退出容器，不关闭</span>
快捷键：Ctrl + P + Q
<span class="token comment"># 直接进入centos 容器启动命令的终端，不会启动新进程，多个attach连接共享容器屏幕，参数：--sig-proxy=false  确保CTRL-D或CTRL-C不会关闭容器</span>
<span class="token function">docker</span> attach --sig-proxy<span class="token operator">=</span>false centos 
<span class="token comment"># 在 centos 容器中打开新的交互模式终端，可以启动新进程，参数：-i  即使没有附加也保持STDIN 打开；-t  分配一个伪终端</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-i</span> <span class="token parameter variable">-t</span>  centos /bin/bash
<span class="token comment"># 以交互模式在容器中执行命令，结果返回到当前终端屏幕</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-i</span> <span class="token parameter variable">-t</span> centos <span class="token function">ls</span> <span class="token parameter variable">-l</span> /tmp
<span class="token comment"># 以分离模式在容器中执行命令，程序后台运行，结果不会反馈到当前终端</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-d</span> centos  <span class="token function">touch</span> cache.txt 

<span class="token comment"># 查看正在运行的容器</span>
<span class="token function">docker</span> <span class="token function">ps</span>
<span class="token comment"># 查看正在运行的容器的ID</span>
<span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-q</span>
<span class="token comment"># 查看正在运行+历史运行过的容器</span>
<span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span>
<span class="token comment"># 显示运行容器总文件大小</span>
<span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-s</span>
<span class="token comment"># 显示最近创建容器</span>
<span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-l</span>
<span class="token comment"># 显示最近创建的3个容器</span>
<span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-n</span> <span class="token number">3</span>
<span class="token comment"># 不截断输出</span>
<span class="token function">docker</span> <span class="token function">ps</span> --no-trunc 

<span class="token comment"># 获取镜像redis的元信息</span>
<span class="token function">docker</span> inspect redis
<span class="token comment"># 获取正在运行的容器redis的 IP</span>
<span class="token function">docker</span> inspect <span class="token parameter variable">--format</span><span class="token operator">=</span><span class="token string">&#39;{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}&#39;</span> redis


<span class="token comment"># 停止一个运行中的容器</span>
<span class="token function">docker</span> stop redis
<span class="token comment"># 杀掉一个运行中的容器</span>
<span class="token function">docker</span> <span class="token function">kill</span> redis
<span class="token comment"># 删除一个已停止的容器</span>
<span class="token function">docker</span> <span class="token function">rm</span> redis
<span class="token comment"># 删除一个运行中的容器</span>
<span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> redis
<span class="token comment"># 删除多个容器</span>
<span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span> <span class="token parameter variable">-q</span><span class="token variable">)</span></span>
<span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span> <span class="token parameter variable">-q</span> <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token function">docker</span> <span class="token function">rm</span>
<span class="token comment"># -l 移除容器间的网络连接，连接名为 db</span>
<span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-l</span> db 
<span class="token comment"># -v 删除容器，并删除容器挂载的数据卷</span>
<span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-v</span> redis


<span class="token comment"># 基于当前redis容器创建一个新的镜像；参数：-a 提交的镜像作者；-c 使用Dockerfile指令来创建镜像；-m :提交时的说明文字；-p :在commit时，将容器暂停</span>
<span class="token function">docker</span> commit <span class="token parameter variable">-a</span><span class="token operator">=</span><span class="token string">&quot;DeepInThought&quot;</span> <span class="token parameter variable">-m</span><span class="token operator">=</span><span class="token string">&quot;my redis&quot;</span> <span class="token punctuation">[</span>redis容器ID<span class="token punctuation">]</span>  myredis:v1.1


<span class="token comment"># 将rabbitmq容器中的文件copy至本地路径</span>
<span class="token function">docker</span> <span class="token function">cp</span> rabbitmq:/<span class="token punctuation">[</span>container_path<span class="token punctuation">]</span> <span class="token punctuation">[</span>local_path<span class="token punctuation">]</span>
<span class="token comment"># 将主机文件copy至rabbitmq容器</span>
<span class="token function">docker</span> <span class="token function">cp</span> <span class="token punctuation">[</span>local_path<span class="token punctuation">]</span> rabbitmq:/<span class="token punctuation">[</span>container_path<span class="token punctuation">]</span>/
<span class="token comment"># 将主机文件copy至rabbitmq容器，目录重命名为[container_path]（注意与非重命名copy的区别）</span>
<span class="token function">docker</span> <span class="token function">cp</span> <span class="token punctuation">[</span>local_path<span class="token punctuation">]</span> rabbitmq:/<span class="token punctuation">[</span>container_path<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker容器开机自启" tabindex="-1"><a class="header-anchor" href="#docker容器开机自启" aria-hidden="true">#</a> docker容器开机自启</h2><p>sudo docker run <strong>--restart=always</strong> -name redis redis<br> docker update --restart=always redis</p><ul><li>no - 容器退出时，不重启容器；</li><li>on-failure - 只有在非0状态退出时才从新启动容器；</li><li>always - 无论退出状态是如何，都重启容器；</li></ul>`,11);function v(u,b){const s=l("router-link");return t(),p("div",null,[o(" more "),n("nav",m,[n("ul",null,[n("li",null,[a(s,{to:"#docker容器信息"},{default:e(()=>[c("Docker容器信息")]),_:1})]),n("li",null,[a(s,{to:"#镜像操作"},{default:e(()=>[c("镜像操作")]),_:1})]),n("li",null,[a(s,{to:"#容器操作"},{default:e(()=>[c("容器操作")]),_:1})]),n("li",null,[a(s,{to:"#docker容器开机自启"},{default:e(()=>[c("docker容器开机自启")]),_:1})])])]),k])}const g=i(d,[["render",v],["__file","20.Docker常用命令.html.vue"]]);export{g as default};
