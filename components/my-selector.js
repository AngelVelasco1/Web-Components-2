let pathName = new URL(import.meta.url).pathname;
let name = pathName.split('/').pop().replace('.js', '');

        export default class mySelector extends HTMLElement {
            static url = import.meta.url;
            static async components() {
                return await (await fetch(pathName.replace('.js', '.html'))).text();
            }
            constructor(){
                super();
                this.attachShadow({mode: 'open'});
            }
            handleEvent(e) {
                (e.type === 'submit') ? this.worker(e) : undefined;
            }
            worker(e) {
                e.preventDefault();

                console.log('This is my selector')
            }
            connectedCallback() {
                Promise.resolve(mySelector.components()).then(html=> {
                    this.shadowRoot.innerHTML = html;
                    this.form = this.shadowRoot.querySelector('form');
                    this.form.addEventListener('submit', this.handleEvent.bind(this));
                })
            }
        }
customElements.define(name, mySelector);
    
