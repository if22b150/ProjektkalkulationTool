import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-companies-view',
  templateUrl: './companies-view.component.html',
  styleUrl: './companies-view.component.scss'
})
export class CompaniesViewComponent implements OnInit{
  constructor(public companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getAll();
  }
}
