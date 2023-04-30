// 时间格式化
export const formatDate = (date) => {
  const dateStr = new Date(date)
  const y = dateStr.getFullYear()
  let m = dateStr.getMonth() + 1
  let d = dateStr.getDate()
  let mm = dateStr.getMinutes()
  let hh = dateStr.getHours()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  mm = mm < 10 ? '0' + mm : mm
  hh = hh < 10 ? '0' + hh : hh
  return `${y}-${m}-${d} ${hh}:${mm}`
}

// 分类转换
export const classifyConvert = (classId) => {
  let classifyName = ''
  switch (classId) {
    case 1:
      classifyName = '技术笔记'
      break
    case 2:
      classifyName = '成长笔记'
      break
    case 3:
      classifyName = '吐槽大会'
      break
  }
  return classifyName
}
/**
 * @description: 表情转码
 * @param {String} str 要转化的字符串
 * @return {String} 转化字符串
 */
export const utf16ToEntities = (str) => {
  const reg = /[\ud800-\udbff][\udc00-\udfff]/g // 检测utf16字符正则
  str = str.replace(reg, (char) => {
    let H, L, code, s

    if (char.length === 2) {
      H = char.charCodeAt(0) // 取出高位
      L = char.charCodeAt(1) // 取出低位
      code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00 // 转换算法
      s = `&#${code};`
    } else {
      s = char
    }

    return s
  })

  return str
}

/**
     * @description: 表情解码
     * @param {String} str
     * @return {*}
     */
export const entitiesToUtf16 = (str) => {
  const reg = /&#\d+;/g
  const arr = str.match(reg) || []

  let H, L, code

  for (let i = 0; i < arr.length; i += 1) {
    code = arr[i]
    code = code.replace('&#', '').replace(';', '')
    // 高位
    H = Math.floor((code - 0x10000) / 0x400) + 0xD800
    // 低位
    L = ((code - 0x10000) % 0x400) + 0xDC00
    code = `&#${code};`
    const s = String.fromCharCode(H, L)
    str = str.replace(code, s)
  }
  return str
}
