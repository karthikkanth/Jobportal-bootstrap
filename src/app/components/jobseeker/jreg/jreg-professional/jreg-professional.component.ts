import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {JobseekerService} from '../../../../services/jobseeker.service';
import {Router} from '@angular/router';
import {RestService} from '../../../../services/rest.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-jreg-professional',
  templateUrl: './jreg-professional.component.html',
  styleUrls: ['./jreg-professional.component.css']
})
export class JregProfessionalComponent implements OnInit {
  JSProfessionalForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private jobseekerService: JobseekerService,
              private router: Router,
              private toastrService: ToastrService,
              private restService: RestService) {
    this.createJSProfessionalForm();
  }

  ngOnInit() {
    if (this.jobseekerService.getProfessionalDetails()) {
      this.JSProfessionalForm.patchValue(this.jobseekerService.getProfessionalDetails());
    }
  }
  createJSProfessionalForm() {
    this.JSProfessionalForm = this.formBuilder.group({
      currentJobLocation: ['', Validators.required],
      yearsOfExperienceInCurrentJob: ['', Validators.required],
      JobRole: ['', Validators.required],
      Domain: ['', Validators.required],
      PresentSalary: ['', Validators.required],
      reasonsForLeavingCurrentJob: ['', Validators.required]
    });
  }

  get f() {
    return this.JSProfessionalForm.controls;
  }

  onSubmitJSProfessionalDetails() {
    let jobseeekerData;
    if (this.JSProfessionalForm.valid) {
      this.jobseekerService.setProfessionalDetails(this.JSProfessionalForm.value);
      jobseeekerData = this.jobseekerService.getJobseekerDetails();
      if (jobseeekerData) {
        this.restService.jobseekerRegister(jobseeekerData).subscribe( (response) => {
          if (response && response.status === 1) {
            this.toastrService.success('You have registered successfully Please Login.');
            this.router.navigate(['/login']);
            this.JSProfessionalForm.reset();
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
