import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { MatDialogModule } from  '@angular/material/dialog';

import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { appRoutingModule } from './app.routing'
import { AppComponent } from './app.component';
import { registerComponent } from './register';
import { loginComponent } from './login';
import { homeComponent } from './home';
import { dashboardComponent } from './dashboard';
import { SidecomponentComponent } from './sidecomponent/sidecomponent.component';

import { InterceptService } from './intercept.service';

import { ModalComponent } from './modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { CookieViewComponentComponent } from './cookie-view-component/cookie-view-component.component';



@NgModule({
  declarations: [
    AppComponent,
    registerComponent,
    loginComponent,
    homeComponent,
    dashboardComponent,
    SidecomponentComponent,
    ModalComponent,
    PostEditorComponent,
    CookieViewComponentComponent,     
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule, 
 ReactiveFormsModule 

  ],
  entryComponents:[ModalComponent],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass:InterceptService,
      multi:true
    },
    CookieService
  ],
 
  bootstrap: [AppComponent]
  
})
export class AppModule { }
