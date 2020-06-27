import { doubleLine, optionTime, optionTotcalLine } from "../../mock/mockData.js"
import { countMonthList, getMonths } from "../../utils/dateCalc.js"
let echarts = require('../../utils/ec-canvas/echarts');
let wxCharts = require('../../utils/wxcharts.js');

let ringChart = null;
let app = getApp()
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
        tableDataNum: [],
        tableDataArea: [],
        bdMessage: ["0-90", "90-144", "144-180", "180以上"],
        trtdWidth: "140",
        /* 二手房数据 */
        secHouseData: {},
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

        this.charts1.initLine(optionTime)
        this.charts2.initLine(doubleLine("挂牌量", "成交量", getMonths()))
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
            , imd = 0
            , userid = wx.getStorageSync('userid')
            , vocde = wx.getStorageSync('vocde')
        this.setData({
            pickerCityValue: value
        })
        console.log(value)
        if (value == "杭州主城区") {
            imd = 1
        } else {
            imd = 0
        }
        this.getSecHouseDet(userid, vocde, imd)
        this.getTimeCut({
            detail: {
                startTime: "2019/6",
                endTime: "2020/6"
            }
        })
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
       /*  if (!this.data.pickerCityValue) {
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
        } */
        this.charts1.initLine(optionTime)
        this.randoms()
        this.charts2.initLine(doubleLine("成交宗数", "建面", arr))
    },
    /* 获取后台数据 */
    getSecHouseDet(userid, vcode, imd){
        console.log(userid, vcode, imd)
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice2/rest/yzapp/MarketMonitoring/secondhouse',
                method: 'GET',
                data: {
                    userid,
                    vcode,
                    imd,
                },
                success: function (res) {
                    console.log(res)
                    if (res.data.code == 101) {
                        let secHouseData = { ...res.data.data }

                        that.setData({
                            secHouseData
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