// pages/publish/pubiActivity/pubActivity.js
var app= getApp();
// 引用公共js
var fileUpload = require("../../../js/fileUpload.js");
const innerAudioContext = wx.createInnerAudioContext();
Page({
  data: {
    imgShow:true,
    startdate: "开始日期",
    starttime:"开始时间",
    enddate: "结束日期",
    endtime: "结束时间",
    photos: []
  },
  onLoad: function (options) {
    if (options.tId != null) {
      this.activityData(options.tId);
    }
  },

  onShow: function(){
    innerAudioContext.src = "http://i.bjjkkj.com/sound/sound.mp3"
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
  },
  endDateChange(e) {
    this.setData({
      enddate: e.detail.value
    });
  },
  endTimeChange(e) {
    this.setData({
      endtime: e.detail.value
    })
  },

  /**
   * 活动编辑详情信息
   */
   activityData: function (id) {
    var that = this;
     var src = app.globalData.src + "/activity/selActivityByPrimaryKey";
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        tId: id,
      },
      success(res) {
        console.log(res.data);
        console.log(res.data.tImg)
        that.setData({
          data: res.data,
          tImg: res.data.tImg,
          startdate: res.data.startdate,
          starttime: res.data.starttime,
          enddate: res.data.enddate,
          endtime: res.data.endtime
        });
      }
    })
  },

  /**
     * 选择图片方法
     */
  chooseImage: function () {
    var that = this;
    var count = 1;//可上传照片数
    if (true) {
      wx.showActionSheet({
        itemList: ["从相册中选择", "拍照"],
        itemColor: "#f7982a",
        success: function (res) {
          if (!res.cancel) {
            if (res.tapIndex == 0) {
              // 调用公共收藏js方法(从相册中选择)
              fileUpload.chooseImg("album", count, function (result) {
                that.setData({
                  tImg: result
                });
                that.upLoadImg(result);
              })
            } else if (res.tapIndex == 1) {
              //调用公共收藏js方法(拍照)
              fileUpload.chooseImg("camera", count, function (result) {
                that.setData({
                  tImg: result
                });
                that.upLoadImg(result);
              })
            }
          }
        }
      })
    } else {
      wx.showToast({
        title: '最多上传3张图片',
        duration: 2000
      })
    }
  },

  upLoadImg: function (list) {
    var that = this;
    this.upload(that, list);
  },

  /**
   * 上传多张图片
   */
  upload: function (page, path) {
    var that = this;
    //公共js
    fileUpload.imageUpload(path, function (result) {
      that.setData({
        tImg: result,
        imgShow: false
      })
    })
  },

  //删除已选图片方法
  removeimg: function (e) {
    var tImg = this.data.photos;
    var index = e.currentTarget.id
    tImg.splice(index, 1)
    this.setData({
      tImg: tImg
    })
  },

  /**
   * 编辑活动提交
   */
  activityForm: function (e) {
    var that = this;
    var tHeadline = e.detail.value.tHeadline;
    if (that.data.startdate == '开始日期' || that.data.starttime == '开始时间' ){
      wx.showToast({
        title: "开始日期不能为空"
      })
      return ;
    }
    if (that.data.enddate == '结束日期' || that.data.endtime == '结束时间') {
      wx.showToast({
        title: "结束日期不能为空"
      })
      return ;
    }
    if (null != tHeadline && app.globalData.userInfo) {
      var userId = wx.getStorageSync('userid');
      var photosUrl = that.data.tImg;
      var src = app.globalData.src + "/activity/addActivity";
      wx.request({
        url: src,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          tId: e.detail.value.tId,
          pId: userId,
          tImg: photosUrl,
          tHeadline: e.detail.value.tHeadline,
          tStartTime: e.detail.value.tStartTime,
          tEndTime: e.detail.value.tEndTime,
          tSite: e.detail.value.tSite,
          tMoney: e.detail.value.tMoney,
          tPhone: e.detail.value.tPhone,
          tWeixing: e.detail.value.tWeixing,
          tContent: e.detail.value.tContent
        },
        success(res) {
          // 声音播放
          innerAudioContext.play();
          if (res.data > 0) {
            wx.showToast({
              title: "发布成功"
            })
            wx.redirectTo({
              url: '../../index/activity/activity'
            })
          } else {
            wx.showToast({
              title: "发布失败"
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '友情提示',
        content: '内容不能为空或未登录',

      })
    }
  }

})