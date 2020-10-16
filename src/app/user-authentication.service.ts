import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders ,HttpBackend} from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'  
})
export class UserAuthenticationService {
  resp;
  baseurl = "http://127.0.0.1:8000/";
  httpHeaders = new HttpHeaders({'Content-type':'application/json'})
  constructor(private http : HttpClient, private httpbackend :HttpBackend ){
 
  }

  authUser(loginUser):Observable<any>{
    const newHttpClient = new HttpClient(this.httpbackend);
    const body ={username:loginUser.username,password:loginUser.password}
    return newHttpClient.post(this.baseurl+"api/token/",body,{headers:this.httpHeaders})
  }






  
  registerUser(regUser):Observable<any>{
    const newHttpClient = new HttpClient(this.httpbackend);
    const body ={username:regUser.username,password:regUser.password,email:regUser.email}
    return newHttpClient.post(this.baseurl+"users/",body,{headers:this.httpHeaders})
 

  }

}
