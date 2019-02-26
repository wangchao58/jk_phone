var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    rows: 10,
    pages: 1,
    listInformation: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.listInformation();
  },

  /**
   * 列表数据查询获取查询条件
   */
  selInput: function (e) {
    this.setData({
      selInput: e.detail.value
    })
  },

  /**
   * 资讯列表
   */
  listInformation: function (page, rows) {
    var that = this;
    var selInput = this.data.selInput;
    var userId = wx.getStorageSync('userid');
    var src = app.globalData.src + "/information/getInformationListByUser";
    if (page == null) {
      page = that.data.page;
      rows = that.data.rows;
    }
    wx.showLoading({
      title: '玩命加载中',
    })
    wx.request({
      url: src,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        'pId': userId,
        'tContent': selInput,
        'page': page,
        'rows': rows
      },
      success(res) {
        var listInformation = that.data.listInformation;
        var data = res.data.tInformation;
        that.data.pages = res.data.pages;

        if (data.length != 0) {
          for (var i = 0; i < data.length; i++) {
            listInformation.push(data[i]);
          }
          that.setData({ listInformation: listInformation });
        } else {
          that.setData({ listInformation: [] });
        }
        console.log(that.data.listInformation)
        // 隐藏加载框
        wx.hideLoading();
      }
    })
  },
  /**
     * 资讯评论
     */
  discussDetail: function (e) {
    var tId = e.currentTarget.id;
    wx.navigateTo({
      url: '../../index/discuss/discuss?tId=' + tId
    })
  },

  /**
   * 条件查询
   */
  selInformation: function () {
    var that = this;
    that.listInformation(1, 10);
  },

  /**
   * 删除
   */
  remove: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log("======="+index)
    var tId = e.currentTarget.id;
    var userId = wx.getStorageSync('userid');
    var src = app.globalData.src + "/information/removeInformation";
    wx.showModal({
      title: '提示',
      content: '确定要删除么',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: src,
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
              'pId': userId,
              'tId': tId,
            },
            success(res) {
              if (res.data >= 1) {
                var message = that.data.listInformation;
                message.splice(index, 1);
                that.setData({
                  listInformation: message
                });
                wx.showToast({
                  title: '成功',
                  icon: 'error',
                  duration: 1000,
                  mask: true
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  imgck: function (event) {
     var src = event.currentTarget.dataset.src;//获取data-src
     var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
       current: src, // 当前显示图片的http链接
     urls: imgList // 需要预览的图片http链接列表

    })
  },
  onShareAppMessage: function () {
    let that = this;
    return {
      title: '资讯分享', // 转发后 所显示的title
      path: 'pages/index/information/information' // 相对的路径
    }
  },

  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    var that = this;
    var page = that.data.page + 1;
    that.data.page = page;
    if (page <= that.data.pages) {
      that.listInformation(page, that.data.rows);
    }
  }
})