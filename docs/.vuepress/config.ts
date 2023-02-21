import { defineUserConfig } from "vuepress";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import theme from "./config/theme";
import head from "./config/head";

export default defineUserConfig({
  base: "/",
  dest: "dist",
  lang: "zh-CN",
  title: "学习笔记",
  description: "积累点滴，汇聚成溪。",
  head: head,
  //是否开启页面预拉取，如果服务器宽带足够，可改为 true，会提升其他页面加载速度
  shouldPrefetch: false,
  theme,

  plugins: [
    // 本地搜索
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
    }),
    mdEnhancePlugin({
      // 启用自定义容器
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      flowchart: true,
      gfm: true,
      imgSize: true,
      include: true,
      lazyLoad: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommanded",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommanded",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    }),
  ],
});
