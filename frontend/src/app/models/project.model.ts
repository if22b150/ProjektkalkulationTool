import {AModel} from "./a-model.model";
import {ProjectLecturer} from "./project-lecturer.model";

export interface Project extends AModel {
  // needs to be defined first

  projectLecturers: ProjectLecturer[];
}
