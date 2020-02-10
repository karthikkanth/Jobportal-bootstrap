import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecruiterService } from '../../../../../../services/recruiter.service';
import { RestService } from '../../../../../../services/rest.service';

export interface Types {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-rprofile-edit-basic',
  templateUrl: './rprofile-edit-basic.component.html',
  styleUrls: ['./rprofile-edit-basic.component.css']
})
export class RprofileEditBasicComponent implements OnInit {
  RCBasicDetailsForm: FormGroup;
  userBasicDetails: object;
  submitted = false;

  types: Types[] = [
    {value: 'Mechanical-0', viewValue: 'Mechanical'},
    {value: 'Electrincal-1', viewValue: 'Electrical'},
    {value: 'Architect-2', viewValue: 'Architect'}
  ];

  constructor(private formBuilder: FormBuilder, private router: Router, private recruiterService: RecruiterService, private restService: RestService) { }


  ngOnInit() {
    this.createRCBasicDetailsForm();
    this.fetchProfileIfNotPresent();
  }

  createRCBasicDetailsForm() {

    this.RCBasicDetailsForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      companyName: ['', Validators.required],
      industryType: ['']
    });
  }

  get f() {
    return this.RCBasicDetailsForm.controls;
  }

  onSubmitJSBasicDetailsForm() {
    this.submitted = true;
    if (this.RCBasicDetailsForm.status === 'VALID') {
      this.userBasicDetails = this.RCBasicDetailsForm.value;
      this.recruiterService.setBasicDetails(this.userBasicDetails);
      this.router.navigate(['rProfile/rProfileEdit/rProfileEditPersonal']);
    }
  }
  getrecruiterProfile() {
    this.restService.invokeRecruiterGetProfile().subscribe((response) => {
      if (!!response) {
        this.patchBasicData(response);
      }
    })
  }
  fetchProfileIfNotPresent() {
    let userdata = this.recruiterService.getBasicDetails();
    if (!!userdata) {
      this.patchBasicData(userdata);
    } else {
      this.getrecruiterProfile();
    }
  }
  patchBasicData(data: any) {
    this.RCBasicDetailsForm.patchValue({
      username: data.username,
      email: data.email,
      mobile: data.mobile,
      companyName: data.companyName,
      industryType: data.industryType
    });
  }
}
