var app = getApp();
/**
 * 点赞
 */
function clickPraise(tId,tType,result) {
  var userId = wx.getStorageSync('userid');
  console.log(userId);
  var src = app.globalData.src + "/praise/addPraise";
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
  clickPraise: clickPraise
};

