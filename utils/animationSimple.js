/* 封装动画 */
const show = (that, param, opacity) => {
    let animation = wx.createAnimation({
        //持续时间800ms
        duration: 800,
        timingFunction: 'ease',
    });
    animation.opacity(opacity).step()
    //将param转换为key
    let json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
}
//滑动渐入渐出
const slideupshow = function(that, param, px, opacity) {
    let animation = wx.createAnimation({
        duration: 800,
        timingFunction: 'ease',
    });
    animation.translateY(px).opacity(opacity).step()
    //将param转换为key
    let json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
}
//向右滑动渐入渐出
const sliderightshow = function(that, param, px, opacity) {
    var animation = wx.createAnimation({
        duration: 800,
        timingFunction: 'ease',
    });
    animation.translateX(px).opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
}
module.exports = {
    show,
    slideupshow,
    sliderightshow
}
