import {getMonths } from "../utils/dateCalc.js"
export const qualityArr = [{ name: "一般" }, { name: "较高" }, { name: "较低" }]
export const houseTypeArr = [{ name: "一般" }, { name: "较高" }, { name: "较低" }]
export const housePatternArr = [{ name: "合理" }, { name: "不合理" }]

export const spatialForm = [{ name: "平层" }, { name: "跃层" }, { name: "LOFT" }]
export const outdoorLandscape = [{ name: "一般" }, { name: "较好 " }, { name: "较差 " }]

export const decorationGrade = [{ name: "毛坯" }, { name: "简易" }, { name: "中档 " }, { name: "高档 " }]
export const basement = [{ name: "无" }, { name: "未计入建筑面积 " }]
export const attic = [{ name: "无" }, { name: "未计入建筑面积 " }]
export const publicFacilities = [{ name: "基本完备" }, { name: "完备 " }, { name: "欠完备" }]

export const terrace = [{ name: "无" }, { name: "未计入建筑面积 " }]
export const aversionFacility = [{ name: "无" }, { name: "近 " },{ name: "中等" }, { name: "远" }]
export const yard = [{ name: "无" }, { name: "面积较小 " }, { name: "面积一般" }, { name: "面积较大" }, { name: "面积大" }]
export const other = [{ name: "无" }, { name: "走破户型 " }, { name: "房屋内发生命案" }, { name: "其他" }]

/* 模拟房产信息 */

export const villageInfo = {
    years: Math.floor(Math.random() * 19 + 2000)
    , propertyCost: Math.floor(Math.random() * 2048 + 2000) + "元/年"
    , buildArea: Math.floor(Math.random() * 100 + 30) + "㎡"
    , propertyType: Math.random() > 0.6 ?"居住物业"
            : Math.random() > 0.3 ? "商业物业" :"工业物业"
    , cars: Math.floor(Math.random() * 300 + 500)
    , houseTotal: Math.floor(Math.random() * 3000 + 8000)
    , volume: Math.floor(Math.random() * 90 + 10) + "%"
    , green: Math.floor(Math.random() * 70 + 30) + "%"
    , propertCompony: Math.random() > 0.6 ? "绿城西子紫兰公寓物业"
        : Math.random() > 0.3 ? "莱德绅华府物业" : "绿之江物业"
}

/* 模拟列表数据 */
export const table1 = [
    {
        name: "0-500",
        arr: [5622, 234, 1025, 546]
    },
    {
        name: "500-800",
        arr: [9833, 9845, 3203, 7856]
    },
    {
        name: "800-1200",
        arr: ["", 9840, 1023, 359]
    },
    {
        name: "1200-1500",
        arr: ["", 45614, 7032, 654]
    },
    {
        name: "1500-2000",
        arr: ["", "", 33, 6]
    },
    {
        name: "2000以上",
        arr: ["", "", "", 998]
    }
]


export const table2 = [
    {
        name: "0-500",
        arr: [226, 1424, 233, 60]
    },
    {
        name: "500-800",
        arr: [645, 524, 353, 456]
    },
    {
        name: "800-1200",
        arr: [122, 2453, 4353, 36]
    },
    {
        name: "1200-1500",
        arr: ["", 378, 3453, 453]
    },
    {
        name: "1500-2000",
        arr: ["", "", 896,4533]
    },
    {
        name: "2000以上",
        arr: ["", "", "", 46]
    }
]


export const table3 = [
    {
        name: "0-500",
        arr: [3314, 5154, 3548, 1569]
    },
    {
        name: "500-800",
        arr: [8153, 312, 678, 3347]
    },
    {
        name: "800-1200",
        arr: [3543, 354, 123, 7865]
    },
    {
        name: "1200-1500",
        arr: ["", 98, 3210, 633]
    },
    {
        name: "1500-2000",
        arr: ["", "", 6548, 231]
    },
    {
        name: "2000以上",
        arr: ["", "", "", 7686]
    }
]


export const table4 = [
    {
        name: "0-500",
        arr: [7896, 53, 153, 786]
    },
    {
        name: "500-800",
        arr: [3565, 524, 678, 5]
    },
    {
        name: "800-1200",
        arr: [34, 766, 78, 786]
    },
    {
        name: "1200-1500",
        arr: ["", 3453, 65, 7889]
    },
    {
        name: "1500-2000",
        arr: ["", "", 689, 345]
    },
    {
        name: "2000以上",
        arr: ["", "", "", 233]
    }
]

