// pages/mainEntrance/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'http://gowins.imwork.net:8696/ShoppingMallWeb/webapi',
    YHBS: "E84E7273764D2D77E9FC4E9C521E8C3750",
    XTLB: "gdws",
    DYLX: "GET_MAOCOL_DATA",
    DATA: {
      txdocno: '123122221'
    },
    //结果
    result: {}
  },
  scanCode() {
    let that = this;
    wx.scanCode({
      success(res) {
        // 扫码的结果
        let result = res.result;
        wx.showLoading({
          title: '加载中',
          mask: true
        });
        wx.request({
          method: 'POST',
          url: `${that.data.url}?YHBS=${that.data.YHBS}&&XTLB=${that.data.XTLB}&&DYLX=${that.data.DYLX}&&DATA={txdocno: ${result}}`,
          data: {
            // YHBS: "E84E7273764D2D77E9FC4E9C521E8C3750",
            // XTLB: "gdws",
            // DYLX:"GET_MAOCOL_DATA",
            // DATA: {
            //   txdocno: '0001-171202140934'
            // }
          },
          success(res) {
            let data = res.data;
            if (data.status.code == '10000') {
              that.setData({
                'result.sid': data.rows.sid || '',
                'result.ts_date': data.rows.ts_date || '',
                'result.total_amount': Number(data.rows.total_amount).toFixed(2) || '',
                'result.total_income': Number(data.rows.total_income).toFixed(2) || '',
                'result.receipt_no': data.rows.receipt_no || '',
                'result.vip_member': data.rows.vip_member || '',
                'result.receipt_date': data.rows.receipt_date || '',
                'result.receipt_time': data.rows.receipt_time || '',
                'result.receipt_type': data.rows.receipt_type || '',
                'result.payment': data.rows.payment || ''
              });
            } else {
              wx.showModal({
                title: '提示',
                content: `请求失败，原因：${data.status.msg}`
              });
            }
          },
          fail(err) {
            console.log(err)
            wx.showModal({
              title: '提示',
              content: `请求失败，原因：${err.errMsg}`
            });
          },
          complete() {
            wx.hideLoading();
          }
        })
      },
      fail(err) {
        wx.showModal({
          title: '提示',
          content: `扫码失败，原因：${err.errMsg}`
        });
      }
    })
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