import { Component, OnInit } from '@angular/core';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-faculty-view',
  templateUrl: './faculty-view.component.html',
  styleUrls: ['./faculty-view.component.scss']
})
export class FacultyViewComponent implements OnInit{
  constructor(public facultyService: FacultyService) {}

  ngOnInit(): void {
    this.facultyService.getAll();
  }
}