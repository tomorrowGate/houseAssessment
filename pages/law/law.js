import { backBarAndLine, optionTime, optionTotcalLine,oneLine } from "../../mock/mockData.js"
import { countMonthList, getMonths } from "../../utils/dateCalc.js"
let echarts = require('../../utils/ec-canvas/echarts');
let wxCharts = require('../../utils/wxcharts.js');

let ringChart = null;
optionTime.legend.data = ["成交价/评估价"]
optionTime.series[0].name = ["成交价/评估价"]
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        charts: {},
        transactionType: "",//交易类型
        //picker数据
        arrayCity: [{ name: "杭州主城区" }, { name: "杭州市区" }, { name: "上城区" }, { name: "下城区" }, { name: "西湖区" }, { name: "拱墅区" }, { name: "江干区" }, { name: "滨江区" }, { name: "萧山区" }, { name: "余杭区" }, { name: "富阳区" }],
        pickerCityValue: "",
        arrHouseInit: "产品类型",
        arrayHouse: [{ name: "住宅" }, { name: "办公" }, { name: "商业" }, { name: "其他" }],
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
        /* 司法数据 */
        lawData: {},
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
        let userid = wx.getStorageSync('userid')
            , vocde = wx.getStorageSync('vocde')
            ,imd = 0

        this.charts1 = this.selectComponent("#chart1");
        this.charts2 = this.selectComponent("#chart2");

       /*  this.charts1.initLine(optionTime)
        this.charts2.initLine(backBarAndLine("成交宗数", "成交金额", getMonths())) */
        wx.showLoading({
            title: '正在加载...',
            mask: true
        })
        this.getlawHouseDet(userid, vocde, imd)
            .then(res => {
                let xdata = this.data.lawData.month
                let ydataMoney = this.data.lawData.cdividedList
                let ydataNum = this.data.lawData.dealCount
                let ydataAmount = this.data.lawData.dealAmount

                this.charts1.initLine(oneLine("成交价/评估价", xdata, ydataMoney))
                this.charts2.initLine(backBarAndLine("成交宗数", "成交金额", xdata, ydataNum, ydataAmount))
                wx.hideLoading()
            })
            .catch(err => console.log(err))
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    randoms() {
        let arr = [optionTime]
            , randomInit = parseInt(Math.random() * arr.length)
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
        this.charts2.initLine(backBarAndLine("宗数", "亿元", arr))
    },
    /* 获取后台数据 */
    getlawHouseDet(userid, vcode, imd){
        console.log(userid, vcode, imd)
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice/rest/yzapp/MarketMonitoring/judicial',
                method: 'GET',
                data: {
                    userid,
                    vcode,
                    imd,
                },
                success: function (res) {
                    console.log(res)
                    if (res.data.code == 101) {
                        let lawData = { ...res.data.data }

                        that.setData({
                            lawData
                        })
                        resove(res.data.data)
                    } else if (res.data.code == 201) {
                        wx.navigateTo({
                            url: '/pages/bindUser/bindUser',
                        })
                        wx.hideLoading()
                        rej(res.data.data)
                    } else {
                        let mesg = res.data.message ? res.data.message : "未能找到信息"
                        res.data.message && wx.showToast({
                            title: mesg,
                            icon: "none"
                        })
                        let timer = setTimeout(() => {

                            wx.navigateBack()
                        }, 1500)
                        //wx.hideLoading()
                        rej(["error"])
                    }
                    //wx.hideLoading()
                },
                fail: function (err) {
                    rej("error1")
                }
            })
        })
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