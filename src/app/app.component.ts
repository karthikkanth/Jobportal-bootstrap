import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { HttpService } from '../app/shared/services/http.service';
import { Router, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'job-portal';
  showLoader: any = true;
  showNavbar: any = false;
  maplocation = [
    '/',
    '/login'
  ];
  constructor(private httpService: HttpService,
              private router: Router,
              private cdRef: ChangeDetectorRef) { }
  ngOnInit() {
    this.httpService.loaderEventValue.subscribe(data => {
      if (data !== this.showLoader) {
        this.showLoader = data;
      }
    });
    this.onDetectRoute();
  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
  onDetectRoute() {
    this.router.events.subscribe((event: any) => {
      if ((event instanceof NavigationStart)) {
        let count = this.maplocation.length;
        for (let i = 0; i < this.maplocation.length; i++) {
          if (event.url === this.maplocation[i]) {
            this.showNavbar = false;
            i = count++;
          } else {
            this.showNavbar = true;
          }
        }
      }
      window.scrollTo(0, 0);
    });
  }
}
