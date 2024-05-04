import {Component, Input} from '@angular/core';
import {finalize} from "rxjs";
import {Faculty} from "../../../../models/faculty.model";
import {FacultyService} from "../../../../services/faculty.service";
import {MessageService} from "primeng/api";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-faculty-update',
  templateUrl: './update-faculty.component.html',
  styleUrls: ['./update-faculty.component.scss']
})
export class UpdateFacultyComponent {
    @Input() faculty: Faculty;
    loading: boolean;

    createForm: FormGroup;
    visible: boolean;
    submitted: boolean;
  
    constructor(private facultyService: FacultyService, private formBuilder: FormBuilder,
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
      console.log(this.name.value)
      console.log(this.faculty.id)
  
      this.facultyService.update(this.faculty.id, this.name.value)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Die Fakultät wurde aktualisiert.' });
            this.closeDialog();
            this.facultyService.getAll();
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Die Fakultät konnte nicht aktualisiert werden.' });
          }
        })
    }

    get name(): AbstractControl {
      return this.createForm.get('name');
    }
}
