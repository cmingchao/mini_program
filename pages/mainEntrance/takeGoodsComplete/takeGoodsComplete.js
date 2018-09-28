import util from '../../../utils/util.js';
const ajaxPost = util.ajaxPost,
  getDeliverCount = util.getDeliverCount;
const globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    date: '',
    headerData: {
      currentPage: 'takeGoodsComplete',
      obj: {
        waitTakeGoodsNum: 0,
        waitGiveGoodsNum: 0,
        takeGoodsCompleteNum: 0,
        giveGoodsCompleteNum: 0
      }
    },
    page: 1,//当前页码，
    pageSize: 4,//每页显示数据条数
    arr: [],
    details: [] //详情
  },
  // 选择取消清空时间
  clearDate(){
    let that = this;
    that.setData({
      date: '',
      arr: [],
      page:1
    });
    that.getOrderList(that.data.date);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取各个状态下的统计数量
    let that = this;
    getDeliverCount(that);
    that.getOrderList(that.data.date);
    let date = new Date(),
      endDate = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()),
      startDate = date.getFullYear() - 1 + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    //默认只能查询近一年的数据
    that.setData({
      startDate: startDate,
      endDate: endDate
    });
  },
  //获取订单列表
  getOrderList(date) {
    let that = this;
    ajaxPost({
      type: 'POST',
      url: `/deliverApi/serveInfoPage?sessionId=${globalData.sessionId}`,
      data: {
        "current": that.data.page,
        "pageSize": that.data.pageSize,
        "search": {
          "isDeliverServeList": 2,
          "startDeliveryTime": !date ? '' : date + ' 00:00:00',
          "endDeliveryTime": !date ? '' : date + ' 23:59:59'
        }
      },
      success(res) {
        let records = res.data.data.records;
        if (records.length) {
          let newArr = [...that.data.arr, ...records];
          // console.log(newArr);
          that.setData({
            arr: newArr
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    that.data.page++;
    that.setData({
      page: that.data.page
    });
    that.getOrderList(that.data.date);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 改变时间
  bindDateChange: function (e) {
    let that = this;
    that.setData({
      date: e.detail.value,
      arr:[],
      page:1
    });
    that.getOrderList(that.data.date);
  },
  // 点击查看按钮弹出详情模态框
  getDetails(e) {
    let that = this;
    that.setData({
      showModal: true
    });
    let serveNumber = e.currentTarget.dataset.serveNumber;
    let item = e.currentTarget.dataset.item;
    that.setData({
      details: []
    });
    that.data.details.push(item);
    that.setData({
      details: that.data.details
    })
    // ajaxPost({
    //   url: `/deliverApi/getDeliverWrapNumber`,
    //   data: {
    //     wrapNumber: +wrapNumber
    //   },
    //   success(res) {
    //     let data = res.data;
    //     if (data.success) {
    //       that.data.details.push(res.data.data);
    //       that.setData({
    //         details: that.data.details
    //       })
    //     } else {
    //       wx.showModal({
    //         title: '提示',
    //         content: `获取数据失败，失败原因:${data.message || '未知'}`,
    //         showCancel: false
    //       })
    //     }
    //   }
    // })
  },
  // 关闭模态框
  close() {
    this.setData({
      showModal: false
    })
  }
})