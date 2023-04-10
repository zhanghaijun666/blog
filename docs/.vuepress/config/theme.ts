import { hopeTheme } from "vuepress-theme-hope";
import { navbarConfig } from "./navbar";
import { sidebarConfig } from "./sidebar";

export default hopeTheme({
  hostname: "https://haijunit.top",

  author: {
    name: "知识库",
    url: "https://haijunit.top",
    email: 'zhanghaijun_java@163.com',
  },
  repo: "https://gitee.com/haijunit/blog-vuepress",
  repoDisplay: false,
  docsDir: "docs/",

  // sidebar
  sidebar: sidebarConfig,
  // navbar
  navbar: navbarConfig,
  //导航栏布局
  navbarLayout: {
    start: ["Brand"],
    center: ["Links"],
    end: ["Repo", "Outlook", "Search"],
  },

  iconPrefix: "iconfont icon-",
  logo: "/logo.png",
  //是否全局启用路径导航
  breadcrumb: true,
  //页面元数据：贡献者，最后修改时间，编辑链接
  contributors: false,
  lastUpdated: true,
  editLink: true,
  fullscreen: true,
  displayFooter: false,
  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime", "PageView"],
  themeColor: {
    blue: "#2196f3",
    red: "#f26d6d",
    green: "#3eaf7c",
    orange: "#fb9b5f",
  },
  blog: {
    name: "研发中心",
    // intro: "/intro.html",
    avatar: "/logo.png",
    roundAvatar: true,
    description: "汇聚点滴，凝聚成溪",
    medias: {
      Email: "mailto:zhanghaijun_java@163.com",
      GitHub: "https://github.com/zhanghaijun666",
    },
    articleInfo: ["Date", "Category", "Tag", "ReadingTime", "PageView"],
  },

  plugins: {
    blog: {
      excerpt: false,
    },
    copyCode: {
      showInMobile: true,
    },
    feed: {
      atom: true,
      json: true,
      rss: true,
    },
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: false,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      playground: {
        presets: ['ts', 'vue'],
      },
      presentation: {
        plugins: ['highlight', 'math', 'search', 'notes', 'zoom'],
      },
      stylize: [
        {
          matcher: 'Recommended',
          replacer: ({ tag }) => {
            if (tag === 'em')
              return {
                tag: 'Badge',
                attrs: { type: 'tip' },
                content: 'Recommended',
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
    // pwa: {
    //   favicon: '/favicon.png',
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: '/pwa/144.png',
    //     statusBarColor: 'black',
    //   },
    //   msTile: {
    //     image: '/pwa/144.png',
    //     color: '#000',
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: '/pwa/512.png',
    //         sizes: '512x512',
    //         purpose: 'maskable',
    //         type: 'image/png',
    //       },
    //       {
    //         src: '/pwa/192.png',
    //         sizes: '192x192',
    //         purpose: 'maskable',
    //         type: 'image/png',
    //       },
    //       {
    //         src: '/pwa/512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //       },
    //       {
    //         src: '/pwa/192.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //       },
    //     ],
    //   },
    // },
  },
});
