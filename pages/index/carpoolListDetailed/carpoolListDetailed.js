var app = getApp();
var QQMapWX = require('../../../js/qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk ;
Page({
  data: {
    longitude: 116.4965075,
    latitude: 40.006103,
    speed: 0,
    accuracy: 0
  },
  onLoad: function (options) {
    var that = this;
    qqmapsdk = new QQMapWX({
      key: app.globalData.mapKey
    });
    that.carOwnerEntity(options.id)
    this.driving();
  },
  /**
   * 加载列表
   */
  carOwnerEntity: function (id) {
    var that = this;
    var src = app.globalData.src + "/carOwner/selectByPrimaryKey";
    wx.showLoading({
      title: '玩命加载中',
    })
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { 'tId': id },
      success(res) {
        //that.setData({ carOwnerList: carOwnerList });
        that.setData({
          data: res.data
        });
        // 隐藏加载框
        wx.hideLoading();
      }
    })
  },
  callPhone: function (e) {
    var phone = e.currentTarget.dataset.phone;
    console.log(phone);
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  //事件回调函数
  driving: function () {
    var that = this;
    wx.showLoading({
      title: "定位中",
      mask: true
    })
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            var address = addressRes.result.formatted_addresses.recommend;
            that.setData({
              city: address
            })
          }
        })
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        that.setData({
          longitude:longitude,
          latitude: latitude,
          speed: speed,
          accuracy: accuracy
        })
        
      },
      // 定位失败回调
      fail:function(){
        wx.showToast({
          title:"定位失败",
          icon:"none"
        })
      },
    })
  },
  //   var mapKey = app.globalData.mapKey;
  //   //网络请求设置
  //   var opt = {
  //     //WebService请求地址，from为起点坐标，to为终点坐标，开发key为必填
  //     // url: 'https://apis.map.qq.com/ws/direction/v1/driving/?from=39.989221,116.306076&to=39.828050,116.436195&key=' + mapKey,
  //     url: 'https://apis.map.qq.com/ws/direction/v1/driving/?from=&to=&key=' + mapKey,
  //     method: 'GET',
  //     dataType: 'json',
  //     //请求成功回调
  //     success: function (res) {
  //       console.log(res)
  //       var ret = res.data
  //       if (ret.status != 0) return; //服务异常处理
  //       var coors = ret.result.routes[0].polyline, pl = [];
  //       //坐标解压（返回的点串坐标，通过前向差分进行压缩）
  //       var kr = 1000000;
  //       for (var i = 2; i < coors.length; i++) {
  //         coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
  //       }
  //       //将解压后的坐标放入点串数组pl中
  //       for (var i = 0; i < coors.length; i += 2) {
  //         pl.push({ latitude: coors[i], longitude: coors[i + 1] })
  //       }
  //       //设置polyline属性，将路线显示出来
  //       _this.setData({
  //         polyline: [{
  //           points: pl,
  //           color: '#2CD057DD',
  //           width: 5
  //         }]
  //       })
  //     }
  //   };
  //   wx.request(opt);
  // },
   
//  wx.getLocation({
//       type: 'gcj02',
//       altitude:true,//高精度定位
//       //定位成功，更新定位结果
//       success: function (res) {
//         var latitude = res.latitude
//         var longitude = res.longitude
//         var speed = res.speed
//         var accuracy = res.accuracy
       
//         that.setData({
//           longitude:longitude,
//           latitude: latitude,
//           speed: speed,
//           accuracy: accuracy
//         })
//       },
//       //定位失败回调
//       fail:function(){
//         wx.showToast({
//           title:"定位失败",
//           icon:"none"
//         })
//       },
 
//       complete:function(){
//         //隐藏定位中信息进度
//         wx.hideLoading()
//       }
 
//     })
//   }, 
})