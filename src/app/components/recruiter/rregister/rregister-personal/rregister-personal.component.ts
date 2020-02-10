import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';
import {RecruiterService} from '../../../../services/recruiter.service';



@Component({
  selector: 'app-rregister-personal',
  templateUrl: './rregister-personal.component.html',
  styleUrls: ['./rregister-personal.component.css']
})

 
export class RregisterPersonalComponent implements OnInit {
  RCPersonalDetailsForm: FormGroup;



  constructor(private formBuilder: FormBuilder, private recruiterService: RecruiterService, private router: Router) {
    this.createRCPersonalDetailsForm();
 

   
 }

   ngOnInit() {
    if (this.recruiterService.getPersonalDetails()) {
      this.RCPersonalDetailsForm.patchValue(this.recruiterService.getPersonalDetails());
    }
  }
  createRCPersonalDetailsForm() {
    this.RCPersonalDetailsForm = this.formBuilder.group({
      contactPersonName: ['', Validators.required],
      designation: ['', Validators.required],
      officeAddress: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required] 
    });
  }

  get f() {
    return this.RCPersonalDetailsForm.controls;
  }

  onSubmitRCPersonalDetailsForm() {
    if (this.RCPersonalDetailsForm.valid) {
      this.recruiterService.setPersonalDetails(this.RCPersonalDetailsForm.value);
      this.router.navigate(['rRegister/rProfessionalDetails']);
    }
  }
}

