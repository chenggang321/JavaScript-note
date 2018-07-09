// 安全的类型检测
function type(any) {
    return Object.prototype.toString.call(any).slice(8, -1).toLocaleLowerCase()
}

console.log(type(['aaa', 'bbb']))

// 作用域安全的构造函数
function Person(name, age, job) {
    this.name = name
    this.age = age
    this.job = job
}

// var person = new Person('Nicholas',29,'Software Engineer')
// 如果不用new调用会将属性添加到window上污染全局

// 无new化
function Person2(name, age, job) {
    if (this instanceof Person2) {
        this.name = name
        this.age = age
        this.job = job
    } else {
        return new Person2(name, age, job)
    }
}

var person2 = Person2('aaa', 25, 'bbb')
console.log(person2.name) // aaa
console.log(window.name) // ''

// 但如果你使用构造函数窃取模式的继承且不使用原型链，那么这个继承可能被破坏
function Polygon(sides) {
    if (this instanceof Polygon) {
        this.sides = sides
        this.getArea = function () {
            return 0
        }
    } else {
        return new Polygon(sides)
    }
}

function Rectangle(width, height) {
    Polygon.call(this, 2)
    this.width = width
    this.height = height
    this.getArea = function () {
        return this.width * this.height
    }
}

var rect = new Rectangle(5, 10)
console.log(rect.sides) // undefined

// 继承没有成功
// 如果使用原型链或者寄生组合则可以解决这个问题

// Rectangle.prototype = new Polygon() // 原型链继承
inheritPrototype(Rectangle, Polygon)
var rect2 = new Rectangle(5, 10)
console.log(rect2.sides) // 2
// 成功继承
// 寄生组合式继承
function object(object) {
    function F() {
    }

    F.prototype = object
    return new F()
}

function inheritPrototype(subType, superType) {
    var prototype = object(superType.prototype)
    prototype.constructor = subType // 修正constructor
    subType.prototype = prototype // 原型继承
}

// 惰性载入
/*
*  两种实现惰性载入的方式
*  第一种就是在函数被调用时再处理函数。在第一次调用的过程中，该函数会被覆盖为另一个
*  按合适方式执行的函数，这样任何对原函数的调用都不用再经过执行的分支了
* */
function createXHR() {
    if (typeof XMLHttpRequest !== "undefined") {
        createXHR = function () {
            return new XMLHttpRequest();
        };
    } else if (typeof ActiveXObject !== "undefined") {
        createXHR = function () {
            if (typeof arguments.callee.activeXString !== "string") {
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                        "MSXML2.XMLHttp"],
                    i, len;
                for (i = 0, len = versions.length; i < len; i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex) {
                        //skip
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        };
    } else {
        createXHR = function () {
            throw new Error("No XHR object available.");
        };
    }
    return createXHR();
}

/*
*  第二种惰性载入的方式是在声明函数时就指定适当的函数。这样，第一次调用函数时就不会
*  损失性能了，而在首次加载时会损失一点性能
* */
var createXHR2 = (function () {
    if (typeof XMLHttpRequest !== "undefined") {
        return function () {
            return new XMLHttpRequest();
        };
    } else if (typeof ActiveXObject !== "undefined") {
        return function () {
            if (typeof arguments.callee.activeXString !== "string") {
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                        "MSXML2.XMLHttp"],
                    i, len;
                for (i = 0, len = versions.length; i < len; i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex) {
                        //skip
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        };
    } else {
        return function () {
            throw new Error("No XHR object available.");
        };
    }
})();

// 创建节点
var button = document.createElement('button')
button.textContent = '点击一下！'
button.id = 'btn'
document.body.appendChild(button)

// 跨浏览器事件绑定
function addHandler(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
    } else {
        element["on" + type] = handler;
    }
}

function bind(fn, context) {
    return function () {
        return fn.apply(context, arguments)
    }
}

// 函数绑定
var handler = {
    message: 'Event handled',
    handleClick: function (event) {
        console.log(this.message + ':' + event.type)
    }
}

addHandler(button, 'click', bind(handler.handleClick, handler)) // 自定义bind
addHandler(button, 'click', handler.handleClick.bind(handler)) // 原生bind

// 函数柯里化
function add(num1, num2) {
    return num1 + num2
}

function curriedAdd(num2) {
    return add(5, num2)
}

console.log(add(2, 3)) // 5
console.log(curriedAdd(3)) // 8

/*
*  柯里化函数通常由以下步骤动态创建：调用另一个函数并为它传入要柯里化的函数和必要参数
*  创建柯里化函数的通用方式
* */

function curry(fn) {
    var args = Array.prototype.slice.call(arguments, 1)
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments)
        var finalArgs = args.concat(innerArgs)
        return fn.apply(null, finalArgs)
    }
}

