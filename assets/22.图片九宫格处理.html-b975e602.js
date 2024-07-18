import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as i,c,e as l,a as n,d as t,w as u,b as s,f as r}from"./app-efa5e96e.js";const k={},d={class:"table-of-contents"},m=n("h2",{id:"图片九宫格处理",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#图片九宫格处理","aria-hidden":"true"},"#"),s(" 图片九宫格处理")],-1),v={href:"https://github.com/yangxuan0928/cut_image",target:"_blank",rel:"noopener noreferrer"},_=r(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># -*- coding: utf-8 -*-</span>
<span class="token triple-quoted-string string">&#39;&#39;&#39;
将一张图片填充为正方形后切为9张图
&#39;&#39;&#39;</span>
<span class="token keyword">from</span> PIL <span class="token keyword">import</span> Image
<span class="token keyword">import</span> sys
<span class="token comment"># 将图片填充为正方形</span>
<span class="token keyword">def</span> <span class="token function">fill_image</span><span class="token punctuation">(</span>image<span class="token punctuation">)</span><span class="token punctuation">:</span>
    width<span class="token punctuation">,</span> height <span class="token operator">=</span> image<span class="token punctuation">.</span>size
    <span class="token comment"># 选取长和宽中较大值作为新图片的</span>
    new_image_length <span class="token operator">=</span> width <span class="token keyword">if</span> width <span class="token operator">&gt;</span> height <span class="token keyword">else</span> height
    <span class="token comment"># 生成新图片[白底]</span>
    new_image <span class="token operator">=</span> Image<span class="token punctuation">.</span>new<span class="token punctuation">(</span>image<span class="token punctuation">.</span>mode<span class="token punctuation">,</span> <span class="token punctuation">(</span>new_image_length<span class="token punctuation">,</span> new_image_length<span class="token punctuation">)</span><span class="token punctuation">,</span> color<span class="token operator">=</span><span class="token string">&#39;white&#39;</span><span class="token punctuation">)</span>
    <span class="token comment"># 将之前的图粘贴在新图上，居中</span>
    <span class="token keyword">if</span> width <span class="token operator">&gt;</span> height<span class="token punctuation">:</span><span class="token comment">#原图宽大于高，则填充图片的竖直维度</span>
        <span class="token comment"># (x,y)二元组表示粘贴上图相对下图的起始位置</span>
        new_image<span class="token punctuation">.</span>paste<span class="token punctuation">(</span>image<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token punctuation">(</span>new_image_length <span class="token operator">-</span> height<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        new_image<span class="token punctuation">.</span>paste<span class="token punctuation">(</span>image<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">(</span><span class="token punctuation">(</span>new_image_length <span class="token operator">-</span> width<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> new_image
<span class="token comment"># 切图</span>
<span class="token keyword">def</span> <span class="token function">cut_image</span><span class="token punctuation">(</span>image<span class="token punctuation">)</span><span class="token punctuation">:</span>
    width<span class="token punctuation">,</span> height <span class="token operator">=</span> image<span class="token punctuation">.</span>size
    item_width <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>width <span class="token operator">/</span> <span class="token number">3</span><span class="token punctuation">)</span>
    box_list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token comment"># (left, upper, right, lower)</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">:</span><span class="token comment">#两重循环，生成9张图片基于原图的位置</span>
        <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token comment"># print((i*item_width,j*item_width,(i+1)*item_width,(j+1)*item_width))</span>
            box <span class="token operator">=</span> <span class="token punctuation">(</span>j<span class="token operator">*</span>item_width<span class="token punctuation">,</span>i<span class="token operator">*</span>item_width<span class="token punctuation">,</span><span class="token punctuation">(</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">*</span>item_width<span class="token punctuation">,</span><span class="token punctuation">(</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">*</span>item_width<span class="token punctuation">)</span>
            box_list<span class="token punctuation">.</span>append<span class="token punctuation">(</span>box<span class="token punctuation">)</span>

    image_list <span class="token operator">=</span> <span class="token punctuation">[</span>image<span class="token punctuation">.</span>crop<span class="token punctuation">(</span>box<span class="token punctuation">)</span> <span class="token keyword">for</span> box <span class="token keyword">in</span> box_list<span class="token punctuation">]</span>
    <span class="token keyword">return</span> image_list
<span class="token comment"># 保存</span>
<span class="token keyword">def</span> <span class="token function">save_images</span><span class="token punctuation">(</span>image_list<span class="token punctuation">)</span><span class="token punctuation">:</span>
    index <span class="token operator">=</span> <span class="token number">1</span>
    <span class="token keyword">for</span> image <span class="token keyword">in</span> image_list<span class="token punctuation">:</span>
        image<span class="token punctuation">.</span>save<span class="token punctuation">(</span><span class="token string">&#39;./result/python&#39;</span><span class="token operator">+</span><span class="token builtin">str</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&#39;.png&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;PNG&#39;</span><span class="token punctuation">)</span>
        index <span class="token operator">+=</span> <span class="token number">1</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    file_path <span class="token operator">=</span> <span class="token string">&quot;python.jpeg&quot;</span>
    image <span class="token operator">=</span> Image<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span>file_path<span class="token punctuation">)</span>
    <span class="token comment">#image.show()</span>
    image <span class="token operator">=</span> fill_image<span class="token punctuation">(</span>image<span class="token punctuation">)</span>
    image_list <span class="token operator">=</span> cut_image<span class="token punctuation">(</span>image<span class="token punctuation">)</span>
    save_images<span class="token punctuation">(</span>image_list<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function b(g,h){const e=a("router-link"),p=a("ExternalLinkIcon");return i(),c("div",null,[l(" more "),n("nav",d,[n("ul",null,[n("li",null,[t(e,{to:"#图片九宫格处理"},{default:u(()=>[s("图片九宫格处理")]),_:1})])])]),m,n("blockquote",null,[n("p",null,[s("github 地址："),n("a",v,[s("https://github.com/yangxuan0928/cut_image"),t(p)])])]),_])}const y=o(k,[["render",b],["__file","22.图片九宫格处理.html.vue"]]);export{y as default};
