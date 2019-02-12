/*
* 从数组和对象中取值，对变量进行赋值，这个被称为解构
* 解构不成功变量的之就为undefined
* */
// 数组解构
// 简单情况
let [a,b,c] = [1,2,3]; // a=1 ,b=2, c=3
// 复杂情况
let [foo,[[bar],baz]] = [1,[[2],3]]; // foo=1, bar=2, baz=3

// 对象解构
let {aaa,bbb} = {aaa:'ccc',bbb:'ddd'}; //aaa = 'ccc' bbb = 'ddd'

// 对象与数组组合使用
let obj = {
    p:[
        'hello',
        {y:'world'}
    ]
};

let {p:[x,{y}]} = obj;// x='hell',y='world'

// 注意这里的p不是变量，是模式，如果要把p也做为变量赋值
let {p01,p:[x01,{y01}]} = obj; // p01=['hello',{y:'world'}],x01='hello',y01='world'
