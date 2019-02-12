/**
 * Created by HH_Girl on 2018/2/23.
 */
//创建引擎模块
F.module('lib/template', function () {
    /*
     * 模板引擎 处理数据与编译模板入口
     * @param str 模板容器id或者模板字符串
     * @param data 渲染数据
     * */
    var _TplEngine = function (str, data) {
            //如果数据是数组
            if(data instanceof Array){
                //缓存渲染模板结果
                var html='',
                    //数据索引
                    i=0,
                    //数据长度
                    len=data.length;
                //遍历数据
                for(;i<len;i++){
                    //缓存模板结果，也可写成html+=arguments.callee(str,data[i]);
                    html+=_getTpl(str)(data[i]);
                }
                return html;
            }else{
                //返回模板渲染结果
                return _getTpl(str)(data);
            }
        },
        /*
        * 获取模板
        * @param str 模板容器id,或者模板字符串
        * */
        _getTpl = function (str) {
            //获取元素
            var ele=document.getElementById(str);
            if(ele){
                //如果是input或者textarea表单元素，则获取该元素的value值，否则获取元素内容
                var html=/^(textarea|input)$/i.test(ele.nodeName)?ele.value:ele.innerHTML;
                //编译模板
                return _compileTpl(html);
            }else{
                //编译模板
                return _compileTpl(str);
            }
        },
        //处理模板
        _dealTpl = function (str) {
            var _left='{%',//左分隔符
                _right='%}';//右分隔符
            //显示转化为字符串
            return String(str)
            //转义标签内的<,eg:<div>{%if(a&lt;b)%}</div> -> <div>{%if(a<b)%}</div>
                .replace(/&lt;/g,'<')
            //转义标签内>
                .replace(/&gt;/g,'>')
            //过滤回车符，制表符，回车符
                .replace(/[\r\t\n]/g,'')
            //替换内容
                .replace(new RegExp(_left+'=(.*?)'+_right,'g'),"',typeof($1)==='undefined'?'':$1,'")
            //替换左分隔符
                .replace(new RegExp(_left,'g'),"');")
            //替换右分隔符
                .replace(new RegExp(_right,'g'),"template_array.push('");
        },
        /*
        * 编译执行
        * @param str 模板数据
        * */
        _compileTpl = function (str) {
           /* //申明template_array模板容器组
            var template_array=[];
            //闭包，模板容器组添加成员
            var fn=(function(data){
                //渲染数据变量的执行函数体
                var template_key='';
                //遍历渲染数据
                for(var key in data){
                    //为渲染数据变量的执行函数体添加赋值语句
                    template_key+=('var'+key+'=data[\"'+key+'\"];');
                }
                //执行渲染数据变量函数
                eval(template_key);
                //为模板容器组添加成员（注意，此时渲染数据将替换容器中的变量）
                template_array.push('"+_dealTpl(str)+"');
                //释放渲染数据变量函数
                template_key=null;
                //为闭包传入数据
            })(templateData);
            //释放闭包
            fn=null;
            //返回渲染后模板容器组，并拼接成字符串
            return template_array.join('');*/
            //编译函数体
            var fnBody="var template_array=[];\nvar fn=(function(data){\nvar template_key='';\nfor(var key in data){\ntemplate_key+=('var '+key+'=data[\"'+key+'\"];');\n}\neval(template_key);\ntemplate_array.push('"+_dealTpl(str)+"');\ntemplate_key=null;\n})(templateData);\nfn=null;\nreturn template_array.join('');";
        //编译函数
            return new Function("templateData",fnBody);
        };
    return _TplEngine;
});