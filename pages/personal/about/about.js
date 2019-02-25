var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    email: "",
    topimg: "",
    tab: [{ name: "小鲸通", active: "active", cont: false },
    { name: "经营模式", active: "", cont: true },
    { name: "加入我们", active: "", cont: true }],
    employ: []

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.about();
    this.employ();
  },
  //联系方式等信息
  about: function () {
    var that = this;
    var src = app.globalData.src + "/trecruitInfo/trecruitInfoData";

    wx.request({
      url: src,
      method: 'POST',
      success(res) {
        var topimg = app.globalData.src + "/file/download?fileName=" + res.data.topImage;
        that.setData({
          topimg: topimg,
          phone: res.data.phone,
          email: res.data.email,
        })
      }
    })
  },
  //招聘信息
  employ: function () {
    var that = this;
    var src = app.globalData.src + "/recruit/listRecruitByPort";
    wx.request({
      url: src,
      method: 'POST',
      success(res) {
        for (var i = 0; i < res.data.length; i++) {
          var name = "employ[" + i + "].name";
          var time = "employ[" + i + "].time";
          var address = "employ[" + i + "].address";
          var salary = "employ[" + i + "].salary";
          var time1 = res.data[i].createTime.substr(0, 10);
          that.setData({
            [name]: res.data[i].job,
            [time]: time1,
            [address]: res.data[i].sear,
            [salary]: res.data[i].salary
          });
        }
      }
    })
  },
  tab: function (e) {
    var that = this;
    var id = e.target.id;
    for (var i = 0; i < that.data.tab.length; i++) {
      var active = "tab[" + i + "].active";
      var cont = "tab[" + i + "].cont";
      if (that.data.tab[i].name == id) {
        that.setData({
          [active]: "active",
          [cont]: false
        });
      } else {
        that.setData({
          [active]: "",
          [cont]: true
        });
      }
    }
  },
  join: function () {
    var email = this.data.email;
    var url = '../join/join?email=' + email
    wx.navigateTo({
      url: url
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})