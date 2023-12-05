import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Project} from "../../../../../models/project.model";
import {LecturerService} from "../../../../../services/lecturer.service";
import {filter, take} from "rxjs";

@Component({
  selector: 'app-project-lecturers',
  templateUrl: './project-lecturers.component.html',
  styleUrls: ['./project-lecturers.component.scss']
})
export class ProjectLecturersComponent implements OnInit {
  // This component will be used when creating a new project, but also when editing an existing project
  // Therefore there needs to be a distinction, which is done via the "newProject" boolean, which gets passed from the outside component (either the new-project or hte edit-project component)
  // When newProject is true, "project" is not set, when it is false, "project" is set with the already existing project

  @Input() project: Project; // currently not relevant

  @Input() projectForm: FormGroup;
  @Input() newProject: boolean;

  constructor(private formBuilder: FormBuilder,
              public lecturerService: LecturerService) {
  }

  ngOnInit() {
    this.lecturerService.lecturers$
      .pipe(filter(l => l != null), take(1))
      .subscribe({
      next: () => {
        this.initializeLecturers();
      }
    })
  }

  initializeLecturers() {
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
      this.projectLecturers.push(this.newProjectLecturerFormGroup());
    }
  }

  newProjectLecturerFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      lecturer: [this.lecturerService.lecturers[0], [Validators.required]],
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
}
