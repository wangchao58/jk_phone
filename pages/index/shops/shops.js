var QQMapWX = require('../../images/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var app = getApp();
Page({
  data: {
    photoIco:"../../images/shops-ico01.png",
    imgUrls: [
      "../../images/001.jpg",
      "../../images/002.jpg",
      "../../images/003.jpg"
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    page:1,
    rows:10,
    pages:1,
    storeList:[]
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
        key: app.globalData.mapKey
    });
    this.storeList();
  },
  /**
   * 加载列表
   */
  storeList: function (page,rows) {
    var that = this;
    var src = app.globalData.src + "/store/selectByExampleByPort";
    if(page == null) {
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
      data: { 'page': page, 'rows': rows},
      success(res) {
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

 
  callPhone:function(e){
    var phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function (e) {

    
  },
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    
    var that = this;
    var page = that.data.page + 1;
    that.data.page = page;
    console.log(page);
    console.log(that.data.pages);
    if(page <= that.data.pages) {
      that.storeList(page, that.data.rows);
    }
    
  },
  //解析地址
  analyze:function(e){
    var shopName = e.currentTarget.dataset.name;
    var shopAddress = e.currentTarget.dataset.address;
    qqmapsdk.geocoder({
      address: shopAddress,
      success: function (res) {
        const latitude = res.result.location.lat;
        const longitude = res.result.location.lng;
        wx.openLocation({
          latitude,
          longitude,
          name: shopName,
          address: shopAddress
        })
      }
    })
  },
  detailed: function (e) {
    wx.navigateTo({
      url: '../shopDetailed/shopDetailed?tId='+e.currentTarget.id
    })
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
    wx.request({
      url: app.globalData.src + '/share/insertSelective',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { 'tUserid': wx.getStorageSync('userid'), 'tUrl': '/share/insertSelective' },
      success(res) {
        
      }
    })
  }
})