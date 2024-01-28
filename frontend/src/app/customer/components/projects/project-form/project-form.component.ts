import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectTypeService} from "../../../../services/project-type.service";
import {Project} from "../../../../models/project.model";
import {ExpenseService} from "../../../../services/expense.service";
import {LecturerService} from "../../../../services/lecturer.service";
import {ProjectExpense} from "../../../../models/project-expense.model";
import {ProjectLecturer} from "../../../../models/project-lecturer.model";
import Utils from "../../../../shared/utils";

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit{
  @Output() formChangesEmitter: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() submitEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Input() project: Project = null;
  @Input() submitLabel: string;
  @Input() title: string;
  @Input() submitted: boolean;
  @Input() loading: boolean = false;

  projectForm: FormGroup;
  totalCost: number = 0;

  constructor(private formBuilder: FormBuilder,
              public projectTypeService: ProjectTypeService,
              public expenseService: ExpenseService,
              public lecturerService: LecturerService) {

  }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      name: [this.project ? this.project.name : null, [Validators.required]],
      firstname: [this.project ? this.project.firstname : null, [Validators.required]],
      lastname: [this.project ? this.project.lastname : null, [Validators.required]],
      email: [this.project ? this.project.email : null, [Validators.required, Validators.email]],
      start: [this.project ? new Date(this.project.start) : null, [Validators.required]],
      end: [this.project ? new Date(this.project.end) : null, [Validators.required]],
      crossFaculty: this.project ? this.project.crossFaculty : false,
      notes: this.project ? this.project.notes : null,
      projectType: [this.project ? this.project.projectType : this.projectTypeService.projectTypes[0], [Validators.required]],
      projectExpenses: this.formBuilder.array([]),
      projectLecturers: this.formBuilder.array([]),
    });

    this.projectForm.valueChanges.subscribe({
      next: (fg) => {
        this.formChangesEmitter.emit(this.projectForm);
        this.costChanges();
      }
    })
  }

  costChanges() {
    if(this.projectLecturers.valid && this.projectExpenses.valid)
      this.calculateTotalCost();
    else
      this.totalCost = 0;
  }

  calculateTotalCost() {
    let expenses: ProjectExpense[] = [];
    this.projectExpenses.controls.forEach(expense => {
      expenses.push({
        costs: expense.get('costs').value || 0,
        expense: expense.get('expense').value
      });
    });

    let lecturers: ProjectLecturer[] = [];
    this.projectLecturers.controls.forEach(lecturer => {
      lecturers.push({
        hours: lecturer.get('hours').value || 0,
        lecturer: lecturer.get('lecturer').value
      });
    });

    this.totalCost = Utils.calculateProjectCosts(lecturers, expenses);
  }

  get name(): AbstractControl {
    return this.projectForm.get("name");
  }

  get firstname(): AbstractControl {
    return this.projectForm.get("firstname");
  }

  get lastname(): AbstractControl {
    return this.projectForm.get("lastname");
  }

  get email(): AbstractControl {
    return this.projectForm.get("email");
  }

  get start(): AbstractControl {
    return this.projectForm.get("start");
  }

  get end(): AbstractControl {
    return this.projectForm.get("end");
  }

  get notes(): AbstractControl {
    return this.projectForm.get("notes");
  }

  // get crossFaculty(): AbstractControl {
  //   return this.projectForm.get("crossFaculty");
  // }
  //
  // get projectType(): AbstractControl {
  //   return this.projectForm.get("projectType");
  // }

  get projectLecturers(): FormArray {
    return this.projectForm.get("projectLecturers") as FormArray;
  }

  get projectExpenses(): FormArray {
    return this.projectForm.get("projectExpenses") as FormArray;
  }
}
