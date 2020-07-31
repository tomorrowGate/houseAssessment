// pages/applyDetail/applyDetail.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeIndex:0,
        applyStatusArr:[],
        isShowDia:true,
        fileList:[],
        activeFile:null,
        lookedImgList:[]
    },
    changeTabber(e){
        let activeIndex = e.currentTarget.dataset.id
            , userid = wx.getStorageSync('userid')
            , vocde = wx.getStorageSync('vocde')
            , self = this
        this.setData({
            activeIndex
        })
        this.getUserHouseData(userid,vocde,activeIndex)
    },
    lookFiles(e){
        let activeFile = e.currentTarget.dataset.arids
            ,self = this
            , userid = wx.getStorageSync('userid')
            , vocde = wx.getStorageSync('vocde')
        this.getFileList(userid, vocde, activeFile)
            .then(res=>{
                this.data.lookedImgList = []
                let lookedImgList = []
                res.forEach((v,i)=>{
                    lookedImgList.push(v.url)
                })
                this.setData({
                    lookedImgList
                })
            })
            .catch(err=>{
                console.log(err)
            })
        this.setData({
            isShowDia:false,
            activeFile,
        })
    },
    showFile(e){
        let that = this
        let current = e.currentTarget.dataset.url
        if (!current || current == "null"){
            wx.showToast({
                title: '文件无法查看!',
                icon:"none"
            })
            return
        }
        wx.previewImage({
            current, // 当前显示图片的http链接
            urls: that.data.lookedImgList // 需要预览的图片http链接列表
        })
    },
    /* 后台接口 */
    getUserHouseData(userid, vcode, state) {
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice/rest/yzapp/evaluation/getDetailInDifferentStates',
                method: 'get',
                data: {
                    userid,
                    vcode,
                    state
                },
                success: function (res) {
                    console.log(res)
                    if (res.data.code == 101) {
                        let applyStatusArr = []
                        res.data.data.forEach((v,i)=>{
                            v.stateText = v.state == 0 ? "已受理" :
                                    v.state == 1 ? "待受理" :"已受理" 
                            v.applicationDateDel = v.applicationDate.split(" ")[0]||"-"
                            if (!v.acceptanceDate || v.acceptanceDate=="null"){
                                v.acceptanceDateDel = "-"
                            }else{
                                v.acceptanceDateDel = v.acceptanceDate.split(" ")[0] 
                            }
                            
                        })
                        that.setData({
                            applyStatusArr: res.data.data
                        })
                        resove(res.data.data)
                    }
                },
                fail: function (err) {
                    rej("error 受理状态")
                }
            })
        })
    },
    getFileList(userid, vcode, ids) {
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice/rest/yzapp/evaluation/getProjectFiles',
                method: 'get',
                data: {
                    userid,
                    vcode,
                    ids
                },
                success: function (res) {
                    console.log(res)
                    if (res.data.code == 101) {
                        
                        that.setData({
                            fileList: res.data.data
                        })
                        resove(res.data.data)
                    }
                },
                fail: function (err) {
                    rej("error 受理状态")
                }
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let self = this
            , userid = wx.getStorageSync('userid')
            , vocde = wx.getStorageSync('vocde')
            ,activeIndex = options.activeIndex
        this.setData({
            activeIndex
        })
        this.getUserHouseData(userid, vocde, activeIndex)
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