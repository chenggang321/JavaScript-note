/**
 * Created by HH_Girl on 2018/2/7.
 */
/*
 * 访问者模式：针对于对象结构中的元素，定义在不改变该对象的前提下
 * 访问结构中元素的新方法
 * */
/*
 *
 * apply()方法 : 接收两个参数，一个是函数运行的作用域（this），另一个是参数数组。
 * 语法：apply([thisObj [,argArray] ]);，调用一个对象的一个方法，2另一个对象替换当前对象。
 * 说明：如果argArray不是一个有效数组或不是arguments对象，那么将导致一个
 * TypeError，如果没有提供argArray和thisObj任何一个参数，那么Global对象将用作thisObj。
 *
 * call()方法 : 第一个参数和apply()方法的一样，但是传递给函数的参数必须列举出来。
 * 语法：call([thisObject[,arg1 [,arg2 [,...,argn]]]]);，应用某一对象的一个方法，
 * 用另一个对象替换当前对象。
 * 说明： call方法可以用来代替另一个对象调用一个方法，call方法可以将一个函数的
 * 对象上下文从初始的上下文改 变为thisObj指定的新对象，如果没有提供thisObj参数，
 * 那么Global对象被用于thisObj。
 * */

//对象访问器
var Visitor = (function () {
    return {
        //截取方法
        splice: function () {
            //splice方法参数，从参数的第二个参数开始算起
            var args = Array.prototype.splice.call(arguments, 1);
            //对第一个参数对象执行splice方法
            return Array.prototype.splice.apply(arguments[0], args);
        },
        //追加数据方法
        push: function () {
            //强化类数组对象，使他拥有length属性
            var len = arguments[0].length || 0;
            //添加的数据从原参数的第二个参数算起
            var args = this.splice(arguments, 1);
            //校正length属性
            arguments[0].length = len + arguments.length - 1;
            //对第一个参数对象执行push方法
            return Array.prototype.push.apply(arguments[0], args);
        },
        //弹出最后一次添加的元素
        pop: function () {
            //对第一个参数对象执行pop方法
            return Array.prototype.pop.apply(arguments[0]);
        }
    }
})();
var a = new Object();
console.log(a.length);//undefined
Visitor.push(a, 1, 2, 3, 4);
console.log(a.length);//4
Visitor.push(a, 4, 5, 6);
console.log(a);//{0: 1, 1: 2, 2: 3, 3: 4, 4: 4, 5: 5, 6: 6, length: 7}
Visitor.pop(a);
console.log(a);
Visitor.splice(a, 3);
console.log(a);
