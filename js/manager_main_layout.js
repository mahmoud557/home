
function manager_main_layout(){
	this.main_holder=document.getElementById('main_holder');
    this.allert_in_show=false;

    function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential,response);
    }

    window.onload = function () {
        google.accounts.id.initialize({
            client_id: "530638225218-0bn200lkl8nqoionnv6ns2og60calf43.apps.googleusercontent.com",
            callback: handleCredentialResponse,
            ux_mode:'redirect',
            login_uri:'http://localhost:3000/manager_users/contanuio_with_google'
        });
    }

    this.main_holder.render_home_part=(()=>{
        var path=window.location.pathname;
        if(path=='/authed'){
            var home=document.createElement('home-part-authed');
            this.main_holder.children[0].children[0].appendChild(home)
        }else{
            var home=document.createElement('home-part');
            this.main_holder.children[0].children[0].appendChild(home)
        }
    })()


    this.hid_all_allerts=()=>{
        if(this.allert_in_show){
            this.allert_in_show.remove()
        }
    }

    this.show_allert_Without_feedback=(title,title_background,body,distroy_time)=>{
        if(!this.allert_in_show){
            this.allert_in_show=document.createElement('allert-without-feedback');
            this.allert_in_show.allert_title=title;
            this.allert_in_show.allert_body=body;
            this.allert_in_show.distroy_time=distroy_time;
            this.allert_in_show.title_background=title_background;
            this.allert_in_show.father=this;
            this.main_holder.appendChild(this.allert_in_show)           
        }else{
            this.allert_in_show.remove()
            this.allert_in_show=document.createElement('allert-without-feedback');
            this.allert_in_show.allert_title=title;
            this.allert_in_show.allert_body=body;
            this.allert_in_show.distroy_time=distroy_time;
            this.allert_in_show.title_background=title_background;
            this.allert_in_show.father=this;            
            this.main_holder.appendChild(this.allert_in_show)
        }
    }

    this.show_allert_With_feedback=(title,title_background,body,feedbacks)=>{
        return new Promise((res,rej)=>{
            if(!this.allert_in_show){
                this.allert_in_show=document.createElement('allert-with-feedback');
                this.allert_in_show.allert_title=title;
                this.allert_in_show.allert_body=body;
                this.allert_in_show.title_background=title_background;
                this.allert_in_show.feedbacks=feedbacks;
                this.allert_in_show.father=this;
                this.allert_in_show
                .addEventListener('feedback',(e)=>{
                    res(e.feedback)
                })
                this.main_holder.appendChild(this.allert_in_show)           
            }else{
                this.allert_in_show.remove()
                this.allert_in_show=document.createElement('allert-with-feedback');
                this.allert_in_show.allert_title=title;
                this.allert_in_show.allert_body=body;
                this.allert_in_show.feedbacks=feedbacks;            
                this.allert_in_show.father=this;
                this.allert_in_show
                .addEventListener('feedback',(e)=>{
                    res(e.feedback)
                })                      
                this.main_holder.appendChild(this.allert_in_show)
            }           
        })
    }    


}


var MML=new manager_main_layout
