import { Component } from '@angular/core';
import { UserAuthenticationService } from 'src/app/user-authentication.service';
import { Router } from '@angular/router';


@Component(
    {
        
    templateUrl:"login.component.html",
    styleUrls: ["login.component.css"],
    providers:[UserAuthenticationService]
}
)

export class loginComponent{
    loginUser;
    regUser;
    togglebool : boolean =true;
    
    response;
    errorMessage;
    constructor(private api :UserAuthenticationService,  private router :Router){

        this.loginUser={username:'',password:''}
        this.regUser={username:'',password:'',email:''}
    }

    authUser = () => {
        this.errorMessage=""
        
        this.api.authUser(this.loginUser).subscribe(
            data =>{
                this.response=data;
                
                localStorage.setItem('access_token',this.response['access'])
                let token = localStorage.getItem('access_token')
                localStorage.setItem('refresh_token',this.response['refresh'])
                localStorage.setItem('username',this.loginUser.username)
                //GlobalConstants.httpHeaders= new HttpHeaders({'Content-type':'application/json','Authorization':`Bearer ${token}`})
                //console.log(GlobalConstants.httpHeaders)
                this.router.navigateByUrl("dashboard") 
            },
            error =>{ 
                console.log("Unauthorized access")
                this.errorMessage="Unable to recognize you.Please try again"
                 
            }
        )

    }
    registerUser = () => {
        this.errorMessage=""
        this.api.registerUser(this.regUser).subscribe(
            data=>{
                this.response = data
                console.log(this.response)
                this.regUser={username:'',password:'',email:''}
                var ch = <HTMLInputElement>document.getElementById("check-box");
                ch.checked=false;
                this.togglebool=true;
                location.reload()
                // this.router.navigateByUrl('login');
            },
            error=>{
                this.errorMessage ="User already exists .Try a different username"
                this.regUser={username:'',password:'',email:''}
                var ch = <HTMLInputElement>document.getElementById("check-box");
                ch.checked=false;
                this.togglebool=true;


            }
        )


    }
    



    register(event){
        this.errorMessage='';

        var x = document.getElementById("login");
        var y = document.getElementById("register");
        var z = document.getElementById("btn");
        this.loginUser={username:'',password:''}
        
        var ch = <HTMLInputElement>document.getElementById("check-box");
        ch.checked=false;
       var a = <HTMLInputElement> document.getElementById("regerr");
       a.disabled=true;
       var b =  <HTMLInputElement> document.getElementById("logerr");
       b.disabled=false;
        x.style.left="-500px";
        y.style.left = "50px";
        z.style.left="110px";
    }
    login(event){
        this.errorMessage='';
        var x = document.getElementById("login");
        var y = document.getElementById("register");
        var z = document.getElementById("btn");
        // this.regUser.username = ''
        // this.regUser.email=''
        // this.regUser.password=''
        this.regUser="";
        var a = <HTMLInputElement> document.getElementById("regerr");
       a.disabled=false;
       var b =  <HTMLInputElement> document.getElementById("logerr");
       b.disabled=true;
       var ch = <HTMLInputElement>document.getElementById("check-box");
        ch.checked=false;

        x.style.left="50px";
        y.style.left = "500px";
        z.style.left="0px";


    }
    changed(event){
        if(event.target.checked && this.regUser !='' && this.regUser.password !='' && this.regUser.email!=''){
            this.togglebool=false;
        }
        else{
            this.togglebool=true;
        }
    }
}