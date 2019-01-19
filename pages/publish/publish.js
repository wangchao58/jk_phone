Page({
  data: {

  },
  onLoad: function (options) {

  },
  pubiInfor:function (){
    wx.navigateTo({
      url: 'pubiInfor/pubiInfor'
    })
  },
  pubActivity:function(){
    wx.navigateTo({
      url: 'pubiActivity/pubActivity'
    })
  },
  pubShop:function(){
    wx.navigateTo({
      url: 'pubShop/pubShop'
    })
  }
})