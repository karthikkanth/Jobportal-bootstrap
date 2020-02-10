import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../../../services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rprofile-view-basic',
  templateUrl: './rprofile-view-basic.component.html',
  styleUrls: ['./rprofile-view-basic.component.css']
})
export class RprofileViewBasicComponent implements OnInit {
  userData: any;
  constructor(private restService: RestService, private router: Router) {
      }

  ngOnInit() {
    this.getProfile();
  }
  getProfile() {
    console.log('get profile');
    this.restService.invokeRecruiterGetProfile().subscribe((response) => {
      if (!!response) {
        this.userData = response;
        console.log('*address**' + this.userData.address1 );
      }
    });
  }
  onSubmitRCBasicDetailsForm() {
    this.router.navigate(['rProfile/rProfileView/rProfileViewPersonal']);
  }

}
