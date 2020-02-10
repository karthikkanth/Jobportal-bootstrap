import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rdashboard',
  templateUrl: './rdashboard.component.html',
  styleUrls: ['./rdashboard.component.css']
})
export class RdashboardComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
      {
          label: 'Jobs',
          link: './rjobslist',
          index: 0
      },
      {
          label: 'Applicants',
          link: './rseekerslist',
          index: 1
      },
      {
        label: 'Add Jobs',
        link: './raddjob',
        index: 2
       }
    ];
  }

  ngOnInit() {
  }

  redirectToProfile() {
   this.router.navigate(['rProfile/rProfileView']);
 //   this.router.navigate(['rProfile']);
  }
  redirectToSignin() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
