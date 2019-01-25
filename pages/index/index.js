var app = getApp();
// 引用公共js
var praise = require("../../js/praise.js");
Page({
  data: {
    imgUrls: [
      "../images/001.jpg",
      "../images/002.jpg"
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    page: 1,
    rows: 10,
    pages: 1,
    listInformation: []
  },
  onLoad: function (options) {
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
        var listInformation = that.data.listInformation;
        var data = res.data.tInformation;
        that.data.pages = res.data.pages;

        if (data.length != 0) {
          for (var i = 0; i < data.length; i++) {
            listInformation.push(data[i]);
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
      // that.setData({
      //   data: result.data,
      //   listInformation: [] 
      // });
      // 回调资讯列表查询
      //that.listInformation();
      
        console.log(result.data);
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
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    var that = this;
    var page = that.data.page + 1;
    that.data.page = page;
    if (page <= that.data.pages) {
      that.listInformation(page, that.data.rows);
    }
  }


})