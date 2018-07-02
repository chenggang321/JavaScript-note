// object 类型
// 第一种创建方式
var person = new Object()
person.name = 'tom'
person.age = 29

// 第二种
var person2 = {
    name: 'tom',
    age: 29
}

// 读取
console.log(person2['name'])
console.log(person2.name)

// Array
// 创建
var color = new Array(3)
var color2 = ['red', 'blue', 'green']

// 检测数组 instanceof isArray()
console.log(color instanceof Array) // true
console.log(Array.isArray(color)) // true

// 转换方法
console.log(color2.toString()) // red,blue,green
console.log(color2.toLocaleString()) // red,blue,green
console.log(color2.valueOf()) //['red','blue','green']
console.log(color2) //['red','blue','green']

// toString 和 toLocaleString
var person3 = {
    toLocaleString: function () {
        return 'toLocaleString3'
    },
    toString: function () {
        return 'toString3'
    }
}

var person4 = {
    toLocaleString: function () {
        return 'toLocaleString4'
    },
    toString: function () {
        return 'toString4'
    }
}

var person5 = [person3, person4]
console.log(person5)
console.log(person5.toString()) //toString3,toString4
console.log(person5.toLocaleString()) //toLocaleString3,toLocaleString4
// 分别调用了数组元素的toString 和toLocaleString

// 栈方法（push() 和 pop()）
var colors = []
var count = colors.push('red', 'green')
console.log(count) // 2
count = colors.push('black')

var item = colors.pop()
console.log(item) // black
console.log(colors.length) // 2

// 队列方法（push() shift()）
var colors2 = []
var count2 = colors2.push('red', 'green')
console.log(count2)

count2 = colors2.push('black')
console.log(count2)

var item2 = colors.shift()
console.log(item2)

// 重排序方法
var values = [1, 2, 3, 4, 5]
console.log(values.reverse())

var values2 = [2, 1, 6, 4, 3, 5]
console.log(values2.sort(function (x, y) {
    return x - y
}))

// 操作方法
// (合并)
var colors5 = ['red', 'green', 'blue']
var colors6 = colors.concat('yellow', ['black', 'brown'])
console.log(colors5) //["red", "green", "blue"]
console.log(colors6) //["green", "yellow", "black", "brown"]

// slice(基于当前数组的一项或多项创建一个新数组)
console.log(colors6.slice(0, 2)) //["green", "yellow"]

// splice (删除 插入 替换)

// 位置方法（indexOf()和lastIndexOf()）

//迭代方法
/*
* every(): 对数组中的每一项运行给定函数，如果该函数每一项都返回true，则返回true
* filter(): 对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组
* forEach():对数组中的每一项运行给定函数，这个方法没有返回值
* map():对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组
* some():对数组中的每一项运行给定函数，如果该函数对任一项返回true，则返回true
* */

// 归并方法
/*
* reduce()
* reduceRight()
* */
var values3 = [1, 2, 3, 4]
var sum = values3.reduce(function (prev, cur) {
    return prev + cur
})
console.log(sum) //10

// Date 类型

// Date 比较大小
/*
* Data 的 toString() 和 valueOf() 不同浏览器返回不同
* Data类型的valueOf()方法不返回字符串，而是返回日期的毫秒表示，
* 因此，可以方便比较日期值
* */

var date1 = new Date(2018, 6, 9)
var date2 = new Date(2018, 6, 10)

console.log(date1 > date2) // false
console.log(date1 < date2) // true

// 这为比较日期提供了极大的方便

// 日期格式化方法
/*
* toDateString() 以特定于实现的格式显示星期几、月、日和年
* toTimeString()                    ...时、分、秒和时区
* toLocaleDateString() 以特定于地区的格式显示星期几、月、日和年
* toLocaleTimeString() 以特定于实现的格式显示时、分、秒
* toUTSString() 以特定实现的格式显示时、分、秒
* toLocaleString()和toString()方法一样不同浏览器显示不同不能使用
* */

// 日期、时间组件方法
// {Year Month（0-11） Date（1-31） Day(星期) Hours（0-23） Minutes（0-59） Seconds Milliseconds}
/*
* getTime() 返回日期的毫秒数；与valueOf()方法返回的值相同
* setTime(毫秒) 以毫秒设置日期，会改变整个日期
* getFullYear() 取得4位数的年份（2018而非仅07）
* getUTCFullYear
* ... 其他类似
* */

