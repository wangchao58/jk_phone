// pages/index/information/information.js
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
        for (var i = 0; i < res.data.length; i++) {
          var tContent = "listShop[" + i + "].tContent";
          var tCreateTime = "listShop[" + i + "].tCreateTime";
          var tImg = "listShop[" + i + "].tImg";
          var tPraise = "listShop[" + i + "].tPraise";
          var tEvaluate = "listShop[" + i + "].tEvaluate";
          var tNickName = "listShop[" + i + "].tNickName";// 用户昵称
          var tAvatarUrl = "listShop[" + i + "].tAvatarUrl";// 用户头像
          var tId = "listShop[" + i + "].tId";
          var imgsrc = app.globalData.src + "/file/download?fileName=" + res.data[i].tImg;
          if (res.data[i].portrait.length == 0) {
            imgsrc = "http://www.lisiyang.name/list-shop.jpg"
          }
          that.setData({
            [tContent]: res.data[i].tContent,
            [tCreateTime]: res.data[i].tCreateTime,
            [timg]: imgsrc,
            [tPraise]: res.data[i].tPraise,
            [tEvaluate]: res.data[i].tEvaluate,
            [tNickName]: res.data[i].tNickName,
            [tAvatarUrl]: res.data[i].tAvatarUrl,
            [tId]: res.data[i].tId
          });
        }
      }
    })
  }

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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