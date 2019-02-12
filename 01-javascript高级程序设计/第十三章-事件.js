// 事件流
/*
* 事件流描述的是从页面中接收事件顺序
* 冒泡流
* 事件捕获流
* */

// 事件冒泡
/*
* 事件开始时由最具体的元素接收，然后逐级向上传播到较为不具体的节点
* */

// 事件捕获

/*
* 事件捕获的思想是不太具体的节点应该更早接收事件，而最具体的节点应该最后接收到事件。事件
* 捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。
* */

// dom 事件流
/*
*  三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段
*
*  首先发生事件捕获，为截获事件提供了机会。然后是实际的目标接收到事件。最后一个阶段是冒泡
*  阶段，可以在这个阶段对事件作出响应
* */

// 事件处理程序

// html 事件处理程序
// <input type="button" value="Click Me" onclick="alert(this.value)">

// DOM0级事件处理程序
/*
var btn = document.getElementById("myBtn");
添加
btn.onclick = function(){
 alert("Clicked");
};
删除
btn.onclick = null;
*/

// DOM2级事件处理程序
/*btn.addEventListener('click',function(){
    alert('Hello Wold')
},false)*/
// false 代表的是事件在冒泡阶段被触发
// 可以添加多个事件监听

/*
// 获取元素
var btn = document.getElementById("myBtn");
// 事件函数
var handler = function(){
    console.log('success')
}
// 添加事件
btn.addEventListener('click',handler,false)
// 移除事件
btn.removeEventListener('click',handler,false)
*/

// IE事件处理程序
/*
var btn = document.getElementById("myBtn");
var handler = function(){
    alert("Clicked");
};
// 添加
btn.attachEvent("onclick", handler);
// 移除
btn.detachEvent("onclick", handler)
*/

// 跨浏览器的事件处理程序
var EventUtil = {
    addHandler: function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
};

// 事件对象（event）
/*
* preventDefault() 阻止默认行为
* stopPropagation() 阻止冒泡
* */

// IE事件对象
/*
* returnValue 设为false可以取消事件冒泡 和 preventDefault()作用相同
* cancelBubble 设为false可以阻止冒泡和stopPropagation()作用相同
* */

// 跨浏览器事件对象
var EventUtil2 = {
    addHandler: function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    getEvent: function(event){
        return event ? event : window.event;
    },
    getTarget: function(event){
        return event.target || event.srcElement;
    },
    preventDefault: function(event){
        if (event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    stopPropagation: function(event){
        if (event.stopPropagation){
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};

// 事件类型

// UI事件
/*
*  load 页面完全加载 图像上也可以使用
*  unload 页面完全卸载
*  abort 用户停止下载
*  error javascript错误时
*  select 用户选择文本框时
*  resize 窗口变化时
*  scroll 滚动时 （scrollLeft和scrollTop检测变化）
* */

// 焦点事件
/*
* blur 失去焦点
* focus 获得焦点
* */

// 鼠标与滚动事件
/*
* click 单击事件
* dblclick 双击事件
* mouseenter 鼠标进入
* mouseleave 鼠标离开
* mousemove 鼠标移动
* mouseout
* mouseover
* mousedown 按下鼠标
* mouseup 释放鼠标
* */

// 客户区坐标位置
/*
* event.clientX
* event.clientY
* */

//页面坐标位置
/*
* event.pageX
* event.pageY
* */
// 页面没有滚动时 客户区坐标和页面坐标位置相同

// 屏幕坐标位置
/*
*event.screenX
*event.screenY
* */

// 修改键( shiftKey 、ctrlKey 、 altKey 、 metaKey)

/*
var div = document.getElementById("myDiv");
EventUtil.addHandler(div, "click", function(event){
    event = EventUtil.getEvent(event);
    var keys = new Array();
    if (event.shiftKey){
        keys.push("shift");
    }
    if (event.ctrlKey){
        keys.push("ctrl");
    }
    if (event.altKey){
        keys.push("alt");
    }
    if (event.metaKey){
        keys.push("meta");
    }
    alert("Keys: " + keys.join(","));
});
*/

// 相关元素

// 鼠标滚动事件
/*
*  mousewheel
*
*  event.wheelDelta 正负判断方向
* */

// 键盘和文本事件
/*
* keydown 按下任意键 不放 会持续触发
* keypress 按下字符键 不放 会持续触发
* keyup 释放
* */

// 键码
/*
* event.keyCode
* */

// 字符编码
/*
getCharCode=function(event){
    if (typeof event.charCode == "number"){
        return event.charCode;
    } else {
        return event.keyCode;
    }
}
*/
// textInput事件

// 变动事件

// html5事件
/*
* contextmenu 上下文菜单
* beforeunload
* DOMContentLoaded DOM加载完毕时触发
* readystatechange （uninitialized 未初始化 loading 加载 loaded 加载完毕
* interactive 交互 complete 完成）
* */

// pageshow 和pagehide

// hashchange 事件

// 设备事件
/*
* orientationchange 横竖屏
* deviceorientation 检测空间朝向（alpha z轴 0-360 ，beta x轴 -180到180，
* gamma y轴 -90到90）
* devicemotion
* */

// 触摸与手势事件
/*
* touchstart
* touchmove
* touchend
* touchcancel
* 属性
* touches Touch对象数组
* targetTouchs 特定事件目标的Touch对象数组
* changeTouches touch事件改变
* clientX 触摸目标在视口中的x坐标
* clientY
* identifier 标识触摸的唯一ID
* pageX
* pageY
* screenX
* screenY
* target
* */

// 手势事件
/*
* gesturestart 当一个手指已经按在屏幕上另一只手指又触摸时触发
* gesturechange 当触摸屏幕的任何一个手指位置变化时触发
* gestureend 当任何一个手指从屏幕上移开时触发
* */

// 事件委托
/*
var list = document.getElementById("myLinks");
EventUtil.addHandler(list, "click", function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    switch(target.id){
        case "doSomething":
            document.title = "I changed the document's title";
            break;
        case "goSomewhere":
            location.href = "http://www.wrox.com";
            break;
        case "sayHi":
            alert("hi");
            break;
    }
});
*/

// 模拟事件

// 自定义DOM事件
// createEvent()







