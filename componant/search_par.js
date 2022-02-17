class Search_Par extends HTMLElement {
    constructor() {
        super();
        this.input_change_event=new Event('input_change')
        this.firest_connect_state=false;
    }

    firest_connect(){
        if(!this.firest_connect_state){
            this.render()
            this.handel_input()
            this.handel_focas_in_out()
            this.firest_connect_state=true
        }
    }
    render(){
        this.innerHTML=`
            <left-div>
                <c-icon src='home/icons/search.svg' size=30 ></c-icon>
            </left-div>
            <right-div>
                <input type='text' dir='auto' spellcheck="false"/>
            </right-div>
        `       
    }
    handel_focas_in_out(){
        this.children[1].children[0].addEventListener('focus',()=>{
            this.style.border='1px solid rgb(100 100 100)'
        })
        this.children[1].children[0].addEventListener('blur',()=>{
            this.style.border='1px solid rgb(255 255 255 / 8%)'
        })       
    }
    handel_input(){
        this.children[1].children[0].addEventListener('input',(e)=>{
            this.value=e.currentTarget.value;
            this.input_change_event.value=this.value;
            this.dispatchEvent(this.input_change_event)
        })
    }
    run_on_Attribute_change(name){
        if(this.firest_connect_state){
            return      
        } 
    }
    connectedCallback(){ 
        this.firest_connect()           
    }

    attributeChangedCallback(name, oldValue, newValue){
        this[name]=newValue;
        this.run_on_Attribute_change(name)

    } 
    static get observedAttributes() { return []; } 
           
}
customElements.define('search-par', Search_Par);