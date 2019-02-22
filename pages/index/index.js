var app = getApp();
// 引用公共js
var praise = require("../../js/praise.js");
Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    page: 1,
    rows: 10,
    pages: 1,
    imgUrl: app.globalData.src + "/file/download?fileName=",
    listInformation: []
  },
  onLoad: function (options) {
    this.listInformation();
    this.listSlide();
  },

  onShow: function(){
    this.listInformation();
  },

  information:function(){
    wx.navigateTo({
      url: 'information/information'
    })
  },
  activity: function () {
    wx.navigateTo({
      url: 'activity/activity'
    })
  },
  shops:function(){
    wx.navigateTo({
      url: 'shops/shops'
    })
  },
  carpool: function () {
    wx.navigateTo({
      url: 'carpool/carpool'
    })
  },
  /**
   * 资讯列表
   */
  listInformation: function (page, rows) {
    var that = this;
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
        'rows': rows
      },
      success(res) {
        that.setData({ listInformation: [] });
        var listInformation = that.data.listInformation;
        var data = res.data.tInformation;
        that.data.pages = res.data.pages;

        for (var i = 0; i < data.length; i++) {
          listInformation.push(data[i]);
        }
        that.setData({ listInformation: listInformation });
        
        // 隐藏加载框
        wx.hideLoading();
      }
    })
  },
  /**
   * 轮播图
   */
  listSlide: function () {
    var that = this;
    var src = app.globalData.src + "/slideshow/listSlideshowByPort";
   
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        'tstatus': 1
      },
      success(res) {
        var imgUrls = that.data.imgUrls;
        for (var i = 0; i < res.data.length; i++) {
          imgUrls.push(res.data[i]);
        }
        that.setData({ imgUrls: imgUrls });
       
      }
    })
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
   * 首页资讯点赞
   */
  informationPraise: function (e) {
    var index = e.currentTarget.dataset.index;
    
    var that = this;
    var tId = e.currentTarget.id;
    var tType= '3';
    wx.setStorageSync('tId', tId);
    wx.setStorageSync('tType', tType);
    //调用公共点赞js方法
    praise.clickPraise(tId,tType,function (result) {

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
            message[i].tPraise = result.data
          }
        }
        that.setData({
          listInformation: message
        })
    })
  },

  /**
   * 资讯评论
   */
  discussDetail: function (e){
    var tId = e.currentTarget.id;
    wx.navigateTo({
      url: 'discuss/discuss?tId=' + tId
    })
  },


  /**
   * 跳转页面
   */
  urlDetail: function (e) {
    var tId = e.currentTarget.id;
    console.log(tId);
    wx.navigateTo({
      url: '/imgUrl/imgUrl?imgUrl=' + tId
    })
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
  onPullDownRefresh: function(){
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    var page = that.data.page;
    if(page > 1){
      page = that.data.page - 1;
      that.data.page = page;
    }else{
      page = that.data.page;
    }
    that.listInformation(page, that.data.rows);
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  }


})