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
            city: [],
            filterData: [],
            inputValue: "",
            canSwitch: true
        },
        fuzzyUrl: "yzservice/rest/yzapp/house/getBuilding",
        isShowDia:true//是否显示弹框，true是不显示
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
        let funcinput = this.selectComponent('#funcinput'); // 页面获取自定义组件实例
        //funcinput.houseSearch(); // 通过实例调用组件事件
        let houseid = funcinput.data.fuzzyQuery.selectHouse.houseid
        console.log(houseid,funcinput.data)
        wx.navigateTo({
            url: '/pages/buildingdet/buildingdet?houseid=' + houseid,
        })
        this.hideDialog()
    },
    clearFilter(){
        let funcinput = this.selectComponent('#funcinput'); // 页面获取自定义组件实例
        funcinput.clearFilter()
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