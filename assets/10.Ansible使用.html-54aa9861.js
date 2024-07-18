import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as d,c as r,e as o,a as n,d as a,w as i,b as s,f as p}from"./app-efa5e96e.js";const m={},u={class:"table-of-contents"},v=n("h2",{id:"介绍",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#介绍","aria-hidden":"true"},"#"),s(" 介绍")],-1),b=n("blockquote",null,[n("p",null,"Ansible 是一个配置管理和应用部署工具。")],-1),k={href:"https://ansible-tran.readthedocs.io/en/latest/index.html",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/ansible/ansible",target:"_blank",rel:"noopener noreferrer"},g=n("h2",{id:"ansible-安装",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#ansible-安装","aria-hidden":"true"},"#"),s(" Ansible 安装")],-1),f={href:"https://cn-ansibledoc.readthedocs.io/zh_CN/latest/installation_guide/intro_installation.html#",target:"_blank",rel:"noopener noreferrer"},y=p(`<h3 id="_1、安装-ansible" tabindex="-1"><a class="header-anchor" href="#_1、安装-ansible" aria-hidden="true">#</a> 1、安装 ansible</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> ansible –y
<span class="token comment">## 查看版本</span>
ansible <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、编译安装" tabindex="-1"><a class="header-anchor" href="#_2、编译安装" aria-hidden="true">#</a> 2、编译安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## https://www.python.org/downloads/</span>
<span class="token comment">## python3.8编译安装</span>
<span class="token function">tar</span> <span class="token parameter variable">-xvf</span> Python-3.8.12.tar.xz
<span class="token builtin class-name">cd</span> Python-3.8.12 <span class="token operator">&amp;&amp;</span> ./configure <span class="token parameter variable">--prefix</span><span class="token operator">=</span>/usr/local/python3.8 <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token function">install</span>
<span class="token function">rm</span> <span class="token parameter variable">-f</span> /usr/bin/python /usr/bin/pip
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/local/python3.8/bin/python3.8 /usr/bin/python
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/local/python3.8/bin/pip3.8 /usr/bin/pip
<span class="token function">mkdir</span> /root/.pip
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span> /root/.pip/pip.conf</span>
[global]
index-url = https://mirrors.huaweicloud.com/repository/pypi/simple
trusted-host = mirrors.huaweicloud.com
timeout = 120
EOF</span>

<span class="token comment">## https://releases.ansible.com/ansible/</span>
<span class="token comment">## 安装ansible</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> python-jinja2 PyYAML python-paramiko python-babel python-crypto
<span class="token comment"># 需要提前安装Python环境(略)</span>
<span class="token function">wget</span> https://releases.ansible.com/ansible/ansible-2.9.27.tar.gz
<span class="token function">tar</span> xf ansible-2.9.27.tar.gz
<span class="token builtin class-name">cd</span> ansible-2.9.27 <span class="token operator">&amp;&amp;</span> <span class="token function">ls</span> <span class="token parameter variable">-al</span>
python setup.py build
python setup.py <span class="token function">install</span>
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/local/python3.8/bin/ansible* /usr/bin/
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/ansible 
<span class="token function">cp</span> examples/ansible.cfg /etc/ansible
<span class="token function">cp</span> examples/hosts /etc/ansible
<span class="token comment">## 验证</span>
ansible localhost <span class="token parameter variable">-m</span> <span class="token function">ping</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、git-源码安装" tabindex="-1"><a class="header-anchor" href="#_3、git-源码安装" aria-hidden="true">#</a> 3、Git 源码安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/ansible/ansible.git
<span class="token builtin class-name">cd</span> ansible
<span class="token function">git</span> checkout stable-2.9
<span class="token builtin class-name">source</span> ./hacking/env-setup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、pip-安装" tabindex="-1"><a class="header-anchor" href="#_4、pip-安装" aria-hidden="true">#</a> 4、pip 安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> python-pip python-devel
yum <span class="token function">install</span> gcc glibc-devel zibl-devel rpm-bulid openss1-devel
pip <span class="token function">install</span> <span class="token parameter variable">-U</span> pip
pip <span class="token function">install</span> ansible <span class="token parameter variable">--upgrade</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ansible-相关文件说明" tabindex="-1"><a class="header-anchor" href="#ansible-相关文件说明" aria-hidden="true">#</a> Ansible 相关文件说明</h2><h3 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h3><ul><li>/etc/ansible/ 配置文件目录</li><li>/etc/ansible/ansible.cfg 主配置文件，配置 ansible 工作特性</li><li>/etc/ansible/hosts 主机清单文件，管理的目标主机地址清单</li><li>/etc/ansible/roles/ 存放角色的目录</li><li>/usr/bin/ 执行文件目录</li></ul><h3 id="主配置文件介绍" tabindex="-1"><a class="header-anchor" href="#主配置文件介绍" aria-hidden="true">#</a> 主配置文件介绍</h3><blockquote><p>默认的主配置文件，一般无需修改</p><p>vi /etc/ansible/ansible.cfg （部分主要的配置）</p></blockquote><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>[defaults]
#inventory = /etc/ansible/hosts   # 主机列表配置文件
#library =/usr/share/my_modules/  # 库文件存放目录
#remote_tmp = $HOME/.ansible/tmp  # 临时py命令文件存放在远程主机目录
#local_tmp = $HOME/.ansible/tmp   # 本机的临时命令执行目录
#forks = 5                        # 默认并发数
#sudo_user = root                 # 默认sudo用户
#ask_sudo_pass = True             # 每次执行ansible命令是否询间ssh密码
#ask_pass = True                  # 是否询问密码
#remote_port = 22                 # 默认的远程登录端口
host_key_checking = False         # 检查对应服务器的host_key，建议取消注释
log_path=/var/log/ansible.log     # 日志文件，建议启用
#module_name = command            # 默认模块，可以修改为shell模块
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="inventory-主机清单文件" tabindex="-1"><a class="header-anchor" href="#inventory-主机清单文件" aria-hidden="true">#</a> Inventory 主机清单文件</h3><blockquote><p>配置受控 hosts 地址或者域名地址</p><p>vi /etc/ansible/hosts</p></blockquote><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>[test]
192.168.60.90
192.168.60.[95:96]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ansible-相关命令" tabindex="-1"><a class="header-anchor" href="#ansible-相关命令" aria-hidden="true">#</a> Ansible 相关命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">###### ansible ######</span>
ansible <span class="token parameter variable">--version</span>
ansible <span class="token string">&quot;*&quot;</span> --list-hosts
<span class="token comment">## 检查清单文件</span>
ansible-inventory <span class="token parameter variable">-i</span> host.yaml  <span class="token parameter variable">--graph</span>

ansible <span class="token number">192.168</span>.60.* <span class="token parameter variable">-m</span> <span class="token function">ping</span>
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> <span class="token function">ping</span>



<span class="token comment">###### ansible-doc ######</span>
<span class="token comment">## 主要用于显示针对某个模块的使用方法的帮助信息</span>
<span class="token comment">## 列出所有模块</span>
ansible-doc <span class="token parameter variable">-l</span>
<span class="token comment">## 查看指定模块帮助用法</span>
ansible-doc copy
<span class="token comment">## 查看指定模块帮助用法[简化版的帮助]</span>
ansible-doc <span class="token parameter variable">-s</span> copy

<span class="token comment">###### 点对点命令 ######</span>
<span class="token comment">## ansible [模式] -m [模块] -a &quot;[模块选项]&quot;</span>
ansible <span class="token number">192.168</span>.60.* <span class="token parameter variable">-m</span> shell <span class="token parameter variable">-a</span> <span class="token string">&#39;cat /etc/passwd |grep &quot;root&quot;&#39;</span>
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> shell <span class="token parameter variable">-a</span> <span class="token string">&#39;cat /etc/passwd |grep &quot;root&quot;&#39;</span>
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> shell <span class="token parameter variable">-a</span> <span class="token string">&quot;echo &#39;6666&#39; &gt;&gt; /opt/demo.txt&quot;</span>

<span class="token comment">###### 文件管理</span>
<span class="token comment">## 将文件从本地系统复制到远程系统</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;123456789&quot;</span>  <span class="token operator">&gt;&gt;</span> ~/number.txt
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> copy <span class="token parameter variable">-a</span> <span class="token string">&quot;src=~/number.txt dest=/opt/&quot;</span>
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> <span class="token builtin class-name">command</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;ls -lh /opt/&quot;</span>
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> <span class="token builtin class-name">command</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;cat /opt/number.txt&quot;</span>
<span class="token comment">## 将文件/opt/number.txt 权限更改为 777</span>
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> <span class="token function">file</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;dest=/opt/number.txt mode=777&quot;</span>
<span class="token comment">## 删除/opt/number.txt 文件</span>
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> <span class="token function">file</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;dest=/opt/number.txt state=absent&quot;</span>
<span class="token comment">## 递归删除指定目录</span>
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> <span class="token builtin class-name">command</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;mkdir -p /opt/demo/zhang&quot;</span>
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> <span class="token builtin class-name">command</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;ls -lh /opt&quot;</span>
ansible web <span class="token parameter variable">-m</span> <span class="token function">file</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;dest=/opt/demo state=absent&quot;</span>

<span class="token comment">###### 用户管理</span>
<span class="token comment">## 新增用户</span>
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> user <span class="token parameter variable">-a</span> <span class="token string">&quot;name=testuser password=testuser&quot;</span>
<span class="token comment">## 删除用户</span>
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> user <span class="token parameter variable">-a</span> <span class="token string">&quot;name=testuser state=absent&quot;</span>

<span class="token comment">##### 管理包</span>
<span class="token comment">## 安装httpd</span>
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> yum <span class="token parameter variable">-a</span> <span class="token string">&quot;name=httpd state=latest&quot;</span>
<span class="token comment">## 卸载httpd</span>
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> yum <span class="token parameter variable">-a</span> <span class="token string">&quot;name=httpd state=absent&quot;</span>

<span class="token comment">###### 管理服务</span>
<span class="token comment">## 停止 httpd 服务：</span>
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> <span class="token function">service</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;name=httpd state=stopped&quot;</span>
<span class="token comment">## 启动 httpd 服务：</span>
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> <span class="token function">service</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;name=httpd state=started&quot;</span>
<span class="token comment">## 重启 httpd 服务：</span>
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> <span class="token function">service</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;name=httpd state=restarted&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ansible-剧本" tabindex="-1"><a class="header-anchor" href="#ansible-剧本" aria-hidden="true">#</a> Ansible 剧本</h2><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>- name:                            [脚本描述]
  hosts: group                     [添加主机或主机组]
  become: true                     [如果你想以 root 身份运行任务，则标记它]
  tasks:                           [你想在任务下执行什么动作]
    - name:                        [输入模块选项]
      module:                      [输入要执行的模块]
        module_options-1: value    [输入模块选项]
        module_options-2: value
        ...
        module_options-N: value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装-apache-web-服务器" tabindex="-1"><a class="header-anchor" href="#安装-apache-web-服务器" aria-hidden="true">#</a> 安装 Apache Web 服务器</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ~/ansible/playbooks
<span class="token function">cat</span> <span class="token operator">&gt;</span> ~/ansible/playbooks/apache.yml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
- hosts: test
  become: yes
  name: &quot;Install and Configure Apache Web server&quot;
  tasks:
    - name: &quot;Install Apache Web Server&quot;
      yum:
        name: httpd
        state: latest
    - name: &quot;Ensure Apache Web Server is Running&quot;
      service:
        name: httpd
        state: started
EOF</span>
<span class="token comment">## 检查剧本文件的正确性</span>
ansible-playbook ~/ansible/playbooks/apache.yml --syntax-check
<span class="token comment">## 不会对远程机器进行任何修改。相反，它会告诉你它将要做什么改变但不是真的执行</span>
ansible-playbook ~/ansible/playbooks/apache.yml <span class="token parameter variable">--check</span>
<span class="token comment">## 执行剧本文件任务</span>
ansible-playbook ~/ansible/playbooks/apache.yml
<span class="token comment">## 命令查看状态</span>
ansible <span class="token builtin class-name">test</span> <span class="token parameter variable">-m</span> <span class="token builtin class-name">command</span> <span class="token parameter variable">-a</span> <span class="token string">&quot;systemctl status httpd&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装软件包列表" tabindex="-1"><a class="header-anchor" href="#安装软件包列表" aria-hidden="true">#</a> 安装软件包列表</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ~/ansible/playbooks
<span class="token function">cat</span> <span class="token operator">&gt;</span> ~/ansible/playbooks/packages.yml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
- hosts: test
  become: yes
  name: &quot;Install a List of Packages on Red Hat Based System&quot;
  vars:
    packages: [ &#39;curl&#39;, &#39;git&#39;, &#39;htop&#39; ]
  tasks:
    - name: &quot;Installing Security Update on Red Hat Based System&quot;
      yum: name=* update_cache=yes security=yes state=latest
      when: ansible_facts[&#39;distribution&#39;] == &quot;CentOS&quot;

    - name: &quot;Installing Security Update on Ubuntu Based System&quot;
      apt: upgrade=dist update_cache=yes
      when: ansible_facts[&#39;distribution&#39;] == &quot;Ubuntu&quot;

    - name: Install a list of packages
      yum: name={{ item }} state=latest
      with_items: &quot;{{ packages }}&quot;
      when: ansible_facts[&#39;distribution&#39;] == &quot;CentOS&quot;
EOF</span>
<span class="token comment">## 执行剧本文件任务</span>
ansible-playbook ~/ansible/playbooks/packages.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装nginx" tabindex="-1"><a class="header-anchor" href="#安装nginx" aria-hidden="true">#</a> 安装nginx</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> install_nginx.yml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
---
- hosts: all
  tasks:
    - name: Installs nginx web server
      yum: name=nginx state=installed update_cache=true
      notify:
        - start nginx

  handlers:
    - name: start nginx
      service: name=nginx state=started
EOF</span>
<span class="token comment"># “handlers” 部分与“hosts”、“tasks” 处于同一级别。handlers就像任务，但它们只有在客户端系统发生了更改的任务被告知时才运行。</span>
<span class="token comment"># 例如，我们在这里有一个handlers，在安装软件包后启动Nginx服务。除非 “Installs nginx web server” 任务导致系统更改，否则不会调用处理程序，这意味着包必须安装，并且之前没有被安装。</span>
ansible-playbook install_nginx.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用-block-rescue-来恢复或回滚" tabindex="-1"><a class="header-anchor" href="#使用-block-rescue-来恢复或回滚" aria-hidden="true">#</a> 使用 Block/Rescue 来恢复或回滚</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>- name: block <span class="token builtin class-name">test</span>
  hosts: node1
  tasks:
    - block:
        - debug: <span class="token assign-left variable">msg</span><span class="token operator">=</span><span class="token string">&quot;vg myvg not found&quot;</span>          <span class="token comment"># 提示卷组没找到</span>
        - debug: <span class="token assign-left variable">msg</span><span class="token operator">=</span><span class="token string">&quot;create vg myvg .. ..&quot;</span>       <span class="token comment"># 做其他操作（比如创建这个卷组...）</span>
      when: <span class="token punctuation">(</span><span class="token string">&#39;myvg&#39;</span> not <span class="token keyword">in</span> ansible_lvm.vgs<span class="token punctuation">)</span>       <span class="token comment"># 当卷组myvg不存在时</span>
      rescue:
        - debug: <span class="token assign-left variable">msg</span><span class="token operator">=</span><span class="token string">&quot;creating failed .. ..&quot;</span>      <span class="token comment"># block失败时提示创建卷组失败</span>
      always:
        - shell: vgscan                           <span class="token comment"># 列出卷组信息</span>
          register: list                          <span class="token comment"># 保存到名为list的变量</span>
        - debug: <span class="token assign-left variable">msg</span><span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>list.stdout_lines<span class="token punctuation">}</span><span class="token punctuation">}</span>        <span class="token comment"># 提示卷组扫描结果</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="k8s-安装" tabindex="-1"><a class="header-anchor" href="#k8s-安装" aria-hidden="true">#</a> K8s 安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> ~/k8s.yml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
- name: init k8s
  hosts: all
  tasks:
    # 关闭防火墙
    - shell: firewall-cmd --set-default-zone=trusted
    # 关闭selinux
    - shell: getenforce
      register: out
    - debug: msg=&quot;{{out}}&quot;
    - shell: setenforce 0
      when: out.stdout != &quot;Disabled&quot;
    - replace:
        path: /etc/selinux/config
        regexp: &quot;SELINUX=enforcing&quot;
        replace: &quot;SELINUX=disabled&quot;
    - shell: cat /etc/selinux/config
      register: out
    - debug: msg=&quot;{{out}}&quot;
    - copy:
        src: ./hosts
        dest: /etc/hosts
        force: yes
   # 关闭交换分区
    - shell: swapoff -a
    - shell: sed -i &#39;/swap/d&#39; /etc/fstab
    - shell: cat /etc/fstab
      register: out
    - debug: msg=&quot;{{out}}&quot;
    # 配置yum源
    - shell: tar -cvf /etc/yum.tar /etc/yum.repos.d/
    - shell: rm -rf /etc/yum.repos.d/*
    - shell: wget ftp://ftp.rhce.cc/k8s/* -P  /etc/yum.repos.d/
    # 安装docker-ce
    - yum:
        name: docker-ce
        state: present
    # 配置docker加速
    - shell: mkdir /etc/docker
    - copy:
        src: ./daemon.json
        dest: /etc/docker/daemon.json
    - shell: systemctl daemon-reload
    - shell: systemctl restart docker
    # 配置属性，安装k8s相关包
    - copy:
        src: ./k8s.conf
        dest: /etc/sysctl.d/k8s.conf
    - shell: yum install -y kubelet-1.21.1-0 kubeadm-1.21.1-0 kubectl-1.21.1-0 --disableexcludes=kubernetes
    # 缺少镜像导入
    - copy:
        src: ./coredns-1.21.tar
        dest: /root/coredns-1.21.tar
    - shell: docker load -i /root/coredns-1.21.tar
    # 启动服务
    - shell: systemctl restart kubelet
    - shell: systemctl enable kubelet
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="角色" tabindex="-1"><a class="header-anchor" href="#角色" aria-hidden="true">#</a> 角色</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 生成一个角色目录</span>
ansible-galaxy init demo
tree <span class="token parameter variable">-L</span> <span class="token number">2</span>
<span class="token comment"># ├── defaults            定义变量的缺省值，优先级较低</span>
<span class="token comment"># │   └── main.yml</span>
<span class="token comment"># ├── files               存放一些静态文件</span>
<span class="token comment"># ├── handlers            定义handlers处理任务</span>
<span class="token comment"># │   └── main.yml</span>
<span class="token comment"># ├── meta                定义作者、版本、兼容性、依赖项等描述信息</span>
<span class="token comment"># │   └── main.yml</span>
<span class="token comment"># ├── README.md           描述自述信息</span>
<span class="token comment"># ├── tasks               任务入口，最主要的文件</span>
<span class="token comment"># │   └── main.yml</span>
<span class="token comment"># ├── templates           存放模板文件</span>
<span class="token comment"># ├── tests               用于角色测试</span>
<span class="token comment"># │   ├── inventory</span>
<span class="token comment"># │   └── test.yml</span>
<span class="token comment"># └── vars                定义变量，相对于defaults优先级更高</span>
<span class="token comment">#     └── main.yml</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,33);function _(q,x){const e=t("router-link"),l=t("ExternalLinkIcon");return d(),r("div",null,[o(" more "),n("nav",u,[n("ul",null,[n("li",null,[a(e,{to:"#介绍"},{default:i(()=>[s("介绍")]),_:1})]),n("li",null,[a(e,{to:"#ansible-安装"},{default:i(()=>[s("Ansible 安装")]),_:1}),n("ul",null,[n("li",null,[a(e,{to:"#_1、安装-ansible"},{default:i(()=>[s("1、安装 ansible")]),_:1})]),n("li",null,[a(e,{to:"#_2、编译安装"},{default:i(()=>[s("2、编译安装")]),_:1})]),n("li",null,[a(e,{to:"#_3、git-源码安装"},{default:i(()=>[s("3、Git 源码安装")]),_:1})]),n("li",null,[a(e,{to:"#_4、pip-安装"},{default:i(()=>[s("4、pip 安装")]),_:1})])])]),n("li",null,[a(e,{to:"#ansible-相关文件说明"},{default:i(()=>[s("Ansible 相关文件说明")]),_:1}),n("ul",null,[n("li",null,[a(e,{to:"#目录结构"},{default:i(()=>[s("目录结构")]),_:1})]),n("li",null,[a(e,{to:"#主配置文件介绍"},{default:i(()=>[s("主配置文件介绍")]),_:1})]),n("li",null,[a(e,{to:"#inventory-主机清单文件"},{default:i(()=>[s("Inventory 主机清单文件")]),_:1})])])]),n("li",null,[a(e,{to:"#ansible-相关命令"},{default:i(()=>[s("Ansible 相关命令")]),_:1})]),n("li",null,[a(e,{to:"#ansible-剧本"},{default:i(()=>[s("Ansible 剧本")]),_:1}),n("ul",null,[n("li",null,[a(e,{to:"#安装-apache-web-服务器"},{default:i(()=>[s("安装 Apache Web 服务器")]),_:1})]),n("li",null,[a(e,{to:"#安装软件包列表"},{default:i(()=>[s("安装软件包列表")]),_:1})]),n("li",null,[a(e,{to:"#安装nginx"},{default:i(()=>[s("安装nginx")]),_:1})]),n("li",null,[a(e,{to:"#使用-block-rescue-来恢复或回滚"},{default:i(()=>[s("使用 Block/Rescue 来恢复或回滚")]),_:1})]),n("li",null,[a(e,{to:"#k8s-安装"},{default:i(()=>[s("K8s 安装")]),_:1})])])]),n("li",null,[a(e,{to:"#角色"},{default:i(()=>[s("角色")]),_:1})])])]),v,b,n("ul",null,[n("li",null,[s("Ansible 中文权威指南: "),n("a",k,[s("https://ansible-tran.readthedocs.io/en/latest/index.html"),a(l)])]),n("li",null,[s("GitHub 地址："),n("a",h,[s("https://github.com/ansible/ansible"),a(l)])])]),g,n("blockquote",null,[n("p",null,[s("官方安装地址："),n("a",f,[s("https://cn-ansibledoc.readthedocs.io/zh_CN/latest/installation_guide/intro_installation.html#"),a(l)])])]),y])}const A=c(m,[["render",_],["__file","10.Ansible使用.html.vue"]]);export{A as default};
