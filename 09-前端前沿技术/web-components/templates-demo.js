class MyParagraph extends HTMLElement {
    constructor(){
        super();
        let template = document.querySelector('#my-paragraph');
        let templateContent = template.content;

        this.attachShadow({mode:'open'})
            .appendChild(templateContent.cloneNode(true))
    }
    connectedCallback(){
        console.log('connectedCallback');
    }
}
customElements.define('my-paragraph',MyParagraph)
