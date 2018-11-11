// pages/components/ticketItem/ticketItem.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    flag: { // 属性名
      type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: false, // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },
    res: {
      type: Object,
      value:{
        img:'/images/tu.png',
        title:'68元单人下午茶套餐',
        shopName:'长岛咖啡',
        deadline:'2019-03-12',
        num:8
      }
    },
    url: String  //页面路径
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDetails(){
      let url=this.data.url;
      if (url==='index'){
        wx.navigateTo({
          url: '/pages/activityDetails/activityDetails',
        });
      }else{
        wx.navigateTo({
          url: '/pages/orderDetails/orderDetails',
        });
      }
    }
  }
})
