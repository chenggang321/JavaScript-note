/**
 * Created by HH_Girl on 2018/2/6.
 */
/*
 * 享元模式：运用共享技术有效地支持大量的细粒度的对象，
 * 避免对象间拥有相同内容造成多余的开销
 * */
var article = [{
    id: 1,
    title: '标题1'
}, {
    id: 2,
    title: '标题2'
}, {
    id: 3,
    title: '标题3'
}, {
    id: 4,
    title: '标题4'
}, {
    id: 5,
    title: '标题5'
}, {
    id: 6,
    title: '标题6'
}, {
    id: 7,
    title: '标题7'
}, {
    id: 8,
    title: '标题8'
}, {
    id: 9,
    title: '标题9'
}, {
    id: 10,
    title: '标题10'
}, {
    id: 11,
    title: '标题11'
}, {
    id: 12,
    title: '标题12'
}, {
    id: 13,
    title: '标题13'
}, {
    id: 14,
    title: '标题14'
}, {
    id: 15,
    title: '标题15'
}, {
    id: 16,
    title: '标题16'
}, {
    id: 17,
    title: '标题17'
}];
/*var dom = null, //缓存创建的新闻标题元素
    page = 0,//当前页数
    num = 5,//每页显示新闻数目
    i = 0,//创建新闻元素时保存变量
    len = article.length;//新闻长度
for (; i < len; i++) {
    dom = document.createElement('div');
    dom.innerHTML = article[i].title;
    if (i >= num) {
        dom.style.display = 'none';
    }
    document.body.appendChild(dom);
}
//下一页
var btn = document.createElement('button');
btn.innerHTML = '下一页';
btn.onclick = function () {
    var div = document.getElementsByTagName('div'),
        j = 0, k = 0, n = 0;
    n = ++page % Math.ceil(len / num) * num;
    for (; j < len; j++) {
        div[j].style.display = 'none';
    }
    for (; k < 5; k++) {
        if (div[n + k]) {
            div[n + k].style.display = 'block';
        }
    }
};
document.body.appendChild(btn);*/
//开始渲染页面时插入dom太多影响性能可以如此修改
var Flyweight = function () {
    //已创建的元素
    var created = [];

    function create() {
        var dom = document.createElement('div');
        document.body.appendChild(dom);
        created.push(dom);
        return dom;
    }

    return {
        //获取创建元素方法
        getDiv: function () {
            //如果已创建元素小于当前页元素总个数，则创建
            if (created.length < 5) {
                return create();
            } else {
                var div = created.shift();
                created.push(div);
                return div;
            }
        }
    }
}();
    var page=0,
        num=5,
        len=article.length;
    for(var i=0;i<5;i++){
        if(article[i].title){
            Flyweight.getDiv().innerHTML=article[i].title;
        }
    }
//下一页
var btn = document.createElement('button');
btn.innerHTML = '下一页';
btn.onclick = function () {
    if(len<5){
        return;
    }
    var n = ++page % Math.ceil(len / num) * num;
    for (var j=0; j < 5; j++) {
       if(article[n+j]){
           Flyweight.getDiv().innerHTML=article[n+j].title;
       }else if(article[n+j-len]){
           console.log(n+j-len);
           Flyweight.getDiv().innerHTML=article[n+j-len].title;
       }else{
           Flyweight.getDiv().innerHTML='';
       }
    }
};
document.body.appendChild(btn);

