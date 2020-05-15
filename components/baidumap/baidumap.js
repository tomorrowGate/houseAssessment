// components/baidumap/baidumap.js
let bmap = require('../../utils/bmap/bmap-wx.min.js');
let wxMarkerData = [];  //定位成功回调对象  
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        BMap: null,
        mapControlArr: [{
            name: "楼盘",
            nameID: "1"
        }, {
            name: "交通",
            nameID: "2"
        }, {
            name: "商业",
            nameID: "3"
        }, {
            name: "学校",
            nameID: "4"
        }, {
            name: "医院",
            nameID: "5"
        }, {
            name: "不利因素",
            nameID: "6"
        }],
        mapSubControl:[{
            name: "住宅",
            nameID: "1"
        }, {
            name: "写字楼",
            nameID: "2"
        }],
        ak: "lORax9Vc3aYWyYwaTK95egAcCpZ3yvWH", //填写申请到的ak  
        markers: [],
        selfGeo:{},
        wxMarkerData:[],
        placeData: {},
        cityInfo: {}     //城市信息  
    },

    /**
     * 组件的方法列表
     */
    methods: {
        creatBMap() {
            let that = this;
            // 新建百度地图对象 
            let BMap = new bmap.BMapWX({
                ak: that.data.ak
            });
            this.setData({
                BMap,
            })
            this.locatSelf()
            this.sendPOISearch("楼盘 住宅")
        },
        // 用百度地图来定位 
        locatSelf(){
            let that = this
            return new Promise((resolve,reject)=>{
                this.data.BMap.regeocoding({
                    fail(err) {
                        console.log(err)
                        reject()
                    },
                    success(res) {
                        console.log(res)
                        that.setData({
                            selfGeo: res.wxMarkerData[0]
                        })
                        resolve(res.wxMarkerData[0])
                    }
                });
            })
        },
        // 发起POI检索请求 
        sendPOISearch(text) {
            let that = this;
            return new Promise((resolve, reject) => {
                this.data.BMap.search({
                    "query": text,
                    fail: function (data) {
                        console.log(data, "fail")
                        reject()
                    },
                    success: function (data) {
                        console.log(data, "success")
                        wxMarkerData = data.wxMarkerData;
                        that.setData({
                            markers: wxMarkerData,
                            wxMarkerData,
                        });
                        wxMarkerData.forEach((v,i)=>{
                            that.calcDistance(that.data.selfGeo.latitude, that.data.selfGeo.longitude, v.latitude, v.longitude)
                        })
                        //that.calcDistance()
                        resolve(data.wxMarkerData)
                    },
                    iconPath: '../../static/img/marker_red.png',
                    iconTapPath: '../../static/img/marker_red.png'
                });
            })
        },
        showSearchInfo: function (data, i) {
            var that = this;
            that.setData({
                placeData: {
                    title: '名称：' + data[i].title + '\n',
                    address: '地址：' + data[i].address + '\n',
                    telephone: '电话：' + data[i].telephone
                }
            });
        },
        changeMarkerColor: function (data, i) {
            var that = this;
            var markers = [];
            for (var j = 0; j < data.length; j++) {
                if (j == i) {
                    // 此处需要在相应路径放置图片文件 
                    data[j].iconPath = "../../img/marker_yellow.png";
                } else {
                    // 此处需要在相应路径放置图片文件 
                    data[j].iconPath = "../../img/marker_red.png";
                }
                markers[j](data[j]);
            }
            that.setData({
                markers: markers
            });
        },
        makertap(e){
            console.log(e)
            // wx.openLocation({
            //     latitude: 39.915378,
            //     longitude: 116.403694,
            //     scale: 18,
            //     name: '天安门广场',
            //     address: '北京市东城区长安街'
            // })
        },
        //进行经纬度转换为距离的计算
        latToRad(d){
            //经纬度转换成三角函数中度分表形式。
            return d * Math.PI / 180.0;
        },
        calcDistance(lat1, lng1, lat2, lng2){
            //输出为公里
            var radLat1 = this.latToRad(lat1);
            var radLat2 = this.latToRad(lat2);
            var a = radLat1 - radLat2;
            var b = this.latToRad(lng1) - this.latToRad(lng2);
            var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
                Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
            s = s * 6378.137;// EARTH_RADIUS;
            s = Math.round(s * 10000) / 10000; 
            //s=s.toFixed(2);
            return s;
        }
    },
    lifetimes: {
        attached: function () {

        },
        detached: function () {

        },
    },
    pageLifetimes: {
        show: function () {
            // 页面被展示
            this.creatBMap()
        },
        hide: function () {
            // 页面被隐藏
        },
        resize: function (size) {
            // 页面尺寸变化
        }
    }
})
