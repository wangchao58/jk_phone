var QQMapWX = require('../../images/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var app = getApp();
Page({
  data: {

  },
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: app.globalData.mapKey
    });
  },
  callPhone: function (e) {
    var phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone
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
  
})