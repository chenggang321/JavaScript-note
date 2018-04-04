/**
 * Created by HH_Girl on 2018/2/5.
 */
/*
 * 外观模式：为一组复杂的子系统接口提供一个更高级的统一接口，
 * 通过这个接口使得对子系统的访问更容易。在JavaScript中有时
 * 也会用于对底层结构兼容性做统一封装来简化用户使用。
 * */
//外观模式实现
function addEvent(dom, type, fn) {
    //对于支持DOM2级事件处理程序addEventListener 方法的浏览器
    if (dom.addEventListener) {
        dom.addEventListener(type, fn, false)
    } else if (dom.attachEvent) {//对于不支持addEventListener 方法但支持attachEvent 方法的浏览器
        dom.attachEvent('on' + type, fn);
    } else {
        dom['on' + type] = fn;
    }
}
//小型代码库
//简约版属性样式方法库
var A={
    //通过id获取元素
    g:function(id){
        return document.getElementById(id);
    },
    //设置元素css属性
    css:function(id,key,value){
        document.getElementById(id)[key]=value;
    },
    //设置元素属性
    attr:function(id,key,value){
        document.getElementById(id)[key]=value;
    },
    html:function(id,html){
        document.getElementById(id).innerHTML=html;
    },
    on:function(id,type,fn){
        document.getElementById(id)['on'+type]=fn;
    }

};

