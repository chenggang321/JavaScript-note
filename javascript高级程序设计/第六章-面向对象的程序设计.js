//ECMA-262把对象定义为：无序属性的集合，其属性可以包含基本值、对象或函数

// 创建

var person = {
    name: "Nicholas",
    age: 29,
    _year: 2018,
    job: 'Software Engineer',
    sayName: function () {
        console.log(this.name)
    }
}

// 属性类型
/*
* configurable:能否通过delete删除属性从而重新定义属性，能否修改属性的特性
* 或者能否把属性修改为访问属性。默认值为：true
* enumerable:表示能否通过for-in循环返回属性。默认值为：true
* writable: 能否修改属性的值。默认值为：false
* value:包含这个属性的数据值。默认值为：undefined
* */

// 要修改这些属性默认的特性必须使用Object.defineProperty() eg
Object.defineProperty(person, 'nick', {
    configurable: false,
    value: 'Nicholas'
})
console.log(person)

// 访问属性
/*
* get:读取属性时调用的函数 默认值为：undefined
* set:写入属性时调用的函数 默认值为：undefined eg
* */
Object.defineProperty(person, 'year', {
    enumerable: true,
    configurable: true,
    get: function () {
        console.log('get year')
        return this._year
    },
    set: function (newValue) {
        this.year = newValue
        console.log('set year')
    }
})
console.log(person)

// 注意可以只写get但是写入属性会被忽略严格模式下会报错
// 也可以通过Object.defineProperties()同时定义多个属性

// 工厂模式
function createPerson(name, age, job) {
    var o = {};
    o.name = name;
    o.age = age;
    o.sayName = function () {
        console.log(this.name)
    }
    return o
}

// 构造函数模式
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
        console.log(this.name)
    }
}

// 构造函数也可以当做函数

// 原型模式
// 理解原型对象
/*
* 无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个
* prototype属性，这个属性指向函数的原型对象。在默认情况下所有原型对象都会自动
* 获得一个constructor(构造函数)属性，指向构造函数的原型对象
*
* */
function Person2(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
}

Person2.prototype = {
    nick:'prototype',
    sayName: function () {
        console.log(this.name)
    }
}
var person2 = new Person2('aaa', 'bbb', 'ccc')
var person3 = new Person2('eee','fff','ggg')
person3.nick = 'person3'
console.log(Person2.prototype.constructor === Person2) // true
console.log(person2.constructor === Person2) // true

console.log(Person2.prototype.isPrototypeOf(person2)) // true
console.log(person2)
console.log(person2.nick) // 来自原型
console.log(person3.nick) // 来自实例，原型的被覆盖了
// hasOwnProperty() 检测属性是否在实例中（判断属性在实例中还是原型中）
// 是否为原型属性
function hasPrototypeProperty(obj,name){
    return !obj.hasOwnProperty(name) && (name in obj)
}
// for-in 不能访问原型上的属性

// 原型的动态性
function Person3(){}
var friend = new Person3()
Person3.prototype = {
    constructor:Person3,
    name:'aaa',
    age:29,
    sayName:function(){
        return this.name
    }
}
// friend.sayName() // err

// 原生对象的原型

/*
* 尽管可以修改原生对象的原型，但容易造成命名冲突，也可能意外的重写原生方法，
* 不推荐这样做
* */

/*
* 原型模式的缺点：容易修改共用方法，从而修改了所有实例的方法
* */

// 组合使用构造函数与原型模式 可取长补短

// 动态原型模式
function Person4(){
    this.name = name;
    this.age = age;
    this.job = job;
    if (typeof this.sayName !== "function"){
        Person.prototype.sayName = function(){
            console.log(this.name);
        };
    }
}
/*
* 注意使用动态原型模式，不能用动向字面量重写原型。容易造成新原型切断
* 与原原型的联系
* */




