import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Project} from "../../../../../models/project.model";
import {LecturerService} from "../../../../../services/lecturer.service";
import {AuthService} from "../../../../../services/auth/auth.service";
import {ProjectLecturer} from "../../../../../models/project-lecturer.model";
import {NgForOf} from "@angular/common";
import {ProjectLecturerItemComponent} from "./project-lecturer-item/project-lecturer-item.component";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";

@Component({
  selector: 'app-project-lecturers',
  standalone: true,
  templateUrl: './project-lecturers.component.html',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    ProjectLecturerItemComponent,
    ButtonDirective,
    Ripple
  ],
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
    this.lecturerService.models$.subscribe({
      next: (l) => {
        if(l)
          this.initializeLecturers()
      }
    })
  }

  initializeLecturers() {
    this.projectLecturers.clear({emitEvent:false});

    if (this.project) {
      this.project.lecturers.forEach((projectLecturer: ProjectLecturer) => {
        this.projectLecturers.push(this.formBuilder.group({
          id: [null],
          lecturer: [this.getProjectLecturerValue(projectLecturer), [Validators.required]],
          hours: [projectLecturer.hours, [Validators.required, Validators.min(1)]],
          daily: [projectLecturer.daily],
          hourlyRateOverride: [projectLecturer.hourlyRateOverride ?? projectLecturer.lecturer.hourlyRate],
          dailyRateOverride: [projectLecturer.dailyRateOverride ?? projectLecturer.lecturer.dailyRate],
        }))
      })
    } else {
      this.projectLecturers.push(this.newProjectLecturerFormGroup());
    }
  }

  getProjectLecturerValue(projectLecturer: ProjectLecturer) {
    if(this.crossFaculty) {
      let dropdownGroup = this.dropDownLecturers.find(d => d.value.id == projectLecturer.lecturer.faculty.id);
      return dropdownGroup.items.find(dl => dl.id == projectLecturer.lecturer.id);
    } else
      return this.dropDownLecturers.find(dl => projectLecturer.lecturer.id == dl.id);
  }

  newProjectLecturerFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      lecturer: [null, [Validators.required]],
      hours: [null, [Validators.required]],
      daily: [false],
      hourlyRateOverride: [null],
      dailyRateOverride: [null],
    })
  }

  addProjectLecturer() {
    setTimeout(() => {
      this.projectLecturers.push(this.newProjectLecturerFormGroup());
    });
  }

  get projectLecturers(): FormArray {
    return this.projectForm.get("projectLecturers") as FormArray;
  }

  get crossFaculty(): boolean {
    return this.projectForm.get('crossFaculty').value;
  }
}
