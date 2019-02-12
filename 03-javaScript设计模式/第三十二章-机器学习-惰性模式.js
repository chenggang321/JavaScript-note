/**
 * Created by HH_Girl on 2018/2/22.
 */
/*
* 惰性模式：减少每次代码执行时的重复性的分支判断，
* 通过对对象重新定义来屏蔽原对象的分支判断
* 作用：减少函数执行时的重复性分支的判断
* 两种实现方式：
* 第一种：文件加载进来时通过闭包执行该方法对其重新定义。
* 第二种：在第一种方式基础上做一次延迟执行，在函数第一次
* 调用的时候对其重新定义
* */
//加载即执行
//命名空间
var CG=CG||{};
CG.on=function(dom,type,fn){
    if(document.addEventListener){
        //返回重新定义的方法
        return function(dom,type,fn){
            dom.addEventListener(type,fn,false);
        }
    }else if(document.attachEvent){//兼容IE
        return function(dom,type,fn){
            dom.attachEvent('on'+type,fn);
        }
    }else{//定义on方法
        //返回新定义方法
        return function(dom,type,fn){
            dom['on'+type]=fn;
        }
    }
}();
//惰性执行
CG.on=function(dom,type,fn){
    if(document.addEventListener){
        //显示重新定义的方法
        CG.on= function(dom,type,fn){
            dom.addEventListener(type,fn,false);
        }
    }else if(document.attachEvent){//兼容IE
        CG.on= function(dom,type,fn){
            dom.attachEvent('on'+type,fn);
        }
    }else{//定义on方法
        //显示新定义方法
        CG.on= function(dom,type,fn){
            dom['on'+type]=fn;
        }
    }
    //执行充定义on方法
    CG.on(dom,type,fn);
};