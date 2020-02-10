import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JregComponent } from './components/jobseeker/jreg/jreg.component';
import { JregBasicComponent } from './components/jobseeker/jreg/jreg-basic/jreg-basic.component';
import { JregPersonalComponent } from './components/jobseeker/jreg/jreg-personal/jreg-personal.component';
import { JregProfessionalComponent } from './components/jobseeker/jreg/jreg-professional/jreg-professional.component';
import { JloginComponent } from './components/jobseeker/jlogin/jlogin.component';
import { DashboardComponent } from './components/jobseeker/dashboard/dashboard.component';
import { JjobslistComponent } from './components/jobseeker/dashboard/jjobslist/jjobslist.component';
import { JappliedlistComponent } from './components/jobseeker/dashboard/jappliedlist/jappliedlist.component';
import { JprofileSideViewComponent } from './components/jobseeker/jprofile/jprofile-side-view/jprofile-side-view.component';

import { JprofileComponent } from './components/jobseeker/jprofile/jprofile.component';
import { JprofileMainViewComponent } from './components/jobseeker/jprofile/jprofile-main-view/jprofile-main-view.component';
import { JprofileEditComponent } from './components/jobseeker/jprofile/jprofile-main-view/jprofile-edit/jprofile-edit.component';
import { JprofileViewComponent } from './components/jobseeker/jprofile/jprofile-main-view/jprofile-view/jprofile-view.component';

import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';

import { RregisterComponent } from './components/recruiter/rregister/rregister.component';
import { RregisterBasicComponent } from './components/recruiter/rregister/rregister-basic/rregister-basic.component';
import { RregisterPersonalComponent } from './components/recruiter/rregister/rregister-personal/rregister-personal.component';
import { RregisterProfessionalComponent } from './components/recruiter/rregister/rregister-professional/rregister-professional.component';


import { JprofileViewBasicComponent } from './components/jobseeker/jprofile/jprofile-main-view/jprofile-view/jprofile-view-basic/jprofile-view-basic.component';
import { JprofileViewPersonalComponent } from './components/jobseeker/jprofile/jprofile-main-view/jprofile-view/jprofile-view-personal/jprofile-view-personal.component';
import { JprofileViewProfessionalComponent } from './components/jobseeker/jprofile/jprofile-main-view/jprofile-view/jprofile-view-professional/jprofile-view-professional.component';
import { JprofileEditPersonalComponent } from './components/jobseeker/jprofile/jprofile-main-view/jprofile-edit/jprofile-edit-personal/jprofile-edit-personal.component';
import { JprofileEditBasicComponent } from './components/jobseeker/jprofile/jprofile-main-view/jprofile-edit/jprofile-edit-basic/jprofile-edit-basic.component';
import { JprofileEditProfessionalComponent } from './components/jobseeker/jprofile/jprofile-main-view/jprofile-edit/jprofile-edit-professional/jprofile-edit-professional.component';
import { RdashboardComponent } from './components/recruiter/rdashboard/rdashboard.component';
import { RaddjobComponent } from './components/recruiter/rdashboard/raddjob/raddjob.component';
import { RjobslistComponent } from './components/recruiter/rdashboard/rjobslist/rjobslist.component';
import { RseekerslistComponent } from './components/recruiter/rdashboard/rseekerslist/rseekerslist.component';

import { RprofileComponent } from './components/recruiter/rprofile/rprofile.component';
import { RprofileMainViewComponent } from './components/recruiter/rprofile/rprofile-main-view/rprofile-main-view.component';
import { RprofileEditComponent } from './components/recruiter/rprofile/rprofile-main-view/rprofile-edit/rprofile-edit.component';
import { RprofileViewComponent } from './components/recruiter/rprofile/rprofile-main-view/rprofile-view/rprofile-view.component';
import { RprofileSideViewComponent } from './components/recruiter/rprofile/rprofile-side-view/rprofile-side-view.component';


