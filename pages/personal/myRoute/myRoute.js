var app = getApp();
Page({
  data: {
    tabData: [
      { id: 0, name: "乘客", cont: false, active: "tab-active" },
      { id: 1, name: "车主", cont: true, active: "" }],
    page: 1,
    rows: 10,
    pages: 1,
    carOwnerList: [],
  },
  onLoad: function (options) {
    this.carOwnerList(1,10);
  },
  /**
   * 加载列表
   */
  carOwnerList: function (page, rows) {
    var that = this;
    var src = app.globalData.src + "/carOwner/selectByExampleByPort";
    var userId = wx.getStorageSync('userid');
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
      data: { 'page': page, 'rows': rows, 'tIssuer': userId },
      success(res) {
        if (page == 1) {
          that.setData({ carOwnerList: [] });
        }

        var carOwnerList = that.data.carOwnerList;
        var data = res.data.tCarOwnerList;
        that.data.pages = res.data.pages;

        for (var i = 0; i < data.length; i++) {
          carOwnerList.push(data[i]);
        }
        that.setData({ carOwnerList: carOwnerList });
        // 隐藏加载框
        wx.hideLoading();
      }
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
      that.carOwnerList(page, that.data.rows, that.data.tOwner);
    }

  },
  tab: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    for (var i = 0; i < that.data.tabData.length; i++) {
      var active = "tabData[" + i + "].active";
      var cont = "tabData[" + i + "].cont";
      if (that.data.tabData[i].id == id) {
        that.setData({
          [active]: "tab-active",
          [cont]: false
        })
      } else {
        that.setData({
          [active]: "",
          [cont]: true
        })
      }
    }
  },
  callPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber:"123456"
    })
  },
  routeDetailed:function(){
    wx.navigateTo({
      url: '../myRouteDetailed/myRouteDetailed'
    })
  }
})