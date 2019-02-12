/**
 * Created by HH_Girl on 2018/2/5.
 */
/*
* 适配器模式 将一个类（对象）的接口（方法或者属性）转化成另一个接口，
* 以满足用户需求，使类（对象）之间接口的不兼容问题通过适配器得以解决
* */

var arr=['javaScript','book','前端编程语言','8月1日'];
/*
* var obj={
*   name:'',
*   type:'',
*   title:'',
*   time:''
* }
* */
//适配
function arrToObjAdapter(arr){
    return {
        name:arr[0],
        type:arr[1],
        title:arr[2],
        time:arr[3]
    }
}
var adapterData=arrToObjAdapter(arr);
console.log(adapterData);