/**
 * Created by HH_Girl on 2018/2/5.
 */
/*
* 装饰着模式：在不改变原对象的基础，通过对其进行包装装拓展
* （添加属性或者方法）使原有对象可以满足用户的更复杂需需求。
* */
//装饰者
var decorator=function(input,fn){
    //获取事件源
    var input=document.getElementById(input);
    //若事件源已经绑定事件
    if(typeof input.onclick === 'function'){
        //缓存事件源原有回调函数
        var oldClickFn = input.onclick;
        //为事件源定义新的事件
        input.onclick=function(){
            //事件源原有回调函数
            oldClickFn();
            //执行事件源新增回调函数
            fn();
        }
    }else{
        //事件源未绑定事件，直接为事件源添加新增回调函数
        input.onclick=fn;
    }
    //做其他事情
};