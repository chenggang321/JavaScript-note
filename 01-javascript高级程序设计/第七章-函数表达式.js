// 定义函数
// 定义函数的方法：函数声明 、函数表达式
/*
function functionName(){
    // 函数体
}
var functionName2 = function(){
    // 函数体
}*/
/*
* 函数声明提升（执行代码前会先读取函数声明）
* 函数表达式不会出现提升
* */

// 递归
// arguments.callee 指向正在执行的函数的指针
// 求阶乘
function factorial(num) {
    if (num <= 1) {
        return 1
    } else {
        return num * arguments.callee(num - 1)
    }
}

// 严格模式下不能访问arguments.callee 从而出错
var factorial2 = (function f(num) {
    if (num <= 1) {
        return 1
    } else {
        return num * f(num - 1)
    }
})

// 闭包
/*
* 有权访问另一个函数作用域中的变量函数
* 由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存。
* 过度使用闭包会导致内存占用过多
* */

// 闭包与变量
function createFunctions() {
    var result = []
    for (var i = 0; i < 10; i++) {
        result[i] = function () {
            return i
        }()
    }
    return result
}

console.log(createFunctions())

function createFunctions2() {
    var result = new Array();
    for (var i = 0; i < 10; i++) {
        result[i] = function (num) {
            return function () {
                return num;
            }();
        }(i);
    }
    return result;
}

console.log(createFunctions2())

// 关于this对象
// 在闭包中使用this对象也可能会导致一些问题。this对象是在运行时基于函数的执行
// 环境绑定的：在全局函数中，this等于window，而当函数被作为某个对象的方法调用
// 时，this等于那个对象。不过匿名函数的执行环境具有全局性，因此其this对象通常
// 指向window
/*
* 笔记：匿名函数的this指向window
* */
var name = 'window'

var object = {
    name: 'object',
    getNameFunc: function () {
        return (function () {
            return this.name
        })()
    }
}
console.log(object.getNameFunc()) // window
var object2 = {
    name: 'object',
    getNameFunc: function () {
        var that = this
        return (function () {
            return that.name
        })()
    }
}
console.log(object2.getNameFunc()) // object

// 内存泄露（ie9以下dom和js采用不同的垃圾回收机制造成内存泄露）

// 模仿块级作用域
/*(function(){
    // 块级作用域
})()*/

// 私有变量 私有函数 特权方法
function MyObject() {
    //私有变量和私有函数
    var privateVariable = 10;

    function privateFunction() {
        return false
    }

    // 特权方法
    this.publicMethod = function () {
        privateVariable++
        return privateFunction()
    }
}

// 静态私有变量
(function () {
    //私有变量和私有函数
    var privateVariable = 10;

    function privateFunction() {
        return false
    }

    // 构造函数
    var MyObject2 = function () {
    }

    // 公有特权方法
    MyObject2.prototype.publicMethod = function () {
        privateVariable++
        return privateFunction()
    }
})()
/*
* 多查找作用域链中的一个层次，就会在一定程度上影响查找速度。这正是使用闭包
* 和私有变量的一个明显不足之处
* */

// 模块模式
var singleton = function () {
    // 私有变量和私有函数
    var privateVariable = 10

    function privateFunction() {
        return false
    }

    //特权/公有方法和属性
    return {
        publicProperty: true,
        publicMethod: function () {
            privateVariable++
            return privateFunction()
        }
    }
}()
console.log(singleton.publicMethod()) // false

//增强的模块模式
var singleton2 = function () {
    // 私有变量和私有函数
    var privateVariable = 10

    function privateFunction() {
        return false
    }

    // 创建对象
    var object = {}
    //添加特权/公有方法和属性
    object.publicProperty = true;
    object.publicMethod = function () {
        privateVariable++
        return privateFunction()
    }
    // 返回这个对象
    return object
}()
console.log(singleton2.publicMethod()) // false

