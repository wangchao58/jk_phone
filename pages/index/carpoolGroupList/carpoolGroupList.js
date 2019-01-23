var app = getApp();
var QQMapWX = require('../../../js/qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: app.globalData.mapKey // 必填
});
Page({
  data: {
    tabData:[
      {id: 0, name:"全部",cont:false,active:"tab-active"},
      {id: 1, name: "乘客", cont: true, active: "" },
      {id: 2, name: "车主", cont: true, active: "" }],
    page: 1,
    rows: 10,
    pages: 1,
    carOwnerList: [],
    tPoint:'',
    tOwner:'',
    tDestination:''
  },
  onLoad: function (options) {
    var that = this;
    that.data.tPoint = options.tPoint;
    that.data.tDestination = options.tDestination;
    this.carOwnerList(options.tPoint, options.tDestination,1,10,0);
  },
  tab:function(e){
    var that=this;
    var id = e.currentTarget.id;
    that.data.tOwner = id;
    that.carOwnerList(that.data.tPoint, that.data.tDestination, 1, 10, id);
    for(var i=0;i < that.data.tabData.length;i++){
      var active ="tabData["+i+"].active";
      if (that.data.tabData[i].id==id){
         that.setData({
           [active]:"tab-active"
         })
      }else{
        that.setData({
          [active]: ""
        })
      }
    }
  },
  /**
   * 加载列表
   */
  carOwnerList: function (tPoint, tDestination, page, rows, tOwner) {
    var that = this;
    var src = app.globalData.src + "/carOwner/selectByExampleByPort";
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
      data: { 'page': page, 'rows': rows, 'tPoint': tPoint, 'tDestination': tDestination, 'tOwner': tOwner},
      success(res) {
        
        if (page==1) {
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
      that.carOwnerList(that.data.tPoint,
        that.data.tDestination, page, that.data.rows, that.data.tOwner);
    }

  },
 listDetailed:function(e){
   var id = e.currentTarget.id;
   wx.navigateTo({
     url: '../carpoolListDetailed/carpoolListDetailed?id='+id
   })
 },
  formSubmit(e) {
    var _this = this;
    //调用地址解析接口
    qqmapsdk.geocoder({
      //获取表单传入地址
      address: e, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
      success: function (res) {//成功后的回调
        console.log(res);
        var res = res.result;
        var latitude = res.location.lat;
        var longitude = res.location.lng;
        //根据地址解析在地图上标记解析地址位置
        // console.log(latitude + ',' + longitude);
        // console.log(longitude);
        var latAndlong = latitude + ',' + longitude;
        
        return latAndlong;
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.request({
      url: app.globalData.src + '/shopDetailed/shopDetailed',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { 'tUserid': wx.getStorageSync('userid'), 'tUrl': '/carpoolGroupList/carpoolGroupList' },
      success(res) {

      }
    })
  }
})