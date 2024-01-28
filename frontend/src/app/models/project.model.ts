import {AModel} from "./a-model.model";
import {ProjectLecturer} from "./project-lecturer.model";
import {ProjectExpense} from "./project-expense.model";
import {ProjectType} from "./project-type.model";

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
  projectType: ProjectType;
  lecturers: ProjectLecturer[];
  expenses: ProjectExpense[];
}
