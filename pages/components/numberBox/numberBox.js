// pages/components/numberBox/numberBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // index:{
    //   type:Number,
    //   value:0,
    //   observe(newVal, oldVal){

    //   }
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // input默认是1
    num: 1,
    // 使用data数据对象设置样式名
    minusStatus: 'disabled'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /* 点击减号 */
    bindMinus: function() {
      var num = this.data.num;
      // 如果大于1时，才可以减
      if (num > 1) {
        num--;
      }
      // 只有大于一件的时候，才能normal状态，否则disable状态
      var minusStatus = num <= 1 ? 'disabled' : 'normal';
      // 将数值与状态写回
      this.setData({
        num: num,
        minusStatus: minusStatus
      });
      this.triggerEvent('myevent', { num: this.data.num});
    },
    /* 点击加号 */
    bindPlus: function() {
      var num = this.data.num;
      // 不作过多考虑自增1
      num++;
      // 只有大于一件的时候，才能normal状态，否则disable状态
      var minusStatus = num < 1 ? 'disabled' : 'normal';
      // 将数值与状态写回
      this.setData({
        num: num,
        minusStatus: minusStatus
      });
      this.triggerEvent('myevent', { num: this.data.num});
    },
    /* 输入框事件 */
    bindManual: function(e) {
      var num = e.detail.value;
      // 将数值与状态写回
      this.setData({
        num: num
      });
      this.triggerEvent('myevent', { num: this.data.num});
    },
    /* 输入框失去焦点事件 */
    handleNumInputBlur(e){
      var num = e.detail.value;
      if(!num){
        num=1;
      }
      // 将数值与状态写回
      this.setData({
        num: num
      });
      this.triggerEvent('myevent', { num: this.data.num });
    }
  }
})