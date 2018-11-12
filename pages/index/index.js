import {
  getHeight,
  $http,
  switchTab,
  swichNav,
  checkCor
} from '../../utils/util.js';
let globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: getHeight() - 60, //高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    name: '',
    id: '', //当前菜单的id
    //菜单列表
    navList: [{
      label: '推荐',
      value: ''
    }],
    //数据列表
    list: [
      // {
      //   img: '',
      //   title: '',
      //   shopName: '',
      //   deadline: '',
      //   num: '',
      //   id: ''
      // }
    ]
  },
  inputName(e) {
    this.setData({
      name: e.detail.value
    });

  },
  // 滚动切换标签样式
  switchTab(e) {
    switchTab(this, e);
    let currentItemId = +e.detail.currentItemId;
    this.setData({
      id: currentItemId
    });
    this.getDataList();
  },
  // 点击标题切换当前页时改变样式
  swichNav(e) {
    swichNav(this, e);
    let id = +e.currentTarget.dataset.id;
    if (+this.data.id === id) return false;
    this.setData({
      id
    });
    this.getDataList();
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor() {
    checkCor(this);
  },
  //获取数据
  getDataList() {
    let that = this,
      id = that.data.id,
      url = '';
    that.setData({
      list: []
    });
    if (!id) {
      url = '/MallApi/getMatrixRecommended'; //推荐
      id = '';
    } else url = '';
    $http({
      url,
      data: {
        id
      }
    }).then(data => {
      if (data.errcode === 0) {
        let arr = data.data.map(item => {
          return {
            img: item.banner1 ? globalData.imgUrl + item.banner : '/images/zanwutupian.jpg',
            title: item.title,
            shopName: item.store,
            deadline: item.grant_end_time,
            num: item.sum || 0,
            id: item.id
          };
        });
        that.setData({
          list: arr
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '获取数据列表失败，原因：' + data.errmsg,
          showCancel: false
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    //获取菜单列表
    let navList = that.data.navList;
    $http({
      url: '/MallApi/getFormats',
    }).then(data => {
      if (data.errcode === 0) {
        let arr = data.data.map(item => {
          return {
            label: item.name,
            value: item.id
          };
        });
        let new_navList = [...navList, ...arr];
        that.setData({
          navList: new_navList
        });
        that.getDataList();
      } else {
        wx.showModal({
          title: '提示',
          content: '获取菜单列表失败，原因：' + data.errmsg,
          showCancel: false
        });
      }
    })
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