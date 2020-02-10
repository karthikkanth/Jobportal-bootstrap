import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { JobseekerService } from '../../../../services/jobseeker.service';
import { Router } from '@angular/router';
import {RestService } from '../../../../services/rest.service';

@Component({
  selector: 'app-jreg-basic',
  templateUrl: './jreg-basic.component.html',
  styleUrls: ['./jreg-basic.component.css']
})
export class JregBasicComponent implements OnInit {
  JSBasicDetailsForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private jobseekerService: JobseekerService,
              private router: Router,
              private restService: RestService) {
    this.createBasicDetails();
  }

  ngOnInit() {
    if (this.jobseekerService.getBasicDetails()) {
      this.JSBasicDetailsForm.patchValue(this.jobseekerService.getBasicDetails());
    }
  }
  onSubmitJSBasicDetailsForm() {
    if (this.JSBasicDetailsForm.valid) {
      this.jobseekerService.setBasicDetails(this.JSBasicDetailsForm.value);
      this.router.navigate(['jRegister/jPersonalDetails']);
    }
  }
  createBasicDetails() {
    this.JSBasicDetailsForm = this.formBuilder.group({
      username: ['', this.validateUniqueness('username', true)],
      email: ['', this.validateUniqueness('email', true)],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      address1: ['', Validators.required],
      address2: [''],
      isTosRead: [false, Validators.compose([Validators.required, Validators.pattern('true')])]
    });
  }
  get f() {
    return this.JSBasicDetailsForm.controls;
  }
  validateUniqueness(fieldToValidate, validateUnique) {
    let emailUniqueCheck = 0;
    let nicknameUniqueCheck = 0;
    return (control: FormControl) => {
      const name = control.value;
      const regExEmail = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;
      const regExName = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
      let message;
      if (!name) {
        message = { message: 'This field is required' };
      } else if (name && fieldToValidate === 'email' && !regExEmail.test(name)) {
        message = { message: 'Email is not Valid' };
      } else if (name && fieldToValidate === 'username' && name.length < 5) {
        message = { message: 'This field must contain minimum of 5 letters' };
      } else if (validateUnique) {
        const validateValues = {
          [fieldToValidate]: name
        };
        if (fieldToValidate === 'email') { emailUniqueCheck++ }
        if (fieldToValidate === 'username') { nicknameUniqueCheck++ };
        this.restService.validateUniqueness(validateValues).subscribe((uniqueData) => {
          if (fieldToValidate === 'email' && --emailUniqueCheck === 0) {
            if (uniqueData && uniqueData.status === 0) {
              message = null;
              control.setErrors(null);
            } else {
              message = {message: 'Email already Registered' };
              control.setErrors(message);
            }
          } else if (fieldToValidate === 'username' && --nicknameUniqueCheck === 0) {
            if (uniqueData && uniqueData.status === 0) {
              message = null;
              control.setErrors(null);
            } else {
              message = {message: 'Username already Registered' };
              control.setErrors(message);
            }
          }
        });
      }
      return message;
    };
  }
}
