import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {RestService} from '../../../services/rest.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rlogin',
  templateUrl: './rlogin.component.html',
  styleUrls: ['./rlogin.component.css']
})
export class RloginComponent implements OnInit {
  RCLoginForm: FormGroup;
  submitted: any = false;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private restService: RestService,
              private toastrService: ToastrService) {
   }

  ngOnInit() {
    sessionStorage.clear();
    this.createRCLoginForm();
  }

  createRCLoginForm() {
    this.RCLoginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get loginForm() {
    return this.RCLoginForm.controls;
  }

  onSubmitRCLogin() 
  {
    this.submitted = true;
    if (this.RCLoginForm.valid) {
      this.restService.recruiterLogin(this.RCLoginForm.value).subscribe( (response: any) => {
        if (response && response.status && response.status === 1) {
          sessionStorage.setItem('rc-user', JSON.stringify(response.data));
          this.router.navigate(['rdashboard']);
        } else if (response && response.status === 0) {
          this.toastrService.error('Invalid username/password');
          this.RCLoginForm.reset();
        }
      },
      (error) => {
        console.log(error);
      });
    }
  } 
  
  redirectToSignup() {
    this.router.navigate(['rRegister']);
  }
}