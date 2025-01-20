import { Component } from '@angular/core';
import { ProjectCategoryService } from 'src/app/services/project-category.service';
import { ProjectTypeService } from 'src/app/services/project-type.service';
import {AResourceView} from "../a-resource-view";
import {ProjectCategory} from "../../../models/project-category.model";

@Component({
  selector: 'app-project-category-view',
  templateUrl: './project-category-view.component.html',
  styleUrl: './project-category-view.component.scss'
})
export class ProjectCategoryViewComponent extends AResourceView<ProjectCategory> {
  constructor(public projectTypeService: ProjectTypeService) {
    super(projectTypeService)
  }

}
