/** 读取所有md文件数据 */
const fs = require('fs'); // 文件模块
const path = require('path'); // 路径模块
// front matter解析器  https://github.com/jonschlinkert/gray-matter
const matter = require('gray-matter');

const REG_DIR_NAME = new RegExp(/^(?<order>\d+)\.(?<name>.*)$/);
const REG_FILE_NAME = new RegExp(/^(?<order>\d+)\.(?<name>.*)\.md$/);
const PREFIX = '/pages/'

function readFileList (dir, isChild = true) {
  const files = fs.readdirSync(dir);
  return files.map((element) => {
    if (element == "00.目录") {
      return [];
    }
    const filePath = path.join(dir, element);
    const stat = fs.statSync(filePath);
    if (stat.isFile() && REG_FILE_NAME.test(element)) {
      const group = ((element || "").match(REG_FILE_NAME) || {}).groups;
      const { content, data } = matter(fs.readFileSync(filePath, 'utf8'), {});
      return [{
        element: element,
        filePath: filePath,
        order: group.order,
        name: group.name,
        isFile: true,
        isDirectory: false,
        link: getLink(filePath),
        matter: data
      }];
    }
    if (stat.isDirectory() && REG_DIR_NAME.test(element)) {
      const group = ((element || "").match(REG_DIR_NAME) || {}).groups;
      const result = {
        element: element,
        filePath: filePath,
        order: group.order,
        name: group.name,
        isFile: false,
        isDirectory: true,
      };
      return isChild ? [result, ...readFileList(filePath)] : [result]
    }
    return [];
  }).flat(Infinity);
}

// 定义文件的永久链接
function getLink (filePath) {
  return PREFIX + filePath.split(path.sep).map(element => {
    if (REG_FILE_NAME.test(element)) {
      const group = ((element || "").match(REG_FILE_NAME) || {}).groups;
      return group.order;
    }
    if (REG_DIR_NAME.test(element)) {
      const group = ((element || "").match(REG_DIR_NAME) || {}).groups;
      return `${group.order}${group.prefix ? '/' + group.prefix.toLowerCase() : ''}`;
    }
    return ""
  }).filter(item => !!item).join('/') + '/';
}
module.exports = readFileList;
