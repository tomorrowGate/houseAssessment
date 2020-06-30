import { table1, table2, table3, table4, option, optionTime, optionTotcalLine, backBarAndLine, oneLine} from "../../mock/mockData.js"
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
        trtdWidth: "140",
        /* 土地数据 */
        landData:{},
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

        // this.charts1.initLine(optionTime)
        // this.charts2.initLine(backBarAndLine("成交宗数", "建面", getMonths()))
        // this.charts3.initLine(backBarAndLine("挂牌宗数", "建面", getMonths()))


        this.bindPickerChangeCity()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    randoms() {
        let arrTable = [table1, table2, table3, table4,]
            , randomInit = parseInt(Math.random() * 4)
            , tableDataNum = arrTable[parseInt(Math.random() * 4)]
            , tableDataArea = arrTable[parseInt(Math.random() * 4)]
        this.setData({
            /*  chartData: arr[randomInit], */
            tableDataArea,
        })
    },
    tapCityPicker(e) {
        console.log(e)
    },
    bindPickerChangeCity(e) {
        let value = "杭州主城区"
        if (e && e.detail) {
            value = this.data.arrayCity[e.detail.value]["name"]
        }
        let imd = 0
            , userid = wx.getStorageSync('userid')
            , vocde = wx.getStorageSync('vocde')
        this.setData({
            pickerCityValue: value
        })
        if (value == "杭州主城区") {
            imd = 1
        } else {
            imd = 0
        }
        wx.showLoading({
            title: '正在加载...',
            mask: true
        })
        this.getLandDet(userid, vocde, imd)
            .then(data=>{
                let xdata = this.data.landData.monthList
                let ydataMoney = this.data.landData.amountList
                let ydataDeal = this.data.landData.dealCountList
                let ydataDealArea = this.data.landData.dealCountList   
                let ydataListing = this.data.landData.hangOutList
                let ydataListingArea = this.data.landData.hangOutList  
                
                this.charts1.initLine(oneLine("成交价/评估价", xdata, ydataMoney)) 
                this.charts2.initLine(backBarAndLine("成交宗数", "建面", xdata, ydataDeal, ydataDealArea))
                this.charts3.initLine(backBarAndLine("挂牌宗数", "建面", xdata, ydataListing, ydataListingArea))
                wx.hideLoading()
            })
            .catch(err=>console.log(err))

        // this.getTimeCut({
        //     detail:{
        //         startTime:"2019/6",
        //         endTime:"2020/6"
        //     }
        // })
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
        /* if (!this.data.pickerCityValue) {
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
        //this.charts1.initLine(optionTime)
       
        //this.randoms()
        this.charts2.initLine(backBarAndLine("成交宗数", "建面", arr))
        this.charts3.initLine(backBarAndLine("挂牌宗数", "建面", arr))
    },
    /* 后台接口 */
    getLandDet(userid, vcode, imd){
        console.log(userid, vcode, imd)
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice/rest/yzapp/MarketMonitoring/land',
                method: 'GET',
                data: {
                    userid,
                    vcode,
                    imd,
                },
                success: function (res) {
                    console.log(res)
                    if (res.data.code == 101) {
                        let landData = { ...res.data.data }
                        that.setData({
                            landData
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