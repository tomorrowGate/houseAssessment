// pages/houseprice/houseprice.js
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
            city: ["西湖","杭州","萧山"],
            filterData: [],
            inputValue: "",
            canSwitch: true
        },
    },
    houseSearch(){
        wx.navigateTo({
            url: '/pages/housePriceDet/housePriceDet',
        })
    },
    filter(e) {
        let keywords = e.detail.value
        let result = []

        e.currentTarget.dataset.filterdata.city.forEach((city, index) => {
            result.push(city)
        })
        this.setData({
            'fuzzyQuery.filterData': result,
            "fuzzyQuery.inputValue": e.detail.value
        })
    },
    makesure(e) {
        this.setData({
            'fuzzyQuery.inputValue': e.currentTarget.dataset.indexkey,
            'fuzzyQuery.filterData': [],
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