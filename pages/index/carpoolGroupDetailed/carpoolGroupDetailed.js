var app = getApp();
Page({
  data: {

  },
  onLoad: function (options) {
    this.tCarGroupData(options.tId);
  },
  /**
   * 加载单条数据
   */
  tCarGroupData: function (id) {
    var that = this;
    var src = app.globalData.src + "/carGroup/selectByPrimaryKey";
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { tId: id },
      success(res) {
        that.setData({
          data: res.data
        });
      }
    })
  },
  customService:function(){
    wx.navigateTo({
      url: '../customService/customService'
    })
  }
})