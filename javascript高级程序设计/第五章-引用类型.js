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

var values2 = [2,1,6,4,3,5]
console.log(values2.sort(function(x,y){
    return x-y
}))

// 操作方法
// (合并)
var colors5 = ['red','green','blue']
var colors6 = colors.concat('yellow',['black','brown'])
console.log(colors5) //["red", "green", "blue"]
console.log(colors6) //["green", "yellow", "black", "brown"]

// slice(基于当前数组的一项或多项创建一个新数组)
console.log(colors6.slice(0,2)) //["green", "yellow"]

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
var values3 = [1,2,3,4]
var sum = values3.reduce(function(prev,cur){
    return prev+cur
})
console.log(sum) //10

// Date 类型

// Date 比较大小
/*
* Data 的 toString() 和 valueOf() 不同浏览器返回不同
* Data类型的valueOf()方法不返回字符串，而是返回日期的毫秒表示，
* 因此，可以方便比较日期值
* */

var date1 = new Date(2018,6,9)
var date2 = new Date(2018,6,10)

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






