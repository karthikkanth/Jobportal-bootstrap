import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {RestService } from '../../../../services/rest.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
// import { MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-jjobslist',
  templateUrl: './jjobslist.component.html',
  styleUrls: ['./jjobslist.component.css']
})
export class JjobslistComponent implements OnInit, OnDestroy {
  // displayedColumns: string[] = ['companyname', 'position', 'experience', 'technologies', 'location', 'apply'];
 
  // dataSource: any = new MatTableDataSource();
 
  appliedList: any = [];
  filteredJobsList: any = [];
  jobsList: any = [];
  applyJobReq: any = {};
  nameFilter = new FormControl('');
  filterValues = {
    companyname: ''
  };
  jobsListKeys: any = ['S.No', 'Company Name', 'Position', 'Experience', 'Technologies', 'Location', 'Apply'];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  constructor(private restService: RestService,
              private toastrService: ToastrService) {
                   
  }

  ngOnInit() {
    this.getJobsList();
    // this.dataSource.filterPredicate = this.createFilter();
    // this.nameFilter.valueChanges
    //   .subscribe(
    //     companyname => {
    //       this.filterValues.companyname = companyname;
    //       this.dataSource.filter = JSON.stringify(this.filterValues);
    //     });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 9
    };
  }
  getJobsList() {
        this.restService.getJobList().subscribe( (response) => {
      this.jobsList = response;
      this.jobsList.forEach( (value, index)  => {
        this.jobsList[index].apply = 'Apply';
      });
      this.getAppliedList();
    }, (error) => {
      this.jobsList = [];
    });
  }
  getAppliedList() {
    this.restService.getAppliedList(this.getUserID()).subscribe( (response) => {
      if (response) {
        this.appliedList = response.appliedList;
        this.jobsList.forEach( (data: any) => {
          if (this.appliedList.indexOf(data._id) < 0 ) {
            this.filteredJobsList.push(data);
          }
        });
        this.dtTrigger.next();
        // this.dataSource.data = this.filteredJobsList;
      }
    }, (error) => {
      // this.dataSource = [];
    });
  }
  applyForSpecificJob(i: any) {
    this.filteredJobsList.forEach( (data, index) => {
      if (index === i) {
        this.applyJobReq.userId = this.getUserID();
        this.applyJobReq.appliedList = [];
        this.applyJobReq.appliedList.push(data._id);
        this.restService.applyForJob(this.applyJobReq).subscribe( (response) => {
          if (response.status === 1) {
            this.filteredJobsList = [];
            this.rerender();
            this.getJobsList();
            this.toastrService.success('Applied successfully');
          } else {
            this.toastrService.error('Failed in applying. Try again');
          }
        }, (error) => {
          this.toastrService.error('Failed in applying. Try again');
        });
      }
    });
  }
  getUserID() {
    const user = JSON.parse(sessionStorage.getItem('js-user'));
    return user.user.id;
  }
  // createFilter(): (data: any, filter: string) => boolean {
  //   const filterFunction = (data, filter): boolean => {
  //     const searchTerms = JSON.parse(filter);
  //     return data.companyname.toLowerCase().indexOf(searchTerms.companyname.toLowerCase()) !== -1;
  //   };
  //   return filterFunction;
  // }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
