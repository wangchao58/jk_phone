// pages/personal/propose/propose.js
Page({
  data: {

  },
  onLoad: function (options) {

  },
  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber:"10010"
    })
  },
 signUp: function () {
   wx.redirectTo({
     url: '../../index/status/status?statusName=提交成功&statusTxt=感谢您的投诉和建议'
   })
  }

  
})