// pages/wantAssess/wantAssess.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tableData:[],
        bdMessage:["地址","委托方","电话","文件","项目状态","申请时间","受理时间","操作"],
        tableDataNum: [{
            name: "0-500",
            arr: ["地址", "委托方", "电话", "文件", "项目状态", "申请时间", "受理时间", "操作"]
        }],
        trtdWidth: "140",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userid = wx.getStorageSync('userid')
            , vocde = wx.getStorageSync('vocde')
        this.getHouseDetailById(userid, vocde)
            .then((res)=>{
                let tableDataNum = []
                this.data.tableData.records.forEach((v,i)=>{
                    tableDataNum.push({
                        name: "0-500",
                        arr: [
                            v.address,
                            v.client,
                            v.tel,
                            v.arids,
                            v.state,
                            v.applicationDate,
                            v.acceptanceDate
                        ]
                    }
                       
                    )
                })
                this.setData({
                    tableDataNum,
                })
            })
            .catch(err=>{
                console.log(err)
            })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    //根据房屋id获取房屋信息
    getHouseDetailById(userid, vcode, curPage = 1, records = 10, addr = "", client="",startDate="",endDate="") {
        console.log(userid, vcode)
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice/rest/yzapp/evaluation/getEvaluationProjectOfOnePage',
                method: 'GET',
                data: {
                    userid,
                    vcode,
                    curPage,
                    records,
                    addr,
                    client,
                    startDate,
                    endDate
                },
                success: function (res) {
                    console.log(res)
                    if (res.data.code == 101) {
                        that.setData({
                            tableData: res.data.data
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
    //根据房屋id获取房屋信息
    handleClick(userid, vcode, id, status) {
        console.log(userid, vcode)
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice/rest/yzapp/evaluation/updateEvaluationProjectState',
                method: 'GET',
                data: {
                    userid,
                    vcode,
                    id,
                    status
                },
                success: function (res) {
                    console.log(res)
                    if (res.data.code == 101) {
                        that.setData({
                            tableData: res.data.data
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