Page({
  data: {

  },
  onLoad: function (options) {

  },
  customService: function () {
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    })
    setTimeout(function(){
      wx.redirectTo({
        url: '../customService/customService'
      })
    },1000)
    
  }
})