import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { ActivatedRoute } from '@angular/router';
import {AResourceView} from "../a-resource-view";


@Component({
  selector: 'app-companies-view',
  templateUrl: './companies-view.component.html',
  styleUrl: './companies-view.component.scss'
})
export class CompaniesViewComponent extends AResourceView<Company>{
  constructor(public companyService: CompanyService, private router: Router, private route: ActivatedRoute) {
    super(companyService)
  }

  navigateToDetails(company: Company) {
    const navigationUrl = ['/admin/company-details', company.id];
    this.router.navigate(navigationUrl, {
      queryParams: { company: JSON.stringify(company) }
    });
  }
}
