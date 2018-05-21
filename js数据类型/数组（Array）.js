/**
 * Created by HH_Girl on 2018/5/21.
 */
/*
* 检测数组
* */
// instanceof 测试某个对象是否由某个指定的构造器创建
console.log([1,2,3] instanceof Array);// true
console.log('1' instanceof Array);// false

// 比instanceof更可靠 Array.isArray()
console.log(Array.isArray([1,2,3]));// true

// object对象的toString()方法
function type(any){
    return Object.prototype.toString.call(any).slice(8,-1).toLowerCase();
}
console.log(type([1,2,3]));

/*
* 转换方法
* */
var test = [1,2,3];
console.log(test.toString()); // "1,2,3";
console.log(test.valueOf()); // [1,2,3];

var testStr = test.join('|'); // '1|2|3'
testStr.split('|');// [1,2,3]

/*
* 栈方法（push 和 pop 尾部操作）
* */
var test2 = new Array();
var count = test2.push('a','b');
console.log(count);// 2

var count1 = test2.push('c');
console.log(count1);// 3

var item = test2.pop();
console.log(item);// 'c'

/*
* 队列方法（shift和unshift头部操作）
* */
var test3 = [1,2,3];
const item2 = test3.shift();
console.log(item2);// 1
console.log(test3);// 2 3

/*
* 重排序方法
* */
var test4 = [1,2,3];
var test5 = test4.reverse();// [3,2,1]
test5.sort();// [1,2,3]

/*
* 操作方法
* */
var test7 = [1,2,3];
// concat 合并数组 不影响原数组
var test8 = test7.concat([4,5]);
console.log(test7,test8);// [1,2,3] [1,2,3,4,5]

// slice 获取数组的起始位置和结束位置之间的项（不包括最后位置的项） 不影响原数组
var test9 = test8.slice(0);// [1,2,3,4,5]
var test10 = test8.slice(1,3);// [2,3]
console.log(test9,test10);

// splice 可用作删除、插入和替换，改变原数组
var test11 = [1,2,3,4,5];
test11.splice(1,2);// [1,4,5]
test11.splice(1,0,'a','b');// [1,'a','b',4,5]
test11.splice(2,1,'c'); // [1,'a','c',4,5]
console.log(test11);

/*
* 位置方法
* */
var test12 = [1,2,3,4,5,4,3,2,1];
test12.indexOf(4);// 3
test12.lastIndexOf(4);// 5 有重复
test12.indexOf('4');// -1

/*
* 循环方法
* */
// filter 筛选数组 返回筛选后的数组 不改变原数组
var test13 = [1,2,3,4,5];
var test14 = test13.filter(function(item){
    return item > 1 && item < 5
});
console.log(test14);// [2,3,4]

// map 对数组每一项给定执行函数，返回执行函数执行结果组成的数组 不改变元素组
var test15 = [{a:1,b:2},{a:3,b:4},{a:5,b:6}];
var test16 = test15.map(function(item){
   return  {a1:item['a'],b1:item['b']}
});
console.log(test16);

// forEach 对数组每一项执行特定函数，没有返回值
var test17 = [[1],[2]];
test17.forEach(function(item){
    item.push(1);
});
// 其他循环方法 for , for in , for of while循环等

/*
* 常用数组操作
* */

// 数组乱序
// 1. Math.random()和sort()结合 不完全随机数字越大出现在后面的概率越大
var test18 = [1,2,3,4,5,6,7];
test18.sort(function(){
    return Math.random() - 0.5
});
console.log(test18);

// 2.遍历原数组，产生随机下标，push到新数组
var test19 = [1,2,3,4,5,6,7];
function shuffle(array){
    var i,len = array.length,copy = [];
    while(len){
        i = Math.floor(Math.random()*len--);
        copy.push(array.splice(i, 1)[0]);
    }
    return copy;
}
console.log(shuffle(test19),test19);

// 3.随机从数组中抽出一个元素，然后与最后个元素交换，
// 相当于把这个随机抽取的元素放到了数组最后面去，
// 表示它已经是被随机过了，同时被换走的那个元素跑到前面去了，
// 会在后续的重复操作中被随机掉。一轮操作过后，
// 下一轮我们只在剩下的n-1个元素也就是数组的前n-1个元素中进行相同的操作，
// 直到进行到第一个。
function shuffle2(array){
    var i,len = array.length,t;
    while(len){
        i = Math.floor(Math.random()*(len--));
        t = array[i];
        array[i] = array[len];
        array[len] = t;
        len--;
    }
    return array;
}
console.log(shuffle2([1,2,3,4].concat()));

// 数组排序
// 升序
function asc(arr){
    return arr.sort(function(a,b){
        return a - b;
    });
}
console.log(asc([6,3,4,2]));//[2,3,4,6]
// 降序
function desc(arr){
    return arr.sort(function(a,b){
        return b - a;
    });
}
console.log(desc([4,3,2,5]));//[5,4,3,2]

// 冒泡排序
function bubbleSort(arr){
    var len = arr.length;//4
    for(var i = 0;i<len;i++){ // 层的循环
        for(var j = 0;j < len-1-i;j++){ // 元素循环
            if(arr[j]>arr[j+1]){ // 交换条件
                var temp = arr[j+1]; // 交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
console.log(bubbleSort([6,2,3,4]));
