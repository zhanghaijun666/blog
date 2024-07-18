import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as i,c as l,e as c,a as n,d as a,w as e,f as r,b as o}from"./app-efa5e96e.js";const u={},v={class:"table-of-contents"},d=r(`<h2 id="python-爬虫百度图片" tabindex="-1"><a class="header-anchor" href="#python-爬虫百度图片" aria-hidden="true">#</a> python 爬虫百度图片</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># -*- coding: utf-8 -*-</span>

<span class="token function">import</span> re
<span class="token function">import</span> requests
from urllib <span class="token function">import</span> error
from bs4 <span class="token function">import</span> BeautifulSoup
<span class="token function">import</span> os

num <span class="token operator">=</span> <span class="token number">0</span>
numPicture <span class="token operator">=</span> <span class="token number">0</span>
<span class="token function">file</span> <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
List <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

def Find<span class="token punctuation">(</span>url, A<span class="token punctuation">)</span>:
    global List
    print<span class="token punctuation">(</span><span class="token string">&#39;正在检测图片总数，请稍等.....&#39;</span><span class="token punctuation">)</span>
    t <span class="token operator">=</span> <span class="token number">0</span>
    i <span class="token operator">=</span> <span class="token number">1</span>
    s <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">while</span> t <span class="token operator">&lt;</span> <span class="token number">1000</span>:
        Url <span class="token operator">=</span> url + str<span class="token punctuation">(</span>t<span class="token punctuation">)</span>
        try:
            <span class="token comment"># 这里搞了下</span>
            Result <span class="token operator">=</span> A.get<span class="token punctuation">(</span>Url, <span class="token assign-left variable">timeout</span><span class="token operator">=</span><span class="token number">7</span>, <span class="token assign-left variable">allow_redirects</span><span class="token operator">=</span>False<span class="token punctuation">)</span>
        except BaseException:
            t <span class="token operator">=</span> t + <span class="token number">60</span>
            <span class="token builtin class-name">continue</span>
        else:
            result <span class="token operator">=</span> Result.text
            pic_url <span class="token operator">=</span> re.findall<span class="token punctuation">(</span><span class="token string">&#39;&quot;objURL&quot;:&quot;(.*?)&quot;,&#39;</span>, result, re.S<span class="token punctuation">)</span>  <span class="token comment"># 先利用正则表达式找到图片url</span>
            s <span class="token operator">+=</span> len<span class="token punctuation">(</span>pic_url<span class="token punctuation">)</span>
            <span class="token keyword">if</span> len<span class="token punctuation">(</span>pic_url<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span>:
                <span class="token builtin class-name">break</span>
            else:
                List.append<span class="token punctuation">(</span>pic_url<span class="token punctuation">)</span>
                t <span class="token operator">=</span> t + <span class="token number">60</span>
    <span class="token builtin class-name">return</span> s

def recommend<span class="token punctuation">(</span>url<span class="token punctuation">)</span>:
    Re <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    try:
        html <span class="token operator">=</span> requests.get<span class="token punctuation">(</span>url, <span class="token assign-left variable">allow_redirects</span><span class="token operator">=</span>False<span class="token punctuation">)</span>
    except error.HTTPError as e:
        <span class="token builtin class-name">return</span>
    else:
        html.encoding <span class="token operator">=</span> <span class="token string">&#39;utf-8&#39;</span>
        bsObj <span class="token operator">=</span> BeautifulSoup<span class="token punctuation">(</span>html.text, <span class="token string">&#39;html.parser&#39;</span><span class="token punctuation">)</span>
        div <span class="token operator">=</span> bsObj.find<span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span>, <span class="token assign-left variable">id</span><span class="token operator">=</span><span class="token string">&#39;topRS&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> div is not None:
            listA <span class="token operator">=</span> div.findAll<span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span>
            <span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> listA:
                <span class="token keyword">if</span> i is not None:
                    Re.append<span class="token punctuation">(</span>i.get_text<span class="token punctuation">(</span><span class="token punctuation">))</span>
        <span class="token builtin class-name">return</span> Re

def dowmloadPicture<span class="token punctuation">(</span>html, keyword<span class="token punctuation">)</span>:
    global num
    <span class="token comment"># t =0</span>
    pic_url <span class="token operator">=</span> re.findall<span class="token punctuation">(</span><span class="token string">&#39;&quot;objURL&quot;:&quot;(.*?)&quot;,&#39;</span>, html, re.S<span class="token punctuation">)</span>  <span class="token comment"># 先利用正则表达式找到图片url</span>
    print<span class="token punctuation">(</span><span class="token string">&#39;找到关键词:&#39;</span> + keyword + <span class="token string">&#39;的图片，即将开始下载图片...&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token for-or-select variable">each</span> <span class="token keyword">in</span> pic_url:
        print<span class="token punctuation">(</span><span class="token string">&#39;正在下载第&#39;</span> + str<span class="token punctuation">(</span>num + <span class="token number">1</span><span class="token punctuation">)</span> + <span class="token string">&#39;张图片，图片地址:&#39;</span> + str<span class="token punctuation">(</span>each<span class="token punctuation">))</span>
        try:
            <span class="token keyword">if</span> each is not None:
                pic <span class="token operator">=</span> requests.get<span class="token punctuation">(</span>each, <span class="token assign-left variable">timeout</span><span class="token operator">=</span><span class="token number">7</span><span class="token punctuation">)</span>
            else:
                <span class="token builtin class-name">continue</span>
        except BaseException:
            print<span class="token punctuation">(</span><span class="token string">&#39;错误，当前图片无法下载&#39;</span><span class="token punctuation">)</span>
            <span class="token builtin class-name">continue</span>
        else:
            string <span class="token operator">=</span> <span class="token function">file</span> + r<span class="token string">&#39;\\\\&#39;</span> + keyword + <span class="token string">&#39;_&#39;</span> + str<span class="token punctuation">(</span>num<span class="token punctuation">)</span> + <span class="token string">&#39;.jpg&#39;</span>
            fp <span class="token operator">=</span> open<span class="token punctuation">(</span>string, <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span>
            fp.write<span class="token punctuation">(</span>pic.content<span class="token punctuation">)</span>
            fp.close<span class="token punctuation">(</span><span class="token punctuation">)</span>
            num <span class="token operator">+=</span> <span class="token number">1</span>
        <span class="token keyword">if</span> num <span class="token operator">&gt;=</span> numPicture:
            <span class="token builtin class-name">return</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token builtin class-name">:</span>  <span class="token comment"># 主函数入口</span>

    headers <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token string">&#39;Accept-Language&#39;</span><span class="token builtin class-name">:</span> <span class="token string">&#39;zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2&#39;</span>,
        <span class="token string">&#39;Connection&#39;</span><span class="token builtin class-name">:</span> <span class="token string">&#39;keep-alive&#39;</span>,
        <span class="token string">&#39;User-Agent&#39;</span><span class="token builtin class-name">:</span> <span class="token string">&#39;Mozilla/5.0 (X11; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0&#39;</span>,
        <span class="token string">&#39;Upgrade-Insecure-Requests&#39;</span><span class="token builtin class-name">:</span> <span class="token string">&#39;1&#39;</span>
    <span class="token punctuation">}</span>
    A <span class="token operator">=</span> requests.Session<span class="token punctuation">(</span><span class="token punctuation">)</span>
    A.headers <span class="token operator">=</span> headers

    word <span class="token operator">=</span> input<span class="token punctuation">(</span><span class="token string">&quot;请输入搜索关键词(可以是人名，地名等): &quot;</span><span class="token punctuation">)</span>
    <span class="token comment"># add = &#39;http://image.baidu.com/search/flip?tn=baiduimage&amp;ie=utf-8&amp;word=%E5%BC%A0%E5%A4%A9%E7%88%B1&amp;pn=120&#39;</span>
    url <span class="token operator">=</span> <span class="token string">&#39;https://image.baidu.com/search/flip?tn=baiduimage&amp;ie=utf-8&amp;word=&#39;</span> + word + <span class="token string">&#39;&amp;pn=&#39;</span>

    tot <span class="token operator">=</span> Find<span class="token punctuation">(</span>url, A<span class="token punctuation">)</span>
    Recommend <span class="token operator">=</span> recommend<span class="token punctuation">(</span>url<span class="token punctuation">)</span>  <span class="token comment"># 记录相关推荐</span>
    print<span class="token punctuation">(</span><span class="token string">&#39;经过检测%s类图片共有%d张&#39;</span> % <span class="token punctuation">(</span>word, tot<span class="token punctuation">))</span>
    numPicture <span class="token operator">=</span> int<span class="token punctuation">(</span>input<span class="token punctuation">(</span><span class="token string">&#39;请输入想要下载的图片数量 &#39;</span><span class="token punctuation">))</span>
    <span class="token function">file</span> <span class="token operator">=</span> input<span class="token punctuation">(</span><span class="token string">&#39;请建立一个存储图片的文件夹，输入文件夹名称即可&#39;</span><span class="token punctuation">)</span>
    y <span class="token operator">=</span> os.path.exists<span class="token punctuation">(</span>file<span class="token punctuation">)</span>
    <span class="token keyword">if</span> y <span class="token operator">==</span> <span class="token number">1</span>:
        print<span class="token punctuation">(</span><span class="token string">&#39;该文件已存在，请重新输入&#39;</span><span class="token punctuation">)</span>
        <span class="token function">file</span> <span class="token operator">=</span> input<span class="token punctuation">(</span><span class="token string">&#39;请建立一个存储图片的文件夹，)输入文件夹名称即可&#39;</span><span class="token punctuation">)</span>
        os.mkdir<span class="token punctuation">(</span>file<span class="token punctuation">)</span>
    else:
        os.mkdir<span class="token punctuation">(</span>file<span class="token punctuation">)</span>
    t <span class="token operator">=</span> <span class="token number">0</span>
    tmp <span class="token operator">=</span> url
    <span class="token keyword">while</span> t <span class="token operator">&lt;</span> numPicture:
        try:
            url <span class="token operator">=</span> tmp + str<span class="token punctuation">(</span>t<span class="token punctuation">)</span>
            <span class="token comment"># 这里搞了下</span>
            result <span class="token operator">=</span> A.get<span class="token punctuation">(</span>url, <span class="token assign-left variable">timeout</span><span class="token operator">=</span><span class="token number">10</span>, <span class="token assign-left variable">allow_redirects</span><span class="token operator">=</span>False<span class="token punctuation">)</span>
        except error.HTTPError as e:
            print<span class="token punctuation">(</span><span class="token string">&#39;网络错误，请调整网络后重试&#39;</span><span class="token punctuation">)</span>
            t <span class="token operator">=</span> t + <span class="token number">60</span>
        else:
            dowmloadPicture<span class="token punctuation">(</span>result.text, word<span class="token punctuation">)</span>
            t <span class="token operator">=</span> t + <span class="token number">60</span>

    print<span class="token punctuation">(</span><span class="token string">&#39;当前搜索结束，感谢使用&#39;</span><span class="token punctuation">)</span>
    print<span class="token punctuation">(</span><span class="token string">&#39;猜你喜欢&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token for-or-select variable">re</span> <span class="token keyword">in</span> Recommend:
        print<span class="token punctuation">(</span>re, <span class="token assign-left variable">end</span><span class="token operator">=</span><span class="token string">&#39;  &#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="python-打印心型" tabindex="-1"><a class="header-anchor" href="#python-打印心型" aria-hidden="true">#</a> python 打印心型</h2><p>执行输出</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;\\n&#39;</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;&#39;</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token string">&#39;Love&#39;</span><span class="token punctuation">[</span><span class="token punctuation">(</span>x<span class="token operator">-</span>y<span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token builtin">len</span><span class="token punctuation">(</span><span class="token string">&#39;Love&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>x<span class="token operator">*</span><span class="token number">0.05</span><span class="token punctuation">)</span><span class="token operator">**</span><span class="token number">2</span><span class="token operator">+</span><span class="token punctuation">(</span>y<span class="token operator">*</span><span class="token number">0.1</span><span class="token punctuation">)</span><span class="token operator">**</span><span class="token number">2</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">**</span><span class="token number">3</span><span class="token operator">-</span><span class="token punctuation">(</span>x<span class="token operator">*</span><span class="token number">0.05</span><span class="token punctuation">)</span><span class="token operator">**</span><span class="token number">2</span><span class="token operator">*</span><span class="token punctuation">(</span>y<span class="token operator">*</span><span class="token number">0.1</span><span class="token punctuation">)</span><span class="token operator">**</span><span class="token number">3</span> <span class="token operator">&lt;=</span> <span class="token number">0</span> <span class="token keyword">else</span> <span class="token string">&#39; &#39;</span><span class="token punctuation">)</span> <span class="token keyword">for</span> x <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">for</span> y <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">30</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>打印结果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>                veLoveLov           veLoveLov
            eLoveLoveLoveLove   eLoveLoveLoveLove
          veLoveLoveLoveLoveLoveLoveLoveLoveLoveLov
         veLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveL
        veLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLov
        eLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLove
        LoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveL
        oveLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLo
        veLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLov
        eLoveLoveLoveLoveLoveLoveLoveLoveLoveLoveLove
         oveLoveLoveLoveLoveLoveLoveLoveLoveLoveLove
          eLoveLoveLoveLoveLoveLoveLoveLoveLoveLove
          LoveLoveLoveLoveLoveLoveLoveLoveLoveLoveL
            eLoveLoveLoveLoveLoveLoveLoveLoveLove
             oveLoveLoveLoveLoveLoveLoveLoveLove
              eLoveLoveLoveLoveLoveLoveLoveLove
                veLoveLoveLoveLoveLoveLoveLov
                  oveLoveLoveLoveLoveLoveLo
                    LoveLoveLoveLoveLoveL
                       LoveLoveLoveLov
                          LoveLoveL
                             Lov
                              v
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7);function k(m,b){const s=t("router-link");return i(),l("div",null,[c(" more "),n("nav",v,[n("ul",null,[n("li",null,[a(s,{to:"#python-爬虫百度图片"},{default:e(()=>[o("python 爬虫百度图片")]),_:1})]),n("li",null,[a(s,{to:"#python-打印心型"},{default:e(()=>[o("python 打印心型")]),_:1})])])]),d])}const f=p(u,[["render",k],["__file","23.python爬百度图片.html.vue"]]);export{f as default};
