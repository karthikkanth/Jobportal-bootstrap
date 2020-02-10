import { Injectable, ɵConsole } from '@angular/core';
import { HttpService } from '../shared/services/http.service';
import { HttpReq } from '../shared/common/app.entity';
import { JobseekerService } from '../services/jobseeker.service';
import { RecruiterService } from '../services/recruiter.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  REST_TYPE_GET: any = 'GET';
  REST_TYPE_POST: any = 'POST';
  REST_TYPE_PUT: any = 'PUT';
  id: any;
  rid: any;
  constructor(private httpService: HttpService, private jobseekerService: JobseekerService, private recruiterService: RecruiterService) {
  }

  jobseekerLogin(entityData: any) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.showLoader = true;
    httpReq.url = 'jobseekerA/login';
    httpReq.body = entityData;
    return this.httpService.restService(httpReq);
  }
  recruiterLogin(entityData: any) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.showLoader = true;
    httpReq.url = 'recruiterA/login';
    httpReq.body = entityData;
    return this.httpService.restService(httpReq);
  }
  jobseekerRegister(entityData: any) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.showLoader = true;
    httpReq.url = 'jobseekerA/register';
    httpReq.body = entityData;
    return this.httpService.restService(httpReq);
  }
  recruiterRegister(entityData: any) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.showLoader = true;
    httpReq.url = 'recruiterA/register';
    httpReq.body = entityData;
    return this.httpService.restService(httpReq);
  }
  getJobList() {

    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.showLoader = true;
    httpReq.url = 'jobseekerB/jobslist';
    return this.httpService.restService(httpReq);
  }

  getrecruiterJobList() {
    this.rid = this.recruiterService.getRecruiterUserID();
    console.log("***START API invokeRecruiterJobList***" +this.rid )
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = `recruiterB/jobslist/${this.rid}`;
    return this.httpService.restService(httpReq);
  }

  getAppliedList(id) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.showLoader = true;
    httpReq.url = `jobseekerB/appliedListForUser?userId=${id}`;
    return this.httpService.restService(httpReq);
  }
  applyForJob(entityData) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.showLoader = true;
    httpReq.url = 'jobseekerB/addJobToAppliedList';
    httpReq.body = entityData;
    return this.httpService.restService(httpReq);
  }
  invokeRecruiterJobList(recruiterId) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.showLoader = true;
    httpReq.url = `recruiterB/jobslist/${recruiterId}`;
    return this.httpService.restService(httpReq);
  }

  invokeRecruiterSeekersList(jobID) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.showLoader = true;
    httpReq.url = `recruiterB/seekersList/${jobID}`;
    return this.httpService.restService(httpReq);
  }
  getProfile() {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.showLoader = true;
    this.id = this.jobseekerService.getUserID();
    httpReq.url = `jobseekerB/getProfile/${this.id}`;
    return this.httpService.restService(httpReq);
  }
  updateProfile(entityData) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_PUT;
    httpReq.showLoader = true;
    httpReq.url = `jobseekerB/updateProfile/${this.id}`;
    httpReq.body = entityData;
    return this.httpService.restService(httpReq);
  }
  invokeRecruiterUpdateProfile(entityData) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_PUT;
    httpReq.showLoader = true;
    httpReq.url = `recruiterB/updateProfile/${this.rid}`;
    httpReq.body = entityData;
    return this.httpService.restService(httpReq);
  }
  invokeRecruiterGetProfile() {
    this.rid = this.recruiterService.getRecruiterUserID();
    const httpReq: HttpReq = new HttpReq();
    httpReq.showLoader = true;
    this.rid = this.recruiterService.getRecruiterUserID();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.url = `recruiterB/getProfile/${this.rid}`;
    return this.httpService.restService(httpReq);
  }
  addJobToRecruiter(entityData) {
    console.log("**GETS HERE***"   );
    console.log("***entityData***" + entityData );
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.showLoader = true;
    httpReq.url = `recruiterB/addJob`;
    httpReq.body = entityData;
    return this.httpService.restService(httpReq);
  }
  addJobRole(entityData) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.showLoader = true;
    httpReq.url = `common/addJobRole`;
    httpReq.body = entityData;
    return this.httpService.restService(httpReq);
  }
  updateProfileForJobseeker(entityData) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.showLoader = true;
    const formData = new FormData();
    formData.append('profilePic', entityData);
    httpReq.url = `jobseekerB/updateProfilePic/${this.id}`;
    httpReq.body = entityData;
    return this.httpService.restService(httpReq);
  }
  getAllJobRoles() {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_GET;
    httpReq.showLoader = true;
    this.id = this.jobseekerService.getUserID();
    httpReq.url = 'common/getJobRoles';
    return this.httpService.restService(httpReq);
  }
  validateUniqueness(entityData) {
    const httpReq: HttpReq = new HttpReq();
    httpReq.type = this.REST_TYPE_POST;
    httpReq.showLoader = false;
    this.id = this.jobseekerService.getUserID();
    httpReq.url = 'jobseekerA/checkUnique';
    httpReq.body = entityData;
    return this.httpService.restService(httpReq);
  }
  // entityData for add job = {
  //   "recruiterId": "",
  //   "userAppliedList": [],
  //   "companyname": "",
  //   "position": "",
  //   "experience": "",
  //   "technologies": "",
  //   "location": ""
  // }
}

