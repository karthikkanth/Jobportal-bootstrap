import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobseekerService } from '../../../../../../services/jobseeker.service';
import { RestService } from '../../../../../../services/rest.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-jprofile-edit-professional',
  templateUrl: './jprofile-edit-professional.component.html',
  styleUrls: ['./jprofile-edit-professional.component.css']
})
export class JprofileEditProfessionalComponent implements OnInit {

  JSProfessionalForm: FormGroup;
  UserProfessionalDetails: object;
  submitted: false;
  allUserDetails: object;
  jobRoles: any = [];
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private jobseekerService: JobseekerService,
              private restService: RestService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.createJSProfessionalForm();
    this.fetchProfileIfNotPresent();
    this.fetchJobRoles();
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
  onSubmitJSProfessionalDetails() {
    this.UserProfessionalDetails = this.JSProfessionalForm.value;
    this.jobseekerService.setProfessionalDetails(this.UserProfessionalDetails);
    this.allUserDetails = this.jobseekerService.getJobseekerDetails();
    if (this.allUserDetails) {
      this.restService.updateProfile(this.allUserDetails).subscribe(
        (response) => {
          if (response) {
            sessionStorage.setItem('profileEditOrView', 'VIEW');
            this.router.navigate(['jProfile/jProfileView/jProfileViewBasic']);
            this.toastr.success('Profile detailed updated!');
          }
        });
    }
  }

  get f() {
    return this.JSProfessionalForm.controls;
  }

  getProfile() {
    this.restService.getProfile().subscribe((response) => {
      if (!!response) {
        this.patchProfessionalData(response);
      }
    });
  }
  fetchProfileIfNotPresent() {
    const userdata = this.jobseekerService.getProfessionalDetails();
    if (!!userdata) {
      this.patchProfessionalData(userdata);
    } else {
      this.getProfile();
    }
  }
  fetchJobRoles() {
    this.restService.getAllJobRoles().subscribe( response => {
      if (response && response.length > 0) {
        this.jobRoles = response;
      } else {
        this.jobRoles = [];
      }
    });
  }
  patchProfessionalData(data: any) {
    this.JSProfessionalForm.patchValue({
      currentJobLocation: data.currentJobLocation,
      yearsOfExperienceInCurrentJob: data.yearsOfExperienceInCurrentJob,
      JobRole: data.JobRole,
      Domain: data.Domain,
      PresentSalary: data.PresentSalary,
      reasonsForLeavingCurrentJob: data.reasonsForLeavingCurrentJob
    });
  }

}
