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

// 策略模式应用 减少大量判断语句
/*
*  例如 绩效考核的问题 绩效为A的人年终奖为工资的4倍
*                     绩效为B的人年终奖为工资的3倍
*                     绩效为C的人年终奖为工资的2倍
* */
// 一般的编码方式
var calculateBouns = function (salary,level) {
    if(level === 'A'){
        return salary * 4;
    }
    if(level === 'B'){
        return salary * 3;
    }
    if(level === 'C'){
        return salary * 2;
    }
}

// 这样写的缺点
// 1. 有大量的if语句
// 2. 函数不可扩展
// 3. 函数不能复用

// 使用策略模式重构
var performance = {
    /**
     * @return {number}
     */
    A:function(salary){
        return salary * 4;
    },
    /**
     * @return {number}
     */
    B:function(salary){
        return salary * 3
    },
    /**
     * @return {number}
     */
    C:function(salary){
        return salary * 2;
    }
};
var calculateBouns02 = function(level,salary){
    return performance[level](salary)
};



