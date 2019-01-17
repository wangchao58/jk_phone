var app = getApp();
var images = new Array(); 
/**
 * 选择图片
 * "album":从相册中选择
 * "camera":拍照
 * imgNumber：上传图片数（自定义）
 */
function chooseImg(type, imgNumber, result) {
  wx.chooseImage({
    count: imgNumber, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      var addLen = tempFilePaths.length;
      for (var i = 0; i < addLen; i++) {
        var str = {};
        str.pic = tempFilePaths[i];
        images.push(str);
      }
      result(images);
    }
  })
}

/**
 * 上传图片
 */
function imageUpload(path, curImgList, result) {
  for (var i = 0; i < path.length; i++) {
    wx.showToast({
      icon: "loading",
      title: "正在上传"
    }),
    wx.uploadFile({
      url: app.globalData.src + "/file/uploadFile",
      filePath: path[i].pic,
      name: 'file',
      header: { "Content-Type": "multipart/form-data" },
      formData: {
        douploadpic: '1'
      },
      success: function (res) {
        result(curImgList.push(res.data));
      },
      fail: function (e) {
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      },
      complete: function () {
        wx.hideToast();  //隐藏Toast
      }
    })
  }
}



//转化成小程序模板语言 这一步非常重要 不然无法正确调用

module.exports = {
  chooseImg: chooseImg,
  imageUpload: imageUpload
};
