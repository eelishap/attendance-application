import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance/attendance.component';



@NgModule({
  declarations: [
    AttendanceComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AttendanceComponent
  ]
})
export class SharedModule { }
