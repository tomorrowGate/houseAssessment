// components/charts/charts.js
//let charts = require('charts')
import { option, option2} from "../../mock/mockData.js"
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
        option,
        option2,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        setOptionLine(chart, data) {
            let _this = this
            chart.setOption(_this.data.option2);
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
