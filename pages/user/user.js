// pages/user/user.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        portrait:"",
        userName:"",
        userWork:"",
        isShowEdit:true,
    },
    removeBind(){
        wx.showToast({
            title: '解除绑定成功',
        })
    },
    editUserInfo(){
        wx.navigateTo({
            url: '/pages/userinfoForm/userinfoForm',
        })
    },
    goFeedBack(){
        wx.navigateTo({
            url: '/pages/feedback/feedback',
        })
    },
    isAttestation(){
        if (!app.globalData.userInfo){
            this.setData({
                userName:"请授权认证",
                userWork:"授权后查看更多信息",
                isShowEdit:false,
                portrait:"/static/img/portrait2.jpg"
            })
        }else{
            let portrait = wx.getStorageSync("portrait") || app.globalData.userInfo.avatarUrl
            this.setData({
                userName: app.globalData.userInfo.nickName,
                userWork: "房地产评估员",
                isShowEdit: true,
                portrait,
            })
        }
    },
    goAttestation(){
        if (!app.globalData.userInfo){
            wx.navigateTo({
                url: '/pages/bindUser/bindUser',
            })
        }
       
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
        this.isAttestation()
        /* let portrait = wx.getStorageSync('portrait') || "/static/img/portrait2.jpg" 
        this.setData({
            portrait,
        })*/
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
        return {
            path: '/pages/user/user'
        }
    }
})