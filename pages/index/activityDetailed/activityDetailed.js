// pages/index/activityDetailed/activityDetailed.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("-----------------" + options.tId+"-------------------")
    console.log("-----------------" + wx.getStorageSync("tId")+"-------------------")
    this.activityData();
  },

  /**
 * 活动详情信息
 */
  activityData: function (id) {
    var that = this;
    var src = app.globalData.src + "/activity/getActivityByTid";
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { tId: id },
      success(res) {
        that.setData({
          tImg: res.data.tImg,
          tHeadline: res.data.tHeadline,
          tViewsNum: res.data.tViewsNum,
          tCollectionNum: res.data.tCollectionNum,
          tStartTime: res.data.tStartTime,
          tEndTime: res.data.tEndTime,
          tNickName: res.data.tNickName,
          tSite: res.data.tSite,
          tPhone: res.data.tPhone,
          tContent: res.data.tContent
        });
      }
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