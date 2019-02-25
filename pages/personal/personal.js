// pages/personal/personal.js
var app = getApp();
Page({
  data: {
    topImg: "",
    userInfo: {},
    nickName: "点击登录",
    numPraise: 0,//点赞总数
    num: 0,//新点赞数
    numDiscuss: 0,//评论总数
    size: 0//新的评论数
  },
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      });
      this.userData(app.globalData.userInfo);
      this.praisenum();
      this.discussnum();
    } 
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.praisenum();
    this.discussnum();
  },
  bindGetUserInfo(e) {
    
    app.globalData.userInfo = e.detail.userInfo
    // const userInfo = res.userInfo
    // const nickName = userInfo.nickName
    // const avatarUrl = userInfo.avatarUrl
    // const gender = userInfo.gender // 性别 0：未知、1：男、2：女
    // const province = userInfo.province
    // const city = userInfo.city
    // const country = userInfo.country
    this.userData(e.detail.userInfo);
  },
  //展示用户信息
  userData: function (userInfo) {
    var that = this;
    var nickName = userInfo.nickName;
    var topImg = userInfo.avatarUrl;
    that.setData({
      nickName: nickName,
      topNameColor: "color:#333",
      topImg: topImg,
      topSm: ""
    });
    var src = app.globalData.src + "/personage/updPersonage";
    var userid = wx.getStorageSync('userid');
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { tId: userid, nickname: nickName, avatarurl: topImg, tSex:userInfo.gender  },
      success(res) {
        if (res.data == 0) { console.log("修改头像姓名失败!") }
        that.information(userid)
      }
    })
  },
  information: function (e) {
    var that = this;
    var src = app.globalData.src + "/personage/seleByKeyPort";
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: { id: e },
      success(res) {
        wx.setStorageSync("userage", res.data.age);
        wx.setStorageSync("userphone", res.data.phone);
        wx.setStorageSync("usersex", res.data.sex);
        wx.setStorageSync("useroccupation", res.data.occupation);
        wx.setStorageSync("userstyle", res.data.style);
        wx.setStorageSync("userdistance", res.data.distance);
        
      }
    })
  },

  // 我的点赞提示
  praisenum: function(){
    var that = this;
    var userid = wx.getStorageSync('userid');
    var src = app.globalData.src + "/praise/totalPraise";
    wx.request({
      url: src,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'fId': userid
      },
      success(res) {
        const numPraise = that.data.numPraise;
        const tPraiseTotal = res.data.tPraiseTotal;
        if (numPraise < tPraiseTotal){
          that.setData({
            num: tPraiseTotal - numPraise,
            numPraise: tPraiseTotal
          });
        }else{
          that.setData({
            num: 0,
            numPraise: tPraiseTotal
          });
        }
      }
    })
  },

  //我的评论提示
  discussnum: function(){
    var that = this;
    var userid = wx.getStorageSync('userid');
    var src = app.globalData.src + "/evaluate/totalEvaluate";
    
    wx.request({
      url: src,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'fId': userid
      },
      success(res) {
        const numDiscuss = that.data.numDiscuss;
        const totalEvaluate = res.data.totalEvaluate;
        if (numDiscuss < totalEvaluate) {
          that.setData({
            size: totalEvaluate - numDiscuss,
            numDiscuss: totalEvaluate
          });
        } else {
          that.setData({
            size: 0,
            numDiscuss: totalEvaluate
          });
        }
      }
    })
  },

  //投诉建议
  news: function () {
    wx.navigateTo({
      url: 'news/news'
    })
  },
  //投诉建议
  propose:function(){
    wx.navigateTo({
      url: 'propose/propose'
    })
  },
  //我的活动
  myActivity:function(){
    wx.navigateTo({
      url: 'myActivity/myActivity'
    })
  },
  //我的店铺
  myShops: function () {
    wx.navigateTo({
      url: 'myShops/myShops'
    })
  },
  //我的收藏
  myCollects:function(){
    wx.navigateTo({
      url: 'myCollects/myCollects'
    })
  },
  //我的行程
  myRoute:function(){
    wx.navigateTo({
      url: 'myRoute/myRoute'
    })
  },
  //我的资讯
  myInformation:function(){
    wx.navigateTo({
      url: 'myInformation/myInformation'
    })
  },
  praise:function(){
    wx.navigateTo({
      url: 'praise/praise'
    })
  },
  myDiscuss:function(){
    wx.navigateTo({
      url: 'myDiscuss/myDiscuss'
    })
  },

  // 联系客服
  callPhone: function (e) {
    wx.navigateTo({
      url: 'service/service'
    })
  },

  // 关于我们
  aboutus: function(){
    wx.navigateTo({
      url: 'about/about'
    })
  },

  // 个人设置
  Setting: function () {
    wx.navigateTo({
      url: 'set/set'
    })
  }
})