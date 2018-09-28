// pages/mainEntrance/index/index.js
import {
  $http
} from '../../../utils/util.js';
const globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: 'superadmin',
    password: 'superadmin'
  },
  getInputUserName(e) {
    this.setData({
      userName: e.detail.value.trim()
    })
  },
  getInputPassword(e) {
    this.setData({
      password: e.detail.value.trim()
    })
  },
  // 登录
  login() {
    let that = this;
    if (!that.data.userName) {
      wx.showModal({
        title: '提示',
        content: '请输入账号',
        showCancel: false
      });
      return false;
    } else if (!that.data.password) {
      wx.showModal({
        title: '提示',
        content: '请输入密码',
        showCancel: false
      });
      return false;
    } else {
      $http({
        url: '/mobileApi/userLogin.do',
        data: {
          username: that.data.userName,
          password: that.data.password
        }
      }).then(data => {
        if (data.status.code == '10000') {
          globalData.token = data.data;
          wx.switchTab({
            url: '/pages/mainEntrance/homePage/homePage'
          })
        } else {
          wx.showModal({
            title: '提示',
            content: `登录失败，原因：${data.status.msg}`
          })
        }
      }).catch(errMsg => {
        wx.showModal({
          title: '提示',
          content: `登录失败，原因：${errMsg}`
        })
      })
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