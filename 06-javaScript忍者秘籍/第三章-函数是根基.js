/*
*  理解函数为什么如此重要
*  函数为什么第一型对象
*  浏览器如何调用函数
*  函数声明
*  参数赋值之谜
*  函数上下文
* */

// 函数的独到之处
// 函数是第一型对象
/*
*  它们可以通过字面量进行创建
*  它们可以赋值给变量，数组或其他对象属性
*  它们可以作为参数传递给函数
*  它们可以作为函数的返回值进行返回
*  它们可以拥有动态创建并赋值的属性
*
*  除了可以像其他类型一样使用外，函数还有一个特殊的功能，它们可以被调用
* */

// 浏览器的事件轮询
/*
*  javascript的职责是为浏览器中发生的各种事件建立事件的处理程序（handler）。这些事件
*  在触发时被放置在一个事件队列中，然后浏览器将调用已经为这些事件建立好的处理程序
*  （handler）。因为这些事件发生的时间和顺序都是不可预知的。所以事件处理函数的调用
*  也是异步的。以下类型的事件可能互相穿插发生
*
*  浏览器事件，如当一个页面完成加载或卸载的时候
*  网络事件，如响应ajax请求
*  用户事件，如鼠标单击、鼠标移动、或者按键
*  计时器事件、如超时或计时器触发
* */

// 回调的概念
/*
*  当我们定义一个函数稍后执行时，无论何时定义，在浏览器执行还是其他其他地方执行，这里
*  定义的就是所谓的回调。该术语源于：我们定义一个函数，以便其他一些代码在适当的时机回
*  头再调用它
* */

function useless(callback){
    return callback()
}

// 该函数虽然没什么用，但它帮助我们演示了将函数作为参数传递给另一个函数，并随后对该参数
// 进行调用的能力

var text = 'domo arigato'
assert(useless(function(){return text}) === text,
    'The useless function works!' + text)

// 使用比较器进行排序
var values = [2,4,1,3,5]
values.sort(function(value1,value2){
    return value2 -value1
})
console.log(values)

// 函数声明
/*
*  javascript 函数是使用函数字面量进行声明从而创建函数值的，就像使用数字字面量创建数字值
*  一样。记住，作为第一型对象，函数可以像其他值一样在语言中使用。
* */

// 测试
function isNimble(){ return true }
assert(typeof window.isNimble === 'function',
    'isNimble() defined')
assert(isNimble.name === 'isNimble',
    'isNimble() has a name')
var canFly = function(){ return true }
assert(typeof window.canFly === 'function',
    'canFly() defined')
assert(canFly.name === '',
    'canFly() has no name') // chrome name
window.isDeadly = function(){ return true }
assert(typeof  window.isDeadly === 'function',
    'isDeadly() defined')
function outer(){
    assert(typeof inner === 'function',
        'inner() in scope before declaration')
    function inner(){}
    assert(typeof inner === 'function',
        'inner() in scope after declaration')
    assert(window.inner === undefined,
        'inner() not in global scope')
}
outer()

assert(window.inner === undefined,
    'inner() still not in global scope')
window.wieldsSword = function swingsSword(){return true}
assert(window.wieldsSword.name === 'swingsSword',
    'wieldSword is real name is swigsSword')

// 作用域和函数
/*
*  在javascript 中，作用域是由function进行声明的，而不是代码块。声明的作用域
*  创建于代码块，但不是终结于代码块（其他语言是终结于代码块的）
* */

function outer2(){
    var a = 1
    function inner(){}
    var b = 2
    if(a === 1){
        var c = 3
    }
}
outer2()
// 测试代码块
assert(true,'some descriptive text')
assert(typeof  outer === 'function',
    'outer() is in scope')
assert(typeof inner === 'function',
    'inner() is in scope')
assert(typeof a === 'number',
    'a is in scope')
assert(typeof b === 'number',
    'b is in scope')
assert(typeof c === 'number',
    'b is in scope')

// 都是失败的

// 函数调用
/*
*  四种不同的方式进行函数调用
*  作为一个函数进行调用，是最简单的形式
*  作为一个方法进行调用，在对象上进行调用，支持面向对象编程
*  作为构造器进行调用，创建一个新对象
*  通过apply()或call()方法进行调用，这种方式很复杂，遇到的时候我们将会再讨论
* */
// 从参数到函数形参
/*
*  参数数量不对时，如果实际传递的参数数量大于函数声明的形参数量，超出的参数则不会分配给
*  形参名称，而如果声明的形参数量大于实际传递的参数数量，则没有对应参数的形参会赋值为
*  undefined
* */
// arguments 参数
// this 参数
/*
*  一个函数被调用时候，除了传入了函数的显式参数以外，名为this的隐式参数也被传入了函数
*  this参数引用了与该函数调用进行隐式关联的一个对象，被称之为函数上下文
* */

// 作为函数进行调用
// 作为方法进行调用
// 作为构造器进行调用





