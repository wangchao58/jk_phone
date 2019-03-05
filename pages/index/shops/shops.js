var QQMapWX = require('../../../js/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var app = getApp();
Page({
  data: {
    photoIco: "../../images/shops-ico01.png",
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    page: 1,
    rows: 10,
    pages: 1,
    imgUrl: app.globalData.src + "/file/download?fileName=",
    storeList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    qqmapsdk = new QQMapWX({
      key: app.globalData.mapKey
    });

    this.thisCity();
    this.listSlide();
  },
  /**
  * 轮播图
  */
  listSlide: function () {
    var that = this;
    var src = app.globalData.src + "/slideshow/listSlideshowByPort";

    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        'tstatus': 3
      },
      success(res) {
        var imgUrls = that.data.imgUrls;
        for (var i = 0; i < res.data.length; i++) {
          imgUrls.push(res.data[i]);
        }
        that.setData({ imgUrls: imgUrls });

      }
    })
  },
  /**
  * 跳转页面
  */
  urlDetail: function (e) {
    var tId = e.currentTarget.id;
    console.log(tId);
    wx.navigateTo({
      url: '/imgUrl/imgUrl?imgUrl=' + tId
    })
  },
  /**
   * 加载列表
   */
  storeList: function(page, rows, tStoreName) {
    var that = this;
    var longitude = wx.getStorageSync('longitude');
    var latitude = wx.getStorageSync('latitude');
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
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'page': page,
        'rows': rows,
        'tStoreName': tStoreName,
        'province': that.data.province,
        'city': that.data.city,
        'district': that.data.district,
        'longitude': longitude,
        'latitude': latitude
      },
      success(res) {
        if (tStoreName != '' && page == 1) {
          that.setData({
            storeList: []
          });
        }
        var storeList = that.data.storeList;
        var data = res.data.tStoreList;
        that.data.pages = res.data.pages;

        for (var i = 0; i < data.length; i++) {
          storeList.push(data[i]);
        }
        that.setData({
          storeList: storeList
        });
        // 隐藏加载框
        wx.hideLoading();
      }
    })
  },
  selInput: function(e) {
    this.setData({
      tStoreName: e.detail.value
    })
  },
  tStoreInquire: function(e) {
    var that = this;
    var tStoreName = that.data.tStoreName;
    if (tStoreName != null && tStoreName != '') {
      this.storeList(1, 10, tStoreName);
    } else {
      wx.showToast({
        title: '请输入要搜索的内容',
        icon: 'none',
        duration: 2000
      })
    }
  },
  callPhone: function(e) {
    var phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function(e) {


  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    var tStoreName = that.data.tStoreName;
    var page = that.data.page + 1;
    that.data.page = page;
    if (page <= that.data.pages) {
      that.storeList(page, that.data.rows, tStoreName);
    }

  },
  //解析地址
  analyze: function (e) {
    var shopName = e.currentTarget.dataset.name;
    var shopAddress = e.currentTarget.dataset.address;
    const longitude = e.currentTarget.dataset.longitude;
    const latitude = e.currentTarget.dataset.latitude;

    console.log("========" + shopName + shopAddress + longitude + latitude)
    wx.openLocation({
      longitude: Number(longitude),
      latitude: Number(latitude),
      name: shopName,
      address: shopAddress
    })
  },	 

  /**
   * 获取当前城市名称
   */
  thisCity: function() {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(addressRes) {
            console.log(addressRes.result.address_component);

            var address = addressRes.result.formatted_addresses.recommend;
            that.setData({
              province: addressRes.result.address_component.province,
              city: addressRes.result.address_component.city,
              district: addressRes.result.address_component.district,
            })
            that.storeList(1, 10, '');
          }
        })
      },
      fail: function() {
        that.storeList(1, 10, '');
        // wx.showToast({
        //   title: '授权失败',
        //   icon: 'success',
        //   duration: 1000
        // })
      }

    })
  },
  detailed: function(e) {
    wx.navigateTo({
      url: '../shopDetailed/shopDetailed?tId=' + e.currentTarget.id
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    wx.request({
      url: app.globalData.src + '/share/insertSelective',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'tUserid': wx.getStorageSync('userid'),
        'tUrl': '/share/insertSelective'
      },
      success(res) {

      }
    })
  }
})