var QQMapWX = require('../../images/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var app = getApp();
var enshrine = require("../../../js/enshrine.js");
Page({
  data: {

  },
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: app.globalData.mapKey
    });

    this.tStoreData(options.tId);
    this.discussData(options.tId);
  },
  /**
   * 查询数据
   */
  tStoreData: function (id, enshrineViews) {
    console.log("dddddd" + enshrineViews)
    var that = this;
    var src = app.globalData.src + "/store/selectByPrimaryKey";
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { 
        tId: id,
        enshrineViews: enshrineViews 
      },
      success(res) {
        that.setData({
          data: res.data
        });
      }
    })
  },
  /**
  * 商铺留言提交
  */
  discussCommit: function (e) {
    var that = this;
    var tId = e.currentTarget.id;
    var tContent = that.data.tContent;
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
          that.discussData(tId);
          wx.showToast({
            title: "评论成功"
          })
        }
      })
    } else {
      wx.showToast({
        title: "评论内容为空"
      })
    }
  },


  /**
   * 资讯评论数据
   */
  discussData: function (id) {
    var that = this;
    var src = app.globalData.src + "/evaluate/selTEvaluateList";
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        tOtherId: id
      },
      success(res) {
        that.setData({
          shopEvaluateList: res.data,
        });
      }
    })
  },


  //获取资讯评论内容
  discussInput: function (e) {
    this.setData({
      tContent: e.detail.value
    })
  },

  //跳转留言
  shopLiuyan:function(e){
    var tId = e.currentTarget.id;
    console.log("tId" + tId)
    wx.navigateTo({
      url: '../shopLiuyan/shopLiuyan?tId=' + tId
    })
  },

  /**
   * 店铺收藏
   */
  activityEnshrine: function (e) {
    var that = this;
    var tId = e.currentTarget.id;
    var tType = "1";

    //调用公共收藏js方法
    enshrine.enshrine(tId, tType, function (result) {
      if (result.data>=1) {
        wx.showToast({
          title: '成功',
          icon: 'error',
          duration: 1000,
          mask: true
        })
      }
      // 回调活动详情查询（“true”为标识收藏调用，不进行浏览量的计算）
      that.tStoreData(tId, "true");
    })
  },

  callPhone: function (e) {
    var phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },

  toIndex: function (e) {
    wx.switchTab({
      url: '../index'
    })
  },
  //解析地址
  analyze: function (e) {
    var shopName = e.currentTarget.dataset.name;
    var shopAddress = e.currentTarget.dataset.address;
    const longitude = e.currentTarget.dataset.longitude;
    const latitude = e.currentTarget.dataset.latitude;
    console.log("========" + shopName + shopAddress + longitude + latitude)
    wx.openLocation({
      longitude: Number(longitude),
      latitude: Number(latitude),
      name: shopName,
      address: shopAddress
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.request({
      url: app.globalData.src + '/shopDetailed/shopDetailed',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { 'tUserid': wx.getStorageSync('userid'), 'tUrl': '/share/insertSelective' },
      success(res) {

      }
    })
  }
})