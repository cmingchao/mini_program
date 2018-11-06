import util from '../../../utils/util.js';
const ajaxPost = util.ajaxPost,
  getDeliverCount = util.getDeliverCount;
const globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //页头数据
    headerData: {
      currentPage: 'waitTakeGoods',
      obj: {
        waitTakeGoodsNum: 0,
        waitGiveGoodsNum: 0,
        takeGoodsCompleteNum: 0,
        giveGoodsCompleteNum: 0
      }
    },
    page: 1, //当前页码，
    pageSize: 4, //每页显示数据条数
    flag: 0,
    arr: [], //列表,
    showDialog:false,
    serveNumber:''
  },
  // 确定到店取货
  handleConfirmTake(e){
    // console.log(e);
    let that = this;
    let serveNumber = +that.data.serveNumber;
    let code=e.detail.value.code.trim();
    if (!code){
      wx.showModal({
        title: '提示',
        content: '请输入取货码',
        showCancel:false
      });
      return false;
    }
    ajaxPost({
      type: 'PUT',
      url: `/deliverApi/confirmPickGoods?serveNumber=${serveNumber}&sessionId=${globalData.sessionId}&verCode=${code}`,
      success(res) {
        let data = res.data;
        if (data.success) {
          wx.showToast({
            title: '取货成功'
          });
          that.setData({
            arr: [],
            page: 1,
            showDialog:false
          });
          getDeliverCount(that);
          that.getOrderList();
        } else {
          wx.showModal({
            title: '提示',
            content: `取货失败,原因:${data.message || '未知'}`,
            showCancel: false,
          });
        }
      },
      fail(err) {
        wx.showModal({
          title: '取货失败',
          content: `原因:${err.errMsg}`,
          showCancel: false,
        });
      }
    })
  },
  handleHideDialog(){
    this.setData({
      showDialog: false
    });
  },
  //提示更改了服务台
  promptChangeReception() {
    console.log(this.data.list)
    let list = this.data.list;
    let n = 0;
    let loop = (val) => {
      wx.showModal({
        title: '变更提醒',
        content: `服务单号：${val.serveNumber} `,
        showCancel: false,
        success(res) {
          if (res.confirm) {
            n++;
            if (n == list.length) return false;
            loop(list[n]);
          }
        }
      })
    }
    for (let i = 0; i < list.length; i++) {
      if (list[i].newAddress) {
        n = i;
        loop(list[n]);
        break;
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取各个状态下的统计数量
    let that = this;
    getDeliverCount(that);
    that.getOrderList();
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
    let that = this;
    that.data.page++;
    that.setData({
      page: that.data.page
    });
    that.getOrderList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //获取订单列表
  getOrderList() {
    let that = this;
    ajaxPost({
      type: 'POST',
      url: `/deliverApi/serveInfoPage?sessionId=${globalData.sessionId}`,
      data: {
        "current": that.data.page,
        "pageSize": that.data.pageSize,
        "search": {
          "isDeliverServeList": 1
        }
      },
      success(res) {
        let records = res.data.data.records;
        if (records.length) {
          let newArr = [...that.data.arr, ...records];
          console.log(newArr);
          that.setData({
            arr: newArr
          })
        }
      }
    })
  },
  // 点击到店取货
  completeTakeGoods(e) {
    let serveNumber=e.currentTarget.dataset.servenumber;
    this.setData({
      showDialog: true,
      serveNumber
    });
  }
})