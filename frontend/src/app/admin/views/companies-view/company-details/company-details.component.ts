import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { Project } from 'src/app/models/project.model';
import {Button} from "primeng/button";
import {AsyncPipe, CurrencyPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {Ripple} from "primeng/ripple";
import {RouterLink} from "@angular/router";
import {ToastModule} from "primeng/toast";
import { AuthService } from 'src/app/services/auth/auth.service';
import {ERole} from "src/app/models/user.model";
import { BadgeModule } from 'primeng/badge';
import {TooltipModule} from "primeng/tooltip";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {ProjectTypeService} from "src/app/services/project-type.service";
import {ProjectType} from "src/app/models/project-type.model";
import {FloatLabelModule} from "primeng/floatlabel";
import {Faculty} from "src/app/models/faculty.model";
import {FacultyService} from "src/app/services/faculty.service";

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.scss'
})
export class CompanyDetailsComponent {
  company: Company = null;
  projects: Project[];
  projectTypeFilter: ProjectType;
  facultyFilter: Faculty;

  constructor(public companiesService: CompanyService, private route: ActivatedRoute,
    public projectService: ProjectService,
    public projectTypeService: ProjectTypeService,
    public facultyService: FacultyService,
    public authService: AuthService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const companyData = params['company'];
      if (companyData) {
        this.company = JSON.parse(companyData);  // Parse the JSON string back to an object
      }
      this.projectService.getProjectsByCompanyId(this.company.id)
    });
  }
}
