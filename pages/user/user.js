// pages/user/user.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        portrait:""
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
        let portrait = wx.getStorageSync('portrait') || "/static/img/portrait2.jpg"
        this.setData({
            portrait,
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