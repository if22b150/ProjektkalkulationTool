import {Component} from '@angular/core';
import {ProjectService} from "../../../services/project.service";
import {Button} from "primeng/button";
import {AsyncPipe, CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {Ripple} from "primeng/ripple";
import {RouterLink} from "@angular/router";
import {ExportButtonsComponent} from "./export-buttons/export-buttons.component";
import {LoadingSpinnerComponent} from "../../../shared/components/loading-spinner/loading-spinner.component";
import {ToastModule} from "primeng/toast";
import {AuthService} from "../../../services/auth/auth.service";
import {ERole} from "../../../models/user.model";
import { BadgeModule } from 'primeng/badge';
import {TooltipModule} from "primeng/tooltip";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {ProjectTypeService} from "../../../services/project-type.service";
import {ProjectType} from "../../../models/project-type.model";
import {FloatLabelModule} from "primeng/floatlabel";
import {Faculty} from "../../../models/faculty.model";
import {FacultyService} from "../../../services/faculty.service";
import {EProjectState, getProjectStateIconClass, getProjectStateLabel} from "../../../models/project.model";
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  imports: [
    Button,
    AsyncPipe,
    Ripple,
    RouterLink,
    CurrencyPipe,
    ExportButtonsComponent,
    NgForOf,
    LoadingSpinnerComponent,
    ToastModule,
    NgIf,
    BadgeModule,
    NgClass,
    TooltipModule,
    DropdownModule,
    PaginatorModule,
    ReactiveFormsModule,
    FloatLabelModule,
    DatePipe
  ],
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projectTypeFilter: ProjectType;
  facultyFilter: Faculty;
  companyFilter: Company;

  constructor(public projectService: ProjectService,
              public projectTypeService: ProjectTypeService,
              public facultyService: FacultyService,
              public companyService: CompanyService,
              public authService: AuthService) {
                projectService.getAll();
  }

  isOpened = true;

  protected readonly ERole = ERole;
  protected readonly getProjectStateIconClass = getProjectStateIconClass;
  protected readonly getProjectStateLabel = getProjectStateLabel;
  protected readonly EProjectState = EProjectState;
}
