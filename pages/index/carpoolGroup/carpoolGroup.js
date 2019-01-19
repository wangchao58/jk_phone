// pages/index/carpoolGroup/carpoolGroup.js
var app = getApp();
Page({
  data: {
    page: 1,
    rows: 10,
    carGroupList: [],
    tGroupName: '',
    pages: 1
  },
  onLoad: function (options){
    this.carGroupList(1, 10,'');
  },
  carGroupList: function (page, rows, tGroupName) {
    var that = this;
    var src = app.globalData.src + "/carGroup/selectByExampleByPort";
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
      data: { 'page': page, 'rows': rows, 'tGroupName': tGroupName },
      success(res) {
        var carGroupList = that.data.carGroupList;
        var data = res.data.carGroupList;
        that.data.pages = res.data.pages;
        for (var i = 0; i < data.length; i++) {
          carGroupList.push(data[i]);
        }
        that.setData({ carGroupList: carGroupList });
        // 隐藏加载框
        wx.hideLoading();
      }
    })
  },
  carGroupInquire: function (e) {
    var that = this;
    var tGroupName = that.data.tGroupName; 
    console.log(tGroupName);
    if (tGroupName != null && tGroupName !='') {
      this.carGroupList(1, 10, tGroupName);
    } else {
      wx.showToast({
        title: '请输入要搜索的内容',
        icon:'none',
        duration: 2000
      })
    }
  },
  selInput: function (e) {
    this.setData({
      tGroupName: e.detail.value
    })
  },
  detailed:function(e){
    var tId = e.currentTarget.id;
    //console.log(tId);
    wx.navigateTo({
      url: '../carpoolGroupDetailed/carpoolGroupDetailed?tId='+tId
    })
  },
  join:function(){
    wx.navigateTo({
      url: '../carpoolGroupApply/carpoolGroupApply'
    })
  }
})