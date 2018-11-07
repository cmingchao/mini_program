const globalData = getApp().globalData;
// 发起请求
const ajaxPost = paramsObj => {
  wx.showLoading({
    title: '加载中',
    mask: true //是否显示透明蒙层，防止触摸穿透
  });
  wx.request({
    method: paramsObj.type || 'GET',
    url: globalData.baseUrl + paramsObj.url,
    data: paramsObj.data || {},
    success(res) {
      //登录已过期
      if (res.data.message == 'Unauthorized') {
        wx.showModal({
          title: '提示',
          content: `获取数据失败，原因：${res.data.message}`,
          showCancel: false,
          success(res) {
            if (res.confirm) {
              // 重新登录
              wx.reLaunch({
                url: '/pages/mainEntrance/index/index',
                success() {
                  getSessionId();
                }
              })
            }
          }
        })
      }
      // 未过期
      else paramsObj.success(res);
    },
    fail(err) {
      if (paramsObj.fail) {
        paramsObj.fail(err);
      } else {
        wx.showModal({
          title: '提示',
          content: `请求失败，原因：${err.errMsg}`,
          showCancel: false
        })
      }
    },
    complete() {
      wx.hideLoading();
    }
  })
};

// 获取当日配送统计数据
const getDeliverCount = (that) => {
  ajaxPost({
    url: `/deliverApi/getDeliverCount?sessionId=${globalData.sessionId}`,
    data: {},
    success(res) {
      let data = res.data;
      // 获取数据成功
      if (data.success) {
        that.setData({
          "headerData.obj": {
            waitTakeGoodsNum: data.data.waitTake || 0,
            waitGiveGoodsNum: data.data.waitGive || 0,
            takeGoodsCompleteNum: data.data.takeOver || 0,
            giveGoodsCompleteNum: data.data.giveOver || 0
          }
        })
      }
      // 获取数据失败
      else {
        wx.showModal({
          title: '获取数据失败',
          content: `失败原因：${data.message || '未知'}`,
          showCancel: false
        })
      }
    }
  })
}
// 重新登录获取sessionId
const getSessionId = () => {
  wx.login({
    success: res => {
      if (res.code) {
        globalData.code = res.code;
        wx.request({
          url: globalData.baseUrl + '/app/getSessionKeyOropenid',
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
};
// 导出
export default {
  ajaxPost,
  getDeliverCount,
  getSessionId
}