import { table1, table2, table3, table4, option, option1_1, option3, option3_1, optionTime, backBarAndLine, backBarAndBar} from "../../mock/mockData.js"
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
        pageConfig:{
            land:{
                topKeyword:"拍卖量",
                unitKeyword:"宗",
                recentKeyword: "当前累计成交量(宗)",
                chartNameArr: [
                    {
                        name: "成交金额",
                        type: "折线图,单位<亿元>默认数据近一年"
                    },
                    {
                        name: "成交宗数/建面",
                        type: "(柱状图(宗数),折线图(建筑面积),单位宗,万㎡,默认数据近一年)"
                    },
                    {
                        name: "挂牌宗数/建面",
                        type: "(柱状图(宗数),折线图(建筑面积),单位宗,万㎡,默认数据近一年)"
                    },
                    {
                        name: "月均出清周期图",
                        type: "折线(当月库存量/近年的月成交量,生成一个折线图"
                    }
                ]
            },
            newhouse:{
                topKeyword: "当月领证房源量",
                unitKeyword: "套",
                recentKeyword: "近一个月成交量(套)",
                chartNameArr: [
                    {
                        name: "供求情况",
                        type: "柱状(供应套数),柱状(成交套数),单位套,默认数据近一年)"
                    },
                    {
                        name: "成交价",
                        type: "折线(成交价),单位元/㎡,默认数据近一年"
                    },
                    {
                        name: "交叉分析",
                        type: "原本的交叉分析（表格）"
                    },
                    {
                        name: "月均出清周期图",
                        type: "折线(当月库存量/近年的月成交量,生成一个折线图"
                    }
                ]
            },
            secondhouse:{
                topKeyword: "挂牌房源量",
                unitKeyword: "套",
                recentKeyword: "近一个月成交量(套)",
                chartNameArr: [
                    {
                        name:"挂牌量/成交量",
                        type:"双折线图,单位套"
                    }, 
                    {
                        name: "价格走势",
                        type: "line"
                    }
                ]
            },
            law: {
                topKeyword: "挂牌房源量",
                unitKeyword: "套",
                recentKeyword: "当月成交量(宗)",
                chartNameArr: [
                    {
                        name: "拍卖成交-评估价比",
                        type: "(折线图,默认数据近一年)①:月总成交价/月总评估价②成交价/评估价(月平均)"
                    },
                    {
                        name: "拍卖成交情况",
                        type: "(折线(成交金额),柱状(成交宗数),单位亿元,宗"
                    },
                ]
            }
        },
        charts:{},
        transactionType:"挂牌房源量",//交易类型
        //picker数据
        arrayCity: [{ name: "杭州主城区" }, { name: "杭州市区" }],
        activeLandCity: [{ name: "杭州主城区" }, { name: "杭州市区" }],
        pickerCityValue:"",
        arrHouseInit:"产品类型",
        arrayHouse: [{ name: "住宅" }, { name: "办公" }, { name: "商业" }, { name: "其他" }],
        pickerHouseValue: "",
        pickerTime:"",
        unitKeyword:"套",

        showModal:false,//是否显示日期弹框
        startTime:"",
        endTime:"",
        // 图表数据
        ecopt: {
            lazyLoad: true
        },
        chartData:{},
        tableDataNum: [],
        tableDataArea: [],
        bdMessage:["0-90","90-144","144-180","180以上"],
        trtdWidth:"140",
        /* 后台返回的新房市场数据 */
        supplyTao:0,
        dealTao:0,
        linkRatio:0,
        yearOnYear:0,
        supplyTaoList:[],
        dealTaoList:[],
        dealAvgList:[],
        clearingCycleList:[],
        monthList:[],
        newhouseData:{},
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
        let twoType=["bar","bar"]
            ,userid = wx.getStorageSync('userid')
            , vocde = wx.getStorageSync('vocde')
            , imd = 0
        this.charts1 = this.selectComponent("#chart1");
        this.charts2 = this.selectComponent("#chart2");
        this.charts3 = this.selectComponent("#chart3");

        this.charts1.initLine(backBarAndBar("供应套数", "成交套数", getMonths(),twoType))
        this.charts2.initLine(optionTime)
        this.charts3.initLine(optionTime)
        //this.charts3.initLine(backBarAndLine("当月库存量", "近年的月成交量", getMonths()))

        this.getNewHouseDet(userid, vocde, imd)
            .then(res => {
                let { supplyTao, dealTao, linkRatio, yearOnYear, supplyTaoList, dealTaoList, dealAvgList, clearingCycleList, monthList } = { res }
                that.setData({
                    supplyTao,
                    dealTao,
                    linkRatio,
                    yearOnYear,
                    supplyTaoList,
                    dealTaoList,
                    dealAvgList,
                    clearingCycleList,
                    monthList,
                    newhouseData
                })
                this.charts1.initLine(backBarAndBar("供应套数", "成交套数", monthList, twoType))
                this.charts2.initLine(backBarAndLine("成交宗数", "成交金额", xdata, ydataNum, ydataAmount))
            })
            .catch(err => console.log(err))
        this.randoms()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    randoms() {
        let arr = [ option, option1_1, option3, option3_1]
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
    tapCityPicker(e){
        console.log(e)
    },
    bindPickerChangeCity(e){
        let value = this.data.arrayCity[e.detail.value]["name"]
            ,imd = 0
            ,userid = wx.getStorageSync('userid')
            , vocde = wx.getStorageSync('vocde')
        this.setData({
            pickerCityValue:value
        })
        console.log(value)
        if (value == "杭州主城区"){
            imd = 1
        }else{
            imd = 0
        }
        this.getNewHouseDet(userid, vocde, imd)
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
    confirmStart(){
        this.setData({
            showModal: true,
        })
    },
    bindPickerChangeTime(e){

    },
    //获取时间段
    getTimeCut(options){
        this.setData({
            startTime: options.detail.startTime,
            endTime: options.detail.endTime,
            pickerTime: options.detail.startTime + '-' + options.detail.endTime
        })
        console.log(this.data.pickerTime)
        let arr = countMonthList(options.detail.startTime, options.detail.endTime)
            ,randomData = [];
            arr.forEach((v,i)=>{
                randomData.push(parseInt(5+Math.random() * 95))
            })

        optionTime.xAxis[0].data = arr
        optionTime.series[0].data = randomData
        //console.log(arr, optionTime)
        this.setData({
            chartData: optionTime
        })
       /*  if (!this.data.pickerCityValue){
            wx.showToast({
                title: '请选择城区',
                icon:"none"
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
        this.charts1.initLine(backBarAndBar("供应套数", "成交套数", arr))
        this.charts2.initLine(optionTime)
        this.charts3.initLine(optionTime)
        this.randoms()
    },
    /* 后台接口 */
    /* 获取所有新房详情 */
    getNewHouseDet(userid, vcode, imd){
        console.log(userid, vcode, imd)
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice2/rest/yzapp/MarketMonitoring/newhouse',
                method: 'GET',
                data: {
                    userid,
                    vcode,
                    imd,
                },
                success: function (res) {
                    console.log(res)
                    if (res.data.code == 101) {
                        let newhouseData = {...res.data.data}
                        
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