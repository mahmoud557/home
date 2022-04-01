class Loading_wheel extends HTMLElement {
    constructor() {
        super();
        this.firest_connect_state=false;     
    }

    firest_connect(){
        if(!this.firest_connect_state){
            this.render()
            this.firest_connect_state=true
        }
    }

    render(){
        this.innerHTML=`
            <c-icon src='/home/icons/loading.svg'  size='90'  class='no_sellect'></c-icon>
        `
    }


    connectedCallback(){ 
        this.firest_connect()
    }

    run_on_Attribute_change(attribute_name){
        if(this.firest_connect_state){
            if(attribute_name=='value'){
            }
        } 
    }

    attributeChangedCallback(name, oldValue, newValue){
        this[name]=newValue;
        this.run_on_Attribute_change(name)
    } 
    static get observedAttributes() { return ['value']; }
           
}
customElements.define('loading-wheel', Loading_wheel);