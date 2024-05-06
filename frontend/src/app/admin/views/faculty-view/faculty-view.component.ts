// faculty-view.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FacultyService } from 'src/app/services/faculty.service';
import { Faculty } from 'src/app/models/faculty.model';

@Component({
  selector: 'app-faculty-view',
  templateUrl: './faculty-view.component.html',
  styleUrls: ['./faculty-view.component.scss']
})
export class FacultyViewComponent implements OnInit{
  selectedFaculty: Faculty | null = null;

  constructor(public facultyService: FacultyService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.facultyService.getAll();
  }

  editFaculty(faculty: Faculty): void {
    this.selectedFaculty = faculty;
    this.cd.detectChanges();
  }
}
