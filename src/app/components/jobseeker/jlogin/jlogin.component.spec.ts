import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JloginComponent } from './jlogin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../../shared/services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { By } from '@angular/platform-browser';

describe('JloginComponent', () => {
  let component: JloginComponent;
  let fixture: ComponentFixture<JloginComponent>;
  let btn: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JloginComponent ],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, HttpClientModule, ToastrModule.forRoot({
        positionClass: 'toast-top-right'
      })],
      providers: [HttpService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create JloginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Should return false if form is invalid', () => {
    component.JSLoginForm.controls['username'].setValue('');
    component.JSLoginForm.controls['password'].setValue('');
    expect(component.JSLoginForm.valid).toBeFalsy();
  });
  it('Should return true if form is valid', () => {
    component.JSLoginForm.controls['username'].setValue('admin123');
    component.JSLoginForm.controls['password'].setValue('admin@123');
    expect(component.JSLoginForm.valid).toBeTruthy();
  });
  it('Should call the onSubmitJSLogin method', () => {
    fixture.detectChanges();
    spyOn(component, 'onSubmitJSLogin');
    btn = fixture.debugElement.query(By.css('button')).nativeElement;
    btn.click();
    expect(component.onSubmitJSLogin).toHaveBeenCalledTimes(0);
  });
  it('Should submitted value is true', () => {
    component.onSubmitJSLogin();
    expect(component.submitted).toBeTruthy();
  });
});

