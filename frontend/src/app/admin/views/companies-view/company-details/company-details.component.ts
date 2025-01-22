import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { Project } from 'src/app/models/project.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import {ProjectTypeService} from "src/app/services/project-type.service";
import {ProjectType} from "src/app/models/project-type.model";
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
  dateUntil: Date | null = null;
  dateFrom: Date | null = null;

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