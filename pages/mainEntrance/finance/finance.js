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
        url: "/mobileApi/getSettleFirst.do",
        data: {
          token: globalData.token
        }
      }),
      p2 = $http({
        url: "/mobileApi/getSettleSecond.do",
        data: {
          token: globalData.token
        }
      }),
      p3 = $http({
        url: "/mobileApi/getSettleThird.do",
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
      option1.title.text = '本月收入统计';
      option1.xAxis.data = data1.data.map(item => item.mallName || '');
      data1.data.map(item => {
        option1.series[0].data.push(item.receiveMoney || 0);
        option1.series[1].data.push(item.paymentMoney || 0);
      })
      chart1.setOption(option1);
      //第二个
      let option2 = {
        color: globalData.baseOption.color,
        grid: globalData.baseOption.grid,
        title: globalData.baseOption.title,
        tooltip: globalData.baseOption.tooltip,
        legend: {
          show:true,
          bottom: 0,
          data: ['收缴率']
        },
        xAxis: {
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisLabel: globalData.baseOption.xAxisLabel,
          boundaryGap: globalData.baseOption.boundaryGap
        },
        yAxis: {
          type: 'value',
          name: '(%)'
        },
        series: [
          {
            name: '收缴率',
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
      option2.title.text = '收缴率统计';
      option2.series[0].data=data2.data[0].value || [];
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
          name: '(万)',
          nameLocation:'center'
        },
        yAxis: {
          type:'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisLabel: globalData.baseOption.xAxisLabel,
          boundaryGap: globalData.baseOption.boundaryGap
        },
        series: [
          //   {
          //   name: 'A项目',
          //   type: 'bar',
          //   barMaxWidth: 30,
          // label: {
          //   show: true,
          //   position: 'top',
          //   color: '#666',
          //   formatter(params) {
          //     let value = params.value
          //     if (value) return value;
          //     else return '';
          //   }
          // },
          // itemStyle: {
          //   barBorderRadius: [5, 5, 0, 0]
          // },
          //   data: []
          // }
        ]
      };
      option3.title.text = '年度租金分布';
      option3.legend.data = data3.data.map(item => item.name || '');
      data3.data.map(item => {
        option3.series.push({
          name: item.name || '',
          type: 'bar',
          barMaxWidth: globalData.baseOption.barMaxWidth,
          label: {
            show: true,
            position: 'right',
            color: '#666',
            formatter(params) {
              let value = params.value
              if (value) return value;
              else return '';
            }
          },
          itemStyle: {
            barBorderRadius: [0, 5, 5, 0]
          },
          data: item.value || []
        })
      })
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