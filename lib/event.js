/**
 * Created by HH_Girl on 2018/2/23.
 */
F.module('lib/event',['lib/dom'],function(dom){
    var events={
        //绑定事件
        on:function(id,type,fn){
            dom.g(id)['on'+type]=fn;
        }
    };
    return events;
});