import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../../../services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jprofile-view-personal',
  templateUrl: './jprofile-view-personal.component.html',
  styleUrls: ['./jprofile-view-personal.component.css']
})
export class JprofileViewPersonalComponent implements OnInit {
  userData: any;
  constructor(private restService: RestService, private router: Router) {
    this.getProfile();
   }

  ngOnInit() {
  }
  getProfile(){
    this.restService.getProfile().subscribe((response) =>{
      if(!!response){
        this.userData = response;
      }
    })
  }
  onSubmitJSPersonalDetailsForm(){
    this.router.navigate(['jProfile/jProfileView/jProfileViewProfessional']);
  }
}
