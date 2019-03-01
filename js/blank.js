var app = getApp();

/**
 * 判断非空
 */
function blank(str) {
  console.log("========"+str)
  if (Object.prototype.toString.call(str) === '[object Undefined]') {//空
    return true
  } else if (
    Object.prototype.toString.call(str) === '[object String]' ||
    Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
    return str.length == 0 ? true : false
  } else if (Object.prototype.toString.call(str) === '[object Object]') {
    return JSON.stringify(str) == '{}' ? true : false
  } else {
    return true
  }
}

//转化成小程序模板语言 这一步非常重要 不然无法正确调用
module.exports = {
  blank: blank
};

