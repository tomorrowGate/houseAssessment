// pages/housePriceDet/housePriceDet.js
import { option, option2, option2_1, option3, option3_1, option4, option4_1} from "../../mock/mockData.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
        //折线图数据
        option, 
        option2, 
        option2_1, 
        option3, 
        option3_1, 
        option4, 
        option4_1
    },
    randoms(){
        let arr = [option, option2, option2_1, option3, option3_1, option4, option4_1]
            ,randomInit = Math.ceil(Math.random()*7)

        
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

})