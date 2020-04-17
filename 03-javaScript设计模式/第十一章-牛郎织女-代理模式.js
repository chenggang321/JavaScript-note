/**
 * Created by HH_Girl on 2018/2/5.
 */
/*
* 代理模式：由于一个对象不能直接引用另一个对象，
* 所以需要通过代理对象在这两个对象之间起到中介
* 作用
*
* 代理模式可以解决避免对一些对象的直接访问，以此为基础，常见的有保护代理和虚拟代理。
* 保护代理可以在代理中直接拒绝对对象的访问；虚拟代理可以延迟访问到真正需要的时候，
* 以节省开销。
*
* 优缺点
* 代理模式有高度解耦、对象保护、易修改等优点。同时也会造成开销大，时间慢。
*
* 归纳一下，代理模式可以解决以下的问题：
* 增加对一个对象的访问控制
* 当访问一个对象的过程中需要增加额外的逻辑
* */

// 代理模式实现方法
/**
 *
 * 要实现代理模式需要三部分：
 *
 * Real Object：真实对象
 * Proxy：代理对象
 * interface：接口
 *
 * Real Object 和 Proxy都需要实现的接口，这样Proxy才能被当成Real Subject的“替身”使用
 */

// 利用代理模式实现图片懒加载
const myImage = {
    setSrc(imgNode, src) {
        imgNode.src = src;
    }
}

const proxyImage = {
    setSrc(imgNode, src) {
        // 设置占位图
        myImage.setSrc(imgNode, './MLCS_banner.png');
        // 加载真正需要的图片
        let img = new Image();
        img.src = src;
        // 完成加载后，更新数据
        img.onload = () => {
            myImage.setSrc(imgNode, src);
        };
    }
}

/*let imgNode = document.createElement("img"),
    imgSrc = "http://www.anlle.com/templets/default/newimages/banner01.png";
document.body.appendChild(imgNode);

proxyImage.setSrc(imgNode, imgSrc);*/

// es6代理模式
/**
 * 系统菜单
 */
class SysMenu {
    /**
     * 构造函数
     * @param {Number} id 菜单 id
     * @param {String} name 显示的名称
     * @param {Number} parent 父级菜单 id
     */
    constructor(id, name, parent) {
        this.id = id
        this.name = name
        this.parent = parent
    }
}
/**
 * 系统权限
 */
class SysPermission {
    /**
     * 构造函数
     * @param {String} uid 系统唯一 uuid
     * @param {String} label 显示的菜单名
     * @param {String} parentId 父级权限 uid
     */
    constructor(uid, label, parentId) {
        this.uid = uid
        this.label = label
        this.parentId = parentId
    }
}

/*const sysMenuMap = new Map().set('parentId', 'parent')
const sysMenu = new Proxy(new SysMenu(1, 'rx', 0), {
    get(_, k) {
        if (sysMenuMap.has(k)) {
            return Reflect.get(_, sysMenuMap.get(k))
        }
        return Reflect.get(_, k)
    },
})
console.log(sysMenu.id, sysMenu.name, sysMenu.parentId) // 1 'rx' 0

const sysPermissionMap = new Map().set('id', 'uid').set('name', 'label')
const sysPermission = new Proxy(new SysPermission(1, 'rx', 0), {
    get(_, k) {
        if (sysPermissionMap.has(k)) {
            return Reflect.get(_, sysPermissionMap.get(k))
        }
        return Reflect.get(_, k)
    },
})
console.log(sysPermission.id, sysPermission.name, sysPermission.parentId) // 1 'rx' 0*/

/**
 * 桥接对象不存在的字段
 * @param {Object} map 代理的字段映射 Map
 * @returns {Function} 转换一个对象为代理对象
 */
function bridge(map) {
    /**
     * 为对象添加代理的函数
     * @param {Object} obj 任何对象
     * @returns {Proxy} 代理后的对象
     */
    return function(obj) {
        return new Proxy(obj, {
            get(target, k) {
                if (Reflect.has(map, k)) {
                    return Reflect.get(target, Reflect.get(map, k))
                }
                return Reflect.get(target, k)
            },
            set(target, k, v) {
                if (Reflect.has(map, k)) {
                    Reflect.set(target, Reflect.get(map, k), v)
                    return true
                }
                Reflect.set(target, k, v)
                return true
            },
        })
    }
}

const sysMenu = bridge({
    parentId: 'parent',
})(new SysMenu(1, 'rx', 0))
sysMenu.id = 2;
console.log(sysMenu.id, sysMenu.name, sysMenu.parentId) // 1 'rx' 0

const sysPermission = bridge({
    id: 'uid',
    name: 'label',
})(new SysPermission(1, 'rx', 0));
sysPermission.id = 3;
console.log(sysPermission.id, sysPermission.name, sysPermission.parentId) // 1 'rx' 0

/**
 * 基本的 Node 节点结构定义接口
 * @interface
 */
