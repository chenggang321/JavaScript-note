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
if (typeof pageWidth !== "number") {
    if (document.compatMode === "CSS1Compat") {//是否处于标准模式
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
/*
* location对象的所有属性
* hash  '#contents' 返回URL中的hash（#号后跟零或多个字符），如果URL中不包含散列，
* 则返回空字符串
* host  'www.wrox.com:80' 返回服务器名称和端口号（如果有）
* hostname  'www.wrox.com' 返回不带端口号的服务名称
* href  'http:/www.wrox.com' 返回当前加载页面的完整URL。而location对象的toString（）
* 方法也返回这个值
* pathname '/WileyCDA/'  返回URL中的目录和（或）文件名
* port  '8080'  返回URL中指定的端口号。如果URL中不包含端口号，则这个属性返回空字符串
* protocol  'http'  返回页面使用的协议。通常是http：或https:
* search  '?q=javascript'  返回URL的查询字符串。这个字符串以问号开头
* */

// 查询字符串参数
function getQueryStringArgs() {
    //查询字符串并去掉开头的问号
    var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
        // 保存数据的对象
        args = {},
        //取得每一项
        items = qs.length ? qs.split("&") : [],
        item = null,
        name = null,
        value = null,
        //在for循环中使用
        i = 0,
        len = items.length;
    //逐个将每一项添加到args对象中
    for (; i < len; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}

// 位置操作
// location.assign()
// location.href
// window.location
// location.replace() 浏览器位置改变，但不会在历史记录中生成新记录。所以跳转后不能后退

// navigator 用于检测浏览器类型

// 检测插件

// screen 对象表明客户端的能力

// history 对象
/*
*history.go()可以在历史记录中任意跳转
*history.back() 后退
* history.forward() 前进
* history.length 历史记录的数量
* */