/* 模拟折线图数据 */
export const option = {
    color: ["#03A174", "#FF9442"],
    legend: {
        data: ['幢', '小区']
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
        }
    ],
    yAxis: [{
        type: 'value'
    }],
    series: [
        {
            name: '幢',
            type: 'line',
            smooth: true,
            animation: true,
            lineStyle: {
                normal: {
                    color: "#03A174"
                }
            },
            data: [1, 0.4, 1.3, 2.4, 4.3, 2, 1.3, 0.4, 3.3, 3.8, 2.3, 4]
        },
        {
            name: '小区',
            type: 'line',
            smooth: true,
            animation: true,
            lineStyle: {
                normal: {
                    color: "#FF9442"
                }
            },
            data: [3.9, 5.9, 1.1, 0.7, 3.3, 2.2, 1.6, 4.6, 5.4, 1.4, 1.3, 0.7]
        }
    ]
};

export const option1_1 = {
    color: ["#03A174", "#FF9442"],
    legend: {
        data: ['幢', '小区']
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
        }
    ],
    yAxis: [{
        type: 'value'
    }],
    series: [
        {
            name: '幢',
            type: 'line',
            smooth: true,
            animation: true,
            lineStyle: {
                normal: {
                    color: "#03A174"
                }
            },
            data: [4, 4.4, 5.3, 2.4, 2.8, 3.7, 4, 5.4, 3.3, 3, 2.3, 1]
        },
        {
            name: '小区',
            type: 'line',
            smooth: true,
            animation: true,
            lineStyle: {
                normal: {
                    color: "#FF9442"
                }
            },
            data: [1.2, 1.9, 2.7, 4.7,5.3, 5.2,4.6, 5.6, 4.4, 2.4, 1.3, 0.7]
        }
    ]
};

export const option2 = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    color: ["#03A174", "#FF9442", "#005DFC"],
    legend: {
        data: ['月度', '季度', '年度']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: { }
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '月度',
            type: 'line',
            data: [20, 37, 42, 61, 64, 50, 42, 67, 62, 71, 64, 80],
            animation:true,
            lineStyle:{
                normal:{
                    color:"#03A174"
                }
            },
            smooth: true
        },
        {
            name: '季度',
            type: 'line',
            data: [96, 19, 73, 5, 53, 46, 69, 19, 77, 41, 53, 69],
            animation: true,
            lineStyle: {
                normal: {
                    color: "#FF9442"
                }
            },
            smooth: true
        },
        {
            name: '年度',
            type: 'line',
            data: [77, 32, 21, 15, 29, 40, 51, 55, 53, 69, 44, 75],
            animation: true,
            lineStyle: {
                normal: {
                    color: "#005DFC"
                }
            },
            smooth: true
        },
    ]
}


export const option2_1 = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    color: ["#03A174", "#FF9442", "#005DFC"],
    legend: {
        data: ['月度', '季度', '年度']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '月度',
            type: 'line',
            data: [10, 37, 42, 36, 44, 54, 57, 35, 32, 41, 54, 19],
            animation: true,
            lineStyle: {
                normal: {
                    color: "#03A174"
                }
            },
            smooth: true
        },
        {
            name: '季度',
            type: 'line',
            data: [9, 14, 20, 35, 58, 26, 69, 67, 53, 21, 13, 9],
            animation: true,
            lineStyle: {
                normal: {
                    color: "#FF9442"
                }
            },
            smooth: true
        },
        {
            name: '年度',
            type: 'line',
            data: [78, 22, 11, 19, 49, 31, 21, 35, 43, 62, 48, 35],
            animation: true,
            lineStyle: {
                normal: {
                    color: "#005DFC"
                }
            },
            smooth: true
        },
    ]
}

export const option3 = {
    color: ["#03A174", "#FF9442"],
    legend: {
        data: ['小区', '杭州']
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
        }
    ],
    yAxis: [{
        type: 'value'
    }],
    series: [
        {
            name: '小区',
            type: 'line',
            smooth: true,
            animation: true,
            lineStyle: {
                normal: {
                    color: "#03A174"
                }
            },
            data: [1, 0.4, 1.3, 2.4, 4.3, 2, 1.3, 0.4, 3.3, 3.8, 2.3, 4]
        },
        {
            name: '杭州',
            type: 'line',
            smooth: true,
            animation: true,
            lineStyle: {
                normal: {
                    color: "#FF9442"
                }
            },
            data: [3.9, 5.9, 1.1, 0.7, 3.3, 2.2, 1.6, 4.6, 5.4, 1.4, 1.3, 0.7]
        }
    ]
};

