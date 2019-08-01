/**
 * Created by HH_Girl on 2018/2/3.
 */
/*
* 简单工厂模式：又叫静态工厂方法，由一个工厂对象决定创建某一种产品
* 对象类的实例。主要用来创建同一类对象。
* 工厂方法模式的实质是定义一个创建对象的接口，但让实现这个接口的类
* 来决定实例化哪个类。工厂方法让类的实例化推迟到子类中进行。简单来
* 说：就是把new对象的操作包裹一层，对外提供一个可以根据不同参数创
* 建不同对象的函数。
*
*优缺点：可以隐藏原始类，方便之后代码迁移。调用者只需要记住类的代名
* 词即可。由于多了层封装。会造成类的数目过多，系统复杂度增加。
*
* */
//工厂模式
function createPop(type,text){
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
var userNameAlert=createPop('alert','用户名只能是26个字母和数字');
console.log(userNameAlert.content);
userNameAlert.show();
