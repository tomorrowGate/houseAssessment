import { table1, table2, table3, table4, option, option1_1, option3, option3_1, optionTime, optionTotcalLine, backBarAndLine} from "../../mock/mockData.js"
import { countMonthList, getMonths } from "../../utils/dateCalc.js"
let echarts = require('../../utils/ec-canvas/echarts');
let wxCharts = require('../../utils/wxcharts.js');

let ringChart = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        charts: {},
        transactionType: "",//交易类型
        //picker数据
        arrayCity: [{ name: "杭州主城区" }, { name: "杭州市区" }],
        pickerCityValue: "",
        arrHouseInit: "土地性质", 
        arrayHouse: [{ name: "工业" }, { name: "集体" }, { name: "居住" }, { name: "商业" }, { name: "商住" }, { name: "其他" }],
        pickerHouseValue: "",
        pickerTime: "",

        showModal: false,//是否显示日期弹框
        startTime: "",
        endTime: "",
        // 图表数据
        ecopt: {
            lazyLoad: true
        },
        chartData: {},
        tableDataNum: [],
        tableDataArea: [],
        bdMessage: ["0-90", "90-144", "144-180", "180以上"],
        trtdWidth: "140"
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
        this.charts1 = this.selectComponent("#chart1");
        this.charts2 = this.selectComponent("#chart2");
        this.charts3 = this.selectComponent("#chart3");

        this.charts1.initLine(optionTime)
        this.charts2.initLine(backBarAndLine("成交宗数", "建面", getMonths()))
        this.charts3.initLine(backBarAndLine("挂牌宗数", "建面", getMonths()))
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    randoms() {
        let arr = [option, option1_1, option3, option3_1]
            , arrTable = [table1, table2, table3, table4,]
            , randomInit = parseInt(Math.random() * arr.length)
            , tableDataNum = arrTable[parseInt(Math.random() * arr.length)]
            , tableDataArea = arrTable[parseInt(Math.random() * arr.length)]
        this.setData({
            /*  chartData: arr[randomInit], */
            tableDataArea,
        })
        console.log(arr[randomInit])
    },
    tapCityPicker(e) {
        console.log(e)
    },
    bindPickerChangeCity(e) {
        let value = this.data.arrayCity[e.detail.value]["name"]
        this.setData({
            pickerCityValue: value
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
    confirmStart() {
        this.setData({
            showModal: true,
        })
    },
    bindPickerChangeTime(e) {

    },
    //获取时间段
    getTimeCut(options) {
        this.setData({
            startTime: options.detail.startTime,
            endTime: options.detail.endTime,
            pickerTime: options.detail.startTime + '-' + options.detail.endTime
        })
        console.log(this.data.pickerTime)
        let arr = countMonthList(options.detail.startTime, options.detail.endTime)
            , randomData = [];
        arr.forEach((v, i) => {
            randomData.push(parseInt(5 + Math.random() * 95))
        })

        optionTime.xAxis[0].data = arr
        optionTime.series[0].data = randomData
        console.log(arr, optionTime)
        this.setData({
            chartData: optionTime
        })
        if (!this.data.pickerCityValue) {
            wx.showToast({
                title: '请选择城区',
                icon: "none"
            })
            return
        }

        if (!this.data.pickerHouseValue) {
            wx.showToast({
                title: '请选择住宅',
                icon: "none"
            })
            return
        }
        this.charts1.initLine(optionTime)
        this.randoms()
        this.charts2.initLine(backBarAndLine("成交宗数", "建面", arr))
        this.charts3.initLine(backBarAndLine("挂牌宗数", "建面", arr))
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