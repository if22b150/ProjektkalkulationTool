import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {filter, take} from "rxjs";
import { ProjectCategoryService } from 'src/app/services/project-category.service';
import {AuthService} from "../../../../../services/auth/auth.service";
import {Project} from "../../../../../models/project.model";
import { ProjectCategory } from 'src/app/models/project-category.model';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";

@Component({
  selector: 'app-project-category',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    DropdownModule,
    AsyncPipe,
    InputNumberModule,
    ButtonDirective,
    Ripple,
    NgIf
  ],
  templateUrl: './project-category.component.html',
  styleUrl: './project-category.component.scss'
})
export class ProjectCategoryComponent {
  @Input() project: Project; // currently not relevant
  @Input() projectForm: FormGroup;
  @Input() submitted: boolean;

  constructor(private formBuilder: FormBuilder,
    public authService: AuthService,
    public projectCategoryService: ProjectCategoryService) {
}

initializeExpenses() {
  // if (this.project) {
  //   // not needed until there is no editing of projects
  //   this.project.projectCategories.forEach((projectCategories: ProjectCategory) => {
  //     let category = this.projectCategoryService.projectCategories.find(e => e.id == projectCategories.category.id);
  //     this.projectCategories.push(this.formBuilder.group({
  //       id: [projectCategories.id],
  //       expense: [category, [Validators.required]],
  //     }))
  //   })
  // } else {
  //   this.projectCategories.push(this.newProjectCategoryFormGroup());
  // }
}
}
