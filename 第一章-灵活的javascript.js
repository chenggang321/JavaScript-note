/**
 * Created by HH_Girl on 2018/2/2.
 */
/*
 * 为了防止作用域的变量被覆盖，
 * 可以采用对象来保护变量，
 * 同时也防止了覆盖别人的变量
 *
 *      用对象来收编变量
 *
 * */

var CheckObject = {
    checkName: function () {
        console.log("验证姓名");
    },
    checkEmail: function () {
        console.log("验证邮箱");
    },
    checkPassword: function () {
        console.log("验证密码");
    }
};
CheckObject.checkName();
CheckObject.checkEmail();
CheckObject.checkPassword();

/*
 *对象的另一种形式
 *
 * 先声明对象 再添加方法
 * */
var CheckObjectTwo = function () {
};
CheckObjectTwo.checkName = function () {
    console.log("验证姓名");
};
CheckObjectTwo.checkEmail = function () {
    console.log("验证邮箱");
};
CheckObjectTwo.checkPassword = function () {
    console.log("验证密码");
};
CheckObjectTwo.checkName();
CheckObjectTwo.checkEmail();
CheckObjectTwo.checkPassword();

/*
 * 类也可以
 * 可重复使用
 * 有时候内存消耗巨大 - 每人都有一套自己的方法
 * */
var CheckObjectThree = function () {
    this.checkName = function () {
        console.log("验证姓名");
    };
    this.checkEmail = function () {
        console.log("验证邮箱");
    };
    this.checkPassword = function () {
        console.log("验证密码");
    }
};

var a = new CheckObjectThree();
a.checkName();
a.checkEmail();
a.checkPassword();

/*
 * 一个检测类
 * 这种方法要写很多遍 prototype 但解决的 消耗内存的问题
 * */

var CheckObjectFour = function () {
};

CheckObjectFour.prototype.checkName = function () {
    console.log("验证姓名");
};
CheckObjectFour.prototype.checkEmail = function () {
    console.log("验证邮箱");
};
CheckObjectFour.prototype.checkPassword = function () {
    console.log("验证密码");
};
var b = new CheckObjectFour();
b.checkName();
b.checkEmail();
b.checkPassword();

/*
 * 为了防止 prototype 书写多遍 可以这样做
 * 两种方法不能混用 - 命名相同会造成覆盖
 * 同时我们还发现了在调用的时候 c 写了多遍
 * */

var CheckObjectFive = function () {
};
CheckObjectFive.prototype = {
    checkName: function () {
        console.log("验证姓名");
    },
    checkEmail: function () {
        console.log("验证邮箱");
    },
    checkPassword: function () {
        console.log("验证密码");
    }
};

console.log(">>>>>>>>>>>>>>>>>>>>");
var c = new CheckObjectFive();
c.checkName();
c.checkEmail();
c.checkPassword();

/*
 * 实现链式调用
 * */

var CheckObjectSix = function () {
};
CheckObjectSix.prototype = {
    checkName: function () {
        console.log("验证姓名");
        return this;
    },
    checkEmail: function () {
        console.log("验证邮箱");
        return this;
    },
    checkPassword: function () {
        console.log("验证密码");
        return this;
    }
};
console.log(">>>>>>>>>>>>>>>>>>>>six");
var d = new CheckObjectSix();
d.checkName().checkEmail().checkPassword();

/*
 *
 * 函数的祖先
 * 在添加函数的时候也可以这样做
 * */
Function.prototype.addMethod = function (name, fn) {
    this[name] = fn;
    return this;//实现链式
};

var methods = function () {
};
methods.addMethod('checkName', function () {
    console.log("验证姓名");
    return this;//实现链式
}).addMethod('checkEmail', function () {
    console.log("验证邮箱");
    return this;//实现链式
}).addMethod('checkPassword', function () {
    console.log("验证密码");
    return this;//实现链式
});
/*methods.checkName();
 methods.checkEmail();
 methods.checkPassword();*/
methods.checkName().checkEmail().checkPassword();

/*
 * 换一种方式使用方法
 * */
Function.prototype.addMethodTwo = function (name, fn) {
    this.prototype[name] = fn;
    return this;
};
var Methods = function () {
};
Methods.addMethodTwo('checkName', function () {
    console.log("验证姓名");
}).addMethodTwo('checkEmail', function () {
    console.log("检测邮箱");
});
console.log("换一种方式使用方法");
var m=new Methods();
m.checkName();
m.checkEmail();

