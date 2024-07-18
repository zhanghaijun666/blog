import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as d,c as o,e as c,a as e,d as i,w as s,b as n,f as h}from"./app-efa5e96e.js";const u={},_=e("p",null,[n("一旦数据量朝着千万以上趋势增长，其他优化效果已经不是太明显了，为了减少数据库的负担，提升数据库响应速度，缩短查询时间，这时候就需要进行"),e("code",null,"分库分表"),n("。")],-1),m={class:"table-of-contents"},v=h(`<h2 id="如何分库分表" tabindex="-1"><a class="header-anchor" href="#如何分库分表" aria-hidden="true">#</a> 如何分库分表</h2><ul><li><p>垂直（纵向）切分</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>优点：
    业务间解耦，不同业务的数据进行独立的维护、监控、扩展
    在高并发场景下，一定程度上缓解了数据库的压力
缺点：
    提升了开发的复杂度，由于业务的隔离性，很多表无法直接访问，必须通过接口方式聚合数据，
    分布式事务管理难度增加
    数据库还是存在单表数据量过大的问题，并未根本上解决，需要配合水平切分
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>水平（横向）切分</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>优点：
    解决高并发时单库数据量过大的问题，提升系统稳定性和负载能力
    业务系统改造的工作量不是很大
缺点：
    跨分片的事务一致性难以保证
    跨库的join关联查询性能较差
    扩容的难度和维护量较大，（拆分成几千张子表想想都恐怖）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="分库分表工具" tabindex="-1"><a class="header-anchor" href="#分库分表工具" aria-hidden="true">#</a> 分库分表工具？</h2><p>自己开发分库分表工具的工作量是巨大的，好在业界已经有了很多比较成熟的分库分表中间件，我们可以将更多的时间放在业务实现上</p>`,4),b={href:"http://shardingsphere.apache.org/index_zh.html",target:"_blank",rel:"noopener noreferrer"},p=e("li",null,"TSharding（蘑菇街）",-1),g=e("li",null,"Atlas（奇虎 360）",-1),f=e("li",null,"Cobar（阿里巴巴）",-1),x=e("li",null,"MyCAT（基于 Cobar）",-1),k=e("li",null,"Oceanus（58 同城）",-1),C=e("li",null,"Vitess（谷歌）",-1),j=e("h2",{id:"sharding-jdbc",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#sharding-jdbc","aria-hidden":"true"},"#"),n(" Sharding JDBC")],-1),S={href:"http://shardingsphere.apache.org/index_zh.html",target:"_blank",rel:"noopener noreferrer"},V={href:"https://gitee.com/sublun/sharding-jdbc-test",target:"_blank",rel:"noopener noreferrer"};function B(N,z){const l=t("router-link"),a=t("ExternalLinkIcon");return d(),o("div",null,[_,c(" more "),e("nav",m,[e("ul",null,[e("li",null,[i(l,{to:"#如何分库分表"},{default:s(()=>[n("如何分库分表")]),_:1})]),e("li",null,[i(l,{to:"#分库分表工具"},{default:s(()=>[n("分库分表工具？")]),_:1})]),e("li",null,[i(l,{to:"#sharding-jdbc"},{default:s(()=>[n("Sharding JDBC")]),_:1})])])]),v,e("ul",null,[e("li",null,[n("sharding-jdbc（当当）："),e("a",b,[n("http://shardingsphere.apache.org/index_zh.html"),i(a)])]),p,g,f,x,k,C]),j,e("ul",null,[e("li",null,[n("官方网站："),e("a",S,[n("http://shardingsphere.apache.org/index_zh.html"),i(a)])]),e("li",null,[n("源码位置："),e("a",V,[n("https://gitee.com/sublun/sharding-jdbc-test"),i(a)])])])])}const E=r(u,[["render",B],["__file","18.MySQL分库分表.html.vue"]]);export{E as default};
