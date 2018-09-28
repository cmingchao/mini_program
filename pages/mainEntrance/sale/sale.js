// pages/mainEntrance/homePage/homePage.js
import * as echarts from '../components/ec-canvas/echarts';
const globalData = getApp().globalData;
import {
  $http
} from '../../../utils/util.js';
let chart1 = null,
  chart2 = null,
  chart3 = null,
  chart4 = null;
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
    },
    ec4: {
      onInit: function(canvas, width, height) {
        chart4 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart3);
        return chart4;
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
        url: "/mobileApi/getSaleSecond.do",
        data: {
          token: globalData.token
        }
      }),
      p3 = $http({
        url: "/mobileApi/getSaleThird.do",
        data: {
          token: globalData.token
        }
      }),
      p4 = $http({
        url: "/mobileApi/getSaleFourth.do",
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
          type: 'value',
          name: '(万)'
        },
        series: [
          //   {
          //   name: 'B店铺',
          //   type: 'line',
          //   symbolSize: 8,
          //   label: {
          //     show: true
          //   },
          //   data: [1, 2, 3, 4, 5, 6, 7]
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
        tooltip: globalData.baseOption.tooltip2,
        legend: {
          bottom: 0,
          data: []
        },
        series: [{
          type: 'pie',
          label: {
            show: true,
            position: 'inside',
            formatter: '{d}%\n({c}万)'
          },
          labelLine: {
            show: false
          },
          radius: ['0%', '65%'],
          center: ['50%', '50%'],
          data: [
            //   {
            //   value: 0,
            //   name: ''
            // }
          ]
        }]
      };
      option2.title.text = '本月业态销售占比';
      option2.legend.data = data2.data.map(item => item.brandcatName || '');
      data2.data.map(item => {
        option2.series[0].data.push({
          value: item.saleAmount || 0,
          name: item.brandcatName || ''
        });
      })
      chart2.setOption(option2);
      //第三个
      let option3 = {
        color: globalData.baseOption.color,
        grid: globalData.baseOption.grid,
        title: globalData.baseOption.title,
        tooltip: globalData.baseOption.tooltip2,
        legend: {
          bottom: 0,
          data: []
        },
        series: [{
          type: 'pie',
          label: {
            show: true,
            position: 'inside',
            formatter: '{d}%\n({c}万)'
          },
          labelLine: {
            show: false
          },
          radius: ['0%', '65%'],
          center: ['50%', '50%'],
          data: [
            //   {
            //   value: 0,
            //   name: ''
            // }
          ]
        }]
      };
      option3.title.text = '本月项目销售占比';
      option3.legend.data = data3.data.map(item => item.mallName || '');
      data3.data.map(item => {
        option3.series[0].data.push({
          value: item.saleAmount || 0,
          name: item.mallName || ''
        });
      });
      chart3.setOption(option3);
      // 第四个
      let option4 = {
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
      option4.title.text = '品牌销售TOP10';
      option4.xAxis.data = data4.data.map(item => item.brandName || '');
      option4.series[0].data = data4.data.map(item => item.saleAmount || 0);
      chart4.setOption(option4);
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