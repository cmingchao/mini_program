import {
  $http
} from '../../utils/util.js';
let globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    num: 1,
    //当前选中取消的订单的服务单号
    serveNumber: '',
    showDialog: false,
    formData: {
      "current": 1,
      "pageSize": 10,
      "search": {
        "serveNumber": '',
        "serveStatus": 1
      }
    },
    formData2: {
      cancelReason: '',
      remarks: ''
    },
    cancelReasonList: []
  },
  // 待取货
  handleWaitGive() {
    this.setData({
      'num': 1,
      'formData.current': 1,
      'list': [],
      'formData.search.serveNumber': '',
      'formData.search.serveStatus': 1,
    });
    this.getServePageList();
  },
  // 已取消
  handleCanceled() {
    this.setData({
      'num': 2,
      'formData.current': 1,
      'list':[],
      'formData.search.serveNumber': '',
      'formData.search.serveStatus': 7,
    });
    this.getServePageList();
  },
  // 全部订单
  handleAll() {
    this.setData({
      'num': 3,
      'formData.current': 1,
      'list': [],
      'formData.search.serveNumber': '',
      'formData.search.serveStatus': '',
    });
    this.getServePageList();
  },
  // 点击取消订单
  handleCancel(e) {
    let that = this;
    that.setData({
      showDialog: true,
      serveNumber: e.currentTarget.dataset.servenumber
    });
    //获取取消原因列表
    $http({
      type: 'POST',
      url: `/shopApi/getCancelOrderReason?sessionId=${globalData.sessionId}`,
      data: {
        "current": 1,
        "pageSize": 100,
        "search": {
          "state": 1
        }
      }
    }).then(data => {
      let cancelReasonList = data.map(item => {
        return {
          label: item.depict,
          value: +item.id
        }
      });
      that.setData({
        cancelReasonList
      });
    })
  },
  //选择取消原因
  handleCancelReasonChange(e) {
    this.setData({
      'formData2.cancelReason': +e.detail.value
    });
  },
  //确定删除
  handleConfirmDelete() {
    let that = this;
    let formData2 = that.data.formData2;
    console.log(formData2)
    if (formData2.cancelReason === '' || formData2.cancelReason === undefined) {
      wx.showModal({
        title: '提示',
        content: '请选择取消原因',
        showCancel: false
      });
      return false;
    }
    wx.showModal({
      title: '提示',
      content: '确定要取消该订单吗？',
      success(res) {
        if (res.confirm) {
          let cancelReason = that.data.cancelReasonList[formData2.cancelReason].value;
          $http({
            type: 'POST',
            url: `/shopApi/posCancelServe?sessionId=${globalData.sessionId}`,
            data: {
              "cancelOrderReason": cancelReason,
              "remarks": formData2.remarks,
              "serveNumber": +that.data.serveNumber
            }
          }).then(data => {
            if(data.success){
              wx.showToast({
                title: '取消订单成功'
              });
              that.setData({
                showDialog:false,
                'formData.current': 1,
                'list':[]
              });
              that.getServePageList();
            }else{
              wx.showModal({
                title: '提示',
                content: '取消该订单失败，原因：' + data.message,
                showCancel: false
              });
            }
          }).catch(err => {
            wx.showModal({
              title: '提示',
              content: '取消该订单失败，原因：' + err,
              showCancel: false
            });
          })
        }
      }
    })
  },
  //取消删除
  handleCancelDelete(){
    this.setData({
      showDialog:false
    });
  },
  //通过服务单号搜索
  handleSearch(e) {
    this.setData({
      'formData.current': 1,
      'list':[],
      'formData.search.serveNumber': +e.detail.value
    });
    this.getServePageList();
  },
  //详情
  handleDetails(e) {
    
    let serveNumber = e.currentTarget.dataset.servenumber,
      code = e.currentTarget.dataset.code || '';
    wx.navigateTo({
      url: `/pages/orderDetails/orderDetails?serveNumber=${serveNumber}&code=${code}`
    });
  },
  // 获取服务单分页列表
  getServePageList() {
    let that = this;
    $http({
      type: 'POST',
      url: `/shopApi/getServeForPos?sessionId=${globalData.sessionId}`,
      data: that.data.formData
    }).then(data => {
      let list = that.data.list;
      if (data.records.length) {
        let new_list = [...list, ...data.records];
        that.setData({
          list: new_list
        });
      }
    }).catch(err => {
      wx.showModal({
        title: '提示',
        content: '获取订单列表失败，原因：' + err,
        showCancel: false
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getServePageList();
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
    // this.getServePageList();
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
    let page = this.data.formData.current;
    page++;
    this.setData({
      'formData.current': page
    });
    this.getServePageList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})