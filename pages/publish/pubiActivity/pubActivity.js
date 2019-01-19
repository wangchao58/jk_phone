// pages/publish/pubiActivity/pubActivity.js
Page({
  data: {
    imgShow:true,
    startdate: "开始日期",
    starttime:"开始时间",
    enddate: "结束日期",
    endtime: "结束时间"
  },
  onLoad: function (options) {

  },
  startDateChange(e) {
    this.setData({
      startdate: e.detail.value
    });
    this.bindTimeChange()
  },
  startTimeChange(e) {
    this.setData({
      starttime: e.detail.value
    })
  },
  endDateChange(e) {
    this.setData({
      enddate: e.detail.value
    });
    this.bindTimeChange()
  },
  endTimeChange(e) {
    this.setData({
      endtime: e.detail.value
    })
  }
})