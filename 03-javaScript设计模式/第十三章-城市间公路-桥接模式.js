/**
 * Created by HH_Girl on 2018/2/5.
 */
/*
* 桥接模式：在系统沿着多个维度变化的同时，又不增加其复杂度并已达到解耦。
* 有时候页面中的一些小小细节改变常因逻辑相似导致大片臃肿的代码，让页面苦涩不
* 堪。
*
* 桥接模式将抽象部分和具体实现部分分离，两者可独立变化，也可一起工作。
* 这种模式的实现上，需要一个对象担任桥的角色，起到连接作用。
*
* 应用：在封装开源组件的时候，经常会用到这种模式。例如：各种框架的暴露的
* 生命周期
*
* */
//多维变量类
//运动单元
function Speed(x,y){
    this.x=x;
    this.y=y;
}
Speed.prototype.run=function(){
    console.log('运动起来');
};
//着色单元
function Color(cl){
    this.color=cl;
}
Color.prototype.draw=function(){
    console.log('绘制色彩');
};
//变形单元
function Shape(sh){
    this.shape=sp;
}
Shape.prototype.change=function(){
    console.log('改变形状');
};
//说话单元
function Speek(wd){
    this.word=wd;
}
Speek.prototype.say=function(){
    console.log('书写字体');
};
//创建一个球类
function Ball(x,y,c){
    //实现运动单元
    this.speed=new Speed(x,y);
    //实现着色单元
    this.color =new Color(c);
}
Ball.prototype.init=function(){
    //实现运动
    this.speed.run();
    //实现着色
    this.color.draw();
};
//创建一个人物类
function People(x,y,f){
    this.speed=new Speed(x,y);
    this.font=new Speek(f);
}
People.prototype.init=function(){
    this.speed.run();
    this.font.say();
};
console.log('success');
// 桥接模式的典型应用是Array上的forEach函数
// 此函数负责遍历数组中的每个元素，是抽象部分；而回调函数就是具体部分
const forEach = (arr,callback)=>{
    if(!Array.isArray(arr)) return false;
    for(let i = 0;i<arr.length;i++){
        callback(arr[i],i);
    }
};

forEach(arr,(item,index)=>{
    console.log(item,index);
})

