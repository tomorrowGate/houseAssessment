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
            {path:"/static/img/banner.png"}
        ],
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
            url: '/pages/newhouse/newhouse?type=' + e.currentTarget.dataset.type,
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