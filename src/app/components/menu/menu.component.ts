import { Component, OnInit } from '@angular/core';
import { NavConstants } from '../../shared/common/nav.constants';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  navBarLinks: any = [
    {
      id: 2,
      name: 'Login'
    },
    {
      id: 1,
      name: 'Dashboard'
    },
  ];
  navTitle: any = 'KE-Products';
  constructor() { }

  ngOnInit() {
    this.navBarLinks.forEach((link, index) => {
      if (link) {
        for (const a in NavConstants) {
          if (NavConstants[a].name === link.name) {
            this.navBarLinks[index].route = NavConstants[a].route;
          }
        }
      }
    });
    console.log(this.navBarLinks);
  }

}
