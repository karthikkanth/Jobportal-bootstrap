import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobseekerService {
  basicdetails: any;
  personaldetails: any;
  professionalDetails: any;
  id: any;
  constructor() { }
  setBasicDetails(basicdetails: any) {
    this.basicdetails = basicdetails;
  }
  getBasicDetails() {
    return this.basicdetails;
  }
  setPersonalDetails(personaldetails: any) {
    this.personaldetails = personaldetails;
  }
  getPersonalDetails() {
    return this.personaldetails;
  }
  setProfessionalDetails(professionalDetails: any) {
    this.professionalDetails = professionalDetails;
  }
  getProfessionalDetails() {
    return this.professionalDetails;
  }
  getJobseekerDetails() {
    const jobseeker = Object.assign({}, this.basicdetails, this.personaldetails, this.professionalDetails);
    return jobseeker;
  }
  getUserID() {
    if (sessionStorage.getItem('js-user')) {
      const user = JSON.parse(sessionStorage.getItem('js-user'));
      return user.user.id;
    }
  }
}
