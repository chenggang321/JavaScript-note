/**
 * Created by HH_Girl on 2018/2/2.
 */
/*
 * 封装
 * 类
 * */

var Book = function (id, bookname, price) {
    this.id = id;
    this.bookname = bookname;
    this.price = price;
};

/*
 * 类的原型
 * */
Book.prototype = {
    display: function () {
        console.log("展示这本书");
    }
};

/*
 * constructor  属性返回对创建此对象的数组函数的引用
 * */
var book = new Book(10, 'javascript设计模式', 50);
console.dir(Book);
console.dir(Book.prototype.constructor);//Book Object
console.log(book);

/*
 *面向对象思想
 *
 * 私有属性
 * 私有方法
 * 共有属性
 * 共有方法
 * 保护方法
 * ...
 * */

//私有属性与私有方法，特权方法，对象共有属性和对象共有方法，构造器
var BookTwo = function (id, name, price) {
    //私有属性
    var num = 1;
    //私有方法
    function checkId() {
        console.log(this.id);
    }

    //特权方法
    this.getName = function () {
        return this.name;
    };
    this.getPrice = function () {
        return this.price;
    };
    this.setName = function (name) {
        this.name = name;
    };
    this.setPrice = function (price) {
        this.price = price;
    };
    //对象公有属性
    this.id = id;
    //对象公有方法
    this.copy = function () {
        console.log('copy');
    };
    //构造器
    this.setName(name);
    this.setPrice(price);
};
//类静态公有属性（对象不能访问）
BookTwo.isChinese = true;
//类静态公有方法（对象不能访问）
BookTwo.resetTime = function () {
    console.log('new Tiem');
};
BookTwo.prototype = {
    //公有属性
    isJSBook: false,
    //公有方法
    display: function () {
        console.log("显示");
    }
};


var booktwo = new BookTwo(11, 'javascript设计模式', 50);
console.log(booktwo);
console.log(booktwo.num);//undefined
console.log(booktwo.isJSBook);//false
booktwo.display();//显示
console.log(booktwo.id);//11
console.log(booktwo.isChinese);//undefined
//类的静态公有属性可以通过类的自身访问
console.log(BookTwo.isChinese);//true
BookTwo.resetTime();//new Time

/*
 * 闭包
 * 类的静态变量 通过闭包来实现
 * */
//利用闭包来实现
var BookThree = (function () {
    //静态私有变量
    var bookNum = 0;
    //静态私有方法
    function checkBook(name) {
        console.log(name);
    }

    //构造函数
    function _book(newId, newName, newPrice) {
        //私有变量
        var name, price;
        //私有方法
        function checkID(id) {
        }

        //特权方法
        this.getName = function () {
            return this.name;
        };
        this.getPrice = function () {
            return this.price;
        };
        this.setName = function (name) {
            this.name = name;
        };
        this.setPrice = function (price) {
            this.price = price;
        };
        //公有属性
        this.id = newId;
        //公有方法
        this.copy = function () {
        };
        bookNum++;
        if (bookNum > 100) {
            throw new Error('我们仅出版100本书');
        }
        //构造器
        this.setName(newName);
        this.setPrice(newPrice);
    }

    return _book;
})();

var bookThree = new BookThree(11, 'javascript设计模式', 50);
console.log(bookThree);

/*
 *
 * 创建对象的安全模式
 * 去除 new 也可成功事例化对象
 * */

var BookFour = function (id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
};

var bookFour = BookTwo(12, 'javascript设计模式', 50);
console.log(bookFour);//undefined
console.log(window.id);//12
console.log(window.name);//javascript设计模式
console.log(window.price);//50
bookFour = new BookTwo(13, 'javascript设计模式', 50);
console.log(bookFour);

//图书安全类
/*
 * instanceof 运算符用来判断一个构造函数的prototype属性所指向的对象是否存在另外一个要检测对象的原型链上
 * */
var BookFive = function (id, name, price) {
    //判断执行过程中的this是否是当前对象（如果是说明是new创建的）
    if (this instanceof BookFive) {
        this.id = id;
        this.name = name;
        this.price = price;
    } else {//重新创建这个对象
        return new BookFive(id, name, price);
    }
};
//都能成功创建
var bookFive = BookFive(14, 'javascript设计模式', 50);
console.log(bookFive);
bookFive = new BookFive(15, 'javascript设计模式', 50);
console.log(bookFive);

/*
 * 传宗接代 ---继承
 * */

/*
 * 类式继承
 * 关键：SubClass.prototype = new SuperClass();
 * */

//声明父类
function SuperClass() {
    this.superValue = true;
}
//为父类添加共有方法
SuperClass.prototype.getSuperValue = function () {
    return this.superValue;
};

