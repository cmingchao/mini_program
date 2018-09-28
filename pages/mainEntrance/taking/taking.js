import util from '../../../utils/util.js';
const ajaxPost = util.ajaxPost,
  globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 'taking',
    list: []
  },
  //获取订单列表
  getOrderList() {
    let that = this;
    ajaxPost({
      url: `/customerApi/getServeForWait?sessionId=${globalData.sessionId}`,
      data: {},
      success(res) {
        let data = res.data;
        that.setData({
          list: data.data
        })
      }
    })
  },
  // 变更时间、地址
  change(e) {
    // console.log(e);
    let time = e.currentTarget.dataset.time,
      address = e.currentTarget.dataset.address,
      phoneNumber = e.currentTarget.dataset.phonenumber;
    wx.showModal({
      title: '变更',
      content: `您真的要变更订单的时间(${time})、 地址(${address})吗？`,
      confirmText: '联系客服',
      cancelColor: '#FFB30F',
      confirmColor: '#FFB30F',
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})