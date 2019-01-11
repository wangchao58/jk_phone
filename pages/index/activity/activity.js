Page({
  data: {
    imgUrls: [
      "../../images/001.jpg",
      "../../images/002.jpg"
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500
  },
  onLoad: function (options) {

  },
detailed:function(){
  wx.navigateTo({
    url: '../activityDetailed/activityDetailed'
  })
}
})