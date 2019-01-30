Page({
  data: {
    pubPassengers:true,
    explain:true
  },
  onLoad: function (options) {
    if (options.parame=='pubPassengers'){
      this.setData({ pubPassengers:false})
    }
    if (options.parame == 'explain') {
      this.setData({ explain: false })
    }
  }
})