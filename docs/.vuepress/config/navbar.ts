import { navbar } from "vuepress-theme-hope";
import { readFileList } from "./utils"

function getNavbar(): Array<any> {
  return readFileList("./docs/").filter((item: any) => ['10.随笔记录', '20.算法和设计', '40.项目管理', '90.实战项目'].indexOf(item.fileName) == -1).map((level1: any) => {
    return {
      text: level1.text,
      icon: "",
      prefix: "/" + level1.fileName + "/",
      children: readFileList(level1.path).map((level2: any) => {
        return {
          text: level2.text,
          icon: "",
          link: level2.fileName + "/",
        }
      })
    }
  })
}
export const navbarConfig = navbar(["/", "/home", ...getNavbar()])
