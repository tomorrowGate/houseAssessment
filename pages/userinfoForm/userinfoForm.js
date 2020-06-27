// pages/bindUser/bindUser.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        portrait:"",//头像
        name: "",
        sexArr:["女","男","未知"],
        sex: "",
        company: "",
        job: "",
        phoneNumber: "",//手机号码
        isPhoneTrue: false,//手机号码是否输入正确
    },
    virifyTel(str) {
        //验证手机号
        let reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
        return reg.test(str)
    },
    phoneInput(e) {
        let isPhoneTrue = this.virifyTel(e.detail.value)
        this.setData({
            phoneNumber: e.detail.value,
            isPhoneTrue: isPhoneTrue
        })
        if (isPhoneTrue){
            wx.setStorageSync(phoneNumber, e.detail.value)
        }
        
    },
    itemInput(e) {
        //console.log(e, e.currentTarget.dataset.type)
        let type = e.currentTarget.dataset.type
        this.setData({
            [type]: e.detail.value
        })
        wx.setStorageSync(type, e.detail.value)
    },
    // 添加图片
    addPic(e) {
        let self = this
        wx.chooseImage({
            count: 1, // 默认9
            success: function (res) {
                console.log(res.tempFilePaths)
                self.setData({
                    portrait: res.tempFilePaths,
                })
                //wx.setStorageSync('portrait', res.tempFilePaths)
                return
            }
        })
    },
    bindPickerChange(e){
        let value = this.data.sexArr[e.detail.value]
        this.setData({
            sex: value
        })
    },
    bind(e) {
        let _this = this
        let errArr = ["未添加头像", "未填写姓名", "手机号码格式错误", "未填写性别", "未填写公司","未填写职务"]
        let verifyArr = [this.data.portrait, this.data.name, this.data.isPhoneTrue, this.data.sex, this.data.company, this.data.job]
        let isFormErr = false
        for(let i=0,len=verifyArr.length;i<len;i++){
            if (!verifyArr[i]){
                wx.showToast({
                    title: errArr[i],
                    icon: "none"
                })
                console.log(errArr[i])
                isFormErr = true
                return false
            }
        }
        // verifyArr.every((v,i)=>{
        //     if(!v){
        //         wx.showToast({
        //             title: errArr[i],
        //             icon:"none"
        //         })
        //         console.log(errArr[i])
        //         isFormErr = true
        //         return false
        //     }
        // })
        console.log("对了", this.data)
        wx.setStorageSync('portrait', _this.data.portrait)
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
        let portrait = wx.getStorageSync('portrait') || app.globalData.userInfo.avatarUrl

        this.setData({
            portrait,
        })
    },
    /* 后台接口 */

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