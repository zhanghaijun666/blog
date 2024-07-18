import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as p,c as i,e as c,a as s,d as a,w as e,f as r,b as l}from"./app-efa5e96e.js";const d={},m={class:"table-of-contents"},k=r(`<h2 id="mysql-密码安全策略" tabindex="-1"><a class="header-anchor" href="#mysql-密码安全策略" aria-hidden="true">#</a> MySQL 密码安全策略</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 查看MySQL密码策略</span>
<span class="token keyword">SHOW</span> VARIABLES <span class="token operator">LIKE</span> <span class="token string">&#39;validate_password%&#39;</span><span class="token punctuation">;</span>
<span class="token comment">-- mysql5.7以后对密码的强度是有要求的，必须是字母+数字+符号组成的，如果想设置简单密码例 如‘root’，需要做以下设置</span>
<span class="token comment">-- 设置密码长度最低位数 默认是8位</span>
<span class="token keyword">set</span> <span class="token keyword">global</span> validate_password_length<span class="token operator">=</span><span class="token number">4</span><span class="token punctuation">;</span>
<span class="token comment">-- 设置密码强度级别 默认是1，可选 [LOW:0| MEDIUM:1 | STRONG:2]</span>
<span class="token keyword">set</span> <span class="token keyword">global</span> validate_password_policy<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
<span class="token comment">-- 设置最少数字数量 默认是1</span>
<span class="token keyword">set</span> <span class="token keyword">global</span> validate_password_number_count<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment">-- 设置最少符号数量 默认是1</span>
<span class="token keyword">set</span> <span class="token keyword">global</span> validate_password_special_char_count<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment">-- 修改root密码</span>
<span class="token keyword">alter</span> <span class="token keyword">user</span> <span class="token string">&#39;root&#39;</span><span class="token variable">@&#39;localhost&#39;</span> identified <span class="token keyword">by</span> <span class="token string">&#39;root&#39;</span><span class="token punctuation">;</span>
flush <span class="token keyword">privileges</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mysql-远程连接授权" tabindex="-1"><a class="header-anchor" href="#mysql-远程连接授权" aria-hidden="true">#</a> MySQL 远程连接授权</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">------------------------</span>
<span class="token comment">-- ALL PRIVILEGES ：表示授予所有的权限，此处可以指定具体的授权权限。</span>
<span class="token comment">-- *.* ：表示所有库中的所有表</span>
<span class="token comment">-- &#39;root&#39;@&#39;%&#39; ：myuser是数据库的用户名，%表示是任意ip地址，可以指定具体ip地址。</span>
<span class="token comment">-- IDENTIFIED BY &#39;mypassword&#39; ：mypassword是数据库的密码。</span>
<span class="token comment">-- WITH GRANT OPTION ：这个选项表示该用户可以将自己拥有的权限授权给别人</span>
<span class="token comment">------------------------</span>
<span class="token comment">-- 授予root用户对所有数据库对象的全部操作权限</span>
<span class="token keyword">GRANT</span> <span class="token keyword">ALL</span> <span class="token keyword">PRIVILEGES</span> <span class="token keyword">ON</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">TO</span> <span class="token string">&#39;root&#39;</span><span class="token variable">@&#39;%&#39;</span> IDENTIFIED <span class="token keyword">BY</span> <span class="token string">&#39;root&#39;</span> <span class="token keyword">WITH</span> <span class="token keyword">GRANT</span> <span class="token keyword">OPTION</span><span class="token punctuation">;</span>
<span class="token comment">-- 创建一个admin用户，密码为admin</span>
<span class="token keyword">GRANT</span> <span class="token keyword">ALL</span> <span class="token keyword">PRIVILEGES</span> <span class="token keyword">ON</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">TO</span> <span class="token string">&#39;admin&#39;</span><span class="token variable">@&#39;%&#39;</span> IDENTIFIED <span class="token keyword">BY</span> <span class="token string">&#39;admin&#39;</span><span class="token punctuation">;</span>
<span class="token comment">-- 关闭授权</span>
<span class="token keyword">REVOKE</span> <span class="token keyword">ALL</span> <span class="token keyword">ON</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token string">&#39;admin&#39;</span><span class="token variable">@&#39;localhost&#39;</span><span class="token punctuation">;</span>
<span class="token comment">-- 刷新权限</span>
FLUSH <span class="token keyword">PRIVILEGES</span><span class="token punctuation">;</span>
<span class="token comment">-- 查看root权限为所有ip都可以访问</span>
<span class="token keyword">SHOW</span> GRANTS <span class="token keyword">FOR</span> <span class="token string">&#39;root&#39;</span><span class="token variable">@&#39;localhost&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mysql-其他命令" tabindex="-1"><a class="header-anchor" href="#mysql-其他命令" aria-hidden="true">#</a> MySQL 其他命令</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 查看MySQL密码策略</span>
<span class="token keyword">SHOW</span> VARIABLES <span class="token operator">LIKE</span> <span class="token string">&#39;validate_password%&#39;</span><span class="token punctuation">;</span>
<span class="token comment">-- 显示数据库编码</span>
<span class="token keyword">show</span> variables <span class="token operator">like</span> <span class="token string">&#39;char%&#39;</span><span class="token punctuation">;</span>
<span class="token comment">-- 查看日志配置信息</span>
<span class="token keyword">show</span> variables <span class="token operator">like</span> <span class="token string">&#39;log_%&#39;</span><span class="token punctuation">;</span>
<span class="token comment">-- 查看MySQL数据文件</span>
<span class="token keyword">SHOW</span> VARIABLES <span class="token operator">LIKE</span> <span class="token string">&#39;%datadir%&#39;</span><span class="token punctuation">;</span>
<span class="token comment">-- 显示用户正在运行的线程</span>
<span class="token keyword">show</span> processlist<span class="token punctuation">;</span>
<span class="token comment">-- 查看存储引擎</span>
<span class="token keyword">show</span> engines<span class="token punctuation">;</span>
<span class="token comment">-- 查看上次查询成本开销</span>
<span class="token keyword">show</span> <span class="token keyword">status</span> <span class="token operator">like</span> <span class="token string">&#39;Last_query_cost&#39;</span><span class="token punctuation">;</span>
<span class="token comment">-- 查看优化器的执行计划</span>
<span class="token keyword">explain</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> customer <span class="token keyword">where</span> customer_id<span class="token operator">=</span><span class="token number">14</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mysql-密码忘记" tabindex="-1"><a class="header-anchor" href="#mysql-密码忘记" aria-hidden="true">#</a> mysql 密码忘记</h2><ol><li>启动 mysql 时不启动授权表功能，可以直接免密码登录</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 修改/etc/my.cnf文件</span>
<span class="token function">vim</span> /etc/my.cnf
<span class="token comment"># 在[mysqld]区域添加配置,并保存my.cnf文件</span>
skip-grant-tables

<span class="token comment"># 重启mysql</span>
systemctl restart mysqld
<span class="token comment"># 登录mysql，如果出现输入密码，直接回车，就可以进入数据库了</span>
mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>修改 root 密码</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 登录mysql，此时还没有进入数据库，使用如下命令</span>
use mysql<span class="token punctuation">;</span>

<span class="token comment"># （mysql5.6版本）修改root密码</span>
update user <span class="token builtin class-name">set</span> <span class="token assign-left variable">password</span><span class="token operator">=</span>password<span class="token punctuation">(</span><span class="token string">&#39;密码&#39;</span><span class="token punctuation">)</span> where <span class="token assign-left variable">user</span><span class="token operator">=</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">;</span>

<span class="token comment"># （mysql5.7版本）修改root密码</span>
update user <span class="token builtin class-name">set</span> authentication_string <span class="token operator">=</span> password<span class="token punctuation">(</span><span class="token string">&#39;密码&#39;</span><span class="token punctuation">)</span>, password_expired <span class="token operator">=</span> <span class="token string">&#39;N&#39;</span>,password_last_changed <span class="token operator">=</span> now<span class="token punctuation">(</span><span class="token punctuation">)</span> where user <span class="token operator">=</span> <span class="token string">&#39;root&#39;</span><span class="token punctuation">;</span>

<span class="token comment"># （mysql8版本）将root密码置空，废弃user表中password()方法，所以旧方法重置密码对mysql8.0版本是行不通的！</span>
update user <span class="token builtin class-name">set</span> authentication_string <span class="token operator">=</span> <span class="token string">&#39;&#39;</span> where user <span class="token operator">=</span> <span class="token string">&#39;root&#39;</span><span class="token punctuation">;</span>
<span class="token comment"># （mysql8版本）执行第三步，以无密码进入，设置root密码</span>
ALTER <span class="token environment constant">USER</span> <span class="token string">&#39;root&#39;</span>@<span class="token string">&#39;localhost&#39;</span> IDENTIFIED BY <span class="token string">&#39;Root@123456&#39;</span><span class="token punctuation">;</span>

<span class="token comment"># 使其生效</span>
flush privileges<span class="token punctuation">;</span>
<span class="token comment"># 退出</span>
<span class="token builtin class-name">exit</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>重启服务器<br> 上面操作完成之后，其实还没有完，需要关闭授权表功能，重启服务器</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 修改/etc/my.cnf文件</span>
<span class="token function">vim</span> /etc/my.cnf
<span class="token comment"># 在[mysqld]区域删除改配置,并保存my.cnf文件</span>
<span class="token comment"># skip-grant-tables</span>

<span class="token comment"># 重启mysql</span>
systemctl restart mysqld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function u(v,b){const n=o("router-link");return p(),i("div",null,[c(" more "),s("nav",m,[s("ul",null,[s("li",null,[a(n,{to:"#mysql-密码安全策略"},{default:e(()=>[l("MySQL 密码安全策略")]),_:1})]),s("li",null,[a(n,{to:"#mysql-远程连接授权"},{default:e(()=>[l("MySQL 远程连接授权")]),_:1})]),s("li",null,[a(n,{to:"#mysql-其他命令"},{default:e(()=>[l("MySQL 其他命令")]),_:1})]),s("li",null,[a(n,{to:"#mysql-密码忘记"},{default:e(()=>[l("mysql 密码忘记")]),_:1})])])]),k])}const h=t(d,[["render",u],["__file","09.MySQL配置.html.vue"]]);export{h as default};
