import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
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


import {
  MatCardModule, MatInputModule, MatButtonModule  //, MatTabsModule  //, MatCheckboxModule
  // MatToolbarModule, MatTableModule //, MatMenuModule //, MatSelectModule
} from '@angular/material';


import { DataTablesModule } from 'angular-datatables';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RdashboardComponent } from './components/recruiter/rdashboard/rdashboard.component';
import { RjobslistComponent } from './components/recruiter/rdashboard/rjobslist/rjobslist.component';
import { RseekerslistComponent } from './components/recruiter/rdashboard/rseekerslist/rseekerslist.component';
import { RaddjobComponent } from './components/recruiter/rdashboard/raddjob/raddjob.component';
import { RloginComponent } from './components/recruiter/rlogin/rlogin.component';
import { RprofileComponent } from './components/recruiter/rprofile/rprofile.component';
import { RprofileMainViewComponent } from './components/recruiter/rprofile/rprofile-main-view/rprofile-main-view.component';
import { RprofileSideViewComponent } from './components/recruiter/rprofile/rprofile-side-view/rprofile-side-view.component';
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
import { RprofileEditComponent } from './components/recruiter/rprofile/rprofile-main-view/rprofile-edit/rprofile-edit.component';
import { RprofileViewComponent } from './components/recruiter/rprofile/rprofile-main-view/rprofile-view/rprofile-view.component';
import { RprofileEditBasicComponent } from './components/recruiter/rprofile/rprofile-main-view/rprofile-edit/rprofile-edit-basic/rprofile-edit-basic.component';
import { RprofileEditPersonalComponent } from './components/recruiter/rprofile/rprofile-main-view/rprofile-edit/rprofile-edit-personal/rprofile-edit-personal.component';
import { RprofileEditProfessionalComponent } from './components/recruiter/rprofile/rprofile-main-view/rprofile-edit/rprofile-edit-professional/rprofile-edit-professional.component';
import { RprofileViewBasicComponent } from './components/recruiter/rprofile/rprofile-main-view/rprofile-view/rprofile-view-basic/rprofile-view-basic.component';
import { RprofileViewPersonalComponent } from './components/recruiter/rprofile/rprofile-main-view/rprofile-view/rprofile-view-personal/rprofile-view-personal.component';
import { RprofileViewProfessionalComponent } from './components/recruiter/rprofile/rprofile-main-view/rprofile-view/rprofile-view-professional/rprofile-view-professional.component';
import { MenuComponent } from './components/menu/menu.component';
// import { JobseekerModule } from './modules/jobseeker/jobseeker.module';
// import { RecruiterModule } from './modules/recruiter/recruiter.module';
@NgModule({
  declarations: [
    AppComponent,
    JregComponent,
    JregBasicComponent,
    JregPersonalComponent,
    JregProfessionalComponent,
    JloginComponent,
    DashboardComponent,
    JjobslistComponent,
    JappliedlistComponent,
    JprofileSideViewComponent,
    JprofileComponent,
    JprofileMainViewComponent,
    JprofileEditComponent,
    JprofileViewComponent,
    RegisterComponent,
    LoginComponent,
    RdashboardComponent,
    RjobslistComponent,
    RseekerslistComponent,
    RaddjobComponent,
    RloginComponent,
    RprofileComponent,
    RprofileMainViewComponent,
    RprofileSideViewComponent,
    RregisterComponent,
    RregisterBasicComponent,
    RregisterPersonalComponent,
    RregisterProfessionalComponent,
    JprofileViewBasicComponent,
    JprofileViewPersonalComponent,
    JprofileViewProfessionalComponent,
    JprofileEditProfessionalComponent,
    JprofileEditBasicComponent,
    JprofileEditPersonalComponent,
    RprofileEditComponent,
    RprofileViewComponent,
    RprofileEditBasicComponent,
    RprofileEditPersonalComponent,
    RprofileEditProfessionalComponent,
    RprofileViewBasicComponent,
    RprofileViewPersonalComponent,
    RprofileViewProfessionalComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatInputModule,
    // MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    // MatTabsModule,
    // MatCheckboxModule,
    // MatTableModule,
    // MatToolbarModule,
    // MatSelectModule,
    // MatMenuModule
    SharedModule,
    DataTablesModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    // JobseekerModule,
    // RecruiterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
