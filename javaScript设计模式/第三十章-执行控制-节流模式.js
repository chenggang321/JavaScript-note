/**
 * Created by HH_Girl on 2018/2/22.
 */
/*
 *节流模式：对重复的业务逻辑进行节流控制，执行最后一次操作并取消其他操作，以提高性能
 * */
var extend = function (target, source) {
    //遍历原对象中的属性
    for (var property in source) {
        target[property] = source[property];
    }
    //返回目标对象
    return target;
};
/*
 * 构造节流器的思路：第一清除将要执行的函数，第二延迟执行函数
 * 节流器传递两个参数（是否清除，执行函数）
 * 第一个参数为true,则表示清除将要执行的函数。
 * 同时会判断第二个参数（执行函数）有没有计时器句柄，
 * 有则清除计时器。
 * */
//节流器
var throttle = function () {
    //获取第一个参数
    var isClear = arguments[0], fn, param;
    //如果第一个参数是boolean类型那么第一个参数则表示是否清除计数器
    if (typeof isClear === 'boolean') {
        //第二个参数则为函数
        fn = arguments[1];
        //函数的记时器句柄存在，清除该计时器
        fn.__throttleID && clearTimeout(fn.__throttleID);
        //通过计时器延迟函数执行
    } else {
        //第一个参数为函数
        fn = isClear;
        //第二个参数为函数执行时的参数
        param = arguments[1];
        //对执行时的参数适配默认值
        var p = extend({
            context: null,//执行函数执行时的作用域
            args: [],//执行函数执行时的相关参数（IE下要为数组）
            time: 300//执行函数延迟执行时间
        }, param);
        //清除执行函数记时句柄
        arguments.callee(true, fn);
        //为函数绑定计时器句柄，延迟执行函数
        fn.__throttleID = setTimeout(function () {
            //执行函数
            fn.apply(p.context, p.args)
        }, p.time)
    }
};
var div = document.createElement('div');
div.style.height = '1500px';
document.body.appendChild(div);

function saySucc() {
    console.log('success');
}
window.addEventListener('scroll', function () {
    throttle(saySucc);
});