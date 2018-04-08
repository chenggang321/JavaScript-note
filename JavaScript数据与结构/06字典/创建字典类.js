/**
 * Created by HH_Girl on 2018/4/4.
 */
/*
* 字典有什么特点呢?
* 字典的主要特点是一一对应的关系.
* 比如保存一个人的信息, 在合适的情况下取出这些信息.
* 使用数组的方式: [18, "Coderwhy", 1.88]. 可以通过下标值取出信息.
* 使用字典的方式: {"age" : 18, "name" : "Coderwhy", "height": 1.88}. 可以通过key取出value
* */
//创建字典类
function Dictionay(){
    this.items = {};
}
Dictionay.prototype={
    has:function(key){
        return this.items.hasOwnProperty(key)
    },
    remove:function(key) {
        //判断字典中是否含有这个key
        if (!this.has(key)) return false;
        delete this.items[key];
        return true;
    },
    get:function(key){
        return this.has(key)?this.items[key]:(void 0);
    },
    keys:function(){
        return Object.keys(this.items);
    },
    values:function(){
        return Object.values(this.items);
    },
    size:function(){
        return this.keys().length;
    },
    clear:function(){
        this.items = {};
    }
};