import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as p,c as e,a as n,d as o,w as c,f as i,b as l}from"./app-efa5e96e.js";const u={},k={class:"table-of-contents"},d=i(`<h2 id="脚本" tabindex="-1"><a class="header-anchor" href="#脚本" aria-hidden="true">#</a> 脚本</h2><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> streamlit <span class="token keyword">as</span> st
<span class="token keyword">import</span> pandas <span class="token keyword">as</span> pd

<span class="token comment"># 创建员工类</span>
<span class="token keyword">class</span> <span class="token class-name">Employee</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> position<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>name <span class="token operator">=</span> name
        self<span class="token punctuation">.</span>age <span class="token operator">=</span> age
        self<span class="token punctuation">.</span>position <span class="token operator">=</span> position

<span class="token comment"># 创建员工列表</span>
employee_list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token comment"># 添加员工函数</span>
<span class="token keyword">def</span> <span class="token function">add_employee</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> position<span class="token punctuation">)</span><span class="token punctuation">:</span>
    employee <span class="token operator">=</span> Employee<span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> position<span class="token punctuation">)</span>
    employee_list<span class="token punctuation">.</span>append<span class="token punctuation">(</span>employee<span class="token punctuation">)</span>

<span class="token comment"># 显示员工列表函数</span>
<span class="token keyword">def</span> <span class="token function">show_employee_list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>employee_list<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
        st<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&#39;员工列表为空！&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        df <span class="token operator">=</span> pd<span class="token punctuation">.</span>DataFrame<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">[</span>e<span class="token punctuation">.</span>name<span class="token punctuation">,</span> e<span class="token punctuation">.</span>age<span class="token punctuation">,</span> e<span class="token punctuation">.</span>position<span class="token punctuation">]</span> <span class="token keyword">for</span> e <span class="token keyword">in</span> employee_list<span class="token punctuation">]</span><span class="token punctuation">,</span> columns<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&#39;姓名&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;年龄&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;职位&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        st<span class="token punctuation">.</span>dataframe<span class="token punctuation">(</span>df<span class="token punctuation">)</span>

<span class="token comment"># 添加员工界面</span>
<span class="token keyword">def</span> <span class="token function">add_employee_page</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    st<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&#39;添加新员工&#39;</span><span class="token punctuation">)</span>
    name <span class="token operator">=</span> st<span class="token punctuation">.</span>text_input<span class="token punctuation">(</span><span class="token string">&#39;姓名&#39;</span><span class="token punctuation">)</span>
    age <span class="token operator">=</span> st<span class="token punctuation">.</span>number_input<span class="token punctuation">(</span><span class="token string">&#39;年龄&#39;</span><span class="token punctuation">,</span> min_value<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> max_value<span class="token operator">=</span><span class="token number">100</span><span class="token punctuation">)</span>
    position <span class="token operator">=</span> st<span class="token punctuation">.</span>text_input<span class="token punctuation">(</span><span class="token string">&#39;职位&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> st<span class="token punctuation">.</span>button<span class="token punctuation">(</span><span class="token string">&#39;添加&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        add_employee<span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> position<span class="token punctuation">)</span>
        st<span class="token punctuation">.</span>success<span class="token punctuation">(</span><span class="token string">&#39;添加成功！&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 显示员工列表界面</span>
<span class="token keyword">def</span> <span class="token function">show_employee_list_page</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    st<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&#39;员工列表&#39;</span><span class="token punctuation">)</span>
    show_employee_list<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 主程序</span>
<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    st<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token string">&#39;人事系统&#39;</span><span class="token punctuation">)</span>
    menu <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;添加员工&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;员工列表&#39;</span><span class="token punctuation">]</span>
    choice <span class="token operator">=</span> st<span class="token punctuation">.</span>sidebar<span class="token punctuation">.</span>selectbox<span class="token punctuation">(</span><span class="token string">&#39;选择菜单&#39;</span><span class="token punctuation">,</span> menu<span class="token punctuation">)</span>
    <span class="token keyword">if</span> choice <span class="token operator">==</span> <span class="token string">&#39;添加员工&#39;</span><span class="token punctuation">:</span>
        add_employee_page<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">elif</span> choice <span class="token operator">==</span> <span class="token string">&#39;员工列表&#39;</span><span class="token punctuation">:</span>
        show_employee_list_page<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function r(m,v){const s=t("router-link");return p(),e("div",null,[n("nav",k,[n("ul",null,[n("li",null,[o(s,{to:"#脚本"},{default:c(()=>[l("脚本")]),_:1})])])]),d])}const y=a(u,[["render",r],["__file","31.简单的人事系统.html.vue"]]);export{y as default};
