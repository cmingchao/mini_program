let baseUrl = 'http://192.168.1.121:8089';
// let baseUrl = 'https://mtd.gdwstech.com';
// 发起请求
const $http = params => {
  wx.showLoading({
    title: '加载中'
  });
  let promise = new Promise((resolve, reject) => {
    wx.request({
      method: params.type || 'GET',
      url: baseUrl + params.url,
      data: params.data || {},
      success(res) {
        let data = res.data;
        //token已过期
        // if (data.status.code != '10000') {
        //   if (data.status.code == '10013') {
        //     wx.showModal({
        //       title: '提示',
        //       content: `登录已过期，原因：${data.status.msg}`,
        //       showCancel: false,
        //       success(res) {
        //         if (res.confirm) {
        //           // 重新登录
        //           wx.reLaunch({
        //             url: '/pages/mainEntrance/index/index'
        //           });
        //         }
        //       }
        //     })
        //   } else {
        //     wx.showModal({
        //       title: '提示',
        //       content: `请求失败，原因：${data.status.msg}`
        //     });
        //     return false;
        //   }
        // }
        // // 未过期
        // else 
        resolve(data);
      },
      fail(err) {
        wx.showModal({
          title: '提示',
          content: `请求失败，原因：${err.errMsg}`
        });
        return false;
      },
      complete() {
        wx.hideLoading();
      }
    })
  });
  return promise;
};
const formDate = () => {
  let date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate();
  let time = year + '-' + month + '-' + day;
  return time;
};
const date = formDate();
// 重新登录获取sessionId
const getSessionId = () => {
  wx.login({
    success: res => {
      if (res.code) {
        globalData.code = res.code;
        $http({
          url: '/app/getSessionKeyOropenid',
          data: {
            code: res.code,
            type: 3
          }
        }).then(data => {
          if (data.success) {
            globalData.sessionId = data.data;
          } else {
            wx.showModal({
              title: '提示',
              content: `获取sessionId失败，原因：${data.message}`
            });
          }
        });
      } else {
        wx.showModal({
          title: '提示',
          content: `登录小程序失败，原因：${res.errMsg}`
        });
      }
    }
  });
};
// 导出
export {
  $http,
  date,
  getSessionId
}