import {Component, Input} from '@angular/core';
import {finalize} from "rxjs";
import {ProjectCategory} from "../../../../models/project-category.model";
import {ProjectCategoryService} from "../../../../services/project-category.service";
import {MessageService} from "primeng/api";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-project-category',
  templateUrl: './update-project-category.component.html',
  styleUrl: './update-project-category.component.scss'
})
export class UpdateProjectCategoryComponent {
  @Input() projectCategory: ProjectCategory;
  loading: boolean;

  createForm: FormGroup;
  visible: boolean;
  submitted: boolean;

  constructor(private projectCategoryServie: ProjectCategoryService, private formBuilder: FormBuilder,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: [this.projectCategory.name, [Validators.required]]
    });
  }

  openDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
    this.createForm.reset();
  }

  submit() {
    this.submitted = true;
    if(this.createForm.invalid)
      return;

    this.loading = true;

    this.projectCategoryServie.update(this.projectCategory.id, this.name.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Die Auftragsart wurde aktualisiert.' });
          this.closeDialog();
          this.projectCategoryServie.getAll();
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Die Auftragsart‚ konnte nicht aktualisiert werden.' });
        }
      })
  }

  get name(): AbstractControl {
    return this.createForm.get('name');
  }
}
