// pages/index/information/information.js
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
    listInformation: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.listInformation();
  },

  /**
   * 资讯列表
   */
  listInformation: function () {
    var that = this;
    var array = [];
    that.setData({ listInformation: array });
    var src = app.globalData.src + "/information/getInformationList";
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(res) {
        var listInformation = that.data.listInformation;
        var data = res.data;
        for (var i = 0; i < data.length; i++) {
          listInformation.push(data[i]);
        }
        that.setData({ listInformation: listInformation });
      }
    })
  },

  /**
   * 资讯评论
   */
  discussDetail: function (e) {
    var tId = e.currentTarget.id;
    wx.navigateTo({
      url: '../discuss/discuss?tId=' + tId
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
    let that = this;
    return {
      title: '资讯分享', // 转发后 所显示的title
      path: 'pages/index/information/information' // 相对的路径
    }
  }
})