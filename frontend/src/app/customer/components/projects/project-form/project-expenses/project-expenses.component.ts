import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {filter, take} from "rxjs";
import {ExpenseService} from "../../../../../services/expense.service";
import {AuthService} from "../../../../../services/auth/auth.service";
import {Project} from "../../../../../models/project.model";
import {ProjectExpense} from "../../../../../models/project-expense.model";

@Component({
  selector: 'app-project-expenses',
  templateUrl: './project-expenses.component.html',
  styleUrls: ['./project-expenses.component.scss']
})
export class ProjectExpensesComponent implements OnInit{
  // This component will be used when creating a new project, but also when editing an existing project
  // Therefore there needs to be a distinction, which is done via the "project" object, which gets passed from the outside component (either the new-project or the edit-project component)
  @Input() project: Project; // currently not relevant
  @Input() projectForm: FormGroup;
  @Input() submitted: boolean;

  constructor(private formBuilder: FormBuilder,
              public authService: AuthService,
              public expenseService: ExpenseService) {
  }

  ngOnInit() {
    this.initializeExpenses();
  }

  initializeExpenses() {
    if (this.project) {
      // not needed until there is no editing of projects
      this.project.expenses.forEach((projectExpenses: ProjectExpense) => {
        let expense = this.expenseService.expenses.find(e => e.id == projectExpenses.expense.id);
        this.projectExpenses.push(this.formBuilder.group({
          id: [projectExpenses.id],
          expense: [expense, [Validators.required]],
          costs: [projectExpenses.costs, [Validators.required, Validators.min(1)]]
        }))
      })
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

  costs(i: number): AbstractControl {
    return this.projectExpenses.at(i).get("costs");
  }
}
