// pages/personal/myCollects/myCollects.js
var app = getApp();
var enshrine = require("../../../js/enshrine.js");
Page({
  data: {
    page: 1,
    rows: 10,
    pages: 1,
    enshrineList:[],
    tabData: [
      { id: 0, name: "全部", cont: false, active: "tab-active" },
      { id: 2, name: "活动", cont: true, active: "" },
      { id: 1, name: "店铺", cont: true, active: "" }]
  },
  onLoad: function (options) {
    this.enshrineList(1,10,'');
  },
  enshrineList: function (page, rows, tType) {
    var that = this;
    if (page == null) {
      page = that.data.page;
      rows = that.data.rows;
    }
    var src = app.globalData.src + "/enshrine/selEnshrineListByport";
    wx.showLoading({
      title: '玩命加载中',
    })
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { pId: wx.getStorageSync('userid'), tType: tType, 'page': page, 'rows': rows, },
      success(res) {
       
        if (page == 1) {
          that.setData({ enshrineList: [] });
        }
        var enshrineList = that.data.enshrineList;
        var data = res.data.listENshrice;
        that.data.pages = res.data.pages;

        for (var i = 0; i < data.length; i++) {
          enshrineList.push(data[i]);
        }
        that.setData({ enshrineList: enshrineList });
        // 隐藏加载框
        wx.hideLoading();
      }
    })
  },
  tab: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    for (var i = 0; i < that.data.tabData.length; i++) {
      var active = "tabData[" + i + "].active";
      if (that.data.tabData[i].id == id) {
        if(id==0){
          this.enshrineList(1, 10, '');
        } else {
          this.enshrineList(1, 10, id);
        }
        
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
  remove:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var tType = e.currentTarget.dataset.g;
    var tId = e.currentTarget.id;
    

    wx.showModal({
      title: '提示',
      content: '确定要删除该收藏么',
      success(res) {
        if (res.confirm) {
          //调用公共收藏js方法
          enshrine.enshrine(tId, tType, function (result) {
            if (result.data >= 1) {
              var message = that.data.enshrineList;
              message.splice(index, 1);
              that.setData({
                enshrineList: message
              });
              wx.showToast({
                title: '成功',
                icon: 'error',
                duration: 1000,
                mask: true
              })
            }
            
            // 回调活动详情查询（“true”为标识收藏调用，不进行浏览量的计算）
            //that.activityData(tId, "true");
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  callPhone: function (e) {
    var phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  detailed: function () {
    wx.navigateTo({
      url: '../../index/shopDetailed/shopDetailed'
    })
  },
  activity: function () {
    wx.navigateTo({
      url: '../../index/activityDetailed/activityDetailed'
    })
  }
})