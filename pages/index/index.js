// pages/houseprice/houseprice.js
let app = getApp()
Page({
    data: {
        swiperStatic: {
            indicatorDots: false,
            indicatorColor: "rgba(255,255,255,0.6)",
            indicatorActiveColor: "#fff",
            autoplay: true,
            interval: 4000,
            duration: 1000,
            circular: true,
        },
        swiperimg:[
            { path:"https://s1.ax1x.com/2020/04/20/JQT3mq.png"}
        ],
        village: {
            city: ["国玺", "龙府", "青青家园", "三墩小区", "龙巢", "九龙小区", "三坝小区", "国际城"],
            filterData: [],
            inputValue: "",
            canSwitch: true
        },
        isShowDia:true//是否显示弹框，true是不显示
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

        this.setData({
            [inputValueKey]: e.currentTarget.dataset.value,
            [fliterDataKey]: [],
        })
    },
    showDiaLog(){
        this.setData({
            isShowDia: !this.data.isShowDia
        })
    },
    hideDialog(){
        this.setData({
            isShowDia: true
        })
    },
    functionQuery(){
        this.showDiaLog()
    },
    toOtherFour(e){
        console.log(e.currentTarget.dataset.type)
        wx.navigateTo({
            url: `/pages/${e.currentTarget.dataset.type}/${e.currentTarget.dataset.type}?type=${e.currentTarget.dataset.type}`,
        })
    },
    search(){
        wx.navigateTo({
            url: '/pages/buildingdet/buildingdet',
        })
        this.hideDialog()
    },
    nexTime(){
        wx.showToast({
            title: '敬请期待',
            icon: 'none',
            duration: 2000
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