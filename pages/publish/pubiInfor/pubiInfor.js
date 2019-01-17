Page({
  data: {
    previewImg: [],
    textarea: "",
    anonymous:false
  },
  onLoad: function (options) {

  },
  textarea: function (e) {
    var val = e.detail.value
    this.setData({ textarea: val })
  },
  //选择图片方法
  chooseImage: function () {
    var that = this;
    var uuid = that.uuid();
    var num = that.data.previewImg.length;
    var count = 3 - num;
    if (num < 3) {
      wx.chooseImage({
        count: count,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          var tempFilePaths = res.tempFilePaths[0];
          console.log(tempFilePaths)
          var imgs=that.data.previewImg;
          imgs.push(tempFilePaths);
          that.setData({ previewImg: imgs})
          // wx.uploadFile({
          //   url: imgsrc, // 仅为示例，非真实的接口地址
          //   filePath: tempFilePaths[0],
          //   name: uuid,
          //   success(res) {
          //     const data = res.data
          //   }
          // })
        }
      })
    } else {
      wx.showToast({
        title: '最多上传3张图片',
        image: '../../images/jinggao.png',
        duration: 2000
      })
    }
  },
  //删除已选图片方法
  removeimg: function (e) {
    var previewImg = this.data.previewImg;
    var id = e.currentTarget.id
    previewImg.splice(id, 1)
    this.setData({ previewImg: previewImg })
  },
  //显示城市
  checkboxChange: function () {
    var anonymous = this.data.anonymous;
    if (anonymous) {
      this.setData({ anonymous: false })
    } else {
      this.setData({ anonymous: true })
    }
  },
  uuid: function () {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
  }
})