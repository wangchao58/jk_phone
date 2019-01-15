// pages/index/activityDetailed/activityDetailed.js
var app = getApp();
// 引用公共js
var enshrine = require("../../../js/enshrine.js");
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
    this.activityData(options.tId);
  },

  /**
 * 活动详情信息
 */
  activityData: function (id, enshrineViews) {
    var that = this;
    var src = app.globalData.src + "/activity/getActivityByTid";
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { tId: id,
        enshrineViews: enshrineViews },
      success(res) {
        that.setData({
          data: res.data
        });
      }
    })
  },

/**
 * 活动收藏
 */
  activityEnshrine: function (e) {
    var that = this;
    var tId = e.currentTarget.id;
    var tType = "2";
    wx.setStorageSync('tId', tId);
    wx.setStorageSync('tType', tType);

    //调用公共收藏js方法
    enshrine.enshrine(function (result) {
      that.setData({
        data: result.data
      });
      // 回调活动详情查询（“true”为标识收藏调用，不进行浏览量的计算）
      that.activityData(tId, "true");
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})