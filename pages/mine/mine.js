Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: ['待核销', '已核销', '已过期'], //导航列表
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    //假数据
    list: [
      {
        img: "/images/tu.png",
        title: "68元单人下午茶套餐",
        shopName: "长岛咖啡",
        deadline: '2018-12-29',
        num: 18
      },
      {
        img: "/images/tu.png",
        title: "68元单人下午茶套餐",
        shopName: "长岛咖啡",
        deadline: '2018-12-29',
        num: 18
      },
      {
        img: "/images/tu.png",
        title: "68元单人下午茶套餐",
        shopName: "长岛咖啡",
        deadline: '2018-12-29',
        num: 18
      }
    ]
  },
  // 滚动切换标签样式
  switchTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function(e) {
    let cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) return false;
    else {
      this.setData({
        currentTab: cur
      });
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function() {
    let length = this.data.navList.length;
    if (this.data.currentTab > 3) {
      this.setData({
        scrollLeft: (length - 3) * 100
      });
    } else {
      this.setData({
        scrollLeft: 0
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function(res) {
        let clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        let calc = clientHeight * rpxR - 90;
        that.setData({
          winHeight: calc
        });
      }
    });
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