import {
  $http
} from '../../utils/util.js';
let globalData = getApp().globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: ''
  },
  //手机号
  getInputPhoneNumber(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  // 登录
  login() {
    let phoneNumber = this.data.phoneNumber.trim(),
      exp = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (!phoneNumber) {
      wx.showModal({
        title: '提示',
        content: '请输入11位手机号',
        showCancel: false
      });
      return false;
    } else if (!exp.test(phoneNumber)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
        showCancel: false
      });
      return false;
    } else {
      $http({
        url: '/customerApi/getCustomerByMobile',
        data: {
          sessionId: globalData.sessionId
        },
        success(res) {
          let data = res.data;
          if (data.success) {
            wx.redirectTo({
              url: '/pages/mainEntrance/taking/taking'
            })
          } else {
            wx.showModal({
              title: '提示',
              content: `验证失败`,
              showCancel: false
            })
          }
        }
      })
    }
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
            showCancel: false
          })
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