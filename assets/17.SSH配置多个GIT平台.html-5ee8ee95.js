import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,f as n}from"./app-efa5e96e.js";const i={},l=n(`<h2 id="_1、git全局配置" tabindex="-1"><a class="header-anchor" href="#_1、git全局配置" aria-hidden="true">#</a> 1、Git全局配置</h2><p>如果之前设置过全局的<code>user.name</code>和<code>user.email</code>, 需要先删掉，删除命令如下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看全局配置</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--list</span>
<span class="token comment"># 删除全局配置的用户名</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--unset</span> user.name
<span class="token comment"># 删除全局配置的邮箱</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--unset</span> user.email
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、生成ssh密钥" tabindex="-1"><a class="header-anchor" href="#_2、生成ssh密钥" aria-hidden="true">#</a> 2、生成SSH密钥</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 配置github</span>
ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-C</span> <span class="token string">&quot;example@163.com&quot;</span> <span class="token parameter variable">-f</span> id_rsa_github <span class="token parameter variable">-C</span> <span class="token string">&quot;Github&quot;</span>
<span class="token comment"># 配置gitee </span>
ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-C</span> <span class="token string">&quot;example@163.com&quot;</span> <span class="token parameter variable">-f</span> id_rsa_gitee <span class="token parameter variable">-C</span> <span class="token string">&quot;gitee&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>-C &quot;example@163.com&quot;</code> 替换成你的邮箱账号，</li><li><code>-f id_rsa_github</code> 文件名，可以自定义，默认为 <code>id_rsa</code></li><li><code>-C &quot;Github&quot;</code> 为描述信息</li></ul><blockquote><p>生成期间会要求输入两次密码，不用输入，直接回车</p></blockquote><h2 id="_3、配置-config" tabindex="-1"><a class="header-anchor" href="#_3、配置-config" aria-hidden="true">#</a> 3、配置 config</h2><p>完成上面ssh公钥后，需要配置config文件。打开 <code>.ssh</code> 文件夹查看是否有 <code>config</code> 文件，如果没有直接右键创建一个。然后可以复制下面的内容去填写你的config配置</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code># gitee
Host gitee.com
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_gitee
# github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_github
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>根据你生成的内容，去修改对应的 <code>config</code> 信息</p></blockquote><h2 id="_4、验证" tabindex="-1"><a class="header-anchor" href="#_4、验证" aria-hidden="true">#</a> 4、验证</h2><p>然后输入以下命令，测试连接</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ssh</span> <span class="token parameter variable">-T</span> git@github.com
<span class="token function">ssh</span> <span class="token parameter variable">-T</span> git@gitee.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5、远程仓库代码" tabindex="-1"><a class="header-anchor" href="#_5、远程仓库代码" aria-hidden="true">#</a> 5、远程仓库代码</h2><p>在本地用ssh方式拉取远程仓库代码，<code>git clone 仓库ssh地址</code></p><p>注意：不要配置git全局的user.name和user.email，只需要在不同的仓库路径文件夹中设置本地的<code>user.name</code>和<code>user.email</code>，如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 切换到本地仓库路径文件夹下并设置 \`user.name\` 和 \`user.email\`</span>
<span class="token builtin class-name">cd</span> 本地仓库路径
<span class="token function">git</span> config user.name
<span class="token function">git</span> config user.email
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),c=[l];function t(r,d){return a(),s("div",null,c)}const u=e(i,[["render",t],["__file","17.SSH配置多个GIT平台.html.vue"]]);export{u as default};
