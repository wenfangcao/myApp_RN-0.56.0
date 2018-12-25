/* createTime 2018/9/11 18:40 by mxb */

// 抓取 url 地址参数
export function getQueryString(name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = window.location.search.substr(1).match(reg); 
  if (r != null) return unescape(r[2]); 
  return null; 
}

// 删除 console
export function deleteConsole() {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
  }
}

// 时间格式化
export function formatDate (date, fmt) {
  let newDate = new Date(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': newDate.getMonth() + 1,
    'd+': newDate.getDate(),
    'h+': newDate.getHours(),
    'm+': newDate.getMinutes(),
    's+': newDate.getSeconds()
  }
  function fullTime(s) {
    return s < 10 ? `0${s}` : s
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : fullTime(str))
    }
  }
  return fmt
}

// 输出  天、小时、分钟、秒
export function formatDuring(mss) {
  var days = parseInt(mss / (1000 * 60 * 60 * 24))
  var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
  var seconds = (mss % (1000 * 60)) / 1000
  let str = ''
  function isNull(t, v) {
    if (t) str += t + v
  }
  isNull(days, " 天 ")
  isNull(hours, " 小时 ")
  isNull(minutes, " 分钟 ")
  isNull(seconds, " 秒 ")
  return str
  // return  days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 "
}

// get params 对象变为string
export function fomatUrl(baseUrl, data) {
  let url = baseUrl
  let i = 0
  for (const p in data) {
    i++ == 0 ? url += `?${p}=${data[p]}` : url += `&${p}=${data[p]}`
  }
  return url
}


// 是否在起始、结束时间段内
export function isInTime(s, e) {
  const sTime = new Date(s).getTime()
  const eTime = new Date(e).getTime()
  const now = new Date().getTime()
  if (sTime > now || eTime < now) {
    return false
  }
  return true
}

// 文件大小格式转换
export function renderSize(value){
  if(null==value||value==''){
      return "0 Bytes";
  }
  var unitArr = new Array("Bytes","KB","MB","GB","TB","PB","EB","ZB","YB");
  var index=0;
  var srcsize = parseFloat(value);
  index=Math.floor(Math.log(srcsize)/Math.log(1024));
  var size =srcsize/Math.pow(1024,index);
  size=size.toFixed(2);//保留的小数位数
  return `${size} ${unitArr[index]}`
}

// 截取输入框字符串长度
export function subStr(str, langth) {
  return str.substr(0, langth)
}

// 存取localStorage 对象key val
export function setLocal(obj, key, val) {
  let data = localStorage.getItem(obj)
  data = data ? JSON.parse(data) : null
  if (data) {
    data[key] = val
  } else {
    data = {}
    data[key] =  val
  }
  localStorage.setItem(obj, JSON.stringify(data))
}
