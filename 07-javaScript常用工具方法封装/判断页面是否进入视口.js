document.body.innerHTML = `
<style>
ul>li{
    margin: 500px 0 0 0;
    width: 200px;
    height: 100px;
    background: #ddd;
}
</style>
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
    <li>10</li>
</ul>
`

/*
* 1. 偏移量
* 偏移量(offset dimension),元素的可见大小由其高度、宽度决定，包括所有内边距、
* 滚动条和边框大小(注意，不包括外边距)。通过下列4个属性可以取得元素的偏移量。
* offsetHeight
*  content + padding + border + scrollX
* offsetWidth
*  content + padding + border + scrollY
* offsetLeft offsetTop
* 只读，每次读都会重新计算
*
* 2. 客户区大小
* clientWidth clientHeight
* content + padding
* 不包含滚动条，不包含边框，不包含外边距
* */

/*
* 方法一
* 公式: el.offsetTop - document.documentElement.scrollTop <= viewPortHeight
* */
function isInViewPortOfTwo (el) {
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const top = el.getBoundingClientRect() && el.getBoundingClientRect().top;
    return top  <= viewPortHeight + 100
}

document.body.scroll();





