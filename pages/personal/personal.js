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
  }
})