import {Component, Input, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ButtonDirective} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Ripple} from "primeng/ripple";
import {Project} from "../../../../../models/project.model";
import {AuthService} from "../../../../../services/auth/auth.service";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {OtherExpense} from "../../../../../models/other-expense.model";
import {CheckboxModule} from "primeng/checkbox";

@Component({
  selector: 'app-project-other-expenses',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonDirective,
    DropdownModule,
    InputNumberModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    Ripple,
    FloatLabelModule,
    InputTextModule,
    CheckboxModule
  ],
  templateUrl: './project-other-expenses.component.html',
  styleUrl: './project-other-expenses.component.scss'
})
export class ProjectOtherExpensesComponent implements OnInit {
  @Input() project: Project;
  @Input() projectForm: FormGroup;
  @Input() submitted: boolean;

  constructor(private formBuilder: FormBuilder,
              public authService: AuthService) {
  }

  ngOnInit() {
    this.initializeOtherExpenses();
  }

  initializeOtherExpenses() {
    if (this.project) {
      this.project.otherExpenses.forEach((oe: OtherExpense) => {
        this.otherExpenses.push(this.formBuilder.group({
          id: [oe.id],
          name: [oe.name, [Validators.required]],
          costs: [oe.costs, [Validators.required, Validators.min(1)]],
          perParticipant: [oe.perParticipant]
        }))
      })
    } else {
      this.otherExpenses.push(this.newOtherExpenseFormGroup());
    }
  }

  newOtherExpenseFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      costs: [null, [Validators.required, Validators.min(1)]],
      perParticipant: [false]
    })
  }

  addOtherExpense() {
    setTimeout(() => {
      this.otherExpenses.push(this.newOtherExpenseFormGroup());
    });
  }

  removeOtherExpense(i: number) {
    this.otherExpenses.removeAt(i);
  }

  get otherExpenses(): FormArray {
    return this.projectForm.get("otherExpenses") as FormArray;
  }

  name(i: number): AbstractControl {
    return this.otherExpenses.at(i).get("name");
  }

  costs(i: number): AbstractControl {
    return this.otherExpenses.at(i).get("costs");
  }

  perParticipant(i: number): AbstractControl {
    return this.otherExpenses.at(i).get("perParticipant");
  }
}
