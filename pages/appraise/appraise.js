// pages/appraise/appraise.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgbox: [],
        photo:[]
    },
    // 删除照片
    imgDelete: function (e) {
        let type = e.currentTarget.dataset.type;
        let index = e.currentTarget.dataset.deindex;
        let data = {
            imgbox: this.data.imgbox,
            photo: this.data.photo,
        };
        if (type < 4) {
            data.imgbox[type].list.splice(index, 1);
        } else if (type == 4) {
            data.photo.splice(index, 1);
        }
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
        var picid = e.currentTarget.dataset.pic;
        var self = this;
        var n = 9;
        if (9 > imgbox.length > 0) {
            n = 9 - imgbox.length;
        } else if (imgbox.length == 9) {
            n = 1;
        }
        wx.chooseImage({
            count: n, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                console.log(res.tempFilePaths)
                self.setData({
                    photo: res.tempFilePaths,
                    imgbox: res.tempFilePaths
                })
                return 
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths
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
                self.setData(data);
            }
        })
    },
    saveData(){
        wx.showToast({
            icon:"none",
            title: '保存成功',
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