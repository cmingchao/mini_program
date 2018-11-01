import {
  $http
} from '../../utils/util.js';
let globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res:{}
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options);
    let serveNumber = +options.serveNumber;
    $http({
      url: `/shopApi/getServeDetailed?sessionId=${globalData.sessionId}&serveNumber=${serveNumber}`
    }).then(data=>{
        if(data.success){
            that.setData({
              'res':data.data
            });
        }else{
          wx.showModal({
            title: '提示',
            content: '获取订单详情失败，原因：'+data.message,
            showCancel:false
          });
        }
    }).catch(err=>{
      wx.showModal({
        title: '提示',
        content: '获取订单详情失败，原因：' + err,
        showCancel: false
      });
    });
  },
  //打电话
  callPhone(e) {
    let phoneNumber = e.currentTarget.dataset.phonenumber;
    wx.makePhoneCall({
      phoneNumber: `${phoneNumber}`
    });
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