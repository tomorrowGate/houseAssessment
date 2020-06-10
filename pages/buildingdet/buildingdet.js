import { option, option2, option2_1, option3, option3_1, option4, option4_1, optionBarPic, villageInfo } from "../../mock/mockData.js"
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
        // villageInfo:{
        //     years:"",
        //     propertyCost:"",
        //     buildArea:"",
        //     propertyType:"",
        //     cars:"",
        //     houseTotal:"",
        //     volume:"",
        //     green:"",
        //     propertCompony:""
        // },
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
        chart2:{}
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
        let arr = [option, option2, option2_1, option3, option3_1, option4, option4_1,]
            , randomInit = parseInt(Math.random() * arr.length)
        this.setData({
            chartDataBar: optionBarPic,
            chartData: arr[randomInit],
            chartData2: arr[parseInt(Math.random() * arr.length)]
        })

        this.ecComponent1 && this.ecComponent1.initLine(optionBarPic)
        this.chart&&this.chart.initLine(arr[randomInit])
        this.chart2&&this.chart2.initLine(arr[parseInt(Math.random() * arr.length)])

    },
    changeChartsShow(e){
        let type = e.currentTarget.dataset.type
        this.data.chartShowList = [true,true,true]
        this.data.chartShowList[type] = false
        this.setData({
            chartShowList: this.data.chartShowList
        })
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
        this.chart = this.selectComponent("#chart");
        this.chart2 = this.selectComponent("#chart2");
        this.loadData()
        this.setData({
            "houseDet.address": "滨江区龙禧硅谷广场4幢"
        })
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