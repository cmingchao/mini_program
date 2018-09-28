let httpUrl ='http://47.105.70.252'; //内测
// let httpUrl = 'https://wh.gdwstech.com/'; //线上
App({
  // 小程序启动之后 触发
  onLaunch: function() {
    let that = this,
      globalData = that.globalData;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: httpUrl + '/app/getSessionKeyOropenid',
            data: {
              code: res.code,
              type: 2
            },
            success(res) {
              let data = res.data;
              if (data.success) {
                globalData.sessionId = data.data;
              } else {
                wx.showModal({
                  title: '提示',
                  content: `获取sessionId失败，原因：${data.message}`
                })
              }
            },
            fail(err) {
              wx.showModal({
                title: '提示',
                content: `获取sessionId失败，原因：${err.errMsg}`
              })
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: `登录失败，原因：${res.errMsg}`
          })
        }
      }
    });
    // 获取用户信息
    wx.getSetting({ //获取用户当前的授权状态。
      success: res => {
        // console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
        //没有授权
        else {

        }
      }
    })
  },
  // 全局数据
  globalData: {
    userInfo: null,
    baseUrl: httpUrl,
    sessionId: null
  }
})