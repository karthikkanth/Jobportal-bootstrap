import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobseekerService } from '../../../../../../services/jobseeker.service';
import { RestService } from '../../../../../../services/rest.service';

@Component({
  selector: 'app-jprofile-edit-personal',
  templateUrl: './jprofile-edit-personal.component.html',
  styleUrls: ['./jprofile-edit-personal.component.css']
})
export class JprofileEditPersonalComponent implements OnInit {

  JSPersonalDetailsForm: FormGroup;
  UserPersonalDetails: Object;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private jobseekerService: JobseekerService, private restService: RestService) { }
  ngOnInit() {
    this.createJSPersonalDetailsForm();
    this.fetchProfileIfNotPresent();
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
  onSubmitJSPersonalDetailsForm() {
    this.submitted = true;
    if (this.JSPersonalDetailsForm.status === 'VALID') {
      this.UserPersonalDetails = this.JSPersonalDetailsForm.value;
      this.jobseekerService.setPersonalDetails(this.UserPersonalDetails);
      this.router.navigate(['jProfile/jProfileEdit/jProfileEditProfessional']);
    }
  }
  get f() {
    return this.JSPersonalDetailsForm.controls;
  }
  getProfile() {
    this.restService.getProfile().subscribe((response) => {
      if (!!response) {
        this.patchPersonalData(response);
      }
    })
  }
  fetchProfileIfNotPresent() {
    let userdata = this.jobseekerService.getPersonalDetails();
    if (!!userdata) {
      this.patchPersonalData(userdata);
    } else {
      this.getProfile();
    }
  }
  patchPersonalData(data: any) {
    this.JSPersonalDetailsForm.patchValue({
      YourHomeTown: data.YourHomeTown,
      YearsOfExperience: data.YearsOfExperience,
      AreasofInterest: data.AreasofInterest,
      MaritalStatus: data.MaritalStatus,
      Nationality: data.Nationality,
      LanguagesKnown: data.LanguagesKnown
    });
  }

}
