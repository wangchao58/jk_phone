// pages/personal/news/news.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applyDataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.applyDataList(options.tId);
  },

  /**
    * 参加信息
    */
  applyDataList: function (id) {
    var that = this;
    var src = app.globalData.src + "/activity/activityApplyByPortList";
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        pId:  wx.getStorageSync('userid')
      },
      success(res) {
        var applyDataList = that.data.applyDataList;
        for (var i = 0; i < res.data.listApply.length; i++) {
          applyDataList.push(res.data.listApply[i]);
        }
        that.setData({ applyDataList: applyDataList });
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