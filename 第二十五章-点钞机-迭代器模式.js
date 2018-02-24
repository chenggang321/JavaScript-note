/**
 * Created by HH_Girl on 2018/2/8.
 */
/*
 * 迭代器模式：在不暴露对象内部结构的同时，可以循序的访问聚合对象内部的元素
 * */
//迭代器
var Iterator = function (item, container) {
    var container = container &&
            document.getElementById(container) || document,
        //获取元素
        items = container.getElementsByTagName(item),
        //获取元素长度
        length = items.length,
        //当前索引值，默认：0
        index = 0;
    //缓存原生数组splice方法
    var splice = [].splice;
    return {
        //获取第一个元素
        first: function () {
            index = 0;//校正当前索引
            return items[index];
        },
        //获取最后一个元素
        last: function () {
            index = length - 1;
            return items[index];
        },
        //获取前一个元素
        pre: function () {
            if (--index > 0) {
                return items[index];
            } else {
                index = 0;
                return null;//返回空
            }
        },
        //获取后一个元素
        next: function () {
            if (++index < length) {
                return items[index];
            } else {
                index = length - 1;
                return null;
            }
        },
        //获取某一个元素
        get: function (num) {
            //如果num大于等于0再正向获取，否则逆向获取
            index = num >= 0 ? num % length : num % length + length;
            //返回对应元素
            return items[index];
        },
        //对每一个元素执行某一个方法
        dealEach: function (fn) {
            //第二个参数开始为回调函数中的参数
            var args = splice.call(arguments, 1);
            //遍历元素
            for (var i = 0; i < length; i++) {
                //对元素执行回调函数
                fn.apply(items[i], args);
            }
        },
        //对某一个元素执行某一个方法
        dealItem: function (num, fn) {
            //对元素执行回调函数
            fn.apply(this.get(num), splice.call(arguments, 2));
        },
        //排他方式处理某一个元素
        exclusive: function (num, allFn, numFn) {
            //对所有元素执行回调函数
            this.dealEach(allFn);
            //如果num类型为数组
            if (Object.prototype.toString.call(num) === '[object Array]') {
                //遍历num数组
                for (var i = 0, len = num.length; i < len; i++) {
                    //分别处理数组中每一个元素
                    this.dealItem(num[i], numFn);
                }
            } else {
                //处理第num个元素
                this.dealItem(num, numFn);
            }
        }
    }
};

var html = `
    <ul id="container">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
    </ul>
`;

var div = document.createElement('div');
div.innerHTML = html;

document.body.appendChild(div);
var demo = new Iterator('li', 'container');
console.log(demo.first());
console.log(demo.pre());
console.log(demo.last());
console.log(demo.get(5));

//处理所有元素
demo.dealEach(function (text, color) {
    this.innerHTML = text;
    this.style.background = color;
}, 'text', 'pink');
//排他思想处理第3个与第4个元素
demo.exclusive([2, 3], function () {
    this.innerHTML = '被排除的';
    this.style.background = 'green';
}, function () {
    this.innerHTML = '选中的';
    this.style.background = 'red';
});
var eachArray = function (arr, fn) {
    var i = 0,
        len = arr.length;
    //遍历数组
    for (; i < len; i++) {
        //依次执行回调，注意回调函数中传入的参数第一个为索引，第二个为该索引对应的值
        if (fn.call(arr[i], i, arr[i]) === false) {
            break;
        }
    }
};
for (var arr = [], i = 0; i < 5; arr[i++] = i);
eachArray(arr, function (i, data) {
    console.log(i, data);
});
//对象迭代器
var eachObject = function (obj, fn) {
    //遍历对象的每一个属性
    for (var i in obj) {
        //一次执行回调，注意回调函数中传入的参数第一个参数，第二个为该属性对应的值
        if (fn.call(obj[i], i, obj[i]) === false) {
            break;
        }
    }
};

var obj = {
    a: 23,
    b: 56,
    c: 67
};

eachObject(obj,function(i,data){
   console.log(i,data);
});
var A={
    //所有用户共有
    common:{},
    //客户端数据
    client:{
        user:{
            userName:'夜雨清河',
            uid:'123'
        }
    },
    //服务器端数据
    server:{}
};
//同步变量迭代取值器
AGetter=function(key){
    //如果不存在A则返回未定义
    if(!A){
        return undefined;
    }
    var result=A;//获取同步变量A对象
    key=key.split('.');//解析属性层次序列
    //迭代同步变量A对象属性
    for(var i=0,len=key.length;i<len;i++){
        //如果i层属性存在对应的值则迭代该属性
        if(result[key[i]]!==undefined){
            result=result[key[i]];
        }else{//不存在则返回未定义
            return undefined;
        }
    }
    //返回获取结果
    return result;
};
//获取用户名数据
console.log(AGetter('client.user.userName'));
//获取本地语言数据
console.log(AGetter('server.lang.local'));
