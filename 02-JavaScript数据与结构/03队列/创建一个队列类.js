/**
 * Created by HH_Girl on 2018/4/4.
 */
/*
* 队列(Queue)，它是一种运算受限的线性表,先进先出(FIFO First In First Out)
* 队列是一种受限的线性结构
* 受限之处在于它只允许在表的前端（front）进行删除操作，而在表的后端（rear）进行插入操作
* enqueue(element)：向队列尾部添加一个（或多个）新的项。
* dequeue()：移除队列的第一（即排在队列最前面的）项，并返回被移除的元素。
* front()：返回队列中第一个元素——最先被添加，也将是最先被移除的元素。
*   队列不做任何变动（不移除元素，只返回元素信息——与Stack类的peek方法非常类似）。
* isEmpty()：如果队列中不包含任何元素，返回true，否则返回false。
* size()：返回队列包含的元素个数，与数组的length属性类似。
* */

function Queue(){
    this.items = [];
}
Queue.prototype = {
    //进队
    enqueue:function (item) {
        this.items.push(item);
    },
    //出队
    dequeue:function(){
        return this.items.shift();
    },
    //查看将要出队的元素
    front:function () {
        return this.items[0]
    },
    //查看队列是否为空
    isEmpty:function(){
        return this.items.length === 0
    },
    //查看队列中元素个数
    size:function(){
        return this.items.length;
    }
};