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
}
