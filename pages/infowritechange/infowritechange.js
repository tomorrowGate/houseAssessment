import { basement, attic, publicFacilities, terrace, aversionFacility, yard, other } from "../../mock/mockData.js"
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        houseModifyInfo:null,
        selectVal:[],
        houseid:'',
        modifyAppavg:10,
        modifyAppall:10,
        isDiaShow: false,
        isShowBasement: true,
        basementType: "",
        unknowArea: "",

    },
    bindPickerChange(e) {
        let selectarr = e.currentTarget.dataset.selectarr
            , value = e.detail.value
            , index = e.currentTarget.dataset.index
        selectarr.fModify = selectarr.oplist[value] 
        this.data.houseModifyInfo[index] = selectarr
        console.log(selectarr, this.data.houseModifyInfo)
        
        this.setData({
            houseModifyInfo: this.data.houseModifyInfo
        })
    },
    modifyPrice() {
        let userid = wx.getStorageSync('userid')
            , vocde = wx.getStorageSync('vocde')
            , houseid = this.data.houseid
            , modify = { userid, vcode:vocde, houseid}
        this.data.houseModifyInfo.forEach((v, i) => {
            let vn = "v" + v.n
            Object.assign(modify, {
                [vn]: v.fModify
            });
        })
        console.log(modify)
        this.submitModify(modify)
            .then((res)=>{
                app.globalData.modifed = true
                // this.getHouseDetailById(userid, vocde, houseid)
                //     .then(res=>{
                //         this.setData({
                //             isDiaShow: !this.data.isDiaShow
                //         })
                //     })
                wx.showToast({
                    title: '修改成功',
                    duration:500
                })
                setTimeout(() => {
                    wx.navigateBack()
                }, 500) 
            })
            .catch((err)=>{
                console.log(err)
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
       /*  setTimeout(() => {
            this.setData({
                isDiaShow: false
            })
        }, 1000) */
        setTimeout(() => {
            wx.navigateBack()
        }, 2500) 
    },
    /* 后台接口 */
    //提交修改
    submitModify(modify) {
        console.log(modify)
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice/rest/yzapp/house/AppFactorUpdate',
                method: 'GET',
                data: {...modify},
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
    //获取房屋信息，更新完后的回调
    getHouseDetailById(userid, vcode, houseid) {
        console.log(userid, vcode, houseid)
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice/rest/yzapp/house/HouseQueryByHouseid',
                method: 'GET',
                data: {
                    userid,
                    vcode,
                    houseid,
                },
                success: function (res) {
                    console.log(res)
                    if (res.data.code == 101) {
                        that.setData({
                            modifyAppavg: res.data.data.apppavg2,
                            modifyAppall: res.data.data.apppall2
                        })
                        resove(res.data.data)
                    } else if (res.data.code == 201) {
                        wx.navigateTo({
                            url: '/pages/bindUser/bindUser',
                        })
                        rej(res.data.data)
                    } else {
                        res.data.message && wx.showToast({
                            title: res.data.message,
                            icon: "none"
                        })
                        rej(["error"])
                    }
                },
                fail: function (err) {
                    rej("error1")
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
        this.setData({
            houseid
        })
        this.getHouseModifyInfoByid(userid, vocde, houseid)
            .catch((err)=>{
                console.log(err)
            })
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