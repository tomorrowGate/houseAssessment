// pages/casethink/casethink.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        houseid: "",
        codedata:[],
    },
    /* 后台接口 */
    //根据房屋id获取房屋信息
    getCase(userid, vcode, houseid) {
        console.log(userid, vcode, houseid)
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice/rest/yzapp/house/getreferencecases',
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
                           codedata: res.data.data
                       })
                        wx.hideLoading()
                        resove(res.data.data)
                    } else if (res.data.code == 201) {
                        wx.navigateTo({
                            url: '/pages/bindUser/bindUser',
                        })
                        wx.hideLoading()
                        rej(res.data.data)
                    } else {
                        let mesg = res.data.message ? res.data.message : "未能找到信息"
                        res.data.message && wx.showToast({
                            title: mesg,
                            icon: "none"
                        })
                        let timer = setTimeout(() => {
                            wx.navigateBack()
                        }, 1500)
                        //wx.hideLoading()
                        rej(["error"])
                    }
                    //wx.hideLoading()
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
        console.log(options)
        let userid = wx.getStorageSync('userid')
            , vocde = wx.getStorageSync('vocde')
            , houseid = 1759711 || options.houseid 
        this.setData({
            houseid,
        })
        wx.showLoading({
            title: '正在查询',
            mask: true,
        })
        this.getCase(userid, vocde, houseid)
            .catch(err => {
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})