import {AModel} from "./a-model.model";

export interface Faculty extends AModel {
  name: string;
  priceForCoursePerDay: number;
}
