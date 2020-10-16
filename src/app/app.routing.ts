import { Routes, RouterModule } from '@angular/router';


import { homeComponent } from './home';
import { loginComponent } from './login';
import { PostEditorComponent } from './post-editor'
import { dashboardComponent } from './dashboard';
import { SidecomponentComponent } from './sidecomponent/sidecomponent.component';

const routes : Routes = [
    {path:'',component : homeComponent},
    {path:'login',component:loginComponent },
    //  {path:'register',component:registerComponent ,outlet:"testoutlet"},
    {path:'dashboard',component:dashboardComponent},
    {path:'postEditor',component:PostEditorComponent},
    {path:'**',redirectTo:''},
    // {
    //     path:'',component: SidecomponentComponent,outlet: "sidebar"
    //  }



]; 

export const appRoutingModule = RouterModule.forRoot(routes);