import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpService} from './services/http.service';
import { PhonePipe } from './customPipes/phone.pipe';

@NgModule({
  declarations: [PhonePipe],
  providers: [HttpService],
  imports: [
    CommonModule
  ],
  exports: [PhonePipe]
})
export class SharedModule { }
