var app = getApp();
// 引用公共js
var praise = require("../../js/praise.js");
Page({
  data: {
    imgUrls: [
      "../images/001.jpg",
      "../images/002.jpg"
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    listInformation: []
  },
  onLoad: function (options) {
    this.listInformation();
  },
  information:function(){
    wx.navigateTo({
      url: 'information/information'
    })
  },
  activity: function () {
    wx.navigateTo({
      url: 'activity/activity'
    })
  },
  shops:function(){
    wx.navigateTo({
      url: 'shops/shops'
    })
  },
  carpool: function () {
    wx.navigateTo({
      url: 'carpool/carpool'
    })
  },
  /**
   * 资讯列表
   */
  listInformation: function () {
    var that = this;
    var array = [];
    that.setData({ listInformation: array });
    var src = app.globalData.src + "/information/getInformationList";
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(res) {
        var listInformation = that.data.listInformation;
        var data = res.data;
        for (var i = 0; i < data.length; i++) {
          listInformation.push(data[i]);
        }
        that.setData({ listInformation: listInformation });
      }
    })
  },

  /**
   * 首页资讯点赞
   */
  informationPraise: function (e) {
    var that = this;
    var tId = e.currentTarget.id;
    var tType= '3';
    wx.setStorageSync('tId', tId);
    wx.setStorageSync('tType', tType);
    //调用公共点赞js方法
    praise.clickPraise(function (result) {
      that.setData({
        data: result.data
      });
      // 回调资讯列表查询
      that.listInformation();
    })
  }


})