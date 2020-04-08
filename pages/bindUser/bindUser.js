// pages/bindUser/bindUser.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isSended:false,//是否发送验证码
        timeDown:60,//倒计时
        phoneNumber:"",//手机号码
        isPhoneTrue:false,//手机号码是否输入正确
        yzmNumber:"",//验证码
        isYzmTrue:true//验证码是否正确
    },
    send(){
        if (isPhoneTrue) {
            this.countDown()
            this.setData({
                isSended: true
            })
        } else {
            wx.showToast({
                title: '手机号码有问题',
                icon: 'none',
            })
            this.setData({
                isPhoneTrue: false
            })
        }
    },
    virifyTel(str){
        //验证手机号
        let reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
        return reg.test(str)
    },
    countDown() {
        //倒计时
        let i = 60;
        let that = this
        let timer = setInterval(function () {
            if (i > 0) {
                i--;
                that.setData({
                    timeDown: i
                })
                //console.log(that.data.storeInfo.second)
            } else {
                that.setData({
                    isSended: false
                })
                clearInterval(timer)
            }
        }, 1000)
    },
    phoneInput(e){
        let isPhoneTrue = this.virifyTel(e.detail.value)
        this.setData({
            phoneNumber: e.detail.value,
            isPhoneTrue: isPhoneTrue
        })
    },

    virifyYzm(str) {
        //验证验证码
        let reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
        return reg.test(str)
    },
    yzmInput(e) {
        let isYzmTrue = this.virifyYzm(e.detail.value)
        this.setData({
            yzmNumber: e.detail.value,
            isYzmTrue: isYzmTrue
        })
    },
    bind(e){
        if (!this.data.isPhoneTrue){
            wx.showToast({
                icon:"none",
                title: '手机号码输入有误，请重新输入',
            })
            return
        }   
        if (!this.data.isYzmTrue){
            wx.showToast({
                icon: "none",
                title: '验证码输入有误，请重新输入',
            })
            return
        }
        console.log(this.data.phoneNumber,this.data.yzmNumber)
        wx.showLoading({
            title: '正在绑定',
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})