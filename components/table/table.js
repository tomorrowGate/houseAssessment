// components/table/table.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        thData:{
            type:Array,
            value:[],
            observer(){

            }
        },
        trDatas:{
            type: Array,
            value: [],
            observer() {
                let sum = 0
                this.properties.trDatas.forEach((v,i)=>{
                    let sumpre =  v.arr.reduce((prev, curr) => {
                        return prev*1 + curr*1
                    })
                    sum = sumpre*1 + sum*1
                })
                console.log(sum, parseInt(sum / 12) )
                this.setData({
                    level1: parseInt(sum / 24),
                    level2: parseInt(sum / 12),
                    level3: parseInt(sum / 12)*2,
                })
            }
        },
        trtdWidth:{
            type:String,
            value:"150"
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        level1: 0,
        level2: 0,
        level3: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
