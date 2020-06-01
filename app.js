//app.js
let CryptoJS = require('./utils/crypto-js.js');
require('./utils/aes.js');
App({
    data: {
       // url: 'https://www.xaqnxl.com/',
        url:"https://yz.hzhfeidian.com/",
    },
    onLaunch: function (options) {
        // 展示本地存储能力
        /* var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs) */

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            //console.log(res)
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
        //this.checkAuthorize()
    },
    onShow(option){
        // this.globalData.prevRoute = '/' + option.path
        // this.globalData.options = option.query
        //console.log(option, 11111)
        let that = this
        let timer = setInterval(that.heartReafsh,6600000)
        let phone = wx.getStorageSync("cellnumber")
        let yzm = wx.getStorageSync("vocde")
    console.log(phone,yzm)
        this.userLoginVeryfy(phone, yzm)
            .catch((err)=>{
                console.log(err)
                wx.navigateTo({
                    url: '/pages/bindUser/bindUser',
                })
            })
    },
    //检查是否授权过期
    checksession: function () {
        wx.checkSession({
            success: function (res) {
                
            },
            fail: function (res) {
                wx.reLaunch({
                    url: "/pages/bindUser/bindUser"
                });
            }
        })
    },
    //检查是否授权
    checkAuthorize(path) {
        let that = this
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    //已经授权
                    console.log("已经授权");
                    //检查登录有没有过期
                    that.checksession()
                } else {
                    // wx.reLaunch({
                    //     url: "/pages/attestation/attestation"
                    // });
                    wx.reLaunch({
                        url: "/pages/bindUser/bindUser"
                    });
                }
            }
        })
    },
    //心跳刷新
    heartReafsh(){
        return new Promise((resove, rej) => {
            let that = this;
            let cellnumber = wx.getStorageInfoSync("cellnumber")
            let vocde = wx.getStorageInfoSync("vocde")
            if (cellnumber && vocde){
                wx.request({
                    url: app.globalData.url + 'yzservice/rest/yzapp/user/VcodeHeartbeat',
                    method: 'GET',
                    data: {
                        cellnumber,
                        vcode: vocde,
                    },
                    success: function (res) {
                        console.log(res)
                        if (res.data.code == 101) {
                            resove(res.data.message)
                        } else if (res.data.code == 102) {
                            rej(res.data.message)
                        }
                        else {
                            rej("error")
                        }
                    },
                    fail: function (err) {
                        rej("error")
                    }
                })
            }
        })
    },
    //验证验证码是否合法
    userLoginVeryfy(phone, yzmNumber) {
        return new Promise((resove, rej) => {
            let that = this;
            wx.request({
                url: that.globalData.url + 'yzservice/rest/yzapp/user/VcodeCheck',
                method: 'GET',
                header: {
                    "content-type": "application/json"
                },
                data: {
                    cellnumber: phone,
                    vcode: yzmNumber
                },
                success: function (res) {
                    console.log(res)
                    if (res.data.code == 101) {
                        that.globalData.cellnumber = res.data.data.cellnumber
                        that.globalData.userid = res.data.data.userid
                        that.globalData.vocde = res.data.data.vocde
                        that.globalData.userServiceInfo = res.data.data
                        wx.setStorageSync("cellnumber", res.data.data.cellnumber);
                        wx.setStorageSync("userid", res.data.data.userid);
                        wx.setStorageSync("vocde", res.data.data.vocde);
                        wx.setStorageSync("userServiceInfo", res.data.data);
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
                    console.log(err)
                    rej("err")
                }
            })
        })
    },
    getOpenid(){
        return new Promise((resove, rej) => {
            var user_id = wx.getStorageSync('user_id')
            var that = this;
            if (user_id) {
                //查询好多数据
                wx.request({
                    url: that.globalData.url + 'index.php?app=nyms_myinfo&act=get_info',
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded',
                    },
                    data: {
                        user_id,
                    },
                    success: function (res) {
                        if (res.data.done) {
                           
                            wx.setStorageSync("openid", res.data.retval.openid);

                            resove("OK")
                        } else {
                            rej("err")
                        }
                    },
                    fail: function (err) {
                        rej("err")
                    },
                    complete: function (res) {
                        //console.log(res);
                    }
                })
            }
        })
    },
    isShareIn(options) {
        // 判断是否由分享进入小程序
        if (options.scene == 1007 || options.scene == 1008) {
            this.globalData.share = true
        } else {
            this.globalData.share = false
        };
        //获取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度）
        wx.getSystemInfo({
            success: (res) => {
                this.globalData.height = res.statusBarHeight
            }
        })
    },
    getQueryValue: function (url, queryName) {
        var query = decodeURI(url.substring(1));
        var vars = query.split("?")[1].split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == queryName) {
                return pair[1];
            }
        }
        return null;
    },
    encrypt(word, key) {
        var key = CryptoJS.enc.Utf8.parse(key);
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
            iv: CryptoJS.enc.Utf8.parse("")
        });
        return encrypted.toString();
    },
    globalData: {
        cellnumber:"",
        userid:"",
        vocde:"",//验证码，配合userid来发请求的;注意不是vcode
        userServiceInfo:null,
        share: false,  // 分享默认为false
        height: 0,
        url: "https://yz.hzhfeidian.com/",
        systemInfo: null, //客户端设备信息
        userInfo: null,
        userData: null,
        dataId: { openid: null, },

        v_APPID: "wxc94fcf2ca6357311", //小程序ID
        //v_MCHID: "1490258882",
        //v_KEY: "Hzzndq12345665432157491239823212",
        v_APPSECRET: "c8b34fb74deb4be6017e141e6ac4989d",  //小程序密钥
        v_OPENID: "",
        g_CURINGTYPE: [],
    }
})

/*   */