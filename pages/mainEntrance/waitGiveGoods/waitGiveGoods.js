import util from '../../../utils/util.js';
const ajaxPost = util.ajaxPost,
  getDeliverCount = util.getDeliverCount;
const globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    bagCode: '',//取货码
    headerData: {
      currentPage: 'waitGiveGoods',
      obj: {
        waitTakeGoodsNum: 0,
        waitGiveGoodsNum: 0,
        takeGoodsCompleteNum: 0,
        giveGoodsCompleteNum: 0
      }
    },
    page: 1,//当前页码，
    pageSize: 4,//每页显示数据条数
    flag: 1,
    wrapNumber: '',//打包编号
    arr: []
  },
  //获取订单列表
  getOrderList() {
    let that = this;
    ajaxPost({
      type: 'POST',
      url: `/deliverApi/wrapInfoPage?sessionId=${globalData.sessionId}`,
      data: {
        "current": that.data.page,
        "pageSize": that.data.pageSize,
        "search": {
          "isDeliverWrapList": 1
        }
      },
      success(res) {
        let records = res.data.data.records;
        if (records.length) {
          let newArr = [...that.data.arr, ...records];
          that.setData({
            arr: newArr
          })
        }
      }
    })
  },
  callPhone(e) {
    let phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: `${phone}`
    })
  },
  bindinput(e) {
    this.setData({
      bagCode: e.detail.value
    })
  },
  //完成送货
  completeGiveGoods(e) {
    let that = this;
    that.setData({
      showModal: true
    });
    let wrapNumber = e.currentTarget.dataset.wrapnumber;
    that.setData({
      wrapNumber: wrapNumber
    });
  },
  // 确认
  confirm() {
    let that = this;
    if (!that.data.bagCode) {
      wx.showModal({
        title: '提示',
        content: '请输入提货码',
        showCancel: false
      })
      return false;
    }
    ajaxPost({
      type: 'POST',
      url: `/deliverApi/deliverCompletion?sessionId=${globalData.sessionId}`,
      data: {
        "wrapNumber": +that.data.wrapNumber,
        "captcha": that.data.bagCode
      },
      success(res) {
        let data = res.data;
        if (data.success) {
          wx.showToast({
            title: '提货成功'
          });
          that.setData({
            showModal: false
          });
          getDeliverCount(that);
          that.setData({
            arr: [],
            page: 1
          });
          that.getOrderList();
        } else {
          wx.showModal({
            title: '提货失败',
            content: `原因:${data.message || '未知'}`,
            showCancel: false,
          })
        }
      },
      fail(err) {
        wx.showModal({
          title: '提货失败',
          content: `原因:${err.errMsg}`,
          showCancel: false,
        })
      }
    })
  },
  cancel() {
    this.setData({
      showModal: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    getDeliverCount(that);
    that.getOrderList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    that.data.page++;
    that.setData({
      page: that.data.page
    });
    that.getOrderList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})