import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieViewComponentComponent } from './cookie-view-component.component';

describe('CookieViewComponentComponent', () => {
  let component: CookieViewComponentComponent;
  let fixture: ComponentFixture<CookieViewComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookieViewComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieViewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