// RegExp

// 表达式 var expression = / pattern /flags(pattern 模式 正则表达式 flag 标志)
// g：global 全局模式 应用于所有字符串，而非匹配的第一项就停止
// i:表示不区分大小写
// m:表示多行模式

// RegExp 实例属性
/*
* global： 布尔值，表示是否设置了g标志
* ignoreCase: 布尔值，表示是否设置了i标志
* lastIndex:整数，表示开始搜索下一个匹配项的字符位置，从0算起
* multiline：布尔值，表示是否设置了m标志
* source：正则表达式的字符串表示
* */

//RegExp 实例方法
/*
* exec() 返回第一个匹配项的数组
* text() 返回布尔值
* */

// Function 类型
// 创建
/*
*  function sum (num1,num2){ return num1 + num2 } （函数声明式）
*  var sum = function (num1,num2){return num1 + num2} （函数表达式）
*  var sum = new Function("num1","num2","return num1 + num2")(不推荐)
*  函数是对象，函数名是指针
* */

function sum2(num1, num2) {
    return num1 + num2
}

console.log(sum2(10, 10)) //20

var autoHerSum = sum2
console.log(autoHerSum(10, 10)) //20

sum2 = null
console.log(autoHerSum(10, 10)) // 20
// 函数名是指针

/*
* 也可以同时使用函数声明和函数表达式 var sum = function sum() {}
* */

// 作为值的函数
function callSomeFunction(someFunction, someArgument) {
    return someFunction(someArgument)
}

function add10(num) {
    return num + 10
}

var result = callSomeFunction(add10, 10)
console.log(result) // 20

function getGreeting(name) {
    return "Hello," + name
}

var result2 = callSomeFunction(getGreeting, 'Nicholas')
console.log(result2) // Hello,Nicholas

// 从一个函数内返回另一个函数
function createComparisonFunction(propertyName) {
    return function (object1, object2) {
        var value1 = object1[propertyName]
        var value2 = object2[propertyName]

        if (value1 < value2) {
            return -1
        } else if (value1 > value2) {
            return 1
        } else {
            return 0
        }
    }
}

function CreateObject(name, age) {
    this.name = name
    this.age = age
}

CreateObject.prototype.toString = function () {
    return `{name:${this.name},age:${this.age}}`
}
var object1 = new CreateObject('Zachary', 28)
var object2 = new CreateObject('Nicholas', 29)
var data = [object1, object2]

data.sort(createComparisonFunction('name'))
console.log(data.toString())
data.sort(createComparisonFunction('age'))
console.log(data.toString())

// 函数内部属性
/*
* 函数内部，有两个特殊的对象：arguments 和 this。
* arguments(类数组对象)：保存函数参数
* 该对象还有一个名叫callee的属性，改属性是一个指针，指向拥有这个arguments
* 对象的函数
* this:函数执行的环境对象
* */
// arguments.callee
// 经典的阶乘函数
function factorial(num) {
    if (num <= 1) {
        return 1
    } else {
        return num * factorial(num - 1)
    }
}

console.log(factorial(10))

// 这样写有点不好 就是函数名和函数体耦合在了一起
function factorial2(num) {
    if (num <= 1) {
        return 1
    } else {
        return num * arguments.callee(num - 1)
    }
}

console.log(factorial2(10))
// 将函数名解耦

// this
var color5 = 'red'
var o = {
    color5: 'blue'
}

function sayColor() {
    console.log(this.color5)
}

sayColor() // red
o.sayColor = sayColor
o.sayColor() // blue

/*
* 注意：函数名仅仅是一个包含指针的变量而已。因此，即使是在不同的
* 环境中执行，全局的sayColor与o.sayColor指向的仍然是同一个函数
* */

// 函数属性和方法
/*
* length:表示函数希望接收的命名参数的个数
* prototype
* prototype上的属性是不可被枚举的（for-in-无法发现）
* */

// call 与 apply

function sum4(num1, num2) {
    return num1 + num2
}

// apply
function callSum1(num1, num2) {
    return sum4.apply(this, arguments) // arguments（类数组）
}

function callSum2(num1, num2) {
    return sum4.apply(this, [num1, num2]) // 数组
}

