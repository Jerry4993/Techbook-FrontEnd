import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InterceptService } from './intercept.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal';
import { UserAuthenticationService } from './user-authentication.service';
import { MatDialogConfig} from "@angular/material/dialog";
import {CookieViewComponentComponent} from './cookie-view-component'
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ["app.component.css"],
   providers:[ModalService]
})
export class AppComponent implements OnInit {
  username;
  user = [{name:'test'}];
  name;
  querytext;
  cont;
  password;
  email;
  selectedUser;
  response;
  con :{};
  ;
  baseurl = "http://127.0.0.1:8000/api";
  httpHeaders = {'Content-type':'application/json'};
  bodyText: string;

  constructor(
              public api: InterceptService,
              public auth :UserAuthenticationService,
              private router : Router,
              private http :HttpClient ,
              private dialog :MatDialog , 
              private cook :CookieService,
              private te:ApiService
              )
              {
    
    this.selectedUser={id:-1,name:'',password:'',email:''};
    this.username = localStorage.getItem("username");
    

  }
  ngOnInit(): void {
    // this.cont={"contacts":-1};
    // this.te.getTest().subscribe(
    //   (data)=>{
    //     this.cont=data
    //     console.log(this.cont.contactsList);
    //   },
    //   (error)=>console.log("has not connected")
    //   );
    // this.cont = this.con.contactsList;
    

    if(!this.cook.check('__COOKIE_CONSENT')){
    this.openDialogCookie();}
    
  }

  openDialogCookie(){
    let dialogConfig;
 
    dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(CookieViewComponentComponent,dialogConfig);
 }
   logoutUser=()=>{
    this.api.logout();
    this.router.navigateByUrl("home");
    this.username="";

  }

  public openDialog(){
    if(!this.api.isLoggedIn())
    {
   
    let DialogRef = this.dialog.open(ModalComponent, {position: {top: '3%', right: '30%'}});
    DialogRef.afterClosed().subscribe(result=>{
      if(`${result}`=="True")
      {
        
        this.router.navigateByUrl("login");
      }
      else{
        
        this.router.navigateByUrl(''); 
      }

    });
    }
    
    
  }
  public loggedIn():boolean{
    if(this.api.isLoggedIn())
    {
    this.username = localStorage.getItem("username");
    console.log(this.username);

    // x.style.width="16.6%";
    }
    
    return this.api.isLoggedIn();
  }
  chatMethod($event){
   
    this.te.getChatMethod(this.querytext).subscribe(
    (data)=>{
      this.querytext=data;
    },
    (error)=>{
      this.querytext="We are sorry ! Currently chat is not available";
    }

      
    );
    
  }




}















 
  
        
  

