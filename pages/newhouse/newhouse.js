let echarts = require('../../utils/ec-canvas/echarts');
let wxCharts = require('../../utils/wxcharts.js');

let ringChart = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //picker数据
        arrayCity: [{ name: "上城区"}, {name: "滨江区"}, {name: "萧山区"}, {name: "西湖区"}],
        pickerCityValue:"",
        arrayHouse: [{ name: "青青家园" }, { name: "三墩古镇" }, { name: "地铁城" }, { name: "国际城" }],
        pickerHouseValue: "",
        // 图表数据
        ecopt: {
            lazyLoad: true
        },
        bdMessage:["0-90","90-144","144-180","180以上"],
        bdCount:[
            {
                name:"0-500",
                arr:[622,3424,33,6]
            },
            {
                name: "500-800",
                arr: [622, 3424, 33, 6]
            },
            {
                name: "800-1200",
                arr: [622, 3424, 33, 6]
            },
            {
                name: "1200-1500",
                arr: ["", 3424, 33, 6]
            },
            {
                name: "1500-2000",
                arr: ["", "", 33, 6]
            },
            {
                name: "2000以上",
                arr: ["", "", "", 6]
            }
        ],
        trtdWidth:"140"
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //console.log(options)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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
    tapCityPicker(e){
        console.log(e)
    },
    bindPickerChangeCity(e){
        let value = this.data.arrayCity[e.detail.value]["name"]
        this.setData({
            pickerCityValue:value
        })
        console.log(value)
    },
    bindPickerChangeHouse(e) {
        let value = this.data.arrayHouse[e.detail.value]["name"]
        this.setData({
            pickerHouseValue: value
        })
        console.log(value)
    },
    confirmStart(){
        /* wx.showModal({
            title: '选择时间段',
            content: '请选择开始时间',
            success(res){
                console.log("用户点了确定")
            }
        }) */
    },
    bindPickerChangeTime(e){

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