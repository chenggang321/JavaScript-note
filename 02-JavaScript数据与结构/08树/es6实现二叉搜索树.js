/**
 * 二叉搜索树:二叉查找树（Binary Search Tree），（又：二叉搜索树，二叉排序树）它或者是一棵空树，或者是具有下列性质的二叉树：
 * 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值； 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值；
 * 它的左、右子树也分别为二叉排序树。
 */
class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

class BSTree {
    constructor() {
        this.root = null;
    }

    // 插入节点
    insert(key) {
        let node = new Node(key);
        // 如果没有根节点则设置为根节点
        if (!this.root) {
            this.root = node;
        } else {
            let current = this.root;
            let parent;
            while (true) {
                parent = current;
                // 新节点key小于当前节点key
                if (key < current.key) {
                    // 将当前节点的左节点设置为当前节点
                    current = current.left;
                    // 直到当前节点没有左节点了则将新节点放入当前位置退出循环
                    if (!current) {
                        parent.left = node;
                        break;
                    }
                } else {
                    current = current.right;
                    if (!current) {
                        parent.right = node;
                        break;
                    }
                }
            }
        }
    }

    // 中序：先访问左子树，再访问根节点，最后访问右字数；以升序访问所有节点；（左==>根==>右）
    // 中序遍历 -- stack
    inOrder(node) {
        if (node) {
            this.inOrder(node.left);
            console.log(node.key);
            this.inOrder(node.right);
        }
    }

    /**
      * 中序遍历栈方式
      * 栈的中序遍历需要套两层循环，由于需要先输出左节点，必须向下查找直到左节点为空才能输出。
      * 1、如果栈顶元素非空且左节点存在，将其入栈，重复该过程。若不存在则进入第2步
      * 2、若栈非空，输出栈顶元素并出栈。判断刚出栈的元素的右节点是否存在，不存在重复第2步，存在则将右节点入栈，跳至第1步
      */
    inOderStack(node) {
        let stack = [];
        stack.push(node);
        while (stack.length) {
            while (stack[stack.length-1].left) {
                stack.push(stack[stack.length-1].left)
            }
            while (stack.length){
                let current = stack.pop();
                console.log(current.key);
                if(current.right){
                    stack.push(current.right);
                    break;
                }
            }
        }
    }

    // 先序：先访问根节点，然后以同样方式访问左子树和右子树；（根==>左==>右）
    // 先序遍历
    preOrder(node) {
        if (node) {
            console.log(node.key);
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    }

    /**
     * 前序遍历栈方式
     * 每次输出根节点，在输出左节点和右节点。步骤如下：
     * 1、若栈非空输出根节点，并出栈
     * 2、将右节点压栈（如果存在）
     * 3、将左节点压栈（如果存在）
     * 4、重复第1步直到栈空
     */
    preOderStack(node) {
        let stack = [];
        stack.push(node);
        while (stack.length) {
            node = stack.pop();
            console.log(node.key);
            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
        }
    }

    // 后序：先访问叶子节点，从左子树到右子树，再到根节点。（左==>右==>根）
    // 后序遍历
    postOrder(node) {
        if (node) {
            this.postOrder(node.left);
            this.postOrder(node.right);
            console.log(node.key);
        }
    }

    postOrderStack(node) {
        let stack = [];
        let storeStack = []; // 存储栈
        stack.push(node);
        while (stack.length) {
            let current = stack.pop();
            storeStack.push(current);
            if(current.left) stack.push(current.left);
            if(current.right) stack.push(current.right);
        }
        while (storeStack.length){
            let current = storeStack.pop();
            console.log(current.key);
        }
    }


    // 查找最小值
    getMin() {
        let current = this.root;
        while (current.left) {
            current = current.left
        }
        return current.key;
    }

    // 查找最大值
    getMax() {
        let current = this.root;
        while (current.right) {
            current = current.right
        }
        return current.key
    }

    // 查找
    find(key) {
        let currnet = this.root;
        while (currnet) {
            if (currnet.key === key) {
                return currnet;
            } else if (currnet.key < key) {
                currnet = currnet.right
            } else {
                currnet = currnet.left
            }
        }
        return null;
    }

    // 查找最小值
    getSmallest(node) {
        if (!node.left) {
            return node
        } else {
            return this.getSmallest(node.left)
        }
    }

    /**
     * 1.首先判断当前节点是否包含待删除的数据，如果包含，则删除该节点；如果不包含，
     *  则比较当前节点上的数据和待删除树的的大小关系。如果待删除的数据小于当前节点的数据，
     *  则移至当前节点的左子节点继续比较；如果大于，则移至当前节点的右子节点继续比较。
     * 2.如果待删除节点是叶子节点（没有子节点），那么只需要将从父节点指向它的链接指向变为null；
     * 3.如果待删除节点含有一个子节点，那么原本指向它的节点需要做调整，使其指向它的子节点；
     * 4.最后，如果待删除节点包含两个子节点，可以选择查找待删除节点左子树上的最大值或者查找其
     * 右子树上的最小值，这里我们选择后一种。
     */
    // 删除
    remove(key) {
        this.removeNode(this.root, key);
    }

    // 删除节点
    removeNode(node, key) {
        if (!node) {
            return null
        }
        if (key === node.key) {
            // 没有子节点
            if (!node.left && !node.right) {
                return null
            }
            // 没有左子节点
            if (!node.left) {
                return node.right
            }
            // 没有右子节点
            if (!node.right) {
                return node.left;
            }
            // 有两个子节点
            let tempNode = this.getSmallest(node.right);
            node.key = tempNode.key;
            node.right = this.removeNode(node.right, tempNode.key)
        } else if (key < node.key) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else {
            node.right = this.removeNode(node.right, key);
            return node
        }
    }
}

//测试代码
var tree = new BSTree();
tree.insert(23);
tree.insert(45);
tree.insert(16);
tree.insert(37);
tree.insert(3);
tree.insert(99);
tree.insert(22);
console.log(tree);
/**
 *  生成二叉搜索树：
 *
 *                              23
 *                          /      \
 *                      16          45
 *                     / \        /  \
 *                  3    22     37   99
 */
// 中序遍历
console.log("Inorder traversal: ");
tree.inOrder(tree.root); // 3 16 22 23 37 45 99
console.log("---------------------------------------------------");
tree.inOderStack(tree.root); // 3 16 22 23 37 45 99

// 先序遍历
console.log("Preorder traversal: ");
tree.preOrder(tree.root); // 23 16 3 22 45 37 99
console.log("---------------------------------------------------");
tree.preOderStack(tree.root);

// 后续遍历
console.log("Postorder traversal: ");
tree.postOrder(tree.root); // 3 22 16 37 99 45 23
console.log("---------------------------------------------------");
tree.postOrderStack(tree.root); // 3 22 16 37 99 45 23

// 最小值
console.log('min:' + tree.getMin());  // min : 3

//最大值
console.log('max:' + tree.getMax());  // max : 99

//查找不存在的值
console.log(tree.find(66));

//查找存在的值
console.log(tree.find(99));

//删除根节点
tree.remove(23);
console.log(tree);
tree.inOrder(tree.root); // 3 16 22 37 45 99

