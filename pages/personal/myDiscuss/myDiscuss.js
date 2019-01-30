// pages/personal/myDiscuss/myDiscuss.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    rows: 10,
    pages: 1,
    evaluateList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.evaluateList(1,10);
  },
  /**
     * 评论列表
     */
  evaluateList: function (page, rows) {
    var that = this;
    var userid = wx.getStorageSync('userid');
    var src = app.globalData.src + "/evaluate/selTEvaluateListByPort";
    if (page == null) {
      page = that.data.page;
      rows = that.data.rows;
    }
    wx.showLoading({
      title: '玩命加载中',
    })
    wx.request({
      url: src,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'fId': userid,
        'page': page,
        'rows': rows
      },
      success(res) {
        var evaluateList = that.data.evaluateList;
        var data = res.data.listEvaluate;
        that.data.pages = res.data.pages;

        if (data.length != 0) {
          for (var i = 0; i < data.length; i++) {
            evaluateList.push(data[i]);
          }
          that.setData({
            evaluateList: evaluateList
          });
        } else {
          that.setData({
            evaluateList: []
          });
        }
        // 隐藏加载框
        wx.hideLoading();
      }
    })
  },

  /**
  * 点赞评论
  */
  discussDetail: function (e) {
    var tId = e.currentTarget.id;
    wx.navigateTo({
      url: '../../index/discuss/discuss?tId=' + tId
    })
  },
  /**
  * 商铺列表
  */
  shopDetail: function (e) {
    var tId = e.currentTarget.id;
    wx.navigateTo({
      url: '../../index/shopDetailed/shopDetailed?tId=' + tId
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
    var that = this;
    var page = that.data.page + 1;
    that.data.page = page;
    if (page <= that.data.pages) {
      that.evaluateList(page, that.data.rows);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})