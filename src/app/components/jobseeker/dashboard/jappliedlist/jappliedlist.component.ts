import { Component, OnInit, ViewChild } from '@angular/core';
import {RestService } from '../../../../services/rest.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-jappliedlist',
  templateUrl: './jappliedlist.component.html',
  styleUrls: ['./jappliedlist.component.css']
})
export class JappliedlistComponent implements OnInit {
  jobs: any [] = [];
  displayedColumns: string[] = ['companyname', 'position', 'experience', 'technologies', 'location', 'apply'];
  appliedListKeys: any[] = ['S No', 'Company Name', 'Position', 'Experience', 'Technologies', 'Location', 'Apply'];
  dataSource: any[] = [];
  appliedList: any[] = [];
  jobsList: any = [];
  filteredJobsList: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  constructor(private restService: RestService,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 9
    };
    this.getJobList();
  }
  getJobList(): any {
    this.restService.getJobList().subscribe(response => {
      this.jobsList = response;
      this.jobsList.forEach( (value, index)  => {
        this.jobsList[index].apply = 'Applied';
      });
      if (this.jobsList) {
        this.getAppliedListForUser();
      }
    });
  }
  getAppliedListForUser() {
    this.restService.getAppliedList(this.getUserID()).subscribe(response => {
      this.appliedList = response.appliedList;
      this.jobsList.forEach( (value, index) => {
        if (this.appliedList.indexOf(value._id) != -1) {
          this.filteredJobsList.push(value);
        }
      });
      this.dtTrigger.next();
      // this.dataSource = this.filteredJobsList;
    });
  }
  getUserID() {
    const user = JSON.parse(sessionStorage.getItem('js-user'));
    return user.user.id;
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
