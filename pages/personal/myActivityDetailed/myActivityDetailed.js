// pages/personal/myActivityDetailed/myActivityDetailed.js
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
    photoIco: "../../images/shops-ico01.png",
    applyDataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.activityData(options.tId);
    this.applyDataList(options.tId, options.participation);
  },

  /**
   * 活动详情信息
   */
  activityData: function (id, enshrineViews) {
    var that = this;
    var userId = wx.getStorageSync('userid');
    var src = app.globalData.src + "/activity/getActivityByTid";
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        tId: id,
        enshrineViews: enshrineViews,
        pId: userId
      },
      success(res) {
        that.setData({
          data: res.data
        });
      }
    })
  },

  /**
   * 参加信息
   */
  applyDataList: function (id, participation) {
    var that = this;
    var src = app.globalData.src + "/activity/activityApplyByPortList";
    var userId = '';
    if (participation == '1'){
      var userId = wx.getStorageSync('userid');
    }
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        tId: id,
        pId: userId
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

  callPhone: function (e) {
    var phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone
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