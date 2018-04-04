/**
 * Created by HH_Girl on 2018/2/8.
 */
/*
* 中介者模式：通过中介者对象封装一系列对象之间的交互，使对象
* 之间不再相互引用，降低他们之间的耦合。有时中介者对象也可改变对象
* 之间的交互。
* */
//中介者对象
var Mediator=(function(){
    //消息对象
    var _msg ={};
    return {
        /*
        * 订阅消息方法
        * 参数 type 消息名称
        * 参数 action 消息回调函数
        * */
        register:function(type,action){
            //如果该消息存在
            if(_msg[type]){
                //存入回调函数
                _msg[type].push(action);
            }else{
                //不存在则建立该消息容器
                _msg[type]=[];
                //存入新消息回调函数
                _msg[type].push(action);
            }
        },
        /*
        * 发布消息方法
        * 参数 type 消息名称
        * */
        send :function(type){
            //如果该消息已经被订阅
            if(_msg[type]){
                //遍历已存储的消息回调函数
                for(var i=0,len=_msg[type].length;i<len;i++){
                    //执行回调函数
                    _msg[type][i]&&_msg[type][i]();
                }
            }
        }
    }
})();
//订阅demo消息 执行回调函数
Mediator.register('demo',function(){
    console.log('first');
});
Mediator.register('demo',function(){
    console.log('second');
});
//发布消息
Mediator.send('demo');//first second