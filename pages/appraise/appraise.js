// pages/appraise/appraise.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgbox: [],
        photo:[],
        fileidArr:[],
        address:"",
        client:"",
        tel:"",
        isTelTrue:false,
    },
    // 删除照片
    imgDelete: function (e) {
        let type = e.currentTarget.dataset.type;
        let index = e.currentTarget.dataset.deindex;
        let data = {
            imgbox: this.data.imgbox,
            photo: this.data.photo,
        };
        if (type*1 < 4) {
            data.imgbox[type].list.splice(index, 1);
            console.log(5566)
        } else if (type*1 == 4) {
            data.photo.splice(index, 1);
            data.imgbox.splice(index, 1);
        }
        console.log(data.photo, type, data.imgbox)
        this.setData(data)
    },
    // 添加图片
    addPic(e) {
        console.log(111)
        let type = 4;
        let data = {
            imgbox: this.data.imgbox,
            photo: this.data.photo,
        };
        let imgbox;
        if (type == 4) {
            imgbox = data.photo;
        } else if (type < 4) {
            imgbox = data.imgbox[type].list;
        }
        let picid = e.currentTarget.dataset.pic;
        let self = this;
        let n = 9;
        if (imgbox.length < 9 && imgbox.length > 0) {
            n = 9 - imgbox.length;
        } else if (imgbox.length == 9) {
            n = 1;
        }
        wx.chooseImage({
            count: n, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                let photo = [...self.data.photo]
                    , imgbox = [...self.data.imgbox]
                res.tempFilePaths.forEach((v,i)=>{
                    photo.push(v)
                    imgbox.push(v)
                })
                console.log(res.tempFilePaths, self.data.imgbox)
                self.setData({
                    photo: photo,
                    imgbox: imgbox,
                   /*  photo: res.tempFilePaths,
                    imgbox: res.tempFilePaths */
                })
                return 
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                /* var tempFilePaths = res.tempFilePaths
                if (type < 4) {
                    if (imgbox.length == 0) {
                        data.imgbox[type].list = tempFilePaths;
                    } else if (9 > imgbox.length) {
                        data.imgbox[type].list = imgbox.concat(tempFilePaths);
                    } else {
                        data.imgbox[type].list[picid] = tempFilePaths[0];
                    }
                } else if (type == 4) {
                    if (imgbox.length == 0) {
                        data.photo = tempFilePaths;
                    } else if (9 > imgbox.length) {
                        data.photo = imgbox.concat(tempFilePaths);
                    } else {
                        data.photo[picid] = tempFilePaths[0];
                    }
                }
                self.setData(data); */
            }
        })
    },
    virifyTel(str) {
        //验证手机号
        let reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
        return reg.test(str)
    },
    bindInput(e){
        let type = e.currentTarget.dataset.type
        let typeArr = ["address","client","tel"]
        if (type == 0){
            this.setData({
                address:e.detail.value
            })
        } else if (type == 1){
            this.setData({
                client: e.detail.value
            })
        } else if (type == 2){
            let isTelTrue = this.virifyTel(e.detail.value)
            this.setData({
                tel: e.detail.value,
                isTelTrue: isTelTrue
            })
        }
    },
    saveData(){
        let self = this
            , userid = wx.getStorageSync('userid')
            , vocde = wx.getStorageSync('vocde')
            , targetFile = this.data.imgbox
            , address = this.data.address
            , client = this.data.client
            , tel = this.data.tel
        console.log(address, client, tel)
        if (!this.data.isTelTrue){
            wx.showToast({
                title: '手机号码不正确',
                icon:"none"
            })
            return
        }
        wx.showLoading({
            title: '正在提交',
        })
        this.submitFile(userid, vocde, targetFile)
            .then((res)=>{
                let arids = self.data.fileidArr.join(",")
                self.submitAllData(userid, vocde, address, client, tel, arids)
                .then(res=>{
                    //wx.hideLoading()
                })
            })
            .catch(err=>{
                console.log(err)
                //wx.hideLoading()
            })
        setTimeout(()=>{
            wx.hideLoading()
        },2000)
       /*  wx.showToast({
            icon:"none",
            title: '保存成功',
        }) */
    },
    /* 后台接口 */
    submitFile(userid, vcode, targetFile){
        return new Promise((resove, rej) => {
            let that = this;
            targetFile.forEach((v,i)=>{
                wx.uploadFile({
                    url: app.globalData.url + '/yzservice/rest/yzapp/file/uploadfile',
                    filePath: v,
                    name: 'file',
                    formData: {
                        userid,
                        vcode,
                    },
                    success(res) {
                        console.log(res, "后台接口上传", JSON.parse(res.data))
                        let data = JSON.parse(res.data)
                        if (data.code == 101) {
                            let fileidArr = [...that.data.fileidArr]
                            fileidArr.push(data.data)
                            that.setData({
                                fileidArr,
                            })
                            if (i == targetFile.length-1) {
                                resove(res.data.data)
                            }
                        }
                    },
                    fail: function (err) {
                        if (i == targetFile.length-1) {
                            rej("error file upload")
                        }
                        
                    }
                })
            })
        })
    },
    //保存
    submitAllData(userid, vcode, address, client, tel, arids){
        console.log(userid, vcode, address, client, tel, arids)
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: app.globalData.url + 'yzservice/rest/yzapp/evaluation/getproject',
                method: 'post',
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: {
                    address,
                    client,
                    tel,
                    arids,
                    userid,
                    vcode,
                },
                success: function (res) {
                    console.log(res)
                    if (res.data.code == 101) {
                        let message = res.data.message
                        wx.showToast({
                            icon: "none",
                            title: message,
                        })
                        that.setData({
                            imgbox:[],
                            fileidArr:[]
                        })
                        resove(res.data.data)
                    }
                },
                fail: function (err) {
                    rej("error 提交所有")
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})