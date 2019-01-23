// pages/personal/personal.js
Page({
  data: {

  },
  onLoad: function (options) {

  },
  //投诉建议
  propose:function(){
    wx.navigateTo({
      url: 'propose/propose'
    })
  },
  //我的活动
  myActivity:function(){
    wx.navigateTo({
      url: 'myActivity/myActivity'
    })
  },
  //我的店铺
  myShops: function () {
    wx.navigateTo({
      url: 'myShops/myShops'
    })
  }
})