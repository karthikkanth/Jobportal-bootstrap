import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecruiterService } from '../../../../../../services/recruiter.service';
import { RestService } from '../../../../../../services/rest.service';

@Component({
  selector: 'app-rprofile-edit-personal',
  templateUrl: './rprofile-edit-personal.component.html',
  styleUrls: ['./rprofile-edit-personal.component.css']
})
export class RprofileEditPersonalComponent implements OnInit {

  RCPersonalDetailsForm: FormGroup;
  UserPersonalDetails: Object;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private recruiterService: RecruiterService,  private restService: RestService) { }
  ngOnInit() {
    this.createRCPersonalDetailsForm();
    this.fetchProfileIfNotPresent();
  }
  createRCPersonalDetailsForm() {
    this.RCPersonalDetailsForm = this.formBuilder.group({
      contactPersonName: ['', Validators.required],
      designation: ['', Validators.required],
      officeAddress: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required]
    });
  }
  onSubmitJSPersonalDetailsForm() {
    this.submitted = true;
    if (this.RCPersonalDetailsForm.status === 'VALID') {
      this.UserPersonalDetails = this.RCPersonalDetailsForm.value;
      this.recruiterService.setPersonalDetails(this.UserPersonalDetails);
      this.router.navigate(['rProfile/rProfileEdit/rProfileEditProfessional']);
    }
  }
  get f() {
    return this.RCPersonalDetailsForm.controls;
  }
  getrecruiterProfile(){
    this.restService.invokeRecruiterGetProfile().subscribe((response) => {
      if (!!response) {
        this.patchPersonalData(response);
      }
    })
  }
  fetchProfileIfNotPresent() {
    let userdata = this.recruiterService.getPersonalDetails();
    if (!!userdata) {
      this.patchPersonalData(userdata);
    } else {
      this.getrecruiterProfile();
    }
  }
  patchPersonalData(data: any) {
    this.RCPersonalDetailsForm.patchValue({
      contactPersonName: data.contactPersonName,
      designation: data.designation,
      officeAddress: data.officeAddress,
      country: data.country,
      city: data.city,
      pincode: data.pincode
    });
  }

}
