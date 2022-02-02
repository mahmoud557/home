class Price_List_Category extends HTMLElement {
    constructor() {
        super();
        this.src=this.getAttribute('src')
        this.head_title=this.getAttribute('head_title')
        this.firest_connect_state=false;
    }

    firest_connect(){
        if(!this.firest_connect_state){
            this.render()
            this.render_price_lines()
            this.firest_connect_state=true
        }
    }

    render(){
        this.innerHTML=`
            <top-div class='center'>
                <c-icon src='${this.src}'  size='49' layer_target='home' class='active'></c-icon>
                <span>${this.head_title}</span>
            </top-div>
            <bottom-div>
                
            </bottom-div>

        `       
    }
    render_price_lines(){
        for(var price_line of this.price_lines){
            var line=document.createElement('price-line');
            line.setAttribute('src',price_line.src)
            line.setAttribute('link',price_line.link)
            line.setAttribute('price',price_line.price)
            this.children[1].appendChild(line)
        }
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
    static get observedAttributes() { return ['src','head_title']; }    
           
}
customElements.define('price-list-category', Price_List_Category);