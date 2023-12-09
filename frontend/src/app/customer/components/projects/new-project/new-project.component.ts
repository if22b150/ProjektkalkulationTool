import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MessageService } from 'primeng/api';

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

  materialCostsList = [
    {
      name: "Sachkosten 1",
      costs: 2500
    },
    {
      name: "Sachkosten 2",
      costs: 2500
    },
    {
      name: "Sachkosten 3",
      costs: 2500
    },
  ];

  constructor(private formBuilder: FormBuilder, private messageService: MessageService) {

  }

  ngOnInit() {
    this.newProjectForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      travelCosts: [null, [Validators.required]],
      materialCosts: [[]],
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
    newCosts += this.travelCosts.value;
    this.materialCosts.value.forEach(m => {
      newCosts += m.costs/100;
    })
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

  get travelCosts(): AbstractControl {
    return this.newProjectForm.get("travelCosts");
  }

  get helptext(): AbstractControl {
    return this.newProjectForm.get("helptext");
  }

  get projectLecturers(): FormArray {
    return this.newProjectForm.get("projectLecturers") as FormArray;
  }

  get materialCosts(): AbstractControl {
    return this.newProjectForm.get("materialCosts");
  }
}
