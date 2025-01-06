import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.scss'
})
export class CompanyDetailsComponent {
  company: Company = null;
  projects: Project[];

  constructor(public companiesService: CompanyService, private route: ActivatedRoute,
    private projectService: ProjectService) {}

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