//声明子类
function SubClass() {
    this.subValue = false;
}

//继承父类
SubClass.prototype = new SuperClass();

//为子类添加共有方法
SubClass.prototype.getSubValue = function () {
    return this.subValue;
};

var instance = new SubClass();
console.log(instance.getSuperValue());
console.log(instance.getSubValue());
/*
 * instance 判断对象和类之间的继承关系 实例-》类
 *
 * 是判断 实例 与 类 的继承关系
 * */
console.log(instance instanceof SuperClass);//true
console.log(instance instanceof SubClass);//true
console.log(SubClass instanceof SuperClass);//false
console.log(SubClass.prototype instanceof SuperClass);//true
console.log(instance instanceof Object);//true

/*
 * 类式的缺点
 * 1.由于子类通过其原型prototype对父类实例化，继承了父类。所以父类中
 * 公有的属性要是引用类型，就会在子类中被所有实例共用，因此一个子类的
 * 实例更改字类原型从父类构造函数中继承来的共有属性就会直接影响到其他子类
 * 2.由于子类的实现的继承是靠其原型prototype对父类的实例化实现的，因
 * 此在创建父类的时候，是无法向父类传递参数的，因而在实例化父类的时候
 * 也无法对父类构造函数类的属性进行初始化
 * */
function SuperClassTwo() {
    this.books = ['Javascript', 'html', 'css'];
}
function SubClassTwo() {
}
SubClassTwo.prototype = new SuperClassTwo();
var instance1 = new SubClassTwo();
var instance2 = new SubClassTwo();
console.log("类式的缺点");
console.log(instance1.books);//["Javascript", "html", "css"]
instance1.books.push('设计模式');
console.log(instance2.books);//["Javascript", "html", "css", "设计模式"]
/*
 * 总结：在修改instance1的时候instance2也被修改了这样会造成程序的错误
 * */

/*
 * 为了解决这些产生了
 * 创建即继承-构造函数继承
 *
 * 关键：SuperClassThree.call(this,id)
 * */

//构造函数式继承
//声明父类
function SuperClassThree(id) {
    //引用类型共有属性
    this.books = ['Javascript', 'html', 'css'];
    //值类型共有属性
    this.id = id;
}
//父类声明原型方法
SuperClassThree.prototype.showBooks = function () {
    console.log(this.books);
};
//声明子类
function SubClassThree(id) {
    //继承父类
    SuperClassThree.call(this, id);
}
//创建第一个子类的实例
var instance3 = new SubClassThree(10);
//创建第一个子类的实例
var instance4 = new SubClassThree(11);
instance3.books.push("设计模式");
console.log(instance3.books);//["Javascript", "html", "css", "设计模式"]
console.log(instance3.id);//10
console.log(instance4.books);//["Javascript", "html", "css"]
console.log(instance4.id);//11
/*
 * 总结：改正了类式继承的缺点，但还是有缺点，就是每个实例都会单独实例化一份
 * 父类的共用方法，这就违背了代码复用的原则，为了综合这两种继承的优点，后来
 * 有了----组合式继承
 * */

/*
 * 将优点为我所用--组合继承
 *
 * */

//组合继承
//声明父类
function SuperClassFour(name) {
    //值类型共有属性
    this.name = name;
    //引用类型共有属性
    this.books = ['html', 'css', 'Javascript']
}
//父类原型共有方法
SuperClassFour.prototype.getName = function () {
    console.log(this.name);
};
//声明子类
function SubClassFour(name, time) {
    //构造函数式继承父类name属性
    SuperClassFour.call(this, name);
    //子类中新增共有属性
    this.time = time;
}
//类式继承 子类原型继承父类实例
SubClassFour.prototype = new SuperClassFour();
//子类原型方法
SubClassFour.prototype.getTime = function () {
    console.log(this.time);
};
console.log('将优点为我所用--组合继承');
var instance5 = new SubClassFour('js book', 2014);
console.log(instance5);
instance5.books.push('设计模式');
console.log(instance5.books);
instance5.getName();
instance5.getTime();

var instance6 = new SubClassFour('css book', 2013);
console.log(instance6.books);
instance6.getName();
instance6.getTime();

/*
 * 缺点：父类的构造函数执行了两遍
 * */

/*
 * 洁净的继承者-原型式继承
 * 借助原型 prototype 可以根据已有的对象创建一个新的对象，
 * 同时不必创建新的自定义对象类型
 * */
