import {Component, Input} from '@angular/core';
import {finalize} from "rxjs";
import { Company } from "src/app/models/company.model";
import { CompanyService } from "src/app/services/company.service";
import {MessageService} from "primeng/api";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrl: './update-company.component.scss'
})

export class UpdateCompanyComponent {
  @Input() company: Company;
  loading: boolean;

  createForm: FormGroup;
  visible: boolean;
  submitted: boolean;
  selectedImage: File = null;

  constructor(private companyService: CompanyService, private formBuilder: FormBuilder,
    private messageService: MessageService) {
  }

  ngOnInit() {
    console.log(this.company.image_url)
    this.createForm = this.formBuilder.group({
      image: [this.company.image, [Validators.required]],
      name: [this.company.name, [Validators.required]]
    });
  }

  openDialog() {
    this.visible = true;
    this.createForm = this.formBuilder.group({
      image: [this.company.image, [Validators.required]],
      name: [this.company.name, [Validators.required]]
    });
  }

  closeDialog() {
    this.visible = false;
    this.createForm.reset();
  }

  onFileSelected(event: any): void {
    this.selectedImage = <File>event.target.files[0];
  }

  submit() {
    this.submitted = true;
    if(this.createForm.invalid)
      return;

    if (!this.selectedImage) {
      this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Bitte ein Bild auswählen.' });
      return;
    }

    this.loading = true;
    const formData = new FormData();
    formData.append('file', this.selectedImage, this.selectedImage.name);
    console.log(this.name.value)
    this.companyService.update(this.company.id, formData ,this.name.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Der Aufwand wurde aktualisiert.' });
          this.closeDialog();
          this.companyService.getAll();
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Der Aufwand konnte nicht aktualisiert werden.' });
        }
      })
  }

  get image(): AbstractControl {
    return this.createForm.get('image');
  }

  get name(): AbstractControl {
    return this.createForm.get('name');
  }
}
