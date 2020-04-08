let echarts = require('../../utils/ec-canvas/echarts');
let wxCharts = require('../../utils/wxcharts.js');

let ringChart = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ecComponent1:null,
        ecComponent2:null,
        ecComponent3:null,
        // 图表数据
        ecopt: {
            lazyLoad: true
        },
    },
    setOptionPie(chart, data) {
        let value = [30000, 40000, 30000, 40000, 30000, 40000, 30000, 40000, 30000, 40000, 30000, 40000];
       
        const option = {
            color: ['#17d399', 'rgba(0,0,0,0)'],
            xAxis: {
                data: ["1月", "2月", "3月", "4月", "5月", "6月","7月", "8月", "9月", "10月", "11月", "12月"]
            },
            yAxis: {},
            series: [
                {
                    name: '走势',
                    type: 'bar',
                    center: ['50%', '50%'],
                    radius: ['55%', '70%'],
                    legendHoverLink: false,
                    hoverAnimation: false,
                    data: value,
                },
            ]
        };
        chart.setOption(option);
    },
    setOptionLine(chart, data) {
        let value = [30000, 40000, 30000, 40000, 30000, 40000, 30000, 40000, 30000, 40000, 30000, 40000];

        const option = {
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: '#17d399'
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '价格  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                },
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: '#FF9442'
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '价格  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                }
            ],
            yAxis: [{
                type: 'value'
            }],
            series: [
                {
                    name: '价格走势',
                    type: 'line',
                    xAxisIndex: 1,
                    smooth: true,
                    data: [1, 0.4, 1.3, 2.4, 4.3, 2, 1.3, 0.4, 3.3, 3.8,2.3, 4]
                },
                {
                    name: '价格走势2',
                    type: 'line',
                    smooth: true,
                    data: [3.9, 5.9, 1.1, 0.7, 3.3, 2.2, 1.6, 4.6, 5.4, 1.4, 1.3, 0.7]
                }
            ]
        };
        chart.setOption(option);
    },
    initPie(data) {
        this.ecComponent1.init((canvas, width, height) => {
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height
            });
            this.setOptionPie(chart, data);
            // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
            this.chart = chart;
            // 注意这里一定要返回 chart 实例，否则会影响事件处理等
            return chart;
        });
    },
    initLine(data){
        this.ecComponent2.init((canvas, width, height) => {
            const chartLine = echarts.init(canvas, null, {
                width: width,
                height: height
            });
            this.setOptionLine(chartLine, data);
            this.chartLine = chartLine;
            return chartLine;
        });
    },
    initLine2(data) {
        this.ecComponent3.init((canvas, width, height) => {
            const chartLine = echarts.init(canvas, null, {
                width: width,
                height: height
            });
            this.setOptionLine(chartLine, data);
            this.chartLine = chartLine;
            return chartLine;
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.ecComponent1 = this.selectComponent('#ecdom1');
        this.ecComponent2 = this.selectComponent('#ecdom2');
        this.ecComponent3 = this.selectComponent('#ecdom3');
        this.initPie(111)
        this.initLine(22)
        this.initLine2(3)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})