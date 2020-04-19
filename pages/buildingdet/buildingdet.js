import { option, option2, option2_1, option3, option3_1, option4, option4_1 } from "../../mock/mockData.js"
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
        chartData: {},
        chartData2: {},

        chart:{},
        chart2:{}
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
    loadData(){
        let arr = [option, option2, option2_1, option3, option3_1, option4, option4_1]
            , randomInit = parseInt(Math.random() * arr.length)
        this.setData({
            chartData: arr[randomInit],
            chartData2: arr[parseInt(Math.random() * arr.length)]
        })
        this.chart.initLine(arr[randomInit])
        this.chart2.initLine(arr[parseInt(Math.random() * arr.length)])
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
       /*  this.ecComponent2 = this.selectComponent('#ecdom2');
        this.ecComponent3 = this.selectComponent('#ecdom3'); */
        this.initPie(111)
        /* this.initLine(22)
        this.initLine2(3) */
        this.chart = this.selectComponent("#chart");
        this.chart2 = this.selectComponent("#chart2");
        this.loadData()
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