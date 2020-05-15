// components/funcinput/funcinput.js
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
        searchParameter: {
            county: "",
            countyName: "",
            dong: "",
            unit: "",
            room: ""
        },
        fuzzyQuery: {
            city: ["西湖", "杭州", "萧山", "西山", "西海"],
            filterData: [],
            inputValue: "",
            canSwitch: true
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        vModule(e) {
            console.log(e.currentTarget.dataset.option, e.detail.value)
            let data = `searchParameter.${e.currentTarget.dataset.option}`
            this.setData({
                [data]: e.detail.value
            })
        },
        houseSearch() {
            this.setData({
                'searchParameter.county': this.data.fuzzyQuery.inputValue,
                'searchParameter.countyName': this.data.village.inputValue
            })
            let searchParameter = this.data.searchParameter
            console.log(searchParameter)
            wx.navigateTo({
                url: '/pages/housePriceDet/housePriceDet?searchParameter=' + searchParameter,
            })
        },
        filter(e) {
            let keywords = e.detail.value
                , result = []
                , filterdataArr = e.currentTarget.dataset.filterdata.city
                , setDataKey = e.currentTarget.dataset.filterkey
                , fliterDataKey = setDataKey + '.filterData'
                , inputValueKey = setDataKey + '.inputValue'
            console.log(fliterDataKey, inputValueKey)
            e.detail.value && filterdataArr.forEach((city, index) => {
                if (city.includes(keywords)) {
                    result.push(city)
                }
            })

            this.setData({
                [fliterDataKey]: result,
                [inputValueKey]: e.detail.value
            })
        },
        clearFilter(e) {
            let that = this
                , setDataKey = e.currentTarget.dataset.filterkey
                , fliterDataKey = setDataKey + '.filterData'
                , inputValueKey = setDataKey + '.inputValue'

            setTimeout(function () {
                that.setData({
                    [fliterDataKey]: []
                })
            }, 300)
        },
        makesure(e) {
            let that = this
                , setDataKey = e.currentTarget.dataset.filterkey
                , fliterDataKey = setDataKey + '.filterData'
                , inputValueKey = setDataKey + '.inputValue'

            this.setData({
                [inputValueKey]: e.currentTarget.dataset.value,
                [fliterDataKey]: [],
            })
        },
    }
})
