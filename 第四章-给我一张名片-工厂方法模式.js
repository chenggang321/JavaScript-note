/**
 * Created by HH_Girl on 2018/2/3.
 */
/*
* 工厂方法模式：通过对产品类的抽象使其创建业务主要负责用于创建
* 多类产品的实例
* */
//安全模式创建的工厂类
var Factory =function(type,content){
    if(this instanceof Factory){
        var s=new this[type](content);
        return s;
    }else{
        return new Factory(type,content);
    }
};
//工厂原型中设置创建所有类型对象的基类
Factory.prototype={
    Java:function(content){
        this.content=content;
        this.name='java';
        (function(){
            console.log("执行成功"+content);
        })(content)
    },
    Javascript:function(content){
        this.content=content;
        this.name='Javascript'
    }
};

var data=[
    {type:'Javascript',countent:'Javascript 哪家强'},
    {type:'Java',countent:'Java 哪家强'}
    ];
var arr=[];
for(var i=0;i<data.length;i++){
    arr.push(Factory(data[i].type,data[i].countent));
}
console.log(arr);