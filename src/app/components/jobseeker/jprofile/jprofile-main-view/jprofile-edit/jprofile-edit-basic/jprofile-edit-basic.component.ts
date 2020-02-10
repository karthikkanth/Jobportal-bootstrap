import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobseekerService } from '../../../../../../services/jobseeker.service';
import { RestService } from '../../../../../../services/rest.service';

@Component({
  selector: 'app-jprofile-edit-basic',
  templateUrl: './jprofile-edit-basic.component.html',
  styleUrls: ['./jprofile-edit-basic.component.css']
})
export class JprofileEditBasicComponent implements OnInit {
  JSBasicDetailsForm: FormGroup;
  userBasicDetails: object;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private jobseekerService: JobseekerService, private restService: RestService) { }

  ngOnInit() {
    this.createJSBasicDetailsForm();
    this.fetchProfileIfNotPresent();
  }
  createJSBasicDetailsForm() {
    this.JSBasicDetailsForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      address1: ['', Validators.required],
      address2: ['']
    });
  }
  get f() {
    return this.JSBasicDetailsForm.controls;
  }
  onSubmitJSBasicDetailsForm() {
    this.submitted = true;
    if (this.JSBasicDetailsForm.status === 'VALID') {
      this.userBasicDetails = this.JSBasicDetailsForm.value;
      this.jobseekerService.setBasicDetails(this.userBasicDetails);
      this.router.navigate(['jProfile/jProfileEdit/jProfileEditPersonal']);
    }
  }
  getProfile() {
    this.restService.getProfile().subscribe((response) => {
      if (!!response) {
        this.patchBasicData(response);
      }
    })
  }
  fetchProfileIfNotPresent() {
    let userdata = this.jobseekerService.getBasicDetails();
    if (!!userdata) {
      this.patchBasicData(userdata);
    } else {
      this.getProfile();
    }
  }
  patchBasicData(data: any) {
    this.JSBasicDetailsForm.patchValue({
      username: data.username,
      email: data.email,
      mobile: data.mobile,
      address1: data.address1,
      address2: data.address2
    });
  }
}
