function Tree(){
    this.root = new Node();
}
Tree.prototype={
    buildTree:function(node,i,data){
        var leftIndex = 2*i+1;//左孩子节点的索引
        var rightIndex = 2*i+2;//右孩子节点的索引
        if(leftIndex < data.length){//判断索引长度是否超过了data数组的大小
            var leftChildNode = new Node();//创建一个新的节点对象
            leftChildNode.text = data[leftIndex];//给节点赋值
            node.leftChild = leftChildNode;//将当前节点加入左孩子节点
            this.buildTree(leftChildNode,leftIndex,data);//递归创建左孩子
        }
        if(rightIndex < data.length){
            var rightChildNode = new Node();//创建一个新的节点对象
            rightChildNode.text = data[rightIndex];//给节点赋值
            node.rightChild = rightChildNode;//将当前节点加入右孩子节点
            this.buildTree(rightChildNode,rightIndex,data);//递归创建右孩子
        }
    }
};
function Node(){
    this.text = '';
    this.leftChild = null;
    this.rightChild = null;
}
var charecters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var tree = new Tree();
var root = tree.root;
root.text = 'A';
tree.buildTree(root,0,charecters);
console.log(tree);