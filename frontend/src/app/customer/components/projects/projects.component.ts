import { Component } from '@angular/core';
import {ProjectService} from "../../../services/project.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  constructor(public projectService: ProjectService) {
  }
}
