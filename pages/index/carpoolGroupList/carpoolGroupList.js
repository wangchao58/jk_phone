Page({
  data: {

  },
  onLoad: function (options) {

    console.log(options.tDestination);
    console.log(options.tPoint);
  },
 listDetailed:function(){
   wx.navigateTo({
     url: '../carpoolListDetailed/carpoolListDetailed'
   })
 }
})