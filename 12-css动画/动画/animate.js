const $ = selector => document.querySelector(selector);
const $All = selector => document.querySelectorAll(selector);
const hasClass = (el,className) => el.classList.contains(className);
const addClass = (el,className) => el.classList.add(className);
const is = (el,selector) => el.matches(selector);
const getAttr = (el,attr) => el.getAttribute(attr);

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

/**
 *  是否进入视口
 * @param el 当前元素
 * @param threshold 阀值 元素进入视口距离触发
 * @returns {boolean}
 */
const isInViewPort = (el,threshold = 0) => {
    // 视口高度
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    // 当前元素相对于视口的位置
    const top = el.getBoundingClientRect() && el.getBoundingClientRect().top;
    return top  <= viewPortHeight - threshold
}
const allAnimationElement = $All('.aniview');

allAnimationElement.forEach(el => {
    if(!hasClass(el,'animated')&&is(el,'[data-animate]')){
        el.style.opacity = '0';
    }
})
const renderElementInViewPort = (elements) => {
    elements.forEach(el => {
        if(!hasClass(el,'animated') && isInViewPort(el,100)){
            addClass(el,'animated');
            if(is(el,'[data-animate]')){
                el.style.opacity = '1';
                addClass(el,getAttr(el,'data-animate'));
            }
        }
    })
};

// 默认渲染
renderElementInViewPort(allAnimationElement);

window.onscroll = throttle(()=>{
    renderElementInViewPort(allAnimationElement);
},20);