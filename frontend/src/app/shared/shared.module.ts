import { NgModule } from '@angular/core';
import {BtnLoadingDirective} from "../directives/btn-loading.directive";
import { LecturersByFacultyPipe } from './pipes/lecturers-by-faculty.pipe';


@NgModule({
  declarations: [
    BtnLoadingDirective,
    LecturersByFacultyPipe
  ],
  exports: [
    BtnLoadingDirective,
    LecturersByFacultyPipe
  ]
})
export class SharedModule { }
