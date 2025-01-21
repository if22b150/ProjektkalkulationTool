import {AModel} from "./a-model.model";
import {ProjectLecturer} from "./project-lecturer.model";
import {ProjectExpense} from "./project-expense.model";
import {ProjectType} from "./project-type.model";
import {Faculty} from "./faculty.model";
import {OtherExpense} from "./other-expense.model";
import { ProjectCategory } from "./project-category.model";
import { Company } from "./company.model";

export interface Project extends AModel {
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  start: Date;
  end: Date;
  crossFaculty: boolean;
  notes?: string;
  costs?: number;
  participants?: number;
  duration?: number;
  faculty: Faculty;
  projectCategories: ProjectCategory[];
  projectType: ProjectType;
  company: Company;
  ects: number;
  isOpened: boolean;
  lecturers: ProjectLecturer[];
  expenses: ProjectExpense[];
  crossFaculties: Faculty[];
  priceForCoursePerDayOverride?: number;
  otherExpenses: OtherExpense[];
  state: EProjectState;
  stateChangedAt?: Date;
  createdAt: Date;
}

export enum EProjectState {
  SUBMITTED = "submitted",
  APPROVED = "approved",
  REJECTED = "rejected"
}

export function getProjectStateLabel(state: EProjectState): string {
  switch (state) {
    case EProjectState.SUBMITTED:
      return "Eingereicht";
    case EProjectState.APPROVED:
      return "Genehmigt";
    case EProjectState.REJECTED:
      return "Abgelehnt";
    default:
      return "Unbekannter Status"; // Fallback for unexpected values
  }
}

export function getProjectStateIconClass(state: EProjectState): string {
  switch (state) {
    case EProjectState.SUBMITTED:
      return "pi pi-clock";
    case EProjectState.APPROVED:
      return "pi pi-verified";
    case EProjectState.REJECTED:
      return "pi pi-times-circle";
  }
}
