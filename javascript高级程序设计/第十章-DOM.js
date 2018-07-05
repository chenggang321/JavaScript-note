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
/*
* nodeType 3
* nodeName #text
* nodeValue 节点所包含的文本
* parentNode Element
* appendData(text) 将text添加到节点末尾
* deleteData（offset，count）从offset指定位置删除count个字符
* insertData（offset,text）在offset指定的位置插入text
* replaceData（offset，count，text）用text替换从offset指定位置到offset+count为止处的文本
* splitText(offset) 从offset指定位置将当前文本节点分成两个文本节点
* substringData(offset,count) 提取从offset指定位置开始到offset+count为止处的字符串
* */
// 创建文本节点
/*
* document.createTextNode()
* */

// 规范化文本节点（normalize()）
/*
* 将所有文本节点合并成一个节点，结果节点的nodeValue等于合并前每个文本节点的nodeValue值拼
* 起来的值
* */

// 分割文本节点 （splitText()） 与 normalize()相反

// Comment 类型
/*
* nodeType 8
* nodeName #comment
* nodeValue 注释的内容
* parentNode Document或Element
* */
// 创建 document.createComment()

// CDATASection 类型
/*
* nodeType 4
* nodeName #cdata-section
* nodeValue CDATA 区域的内容
* parentNode 可能是Document 或 Element
* */

// DocumentType类型
/*
* nodeType 10
* nodeName doctype的名称
* nodeValue null
* parentNode Document
* */

// DocumentFragment 类型
/*
* nodeType 11
* nodeName #document-fragment
* nodeValue null
* parentNode null
* */

// 创建 document.createDocumentFragment()

// Attr类型
/*
* nodeType 2
* nodeName 特性的名称
* nodeValue 特性的值
* parentNode null
* */
// 创建 document.createAttribute()
/*
* 不建议直接访问特性节点。实际上，使用getAttribute(),setAttribute()和removeAttribute()
* 方法远比操作特性节点方便
* */

// DOM操作技术
// 动态添加脚本
function loadScript(url){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
}
// 动态添加代码
function loadScriptString(code){
    var script = document.createElement("script");
    script.type = "text/javascript";
    try {
        script.appendChild(document.createTextNode(code));
    } catch (ex){
        script.text = code;
    }
    document.body.appendChild(script);
}
// 动态添加样式表
function loadStyles(url){
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
}
// 动态添加css
function loadStyleString(css){
    var style = document.createElement("style");
    style.type = "text/css";
    try{
        style.appendChild(document.createTextNode(css));
    } catch (ex){
        style.styleSheet.cssText = css;
    }
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
}
/*
* 如果专门针对IE编写代码，务必小心使用styleSheet.cssText属性。在重用同一个<style>元素
* 并再次设置这个属性时，有可能会导致浏览器奔溃。同样，将cssText属性设置为空字符串也可
* 能导致浏览器奔溃
* */

// 操作表格
// 创建表格
/*
html 创建
<table border="1" width="100%">
    <tbody>
        <tr>
            <td>Cell 1,1</td>
            <td>Cell 2,1</td>
        </tr>
        <tr>
            <td>Cell 1,2</td>
            <td>Cell 2,2</td>
        </tr>
    </tbody>
</table>
* */
// 核心dom创建
//创建 table
var table = document.createElement("table");
table.border = '1';
table.width = "100%";
//创建 tbody
var tbody = document.createElement("tbody");
table.appendChild(tbody);

//创建 第一行
var row1 = document.createElement("tr");
tbody.appendChild(row1);
var cell1_1 = document.createElement("td");
cell1_1.appendChild(document.createTextNode("Cell 1,1"));
row1.appendChild(cell1_1);
var cell2_1 = document.createElement("td");
cell2_1.appendChild(document.createTextNode("Cell 2,1"));
row1.appendChild(cell2_1);

//创建 第二行
var row2 = document.createElement("tr");
tbody.appendChild(row2);
var cell1_2 = document.createElement("td");
cell1_2.appendChild(document.createTextNode("Cell 1,2"));
row2.appendChild(cell1_2);
var cell2_2= document.createElement("td");
cell2_2.appendChild(document.createTextNode("Cell 2,2"));
row2.appendChild(cell2_2);

//将表格添加到文档主体中
document.body.appendChild(table);

// HTMLDOM
/*
* 为table元素添加的属性和方法
* caption <caption>元素的指针
* tBodies 是一个<tbody>元素的HTMLCollection
* tFoot tfoot元素指针
* tHead thead元素指针
* rows 表格中所有行的HTMLCollection
* createThead() 创建thead
* createTFoot() 创建tfoot
* createCaption() 创建caption
* deleteThead() 删除thead
* deleteTFoot() 删除tfood
* deleteRow(pos) 删除指定位置行
* insertRow(pos) 向rows集合中的指定位置插入一行
* 为tbody元素添加的属性和方法
* rows 保存着tbody元素中行的HTMLCollection
* deleteRow(pos) 删除指定行
* insertRow(pos) 向rows集合中的指定位置插入一行，返回对新插入的引用
* 为tr元素添加的属性和方法
* cells 保存这tr元素中单元格的HTMLCollection
* deleteCell(pos) ...
* insertCell(pos) ...
* */
// HTMLDOM
//创建 table
var table = document.createElement("table");
table.border = 1;
table.width = "100%";
//创建 tbody
var tbody = document.createElement("tbody");
table.appendChild(tbody);
// 创建第一行

tbody.insertRow(0);
tbody.rows[0].insertCell(0);
tbody.rows[0].cells[0].appendChild(document.createTextNode("Cell 1,1"));
tbody.rows[0].insertCell(1);
tbody.rows[0].cells[1].appendChild(document.createTextNode("Cell 2,1"));

// 创建第二行
tbody.insertRow(1);
tbody.rows[1].insertCell(0);
tbody.rows[1].cells[0].appendChild(document.createTextNode("Cell 1,2"));
tbody.rows[1].insertCell(1);
tbody.rows[1].cells[1].appendChild(document.createTextNode("Cell 2,2"));

//将表格添加到文档主体中
document.body.appendChild(table);

// 使用NodeList
/*
* NodeList、NameNodeMap、HTMLCollection这3个都是动态的；换句话来说，每当文档结构发生变化
* 时，他们都会得到跟新。因此，他们始终会保存这最新、最准确的信息
* */
// 迭代NodeList
var divs = document.getElementsByTagName("div"),
    i,
    len,
    div;
for (i=0, len=divs.length; i < len; i++){
    div = document.createElement("div");
    document.body.appendChild(div);
}
