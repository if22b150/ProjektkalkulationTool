import { Pipe, PipeTransform } from '@angular/core';
import {Lecturer} from "../../models/lecturer.model";

@Pipe({
  name: 'lecturersByFaculty'
})
export class LecturersByFacultyPipe implements PipeTransform {

  transform(value: Lecturer[], ...args: unknown[]): unknown {
    return value.filter(l => l.faculty.id == args[0]);
  }

}
