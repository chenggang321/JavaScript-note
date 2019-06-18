/*
* 函数式编程中有一个比较重要的概念就是函数组合（compose），组合多个函数，同时返回一个新的函数。
* 调用时，组合函数按顺序从右向左执行。右边函数调用后，放回的结果作为左边函数的参数传入，严格保
* 证了执行顺序，这也是compose主要特点
* */

function compose(f, g) {
    return function (x) {
        return f(g(x));
    }
}

let arr = [1, 2, 3];
let reverse = function (x) {
    return x.reverse()
}
let getFirst = function (x) {
    return x[0]
}
let composeFunc = compose(getFirst, reverse)

// console.log(composeFunc(arr));

// 组合任意个函数
/*
* 关键点
* 1、利用arguments的长度得到所有组合函数的个数
* 2、reduce遍历执行所有函数
* */

/*
* reduce 语法
* array.reduce(function(total,currentValue,currentIndex,arr),initialValue)
*
* */

let composeAny = function () {
    let args = Array.prototype.slice.call(arguments);
    return function (x) {
        if (args.length >= 2) {
            return args.reverse().reduce((p, c) => {
                return c(p)
            }, x)
        } else {
            return args[1] && args[1](x)
        }
    }
}

let trace = function (x) {
    console.log('执行结果：', x);
    return x;
}

let composeFuncAny = composeAny(trace, getFirst, trace, reverse);
composeFuncAny([1,2,3]);

/*
* es6 实现
* */

// pipe
/*
* pipe 是反向compose,pipe正向调用实现起来更方便
* */
const pipe = (fn, ...fns) => x => fns.reduce((v, f) => f(v), fn(x));

// compose
const composeES6 = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
let composeFuncAnyES6 = composeES6(trace, getFirst, trace, reverse);
composeFuncAnyES6([1,2,3])


