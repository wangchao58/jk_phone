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
  }
})