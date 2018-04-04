/**
 * Created by HH_Girl on 2018/2/5.
 */
/*
* 桥接模式：在系统沿着多个维度变化的同时，又不增加其复杂度并已达到解耦。
* 有时候页面中的一些小小细节改变常因逻辑相似导致大片臃肿的代码，让页面苦涩不
* 堪。
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

