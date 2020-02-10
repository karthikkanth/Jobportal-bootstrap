import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {JobseekerService} from '../../../../services/jobseeker.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-jreg-personal',
  templateUrl: './jreg-personal.component.html',
  styleUrls: ['./jreg-personal.component.css']
})

export class JregPersonalComponent implements OnInit {
  JSPersonalDetailsForm: FormGroup;
 
  Interests: any[];


  constructor(private formBuilder: FormBuilder, private jobseekerService: JobseekerService, private router: Router) {
    this.createJSPersonalDetailsForm();

    this.Interests = [
      {value: 'Mechanical-0', viewValue: 'Mechanical'},
      {value: 'Electrical-1', viewValue: 'Electrical'},
      {value: 'Architect-2', viewValue: 'Architect'}
    ];

   }

  ngOnInit() {
    if (this.jobseekerService.getPersonalDetails()) {
      this.JSPersonalDetailsForm.patchValue(this.jobseekerService.getPersonalDetails());
    }
  }
  createJSPersonalDetailsForm() {
    this.JSPersonalDetailsForm = this.formBuilder.group({
      YourHomeTown: ['', Validators.required],
      YearsOfExperience: ['', Validators.required],
      AreasofInterest: ['', Validators.required],
      MaritalStatus: ['', Validators.required],
      Nationality: ['', Validators.required],
      LanguagesKnown: ['', Validators.required]
    });
  }

  get f() {
    return this.JSPersonalDetailsForm.controls;
  }

  onSubmitJSPersonalDetailsForm() {
    if (this.JSPersonalDetailsForm.valid) {
      this.jobseekerService.setPersonalDetails(this.JSPersonalDetailsForm.value);
      this.router.navigate(['jRegister/jProfessionalDetails']);
    }
  }

}
