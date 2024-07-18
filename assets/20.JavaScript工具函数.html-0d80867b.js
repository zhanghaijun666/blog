import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as i,f as n}from"./app-efa5e96e.js";const r={},d=n(`<h2 id="_1、生成随机颜色" tabindex="-1"><a class="header-anchor" href="#_1、生成随机颜色" aria-hidden="true">#</a> 1、生成随机颜色</h2><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const generateRandomHexColor = () =&gt; \`#\${Math.floor(Math.random() * 0xffffff).toString(16)}\`
console.log(generateRandomHexColor())
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、数组重排序" tabindex="-1"><a class="header-anchor" href="#_2、数组重排序" aria-hidden="true">#</a> 2、数组重排序</h2><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const shuffle = (arr) =&gt; arr.sort(() =&gt; Math.random() - 0.5)
console.log(shuffle([1, 2, 3, 4, 5]))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、复制到剪切板" tabindex="-1"><a class="header-anchor" href="#_3、复制到剪切板" aria-hidden="true">#</a> 3、复制到剪切板</h2><blockquote><p>复制到剪切板是一项非常实用且能够提高用户便利性的功能。</p></blockquote><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const copyToClipboard = (text) =&gt; navigator.clipboard &amp;&amp; navigator.clipboard.writeText &amp;&amp; navigator.clipboard.writeText(text)

copyToClipboard(&quot;Hello World!&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4、检测暗色主题" tabindex="-1"><a class="header-anchor" href="#_4、检测暗色主题" aria-hidden="true">#</a> 4、检测暗色主题</h2><blockquote><p>暗色主题日益普及，很多用的都会在设备中启用案模式，我们将应用程序切换到暗色主题可以提高用户体验度。</p></blockquote><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const isDarkMode = () =&gt; window.matchMedia &amp;&amp; window.matchMedia(&quot;(prefers-color-scheme: dark)&quot;).matches;
console.log(isDarkMode())
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5、滚动到顶部" tabindex="-1"><a class="header-anchor" href="#_5、滚动到顶部" aria-hidden="true">#</a> 5、滚动到顶部</h2><blockquote><p>将元素滚动到顶部最简单的方法是使用scrollIntoView。设置block为start可以滚动到顶部；设置behavior为smooth可以开启平滑滚动。</p></blockquote><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const scrollToTop = (element) =&gt; element.scrollIntoView({ behavior: &quot;smooth&quot;, block: &quot;start&quot; });
scrollToTop(document.body)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6、滚动到底部" tabindex="-1"><a class="header-anchor" href="#_6、滚动到底部" aria-hidden="true">#</a> 6、滚动到底部</h2><blockquote><p>与滚动到顶部一样，滚动到底部只需要设置block为end即可。</p></blockquote><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const scrollToBottom = (element) =&gt;  element.scrollIntoView({ behavior: &quot;smooth&quot;, block: &quot;end&quot; });
scrollToBottom(document.body)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7、检测元素是否在屏幕中" tabindex="-1"><a class="header-anchor" href="#_7、检测元素是否在屏幕中" aria-hidden="true">#</a> 7、检测元素是否在屏幕中</h2><blockquote><p>检查元素是否在窗口中最好的方法是使用IntersectionObserver。</p></blockquote><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const callback = (entries) =&gt; {
  entries.forEach((entry) =&gt; {
    if (entry.isIntersecting) {
      console.log(\`\${entry.target.id} is visible\`);
    }
  });
};

const options = {
  threshold: 1.0,
};
const observer = new IntersectionObserver(callback, options);
const btn = document.getElementById(&quot;btn&quot;);
const bottomBtn = document.getElementById(&quot;bottom-btn&quot;);
observer.observe(btn);
observer.observe(bottomBtn);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8、检测设备" tabindex="-1"><a class="header-anchor" href="#_8、检测设备" aria-hidden="true">#</a> 8、检测设备</h2><blockquote><p>使用navigator.userAgent来检测网站运行在哪种平台设备上。</p></blockquote><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const detectDeviceType = () =&gt;  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? &quot;Mobile&quot; : &quot;Desktop&quot;;
console.log(detectDeviceType());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9、隐藏元素" tabindex="-1"><a class="header-anchor" href="#_9、隐藏元素" aria-hidden="true">#</a> 9、隐藏元素</h2><blockquote><p>我们可以将元素的style.visibility设置为hidden，隐藏元素的可见性，但元素的空间仍然会被占用。如果设置元素的style.display为none，会将元素从渲染流中删除。</p></blockquote><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const hideElement = (el, removeFromFlow = false) =&gt; {
  removeFromFlow ? (el.style.display = &#39;none&#39;) : (el.style.visibility = &#39;hidden&#39;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_10、从-url-中获取参数" tabindex="-1"><a class="header-anchor" href="#_10、从-url-中获取参数" aria-hidden="true">#</a> 10、从 URL 中获取参数</h2><blockquote><p>JavaScript 中有一个 URL 对象，通过它可以非常方便的获取 URL 中的参数。</p></blockquote><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const getParamByUrl = (key) =&gt; {
  const url = new URL(location.href)
  return url.searchParams.get(key)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_11、深拷贝对象" tabindex="-1"><a class="header-anchor" href="#_11、深拷贝对象" aria-hidden="true">#</a> 11、深拷贝对象</h2><blockquote><p>深拷贝对象非常简单，先将对象转换为字符串，再转换成对象即可。</p></blockquote><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const deepCopy = obj =&gt; JSON.parse(JSON.stringify(obj))
除了利用 JSON 的 API，还有更新的深拷贝对象的 structuredClone API，但并不是在所有的浏览器中都支持。
structuredClone(obj)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_12、等待函数" tabindex="-1"><a class="header-anchor" href="#_12、等待函数" aria-hidden="true">#</a> 12、等待函数</h2><blockquote><p>JavaScript 提供了setTimeout函数，但是它并不返回 Promise 对象，所以我们没办法使用 async 作用在这个函数上，但是我们可以封装等待函数。</p></blockquote><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>const wait = (ms) =&gt; new Promise((resolve)=&gt; setTimeout(resolve, ms))
const asyncFn = async () =&gt; {
  await wait(1000)
  console.log(&#39;等待异步函数执行结束&#39;)
}
asyncFn()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,34),s=[d];function t(l,o){return a(),i("div",null,s)}const u=e(r,[["render",t],["__file","20.JavaScript工具函数.html.vue"]]);export{u as default};
