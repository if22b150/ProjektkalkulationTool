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
import { GroupSpecificExpense } from 'src/app/models/group-specific-expense.model';
import {CheckboxModule} from "primeng/checkbox";

@Component({
  selector: 'app-project-group-specific-expenses',
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
  templateUrl: './project-group-specific-expenses.component.html',
  styleUrl: './project-group-specific-expenses.component.scss'
})
export class ProjectGroupSpecificExpensesComponent {
  @Input() project: Project;
  @Input() projectForm: FormGroup;
  @Input() submitted: boolean;

  constructor(private formBuilder: FormBuilder,
    public authService: AuthService) {
}

ngOnInit() {
  console.log('Project:', this.project);
  console.log('GroupSpecificExpenses:', this.project?.groupSpecificExpenses);
  this.initializeGroupSpecificExpenses();
}

initializeGroupSpecificExpenses() {
  if (this.project) {
    this.project.groupSpecificExpenses.forEach((ge: GroupSpecificExpense) => {
      this.groupSpecificExpenses.push(this.formBuilder.group({
        id: [ge.id],
        name: [ge.name, [Validators.required]],
        costs: [ge.costs, [Validators.required, Validators.min(1)]],
        perParticipant: [ge.perParticipant]
      }))
    })
  } else {
    this.groupSpecificExpenses.push(this.newGroupSpecificExpensesFormGroup());
  }
}

newGroupSpecificExpensesFormGroup(): FormGroup {
  return this.formBuilder.group({
    id: [null],
    name: [null, [Validators.required]],
    costs: [null, [Validators.required, Validators.min(1)]],
    perParticipant: [false]
  })
}

removeGroupSpecificExpenses(i: number) {
  this.groupSpecificExpenses.removeAt(i);
}

get groupSpecificExpenses(): FormArray {
  return this.projectForm.get("groupSpecificExpenses") as FormArray;
}

addGroupSpecificExpense() {
  setTimeout(() => {
    this.groupSpecificExpenses.push(this.newGroupSpecificExpensesFormGroup());
  });
}

name(i: number): AbstractControl {
  return this.groupSpecificExpenses.at(i).get("name");
}

costs(i: number): AbstractControl {
  return this.groupSpecificExpenses.at(i).get("costs");
}

perParticipant(i: number): AbstractControl {
  return this.groupSpecificExpenses.at(i).get("perParticipant");
}
}
