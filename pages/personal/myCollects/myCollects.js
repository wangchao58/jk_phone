// pages/personal/myCollects/myCollects.js
Page({
  data: {
    tabData: [
      { id: 0, name: "全部", cont: false, active: "tab-active" },
      { id: 1, name: "活动", cont: true, active: "" },
      { id: 2, name: "店铺", cont: true, active: "" }]
  },
  onLoad: function (options) {

  },
  tab: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    for (var i = 0; i < that.data.tabData.length; i++) {
      var active = "tabData[" + i + "].active";
      if (that.data.tabData[i].id == id) {
        that.setData({
          [active]: "tab-active"
        })
      } else {
        that.setData({
          [active]: ""
        })
      }
    }
  },
  remove:function(){
    wx.showModal({
      title: '提示',
      content: '确定要删除该收藏么',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  callPhone: function (e) {
    var phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone
    })
  }
})