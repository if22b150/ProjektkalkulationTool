import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MessageService } from 'primeng/api';
import {ExpenseService} from "../../../../services/expense.service";

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
              public expenseService: ExpenseService) {

  }

  ngOnInit() {
    this.newProjectForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      // travelCosts: [null, [Validators.required]],
      projectExpenses: this.formBuilder.array([]),
      projectLecturers: this.formBuilder.array([]),
    })
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
    let newCosts = 0;
    this.projectLecturers.controls.forEach(lecturer => {
      const hours = lecturer.get('hours').value || 0;
      const hourlyRate = lecturer.get('lecturer').value.hourlyRate || 0;
      newCosts += hours * hourlyRate;
    });
    // newCosts += this.travelCosts.value;
    this.projectExpenses.controls.forEach(expense => {
      newCosts += expense.get('costs').value || 0;
    });
    this.totalCost = newCosts;
  }

  addLecturer() {
    const lecturerGroup = this.formBuilder.group({
      hours: [null, Validators.required],
      hourlyRate: [null, Validators.required]
    });
    this.projectLecturers.push(lecturerGroup);
  }

  get title(): AbstractControl {
    return this.newProjectForm.get("title");
  }

  // get travelCosts(): AbstractControl {
  //   return this.newProjectForm.get("travelCosts");
  // }

  get helptext(): AbstractControl {
    return this.newProjectForm.get("helptext");
  }

  get projectLecturers(): FormArray {
    return this.newProjectForm.get("projectLecturers") as FormArray;
  }

  get projectExpenses(): FormArray {
    return this.newProjectForm.get("projectExpenses") as FormArray;
  }
}
