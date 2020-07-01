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
/* 柱状 加 折线 */
export function backBarAndLine(title1,title2,times,ydata1,ydata2){
    return {
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
                data: times
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: title1,
                 min: 0,
                /*max: Math.max(...ydata1) * 2,
                splitNumber: 6,
                interval: (Math.max(...ydata1) * 2 - 0) / 6, */
                splitLine: { show: false },
                boundaryGap: [0.2, 0.2]
            },
            {
                type: 'value',
                scale: true,
                name: title2,
                 min: 0,
                /*max: Math.max(...ydata2) * 2,
                splitNumber: 6,
                interval: (Math.max(...ydata2) * 2 - 0) / 6, */
                splitLine: { show: false },
                boundaryGap: [0.2, 0.2]
            }
        ],
        series: [
            {
                name: title1,
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: ydata1
            },
            {
                name: title2,
                type: 'line',
                smooth: true,
                data: ydata2
            }
        ]
    };
}

/* 双柱状 */
export function backBarAndBar(title1, title2, times,ydata1,ydata2, twoType = ["bar", "bar"]) {
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
                data: times
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: title1,
                splitLine: { show: false },
                min: 0,
                max: Math.max(...ydata1) * 2,
                splitNumber: 6,
                interval: (Math.max(...ydata1) * 2 - 0) / 6,
                boundaryGap: [0.2, 0.2]
            },
            {
                type: 'value',
                scale: true,
                name: title2,
                min: 0,
                max: Math.max(...ydata2) * 2,
                splitNumber: 6,
                interval: (Math.max(...ydata2) * 2 - 0) / 6,
                splitLine: { show: false },
                boundaryGap: [0.2, 0.2]
            }
        ],
        series: [
            {
                name: title1,
                type: twoType[0],
                xAxisIndex: 0,
                yAxisIndex: 1,
                data: ydata1
            },
            {
                name: title2,
                type: twoType[1],
                data: ydata2
            }
        ]
    };
}
/* 单折线 */
export function oneLine(title1, times, yData) {
    return {
        color: ["#03A174"],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
           /*  data: [title1] */
        },
        grid: {
            top:"4%",
            left: "50",
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: times
            }
        ],
        yAxis: [{
            /* name: title1, */
            type: 'value',
        }],
        series: [
            {
                /* name: title1, */
                type: 'line',
                smooth: true,
                animation: true,
                lineStyle: {
                    normal: {
                        color: "#03A174"
                    }
                },
                data: yData,//填入数量
            },
        ]
    }
} 

/* 双折线图 */
export function doubleLine(title1, title2, times, ydata1, ydata2) {
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
        grid:{
            left:"50",
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
                data: times
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: title1,
                min: 0,
               /*  max: Math.max(...ydata1) * 2,
                splitNumber: 6,
                interval: (Math.max(...ydata1) * 2 - 0) / 6, */
                splitLine: { show: false },
                boundaryGap: [0.2, 0.2]
            },
            {
                type: 'value',
                scale: true,
                name: title2,
                min: 0,
                /* max: Math.max(...ydata2) * 2,
                splitNumber: 6,
                interval: (Math.max(...ydata2) * 2 - 0) / 6, */
                splitLine: { show: false },
                boundaryGap: [0.2, 0.2]
            }
        ],
        series: [
            {
                name: title1,
                type: 'line',
                smooth: true,
                animation: true,
                data: ydata1,
                yAxisIndex: 0,
            },
            {
                name: title2,
                type: 'line',
                smooth: true,
                animation: true,
                yAxisIndex: 1,
                data:  ydata2
            }
        ]
    };
}