var curriedAdd2 = curry(add, 5, 6)
console.log(curriedAdd2())

// 防篡改对象
// Object.preventExtensions()

// 密封的对象
// Object.seal()

// 冻结的对象
// Object.freeze()

// 高级定时器
/*
* 关于定时器要记住的最重要的是：指定时间间隔表示何时将定时器代码添加到队列，而不是何时
* 实际执行代码
* */

// 函数节流
function throttle(method, context) {
    clearTimeout(method.tId)
    method.tId = setTimeout(function () {
        method.call(context)
    }, 100)
}

//自定义事件 观察者模式
function EventTarget() {
    this.handlers = {};
}

EventTarget.prototype = {
    constructor: EventTarget,
    addHandler: function (type, handler) {
        if (typeof this.handlers[type] === "undefined") {
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    },
    fire: function (event) {
        if (!event.target) {
            event.target = this;
        }
        if (this.handlers[event.type] instanceof Array) {
            var handlers = this.handlers[event.type];
            for (var i = 0, len = handlers.length; i < len; i++) {
                handlers[i](event);
            }
        }
    },
    removeHandler: function (type, handler) {
        if (this.handlers[type] instanceof Array) {
            var handlers = this.handlers[type];
            for (var i = 0, len = handlers.length; i < len; i++) {
                if (handlers[i] === handler) {
                    break;
                }
            }
            handlers.splice(i, 1);
        }
    }
};

function handelMessage(event) {
    console.log('Message received:' + event.message)
}

// 创建一个观察者对象
var target = new EventTarget()
// 添加一个事件处理程序
target.addHandler('message', handelMessage)
// 触发事件
target.fire({type: 'message', message: 'hello world'}) // 触发了事件
// 删除事件处理程序
target.removeHandler('message', handelMessage)
// 触发事件
target.fire({type: 'message', message: 'hello world'}) // 没有触发事件

// 拖放
var Utils = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false)
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler)
        } else {
            element['on' + type] = handler
        }
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false)
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler)
        } else {
            element['on' + type] = null
        }
    },
    getEvent: function () {
        return event ? event : window.event
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
}

var DragDrop = function () {
    var dragdrop = new EventTarget()
    var dragging = null,
        diffX = 0,
        diffY = 0

    function handleEvent(event) {
        // 获取事件和目标
        event = Utils.getEvent(event)
        var target = Utils.getTarget(event)

        //确定事件类型
        switch (event.type) {
            case 'mousedown':
                if (target.className.indexOf('draggable') > -1) {
                    dragging = target
                    diffX = event.clientX - target.offsetLeft
                    diffY = event.clientY - target.offsetTop
                    dragdrop.fire({
                        type: 'dragstart',
                        target: dragging,
                        x: event.clientX,
                        y: event.clientY
                    })
                }
                break
            case 'mousemove':
                if (dragging !== null) {
                    // 指定位置
                    dragging.style.left = (event.clientX - diffX) + 'px'
                    dragging.style.top = (event.clientY - diffY) + 'px'
                    // 触发自定义事件
                    dragdrop.fire({
                        type: 'drag',
                        target: dragging,
                        x: event.clientX,
                        y: event.clientY
                    })
                }
                break
            case 'mouseup':
                dragdrop.fire({
                    type: 'dragend',
                    target: dragging,
                    x: event.clientX,
                    y: event.clientY
                })
                dragging = null
                break
        }
    }

    // 公共接口
    dragdrop.enable = function () {
        Utils.addHandler(document, 'mousedown', handleEvent)
        Utils.addHandler(document, 'mousemove', handleEvent)
        Utils.addHandler(document, 'mouseup', handleEvent)
    }
    dragdrop.disable = function () {
        Utils.removeHandler(document, 'mousedown', handleEvent)
        Utils.removeHandler(document, 'mousemove', handleEvent)
        Utils.removeHandler(document, 'mouseup', handleEvent)
    }
    return dragdrop
}()

var div = document.createElement('div')
div.className = 'draggable'
div.style = 'position:absolute;background:lightBlue;width:400px;height:400px';
document.body.appendChild(div)
DragDrop.enable()
DragDrop.addHandler('dragstart',function(event){
    console.log(event)
})
DragDrop.addHandler('drag',function(event){
    console.log(event)
})
DragDrop.addHandler('dragend',function(event){
    console.log(event)
})


