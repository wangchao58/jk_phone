// pages/personal/personal.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    age: "",
    phone: "",
    sex: "",
    style: "",
    occupation: "",
    distance: "",
    arrow: "../../../assets/img/right-btn.png",
    topImg: "../../../assets/img/topImg.png",
    topName: "点击登录",
    topSm: "亲，您还没有登录~",
    topNameColor: "color:#666",
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    active: "person-row"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var topName = this.data.userInfo.nickName;
    var topImg = this.data.userInfo.avatarUrl;
    this.setData({
      topName: topName,
      topNameColor: "color:#333",
      topImg: topImg,
      topSm: "懂剪发更懂你"
    })
    this.information()
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //展示用户设置信息
  information: function () {
    var userage = wx.getStorageSync("userage");
    if (userage) { var age = userage } else { var age = "未设置"; }
    var userphone = wx.getStorageSync("userphone");
    if (userphone) { var phone = userphone } else { var phone = "未设置"; }
    var usersex = wx.getStorageSync("usersex");
    if (usersex) { var sex = usersex } else { var sex = "未设置" }
    var useroccupation = wx.getStorageSync("useroccupation");
    if (useroccupation) { var occupation = useroccupation } else { var occupation = "未设置" }
    var userstyle = wx.getStorageSync("userstyle");
    if (userstyle) { var style = userstyle } else { var style = "未设置" }
    var userdistance = wx.getStorageSync("userdistance");
    if (userdistance) { var distance = userdistance } else { var distance = "未设置" }
    this.setData({
      age: age,
      phone: phone,
      sex: sex,
      occupation: occupation,
      style: style,
      distance: distance
    })
  },

  age: function () {
    wx.navigateTo({
      url: '../setOption/setOption?title=修改年龄'
    })
  },
  phone: function () {
    wx.navigateTo({
      url: '../phone/phone'
    })
  },
  sex: function () {
    wx.navigateTo({
      url: '../setOption/setOption?title=性别'
    })
  },
  style: function () {
    wx.navigateTo({
      url: '../setOption/setOption?title=风格定位'
    })
  },
  occupation: function () {
    wx.navigateTo({
      url: '../setOption/setOption?title=职业属性'
    })
  },
  distance: function () {
    wx.navigateTo({
      url: '../setOption/setOption?title=到店距离'
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
    this.information()
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