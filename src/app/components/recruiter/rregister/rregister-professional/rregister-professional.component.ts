import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';
import {RestService} from '../../../../services/rest.service';
import { ToastrService } from 'ngx-toastr';
import {RecruiterService} from '../../../../services/recruiter.service';

@Component({
  selector: 'app-rregister-professional',
  templateUrl: './rregister-professional.component.html',
  styleUrls: ['./rregister-professional.component.css']
})
export class RregisterProfessionalComponent implements OnInit {
  RCProfessionalForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private recruiterService: RecruiterService,
    private router: Router,
    private toastrService: ToastrService,
    private restService: RestService) {
    this.createRCProfessionalForm();
  }

  ngOnInit() {
    if (this.recruiterService.getProfessionalDetails()) {
      this.RCProfessionalForm.patchValue(this.recruiterService.getProfessionalDetails());
    }
  }

  createRCProfessionalForm() {
    this.RCProfessionalForm = this.formBuilder.group({
      pincode: ['', Validators.required],
      state: ['', Validators.required],
      alternateEmailId: ['', Validators.required],
      landlineNumber: ['', Validators.required],
      isTosRead: ['', Validators.required] 
    });
  }

  get f() {
    return this.RCProfessionalForm.controls;
  }

  onSubmitRCProfessionalDetails() {
    let recruiterData;
    if (this.RCProfessionalForm.valid) {
      this.recruiterService.setProfessionalDetails(this.RCProfessionalForm.value);
      recruiterData = this.recruiterService.getRecruiterDetails();
      console.log("*****************");
      console.log(recruiterData.JobRole);
      console.log("*****************");
      if (recruiterData) {
        this.restService.recruiterRegister(recruiterData).subscribe( (response) => {
          if (response && response.status === 1) {
            this.toastrService.success('You have registered successfully Please Login.');
            this.router.navigate(['/login']);
          } else {
            this.toastrService.error('Failed in registering.');
          }
        }, (erorr) => {

        });
      }
      // this.router.navigate(['jRegister/jProfessionalDetails']);
    }
  }

}