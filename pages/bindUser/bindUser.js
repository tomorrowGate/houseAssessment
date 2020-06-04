// pages/bindUser/bindUser.js
let app = getApp()
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
        isYzmTrue:true,//验证码是否正确
        userid:"",
    },
    getUserInfo: function (e) {
        console.log(e)
        if (e.detail.userInfo){
            app.globalData.userInfo = e.detail.userInfo
            this.bind()
        }
        
        
    },
    send(){
        if (this.data.isPhoneTrue) {
            this.countDown()
            this.setData({
                isSended: true
            })
            this.getUserYzmNumber(this.data.phoneNumber)
                .catch(err=>{
                    console.log(err)
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
        //let reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
        console.log(str, this.data.yzmNumber)
        return true
        if(str == this.data.yzmNumber){
            return true
        }else{
            return false
        }
        //return reg.test(str)
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
        this.userLoginVeryfy(this.data.phoneNumber, this.data.yzmNumber).then(()=>{
            wx.switchTab({
                url: '/pages/index/index',
            })
        })
        wx.hideLoading()
    },
    //后台请求
    /* 用户获取手机验证码 */
    getUserYzmNumber(phone){
        console.log(app.globalData.url + 'yzservice/rest/yzapp/user/VcodeGet/' + phone)
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice/rest/yzapp/user/VcodeGet/' + phone,
                method: 'GET',
                success: function (res) {
                    console.log(res)
                    if (res.data.code == 101) {
                        //立即把验证码设置在input框里
                      /*  that.setData({
                           yzmNumber: res.data.data.vocde
                       }) */
                        // app.globalData.vocde = res.data.data.vocde
                        // wx.setStorageSync("vocde", res.data.data.vcode);
                        resove(res.data.data)
                    } else if (res.data.code == 102){
                        wx.showToast({
                            title: res.data.message,
                            icon:"none"
                        })
                        rej(res.data.data)
                    }
                    else {
                        rej("err")
                    }
                },
                fail: function (err) {
                    rej("errfil")
                }
            })
        })
    },
    userLoginVeryfy(phone,yzmNumber) {
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice/rest/yzapp/user/VcodeCheck',
                method: 'GET',
                header: {
                    "content-type": "application/json"
                },
                data:{
                    cellnumber: phone,
                    vcode: yzmNumber
                },
                success: function (res) {
                    console.log(res)
                    if (res.data.code==101) {
                        that.setData({
                            userid: res.data.data.userid
                        })
                        app.globalData.cellnumber = res.data.data.cellnumber
                        app.globalData.userid = res.data.data.userid
                        app.globalData.vocde = res.data.data.vocde
                        app.globalData.userServiceInfo = res.data.data
                        wx.setStorageSync("cellnumber", res.data.data.cellnumber);
                        wx.setStorageSync("userid", res.data.data.userid);
                        wx.setStorageSync("vocde", res.data.data.vocde);
                        wx.setStorageSync("userServiceInfo", res.data.data);
                        resove(res.data.data)
                    } else if (res.data.code == 102){
                        wx.showToast({
                            title: res.data.message,
                            icon: "none"
                        })
                        rej(res.data.data)
                    } 
                    else {
                        rej("err")
                    }
                },
                fail: function (err) {
                    rej("err")
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

})