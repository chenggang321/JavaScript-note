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
/*
* new 操作符的4个步骤
* 1. 创建一个新对象
* 2. 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）
* 3. 执行构造函数中的代码（为这个函数添加属性）
* 4. 返回新对象
* */

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
    nick: 'prototype',
    sayName: function () {
        console.log(this.name)
    }
}
var person2 = new Person2('aaa', 'bbb', 'ccc')
var person3 = new Person2('eee', 'fff', 'ggg')
person3.nick = 'person3'
console.log(Person2.prototype.constructor === Person2) // true
console.log(person2.constructor === Person2) // true

console.log(Person2.prototype.isPrototypeOf(person2)) // true
console.log(person2)
console.log(person2.nick) // 来自原型
console.log(person3.nick) // 来自实例，原型的被覆盖了
// hasOwnProperty() 检测属性是否在实例中（判断属性在实例中还是原型中）
// 是否为原型属性
function hasPrototypeProperty(obj, name) {
    return !obj.hasOwnProperty(name) && (name in obj)
}

// for-in 不能访问原型上的属性

// 原型的动态性
function Person3() {
}

var friend = new Person3()
Person3.prototype = {
    constructor: Person3,
    name: 'aaa',
    age: 29,
    sayName: function () {
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
function Person4() {
    this.name = name;
    this.age = age;
    this.job = job;
    if (typeof this.sayName !== "function") {
        Person.prototype.sayName = function () {
            console.log(this.name);
        };
    }
}

/*
* 注意使用动态原型模式，不能用动向字面量重写原型。容易造成新原型切断
* 与原原型的联系
* */

// 寄生构造函数模式
/*
* 这种模式的基本思想是创建一个函数，该函数的作用仅仅是封装创建对象的代码，
* 然后返回新创建的对象，但从表面上看，这个函数又像是典型的构造函数
* */
function Person5(name, age, job) {
    var o = {};
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function () {
        console.log(this.name)
    }
    return o
}

var friend2 = new Person5('aaa', 25, 'ccc')

// 使用工厂模式创建构造函数，调用时用new调用
/*
* 这个模式可以在特殊情况下用来为对象创建构造函数。假设我们想创建一个具有额外方法的
* 特殊数组。由于不能直接修改构造函数，因此可以使用这个模式 eg
* */

function SpecialArray() {
    // 创建数组
    var values = []
    // 添加值
    values.push.apply(values, arguments)
    // 添加方法
    values.toPipedString = function () {
        return this.join('|')
    }
    // 返回数组
    return values
}

var colors = new SpecialArray('red', 'blue', 'green')
console.log(colors.toPipedString())
// 思考：这种方法可以为原生的对象添加新的方法，而不改变原生对象。可以避免直接修改
// 原生对象而带来的负面作用
/*
* 说明：返回的对象与构造函数或者与构造函数的原型属性之间没有关系，也就是说，构造
* 函数返回的对象与构造函数外部创建的对象没什么不同。为此不能依赖instanceof操作符
* 来确定对象类型
* */
console.log(colors instanceof SpecialArray) // false 不能用instanceof 操作符判断

// 稳妥构造函数模式
/*
* 没有公共属性，而且其方法也不引用this的对象。
* 稳妥对象最适合在一些安全环境中（这些环境会禁止使用this 和 new ），或者在防止数据
* 被其他应用程序改动使用。稳妥构造函数遵循与寄生构造函数类似的模式，但有两点不同：
* 一是新创建对象的实例方法不引用this,二是使用new操作符调用构造函数。
* */
function Person6(name, age, job) {
    // 创建要返回的对象
    var o = {}
    // 可以在这里定义私有变量和函数
    // 添加方法
    o.sayName = function () {
        console.log(name)
    }
    //返回对象
    return o
}

var friend3 = Person6('aaa', 25, 'bbb')
friend3.sayName() // aaa
/*
* 这种方法除了调用sayName() 方法以外，没有别的方式可以访问其数据成员。即使有其他代码
* 给这个对象添加方法和数据成员，但也不可能由别的方法访问传入到构造函数中的原始数据。
* 和寄生构造函数模式类似，也不能用instanceof判断这种对象
* */

// 继承
// 原型链
/*
* 基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法
* 构造函数、原型和实例的关系：
* 每个构造函数都有一个原型对象。原型对象都包含一个指向构造函数的指针，而实例都包含一个
* 指向原型对象的内部指针（一般为__proto__）。那么，假如我们让原型对象等于另一个类型的
* 实例，结果会怎么样呢？显然，此时的原型对象都包含一个指向另一个原型的指针，相应的，另
* 一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，
* 那么上述关系依然成立，如此层层递进，就构成了实例与原型的链条。这就是所谓的原型链
* */
// 实现原型链的基本模式
function SuperType(){
    this.property = true
}
SuperType.prototype.getSuperValue = function(){
    return this.property
}
function SubType(){
    this.subproperty = false
}

// 继承了SuperType
SubType.prototype = new SuperType()

SubType.prototype.getSubValue = function(){
    return this.subproperty
}

var instance = new SubType();
console.log(instance.getSuperValue()) // true

/*
* 注意别忘记默认的原型（所有引用类型都默认继承了Object，而这个继承也是通过原型链实现的）
*一句话 SubType 继承了SuperType，而SuperType继承了Object
* */
/*
* 实际上，不是SubType的原型的constructor属性被重写了，而是SubType的原型指向了另一个对象-
* SuperType的原型，而这个原型对象的constructor属性指向的是SuperType
* */

/*
* 确定原型和实例的关系（instanceof(判断实例) isPrototypeOf()（判断原型））
* */
/*
* 谨慎的定义方法
* 子类型有时候需要重写超类型中的某个方法，或者需要添加超类型中不存在的某个方法。但不管怎样，
* 给原型添加方法的代码一定要放在替换原型的语句之后
* */
/*
* 通过原型链实现继承时，不能使用对象字面量创建原型方法。因为这样做就会重写原型链
* */
function SuperType2(){
    this.property = true;
}
SuperType2.prototype.getSuperValue = function(){
    return this.property;
};
function SubType2(){
    this.subproperty = false;
}
//继承了 SuperType
SubType2.prototype = new SuperType();
// 使用字面量添加新方法，会导致上一行代码无效
SubType2.prototype = {
    getSubValue : function (){
        return this.subproperty;
    },
    someOtherMethod : function (){
        return false;
    }
};
var instance2 = new SubType2();
// console.log(instance2.getSuperValue()); //error!
/*
* 原型链的问题
* 1.引用类型的问题
* 2.创建子类型的实例时，不能向超类型的构造函数中传递参数
* */

// 借用构造函数（伪造对象或经典继承）
/*
* 在解决原型中包含引用类型所带来的问题
* 基本思想：在子类型构造函数的内部调用超类型构造函数。别忘了，函数只不过是
* 在特定环境中执行代码的对象，因此通过使用apply（）和call()方法也可以在（
* 将来）新创建的对象上执行构造函数
* */
function SuperType3(){
    this.color = ['red','blue','green']
}
function SubType3(){
    // 继承了SuperType
    SuperType3.call(this) // 借调了超类型的构造函数 实际上是在（未来将要）
    // 新创建的SuperType对象上执行SuperType（）函数中定义的所有对象初始化
    // 代码。结果，SubType的每个实例都会具有自己的colors属性的副本了
}

var instance3 = new SubType3();
instance3.color.push('black')
console.log(instance3.color) // ["red", "blue", "green", "black"]

var instance4 = new SubType3();
console.log(instance4.color) // ["red", "blue", "green"]

// 解决了引用的问题
/*
* 传递参数
* 相对于原型链而言，借用构造函数有一个很大的优势，即可以在子类型构造函数中
* 向超类型构造函数传递参数
* */
function SuperType5(name){
    this.name = name
}
function SubType5(name){
    // 继承SuperType,同时传递参数
    SuperType5.call(this,name)
    // 实例属性
    this.age = 29
}
var instance5 = new SubType5('aaa')
console.log(instance5.name,instance5.age) // aaa 29
/*
* 借用构造函数的问题
* 如果仅仅是借用构造函数，那么也将无法避免构造函数存在的问题 -- 函数复用的问题
* 而且在超类型的原型中定义的方法，对于子类而言也是不可见的，结果所有类型只能用
* 构造函数模式。借用构造函数也是很少单独使用的
* */

// 组合继承（伪经典继承）
/*
* 将原型链和借用构造函数的技术组合到一块，从而发挥二者之长的继承模式。其背后的
* 思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属
* 性的继承。这样即通过原型上定义方法实现了函数复用，又能保证每个实例都有它自己
* 的属性。
* */
function SuperType6(name){
    this.name = name
    this.colors = ['red','blue','green']
}
SuperType6.prototype.sayName = function(){
    console.log(this.name)
}
function SubType6(name,age){
    // 继承属性
    SuperType6.call(this,name)
    this.age = age;
}
// 继承方法
SubType6.prototype = new SuperType6()
SubType6.prototype.constructor = SubType6 // 修正原型的构造函数
SubType6.prototype.sayAge = function () {
    console.log(this.age)
}
var instance6 = new SubType6('aaa',29)
instance6.colors.push('black')
console.log(instance6.colors) //["red", "blue", "green", "black"]
instance6.sayName() //aaa
instance6.sayAge() // 29

var instance7 = new SubType6('bbb',25)
console.log(instance7.colors) //["red", "blue", "green"]
instance7.sayName() // bbb
instance7.sayAge() // 25

// 笔记： 借用构造函数继承属性，通过原型继承方法

// 原型式继承
/*
* 借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型
* */
function object(o){
    function F(){}
    F.prototype = o
    return new F()
}
// 从本质上看，Object（）对传入其中的对象执行了一次浅复制
var person4 = {
    name:'aaa',
    friends:['bbb','ccc','ddd']
}
var anotherPerson = object(person4)
anotherPerson.name = 'eee'
anotherPerson.friends.push('fff')

var yetAnotherPerson = object(person4);
yetAnotherPerson.name = "xxx";
yetAnotherPerson.friends.push("yyy");

console.log(person4.friends) //["bbb", "ccc", "ddd", "fff", "yyy"]
/*
* 问题 引用类型的问题
* */

// 寄生式继承
/*
* 寄生式继承和工厂模式类似，即创建一个仅用于分装继承过程的函数，该函数在内部
* 一某种方式来增强对象，最后再像真的是它做了所有工作返回对象
* */
function createAnother(original){
    var clone = object(original);//通过调用函数创建一个新对象
    clone.sayHi = function(){// 以某种方式来增强这个对象
        console.log('hi')
    }
    return clone //返回这个对象
}
/*
* 使用寄生式继承来为对象添加函数，会由于不能做到复用而降低效率；这一点和构造
* 函数类似
* */

// 寄生组合式继承
/*
* 通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。其背后的基本思路
* 是：不必为了指定子类型的原型而调用超类型的构造函数，我们所需的无非就是超类型
* 原型的一个副本而已。本质上，就是使用寄生式继承来继承超类型的原型，然后再将结
* 果指定给子类型的原型
* */
function inheritPrototype(subType,superType){
    var prototype = object(superType.prototype) // 创建对象
    prototype.constructor = subType //修正构造函数
    subType.prototype = prototype //指定对象
}
function SuperType7(name){
    this.name = name
    this.colors = ['red','blue','green']
}
SuperType7.prototype.sayName = function(){
    console.log(this.name)
}
function SubType7(name,age){
    // 继承属性
    SuperType7.call(this,name)
    this.age = age;
}
// 继承方法
inheritPrototype(SubType7,SuperType7) // 代替了SubType7.prototype = new SuperType7()
SubType7.prototype.sayAge = function () {
    console.log(this.age)
}
var instance8 = new SubType6('aaa',29)
instance8.colors.push('black')
console.log(instance8.colors) //["red", "blue", "green", "black"]
instance8.sayName() //aaa
instance8.sayAge() // 29

var instance9 = new SubType6('bbb',25)
console.log(instance9.colors) //["red", "blue", "green"]
instance9.sayName() // bbb
instance9.sayAge() // 25

// 这个例子的高效提现在只调用了一次SuperType构造函数
