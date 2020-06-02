import { basement, attic, publicFacilities, terrace, aversionFacility, yard, other } from "../../mock/mockData.js"
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        houseModifyInfo:null,
        selectVal:[],
        isDiaShow: false,
        isShowBasement: true,
        basementType: "",
        unknowArea: "",

    },
    bindPickerChange(e) {
        let selectarr = e.currentTarget.dataset.selectarr
            , value = e.detail.value
            , index = e.currentTarget.dataset.index
        selectarr.fModify = value
        this.data.houseModifyInfo[index] = selectarr
        console.log(selectarr, this.data.houseModifyInfo)
        this.setData({
            houseModifyInfo: this.data.houseModifyInfo
        })
    },
    modifyPrice() {
        this.setData({
            isDiaShow: !this.data.isDiaShow
        })
        /* wx.showToast({
            title: '修改成功',
        }) */
    },
    hideDialog() {
        this.setData({
            isShowBasement: true
        })
    },
    radioChange(e) {
        console.log(e)
        let value = e.detail.value
        this.setData({
            radioValue: value
        })
    },
    closeDia() {
        this.setData({
            isDiaShow: false
        })
    },
    submit() {
        wx.showToast({
            title: '修改成功',
            duration: 1000
        })
        setTimeout(() => {
            this.setData({
                isDiaShow: false
            })
        }, 1000)
    },
    /* 后台接口 */
    //提交修改
    submitModify(userid, vcode, houseid, modify) {
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice/rest/yzapp/house/AppFactorUpdate',
                method: 'GET',
                data: {
                    userid,
                    vcode,
                    houseid,
                },
                success: function (res) {
                    console.log(res)
                    if (res.data.code == 101) {
                        resove(res.data.data)
                    } else if (res.data.code == 201) {
                        wx.navigateTo({
                            url: '/pages/bindUser/bindUser',
                        })
                        rej(res.data.data)
                    }
                    else {
                        res.data.message && wx.showToast({
                            title: res.data.message,
                            icon: "none"
                        })
                        rej("err")
                    }
                },
                fail: function (err) {
                    rej("err")
                }
            })
        })
    },
    //根据houseid获取房屋信息
    getHouseModifyInfoByid(userid, vcode, houseid){
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice/rest/yzapp/house/AppFactorQuery',
                method: 'GET',
                data: {
                    userid,
                    vcode,
                    houseid,
                },
                success: function (res) {
                    console.log(res)
                    if (res.data.code == 101) {
                        console.log(res.data)
                        let houseModifyInfo = [...res.data.data.factorlist]
                        houseModifyInfo.forEach((v,i)=>{
                            v.fModify = v.fvalue
                        })
                        that.setData({
                            houseModifyInfo: houseModifyInfo,
                            /* selectVal: houseModifyInfo */
                        })
                        resove(res.data.data)
                    } else if (res.data.code == 201) {
                        wx.navigateTo({
                            url: '/pages/bindUser/bindUser',
                        })
                        rej(res.data.data)
                    }
                    else {
                        res.data.message && wx.showToast({
                            title: res.data.message,
                            icon: "none"
                        })
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
        let userid = wx.getStorageSync('userid')
            , vocde = wx.getStorageSync('vocde')
            , houseid = options.houseid
        this.getHouseModifyInfoByid(userid, vocde, houseid)
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