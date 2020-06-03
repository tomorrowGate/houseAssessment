// components/baidumap/baidumap.js
let bmap = require('../../utils/bmap/bmap-wx.min.js');
let wxMarkerData = [];  //定位成功回调对象  
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        searchName: {
            type: String,
            value:"",
            observer:function(newVal,oldVal){
                console.log(newVal,oldVal)
                this.initSearchHouse(newVal)
            }
        },
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
        topActiveIndex:0,
        bottomActiveIndex:0,
        ak: "lORax9Vc3aYWyYwaTK95egAcCpZ3yvWH", //填写申请到的ak  
        markers: [],//地图上的mark点
        currentMark:{},//点击的mark点
        mapGeo:{},//地图的定位
        selfGeo:{},//自身的定位
        wxMarkerData:[],//
        placeData: {},
        cityInfo: {},     //城市信息  
        searchTopText:"",
        searchBottomText:"",
        activeSearchID:"",//点击搜索结果时保存的id
        isSearchShow:false,//是否显示搜索结果

        /* 弹窗信息 */
        mapdiaShow:false,
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
            //this.locatSelf()
            //this.sendPOISearch("楼盘 住宅")
            
        },
        //初始搜素房屋
        initSearchHouse(text){
            let that = this
            text && this.data.BMap.search({
                "query": text,
                fail: function (data) {
                    console.log(data, "fail")
                },
                success: function (data) {
                    console.log(data.wxMarkerData)
                    that.sendPOISearch("楼盘 住宅")
                    data.wxMarkerData[0].iconPath = "../../static/img/marker_blue.png";
                    data.wxMarkerData[0].id = 101//这里是自己定义了id为101的mark点就是搜索的点
                    that.data.markers.push(data.wxMarkerData[0])//这里会被后面的数据给冲掉
                    that.setData({
                        selfGeo: data.wxMarkerData[0],
                        mapGeo: data.wxMarkerData[0],
                        markers :that.data.markers
                    })
                },
                fail(err) {
                    console.log(err)
                }
            })
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
                            selfGeo: res.wxMarkerData[0],
                            mapGeo: res.wxMarkerData[0],
                        })
                        resolve(res.wxMarkerData[0])
                    }
                });
            })
        },
        //点击改变POI请求
        changeSearchTop(e){
            let searchTopText = this.data.searchTopText
                , searchBottomText = this.data.searchBottomText
                , text = ""
                , topActiveIndex = this.data.topActiveIndex
                , bottomActiveIndex = this.data.bottomActiveIndex
            if (e.currentTarget.dataset.type == 'top'){
                searchTopText = e.currentTarget.dataset.text
                searchBottomText = ""
                topActiveIndex = e.currentTarget.dataset.index
                bottomActiveIndex = 0
            }else{
                searchBottomText =  e.currentTarget.dataset.text
                bottomActiveIndex = e.currentTarget.dataset.index
            }
            text = searchTopText +" "+ searchBottomText
            this.sendPOISearch(text)
            this.setData({
                searchTopText,
                searchBottomText,
                topActiveIndex,
                bottomActiveIndex
            })
            console.log(text)
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
                        let wxMarkerData = data.wxMarkerData;
                        wxMarkerData.forEach((v, i) => {
                            v.distance = parseInt(that.calcDistance(that.data.selfGeo.latitude, that.data.selfGeo.longitude, v.latitude, v.longitude)*1000)
                            v.callout = {
                                content: v.title,
                                textAlign:"left",
                                borderRadius:"4",
                                padding:"5"
                            }
                        })
                        let wxMarkerDataPlus = [...wxMarkerData]
                        wxMarkerDataPlus.push(that.data.selfGeo)
                        that.setData({
                            markers: wxMarkerDataPlus,
                            wxMarkerData,
                        });
                        //that.calcDistance()
                        resolve(data.wxMarkerData)
                    },
                    iconPath: '../../static/img/marker_red.png',
                    iconTapPath: '../../static/img/marker_red.png'
                });
            })
        },
        closeSearch(e){
            this.setData({
                isSearchShow: !this.data.isSearchShow
            })
        },
        clickSearchItem(e){
            let currentMark = this.data.mapGeo
            this.data.markers.forEach((v,i)=>{
                if (v.id == e.currentTarget.dataset.id){
                    console.log(111)
                    currentMark = v
                    v.iconPath = "../../static/img/marker_blue.png";
                }else{
                    v.iconPath = "../../static/img/marker_red.png"
                }
               
            })
            this.setData({
                mapGeo: currentMark,
                markers: this.data.markers,
                activeSearchID: e.currentTarget.dataset.id
            })
            console.log(currentMark, this.data.markers)
        },
        makertap(e){
            let currentMark = this.data.wxMarkerData.find((v,i)=>{
               return v.id == e.markerId
            })
            this.setData({
                mapdiaShow: true,
                currentMark,
            })
            console.log(e, currentMark)
            
            // wx.openLocation({
            //     latitude: 39.915378,
            //     longitude: 116.403694,
            //     scale: 18,
            //     name: '天安门广场',
            //     address: '北京市东城区长安街'
            // })
        },
        closeDia(){
            this.setData({
                mapdiaShow: false
            })
        },
        goHouseDet(){
            this.closeDia()
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
            //s=s.toFixed(3);
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
