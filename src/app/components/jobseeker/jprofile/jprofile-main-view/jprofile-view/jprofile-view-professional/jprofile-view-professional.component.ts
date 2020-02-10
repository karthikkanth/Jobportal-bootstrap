import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../../../services/rest.service';

@Component({
  selector: 'app-jprofile-view-professional',
  templateUrl: './jprofile-view-professional.component.html',
  styleUrls: ['./jprofile-view-professional.component.css']
})
export class JprofileViewProfessionalComponent implements OnInit {
  userData: any;
  constructor(private restService: RestService) { }

  ngOnInit() {
    this.getProfile();
  }
  getProfile(){
    this.restService.getProfile().subscribe((response) =>{
      if(!!response){
        this.userData = response;
      }
    })
  }
}
