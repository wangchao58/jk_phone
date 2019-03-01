
var app = getApp();
// 引用公共js
var fileUpload = require("../../../js/fileUpload.js");
var isblank = require("../../../js/blank.js");
const innerAudioContext = wx.createInnerAudioContext();
Page({
  data: {
    imgShow: true,
    startdate: "开始日期",
    starttime: "开始时间",
    enddate: "结束日期",
    endtime: "结束时间",
    tPicture: '',
    region: ['省', '市', '区'],
    max: 500 //最多字数
  },
  onLoad: function (options) {
    
    if (options.tId != null) {
      this.shopData(options.tId);
    }
    
  },

  onShow: function () {
    innerAudioContext.src = "http://i.bjjkkj.com/sound/sound.mp3"
  },

  /**
   * 商铺详情信息
   */
  shopData: function (id) {
    var that = this;
    
    var src = app.globalData.src + "/store/selectByPrimaryKey";
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        tId: id,
      },
      success(res) {
        var len = parseInt(res.data.tExplain.length);
        that.setData({
          data: res.data,
          tPicture: res.data.tPicture,
          currentWordNumber: len
        });
      }
    })
  },
  /**
   * 发布商铺提交
   */
  shopForm: function (e) {
    var that = this;
    console.log(that.data.region);
    for (var j = 0; j < 3;j++) {
      console.log(that.data.region[j]) ;
    }
    var tStoreName = e.detail.value.tStoreName;
    if (!isblank.blank(tStoreName) && null != tStoreName && app.globalData.userInfo) {
      var userId = wx.getStorageSync('userid');
      var photosUrl = that.data.tPicture;
      var longitude = wx.getStorageSync('longitude');
      var latitude = wx.getStorageSync('latitude');
      var src = app.globalData.src + "/store/insertSelective";
      wx.request({
        url: src,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          region: that.data.region,
          tPicture: photosUrl,
          tId: e.detail.value.tId,
          tIssuer: userId,
          tStoreName: e.detail.value.tStoreName,
          tSite: e.detail.value.tSite,
          tPhone: e.detail.value.tPhone,
          tWechat: e.detail.value.tWechat,
          tExplain: e.detail.value.tExplain,
          longitude: longitude,
          latitude: latitude
        },
        success(res) {
          // 声音播放
          innerAudioContext.play();
          if (res.data > 0) {
            wx.showToast({
              title: "发布成功"
            })
            wx.redirectTo({
              url: '../../index/shops/shops'
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
                  tPicture: result,
                  imgShow: false
                });
                that.upLoadImg(result);
              })
            } else if (res.tapIndex == 1) {
              //调用公共收藏js方法(拍照)
              fileUpload.chooseImgByOne("camera", count, function (result) {
                that.setData({
                  tPicture: result
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
    fileUpload.imageUploads(path, function (result) {
      that.setData({
        tPicture: result,
        imgShow: false
      })
    })
  },

  //删除已选图片方法
  removeimg: function (e) {
    var tPicture = this.data.tPicture;
    var index = e.currentTarget.id
    tPicture.splice(index, 1)
    this.setData({
      tPicture: tPicture
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
  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  // 获取索要发布的资讯信息
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    //最多字数限制
    if (len > this.data.max) {
      return;
    }
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len, //当前字数 
      informationInput: e.detail.value
    })
  },
})