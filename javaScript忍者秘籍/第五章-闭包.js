/*
*  闭包是什么，他们是如何工作的
*  利用闭包简化开发
*  利用闭包提高性能
*  利用闭包解决常见的作用域问题
* */

// 闭包是如何工作的
/*
*  简单的说，闭包是一个函数在创建时允许该自身函数访问并操作该自身函数之外的变量时所创建的作用
*  域
* */
// 不那么简单的闭包
var outerValue = 'ninja'
var later
function outerFunction(){
    var innerValue = 'samurai'
    function innerFunction(paramValue){
        assert(outerValue,'Inner can see the ninja.')
        assert(innerValue,'Inner can see the samurai.')
        assert(paramValue,'Inner can see the wakizashi.')
        assert(tooLate,'Inner can see the ronin.')
    }
    later = innerFunction
}
assert(!tooLate,'Outer can not see the ronin')
var tooLate = 'ronin'
outerFunction()
later('wakizashi')

// 闭包可以访问到什么内容
/*
*  内部函数的参数是包含在闭包中的
*  作用域之外的所有变量。即便是函数声明之后的那些声明，也都包含在闭包中
*  相同的作用域内，尚未声明的变量不能进行提前引用
* */

// 使用闭包
function Test(){
    var feints = 0
    this.getFeint = function(){
        return feints
    }
    this.feint = function(){
        feints++
    }
}
var test = new Test()
test.feint()
assert(test.getFeint() === 1,
    'We are able to access the internal feint count.')
assert(test.feints === undefined,
    'And the private data is inaccessible')

// 回调与计时器
/*var div = document.createElement('div')
div.id='box'
div.style = 'width:300px;height:300px;background:lightblue;position:absolute'
document.body.appendChild(div)
function animateIt(elementId){
    var elem = document.getElementById(elementId)
    var tick = 0
    var timer = setInterval(function(){
        if(tick < 300){
            elem.style.left = elem.style.top = tick + 'px'
            tick++
        }else{
            clearInterval(timer);
            assert(tick === 300,
                'Tick accessed via a closure')
            assert(timer,
                'Timer reference also obtained via a closure')
        }
    },10)
}
animateIt('box')*/

// 绑定函数上下文
// 偏应用函数
// 一个更复杂的分部函数
Function.prototype.partial = function(){
    var fn = this,
        args = Array.prototype.slice.call(arguments)
    return function(){
        var arg = 0
        for(var i=0;i<args.length && arg < arguments.length;i++){
            if(args[i] === undefined){
                args[i] = arguments[arg++]
            }
        }
        return fn.apply(this,args)
    }
}
// 在原生函数上进行分部参数应用
String.prototype.csv = String.prototype.split.partial(/,\s*/)
var results = ('Mugan,Jin,Fuu').csv()
assert(results[0] === 'Mugan' &&
        results[1] === 'Jin' &&
        results[2] === 'Fuu',
    'The text values were split properly')

// 函数重载
// 缓存记忆
// 不使用闭包
Function.prototype.memoized = function(key){
    this._values = this._values || {}
    return this._values[key] !== undefined ?
        this._values[key]:
        this._values[key] = this.apply(this,arguments)
}
function isPrime(num){
    var prime = num !== 1;
    for(var i = 2;i<num;i++){
        if(num%i===0){
            prime = false
            break
        }
    }
    return prime
}
assert(isPrime.memoized(5),
    'The function works;5 is prime')
assert(isPrime._values[5],
    'The answer has been cached')

// 函数包装
function wrap(object,method,wrappers){
    var fn = object[method]
    return object[method] = function(){
        return wrappers.apply(this,[fn.bind(this)].concat(
            Array.prototype.slice.call(arguments)
        ))
    }
}

// 即时函数





