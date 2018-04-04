/**
 * Created by HH_Girl on 2018/4/4.
 */
/*
* 栈（stack），它是一种运算受限的线性表,后进先出(LIFO)
* LIFO(last in first out)表示就是后进入的元素, 第一个弹出栈空间. 类似于自动餐托盘, 最后放上的托盘, 往往先把拿出去使用.
* 其限制是仅允许在表的一端进行插入和删除运算。这一端被称为栈顶，相对地，把另一端称为栈底。
* 向一个栈插入新元素又称作进栈、入栈或压栈，它是把新元素放到栈顶元素的上面，使之成为新的栈顶元素；
* 从一个栈删除元素又称作出栈或退栈，它是把栈顶元素删除掉，使其相邻的元素成为新的栈顶元素
* push(): 添加一个新元素到栈顶位置.
* pop()：移除栈顶的元素，同时返回被移除的元素。
* peek()：返回栈顶的元素，不对栈做任何修改（这个方法不会移除栈顶的元素，仅仅返回它）。
* isEmpty()：如果栈里没有任何元素就返回true，否则返回false。
* clear()：移除栈里的所有元素。
* size()：返回栈里的元素个数。这个方法和数组的length属性很类似。
* */
function Stack(){
    this.items = [];
}
Stack.prototype ={
    //进栈
    push : function(item){
        this.items.push(item);
    },
    //出栈
    pop : function () {
        return this.items.pop();
    },
    //返回栈顶元素
    peek : function () {
        return this.items[this.items.length - 1];
    },
    //栈中是否为空
    isEmpty : function () {
        return this.size() === 0;
    },
    //栈中元素个数
    size : function () {
        return this.items.length
    }
};

/*************************************应用：十进制转二进制***************************************/
function dec2bin(decNum){
    var stack = new Stack();
    var remainder;
    while (decNum > 0){
        remainder =decNum % 2;
        decNum = Math.floor(decNum / 2);
        stack.push(remainder);
    }
    var binayriString = '';
    while (!stack.isEmpty()){
        binayriString += stack.pop();
    }
    return binayriString
}
console.log(dec2bin(10));//1010