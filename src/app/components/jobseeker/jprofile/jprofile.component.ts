import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-jprofile',
  templateUrl: './jprofile.component.html',
  styleUrls: ['./jprofile.component.css']
})
export class JprofileComponent implements OnInit {
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
          link: './jProfileEdit/jProfileEditBasic',
          index: 0
        }, {
          label: 'Personal details',
          link: './jProfileEdit/jProfileEditPersonal',
          index: 1
        }, {
          label: 'Professional details',
          link: './jProfileEdit/jProfileEditProfessional',
          index: 2
        },
      ];
    } else {
      this.isView = true;
      this.isEdit = false;
      this.navLinks = [
        {
          label: 'Basic details',
          link: './jProfileView/jProfileViewBasic',
          index: 0
        }, {
          label: 'Personal details',
          link: './jProfileView/jProfileViewPersonal',
          index: 1
        }, {
          label: 'Professional details',
          link: './jProfileView/jProfileViewProfessional',
          index: 2
        },
      ];
    }
  }
  clickToProfileEdit(isViewOrEdit: string) {
    if (isViewOrEdit === 'EDIT') {
      sessionStorage.setItem('profileEditOrView', 'EDIT');
      this.ngOnInit();
      this.router.navigate(['/jProfile/jProfileEdit/jProfileEditBasic']);
    } else if (isViewOrEdit === 'VIEW') {
      sessionStorage.setItem('profileEditOrView', 'VIEW');
      this.ngOnInit();
      this.router.navigate(['/jProfile/jProfileView/jProfileViewBasic']);
    }
  }
  redirectToDashboard() {
    this.router.navigate(['dashboard/jJobsList']);
  }
  redirectToSignin() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
