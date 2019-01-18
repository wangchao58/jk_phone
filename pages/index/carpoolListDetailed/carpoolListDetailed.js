var app = getApp();
Page({
  data: {
  },
  onLoad: function (options) {
    this.driving()
  },
  //事件回调函数
  driving: function () {
    var _this = this;
    var mapKey = app.globalData.mapKey;
    //网络请求设置
    var opt = {
      //WebService请求地址，from为起点坐标，to为终点坐标，开发key为必填
      url: 'https://apis.map.qq.com/ws/direction/v1/driving/?from=40.068829,116.428415&to=39.828050,116.436195&key=' + mapKey,
      method: 'GET',
      dataType: 'json',
      //请求成功回调
      success: function (res) {
        console.log(res)
        var ret = res.data
        if (ret.status != 0) return; //服务异常处理
        var coors = ret.result.routes[0].polyline, pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        //设置polyline属性，将路线显示出来
        _this.setData({
          polyline: [{
            points: pl,
            color: '#2CD057DD',
            width: 5
          }]
        })
      }
    };
    wx.request(opt);
  },

})