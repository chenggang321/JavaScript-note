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
function addTen(num) {
    num += 10;
    return num
}

var count = 20;
var result = addTen(count);
// 没有改变外部的count

console.log(count, result)//20 30

// 引用类型的值
function setName(obj) {
    obj.name = 'testName'
}

var person = {}
setName(person)
console.log(person.name) // testName
// 修改了外部的person

// 证明为按值传递
function setName2(obj) {
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

// 延长作用域链

/*
*  虽然执行环境的类型只有两种-全局和局部，但还是有其他方法来延长作用域链。
*  这么说是因为有些语句可以在作用域链的前端临时增加一个变量对象，该变量对
*  象会在代码执行后移除。有两种情况下会发生这种现象。
*
* try-catch 语句的catch块
* width语句
*
* 这两个语句都会在作用域链的前端添加一个变量对象。对width语句来说，会将指定
* 的对象添加到作用域链中。对catch语句来说，会创建一个新的变量对象，其中包含
* 的是被抛出的错误对象的声明
* */

// 没有块级作用域（es6后不是这样了）
/*
* javascript 没有块级作用域经常会导致理解上的困惑。在其他类C的语言中，由花括
* 号封闭的代码块都有自己的作用域，因而支持根据条件来定义变量
* */

if (true) {
    var color = 'blue';
}
console.log(color) // blue

// 很明显花括号没有自己的作用域
// es6
if (true) {
    let color2 = 'blue'
}
//console.log(color2) // Error color2 is not define

for (var i = 0; i < 10; i++) {
    console.log('for var')
}
console.log(i) //for 也没有自己的作用域

// es6
for (let j = 0; i < 10; j++) {
    console.log('for let')
}
//console.log(j) // Error j is not define

// 用let定义的变量在花括号内有自己的作用域,而var的没有

// 声明变量
/*
* 用var声明的变量会自动被添加到最近的环境中。在函数内部，最近的
* 环境就是函数的局部环境，如果初始化变量没有使用var声明，该变量
* 会自动被添加到全局环境
*
* 在编写javaScript代码的过程中，不申明而直接初始化变量是一个常见
* 的错误做法，因为这样可能会导致意外。在严格模式下未经声明的变量
* 会导致错误
* */

// 查询标识符
/*
* 在某个环境中为了读取或写入而引用一个标识符时，必须通过搜索来确定该
* 标识符实际代表什么。搜索过程从作用域链的前端开始，向上逐级查询与给
* 定名字匹配的标识符。如果在局部环境中找到了该标识符，搜索过程停止，
* 变量就绪。如果在局部标识符中没有找到该变量名，则继续沿作用域链向上
* 搜索。搜索过程将一直追溯到全局环境的变量对象。如果在全局变量环境中
* 也没有找到这个标识符，则意味着该变量尚未声明。
* */

var color3 = 'blue'

function getColor() {
    return color3
}

console.log(getColor()) //blue
// 局部环境中没有color3 的标识符，则在他的上级环境中寻找（也就是全局环境）
// 返回了全局环境中的color3

var color4 = 'blue'

function getColor2() {
    var color4 = 'red'
    return color4
}

console.log(getColor2()) // red
// 直接返回了局部环境的color4

/*
*  注意 变量查询也不是没有代价的。很明显，访问局部变量要比访问全局更快，因为
*  不用向上搜索作用域链。
* */

// 垃圾收集

/*
*  标记清除（最常用） （标记变量的不同状态，去除无用变量）
*  引用计数（计算变量引用次数，引用次数为0，清除该变量）
* */

// 管理内存
// 由于安全考虑浏览器可分配内存比桌面应用内存要少，为了性能，执行环境只保存
// 必要数据。一旦数据不在用就将值设为null(一般用于全局环境)