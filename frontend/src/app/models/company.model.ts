import {AModel} from "./a-model.model";
import { Project } from "./project.model";

export interface Company extends AModel {
  name: string;
  image_url: string;
  image: File;
  projects: Project[];
}
