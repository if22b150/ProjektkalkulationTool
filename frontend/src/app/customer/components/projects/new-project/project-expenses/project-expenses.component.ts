import {Component, Input} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {filter, take} from "rxjs";
import {ExpenseService} from "../../../../../services/expense.service";
import {AuthService} from "../../../../../services/auth/auth.service";
import {Project} from "../../../../../models/project.model";

@Component({
  selector: 'app-project-expenses',
  templateUrl: './project-expenses.component.html',
  styleUrls: ['./project-expenses.component.scss']
})
export class ProjectExpensesComponent {
// This component will be used when creating a new project, but also when editing an existing project
  // Therefore there needs to be a distinction, which is done via the "newProject" boolean, which gets passed from the outside component (either the new-project or hte edit-project component)
  // When newProject is true, "project" is not set, when it is false, "project" is set with the already existing project

  @Input() project: Project; // currently not relevant

  @Input() projectForm: FormGroup;
  @Input() newProject: boolean;

  constructor(private formBuilder: FormBuilder,
              public authService: AuthService,
              public expenseService: ExpenseService) {
  }

  ngOnInit() {
    this.expenseService.expenses$
      .pipe(filter(l => l != null), take(1))
      .subscribe({
        next: () => {
          this.initializeExpenses();
        }
      })
  }

  initializeExpenses() {
    if (!this.newProject) {
      // not needed until there is no editing of projects

      // this.project.projectLecturers.forEach((projectLecturer: ProjectLecturer) => {
      //   this.projectLecturers.push(this.formBuilder.group({
      //     id: [projectLecturer.id],
      //     lecturer: [projectLecturer.lecturer, [Validators.required]],
      //     hours: [projectLecturer.hours, [Validators.required, Validators.min(1)]]
      //   }))
      // })

    } else {
      this.projectExpenses.push(this.newProjectExpenseFormGroup());
    }
  }

  newProjectExpenseFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      expense: [this.expenseService.expenses[0], [Validators.required]],
      costs: [null, [Validators.required, Validators.min(1)]]
    })
  }

  addProjectExpense() {
    setTimeout(() => {
      this.projectExpenses.push(this.newProjectExpenseFormGroup());
    });
  }

  removeProjectExpense(i: number) {
    this.projectExpenses.removeAt(i);
  }

  get projectExpenses(): FormArray {
    return this.projectForm.get("projectExpenses") as FormArray;
  }
}
