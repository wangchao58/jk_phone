// pages/publish/pubiActivity/pubActivity.js
Page({
  data: {
    imgShow: true,
    startdate: "出发日期",
    starttime: "出发时间"
  },
  onLoad: function (options) {

  },
  startDateChange(e) {
    this.setData({
      startdate: e.detail.value
    });
  },
  startTimeChange(e) {
    this.setData({
      starttime: e.detail.value
    })
  }
})