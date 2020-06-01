//节流
export function throttle(){

}
//防抖
// 需要执行的方法，延迟时间，是否第一次执行
export function debounce1(fn, delay, immediate){
    let timer = null;

    return function () {
        const context = this;
        const args = arguments;

        return new Promise((resolve, reject) => {
            timer && clearTimeout(timer);

            if (immediate) {
                const doNow = !timer;

                timer = setTimeout(() => {
                    timer = null;
                }, delay);

                doNow && resolve(fn.apply(context, args));
            }
            else {
                timer = setTimeout(() => {
                    console.log("防抖")
                    resolve(fn.apply(context, args));
                }, delay);
            }
        });
    };
}

export function debounce(fn, delay) {
    let timer = null;

    return function () {
        const context = this;
        const args = arguments;

        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}