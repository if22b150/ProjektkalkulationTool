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
    console.log(this.newProjectForm)
    this.submitted = true;
    if(this.newProjectForm.invalid)
      return;

    this.loading = true;

    // Fake request time
    setTimeout(() => {
      this.loading = false;
    }, 2000);

    // calculate hours/price
    // iterate through projectLecturers and sum the hours multiplied with the hourlyRate of the lecturer
    let price = 0;

    console.log("Kosten: " + price)
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
