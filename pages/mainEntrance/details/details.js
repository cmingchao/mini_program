import util from '../../../utils/util.js';
const ajaxPost = util.ajaxPost;
const globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 'details',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let wrapNumber = options.wrapNumber;
    ajaxPost({
      url: `/customerApi/getDeliverWrapServe?sessionId=${globalData.sessionId}`,
      data: {
        wrapNumber: +wrapNumber
      },
      success(res) {
        console.log(res);
        that.data.list.push(res.data.data);
        that.setData({
          list: that.data.list
        })
      }
    })
  },
  //打电话
  callPhone(e) {
    console.log(e)
    let phoneNumber = e.currentTarget.dataset.phonenumber;
    wx.makePhoneCall({
      phoneNumber: `${phoneNumber}`
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})