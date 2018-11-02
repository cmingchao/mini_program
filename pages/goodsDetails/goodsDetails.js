import {
  $http
} from '../../utils/util.js'
let globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 要搜索输入的商品名称
    goodsName: '',
    // 是否显示添加商品对话框
    showDialog: false,
    // 是否显示下拉历史记录框
    showDropDown: false,
    // 通过创建商品，商品数量,默认为1
    goodsNum: 1,
    // 当前要改变数量操作的商品的索引
    index: 0,
    // 上一页面传过来的json
    formData: {},
    // 快捷键列表
    shortCutList: [
      // {
      //   goodsName: '',
      //   shortcutKey: '',
      //   id: ''
      // }
    ],
    // 历史记录列表
    historyRecordsList: [
      // {
      //   goodsName: item.goodName,
      //   id: item.id
      // }
    ],
    // 已添加的商品列表
    goodsList: [
      // {
      //   goodsName: '',
      //   goodsNum: ''
      // }
    ],
    /**
     * 
     */

    num: 1,
    // 使用data数据对象设置样式名
    minusStatus: 'disabled'
  },
  // 点击快捷键添加商品
  handleShortcutAdd(e) {
    let goodsName = e.currentTarget.dataset.goodsname;
    this.handleShortcutAndSearchAddGoods(goodsName);
  },

  // 输入商品名称时,查询历史记录
  handleInputGoodsName(e) {
    let that = this;
    let value = e.detail.value.trim();
    that.setData({
      goodsName: value,
      historyRecordsList: []
    });
    if (!value) {
      that.setData({
        showDropDown: false
      });
      return false;
    };
    $http({
      type: 'POST',
      url: `/shopApi/queryGoodList?sessionId=${globalData.sessionId}&goodName=${value}`
    }).then(data => {
      if (data.success) {
        if (data.data.length) {
          let arr = data.data.map(item => {
            return {
              goodsName: item.goodName,
              id: item.id
            };
          });
          that.setData({
            showDropDown: true,
            historyRecordsList: arr
          });
        }
      } else {
        wx.showModal({
          title: '提示',
          content: '获取该商品数据失败，原因：' + data.message,
          showCancel: false
        });
      }
    }).catch(err => {
      wx.showModal({
        title: '提示',
        content: '获取该商品数据失败，原因：' + err,
        showCancel: false
      });
    })
  },
  // 点击手机键盘完成按钮时
  handleInputConfirmGoodsName(e) {

  },
  // 跳转到设置快捷键页面
  handleShortcutSet() {
    wx.navigateTo({
      url: '/pages/shortcutSet/shortcutSet'
    });
  },
  //删除商品
  handleDelete(e) {
    let that = this;
    let index = +e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: "确定要删除该商品吗？",
      success(res) {
        if (res.confirm) {
          let arr = that.data.goodsList;
          arr.splice(index, 1);
          wx.showToast({
            title: '删除成功',
          });
          that.setData({
            goodsList: arr
          });
        }
      }
    });
  },
  // 提交保存到后台
  handleSubmit() {
    let that = this;
    let formData = that.data.formData;
    let goodsList = that.data.goodsList;
    console.log('商品列表：', goodsList)
    for (let key in formData) {
      if ((formData[key] === null || formData[key] === undefined) && key !== 'remarks') {
        wx.showModal({
          title: '提示',
          content: '请检查上一页面是否填写完整或者正确',
          showCancel: false
        });
        return false;
      }
    }
    if (!goodsList.length) {
      wx.showModal({
        title: '提示',
        content: '提交错误，请添加商品',
        showCancel: false
      });
      return false;
    }

    let idx = goodsList.findIndex(item => !item.goodsNum || item.goodsNum < 1);
    if (idx > -1) {
      wx.showModal({
        title: '提示',
        content: `请设置商品${idx+1}的数量`,
        showCancel: false
      });
      return false;
    }
    let str = goodsList[0].goodsName + '*' + goodsList[0].goodsNum;
    for (let i = 1; i < goodsList.length; i++) {
      str += ';' + goodsList[i].goodsName + '*' + goodsList[i].goodsNum;
    }
    let obj = {
      "deliveryAddress": +formData.deliveryAddress,
      "deliveryTime": formData.deliveryTime,
      "deskId": +formData.desk,
      "giveType": +formData.deliveryType,
      "goodsDetail": str,
      "mobile": formData.phoneNumber,
      "realName": formData.name,
      "remarks": formData.remarks || ''
    };
    $http({
      type: 'POST',
      url: `/shopApi/createServeInfo?sessionId=${globalData.sessionId}`,
      data: obj
    }).then(data => {
      if (data.success) {
        wx.showToast({
          title: '创建服务单成功',
        });
        wx.redirectTo({
          url: '/pages/orderList/orderList',
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '创建服务单失败，原因：' + data.message,
          showCancel: false
        });
      }
    }).catch(err => {
      wx.showModal({
        title: '提示',
        content: '创建服务单失败，原因：' + err,
        showCancel: false
      });
    });
  },
  // 点击创建商品按钮，显示创建商品对话框
  handleShowAddGoodsDialog() {
    this.setData({
      showDialog: true,
      goodsNum: 1
    });
  },
  // 点击取消，不创建商品，隐藏添加商品对话框
  handleHideAddGoodsDialog() {
    this.setData({
      showDialog: false
    });
  },
  //通过创建添加商品
  handleAddGoods(e) {
    let value = e.detail.value;
    if (!value.goodsName) {
      wx.showModal({
        title: '提示',
        content: '请输入商品名称',
        showCancel: false
      });
      return false;
    }
    let arr = this.data.goodsList;
    let flag = arr.findIndex(item => item.goodsName === value.goodsName);
    if (flag > -1) {
      wx.showModal({
        title: '提示',
        content: '该商品已在商品列表中,请直接设置数量',
        showCancel: false
      });
      return false;
    }
    if (!+this.data.goodsNum) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的商品数量',
        showCancel: false
      });
      return false;
    }
    arr.push({
      goodsName: value.goodsName,
      goodsNum: +this.data.goodsNum
    });
    wx.showToast({
      title: '创建商品成功',
    });
    this.setData({
      goodsList: arr,
      showDialog: false
    });
  },
  // 通过快捷键或者点击历史记录添加商品
  handleShortcutAndSearchAddGoods(goodsName) {
    this.setData({
      goodsName,
      showDropDown: false
    });
    let arr = this.data.goodsList;
    let flag = arr.findIndex(item => item.goodsName === goodsName);
    if (flag > -1) {
      wx.showModal({
        title: '提示',
        content: '该商品已在商品列表中,请直接设置数量',
        showCancel: false
      });
      return false;
    }
    arr.push({
      goodsName: this.data.goodsName,
      goodsNum: 1
    });
    this.setData({
      goodsList: arr
    });
  },
  // 点击其中一条搜索历史记录添加商品
  handleClickHistory(e) {
    let goodsName = e.currentTarget.dataset.goodsname;
    this.handleShortcutAndSearchAddGoods(goodsName);
  },
  //获取快捷键
  getShortCutList() {
    let that = this;
    $http({
      url: `/shopApi/getShortcutKey?sessionId=${globalData.sessionId}`
    }).then(data => {
      if (data.success) {
        let arr = data.data.map(item => {
          return {
            goodsName: item.goodName,
            shortcutKey: item.shortcutKey,
            id: item.id
          }
        });
        that.setData({
          shortCutList: arr
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '获取快捷键数据失败，原因：' + data.message,
          showCancel: false
        });
      }
    })
  },
  // 添加商品数量
  handleMyEvent(e) {
    this.setData({
      goodsNum: e.detail.num
      // index:e.detial.index
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let formData = JSON.parse(globalData.formData);
    console.log("解析后formData:", formData);
    this.setData({
      formData
    });
    this.getShortCutList();
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
    this.getShortCutList();
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

  },
  /**
   * 
   */
  /* 点击减号 */
  bindMinus: function(e) {
    console.log(e)
    let index = +e.currentTarget.dataset.index;
    let num = +e.currentTarget.dataset.num;
    // 如果大于1时，才可以减
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      index,
      num: num,
      minusStatus: minusStatus
    });
    this.handleChangeGoodsNum();
  },
  /* 点击加号 */
  bindPlus: function(e) {
    let index = +e.currentTarget.dataset.index;
    let num = +e.currentTarget.dataset.num;
    // 不作过多考虑自增1
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      index,
      num: num,
      minusStatus: minusStatus
    });
    this.handleChangeGoodsNum();
  },
  /* 输入框事件 */
  bindManual: function(e) {
    let index = +e.currentTarget.dataset.index;
    var num = +e.detail.value;
    // if (num===0) num=1;
    // 将数值与状态写回
    this.setData({
      index,
      num: num
    });
    this.handleChangeGoodsNum();
  },
  // 商品数量输入失去焦点时
  handleNumInputBlur(e) {
    let index = +e.currentTarget.dataset.index;
    var num = +e.detail.value;
    if (!num) {
      num = 1;
    }
    // 将数值与状态写回
    this.setData({
      index,
      num: num
    });
    this.handleChangeGoodsNum();
  },
  // 点击某条商品更改商品数量
  handleChangeGoodsNum() {
    let goodsList = this.data.goodsList;
    goodsList[this.data.index].goodsNum = +this.data.num;
    this.setData({
      goodsList
    });
  }
})