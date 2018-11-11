import {
  $http
} from '../../utils/util.js';
let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/; //验证手机号
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      phoneNumber: '',
      validateCode: ''
    },
    disabled: true,
    loading: false,
    disabledCode: true,
    flag: true,
    seconds: 10,
  },
  //输入手机号
  inputPhoneNumber(e) {
    let phoneNumber = e.detail.value.trim();
    this.setData({
      'formData.phoneNumber': phoneNumber
    });
    if (!phoneNumber) {
      this.setData({
        disabledCode: true,
        'formData.validateCode': ''
      });
    }
    this.isLogin();
  },
  // 输入验证码
  inputValidateCode(e) {
    let validateCode = e.detail.value.trim();
    this.setData({
      'formData.validateCode': validateCode
    });
    this.isLogin();
  },
  // 验证是否可登录
  isLogin() {
    let phoneNumber = this.data.formData.phoneNumber;
    let validateCode = this.data.formData.validateCode;
    if (phoneNumber && validateCode) {
      this.setData({
        disabled: false
      });
    } else {
      this.setData({
        disabled: true
      });
    }
  },
  //获取验证码
  getValidateCode() {
    let that = this;
    let formData = that.data.formData;
    that.setData({
      seconds: 10,
    })
    let seconds = that.data.seconds;
    if (!formData.phoneNumber) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return;
    }
    if (!reg.test(formData.phoneNumber)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return;
    }
    that.setData({
      flag: false,
      disabledCode: false
    });

    let timer = setInterval(function() {
      seconds--;
      that.setData({
        seconds
      });
      if (seconds <= 0) {
        clearInterval(timer);
        that.setData({
          flag: true,
          seconds: 10
        });
      }
    }, 1000);
    // 发送请求获取验证码
    // $http(formData).then(data=>{

    // });
  },
  //登录
  login(e) {

    let that = this;
    let phoneNumber = that.data.formData.phoneNumber;
    let validateCode = that.data.formData.validateCode;
    // if (!reg.test(phoneNumber)) {
    //   wx.showToast({
    //     title: '请输入正确的手机号',
    //     icon: 'none'
    //   });
    //   return;
    // }

    //验证通过
    that.setData({
      loading: true
    });
    wx.switchTab({
      url: '/pages/index/index'
    });
    // 发送请求登录
    // $http(formData).then(data=>{

    // });
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