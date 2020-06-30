import { oneLine, villageInfo,doubleLine } from "../../mock/mockData.js"
let echarts = require('../../utils/ec-canvas/echarts');
let wxCharts = require('../../utils/wxcharts.js');

let ringChart = null;
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ecComponent1:null,
        ecComponent2:null,
        ecComponent3:null,
        houseDet:{
            address:""
        },
        villageInfo,
        randomPrice:Math.floor(Math.random() * 3000 + 8000),
        //搜索框的数据
        isShowDia: true,//是否显示弹框，true是不显示
        // 图表数据
        chartShowList:[false,true,true],
        ecopt: {
            lazyLoad: true
        },
        chartData: {},
        chartData2: {},
        chartDataBar:{},

        chart:{},
        chart2:{},
        houseDet:{},
        houseid:"",
        houseTrend:""
    },
    /* 搜索框方法开始 */
    showDiaLog() {
        this.setData({
            isShowDia: !this.data.isShowDia
        })
    },
    hideDialog() {
        this.setData({
            isShowDia: true
        })
    },
    showInputSearch(e){
        this.showDiaLog()
    },
    clearFilter() {
        let funcinput = this.selectComponent('#funcinput'); // 页面获取自定义组件实例
        funcinput.clearFilter()
    },
    goHousePrice(e){
        let funcinput = this.selectComponent('#funcinput'); // 页面获取自定义组件实例
        //funcinput.houseSearch(); // 通过实例调用组件事件
        let houseid = funcinput.data.fuzzyQuery.selectHouse.houseid
        console.log(houseid, funcinput.data)
        wx.navigateTo({
            url: '/pages/housePriceDet/housePriceDet?houseid=' + houseid,
        })
        this.hideDialog()
    },
    /* 搜索框方法结束 */
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
    loadData(){
        this.setData({
            chartDataBar: optionBarPic,
        })
        this.ecComponent1 && this.ecComponent1.initLine(optionBarPic)

    },
    changeChartsShow(e){
        let type = e.currentTarget.dataset.type
        this.data.chartShowList = [true,true,true]
        this.data.chartShowList[type] = false
        this.setData({
            chartShowList: this.data.chartShowList
        })
    },
    /* 后台接口 */
    //获取价格走势
    getHouseTrend(userid, vcode, imd) {
        console.log(userid, vcode, imd)
        wx.showLoading({
            title: '正在加载...',
            mask:true
        })
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice/rest/yzapp/MarketMonitoring/secondhouse',
                method: 'GET',
                data: {
                    userid,
                    vcode,
                    imd,
                },
                success: function (res) {
                    console.log(res)
                    if (res.data.code == 101) {
                        let houseTrend = { ...res.data.data }
                        that.setData({
                            houseTrend
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
                        // let timer = setTimeout(() => {
                        //     wx.navigateBack()
                        // }, 1500)
                        wx.hideLoading()
                        rej(["error"])
                    }
                    wx.hideLoading()
                },
                fail: function (err) {
                    wx.hideLoading()
                    rej("error1")
                }
            })
        })
    },
    //获取楼盘信息
    /* 后台接口 */
    getBuildingDetail(userid, vcode, houseid) {
        console.log(userid, vcode, houseid)
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice/rest/yzapp/house/getBuildingDetail',
                method: 'GET',
                data: {
                    userid,
                    vcode,
                    bid: houseid,
                },
                success: function (res) {
                    console.log(res,155)
                    if (res.data.code == 101) {
                        that.setData({
                            houseDet: res.data.data
                        })
                        wx.hideLoading()
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
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userid = wx.getStorageSync('userid')
            , vocde = wx.getStorageSync('vocde')
            , houseid = options.houseid
        this.setData({
            houseid,
        })
        wx.showLoading({
            title: '正在查询',
            mask: true,
        })
        this.getBuildingDetail(userid, vocde, houseid)
            .catch(err => {
                console.log(err)
            })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let imd = 0
            , userid = wx.getStorageSync('userid')
            , vocde = wx.getStorageSync('vocde')

        this.ecComponent1 = this.selectComponent('#ecdom1');
        this.chart = this.selectComponent("#chart");
        this.chart2 = this.selectComponent("#chart2");
        //this.loadData()
        this.setData({
            "houseDet.address": "滨江区龙禧硅谷广场4幢"
        })
        this.getHouseTrend(userid, vocde, imd)
            .then(data => {
                let xdata = this.data.houseTrend.month
                let ydataListing = this.data.houseTrend.listingCount
                let ydatalCount = this.data.houseTrend.dealCount
                this.ecComponent1.initLine(doubleLine("挂牌量", "成交量", xdata, ydataListing, ydatalCount))
            })
            .catch(err => console.log(err))
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