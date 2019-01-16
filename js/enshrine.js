var app = getApp();
/**
 * 收藏
 */
function enshrine(tId,tType,result) {
  var userId = wx.getStorageSync('userid');
  var src = app.globalData.src + "/enshrine/addEnshrine";
  wx.request({
    url: src,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: {
      hId: tId,
      tType: tType,
      pId: userId
    },
    success(res) {
      result(res);
    }
  })
}

//转化成小程序模板语言 这一步非常重要 不然无法正确调用
module.exports = {
  enshrine: enshrine
};

