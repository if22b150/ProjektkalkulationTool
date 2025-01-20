// faculty-view.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FacultyService } from 'src/app/services/faculty.service';
import { Faculty } from 'src/app/models/faculty.model';
import {AResourceView} from "../a-resource-view";

@Component({
  selector: 'app-faculty-view',
  templateUrl: './faculty-view.component.html',
  styleUrls: ['./faculty-view.component.scss']
})
export class FacultyViewComponent extends AResourceView<Faculty>{
  selectedFaculty: Faculty | null = null;

  constructor(public facultyService: FacultyService, private cd: ChangeDetectorRef) {
    super(facultyService)
  }

  editFaculty(faculty: Faculty): void {
    this.selectedFaculty = faculty;
    this.cd.detectChanges();
  }
}
