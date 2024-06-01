import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProjectTypeService} from "../../../../services/project-type.service";
import {Project} from "../../../../models/project.model";
import {ExpenseService} from "../../../../services/expense.service";
import {LecturerService} from "../../../../services/lecturer.service";
import {ProjectExpense} from "../../../../models/project-expense.model";
import {ProjectLecturer} from "../../../../models/project-lecturer.model";
import Utils from "../../../../shared/utils";
import {ProjectService} from "../../../../services/project.service";
import {AuthService} from "../../../../services/auth/auth.service";
import {ProjectType} from "../../../../models/project-type.model";
import {FacultyService} from "../../../../services/faculty.service";
import {MultiSelect, MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {AsyncPipe, CurrencyPipe, NgIf} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {CalendarModule} from "primeng/calendar";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ProjectExpensesComponent} from "./project-expenses/project-expenses.component";
import {CheckboxModule} from "primeng/checkbox";
import {ProjectLecturersComponent} from "./project-lecturers/project-lecturers.component";
import {ExportButtonsComponent} from "../export-buttons/export-buttons.component";
import {LoadingSpinnerComponent} from "../../../../shared/components/loading-spinner/loading-spinner.component";
import {ToastModule} from "primeng/toast";
import {Ripple} from "primeng/ripple";
import {ERole} from "../../../../models/user.model";
import {Faculty} from "../../../../models/faculty.model";

