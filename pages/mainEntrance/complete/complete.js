import util from '../../../utils/util.js';
const ajaxPost = util.ajaxPost,
  globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 'complete',
    current: 1,
    pageSize: 4,
    list: []
  },
  //获取订单列表
  getOrderList() {
    let that = this;
    ajaxPost({
      url: `/customerApi/getWrapForStatus?sessionId=${globalData.sessionId}`,
      type: 'POST',
      data: {
        "current": that.data.current,
        "pageSize": that.data.pageSize,
        "search": {
          "finishedStatus": 2
        }
      },
      success(res) {
        let records = res.data.data.records;
        if (records.length) {
          let list_new = [...that.data.list, ...records];
          that.setData({
            list: list_new
          })
        }
      }
    })
  },
  // 投诉
  complaint(e) {
    console.log(e);
    let phoneNumber = e.currentTarget.dataset.phonenumber;
    wx.showModal({
      title: '提示',
      content: `您真的要投诉吗？`,
      success: function(res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: `${phoneNumber}`
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getOrderList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this;
    that.data.current++;
    that.setData({
      current: that.data.current
    });
    that.getOrderList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})