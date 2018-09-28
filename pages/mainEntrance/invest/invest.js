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
        url: "/mobileApi/getRentFirst.do",
        data: {
          token: globalData.token
        }
      }),
      p2 = $http({
        url: "/mobileApi/getRentSecond.do",
        data: {
          token: globalData.token
        }
      }),
      p3 = $http({
        url: "/mobileApi/getRentThird.do",
        data: {
          token: globalData.token
        }
      });
    Promise.all([p1, p2, p3]).then(([data1, data2, data3]) => {
      //第一个
      let option1 = {
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
      option1.title.text = '本月签约情况';
      option1.xAxis.data = data1.data.map(item => item.mallName || '');
      data1.data.map(item => {
        option1.series[0].data.push(item.signNumber || 0);
        option1.series[1].data.push(item.dueNumber || 0);
      })
      chart1.setOption(option1);
      //第二个
      let option2 = {
        color: globalData.baseOption.color,
        grid: globalData.baseOption.grid,
        title: globalData.baseOption.title,
        tooltip: globalData.baseOption.tooltip,
        legend: {
          bottom: 0,
          data: ['出租率']
        },
        xAxis: {
          data: [],
          axisLabel: globalData.baseOption.xAxisLabel,
          boundaryGap: globalData.baseOption.boundaryGap
        },
        yAxis: {
          type: 'value',
          name: '(%)'
        },
        series: [{
          name: '出租率',
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
        }, ]
      };
      option2.title.text = '项目出租率对比';
      option2.xAxis.data = data2.data.map(item => item.mallName || '');
      option2.series[0].data = data2.data.map(item => item.rentRate || 0);
      chart2.setOption(option2);
      //第三个
      let option3 = {
        color: globalData.baseOption.color,
        grid: globalData.baseOption.grid,
        title: globalData.baseOption.title,
        tooltip: globalData.baseOption.tooltip,
        legend: {
          bottom: 0,
          data: []
        },
        xAxis: {
          type: 'value',
          nameLocation: 'start',
          axisLabel: {
            formatter(params) {
              return `${params*100}%`;
            }
          }
        },
        yAxis: {
          type: 'category',
          data: [],
          axisLabel: globalData.baseOption.xAxisLabel,
          boundaryGap: globalData.baseOption.boundaryGap
        },
        series: [
          // {
          //   name: '餐饮',
          //   type: 'bar',
          //   stack: '总量',
          //   label: {
          //     show: true,
          //     position: 'inside'
          //   },
          //   data: [232,32,4]
          // }
        ]
      };
      option3.title.text = '项目业态分布';
      option3.tooltip.formatter = (params) => {
        let $b = params[0].name;
        let $str = '';
        params.map(item => {
          $str += `\n${item.seriesName}：${(item.value*100).toFixed(0)}%`
        });
        return $b + $str;
      };
      option3.yAxis.data = data3.data.map(item => item.name || '');
      let lengendData = [];
      data3.data.map(item => {
        item.value.map(item2 => {
          lengendData.push(item2.name || '');
        })
      });
      option3.legend.data = [...new Set(lengendData)];
      option3.legend.data.map(item => {
        let obj = {
          name: item || '',
          type: 'bar',
          barMaxWidth: globalData.baseOption.barMaxWidth + 5,
          stack: '总量',
          label: {
            show: true,
            position: 'inside',
            formatter(params) {
              return `${(params.value*100).toFixed(0)}%`;
            }
          },
          data: []
        }
        data3.data.map(item2 => {
          item2.value.map(item3 => {
            if (item == item3.name) {
              obj.data.push(item3.value || 0);
            }
          })
        });
        option3.series.push(obj);
      });
      // console.log(option3);
      chart3.setOption(option3);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //加载过快导致echarts未创建完成出现空值错误
    setTimeout(this.getData, globalData.time);
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