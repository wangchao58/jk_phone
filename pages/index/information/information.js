// pages/index/information/information.js
var app = getApp();
var praise = require("../../../js/praise.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    page: 1,
    rows: 10,
    pages: 1,
    listInformation: [] 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.listInformation();
  },

  // onShow: function(){
  //   this.listInforRefresh();
  // },

  /**
   * 列表数据查询获取查询条件
   */
  selInput: function (e) {
    this.setData({
      selInput: e.detail.value
    })
  },

  /**
   * 资讯列表
   */
  listInformation: function (page, rows) {
    var that = this;
    var selInput = this.data.selInput;
    var userId = wx.getStorageSync('userid');
    var src = app.globalData.src + "/information/getInformationList";
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
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        'tContent': selInput,
        'page': page,
        'rows': rows,
        'pId': userId
      },
      success(res) {
        if (selInput != '' && page == 1) {
          that.setData({ listInformation: [] });
        }
        var listInformation = that.data.listInformation;
        var data = res.data.tInformation;
        that.data.pages = res.data.pages;
        if (data.length != 0) {
          for (var i = 0; i < data.length; i++) {
            listInformation.push(data[i]);
            listInformation[i].tPraise = data[i].tPraise;
            listInformation[i].tEvaluate = data[i].tEvaluate;
            listInformation[i].praiseId = data[i].praiseId;
          }
          that.setData({ listInformation: listInformation });
        } else {
          that.setData({ listInformation: [] });
        }
        // 隐藏加载框
        wx.hideLoading();
      }
    })
  },

  /**
   * 下拉刷新数据
   */
  listInforRefresh: function (page, rows) {
    var that = this;
    var userId = wx.getStorageSync('userid');
    var src = app.globalData.src + "/information/getInformationList";
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
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        'page': page,
        'rows': rows,
        'pId': userId
      },
      success(res) {
        that.setData({ listInformation: [] });
        var listInformation = that.data.listInformation;
        var data = res.data.tInformation;
        that.data.pages = res.data.pages;
        if (data.length != 0) {
          for (var i = 0; i < data.length; i++) {
            listInformation.push(data[i]);
            listInformation[i].tPraise = data[i].tPraise;
            listInformation[i].tEvaluate = data[i].tEvaluate;
            listInformation[i].praiseId = data[i].praiseId;
          }
          that.setData({ listInformation: listInformation });
        } else {
          that.setData({ listInformation: [] });
        }
        // 隐藏加载框
        wx.hideLoading();
      }
    })
  },

  /**
     * 资讯评论
     */
  discussDetail: function (e) {
    var tId = e.currentTarget.id;
    wx.navigateTo({
      url: '../../index/discuss/discuss?tId=' + tId
    })
  },

  /**
   * 首页资讯点赞
   */
  informationPraise: function (e) {
    var index = e.currentTarget.dataset.index;
    var that = this;
    var tId = e.currentTarget.id;
    var tType = '3';
    wx.setStorageSync('tId', tId);
    wx.setStorageSync('tType', tType);
    //调用公共点赞js方法
    praise.clickPraise(tId, tType, function (result) {
      // that.setData({
      //   data: result.data,
      //   listInformation: [] 
      // });
      // 回调资讯列表查询
      //that.listInformation();
        var message = that.data.listInformation;
        for (let i in message) { //遍历列表数据
          if (i == index) { //根据下标找到目标
            var collectStatus = true
            if (message[i].tPraise <= result.data) { //如果是没点赞+1
              collectStatus = true
            } else {
              collectStatus = false
            }
            wx.showToast({
              title: collectStatus ? '点赞成功' : '取消成功',
            })
            if (collectStatus) {
              message[i].praiseImage = "../../images/index-ico05-hover.png";
            } else {
              message[i].praiseImage = "../../images/index-ico05.png";
            }
            message[i].tPraise = result.data
          }
        }
        that.setData({
          listInformation: message
        })
    })
  },
  /**
   * 条件查询
   */
  selInformation: function () {
    var that = this;
    that.listInformation(1, 10);
  },
  imgck: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
    return {
      title: '资讯分享', // 转发后 所显示的title
      path: 'pages/index/information/information' // 相对的路径
    }
  },

  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    var that = this;
    var page = that.data.page + 1;
    that.data.page = page;
    if (page <= that.data.pages) {
      that.listInformation(page, that.data.rows);
    }
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    var page = 1;
    that.data.page = page;
    that.listInforRefresh(page, that.data.rows);
    wx.hideNavigationBarLoading(); //完成停止加载
    wx.stopPullDownRefresh(); //停止下拉刷新
  }
})