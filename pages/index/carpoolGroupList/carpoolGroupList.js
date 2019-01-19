Page({
  data: {
       tabData:[{name:"全部",cont:false,active:"tab-active"},
         { name: "乘客", cont: true, active: "" },
         { name: "车主", cont: true, active: "" }]
  },
  onLoad: function (options) {

    console.log(options.tDestination);
    console.log(options.tPoint);
  },
  tab:function(e){
    var that=this;
    var id = e.currentTarget.id;
    for(var i=0;i<that.data.tabData.length;i++){
      var active ="tabData["+i+"].active";
      var cont = "tabData["+i+"].cont";
      if (that.data.tabData[i].name==id){
         that.setData({
           [active]:"tab-active",
           [cont]:false
         })
      }else{
        that.setData({
          [active]: "",
          [cont]: true
        })
      }
    }
  },
 listDetailed:function(){
   wx.navigateTo({
     url: '../carpoolListDetailed/carpoolListDetailed'
   })
 }
})