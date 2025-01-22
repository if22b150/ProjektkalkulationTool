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
  selector: 'app-faculty-details',
  templateUrl: './faculty-details.component.html',
  styleUrl: './faculty-details.component.scss'
})
export class FacultyDetailsComponent {
  faculty: Faculty = null;
  projects: Project[];
  projectTypeFilter: ProjectType;
  companyFilter: Company;

  constructor(public companiesService: CompanyService, private route: ActivatedRoute,
    public projectService: ProjectService,
    public projectTypeService: ProjectTypeService,
    public facultyService: FacultyService,
    public authService: AuthService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const companyData = params['company'];
      if (companyData) {
        this.faculty = JSON.parse(companyData);
      }
      this.projectService.getProjectsByFacultyId(this.faculty.id)
    });
  }
}