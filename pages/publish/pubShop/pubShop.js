
var app = getApp();
// 引用公共js
var fileUpload = require("../../../js/fileUpload.js");
Page({
  data: {
    imgShow: true,
    startdate: "开始日期",
    starttime: "开始时间",
    enddate: "结束日期",
    endtime: "结束时间",
    photos: []
  },
  onLoad: function (options) {

  },

  /**
   * 发布商铺提交
   */
  shopForm: function (e) {
    var that = this;
    var tStoreName = e.detail.value.tStoreName;
    if (null != tStoreName) {
      var userId = wx.getStorageSync('userid');
      var photosUrl = that.data.photos;
      console.log(photosUrl[0]);
      var src = app.globalData.src + "/store/insertSelective";
      wx.request({
        url: src,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          tPicture: photosUrl[0],
          tIssuer: userId,
          tStoreName: e.detail.value.tStoreName,
          tSite: e.detail.value.tSite,
          tPhone: e.detail.value.tPhone,
          tWechat: e.detail.value.tWechat,
          tExplain: e.detail.value.tExplain
        },
        success(res) {
          if (res.data > 0) {
            wx.showToast({
              title: "发布成功"
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
              fileUpload.chooseImgByOne("album", count, function (result) {
                that.setData({
                  photos: result,
                  imgShow: false
                });
                that.upLoadImg(result);
              })
            } else if (res.tapIndex == 1) {
              //调用公共收藏js方法(拍照)
              fileUpload.chooseImg("camera", count, function (result) {
                that.setData({
                  photos: result
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
      // that.setData({
      //   photos: result,
      //   imgShow: false
      // })
    })
  },

  //删除已选图片方法
  removeimg: function (e) {
    var photos = this.data.photos;
    var index = e.currentTarget.id
    photos.splice(index, 1)
    this.setData({
      photos: photos
    })
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