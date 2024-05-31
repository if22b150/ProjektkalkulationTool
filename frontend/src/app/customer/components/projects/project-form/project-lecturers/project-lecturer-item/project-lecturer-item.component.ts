import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Project} from "../../../../../../models/project.model";
import {AbstractControl, FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Dropdown} from "primeng/dropdown";
import {AuthService} from "../../../../../../services/auth/auth.service";
import {LecturerService} from "../../../../../../services/lecturer.service";
import {ProjectLecturer} from "../../../../../../models/project-lecturer.model";

@Component({
  selector: 'app-project-lecturer-item',
  templateUrl: './project-lecturer-item.component.html',
  styleUrls: ['./project-lecturer-item.component.scss']
})
export class ProjectLecturerItemComponent implements OnInit, AfterViewInit{
  @Input() i: number;
  @Input() project: Project;
  @Input() projectForm: FormGroup;
  @Input() projectLecturerControl: AbstractControl
  @Input() projectLecturer: ProjectLecturer
  @Input() submitted: boolean;

  @Input() dropDownLecturers: any[];

  @ViewChild('lecturersDropdown') lecturersDropdown: Dropdown

  useOtherSelected: boolean

  constructor(private formBuilder: FormBuilder,
              public authService: AuthService,
              public lecturerService: LecturerService) {
  }

  ngOnInit() {
    this.useOtherSelected = this.project != null
  }

  // Workaround
  ngAfterViewInit() {
    if(this.project) {
      this.lecturersDropdown.updateModel(this.project.crossFaculty ? this.getProjectLecturerValue() : {label: this.getProjectLecturerValue().name, value: this.getProjectLecturerValue()})
      this.lecturersDropdown.onChange.subscribe({
        next: () => {
          this.useOtherSelected = false
        }
      })
    }
  }

  getProjectLecturerValue() {
    if(this.crossFaculty) {
      let dropdownGroup = this.dropDownLecturers.find(d => d.value.id == this.projectLecturer.lecturer.faculty.id);
      return dropdownGroup.items.find(dl => dl.value.id == this.projectLecturer.lecturer.id);
    } else
      return this.dropDownLecturers.find(dl => this.projectLecturer.lecturer.id == dl.id);
  }

  removeProjectLecturer() {
    (this.projectForm.get('projectLecturers') as FormArray).removeAt(this.i);
  }

  get crossFaculty(): boolean {
    return this.projectForm.get('crossFaculty').value;
  }

  get daily(): AbstractControl {
    return this.projectLecturerControl.get("daily");
  }

  hours(): AbstractControl {
    return this.projectLecturerControl.get("hours");
  }
}