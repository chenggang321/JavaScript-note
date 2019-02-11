/*
*  代理（Proxy）可以拦截并改变js引擎的底层操作，如数据读取、属性定义、函数构造等一系列操作。es6
*  通过对这些内置对象的代理和反射函数，让开发者能进一步接近js引擎的能力。
*
*  代理：代理是用来替代另一个对象（target），js通过new Proxy() 创建一个目标对象的代理，改代理与
*  改目标对象表面上可以被当作一个对象来对待。当目标对象上进行一些特定的底层操作时，代理允许拦截这
*  些操作并覆写它，这原本只是js引擎的内部能力。
*
*  拦截行为使用了一个能够响应特定操作的函数（被称为陷阱函数），每一个代理陷阱对应一个反射（Reflect）
*  方法。
*
*  综合来说，想要控制或改变js的一些底层操作，可以先创建一个代理对象，在这个代理对象上挂载一些陷阱函
*  数，陷阱函数里面有反射方法。
* */

// 创建一个简单的代理

// 目标对象
let target = {};
// 代理对象
let proxy = new Proxy(target,{});

proxy.name = 'hello';
console.log(proxy.name); // hello
console.log(target.name); // hello

target.name = 'world';
console.log(proxy.name); // world
console.log(target.name); // world

// 定义一个或多个陷阱函数

// 1.set 验证对象属性的存储
/*
*  改陷阱函数能接收这四个参数
* trapTarget:将接收属性的对象（即代理的目标对象）
* key:需要写入的属性的键（字符串类型或符号类型）
* value:将被写入的值
* receiver:操作发生的对象（通常是代理对象）
*
*  set陷阱对应的反射方法和默认特性是Reflect.set(),和陷阱函数一样接收这四个参数，并会基于操作
*  是否成功而返回相应的结果。
* */

let targetObj = {};
let proxyObj = new Proxy(targetObj,{
    set:set,
    get:get
});

// 定义 set 陷阱函数
function set(trapTarget,key,value,receiver){
    if(isNaN(value)){
        throw new TypeError(`Property ${key} must be a number.`)
    }
    return Reflect.set(trapTarget,key,value,receiver)
}

// 测试
proxyObj.count = 123;
console.log(proxyObj.count); // 123
console.log(targetObj.count); // 123

// proxyObj.anotherName = "proxy" // TypeError: Property anotherName must be a number.

// get 验证对象属性的读取
// 定义get陷阱函数
function get(trapTarget,key,receiver){
    if(!(key in receiver)){
        throw new TypeError(`Property ${key} doesn't exist`);
    }
    return Reflect.get(trapTarget,key,receiver)
}

console.log(proxyObj.count); // 123
// console.log(proxyObj.newcount) // TypeError: Property newcount doesn't exist.