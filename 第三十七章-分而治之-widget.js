/**
 * Created by HH_Girl on 2018/2/23.
 */
/*
* widget（web widget 指的是一块可以在任意页面中执行的代码块）:widget模式是指借用web widget
* 思想将页面分解成部件，针对部件开发，最终组合成完整页面。
* */
/*
* 模板引擎
* 处理效果
* 模板：<a href="#" class="data-lang{% if(is_selected){% }selected{ %} %}" value="{%=value%}">{%=text%}</a>
* 数据：{is_selected:true,value:'zh',text:'zh-text'}=>>
* 输出结果：<a href="#" class="data-lang selected" value="zh">zh-text</a>
* */
//引入模块管理对象
/*var _script=document.createElement('script');
_script.type='text/JavaScript';
_script.src='第三十六章-大心脏-异步模块模式.js';
document.getElementsByTagName('head')[0].appendChild(_script);
console.log('success');*/
//自定义模板
var demo_tpl=[
    '<div id="tag_cloud">',
    '{% for(var i=0,len=tagCloud.length;i<len;i++){',
    'var ctx=tagCloud[i];%}',
    '<a href="#" class="tag_item ',
    '{% if(ctx["is_selected"]){ %}',
    'selected',
    '{% } %}',
    '" title="{%=ctx["title"]%}">{%=ctx["text"]%}</a>',
    '{% } %}',
    '</div>'
].join('');
var data={
    tagCloud:[
        {is_selected:true,title:'这是一本设计模式书',text:'设计模式'},
        {is_selected:false,title:'这是一本HTML书',text:'HTML'},
        {is_selected:null,title:'这是一本CSS书',text:'CSS'},
        {is_selected:'',title:'这是一本JavaScript书',text:'JavaScript'}
    ]
};
var test=document.createElement('div');
test.setAttribute('id','test');
document.body.appendChild(test);
F.module(['lib/template','lib/dom'],function(template,dom){
    var str=template(demo_tpl,data);
    console.log(str);
    dom.html('test',str);
});