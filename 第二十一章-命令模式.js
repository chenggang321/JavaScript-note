/**
 * Created by HH_Girl on 2018/2/7.
 */
/*
 * 命令模式：将请求与实现解耦并封装成独立对象，
 * 从而使不同的请求对客户端实现参数化
 * */

//实现模块
var viewCommand = (function () {
    var tpl = {
            //展示图片结构模板
            product: [
                '<div>',
                '<img src="{#src#}"/>',
                '<p>{#text#}</p>',
                '</div>'
            ].join(''),
            //展示标题结构模板
            title: [
                '<div class="title">',
                '<div class="main">',
                '<h2>{#title#}</h2>',
                '<p>{#tips#}</p>',
                '</div>',
                '</div>'
            ].join(''),
        },
        //格式化字符串缓存字符串
        html = '';

    function formateString(str, obj) {
        //替换'{#'与'#}'之间的字符串
        return str.replace(/{#(\w+)#}/g, function (match, key) {
            return obj[key];
        })
    }

    //方法集合
    var Action = {
        //创建方法
        create: function (data,view) {
            console.log(data,view);
            //解析数据 如果数据是一个数组
            if(data.length){
                //遍历数组
                for(var i=0,len=data.length;i<len;i++){
                    //将格式化之后的字符串缓存到html中
                    html+=formateString(tpl[view],data[i]);
                }
            }else{
                //直接格式化字符串到html中
                html+=formateString(tpl[view],data);
            }
        },
        //展示方法
        display: function (container,data,view) {
            //如果传入数据
            if(data){
                //根据给定的数据创建视图
                this.create(data,view);
                console.log(html);
            }
            //展示模块
            document.getElementById(container).innerHTML=html;
            //展示后清空缓存的字符串
            html='';
        }
    };
    //命令接口
    return function excute(msg) {
        //解析命令
        msg.param=Object.prototype.toString.call(msg.param)==='[object Array]'?
            msg.param:[msg.param];
        //调用方法
        Action[msg.command].apply(Action,msg.param);
    }
})();
//产品展示数据
var productData=[
    {
        src:'MLCS_banner.png',
        text:'绽放的桃花'
    },
    {
        src:'MLCS_banner.png',
        text:'绽放的桃花2'
    },
    {
        src:'MLCS_banner.png',
        text:'绽放的桃花3'
    }
],
    //模块标题数据
    titleData={
        title:'夏日里的一片温馨',
        tips:'暖暖的温情带给人们的感受。'
    };
/*var title=document.createElement('div');
title.setAttribute('id','title');
document.body.appendChild(title);
var product=document.createElement('div');
product.setAttribute('id','product');
document.body.appendChild(product);
viewCommand({
    command:'display',
    param:['title',titleData,'title']
});
viewCommand({
    command:'display',
    param:['product',productData,'product']
});*/
var canvas=document.createElement('canvas');
canvas.setAttribute('id','canvas');
canvas.setAttribute('width','800');
canvas.setAttribute('height','400');
document.body.appendChild(canvas);
//实现对象
var CanvasCommand=(function(){
    //获取canvas
    var canvas =document.getElementById('canvas'),
        //canvas元素上下文引用对象缓存在命令对象内部
        ctx=canvas.getContext('2d');
    //内部方法对象
    var Action={
        //填充色彩
        fillStyle:function(c){
            ctx.fillStyle=c;
        },
        //填充矩形
        fillRect:function(x,y,width,height){
            ctx.fillRect(x,y,width,height);
        },
        //描边色彩
        strokeStyle:function(c){
            ctx.strokeStyle=c;
        },
        //描边矩形
        strokeRect:function(x,y,width,height){
            ctx.strokeRect(x,y,width,height);
        },
        //填充字体
        fillText:function(text,x,y){
            ctx.fillText(text,x,y);
        },
        //开启路径
        beginPath:function(){
            ctx.beginPath();
        },
        //移动画笔触点
        moveTo:function(x,y){
            ctx.beginPath();
        },
        //画笔连线
        lineTo:function (x,y) {
            ctx.lineTo(x,y);
        },
        //绘制弧线
        arc:function(x,y,r,begin,end,dir){
            ctx.arc(x,y,r,begin,end,dir);
        },
        //填充
        fill:function(){
            ctx.fill();
        },
        //描边
        stroke:function(){
            ctx.stroke();
        }
    };
    return {
        //命令接口
        excute:function(msg){
            if(!msg){return}
            //如果命令是一个数组
            if(msg.length){
                //遍历执行多个命令
                for(var i=0,len=msg.length;i<len;i++){
                    arguments.callee(msg[i]);
                }
            }else{
                //如果msg.param不是一个数组，将其转化为数组
                msg.param=Object.prototype.toString.call(msg.param)==='[object Array]'?
                    msg.param:[msg.param]
                Action[msg.command].apply(Action,msg.param);
            }
        }
    }
})();
CanvasCommand.excute([
    {command:'strokeStyle',param:'red'},
    {command:'arc',param:[350,150,100,0,2*Math.PI,true]},
    {command:'stroke'}
]);
