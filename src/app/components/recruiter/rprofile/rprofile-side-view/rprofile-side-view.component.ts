import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../services/rest.service';

@Component({
  selector: 'app-rprofile-side-view',
  templateUrl: './rprofile-side-view.component.html',
  styleUrls: ['./rprofile-side-view.component.css']
})
export class RprofileSideViewComponent implements OnInit {
  userData: any;
  profileUrl: any = 'https://ya-webdesign.com/images/default-image-png-19.png';
 

  constructor(private restService: RestService) {
    this.getProfile();
  }

  ngOnInit() {
  }

  getProfile() {
    console.log('1............')
    this.restService.invokeRecruiterGetProfile().subscribe((response) => {
      if (!!response) {
        this.userData = response;
      }
      console.log('2............' + this.userData);
    });
  }

}
