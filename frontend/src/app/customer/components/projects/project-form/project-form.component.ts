import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {LecturerService} from "../../../../services/lecturer.service";
import {ProjectTypeService} from "../../../../services/project-type.service";
import {ExpenseService} from "../../../../services/expense.service";
import {filter, take} from "rxjs";
import {ProjectExpense} from "../../../../models/project-expense.model";
import {ProjectLecturer} from "../../../../models/project-lecturer.model";
import {Project} from "../../../../models/project.model";
import Utils from "../../../../shared/utils";

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent {
  @Output() formChangesEmitter: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Input() project: Project;
  @Input() submitted: boolean;
  projectForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private messageService: MessageService,
              public lecturerService: LecturerService,
              public projectTypeService: ProjectTypeService,
              public expenseService: ExpenseService) {

  }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      name: [this.project ? this.project.name : null, [Validators.required]],
      projectType: [this.project ? this.project.projectType : this.projectTypeService.projectTypes[0], [Validators.required]],
      projectExpenses: this.formBuilder.array([]),
      projectLecturers: this.formBuilder.array([]),
    });

    this.projectForm.valueChanges.subscribe({
      next: (fg) => this.formChangesEmitter.emit(this.projectForm)
    })
  }

  get name(): AbstractControl {
    return this.projectForm.get("name");
  }

  get projectType(): AbstractControl {
    return this.projectForm.get("projectType");
  }

  get projectLecturers(): FormArray {
    return this.projectForm.get("projectLecturers") as FormArray;
  }

  get projectExpenses(): FormArray {
    return this.projectForm.get("projectExpenses") as FormArray;
  }
}
