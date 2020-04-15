// pages/bindUser/bindUser.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name:"",
        price:"",
        phoneNumber: "",//手机号码
        isPhoneTrue: false,//手机号码是否输入正确
    },
    virifyTel(str) {
        //验证手机号
        let reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
        return reg.test(str)
    },
    nameInput(e) {
        this.setData({
            name: e.detail.value
        })
    },
    priceInput(e) {
        this.setData({
            price: e.detail.value,
        })
    },
    phoneInput(e) {
        let isPhoneTrue = this.virifyTel(e.detail.value)
        this.setData({
            phoneNumber: e.detail.value,
            isPhoneTrue: isPhoneTrue
        })
    },
    bind(e) {
        if (!this.data.name) {
            wx.showToast({
                icon: "none",
                title: '联系人未填写',
            })
            return
        }
        if (!this.data.isPhoneTrue) {
            wx.showToast({
                icon: "none",
                title: '手机号码输入有误，请重新输入',
            })
            return
        }
        if (!this.data.price) {
            wx.showToast({
                icon: "none",
                title: '预期价格未填写',
            })
            return
        }
        console.log(this.data.phoneNumber, this.data.price)
        wx.showLoading({
            title: '正在提交',
        })
        //发送请求
        wx.hideLoading()
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