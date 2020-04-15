const app = getApp()
var util = require('../../utils/util.js');
const date = new Date()
const nowYear = date.getFullYear()
const nowMonth = date.getMonth() + 1
const nowDay = date.getDate()
let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
// 根据年月获取当月的总天数
let getDays = function (year, month) {
    if (month === 2) {
        return ((year % 4 === 0) && ((year % 100) !== 0)) || (year % 400 === 0) ? 29 : 28
    } else {
        return daysInMonth[month - 1]
    }
}
// 根据年月日设置当前月有多少天 并更新年月日数组
let setDate = function (year, month, day, _this) {
    let daysNum = year === nowYear && month === nowMonth ? nowDay : getDays(year, month)
    day = day > daysNum ? 1 : day
    let monthsNum = year === nowYear ? nowMonth : 12
    let years = []
    let months = []
    let days = []
    let yearIndex = 9999
    let monthIndex = 0
    let dayIndex = 0
    // 重新设置年份列表
    for (let i = 1990; i <= nowYear; i++) {
        years.push(i)
    }
    years.map((v, idx) => {
        if (v === year) {
            yearIndex = idx
        }
    })
    // 重新设置月份列表
    for (let i = 1; i <= monthsNum; i++) {
        var k = i;
        months.push(k)
    }
    months.map((v, idx) => {
        if (v === month) {
            monthIndex = idx
        }
    })
    // 重新设置日期列表
    for (let i = 1; i <= daysNum; i++) {
        var k = i;
        days.push(k)
    }
    days.map((v, idx) => {
        if (v === day) {
            dayIndex = idx
        }
    })

    _this.setData({
        //时间列表参数
        years: years,
        months: months,
        days: days,
        //选中的日期
        year: year,
        month: month,
        day: day,
        value: [yearIndex, monthIndex, dayIndex],
    })
}

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isShowDia: {
            type: Boolean,
            value: false,
            observer(){
                
            }
        },
        isAcCenCle: {
            type: Boolean,
            value: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        //时间列表参数
        flag: false,
        years: [],
        months: [],
        days: [],
        //选中的日期
        year: nowYear,
        month: nowMonth,
        day: nowDay,
        value: [9999, 1, 1],
        typey: "",
        startTime:"",
        endTime:"",
        showModal: false,
        showModals: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        go(e){
            let startTime = this.data.year + "/" + this.data.month + "/" + this.data.day
            this.setData({
                isShowDia:true,
                showModal: true,
                showModals: true,
                startTime,
            })
        },
        bindChange: function (e) {
            let val = e.detail.value
            setDate(this.data.years[val[0]], this.data.months[val[1]], this.data.days[val[2]], this)
        },
        gos: function () {
            let _this = this;
            let startTime = this.data.startTime
            let endTime = this.data.year + "/" + this.data.month + "/" + this.data.day
            this.setData({
                showModals: false,
                endTime,
            })
            //console.log(startTime, endTime)
            this.triggerEvent("getTimeCut", { startTime, endTime }, true)
        },
        cancel: function () {
            this.setData({
                showModals: false
            })
        },
    },
    
    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行
            setDate(this.data.year, this.data.month, this.data.day, this);
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    pageLifetimes: {
        show: function () {
            // 页面被展示
        },
        hide: function () {
            // 页面被隐藏
        },
        resize: function (size) {
            // 页面尺寸变化
        }
    }
    
})
