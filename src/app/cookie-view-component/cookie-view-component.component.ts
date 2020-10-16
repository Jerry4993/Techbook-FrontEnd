import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormArray,FormGroup,FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-cookie-view-component',
  templateUrl: './cookie-view-component.component.html',
  styleUrls: ['./cookie-view-component.component.css']
})
export class CookieViewComponentComponent implements OnInit {

  cookies=
  [
    {name:"cookie 1", id: 0, "description":"abc1"},
  {name:"cookie 2" ,   id: 1 , "description":"abc"},
  {name:"cookie 3", id: 2, "description":"abc3"},
  {name:"cookie 4" ,   id: 3 , "description":"abc2"}];
  form:FormGroup;


  constructor(private fb : FormBuilder , private cookieService : CookieService , private dialog : MatDialog)
   {
     this.cookieService.get('mainCookie')
      this.form = this.fb.group({
      cookie: new FormArray([])
   }
  );

  this.addCheckboxes();

   }

  ngOnInit(): void {
  }
  setCookies(value){
    this.cookieService.set("__COOKIE_CONSENT",'YES');
    const selectedCookies = this.form.value.cookie
      .map((checked, i) => checked ? this.cookies[i].id : null)
      .filter(v => v !== null);
   
    selectedCookies.forEach(element => {
    
      
      this.cookieService.set(this.cookies[element].name,
                            this.cookies[element].description,1)
    });
    
    
  }

  private addCheckboxes() {
    this.cookies.forEach(() => this.cookieArray.push(new FormControl(false)));
  }

  get cookieArray() {
    return this.form.controls.cookie as FormArray;
  }
}
