var app = getApp();
var fileUpload = require("../../../js/fileUpload.js");
Page({
  data: {
    groupImg:"../../images/pic_05.png",
    photos: []
  },
  onLoad: function(options) {

  },
  carGroupForm: function(e) {
    var that = this;
    var tGroupName = e.detail.value.tGroupName
    var tGroupImg = that.data.groupImg;
    if (null != tGroupName && app.globalData.userInfo) {
      var userId = wx.getStorageSync('userid');
      var src = app.globalData.src + "/carGroup/insertSelective";
      var userId = wx.getStorageSync('userid');
      wx.request({
        url: src,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          tGroupName: tGroupName,
          tGroupImg: tGroupImg,
          tIntroduction: e.detail.value.tIntroduction,
          tIssuer: userId,
          tExplain: e.detail.value.tExplain,
          tAttribution: e.detail.value.tAttribution,
          tGroupLord: e.detail.value.tGroupLord,
          tGroupCode: e.detail.value.tGroupCode
        },
        success(res) {
          if (res.data > 0) {
            wx.showModal({
              title: '友情提示',
              content: '提交成功，请加客服微信号进行审核通过',
              confirmText: '复制微信',
              cancelText: '先不发布',
              success(resc) {
                if (resc.confirm) {
                  setTimeout(function () {
                    wx.redirectTo({
                      url: '../customService/customService'
                    })
                  }, 1000)
                } else if (resc.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
            // wx.showToast({
            //   title: '提交成功',
            //   icon: 'success',
            //   duration: 2000
            // })
            
          } else {
            wx.showToast({
              title: "发布失败"
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '友情提示',
        content: '内容不能为空或未登录',

      })
    }
   

  },
  /**
     * 选择图片方法
     */
  chooseImage: function () {
    var that = this;
    var count = 1;//可上传照片数
    if (true) {
      wx.showActionSheet({
        itemList: ["从相册中选择", "拍照"],
        itemColor: "#f7982a",
        success: function (res) {
          if (!res.cancel) {
            if (res.tapIndex == 0) {
              // 调用公共收藏js方法(从相册中选择)
              fileUpload.chooseImgByOne("album", count, function (result) {
                that.setData({
                  groupImg: result,
                  imgShow: false
                });
                that.upLoadImg(result);
              })
            } else if (res.tapIndex == 1) {
              //调用公共收藏js方法(拍照)
              fileUpload.chooseImg("camera", count, function (result) {
                that.setData({
                  groupImg: result
                });
                that.upLoadImg(result);
              })
            }
          }
        }
      })
    } else {
      wx.showToast({
        title: '最多上传3张图片',
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

    //公共js
    fileUpload.imageUpload(path, function (result) {
      // that.setData({
      //   photos: result,
      //   imgShow: false
      // })
    })
  },
  protocol:function(){
    wx.navigateTo({
      url: '../../publish/protocol/protocol?parame=pubPassengers'
    })
  },
  explain:function(){
    wx.navigateTo({
      url: '../../publish/protocol/protocol?parame=explain'
    })
  }
})