// 表单基础知识
/*
* form 标签上
*  acceptCharset 服务器能处理的字符集
* action 接收请求的URL
* elements 表单中所有控件的集合
* enctype 请求编码类型
* length 表单中控件的数量
* method 发送http请求类型
* name 表单名称
* reset() 重置为默认值
* submit() 提交
* */

// 表单字段

// 共有的表单字段属性
/*
* disabled 布尔值 表示字段是否被禁用
* form 指向当前字段所属表单
* name；字段名称
* readOnly 布尔值 是否只读
* tabIndex 表示当前字段的切换序号
* type 字段类型
* value 当前字段提交给服务器的值
* */
//避免多次提交表单
EventUtil.addHandler(form, "submit", function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var btn = target.elements["submit-btn"];
    //禁用btn
    btn.disabled = true;
});

// 共有的表单字段方法
/*
* focus()
* blur()
* */

//共有表单字段事件
/*
* blur
* change
* focus
* */

// 文本框脚本
// <input type="text" size="25" maxlength="50" value="initial value">
// <textarea rows="25" cols="5">initial value</textarea>

// 选择文本

// 过滤输入

// 操作剪贴板
/*
* beforecopy
* copy
* beforecut
* cut
* beforepaste 粘贴 之前
* paste
* */
/*
* clipboardData
*  getData()
*  setData()
*  clearData()
* */


// 自动切换焦点

// HTML5 约束验证API
/*
* required 必填
* type="email"
* type="url"
* */
// 数值范围
/*
* number
* range
* datetime
* datetime-local
* date
* month
* week
* time
* */
// <input type="number" min="0" max="100" step="5" name="count">

// 输入模式
// <input type="text" pattern="\d+" name="count">

// 禁用验证（novalidate）

// 选择框脚本（select）
/*
* add(newOption,relOption)
* multiple 布尔值 多选
* options 所有options元素
* remove(index)
* selectedIndex
* size
* */

// 表单序列化
function serialize(form){
    var parts = [],
        field = null,
        i,
        len,
        j,
        optLen,
        option,
        optValue;
    for (i=0, len=form.elements.length; i < len; i++){
        field = form.elements[i];
        switch(field.type){
            case "select-one":
            case "select-multiple":
                if (field.name.length){
                    for (j=0, optLen = field.options.length; j < optLen; j++){
                        option = field.options[j];
                        if (option.selected){
                            optValue = "";
                            if (option.hasAttribute){
                                optValue = (option.hasAttribute("value") ?
                                    option.value : option.text);
                            } else {
                                optValue = (option.attributes["value"].specified ?
                                    option.value : option.text);
                            }
                            parts.push(encodeURIComponent(field.name) + "=" +
                                encodeURIComponent(optValue));
                        }
                    }
                }
                break;
            case undefined: // 字段集
            case "file": //文件输入
            case "submit": //提交按钮
            case "reset": //重置
            case "button": //按钮
                break;
            case "radio": //单选
            case "checkbox": //复选
                if (!field.checked){
                    break;
                }
            /* 执行默认操作 */
            default:
                // 不包含没有名字的表单字段
                if (field.name.length){
                    parts.push(encodeURIComponent(field.name) + "=" +
                        encodeURIComponent(field.value));
                }
        }
    }
    return parts.join("&");
}

// 富文本编辑
// contenteditable 可编辑元素

// 操作富文本
// document.execCommand()

// 富文本选区






