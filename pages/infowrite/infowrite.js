// pages/infowrite/infowrite.js
import { qualityArr, houseTypeArr, housePatternArr, spatialForm, outdoorLandscape, decorationGrade} from "../../mock/mockData.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        qualityArr,
        houseTypeArr,
        housePatternArr,
        spatialForm,
        outdoorLandscape,
        decorationGrade,
        pickValue:{
            qualityArr:"",
            houseTypeArr:"",
            housePatternArr:"",
            spatialForm: "",
            outdoorLandscape: "",
            decorationGrade: "",
        },
        allPriceModifyList:null,
    },
    nextTap(e){
        wx.navigateTo({
            url: '/pages/priceModify/priceModify',
        })
    },
    bindPickerChange(e){
        let selectarr = e.currentTarget.dataset.selectarr
            , value = this.data[selectarr][e.detail.value]["name"]
            , pickValue = 'pickValue.' + selectarr 
        this.setData({
            [pickValue]: value
        })
    },
    /* 后台接口 */
    //获取估价对象因素
    getHousePricePort(userid, vcode, houseid){
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
                        let allPriceModifyList = res.data.data.factorlist
                        let mapArr = {
                            "景观":"",
                            "临街":"",
                            "物业品质":"qualityArr",
                            "户型格局":"",
                            "空间形式":"",
                            "装修档次":"",
                            "其他因素":""
                        }
                        let city = allPriceModifyList.filter((v, i) => {
                            return v.address
                        })

                        // pickValue:{
                        //     qualityArr:"",
                        //     houseTypeArr:"",
                        //     housePatternArr:"",
                        //     spatialForm: "",
                        //     outdoorLandscape: "",
                        //     decorationGrade: "",
                        // }
                        that.setData({
                            allPriceModifyList: res.data.data.factorlist,
                        })
                        resove(res.data.data)
                    } else if (res.data.code == 102) {
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