import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../../../services/rest.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rprofile-view-personal',
  templateUrl: './rprofile-view-personal.component.html',
  styleUrls: ['./rprofile-view-personal.component.css']
})
export class RprofileViewPersonalComponent implements OnInit {
  userData: any;
  constructor(private restService: RestService, private router: Router) {
    console.log('****************');
    console.log('***view personal******');
    console.log('****************');
    this.getProfile();
   }

  ngOnInit() {
  }
  getProfile(){
    console.log('******GET PROFILE******');
    this.restService.invokeRecruiterGetProfile().subscribe((response) =>{
      if(!!response){
        this.userData = response;
        console.log('this.userData' + this.userData);
      }
    })
  }
  onSubmitRCPersonalDetailsForm(){
    this.router.navigate(['rProfile/rProfileView/rProfileViewProfessional']);
  }
}