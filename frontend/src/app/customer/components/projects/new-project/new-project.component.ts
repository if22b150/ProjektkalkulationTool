import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit{
  newProjectForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.newProjectForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      text: [null, [Validators.required]],
      helptext: [null],
      projectLecturers: this.formBuilder.array([])
    })
  }

  create() {
    this.submitted = true;
    if(this.newProjectForm.invalid)
      return;

    this.loading = true;

    // Fake request time
    setTimeout(() => {
      this.loading = false;
      console.log("Kosten: " + this.calculateTotalCost());  // Added line to log the total cost
    }, 2000);
    console.log(this.calculateTotalCost())
  }

  calculateTotalCost(): number {
    let totalCost = 0;
    this.projectLecturers.controls.forEach(lecturer => {
      const hours = lecturer.get('hours').value || 0;
      const hourlyRate = lecturer.get('lecturer').value.hourlyRate || 0;
      totalCost += hours * hourlyRate;
    });
    return totalCost;
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

  get text(): AbstractControl {
    return this.newProjectForm.get("text");
  }

  get helptext(): AbstractControl {
    return this.newProjectForm.get("helptext");
  }

  get projectLecturers(): FormArray {
    return this.newProjectForm.get("projectLecturers") as FormArray;
  }
}
