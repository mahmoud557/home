class Price_Line extends HTMLElement {
    constructor(){
        super();
        this.src=this.getAttribute('src');
        this.link=this.getAttribute('link');
        this.price=this.getAttribute('price');
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
            <div class='price center'>
                 <b>${this.price}</b>
                 <span>LE</span>
            </div>
            <div class='logo center'>
                <c-icon src='${this.src}'  size='70' layer_target='home' class='active'></c-icon>
            </div>
            <div class='link'>${this.link}</div>
        `       
    }
    connectedCallback(){ 
        this.firest_connect()           
    }

    run_on_Attribute_change(){
        if(this.firest_connect_state){
            return;
        } 
    }

    attributeChangedCallback(name, oldValue, newValue){
        this[name]=newValue;
        this.run_on_Attribute_change()
    } 
    static get observedAttributes() { return ['src','link','price']; }    
           
}
customElements.define('price-line', Price_Line);