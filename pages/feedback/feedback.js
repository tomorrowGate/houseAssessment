// pages/bindUser/bindUser.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        text:""
    },
    bindTextAreaInput(e){
        console.log(e)
        this.setData({
            text: e.detail.value
        })
    },
    bind(e) {
        console.log(this.data.text)
        wx.showLoading({
            title: '正在提交',
        })
        let userid = wx.getStorageSync('userid')
            , vocde = wx.getStorageSync('vocde')
            , content = this.data.text
        this.postFeed(userid, vocde, content)
            .then(()=>{
                
                //发送请求
                wx.hideLoading()
            })
            .catch((err)=>{
                console.log(err)
            })
        
    },
    /* 后台接口 */
    postFeed(userid, vcode, content) {
        console.log(userid, vcode, content)
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice2/rest/yzapp/evaluation/feedback',
                method: 'post',
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: {
                    userid,
                    vcode,
                    content,
                },
                success: function (res) {
                    console.log(res)
                    if (res.data.code == 101) {
                        let mesg = res.data.message
                        wx.showToast({
                            title: mesg,
                            icon: "none"
                        })
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