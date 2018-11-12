let baseUrl = 'http://192.168.1.221/xcx.gdwstech.com/index.php?s=/Admin';
// 发起请求
const $http = params => {
  wx.showLoading({
    title: '加载中'
  });
  let promise = new Promise((resolve, reject) => {
    wx.request({
      method: params.type || 'POST',
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
//  高度自适应
const getHeight = () => {
  let height=null;
  wx.getSystemInfo({
    success: function(res) {
      let windowHeight = res.windowHeight, //可使用窗口高度
        screenWidth = res.screenWidth, //屏幕宽度
        rpxR = 750 / screenWidth;
      height = windowHeight * rpxR - 90;
    }
  });
  return height;
};
// 滚动切换标签样式
const switchTab = (that,e)=>{
  that.setData({
    currentTab: e.detail.current
  });
  that.checkCor();
};
// 点击标题切换当前页时改变样式
const swichNav = (that,e)=> {
  let cur = e.target.dataset.current;
  if (that.data.currentTaB == cur) return false;
  else {
    that.setData({
      currentTab: cur
    });
  }
};
//判断当前滚动超过一屏时，设置tab标题滚动条。
const checkCor=that=>{
  let length = that.data.navList.length;
  if (that.data.currentTab > 3) {
    that.setData({
      scrollLeft: (length - 3) * 100
    });
  } else {
    that.setData({
      scrollLeft: 0
    });
  }
};
// 导出
export {
  $http,
  getHeight,
  switchTab,
  swichNav,
  checkCor
}