import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../../../services/rest.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rprofile-view-professional',
  templateUrl: './rprofile-view-professional.component.html',
  styleUrls: ['./rprofile-view-professional.component.css']
})
export class RprofileViewProfessionalComponent implements OnInit {
  userData: any;
  constructor(private restService: RestService, private router: Router) { }

  ngOnInit() {
    this.getProfile();
  }
  getProfile(){
    this.restService.invokeRecruiterGetProfile().subscribe((response) =>{
      if(!!response){
        this.userData = response;
      }
    })
  }
  onSubmitJSPersonalDetailsForm(){
    this.router.navigate(['rProfile/rProfileView/rProfileViewProfessional']);
  }
}
