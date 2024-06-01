import {Component, Input} from '@angular/core';
import {ProjectService} from "../../../../services/project.service";
import {AuthService} from "../../../../services/auth/auth.service";
import {Project} from "../../../../models/project.model";
import {finalize} from "rxjs";
import {Button} from "primeng/button";
import {Ripple} from "primeng/ripple";

@Component({
  selector: 'app-export-buttons',
  standalone: true,
  imports: [
    Button,
    Ripple
  ],
  template: `
    <div class="flex gap-2">
      <p-button pRipple label="CSV" icon="pi pi-file-export" iconPos="right" severity="secondary" [loading]="loading"
                (click)="exportToCSV()"></p-button>
      <p-button pRipple label="PDF" icon="pi pi-file-export" iconPos="right" severity="secondary" [loading]="loading"
                (click)="exportToPDF()"></p-button>
    </div>
  `
})
export class ExportButtonsComponent {
  loading: boolean;
  @Input() project: Project;

  constructor(private projectService: ProjectService,
              private authService: AuthService) {
  }

  exportToCSV() {
    this.loading = true;
    this.projectService.exportToCSV(this.authService.user.faculty.id, this.project)
      .pipe(finalize(() => this.loading = false))
      .subscribe((response: any) => {
        this.downloadCsv(response.csv_string, 'project_' + this.project.id + '.csv');
      })
  }

  exportToPDF() {
    this.loading = true;
    this.projectService.exportToPDF(this.authService.user.faculty.id, this.project)
      .pipe(finalize(() => this.loading = false))
      .subscribe((response: any) => {
        this.downloadPDF(response.pdf_string, 'project_' + this.project.id + '.pdf');
      })
  }

  private downloadCsv(csvData: string, fileName: string) {
    const blob = new Blob([csvData], {type: 'text/csv;charset=utf-8;'});

    // For other browsers
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', fileName);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private downloadPDF(data: string, fileName: string) {
    const blob = new Blob([data], {type: 'application/pdf;'});

    // For other browsers
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', fileName);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