export const option3_1 = {
    color: ["#03A174", "#FF9442"],
    legend: {
        data: ['小区', '杭州']
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
        }
    ],
    yAxis: [{
        type: 'value'
    }],
    series: [
        {
            name: '小区',
            type: 'line',
            smooth: true,
            animation: true,
            lineStyle: {
                normal: {
                    color: "#03A174"
                }
            },
            data: [1, 1.4, 2.3, 3.4, 4.3, 2.2, 1.3, 5.4, 3.3, 3.8, 2.3, 1.4]
        },
        {
            name: '杭州',
            type: 'line',
            smooth: true,
            animation: true,
            lineStyle: {
                normal: {
                    color: "#FF9442"
                }
            },
            data: [1.9, 1.2, 3.1, 2.7, 3.3, 2.2, 1.6, 4.6, 5.4, 1.4, 5.3, 2.7]
        }
    ]
};

export const option4 = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    color: ["#03A174", "#FF9442", "#005DFC"],
    legend: {
        data: ['月度', '季度', '年度']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '月度',
            type: 'line',
            data: [50, 77, 82, 71, 54, 20, 42, 37, 82, 41, 64, 40],
            animation: true,
            lineStyle: {
                normal: {
                    color: "#03A174"
                }
            },
            smooth: true
        },
        {
            name: '季度',
            type: 'line',
            data: [96, 19, 73, 5, 53, 46, 69, 19, 77, 41, 53, 69],
            animation: true,
            lineStyle: {
                normal: {
                    color: "#FF9442"
                }
            },
            smooth: true
        },
        {
            name: '年度',
            type: 'line',
            data: [77, 32, 21, 15, 49, 30, 41, 5, 53, 69, 44, 75],
            animation: true,
            lineStyle: {
                normal: {
                    color: "#005DFC"
                }
            },
            smooth: true
        },
    ]
}

export const option4_1 = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    color: ["#03A174", "#FF9442", "#005DFC"],
    legend: {
        data: ['月度', '季度', '年度']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '月度',
            type: 'line',
            data: [150, 117, 102, 151, 64, 80, 62, 57, 42, 81, 94, 79],
            animation: true,
            lineStyle: {
                normal: {
                    color: "#03A174"
                }
            },
            smooth: true
        },
        {
            name: '季度',
            type: 'line',
            data: [96, 119, 173, 85, 93, 146, 69, 39, 77, 121,73, 94],
            animation: true,
            lineStyle: {
                normal: {
                    color: "#FF9442"
                }
            },
            smooth: true
        },
        {
            name: '年度',
            type: 'line',
            data: [77, 132, 121, 45, 69, 130, 141, 35, 53, 169, 144, 57],
            animation: true,
            lineStyle: {
                normal: {
                    color: "#005DFC"
                }
            },
            smooth: true
        },
    ]
}

export const option5 = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    color: ["#03A174", "#FF9442"],
    legend: {
        data: ['城区房价', '小区房价']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '城区房价',
            type: 'line',
            data: (function () {
                var res = [];
                var len = 12;
                while (len--) {
                    res.push(Math.round(Math.random() * 1000));
                }
                return res;
            })(),
            animation: true,
            lineStyle: {
                normal: {
                    color: "#03A174"
                }
            },
            smooth: true
        },
        {
            name: '小区房价',
            type: 'line',
            data: (function () {
                var res = [];
                var len = 12;
                while (len--) {
                    res.push(Math.round(Math.random() * 1000));
                }
                return res;
            })(),
            animation: true,
            lineStyle: {
                normal: {
                    color: "#FF9442"
                }
            },
            smooth: true
        },
    ]
}

export const optionTime = {
    color: ["#03A174"],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {
        data: ['幢']
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: getMonths()
            //data: []//填入时间
        }
    ],
    yAxis: [{
        type: 'value'
    }],
    series: [
        {
            name: '幢',
            type: 'line',
            smooth: true,
            animation: true,
            lineStyle: {
                normal: {
                    color: "#03A174"
                }
            },
            //data: [],//填入数量
            data: (function () {
                var res = [];
                var len = 12;
                while (len--) {
                    res.push(Math.round(Math.random() * 1000));
                }
                return res;
            })()
        },
    ]
};
/* 模拟直方图 */
export const optionBarPic = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    xAxis: {
        type: 'category',
        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: (function () {
            var res = [];
            var len = 12;
            while (len--) {
                res.push(Math.round(Math.random() * 1000));
            }
            return res;
        })(),
        type: 'line',
        smooth: true
    }]
}

