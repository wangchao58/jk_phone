var QQMapWX = require('../../images/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var app = getApp();
Page({
  data: {
    photoIco:"../../images/shops-ico01.png",
    imgUrls: [
      "../../images/001.jpg",
      "../../images/002.jpg",
      "../../images/003.jpg"
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500
  },
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
        key: app.globalData.mapKey
    });
  },
  detailed: function () {
    wx.navigateTo({
      url: '../activityDetailed/activityDetailed'
    })
  },
  callPhone:function(e){
    var phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  //解析地址
  analyze:function(e){
    var shopName = e.currentTarget.dataset.name;
    var shopAddress = e.currentTarget.dataset.address;
    qqmapsdk.geocoder({
      address: shopAddress,
      success: function (res) {
        const latitude = res.result.location.lat;
        const longitude = res.result.location.lng;
        wx.openLocation({
          latitude,
          longitude,
          name: shopName,
          address: shopAddress
        })
      }
    })
  },
  detailed: function () {
    wx.navigateTo({
      url: '../shopDetailed/shopDetailed'
    })
  }
})