/**
 * Created by HH_Girl on 2018/2/6.
 */
/*
 * 模板方法模式：父类中定义一组操作算法骨架，而将一些实现步骤
 * 延迟到子类中，使得子类可以不改变父类的算法结构的同时可重新
 * 定义算法中某些实现步骤。
 * */
//模板类 基础提示框 data 渲染数据
var Alert = function (data) {
    //如果没有数据则返回，防止后面的程序执行
    if (!data) return;
    //设置内容
    this.content = data.content;
    //创建提示框面板
    this.panel = document.createElement('div');
    //创建提示内容组件
    this.contentNode = document.createElement('p');
    //创建确定按钮组件
    this.confirmBtn = document.createElement('span');
    //创建关闭按钮组件
    this.closeBtn = document.createElement('b');
    //为提示面板添加类
    this.panel.className = 'alert';
    //为关闭按钮添加类
    this.closeBtn.className = 'a-close';
    //为确定按钮添加类
    this.confirmBtn.className = 'a-confirm';
    //为确定按钮添加文案
    this.confirmBtn.innerHTML = data.confirm || '确认';
    //为提示内容添加文本
    this.contentNode.innerHTML = this.content;
    //点击确定执行方法data中有success方法则为success方法，否则为空函数
    this.success = data.success || function () {
        };
    //点击关闭按钮执行方法
    this.fail = data.fail || function () {
        };
};
//右侧按钮提示框
var RightAlert=function(data){
    //继承基本提示框构造函数
    Alert.call(this,data);
    //为确认按钮添加right类设置位置居右
    this.confirmBtn.className=this.confirmBtn.className+'right';
};
RightAlert.prototype=new Alert();

//标题提示框
var TitleAlert=function(data){
    //继承基本提示框构造函数
    Alert.call(this,data);
    //设置标题内容
    this.title=data.title;
    //创建标题组件
    this.titleNode=document.createElement('h3');
    //标题组件中写入内容
    this.titleNode.innerHTML=this.title;
};
TitleAlert.prototype=new Alert();
//对基本提示框创建方法拓展
TitleAlert.prototype.init=function(){
    //插入标题
    this.panel.insertBefore(this.titleNode,this.panel.firstChild);
    //继承基本提示框init方法
    Alert.prototype.init.call(this);
};

