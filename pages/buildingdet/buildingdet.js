import { option, option2, option2_1, option3, option3_1, option4, option4_1, optionBarPic } from "../../mock/mockData.js"
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
        villageInfo:{
            years:"",
            propertyCost:"",
            buildArea:"",
            propertyType:"",
            cars:"",
            houseTotal:"",
            volume:"",
            green:"",
            propertCompony:""
        },
        //搜索框的数据
        searchParameter: {
            county: "",
            countyName: "",
            dong: "",
            unit: "",
            room: ""
        },
        fuzzyQuery: {
            city: ["西湖-国玺", "杭州-三墩小区", "萧山-龙府", "西山-九龙小区", "中铁-国际城"],
            filterData: [],
            inputValue: "",
            canSwitch: true
        },
        village: {
            city: ["国玺", "龙府", "青青家园", "三墩小区", "龙巢", "九龙小区", "三坝小区", "国际城"],
            filterData: [],
            inputValue: "",
            canSwitch: true
        },
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
    houseSearch() {
        this.setData({
            'searchParameter.county': this.data.fuzzyQuery.inputValue.split('-')[0],
            'searchParameter.countyName': this.data.fuzzyQuery.inputValue.split('-')[1],
            'searchParameter.dong': this.data.fuzzyQuery.inputValue.split('-')[2],
            'searchParameter.unit': this.data.fuzzyQuery.inputValue.split('-')[3],
            'searchParameter.room': this.data.fuzzyQuery.inputValue.split('-')[4],
        })
        let searchParameter = this.data.searchParameter
        console.log(searchParameter)
        wx.navigateTo({
            url: '/pages/housePriceDet/housePriceDet?searchParameter=' + searchParameter,
        })
    },
    filter(e) {
        let keywords = e.detail.value
            , result = []
            , filterdataArr = e.currentTarget.dataset.filterdata.city
            , setDataKey = e.currentTarget.dataset.filterkey
            , fliterDataKey = setDataKey + '.filterData'
            , inputValueKey = setDataKey + '.inputValue'
        console.log(fliterDataKey, inputValueKey)
        e.detail.value && filterdataArr.forEach((city, index) => {
            if (city.includes(keywords)) {
                result.push(city)
            }
        })

        this.setData({
            [fliterDataKey]: result,
            [inputValueKey]: e.detail.value
        })
    },
    clearFilter(e) {
        let that = this
            , setDataKey = e.currentTarget.dataset.filterkey
            , fliterDataKey = setDataKey + '.filterData'
            , inputValueKey = setDataKey + '.inputValue'

        setTimeout(function () {
            that.setData({
                [fliterDataKey]: []
            })
        }, 300)
    },
    makesure(e) {
        let that = this
            , setDataKey = e.currentTarget.dataset.filterkey
            , fliterDataKey = setDataKey + '.filterData'
            , inputValueKey = setDataKey + '.inputValue'
        console.log(setDataKey, inputValueKey)
        this.setData({
            [inputValueKey]: e.currentTarget.dataset.value,
            [fliterDataKey]: [],
        })
    },

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
    goHousePrice(e){
        this.setData({
            'searchParameter.county': this.data.fuzzyQuery.inputValue.split('-')[0],
            'searchParameter.countyName': this.data.fuzzyQuery.inputValue.split('-')[1],
            'searchParameter.dong': this.data.fuzzyQuery.inputValue.split('-')[2],
            'searchParameter.unit': this.data.fuzzyQuery.inputValue.split('-')[3],
            'searchParameter.room': this.data.fuzzyQuery.inputValue.split('-')[4],
        })
        let searchParameter = this.data.searchParameter
        console.log(searchParameter)
        wx.navigateTo({
            url: '/pages/housePriceDet/housePriceDet?searchParameter=' + searchParameter,
        })
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