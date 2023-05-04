let pathName = new URL(import.meta.url).pathname;
let name = pathName.split('/').pop().replace('.js', '');

        export default class myHeader extends HTMLElement {
            static url = import.meta.url;
            static async components() {
                return await (await fetch(pathName.replace('.js', '.html'))).text();
            }
            constructor(){
                super();
                this.attachShadow({mode: 'open'});
            }
            handleEvent(e) {
                (e.type === 'click') ? this.worker(e) : undefined;
            }
            worker(e) {
                console.log('This is my header');
            }
            connectedCallback() {
                Promise.resolve(myHeader.components()).then(html=> {
                    this.shadowRoot.innerHTML = html;
                    this.btn = this.shadowRoot.querySelector('button')
                    this.btn.addEventListener('click', this.handleEvent.bind(this));

                })
            }
        }
        customElements.define(name, myHeader);
    
