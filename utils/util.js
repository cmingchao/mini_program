const globalData = getApp().globalData;
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 发起请求
const $http = obj => {
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  let promise = new Promise((resolve, reject) => {
    wx.request({
      method: obj.type || 'GET',
      url: globalData.baseUrl + obj.url,
      data: obj.data || {},
      success(res) {
        let data = res.data;
        //token已过期
        if (data.status.code != '10000') {
          if (data.status.code=='10013'){
            wx.showModal({
              title: '提示',
              content: `登录已过期，原因：${data.status.msg}`,
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  // 重新登录
                  wx.redirectTo({
                    url: '/pages/mainEntrance/index/index'
                  });
                  return false;
                }
              }
            })
          }else{
            wx.showModal({
              title:'提示',
              content:`请求失败，原因：${data.status.msg}`
            });
            return false;
          }
        }
        // 未过期
        else resolve(data);
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
        wx.stopPullDownRefresh(); //停止下拉刷新
      }
    })
  });
  return promise;
}
export {
  $http
}