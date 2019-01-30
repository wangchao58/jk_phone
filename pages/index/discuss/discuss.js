var app = getApp();
// 引用公共js
var praise = require("../../../js/praise.js");
Page({
  data: {
    
  },
  onLoad: function (options) {
    // 资讯查询
    this.informationData(options.tId);
    // 评论查询
    this.discussData(options.tId);
  },
  
  /**
   * 资讯详情评论页面
   */
  informationData:function(id){
    var that = this;
    var userId = wx.getStorageSync('userid');
    var src = app.globalData.src + "/information/getInformationByTid";
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        tId: id,
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
   * 资讯评论数据
   */
  discussData: function(id){
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
          discussList: res.data,
          discussNum: res.data.length,
          discuss: ""
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
   * 资讯评论提交
   */
  discussCommit: function (e) {
    var that = this;
    var tId = e.currentTarget.id;
    var tContent = this.data.tContent;
    if (undefined != tContent){
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
          tType: "3"
        },
        success(res) {
          that.informationData(tId);
          that.discussData(tId);
          wx.showToast({
            title: "评论成功"
          })
        }
      })
    }else{
      wx.showToast({
        title: "评论内容为空"
      })
    }
  },

  /**
   * 资讯点赞
   */
  informationPraise: function (e) {
    var that = this;
    var tId = e.currentTarget.id;
    var tType = '3';
    //调用公共点赞js方法
    praise.clickPraise(tId, tType, function (result) {
      // 回调资讯列表查询
      that.informationData(tId);
      that.discussData(tId);
    })
  },
  
})