/**
 * Created by HH_Girl on 2018/2/6.
 */
/*
* 职责链模式：解决请求的发送者与请求的接收者之间的耦合，通过
* 职责链上的多个对象对分解请求流程，实现请求在多个对象之间的
* 传递，直到最后一个对象完成请求的处理。
* */
/*
* 异步请求对象（简化版本）
* 参数 data     请求数据
* 参数 dealType 响应数据处理对象
* 参数 dom      事件源
* */
var sendData=function(data,dealType,dom,url){
    //XHR 对象 简化版本 IE 另行处理
    var xhr = new XMLHttpRequest(),
        //请求路径
        url = url;
        //请求返回事件
        xhr.onload=function(event){
            //请求成功
            if((xhr.status>=200&&xhr.status<300||xhr.status===304)){
                dealData(xhr.responseText,dealType,dom);
            }else{
                //请求失败
            }
            //拼接请求字符串
            for(var i in data){
                url+='&'+i+'='+data[i];
            }
            //发送异步请求
            xhr.open('get',url,true);
            xhr.send(null);
        }
};
/*
* 处理响应数据
* 参数 data 响应数据
* 参数 dealType 响应数据处理对象
* 参数 dom 事件源
* */
var dealData = function(data,dealType,dom){
    //对象toString 方法简化引用
    var dataType=Object.prototype.toString.call(data);
    //判断相应数据处理对象
    switch (dealType){
        //输入框提示功能
        case 'sug':
            //如果数据为数组
            if(dataType==='[object Array]'){
                //创建提示框组件
                return createSug(data,dom);
            }
            //将响应的对象转化为数组
            if(dataType === '[object Object]'){
                var newData=[];
                for(var i in data){
                    newData.push(data[i]);
                }
                //创建提示组件
                return createSug(newData,dom);
            }
            //将响应的其他数据转化为数组
            return createSug([data],dom);
            break;
        case 'validate':
            //创建校验组件
            return createValidataResult(data,dom);
            break;
    }
};
/*
* 创建提示框组件
* 参数 data 响应适配数据
* 参数 dom 事件源
* */
var createSug=function(data,dom){
    var i=0,
        len=data.length,
        html='';
    //拼接每一条提示语
    for(;i<len;i++){
        html+='<li>'+data[i]+'</li>';
    }
    //显示提示框
    dom.parentNode.getElementsByTagName('ul')[0].innerHTML=html;
};
/*
* 创建校验组件
* 参数 data 响应适配数据
* 参数 dom 事件源
* */
var createValidataResult =function(data,dom){
    //显示校验结果
    dom.parentNode.getElementsByClassName('span')[0].innerHTML=data;
};
