var app = getApp();
var QQMapWX = require("./qqmap-wx-jssdk.min.js");
var qqmapsdk = new QQMapWX({
  key: "VV4BZ-WGU6J-NBQFZ-KBMLJ-5P4LZ-YAFEM"
})
/**
 * 根据地址信息获取坐标
 */
function coordinate(str,result) {
  console.log("========" + str)
  qqmapsdk.geocoder({
    address: str,
    success: function (res) {
      console.log("经度" + res.result.location.lng + "纬度" + res.result.location.lat);
      result(res);
    }
  })
}

//转化成小程序模板语言 这一步非常重要 不然无法正确调用
module.exports = {
  coordinate: coordinate
};

