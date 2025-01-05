import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyService } from 'src/app/services/company.service';
import { MessageService } from "primeng/api";
import { finalize } from "rxjs";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent implements OnInit {
  createForm: FormGroup;
  visible: boolean;
  submitted: boolean;
  loading: boolean;
  
  selectedImage: File = null;

  constructor(private formBuilder: FormBuilder,
              public companyService: CompanyService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      image: [null, [Validators.required]],
      name: [null, [Validators.required]]
    });
  }

  openDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
    this.submitted = false;
    this.createForm.reset();
  }

  // Funktion zum Handhaben der Bildauswahl
  onFileSelected(event: any): void {
    this.selectedImage = <File>event.target.files[0];
  }

  submit() {
    this.submitted = true;
    if (this.createForm.invalid) return;

    if (!this.selectedImage) {
      this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Bitte ein Bild auswählen.' });
      return;
    }

    this.loading = true;
    const formData = new FormData();
    formData.append('file', this.selectedImage, this.selectedImage.name);

    this.companyService.create(formData, this.name.value) // Passiere FormData an den Service
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Unternehmen wurde erstellt.' });
          this.closeDialog();
          this.companyService.getAll();
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Unternehmen konnte nicht erstellt werden.' });
        }
      });
  }

  get name(): AbstractControl {
    return this.createForm.get('name');
  }

  get image(): AbstractControl {
    return this.createForm.get('image');
  }
}
