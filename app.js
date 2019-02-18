//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          // url: "https://i.bjjkkj.com/personage/addPersonage",
          url: "http://192.168.100.26/personage/addPersonage",
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            code: res.code
          },
          success(res) {
            //console.log(res.data)
            wx.setStorageSync('userid', res.data.id)
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo


                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      }),
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          wx.setStorageSync('latitude', res.latitude);
          wx.setStorageSync('longitude', res.longitude);
          // qqmapsdk.reverseGeocoder({
          //   location: {
          //     latitude: res.latitude,
          //     longitude: res.longitude
          //   },
          //   success: function(addressRes) {
          //     console.log(addressRes.result.address_component);
          //     // const latitude = res.latitude
          //     // const longitude = res.longitude
          //     // const speed = res.speed
          //     // const accuracy = res.accuracy
          //     // console.log(latitude);
          //     // console.log(longitude);
          //     // console.log(speed);
          //     // console.log(accuracy);
          //     var address = addressRes.result.formatted_addresses.recommend;
          //     that.setData({
          //       city: address
          //     })
          //   }
          // })
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
  globalData: {
    userInfo: null,
    mapKey: "VV4BZ-WGU6J-NBQFZ-KBMLJ-5P4LZ-YAFEM",
    // src: "https://i.bjjkkj.com"  //服务器域名
    src: "http://192.168.100.26", //服务器域名
  }


})