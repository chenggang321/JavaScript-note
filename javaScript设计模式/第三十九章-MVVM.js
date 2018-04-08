/**
 * Created by HH_Girl on 2018/4/8.
 */
var html=`
    <input type="text" v-model="msg">{{msg}}<p>{{msg2}}</p>
`;
var div = document.createElement('div');
div.id='app';
div.innerHTML = html;
document.body.appendChild(div);

function Mvvm(opt){
    this.el=opt.el;
    this.data=opt.data;
    observer(this.data,this);
    var el = document.querySelector(this.el);
    var dom = nodeToFragment(el,this);
    el.appendChild(dom);
}

//nodeToFragment
function nodeToFragment(node,mv){
    var frag = document.createDocumentFragment(),child;
    while(child = node.firstChild){
        compile(child,mv);
        frag.appendChild(child);
    }
    return frag;
}

//compile
function compile(node,mv){
    if(node.nodeType === 1){
        if(node.childNodes){
            var nodes =[...node.childNodes];
            nodes.forEach(function(node){
                compile(node,mv);
            })
        }
        var attrs = [...node.attributes];
        attrs.forEach(function(attr){
            if(attr.nodeName === 'v-model'){
                var name = attr.nodeValue;
                node.addEventListener('input',function(e){
                    mv[name] = e.target.value;
                });
                node.value = mv[name];
                node.removeAttribute('v-model');
                new Watch(mv,node,name,'input');
            }
        })
    }
    if(node.nodeType === 3){
        if(/\{\{(.*)\}\}/.test(node.nodeValue)){
            var name = RegExp.$1;
            name=name.trim();
            new Watch(mv,node,name,'text');
        }
    }
}

//Watch
function Watch(mv,node,name,nodeType){
    Dep.target=this;
    this.mv=mv;
    this.node=node;
    this.name=name;
    this.nodeType=nodeType;
    this.update();
    Dep.target=null;
}
Watch.prototype={
    update:function(){
        this.get();
        if(this.nodeType === 'input'){
            this.node.value=this.value;
        }
        if(this.nodeType === 'text'){
            this.node.nodeValue=this.value;
        }
    },
    get:function(){
        this.value=this.mv[this.name];
    }
};

//observer
function observer(data,mv){
    Object.keys(data).forEach(function(key){
        defineReactive(mv,key,data[key]);
    })
}

//defineReactive
function defineReactive(mv,key,val){
    var dep = new Dep();
    Object.defineProperty(mv,key,{
        get:function(){
            if(Dep.target){
                dep.addSub(Dep.target)
            }
            return val;
        },
        set:function(newValue){
            if(newValue === val) return;
            val = newValue;
            dep.notify();
        }
    })
}

//Dep
function Dep(){
    this.subs=[];
}
Dep.prototype={
    addSub:function(sub){
        this.subs.push(sub);
    },
    notify:function(){
        this.subs.forEach(function(sub){
            sub.update();
        })
    }
};

new Mvvm({
    el:'#app',
    data:{
        msg:'hello world!',
        msg2:'this is msg2!'
    }
});