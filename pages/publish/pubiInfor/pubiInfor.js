var app = getApp();
// 引用公共js
var fileUpload = require("../../../js/fileUpload.js");
var QQMapWX = require('../../../pages/images/qqmap-wx-jssdk.min.js');
var qqmapsdk; 
Page({
  data: {
    photos: [],
    curImgList:[],
    evalList: [{ tempFilePaths: [], imgList: [] }],
    city: ''
  },

  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: app.globalData.mapKey
    });
    this.thisCity();
  },

  // 获取索要发布的资讯信息
  informationInput: function (e) {
    this.setData({
      informationInput: e.detail.value
    })
  },

  /**
   * 选择图片方法
   */
  chooseImage: function () {
    var that = this;
    var num = that.data.photos.length;//已上传图片数
    var count = 3 - num;//剩余可上传照片数
    if (num < 3){
      wx.showActionSheet({
        itemList: ["从相册中选择", "拍照"],
        itemColor: "#f7982a",
        success: function (res) {
          if (!res.cancel) {
            if (res.tapIndex == 0) {
              // 调用公共收藏js方法(从相册中选择)
              fileUpload.chooseImg("album", count, function (result) {
                that.setData({
                  photos: result
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
    }else{
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
        photos: result
      })
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
    // this.upLoadImg(photos);
  },

  /**
   * 是否显示城市
   */
  checkboxChange: function () {
    var anonymous = this.data.anonymous;
    if (anonymous) {
      this.setData({ anonymous: false })
      this.thisCity();
    } else {
      this.setData({ 
        anonymous: true,
        city: '' 
      }) 
    }
  },

  /**
   * 获取当前城市名称
   */
  thisCity: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            console.log(addressRes.result.address_component);
            // const latitude = res.latitude
            // const longitude = res.longitude
            // const speed = res.speed
            // const accuracy = res.accuracy
            // console.log(latitude);
            // console.log(longitude);
            // console.log(speed);
            // console.log(accuracy);
            var address = addressRes.result.formatted_addresses.recommend;
            that.setData({
             city: address
            })
          }
        })
      },
      fail: function() {
        wx.showToast({
          title: '授权失败',
          icon: 'success',
          duration: 1000
        })
      }
    
    })
  },

  /**
   * 发布资讯提交
   */
  informationSub: function () {
    
    
    var that = this;
    var informationInput = this.data.informationInput;
    if (null != informationInput && app.globalData.userInfo){
      var city = that.data.city;
      var photosUrl = that.data.photos;
      var userId = wx.getStorageSync('userid');
      var longitude = wx.getStorageSync('longitude');
      var latitude = wx.getStorageSync('latitude');
      var src = app.globalData.src + "/information/addInformation";
      wx.request({
        url: src,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          tContent: informationInput,
          pId: userId,
          tCoordinate: longitude + "," + latitude,//坐标，经纬度
          city: city,
          tImg: photosUrl
        },
        success(res) {
          if (res.data > 0) {
            wx.showToast({
              title: "发布成功"
            })
            wx.redirectTo({
              url: '../../index/information/information'
            })
           
          } else {
            wx.showToast({
              title: "发布失败"
            })
          }
        }
      })
    }else{
      wx.showModal({
        title: '友情提示',
        content: '内容不能为空或未登录',
       
      })
     
    }
    
  }
})