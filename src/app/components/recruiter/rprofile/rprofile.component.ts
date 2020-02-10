import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rprofile',
  templateUrl: './rprofile.component.html',
  styleUrls: ['./rprofile.component.css']
})
export class RprofileComponent implements OnInit {
  isViewOrEdit: string;
  isView: boolean;
  isEdit: boolean;
  profileUrl: any = 'https://ya-webdesign.com/images/default-image-png-17.png';
  navLinks: any[];
  activeLinkIndex = -1;
  userdata: any;
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.getViewOrEdit();
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

  getViewOrEdit() {
    this.isViewOrEdit = sessionStorage.getItem('profileEditOrView');
    if (this.isViewOrEdit === 'EDIT') {
      this.isEdit = true;
      this.isView = false;
      this.navLinks = [
        {
          label: 'Basic details',
          link: './rProfileEdit/rProfileEditBasic',
          index: 0
        }, {
          label: 'Personal details',
          link: './rProfileEdit/rProfileEditPersonal',
          index: 1
        }, {
          label: 'Professional details',
          link: './rProfileEdit/rProfileEditProfessional',
          index: 2
        },
      ];
    } else {
      this.isView = true;
      this.isEdit = false;
      this.navLinks = [
        {
          label: 'Basic details',
          link: './rProfileView/rProfileViewBasic',
          index: 0
        }, {
          label: 'Personal details',
          link: './rProfileView/rProfileViewPersonal',
          index: 1
        }, {
          label: 'Professional details',
          link: './rProfileView/rProfileViewProfessional',
          index: 2
        },
      ];
    }
  }

  clickToProfileEdit(isViewOrEdit: string) {
    if (isViewOrEdit === 'EDIT') {
      sessionStorage.setItem('profileEditOrView', 'EDIT');
      this.ngOnInit();
      this.router.navigate(['/rProfile/rProfileEdit/rProfileEditBasic']);
    } else if (isViewOrEdit === 'VIEW') {
      sessionStorage.setItem('profileEditOrView', 'VIEW');
      this.ngOnInit();
      this.router.navigate(['/rProfile/rProfileView/rProfileViewBasic']);
    }
  }
  redirectToDashboard() {
  //  this.router.navigate(['rDashboard/rjobslist']);
    this.router.navigate(['rdashboard']);
  }
  redirectToSignin() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

}
