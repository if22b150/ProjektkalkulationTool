import { Component, OnInit } from '@angular/core';
import { LecturerService } from 'src/app/services/lecturer.service';

@Component({
  selector: 'app-lecturer-view',
  templateUrl: './lecturer-view.component.html',
  styleUrls: ['./lecturer-view.component.scss']
})
export class LecturerViewComponent implements OnInit{
  constructor(public lecturerService: LecturerService) {}

  ngOnInit(): void {
    this.lecturerService.getAll();
  }
}