/* 模拟直方图和折线图的和图 */
export const optionTotcalLine = {
    legend: {
        data: ['最新成交价', '预购队列']
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            data: (function () {
                var now = new Date();
                var res = [];
                var len = 10;
                while (len--) {
                    res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                    now = new Date(now - 2000);
                }
                return res;
            })()
        },
        {
            show:false,
            type: 'category',
            boundaryGap: true,
            data: (function () {
                var res = [];
                var len = 10;
                while (len--) {
                    res.push(10 - len - 1);
                }
                return res;
            })()
        }
    ],
    yAxis: [
        {
            type: 'value',
            scale: true,
            name: '价格',
            max: 30,
            min: 0,
            boundaryGap: [0.2, 0.2]
        },
        {
            type: 'value',
            scale: true,
            name: '预购量',
            max: 1200,
            min: 0,
            boundaryGap: [0.2, 0.2]
        }
    ],
    series: [
        {
            name: '预购队列',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: (function () {
                var res = [];
                var len = 10;
                while (len--) {
                    res.push(Math.round(Math.random() * 1000));
                }
                return res;
            })()
        },
        {
            name: '最新成交价',
            type: 'line',
            data: (function () {
                var res = [];
                var len = 0;
                while (len < 10) {
                    res.push((Math.random() * 10 + 5).toFixed(1) - 0);
                    len++;
                }
                return res;
            })()
        }
    ]
};

/* 柱状 加 折线 */
export function backBarAndLine(title1,title2,times){
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: [title1, title2]
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: times
            },
            {
                show: false,
                type: 'category',
                boundaryGap: true,
                data: (function () {
                    var res = [];
                    var len = times.length||10;
                    while (len--) {
                        res.push(10 - len - 1);
                    }
                    return res;
                })()
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: title1,
                max: 30,
                min: 0,
                boundaryGap: [0.2, 0.2]
            },
            {
                type: 'value',
                scale: true,
                name: title2,
                max: 1200,
                min: 0,
                boundaryGap: [0.2, 0.2]
            }
        ],
        series: [
            {
                name: title1,
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: (function () {
                    var res = [];
                    var len = times.length||10;
                    while (len--) {
                        res.push(Math.round(Math.random() * 1000));
                    }
                    return res;
                })()
            },
            {
                name: title2,
                type: 'line',
                data: (function () {
                    var res = [];
                    var len = 0;
                    while (len < times.length) {
                        res.push((Math.random() * 10 + 5).toFixed(1) - 0);
                        len++;
                    }
                    return res;
                })()
            }
        ]
    };
}

/* 双柱状 */
export function backBarAndBar(title1, title2, times, twoType = ["bar", "bar"]) {
    return {
        color: ['#4cabce', '#e5323e'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: [title1, title2]
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: times
            },
            {
                show: false,
                type: 'category',
                boundaryGap: true,
                data: (function () {
                    var res = [];
                    var len = times.length || 10;
                    while (len--) {
                        res.push(10 - len - 1);
                    }
                    return res;
                })()
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: title1,
                max: 30,
                min: 0,
                boundaryGap: [0.2, 0.2]
            },
            {
                type: 'value',
                scale: true,
                name: title2,
                max: 1200,
                min: 0,
                boundaryGap: [0.2, 0.2]
            }
        ],
        series: [
            {
                name: title1,
                type: twoType[0],
                xAxisIndex: 0,
                yAxisIndex: 1,
                data: (function () {
                    var res = [];
                    var len = times.length || 10;
                    while (len--) {
                        res.push(Math.round(Math.random() * 1000));
                    }
                    return res;
                })()
            },
            {
                name: title2,
                type: twoType[1],
                data: (function () {
                    var res = [];
                    var len = 0;
                    while (len < times.length) {
                        res.push((Math.random() * 10 + 5).toFixed(1) - 0);
                        len++;
                    }
                    return res;
                })()
            }
        ]
    };
}

/* 双折线图 */
export function doubleLine (title1, title2, times) {
    return {
        legend: {
            data: [title1, title2]
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: times,
            },
            {
                show: false,
                type: 'category',
                boundaryGap: true,
                data: (function () {
                    var res = [];
                    var len = times.length || 10;
                    while (len--) {
                        res.push(10 - len - 1);
                    }
                    return res;
                })()
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: title1,
                max: 30,
                min: 0,
                boundaryGap: [0.2, 0.2]
            },
            {
                type: 'value',
                scale: true,
                name: title2,
                max: 1200,
                min: 0,
                boundaryGap: [0.2, 0.2]
            }
        ],
        series: [
            {
                name: title1,
                type: 'line',
                xAxisIndex: 1,
                yAxisIndex: 1,
                smooth: true,
                animation: true,
                data: (function () {
                    var res = [];
                    var len = times.length || 10;
                    while (len--) {
                        res.push(Math.round(Math.random() * 1000));
                    }
                    return res;
                })()
            },
            {
                name: title2,
                type: 'line',
                smooth: true,
                animation: true,
                data: (function () {
                    var res = [];
                    var len = 0;
                    while (len < times.length) {
                        res.push((Math.random() * 10 + 5).toFixed(1) - 0);
                        len++;
                    }
                    return res;
                })()
            }
        ]
    };
}
