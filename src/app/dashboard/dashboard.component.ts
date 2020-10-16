import { Component } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router'
import { ApiService } from 'src/app/api.service';
import { InterceptService } from '../intercept.service';

@Component({
    templateUrl:"dashboard.component.html",
    styleUrls:["dashboard.component.css"],
    providers:[ApiService]})
export class dashboardComponent {
  user; 
  posts;
  post;
  username ;
  name;
  password;
  email;
  selectedUser; 
  id;

  constructor(private api: ApiService,public intercept : InterceptService,private router :Router){

    
    this.username= localStorage.getItem('username');

    this.getPosts()
    
  }
  getPosts = () =>{
    this.api.getAllPosts().subscribe(
    data =>{
      
      this.posts = data;
     
    },
    error =>{
      console.log(error); 
    }
    );
    }
    getSinglePost = (u)=>{
      //  this.post = u;
      // const navigationextras : NavigationExtras = {
      //    state: { hello: 'world' }
      //     title: u.title,
      //      desc:u.desc,
      //      author:u.author,
      //     /createdOn:u.createdOn
      //   }
        this.router.navigate(['/postEditor'],{ queryParams: {id:u.id, title:u.title,desc:u.desc,createdOn:u.createdOn,author:u.author} });
        // this.router.navigate(['/heroes', { id: "world" }]);
        
      };
      
     
     
    }
  // getUsers = () =>{
  //   this.api.getAllUsers().subscribe(
  //   data =>{
      
  //     this.user = data;
     
  //   },
  //   error =>{
  //     console.log(error); 
  //   }
  //   );
  //   }
  //   userClicked = (user)=>{
  //     console.log(user.id)
    
  //      this.api.getOneUser(user.id).subscribe(
  //       data =>{
  //         this.selectedUser=data
  //         console.log(this.selectedUser.id)
         
  //       },
  //       error =>{
  //          console.log(error);
  //       }
  //       );
      

  //   }
  //   updateUser =() =>{
      
  //     this.api.updateUser(this.selectedUser).subscribe(
  //       data =>{
  //         this.selectedUser=data;
          
  //         this.getUsers();
          
  //       },
  //       error =>{
  //         console.log(error);
  //       }
  //       );
  //   }
  //   createUser =() =>{
  //     this.api.createUser(this.selectedUser).subscribe(
  //       data =>{
  //         this.user.push(data)
  //       },
  //       error =>{
  //         console.log(error);
  //       }
  //       );
  //   }
  //   deleteUser = () =>{
  //     this.api.deleteUser(this.selectedUser.id).subscribe(
  //       data =>{
  //         this.getUsers();
  //       },
  //       error =>{
  //         console.log(error);
  //      }
        
  //      );
  //      }
        
  


