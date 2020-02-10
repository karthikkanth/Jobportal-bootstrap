import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecruiterService } from '../../../../../../services/recruiter.service';
import { RestService } from '../../../../../../services/rest.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rprofile-edit-professional',
  templateUrl: './rprofile-edit-professional.component.html',
  styleUrls: ['./rprofile-edit-professional.component.css']
})
export class RprofileEditProfessionalComponent implements OnInit {

  RCProfessionalForm: FormGroup;
  UserProfessionalDetails: Object;
  submitted = false;
  allUserDetails: object;
  constructor(private formBuilder: FormBuilder, private router: Router, private recruiterService: RecruiterService, private restService: RestService, private toastr: ToastrService) { }

  ngOnInit() {
    this.createJSPersonalDetailsForm();
    this.fetchProfileIfNotPresent();
  }

  createJSPersonalDetailsForm() {
    this.RCProfessionalForm = this.formBuilder.group({
      currentJobLocation: ['', Validators.required],
      yearsOfExperienceInCurrentJob: ['', Validators.required],
      JobRole: ['', Validators.required],
      Domain: ['', Validators.required],
      PresentSalary: ['', Validators.required],
      reasonsForLeavingCurrentJob: ['', Validators.required]
    });
  }
  onSubmitJSProfessionalDetails() {
    this.UserProfessionalDetails = this.RCProfessionalForm.value;
    this.recruiterService.setProfessionalDetails(this.UserProfessionalDetails);
    this.allUserDetails = this.recruiterService.getRecruiterDetails();
    if (this.allUserDetails) {
      this.restService.updateProfile(this.allUserDetails).subscribe(
        (response) => {
          if (response) {
            sessionStorage.setItem('profileEditOrView', 'VIEW');
            this.router.navigate(['rProfile/rProfileView/rProfileViewBasic']);
            this.toastr.success('Profile detailed updated!');
          }
        });
    }
  }
  getRecruiterProfile() {
    this.restService.invokeRecruiterGetProfile().subscribe((response) => {
      if (!!response) {
        this.patchProfessionalData(response);
      }
    })
  }
  fetchProfileIfNotPresent() {
    let userdata = this.recruiterService.getProfessionalDetails();
    if (!!userdata) {
      this.patchProfessionalData(userdata);
    } else {
      this.getRecruiterProfile();
    }
  }
  patchProfessionalData(data: any) {
    this.RCProfessionalForm.patchValue({
      currentJobLocation: data.currentJobLocation,
      yearsOfExperienceInCurrentJob: data.yearsOfExperienceInCurrentJob,
      JobRole: data.JobRole,
      Domain: data.Domain,
      PresentSalary: data.PresentSalary,
      reasonsForLeavingCurrentJob: data.reasonsForLeavingCurrentJob
    });
  }

}
