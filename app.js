//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
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
      }
    })
  },
  globalData: {
    userInfo: null,
    token: '',
    baseUrl: 'http://192.168.1.108:8081',
    time:1000,
    //echarts全局配置
    baseOption: {
      color: ['#3BAFDA', '#FFAA00', '#F76397', '#c23531', '#2f4554', '#61a0a8', '#d48265'],
      grid: {
        top: 60,
        left: '3%',
        right: '5%',
        bottom: 45,
        containLabel: true
      },
      title: {
        text: '',
        left: 20,
        textStyle: {
          fontSize: 15
        }
      },
      //折线图、柱状图
      tooltip: {
        show: false,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        position: function (point, params, dom, rect, size) {
          return [point[0]-60, point[1]];
        },
        formatter(params){
          let $b=params[0].name;
          let $str='';
          params.map(item=>{
            $str+= `\n${item.seriesName}：${item.value}`;
          });
          return $b+$str;
        }
      },
      //饼图
      tooltip2: {
        show:false,
        position: function (point, params, dom, rect, size) {
          return [point[0] - 60, point[1]];
        },
        formatter(params) {
          return `${params.name}：${params.percent}%(${params.value}万)`;
        }
      },
      barMaxWidth: 15,
      itemStyle: {
        barBorderRadius: [10, 10, 0, 0]
      },
      xAxisLabel: {
        interval: 0,
        rotate: 30
      },
      boundaryGap: true
    }
  }
})