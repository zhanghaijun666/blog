const fs = require('fs');
const matter = require('gray-matter');
const jsonToYaml = require('json2yaml')
const readFileList = require('./modules/readFileList');
const { type, repairDate, dateFormat } = require('./modules/util');
const log = console.log
const path = require('path');
const os = require('os');

const PREFIX = '/pages/'
const docsRoot = path.join(__dirname, '..', 'docs')

/** 给.md文件设置frontmatter(标题、日期、永久链接等数据) */
exports.setFrontmatter = function (sourceDir = docsRoot, forceChange = false) {
  const files = readFileList(sourceDir) // 读取所有md文件数据

  files.filter(item => item.isFile).forEach(file => {
    let dataStr = fs.readFileSync(file.filePath, 'utf8');
    // fileMatterObj => {content:'剔除frontmatter后的文件内容字符串', data:{<frontmatter对象>}, ...}
    const { content, data: matterObject = {} } = matter(dataStr, {});
    let hasChange = !!forceChange;

    // 标题 title
    matterObject.title = file.name;
    // 日期
    if (!matterObject.hasOwnProperty('date')) {
      matterObject.date = dateFormat(getBirthtime(fs.statSync(file.filePath)));
      hasChange = true;
    }
    // 永久链接
    // if (!matterObject.hasOwnProperty('permalink')) {
    //   matterObject.permalink = file.link || `${PREFIX + (Math.random() + Math.random()).toString(16).slice(2, 8)}/`;
    //   hasChange = true;
    // }
    // 分类
    matterObject.category = getCategories(file, '随笔')
    // 标签
    const { tags, tag } = matterObject;
    delete matterObject.tag
    delete matterObject.tags
    if (mergeArray(tag, tags).length > 0) {
      matterObject["tag"] = mergeArray(tag, tags)
    } else {
      const group = ((file.filePath.split(path.sep).slice(-2, -1).pop() || "").match(/^(?<order>\d+)\.(?<name>[^.]+)(\.(?<prefix>[^.]+))?/) || {}).groups;
      matterObject["tag"] = [(group.prefix || group.name || "其他")]
    }
    if (hasChange) {
      if (matterObject.date && type(matterObject.date) === 'date') {
        // 修复时间格式
        matterObject.date = repairDate(matterObject.date)
      }
      const newData = jsonToYaml.stringify(matterObject).replace(/\n\s{2}/g, "\n").replace(/"/g, "") + '---' + os.EOL + content;
      // 写入
      fs.writeFileSync(file.filePath, newData);
      log(`write frontmatter(写入frontmatter)：${file.filePath} `)
    }
  })
}

function mergeArray() {
  let result = [];
  for (var i = 0; i < arguments.length; i++) {
    const validData = (arguments[i] ? arguments[i].filter(item => !!item) : undefined);
    result = [...result, ...(validData || [])]
  }
  return [...new Set(result)];
}

// 获取分类数据
function getCategories(file, categoryText) {
  let categories = []

  if (file.filePath.indexOf('_posts') === -1) {
    // 不在_posts文件夹
    let filePathArr = file.filePath.split(path.sep) // path.sep用于兼容不同系统下的路径斜杠
    filePathArr.pop()

    let ind = filePathArr.indexOf('docs')
    if (ind !== -1) {
      while (filePathArr[++ind] !== undefined) {
        const item = filePathArr[ind]
        const firstDotIndex = item.indexOf('.');
        categories.push(item.substring(firstDotIndex + 1) || '')
      }
    }
  } else {
    // 碎片化文章的分类生成
    const matchResult = file.filePath.match(/_posts\/(\S*)\//);
    const resultStr = matchResult ? matchResult[1] : ''
    const resultArr = resultStr.split('/').filter(Boolean)

    if (resultArr.length) {
      categories.push(...resultArr)
    } else {
      categories.push(categoryText)
    }
  }
  return categories
}

// 获取文件创建时间
function getBirthtime(stat) {
  // 在一些系统下无法获取birthtime属性的正确时间，使用atime代替
  return stat.birthtime.getFullYear() != 1970 ? stat.birthtime : stat.atime
}
