/**
 * Created by HH_Girl on 2018/4/4.
 */
/*
* 集合的特点
* 集合通常是由一组无序的, 不能重复的元素构成.
* 和数学中的集合名词比较相似, 但是数学中的集合范围更大一些,
*  也允许集合中的元素重复.
* 在计算机中, 集合通常表示的结构中元素是不允许重复的.
* 看成一种特殊的数组
* 其实集合你可以将它看成一种特殊的数组.
* 特殊之处在于里面的元素没有顺序, 也不能重复.
* 没有顺序意味着不能通过下标值进行访问,
*   不能重复意味着相同的对象在集合中只会存在一份.
* */
//集合类
function Set(){
    this.items = {};//保存集合元素
}
Set.prototype = {
    //判断集合中是否有某个元素
    has:function(value){
        return this.items.hasOwnProperty(value);
    },
    //向集合中添加元素
    add:function(value){
        //1.判断集合中是否已经包含了该元素
        if(this.has(value)) return false;
        //2.将元素添加到集合中
        this.items[value] = value;
        return true;
    },
    //从集合中删除某个元素
    remove:function (value) {
        //判断集合中是否包含该元素
        if(!this.has(value)) return false;

        //包含，就清除该元素
        delete this.items[value];
        return true;
    },
    //清空集合中所有的元素
    clear:function(){
        this.items = {};
    },
    //获取集合的大小
    size:function(){
        return Object.keys(this.items).length;
    },
    //获取集合中所有的值
    values:function(){
        return Object.keys(this.items)
    }
};
