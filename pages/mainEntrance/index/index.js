import util from '../../../utils/util.js';
const ajaxPost = util.ajaxPost;
const globalData = getApp().globalData;
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
  //登录
  // login() {
  //   let phoneNumber = this.data.phoneNumber.trim(),
  //     exp = /^[1][3,4,5,7,8][0-9]{9}$/;
  //   if (!phoneNumber) {
  //     wx.showModal({
  //       title: '提示',
  //       content: '请输入11位手机号',
  //       showCancel: false
  //     });
  //     return false;
  //   } else if (!exp.test(phoneNumber)) {
  //     wx.showModal({
  //       title: '提示',
  //       content: '手机号输入非法!',
  //       showCancel: false
  //     });
  //     return false;
  //   } else {
  //     ajaxPost({
  //       url: '/deliverApi/getDeliverByMobile',
  //       data: {
  //         mobile: phoneNumber
  //       },
  //       success(res) {
  //         if (!res.data.success) {
  //           wx.showModal({
  //             title: '提示',
  //             content: `验证失败，原因:${res.data.message || '未知'}`,
  //             showCancel: false
  //           })
  //         } else {
  //           globalData.userId = +res.data.str; //配送员id
  //           globalData.token = res.data.data; //配送员token
  //           wx.redirectTo({
  //             url: '/pages/mainEntrance/waitTakeGoods/waitTakeGoods',
  //           })
  //         }
  //       }
  //     })
  //   }
  // },
  // 获取微信用户绑定的手机号
  getPhoneNumber: function(e) {
    // console.log(e);
    if (e.detail.encryptedData) {
      //获取手机号
      ajaxPost({
        url: '/app/getUserInfo',
        data: {
          sessionId: globalData.sessionId,
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData
        },
        success(res) {
          // console.log(res);
          let data = res.data;
          if (data.success) {
            wx.redirectTo({
              url: '/pages/mainEntrance/waitTakeGoods/waitTakeGoods'
            })
          } else {
            wx.showModal({
              title: '提示',
              content: `获取手机号失败，原因：${data.message || '未知'}`,
              showCancel: false
            })
          }
          // let phoneNumber = res.data.phoneNumber;
          // //验证手机号
          // if (phoneNumber) {
          //   ajaxPost({
          //     url: '/deliverApi/getDeliverByMobile',
          //     data: {
          //       mobile: phoneNumber
          //     },
          //     success(res) {
          //       if (!res.data.success) {
          //         wx.showModal({
          //           title: '提示',
          //           content: `验证失败，原因：${res.data.message || '未知'}`,
          //           showCancel: false
          //         })
          //       } else {
          //         globalData.userId = +res.data.str; //配送员id
          //         globalData.token = res.data.data; //配送员token
          //         wx.redirectTo({
          //           url: '/pages/mainEntrance/waitTakeGoods/waitTakeGoods',
          //         })
          //       }
          //     },
          //     fail(err) {
          //       wx.showModal({
          //         title: '提示',
          //         content: `验证失败，原因:${err.errMsg || '未知'}`,
          //         showCancel: false
          //       })
          //     }
          //   })
          // } else {
          //   // wx.showModal({
          //   //   title: '提示',
          //   //   content: `获取手机号失败，原因：${res.data.message || '未知'}`,
          //   //   showCancel: false
          //   // })
          // }
        },
        fail(err) {
          wx.showModal({
            title: '提示',
            content: `获取手机号失败，原因：${err.errMsg}`,
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