// pages/personal/personal.js
Page({
  data: {

  },
  onLoad: function (options) {

  },
  //投诉建议
  news: function () {
    wx.navigateTo({
      url: 'news/news'
    })
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
  },
  //我的收藏
  myCollects:function(){
    wx.navigateTo({
      url: 'myCollects/myCollects'
    })
  },
  //我的行程
  myRoute:function(){
    wx.navigateTo({
      url: 'myRoute/myRoute'
    })
  },
  //我的资讯
  myInformation:function(){
    wx.navigateTo({
      url: 'myInformation/myInformation'
    })
  },
  praise:function(){
    wx.navigateTo({
      url: 'praise/praise'
    })
  }
})