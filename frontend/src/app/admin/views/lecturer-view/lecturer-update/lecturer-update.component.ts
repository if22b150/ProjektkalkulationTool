import {Component, Input} from '@angular/core';
import {finalize} from "rxjs";
import {Lecturer} from "../../../../models/lecturer.model";
import {LecturerService} from "../../../../services/lecturer.service";
import { FacultyService } from "../../../../services/faculty.service";
import { Faculty } from 'src/app/models/faculty.model';
import {MessageService} from "primeng/api";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-lecturer-update',
  templateUrl: './lecturer-update.component.html',
  styleUrls: ['./lecturer-update.component.scss']
})
export class LecturerUpdateComponent {
  @Input() lecturer: Lecturer;
  loading: boolean;

  createForm: FormGroup;
  visible: boolean;
  submitted: boolean;
  faculty: Faculty;

  constructor(private lecturerService: LecturerService, private formBuilder: FormBuilder, public facultyService: FacultyService,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      hourlyRate: [null, [Validators.required]],
      dailyRate: [null, [Validators.required]]
    });
    this.facultyService.getAll();
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

    this.lecturerService.update(this.lecturer.id, this.name.value, this.hourlyRate.value, this.dailyRate.value, this.faculty.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Der Lektor wurde aktualisiert.' });
          this.closeDialog();
          this.lecturerService.getAll();
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Der Lektor konnte nicht aktualisiert werden.' });
        }
      })
  }

  get name(): AbstractControl {
    return this.createForm.get('name');
  }

  get hourlyRate(): AbstractControl {
    return this.createForm.get('hourlyRate');
  }

  get dailyRate(): AbstractControl {
    return this.createForm.get('dailyRate');
  }

  selectedFaculty(incomingfaculty: any) {
    this.faculty = incomingfaculty;
  }
}
