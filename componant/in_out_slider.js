class In_Out_Slider extends HTMLElement {
    constructor() {
        super();
        this.slide_state='in'
        this.firest_connect_state=false;
    }

    firest_connect(){
        if(!this.firest_connect_state){
            this.firest_connect_state=true
        }
    }
    async hid_content(duration){
        return new Promise(async(res,rej)=>{
            for(var childern of this.children){
                childern.style.transition=`all ${duration}s`;
                childern.style.opacity='0';
            }
            await this.delay(100)
            res(true)
        })
    }
    async show_content(duration){
        return new Promise(async(res,rej)=>{
            for(var childern of this.children){
                childern.style.transition=`all ${duration}s`;
                childern.style.opacity='1';
            }
            await this.delay(100)
            res(true)
        })
    } 
    async slide_out(to,method){
        switch(method){
            case 't_to_b':
                this.style.height=to+'px';
                this.slide_state='out';  
                break; 
            case 'c':
                this.style.height=0+'px';
                this.style.display='none';
                this.style.height=to+'px';
                this.style.transform='scaleY(0)';
                await this.delay(50)
                this.style.display='flex';
                await this.delay(50)
                this.style.transform='scaleY(1)';
                this.slide_state='out';
                await this.show_content(.2)
                break;   
            case 'b_to_t':
                this.style.height=to+'px';
                this.slide_state='out';  
                break;                                                            
        }

    }

    async slide_in(method){
        switch(method){
            case 't_to_b':
                this.style.height=to+'px';
                this.slide_state='in';  
                break; 
            case 'c':
                this.style.transform='scaleY(0)';
                this.slide_state='in';
                break;   
            case 'b_to_t':
                await this.hid_content(.2)
                this.style.height=0+'px';
                await this.delay(100)
                this.style.transform='scaleY(0)';
                this.slide_state='in';  
                break;                                                            
        }
    }

    run_on_Attribute_change(name){
        if(this.firest_connect_state){
            return      
        }
    }

    delay(time){
        return new Promise((res,rej)=>{
            setTimeout(()=>{res()},time)
        })
    }


    connectedCallback(){ 
        this.firest_connect()           
    }

    delay(time){
        return new Promise((res,rej)=>{
            setTimeout(()=>{res()},time)
        })
    }

    attributeChangedCallback(name, oldValue, newValue){
        this[name]=newValue;
        this.run_on_Attribute_change(name)

    } 
    static get observedAttributes() { return []; } 
           
}
customElements.define('in-out-slider', In_Out_Slider);