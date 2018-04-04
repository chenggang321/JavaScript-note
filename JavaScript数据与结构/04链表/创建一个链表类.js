/**
 * Created by HH_Girl on 2018/4/4.
 */
/*
 * 链表
 * 要存储多个元素, 另外一个选择就是使用链表.
 * 但不同于数组, 链表中的元素在内存中不必是连续的空间.
 * 链表的每个元素由一个存储元素本身的节点和一个指向下一个元素的引用(有些语言称为指针或者链接)组成.
 * 相对于数组, 链表有一些优点:
 * 内存空间不是比是连续的. 可以充分利用计算机的内存. 实现灵活的内存动态管理.
 * 链表不必在创建时就确定大小, 并且大小可以无限的延伸下去.
 * 链表在插入和删除数据时, 时间复杂度可以达到O(1). 相对数组效率高很多.
 * 相对于数组, 链表有一些缺点:
 * 链表访问任何一个位置的元素时, 都需要从头开始访问.(无法跳过第一个元素访问任何一个元素).
 * 无法通过下标直接访问元素, 需要从头一个个访问, 直到找到对应的问题.
 * */
;(function () {
    //链表类
    function LinkedList() {
        this.length = 0;
        this.head = null;
    }

    LinkedList.prototype = {
        //链表尾部追加元素方法
        append: function (element) {
            //1.根据新元素创建节点
            var newNode = new Node(element);
            //2.判断原来链表是否为空
            if (this.head === null) {//链表为空
                this.head = newNode;
            } else {//链表不为空
                //2.1定义变量，保存当前找到的节点
                var current = this.head;
                while (current.next) {
                    current = current.next;
                }
                //2.2找到最后一项，将next赋值为node
                current.next = newNode;
            }
            //3.链表长度加1
            this.length++;
        },
        //链表的toString方法
        toString: function () {
            //1.定义两个变量
            var current = this.head;
            var listString = '';
            //2.循环获取链表中所有的元素
            while (current) {
                listString += ',' + current.element;
                current = current.next;
            }
            //3.返回最终结果
            return listString.slice(1);
        },
        //插入
        insert: function (position,element) {
            //1.检测越界问题：越界插入失败
            if(position<0||position>this.length) return false;
            //2.定义变量，保存信息
            var newNode = new Node(element);
            var current = this.head;
            var previous = null;
            var index = 0;
            //3.判断是否是在链表第一个位置插入
            if(position === 0){
                newNode.next = this.head;
                this.head = newNode;
            }else{
                while(index++<position){
                    previous = current;
                    current = current.next;
                }
                newNode.next = current;
                previous.next =newNode;
            }
            //4.length+1
            this.length++
        },
        //移除节点
        removeAt:function(position){
            //1.检测越界问题：越界移除失败，返回null
            if(position<0||position>=this.length) return null;
            //2.定义变量，保存信息
            var current = this.head;
            var previous = null;
            var index = 0;
            //3.判断是否是移除第一项
            if(position === 0){
                this.head = current.next;
            }else{
                while (index++<position){
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            //4.length -1
            this.length--;
            //5.返回移除的数据
            return current.element;
        },
        //根据元素获取链表中的位置
        indexOf:function(element){
            //1.定义变量，保存信息
            var current = this.head;
            var index = 0;
            //2.找到元素所在的位置
            while (current) {
                if(current.element === element){
                    return index;
                }
                index++;
                current = current.next;
            }
            //3.没找到，反回-1
            return -1;
        },
        //根据元素删除信息
        remove:function (element) {
            var index = this.indexOf(element);
            return this.removeAt(index)
        },
        //判断链表是否为空
        isEmpty:function () {
            return this.length === 0;
        },
        //获取链表的长度
        size:function(){
            return this.length;
        },
        //获取第一个节点
        getFirst:function(){
            return this.head.element;
        }
    };

    //节点类
    function Node(element) {
        this.element = element;
        this.next = null;
    }
    /***********************************测试链表*********************************/
    var list = new LinkedList();
    list.append(15);
    list.append(10);
    list.append(20);
    console.log(list.toString());//15,10,20

    list.insert(0, 100);
    list.insert(4, 200);
    list.insert(2, 300);
    console.log(list.toString());//100,15,300,10,20,200

    list.removeAt(0);
    list.removeAt(1);
    list.removeAt(3);
    console.log(list.toString());//15,10,20

    console.log(list.indexOf(15));//0
    console.log(list.indexOf(10));//1
    console.log(list.indexOf(20));//2
    console.log(list.indexOf(100));//-1

    list.remove(15);
    console.log(list.toString());//10,20

    console.log(list.isEmpty());//false
    console.log(list.size());//2
    console.log(list.getFirst());//10
})();