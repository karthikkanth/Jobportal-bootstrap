import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../../../services/rest.service';
import { Router } from '@angular/router';
import { Profile } from './profile.entity';
@Component({
  selector: 'app-jprofile-view-basic',
  templateUrl: './jprofile-view-basic.component.html',
  styleUrls: ['./jprofile-view-basic.component.css']
})
export class JprofileViewBasicComponent implements OnInit {
  userData: any;
  profile: any;
  constructor(private restService: RestService, private router: Router) {
  }

  ngOnInit() {
    this.getProfile();
  }
  getProfile() {
    this.restService.getProfile().subscribe((response) => {
      if (!!response) {
        this.userData = response;
      }
    });
  }
  onSubmitJSBasicDetailsForm() {
    this.router.navigate(['jProfile/jProfileView/jProfileViewPersonal']);
  }

}
