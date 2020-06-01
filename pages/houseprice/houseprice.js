// pages/houseprice/houseprice.js
let app = getApp()
import { debounce } from "../../utils/myfunctions.js"
Page({
    /**
     * 页面的初始数据
     */
    data: {
        searchParameter:{
            county:"",
            countyName:"",
            dong:"",
            unit:"",
            room:""
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
        fuzzyPortData:{}//模糊查询的后台返回数据
    },
    vModule(e){
        console.log(e.currentTarget.dataset.option,e.detail.value)
        let data = `searchParameter.${e.currentTarget.dataset.option}`
        this.setData({
            [data]: e.detail.value
        })
    },
    houseSearch(){
        this.setData({
            'searchParameter.county': this.data.fuzzyQuery.inputValue.split('-')[0],
            'searchParameter.countyName': this.data.fuzzyQuery.inputValue.split('-')[1],
            'searchParameter.dong': this.data.fuzzyQuery.inputValue.split('-')[2],
            'searchParameter.unit': this.data.fuzzyQuery.inputValue.split('-')[3],
            'searchParameter.room': this.data.fuzzyQuery.inputValue.split('-')[4],
        })
        let  searchParameter  = this.data.searchParameter
        console.log(searchParameter)
        wx.navigateTo({
            url: '/pages/housePriceDet/housePriceDet?searchParameter=' + searchParameter,
        })
    },
    filter1(e) {
        debounce(() => {
            this.filter1(e)
            console.log("节流")
        }, 1000)
        
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
        console.log(fliterDataKey, inputValueKey)
        this.queryFuzzyPort(userid, vocde, keywords, 1)
        
        e.detail.value && filterdataArr.forEach((city, index) => {
            if (city.includes(keywords)) {
                result.push(city)
            }
        })

        this.setData({
            [fliterDataKey]: result,
            [inputValueKey]: e.detail.value
        })
    },1000),
    clearFilter(e){
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

        this.setData({
            [inputValueKey]: e.currentTarget.dataset.value,
            [fliterDataKey]: [],
        }) 
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
                        let city = res.data.data.filter((v,i)=>{
                            return v.address
                        })
                        that.setData({
                            fuzzyPortData: res.data.data,
                            "fuzzyQuery.city": city
                        })
                        resove(res.data.data)
                    } else if (res.data.code == 102) {
                        wx.showToast({
                            title: res.data.message,
                            icon: "none"
                        })
                        rej(res.data.data)
                    }
                    else {
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