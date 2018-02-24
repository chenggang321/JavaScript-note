/**
 * Created by HH_Girl on 2018/2/3.
 */
/*
* 简单工厂模式：又叫静态工厂方法，由一个工厂对象决定创建某一种产品
* 对象类的实例。主要用来创建同一类对象。
* */
//工厂模式
function creatPop(type,text){
    //创建一个对象，并对对象拓展属性和方法
    var o=new Object();
    o.content =text;
    o.show=function(){
        //显示方法
        console.log('显示');
    };
    if(type === 'alert'){
        //警示框差异部分
        console.log('警示框差异部分');
    }
    if(type === 'prompt'){
        //提示框差异部分
        console.log('提示框差异部分');
    }
    if(type === 'confirm'){
        //确认框差异部分
        console.log('确认框差异部分');
    }
    return o;
}
//创建警示框
var userNameAlert=creatPop('alert','用户名只能是26个字母和数字');
console.log(userNameAlert.content);
userNameAlert.show();