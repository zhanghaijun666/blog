import { defineUserConfig } from "vuepress";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { path } from "@vuepress/utils";
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

  // 修改页面模板，https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/theme/templates/index.build.html
  // 配置参考：https://vuepress.github.io/zh/reference/theme-api.html#templatebuild
  templateBuild: path.resolve(__dirname, "theme/templates/index.build.html"),

  // 禁止文件夹生成静态文件，参考 [VuePress 文档]（https://v2.vuepress.vuejs.org/zh/guide/page.html#routing）
  pagePatterns: [
    "**/*.md",
    "!_temp",
    "!reading",
    "!.vuepress",
    "!node_modules",
    "!library",
  ],

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
      imgLazyload: true,
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
  ],/* [
    require('./plugins/KanBanNiang'),
    {
      theme: ['blackCat'],
      width: 200,
      height: 400,
      modelStyle: {
        position: 'fixed',
        right: '70px',
        bottom: '50px',
        opacity: '0.9'
      },
      messageStyle: {
        position: 'fixed',
        right: '70px',
        bottom: '380px'
      },
      btnStyle: {
        bottom: '60px',
        right: '80px'
      }
    }
  ], */
  // [
  //   require('./plugins/BgMusic'),
  //   {
  //     audios: [
  //       {
  //         name: '我再没见过 像你一般的星空',
  //         artist: 'Seto',
  //         url: 'https://assets.smallsunnyfox.com/music/2.mp3',
  //         cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
  //       },
  //       {
  //         name: '萤火之森',
  //         artist: 'CMJ',
  //         url: 'https://assets.smallsunnyfox.com/music/3.mp3',
  //         cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
  //       }
  //     ]
  //   }
  // ],
});