@Component({
  selector: 'app-project-form',
  standalone: true,
  templateUrl: './project-form.component.html',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    NgIf,
    CalendarModule,
    InputTextareaModule,
    ProjectExpensesComponent,
    CheckboxModule,
    MultiSelectModule,
    ProjectLecturersComponent,
    CurrencyPipe,
    ExportButtonsComponent,
    LoadingSpinnerComponent,
    ToastModule,
    Ripple
  ],
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit, AfterViewInit {
  @Output() formChangesEmitter: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() costChangesEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() submitEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Input() project: Project = null;
  @Input() submitLabel: string;
  @Input() title: string;
  @Input() submitted: boolean;
  @Input() loading: boolean = false;
  @Input() exportOptions: boolean;

  @ViewChild('crossFacultySelect') crossFacultySelect: MultiSelect

  projectForm: FormGroup;
  totalCost: number = 0;
  dropDownLecturers;
  dropDownFaculties;
  faculty: Faculty;

  constructor(private formBuilder: FormBuilder,
              public projectTypeService: ProjectTypeService,
              public projectService: ProjectService,
              public expenseService: ExpenseService,
              private authService: AuthService,
              private ref: ChangeDetectorRef,
              public lecturerService: LecturerService,
              private facultyService: FacultyService) {

  }

  ngOnInit() {
    this.faculty = this.authService.user.role == ERole.ADMIN ? this.project.faculty : this.authService.user.faculty
    this.dropDownFaculties = this.facultyService.faculties.filter(f => f.id != this.faculty.id)

    this.projectForm = this.formBuilder.group({
      name: [this.project ? this.project.name : null, [Validators.required]],
      firstname: [this.project ? this.project.firstname : null, [Validators.required]],
      lastname: [this.project ? this.project.lastname : null, [Validators.required]],
      email: [this.project ? this.project.email : null, [Validators.required, Validators.email]],
      start: [this.project ? new Date(this.project.start) : null, [Validators.required]],
      end: [this.project ? new Date(this.project.end) : null, [Validators.required]],
      crossFaculty: this.project ? this.project.crossFaculty : false,
      notes: this.project ? this.project.notes : null,
      projectType: [this.project ? this.project.projectType : this.projectTypeService.projectTypes[0], [Validators.required]],
      projectExpenses: this.formBuilder.array([]),
      projectLecturers: this.formBuilder.array([]),
      participants: [this.project ? this.project.participants : null],
      duration: [this.project ? this.project.duration : null],
      crossFaculties: [this.project ? this.getCrossFacultiesValue() : []]
    });

    this.setLecturers()
    this.setCourseValidators()

    // if(this.project)
    //   this.costChanges();

    this.projectForm.valueChanges.subscribe({
      next: (fg) => {
        this.formChangesEmitter.emit(this.projectForm);
        this.costChanges();
      }
    });

    this.crossFaculty.valueChanges.subscribe({
      next: (cf) => {
        this.setLecturers();
      }
    })

    this.crossFaculties.valueChanges.subscribe({
      next: (cf) => {
        this.setLecturers();
      }
    })

    this.projectType.valueChanges.subscribe({
      next: (pt: ProjectType) => {
        this.setCourseValidators()
      }
    })
  }

  // Workaround
  ngAfterViewInit() {
    if(this.project && this.project.crossFaculty) {
      this.crossFacultySelect.updateModel(this.getCrossFacultiesValue())
      this.ref.detectChanges()
    }
  }

  getCrossFacultiesValue() {
    return this.dropDownFaculties.filter(dropDownFaculty => this.project.crossFaculties.map(cross => cross.id).indexOf(dropDownFaculty.id) != -1)
  }

  setLecturers() {
    this.dropDownLecturers = this.crossFaculty.value ? this.lecturerService.getLecturersGroupedByFaculty([...(this.crossFaculties.value ?? []), ...[this.faculty]]) : this.lecturerService.lecturers.filter(l => l.faculty.id == this.faculty.id);
  }

  setCourseValidators() {
    if(this.projectType.value.isCourse) {
      this.participants.setValidators([Validators.required, Validators.min(1)])
      this.duration.setValidators([Validators.required, Validators.min(1)])
    } else {
      this.participants.clearValidators()
      this.duration.clearValidators()
    }
    this.participants.updateValueAndValidity()
    this.duration.updateValueAndValidity()
    this.projectForm.updateValueAndValidity()
  }

  costChanges() {
    if(this.projectLecturers.valid && this.projectExpenses.valid)
      this.calculateTotalCost();
    else
      this.totalCost = 0;
  }

  calculateTotalCost() {
    let expenses: ProjectExpense[] = [];
    this.projectExpenses.controls.forEach(expense => {
      expenses.push({
        costs: expense.get('costs').value || 0,
        expense: expense.get('expense').value
      });
    });

    let lecturers: ProjectLecturer[] = [];
    this.projectLecturers.controls.forEach(lecturer => {
      lecturers.push({
        hours: lecturer.get('hours').value || 0,
        lecturer: lecturer.get('lecturer').value,
        daily: lecturer.get('daily').value,
      });
    });

    this.totalCost = Utils.calculateProjectCosts(lecturers, expenses);
    this.costChangesEmitter.emit(this.totalCost);
  }


  get projectType(): AbstractControl {
    return this.projectForm.get("projectType");
  }

  get name(): AbstractControl {
    return this.projectForm.get("name");
  }

  get firstname(): AbstractControl {
    return this.projectForm.get("firstname");
  }

  get lastname(): AbstractControl {
    return this.projectForm.get("lastname");
  }

  get email(): AbstractControl {
    return this.projectForm.get("email");
  }

  get start(): AbstractControl {
    return this.projectForm.get("start");
  }

  calculateBreakEvenPoint(): number {
    // const fixedCosts = Utils.calculateProjectCosts(lecturers, expenses);
    // // const variableCosts = this.projectForm.get('variableCosts').value;
    // const salePrice = this.authService.user.faculty.priceForCoursePerDay * this.participants.value * this.duration.value;
    //
    // // if (salePrice - variableCosts === 0) {
    // //   throw new Error('Verkaufspreis pro Einheit darf nicht gleich den variablen Kosten pro Einheit sein');
    // // }
    // return fixedCosts / salePrice;
    return 1;
  }

  breakEvenPoint: number;

  get end(): AbstractControl {
    return this.projectForm.get("end");
  }

  get notes(): AbstractControl {
    return this.projectForm.get("notes");
  }

  get crossFaculty(): AbstractControl {
    return this.projectForm.get("crossFaculty");
  }

  // get projectType(): AbstractControl {
  //   return this.projectForm.get("projectType");
  // }

  get projectLecturers(): FormArray {
    return this.projectForm.get("projectLecturers") as FormArray;
  }

  get projectExpenses(): FormArray {
    return this.projectForm.get("projectExpenses") as FormArray;
  }

  get participants(): AbstractControl {
    return this.projectForm.get("participants");
  }

  get duration(): AbstractControl {
    return this.projectForm.get("duration");
  }

  get crossFaculties(): AbstractControl {
    return this.projectForm.get("crossFaculties");
  }
}
