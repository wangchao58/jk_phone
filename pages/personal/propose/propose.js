// pages/personal/propose/propose.js
var app = getApp();
Page({
  data: {

  },
  onLoad: function(options) {

  },
  callPhone: function() {
    wx.makePhoneCall({
      phoneNumber: "10010"
    })
  },
  //获取资讯评论内容
  discussInput: function(e) {
    this.setData({
      tContent: e.detail.value
    })
  },

  signUp: function() {
    var that = this;
    var tContent = that.data.tContent;
    var userId = wx.getStorageSync('userid');
    if (undefined != tContent) {
      var userId = wx.getStorageSync('userid');
      var src = app.globalData.src + "/complain/addtComplain";
      wx.request({
        url: src,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          userId: userId,
          concate: tContent
        },
        success(res) {
          wx.redirectTo({
            url: '../../index/status/status?statusName=提交成功&statusTxt=感谢您的投诉和建议'
          })
          // wx.showToast({
          //   title: "评论成功"
          // })
        }
      })
    } else {
      wx.showToast({
        title: "评论内容为空"
      })
    }
    //  wx.redirectTo({
    //    url: '../../index/status/status?statusName=提交成功&statusTxt=感谢您的投诉和建议'
    //  })
  }


})