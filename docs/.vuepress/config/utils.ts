import fs from "fs"
import path from "path"

const REG_DIR_NAME = new RegExp(/^(?<order>\d+)\.(?<name>[^.]+)(\.(?<prefix>[^.]+))?/);
const REG_FILE_NAME = new RegExp(/^(?<order>\d+)\.(?<name>[^.]+)(\.(?<prefix>[^.]+))?\.md$/);
const docsRoot = path.join(__dirname, '..', '..', '..', 'docs')

export const readFileList = function (basePath: string = docsRoot, isChild: boolean = false): Array<any> {
  const files = fs.readdirSync(basePath);
  return files.map((element) => {
    if (element == "00.目录") {
      return [];
    }
    const filePath = path.join(basePath, element);
    const stat = fs.statSync(filePath);
    if (stat.isFile() && REG_FILE_NAME.test(element)) {
      const group: any = ((element || "").match(REG_FILE_NAME) || {}).groups;
      return [{
        fileName: element,
        path: filePath,
        order: group.order,
        text: group.name
      }];
    }
    if (stat.isDirectory() && REG_DIR_NAME.test(element)) {
      const group: any = ((element || "").match(REG_DIR_NAME) || {}).groups;
      const fileInfo = {
        fileName: element,
        path: filePath,
        order: group.order,
        text: group.name
      };
      return isChild ? [fileInfo, ...readFileList(filePath)] : [fileInfo]
    }
    return []
  }).flat(Infinity).sort((a, b) => a.order - b.order)
}