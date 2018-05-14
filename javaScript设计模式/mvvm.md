MVVM（Model-View-ViewModel)是在MVC(Model-View-Control)模式之后引出的
新的开发模式，他与MVC模式一样用于把视图（界面）和数据进行解耦，不同
的是采用ViewModel来完成数据与视图的双向绑定，通过自动化的方式承担大
部分数据工作，来解决由于界面复杂化和快速迭代带来的问题。

由于现在vue比较火，现在就用vue相同的原理（属性劫持）来完成一个简单MVVM框架

创建dom

````
var html="<input type="text" v-model="msg">{{msg}}<p>{{msg2}}</p><p>{{msg}}</p>";
var div = document.createElement('div');
div.id='app';
div.innerHTML = html;
document.body.appendChild(div);

````
数据对象（Model）,与dom绑定的数据都在这儿

````
var Model = {
    msg:'hello world',
    msg2:'hello world2'
};

````
视图对象（View），里面封装了对dom节点的解析、事件绑定、视图更新渲染等方法

````
var View = {
    init:function(el){
        //将数据与View绑定
        ViewModel.bind(Model);
        //解析Dom
        this.processNode(el);
    },
    subs:[],
    processNode:function(el){
        var node = document.querySelector(el);
        var frag = document.createDocumentFragment(),child;
        while(child = node.firstChild){
            this.compile(child);
            frag.appendChild(child);
        }
        node.appendChild(frag);
    },
    compile:function(node){
        function Sub(node,name,nodeType){
            this.node = node;
            this.name = name;
            this.nodeType = nodeType;
        }
        var self = this;
        if(node.nodeType === 1){
            if(node.childNodes){
                var nodes =[...node.childNodes];
                nodes.forEach(function(node){
                    self.compile(node);
                })
            }
            var attrs = [...node.attributes];
            attrs.forEach(function(attr){
                if(attr.nodeName === 'v-model'){
                    var name = attr.nodeValue;
                    node.addEventListener('input',function(e){
                        self[name] = e.target.value;
                    });
                    node.value = self[name];
                    node.removeAttribute('v-model');
                    var sub = new Sub(node,name,'input');
                    self.render(sub);
                    self.subs.push(sub);
                }
            })
        }
        if(node.nodeType === 3){
            if(/\{\{(.*)\}\}/.test(node.nodeValue)){
                var name = RegExp.$1;
                name=name.trim();
                var sub = new Sub(node,name,'text');
                self.render(sub);
                self.subs.push(sub);
            }
        }
    },
    update:function(){
        var self = this;
        this.subs.forEach(function(sub){
            self.render(sub);
        })
    },
    render:function(sub){
        if(sub.nodeType === 'input'){
            sub.node.value=this[sub.name];
        }
        if(sub.nodeType === 'text'){
            sub.node.nodeValue=this[sub.name];
        }
    }
};

````
视图模板绑定对象（ViewModel）,这也是mvvm实现的核心方法，通过defineProperty将
Model对象中的数据复制到了View对象中，并对数据进行了监控，每当get或set时都会触发
自定义事件，完成对视图的跟新。

````
var ViewModel={
    bind:function(m){
        Object.keys(m).forEach(function(key){
            Object.defineProperty(View,key,{
                get:function(){
                    return m[key];
                },
                set:function(newVal){
                    m[key] = newVal;
                    this.update();
                }
            })
        });
    }
};

````
最后调用View对象的初始化方法执行框架,至此就完成了一个简单的MVVM框架。

````
View.init('#app');

````