import { sidebar } from "vuepress-theme-hope";
import { readFileList } from "./utils"

function getSidebar(): any {
  const docs = readFileList("./docs/");
  let sidebarObj = {}
  docs.forEach((level1: any) => {
    sidebarObj['/' + level1.fileName + '/'] = readFileList(level1.path).map((level2: any) => {
      return {
        prefix: level2.fileName + "/",
        text: level2.text,
        collapsible: true,
        children: readFileList(level2.path).map((level3: any) => level3.fileName)
      }
    })
  });
}

export const sidebarConfig = sidebar(getSidebar())
