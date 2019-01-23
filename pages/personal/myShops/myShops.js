// pages/personal/myShops/myShops.js
Page({
  data: {

  },
  onLoad: function (options) {

  },
  builtShop:function(){
    wx.navigateTo({
      url: '../../publish/pubShop/pubShop'
    })
  },
  editShop:function(){
    wx.navigateTo({
      url: '../myShopsEdit/myShopsEdit'
    })
  },
  detailed:function(){
    wx.navigateTo({
      url: '../../index/shopDetailed/shopDetailed'
    })
  }
})