import { RprofileViewBasicComponent } from './components/recruiter/rprofile/rprofile-main-view/rprofile-view/rprofile-view-basic/rprofile-view-basic.component';
import { RprofileViewPersonalComponent } from './components/recruiter/rprofile/rprofile-main-view/rprofile-view/rprofile-view-personal/rprofile-view-personal.component';
import { RprofileViewProfessionalComponent } from './components/recruiter/rprofile/rprofile-main-view/rprofile-view/rprofile-view-professional/rprofile-view-professional.component';
import { RprofileEditPersonalComponent } from './components/recruiter/rprofile/rprofile-main-view/rprofile-edit/rprofile-edit-personal/rprofile-edit-personal.component';
import { RprofileEditBasicComponent } from './components/recruiter/rprofile/rprofile-main-view/rprofile-edit/rprofile-edit-basic/rprofile-edit-basic.component';
import { RprofileEditProfessionalComponent } from './components/recruiter/rprofile/rprofile-main-view/rprofile-edit/rprofile-edit-professional/rprofile-edit-professional.component';
import { RecruiterModule } from './modules/recruiter/recruiter.module';
import { UserGuard } from './shared/common/user.guard';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'jRegister', component: JregComponent,
    children: [
      { path: '', redirectTo: 'jBasicDetails', pathMatch: 'full' },
      { path: 'jBasicDetails', component: JregBasicComponent, canActivate: [UserGuard] },
      { path: 'jPersonalDetails', component: JregPersonalComponent, canActivate: [UserGuard] },
      { path: 'jProfessionalDetails', component: JregProfessionalComponent, canActivate: [UserGuard] },
    ]
  },
  {
    path: 'rRegister', component: RregisterComponent,
    children: [
      { path: '', redirectTo: 'rBasicDetails', pathMatch: 'full' },
      { path: 'rBasicDetails', component: RregisterBasicComponent },
      { path: 'rPersonalDetails', component: RregisterPersonalComponent },
      { path: 'rProfessionalDetails', component: RregisterProfessionalComponent },
    ]
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [UserGuard]
    // children: [
    //   { path: '', redirectTo: 'jJobsList', pathMatch: 'full' },
    //   { path: 'jJobsList', component: JjobslistComponent },
    //   { path: 'jAppliedList', component: JappliedlistComponent }
    // ]
  },
  {
    path: 'rdashboard', component: RdashboardComponent,
    children: [
      { path: '', redirectTo: 'rjobslist', pathMatch: 'full' },
      { path: 'rjobslist', component: RjobslistComponent },
      { path: 'rseekerslist', component: RseekerslistComponent },
      { path: 'raddjob', component: RaddjobComponent },
    ]
  },
  {
    path: 'jProfile', component: JprofileComponent,
    children: [
      { path: '', redirectTo: 'jProfileView', pathMatch: 'full' },
      {
        path: 'jProfileView', component: JprofileViewComponent,
        children: [
          { path: '', redirectTo: 'jProfileViewBasic', pathMatch: 'full' },
          { path: 'jProfileViewBasic', component: JprofileViewBasicComponent },
          { path: 'jProfileViewPersonal', component: JprofileViewPersonalComponent },
          { path: 'jProfileViewProfessional', component: JprofileViewProfessionalComponent }
        ]
      },
      {
        path: 'jProfileEdit', component: JprofileEditComponent,
        children: [
          { path: '', redirectTo: 'jProfileEditBasic', pathMatch: 'full' },
          { path: 'jProfileEditBasic', component: JprofileEditBasicComponent },
          { path: 'jProfileEditPersonal', component: JprofileEditPersonalComponent },
          { path: 'jProfileEditProfessional', component: JprofileEditProfessionalComponent }
        ]
      }
    ]
  },
  { path: 'rProfile', component: RprofileComponent ,
  children: [
    { path: '', redirectTo: 'rProfileView', pathMatch: 'full' },
    {
      path: 'rProfileView', component: RprofileViewComponent,
      children: [
        { path: '', redirectTo: 'rProfileViewBasic', pathMatch: 'full' },
        { path: 'rProfileViewBasic', component: RprofileViewBasicComponent },
        { path: 'rProfileViewPersonal', component: RprofileViewPersonalComponent },
        { path: 'rProfileViewProfessional', component: RprofileViewProfessionalComponent }
      ]
    },
    {
      path: 'rProfileEdit', component: RprofileEditComponent,
      children: [
        { path: '', redirectTo: 'rProfileEditBasic', pathMatch: 'full' },
        { path: 'rProfileEditBasic', component: RprofileEditBasicComponent },
        { path: 'rProfileEditPersonal', component: RprofileEditPersonalComponent },
        { path: 'rProfileEditProfessional', component: RprofileEditProfessionalComponent }
      ]
    },
  ]
},
{path: 'recruiter', loadChildren: './modules/recruiter/recruiter.module#RecruiterModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
