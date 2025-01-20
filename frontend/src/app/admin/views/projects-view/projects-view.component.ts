import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../../services/project.service";
import {AResourceView} from "../a-resource-view";
import {Project} from "../../../models/project.model";

@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.scss']
})
export class ProjectsViewComponent extends AResourceView<Project>{

  constructor(private projectService: ProjectService) {
    super(projectService)
  }
}
