/**
 * Created by HH_Girl on 2018/2/6.
 */
/*
 * 观察者模式：又被称作发布-订阅者模式或信息机制，定义了一种依赖关系
 * 解决了主体对象与观察者之间功能的耦合
 * */

//将观察者模式放在闭包中，当页面加载就立即执行
var Observer = (function () {
    //防止信息队列暴露而被篡改故将信息容器作为静态私有变量保存
    var __messages = {};
    return {
        //订阅接口
        regist: function (type, fn) {
            //如果此消息不存在则应该创建一个消息类型
            if (typeof __messages[type] === 'undefined') {
                //将动作推入到改消息对应的动作执行队列中
                __messages[type] = [fn];
            } else {//如果存在
                //将动作方法推入该消息对应的动作执行序列中
                __messages[type].push(fn);
            }
            return this;
        },
        //发布接口
        fire: function (type, args) {
            //如果该信息没有被注册，则返回
            if (!__messages[type]) return;
            //定义消息信息
            var events = {
                    type: type,//消息类型
                    args: args || {}//消息携带数据
                },
                i = 0,//消息动作循环变量
                len = __messages[type].length;//消息动作长度
            //遍历消息动作
            for (; i < len; i++) {
                //依次执行注册消息对应的序列
                __messages[type][i].call(this, events);
            }
            return this;
        },
        //注销接口
        remove: function (type, fn) {
            //如果消息动作队列存在
            if (__messages[type] instanceof Array) {
                //从最后一个消息动作遍历
                var i = __messages[type].length - 1;
                for (; i >= 0; i--) {
                    //如果存在该动作则在消息动作序列中移出相应动作
                    __messages[type][i] === fn && __messages[type].splice(i, 1);
                }
            }
            return this;
        }
    }
})();

function show(e) {
    console.log(e.type, e.args.msg);
}

Observer //注册接口 test test1
    .regist('test', show)
    .regist('test1', show);
Observer.remove('test', show);//注销接口test
Observer //执行接口 test test1
    .fire('test', {msg: '传递参数'})
    .fire('test1', {msg: '传递参数1'});//test1 传递参数1

/*
*  es6 改写
* */
class ObserverEs6 {
    constructor() {
        this.__messages = {}
    }

    // 注册事件
    regist(type, fn) {
        if (typeof this.__messages[type] === 'undefined') {
            this.__messages[type] = [fn]
        } else {
            this.__messages[type].push(fn);
        }
        return this
    }

    // 移除事件
    remove(type, fn) {
        if (this.__messages[type] instanceof Array) {
            this.__messages[type].forEach((item, index) => {
                item === fn && this.__messages[type].splice(index, 1)
            })
        }
        return this;
    }

    // 执行某个类型所有注册事件
    fire(type, args = {}) {
        if (!this.__messages[type]) return false;
        let events = {type, args};
        this.__messages[type].forEach((item) => {
            item.call(this, events);
        });
        return this;
    }
}

const observerEs6 = new ObserverEs6();
observerEs6 //注册接口 test test1
    .regist('test', show)
    .regist('test1', show);
observerEs6.remove('test', show);//注销接口test
observerEs6 //执行接口 test test1
    .fire('test', {msg: '传递参数'})
    .fire('test1', {msg: '传递参数1'});//test1 传递参数1

//外观模式 简化获取元素
function $(id) {
    return document.getElementById(id);
}

(function () {
    var html = `
    <div class="container">
        <span id="msg_num">0</span>
        <div id="msg"></div>
        <div>
            <input type="text" id="user_input">
            <button id="user_submit">提交</button>
        </div>
    </div>
    `;
    document.body.innerHTML = html;
})();
//工程师 A
(function () {
    //追加一则消息
    function addMsgItem(e) {
        var text = e.args.text,//获取消息中用户添加的文本内容
            ul = $('msg'),//留言容器元素
            li = document.createElement('li'),//创建内容容器元素
            span = document.createElement('span');//删除按钮
        span.innerHTML = '删除';
        li.innerHTML = text;//写入评论
        //关闭按钮
        span.onclick = function () {
            ul.removeChild(li);//移出留言
            //发布删除留言信息
            observerEs6.fire('removeCommentMessage', {
                num: -1
            });
        };
        //添加删除按钮
        li.appendChild(span);
        //添加留言节点
        ul.appendChild(li);
    }

    //注册添加评论信息
    observerEs6.regist('addCommentMessage', addMsgItem);
})();
//工程师B
(function () {
    //修改用户信息数目
    function changgeMesNum(e) {
        //获取需要增加信息数目
        var num = e.args.num;
        //增加用户信息并写入页面中
        $('msg_num').innerHTML = parseInt($('msg_num').innerHTML) + num;
    }

    //注册添加评论信息
    observerEs6
        .regist('addCommentMessage', changgeMesNum)
        .regist('removeCommentMessage', changgeMesNum);
})();
//工程师C
(function () {
    //用户点击提交按钮
    $('user_submit').onclick = function () {
        //获取用户输入框中的信息
        var text = $('user_input');
        //如果空则提交失败
        if (text.value === '') {
            return;
        }
        //发布则评论消息
        observerEs6.fire('addCommentMessage', {
            text: text.value,//消息评论内容
            num: 1//消息评论数目
        });
        text.value = '';//将输入框置为空
    }
})();

