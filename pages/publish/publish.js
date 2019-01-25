var app = getApp();
Page({
  data: {

  },
  onLoad: function (options) {
    if (!app.globalData.userInfo) {
      wx.showModal({
        title: '友情提示',
        content: '您还未登录，请在‘我的’登录后进行发布',
        confirmText: '去登录',
        cancelText: '在想想',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../personal/personal'
            })
          }
        }
      })
    }
    
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
  },
  pubPassengers:function(){
    wx.navigateTo({
      url: 'pubPassengers/pubPassengers'
    })
  },
  pubCarOwner: function () {
    wx.navigateTo({
      url: 'pubCarOwner/pubCarOwner'
    })
  }
})