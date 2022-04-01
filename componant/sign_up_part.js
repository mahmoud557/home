class Sign_up_Part extends HTMLElement {
    constructor() {
        super();
        this.firest_connect_state=false;     
    }

    firest_connect(){
        if(!this.firest_connect_state){
            this.render()
            this.render_sign_in_with_google_button()
            this.listen_to_sign_in()
            this.handel_sign_up_click()
            this.set_password_on_change()
            this.password_ceck_validate()  
            this.email_ceck_validate()   
            this.re_password_ceck_validate() 
            this.firest_connect_state=true
        }
    }

    render(){
        this.innerHTML=`
            <top-div class='center'>
                <c-icon src='/home/icons/logo2.png'  size='62' layer_target='home' class='active'></c-icon>
            </top-div>
            <div class='allert_aria center hid' >this is allert</div>
            <bottom-div>
                <div>
                    <input type='email' ceck_memper placeholder='Email' name='email' />
                </div>
                <div>
                    <input type='password' ceck_memper placeholder='Password' name='password' />
                </div>
                <div>
                    <input type='password' ceck_memper placeholder='Re Password' name='re_password' />
                </div>              
                <div class='sign_up_button center'>
                    Sign Up
                    <div class='whell center hid'>
                        <c-icon src='/home/icons/loading.svg'  size='90' layer_target='home' class='no_sellect active'></c-icon>
                    </div>
                </div>
                <div id="continue_with_google" class='continue_with_google center' data-type='icon' class='center'></div> 
                <div class='last_texts center' >
                    <div class="hid">Forget My Password</div>
                    <div class='select_none'>Sign In</div>
                </div>
            </bottom-div>
        `
    }


    show_allert(text,mode){
        switch(mode){
            case 'allert':
                this.children[1].classList.remove('hid')
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
                this.children[2].children[3].children[0].classList.remove('hid')
                break;
            case false:
                this.children[2].children[3].children[0].classList.add('hid')
                break; 
        }
    }

    delay(time){
        return new Promise((res,rej)=>{
            setTimeout(()=>{res()},time)
        })
    }



    email_ceck_validate(){
        this.children[2].children[0].children[0].father=this;
        this.children[2].children[0].children[0]
        .ceck_validate=function(){
            if(this.value==''){return {valid:false,resone:'Empty Email'}}
            if(this.value==' '){return {valid:false,resone:'Empty Email'}}
            if(!/\S+@\S+\.\S+/.test(this.value)){return {valid:false,resone:'Unvalid Email Address'}}
            return {valid:true}
        }
    }

    password_ceck_validate(){
        this.children[2].children[1].children[0].father=this;
        this.children[2].children[1].children[0]
        .ceck_validate=function(){
            if(this.value==''){return {valid:false,resone:'Empty password'}}
            if(this.value==' '){return {valid:false,resone:'Empty password'}}
            if(this.value.length<=4){return {valid:false,resone:'Password Shoude Be More Than 4 Leters'}}
            return {valid:true}
        }
    }

    re_password_ceck_validate(){
        this.children[2].children[2].children[0].father=this;
        this.children[2].children[2].children[0]
        .ceck_validate=function(){
            if(this.value!=this.father.password){return {valid:false,resone:'Passwords Did Not Matchs'}}
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

    set_password_on_change(){
        this.children[2].children[1].children[0]
        .addEventListener('change',(e)=>{
            this.password=e.currentTarget.value;
        })
    }

    hid_allert_on_re_activ_on_on_error_enput(input){
        input.addEventListener('keydown',()=>{
            this.hid_allert()
        },{once:true})
        input.addEventListener('change',()=>{
            this.hid_allert()
        },{once:true})      
    }

    set_input_on_error_mode(input){
        input.parentElement.style.border='1px solid rgb(193 40 46 / 60%)'
    }

    set_input_on_regular_modeon_re_activ(input){
        input.addEventListener('keydown',()=>{
            input.parentElement.style.border='1px solid #00000040'
        },{once:true})  

        input.addEventListener('change',()=>{
            input.parentElement.style.border='1px solid #00000040'
        },{once:true})                
    }    

    async render_sign_in_with_google_button(){
      await this.delay(50)
      var width=document.getElementById("continue_with_google").clientWidth
      google.accounts.id.renderButton(
        document.getElementById("continue_with_google"),
        { theme: "outline" ,width:width,text:'continue_with',mode:'redirect'}  // customization attributes
      ); 
    }

    get_sign_up_object(){
        var sign_up_object={}
        var inputs=this.querySelectorAll('[ceck_memper]');
        for(var input of inputs){
            sign_up_object[input['name']]=input.value;
        }   
        return sign_up_object;  
    }

    async send_sign_up_object(sign_up_object){
        var respond=await fetch('/sign_up/form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sign_up_object),
        })
        respond=await respond.json()
        return respond
    }

    handel_sign_up_click(){
        this.children[2].children[3]
        .addEventListener('click',async()=>{
            if(this.in_sign_up_prossess_with_server){return}
            if(this.check_all_inputs()){
                var sign_up_object=this.get_sign_up_object();
                console.log(sign_up_object)
                this.in_sign_up_prossess_with_server=true;
                this.show_hid_loading_whell(true)
                var respond=await this.send_sign_up_object(sign_up_object)
                switch(respond.state){
                    case true:
                        this.render_go_to_your_email()
                        break;
                    case false:
                        switch(respond.reson){
                            case 'rong password':
                                this.show_allert('Rong Password','Error');
                                break;
                            case 'Rong User Name':
                                this.show_allert('Rong Password','Error');
                                break;                                
                        }
                        break;              
                }
            this.show_hid_loading_whell(false)
            this.in_sign_up_prossess_with_server=false;
            }
        })
    } 
    handel_contanuio_with_google_click(){
        this.children[2].children[3]
        .addEventListener('click',async()=>{

        })
    } 
    render_go_to_your_email(){
        this.show_allert('Go To Your Email For complete Verification process','allert');
    }

    listen_to_sign_in(){
        this.children[2].children[5].children[1]
        .addEventListener('click',()=>{
            this.father.children[3].show(this.father.sign_in_part)
        })
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
customElements.define('sign-up-part', Sign_up_Part);