import {Component, Input} from '@angular/core';
import {finalize} from "rxjs";
import { ProjectCategory } from 'src/app/models/project-category.model';
import { ProjectCategoryService } from 'src/app/services/project-category.service';

@Component({
  selector: 'app-delete-project-category',
  template: `
  <p-button icon="pi pi-trash" styleClass="p-button-danger" [loading]="loading" (click)="delete()"></p-button>
`,
})
export class DeleteProjectCategoryComponent {
  @Input() projectCategory: ProjectCategory;
  loading: boolean;

  constructor(private projectCategoryService: ProjectCategoryService) {
  }

  delete() {
    this.loading = true;
    this.projectCategoryService.delete(this.projectCategory.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.projectCategoryService.getAll();
        }
      })
  }
}
