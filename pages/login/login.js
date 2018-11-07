import {
  $http,
  getSessionId
} from '../../utils/util.js';
let globalData = getApp().globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },
  /***获取微信绑定的手机号 */
  getPhoneNumber: function(e) {
    // console.log(e)
    // 同意获取手机号
    if (e.detail.encryptedData) {
      $http({
        url: '/app/getUserInfo',
        data: {
          sessionId: globalData.sessionId,
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData
        }
      }).then(data => {
        if (data.success) {
          globalData.userName=data.data;
          wx.redirectTo({
            url: '/pages/addOrder/addOrder'
          })
        } else {
          wx.showModal({
            title: '提示',
            content: `获取手机号失败，原因：${data.message}`,
            showCancel: false,
            success(res){
              if(res.confirm){
                getSessionId();
              }
            }
          });
        }
      })
    } else {
      // 拒绝授权，不作响应
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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