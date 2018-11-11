import {
  $http
} from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    animationData: {},
    imgList: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    shopActivityList:new Array(2).fill({
      title:'',
      deadline:'2019-02-12',
      num:12
    })
  },
  //打电话
  makePhoneCall(e) {
    let phoneNumber = e.currentTarget.dataset.phonenumber;
    wx.makePhoneCall({
      phoneNumber
    });
  },
  //查看活动详情
  showModal() {
    let that = this;
    // 创建一个动画实例
    let animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果
      timingFunction: 'ease'
    })
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(400).step();
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      showModal: true
    });
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      });
    }, 200);
  },
  //关闭详情
  hideModal() {
    let that = this;
    let animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    animation.translateY(400).step()
    that.setData({
      animationData: animation.export()
    });
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        showModal: false
      });
    }, 200);
  },
  //领取
  receive(){
    wx.navigateTo({
      url: '/pages/receiveSuccess/receiveSuccess'
    });
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