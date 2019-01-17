// pages/index/carpoolGroup/carpoolGroup.js
Page({
  data: {

  },
  onLoad: function (options){

  },
  detailed:function(){
    wx.navigateTo({
      url: '../carpoolGroupDetailed/carpoolGroupDetailed'
    })
  },
  join:function(){
    wx.navigateTo({
      url: '../carpoolGroupApply/carpoolGroupApply'
    })
  }
})