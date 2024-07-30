import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ProjectCategoryService } from 'src/app/services/project-category.service';
import {MessageService} from "primeng/api";
import {finalize} from "rxjs";

@Component({
  selector: 'app-project-category',
  templateUrl: './project-category.component.html',
  styleUrl: './project-category.component.scss'
})
export class ProjectCategoryComponent {
  createForm: FormGroup;
  visible: boolean;
  submitted: boolean;
  loading: boolean;

  constructor(private formBuilder: FormBuilder,
              public projectCategoryService: ProjectCategoryService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: [null, [Validators.required]]
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

    this.projectCategoryService.create(this.name.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Aufwand wurde erstellt.' });
          this.closeDialog();
          this.projectCategoryService.getAll();
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Der Aufwand konnte nicht erstellt.' });
        }
      })
  }

  get name(): AbstractControl {
    return this.createForm.get('name');
  }
}
