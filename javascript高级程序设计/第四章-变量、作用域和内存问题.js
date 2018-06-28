// 基本类型和引用类型的值
/*
* 基本类型值：简单的数据段（undefined null Boolean number String）
* 引用类型值：由多个值构成的对象（object array function）
* 引用类型的值是保存在内存中的对象。与其他语言不同，javascript不容许
* 直接访问内存中的位置，也就是说不能直接操作对象的内存空间。在操作对象
* 时，实际上是在操作对象的引用而不是实际的对象。为此，引用类型的值是
* 按引用访问的。
* */

// 复制变量的值

/*
* 复制基本类型的值是相互独立的互不影响
* 复制引用类型的值实际上是复制一个指针，复制结束后，实际上是引用的
* 同一个对象。因此改变其中一个变量就会影响另一个变量
* */

// 传递参数

/*
* 所有函数的参数都是按值传递的。也就是说，把函数外部的值复制给函数
* 内部的参数，就和把值从一个变量复制到另一个变量一样。基本类型值的
* 传递如同基本类型变量的复制一样，而引用类型也是一样
* */

// 基本类型的值
function addTen(num){
    num += 10;
    return num
}

var count = 20;
var result = addTen(count);
// 没有改变外部的count

console.log(count,result)//20 30

// 引用类型的值
function setName(obj){
    obj.name = 'testName'
}

var person = {}
setName(person)
console.log(person.name) // testName
// 修改了外部的person

// 证明为按值传递
function setName2(obj){
    obj.name = 'testName'
    obj = {}
    obj.name = 'changeName'
}

var person2 = {}
setName2(person2)
console.log(person2.name) // testName

// 检测类型
/*
*基本类型 typeof （undefined string boolean）
*引用类型 可以根据原型链或调用对象的toString()方法来判断
* */

var s = "Nicholas";
var b = true;
var i = 22;
var u;
var a = ['a']
var n = null;
var o = {};

// typeof
console.log(typeof s); //string
console.log(typeof i); //number
console.log(typeof b); //boolean
console.log(typeof u); //undefined
console.log(typeof a); //object
console.log(typeof n); //object
console.log(typeof o); //object

// instanceof
console.log(a instanceof Array) // true
console.log(a instanceof Object) // true

// 执行环境及作用域
/*
* 执行环境（execution context，简称环境）
* 执行环境定义了变量或函数有权访问的其他数据，决定了他们
* 各自的行为。每个执行环境都有一个与之关联的变量对象，环
* 境中定义的所有变量和函数都保存在这个对象中。但我们不能
* 访问它，解析器会在后台调用它
* */