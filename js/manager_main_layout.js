
function manager_main_layout(){
	this.main_holder=document.getElementById('main_holder');

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


}


var MML=new manager_main_layout
