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
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-project-company',
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
  templateUrl: './project-company.component.html',
  styleUrl: './project-company.component.scss'
})
export class ProjectCompanyComponent {
  @Input() project: Project; // currently not relevant
  @Input() projectForm: FormGroup;
  @Input() submitted: boolean;

  constructor(private formBuilder: FormBuilder,
    public authService: AuthService, public companyService: CompanyService) {
    }
}
