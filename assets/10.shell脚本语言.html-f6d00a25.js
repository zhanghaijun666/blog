const l=JSON.parse('{"key":"v-34d8d980","path":"/30.%E7%BC%96%E7%A8%8B%E6%8A%80%E5%B7%A7/09.Shell%E8%84%9A%E6%9C%AC/10.shell%E8%84%9A%E6%9C%AC%E8%AF%AD%E8%A8%80.html","title":"shell脚本语言","lang":"zh-CN","frontmatter":{"title":"shell脚本语言","date":"2023-05-12T00:00:00.000Z","category":["编程技巧","Shell脚本"],"tag":["Shell脚本"],"description":"[[toc]] shell脚本入门 | shell是什么 Shell是一个命令解释器，它在操作系统的最外层，负责直接与用户对话，把用户的输入解释给操作系统，并处理各种各样的操作系统的输出结果，输出屏幕返回给用户; 这种对话方式可以是：; 1. 交互的方式：从键盘输入命令，通过/bin/bash的解释器，可以立即得到shell的回应; 2. 非交互的方式...","head":[["meta",{"property":"og:url","content":"https://haijunit.top/blog/30.%E7%BC%96%E7%A8%8B%E6%8A%80%E5%B7%A7/09.Shell%E8%84%9A%E6%9C%AC/10.shell%E8%84%9A%E6%9C%AC%E8%AF%AD%E8%A8%80.html"}],["meta",{"property":"og:site_name","content":"学习笔记"}],["meta",{"property":"og:title","content":"shell脚本语言"}],["meta",{"property":"og:description","content":"[[toc]] shell脚本入门 | shell是什么 Shell是一个命令解释器，它在操作系统的最外层，负责直接与用户对话，把用户的输入解释给操作系统，并处理各种各样的操作系统的输出结果，输出屏幕返回给用户; 这种对话方式可以是：; 1. 交互的方式：从键盘输入命令，通过/bin/bash的解释器，可以立即得到shell的回应; 2. 非交互的方式..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-23T07:13:54.000Z"}],["meta",{"property":"article:author","content":"知识库"}],["meta",{"property":"article:tag","content":"Shell脚本"}],["meta",{"property":"article:published_time","content":"2023-05-12T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-23T07:13:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"shell脚本语言\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-05-12T00:00:00.000Z\\",\\"dateModified\\":\\"2023-05-23T07:13:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"知识库\\",\\"url\\":\\"https://haijunit.top\\",\\"email\\":\\"zhanghaijun_java@163.com\\"}]}"]]},"headers":[{"level":2,"title":"shell脚本入门","slug":"shell脚本入门","link":"#shell脚本入门","children":[{"level":3,"title":"| shell是什么","slug":"shell是什么","link":"#shell是什么","children":[]},{"level":3,"title":"| Shell能做什么","slug":"shell能做什么","link":"#shell能做什么","children":[]},{"level":3,"title":"| 如何Shell编程","slug":"如何shell编程","link":"#如何shell编程","children":[]}]},{"level":2,"title":"一个shell脚本","slug":"一个shell脚本","link":"#一个shell脚本","children":[{"level":3,"title":"| 执行脚本的三种常用的方式","slug":"执行脚本的三种常用的方式","link":"#执行脚本的三种常用的方式","children":[]}]},{"level":2,"title":"shell变量基础","slug":"shell变量基础","link":"#shell变量基础","children":[{"level":3,"title":"| 什么是变量","slug":"什么是变量","link":"#什么是变量","children":[]},{"level":3,"title":"| 变量值的定义","slug":"变量值的定义","link":"#变量值的定义","children":[]},{"level":3,"title":"| 变量可以定义变量","slug":"变量可以定义变量","link":"#变量可以定义变量","children":[]},{"level":3,"title":"| 核心位置变量","slug":"核心位置变量","link":"#核心位置变量","children":[]},{"level":3,"title":"| 脚本传参的三种方式","slug":"脚本传参的三种方式","link":"#脚本传参的三种方式","children":[]}]},{"level":2,"title":"shell变量子串","slug":"shell变量子串","link":"#shell变量子串","children":[{"level":3,"title":"| 子串的切片","slug":"子串的切片","link":"#子串的切片","children":[]},{"level":3,"title":"| 子串的长度统计","slug":"子串的长度统计","link":"#子串的长度统计","children":[]},{"level":3,"title":"| 子串的删除(支持通配符)","slug":"子串的删除-支持通配符","link":"#子串的删除-支持通配符","children":[]},{"level":3,"title":"| 子串的替换","slug":"子串的替换","link":"#子串的替换","children":[]}]},{"level":2,"title":"shell数值运算","slug":"shell数值运算","link":"#shell数值运算","children":[{"level":3,"title":"| expr  只支持整数运算","slug":"expr-只支持整数运算","link":"#expr-只支持整数运算","children":[]},{"level":3,"title":"| $(()) 只支持整数运算","slug":"只支持整数运算","link":"#只支持整数运算","children":[]},{"level":3,"title":"| $[] 只支持整数运算","slug":"只支持整数运算-1","link":"#只支持整数运算-1","children":[]},{"level":3,"title":"| let 只支持整数运算","slug":"let-只支持整数运算","link":"#let-只支持整数运算","children":[]},{"level":3,"title":"| bc 支持整数和小数运算","slug":"bc-支持整数和小数运算","link":"#bc-支持整数和小数运算","children":[]},{"level":3,"title":"| awk 支持整数和小数运算","slug":"awk-支持整数和小数运算","link":"#awk-支持整数和小数运算","children":[]}]},{"level":2,"title":"条件表达式","slug":"条件表达式","link":"#条件表达式","children":[{"level":3,"title":"| 文件表达式","slug":"文件表达式","link":"#文件表达式","children":[]},{"level":3,"title":"| shell数值比较","slug":"shell数值比较","link":"#shell数值比较","children":[]}]},{"level":2,"title":"流程控制语句","slug":"流程控制语句","link":"#流程控制语句","children":[{"level":3,"title":"| if判断语法格式","slug":"if判断语法格式","link":"#if判断语法格式","children":[]},{"level":3,"title":"| for循环","slug":"for循环","link":"#for循环","children":[]},{"level":3,"title":"| while循环","slug":"while循环","link":"#while循环","children":[]}]},{"level":2,"title":"shell函数","slug":"shell函数","link":"#shell函数","children":[{"level":3,"title":"| 函数的定义","slug":"函数的定义","link":"#函数的定义","children":[]},{"level":3,"title":"| 函数复用","slug":"函数复用","link":"#函数复用","children":[]},{"level":3,"title":"| 函数变量","slug":"函数变量","link":"#函数变量","children":[]}]},{"level":2,"title":"case语句","slug":"case语句","link":"#case语句","children":[]},{"level":2,"title":"shell变量数组","slug":"shell变量数组","link":"#shell变量数组","children":[{"level":3,"title":"| 普通数组的定义方式","slug":"普通数组的定义方式","link":"#普通数组的定义方式","children":[]},{"level":3,"title":"| 数组的遍历","slug":"数组的遍历","link":"#数组的遍历","children":[]},{"level":3,"title":"| 关联数组","slug":"关联数组","link":"#关联数组","children":[]}]}],"git":{"createdTime":1684826034000,"updatedTime":1684826034000,"contributors":[{"name":"zhanghaijun","email":"zhanghaijun@bjtxra.com","commits":1}]},"readingTime":{"minutes":23.86,"words":7157},"filePathRelative":"30.编程技巧/09.Shell脚本/10.shell脚本语言.md","localizedDate":"2023年5月12日","excerpt":"","autoDesc":true}');export{l as data};
