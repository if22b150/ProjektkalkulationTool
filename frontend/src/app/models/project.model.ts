import {AModel} from "./a-model.model";
import {ProjectLecturer} from "./project-lecturer.model";
import {ProjectExpense} from "./project-expense.model";
import {ProjectType} from "./project-type.model";

export interface Project extends AModel {
  name: string;
  costs?: number;
  projectType: ProjectType;
  lecturers: ProjectLecturer[];
  expenses: ProjectExpense[];
}
