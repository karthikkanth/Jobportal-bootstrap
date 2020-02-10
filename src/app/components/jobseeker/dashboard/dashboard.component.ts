import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
      {
          label: 'Jobs List',
          link: './jJobsList',
          index: 0
      },
      {
          label: 'Applied List',
          link: './jAppliedList',
          index: 1
      },
    ];
  }

  ngOnInit() {
  }

  redirectToProfile() {
    this.router.navigate(['jProfile/jProfileView']);
  }
  redirectToSignin() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
