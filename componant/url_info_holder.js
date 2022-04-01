class Url_info_holder extends HTMLElement {
    constructor() {
        super();
        this.url_info;
        this.more_than_one_price_line;
        this.download_requste_in_prossess=false;
        this.firest_connect_state=false;     
    }

    firest_connect(){
        if(!this.firest_connect_state){
            this.render()
            this.create_price_lines()
            this.handel_download_click()
            this.set_firest_price_line_in_select()
            this.firest_connect_state=true
        }
    }

    render(){
        this.innerHTML=`
            <left-div class='center'>
                <c-icon src='${this.url_info.result.itemThumb}' class='select_none'  size='90' ></c-icon>
            </left-div>
            <right-div>
                <top-div>
                    <info-line key=${'Name'} value='${!this.url_info.result.itemName||this.url_info.result.itemName=="N/A"?this.url_info.result.itemSlug:this.url_info.result.itemName}'></info-line>
                    <info-line key=${'Site'} value='${this.url_info.result.itemSite}'></info-line>
                    <div class='r-s-c'>
                    </div>               
                </top-div>
                <bottom-div class='center select_none'>Download Full Size</bottom-div>
            </right-div>
        `
    }

    show_hid_loading_whell(visible_state){
        switch(visible_state){
            case true:
                this.children[1].children[1].innerHTML='<loading-wheel></loading-wheel>';
                break;
            case false:
                this.children[1].children[1].innerHTML='Download Full Size';
                break; 
        }
    }    

    get_selected_price_line(){
        if(!this.more_than_one_price_line){return this.price_line}
        for(var children of this.children[1].children[0].children[2].children){
            if(children.checked()){return{key:children.key,value:children.value}}
        }
    }

    handel_download_click(){
        this.children[1].children[1].addEventListener('click', async ()=>{
            var price_line=this.get_selected_price_line()
            var download_object={price_line,url_info:this.url_info};
            var download_link=await this.get_download_link(download_object)

        })
    }

    async get_download_link(download_object){
        try{
            if(this.download_requste_in_prossess==true){return}
            this.download_requste_in_prossess=true;
            this.show_hid_loading_whell(true)
            this.show_prossing_allert()
            var respond=await fetch('/manager_get_stocks/get_download_link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },         
                body: JSON.stringify({download_object})
            })
            var responseHeaders = Object.fromEntries(respond.headers.entries())  
            console.log(responseHeaders)       
            if(responseHeaders.sucsess=='false'){
                console.log(responseHeaders)
                switch (responseHeaders.fail_resone) {
                    case 'no_palance':
                        this.show_no_palance_allert()
                        break;
                    default:
                        // statements_def
                        break;
                }
            }else{
                var file_size=responseHeaders.file_size;
                var file_size_by_mega=(file_size / (1024*1024)).toFixed(2);
                var file_name=responseHeaders.file_name;
                var downloaded_file_bytes=[];
                var downloaded_bytes_length=0;
                var downlaod_prasent=0;

                this.show_downloading_allert(`${file_name.slice(0, 20)} ....`,`${file_size_by_mega} MB `)
                const reader = respond.body.getReader();
                while (true) {
                  const { value, done } = await reader.read();
                  await this.delay(1)
                  if (done){break};
                  downloaded_file_bytes.push(value)
                  downloaded_bytes_length+=value.length;
                  downlaod_prasent=Math.floor((downloaded_bytes_length/file_size)*100)
                  MML.allert_in_show.upload_title(`Downloading ( ${downlaod_prasent}% )`)
                }  
                var bytes=new Blob(downloaded_file_bytes)
                var link = document.createElement('a');  // CREATE A LINK ELEMENT IN DOM
                link.href = URL.createObjectURL(bytes);  // SET LINK ELEMENTS CONTENTS
                link.setAttribute('download', `${file_name}`); // SET ELEMENT CREATED 'ATTRIBUTE' TO DOWNLOAD, FILENAME PARAM AUTOMATICALLY
                link.click()
                this.show_downloaded_allert(`${file_name.slice(0, 20)} ....`,`${file_size_by_mega} MB `)
            }
            this.download_requste_in_prossess=false;
            this.show_hid_loading_whell(false)
        }catch(err){
            this.download_requste_in_prossess=false
             this.show_hid_loading_whell(false);
            console.log(err)
        }
 
    }      

    create_price_lines(){
        if(this.url_info.price_lines.length==1){
            this.more_than_one_price_line=false;
            this.price_line=this.url_info.price_lines[0];
            var select_price_line=document.createElement('info-line');
            select_price_line.setAttribute('key', this.price_line.key)
            select_price_line.key=this.price_line.key;
            select_price_line.setAttribute('value', `${this.price_line.value} LE`)
            select_price_line.value=`${this.price_line.value} LE`;
            select_price_line.setAttribute('class', 'select_none')
            this.children[1].children[0].children[2].appendChild(select_price_line)           
        }else{
            this.more_than_one_price_line=true;
            for(var price_line of this.url_info.price_lines){
                var select_price_line=document.createElement('selectable-info-line');
                select_price_line.setAttribute('key', price_line.key)
                select_price_line.key=price_line.key;
                select_price_line.setAttribute('value', `${price_line.value} LE`)
                select_price_line.value=`${price_line.value} LE`;
                select_price_line.setAttribute('class', 'select_none')
                this.children[1].children[0].children[2].appendChild(select_price_line)
            }
        }
    }

    set_firest_price_line_in_select(){
        if(!this.more_than_one_price_line){return}
        this.children[1].children[0].children[2].children[0].set_in_select()
    }

    connectedCallback(){ 
        this.firest_connect()
    }

    run_on_Attribute_change(attribute_name){
        if(this.firest_connect_state){
            if(attribute_name=='value'){
                this.set_value()
            }
        } 
    }

    async show_prossing_allert(){
        var title=' Prossing ....';
        var title_background='#282828';
        var body=`Your file is Prossing `;
        var distroy_time=null;
        await MML.show_allert_Without_feedback(title,title_background,body)
    } 

    async show_downloading_allert(file_name,file_size){
        var title='Downloading ( 0% )';
        var title_background='#282828';
        var body=`File Name : ${file_name} <br> File Size : ${file_size} `;
        var distroy_time=null;
        await MML.show_allert_Without_feedback(title,title_background,body)
    } 

    async show_downloaded_allert(file_name,file_size){
        var title='Success Download';
        var title_background='#282828';
        var body=`File Name : ${file_name} <br> File Size : ${file_size} `;
        var distroy_time=null;
        await MML.show_allert_Without_feedback(title,title_background,body,10000)
    }     

    async update_downloading_allert_with_downlaod_prasent(){
        MML.allert_in_show.upload_title(`Downloading (${downlaod_prasent})`)
    } 

    async show_no_palance_allert(){
        var title='Not Enough Balance ';
        var title_background='#282828';
        var body=`You Dont Have Enough Balance To Download This File`;
        var distroy_time=null;
        await MML.show_allert_Without_feedback(title,title_background,body)
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
    static get observedAttributes() { return ['value']; }
           
}
customElements.define('url-info-holder', Url_info_holder);