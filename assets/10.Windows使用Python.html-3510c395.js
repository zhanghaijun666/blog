import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as r,c as d,e as p,a as n,d as e,w as i,b as a,f as o}from"./app-efa5e96e.js";const u={},m={class:"table-of-contents"},v=o(`<h2 id="python-安装" tabindex="-1"><a class="header-anchor" href="#python-安装" aria-hidden="true">#</a> python 安装</h2><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 升级pip版本</span>
python <span class="token operator">-</span>m pip install <span class="token operator">-</span><span class="token operator">-</span>upgrade pip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="jupyter-安装" tabindex="-1"><a class="header-anchor" href="#jupyter-安装" aria-hidden="true">#</a> jupyter 安装</h2><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 安装</span>
pip install jupyter
<span class="token comment"># 修改默认目录 生成默认配置文件（可选）</span>
jupyter notebook <span class="token operator">-</span><span class="token operator">-</span>generate<span class="token operator">-</span>config
<span class="token comment"># 修改配置文件属性 c.NotebookApp.notebook_dir = &#39;E:\\\\00000000\\\\jupyter&#39;</span>
<span class="token comment"># 运行 访问http://localhost:8088/tree</span>
jupyter notebook
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="centos-安装-python" tabindex="-1"><a class="header-anchor" href="#centos-安装-python" aria-hidden="true">#</a> centos 安装 python</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> https://www.python.org/ftp/python/3.11.1/Python-3.11.1.tgz
<span class="token function">tar</span> <span class="token parameter variable">-xvf</span> Python-3.11.1.tgz
<span class="token builtin class-name">cd</span> Python-3.11.1
./configure <span class="token parameter variable">--prefix</span><span class="token operator">=</span>/usr/local/python
<span class="token function">make</span> <span class="token operator">&amp;</span> <span class="token function">make</span> <span class="token function">install</span>
<span class="token comment">## 创建软链接</span>
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/local/python/bin/3.11.1/usr/bin/python
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="anacond" tabindex="-1"><a class="header-anchor" href="#anacond" aria-hidden="true">#</a> Anacond</h2>`,7),h={href:"https://www.anaconda.com/download/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/",target:"_blank",rel:"noopener noreferrer"},k=n("h3",{id:"配置",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#配置","aria-hidden":"true"},"#"),a(" 配置")],-1),f={href:"https://mirrors.tuna.tsinghua.edu.cn/help/anaconda/",target:"_blank",rel:"noopener noreferrer"},g=o(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 查看版本</span>
conda <span class="token parameter variable">--version</span>
conda info
<span class="token comment">## 添加国内源</span>
conda config <span class="token parameter variable">--add</span> channels http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config <span class="token parameter variable">--add</span> channels http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config <span class="token parameter variable">--add</span> channels http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
<span class="token comment">## 设置搜索时显示通道地址</span>
conda config <span class="token parameter variable">--set</span> show_channel_urls <span class="token function">yes</span>
<span class="token comment">## 删除默认源</span>
<span class="token comment"># conda config --remove channels defaults</span>
<span class="token comment">## 查看通道地址</span>
conda config <span class="token parameter variable">--show</span> channels
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 查看所有的环境</span>
conda <span class="token function">env</span> list

<span class="token comment">## 新建环境</span>
<span class="token comment">## conda create -n noti jupyter notebook</span>
conda create <span class="token parameter variable">--name</span> python38 <span class="token assign-left variable">python</span><span class="token operator">=</span><span class="token number">3.8</span>
<span class="token comment"># 安装好后，使用activate激活某个环境</span>
<span class="token comment"># for Windows</span>
activate python38 
<span class="token comment"># for Linux &amp; Mac</span>
<span class="token builtin class-name">source</span> activate python38
python <span class="token parameter variable">--version</span>

<span class="token comment">## 退出环境</span>
<span class="token comment"># for Windows</span>
deactivate python38 
<span class="token comment"># for Linux &amp; Mac</span>
<span class="token builtin class-name">source</span> deactivate python38 

<span class="token comment">## 卸载环境</span>
conda remove <span class="token parameter variable">--name</span> python38 <span class="token parameter variable">--all</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="迁移" tabindex="-1"><a class="header-anchor" href="#迁移" aria-hidden="true">#</a> 迁移</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 要查看当前环境中所有安装了的包可以用</span>
conda list
<span class="token comment">## 如果想要导出当前环境的包信息可以用，将包信息存入yaml文件中.</span>
conda <span class="token function">env</span> <span class="token builtin class-name">export</span> <span class="token operator">&gt;</span> environment.yaml
<span class="token comment">## 当需要重新创建一个相同的虚拟环境时可以用</span>
conda <span class="token function">env</span> create <span class="token parameter variable">-f</span> environment.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function y(_,x){const s=t("router-link"),l=t("ExternalLinkIcon");return r(),d("div",null,[p(" more "),n("nav",m,[n("ul",null,[n("li",null,[e(s,{to:"#python-安装"},{default:i(()=>[a("python 安装")]),_:1})]),n("li",null,[e(s,{to:"#jupyter-安装"},{default:i(()=>[a("jupyter 安装")]),_:1})]),n("li",null,[e(s,{to:"#centos-安装-python"},{default:i(()=>[a("centos 安装 python")]),_:1})]),n("li",null,[e(s,{to:"#anacond"},{default:i(()=>[a("Anacond")]),_:1}),n("ul",null,[n("li",null,[e(s,{to:"#配置"},{default:i(()=>[a("配置")]),_:1})]),n("li",null,[e(s,{to:"#使用"},{default:i(()=>[a("使用")]),_:1})]),n("li",null,[e(s,{to:"#迁移"},{default:i(()=>[a("迁移")]),_:1})])])])])]),v,n("ul",null,[n("li",null,[a("下载地址："),n("a",h,[a("https://www.anaconda.com/download/"),e(l)])]),n("li",null,[a("国内下载: "),n("a",b,[a("https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/"),e(l)])])]),k,n("ul",null,[n("li",null,[a("国内下载源: "),n("a",f,[a("https://mirrors.tuna.tsinghua.edu.cn/help/anaconda/"),e(l)])])]),g])}const N=c(u,[["render",y],["__file","10.Windows使用Python.html.vue"]]);export{N as default};
