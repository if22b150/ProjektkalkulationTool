import { Component, OnInit } from '@angular/core';
import { LecturerService } from 'src/app/services/lecturer.service';
import {AResourceView} from "../a-resource-view";
import {Lecturer} from "../../../models/lecturer.model";

@Component({
  selector: 'app-lecturer-view',
  templateUrl: './lecturer-view.component.html',
  styleUrls: ['./lecturer-view.component.scss']
})
export class LecturerViewComponent extends AResourceView<Lecturer> {
  constructor(public lecturerService: LecturerService) {
    super(lecturerService)
  }
}