console.log(callSum1(10, 10)) // 20
console.log(callSum2(10, 10)) // 20

// call
function callSum3(num1, num2) {
    return sum4.call(this, num1, num2)
}

console.log(callSum3(10, 10)) // 20

// call 和 apply作用一样，只是参数的形式不一样

// 基本的包装类型，特殊的引用类型（Boolean、Number、String）
var s1 = 'some text';
var s2 = s1.substring(2);
console.log(s1, s2)

// 想象成
var s3 = new String('some text')
var s4 = s1.substring(2)
s3 = null
console.log(s3, s4)
// 引用类型和基本包装类型的主要区别就是对象的生存期。使用new操作符创建
// 的引用类型的实例，在执行流离开当前作用域之前一直都保存在内存中。而自
// 动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即销
// 毁。这意味着我们不能在运行时为基本类型值添加属性和方法 eg
var s5 = 'some text';
s5.color = 'red'
console.log(s5.color) //undefined

// Object 构造函数也会像工厂方法一样，根据传入值的类型放回相应基本包装实例
var obj = new Object('some text')
console.log(obj instanceof String) // true

// Boolean 类型
/*
* Boolean 类型与布尔值对应的引用类型。要创建Boolean对象，就可以像下面这样
* 调用Boolean构造函数并传入true或false
* */

var BooleanObject = new Boolean(true)
var falseObject = new Boolean(false)
console.log(falseObject)//boolean对象 Boolean {false}
var result = falseObject && true // 对象会转换为true
console.log(result) // true

var falseValue = false
result = falseValue && true
console.log(result) // false
// Boolean对象容易造成误解
// 理解基本类型的布尔值和Boolean对象的区别非常重要，建议永远不要使用Boolean对象

// Number类型
/*
* Number是与数字值对应的引用类型。要创建Number对象，可以在调用Number构造函数时向
* 中传递对应的数值
* 与Boolean类型一样，Number类型也重写了valueOf()、toLocaleString()和toString()
* 重写后的valueOf()方法返回对象表示基本类型的数值，另外两个方法返回字符串形式的
* 数值
* */
// Number 的方法
/*
* toFixed() 指定的小数返回数值的字符串表示
* toExponent() 返回指数表示法（e表示法）
* toPrecision() 参数表示数值的所有数字的位数（不包括指数部分）
* */

// String类型
/*
* String类型是字符串对象的包装类型
* */
// 字符串方法
/*
* charAt() 以单字符字符串的形式放回给定位置的那个字符 可以用str[1]
* 代替
* charCodeAt() 以单字符字符串的形式放回给定位置的那个字符的字符编码
* */

// 字符串操作方法
/*
* concat 拼接字符串可用+代替
* slice()
* substr()
* substring()
* 效果类似参数不同
* slice substring 第一第二各参数分别表示起始和结束位置
* substr 第二各参数表示返回的字符个数
* slice substr substring 都不会改变原字符串
* */
// 字符串位置方法
/*
* indexOf(从开头向结尾搜索放回-1或字符位置)
* lastIndexOf（从结尾向开头搜索返回-1或字符位置）
* 第二各参数可以表示从哪个位置搜索
* */

// trim() 创建字符串副本，删除前后所有空格

// 大小写转换
/*
* toLowerCase() 转小写
* toLocaleLowerCase() 根据本地语言转小写
* toUpperCase() 转大写
* toLocaleUpperCase() 根据本地语言转大写
* */

// 字符串的模式匹配方法
/*
* match() 返回数组 与调用RegExp对象的exec()方法并传递本例中的字符串
* 作为参数的到的结果一样
* search() 返回字符串中的第一个匹配项的索引；如果没有找到匹配项则返回
* -1否则返回位置，search方法始终是从字符串的开头向后查找
* replace() 替换 根据正则表达式替换字符串，如果要全局替换要在正则表达式
* 中加入g标志
*
* . 在[.]中匹配.字符即\.在此之外匹配所有元素
* */
// 特殊字符序列
/*
* $$  $
* $&  匹配整个模式的子字符串。与RegExp.lastMatch的值相同
* $'  匹配的子字符串之前的子字符串。与RegExp.leftContext的值相同
* $`  匹配的子字符串之后的子字符串。RegExp.rightContext的值相同
* $n  匹配第n个捕获的子字符串，其中n等于0-9。如果正则表达式中没有
* 定义捕获组，则使用空字符串
* $nn 匹配第nn个捕获的子字符串，其中n等于01-99。
* */

