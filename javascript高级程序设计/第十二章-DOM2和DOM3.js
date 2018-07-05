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

function getViewport(){
    if (document.compatMode === "BackCompat"){
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
function getBoundingClientRect(element){
    var scrollTop = document.documentElement.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft;
    if (element.getBoundingClientRect){
        if (typeof arguments.callee.offset != "number"){
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
* */
var filter = {
    acceptNode: function(node){
        return node.tagName.toLowerCase() === "p" ?NodeFilter.FILTER_ACCEPT :
            NodeFilter.FILTER_SKIP;
    }
};
var iterator = document.createNodeIterator(root, NodeFilter.SHOW_ELEMENT,
    filter, false);

// TreeWalker
/*
* parentNode()
* firstChild()
* lastChild()
* nextSibling()
* previousSibling()
* */

var div = document.getElementById("div1");
var Filter = function(node){
    return node.tagName.toLowerCase() === "li"?
        NodeFilter.FILTER_ACCEPT :
        NodeFilter.FILTER_SKIP;
};
var walker= document.createTreeWalker(div, NodeFilter.SHOW_ELEMENT,
    Filter, false);
var node = iterator.nextNode();
while (node !== null) {
    alert(node.tagName); //?????
    node = iterator.nextNode();
}