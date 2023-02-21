import fs from "fs"
import path from "path"

const REG_DIR_NAME = new RegExp(/^(?<order>\d+)\.(?<name>[^.]+)(\.(?<prefix>[^.]+))?/);
const REG_FILE_NAME = new RegExp(/^(?<order>\d+)\.(?<name>[^.]+)(\.(?<prefix>[^.]+))?\.md$/);

export const readFileList = function (basePath: string, isChild: boolean = false) {
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
        text: group.name
      }];
    }
    if (stat.isDirectory() && REG_DIR_NAME.test(element)) {
      const group: any = ((element || "").match(REG_DIR_NAME) || {}).groups;
      const result = {
        fileName: element,
        path: filePath,
        text: group.name
      };
      return isChild ? [result, ...readFileList(filePath)] : [result]
    }
    return []
  }).flat(Infinity)
}