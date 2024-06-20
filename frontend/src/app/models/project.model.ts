import {AModel} from "./a-model.model";
import {ProjectLecturer} from "./project-lecturer.model";
import {ProjectExpense} from "./project-expense.model";
import {ProjectType} from "./project-type.model";
import {Faculty} from "./faculty.model";

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
  projectType: ProjectType;
  is_opened: boolean,
  lecturers: ProjectLecturer[];
  expenses: ProjectExpense[];
  crossFaculties: Faculty[];
  priceForCoursePerDayOverride?: number;
}
