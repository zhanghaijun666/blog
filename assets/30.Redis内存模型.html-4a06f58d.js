const e=JSON.parse('{"key":"v-3b44bcce","path":"/62.%E9%9B%86%E6%88%90%E9%85%8D%E7%BD%AE/20.%E7%BC%93%E5%AD%98Reids/30.Redis%E5%86%85%E5%AD%98%E6%A8%A1%E5%9E%8B.html","title":"Redis内存模型","lang":"zh-CN","frontmatter":{"title":"Redis内存模型","date":"2022-06-08T20:08:00.000Z","category":["集成配置","缓存Reids"],"tag":["Redis"],"description":"[[toc]] 缓存通识 缓存(Cache) 和 缓冲(Buﬀer) 的分别？; 缓存：一般是为了数据多次读取。 缓冲：比如 CPU 写到 把数据先硬盘，因为硬盘比较慢，先到缓冲设备 Buﬀer，比如内存，Buﬀer 读和写都需要。 缓存的关键指标：缓存命中率; 缓存是否有效依赖于能多少次重用同一个缓存响应业务请求，这个度量指标被称作缓存命中率。 如果...","head":[["meta",{"property":"og:url","content":"https://haijunit.top/blog/62.%E9%9B%86%E6%88%90%E9%85%8D%E7%BD%AE/20.%E7%BC%93%E5%AD%98Reids/30.Redis%E5%86%85%E5%AD%98%E6%A8%A1%E5%9E%8B.html"}],["meta",{"property":"og:site_name","content":"学习笔记"}],["meta",{"property":"og:title","content":"Redis内存模型"}],["meta",{"property":"og:description","content":"[[toc]] 缓存通识 缓存(Cache) 和 缓冲(Buﬀer) 的分别？; 缓存：一般是为了数据多次读取。 缓冲：比如 CPU 写到 把数据先硬盘，因为硬盘比较慢，先到缓冲设备 Buﬀer，比如内存，Buﬀer 读和写都需要。 缓存的关键指标：缓存命中率; 缓存是否有效依赖于能多少次重用同一个缓存响应业务请求，这个度量指标被称作缓存命中率。 如果..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-23T07:13:54.000Z"}],["meta",{"property":"article:author","content":"知识库"}],["meta",{"property":"article:tag","content":"Redis"}],["meta",{"property":"article:published_time","content":"2022-06-08T20:08:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-23T07:13:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis内存模型\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-06-08T20:08:00.000Z\\",\\"dateModified\\":\\"2023-05-23T07:13:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"知识库\\",\\"url\\":\\"https://haijunit.top\\",\\"email\\":\\"zhanghaijun_java@163.com\\"}]}"]]},"headers":[{"level":2,"title":"缓存通识","slug":"缓存通识","link":"#缓存通识","children":[]},{"level":2,"title":"查看 Redis 内存统计","slug":"查看-redis-内存统计","link":"#查看-redis-内存统计","children":[]},{"level":2,"title":"内存分配器jemalloc","slug":"内存分配器jemalloc","link":"#内存分配器jemalloc","children":[]},{"level":2,"title":"存储对象redisObject","slug":"存储对象redisobject","link":"#存储对象redisobject","children":[]},{"level":2,"title":"动态字符串SDS k-v","slug":"动态字符串sds-k-v","link":"#动态字符串sds-k-v","children":[]},{"level":2,"title":"Redis 的对象类型与内存编码","slug":"redis-的对象类型与内存编码","link":"#redis-的对象类型与内存编码","children":[]},{"level":2,"title":"Redis 设计优化（实际使用）","slug":"redis-设计优化-实际使用","link":"#redis-设计优化-实际使用","children":[]}],"git":{"createdTime":1684826034000,"updatedTime":1684826034000,"contributors":[{"name":"zhanghaijun","email":"zhanghaijun@bjtxra.com","commits":1}]},"readingTime":{"minutes":21.72,"words":6515},"filePathRelative":"62.集成配置/20.缓存Reids/30.Redis内存模型.md","localizedDate":"2022年6月9日","excerpt":"","autoDesc":true}');export{e as data};
