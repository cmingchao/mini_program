// pages/receiveSuccess/receiveSuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //数据列表
    list: [
      {
        img: '/images/tu.png',
        title: '68元单人下午茶套餐',
        shopName: '阿迪达斯',
        deadline: '2019-12-25',
        num: 12,
        id: ''
      }
    ]
  },
  //查看订单
  checkOrder(){
    wx.navigateTo({
      url: '/pages/orderDetails/orderDetails'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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