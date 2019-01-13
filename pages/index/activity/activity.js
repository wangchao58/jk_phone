Page({
  data: {
    imgUrls: [
      "../../images/001.jpg",
      "../../images/002.jpg"
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    listActivity: []
  },
  onLoad: function (options) {

  },
  detailed:function(){
    wx.navigateTo({
      url: '../activityDetailed/activityDetailed'
    })
  },
  /**
   * 活动列表
   */
  listActivity: function (id) {
    var that = this;
    var array = [];
    that.setData({ listActivity: array });
    var src = app.globalData.src + "/activity/getActivityList";
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(res) {
        for (var i = 0; i < res.data.length; i++) {
          var tSite = "listShop[" + i + "].tSite";
          var tHeadline = "listShop[" + i + "].tHeadline";
          var tCreateTime = "listShop[" + i + "].tCreateTime";
          var tImg = "listShop[" + i + "].tImg";
          var tMonry = "listShop[" + i + "].tMonry";
          var tId = "listShop[" + i + "].tId";
          var imgsrc = app.globalData.src + "/file/download?fileName=" + res.data[i].tImg;
          if (res.data[i].portrait.length == 0) {
            imgsrc = "http://www.lisiyang.name/list-shop.jpg"
          }
          that.setData({
            [tSite]: res.data[i].tSite,
            [tHeadline]: res.data[i].tHeadline,
            [tCreateTime]: res.data[i].tCreateTime,
            [timg]: imgsrc,
            [tMonry]: res.data[i].tMonry,
            [tId]: res.data[i].tId
          });
        }
      }
    })
  }
})