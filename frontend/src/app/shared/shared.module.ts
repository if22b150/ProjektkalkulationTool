import { NgModule } from '@angular/core';
import {BtnLoadingDirective} from "../directives/btn-loading.directive";
import { LecturersByFacultyPipe } from './pipes/lecturers-by-faculty.pipe';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";


@NgModule({
  imports: [
    ProgressSpinnerModule
  ],
  declarations: [
    BtnLoadingDirective,
    LecturersByFacultyPipe,
    LoadingSpinnerComponent
  ],
  exports: [
    BtnLoadingDirective,
    LecturersByFacultyPipe,
    LoadingSpinnerComponent
  ]
})
export class SharedModule { }
