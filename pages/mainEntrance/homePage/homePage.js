// pages/mainEntrance/homePage/homePage.js
import * as echarts from '../components/ec-canvas/echarts';
const globalData = getApp().globalData;
import {
  $http,
  getDay
} from '../../../utils/util.js';
let chart1 = null,
  chart2 = null,
  chart3 = null,
  chart4 = null,
  chart5 = null,
  chart6 = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todaySale: '',
    todayPassengerflow: '',
    todayMonthIncome: '',
    todayMonthSign: '',
    todayDate: getDay(0),
    dateList: [],
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
    },
    ec4: {
      onInit: function(canvas, width, height) {
        chart4 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart4);
        return chart4;
      }
    },
    ec5: {
      onInit: function(canvas, width, height) {
        chart5 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart5);
        return chart5;
      }
    },
    ec6: {
      onInit: function(canvas, width, height) {
        chart6 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart6);
        return chart6;
      }
    }
  },
  getData() {
    let that = this;
    let p0 = $http({
        url: "/mobileApi/getHomeFirst.do",
        data: {
          token: globalData.token
        }
      }),
      p1 = $http({
        url: "/mobileApi/getKeliuFirst.do",
        data: {
          token: globalData.token
        }
      }),
      p2 = $http({
        url: "/mobileApi/getKeliuSecond.do",
        data: {
          token: globalData.token
        }
      }),
      p3 = $http({
        url: "/mobileApi/getSaleFourth.do",
        data: {
          token: globalData.token
        }
      }),
      p4 = $http({
        url: "/mobileApi/getSaleFirst.do",
        data: {
          token: globalData.token
        }
      }),
      p5 = $http({
        url: "/mobileApi/getRentFirst.do",
        data: {
          token: globalData.token
        }
      }),
      p6 = $http({
        url: "/mobileApi/getSettleFirst.do",
        data: {
          token: globalData.token
        }
      });
    Promise.all([p0, p1, p2, p3, p4, p5, p6]).then(([data0, data1, data2, data3, data4, data5, data6]) => {
      //header数据
      data0.data = !data0.data ? [] : data0.data;
      that.setData({
        todaySale: data0.data[0].todaySaleAmount || 0,
        todayPassengerflow: data0.data[0].keliuNumber || 0,
        todayMonthIncome: data0.data[0].currentMonthIncome || 0,
        todayMonthSign: data0.data[0].currentMonthSignNumber || 0,
      });
      //第1个
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
          data: this.data.dateList,
          axisLabel: globalData.baseOption.xAxisLabel,
          boundaryGap: globalData.baseOption.boundaryGap
        },
        yAxis: {
          name: '(人)'
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
      option1.title.text = '近7天客流走势';
      data1.data = !data1.data ? [] : data1.data;
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
      // 第2个
      let option2 = {
        color: globalData.baseOption.color,
        grid: globalData.baseOption.grid,
        title: globalData.baseOption.title,
        tooltip: globalData.baseOption.tooltip,
        xAxis: {
          data: [],
          axisLabel: globalData.baseOption.xAxisLabel,
          boundaryGap: globalData.baseOption.boundaryGap
        },
        yAxis: {
          name: '(人)'
        },
        series: [{
          name: '客流量',
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
        }]
      };
      option2.title.text = '当日商户客流TOP10';
      data2.data = !data2.data ? [] : data2.data;
      option2.xAxis.data = data2.data.map(item => item.tenantName || '');
      option2.series[0].data = data2.data.map(item => item.enCount || 0);
      chart2.setOption(option2);
      // 第3个
      let option3 = {
        color: globalData.baseOption.color,
        grid: globalData.baseOption.grid,
        title: globalData.baseOption.title,
        tooltip: globalData.baseOption.tooltip,
        xAxis: {
          data: [],
          axisLabel: globalData.baseOption.xAxisLabel,
          boundaryGap: globalData.baseOption.boundaryGap
        },
        yAxis: {
          name: '(万)'
        },
        series: [{
          name: '销售量',
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
        }]
      };
      option3.title.text = '本月品牌销售TOP10';
      data3.data = !data3.data ? [] : data3.data;
      option3.xAxis.data = data3.data.map(item => item.brandName || '');
      option3.series[0].data = data3.data.map(item => item.saleAmount || 0);
      chart3.setOption(option3);
      //第4个
      let option4 = {
        color: globalData.baseOption.color,
        grid: globalData.baseOption.grid,
        title: globalData.baseOption.title,
        tooltip: globalData.baseOption.tooltip,
        legend: {
          bottom: 0,
          data: []
        },
        xAxis: {
          data: this.data.dateList,
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
      option4.title.text = '近7天销售走势';
      data4.data = !data4.data ? [] : data4.data;
      option4.legend.data = data4.data.map(item => item.name);
      data4.data.map(item => {
        option4.series.push({
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
      chart4.setOption(option4);

      //第5个
      let option5 = {
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
      option5.title.text = '本月签约情况';
      data5.data = !data5.data ? [] : data5.data;
      option5.xAxis.data = data5.data.map(item => item.mallName || '');
      data5.data.map(item => {
        option5.series[0].data.push(item.signNumber || 0);
        option5.series[1].data.push(item.dueNumber || 0);
      })
      chart5.setOption(option5);
      //第6个
      let option6 = {
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
      option6.title.text = '本月收入统计';
      data6.data = !data6.data ? [] : data6.data;
      option6.xAxis.data = data6.data.map(item => item.mallName || '');
      data6.data.map(item => {
        option6.series[0].data.push(item.paymentMoney || 0);
        option6.series[1].data.push(item.receiveMoney || 0);
      })
      chart6.setOption(option6);
    });
  },
  // 返回近7天日期
  getCurrentSevenDate() {
    let dateList = this.data.dateList;
    for (let i = -6; i < 1; i++) {
      let date = getDay(i);
      dateList.push(date);
    }
    this.setData({
      dateList
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //加载过快导致echarts未创建完成出现空值错误
    setTimeout(this.getData, globalData.time);
    this.getCurrentSevenDate();
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