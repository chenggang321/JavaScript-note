/*
*  MVVM（Model-View-ViewModel)是在MVC(Model-View-Control)模式之后引出的新的开发模式，
*  他与MVC模式一样用于把视图（界面）和数据进行解耦，不同的是采用ViewModel来完成数据
*  与视图的双向绑定，通过自动化的方式承担大部分数据工作，来解决由于界面复杂化和快速
*  迭代带来的问题。
* */

//通过属性劫持 完成 MVVM
var html=`
    <input type="text" v-model="msg">{{msg}}<p>{{msg2}}</p><p>{{msg}}</p>
    <ul v-for="(item,index) in list">
        <li>{{index}}{{list.title}}</li>
    </ul>
`;
var div = document.createElement('div');
div.id='app';
div.innerHTML = html;
document.body.appendChild(div);

var Model = {
    msg:'hello world',
    msg2:'hello world2',
    list:[
        {title:'Athis is text1'},
        {title:'Athis is text1'},
        {title:'Athis is text1'},
        {title:'Athis is text1'},
        {title:'Athis is text1'}
    ]
};
var View = {
    init:function(el){
        //将数据与View绑定
        ViewModel.bind(Model);
        //解析Dom
        this.processNode(el);
        console.log(this);
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
                if(attr.nodeName === 'v-for'){
                    var reg = /\((\w+),(\w+)\)\s+in\s+(\w+)/;//切割 (item,index) in list
                    var params = attr.nodeValue.match(reg);
                    var forSub = new Sub(node,params[3] ,'v-for');
                    forSub.childrenText = node.innerHTML;
                    self.render(forSub);
                    self.subs.push(forSub);
                    node.removeAttribute('v-for');
                }
            })
        }
        if(node.nodeType === 3){
            if(/\{\{(.*)\}\}/g.test(node.nodeValue)){
                var subAttrs = node.parentNode.parentNode.attributes;
                var flag = true;
                [...subAttrs].forEach(function(attr){
                    if((attr.nodeName === 'v-for')){
                        flag = false;
                    }
                });
                if(flag){
                    var name = RegExp.$1;
                    name=name.trim();
                    var sub = new Sub(node,name,'text');
                    self.render(sub);
                    self.subs.push(sub);
                }
            }
        }
    },
    update:function(key){
        var self = this;
        this.subs.forEach(function(sub){
            if(sub.name === key){
                self.render(sub);
            }
        })
    },
    render:function(sub){
        if(sub.nodeType === 'input'){
            sub.node.value=this[sub.name];
        }
        if(sub.nodeType === 'text'){
            sub.node.nodeValue=this[sub.name];
        }
        if(sub.nodeType === 'v-for'){
            var data = this[sub.name];
            var node = sub.node;
            var html = '';
            data.forEach(function(item,index){
                html += sub.childrenText.replace(/\{\{[^(\}\})]+\}\}/g,function(str){
                    if(/\{\{(.*)\}\}/g.test(str)){
                        if(RegExp.$1 === 'index'){
                            return  index
                        }else{
                            var param = RegExp.$1.split('.')[1];
                            return item[param]
                        }
                    }
                });
            });
            console.log(html);
            node.innerHTML = html;
        }
    }
};
var ViewModel={
    bind:function(m){
        Object.keys(m).forEach(function(key){
            Object.defineProperty(View,key,{
                get:function(){
                    return m[key];
                },
                set:function(newVal){
                    m[key] = newVal;
                    this.update(key);
                    console.log('set'+key);
                }
            })
        });
    }
};
View.init('#app');