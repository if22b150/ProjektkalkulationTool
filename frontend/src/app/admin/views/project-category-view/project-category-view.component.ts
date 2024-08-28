import { Component } from '@angular/core';
import { ProjectCategoryService } from 'src/app/services/project-category.service';

@Component({
  selector: 'app-project-category-view',
  templateUrl: './project-category-view.component.html',
  styleUrl: './project-category-view.component.scss'
})
export class ProjectCategoryViewComponent {
  constructor(public projectCategoryService: ProjectCategoryService) {}

  ngOnInit(): void {
    this.projectCategoryService.getAll();
  }
}
