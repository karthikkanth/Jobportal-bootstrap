import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {
  basicdetails: any;
  personaldetails: any;
  professionalDetails: any;
 // id: any;
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
  getRecruiterDetails() {
    const recruiter = Object.assign({}, this.basicdetails, this.personaldetails, this.professionalDetails);
    return recruiter;
  }

  getRecruiterUserID() {
    console.log('5..........' + (sessionStorage.getItem('rc-user') ));
    if (sessionStorage.getItem('rc-user')) {
      const user = JSON.parse(sessionStorage.getItem('rc-user'));
      console.log('6..........' + (sessionStorage.getItem('rc-user') ));
      return user.user.id;
    }
  }
}