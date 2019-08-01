/**
 * Created by HH_Girl on 2018/2/5.
 */
/*
 * 单例模式：又被称为单体模式，是只允许实例化一次的对象类。保证一个类仅有一个实例，
 * 并提供访问此实例的全局访问点。
 *
 * 作用：保证对象不被重复创建，以达到降低开销
 * */
//创建一个小小型代码库
var cg = {
    Util: {
        util_method1: function () {
        },
        util_method2: function () {
        }
        //...
    },
    Tool: {
        tool_method1: function () {
        },
        tool_method2: function () {
        }
        //...
    },
    Ajax: {
        get: function () {
        },
        post: function () {
        }
        //...
    },
    other: {
        //...
    }
};
//无法修改的静态变量
var Conf = (function () {
    //私有变量
    var conf = {
        MAX_NUM: 100,
        MIN_NUM: 1,
        COUNT: 1000
    };
    //返回取值器对象
    return {
        //取值器方法
        get: function (name) {
            return conf[name] ? conf[name] : null;
        }
    }
})();
var count = Conf.get('COUNT');
console.log(count);

//惰性单例
//惰性载入单例
var LazySingle=(function(){
    //单例实例引用
    var _instance=null;
    function Single(){
        //这里定义私有属性和方法
        return {
            publicMethod:function(){},
            publicProperty:'1.0'
        }
    }
    //获取单例对象接口
    return function(){
        //如果为创建单例将创建单例
        if(!_instance){
            _instance= Single();
        }
        //返回单例
        return _instance;
    }
})();
console.log(LazySingle().publicProperty);

const Singleton = function(){};
Singleton.getInstance = (function(){
    let instance = null;
    return function(){
        if(!instance){
            instance = new Singleton();
        }
        return instance;
    }
})();
let s1 = Singleton.getInstance();
let s2 = Singleton.getInstance();
console.log(s1 === s2);
