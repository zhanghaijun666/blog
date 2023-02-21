import { sidebar } from "vuepress-theme-hope";

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter'); // front matter解析器
const exclude_file = [".vuepress","library", "image"]

// 读取目录
function readDirectory(basePath: string) {
  const children = fs.readdirSync(basePath);
  return (children || []).filter(item => /^\d+./.test(item) && !exclude_file.includes(item)).map(function (element) {
    let filepath = basePath + "/" + element;
    var info = fs.statSync(filepath);
    // console.log("path:", path.resolve(basePath, element))
    if (info.isDirectory()) {
      return [{
        text: path.basename(element).replace(/\.md$/,"").replace(/^\d+\./,""),
        icon: "chat",
        collapsable: false,
        children: readDirectory(filepath)
      }];
    } else if (/\.md$/.test(element)) {
      const contentStr = fs.readFileSync(filepath, 'utf8') // 读取md文件内容，返回字符串
      const { data } = matter(contentStr, {}) // 解析出front matter数据
      const { permalink = ''} = data || {}
      return [{
        text: path.basename(element).replace(/\.md$/,"").replace(/^\d+\./,""),
        icon: "chat",
        collapsable: false,
        link: permalink
      }];
    }
  }).flat(Infinity);
}

// https://theme-hope.vuejs.press/zh/guide/layout/sidebar.html
export default sidebar({
  "/pages/craft/": readDirectory("./docs/60.环境配置/"),
  "/pages/ambient/": readDirectory("./docs/60.环境配置/"),
  "/pages/pmp/": readDirectory("./docs/60.环境配置/"),
  "/pages/project/": readDirectory("./docs/60.环境配置/"),
});
