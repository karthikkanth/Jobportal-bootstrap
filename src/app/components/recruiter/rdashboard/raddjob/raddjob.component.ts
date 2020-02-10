import { Component, OnInit, ɵConsole } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {RestService } from '../../../../services/rest.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-raddjob',
  templateUrl: './raddjob.component.html',
  styleUrls: ['./raddjob.component.css']
})
export class RaddjobComponent implements OnInit {
  AddJobform: FormGroup;
  jobdetail: any = {};

  constructor(private formBuilder: FormBuilder, private restService: RestService,
    private toastrService: ToastrService) {
    this.Addjobs();
   }


  ngOnInit() {
  }

  Addjobs() {
    this.AddJobform = this.formBuilder.group({
      companyname: ['', Validators.required],
      position:['', Validators.required],
      experience: ['', Validators.required],
      technologies: ['', Validators.required],
      location: ['', Validators.required] 
      //isTosRead: [false, Validators.compose([Validators.required, Validators.pattern('true')])]
    });
  }

  get f() {
    return this.AddJobform.controls;
  }

  getUserID() {
    const user = JSON.parse(sessionStorage.getItem('rc-user'));
    return user.user.id;
  }

  Save() {
 
        this.jobdetail.recruiterId = this.getUserID();
        this.jobdetail.companyname = this.AddJobform.get('companyname').value ;
        this.jobdetail.position = this.AddJobform.get('position').value ;
        this.jobdetail.experience = this.AddJobform.get('experience').value ;
        this.jobdetail.technologies = this.AddJobform.get('technologies').value ;
        this.jobdetail.location = this.AddJobform.get('location').value ;

     //  this.jobdetail.deatils = [];
     // this.jobdetail.deatils.push( this.AddJobform.value   );

    this.AddJobform.patchValue({  recruiterId : this.getUserID()  });  

        console.log('*****HOPE THIS WORKS VLAUES*****' + this.AddJobform.value );
        
        this.restService.addJobToRecruiter(this.jobdetail ).subscribe( (response) => {
          console.log(" addJobToRecruiter " + response);
          if (response.status === 200) {
              this.toastrService.success('Job added successfully');
          } else {
            this.toastrService.error('Failed in LAODING job. Try again');
          }
        }, (error) => {
          this.toastrService.error('Failed in adding job. Try again');
        });
 
  }
  

}

