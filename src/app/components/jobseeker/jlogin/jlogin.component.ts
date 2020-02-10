import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {RestService} from '../../../services/rest.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-jlogin',
  templateUrl: './jlogin.component.html',
  styleUrls: ['./jlogin.component.css']
})
export class JloginComponent implements OnInit {
  JSLoginForm: FormGroup;
  submitted: any = false;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private restService: RestService,
              private toastrService: ToastrService) {
   }

  ngOnInit() {
    this.createJSLoginForm();
  }
  createJSLoginForm() {
    this.JSLoginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get loginForm() {
    return this.JSLoginForm.controls;
  }
  onSubmitJSLogin() {
    this.submitted = true;
    if (this.JSLoginForm.valid) {
      this.restService.jobseekerLogin(this.JSLoginForm.value).subscribe( (response: any) => {
        if (response && response.status && response.status === 1) {
          sessionStorage.setItem('js-user', JSON.stringify(response.data));
          this.router.navigate(['dashboard']);
        } else if (response && response.status === 0) {
          this.toastrService.error('Invalid username/password');
          this.JSLoginForm.reset();
        }
      },
      (error) => {
        console.log(error);
      });
    }
  }
  redirectToSignup() {
    this.router.navigate(['jRegister']);
  }
}
