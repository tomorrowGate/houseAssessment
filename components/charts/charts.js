// components/charts/charts.js
//let charts = require('charts')
let echarts = require('../../utils/ec-canvas/echarts');
let wxCharts = require('../../utils/wxcharts.js');

let ringChart = null;
Component({
    //behaviors: [charts],
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        // 图表数据
        ecopt: {
            lazyLoad: true
        },
        ecComponent1: null,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        setOptionLine(chart, data) {
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
                    },
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: '#005DFC'
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
                        data: [1, 0.4, 1.3, 2.4, 4.3, 2, 1.3, 0.4, 3.3, 3.8, 2.3, 4]
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
        initLine(data) {
            this.ecComponent1.init((canvas, width, height) => {
                const chartLine = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });
                this.setOptionLine(chartLine, data);
                this.chartLine = chartLine;
                return chartLine;
            });
        },
    },
    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行
            this.ecComponent1 = this.selectComponent('#ecdom1');
            this.initLine(22)
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    pageLifetimes: {
        show: function () {
            // 页面被展示
        },
        hide: function () {
            // 页面被隐藏
        },
        resize: function (size) {
            // 页面尺寸变化
        }
    }
})
