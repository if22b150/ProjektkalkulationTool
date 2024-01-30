import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Project} from "../../../../../models/project.model";
import {LecturerService} from "../../../../../services/lecturer.service";
import {filter, take} from "rxjs";
import {AuthService} from "../../../../../services/auth/auth.service";
import {ProjectLecturer} from "../../../../../models/project-lecturer.model";
import {Lecturer} from "../../../../../models/lecturer.model";

@Component({
  selector: 'app-project-lecturers',
  templateUrl: './project-lecturers.component.html',
  styleUrls: ['./project-lecturers.component.scss']
})
export class ProjectLecturersComponent implements OnInit {
  // This component will be used when creating a new project, but also when editing an existing project
  // Therefore there needs to be a distinction, which is done via the "project" object", which gets passed from the outside component (either the new-project or hte edit-project component)
  @Input() project: Project; // currently not relevant
  @Input() projectForm: FormGroup;
  @Input() submitted: boolean;

  @Input() dropDownLecturers: any[];

  constructor(private formBuilder: FormBuilder,
              public authService: AuthService,
              public lecturerService: LecturerService) {
  }

  ngOnInit() {
    this.initializeLecturers();
    this.lecturerService.lecturers$.subscribe({
      next: (l) => {
        if(l)
          this.initializeLecturers()
      }
    })
  }

  initializeLecturers() {
    this.projectLecturers.clear({emitEvent:false});

    // TODO: Set lecturer doesnt show in dropdown

    if (this.project) {
      this.project.lecturers.forEach((projectLecturer: ProjectLecturer) => {
        this.projectLecturers.push(this.formBuilder.group({
          id: [null],
          lecturer: [this.getProjectLecturerValue(projectLecturer), [Validators.required]],
          hours: [projectLecturer.hours, [Validators.required, Validators.min(1)]]
        }))
      })
    } else {
      this.projectLecturers.push(this.newProjectLecturerFormGroup());
    }
  }

  getProjectLecturerValue(projectLecturer: ProjectLecturer) {
    if(this.crossFaculty) {
      let dropdownGroup = this.dropDownLecturers.find(d => d.value.id == projectLecturer.lecturer.faculty.id);
      // console.log(dropdownGroup)
      return dropdownGroup.items.find(dl => dl.value.id == projectLecturer.lecturer.id);
    } else
      return this.dropDownLecturers.find(dl => projectLecturer.lecturer.id == dl.id);
  }

  newProjectLecturerFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      lecturer: [null, [Validators.required]],
      hours: [null, [Validators.required]]
    })
  }

  addProjectLecturer() {
    setTimeout(() => {
      this.projectLecturers.push(this.newProjectLecturerFormGroup());
    });
  }

  removeProjectLecturer(i: number) {
    this.projectLecturers.removeAt(i);
  }

  get projectLecturers(): FormArray {
    return this.projectForm.get("projectLecturers") as FormArray;
  }

  get crossFaculty(): boolean {
    return this.projectForm.get('crossFaculty').value;
  }

  hours(i: number): AbstractControl {
    return this.projectLecturers.at(i).get("hours");
  }
}
