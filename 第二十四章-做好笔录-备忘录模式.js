/**
 * Created by HH_Girl on 2018/2/8.
 */
/*
* 备忘录模式：在不破坏对象封装的前提下，在对象之外捕获
* 并保存该对象内部状态以便日后对象使用或者恢复到以前的
* 某个状态
* */
//page 备忘录类
var Page=function(){
    //信息缓存对象
    var cache={};
    /*
    * 主函数
    * 参数 page 页码
    * 参数 fn 成功回调函数
    * */
    return function(page,fn){
        //判断该页面数据是否在缓存中
        if(cache[page]){
            //恢复到该页面，显示该页面内容
            showPage(page,cache[page]);
            //执行成功回调函数
            fn && fn();
        }else{
            //若缓存Cache中无该页数据
            $.post('data.json',{
                //请携带数据page页码
                page:page
            },function(){
                //成功返回
                if(res.errNo===0){
                    //显示该页数据
                    showPage(page,res.data);
                    //执行成功回调函数
                    fn&&fn();
                }else{
                    //处理异常
                }
            })
        }
    }
}();