class INode {
    /**
     * 构造函数
     * @param {Object} [options] 可选项参数
     * @param {String} [options.id] 树结点的 id 属性名
     * @param {String} [options.parentId] 树结点的父节点 id 属性名
     * @param {String} [options.child] 树结点的子节点数组属性名
     * @param {String} [options.path] 树结点的全路径属性名
     * @param {Array.<Object>} [options.args] 其他参数
     */
    constructor({ id, parentId, child, path, ...args } = {}) {
        /**
         * @field 树结点的 id 属性名
         */
        this.id = id
        /**
         * @field 树结点的父节点 id 属性名
         */
        this.parentId = parentId
        /**
         * @field 树结点的子节点数组属性名
         */
        this.child = child
        /**
         * @field 树结点的全路径属性名
         */
        this.path = path
        Object.assign(this, args)
    }
}

/**
 * 将列表转换为树节点
 * 注：该函数默认树的根节点只有一个，如果有多个，则返回一个数组
 * @param {Array.<Object>} list 树节点列表
 * @param {Object} [options] 其他选项
 * @param {Function} [options.isRoot] 判断节点是否为根节点。默认根节点的父节点为空
 * @param {Function} [options.bridge=returnItself] 桥接函数，默认返回自身
 * @returns {Object|Array.<String>} 树节点，或是树节点列表
 */
function listToTree(
    list,
    { isRoot = node => !node.parentId, bridge = returnItself } = {},
) {
    const res = list.reduce((root, _sub) => {
        if (isRoot(sub)) {
            root.push(sub)
            return root
        }
        const sub = bridge(_sub)
        for (let _parent of list) {
            const parent = bridge(_parent)
            if (sub.parentId === parent.id) {
                parent.child = parent.child || []
                parent.child.push(sub)
                return root
            }
        }
        return root
    }, [])
    // 根据顶级节点的数量决定如何返回
    const len = res.length
    if (len === 0) return {}
    if (len === 1) return res[0]
    return res
}

/**
 * 返回第一个参数的函数
 * 注：一般可以当作返回参数自身的函数，如果你只关注第一个参数的话
 * @param {Object} obj 任何对象
 * @returns {Object} 传入的第一个参数
 */
function returnItself(obj) {
    return obj
}
/**
 * 遍历并映射一棵树的每个节点
 * @param {Object} root 树节点
 * @param {Object} [options] 其他选项
 * @param {Function} [options.before=returnItself] 遍历子节点之前的操作。默认返回自身
 * @param {Function} [options.after=returnItself] 遍历子节点之后的操作。默认返回自身
 * @param {Function} [options.paramFn=(node, args) => []] 递归的参数生成函数。默认返回一个空数组
 * @returns {INode} 递归遍历后的树节点
 */
function treeMapping(
    root,
    {
        before = returnItself,
        after = returnItself,
        paramFn = (node, ...args) => [],
    } = {},
) {
    /**
     * 遍历一颗完整的树
     * @param {INode} node 要遍历的树节点
     * @param  {...Object} [args] 每次递归遍历时的参数
     */
    function _treeMapping(node, ...args) {
        // 之前的操作
        let _node = before(node, ...args)
        const childs = _node.child
        if (!childs || childs.length == 0) {
            return _node
        }
        // 产生一个参数
        const len = childs.length
        for (let i = 0; i < len; i++) {
            childs[i] = _treeMapping(childs[i], ...paramFn(_node, ...args))
        }
        // 之后的操作
        return after(_node, ...args)
    }
    return _treeMapping(root)
}

const tree = {
    uid: 1,
    childrens: [
        {
            uid: 2,
            parent: 1,
            childrens: [{ uid: 3, parent: 2 }, { uid: 4, parent: 2 }],
        },
        {
            uid: 5,
            parent: 1,
            childrens: [{ uid: 6, parent: 5 }, { uid: 7, parent: 5 }],
        },
    ],
}
// 桥接函数
/*const treeBridge = bridge({
    id: 'uid',
    parentId: 'parent',
    child: 'childrens',
})
treeMapping(tree, {
    // 进行桥接抹平差异
    before: treeBridge,
    // 之后打印每一个
    after(node) {
        console.log(node)
    },
})*/

/**
 * 将树节点转为树节点列表
 * @param {Object} root 树节点
 * @param {Object} [options] 其他选项
 * @param {Boolean} [options.calcPath=false] 是否计算节点全路径，默认为 false
 * @param {Function} [options.bridge=returnItself] 桥接函数，默认返回自身
 * @returns {Array.<Object>} 树节点列表
 */
function treeToList(
    root,
    { calcPath = false, bridge = returnItself } = {},
) {
    const res = []
    treeMapping(root, {
        before(_node, parentPath) {
            const node = bridge(_node)
            // 是否计算全路径
            if (calcPath) {
                node.path = (parentPath ? parentPath + ',' : '') + node.id
            }
            // 此时追加到数组中
            res.push(node)
            return node
        },
        paramFn: node => (calcPath ? [node.path] : []),
    })
    return res
}

const fn = bridge({
    id: 'uid',
    parentId: 'parent',
    child: 'childrens',
})
const list = treeToList(tree, {
    bridge: fn,
})
console.log(list)