var app = getApp();
Page({
  data: {
    imgUrls: [
      "../../images/001.jpg",
      "../../images/002.jpg"
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    page: 1,
    rows: 10,
    pages: 1,
    listActivity: []
  },
  onLoad: function (options) {
    this.listActivity();
  },
  detailed:function(e){
    var tId = e.currentTarget.id;
    wx.navigateTo({
      url: '../activityDetailed/activityDetailed?tId='+tId
    })
  },

  /**
   * 列表数据查询获取查询条件
   */
  selInput: function (e) {
    this.setData({
      selInput: e.detail.value
    })
  },

  /**
   * 活动列表
   */
  listActivity: function (page, rows) {
    var that = this;
    var selInput = this.data.selInput;
    
    var src = app.globalData.src + "/activity/getActivityList";
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
        'tHeadline': selInput,
        'page': page, 
        'rows': rows
      },
      success(res) {
        var listActivity = that.data.listActivity;
        var data = res.data.activitytList;
        that.data.pages = res.data.pages;

        if (data.length != 0){
          for (var i = 0; i < data.length; i++) {
            listActivity.push(data[i]);
          }
          that.setData({ listActivity: listActivity });
        }else{
          that.setData({ listActivity: [] });
        }
        // 隐藏加载框
        wx.hideLoading();
      }
    })
  },

  /**
   * 条件查询
   */
  selActivity: function () {
    var that = this;
    var selInput = this.data.selInput;
    if (selInput != null && selInput != '') {
      that.listActivity(1, 10);
    } else {
      wx.showToast({
        title: '请输入要搜索的内容',
        icon: 'none',
        duration: 2000
      })
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
      that.listActivity(page, that.data.rows);
    }
  }

})

