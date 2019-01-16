var app = getApp();
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
    var src = app.globalData.src + "/information/getInformationByTid";
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        tId: id
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
          discussNum: res.data.length
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

  /**
   * 资讯评论提交
   */
  discussCommit: function (e) {
    var that = this;
    var tId = e.currentTarget.id;
    var tContent = this.data.tContent;
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
      }
    })
  }
  
})