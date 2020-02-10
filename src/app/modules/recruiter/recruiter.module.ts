import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruiterRoutingModule } from '../../routes/recruiter-routing.module';
import { TestComponent } from '../../components/test/test.component';

@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    RecruiterRoutingModule
  ]
})
export class RecruiterModule { }
