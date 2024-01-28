import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ProjectService} from "../../../../services/project.service";
import {finalize} from "rxjs";
import {AuthService} from "../../../../services/auth/auth.service";
import {Project} from "../../../../models/project.model";
import {ProjectTypeService} from "../../../../services/project-type.service";
import {ExpenseService} from "../../../../services/expense.service";
import {LecturerService} from "../../../../services/lecturer.service";
import {AbstractControl, FormArray, FormGroup} from "@angular/forms";
import {ProjectExpense} from "../../../../models/project-expense.model";
import {ProjectLecturer} from "../../../../models/project-lecturer.model";
import Utils from "../../../../shared/utils";

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  loading: boolean;
  project: Project;
  submitted: boolean;
  editProjectForm: FormGroup;
  totalCost: number = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private authService: AuthService,
              public projectService: ProjectService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    if(!id || isNaN(id)) {
      this.router.navigate(['/projects']).then(() => {
        setTimeout(() => {
          this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Das Projekt existiert nicht.'});
        }, 1)
      });
      return;
    }

    this.loading = true;
    this.projectService.getOne(id, this.authService.user.faculty.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (project) => {
          this.project = project;
        },
        error: () => {
          this.router.navigate(['/projects']).then(() => {
            setTimeout(() => {
              this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Das Projekt konnte nicht abgerufen werden.'});
            }, 1)
          });
        }
      })
  }

  formChanges(fg: FormGroup) {
    this.editProjectForm = fg;
  }

  update() {
    this.submitted = true;
    if(this.editProjectForm.invalid)
      return;

    this.loading = true;

    // Fake request time
    setTimeout(() => {
      this.loading = false;
    }, 1000);

    this.messageService.add({severity:'success', summary:'Erfolg', detail:'Projekt abgeschlossen'});
  }

  get name(): AbstractControl {
    return this.editProjectForm.get("name");
  }

  get firstname(): AbstractControl {
    return this.editProjectForm.get("firstname");
  }

  get lastname(): AbstractControl {
    return this.editProjectForm.get("lastname");
  }

  get email(): AbstractControl {
    return this.editProjectForm.get("email");
  }

  get start(): AbstractControl {
    return this.editProjectForm.get("start");
  }

  get end(): AbstractControl {
    return this.editProjectForm.get("end");
  }

  get crossFaculty(): AbstractControl {
    return this.editProjectForm.get("crossFaculty");
  }

  get projectType(): AbstractControl {
    return this.editProjectForm.get("projectType");
  }

  get projectLecturers(): FormArray {
    return this.editProjectForm.get("projectLecturers") as FormArray;
  }

  get projectExpenses(): FormArray {
    return this.editProjectForm.get("projectExpenses") as FormArray;
  }
}
