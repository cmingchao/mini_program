// pages/mainEntrance/homePage/homePage.js
import * as echarts from '../components/ec-canvas/echarts';
const globalData = getApp().globalData;
import {
  $http
} from '../../../utils/util.js';
let chart1 = null,
  chart2 = null,
  chart3 = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todaySale: '',
    todayMonthIncome: '',
    todayMonthSign: '',
    todayDate: '',
    ec1: {
      onInit: function(canvas, width, height) {
        chart1 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart1);
        return chart1;
      }
    },
    ec2: {
      onInit: function(canvas, width, height) {
        chart2 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart2);
        return chart2;
      }
    },
    ec3: {
      onInit: function(canvas, width, height) {
        chart3 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart3);
        return chart3;
      }
    }
  },
  getData() {
    let that = this;
    let p1 = $http({
        url: "/mobileApi/getSaleFirst.do",
        data: {
          token: globalData.token
        }
      }),
      p2 = $http({
        url: "/mobileApi/getRentFirst.do",
        data: {
          token: globalData.token
        }
      }),
      p3 = $http({
        url: "/mobileApi/getSettleFirst.do",
        data: {
          token: globalData.token
        }
      }),
      p4 = $http({
        url: "/mobileApi/getHomeFirst.do",
        data: {
          token: globalData.token
        }
      });
    Promise.all([p1, p2, p3, p4]).then(([data1, data2, data3, data4]) => {
      //第一个
      let option1 = {
        color: globalData.baseOption.color,
        grid: globalData.baseOption.grid,
        title: globalData.baseOption.title,
        tooltip: globalData.baseOption.tooltip,
        legend: {
          bottom: 0,
          data: []
        },
        xAxis: {
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
          axisLabel: globalData.baseOption.xAxisLabel,
          boundaryGap: globalData.baseOption.boundaryGap
        },
        yAxis: {
          name: '(万)'
        },
        series: [
          // {
          //   name: 'A项目',
          //   type: 'line',
          //   symbolSize: 8,
          //   label: {
          //     show: true
          //   },
          //   data: []
          // }
        ]
      };
      option1.title.text = '本周销售走势';
      option1.legend.data = data1.data.map(item => item.name);
      data1.data.map(item => {
        option1.series.push({
          name: item.name || '',
          type: 'line',
          symbolSize: 8,
          label: {
            show: true,
            formatter(params) {
              let value = params.value
              if (value) return value;
              else return '';
            }
          },
          data: item.value || []
        })
      });
      chart1.setOption(option1);
      //第二个
      let option2 = {
        color: globalData.baseOption.color,
        grid: globalData.baseOption.grid,
        title: globalData.baseOption.title,
        tooltip: globalData.baseOption.tooltip,
        legend: {
          bottom: 0,
          data: ['签约数', '合同到期数']
        },

        xAxis: {
          data: [],
          axisLabel: globalData.baseOption.xAxisLabel,
          boundaryGap: globalData.baseOption.boundaryGap
        },
        yAxis: {
          type: 'value'
        },
        series: [{
            name: '签约数',
            type: 'bar',
            barMaxWidth: globalData.baseOption.barMaxWidth,
            label: {
              show: true,
              position: 'top',
              color: '#666',
              formatter(params) {
                let value = params.value
                if (value) return value;
                else return '';
              }
            },
            itemStyle: globalData.baseOption.itemStyle,
            data: []
          },
          {
            name: '合同到期数',
            type: 'bar',
            barMaxWidth: globalData.baseOption.barMaxWidth,
            label: {
              show: true,
              position: 'top',
              color: '#666',
              formatter(params) {
                let value = params.value
                if (value) return value;
                else return '';
              }
            },
            itemStyle: globalData.baseOption.itemStyle,
            data: []
          }
        ]
      };
      option2.title.text = '本月签约情况';
      option2.xAxis.data = data2.data.map(item => item.mallName || '');
      data2.data.map(item => {
        option2.series[0].data.push(item.signNumber || 0);
        option2.series[1].data.push(item.dueNumber || 0);
      })
      chart2.setOption(option2);
      //第三个
      let option3 = {
        color: globalData.baseOption.color,
        grid: globalData.baseOption.grid,
        title: globalData.baseOption.title,
        tooltip: globalData.baseOption.tooltip,
        legend: {
          bottom: 0,
          data: ['本月实收', '本月应收']
        },
        xAxis: {
          data: [],
          axisLabel: globalData.baseOption.xAxisLabel,
          boundaryGap: globalData.baseOption.boundaryGap
        },
        yAxis: {
          type: 'value',
          name: '(万)'
        },
        series: [{
            name: '本月实收',
            type: 'bar',
            barMaxWidth: globalData.baseOption.barMaxWidth,
            label: {
              show: true,
              position: 'top',
              color: '#666',
              formatter(params) {
                let value = params.value
                if (value) return value;
                else return '';
              }
            },
            itemStyle: globalData.baseOption.itemStyle,
            data: []
          },
          {
            name: '本月应收',
            type: 'bar',
            barMaxWidth: globalData.baseOption.barMaxWidth,
            label: {
              show: true,
              position: 'top',
              color: '#666',
              formatter(params) {
                let value = params.value
                if (value) return value;
                else return '';
              }
            },
            itemStyle: globalData.baseOption.itemStyle,
            data: []
          }
        ]
      };
      option3.title.text = '本月收入统计';
      option3.xAxis.data = data3.data.map(item => item.mallName || '');
      data3.data.map(item => {
        option3.series[0].data.push(item.paymentMoney || 0);
        option3.series[1].data.push(item.receiveMoney || 0);
      })
      chart3.setOption(option3);
      //header数据
      that.setData({
        todaySale: data4.data[0].todaySaleAmount || 0,
        todayMonthIncome: data4.data[0].currentMonthIncome || 0,
        todayMonthSign: data4.data[0].currentMonthSignNumber || 0,
      });
    });
  },
  getNowFormatDate() {
    let myDate = new Date(),
      year = myDate.getFullYear(),
      month = myDate.getMonth() + 1,
      date = myDate.getDate(),
      seperator = "-";
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    let currentDate = year + seperator + month + seperator + date;
    return currentDate;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //加载过快导致echarts未创建完成出现空值错误
    setTimeout(this.getData, globalData.time);
    // 获取当天日期
    this.setData({
      todayDate: this.getNowFormatDate()
    });
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
    setTimeout(this.getData, globalData.time);
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