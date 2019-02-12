// 选择符API
/*
 querySelector(selector) 接收一个CSS选择符，返回与该模式匹配的第一个元素，如果没有找到匹
 配元素，返回null
 querySelectorAll(selector) 接收一个CSS选择符，返回一个NodeList的实例，没有匹配NodeList就
 是空的
 matchesSelector(selector) 接收一个CSS选择符，如果调用元素与选择符匹配则返回true否则返回
 false
 */

// 元素遍历
/*
* 对于元素间的空格，IE9以及之前版本不会返回文本节点，而其他所有浏览器都会返回文本节点。这
* 样就导致了使用childNodes和firstChild等属性时的行为不一致。
*
* childElementCount 返回子元素（不包括文本节点和注释）的个数
* firstElementChild 指向第一个子元素：firstChild 元素版
* lastElementChild 指向最后一个子元素；lastChild 元素版
* previousElementSibling 前一个同辈元素 previousSibling 元素版
* nextElementSibling 后一个同辈元素 nextSibling 元素版
* */

// HTML5

// 与类相关的扩充
// 通过class名获取NodeList
/*
* getElementsByClassName() 接收一个参数，包含一个或多个类名的字符串，返回带有指定类的所有
* 元素的NodeList。传入多个类名时，类名的先后不重要
* */
// classList
// 在没有classList之前
//删除"user"
//首先 取得类名字符串并拆分成数组
var classNames = div.className.split(/\s+/);
//找到要删的类名
var pos = -1,
    i,
    len;
for (i=0, len=classNames.length; i < len; i++){
    if (classNames[i] === "user"){
        pos = i;
        break;
    }
}
//删除类名
classNames.splice(i,1);
//把剩下的类名拼成字符串并重新设置
div.className = classNames.join(" ");
// 使用classList
/*
* add(value) 将指定字符串添加到列表中。如果已存在就不添加了
* contains(value) 是否存在给定的值 返回 true或false
* remove(value) 从列表中删除给定的字符串
* toggle(value) 如果列表中已存在给定的值，删除它；不存在添加它
* */
div.classList.remove("disabled");
div.classList.add("current");
div.classList.toggle("user");

// 焦点管理
/*
* document.activeElement
* focus()
* document.hsaFocus()
* */

// HTMLDocument的变化
/*
* readyState 属性 loading 正在加载文档 complete 已加载完毕文档
* compatMode 兼容模式 CSS1Compat 标准模式 BackCompat 混杂模式
* head 属性
* charset 字符集属性
* */

// 自定义数据属性
// <div id="myDiv" data-appId="12345" data-myname="Nicholas"></div>
var div = document.getElementById("myDiv");
//获取自定义属性的值
var appId = div.dataset.appId;
var myName = div.dataset.myname;
//设置值
div.dataset.appId = 23456;
div.dataset.myname = "Michael";
//是否存在mynamez值
if (div.dataset.myname){
    console.log("Hello, " + div.dataset.myname);
}

// 插入标记
/*
* innerHTML
* outerHtml
* insertAdjacentHTML 接收两各参数 插入位置和HTML文本 第一个参数必须是下面参数之一
*   beforebegin 在元素之前插入一个紧邻的同辈元素
*   afterbegin 在当前元素之下插入一个新的子元素或在第一个子元素之前再插入新的子元素
*   beforeend  在当前元素之下插入一个新的子元素或在第一个子元素之后再插入新的子元素
*   afterend 在当前元素之后插入一个紧邻的同辈元素
* */

// scrollIntoView() true
// document.forms[0].scrollIntoView();

// 文档模式
// <meta http-equiv="X-UA-Compatible" content="IE=IEVersion">
// IEVersion 可以是 任意IE版本浏览器如7,8,9
/*
* 强制IE用某种模式渲染
* */

// children 属性
// contains() 方法 判断一个节点是否包含另一个节点

// 插入文本
/*
* innerText
* */

/*
* innerText和textContent返回的内容并不完全一样。innerText会忽略行内样式和脚本，
* 而textContent则会像返回其他文本一样返回行内的样式和脚本代码。
* */
/*
* outerText 属性 作用范围扩大到了调用它的节点，其他和innerText一样
* */

// 滚动
/*
* scrollIntoViewIfNeeded(alignCenter)  （Safari，chrome）
* scrollByLines(lineCount) （Safari，chrome）
* scrollByPages(pageCount) （Safari，chrome）
* */
