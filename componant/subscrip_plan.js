class Subscrip_Plan extends HTMLElement {
    constructor() {
        super();
        this.name=this.getAttribute('name')
        this.price=this.getAttribute('price')
        this.discription=this.getAttribute('discription')
        this.father;
        this.adventags=[];
        this.curancy='EGP';
        this.firest_connect_state=false;
    }

    firest_connect(){
        if(!this.firest_connect_state){
            this.render()
            this.handel_click_on_charge()
            this.create_and_render_adventags()
            this.firest_connect_state=true
        }
    }

    render(){
        this.innerHTML=`
            <div class='name'>${this.name}</div>
            <div class='price'>&nbsp;<b>${this.price}</b>&nbsp; <span class='center'>${this.curancy}<span></div>
            <div class='discrip hid'>${this.discription}</div>
            <div class='adventags'></div>
            <div class='contolers center' >Charge Wallet</div>

        `       
    }

    create_and_render_adventags(){
        //if(!this.data){return}
        for(var adventag of this.adventags){
            var div=document.createElement('div')
            div.textContent=adventag;
            div.setAttribute('class','center')
            this.children[3].appendChild(div)
        }
    } 

    handel_click_on_charge(){
        if(this.on_charege_click){
            this.children[4].addEventListener('click',(e)=>{this.on_charege_click(e)})
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
    static get observedAttributes() { return ['name','price','discription']; }    
           
}
customElements.define('subscrip-plan', Subscrip_Plan);