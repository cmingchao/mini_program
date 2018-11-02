// pages/mainEntrance/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // url:'http://gowins.imwork.net:8696/ShoppingMallWeb/webapi',
    url: 'http://222.180.250.18:8350/ShoppingMallWeb/webapi',
    YHBS: "E84E7273764D2D77E9FC4E9C521E8C3750",
    XTLB: "gdws",
    DYLX: "GET_MAOCOL_DATA",
    DATA: {
      txdocno: ''
    },
    //结果
    result: {}
  },
  scanCode() {
    let that = this;
    wx.scanCode({
      success(res) {
        // console.log(res);
        // 扫码的结果
        let result = res.result;
        // let result = '31286ac6ms01000010120180928180615141';
        wx.showLoading({
          title: '加载中',
          mask: true
        });
        wx.request({
          method: 'POST',
          url: `${that.data.url}?YHBS=${that.data.YHBS}&&XTLB=${that.data.XTLB}&&DYLX=${that.data.DYLX}&&DATA={"txdocno":"${result}"}`,
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
              let rows=data.rows;
              if (rows.receipt_no){
                that.setData({
                  'result.sid': rows.sid || '',
                  'result.ts_date': rows.ts_date || '',
                  'result.total_amount': Number(rows.total_amount).toFixed(2) || '',
                  'result.total_income': Number(rows.total_income).toFixed(2) || '',
                  'result.receipt_no': rows.receipt_no || '',
                  'result.vip_member': rows.vip_member || '',
                  'result.receipt_date': rows.receipt_date || '',
                  'result.receipt_time': rows.receipt_time || '',
                  'result.receipt_type': rows.receipt_type || '',
                  'result.payment': rows.payment || ''
                });
              }else{
                wx.showModal({
                  title: '提示',
                  content: `请求成功，暂无数据`
                });
              }
              
            } else {
              wx.showModal({
                title: '提示',
                content: `请求失败，此单号可能不存在，原因：${data.status.msg}`
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