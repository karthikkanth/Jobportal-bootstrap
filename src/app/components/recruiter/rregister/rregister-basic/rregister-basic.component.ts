import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder , FormControl} from '@angular/forms';
import {RecruiterService} from '../../../../services/recruiter.service';
import {Router} from '@angular/router';
import {RestService } from '../../../../services/rest.service';

export interface Types {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-rregister-basic',
  templateUrl: './rregister-basic.component.html',
  styleUrls: ['./rregister-basic.component.css']
})
export class RregisterBasicComponent implements OnInit {
  RCBasicDetailsForm: FormGroup;

  types: Types[] = [
    {value: 'Mechanical-0', viewValue: 'Mechanical'},
    {value: 'Electrincal-1', viewValue: 'Electrical'},
    {value: 'Architect-2', viewValue: 'Architect'}
  ];

  constructor(private formBuilder: FormBuilder, private recruiterService: RecruiterService, private restService: RestService, private router: Router) {
    this.createBasicDetails();
       }

   ngOnInit() {
    if (this.recruiterService.getBasicDetails()) {
      this.RCBasicDetailsForm.patchValue(this.recruiterService.getBasicDetails());
    }
  }
  onSubmitRCBasicDetailsForm() {
    if (this.RCBasicDetailsForm.valid) {
      this.recruiterService.setBasicDetails(this.RCBasicDetailsForm.value);
      this.router.navigate(['rRegister/rPersonalDetails']);
    }
  }

  createBasicDetails() {
      this.RCBasicDetailsForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')])],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      companyName: ['', Validators.required],
      industryType: ['']
    //  isTosRead: [false, Validators.compose([Validators.required, Validators.pattern('true')])]
    });
  }

 get f() {
    return this.RCBasicDetailsForm.controls;
  }

 

}
