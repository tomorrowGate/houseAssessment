
//根据给定年份计算月时间段列表：
export function countMonthList(begin,end) {
    let beginMon = begin.split("/")[0] * 12 + begin.split("/")[1]*1
        , endMon = end.split("/")[0] * 12 + end.split("/")[1]*1
        , mons = endMon - beginMon
        , arr = []
        , beginOut = begin
    console.log(begin,end,mons)
    for( let i = 0;i<mons;i++){
        if ((beginOut.split("/")[1] * 1 + 1)*1 > 12){
            beginOut = parseInt(beginOut.split("/")[0]*1+1) + "/" + "01"
        }else{
            beginOut = beginOut.split("/")[0] + "/" + parseInt(beginOut.split("/")[1] * 1 + 1 ) 
        }
        arr.push(beginOut)
    }
    arr.unshift(begin.split("/")[0] + "-" + begin.split("/")[1])
    return arr
}

export function getMonths() {
    var dataArr = [];
    var data = new Date();
    var year = data.getFullYear();
    data.setMonth(data.getMonth() + 1, 1); //获取到当前月份,设置月份
    for (var i = 0; i < 12; i++) {
        data.setMonth(data.getMonth() - 1); //每次循环一次 月份值减1
        var m = data.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        dataArr.push(data.getFullYear() + "-" + m);
    }
    console.log(dataArr);
    return dataArr.reverse();
}