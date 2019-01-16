Page({
  data: {
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

  },
  carpoolGroup: function () {
    wx.navigateTo({
      url: '../carpoolGroup/carpoolGroup'
    })
  },
  detailed: function () {
    wx.navigateTo({
      url: '../carpoolGroupDetailed/carpoolGroupDetailed'
    })
  },
  carpoolList:function(){
    wx.navigateTo({
      url: '../carpoolGroupList/carpoolGroupList'
    })
  }
})