// pages/houseprice/houseprice.js
let app = getApp()
import { debounce } from "../../utils/myfunctions.js"
Page({
    /**
     * 页面的初始数据
     */
    data: {
        fuzzyQuery: {
            city: [],
            filterData: [],
            inputValue: "",
            all:[],
            selectHouse:"",
            canSwitch: true
        },
        fuzzyPortData:{},//模糊查询的后台返回数据
        page:1,
        blurTimer:null,
    },
    vModule(e){
        console.log(e.currentTarget.dataset.option,e.detail.value)
        let data = `searchParameter.${e.currentTarget.dataset.option}`
        this.setData({
            [data]: e.detail.value
        })
    },
    houseSearch(){
        let houseid = this.data.fuzzyQuery.selectHouse.houseid
        console.log(houseid)
        wx.navigateTo({
            url: '/pages/housePriceDet/housePriceDet?houseid=' + houseid,
        })
    },
    mockFilter:function(e){
        let setDataKey = e.currentTarget.dataset.filterkey
            , fliterDataKey = setDataKey + '.filterData'
            , userid = wx.getStorageSync('userid')
            , vocde = wx.getStorageSync('vocde')
            , keywords = this.data.fuzzyQuery.inputValue
            , page = this.data.page
        if (e.currentTarget.dataset.type == 1){
            page = page<=1 ? 1 : page - 1
        }else{
            page++
        }
        this.setData({
            page,
        })
        
        this.queryFuzzyPort(userid, vocde, keywords, this.data.page)
            .then((res) => {
                console.log(res)
                this.setData({
                    [fliterDataKey]: res,
                })
            })
            .catch(err => {
                console.log(err)
            })
    },
    filter: debounce(function(e) {
        let keywords = e.detail.value
            ,_this = this
            ,result = []
            ,filterdataArr = e.currentTarget.dataset.filterdata.city
            ,setDataKey = e.currentTarget.dataset.filterkey
            ,fliterDataKey = setDataKey + '.filterData'
            ,inputValueKey = setDataKey + '.inputValue'
            , userid = wx.getStorageSync('userid')
            , vocde = wx.getStorageSync('vocde')
        //console.log(fliterDataKey, inputValueKey)
        this.setData({
            page:1,
            "fuzzyQuery.selectHouse.houseid":0,
        })
        this.queryFuzzyPort(userid, vocde, keywords, this.data.page)
            .then((res)=>{
                // e.detail.value && filterdataArr.forEach((city, index) => {
                //     if (city.includes(keywords)) {
                //         result.push(city)
                //     }
                // })
                console.log(e.detail.value)
                this.setData({
                    [fliterDataKey]: res,
                   /*  [inputValueKey]: e.detail.value */
                })
            })
            .catch(err=>{
                console.log(err)
            })

        console.log(wx.getSystemInfoSync().windowHeight)
    },600),
    handleScroll(e){
        let that = this
        clearTimeout(that.data.blurTimer)
        this.data.blurTimer = null
    },
    clearFilter(e){
        let that = this
            , setDataKey = e.currentTarget.dataset.filterkey
            , fliterDataKey = setDataKey + '.filterData'
            , inputValueKey = setDataKey + '.inputValue'
        this.data.blurTimer = setTimeout(function () {
            that.setData({
                [fliterDataKey]: []
            })
        }, 300)
        console.log(wx.getSystemInfoSync().windowHeight)
    },
    makesure(e) {
        let that = this
            , setDataKey = e.currentTarget.dataset.filterkey
            , houseValueKey = setDataKey + '.selectHouse'
            , fliterDataKey = setDataKey + '.filterData'
            , inputValueKey = setDataKey + '.inputValue'
        this.setData({
            [houseValueKey]: e.currentTarget.dataset.value,
            [inputValueKey]: e.currentTarget.dataset.value.address,
            [fliterDataKey]: [],
        })
        console.log(this.data.fuzzyQuery.selectHouse)
    },
    /* 后台接口 */
    //模糊查询
    queryFuzzyPort(userid, vcode, key, page=1){
        console.log(userid, vcode, key, page)
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice/rest/yzapp/house/HouseQuery' ,
                method: 'GET',
                data:{
                    userid,
                    vcode,
                    key,
                    page
                },
                success: function (res) {
                    console.log(res)
                    if (res.data.code == 101) {
                        let city = []
                        res.data.data.forEach((v,i)=>{
                            city.push(v.address)
                        })
                        that.setData({
                            fuzzyPortData: res.data.data,
                            "fuzzyQuery.city": city
                        })
                        console.log(that.data.fuzzyQuery.city)
                        resove(res.data.data)
                    } else if (res.data.code == 201) {
                        wx.navigateTo({
                            url: '/pages/bindUser/bindUser',
                        })
                        rej(res.data.data)
                    } else {
                        that.setData({
                            fuzzyPortData: res.data.data,
                            "fuzzyQuery.city": []
                        })
                        /* res.data.message &&  wx.showToast({
                            title: res.data.message,
                            icon: "none"
                        }) */
                        rej(["error"])
                    }
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
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log(wx.getSystemInfoSync().windowHeight)
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