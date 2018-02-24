/**
 * Created by HH_Girl on 2018/2/6.
 */
/*
 * 策略模式：将定义的一组算法封装，使其相互之间可以替换。封装的算法
 * 具有一定独立，不会随客户端变化而变化。
 * */
//表单正则验证策略对象
var InputStrategy = function () {
    //内部算法对象
    var stragtegy = {
        //是否空
        notNull: function (value) {
            return /\s+/.test(value) ? '请输入内容' : '';
        },
        //是否是一个数字
        number: function (value) {
            return /^[0-9]+(\.[0-9]+)?$/.test(value) ? '' : '请输入数字';
        },
        //是否是本地电话
        phone: function (value) {
            return /^\d{3}-\d{8}$|^\d{4}-\d{7}$/.test(value) ? '' : '请输入正确的电话号码格式'
        }
    };
    return {
        //验证接口 type 算法 value 表单值
        check: function (type, value) {
            //去除首尾空格
            value = value.replace(/^\s+|\s+$/g, '');
            return stragtegy[type] ? stragtegy[type](value) : '没有改类型的检测方法';
        },
        //添加策略
        addStrategy: function (type, fn) {
            stragtegy[type] = fn;
        }
    }
};