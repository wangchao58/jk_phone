// pages/index/enshrine/enshrine.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.activityEnshrine(options.tId, options.tType)
  },

/**
 * 收藏
 */
  activityEnshrine: function (id, tType){
    var userId = wx.getStorageSync('userid');
    var that = this;
    var src = app.globalData.src + "/enshrine/addEnshrine";
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { 
        hId: id,
        tType: tType,
        pId: userId
      },
      success(res) {
        that.setData({
          data: res.data
        });
      }
    })
  }

})