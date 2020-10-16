import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

import { Injectable } from '@angular/core';
import { HttpInterceptor ,HttpEvent,  HttpHeaders ,HttpClient ,HttpRequest, HttpHandler, HttpErrorResponse} from '@angular/common/http';
import { Observable,interval } from 'rxjs';
import { catchError, mergeMap , map, flatMap} from 'rxjs/operators';


// import  'rxjs/add/operator/mergeMap';


@Injectable({
  providedIn: 'root'
})

export class InterceptService   implements HttpInterceptor{
  baseurl = "http://127.0.0.1:8000/api";
  httpHeaders = {'Content-type':'application/json'};
  response;

  constructor(private http: HttpClient ,private dialog :MatDialog ) { 
    if(this.isLoggedIn())
    {
      this.iterMeth();
    }
     

  }


  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
    if(this.getAccessToken())
    {
        req =  this.insertTokenIntoHeaders(req,this.getAccessToken());
        console.log("inserted token this is intercept service")
    }
  
    return next.handle(req)
    .pipe(catchError((error :HttpErrorResponse)=>
    {
        if( error.status ==401){
          console.log("login again");
          return null;
          
          //  return this.refreshToken(req,next);  
        }

    })) as any;
            }

  refreshToken(req,next){

    const body = {refresh:localStorage.getItem('refresh_token')};
    return this.http.post<any>(this.baseurl+'/token/refresh/',body,{headers:this.httpHeaders}).pipe(map(
      (res: Response) => { 
        this.response = res;
        this.setToken({access:this.response.access,refresh:body.refresh}) ;   
        req = this.insertTokenIntoHeaders(req,this.response.access);
        },
        (error)=>{
          console.log(error);
     
          alert("Session Expired !! Login again to continue")
          this.logout();
        }
          
        


      ))as any;
  } 
  private IntervalMethod(){
    console.log("inside interval");
    
    return interval(60*4800).pipe(flatMap(()=>
     {return this.http.post<any>(this.baseurl+'/token/refresh/',{refresh:localStorage.getItem('refresh_token')},{headers:this.httpHeaders})
     }));
      
    }
    private iterMeth = () =>{
      this.IntervalMethod().subscribe(
          (data) => { 
            
            this.response = data;
            this.setToken({access:this.response.access,refresh:localStorage.getItem('refresh_token')}) ;   
          }
      )
      
    }
          
      


  
  private insertTokenIntoHeaders(request : HttpRequest<any> , token  ){
    return request.clone({
        setHeaders:{
            'Authorization' : `Bearer ${token}`,
            'Content-type' : 'application/json'}
        }
    
    )
 
 }    

  public setToken(resp){
    localStorage.setItem('access_token',resp['access'])
    localStorage.setItem('refresh_token',resp['refresh'])


  } 

  public getAccessToken():string{
    return localStorage.getItem("access_token");
  }
  public getRefreshToken():string{
    return localStorage.getItem("refresh_token");
  }

 public isLoggedIn(): boolean{
        return localStorage.getItem('refresh_token') !==  null;
      }

public logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('username');
        
      }


}


