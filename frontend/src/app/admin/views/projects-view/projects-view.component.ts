import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../../services/project.service";

@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.scss']
})
export class ProjectsViewComponent implements OnInit {

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.projectService.getAll();
  }
}
