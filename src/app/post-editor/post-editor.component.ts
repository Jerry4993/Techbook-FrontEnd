import { Component, OnInit } from '@angular/core';
import { Router ,NavigationStart, ActivatedRoute } from '@angular/router';
import { filter,map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { error } from 'protractor';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {
  // public state: Observable<object>;
  //  title;
  //  desc;
  //  author;
  //  createdOn;
  post ={id:"",title:"",desc:"",author:"",createdOn:""};
  
  constructor(private router : Router, public activatedRoute: ActivatedRoute,private api:ApiService) { 


  }
  ngOnInit() {

     this.post.title=this.activatedRoute.snapshot.queryParamMap.get('title');
     this.post.desc=this.activatedRoute.snapshot.queryParamMap.get('desc');
     this.post.author=this.activatedRoute.snapshot.queryParamMap.get('author');
     this.post.createdOn=this.activatedRoute.snapshot.queryParamMap.get('createdOn');
     this.post.id=this.activatedRoute.snapshot.queryParamMap.get('id');
}

UpdatePost=(post)=>{
  this.api.UpdatePost(post).subscribe(
    (data)=>{
     

    },
    (error)=>{

    }


  );

}
DeletePost=(id)=>{

  this.api.deletePost(id).subscribe(
  


  );
}
      
    

  // ngOnInit() {
  //   this.state$ =  this.router.events.pipe(
  //     filter(e => e instanceof NavigationStart),
  //     map(() => this.router.getCurrentNavigation().extras.state)
  //   )
  // }
  



}

