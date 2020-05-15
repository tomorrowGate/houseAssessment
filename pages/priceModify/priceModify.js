import { basement, attic, publicFacilities, terrace, aversionFacility, yard, other } from "../../mock/mockData.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isDiaShow:false,
        isShowBasement:true,
        basementType:"",
        unknowArea:"",
        radioValue:"0",
        checkedInit:true,
        typeText:"未计入建筑面积 ",

        basement,
        attic,
        publicFacilities,
        terrace,
        aversionFacility,
        yard,
        other,
        pickValue: {
            basement: "",
            attic: "",
            publicFacilities: "",
            terrace: "",
            aversionFacility: "",
            yard: "",
            other: "",
        }
    },
    bindPickerChange(e) {
        let selectarr = e.currentTarget.dataset.selectarr
            , value = this.data[selectarr][e.detail.value]["name"]
            , pickValue = 'pickValue.' + selectarr
        this.setData({
            [pickValue]: value
        })
    },
    modifyPrice(){
        this.setData({
            isDiaShow: !this.data.isDiaShow
        })
        /* wx.showToast({
            title: '修改成功',
        }) */
    },
    hideDialog(){
        this.setData({
            isShowBasement: true
        })
    },
    showBasement(e){
        let arr = {
            "terrace":"独用面积",
        }
        this.setData({
            isShowBasement: false,//打开弹框
            basementType: e.currentTarget.dataset.type,//设置弹框类型
            typeText: arr[e.currentTarget.dataset.type] || "未计入建筑面积",
            unknowArea:"",//初始化弹框
            checkedInit:true
        })
    },
    radioChange(e){
        console.log(e)
        let value = e.detail.value
        this.setData({
            radioValue: value
        })
    },
    setUnknowArea(e){
        this.setData({
            unknowArea:e.detail.value
        })
    },
    determine() {
        let _this = this
            ,arr = {
                "terrace": "独用面积",
                "other":"房屋发生命案"
            },
            text = arr[_this.data.basementType] || "未计入建筑面积"
        let typeArr = {
            "0":"无",
            "1": text + _this.data.unknowArea + "平方米"
        } 
        if (this.data.basementType == "other"){
            typeArr['1'] = text
            typeArr['2'] = "其他："+_this.data.unknowArea
        }
        let selectarr = this.data.basementType
            , pickValue = 'pickValue.' + selectarr
            , typeKey = this.data.radioValue
        this.setData({
            [pickValue]: typeArr[typeKey]
        })
        this.hideDialog()
    },
    closeDia(){
        this.setData({
            isDiaShow: false
        })
    },
    submit(){
        wx.showToast({
            title: '修改成功',
            duration:1000
        })
        setTimeout(()=>{
            this.setData({
                isDiaShow: false
            })
        },1000)
        
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