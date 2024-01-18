import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {MessageService} from "primeng/api";
import {finalize} from "rxjs";
import {FacultyService} from "../../../services/faculty.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  createForm: FormGroup;
  visible: boolean;
  submitted: boolean;
  loading: boolean;

  constructor(private formBuilder: FormBuilder,
              public userService: UserService,
              public facultyService: FacultyService,
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
  
    this.userService.create(this.name.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Der Benutzer wurde erstellt.' });
          this.closeDialog();
          this.userService.getAll();
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Der Benutzer konnte nicht erstellt werden.' });
        }
      })
  }
  
  get name(): AbstractControl {
    return this.createForm.get('name');
  }
}