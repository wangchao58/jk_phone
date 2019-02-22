// pages/personal/myShops/myShops.js
var app = getApp();
Page({
  data: {
    page: 1,
    rows: 10,
    pages: 1,
    storeList: []
  },
  onLoad: function (options) {

    this.storeList(1,10);
  },

  /**
   * 加载列表
   */
  storeList: function (page, rows) {
    var that = this;
    var src = app.globalData.src + "/store/selectByExampleByPort";
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
      data: { 'page': page, 'rows': rows, 'tIssuer': wx.getStorageSync('userid') },
      success(res) {
        if (page == 1) {
          that.setData({ storeList: [] });
        }
        var storeList = that.data.storeList;
        var data = res.data.tStoreList;
        that.data.pages = res.data.pages;

        for (var i = 0; i < data.length; i++) {
          storeList.push(data[i]);
        }
        that.setData({ storeList: storeList });
        // 隐藏加载框
        wx.hideLoading();
      }
    })
  },

  builtShop:function(){
    wx.navigateTo({
      url: '../../publish/pubShop/pubShop'
    })
  },
  editShop:function(e){
    var tId = e.currentTarget.id;
    wx.navigateTo({
      url: '../../publish/pubShop/pubShop?tId=' + tId
    })
  },
  detailed:function(e){
    var tId = e.currentTarget.id;
    wx.navigateTo({
      url: '../../index/shopDetailed/shopDetailed?tId=' + tId
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
      that.storeList(page, that.data.rows);
    }
  }
})