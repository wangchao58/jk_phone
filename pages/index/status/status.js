// pages/index/status/status.js
Page({
  data: {
    iconType: 'success',
    iconColor: 'green',
    statusName:"报名成功",
    statusTxt: "请准时参加活动哦"
  },
  onLoad: function (options) {
     this.setData({
       statusName:options.statusName,
       statusTxt: options.statusTxt
     })
  }
})