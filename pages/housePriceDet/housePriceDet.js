// pages/housePriceDet/housePriceDet.js
import {  option2, option2_1, option4, option4_1} from "../../mock/mockData.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchParameter:{
            county: "杭州",
            countyName: "国玺悦龙府",
            dong: "5",
            unit: "1",
            room: "1201"
        },
        compliteRoom:"",
        housePriceTh: ["月","年"],
        housePriceTable:[
            {
                name:"同比",
                arr:[1,6]
            },
            {
                name: "环比",
                arr: [-0.5, 5]
            }
        ],
        incaseIcon:"/static/img/orage_arrow_icon.png",
        downIcon:"/static/img/house_downarrow_icon.png",
        // 图表数据
        chartData:{
            
        },
        ecopt: {
            lazyLoad: true
        },
        ecComponent1: null,
        chart:{}
    },
    randoms(){
        let arr = [option2, option2_1, option4, option4_1]
            , randomInit = parseInt(Math.random() * arr.length)
        this.setData({
            chartData: arr[randomInit]
        })
        this.chart.initLine(arr[randomInit])
    },
    priceModify(e){
        wx.navigateTo({
            url: '/pages/infowrite/infowrite',
        })
    },
    nextTime(e){
        wx.showToast({
            title: '敬请期待',
            icon: 'none',
        })
    },
    goUnderLinde(e){
        wx.navigateTo({
            url: '/pages/offlineCommit/offlineCommit',
        })
    },
    getPrePage(){
        let pages = getCurrentPages();
        if (pages.length >= 2) {
            let prevPage = pages[pages.length - 2]; //上一个页面
            return prevPage.data.searchParameter
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let searchParameter = this.getPrePage()
        let compliteRoom = searchParameter.county + searchParameter.countyName + searchParameter.dong + '幢' + searchParameter.unit + '单元' + searchParameter.room + '室'
        //console.log(this.getPrePage())
        this.setData({
            searchParameter,
            compliteRoom,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.chart = this.selectComponent("#chart");
        this.randoms()
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

})