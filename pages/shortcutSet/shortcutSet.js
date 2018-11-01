import WxValidate from '../../utils/WxValidate.js'
import {
  $http
} from '../../utils/util.js'
let globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: [{
        shortcutKey: '',
        goodName: ''
      },
      {
        shortcutKey: '',
        goodName: ''
      },
      {
        shortcutKey: '',
        goodName: ''
      }
    ]
  },
  handleInputChange1(e) {
    this.setData({
      'formData[0].shortcutKey': e.detail.value
    });
  },
  handleInputChange1_1(e) {
    this.setData({
      'formData[0].goodName': e.detail.value
    });
  },
  handleInputChange2(e) {
    this.setData({
      'formData[1].shortcutKey': e.detail.value
    });
  },
  handleInputChange2_1(e) {
    this.setData({
      'formData[1].goodName': e.detail.value
    });
  },
  handleInputChange3(e) {
    this.setData({
      'formData[2].shortcutKey': e.detail.value
    });
  },
  handleInputChange3_1(e) {
    this.setData({
      'formData[2].goodName': e.detail.value
    });
  },
  // 提交保存
  handleFormSubmit(e) {
    let that = this;
    let formData = that.data.formData;
    console.log(formData)
    let arr = [];
    for (let item of formData) {
      // if (item.shortcutKey || item.goodName){
      arr.push(item);
      // }
    }
    if (!arr.length) {
      wx.showModal({
        title: '提示',
        content: '请至少设置一个快捷键',
        showCancel: false
      });
      return false;
    }
    $http({
      type: 'POST',
      url: `/shopApi/addShortcutKey?sessionId=${globalData.sessionId}`,
      data: arr
    }).then(data => {
      if (data.success) {
        wx.showToast({
          title: '设置快捷键成功',
        });
        wx.redirectTo({
          url: '/pages/goodsDetails/goodsDetails'
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '设置快捷键失败，原因：' + data.message,
          showCancel: false
        });
      }
    })
  },
  //获取快捷键
  getShortCutList() {
    let that = this;
    let formData=that.data.formData;
    $http({
      url: `/shopApi/getShortcutKey?sessionId=${globalData.sessionId}`
    }).then(data => {
      if (data.success) {
        data.data.map((item,index)=>{
          formData[index].shortcutKey = item.shortcutKey;
          formData[index].goodName = item.goodName;
        });
        that.setData({
          formData
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '获取快捷键数据失败，原因：' + data.message,
          showCancel: false
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getShortCutList();
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