var text = 'cat,bat,sat,fat'
result = text.replace(/(.at)/g, 'word($`)')
console.log(result)

// replace 可以通过第二各参数进行更精细的操作
function htmlEscape(text) {
    return text.replace(/[<>"&]/g, function (match, pos, originalText) {
        switch (match) {
            case "<":
                return "&lt"
            case ">":
                return "&gt"
            case "&":
                return "&amp"
            case "\"":
                return "&quot"
        }
    })
}

console.log(htmlEscape('<p class="greeting">hello world!</p>'))
// &ltp class=&quotgreeting&quot&gthello world!&lt/p&gt

// split() 基于指定分隔符将一个字符串分割成多个子字符串，并将结果
// 放到一个数组中 ，可接受第二个参数指定数组的大小

var colorText = "red,blue,green,yellow"
console.log(colorText.split(',')) // ["red","blue","green","yellow"]
console.log(colorText.split(',', 2)) // ["red","blue"]
console.log(colorText.split(/[^\,]+/)) // ["", ",", ",", ",", ""]

// localeCompare() 方法 比较两个字符串返回下列值中的一个
/*
* 如果子字符串在字母表中应该排在子字符串之前，则返回一个负数（大多数情况
* 是-1，具体值要视情况而定）
* 如果子字符串等于子字符串，则返回0
* 如果字符创在字母表中应该排在子字符串之后，则返回一个正数（大多数情况是
* 1，具体视情况而定）
* */
var stringValue = 'yellow'
console.log(stringValue.localeCompare('brick')) // 1
console.log(stringValue.localeCompare('yellow')) // 0
console.log(stringValue.localeCompare('zoo')) //-1

// fromCharCode() //接收一或多个字符编码，然后将他们换成一个字符串。从本质
// 上看这个方法与charCodeAt()执行的是相反的操作

// Global对象
// URL编码方法
/*
* encodeURL()  主要用于整个url
* encodeURLComponent() 对url中的一部分进行转码
* 将url转换为浏览器可识别的字符串
*
* 一般来说，我们使用encodeURLComponent()方法要比使用encodeURL要多，因为常见
* 是处理url的一部分
*
* 相对的
* decodeURL() 和decodeURLComponent() 是对上面的两种方法进行解码
* */
// eval()
/*
* 能够解释代码字符串的能力非常强大，但也非常危险。因此使用eval()时必须极为谨慎，
* 特别是在用他执行用户输入数据的情况下。否则可能会有恶意用户输入威胁你的站点或
* 应用程序安全的代码（即所谓的代码注入）
* */

// Math 对象
/*
* Math.E         自然对数的底数
* Math.LN10      10的自然对数
* Math.LN2       2的自然对数
* Math.LOG2E     以2为底e的对数
* Math.LOG10E    以10为底e的对数
* Math.PI        PI的值
* Math.SQRT1_2   1/2的平方根
* Math.SQRT2     2的平方根
* */
// 最大值与最小值
// min() 和 max() 方法

// 舍入方法
/*
* Math.ceil() 向上舍入  25.9 -> 26 25.5-> 26 25.1 ->26
* Math.floor() 向下舍入 25.9 -> 25 25.5 ->25 25.1 ->25
* Math,round() 四舍五入
* */

// random() 方法 返回[0,1)之间的值

// 取[min,max]之间的值
function selectFrom(min, max) {
    var choices = max - min + 1;
    return Math.floor(Math.random() * choices + min)
}

console.log(selectFrom(2, 10))// [2,10]

// 其他方法
/*
* Math.abs(num)  绝对值
* Math.exp(num)  Math.E的num次幂
* Math.log(num)  num的自然对数
* Math.log(num,power) num 的power次幂
* math.sqrt(num) num的平方根
* Math.acos(x)  x的反余弦值
* Math.asin(x)  x的反正弦
* Math.atan(x)  x的反正切
* Math.atan2(y,x)  y/x的反正切
* Math.cos(x)  x的余弦
* Math.sin(x)  x的正弦
* Math.tan(x)  x的正切
* */








