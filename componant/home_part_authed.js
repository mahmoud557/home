
class Home_Part_Authed extends HTMLElement {
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
            this.handel_avatar_click()
            this.handel_avatar_button_click()            
            this.handel_click_on_go_to_dashboard()
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
                       <div class='center'>Dashboard</div>
                       <div class='center'>Pricing</div>
                       <div class='center'>Help</div>
                   </right-div>
                </left-div>
                <right-div class='center'>
                    <c-icon src='https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png'  size='80' layer_target='home' class='active'></c-icon>
                    <in-out-slider>
                        <div class='center' button_key='Account'>
                            <c-icon src='/home/icons/account.svg'  size='40'></c-icon>
                            <span>Account</span>                        
                        </div>
                        <div class='center' button_key='Downloads'>
                            <c-icon src='/home/icons/downloads.svg'  size='40'></c-icon>
                            <span>Downloads</span>                            
                        </div>
                        <div class='center' button_key='Orders'>
                            <c-icon src='/home/icons/history.svg'  size='40'></c-icon>
                            <span>Orders</span>                           
                        </div>
                        <div class='center' button_key='Help'>
                            <c-icon src='/home/icons/help.svg'  size='40'></c-icon>
                            <span>Help</span>                           
                        </div>
                        <div class='center'>
                            <c-icon src='/home/icons/log_out.svg'  size='40'></c-icon>
                            <span>Sign Out</span>                           
                        </div>                       
                    </in-out-slider>
                </right-div>            
            </nav>      
            <top-div class='center' hazi_key='5'>
                <search-par></search-par>
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

    handel_avatar_click(){
        this.children[0].children[1].children[0]
        .addEventListener('click',()=>{
            var slide_state= this.children[0].children[1].children[1].slide_state;
            switch(slide_state){
                case "in":
                    this.children[0].children[1].children[1].slide_out('234','c')
                    break;
                case "out":
                    this.children[0].children[1].children[1].slide_in('b_to_t')
                    break;                  
            }
        })
    }

    handel_avatar_button_click(){
        for(var childern of this.children[0].children[1].children[1].children){
            childern.addEventListener('click',(e)=>{
                var button_key=e.currentTarget.getAttribute('button_key');
                if(button_key){
                    window.location.href = `/dashboard/#viow=${button_key}`;
                }
            })
        }
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

    create_and_render_suscrip_plans(){
        if(!this.data){return}
        for(var plan of this.data.subscrip_plans){
            var subscrip_plan=document.createElement('subscrip-plan')
            subscrip_plan.setAttribute('name',plan.name)        
            subscrip_plan.setAttribute('price',plan.price)        
            subscrip_plan.setAttribute('discription',plan.discription)  
            subscrip_plan.adventags=plan.adventags
            this.children[2].children[1].children[1].appendChild(subscrip_plan)
        }
    } 

    handel_click_on_go_to_dashboard(){
        this.children[0].children[0].children[1].children[0]
        .addEventListener('click',()=>{
            window.location.href = '/dashboard';
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

    attributeChangedCallback(name, oldValue, newValue){
        this[name]=newValue;
        this.run_on_Attribute_change()
    } 
    static get observedAttributes() { return []; }    
           
}
customElements.define('home-part-authed', Home_Part_Authed);