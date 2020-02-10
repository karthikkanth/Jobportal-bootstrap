import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../services/rest.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-jprofile-side-view',
  templateUrl: './jprofile-side-view.component.html',
  styleUrls: ['./jprofile-side-view.component.css']
})
export class JprofileSideViewComponent implements OnInit {
  userData: any;
  profileUrl: any = 'https://ya-webdesign.com/images/default-image-png-17.png';
  url: any = '';
  constructor(private restService: RestService,
              private toastr: ToastrService) {
    this.getProfile();
  }

  ngOnInit() {
  }
  getProfile() {
    this.restService.getProfile().subscribe((response) => {
      if (!!response) {
        this.userData = response;
      }
    });
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        const a: any = event.target;
        this.restService.updateProfileForJobseeker({profilePic: a.result}).subscribe( (response: any) => {
          if (response.status === 1) {
            this.userData.profilePic = response.data.profilePic;
            this.toastr.success('Uploaded successfully');
          } else {
            this.toastr.error('Failed in uploading');
          }
        });
      };
    }
  }
  public delete() {
    this.url = null;
  }
}
