/**
 * Created by HH_Girl on 2018/2/5.
 */
/*
* 代理模式：由于一个对象不能直接引用另一个对象，
* 所以需要通过代理对象在这两个对象之间起到中介
* 作用
*
* 代理模式可以解决避免对一些对象的直接访问，以此为基础，常见的有保护代理和虚拟代理。
* 保护代理可以在代理中直接拒绝对对象的访问；虚拟代理可以延迟访问到真正需要的时候，
* 以节省开销。
*
* 优缺点
* 代理模式有高度解耦、对象保护、易修改等优点。同时也会造成开销大，时间慢。
* */

// 利用代理模式实现图片懒加载
const myImage = {
    setSrc(imgNode,src){
        imgNode.src = src;
    }
}

const proxyImage = {
    setSrc(imgNode,src){
        // 设置占位图
        myImage.setSrc(imgNode,'./MLCS_banner.png');
        // 加载真正需要的图片
        let img = new Image();
        img.src = src;
        // 完成加载后，更新数据
        img.onload = () => {
            myImage.setSrc(imgNode,src);
        };
    }
}

let imgNode = document.createElement("img"),
    imgSrc = "http://www.anlle.com/templets/default/newimages/banner01.png";
document.body.appendChild(imgNode);

proxyImage.setSrc(imgNode, imgSrc);
