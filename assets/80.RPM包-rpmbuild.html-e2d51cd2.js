import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as l,c,a as s,b as n,d as t,f as a}from"./app-efa5e96e.js";const o={},r=a(`<h2 id="一、rpmbuild" tabindex="-1"><a class="header-anchor" href="#一、rpmbuild" aria-hidden="true">#</a> 一、rpmbuild</h2><p>rpmbuid是用于制作rpm格式包的工具。</p><p>rpm 4.4.x版本之前，rpmbuid工具默认的工作车间为/usr/src/redhat，所以造成普通用户不能制作rpm包。</p><p>rpm 4.5.x版本开始，将rpmbuid工具默认的工作车间为$HOME/rpmbuild（用户家目录），并且推荐用户尽量不用root账号制作rpm包。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## rpm版本查看方法</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token function">rpm</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>rpmbuild默认工作车间为/usr/lib/rpm/macros这个文件，具体由%<em>topdir宏变量进行定义。</em></p><p><em>官方不建议在/usr/lib/rpm/macros目录中更改这个工作路径。</em></p><p>_如果需要则可以在用户家目录下建立一个.rpmmacros隐藏文件，在里面重新定义%_topdir，指向一个新的目录名。内容一般为：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>gxm@localhost ~<span class="token punctuation">]</span>$ <span class="token function">cat</span> .rpmmacros
%_topdir    <span class="token environment constant">$HOME</span>/新目录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>%_topdir</code>目录下一般需要有6个目录（实际操作的时候执行命令自动创建）：<br> 备注：执行<code>rpmdev-setuptree</code>命令会在当前用户的家目录下的<code>rpmbuild</code>目录(如果该目录不存在也会被自动创建)里自动建立上述目录。</p><table><thead><tr><th>目录名</th><th>macros宏名</th><th>说明</th></tr></thead><tbody><tr><td>BUILD</td><td>%_builddir</td><td>编译rpm包的临时目录</td></tr><tr><td>BUILDROOT</td><td>%_buildrootdir</td><td>编译后生成的软件临时安装目录</td></tr><tr><td>RPMS</td><td>%_rpmdir</td><td>最终生成的可安装rpm包的所在目录</td></tr><tr><td>SOURCES</td><td>%_sourcedir</td><td>所有源代码和补丁文件的存放目录</td></tr><tr><td>SPECS</td><td>%_specdir</td><td>存放SPEC文件的目录(重要)</td></tr><tr><td>SRPMS</td><td>%_srcrpmdir</td><td>软件最终的rpm源码格式存放路径(暂时忽略掉，别挂在心上)</td></tr></tbody></table><p>当上述目录建立好之后，将所有用于生成rpm包的源代码、shell脚本、配置文件都拷贝到SOURCES目录里，注意通常情况下源码的压缩格式都为*.tar.gz格式。</p><p>然后将编辑好的SPEC文件，命名为“软件名-版本.spec”，将其拷贝到SPECS目录下。<br> 最后切换SPEC目录下执行命令制作rpm包：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>gxm@localhost ~<span class="token punctuation">]</span>$ <span class="token builtin class-name">cd</span> SPEC
<span class="token punctuation">[</span>gxm@localhost SPEC<span class="token punctuation">]</span>$ rpmbuild <span class="token parameter variable">-bb</span> 软件名-版本.spec
<span class="token comment">#打包好的rpm包在RPMS目录下</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),u=s("br",null,null,-1),d={href:"http://blog.chinaunix.net/uid-23069658-id-3944462.html",target:"_blank",rel:"noopener noreferrer"},b=a(`<h3 id="_1、安装相关包和查看默认工作车间" tabindex="-1"><a class="header-anchor" href="#_1、安装相关包和查看默认工作车间" aria-hidden="true">#</a> 1、安装相关包和查看默认工作车间</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># yum -y install rpm-build rpmdevtools</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rpmbuild --showrc | grep topdir</span>
-14: _builddir    %<span class="token punctuation">{</span>_topdir<span class="token punctuation">}</span>/BUILD
-14: _buildrootdir    %<span class="token punctuation">{</span>_topdir<span class="token punctuation">}</span>/BUILDROOT
-14: _rpmdir    %<span class="token punctuation">{</span>_topdir<span class="token punctuation">}</span>/RPMS
-14: _sourcedir    %<span class="token punctuation">{</span>_topdir<span class="token punctuation">}</span>/SOURCES
-14: _specdir    %<span class="token punctuation">{</span>_topdir<span class="token punctuation">}</span>/SPECS
-14: _srcrpmdir    %<span class="token punctuation">{</span>_topdir<span class="token punctuation">}</span>/SRPMS
-14: _topdir    %<span class="token punctuation">{</span>getenv:<span class="token environment constant">HOME</span><span class="token punctuation">}</span>/rpmbuild
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、新增普通用户" tabindex="-1"><a class="header-anchor" href="#_2、新增普通用户" aria-hidden="true">#</a> 2、新增普通用户</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 新建用户</span>
<span class="token function">useradd</span> gxm
<span class="token comment">## 设置密码</span>
<span class="token function">passwd</span> gxm
<span class="token comment">## 切换用户</span>
<span class="token function">su</span> - gxm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、自动生成rpm打包所需目录" tabindex="-1"><a class="header-anchor" href="#_3、自动生成rpm打包所需目录" aria-hidden="true">#</a> 3、自动生成rpm打包所需目录</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>gxm@localhost ~<span class="token punctuation">]</span>$ rpmdev-setuptree
<span class="token punctuation">[</span>gxm@localhost ~<span class="token punctuation">]</span>$ ll
总用量 <span class="token number">0</span>
drwxrwxr-x <span class="token number">7</span> gxm gxm <span class="token number">67</span> <span class="token number">4</span>月  <span class="token number">16</span> <span class="token number">11</span>:38 rpmbuild
<span class="token punctuation">[</span>gxm@localhost ~<span class="token punctuation">]</span>$ <span class="token builtin class-name">cd</span> rpmbuild/
<span class="token punctuation">[</span>gxm@localhost rpmbuild<span class="token punctuation">]</span>$ ll
总用量 <span class="token number">0</span>
drwxrwxr-x <span class="token number">2</span> gxm gxm <span class="token number">6</span> <span class="token number">4</span>月  <span class="token number">16</span> <span class="token number">11</span>:38 BUILD
drwxrwxr-x <span class="token number">2</span> gxm gxm <span class="token number">6</span> <span class="token number">4</span>月  <span class="token number">16</span> <span class="token number">11</span>:38 RPMS
drwxrwxr-x <span class="token number">2</span> gxm gxm <span class="token number">6</span> <span class="token number">4</span>月  <span class="token number">16</span> <span class="token number">11</span>:38 SOURCES
drwxrwxr-x <span class="token number">2</span> gxm gxm <span class="token number">6</span> <span class="token number">4</span>月  <span class="token number">16</span> <span class="token number">11</span>:38 SPECS
drwxrwxr-x <span class="token number">2</span> gxm gxm <span class="token number">6</span> <span class="token number">4</span>月  <span class="token number">16</span> <span class="token number">11</span>:38 SRPMS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、将源码、配置文件等放入sources目录下" tabindex="-1"><a class="header-anchor" href="#_4、将源码、配置文件等放入sources目录下" aria-hidden="true">#</a> 4、将源码、配置文件等放入<code>SOURCES</code>目录下</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> SOURCES/
<span class="token function">wget</span> https://nchc.dl.sourceforge.net/project/zabbix/ZABBIX%20Latest%20Stable/4.0.4/zabbix-4.0.4.tar.gz
<span class="token comment">## 上传其它文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5、创建spec模板文件熟悉" tabindex="-1"><a class="header-anchor" href="#_5、创建spec模板文件熟悉" aria-hidden="true">#</a> 5、创建SPEC模板文件熟悉</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>gxm@localhost rpmbuild<span class="token punctuation">]</span>$ <span class="token builtin class-name">cd</span> SPECS/
<span class="token punctuation">[</span>gxm@localhost SPECS<span class="token punctuation">]</span>$ rpmdev-newspec <span class="token parameter variable">-o</span> zabbix_agent-4.0.4.spec
zabbix_agent-4.0.4.spec created<span class="token punctuation">;</span> <span class="token builtin class-name">type</span> minimal, <span class="token function">rpm</span> version <span class="token operator">&gt;=</span> <span class="token number">4.11</span>.
<span class="token punctuation">[</span>gxm@localhost SPECS<span class="token punctuation">]</span>$ <span class="token function">cat</span> zabbix_agent-4.0.4.spec
Name:           zabbix_agent-4.0.4
Version:
Release:        <span class="token number">1</span>%<span class="token punctuation">{</span>?dist<span class="token punctuation">}</span>
Summary:
License:
URL:

Source0:
BuildRequires:
Requires:

%description

%prep

%setup <span class="token parameter variable">-q</span>
<span class="token comment">#这里要特别注意，如果压缩包和解压出来的文件名不相同，则用%setup -n 解压后目录名</span>

%build

%configure

<span class="token function">make</span> %<span class="token punctuation">{</span>?_smp_mflags<span class="token punctuation">}</span>

%install

<span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token variable">$RPM_BUILD_ROOT</span>

%make_install

%files

%doc

%changelog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SPEC完整版如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>%define zabbix_user zabbix
%define zabbix_dir /home/zabbix
Name:    zabbix_agent
Version:    <span class="token number">4.0</span>.4
Release:    <span class="token number">1</span>%<span class="token punctuation">{</span>?dist<span class="token punctuation">}</span>
Summary:    zabbix agent
Group:    zabbix
License:    GPL
URL:    www.zabbix.com
Source0:    zabbix-4.0.4.tar.gz
Source1:    zabbix_agentd
Source2:    discovertcpport.sh
Source3:    portlist.txt
Source4:    discoveryproc.sh
Source5:    proclist.txt
Source6:    cmdline-jmxclient-0.10.3.jar
Source7:    jvm.py
Source8:    tomcat.py
Source9:    ca.crt
Source10:    client.crt
Source11:    client.key
Source12:    <span class="token function">java</span>
Source13:    monitor_port
Source14:    monitor_proc

BuildRequires:    gcc, gcc-c++, pcre, pcre-devel, openssl, openssl-devel
Requires:    gcc, gcc-c++, pcre, pcre-devel, openssl, openssl-devel

%description
Zabbix agentd <span class="token number">4.0</span>.4

%pre
<span class="token function">grep</span> %zabbix_user /etc/passwd <span class="token operator">&gt;</span> /dev/null
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">]</span>
    <span class="token keyword">then</span> <span class="token function">useradd</span> %zabbix_user <span class="token parameter variable">-M</span> <span class="token parameter variable">-s</span> /sbin/nologin
<span class="token keyword">fi</span>
<span class="token punctuation">[</span> <span class="token parameter variable">-d</span> %<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span> <span class="token punctuation">]</span><span class="token operator">||</span><span class="token function">rm</span> <span class="token parameter variable">-rf</span> %<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>

%post
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> %<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/logs
<span class="token function">chown</span> <span class="token parameter variable">-R</span> %zabbix_user.%zabbix_user %<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>
<span class="token function">chmod</span> <span class="token parameter variable">-R</span> <span class="token number">755</span> %<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/LogFile=\\/tmp\\/zabbix_agentd\\.log/LogFile=%{zabbix_dir}/logs\\/zabbix_agentd.log/g&quot;</span> %<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/etc/zabbix_agentd.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/ServerActive=127\\.0\\.0\\.1/ServerActive=192\\.168\\.7\\.10/g&quot;</span> %<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/etc/zabbix_agentd.conf
<span class="token assign-left variable">ipaddr</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">ip</span> a <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-w</span> <span class="token string">&quot;inet&quot;</span> <span class="token operator">|</span> <span class="token function">egrep</span> <span class="token string">&quot;eno16777736|eth0&quot;</span> <span class="token operator">|</span><span class="token function">sed</span> <span class="token string">&#39;s/^.*inet //g&#39;</span><span class="token operator">|</span><span class="token function">sed</span> <span class="token string">&#39;s/\\/[0-9][0-9].*$//g&#39;</span><span class="token variable">\`</span></span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/Hostname=Zabbix server/Hostname=<span class="token variable">$ipaddr</span>/g&quot;</span> %<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/etc/zabbix_agentd.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/Timeout=3/Timeout=30/g&quot;</span> %<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;UnsafeUserParameters=1&quot;</span> <span class="token operator">&gt;&gt;</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;EnableRemoteCommands=1&quot;</span> <span class="token operator">&gt;&gt;</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Include=%{zabbix_dir}/etc/zabbix_agentd.conf.d/&quot;</span> <span class="token operator">&gt;&gt;</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;PidFile=%{zabbix_dir}/zabbix_agentd.pid&quot;</span> <span class="token operator">&gt;&gt;</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;LogFileSize=0&quot;</span> <span class="token operator">&gt;&gt;</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;StartAgents=0&quot;</span> <span class="token operator">&gt;&gt;</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;HostMetadataItem=system.uname&quot;</span> <span class="token operator">&gt;&gt;</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;User=zabbix&quot;</span> <span class="token operator">&gt;&gt;</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;TLSConnect=cert&quot;</span> <span class="token operator">&gt;&gt;</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;TLSAccept=cert&quot;</span> <span class="token operator">&gt;&gt;</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;TLSCAFile=%{zabbix_dir}/zabbix_ssl/ca.crt&quot;</span> <span class="token operator">&gt;&gt;</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;TLSCertFile=%{zabbix_dir}/zabbix_ssl/client.crt&quot;</span> <span class="token operator">&gt;&gt;</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;TLSKeyFile=%{zabbix_dir}/zabbix_ssl/client.key&quot;</span> <span class="token operator">&gt;&gt;</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/etc/zabbix_agentd.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/BASEDIR=\\/usr\\/local/BASEDIR=\\/home\\/zabbix/g&quot;</span> /etc/rc.d/init.d/zabbix_agentd
systemctl daemon-reload
/etc/init.d/zabbix_agentd start
systemctl <span class="token builtin class-name">enable</span> zabbix_agentd

%preun
systemctl stop zabbix_agentd

%postun
<span class="token function">userdel</span> <span class="token parameter variable">-r</span> zabbix
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /etc/rc.d/init.d/zabbix_agentd
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> %<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>

%prep
%setup <span class="token parameter variable">-n</span> zabbix-4.0.4

%build
./configure <span class="token parameter variable">--prefix</span><span class="token operator">=</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span> --enable-agent --with-openssl
<span class="token function">make</span> %<span class="token punctuation">{</span>?_smp_mflags<span class="token punctuation">}</span>

%install
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> %<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>
<span class="token function">install</span> <span class="token parameter variable">-d</span> %<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>/etc/profile.d
<span class="token function">make</span> <span class="token function">install</span> <span class="token assign-left variable">DESTDIR</span><span class="token operator">=</span>%<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>
<span class="token function">install</span> <span class="token parameter variable">-p</span> <span class="token parameter variable">-D</span> <span class="token parameter variable">-m</span> 0755 %<span class="token punctuation">{</span>SOURCE1<span class="token punctuation">}</span>    %<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>/etc/rc.d/init.d/zabbix_agentd
<span class="token function">install</span> <span class="token parameter variable">-p</span> <span class="token parameter variable">-D</span> %<span class="token punctuation">{</span>SOURCE2<span class="token punctuation">}</span>        %<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/script/monitor_port/discovertcpport.sh
<span class="token function">install</span> <span class="token parameter variable">-p</span> <span class="token parameter variable">-D</span> %<span class="token punctuation">{</span>SOURCE3<span class="token punctuation">}</span>        %<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/script/monitor_port/portlist.txt
<span class="token function">install</span> <span class="token parameter variable">-p</span> <span class="token parameter variable">-D</span> %<span class="token punctuation">{</span>SOURCE4<span class="token punctuation">}</span>        %<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/script/monitor_proc/discoveryproc.sh
<span class="token function">install</span> <span class="token parameter variable">-p</span> <span class="token parameter variable">-D</span> %<span class="token punctuation">{</span>SOURCE5<span class="token punctuation">}</span>        %<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/script/monitor_proc/proclist.txt
<span class="token function">install</span> <span class="token parameter variable">-p</span> <span class="token parameter variable">-D</span> %<span class="token punctuation">{</span>SOURCE6<span class="token punctuation">}</span>        %<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/script/jvm/cmdline-jmxclient-0.10.3.jar
<span class="token function">install</span> <span class="token parameter variable">-p</span> <span class="token parameter variable">-D</span> %<span class="token punctuation">{</span>SOURCE7<span class="token punctuation">}</span>        %<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/script/jvm/jvm.py
<span class="token function">install</span> <span class="token parameter variable">-p</span> <span class="token parameter variable">-D</span> %<span class="token punctuation">{</span>SOURCE8<span class="token punctuation">}</span>        %<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/script/jvm/tomcat.py
<span class="token function">install</span> <span class="token parameter variable">-p</span> <span class="token parameter variable">-D</span> %<span class="token punctuation">{</span>SOURCE9<span class="token punctuation">}</span>        %<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/zabbix_ssl/ca.crt
<span class="token function">install</span> <span class="token parameter variable">-p</span> <span class="token parameter variable">-D</span> %<span class="token punctuation">{</span>SOURCE10<span class="token punctuation">}</span>       %<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/zabbix_ssl/client.crt
<span class="token function">install</span> <span class="token parameter variable">-p</span> <span class="token parameter variable">-D</span> %<span class="token punctuation">{</span>SOURCE11<span class="token punctuation">}</span>       %<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/zabbix_ssl/client.key
<span class="token function">install</span> <span class="token parameter variable">-p</span> <span class="token parameter variable">-D</span> %<span class="token punctuation">{</span>SOURCE12<span class="token punctuation">}</span>       %<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/etc/zabbix_agentd.conf.d/java
<span class="token function">install</span> <span class="token parameter variable">-p</span> <span class="token parameter variable">-D</span> %<span class="token punctuation">{</span>SOURCE13<span class="token punctuation">}</span>       %<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/etc/zabbix_agentd.conf.d/monitor_port
<span class="token function">install</span> <span class="token parameter variable">-p</span> <span class="token parameter variable">-D</span> %<span class="token punctuation">{</span>SOURCE14<span class="token punctuation">}</span>       %<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/etc/zabbix_agentd.conf.d/monitor_proc
<span class="token builtin class-name">echo</span> <span class="token string">&#39;export PATH=%{zabbix_dir}/bin:%{zabbix_dir}/sbin:$PATH&#39;</span> <span class="token operator">&gt;</span> %<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>/etc/profile.d/%<span class="token punctuation">{</span>name<span class="token punctuation">}</span>.sh

%files
%defattr <span class="token punctuation">(</span>-,root,root,0755<span class="token punctuation">)</span>
%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>
%<span class="token punctuation">{</span>zabbix_dir<span class="token punctuation">}</span>/*
/etc/profile.d/%<span class="token punctuation">{</span>name<span class="token punctuation">}</span>.sh
%attr<span class="token punctuation">(</span>0755,root,root<span class="token punctuation">)</span> /etc/rc.d/init.d/zabbix_agentd

%changelog

%clean
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> %<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6、打包编译" tabindex="-1"><a class="header-anchor" href="#_6、打包编译" aria-hidden="true">#</a> 6、打包编译</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># yum install gcc, gcc-c++, pcre, pcre-devel, openssl, openssl-devel -y</span>
<span class="token punctuation">[</span>gxm@localhost SPECS<span class="token punctuation">]</span>$ rpmbuild <span class="token parameter variable">-ba</span> zabbix_agent-4.0.4.spec
<span class="token punctuation">[</span>gxm@localhost SPECS<span class="token punctuation">]</span>$ rpmbuild <span class="token parameter variable">-bb</span> zabbix_agent-4.0.4.spec
<span class="token comment">## -ba和-bb二选一</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7、下载安装" tabindex="-1"><a class="header-anchor" href="#_7、下载安装" aria-hidden="true">#</a> 7、下载安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>gxm@localhost SPECS<span class="token punctuation">]</span>$ sz <span class="token punctuation">..</span>/RPMS/x86_64/zabbix_agent-4.0.4-1.el7.centos.x86_64.rpm
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># yum localinstall zabbix_agent-4.0.4-1.el7.centos.x86_64.rpm -y</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rpm -qpi zabbix_agent-4.0.4-1.el7.centos.x86_64.rpm</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rpm -qpl zabbix_agent-4.0.4-1.el7.centos.x86_64.rpm</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># rpm -qp --scripts zabbix_agent-4.0.4-1.el7.centos.x86_64.rpm</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、fpm方式定制rpm包" tabindex="-1"><a class="header-anchor" href="#二、fpm方式定制rpm包" aria-hidden="true">#</a> 二、fpm方式定制rpm包</h2>`,17),m=s("br",null,null,-1),v={href:"https://github.com/jordansissel/fpm",target:"_blank",rel:"noopener noreferrer"},k=a(`<h3 id="_1、安装ruby环境和gem命令-gem命令是从rubygem仓库安装软件-类似yum从yum仓库安装软件" tabindex="-1"><a class="header-anchor" href="#_1、安装ruby环境和gem命令-gem命令是从rubygem仓库安装软件-类似yum从yum仓库安装软件" aria-hidden="true">#</a> 1、安装ruby环境和gem命令（gem命令是从rubygem仓库安装软件，类似yum从yum仓库安装软件）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> ruby rubygems ruby-devel gcc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2、查看gem默认源" tabindex="-1"><a class="header-anchor" href="#_2、查看gem默认源" aria-hidden="true">#</a> 2、查看gem默认源</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gem <span class="token builtin class-name">source</span> list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3、添加阿里云rubygems仓库" tabindex="-1"><a class="header-anchor" href="#_3、添加阿里云rubygems仓库" aria-hidden="true">#</a> 3、添加阿里云rubygems仓库</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gem sources <span class="token parameter variable">-a</span> http://mirrors.aliyun.com/rubygems/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4、移除默认的国外源" tabindex="-1"><a class="header-anchor" href="#_4、移除默认的国外源" aria-hidden="true">#</a> 4、移除默认的国外源</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gem sources <span class="token parameter variable">--remove</span> https://rubygems.org/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5、查看gem源是否为阿里云" tabindex="-1"><a class="header-anchor" href="#_5、查看gem源是否为阿里云" aria-hidden="true">#</a> 5、查看gem源是否为阿里云</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gem <span class="token builtin class-name">source</span> list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_6、安装fpm工具" tabindex="-1"><a class="header-anchor" href="#_6、安装fpm工具" aria-hidden="true">#</a> 6、安装fpm工具</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gem <span class="token function">install</span> fpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>题外话：如果操作系统为CentOS6，可能会提示ruby版本问题，这个时候我们指定安装老版本（因为升级到新版本很麻烦）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gem <span class="token function">install</span> fpm
<span class="token comment">## Building native extensions.  This could take a while...</span>
<span class="token comment">## ## Building native extensions.  This could take a while...</span>
<span class="token comment">## ERROR:  Error installing fpm:</span>
<span class="token comment">##     ruby-xz requires Ruby version &gt;= 1.9.3.</span>
gem <span class="token function">install</span> fpm <span class="token parameter variable">-v</span> <span class="token number">1.4</span>.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7、查看版本" tabindex="-1"><a class="header-anchor" href="#_7、查看版本" aria-hidden="true">#</a> 7、查看版本</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gem <span class="token parameter variable">-v</span>
<span class="token comment">## 2.0.14.1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8、zabbix-agent编辑安装" tabindex="-1"><a class="header-anchor" href="#_8、zabbix-agent编辑安装" aria-hidden="true">#</a> 8、zabbix agent编辑安装</h3>`,17),g={href:"https://fpm.readthedocs.io/en/latest/use-cases/make-install.html",target:"_blank",rel:"noopener noreferrer"},h=a(`<p>编辑安装zabbix agent：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># groupadd zabbix</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># useradd -g zabbix zabbix</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># mkdir -p /tmp/installdir</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># mkdir -p /tmp/installdir/etc/rc.d/init.d/</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># mkdir -p /root/soft/</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># cd /root/soft/</span>
<span class="token punctuation">[</span>root@localhost soft<span class="token punctuation">]</span><span class="token comment"># yum install pcre pcre-devel openssl openssl-devel -y</span>
<span class="token punctuation">[</span>root@localhost soft<span class="token punctuation">]</span><span class="token comment"># wget https://nchc.dl.sourceforge.net/project/zabbix/ZABBIX%20Latest%20Stable/4.0.4/zabbix-4.0.4.tar.gz</span>
<span class="token punctuation">[</span>root@localhost soft<span class="token punctuation">]</span><span class="token comment"># tar -zxvf zabbix-4.0.4.tar.gz</span>
<span class="token punctuation">[</span>root@localhost soft<span class="token punctuation">]</span><span class="token comment"># cd zabbix-4.0.4</span>
<span class="token punctuation">[</span>root@localhost zabbix-4.0.4<span class="token punctuation">]</span><span class="token comment"># ./configure --prefix=/home/zabbix --enable-agent --with-openssl</span>

<span class="token comment">#将程序安装在/tmp/installdir目录，并拷贝定制文件</span>
<span class="token punctuation">[</span>root@localhost zabbix-4.0.4<span class="token punctuation">]</span><span class="token comment"># make install DESTDIR=/tmp/installdir</span>
<span class="token punctuation">[</span>root@localhost zabbix-4.0.4<span class="token punctuation">]</span><span class="token comment"># cp /root/soft/zabbix-4.0.4/misc/init.d/fedora/core/zabbix_agentd /tmp/installdir/etc/rc.d/init.d/</span>
<span class="token punctuation">[</span>root@localhost zabbix-4.0.4<span class="token punctuation">]</span><span class="token comment"># vim /tmp/installdir/etc/rc.d/init.d/zabbix_agentd</span>
<span class="token assign-left variable">BASEDIR</span><span class="token operator">=</span>/home/zabbix

<span class="token comment">#上传LLD监控端口脚本和相关文件</span>
<span class="token punctuation">[</span>root@localhost zabbix-4.0.4<span class="token punctuation">]</span><span class="token comment"># mkdir -p /tmp/installdir/home/zabbix/script/monitor_port</span>
<span class="token punctuation">[</span>root@localhost zabbix-4.0.4<span class="token punctuation">]</span><span class="token comment"># cd /tmp/installdir/home/zabbix/script/monitor_port</span>
<span class="token punctuation">[</span>root@localhost monitor_port<span class="token punctuation">]</span><span class="token comment"># 上传脚本和相关文件</span>

<span class="token comment">#上传LLD监控进程脚本和相关文件</span>
<span class="token punctuation">[</span>root@localhost zabbix-4.0.4<span class="token punctuation">]</span><span class="token comment"># mkdir -p /tmp/installdir/home/zabbix/script/monitor_proc</span>
<span class="token punctuation">[</span>root@localhost zabbix-4.0.4<span class="token punctuation">]</span><span class="token comment"># cd /tmp/installdir/home/zabbix/script/monitor_proc</span>
<span class="token punctuation">[</span>root@localhost monitor_proc<span class="token punctuation">]</span><span class="token comment"># 上传脚本和相关文件</span>

<span class="token comment">#上传LLD监控jvm脚本和相关文件</span>
<span class="token punctuation">[</span>root@localhost zabbix-4.0.4<span class="token punctuation">]</span><span class="token comment"># mkdir -p /tmp/installdir/home/zabbix/script/jvm</span>
<span class="token punctuation">[</span>root@localhost zabbix-4.0.4<span class="token punctuation">]</span><span class="token comment"># cd /tmp/installdir/home/zabbix/script/jvm</span>
<span class="token punctuation">[</span>root@localhost jvm<span class="token punctuation">]</span><span class="token comment"># 上传脚本和相关文件</span>

<span class="token comment">#上传ssl证书文件</span>
<span class="token punctuation">[</span>root@localhost zabbix-4.0.4<span class="token punctuation">]</span><span class="token comment"># mkdir -p /tmp/installdir/home/zabbix/zabbix_ssl</span>
<span class="token punctuation">[</span>root@localhost zabbix-4.0.4<span class="token punctuation">]</span><span class="token comment"># cd /tmp/installdir/home/zabbix/zabbix_ssl</span>
<span class="token punctuation">[</span>root@localhost zabbix_ssl<span class="token punctuation">]</span><span class="token comment"># 上传ssl证书文件</span>
<span class="token punctuation">[</span>root@localhost zabbix-4.0.4<span class="token punctuation">]</span><span class="token comment"># cd /tmp/installdir/home/zabbix/etc/zabbix_agentd.conf.d/</span>
<span class="token punctuation">[</span>root@localhost zabbix_agentd.conf.d<span class="token punctuation">]</span><span class="token comment"># 上传相关配置文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9、zabbix-agent脚本" tabindex="-1"><a class="header-anchor" href="#_9、zabbix-agent脚本" aria-hidden="true">#</a> 9、zabbix agent脚本</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#创建安装前的脚本：</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># vim /root/soft/zabbix-4.0.4/pre_install.sh</span>
<span class="token comment">#!/bin/bash</span>
<span class="token function">groupadd</span> zabbix
<span class="token function">useradd</span> <span class="token parameter variable">-g</span> zabbix zabbix

<span class="token comment">#创建安装后的脚本：</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># vim /root/soft/zabbix-4.0.4/post_install.sh</span>
<span class="token comment">#!/bin/bash</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /home/zabbix/logs
<span class="token function">chown</span> <span class="token parameter variable">-R</span> zabbix.zabbix /home/zabbix
<span class="token function">chmod</span> <span class="token parameter variable">-R</span> <span class="token number">755</span> /home/zabbix
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/LogFile=\\/tmp\\/zabbix_agentd\\.log/LogFile=\\/home\\/zabbix\\/logs\\/zabbix_agentd.log/g&quot;</span> /home/zabbix/etc/zabbix_agentd.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/ServerActive=127\\.0\\.0\\.1/ServerActive=192\\.168\\.7\\.10/g&quot;</span> /home/zabbix/etc/zabbix_agentd.conf
<span class="token assign-left variable">ipaddr</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">ip</span> a <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-w</span> <span class="token string">&quot;inet&quot;</span> <span class="token operator">|</span> <span class="token function">egrep</span> <span class="token string">&quot;eno3|eth0&quot;</span> <span class="token operator">|</span><span class="token function">sed</span> <span class="token string">&#39;s/^.*inet //g&#39;</span><span class="token operator">|</span><span class="token function">sed</span> <span class="token string">&#39;s/\\/[0-9][0-9].*$//g&#39;</span><span class="token variable">\`</span></span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/Hostname=Zabbix server/Hostname=<span class="token variable">$ipaddr</span>/g&quot;</span> /home/zabbix/etc/zabbix_agentd.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/Timeout=3/Timeout=30/g&quot;</span> /home/zabbix/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;UnsafeUserParameters=1&quot;</span> <span class="token operator">&gt;&gt;</span>/home/zabbix/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;EnableRemoteCommands=1&quot;</span> <span class="token operator">&gt;&gt;</span>/home/zabbix/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Include=/home/zabbix/etc/zabbix_agentd.conf.d/&quot;</span> <span class="token operator">&gt;&gt;</span>/home/zabbix/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;PidFile=/home/zabbix/zabbix_agentd.pid&quot;</span> <span class="token operator">&gt;&gt;</span>/home/zabbix/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;LogFileSize=0&quot;</span> <span class="token operator">&gt;&gt;</span>/home/zabbix/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;StartAgents=0&quot;</span> <span class="token operator">&gt;&gt;</span>/home/zabbix/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;HostMetadataItem=system.uname&quot;</span> <span class="token operator">&gt;&gt;</span>/home/zabbix/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;User=zabbix&quot;</span> <span class="token operator">&gt;&gt;</span>/home/zabbix/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;TLSConnect=cert&quot;</span> <span class="token operator">&gt;&gt;</span>/home/zabbix/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;TLSAccept=cert&quot;</span> <span class="token operator">&gt;&gt;</span>/home/zabbix/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;TLSCAFile=/home/zabbix/zabbix_ssl/ca.crt&quot;</span> <span class="token operator">&gt;&gt;</span>/home/zabbix/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;TLSCertFile=/home/zabbix/zabbix_ssl/client.crt&quot;</span> <span class="token operator">&gt;&gt;</span>/home/zabbix/etc/zabbix_agentd.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;TLSKeyFile=/home/zabbix/zabbix_ssl/client.key&quot;</span> <span class="token operator">&gt;&gt;</span>/home/zabbix/etc/zabbix_agentd.conf
systemctl daemon-reload
/etc/init.d/zabbix_agentd start
systemctl <span class="token builtin class-name">enable</span> zabbix_agentd

<span class="token comment">#创建卸载前的脚本：</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># vim /root/soft/zabbix-4.0.4/pre_uninstall.sh</span>
<span class="token comment">#!/bin/bash</span>
systemctl stop zabbix_agentd

<span class="token comment">#创建卸载后的脚本：</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># vim /root/soft/zabbix-4.0.4/post_uninstall.sh</span>
<span class="token comment">#!/bin/bash</span>
<span class="token function">userdel</span> <span class="token parameter variable">-r</span> zabbix
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /etc/rc.d/init.d/zabbix_agentd
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /home/zabbix
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10、打包rpm" tabindex="-1"><a class="header-anchor" href="#_10、打包rpm" aria-hidden="true">#</a> 10、打包rpm</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## fpm帮助：</span>
fpm <span class="token parameter variable">-help</span>
<span class="token comment">## 安装rpm-build工具（fpm依赖rpm-build）：</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> rpm-build
<span class="token comment">## fpm打包命令：</span>
<span class="token comment">#### el6：</span>
fpm <span class="token parameter variable">-f</span> <span class="token parameter variable">-s</span> <span class="token function">dir</span> <span class="token parameter variable">-t</span> <span class="token function">rpm</span> <span class="token parameter variable">-n</span> zabbix-agent <span class="token parameter variable">--epoch</span> <span class="token number">0</span> <span class="token parameter variable">-v</span> <span class="token number">4.0</span>.4 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-C</span> /tmp/installdir  <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> /tmp/ <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token string">&#39;pcre&#39;</span> <span class="token parameter variable">-d</span> <span class="token string">&#39;pcre-devel&#39;</span> <span class="token parameter variable">-d</span> <span class="token string">&#39;openssl&#39;</span> <span class="token parameter variable">-d</span> <span class="token string">&#39;openssl-devel&#39;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--verbose</span> <span class="token parameter variable">--category</span> <span class="token string">&#39;Applications/Internet&#39;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--description</span> <span class="token string">&#39;Zabbix Agent&#39;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--url</span> <span class="token string">&#39;http://www.zabbix.com/&#39;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--license</span> <span class="token string">&#39;BSD&#39;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-m</span> <span class="token string">&#39;zabbix&#39;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--iteration</span> <span class="token string">&#39;1.el7&#39;</span> <span class="token punctuation">\\</span>
  --pre-install /root/soft/zabbix-4.0.4/pre_install.sh <span class="token punctuation">\\</span>
  --post-install /root/soft/zabbix-4.0.4/post_install.sh <span class="token punctuation">\\</span>
  --pre-uninstall /root/soft/zabbix-4.0.4/pre_uninstall.sh <span class="token punctuation">\\</span>
  --post-uninstall /root/soft/zabbix-4.0.4/post_uninstall.sh <span class="token punctuation">\\</span>
  --no-rpm-sign

<span class="token comment">### el7:</span>
fpm <span class="token parameter variable">-f</span> <span class="token parameter variable">-s</span> <span class="token function">dir</span> <span class="token parameter variable">-t</span> <span class="token function">rpm</span> <span class="token parameter variable">-n</span> zabbix-agent <span class="token parameter variable">--epoch</span> <span class="token number">0</span> <span class="token parameter variable">-v</span> <span class="token number">4.0</span>.4 <span class="token punctuation">\\</span>
  <span class="token parameter variable">-C</span> /tmp/installdir  <span class="token punctuation">\\</span>
  <span class="token parameter variable">-p</span> /tmp/ <span class="token punctuation">\\</span>
  <span class="token parameter variable">-d</span> <span class="token string">&#39;pcre&#39;</span> <span class="token parameter variable">-d</span> <span class="token string">&#39;pcre-devel&#39;</span> <span class="token parameter variable">-d</span> <span class="token string">&#39;openssl&#39;</span> <span class="token parameter variable">-d</span> <span class="token string">&#39;openssl-devel&#39;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--verbose</span> <span class="token parameter variable">--category</span> <span class="token string">&#39;Applications/Internet&#39;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--description</span> <span class="token string">&#39;Zabbix Agent&#39;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--url</span> <span class="token string">&#39;http://www.zabbix.com/&#39;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--license</span> <span class="token string">&#39;BSD&#39;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">-m</span> <span class="token string">&#39;zabbix&#39;</span> <span class="token punctuation">\\</span>
  <span class="token parameter variable">--iteration</span> <span class="token string">&#39;1.el7&#39;</span> <span class="token punctuation">\\</span>
  --pre-install /root/soft/zabbix-4.0.4/pre_install.sh <span class="token punctuation">\\</span>
  --post-install /root/soft/zabbix-4.0.4/post_install.sh <span class="token punctuation">\\</span>
  --pre-uninstall /root/soft/zabbix-4.0.4/pre_uninstall.sh <span class="token punctuation">\\</span>
  --post-uninstall /root/soft/zabbix-4.0.4/post_uninstall.sh <span class="token punctuation">\\</span>
  --no-rpm-sign
<span class="token comment">## Created package {:path=&gt;&quot;/tmp/zabbix-agent-4.0.4-1.el7.x86_64.rpm&quot;}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11、验证rpm包" tabindex="-1"><a class="header-anchor" href="#_11、验证rpm包" aria-hidden="true">#</a> 11、验证rpm包</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /tmp
<span class="token function">rpm</span> <span class="token parameter variable">-qpi</span> zabbix-agent-4.0.4-1.el7.x86_64.rpm
<span class="token function">rpm</span> <span class="token parameter variable">-qpl</span> zabbix-agent-4.0.4-1.el7.x86_64.rpm
<span class="token function">rpm</span> <span class="token parameter variable">-qp</span> <span class="token parameter variable">--scripts</span> zabbix-agent-4.0.4-1.el7.x86_64.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function x(_,z){const e=p("ExternalLinkIcon");return l(),c("div",null,[r,s("p",null,[n("SPEC文件是最核心的，在它里面定义了头部信息和一些“阶段”(%prep、%build、%install、%clean、%pre、%post、%preun和%postun)，当rpmbuild执行时它首先会去解析SPEC文件，然后依次执行每个“阶段”里的指令。"),u,n(" 参考："),s("a",d,[n("http://blog.chinaunix.net/uid-23069658-id-3944462.html"),t(e)])]),b,s("p",null,[n("fpm工具其实是对rpmbuild进行封装，目的是使打包变成容易。由于此工具是ruby语言编写的，所以系统需要安装ruby，且ruby版本号大于1.8.5。"),m,n(" fpm开源项目："),s("a",v,[n("https://github.com/jordansissel/fpm"),t(e)])]),k,s("p",null,[n("参考官方cases："),s("a",g,[n("https://fpm.readthedocs.io/en/latest/use-cases/make-install.html"),t(e)])]),h])}const q=i(o,[["render",x],["__file","80.RPM包-rpmbuild.html.vue"]]);export{q as default};
