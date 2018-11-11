let baseUrl = 'http://192.168.1.128:8089';
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
        //           wx.redirectTo({
        //             url: '/pages/mainEntrance/index/index'
        //           });
        //           return false;
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
const getHeight = () => {
  let height=null;
  //  高度自适应
  wx.getSystemInfo({
    success: function(res) {
      let windowHeight = res.windowHeight, //可使用窗口高度
        screenWidth = res.screenWidth, //屏幕宽度
        rpxR = 750 / screenWidth;
      height = windowHeight * rpxR - 90;
    }
  });
  return height;
}
// 导出
export {
  $http,
  getHeight
}