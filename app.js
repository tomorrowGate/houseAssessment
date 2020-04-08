//app.js
let CryptoJS = require('./utils/crypto-js.js');
require('./utils/aes.js');
App({
  data: {
    url: 'https://www.xaqnxl.com/',
    urlex: 'https://www.xazhyl.com/',
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

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
    systemInfo: null, //客户端设备信息
    userInfo: null,
    userData: null,
    dataId: { openid: null, },

    v_WEBSET: "https://www.xaqnxl.com",
    v_APPID: "wxc94fcf2ca6357311", //小程序ID
    //v_MCHID: "1490258882",
    //v_KEY: "Hzzndq12345665432157491239823212",
    v_APPSECRET: "c8b34fb74deb4be6017e141e6ac4989d",  //小程序密钥
    v_OPENID: "",
    g_CURINGTYPE: [],
  }
})

/*   */