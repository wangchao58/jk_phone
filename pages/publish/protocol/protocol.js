Page({
  data: {
    pubPassengers:true
  },
  onLoad: function (options) {
    if (options.parame=='pubPassengers'){
      this.setData({ pubPassengers:false})
    }
  }
})