/*
shadow dom (影子dom) 将封装的“影子”DOM树附加到元素（与主文档DOM分开呈现）并控制其关联的功能
作用：保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突

attachShadow 挂载一个Shadow DOM，并且返回它的 ShadowRoot.
    mode: 一个指定Shadow DOM封装模式的字符串，可以是下列之一：
        open 指定为开放的封装模式。
        closed 指定为关闭的封装模式
 */
class ShadowDomDemo extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:'open'})
            .innerHTML=`<p>Shadow DOM Content</p>`;
    }
    connectedCallback(){
        console.log('connectedCallback');
    }
}

customElements.define('shadow-dom-demo',ShadowDomDemo);
