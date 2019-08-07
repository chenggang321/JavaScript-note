/*
custom elements（自定义标签）

customElements (CustomElementRegistry) 自定义标签对象
    方法
    define // 定义自定义标签
    get    // 返回自定义元素的构造函数
    whenDefined  // 返回当使用给定名称定义自定义元素时将会执行的promise

    生命周期
    connectedCallback 当 custom element首次被插入文档DOM时，被调用。
    disconnectedCallback 当 custom element从文档DOM中删除时，被调用。
    adoptedCallback 当 custom element被移动到新的文档时，被调用。
    attributeChangedCallback 当 custom element增加、删除、修改自身属性时，被调
 */
class HelloWorld extends  HTMLElement {
    constructor(){
        super();
        this.addClick()
    }
    addClick(){
        this.addEventListener('click',function(e){
            console.log('success');
        })
    }
    connectedCallback() {
        // 首次被插入文档DOM时，被调用
        console.log('connectedCallback')
    }
    disconnectedCallback() {
        // 文档DOM中删除时，被调用
        console.log('disconnectedCallback');
    }
    adoptedCallback() {
        // 被移动到新的文档时，被调用
        console.log('adoptedCallback');
    }
    attributesChangedCallback() {
        // 元素的属性被增删改时执行
        console.log('attributesChangedCallback');
    }
}

customElements.define('hello-world',HelloWorld);
