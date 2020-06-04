// pages/housePriceDet/housePriceDet.js
let app = getApp()
import {  option2, option2_1, option4, option4_1} from "../../mock/mockData.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        houseDet:null,
        houseid:"",
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
        chart:{},
        housePriceDetPort:null,//后台返回的房屋详细信息
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
        let houseid = this.data.houseid
        wx.navigateTo({
            url: '/pages/infowritechange/infowritechange?houseid=' + houseid,
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
    /* 后台接口 */
    //根据房屋id获取房屋信息
    getHouseDetailById(userid,vcode,houseid){
        console.log(userid, vcode, houseid)
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice/rest/yzapp/house/HouseQueryByHouseid',
                method: 'GET',
                data: {
                    userid,
                    vcode,
                    houseid,
                },
                success: function (res) {
                    console.log(res)
                    if (res.data.code == 101) {
                        let reg = /\d+/g
                        res.data.data.showHouseName = res.data.data.address.split(reg)[0]
                        if (res.data.data.fusagesub == "独栋" || res.data.data.fusagesub == "别墅" ){
                            res.data.data.showUnitName = res.data.data.ename
                        }else{
                            res.data.data.showUnitName = res.data.data.ename + res.data.data.fname
                        }
                        //res.data.data.showUnitName = fusagesub
                        that.setData({
                            houseDet: res.data.data
                        })
                        resove(res.data.data)
                    } else if (res.data.code == 201) {
                        wx.navigateTo({
                            url: '/pages/bindUser/bindUser',
                        })
                        rej(res.data.data)
                    } else {
                        res.data.message && wx.showToast({
                            title: res.data.message,
                            icon: "none"
                        })
                        rej(["error"])
                    }
                    wx.hideLoading()
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
        console.log(options)
        let userid = wx.getStorageSync('userid')
            ,vocde = wx.getStorageSync('vocde')
            , houseid = options.houseid
        this.setData({
            houseid,
        })
        wx.showLoading({
            title: '正在查询',
        })
        this.getHouseDetailById(userid, vocde, houseid)
            .catch(err=>{
                console.log(err)
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