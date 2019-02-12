/**
 * Created by HH_Girl on 2018/2/9.
 */
/*
 * 链模式：通过在对象中将当前对象返回，实现对同一个对象
 * 多个方法的链式调用，从而简化对该对象的多个方法的多次
 * 调用时，对该对象的多次引用。
 * */
//原型式继承
var A = function () {
};
A.prototype = {
    length: 2,
    size: function () {
        return this.length;
    }
};
var a = new A();
console.log(a.size());
//找位助手
var C = function () {
    return D;
};
var D = C.prototype = {
    length: 2,
    size: function () {
        return this.length;
    }
};
console.log(C().size());
var jQuery = function (selector) {
    /*
     * new 解决元素覆盖
     * */
    return new jQuery.fn.init(selector);
};
jQuery.fn = jQuery.prototype = {
    //强化构造器
    constructor: jQuery,
    init: function (selector) {
        //作为当前对象的属性值保存
        this[0] = document.getElementById(selector);
        this.length = 1;//校正length属性
        return this;//返回当前对象
    },
    length: 2,
    size: function () {
        return this.length;
    }
};
jQuery.fn.init.prototype = jQuery.fn;
var html = `
    <div id="demo"></div>
    <div id="test"></div>
`;
var dom = document.createElement('div');
dom.innerHTML = html;
document.body.appendChild(dom);
var demo = jQuery('demo');
var test = jQuery('test');
console.log(demo, test);
console.log(jQuery('demo').size());