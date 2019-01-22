var app = getApp();
Page({
  data: {
    imgUrls: [
      "../../images/001.jpg",
      "../../images/002.jpg",
      "../../images/003.jpg"
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    tPoint: '',
    page: 1,
    rows: 3,
    carGroupList:[],
    pages: 1
  },
  onLoad: function (options) {

    this.carGroupList(1,3);
  },
  carGroupList: function (page, rows) {

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
      data: { 'page': page, 'rows': rows },
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
  carpoolGroup: function () {
    wx.navigateTo({
      url: '../carpoolGroup/carpoolGroup'
    })
  },
  detailed: function (e) {
    var tId = e.currentTarget.id;
    wx.navigateTo({
      url: '../carpoolGroupDetailed/carpoolGroupDetailed?tId=' + tId
    })
  },
  carpoolList:function(e){
    var that = this;
    var tPoint = e.detail.value.tPoint; 
    var tDestination = e.detail.value.tDestination; 
    wx.navigateTo({
      url: '../carpoolGroupList/carpoolGroupList?tPoint=' + tPoint + '&tDestination=' + tDestination
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.request({
      url: app.globalData.src + '/share/shopDetailed',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { 'tUserid': wx.getStorageSync('userid'), 'tUrl': '/carpool/carpool' },
      success(res) {

      }
    })
  }
})