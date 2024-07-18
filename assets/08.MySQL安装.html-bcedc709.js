import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as c,c as p,e as r,a as s,d as a,w as e,f as o,b as l}from"./app-efa5e96e.js";const m={},d={class:"table-of-contents"},v=o(`<h2 id="centos7-yum-安装-mysql5-7" tabindex="-1"><a class="header-anchor" href="#centos7-yum-安装-mysql5-7" aria-hidden="true">#</a> CentOS7 yum 安装 MySQL5.7</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查MySQL是否安装</span>
yum list installed <span class="token operator">|</span> <span class="token function">grep</span> mysql
<span class="token function">rpm</span> -qa<span class="token operator">|</span><span class="token function">grep</span> mysql
<span class="token comment"># 卸载MySQL</span>
<span class="token function">rpm</span> -qa<span class="token operator">|</span><span class="token function">grep</span> mysql<span class="token operator">|</span><span class="token function">xargs</span> <span class="token function">rpm</span> <span class="token parameter variable">-e</span> <span class="token parameter variable">--nodeps</span>

<span class="token comment"># 下载并安装MySQL官方的 Yum Repository</span>
<span class="token comment">## 下载地址：https://dev.mysql.com/downloads/repo/yum/</span>
<span class="token comment">#安装yum源</span>
<span class="token function">wget</span> https://repo.mysql.com/mysql80-community-release-el7-3.noarch.rpm
<span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> mysql80-community-release-el7-3.noarch.rpm
<span class="token comment">#使用此命令可以查看 MySQL Yum 存储库中的所有子存储库，并查看其中哪些子存储库已启用或禁用</span>
yum repolist all <span class="token operator">|</span> <span class="token function">grep</span> mysql
<span class="token comment">#关闭 MySQL 8的下载源</span>
yum-config-manager <span class="token parameter variable">--disable</span> mysql80-community
<span class="token comment">#开启 MySQL 5.7下载源</span>
yum-config-manager <span class="token parameter variable">--enable</span> mysql57-community
<span class="token comment"># 查看是否配置正确</span>
yum repolist enabled <span class="token operator">|</span> <span class="token function">grep</span> mysql
<span class="token comment"># 安装MySQL</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> mysql-community-server
<span class="token comment">## 遇到以下问题解决方案</span>
<span class="token comment"># &quot;MySQL 5.7 Community Server&quot; 的 GPG 密钥已安装，但是不适用于此软件包。请检查源的公钥 URL 是否配置正确。</span>
<span class="token comment"># 官方解决方案链接：https://dev.mysql.com/doc/refman/8.0/en/checking-rpm-signature.html</span>
<span class="token function">rpm</span> <span class="token parameter variable">--checksig</span> mysql80-community-release-el7-3.noarch.rpm
<span class="token function">rpm</span> <span class="token parameter variable">--import</span> https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

<span class="token comment"># 启动MySQL</span>
systemctl start mysqld.service <span class="token operator">&amp;&amp;</span> systemctl status mysqld.service
<span class="token comment"># 初始root密码</span>
<span class="token function">grep</span> <span class="token string">&quot;password&quot;</span> /var/log/mysqld.log
<span class="token comment"># 修改root密码</span>
mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;alter user user() identified by &quot;123456@aA&quot;&#39;</span>
mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;SELECT host, user FROM mysql.user&#39;</span>

<span class="token comment">## 客户端免密登录</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /etc/my.cnf <span class="token operator">&lt;&lt;</span><span class="token string">EOF
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8
[mysqld]
#设置3306端口
port = 3306
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid

# 0：大小写敏感 1：大小写不敏感
lower_case_table_names=1
# 默认字符集
character-set-server=utf8
# 默认时区
default-time_zone = &#39;+8:00&#39;
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB

[client]
# 设置mysql客户端连接服务端时默认使用的端口
port=3306
user=root
password=123456@aA
default-character-set=utf8
EOF</span>
<span class="token comment"># 重启MySQL服务</span>
systemctl start mysqld.service <span class="token operator">&amp;&amp;</span> systemctl status mysqld.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-安装" tabindex="-1"><a class="header-anchor" href="#docker-安装" aria-hidden="true">#</a> Docker 安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> docker-compose.yml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
version: &quot;3&quot;
services:
  mysql:
    image: mysql:5.7.36
    container_name: mysql
    restart: always
    environment:
      TZ: &quot;Asia/Shanghai&quot;
      MYSQL_ROOT_PASSWORD: 123456@aA
      MYSQL_ROOT_HOST: &quot;%&quot;
      MYSQL_DATABASE: &quot;demo_db&quot;
      MYSQL_USER: &quot;demo_user&quot;
      MYSQL_PASSWORD: &quot;123456@aA&quot;
    volumes:
      - ./mysql:/var/lib/mysql
    ulimits:
      nproc: 65535
      nofile:
        soft: 65535
        hard: 65535
EOF</span>
<span class="token comment"># 启动</span>
<span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
<span class="token comment"># 停止</span>
<span class="token function">docker-compose</span> down
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="centos-离线安装-mysql" tabindex="-1"><a class="header-anchor" href="#centos-离线安装-mysql" aria-hidden="true">#</a> CentOS 离线安装 MySQL</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> https://cdn.mysql.com//Downloads/MySQL-5.7/mysql-5.7.35-el7-x86_64.tar.gz
<span class="token function">tar</span> xzvf mysql-5.7.26-linux-glibc2.12-x86_64.tar.gz <span class="token parameter variable">-C</span> /usr/local/
<span class="token function">mv</span> /usr/local/mysql-5.7.26-linux-glibc2.12-x86_64 /usr/local/mysql-5.7
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> /etc/my.cnf <span class="token operator">&lt;&lt;</span><span class="token string">EOF
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8
[mysqld]
#跳过权限表校验
#skip-grant-tables
skip-name-resolve
#设置3306端口
port = 3306
# 设置mysql的安装目录
basedir=/usr/local/mysql-5.7
# 设置mysql数据库的数据的存放目录
datadir=/usr/local/mysql-5.7/data
# 允许最大连接数
max_connections=200
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
lower_case_table_names=1
max_allowed_packet=16M
EOF</span>

<span class="token function">groupadd</span> mysql
<span class="token function">useradd</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-g</span> mysql mysql
<span class="token function">chown</span> <span class="token parameter variable">-R</span> mysql:mysql /usr/local/mysql-5.7/

<span class="token function">mkdir</span> /usr/local/mysql-5.7/data
<span class="token builtin class-name">cd</span> /usr/local/mysql-5.7/bin <span class="token operator">&amp;&amp;</span> ./mysqld <span class="token parameter variable">--initialize</span> <span class="token parameter variable">--user</span><span class="token operator">=</span>mysql <span class="token parameter variable">--basedir</span><span class="token operator">=</span>/usr/local/mysql-5.7 <span class="token parameter variable">--datadir</span><span class="token operator">=</span>/usr/local/mysql-5.7/data
<span class="token function">cp</span> /usr/local/mysql-5.7/support-files/mysql.server /etc/init.d/mysql
<span class="token function">chmod</span> +x /etc/init.d/mysql
systemctl <span class="token builtin class-name">enable</span> mysql.service
systemctl start mysql.service
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/local/mysql-5.7/bin/mysql /usr/bin
mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p</span>
mysql<span class="token operator">&gt;</span> alter user user<span class="token punctuation">(</span><span class="token punctuation">)</span> identified by <span class="token string">&quot;root&quot;</span><span class="token punctuation">;</span>
mysql<span class="token operator">&gt;</span> update mysql.user <span class="token builtin class-name">set</span> <span class="token assign-left variable">authentication_string</span><span class="token operator">=</span>password<span class="token punctuation">(</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">)</span> where <span class="token assign-left variable">user</span><span class="token operator">=</span><span class="token string">&#39;root&#39;</span> and Host <span class="token operator">=</span><span class="token string">&#39;localhost&#39;</span><span class="token punctuation">;</span>
mysql<span class="token operator">&gt;</span> update mysql.user <span class="token builtin class-name">set</span> <span class="token assign-left variable">host</span><span class="token operator">=</span><span class="token string">&#39;%&#39;</span> where <span class="token assign-left variable">user</span><span class="token operator">=</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">;</span>
mysql<span class="token operator">&gt;</span> flush privileges<span class="token punctuation">;</span>

mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-proot</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="centos-下编译安装" tabindex="-1"><a class="header-anchor" href="#centos-下编译安装" aria-hidden="true">#</a> CentOS 下编译安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#安装依赖包：</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> <span class="token function">make</span> gcc-c++ cmake bison-devel ncurses-devel
<span class="token comment">#下载mysql：</span>
<span class="token function">wget</span> http://cdn.mysql.com/Downloads/MySQL-5.6/mysql-5.6.35.tar.gz
<span class="token function">tar</span> xvf mysql-5.6.35.tar.gz
<span class="token builtin class-name">cd</span> mysql-5.6.35
<span class="token comment">#编译安装：</span>
cmake <span class="token punctuation">\\</span>
<span class="token parameter variable">-DCMAKE_INSTALL_PREFIX</span><span class="token operator">=</span>/usr/local/mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-DMYSQL_DATADIR</span><span class="token operator">=</span>/usr/local/mysql/data <span class="token punctuation">\\</span>
<span class="token parameter variable">-DSYSCONFDIR</span><span class="token operator">=</span>/etc <span class="token punctuation">\\</span>
<span class="token parameter variable">-DWITH_MYISAM_STORAGE_ENGINE</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-DWITH_INNOBASE_STORAGE_ENGINE</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-DWITH_MEMORY_STORAGE_ENGINE</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-DWITH_READLINE</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-DMYSQL_UNIX_ADDR</span><span class="token operator">=</span>/var/lib/mysql/mysql.sock <span class="token punctuation">\\</span>
<span class="token parameter variable">-DMYSQL_TCP_PORT</span><span class="token operator">=</span><span class="token number">3306</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-DENABLED_LOCAL_INFILE</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-DWITH_PARTITION_STORAGE_ENGINE</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-DEXTRA_CHARSETS</span><span class="token operator">=</span>all <span class="token punctuation">\\</span>
<span class="token parameter variable">-DDEFAULT_CHARSET</span><span class="token operator">=</span>utf8 <span class="token punctuation">\\</span>
<span class="token parameter variable">-DDEFAULT_COLLATION</span><span class="token operator">=</span>utf8_general_ci
<span class="token comment">## 安装：</span>
<span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token function">install</span>
<span class="token comment">## 配置mysql。</span>
<span class="token comment">## 设置权限:</span>
<span class="token function">groupadd</span> mysql
<span class="token function">groupadd</span> <span class="token parameter variable">-g</span> mysql mysql
<span class="token function">chown</span> <span class="token parameter variable">-R</span> mysql:mysql /usr/local/mysql
<span class="token comment">## 初始化配置</span>
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/local/mysql/lib/libmysqlclient.so.18 /usr/lib64/libmysqlclient.so.18
<span class="token builtin class-name">cd</span> /usr/local/mysql
scripts/mysql_install_db <span class="token parameter variable">--basedir</span><span class="token operator">=</span>/usr/local/mysql <span class="token parameter variable">--datadir</span><span class="token operator">=</span>/usr/local/mysql/data <span class="token parameter variable">--user</span><span class="token operator">=</span>mysql
<span class="token comment"># 注意: 将/etc/my.cnf 改成其他名字,以防冲突。</span>
<span class="token comment">## 启动Mysql</span>
<span class="token function">cp</span> support-files/mysql.server /etc/init.d/mysql
<span class="token function">chkconfig</span> mysql on
<span class="token function">service</span> mysql start --启动MySQL
<span class="token comment">## 配置system管理</span>
<span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>/usr/local/mysql/bin:<span class="token environment constant">$PATH</span>
<span class="token builtin class-name">export</span> <span class="token environment constant">PATH</span>
<span class="token builtin class-name">source</span> /etc/profile
mysql <span class="token parameter variable">-uroot</span>
mysql<span class="token operator">&gt;</span> <span class="token builtin class-name">set</span> password <span class="token operator">=</span> password<span class="token punctuation">(</span><span class="token string">&#39;123456&#39;</span><span class="token punctuation">)</span>
<span class="token comment">## 设置远程访问</span>
mysql<span class="token operator">&gt;</span>GRANT ALL PRIVILEGES ON *.* TO <span class="token string">&#39;root&#39;</span>@<span class="token string">&#39;%&#39;</span> IDENTIFIED BY <span class="token string">&#39;123456&#39;</span> WITH GRANT OPTION<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="windows-中安装-mysql5-7" tabindex="-1"><a class="header-anchor" href="#windows-中安装-mysql5-7" aria-hidden="true">#</a> Windows 中安装 MySQL5.7</h2><details class="hint-container details"><summary>my.ini 文件内容</summary><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8

[mysqld]
#设置3306端口
port = 3306
# 设置mysql的安装目录
basedir=D:\\\\Tools\\\\MySQL\\\\mysql-5.7.33-winx64
# 设置mysql数据库的数据的存放目录
datadir=D:\\\\Tools\\\\MySQL\\\\mysql-5.7.33-winx64\\\\data
# 允许最大连接数
max_connections=200
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
# 0：大小写敏感 1：大小写不敏感
lower_case_table_names=1
# 默认时区
default-time_zone = &#39;+8:00&#39;
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
# 用于登录数据库是跳过验证权限
#skip-grant-tables

[client]
# 设置mysql客户端连接服务端时默认使用的端口
port=3306
user=root
password=123456
default-character-set=utf8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 官网下载：https://dev.mysql.com/downloads/mysql/5.7.html#downloads</span>
<span class="token comment">## 解压路径：D:\\Tools\\MySQL\\mysql-5.7.33-winx64</span>
<span class="token comment">## 新建\`data\`和\`my.ini\`文件</span>
<span class="token comment"># cmd 以管理员身份运行</span>
<span class="token builtin class-name">cd</span> D:<span class="token punctuation">\\</span>Tools<span class="token punctuation">\\</span>MySQL<span class="token punctuation">\\</span>mysql-5.7.33-winx64<span class="token punctuation">\\</span>bin
<span class="token comment"># 初始化数据库 并 记住root密码</span>
<span class="token comment"># mysqld --initialize-insecure 空的root密码</span>
mysqld <span class="token parameter variable">--initialize</span> <span class="token parameter variable">--user</span><span class="token operator">=</span>mysql <span class="token parameter variable">--console</span>
<span class="token comment"># 安装服务</span>
mysqld <span class="token parameter variable">--install</span>
<span class="token comment">#mysqld install MySQL --defaults-file=&quot;D:\\\\Tools\\\\MySQL\\\\mysql-5.7.33-winx64\\\\my.ini&quot;</span>
<span class="token comment"># 启动服务</span>
net start mysql
<span class="token comment"># 登录MySQL修改root密码，若找不到初始密码可以在\`my.ini\`中[mysqld] 添加\`skip-grant-tables\`</span>
mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p</span>
<span class="token builtin class-name">set</span> password <span class="token keyword">for</span> root@localhost<span class="token operator">=</span>password<span class="token punctuation">(</span><span class="token string">&#39;123456&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="编译安装-mysql" tabindex="-1"><a class="header-anchor" href="#编译安装-mysql" aria-hidden="true">#</a> 编译安装 mysql</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#安装依赖包：</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> <span class="token function">make</span> gcc-c++ cmake bison-devel ncurses-devel
<span class="token comment">#下载mysql：</span>
<span class="token function">wget</span> http://cdn.mysql.com/Downloads/MySQL-5.6/mysql-5.6.35.tar.gz
<span class="token function">tar</span> xvf mysql-5.6.35.tar.gz
<span class="token builtin class-name">cd</span> mysql-5.6.35

<span class="token comment">#编译安装：</span>

cmake <span class="token punctuation">\\</span>
<span class="token parameter variable">-DCMAKE_INSTALL_PREFIX</span><span class="token operator">=</span>/usr/local/mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-DMYSQL_DATADIR</span><span class="token operator">=</span>/usr/local/mysql/data <span class="token punctuation">\\</span>
<span class="token parameter variable">-DSYSCONFDIR</span><span class="token operator">=</span>/etc <span class="token punctuation">\\</span>
<span class="token parameter variable">-DWITH_MYISAM_STORAGE_ENGINE</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-DWITH_INNOBASE_STORAGE_ENGINE</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-DWITH_MEMORY_STORAGE_ENGINE</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-DWITH_READLINE</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-DMYSQL_UNIX_ADDR</span><span class="token operator">=</span>/var/lib/mysql/mysql.sock <span class="token punctuation">\\</span>
<span class="token parameter variable">-DMYSQL_TCP_PORT</span><span class="token operator">=</span><span class="token number">3306</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-DENABLED_LOCAL_INFILE</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-DWITH_PARTITION_STORAGE_ENGINE</span><span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-DEXTRA_CHARSETS</span><span class="token operator">=</span>all <span class="token punctuation">\\</span>
<span class="token parameter variable">-DDEFAULT_CHARSET</span><span class="token operator">=</span>utf8 <span class="token punctuation">\\</span>
<span class="token parameter variable">-DDEFAULT_COLLATION</span><span class="token operator">=</span>utf8_general_ci
<span class="token comment">#安装：</span>
<span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token function">install</span>
<span class="token comment">#配置mysql。</span>
<span class="token comment">#设置权限:</span>
<span class="token function">groupadd</span> mysql
<span class="token function">groupadd</span> <span class="token parameter variable">-g</span> mysql mysql
<span class="token function">chown</span> <span class="token parameter variable">-R</span> mysql:mysql /usr/local/mysql
<span class="token comment">#初始化配置:</span>
<span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/local/mysql/lib/libmysqlclient.so.18 /usr/lib64/libmysqlclient.so.18
<span class="token builtin class-name">cd</span> /usr/local/mysql
scripts/mysql_install_db <span class="token parameter variable">--basedir</span><span class="token operator">=</span>/usr/local/mysql <span class="token parameter variable">--datadir</span><span class="token operator">=</span>/usr/local/mysql/data <span class="token parameter variable">--user</span><span class="token operator">=</span>mysql
<span class="token comment">## 注意: 将/etc/my.cnf 改成其他名字,以防冲突。</span>
<span class="token comment">#启动Mysql：</span>
<span class="token function">cp</span> support-files/mysql.server /etc/init.d/mysql
<span class="token function">chkconfig</span> mysql on
<span class="token function">service</span> mysql start --启动MySQL
<span class="token comment">#配置system管理：</span>
<span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>/usr/local/mysql/bin:<span class="token environment constant">$PATH</span>
<span class="token builtin class-name">export</span> <span class="token environment constant">PATH</span>
<span class="token builtin class-name">source</span> /etc/profile
mysql <span class="token parameter variable">-uroot</span>
mysql<span class="token operator">&gt;</span> <span class="token builtin class-name">set</span> password <span class="token operator">=</span> password<span class="token punctuation">(</span><span class="token string">&#39;123456&#39;</span><span class="token punctuation">)</span>
<span class="token comment">#设置远程访问：</span>
mysql<span class="token operator">&gt;</span>GRANT ALL PRIVILEGES ON *.* TO <span class="token string">&#39;root&#39;</span>@<span class="token string">&#39;%&#39;</span> IDENTIFIED BY <span class="token string">&#39;123456&#39;</span> WITH GRANT OPTION<span class="token punctuation">;</span>
<span class="token comment">#mysql 配置完成。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function u(b,k){const n=t("router-link");return c(),p("div",null,[r(" more "),s("nav",d,[s("ul",null,[s("li",null,[a(n,{to:"#centos7-yum-安装-mysql5-7"},{default:e(()=>[l("CentOS7 yum 安装 MySQL5.7")]),_:1})]),s("li",null,[a(n,{to:"#docker-安装"},{default:e(()=>[l("Docker 安装")]),_:1})]),s("li",null,[a(n,{to:"#centos-离线安装-mysql"},{default:e(()=>[l("CentOS 离线安装 MySQL")]),_:1})]),s("li",null,[a(n,{to:"#centos-下编译安装"},{default:e(()=>[l("CentOS 下编译安装")]),_:1})]),s("li",null,[a(n,{to:"#windows-中安装-mysql5-7"},{default:e(()=>[l("Windows 中安装 MySQL5.7")]),_:1})]),s("li",null,[a(n,{to:"#编译安装-mysql"},{default:e(()=>[l("编译安装 mysql")]),_:1})])])]),v])}const f=i(m,[["render",u],["__file","08.MySQL安装.html.vue"]]);export{f as default};
