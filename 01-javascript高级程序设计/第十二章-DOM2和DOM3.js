// dom 变化
// 访问元素的样式
// style
// dom 2 添加的属性和方法
/*
* cssText 访问style特性中的css代码
* length css属性个数
* parentRule 表示CSS信息的CSSRule对象
* getPropertyCSSValue(propertyName) 返回包含给定属性的CSSValue对象
* getPropertyPriority(propertyName) 如果给定了！important返回important 否则返回空字符串
* getPropertyValue(propertyName) 给定属性的字符串值
* item(index) 返回给定位置的CSS属性名称
* removeProperty(propertyName) 从样式中删除给定属性
*  setProperty(propertyName,value,priority) 将给定属性设置为相应的值，并加上优先级标志
*  （important 或一个空字符串）
* */

// getComputedStyle() 获取style和从css中设置的样式

// 操作样式表

// 元素大小

// 偏移量
/*
* offsetHeight()(边框、内边距、内容)
* offsetWidth()
* offsetLeft()
* offsetTop()
* */
/*
* 所有这些偏移量属性都是只读的，而且每次访问都要重新计算。因此尽量避免重复访问这些值
* */

// 客户区大小
/*
* clientWidth(内容+内边距)
* clientHeight
* */

function getViewport() {
    if (document.compatMode === "BackCompat") {
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        };
    } else {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        };
    }
}

// 与偏移量相似，客户区打小也是只读的，每次访问要重新计算

// 滚动大小（包含滚动内容的元素大小）隐藏部分也包含在内
/*
* scrollHeight()
* scrollWidth()
* scrollLeft() 改变滚动位置
* scrollTop()
* */
// 文档总高度
var docHeight = Math.max(document.documentElement.scrollHeight,
    document.documentElement.clientHeight);
var docWidth = Math.max(document.documentElement.scrollWidth,
    document.documentElement.clientWidth);

// 获取元素大小（跨浏览器）
function getBoundingClientRect(element) {
    var scrollTop = document.documentElement.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft;
    if (element.getBoundingClientRect) {
        if (typeof arguments.callee.offset != "number") {
            var temp = document.createElement("div");
            temp.style.cssText = "position:absolute;left:0;top:0;";
            document.body.appendChild(temp);
            arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
            document.body.removeChild(temp);
            temp = null;
        }
        var rect = element.getBoundingClientRect();
        var offset = arguments.callee.offset;
        return {
            left: rect.left + offset,
            right: rect.right + offset,
            top: rect.top + offset,
            bottom: rect.bottom + offset
        };
    } else {
        var actualLeft = getElementLeft(element);
        var actualTop = getElementTop(element);
        return {
            left: actualLeft - scrollLeft,
            right: actualLeft + element.offsetWidth - scrollLeft,
            top: actualTop - scrollTop,
            bottom: actualTop + element.offsetHeight - scrollTop
        }
    }
}

// 遍历
// document.createNodeIterator()
// NodeIterator
/*
* root 想作为搜索起点的树中的节点
* whatToShow:表示要访问哪些节点的数字代码
* filter:是一个NodeFilter对象，或者表示应该接受还是拒绝特定节点的函数
* entityReferenceExpansion：布尔值是否要扩展实体引用
* whatToShow：参数是一个位掩码 常量类容定义在NodeFilter中
*   NodeFilter.SHOW_ALL 所有节点
*   NodeFilter.SHOW_ELEMENT 元素节点
*   NodeFilter.SHOW_ATTRIBUTE 特性节点 dom不能使用
*   NodeFilter.SHOW_TEXT 文本节点
*   NodeFilter.SHOW_COMMENT 注释节点
*   NodeFilter.SHOW_DOCUMENT 文档节点
*   NodeFilter.SHOW_DOCUMENT_TYPE 文档类型节点
*   nextNode()
*   previousNode()
* */
// 插入测试dom
var html = `
<div id="div1">
    <p><b>Hello</b> world!</p>
    <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
    </ul>
</div>
`
document.body.innerHTML = html
/*var root = document
var filter = {
    acceptNode: function(node){
        return node.tagName.toLowerCase() === "p" ?
            NodeFilter.FILTER_ACCEPT :
                NodeFilter.FILTER_SKIP;
    }
};
var iterator = document.createNodeIterator(root, NodeFilter.SHOW_ELEMENT,
    filter, false);

console.log(iterator.nextNode())
console.log(iterator.previousNode())*/
var div = document.getElementById('div1')
var iterator = document.createNodeIterator(div, NodeFilter.SHOW_ELEMENT, null, false)
var node = iterator.nextNode()
while (node !== null) {
    console.log(node.tagName)
    node = iterator.nextNode()
}

// TreeWalker
/*
* parentNode()
* firstChild()
* lastChild()
* nextSibling()
* previousSibling()
* */

var div2 = document.getElementById("div1");
var walker = document.createTreeWalker(div2, NodeFilter.SHOW_ELEMENT,
    null, false);
walker.firstChild(); // 到p
walker.nextSibling(); // 到ul
var node2 = walker.firstChild(); // 第一个li
while (node2 !== null) {
    console.log(node2.tagName); //输出标签名
    node2 = walker.nextSibling();
}

// dom中的范围
// 检测 是否支持dom2
var supportsRange = document.implementation.hasFeature("Range", "2.0");
var alsoSupportsRange = (typeof document.createRange === "function");
// 创建
// var range = document.createRange();
// 方法
/*
* startContainer 包含范围的起点
* startOffset 范围在startContainer中起点的偏移量
* endContainer 包含范围终点的节点
* endOffset 范围在endContainer中终点的偏移量
* commonAncestorContainer startContainer、endContainer共同祖先在文档树中位置最深的那个
* */

// 用都没范围实现简单选择
/*
* selectNode() 整个节点
* selectNodeContents() 节点的子节点
* 接收一个dom节点，用节点中的信息填充范围
* */
var range1 = document.createRange(),
range2 = document.createRange();
range1.selectNode(div2)
range2.selectNodeContents(div2)
console.log(range1,range2)
// 方法
/*
* setStartBefore(refNode)
* setStartAfter(refNode)
* setEndBefore(refNode)
* setEndAfter(refNode)
* */

// 用dom范围实现复杂选择
/*
*  setStart()
*  setEnd()
*  接收节点和偏移量值，setStart节点变成startContainer 偏移量变成startOffset  setEnd类似
* */

// 操作DOM范围中的内容

/*
* deleteContents() 删除
* extractContents() 删除并返回删除值
* cloneContents() 创建对象复本
* insertNode() 插入
* */

// 折叠DOM范围
//  collapse()

// 比较DOM范围
// compareBoundaryPoints()
/*
*  Range.START_TO_START(0)
*  Range.START_TO_END(1)
*  Range.END_TO_END(2)
*  Range.END_TO_START(3)
* */

// 复制DOM范围
//  cloneRange()

// 清除DOM范围
// detach()


