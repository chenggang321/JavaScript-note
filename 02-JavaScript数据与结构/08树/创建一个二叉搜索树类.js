/**
 * Created by HH_Girl on 2018/4/10.
 */
//创建BinarySearchTree
function BinarySearchTree(){
    //保存根的属性
    this.root = null;
}
BinarySearchTree.prototype={
  //向树中插入数据
    insert:function(key){
       //根据key创建对应的node
        var newNode = new Node(key);
        //判断根节点是否有值
        if(this.root === null){
            this.root = newNode;
        }else{
            this.insertNode(this.root,newNode);
        }
    },
    //插入节点
    insertNode:function(node,newNode){
        //if(!(newNode.key&&node)) return;
        if(newNode.key < node.key){//向左子树插入数据
            if(node.left === null){//左子树没有内容
                node.left = newNode;
            }else{//左子树已经有了内容
                this.insertNode(node.left,newNode);
            }
        }else{//向右子树插入数据
            if(node.right === null){//node的右子树没有内容
                node.right = newNode;
            }else{//右子树上有内容
                this.insertNode(node.right,newNode);
            }
        }
    },
    //获取最大值和最小值
    min:function(){
        var node = this.root;
        while(node.left !== null){
            node = node.left;
        }
        return node.key;
    },
    max:function(){
        var node = this.root;
        while(node.right!==null){
            node = node.right;
        }
        return node.key;
    },
    //搜索特定值
    search:function(key){
        var node = this.root;
        while(node !== null){
            if(node.key > key){
                node = node.left;
            }else if(node.key < key){
                node = node.right;
            }else{
                return true;
            }
        }
    },
    //删除节点
    remove:function(key){
        //临时保存变量
        var current = this.root;
        var parent = this.root;
        var isLeftChild = true;
        //查找节点
        while(current.key !== key){
            parent = current;
            if(key < current.key){
                isLeftChild = true;
                current = current.left;
            }else{
                isLeftChild = false;
                current = current.right;
            }
            if(current === null) return false;
        }
        //删除的节点是叶节点
        if(current.left === null&&current.right === null){
            if(current === this.root){
                this.root = null;
            }else if(isLeftChild){
                parent.left = null;
            }else{
                parent.right = null;
            }
        }else if(current.right === null){//删除有一个子节点的节点
            if(current === this.root){
                this.root = current.left;
            }else if(isLeftChild){
                parent.left = current.left;
            }else{
                parent.right = current.left;
            }
        }else if(current.left === null){
            if(current === this.root){
                this.root = current.right;
            }else if(isLeftChild){
                parent.left = current.right;
            }else{
                parent.right = current.right;
            }
        }else{//删除有两个节点的节点
            //获取后继节点
            var successor = this.getSuccessor(current);
            //判断是否是根节点
            if(current === this.root){
                this.root = successor;
            }else if(isLeftChild){
                parent.left = successor;
            }else{
                parent.right = successor;
            }
            //删除节点的左子树赋值给successor
            successor.left = current.left;
        }
        return true;
    },
    getSuccessor:function(delNode){
       //使用变量保存临时的节点
        var successorParent = delNode;
        var successor = delNode;
        var current = delNode.right;//要从右子树查找
        //寻找节点
        while(current !== null){
            successorParent = successor;
            successor = current;
            current = current.left;
        }
        if(successor !== delNode.right){
            successorParent.left = successorParent.right;
            successor.right = delNode.right;
        }
    },
    //先序遍历
    preOrderTraversal:function(handler){
        this.preOrderTranversalNode(this.root,handler);
    },
    preOrderTranversalNode:function(node,handler){
        if(node !== null){
            handler(node.key);
            this.preOrderTranversalNode(node.left,handler);
            this.preOrderTranversalNode(node.right,handler)
        }
    },
    //中序遍历
    inOrderTraversal:function(handler){
        this.preOrderTranversalNode(this.root,handler);
    },
    inOrderTranversalNode:function(node,handler){
        if(node !== null){
            this.inOrderTranversalNode(node.left,handler);
            handler(node.key);
            this.inOrderTranversalNode(node.right,handler)
        }
    },
    //后序遍历
    postOrderTraversal:function(handler){
        this.preOrderTranversalNode(this.root,handler);
    },
    postOrderTranversalNode:function(node,handler){
        if(node !== null){
            this.postOrderTranversalNode(node.left,handler);
            this.postOrderTranversalNode(node.right,handler);
            handler(node.key);
        }
    }
};

//创建节点类
function Node(key){
    this.key = key;
    this.left = null;
    this.right = null;
}

//测试代码
var tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);
console.log(tree);