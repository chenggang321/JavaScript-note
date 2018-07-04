// DOM（文档对象模型）
/*
* 是针对HTML和XML文档的一个API（应用程序编程接口）。dom描绘了一个层次化的节点树，允许开发人员
* 添加、移除和修改页面的某一部分。dom脱胎于DHTML（动态HTML）。
* */

// node类型
// nodeType
/*
Node.ELEMENT_NODE (1)
Node.ATTRIBUTE_NODE (2)
Node.TEXT_NODE (3)
Node.CDATA_SECTION_NODE (4)
Node.ENTITY_REFERENCE_NODE (5)
Node.ENTITY_NODE (6)
Node.PROCESSING_INSTRUCTION_NODE (7)
Node.COMMENT_NODE (8)
Node.DOCUMENT_NODE (9)
Node.DOCUMENT_TYPE_NODE (10)
Node.DOCUMENT_FRAGMENT_NODE (11)
Node.NOTATION_NODE (12)
*/
// nodeName(标签名) nodeValue（null）

// node 节点之间的关系
/*
* parentNode 父节点
* childNodes 子节点
* firstChild 第一个子节点
* lastChild  最后一个子节点
* nextSibling 下一个子节点
* previousSibling 上一个子节点
* */
/*
* hasChildNodes()
* */

// 操作节点
/*
* appendChild() 向childNodes列表的末尾添加一个节点
* insertBefore() 要插入的节点和作为参照的节点如果参照节点为null则和appendChild()一样
* replaceChild() 替换节点
* removeChild() 移除节点
* cloneNode() 复制节点
* normalize() 处理文档树中的文本节点
* */

// Document
/*
* nodeType 9
* nodeName #document
* nodeValue null
* parentNode null
* ownerDocument null
* */
// 文档信息
// 查找元素
/*
* document.getElementById() 通过ID
* document.getElementsByTagName() 通过标签名
* document.getElementByName() 通过name属性值
* */

// DOM一致性检测
// 文档写入
/*
* write()
* writeln()
* open()
* close()
* */

// Element
/*
* nodeType:1
* nodeName的值为元素的标签名
* nodeValue null
* parentNode Document 或 Element
* */
//  html 元素
/*
* id,元素文档中的唯一标识符
* title,有关元素的附加说明信息
* lang,元素内容的语言代码，很少使用
* dir,语言的方向，很少使用
* className,与元素的class特性对应，即为元素指定Css类
* */
// 取得特性
/*
*getAttribute()
*setAttribute()
*removeAttribute()
* */

// 创建元素
/*
* document.createElement()
* */

// 元素的子节点（childNodes）

// text类型
