var app = getApp();
/**
 * 选择图片
 */
function chooseImg(result) {
  wx.chooseImage({
    count: 9, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths
      result(tempFilePaths)
    }
  })
}

/**
 * 上传图片
 */
function uploadImg(filePath, result) {
  console.log("========" + app.globalData.src + "/file/uploadFile");
  wx.uploadFile({
    url: app.globalData.src + "/file/uploadFile", //仅为示例，非真实的接口地址
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    filePath: filePath,
    name: 'file',
    // filePath: filePath,
    // name: 'file',
    success: function (res) {
      result(res);
    }
  })
}



//转化成小程序模板语言 这一步非常重要 不然无法正确调用

module.exports = {

  chooseImg: chooseImg,

  uploadImg: uploadImg

};
