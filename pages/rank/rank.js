import {
  getHeight,
  $http,
  switchTab,
  swichNav,
  checkCor
} from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: ['今日核销', '今日优惠', '今日领取', '店铺热度'], //导航列表
    height: getHeight(), //高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    //数据
    list: new Array(8).fill({
      img: '/images/tu.png',
      title: '68元单人下午茶套餐',
      shopName: '长岛咖啡',
      deadline: '2019-03-12',
      num: 8,
      id:''
    })
  },
  // 滚动切换标签样式
  switchTab(e) {
    switchTab(this, e);
  },
  // 点击标题切换当前页时改变样式
  swichNav(e) {
    swichNav(this, e);
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor() {
    checkCor(this);
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