//原型式继承
function inheritObject(o) {
    //声明一个过滤函数对象
    function F() {
    }

    //过滤对象的原型继承父对象
    F.prototype = o;
    //返回过渡对象的一个实例，改实例的原型继承了父队象
    return new F();
}
var book5 = {
    name: 'js book',
    alikeBook: ['css book', 'html book']
};
var newBook = inheritObject(book5);
newBook.name = 'ajax book';
newBook.alikeBook.push('xml book');
var otherBook = inheritObject(book5);
otherBook.name = 'flash book';
otherBook.alikeBook.push('as book');

console.log(newBook.name); //ajax book
console.log(newBook.alikeBook);//["css book", "html book", "xml book", "as book"]
console.log(otherBook.name);//flash book
console.log(otherBook.alikeBook);// ["css book", "html book", "xml book", "as book"]
console.log(book5.name);//js book
console.log(book5.alikeBook);//["css book", "html book", "xml book", "as book"]
/*
 * 还是污染了父类
 * */
/*
 * 如虎添翼--寄生式继承
 * */
//寄生式继承
//声明基对象
var book6 = {
    name: 'js book',
    alikeBook: ['css book', 'html book']
};
//原型式继承
function inheritObjectTwo(o) {
    //声明一个过滤函数对象
    function F() {
    }

    //过滤对象的原型继承父对象
    F.prototype = o;
    //返回过渡对象的一个实例，改实例的原型继承了父队象
    return new F();
}

function createBook(obj) {
    console.log(obj);
    //通过原型继承方式创建新对象
    var o = inheritObjectTwo(obj);
    console.log(o.name);
    //拓展新对象
    o.getName = function () {
        console.log(this.name);
    };
    //返回拓展后的新对象
    return o;
}

var book7 = createBook(book6);
console.log(book7.getName);

/*
 * 终极继承者
 * */

/*
 * 寄生式继承 继承原型
 * 传递参数 subClass 子类
 * 传递参数 superClass 父类
 * constructor 属性返回对创建此对象的数组函数的引用。
 * */

function inheritPrototype(subClass, superClass) {
    //复制一份父类的原型副本保存在变量中
    var p = inheritObject(superClass.prototype);
    //修正因为重写子类原型导致子类的constructor属性被修改
    p.constructor = subClass;
    //设置子类的原型
    subClass.prototype = p;
}
//定义父类
function ParentClass(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green']
}
//定义父类原型方法
ParentClass.prototype.getName = function () {
    console.log(this.name);
};
//定义子类
function ChildClass(name, time) {
    //构造函数式继承
    ParentClass.call(this, name);
    //子类新增属性
    this.time = time;
}
//寄生式继承父类原型
inheritPrototype(ChildClass, ParentClass);
//子类新增原型方法
ChildClass.prototype.getTime = function () {
    console.log(this.time);
};

//创建两个测试方法
var test1 = new ChildClass('js book', 2014);
var test2 = new ChildClass('css book', 2013);
test1.colors.push('black');
console.log(test1.colors);//["red", "blue", "green", "black"]
console.log(test2.colors);//["red", "blue", "green"]
test2.getName();//css book
test2.getTime();//2013

/*
 * 老师不止一位--多继承
 * */
// 单继承 属性复制
var extend = function (target, source) {
    //遍历原对象中的属性
    for (var property in source) {
        target[property] = source[property];
    }
    //返回目标对象
    return target;
};
//多继承 属性复制
var mix = function () {
    var i = 1,//从第二个参数起为被继承的对象
        len = arguments.length,//获取参数的长度
        target = arguments[0],//第一个为目标对象
        arg;//缓存参数对象
    //遍历被继承的对象
    for (; i < len; i++) {
        //缓存当前对象
        arg = arguments[i];
        //遍历被继承对象中的属性
        for (var property in arg) {
            //将被继承对象中的属性复制到目标对象中
            target[property] = arg[property];
        }
    }
    //返回目标对象
    return target;
};
/*
 * 这个要出入目标对象（第一个参数--需要继承的对象）
 * 也可以将它绑定到原生对象Object上，这样所有的对象就可以拥有这个方法
 * */
Object.prototype.mix = function () {
    var i = 0,
        len = arguments.length,
        arg;
    for (; i < len; i++) {
        //缓存当前对象
        arg = arguments[i];
        //遍历被继承对象中的属性
        for (var property in arg) {
            //将被继承对象中的属性复制到目标对象中
            this[property] = arg[property];
        }
    }
};

/*
 *
 * 多种调用方式 -- 多态
 * 根据参数数量的不同 运行不同的程序
 * */
//多态
function add() {
    //获取参数
    var arg = arguments,
        len = arg.length;
    switch (len) {
        //如果没有参数
        case 0:
            return 10;
        case 1:
            return 10 + arg[0];
        case 2:
            return arg[0]+arg[1];
    }
}