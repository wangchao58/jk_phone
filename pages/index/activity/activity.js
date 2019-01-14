var app = getApp();
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
    this.listActivity();
  },
  detailed:function(e){
    var tId = e.currentTarget.id;
    wx.navigateTo({
      url: '../activityDetailed/activityDetailed?tId='+tId
    })
  },
  /**
   * 活动列表
   */
  listActivity: function () {
    var that = this;
    var array = [];
    that.setData({ listActivity: array });
    var src = app.globalData.src + "/activity/getActivityList";
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(res) {
        var listActivity = that.data.listActivity;
        var data = res.data;
        for (var i = 0; i < data.length; i++) {
          listActivity.push(data[i]);
        }
        that.setData({ listActivity: listActivity });
      }
    })
  }
})