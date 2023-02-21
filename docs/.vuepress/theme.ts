import { hopeTheme } from "vuepress-theme-hope";
import { navbarConfig } from "./utils/navbar";
import { sidebarConfig } from "./utils/sidebar";

export default hopeTheme({
  hostname: "https://haijunit.top",

  author: {
    name: "知识库",
    url: "https://haijunit.top",
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
    intro: "/intro.html",
    avatar: "/640.png",
    roundAvatar: true,
    description: "汇聚点滴，凝聚成溪",
    medias: {
      Email: "xwze@bupt.cn",
      GitHub: "https://github.com/xwzbupt",
    },
    articleInfo: ["Date", "Category", "Tag", "ReadingTime", "PageView"],
  },

  plugins: {
    blog: {
      excerpt: false,
    },
  },
});
