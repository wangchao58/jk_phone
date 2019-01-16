// pages/index/signUp/signUp.js
var app = getApp();
// 引用公共js
var fileUpload = require("../../../js/fileUpload.js");
Page({
  data: {
    tPhone: "",
    tIntroduction: "",
    tId: ""
  },

  onLoad: function (options) {
    this.setData({
      tId: options.tId
    })
  },

  //获取报名电话号码
  tPhoneInput: function (e) {
    this.setData({
      tPhone: e.detail.value
    })
  },
  //报名信息介绍
  tIntroductionInput: function (e) {
    this.setData({
      tIntroduction: e.detail.value
    })
  },

  /**
   * 活动报名
   */
  signUp: function () {
    var that = this;
    var tPhone = this.data.tPhone;
    var tIntroduction = this.data.tIntroduction;
    var tId = this.data.tId;
    var userId = wx.getStorageSync('userid');
    var src = app.globalData.src + "/activity/activityApply";
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        hId: tId,
        tPhone: tPhone,
        tIntroduction: tIntroduction,
        pId: userId
      },
      success(res) {
        if(res.data>0){
          wx.redirectTo({
            url: '../status/status'
          })
        }else{
          console.log("=================error================")
        }
      }
    })
  },

  chooseImg:function(){
    var that = this;
    //调用公共收藏js方法
    fileUpload.chooseImg(function (result) {
      that.setData({
        photos: result
      });
    })
  },

  uploadImg:function(e){
    var that = this;
    var filePath = e.currentTarget.id;
    //调用公共收藏js方法
    fileUpload.uploadImg(filePath, function (result) {
      that.setData({
        data: result.data
      });
    })
  }
  

})
