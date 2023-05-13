// 类型判断
exports.type = function (o) {
  var s = Object.prototype.toString.call(o)
  return s.match(/\[object (.*?)\]/)[1].toLowerCase()
}

// 修复date时区格式的问题
exports.repairDate = function (date) {
  date = new Date(date);
  return `${date.getUTCFullYear()}-${zero(date.getUTCMonth() + 1)}-${zero(date.getUTCDate())} ${zero(date.getUTCHours())}:${zero(date.getUTCMinutes())}:${zero(date.getUTCSeconds())}`;
}

// 日期的格式
exports.dateFormat = function (date) {
  return `${date.getFullYear()}-${zero(date.getMonth() + 1)}-${zero(date.getDate())} ${zero(date.getHours())}:${zero(date.getMinutes())}:${zero(date.getSeconds())}`
}

// 小于10补0
function zero (d) {
  return d.toString().padStart(2, '0')
}

function ensureEndingSlash (path) {
  return /(\.html|\/)$/.test(path) ? path : path + '/'
}

exports.isMailto = function (path) {
  return /^mailto:/.test(path)
}

exports.isTel = function (path) {
  return /^tel:/.test(path)
}

// 类型判断
exports.type = function (o) {
  const s = Object.prototype.toString.call(o)
  return s.match(/\[object (.*?)\]/)[1].toLowerCase()
}

// 日期格式化(只获取年月日)
exports.dateFormat = function (date) {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  return `${date.getUTCFullYear()}-${zero(date.getUTCMonth() + 1)}-${zero(date.getUTCDate())}`
}

// 小于10补0
exports.zero = function (d) {
  return d.toString().padStart(2, '0')
}

// 获取时间的时间戳
exports.getTimeNum = function (post) {
  let dateStr = post.frontmatter.date || post.lastUpdated || new Date()
  let date = new Date(dateStr)
  // 修复new Date()在Safari下出现Invalid Date的问题
  if (date == "Invalid Date" && dateStr) {
    date = new Date(dateStr.replace(/-/g, '/'))
  }
  return date.getTime()
}

// 比对时间
exports.compareDate = function (a, b) {
  return getTimeNum(b) - getTimeNum(a)
}

// 将特殊符号编码（应用于url）
exports.encodeUrl = function (str) {
  str = str + ''
  str = str.replace(/ |((?=[\x21-\x7e]+)[^A-Za-z0-9])/g, '-')
  return str
}
