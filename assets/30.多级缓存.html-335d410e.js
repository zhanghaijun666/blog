import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as i,c as u,e as d,a as n,d as a,w as t,b as s,f as o}from"./app-efa5e96e.js";const r={},k={class:"table-of-contents"},m=o(`<h2 id="在系统架构中应该使用那些缓存" tabindex="-1"><a class="header-anchor" href="#在系统架构中应该使用那些缓存" aria-hidden="true">#</a> 在系统架构中应该使用那些缓存</h2><ol><li>浏览器缓存</li><li>CDN 缓存（静态资源：js,css,视频，文件）</li><li>接入层 nginx/openresty 缓存</li><li>堆内存缓存（jvm 进程级别的缓存）</li><li>分布式缓存（redis,memcached）</li><li>数据库缓存（压力非常小）</li></ol><h2 id="本地缓存" tabindex="-1"><a class="header-anchor" href="#本地缓存" aria-hidden="true">#</a> 本地缓存</h2><ul><li>你愿意消耗一些内存空间来提升速度。</li><li>预料到某些键会被查询一次以上。</li><li>缓存中存放的数据总量不会超出内存容量。</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GuavaCacheConfig</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Cache</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> commonCache <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        commonCache <span class="token operator">=</span> <span class="token class-name">CacheBuilder</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">initialCapacity</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">maximunSize</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
            <span class="token comment">// 设置缓存写入后的过期时间</span>
            <span class="token punctuation">.</span><span class="token function">expireAfterWrite</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">,</span><span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Cache</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> <span class="token function">getCommonCache</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> commonCache<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="redis-缓存" tabindex="-1"><a class="header-anchor" href="#redis-缓存" aria-hidden="true">#</a> Redis 缓存</h2><h2 id="openresty-内存字典缓存" tabindex="-1"><a class="header-anchor" href="#openresty-内存字典缓存" aria-hidden="true">#</a> Openresty 内存字典缓存</h2>`,7),v=n("br",null,null,-1),b={href:"https://www.nginx.com/resources/wiki/modules/lua/#directives",target:"_blank",rel:"noopener noreferrer"},h=o(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装openresty:</span>
<span class="token function">wget</span> https://openresty.org/download/openresty-1.19.3.1.tar.gz
<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span>
./configure
<span class="token comment"># 默认被安装到/usr/local/openresty</span>
<span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token function">install</span>

<span class="token comment"># content_by_lua 接入lua脚本</span>
location /lua1 <span class="token punctuation">{</span>
    default_type text/html<span class="token punctuation">;</span>
    content_by_lua <span class="token string">&#39;ngx.say(&quot;hello lua!!&quot;)&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment"># content_by_lua_file 通过文件的方式引入lua脚本</span>
location /lua2 <span class="token punctuation">{</span>
    default_type text/html<span class="token punctuation">;</span>
    content_by_lua_file lua/test.lua<span class="token punctuation">;</span> <span class="token comment">#  test.java ,test.py</span>
<span class="token punctuation">}</span>
<span class="token comment"># test.lua</span>
<span class="token builtin class-name">local</span> args <span class="token operator">=</span> ngx.req.get_uri_args<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 获取参数对象</span>
ngx.say<span class="token punctuation">(</span><span class="token string">&quot;hello openresty! lua is so easy!===&quot;</span><span class="token punctuation">..</span>args.id<span class="token punctuation">)</span>  <span class="token comment"># 获取参数值，组装值：..</span>
<span class="token comment"># 转发请求</span>
location /lua3 <span class="token punctuation">{</span>
    content_by_lua_file lua/details.lua<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment"># details.lua</span>
ngx.exec<span class="token punctuation">(</span><span class="token string">&#39;/seckill/goods/detail/1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment"># 转发请求</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>Openresty 内存字典缓存</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在openresty服务器开辟一块128m空间存储缓存数据</span>
lua_shared_dict ngx_cache 128m<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-lua line-numbers-mode" data-ext="lua"><pre class="language-lua"><code><span class="token comment">-- 基于内存字典实现缓存</span>
<span class="token comment">-- 添加缓存实现</span>
<span class="token keyword">function</span> <span class="token function">set_to_cache</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span>value<span class="token punctuation">,</span>expritime<span class="token punctuation">)</span>
    <span class="token comment">-- 判断时间是否存在</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> expritime <span class="token keyword">then</span>
        expritime <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">end</span>
    <span class="token comment">-- 获取本地内存字典对象</span>
    <span class="token keyword">local</span> ngx_cache <span class="token operator">=</span> ngx<span class="token punctuation">.</span>shared<span class="token punctuation">.</span>ngx_cache

    <span class="token comment">-- 向本地内存字典添加缓存数据</span>
    <span class="token keyword">local</span> succ<span class="token punctuation">,</span>err<span class="token punctuation">,</span>forcibel <span class="token operator">=</span> ngx_cache<span class="token punctuation">:</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span>vlaue<span class="token punctuation">,</span>expritime<span class="token punctuation">)</span>
    <span class="token keyword">return</span> succ
<span class="token keyword">end</span>
<span class="token comment">-- 获取缓存实现</span>
<span class="token keyword">function</span> <span class="token function">get_from_cache</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token comment">-- 获取本地内存字典对象</span>
    <span class="token keyword">local</span> ngx_cache <span class="token operator">=</span> ngx<span class="token punctuation">.</span>shared<span class="token punctuation">.</span>ngx_cache
    <span class="token comment">-- 从本地内存字典中获取数据</span>
    <span class="token keyword">local</span> value <span class="token operator">=</span> ngx_cache<span class="token punctuation">:</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token keyword">return</span> value
<span class="token keyword">end</span>
<span class="token comment">-- 利用lua脚本实现一些简单业务</span>
<span class="token comment">-- 获取请求参数对象</span>
<span class="token keyword">local</span> params <span class="token operator">=</span> ngx<span class="token punctuation">.</span>req<span class="token punctuation">.</span><span class="token function">get_uri_args</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">-- 获取参数</span>
<span class="token keyword">local</span> id <span class="token operator">=</span> params<span class="token punctuation">.</span>id
<span class="token comment">-- 先从内存字典获取缓存数据</span>
<span class="token keyword">local</span> goods <span class="token operator">=</span> <span class="token function">get_from_cache</span><span class="token punctuation">(</span><span class="token string">&quot;seckill_goods_&quot;</span><span class="token operator">..</span>id<span class="token punctuation">)</span>
<span class="token comment">-- 如果内存字典中没有缓存数据</span>
<span class="token keyword">if</span> goods <span class="token operator">==</span> <span class="token keyword">nil</span> <span class="token keyword">then</span>
    <span class="token comment">-- 从后端服务（缓存，数据库）查询数据，完毕在放入内存字典缓存即可</span>
    <span class="token keyword">local</span>  res <span class="token operator">=</span> ngx<span class="token punctuation">.</span>location<span class="token punctuation">.</span><span class="token function">capture</span><span class="token punctuation">(</span><span class="token string">&quot;/seckill/goods/detail/&quot;</span><span class="token operator">..</span>id<span class="token punctuation">)</span>
    <span class="token comment">-- 获取查询结果</span>
    goods <span class="token operator">=</span> res<span class="token punctuation">.</span>body
    <span class="token comment">-- 向本地内存字典添加缓存数据</span>
    <span class="token function">set_to_cache</span><span class="token punctuation">(</span><span class="token string">&quot;seckill_goods_&quot;</span><span class="token operator">..</span>id<span class="token punctuation">,</span>goods<span class="token punctuation">,</span><span class="token number">60</span><span class="token punctuation">)</span>
<span class="token keyword">end</span>
<span class="token comment">-- 返回结果</span>
ngx<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span>goods<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="openresty-lua-redis" tabindex="-1"><a class="header-anchor" href="#openresty-lua-redis" aria-hidden="true">#</a> Openresty Lua+redis</h2><div class="language-lua line-numbers-mode" data-ext="lua"><pre class="language-lua"><code><span class="token comment">-- 引入redis库</span>
<span class="token keyword">local</span> redis <span class="token operator">=</span> require <span class="token string">&quot;resty.redis&quot;</span>
<span class="token comment">-- 调用方法，获取redis对象</span>
<span class="token keyword">local</span> red <span class="token operator">=</span> redis<span class="token punctuation">:</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function _(g,y){const e=l("router-link"),p=l("ExternalLinkIcon");return i(),u("div",null,[d(" more "),n("nav",k,[n("ul",null,[n("li",null,[a(e,{to:"#在系统架构中应该使用那些缓存"},{default:t(()=>[s("在系统架构中应该使用那些缓存")]),_:1})]),n("li",null,[a(e,{to:"#本地缓存"},{default:t(()=>[s("本地缓存")]),_:1})]),n("li",null,[a(e,{to:"#redis-缓存"},{default:t(()=>[s("Redis 缓存")]),_:1})]),n("li",null,[a(e,{to:"#openresty-内存字典缓存"},{default:t(()=>[s("Openresty 内存字典缓存")]),_:1})]),n("li",null,[a(e,{to:"#openresty-lua-redis"},{default:t(()=>[s("Openresty Lua+redis")]),_:1})])])]),m,n("ol",null,[n("li",null,[s("openresty 接入 lua 脚本"),v,s(" lua 接入指令："),n("a",b,[s("https://www.nginx.com/resources/wiki/modules/lua/#directives"),a(p)])])]),h])}const x=c(r,[["render",_],["__file","30.多级缓存.html.vue"]]);export{x as default};
