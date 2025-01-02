import { Component } from '@angular/core';
import { ProjectCategoryService } from 'src/app/services/project-category.service';
import { ProjectTypeService } from 'src/app/services/project-type.service';

@Component({
  selector: 'app-project-category-view',
  templateUrl: './project-category-view.component.html',
  styleUrl: './project-category-view.component.scss'
})
export class ProjectCategoryViewComponent {
  constructor(public projectTypeService: ProjectTypeService) {}

  ngOnInit(): void {
    this.projectTypeService.getAll();
  }
}
