import {Component, Input} from '@angular/core';
import {finalize} from "rxjs";
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-delete-company',
  template: `
  <p-button icon="pi pi-trash" styleClass="p-button-danger" [loading]="loading" (click)="delete()"></p-button>
`
})
export class DeleteCompanyComponent {
  @Input() company: Company;
  loading: boolean;

  constructor(private companyService: CompanyService) {
  }

  delete() {
    this.loading = true;
    this.companyService.delete(this.company.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
        }
      })
  }
}
