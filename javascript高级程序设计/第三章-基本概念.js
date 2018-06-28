/*
语法
ECMAScript的语法大量借鉴了C及其他类C语言的语法

严格区分大小写
标识符
第一个字符必须是一个字母、下划线或一个美元符号
其他字符可以是字母、下划线、美元符号或数字

数据类型
undefined 只有一个值就是undefined。在使用变量但未对其加以初始化时，
这个变量的值就是undefined

null 从逻辑角度来看，null值表示一个空对象指针，这也是typeof操作符
检测null时会返回Object的原因，如果定义的变量将用于保存对象，那么最好
将该变量初始化为null而不是其他值

boolean
number
string
object
*/
var arr = ['1', '2', '3']
var obj = {
    a: 'bbb'
}
var func = function () {
}
// typeof 操作符
console.log(typeof undefined) // undefined
console.log(typeof null) // object
console.log(typeof true) // boolean
console.log(typeof 0) // number
console.log(typeof 'aaa') // string
console.log(typeof arr) // object
console.log(typeof obj) // object
console.log(typeof func) // function
console.log('____________________________')

/*
* 很明显typeof不能判断 null array object
* 常用判断方法
* */
function type(any) {
    return Object.prototype.toString.call(any).slice(8, -1).toLocaleLowerCase()
}
console.log(type(undefined)) // undefined
console.log(type(null)) // null
console.log(type(true)) // boolean
console.log(type(0)) // number
console.log(type('aaa')) // string
console.log(type(arr)) // array
console.log(type(obj)) // object
console.log(type(func)) // function

/*
* 这样就可以详细判断出他们了
* */

// object
/*
* object的属性和方法
* construct:保存着用于创建当前对象的函数
* hasOwnProperty(propertyName):用于检查给定属性在当前对象实例中（而不是
* 在实例的原型中）是否存在。其中作为参数的属性名（propertyName）必须以字
* 符串形式指定
* isPrototypeOf(object):用于检查传入的对象是否是传入对象的原型
* propertyIsEnumerable(propertyName):用于检查给定的属性是否能够使用for-in
* 语句来枚举
* toLocaleString(): 返回对象字符串表示，改字符串与执行环境的地区对应
* toString() 返回对象字符串表示
* valueOf():返回对象字符串、数值或布尔表示。通常与toString()方法的返回值相同
*
* */


