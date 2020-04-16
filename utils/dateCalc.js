
//根据给定年份计算月时间段列表：
export function countMonthList(begin,end) {
    let beginMon = begin.split("/")[0] * 12 + begin.split("/")[1]*1
        , endMon = end.split("/")[0] * 12 + end.split("/")[1]*1
        , mons = endMon - beginMon
        , arr = [begin]
        , beginOut = begin

    for( let i = 0;i<mons;i++){
        if ((beginOut.split("/")[1] * 1 + 1)*1 > 12){
            beginOut = parseInt(beginOut.split("/")[0]*1+1) + "/" + "01"
        }else{
            beginOut = beginOut.split("/")[0] + "/" + parseInt(beginOut.split("/")[1] * 1 + 1 ) 
        }
        arr.push(beginOut)
    }
    return arr
}