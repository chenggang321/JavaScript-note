const $ = selector => document.querySelector(selector);
const hasClass = (el,className) => !!el.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
const addClass = (el,className) => {
    if(!hasClass(el,className)){
        el.className = `${el.className} ${className}`
    }
};
const throttle = (fn,wait) => {
    if(!wait) wait = 200;
    let timer = null;
    return function(){
        let context = this;
        let args = arguments;
        if(!timer){
            timer = setTimeout(function(){
                fn.apply(context,args);
                timer = null;
            },wait)
        }
    }
}

// 是否进入视口
const isInViewPort = el => {
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const top = el.getBoundingClientRect() && el.getBoundingClientRect().top;
    return top  <= viewPortHeight + 100
}

// 元素进入视口添加动画
const addAnimate = sectionClass => {
    const section = $(sectionClass);
    if(isInViewPort(section)){
        setTimeout(() => {
            addClass(section,'animated')
        },1000)

    }
}

window.onscroll = throttle(()=>{
    addAnimate('.section_03');
    addAnimate('.section_04');
});