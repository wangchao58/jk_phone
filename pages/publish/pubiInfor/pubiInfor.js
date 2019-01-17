var app = getApp();
// 引用公共js
var fileUpload = require("../../../js/fileUpload.js");
Page({
  data: {
    photos: [],
    evalList: [{ tempFilePaths: [], imgList: [] }]
  },

  onLoad: function (options) {

  },

  // 获取索要发布的资讯信息
  informationInput: function (e) {
    this.setData({
      informationInput: e.detail.value
    })
  },

  /**
   * 选择图片方法
   */
  chooseImage: function () {
    var that = this;
    var num = that.data.photos.length;//已上传图片数
    var count = 3 - num;//剩余可上传照片数
    if (num < 3){
      wx.showActionSheet({
        itemList: ["从相册中选择", "拍照"],
        itemColor: "#f7982a",
        success: function (res) {
          if (!res.cancel) {
            if (res.tapIndex == 0) {
              // 调用公共收藏js方法(从相册中选择)
              fileUpload.chooseImg("album", count, function (result) {
                that.setData({
                  photos: result
                });
                // that.upLoadImg(result);
              })
            } else if (res.tapIndex == 1) {
              //调用公共收藏js方法(拍照)
              fileUpload.chooseImg("camera", imgNumber, function (result) {
                that.setData({
                  photos: result
                });
                // that.upLoadImg(photos);
              })
            }
          }
        }
      })
    }else{
      wx.showToast({
        title: '最多上传3张图片',
        // image: '../../images/jinggao.png',
        duration: 2000
      })
    }
  },

  upLoadImg: function (list) {
    var that = this;
    this.upload(that, list);
  },

  /**
   * 上传多张图片
   */
  upload: function (page, path) {
    var that = this;
    var curImgList = [];
    for (var i = 0; i < path.length; i++) {
      wx.showToast({
        icon: "loading",
        title: "正在上传"
      }),
      //公共js
      fileUpload.imageUpload(path, curImgList, function (result) {
        that.setData({
          photos: result
        })
        if (res.statusCode != 200) {
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
          return;
        }
        var data = res.data
        page.setData({  //上传成功修改显示头像
          src: path[0]
        })
      })
    }
  },

  //删除已选图片方法
  removeimg: function (e) {
    var photos = this.data.photos;
    var index = e.currentTarget.id
    photos.splice(index, 1)
    this.setData({
      photos: photos
    })
    // this.upLoadImg(photos);
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

  /**
   * 发布资讯提交
   */
  informationSub: function () {
    var informationInput = this.data.informationInput;
    var userId = wx.getStorageSync('userid');
    var src = app.globalData.src + "/information/addInformation";
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        tContent: informationInput,
        pId: userId
      },
      success(res) {
        if (res.data > 0) {
          wx.redirectTo({
            url: '../../index/status/status'
          })
        } else {
          console.log("=================error================")
        }
      }
    })
  }
})