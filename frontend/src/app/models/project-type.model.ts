import {AModel} from "./a-model.model";

export interface ProjectType extends AModel {
  name: string;
  code: string;
  isCourse: boolean;
}
