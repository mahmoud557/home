class Forget_Password_Part extends HTMLElement {
    constructor() {
        super();
        this.in_reseat_prossess_with_server;
        this.firest_connect_state=false; 
    }

    firest_connect(){
        if(!this.firest_connect_state){
            this.render()
            this.email_ceck_validate()
            this.handel_reseat_password_click()
            this.firest_connect_state=true
        }
    }

    render(){

        this.innerHTML=`
            <top-div class='center'>
                <c-icon src='/home/icons/logo2.png'  size='62' layer_target='home' class='no_sellect active'></c-icon>
            </top-div>
            <div class='allert_aria center hid' >this is allert</div>
            <bottom-div>
                <div>
                    <input type='email' ceck_memper name='email' placeholder='Email'/>
                </div>
                <div class='sign_in_button center no_sellect'>
                    Reseat Password
                    <div class='whell center hid'>
                        <c-icon src='/home/icons/loading.svg'  size='90' layer_target='home' class='no_sellect active'></c-icon>
                    </div>
                </div>                
                <div class='last_texts center hid' >
                    <div>Sign In</div>
                    <div>Sign Up</div>
                </div>
            </bottom-div>   
        `
    }

    show_allert(text,mode){
        switch(mode){
            case 'allert':
                this.children[1].classList.remove('hid')
                this.children[1].classList.remove('error')
                this.children[1].classList.add('allert')
                this.children[1].textContent=text;
                break;
            case 'Error':
                this.children[1].classList.remove('hid')
                this.children[1].classList.remove('allert')
                this.children[1].classList.add('error')
                this.children[1].textContent=text;
                break; 
        }
    }

    hid_allert(){
        this.children[1].classList.add('hid')
    }

    show_hid_loading_whell(visible_state){
        switch(visible_state){
            case true:
                this.children[2].children[1].children[0].classList.remove('hid')
                break;
            case false:
                this.children[2].children[1].children[0].classList.add('hid')
                break; 
        }
    }

    email_ceck_validate(){
        this.children[2].children[0].children[0].father=this;
        this.children[2].children[0].children[0]
        .ceck_validate=function(){
            if(this.value==''){return {valid:false,resone:'Empty User Name'}}
            if(this.value==' '){return {valid:false,resone:'Empty User Name'}}
            if(this.value.length<=4){return {valid:false,resone:'User Name Shoude Be More Than 4 Leters'}}
            return {valid:true}
        }
    }

    check_all_inputs(){
        var inputs=this.querySelectorAll('[ceck_memper]');
        for(var input of inputs){
            if(!input.ceck_validate){continue}
            var validait_object=input.ceck_validate()
            if(!validait_object.valid){
                this.show_allert(validait_object.resone,'allert')
                this.set_input_on_error_mode(input)
                this.hid_allert_on_re_activ_on_on_error_enput(input)
                this.set_input_on_regular_modeon_re_activ(input)
                return false;
                break;
            }
        }
        return true;
    }    

    delay(time){
        return new Promise((res,rej)=>{
            setTimeout(()=>{res()},time)
        })
    }

    handel_reseat_password_click(){
        this.children[2].children[1]
        .addEventListener('click',async()=>{
            if(this.in_reseat_prossess_with_server){return}
            if(this.check_all_inputs()){
                var forget_password_object=this.get_forget_password_object();
                this.in_reseat_prossess_with_server=true;
                this.show_hid_loading_whell(true)
                var respond=await this.send_forget_password_object(forget_password_object)
                switch(respond.state){
                    case true:
                        this.show_allert('Go To Your Email For complete Verification process','allert');
                        break;
                    case false:
                        switch(respond.resone){
                            case 'Ronge password':
                                this.show_allert('Ronge Password','Error');
                                break;
                            case 'Ronge Email':
                                this.show_allert('Ronge Email','Error');
                                break;                                
                        }
                        break;              
                }
            this.show_hid_loading_whell(false)
            this.in_reseat_prossess_with_server=false;
            }
        })
    } 


    show_allert(text,mode){
        switch(mode){
            case 'allert':
                this.children[1].classList.remove('hid')
                this.children[1].classList.remove('error')
                this.children[1].classList.add('allert')
                this.children[1].textContent=text;
                break;
            case 'Error':
                this.children[1].classList.remove('hid')
                this.children[1].classList.remove('allert')
                this.children[1].classList.add('error')
                this.children[1].textContent=text;
                break; 
        }
    }   

    set_input_on_error_mode(input){
        input.parentElement.style.border='1px solid rgb(193 40 46 / 60%)'
    }

    hid_allert_on_re_activ_on_on_error_enput(input){
        input.addEventListener('keydown',()=>{
            this.hid_allert()
        },{once:true})
    }

    set_input_on_regular_modeon_re_activ(input){
        input.addEventListener('keydown',()=>{
            input.parentElement.style.border='1px solid #00000040'
        },{once:true})  
    }    

    async send_forget_password_object(forget_password_object){
        var respond=await fetch('/manager_users/forget_password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(forget_password_object),
        })
        respond=await respond.json()
        return respond
    }

    get_forget_password_object(){
        var forget_password_object={}
        var inputs=this.querySelectorAll('[ceck_memper]');
        for(var input of inputs){
            forget_password_object[input['name']]=input.value;
        }   
        return forget_password_object;  
    }   

    connectedCallback(){ 
        this.firest_connect()
    }

    attributeChangedCallback(name, oldValue, newValue){
        this[name]=newValue;
        this.run_on_Attribute_change(name)
    } 
    static get observedAttributes() { return ['value']; }
           
}
customElements.define('forget-password-part', Forget_Password_Part);