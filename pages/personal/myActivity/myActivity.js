var app = getApp();
Page({
  data: {
    listActivity: [],
    page: 1,
    rows: 10,
    pages: 1,
    tabData: [
      { id: 0, name: "我发起的", cont: false, active: "tab-active" },
      { id: 1, name: "我参与的", cont: true, active: "" }]
  },
  onLoad: function (options) {
    this.activityList(1, 10,'');
  },
  tab: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    for (var i = 0; i < that.data.tabData.length; i++) {
      var active = "tabData[" + i + "].active";
      if (that.data.tabData[i].id == id) {
        this.activityList(1, 10, id);
        that.setData({
          [active]: "tab-active"
        })
      } else {
        that.setData({
          [active]: ""
        })
      }
    }
  },

  /**
   * 加载列表
   */
  activityList: function (page, rows, participation) {
    var that = this;
    var src = app.globalData.src + "/activity/getActivityList";
    if (page == null) {
      page = that.data.page;
      rows = that.data.rows;
    }
    var userId = wx.getStorageSync('userid');
    wx.showLoading({
      title: '玩命加载中',
    })
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { 'page': page, 'rows': rows, 'pId': userId, participation: participation},
      success(res) {
        if (page == 1) {
          that.setData({ listActivity: [] });
        }
        var listActivity = that.data.listActivity;
        var data = res.data.activitytList;
        that.data.pages = res.data.pages;

        for (var i = 0; i < data.length; i++) {
          listActivity.push(data[i]);
        }
        that.setData({ listActivity: listActivity });
        // 隐藏加载框
        wx.hideLoading();
      }
    })
  },

  myActivityDetailed: function (e) {
    var tId =e.currentTarget.id;
    wx.navigateTo({
      // url: '../myActivityDetailed/myActivityDetailed'
      url: '../../index/activityDetailed/activityDetailed?tId=' + tId
    })
  },
})