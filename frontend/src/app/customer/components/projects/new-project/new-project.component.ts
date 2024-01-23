import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MessageService } from 'primeng/api';
import {ExpenseService} from "../../../../services/expense.service";
import {ProjectTypeService} from "../../../../services/project-type.service";
import {filter, take} from "rxjs";
import {LecturerService} from "../../../../services/lecturer.service";
import Utils from "../../../../shared/utils";
import {Project} from "../../../../models/project.model";
import {ProjectExpense} from "../../../../models/project-expense.model";
import {ProjectLecturer} from "../../../../models/project-lecturer.model";

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit{
  newProjectForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  totalCost: number = 0;

  constructor(private formBuilder: FormBuilder,
              private messageService: MessageService,
              public lecturerService: LecturerService,
              public projectTypeService: ProjectTypeService,
              public expenseService: ExpenseService) {

  }

  ngOnInit() {
    // this.newProjectForm = this.formBuilder.group({
    //   name: [null, [Validators.required]],
    //   // travelCosts: [null, [Validators.required]],
    //   projectType: [null, [Validators.required]],
    //   projectExpenses: this.formBuilder.array([]),
    //   projectLecturers: this.formBuilder.array([]),
    // })
    //
    // this.projectTypeService.projectTypes$
    //   .pipe(filter(p => p != null), take(1))
    //   .subscribe({
    //     next: (p) => {
    //       this.projectType.setValue(p[0]);
    //     }
    //   })
  }

  formChanges(fg: FormGroup) {
    this.newProjectForm = fg;
  }

  create() {
    this.submitted = true;
    if(this.newProjectForm.invalid)
      return;

    this.loading = true;

    this.calculateTotalCost();

    // Fake request time
    setTimeout(() => {
      this.loading = false;
    }, 1000);

    this.messageService.add({severity:'success', summary:'Erfolg', detail:'Projekt abgeschlossen'});
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

    let project: Project = {
      id: null,
      lecturers: lecturers,
      expenses: expenses,
      name: this.name.value,
      projectType: this.projectType.value
    }
    this.totalCost = Utils.calculateProjectCosts(project);
  }

  get name(): AbstractControl {
    return this.newProjectForm.get("name");
  }

  get projectType(): AbstractControl {
    return this.newProjectForm.get("projectType");
  }

  // get travelCosts(): AbstractControl {
  //   return this.newProjectForm.get("travelCosts");
  // }


  get projectLecturers(): FormArray {
    return this.newProjectForm.get("projectLecturers") as FormArray;
  }

  get projectExpenses(): FormArray {
    return this.newProjectForm.get("projectExpenses") as FormArray;
  }
}
