import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { timingSafeEqual } from 'crypto';
import { CookieService } from 'ngx-cookie-service'


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseurl = "http://127.0.0.1:8000/api";
  url = "http://www.mocky.io/v2/5c5d880f3200000e11220880";
  httpHeaders;
  csrftoken;

  constructor(private http: HttpClient,private cookie : CookieService) {
    this.csrftoken  = this.cookie.get('csrf')

    this.httpHeaders = new HttpHeaders().set('Content-type','application/json').set('X-CSRFToken',this.csrftoken)
   }
  getChatMethod(query):Observable<any>{
    return this.http.get(this.baseurl+'/chat/'+query,{headers:this.httpHeaders});
  }
  getTest() :Observable<any>{
    return this.http.get(this.url);
  }
  getAllUsers(): Observable<any>{
    return this.http.get(this.baseurl+'/myUser/',{headers: this.httpHeaders});
    

  }
  getAllPosts(): Observable<any>{
    // return this.http.get(this.baseurl+'/myPosts/'+username+'/',{headers: this.httpHeaders});
    return this.http.get(this.baseurl+'/myPosts/',{headers: this.httpHeaders});
    

  }
    
      
  
  getOneUser(id): Observable<any>{
    return this.http.get(this.baseurl+'/myUser/'+ id+'/',
    {headers: this.httpHeaders}
    
    )
  }
  updateUser(user): Observable<any>{
    const body = {id:user.id,name : user.name, email : user.email, password : user.password};
    return this.http.put(this.baseurl+'/myUser/'+ user.id + "/", body,
    {headers: this.httpHeaders}
    
    )
  }
  UpdatePost(post):Observable<any>{
    const body = {id:post.id,title:post.title,desc:post.desc,author:post.author,createdOn:post.createdOn};
    return this.http.put(this.baseurl+'/myPosts/'+post.id,body,
    {
      headers: this.httpHeaders
    }
    
    )


  } 
  deletePost(post):Observable<any>{
    return null;

  }
  createUser(user): Observable<any>{
    const body = {name : user.name, password : user.password, email : user.email};
    console.log(user.email)
    return this.http.post(this.baseurl+'/users/', body,
    {headers: this.httpHeaders}
    
    )
  }
  deleteUser(id): Observable<any>{
    
    return this.http.delete(this.baseurl+'/users/'+ id + "/",
    {headers: this.httpHeaders}
    
    )  
  }
}
