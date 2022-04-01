class Icons_Slider extends HTMLElement {
    constructor(){
        super();
        this.firest_connect_state=false;
    }

    firest_connect(){
        if(!this.firest_connect_state){
            this.render()
            this.move_left()
            this.move_right()
            this.firest_connect_state=true
        }
    }

    render(){
        this.innerHTML=`
            <div class='left_button center'>
                <c-icon src='/home/icons/left_arrow.svg'  size='30' layer_target='home' class='active'></c-icon>
            </div>
            <div class='icons_holder center'>
                <c-icon src='/home/icon/adobestock.png'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/alamy.png'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/audiio.png'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/depositphotos.png'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/epidemicsound.jpg'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/filmsupply.png'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/freepik.jpg'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/icon8.png'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/istockphoto.png'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/lovepik.png'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/motionarray.jpg'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/ooopic.jpg'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/pikbest.jpg'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/pixelsquid.jpg'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/pngtree.jpg'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/poweredtemplate.png'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/shutterstock.png'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/soundsnap.png'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/stockgraphics.jpg'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/stockunlimited.png'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/storeshock.jpg'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/taopic.png'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/unlimphotos.jpg'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/utoimage.jpg'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/vecteezy.png'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/vectorgrove.jpg'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/vectorstock.png'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/vexels.jpg'  size='90' layer_target='home' class='active'></c-icon>
                <c-icon src='/home/icon/videoblocks.jpg'  size='90' layer_target='home' class='active'></c-icon>
            </div>
            <div class='right_button center'>
                <c-icon src='/home/icons/right_arrow.svg'  size='30' layer_target='home' class='active'></c-icon>
            </div>

        `       
    }

    connectedCallback(){ 
        this.firest_connect()           
    }

    move_left(){
        this.children[0].addEventListener('mousedown',()=>{
            this.children[1].scrollLeft -= 58;
        })
    }

    move_right(){
        this.children[2].addEventListener('mousedown',()=>{
            this.children[1].scrollLeft += 58;
        })
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
customElements.define('icons-slider', Icons_Slider);