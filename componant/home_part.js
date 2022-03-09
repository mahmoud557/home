class Home_Part extends HTMLElement {
    constructor() {
        super();
        this.firest_connect_state=false;
    }

    async firest_connect(){
        if(!this.firest_connect_state){
            await this.get_data()
            this.render()
            this.create_and_render_suscrip_plans()
            this.create_price_list_catagorys()
            this.render_price_list_catagorys()
            this.create_Sign_In_part()
            this.create_Sign_up_part()
            this.show_Sign_In_part()
            this.show_Sign_up_part()
            this.handel_search()
            this.handel_click_on_download()
            this.firest_connect_state=true
        }
    }

    render(){
        this.innerHTML=`
            <nav class='center' hazi_key='5'>
                <left-div>
                   <left-div class='center'>
                       <c-icon src='home/icons/logo2.png'  size='80' layer_target='home' class='active'></c-icon>
                   </left-div>
                   <right-div >
                       <div class='center'>Pricing</div>
                       <div class='center'>Help</div>
                   </right-div>
                </left-div>
                <right-div class='center'>
                    <right-div class='center'>Sign Up</right-div>
                    <left-div class='center'>Sign In</left-div>
                </right-div>             
            </nav>      
            <top-div class='center' hazi_key='5'>
                <search-par></search-par>
                <in-out-slider>
                    <left-div class='center'>
                    </left-div>
                    <right-div>
                        <top-div></top-div>
                        <bottom-div class='center'>Download Full Size</bottom-div>
                    </right-div>
                </in-out-slider>
            </top-div>
            <bottom-div hazi_key='5'>
                <div class='price_list'>
                    <top-div class='center'>
                        Price List
                    </top-div>
                    <bottom-div class='center'>
                    </bottom-div>              
                </div>
                <div class='plans'>
                    <top-div class='center'>
                        <span class='center'>Wallet Plans</span>
                        <span class='center discrip'>Enjoy various wallet recharge packages to download your files</span>
                    </top-div>
                    <bottom-div class='center'>
                        
                    </bottom-div>
                </div>
                <icons-slider></icons-slider>
                <div class='footer center'>
                    <left-div>
                        <div class='logo'>
                            <c-icon src='home/icons/white-logo.png'  size='46' layer_target='home' class='active'></c-icon>
                        </div>
                        <div class='number'>PH : 0101955662</div>
                        <div class='email'>mamoth@gmail.com</div>
                        <div class='icons'>
                            <c-icon src='home/icons/fac.svg'  size='90' href='google.com' layer_target='home' class='active'></c-icon>
                            <c-icon src='home/icons/ins.svg'  size='90' layer_target='home' class='active'></c-icon>
                            <c-icon src='home/icons/whats.svg'  size='90' layer_target='home' class='active'></c-icon>
                        </div>
                    </left-div>
                    <right-div class='center'>
                        <c-icon src='home/icons/payment-logo.png'  size='90' layer_target='home' class='active'></c-icon>
                    </right-div>
                </div>
            </bottom-div>

            <pop-up display_state='none' hazi='5' id='home_popup'></pop-up>
        `       
    }

    async get_data(){
        try{
            var response=await fetch('home/data.json');
            if(response.ok){
                this.data=await response.json()
            }else{this.data=false}      
        }catch(err){
            console.log(err)
        }
    }

    handel_search(){
        this.children[1].children[0]
        .addEventListener('input_change',async(e)=>{
            if(e.value==''||e.value==' '){
                console.log(true)
                this.hid_url_info_slider()
                return
            }
            try{
                var url = new URL(e.value);
                var url_info=await this.get_url_info(url)
                this.render_url_info(url_info)
            }catch(err){
                console.log('unvalid link')
                return
            }
            
        })
    }

    render_url_info(url_info){
        console.log(url_info)
        this.children[1].children[1].children[0]
        .innerHTML=`<c-icon src='${url_info.result.itemThumb}'  size='90' href='google.com' layer_target='home' class='active'></c-icon>`
        this.children[1].children[1].children[1].children[0].innerHTML=`
            <info-line key=${'Name'} value='${!url_info.result.itemName||url_info.result.itemName=="N/A"?url_info.result.itemSlug:url_info.result.itemName}'></info-line>
            <info-line key=${'Site'} value='${url_info.result.itemSite}'></info-line>
            <info-line key=${'Price'} value='${url_info.result.price} LE'></info-line>
        `
        this.delay(200)
        this.show_url_info_slider()
    }

    show_url_info_slider(){
       this.children[1].children[1].slide_out('12','300','t_to_b') 
    }

    hid_url_info_slider(){
        this.children[1].children[1].slide_in('b_to_t')  
    }

    handel_click_on_download(){
        this.children[1].children[1].children[1].children[1]
        .addEventListener('click',()=>{
            this.children[0].children[1].children[1].click()
        })
    }

    async get_url_info(url){
        var respond=await fetch('/get_url_info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({url}),
        })
        respond=await respond.json()
        return respond       
    }

    create_price_list_catagorys(){
        if(!this.data){return}
        this.Photo_category=document.createElement('price-list-category')
        this.Photo_category.setAttribute('src','home/icons/img.svg')
        this.Photo_category.setAttribute('head_title','Photo')
        this.Photo_category.price_lines=this.data.photo_price_lines

        this.video_category=document.createElement('price-list-category')
        this.video_category.setAttribute('src','home/icons/video.svg')
        this.video_category.setAttribute('head_title','Video')
        this.video_category.price_lines=this.data.video_price_lines

        this.music_category=document.createElement('price-list-category')
        this.music_category.setAttribute('src','home/icons/music.svg')
        this.music_category.setAttribute('head_title','music') 
        this.music_category.price_lines=this.data.music_price_lines     
    }

    render_price_list_catagorys(){
        if(!this.data){return}
        this.children[2].children[0].children[1].appendChild(this.Photo_category)
        this.children[2].children[0].children[1].appendChild(this.video_category)
        this.children[2].children[0].children[1].appendChild(this.music_category)
    }

    handel_click_on_charge_button(){
        this.father.children[0].children[1].children[1].click()
    }

    create_and_render_suscrip_plans(){
        if(!this.data){return}
        for(var plan of this.data.subscrip_plans){
            var subscrip_plan=document.createElement('subscrip-plan')
            subscrip_plan.setAttribute('name',plan.name)        
            subscrip_plan.setAttribute('price',plan.price)        
            subscrip_plan.setAttribute('discription',plan.discription) 
            subscrip_plan.father=this;
            subscrip_plan.on_charege_click=this.handel_click_on_charge_button;
            subscrip_plan.adventags=plan.adventags
            this.children[2].children[1].children[1].appendChild(subscrip_plan)
        }
    } 

    create_Sign_In_part(){
        this.sign_in_part=document.createElement('sign-in-part');
        this.sign_in_part.father=this;
    }

    create_Sign_up_part(){
        this.sign_up_part=document.createElement('sign-up-part');
        this.sign_up_part.father=this;
    }

    show_Sign_In_part(){
        this.children[0].children[1].children[1]
        .addEventListener('click',()=>{
            this.children[3].show(this.sign_in_part)
            google.accounts.id.prompt()
        })
    }

    show_Sign_up_part(){
        this.children[0].children[1].children[0]
        .addEventListener('click',()=>{
            this.children[3].show(this.sign_up_part)
            google.accounts.id.prompt()
        })
    }

    connectedCallback(){ 
        this.firest_connect()           
    }

    run_on_Attribute_change(){
        if(this.firest_connect_state){
            return;
        } 
    }

    delay(time){
        return new Promise((res,rej)=>{
            setTimeout(()=>{res()},time)
        })
    }    

    attributeChangedCallback(name, oldValue, newValue){
        this[name]=newValue;
        this.run_on_Attribute_change()
    } 
    static get observedAttributes() { return []; }    
           
}
customElements.define('home-part', Home_Part);
//https://www.freepik.com/premium-photo/dark-blue-wall-with-decorative-stucco-smoke-smog-spotlight_9130181.htm
//https://www.freepik.com/premium-photo/rice-fields-terraced-sunset-mu-chang-chai-yen-bai-vietnam_10952497.htm