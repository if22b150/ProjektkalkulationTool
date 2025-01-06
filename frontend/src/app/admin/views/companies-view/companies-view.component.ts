import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-companies-view',
  templateUrl: './companies-view.component.html',
  styleUrl: './companies-view.component.scss'
})
export class CompaniesViewComponent implements OnInit{
  constructor(public companyService: CompanyService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.companyService.getAll();
  }

  navigateToDetails(company: Company) {
    const navigationUrl = ['/admin/company-details', company.id];
    this.router.navigate(navigationUrl, {
      queryParams: { company: JSON.stringify(company) }
    });
  }
}
