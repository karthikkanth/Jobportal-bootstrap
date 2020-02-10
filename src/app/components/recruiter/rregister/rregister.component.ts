import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rregister',
  templateUrl: './rregister.component.html',
  styleUrls: ['./rregister.component.css']
})
export class RregisterComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
      {
          label: 'Basic details',
          link: './rBasicDetails',
          index: 0
      }, {
          label: 'Personal details',
          link: './rPersonalDetails',
          index: 1
      }, 
      {
        label: 'Professional details',
        link: './rProfessionalDetails',
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
