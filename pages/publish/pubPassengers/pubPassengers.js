// pages/publish/pubiActivity/pubActivity.js
var app = getApp();
Page({
  data: {
    imgShow: true,
    startdate: "出发日期",
    starttime: "出发时间"
  },
  onLoad: function (options) {

  },
  /**
  * 发布个人提交
  */
  passengersForm: function (e) {
    var that = this;
    var tLinkman = e.detail.value.tLinkman;
    var tDepartDate = e.detail.value.tDepartDate;
    var tDepartMin = e.detail.value.tDepartMin;
    if (tDepartDate == '出发日期' || tDepartMin =='出发时间') {
      wx.showToast({
        title: "出发时间不能为空"
      })
      return ;
    }
    if (null != tLinkman) {
      var userId = wx.getStorageSync('userid');
      var src = app.globalData.src + "/carOwner/insertSelective";
      wx.request({
        url: src,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          tLinkman: e.detail.value.tLinkman,
          tPhone: e.detail.value.tPhone,
          tIssuer: userId,
          tPoint: e.detail.value.tPoint,
          tDestination: e.detail.value.tDestination,
          tDepart: tDepartDate + ' ' + tDepartMin,
          tVacantSeat: e.detail.value.tVacantSeat,
          tFare: e.detail.value.tFare,
          tWechat: e.detail.value.tWechat,
          tOwner: 1,
          tExplain: e.detail.value.tExplain
        },
        success(res) {
          if (res.data > 0) {
            wx.showToast({
              title: "发布成功"
            })
            wx.navigateTo({
              url: '../../index/carpoolGroupList/carpoolGroupList'
            })
          } else {
            wx.showToast({
              title: "发布失败"
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: "内容不能为空"
      })
    }
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