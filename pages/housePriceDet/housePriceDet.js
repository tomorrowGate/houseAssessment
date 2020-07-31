// pages/housePriceDet/housePriceDet.js
let app = getApp()
import { option5, trible } from "../../mock/mockData.js"
import { calcDateByTime } from "../../utils/dateCalc.js"
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
        oneHouseMoreCard:null,
        isShowDia:true,
        housePriceTotal:0,
        houseAreaTotal:0,
        appdate:0
    },
    randoms(){
        this.setData({
            /* chartData: arr[randomInit], */
             chartData: option5
        })
        this.chart.initLine(option5)
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
        let address = this.data.houseDet.address
        wx.navigateTo({
                url: '/pages/offlineComTwo/offineComTwo?address=' + address,
        })
    },
    goCaseThink(e){
        let houseid = this.data.houseid
        wx.navigateTo({
            url: '/pages/casethink/casethink?houseid=' + houseid,
        })
    },
    getPrePage(){
        let pages = getCurrentPages();
        if (pages.length >= 2) {
            let prevPage = pages[pages.length - 2]; //上一个页面
            return prevPage.data.searchParameter
        }
    },
    lookDetail(){
        this.setData({
            isShowDia:false
        })
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
                        // if (res.data.data.fusagesub == "独栋" || res.data.data.fusagesub == "别墅" ){
                        if (res.data.data.uname == res.data.data.fname) {
                            res.data.data.showUnitName = res.data.data.uname
                        }else{
                            if (res.data.data.uname) {
                                res.data.data.showUnitName = res.data.data.uname + res.data.data.fname
                            }else{
                                res.data.data.showUnitName = res.data.data.ename + res.data.data.fname
                            }
                            
                        }
                        //res.data.data.showUnitName = fusagesub
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
                        let mesg = res.data.message ? res.data.message:"未能找到信息"
                        res.data.message && wx.showToast({
                            title: mesg,
                            icon: "none"
                        })
                        let timer = setTimeout(()=>{

                            wx.navigateBack()
                        },1500)
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
    /* 一房多证 */
    houseMoreCard(userid, vcode, houseid){
        console.log(userid, vcode, houseid)
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice/rest/yzapp/house/HousePlusQueryByHouseid',
                method: 'GET',
                data: {
                    userid,
                    vcode,
                    houseid:houseid,
                },
                success: function (res) {
                    console.log(res)
                    if (res.data.code == 101) {
                        let oneHouseMoreCard = {...res.data.data}
                        that.setData({
                            oneHouseMoreCard,
                        })
                        resove(res.data.data)
                    } else if (res.data.code == 201) {
                        wx.navigateTo({
                            url: '/pages/bindUser/bindUser',
                        })
                        wx.hideLoading()
                        rej(res.data.data)
                    } else {
                        // let mesg = res.data.message ? res.data.message : "未能找到信息"
                        // res.data.message && wx.showToast({
                        //     title: mesg,
                        //     icon: "none"
                        // })
                        rej(["error"])
                    }
                },
                fail: function (err) {
                    rej("error1")
                }
            })
        })
    },
    /* 小区房价走势图 */
    housePricetrend(userid, vcode, houseid) {
        console.log(userid, vcode, houseid)
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice/rest/yzapp/house/comAndDisPriceByHid',
                method: 'GET',
                data: {
                    userid,
                    vcode,
                    houseid: houseid,
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
        console.log(options)
        let userid = wx.getStorageSync('userid')
            ,vocde = wx.getStorageSync('vocde')
            , houseid = options.houseid
        this.setData({
            houseid,
        })
        this.setData({
            appdate: calcDateByTime(10)
        }) 
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let userid = wx.getStorageSync('userid')
            , vocde = wx.getStorageSync('vocde')
            , houseid = this.data.houseid
        this.chart = this.selectComponent("#chart");

        this.housePricetrend(userid, vocde, houseid)
            .then(data => {
                let houseTrend = this.data.houseTrend
                let xData = houseTrend.monthList
                let yDataCity = houseTrend.commList
                let yDataDistrict = houseTrend.districtList
                let yDataFirstHand = houseTrend.firstHandList
               /*  let yDataCity = (function () {
                        var res = [];
                        var len = 12;
                        while (len--) {
                            res.push(Math.round(Math.random() * 1000));
                        }
                        return res;
                    })()
                let yDataDistrict = (function () {
                    var res = [];
                    var len = 12;
                    while (len--) {
                        res.push(Math.round(Math.random() * 1000));
                    }
                    return res;
                })() */

                this.chart.initLine(trible("城区二手房房价", "小区房价", '城区一手房房价', xData, yDataCity, yDataDistrict, yDataFirstHand))
            })
            .catch(err => console.log(err))

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let userid = wx.getStorageSync('userid')
            , vocde = wx.getStorageSync('vocde')
            , houseid = this.data.houseid
            , pages = getCurrentPages()
            , prevPage=""
            , currPage=""
        if (pages.length || pages.length-1) {
            currPage = pages[pages.length - 1].route;
            prevPage = pages[pages.length - 2].route;
            if (prevPage = 'pages/infowritechange/infowritechange' && app.globalData.modifed){
                this.setData({
                    isModifyShow: true
                })
            }
            console.log(currPage, prevPage)  
        }
        wx.showLoading({
            title: '正在查询',
            mask: true,
        })
        this.getHouseDetailById(userid, vocde, houseid)
            .then(res => {
                
            })
            .catch(err => {
                console.log(err)
            })
        this.houseMoreCard(userid, vocde, houseid)
            .then(res => {
                let houseAreaTotal = 0
                let housePriceTotal = 0
                res.forEach((v, i) => {
                    housePriceTotal += v.apppall * 1
                    houseAreaTotal += v.area * 1
                })
                this.setData({
                    housePriceTotal,
                    houseAreaTotal
                })
            })
            .catch(err => {
                console.log(err)
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
        app.globalData.modifed = false
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