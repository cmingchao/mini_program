import {
  $http,
  date
} from '../../utils/util.js'
let globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否禁用姓名输入框
    disabled: false,
    formData: {
      phoneNumber: '',
      name: '',
      deliveryType: '',
      deliveryAddress: '',
      deliveryTime: '',
      desk: '',
      remarks: ''
    },
    deliveryTypeList: [],
    deliveryAddressList: [],
    deskList: [],
  },
  handleNameChange(e) {
    this.setData({
      'formData.name': e.detail.value
    });
  },
  // 输入手机号
  handlePhoneNumberChange(e) {
    let that = this;
    let formData = that.data.formData;
    let phoneNumber = e.detail.value;
    that.setData({
      'formData.phoneNumber': phoneNumber,
      'disabled': false
    });
    let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (phoneNumber && reg.test(phoneNumber)) {
      let p1 = $http({
          url: `/shopApi/getMemberNameByNumber?sessionId=${globalData.sessionId}&number=${phoneNumber}`
        }),
        p2 = $http({
          url: `/shopApi/getMemberByNumber?sessionId=${globalData.sessionId}&number=${phoneNumber}`
        });
      Promise.all([p1, p2]).then(([data1, data2]) => {
        if (data1.success) {
          if (data1.data) {
            that.setData({
              'formData.name': data1.data,
              disabled: true
            });
          } else {
            that.setData({
              'formData.name': '',
            });
          }
          // 回显会员信息
          if (data2.data) {
            let deliveryType = that.data.deliveryTypeList.findIndex(item => item.value === +data2.data.giveType);
            let deliveryAddress = that.data.deliveryAddressList.findIndex(item => item.value === +data2.data.deliveryAddress);
            let deliveryTime = data2.data.deliveryTime ? data2.data.deliveryTime.substr(11, 5) : '';
            let desk = that.data.deskList.findIndex(item => item.value === +data2.data.deskId);
            let remarks = data2.data.remarks;
            that.setData({
              'formData.deliveryType': deliveryType,
              'formData.deliveryAddress': deliveryAddress,
              'formData.deliveryTime': deliveryTime,
              'formData.desk': desk,
              'formData.remarks': remarks
            });
          } else {
            that.setData({
              'formData.deliveryType': '',
              'formData.deliveryAddress': '',
              'formData.deliveryTime': '',
              'formData.desk': '',
              'formData.remarks': ''
            });
          }
        } else {
          wx.showModal({
            title: '提示',
            content: '获取会员信息失败，原因：' + data1.message,
            showCancel: false,
            success(res) {
              if (res.confirm && data1.message.startsWith('手机号已注册')) {
                that.setData({
                  'formData.phoneNumber': ''
                });
              }
            }
          });
        }
      }).catch(err => {
        wx.showModal({
          title: '提示',
          content: '获取会员信息失败，原因：' + err,
          showCancel: false
        });
      });
    }
  },
  handleRemarksChange(e) {
    this.setData({
      'formData.remarks': e.detail.value
    });
  },
  handleDeliveryTypeChange(e) {
    this.setData({
      'formData.deliveryType': +e.detail.value
    });
  },
  handleDeliveryAddressChange(e) {
    this.setData({
      'formData.deliveryAddress': +e.detail.value
    });
  },
  handleDeskChange(e) {
    this.setData({
      'formData.desk': +e.detail.value
    });
  },
  handleDeliveryTimeChange(e) {
    this.setData({
      'formData.deliveryTime': e.detail.value
    });
  },
  // 下一步
  handleFormSubmit(e) {
    const params = e.detail.value;
    console.log('提交的数据params：', params);
    let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    let time = date + " " + params.deliveryTime;
    let timestamp1 = new Date(time).getTime();
    let timestamp2 = Date.now();
    //校验表单
    for (let key in params) {
      if ((params[key] === '' || params[key] === null || params[key] === undefined) && key !== 'remarks') {
        wx.showModal({
          title: '提示',
          content: '还有信息没有填写哦',
          showCancel: false
        });
        return false;
      }
    }
    if (!reg.test(params.phoneNumber)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的11位手机号',
        showCancel: false
      });
      return false;
    }
    if (params.name.trim().length < 2) {
      wx.showModal({
        title: '提示',
        content: '姓名至少为两个字符',
        showCancel: false
      });
      return false;
    }
    if (timestamp1 < timestamp2) {
      wx.showModal({
        title: '提示',
        content: '选择的时间需在当前时间之后',
        showCancel: false
      });
      return false;
    }
    // 验证通过
    let formData = this.data.formData;
    // 自提
    let obj = {
      phoneNumber: formData.phoneNumber,
      name: formData.name,
      deliveryType: this.data.deliveryTypeList[formData.deliveryType].value,
      desk: this.data.deskList[formData.desk].value,
      remarks: formData.remarks
    };
    // 正常送货
    if (formData.deliveryType === 0) {
      obj.deliveryAddress = this.data.deliveryAddressList[formData.deliveryAddress].value;
      obj.deliveryTime = date + ' ' + formData.deliveryTime + ':00';
    }
    console.log('提交的obj:', obj);
    globalData.formData = JSON.stringify(obj);
    wx.navigateTo({
      url: `/pages/goodsDetails/goodsDetails`
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let p1 = $http({
        url: `/shopApi/getDistributionType?sessionId=${globalData.sessionId}&configKey=distributionType`,
      }),
      p2 = $http({
        type: 'POST',
        url: `/shopApi/getDeliverAddress?sessionId=${globalData.sessionId}`
      }),
      p3 = $http({
        type: 'POST',
        url: `/shopApi/queryDeskPage?sessionId=${globalData.sessionId}`,
        data: {
          "current": 1,
          "pageSize": 100
        }
      });
    Promise.all([p1, p2, p3]).then(([data1, data2, data3]) => {
      let records = JSON.parse(data1.data.configJson);
      let deliveryTypeList = records.map(item => {
        return {
          label: item.name,
          value: +item.id
        }
      });
      let deliveryAddressList = data2.map(item => {
        return {
          label: item.addressName,
          value: +item.addressId
        }
      });
      let deskList = data3.records.map(item => {
        return {
          label: item.deskName,
          value: +item.deskId
        }
      });
      that.setData({
        deliveryTypeList,
        deliveryAddressList,
        deskList
      });
    }).catch(err => {
      wx.showModal({
        title: '提示',
        content: '获取数据失败，原因' + err,
        showCancel: false
      });
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: globalData.userName
    });
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