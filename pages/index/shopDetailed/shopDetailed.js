var QQMapWX = require('../../images/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var app = getApp();
var enshrine = require("../../../js/enshrine.js");
Page({
  data: {

  },
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: app.globalData.mapKey
    });

    this.tStoreData(options.tId);
  },
  /**
   * 
   */
  tStoreData: function (id) {
    var that = this;
    var src = app.globalData.src + "/store/selectByPrimaryKey";
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { tId: id },
      success(res) {
        that.setData({
          data: res.data
        });
      }
    })
  },
  /**
   * 店铺收藏
   */
  activityEnshrine: function (e) {
    var that = this;
    var tId = e.currentTarget.id;
    var tType = "1";

    //调用公共收藏js方法
    enshrine.enshrine(tId, tType, function (result) {
      if (result.data>=1) {
        wx.showToast({
          title: '成功',
          icon: 'error',
          duration: 1000,
          mask: true
        })
      }
      that.setData({
        //data: result.data
      });
      // 回调活动详情查询（“true”为标识收藏调用，不进行浏览量的计算）
      //that.activityData(tId, "true");
    })
  },

  callPhone: function (e) {
    var phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },

  toIndex: function (e) {
    wx.switchTab({
      url: '../index'
    })
  },
  //解析地址
  analyze: function (e) {
    var shopName = e.currentTarget.dataset.name;
    var shopAddress = e.currentTarget.dataset.address;
    console.log(shopAddress)
    qqmapsdk.geocoder({
      address: shopAddress,
      success: function (res) {
        const latitude = res.result.location.lat;
        const longitude = res.result.location.lng;
        console.log(latitude)
        wx.openLocation({
          latitude,
          longitude,
          name: shopName,
          address: shopAddress
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.request({
      url: app.globalData.src + '/shopDetailed/shopDetailed',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { 'tUserid': wx.getStorageSync('userid'), 'tUrl': '/share/insertSelective' },
      success(res) {

      }
    })
  }
})