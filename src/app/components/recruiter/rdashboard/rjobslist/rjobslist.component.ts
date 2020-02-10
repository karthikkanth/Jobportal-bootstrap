import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {RestService } from '../../../../services/rest.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
// import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-rjobslist',
  templateUrl: './rjobslist.component.html',
  styleUrls: ['./rjobslist.component.css']
})

export class RjobslistComponent implements OnInit {

  jobs: any [] = [];
  displayedColumns: string[] = ['Companyname', 'position', 'experience', 'technologies', 'location' ];
  // sepecially for data tables
  jobsListKeys: any = ['S.No', 'Company Name', 'Position', 'Experience', 'Technologies', 'Location'];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
//dataSource: any = new MatTableDataSource();
 nameFilter = new FormControl('');
 filterValues = {
  companyname: ''
};
  appliedList: any[] = [];
  jobsList: any[] = [];
  filteredJobsList: any[] = [];
  constructor(private restService: RestService,
              private toastrService: ToastrService) { 
              }


              ngOnInit() {
                console.log('does this fire ????????????') ;
                this.getrecruiterList();
               // this.dataSource.filterPredicate = JSON.stringify(this.createFilter());
                this.nameFilter.valueChanges
                .subscribe(
                  companyname => {
                    this.filterValues.companyname = companyname;
                   // this.dataSource.toString  = JSON.stringify(this.filterValues);
                  });
              this.dtOptions = {
                pagingType: 'full_numbers',
                pageLength: 9
              };
            }
              getrecruiterList() {
               // this.jobsList = [];
                this.restService.getrecruiterJobList().subscribe( (response) => {
                  this.jobsList = response;
                  this.dtTrigger.next();
               //   this.dataSource = this.jobsList;
                }, (error) => {
         //         this.jobsList = [];
                });
              }

  getUserID() {
    const user =JSON.parse(sessionStorage.getItem('rc-user'));
   return user.user.id;

  }

  createFilter(): (data: any, filter: string) => boolean {
    const filterFunction = (data, filter): boolean => {
      const searchTerms = JSON.parse(filter);
      return data.companyname.toLowerCase().indexOf(searchTerms.companyname.toLowerCase()) !== -1;
    };
    return filterFunction;
  }

  // speficially for data tables
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }
    // speficially for data tables
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
