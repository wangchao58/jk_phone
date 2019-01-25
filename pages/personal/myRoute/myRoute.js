Page({
  data: {
    tabData: [
      { id: 0, name: "乘客", cont: false, active: "tab-active" },
      { id: 1, name: "车主", cont: true, active: "" }]
  },
  onLoad: function (options) {

  },
  tab: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    for (var i = 0; i < that.data.tabData.length; i++) {
      var active = "tabData[" + i + "].active";
      var cont = "tabData[" + i + "].cont";
      if (that.data.tabData[i].id == id) {
        that.setData({
          [active]: "tab-active",
          [cont]: false
        })
      } else {
        that.setData({
          [active]: "",
          [cont]: true
        })
      }
    }
  },
  callPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber:"123456"
    })
  },
  routeDetailed:function(){
    wx.navigateTo({
      url: '../myRouteDetailed/myRouteDetailed'
    })
  }
})