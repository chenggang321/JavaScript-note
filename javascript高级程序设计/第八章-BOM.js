// window对象 - BOM的核心
// 全局作用域
// 窗口关系及框架
/*
* 如果页面中包含框架（frame），则每个框架都拥有自己的window对象，并且保存在frames集合中
* 在frames集合中，可以通过数值索引（从0开开始，从左到右，从上到下）或者框架名来访问相应
* 的window对象。每个window对象都有一个name属性，其中包含框架名称。
* */

// 窗口位置（screenLeft，screenTop）
/*
* moveTo()接收新位置
* moveBy()接收的是水平和垂直方向上移动的像素数
* */

/*
* 窗口大小
* */
/*
* 不同浏览器之间的差异性
* IE9+，Safari和Firefox中，outerWidth，outHeight，返回浏览器窗口本身的尺寸。Opera中，这
* 两个属性的值表示视图容器（Opera中单个标签页对应的浏览器窗口）的大小。innerWidth和
* innerHeight则表示该容器中页面视图区的大小（减去边框宽度）。在Chrome中，outerWidth、
* outerHeight与innerWidth、innerHeight返回相同的值，即视口大小（viewport）大小而非浏览
* 器窗口大小
*
* IE、Firefox,Safari,Opera,和Chrome中document.documentElement.clientWidth 和 document.
* documentElement.clientHeight中保存了页面视口信息。在ie6中，这些属性必须在标准模式下才
* 有效。如果是混杂模式，就必须通过document.body.clientWidth和document.body.clientHeight
* 取得相同信息。而对于混杂模式下的Chrome，则无论通过document.documentElement还是document。
* body中的clientWidth和clientHeight属性都可以获取视口的大小
* */
// 获取页面视口大小
var pageWidth = window.innerWidth,
    pageHeight = window.innerHeight;
if (typeof pageWidth !== "number"){
    if (document.compatMode === "CSS1Compat"){//是否处于标准模式
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
    } else {
        pageWidth = document.body.clientWidth;
        pageHeight = document.body.clientHeight;
    }
}
/*
* 在移动端：视口信息保存在document.body.clientWidth和document.body.clientHeight中
* */
/*
* 调整浏览器窗口大小
* resizeTo() 接收浏览器窗口的新宽度和新高度
* resizeBy() 接收新窗口与原窗口的宽高差值
* moveTo() 移动位置
* */

// 导航和打开窗口
// 弹出窗口 window.open()（大多数浏览器会屏蔽窗口弹框）
// 安全限制
// 弹出窗口屏蔽程序

// 间歇调用和超时调用
/*
* 间歇调用：setInterval(function(){},time)
* 超时调用：setTimeout(function(){},time)
* 清除：clearInterval(intervalId) clearTimeout(timer)
* */
/*
* 间歇和超时调用的代码都是在全局作用域中执行的，因此函数中的this的值在非严格
* 模式下指向window对象，在严格模式下是undefined
* */

// 系统对话框
// alert()(提示文本、确认) confirm()（提示文本、取消、确定） prompt(文本、输
// 入框、取消、确认)

// location 对象
