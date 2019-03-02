// pages/index/shopLiuyan/shopLiuyan.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tId: options.tId
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

  },

  //获取店铺留言内容
  discussInput: function (e) {
    this.setData({
      tContent: e.detail.value
    })
  },

  /**
  * 商铺留言提交
  */
  discussCommit: function () {
    var that = this;
    var tContent = that.data.tContent;
    var tId = this.data.tId;
    if (undefined != tContent) {
      var userId = wx.getStorageSync('userid');
      var src = app.globalData.src + "/evaluate/addEvaluate";
      wx.request({
        url: src,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          tOtherId: tId,
          tContent: tContent,
          pId: userId,
          tType: "1"
        },
        success(res) {
          wx.showToast({
            title: "留言成功"
          })
          wx.navigateTo({
            url: '../shopDetailed/shopDetailed?tId=' + tId
          })
        }
      })
    } else {
      wx.showToast({
        title: "留言内容为空"
      })
    }
  },
})