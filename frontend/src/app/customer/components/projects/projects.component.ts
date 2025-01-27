import {Component, input, OnInit} from '@angular/core';
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
import {EProjectState, getProjectStateIconClass, getProjectStateLabel, Project} from "../../../models/project.model";
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import {CalendarModule} from "primeng/calendar";
import {finalize} from "rxjs";

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
    DatePipe,
    CalendarModule
  ],
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  company = input<Company>()
  faculty = input<Faculty>()

  projectTypeFilter: ProjectType;
  facultyFilter: Faculty;
  companyFilter: Company;
  dateUntil: Date | null = null;
  dateFrom: Date | null = null;
  dateCreatedUntil: Date | null = null;
  dateCreatedFrom: Date | null = null;

  constructor(public projectService: ProjectService,
              public projectTypeService: ProjectTypeService,
              public facultyService: FacultyService,
              public companyService: CompanyService,
              public authService: AuthService) {
  }

  ngOnInit() {
    this.companyFilter = this.company()
    this.facultyFilter = this.faculty()
  }

  exportLoading: boolean = false;

  exportCSV(filteredProjects: Project[]) {
    this.exportLoading = true

    const date = new Date();
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}_${String(date.getMonth() + 1).padStart(2, '0')}_${date.getFullYear()}`;

    this.projectService.reportExport(filteredProjects.map(p => p.id))
      .pipe(finalize(() => this.exportLoading = false))
      .subscribe({
        next: (response: any) => {
          this.downloadCsv(response.csv_string, `projects_${formattedDate}.csv`);
        }
      })
  }

  private downloadCsv(csvData: string, fileName: string) {
    const blob = new Blob([csvData], {type: 'text/csv;charset=utf-8;'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', fileName);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  clearFilters() {
    this.projectTypeFilter = null
    this.dateUntil = null
    this.dateFrom = null
    this.dateCreatedFrom = null
    this.dateCreatedUntil = null
    if(!this.company())
      this.companyFilter = null
    if(!this.faculty())
      this.facultyFilter = null
  }

  protected readonly ERole = ERole;
  protected readonly getProjectStateIconClass = getProjectStateIconClass;
  protected readonly getProjectStateLabel = getProjectStateLabel;
  protected readonly EProjectState = EProjectState;
}
