import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-jreg',
  templateUrl: './jreg.component.html',
  styleUrls: ['./jreg.component.css']
})
export class JregComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
      {
          label: 'Basic details',
          link: './jBasicDetails',
          index: 0
      }, {
          label: 'Personal details',
          link: './jPersonalDetails',
          index: 1
      }, {
          label: 'Professional details',
          link: './jProfessionalDetails',
          index: 2
      },
    ];
   }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
