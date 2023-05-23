import { navbar } from "vuepress-theme-hope";
import { readFileList } from "./utils"

function getNavbar(): Array<any> {
  return readFileList("./docs/").filter((item: any) => {
    return ['随笔记录', '算法和设计', '实战项目', '天信瑞安'].filter(ignore => (item.fileName || "").match(ignore)).length === 0
  }).map((level1: any) => {
    return {
      text: level1.text,
      icon: "home",
      prefix: "/" + level1.fileName + "/",
      children: readFileList(level1.path).map((level2: any) => {
        return {
          text: level2.text,
          icon: "home",
          link: level2.fileName + "/",
        }
      })
    }
  })
}
export const navbarConfig = navbar(["/", "/blog", ...getNavbar(), {
  text: '索引',
  icon: 'jiansuo',
  children: [
    { text: '全部', icon: 'list', link: '/article' },
    { text: '分类', icon: 'category', link: '/category' },
    { text: '收藏', icon: 'star', link: '/star' },
    { text: '标签', icon: 'tag', link: '/tag' },
    { text: '时间轴', icon: 'time', link: '/timeline' },
  ],
}])
