import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as a,c as r,a as e,b as t,d as n,e as c,w as u,f as d}from"./app-efa5e96e.js";const v={},q={href:"https://www.elastic.co/guide/cn/elasticsearch/guide/current/foreword_id.html",target:"_blank",rel:"noopener noreferrer"},m={class:"table-of-contents"},b=d(`<h2 id="服务状态" tabindex="-1"><a class="header-anchor" href="#服务状态" aria-hidden="true">#</a> ------ 服务状态 ------</h2><h2 id="查询状态" tabindex="-1"><a class="header-anchor" href="#查询状态" aria-hidden="true">#</a> 查询状态</h2><blockquote><p>GET /_cat/health</p></blockquote><h2 id="查看分词器分词结果" tabindex="-1"><a class="header-anchor" href="#查看分词器分词结果" aria-hidden="true">#</a> 查看分词器分词结果</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /_analyze
{
  &quot;analyzer&quot;: &quot;ik_max_word&quot;,
  &quot;text&quot;: &quot;我是一名学生&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="文档管理" tabindex="-1"><a class="header-anchor" href="#文档管理" aria-hidden="true">#</a> ------ 文档管理 ------</h2><h2 id="添加索引" tabindex="-1"><a class="header-anchor" href="#添加索引" aria-hidden="true">#</a> 添加索引</h2>`,7),h=e("p",null,[e("strong",null,[e("code",null,"settings")])],-1),_=e("p",null,[e("code",null,"分片数"),t("（number_of_shards）：早期版本默认是5片，ES7中默认是1片；")],-1),p=e("p",null,[e("code",null,"副本数"),t("（number_of_replicas）：默认是1，每个分片默认都有一个副本。")],-1),g=e("p",null,[e("strong",null,[e("code",null,"mappings")]),t("：可不指定，会自动创建")],-1),x={href:"http://192.168.68.129:9200/%7B%E7%B4%A2%E5%BC%95%E5%90%8D%E7%A7%B0%7D",target:"_blank",rel:"noopener noreferrer"},f=d(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PUT /my_index
{
  &quot;settings&quot;: {
    &quot;number_of_shards&quot;: 1, 
    &quot;number_of_replicas&quot;: 1
  },
  &quot;mappings&quot;: {
    &quot;properties&quot;: {
      &quot;id&quot;: {
        &quot;type&quot;: &quot;long&quot;
      },
      &quot;title&quot;: {
        &quot;type&quot;: &quot;text&quot;,
        &quot;analyzer&quot;: &quot;standard&quot;,
        &quot;store&quot;: &quot;true&quot;,
        &quot;index&quot;: true
      },
      &quot;mobile&quot;: {
        &quot;type&quot;: &quot;keyword&quot;,
        &quot;store&quot;: &quot;true&quot;,
        &quot;index&quot;: true
      },
      &quot;comment&quot;: {
        &quot;type&quot;: &quot;text&quot;,
        &quot;analyzer&quot;: &quot;standard&quot;,
        &quot;store&quot;: &quot;true&quot;,
        &quot;index&quot;: true
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="添加数据" tabindex="-1"><a class="header-anchor" href="#添加数据" aria-hidden="true">#</a> 添加数据</h2>`,2),k={href:"http://192.168.68.129:9200/%7B%E7%B4%A2%E5%BC%95%7D/_doc/%7B_id%7D",target:"_blank",rel:"noopener noreferrer"},E=d(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /blog/_doc/1
{
	&quot;id&quot;:1,
	&quot;title&quot;:&quot;文章标题&quot;,
	&quot;content&quot;:&quot;这是一篇文章&quot;,
	&quot;comment&quot;:&quot;备注信息&quot;,
	&quot;mobile&quot;:&quot;13344556677&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="批量添加数据" tabindex="-1"><a class="header-anchor" href="#批量添加数据" aria-hidden="true">#</a> 批量添加数据</h2>`,2),y={href:"http://192.168.68.129:9200/%7B%E7%B4%A2%E5%BC%95%7D/_bulk",target:"_blank",rel:"noopener noreferrer"},B=d(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /blog/_bulk
{&quot;index&quot;:{&quot;_id&quot;:1}}
{&quot;id&quot;:1, &quot;title&quot;:&quot;李宇春发新歌《软肋》，剖析自我成长的道路&quot;, &quot;content&quot;:&quot;李宇春发新歌《软肋》，剖析自我成长的道路&quot;, &quot;comment&quot;:&quot;娱乐&quot;, &quot;mobile&quot;:&quot;13900112239&quot;}
{&quot;index&quot;:{&quot;_id&quot;:2}}
{&quot;id&quot;:2, &quot;title&quot;:&quot;《奔跑吧9》4月23日开播，沙溢、蔡徐坤等回归&quot;, &quot;content&quot;:&quot;《奔跑吧9》4月23日开播，沙溢、蔡徐坤等回归&quot;, &quot;comment&quot;:&quot;娱乐&quot;, &quot;mobile&quot;:&quot;13900112233&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="根据-id取文档" tabindex="-1"><a class="header-anchor" href="#根据-id取文档" aria-hidden="true">#</a> 根据_id取文档</h2>`,2),T={href:"http://192.168.68.129:9200/%7B%E7%B4%A2%E5%BC%95%7D/_doc/%7B_id%7D",target:"_blank",rel:"noopener noreferrer"},w=e("h2",{id:"删除索引",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#删除索引","aria-hidden":"true"},"#"),t(" 删除索引")],-1),P={href:"http://192.168.68.129:9200/%7B%E7%B4%A2%E5%BC%95%E5%90%8D%E7%A7%B0%7D",target:"_blank",rel:"noopener noreferrer"},D=e("h2",{id:"数据查询",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#数据查询","aria-hidden":"true"},"#"),t(" ------ 数据查询 ------")],-1),S={href:"https://www.elastic.co/guide/cn/elasticsearch/guide/current/search-in-depth.html",target:"_blank",rel:"noopener noreferrer"},A=d(`<h2 id="精确查询-term" tabindex="-1"><a class="header-anchor" href="#精确查询-term" aria-hidden="true">#</a> 精确查询（term）</h2><blockquote><p>字段匹配，考虑字段的分词器，standard针对中文，一个字为一个词。</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /blog/_search
{
  &quot;query&quot;: {
    &quot;term&quot;: {
      &quot;title&quot;: &quot;java&quot;
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="组合查询-bool" tabindex="-1"><a class="header-anchor" href="#组合查询-bool" aria-hidden="true">#</a> 组合查询（bool）</h2><blockquote><p><code>must</code>：必须满足，相当于是AND</p><p><code>should</code>：应该满足，相当于OR</p><p><code>must_not</code>：必须不能满足，相当于NOT</p><p><code>filter</code>：过滤查询结果，不进行打分</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /blog/_search
{
  &quot;query&quot;: {
    &quot;bool&quot;: {
      &quot;must&quot;: [
        {&quot;term&quot;: {&quot;title&quot;: &quot;跑&quot;}},
        {&quot;terms&quot;: {&quot;content&quot;: [&quot;跑&quot;,&quot;春&quot;]}}
      ],
      &quot;must_not&quot;: [
        {&quot;term&quot;: {&quot;title&quot;: &quot;跑&quot;}},
        {&quot;term&quot;: {&quot;content&quot;: &quot;跑&quot;}}
      ],
      &quot;should&quot;: [
        {&quot;term&quot;: {&quot;title&quot;: &quot;跑&quot;}},
        {&quot;term&quot;: {&quot;content&quot;: &quot;跑&quot;}}
      ],
      &quot;filter&quot;: [
        {&quot;term&quot;: {&quot;title&quot;: &quot;跑&quot;}},
        {&quot;term&quot;: {&quot;content&quot;: &quot;跑&quot;}}
      ]
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="匹配查询-query-string" tabindex="-1"><a class="header-anchor" href="#匹配查询-query-string" aria-hidden="true">#</a> 匹配查询（query_string）</h2><blockquote><p>在查询之前，可以对查询条件进行分词处理，然后基于分词之后的结果再次查询。</p><p><code>query_string</code>和<code>match</code>效果一样。</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /blog/_search
{
  &quot;query&quot;: {
    &quot;query_string&quot;: {
      &quot;default_field&quot;: &quot;title&quot;,
      &quot;query&quot;: &quot;奔跑跑男&quot;
    }
  }
}
------------------------------------------
GET /blog/_search
{
  &quot;query&quot;: {
    &quot;match&quot;: {
        &quot;title&quot;: &quot;QUICK!&quot;
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="多字段查询-multi-match" tabindex="-1"><a class="header-anchor" href="#多字段查询-multi-match" aria-hidden="true">#</a> 多字段查询（multi_match）</h2><blockquote><p>指定在多个字段中查询</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /blog/_search
{
  &quot;query&quot;: {
    &quot;multi_match&quot;: {
      &quot;query&quot;: &quot;跑男&quot;,
      &quot;fields&quot;: [&quot;title&quot;,&quot;comment&quot;]
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="高亮显示-highlight" tabindex="-1"><a class="header-anchor" href="#高亮显示-highlight" aria-hidden="true">#</a> 高亮显示（highlight）</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /blog/_search
{
  &quot;query&quot;: {
    &quot;term&quot;: {
      &quot;title&quot;: {
        &quot;value&quot;: &quot;跑&quot;
      }
    }
  }, 
  &quot;highlight&quot;: {
    &quot;fields&quot;: {
      &quot;title&quot;: {},
      &quot;content&quot;: {}
    },
    &quot;pre_tag&quot;: &quot;&lt;em&gt;&quot;,
    &quot;post_tag&quot;: &quot;&lt;/em&gt;&quot;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="分页查询" tabindex="-1"><a class="header-anchor" href="#分页查询" aria-hidden="true">#</a> 分页查询</h2><blockquote><p><code>from</code>：起始的行号，从0开始，<code>size</code>：每页显示的记录数量</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>POST /blog/_search
{
  &quot;query&quot;: {
    &quot;term&quot;: {
      &quot;title&quot;: {
        &quot;value&quot;: &quot;跑&quot;
      }
    }
  }, 
  &quot;from&quot;: 10,
  &quot;size&quot;: 5
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17);function C(O,G){const l=o("ExternalLinkIcon"),i=o("router-link");return a(),r("div",null,[e("blockquote",null,[e("p",null,[t("官网地址："),e("a",q,[t("https://www.elastic.co/guide/cn/elasticsearch/guide/current/foreword_id.html"),n(l)])])]),c(" more "),e("nav",m,[e("ul",null,[e("li",null,[n(i,{to:"#服务状态"},{default:u(()=>[t("------ 服务状态 ------")]),_:1})]),e("li",null,[n(i,{to:"#查询状态"},{default:u(()=>[t("查询状态")]),_:1})]),e("li",null,[n(i,{to:"#查看分词器分词结果"},{default:u(()=>[t("查看分词器分词结果")]),_:1})]),e("li",null,[n(i,{to:"#文档管理"},{default:u(()=>[t("------ 文档管理 ------")]),_:1})]),e("li",null,[n(i,{to:"#添加索引"},{default:u(()=>[t("添加索引")]),_:1})]),e("li",null,[n(i,{to:"#添加数据"},{default:u(()=>[t("添加数据")]),_:1})]),e("li",null,[n(i,{to:"#批量添加数据"},{default:u(()=>[t("批量添加数据")]),_:1})]),e("li",null,[n(i,{to:"#根据-id取文档"},{default:u(()=>[t("根据_id取文档")]),_:1})]),e("li",null,[n(i,{to:"#删除索引"},{default:u(()=>[t("删除索引")]),_:1})]),e("li",null,[n(i,{to:"#数据查询"},{default:u(()=>[t("------ 数据查询 ------")]),_:1})]),e("li",null,[n(i,{to:"#精确查询-term"},{default:u(()=>[t("精确查询（term）")]),_:1})]),e("li",null,[n(i,{to:"#组合查询-bool"},{default:u(()=>[t("组合查询（bool）")]),_:1})]),e("li",null,[n(i,{to:"#匹配查询-query-string"},{default:u(()=>[t("匹配查询（query_string）")]),_:1})]),e("li",null,[n(i,{to:"#多字段查询-multi-match"},{default:u(()=>[t("多字段查询（multi_match）")]),_:1})]),e("li",null,[n(i,{to:"#高亮显示-highlight"},{default:u(()=>[t("高亮显示（highlight）")]),_:1})]),e("li",null,[n(i,{to:"#分页查询"},{default:u(()=>[t("分页查询")]),_:1})])])]),b,e("blockquote",null,[h,_,p,g,e("p",null,[t("PUT "),e("a",x,[t("http://192.168.68.129:9200/{索引名称}"),n(l)])])]),f,e("blockquote",null,[e("p",null,[t("{ PUT | POST } "),e("a",k,[t("http://192.168.68.129:9200/{索引}/_doc/{_id}"),n(l)])])]),E,e("blockquote",null,[e("p",null,[t("{ PUT | POST } "),e("a",y,[t("http://192.168.68.129:9200/{索引}/_bulk"),n(l)])])]),B,e("blockquote",null,[e("p",null,[t("GET "),e("a",T,[t("http://192.168.68.129:9200/{索引}/_doc/{_id}"),n(l)])])]),w,e("blockquote",null,[e("p",null,[t("DELETE "),e("a",P,[t("http://192.168.68.129:9200/{索引名称}"),n(l)])])]),D,e("p",null,[e("a",S,[t("官方示例：深入查找"),n(l)])]),A])}const I=s(v,[["render",C],["__file","20.ES基于Restful的API.html.vue"]]);export{I as default};
